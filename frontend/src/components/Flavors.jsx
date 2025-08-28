import React, {useRef, useEffect} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import choc from '../assets/choc.jpg';
import kinder from '../assets/kinder.jpg';
import classic from '../assets/classic.jpg';
import dark from '../assets/dark.jpg';




const flavors = [
  {
    name: "Milk Chocolate",
    img: classic,
  },
  {
    name: "Double Chocolate",
    img: choc,
  },
  {
    name: "Dark Chocolate",
    img: dark ,
  },
  {
    name: "Kinder",
    img: kinder,
  },
];



export default function Flavors() {
  return (
    <div className="flavors-section">
      

      <div className="flavors-grid">
        {flavors.map((flavor, index) => (
          <div className="flavor-card" key={index}>
            <img src={flavor.img} alt={flavor.name} className="flavor-img" />
            <p className="flavor-name">{flavor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
