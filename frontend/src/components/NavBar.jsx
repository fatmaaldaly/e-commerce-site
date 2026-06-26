import { useState} from "react";
import { Link } from "react-router-dom";
import "../style.css"
import DarkModeToggle from "../components/DarkModeToggle";
import { useCart } from "../hooks/useCart";
import Cart from "./Cart";
import logo from "../assets/logo.png";


const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  // { name: 'About us', href: '/about' },
]


export default function NavBar() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isCartOpen, setIsCartOpen] = useState(false);
   const { cart } = useCart();

   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
  <header className="relative bg-linear-to-r from-rose-50 via-amber-50 to-white/60 shadow-sm">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center gap-4">
          <button
            aria-label="Open menu"
            className="p-2 rounded-lg hover:bg-rose-100/60 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6 text-rose-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-24 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
           <button
             aria-label="Open cart"
             className="p-2 rounded-lg hover:bg-rose-100/60 transition"
             onClick={() => setIsCartOpen(!isCartOpen)}
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="text-rose-800" viewBox="0 0 16 16">  
               <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
             </svg>
           </button>

           {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-rose-600 rounded-full shadow">{totalItems}</span>
            )}
          </div>

          <Link to="/login" className="p-2 rounded-lg hover:bg-rose-100/60 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="text-rose-800" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
            </svg>
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mt-3 bg-white/60 backdrop-blur rounded-xl p-4 shadow-lg">
          <div className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className="px-3 py-2 rounded-lg hover:bg-rose-50 transition" onClick={() => setIsMenuOpen(false)}>{item.name}</Link>
            ))}
          </div>
        </div>
      )}
    </nav>

    <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
  </header>
  );
}