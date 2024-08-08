
import React from 'react';
import CategoryList from '@/api/AxiosCategory';
import ProductList from '@/api/AxiosProduct';
import HeaderPage from './HeaderPage/Header';

const App: React.FC = () => {
  return (
    <div>
      <HeaderPage/>
    </div>
  );
}

export default App;

