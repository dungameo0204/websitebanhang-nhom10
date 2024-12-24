import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ height:'100vh', width: '100%', background: '#efefef' }}>
      <div style = {{width: '1270px', margin: '0 auto', height: '100%'}}>
      <h5 style={{margin: 0, padding: '20px 0', boxSizing: 'border-box'}}>
        <span 
          style={{
            cursor: 'pointer', 
            fontWeight: 'bold',
            color: 'black',
            transition: 'color 0.3s',}} 
            onClick={() => navigate('/')}
            onMouseEnter={(e) => e.target.style.color = 'blue'}
            onMouseLeave={(e) => e.target.style.color = 'black'}
        >Trang chủ</span> <span> &gt; </span> Chi tiết sản phẩm</h5>
        <ProductDetailsComponent idProduct = {id}/>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
