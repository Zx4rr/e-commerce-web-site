
"use client";
import { FaSearch, FaTrashAlt, FaUser, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
interface Product {
    id: number;
    name: string;
    category_id: number;
    price: number;
    explanation: string;
    image_url: string; // Ensure you have this property in your product data
}

interface Category {
    id: number;
    name: string;
}

export default function AxiosCategory() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
            .get<Product[]>("http://localhost:8080/api/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        axios
            .get<Category[]>("http://localhost:8080/api/categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const handleCategoryChange = (categoryId: number) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter(
        (product) =>
            (selectedCategories.length === 0 ||
                selectedCategories.includes(product.category_id)) &&
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="header">
                <div className="search-bar">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="icons">
                    <FaUser />
                    <FaShoppingCart />
                </div>
            </div>

            <div className="container">
                <aside className="sidebar">
                    <h1>Filtre</h1>
                    <ul className="category-list">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category.id)}
                                        onChange={() => handleCategoryChange(category.id)}
                                    />
                                    {category.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="main-content">
                    <ul className="product-list">
                        {filteredProducts.map((product) => (
                            <li key={product.id} className="product-item">
                                <img src={product.image_url} alt={product.name} />
                                <div>
                                    <p>{product.name}</p>
                                    <p>{product.price} TL</p>
                                    <button className="add-to-cart-button">
                                        <FaShoppingCart /> Sepete Ekle
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="delete-icon">
                        <FaTrashAlt />
                        <span>Delete</span>
                    </div>
                </main>
            </div>

        </>
    );
}
