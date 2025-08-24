import React from 'react';
import NavBar from '../components/NavBar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import Footer from '@/components/Footer';
import Footer from '../components/Footer';


// const products = [
//   { id: 1, name: "Chocolate Chip", price: 50 },
//   { id: 2, name: "Dark chocolate", price: 60 },
//   { id: 3, name: "White chocolate", price: 50 },
// ]


// export default function Shop() {


    

//     return(
//         <div >
//             <NavBar />
       
         
//         <div className="product-section">
        
//             <div className="product-boxes">
//                 {products.map((product) => (
//                     <div key={product.id} className="product-box">
//                         <img src=""/>
                       
//                         <h3 className="product-name">{product.name}</h3>
//                         <p className="product-price">Price: ${product.price}</p>
//                         <button className="add-to-cart-btn">Add to Cart</button>
//                     </div>
//                 ))}
//             </div>
            
//         </div>
//         </div>




//     );
    
// }


const products = [
  {
    id: 1,
    name: "Milk chocolate",
    price: "LE 50",
    image: "https://cookievore.com/cdn/shop/files/ori.png?v=1749592334&width=600",
  },
  {
    id: 2,
    name: "Dark chocolate",
    price: "LE 60",
    image: "https://cookievore.com/cdn/shop/files/cadbury.png?v=1743877731&width=600",
  },
  {
    id: 3,
    name: "White chocolate",
    price: "LE 50",
    image: "https://cookievore.com/cdn/shop/files/white-single.png?v=1749546225&width=600",
  },
  {
    id: 4,
    name: "Box of 3",
    price: "LE 50",
    image: "",
  },
  {
    id: 5,
    name: "Box of 6",
    price: "LE 60",
    image: "",
  },
  {
    id: 6,
    name: "",
    price: "LE 50",
    image: "",
  },
]

export default function ProductList() {
  return (
    

<section className="product">
       
        <NavBar />

<div className="product-grid">
  {products.map((product) => (
    <Card key={product.id} className="product-card">
      <CardContent className="flex flex-col items-center">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </CardContent>

      <CardTitle className="product-title">{product.name}</CardTitle>

      <CardFooter className="product-footer">
        <p className="product-price">{product.price}</p>
        <Button className="product-button">Add to Cart</Button>
      </CardFooter>
    </Card>
  ))}
</div>
<div style={{ marginTop: "100px" }}>
  <Footer />
</div>
</section>
    
  );
}