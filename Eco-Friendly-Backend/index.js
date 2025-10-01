const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/images',
  express.static('images'));

const MONGO_URI = `mongodb+srv://${process.env.VITE_MONGO_USERNAME}:${process.env.VITE_MONGO_PASSWORD}@${process.env.VITE_MONGO_CLUSTER}/${process.env.VITE_MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("EcoMart DB Connected Successfully");
  })
  .catch((error) => {
    console.error("DB Connection Failed:", error.message);
  });


// ===================== Product Schema =====================
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: String,
  regularPrice: String,
  discount: String,
  soldOut: Boolean,
  img: String,
});

const Product = mongoose.model("Product", productSchema, "products");

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const productId = new mongoose.Types.ObjectId(req.params.id);
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Invalid Product ID" });
  }
});

app.post("/add-product", async (req, res) => {
  try {
    const { img, name, category, price, regularPrice, discount, soldOut } = req.body;
    const newProduct = new Product({
      img,
      name,
      category,
      price: price.startsWith("₹") ? price : `₹${price}`,
      regularPrice: regularPrice.startsWith("₹") ? regularPrice : `₹${regularPrice}`,
      discount,
      soldOut,
    });
    await newProduct.save();
    res.status(201).json({ message: "EcoMart product added successfully!", product: newProduct });
  } catch (err) {
    res.status(500).json({ error: "Error adding product" });
  }
});


// ===================== Review Schema =====================
const reviewSchema = new mongoose.Schema({
  img: String,
  name: String,
  location: String,
  review: String,
});

const Review = mongoose.model("Review", reviewSchema, "reviews");

app.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ===================== Order Schema =====================
const orderSchema = new mongoose.Schema({
  orderId: String,
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Paid" },
  paymentId: String,
  customer: {
    name: String,
    email: String,
    contact: String,
    fullAddress: String,
  },
  fullAddress: String,
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema, "orders");


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// Create order
app.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // in paise
      currency: "INR",
      payment_capture: 1
    });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
  console.log("Received:", { razorpay_order_id, razorpay_payment_id, razorpay_signature });
  console.log("Generated:", generated_signature);

});



app.post("/store-order", async (req, res) => {
  try {
    const { orderId, products, totalAmount, customer, paymentId } = req.body;

    if (!orderId || !products || !totalAmount || !customer || !paymentId || !customer.fullAddress) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const parsePrice = (priceString) => {
      if (typeof priceString === "number") return priceString;
      if (!priceString || typeof priceString !== "string") return 0;
      const numericValue = Number(priceString.replace(/[^0-9.]/g, ""));
      return isNaN(numericValue) ? 0 : numericValue;
    };

    const processedItems = products.map((p) => ({
      productId: p._id,
      name: p.name,
      price: parsePrice(p.price),
      quantity: p.quantity,
    }));

    const order = new Order({
      orderId,
      items: processedItems,
      totalAmount: parsePrice(totalAmount),
      paymentStatus: "Paid",
      paymentId,
      customer,
      fullAddress: customer.fullAddress,
      orderDate: new Date(),
    });

    await order.save();
    res.status(201).json({ message: "EcoMart order stored successfully!", order });
    console.log(req.body);
  } catch (error) {
    console.error("Error storing order:", error);
    res.status(500).json({ error: "Error storing order" });
  }
});

app.get("/get-orders", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const orders = await Order.find({ "customer.email": email });
    if (!orders.length) {
      return res.status(404).json({ error: "No orders found for this email" });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});

// ===================== Contact Schema =====================
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema, "contacts");

// Save a contact message
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    const newMessage = new Contact({ name, email, phone, message });
    await newMessage.save();

    res.status(201).json({ message: "Contact message saved successfully", data: newMessage });
  } catch (error) {
    res.status(500).json({ error: "Error saving contact message" });
  }
});

// Fetch all contact messages (for admin)
app.get("/contact", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching contact messages" });
  }
});


// ===================== User Schema =====================
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema, "users");

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "EcoMart user registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving user" });
  }
});

app.get("/user", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.send("EcoMart Backend Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`EcoMart server running on port ${PORT}`));