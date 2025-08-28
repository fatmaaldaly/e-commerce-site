import React from 'react';
import QualityIcon from '../assets/quality.svg';
import FreshIcon from '../assets/cookie.svg';
import DeliveryIcon from '../assets/truck.svg';


const features = [
    {
        title: "Freshly Baked",
        description: "Our cookies are baked fresh every day using the finest ingredients.",
        icon:  <img src={FreshIcon} alt="Good quality" style={{width: "2.5rem"}} />
    },
    {
        title: "Good quality",
        description: "Create your own cookie flavors and designs for special occasions.",
        icon:  <img src={QualityIcon} alt="Good quality" style={{width: "2.5rem"}} />
    },
    {
        title: "Fast Delivery",
        description: "Enjoy our cookies delivered right to your doorstep, fresh and warm.",
        icon:  <img src={DeliveryIcon} alt="Good quality" style={{width: "2.5rem"}} />
    }
];




function Features ()  {
    return (

        
        <div className="features-container">
            <h2 className='features-title'>Why Choose Us?</h2>
            <div className="features-grid">
                {features.map((feature, index) => (
                    <div className="feature-card blurry-bg" key={index}>
                        <div className="feature-icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p className='features-description'>{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;




