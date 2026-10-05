import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Category from '../components/Category';
import BestSeller from '../components/BestSeller';
import Brand from '../components/Brand';

export default function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Category />
      <Brand />
      <BestSeller />
      <Footer />
    </div>
  );
}
