import React, {useRef} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";



const items = [
    { logo: "https://cookievore.com/cdn/shop/files/ori.png?v=1749592334&width=600", text: "Milk Chocolate" },
    { logo: "https://cookievore.com/cdn/shop/files/cadbury.png?v=1743877731&width=600", text: "Dark Chocolate" },
    { logo: "https://cookievore.com/cdn/shop/files/white-single.png?v=1749546225&width=600", text: "White Chocolate" },
  ];



export default function Flavors(){

  return (
    <div className="section" style={{background:"white"}}>
        <h2 className="section-title">Explore Our Flavors</h2>
        {/* <div className="flavors-container"> */}
        
        <div className="boxes">
              {items.map((item, index) => (
             <div key={index} className="box">
             <img src={item.logo} alt={`Logo`} className="flavor-image"/>
             <p className="flavor-text">{item.text}</p>
        </div>
      ))}
        </div>
        
        
        
      </div>
    // </div>


  );
};

