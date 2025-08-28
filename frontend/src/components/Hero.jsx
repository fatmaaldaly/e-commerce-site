import react from 'react';
import Cookies from '../assets/cookies.png';

export default function Hero() {
    return (
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