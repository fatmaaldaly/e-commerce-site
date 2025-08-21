import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../style.css';


export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate(); 
    
    const addItemToCart = async (item) => {
        try {
            const res = await axios.post("http://localhost:5000/api/cart", item, {
                headers: { "Content-Type": "application/json" }
            });
            setCartItems([...cartItems, res.data]);
        } catch (err) {
            console.error("Error adding item to cart:", err);
        }
    }
}