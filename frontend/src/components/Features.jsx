import { useEffect } from "react";
import offers from "../assets/offers.png";
import shop from "../assets/shop.png";
import 'animate.css'; // library that provides pre-built animation classes
import AOS from 'aos'; // for scroll-based animations
import 'aos/dist/aos.css'; // CSS file that comes with the AOS library


const ITEMS = [
  {
    src: offers,
    alt: "Exclusive online deals",
    text: "Exclusive online deals",
  },
  {
    src: shop,
    alt: "Shop online from over 10,000 items",
    text: "Shop online from over 10,000 items",
  },
];


export default function Features() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true, // only animate once when scrolling
    });
  }, []);

  return (
    <section className="features-section">
      <div className="features-container">
        {ITEMS.map((item, index) => (
          <div className="features-item" key={index} data-aos="fade-right">
            <div className="features-icon">
              <img src={item.src} alt={item.alt} />
            </div>
            <p className="features-text">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}




