"use client"
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { color } from "framer-motion";

interface Category {
  id: number;
  name: string;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    // const data = axios.get('http://localhost:8080/api/categories')
    axios
      .get<Category[]>("http://localhost:8080/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  }, 
  [
]);

 

  

  return (
    <div>
      <h1 className="baslik">Filtre</h1>
      <div>
      <ul className="list">
        {categories.map((category) => (
          <li key={category.id} className="listItem">
            <label className="label">
              <input type="checkbox" className="checkbox" />
              {category.name}
            </label>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}