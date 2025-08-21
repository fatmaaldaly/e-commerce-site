import React from 'react';
import NavBar from '../components/NavBar';



const products = [
  { id: 1, name: "Chocolate Chip", price: 50 },
  { id: 2, name: "Dark chocolate", price: 60 },
  { id: 3, name: "White chocolate", price: 50 },
]


export default function Shop() {
    

    return(
        <div >
            <NavBar />
       
         
        <div className="product-section">
        
            <div className="product-boxes">
                {products.map((product) => (
                    <div key={product.id} className="product-box" style={{ width: "200px", height: "300px", padding: "20px", textAlign: "center" }}>
                        <img src={`https://cookievore.com/cdn/shop/files/${product.name.toLowerCase().replace(" ", "-")}.png?v=1749592334&width=600`} alt={product.name} className="product-image" />
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">Price: ${product.price}</p>
                        <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                ))}
            </div>
            
        </div>
        </div>




    );
    
}