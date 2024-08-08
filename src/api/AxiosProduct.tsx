"use client"
import axios from "axios"
import { error } from "console";
import { useEffect, useState } from "react"

interface Product {
    id : number;
    name : string;
    category_id: number;
    price: number;
    explanation: string;
}

export default function ProductList() {
    const [product, setProducts] = useState<Product[]>([]);
    useEffect(() => {
      // const data = axios.get('http://localhost:8080/api/categories')
      axios
        .get<Product[]>("http://localhost:8080/api/products")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Hata:", error);
        });
    }, 
    [
  ]);

  return (
    <div className="product-list">
      <h1>Ürün Listesi</h1>
      <ul>
        {product.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} TL
          </li>
        ))}
      </ul>
    </div>
  );
}