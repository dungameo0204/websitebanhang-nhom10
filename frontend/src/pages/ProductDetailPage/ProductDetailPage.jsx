import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  return (
    <div
      style={{ padding: "0 120px", background: "#efefef", height: "1000px" }}
    >
      <h5>
        <span 
          style={{
            cursor: 'pointer', 
            fontWeight: 'bold',
            color: 'black',
            transition: 'color 0.3s',}} 
            onClick={navigate('/')}
            onMouseEnter={(e) => e.target.style.color = 'blue'}
            onMouseLeave={(e) => e.target.style.color = 'black'}
        >Trang chủ</span> <span> &gt; </span> Chi tiết sản phẩm</h5>
      <ProductDetailsComponent idProduct = {id}/>
    </div>
  );
};

export default ProductDetailsPage;
