import { useState } from 'react'
import '../style.css'
import { Link } from 'react-router-dom';




const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About us', href: '/about' },
]

export default function NavBar() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isCartOpen, setIsCartOpen] = useState(false);


  return (
    
  <div className="text-black">
   
    <nav className="nav">
      <div className="container">
        <div className="nav-content">           
         {/* <div className="absolute left-6">
          <img
          alt="Logo"
          src="https://dcassetcdn.com/design_img/3115551/18140/18140_17253961_3115551_325d68d7_image.png"
          style={{marginLeft:'15px', width:'50px'}}
          />
        </div> */}
           
        {/* <div className="nav-links">
                {navigation.map((item) =>(
                    <a 
                    key={item.name}
                    href={item.href}
                    className="nav-link"
                    >
                    {item.name}    
                    </a>
                ))}
        </div> */}

        
        {/* Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Centered Logo */}
        <div className="logo-container">
          <img
            alt="Logo"
            src=""
            style={{ width: "50px" }}
          />
        </div>






        {/* cart & login */}
        <div className="flex absolute right-6 gap-4">
          <div
            onClick={() => setIsCartOpen(true)}
            className="cursor-pointer hover:text-pink-600"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag logo" viewBox="0 0 16 16">
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
          </svg>
          </div>
          
        
          
          <Link to="/Login">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person logo"  style={{marginRight:'15px'}} viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
          </svg>
          </Link>
        </div>  

        </div>
        
      </div>

    </nav> 

    {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="ml-auto w-80 h-full bg-white shadow-lg p-6 relative animate-slide-in">
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={() => setIsCartOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
            <p>No items yet.</p>
          </div>
        </div>
      )}



  
</div>


 
  );
}