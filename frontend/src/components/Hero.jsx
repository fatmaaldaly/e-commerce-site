import react from 'react';
import { useState } from 'react';
import Cookies from '../assets/cookies.png';



export default function Hero() {

    return(
        // <section id="home" className="hero">
            // {/* <div className="container"> */}
               
                    // <div className="hero-content">
                        // {/* <h2 className="hero-title">Freshly baked cookies</h2> */}
                    //     <br/>
                    // </div>
                    
                    // <div className='hero-logo'> 
                    //     <img src={Cookies} alt='logo'/>
                    // </div>

                    // <div className='order'>   
                    //     <button >Order now</button>
                    // </div>
                    

          
        // </section>

    <section id="home" className="hero">
       <div className="hero-content-container">
         <h2 className="hero-title">Freshly Baked Cookies</h2>
         <div className="orderNow-btn"> 
         <button>Order now</button>
         </div>
    </div>

      <div className='hero-image-container'>
      <img src={Cookies} alt='cookies'/>
      </div>
    </section>



    );

}