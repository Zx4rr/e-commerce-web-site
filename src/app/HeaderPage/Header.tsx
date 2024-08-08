import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import {Button} from "@nextui-org/react";
import CategoryList from '@/api/AxiosCategory';
import ProductList from '@/api/AxiosProduct';


function HeaderPage() {
    return (
      <>
        <header>
          <nav className="nav">
            <div className="logo">shopApp</div>
            <div className="search-container">
             <input type="text" placeholder="Search" className="search-input"   />
            </div>
            <div className="icons">
              <Button className='icon' size='md'><FaUser /></Button>
              <Button className='icon' size='md'><FaBasketShopping /></Button>
            </div>
          </nav>
        </header>

        <div>
          <div>
          <nav className='sidebar_bar'>
              <div>
                <CategoryList/>
              </div>
          </nav>
          </div>
        <div className='container'>
          <ProductList/>
        </div>
        </div>

      </>
    );
  }


  
  
  export default HeaderPage


