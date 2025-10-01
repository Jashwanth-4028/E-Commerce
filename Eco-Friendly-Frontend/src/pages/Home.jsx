import About from '../components/About'
import Banner from '../components/Banner'
import EcoEssentials from '../components/EcoEssentials'
import LatestProduct from '../components/LatestProduct'
import GreenGallery from '../components/GreenGallery'
import Review from '../components/Review'
import Video from '../components/Video'

export default function Home() {
    return (<>

        <Banner />
        <EcoEssentials />
        <GreenGallery />
        <LatestProduct/>
        <About/>
        <Video/>
        <Review/>
    </>)
}