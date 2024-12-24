import { Col, Image, Rate, Row } from "antd";
import React, { useState } from "react";
import imageProduct from "../../assets/images/test.webp";
import imageProductSmall from "../../assets/images/test-small.webp";
import {
  WrapperStyleImageSmall,
  WrapperStyleColImage,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperAddressProduct,
  WrapperQualityProduct,
  WrapperInputNumber,
} from "./style";
import { StarFilled, PlusOutlined, MinusOutlined, StarOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import * as CartService from "../../services/cartSevice"
import { useQuery } from '@tanstack/react-query';
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addCartProduct } from "../../redux/slices/cartSlice";
import { convertPrice } from "../../utils";
import { success, error } from "../Message/Message";


const ProductDetailsComponent = ({idProduct}) => {
  const [numberOfProduct, setNumberOfProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onChange = (value) => {
    setNumberOfProduct(Number(value));
  };

const fetchGetDetailedProduct = async (contextID) => {
      const res = await ProductService.getDetailedProduct(contextID);
      return res.data;
  };

  const handleChangeCount = (type) => {
    if (type === 'increase') {
      setNumberOfProduct(numberOfProduct + 1);
    } else if (numberOfProduct > 1) { 
      setNumberOfProduct(numberOfProduct - 1);
    }
  };


const { isLoading, data: productDetails } = useQuery({
      queryKey: ['product-details', idProduct],
      queryFn: () => fetchGetDetailedProduct(idProduct),
      enabled: !!idProduct,
});


const addToCartDB = async (userId, access_token, cartItem, type) => {
  const response = await CartService.changeCartItem(userId, access_token, cartItem, type);
  return response;
};

const handleAddCartProduct = () => {
  if(!user?.id){
    navigate('/signin', {state: location?.pathname});
  }else{

    const cartItem  = {
        name: productDetails?.name,
        amount: numberOfProduct,
        image: productDetails?.image,
        price: productDetails?.price,
        discount: productDetails?.discount,
        product: productDetails?._id
    }

    try {
      addToCartDB(user?.id, user?.access_token, cartItem, "add");
      dispatch(addCartProduct({cartItem}));
      success('Sản phẩm đã được thêm vào giỏ hàng!');
    }catch(error){
      error("có lỗi xảy ra, xin thử lại sau")
    }
    
    
  }
}

  return (
    <Loading isLoading={isLoading}>
    <Row style={{ padding: "16px", background: "#fff", borderRadius: "4px" }}>
      <Col
        span={10}
        style={{ borderRight: "1px solid #e5e5e5", paddingRight: "8px" }}
      >
        <Image src={productDetails?.image} alt="image product" preview={false} />
        <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="product image"
              preview={false}
            />
          </WrapperStyleColImage>

          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>

          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>

          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>

          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>

          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>
        </Row>
      </Col>
      <Col span={14} style={{ paddingLeft: "10px" }}>
        <WrapperStyleNameProduct>
          {productDetails?.name}
        </WrapperStyleNameProduct>
        <div>
        <Rate allowHalf value={productDetails?.rating} /> <span>{productDetails?.rating}</span>
          <WrapperStyleTextSell> | Đã bán {productDetails?.selled}</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>{convertPrice(productDetails?.price)} đ</WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>Giao đến </span>
          <span className="address">Đại học Bách khoa Hà Nội</span> -
          <span className="change-address">Đổi địa chỉ</span>
        </WrapperAddressProduct>
        <div
          style={{
            margin: "10px 0 20px",
            padding: "10px 0",
            borderTop: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Số lượng</div>
          <WrapperQualityProduct>
            <button style={{ border: "none", background: "transparent", cursor: "pointer" }}>
              <MinusOutlined style={{ color: "#000", fontSize: "20px" }} onClick={() => handleChangeCount('decrease')}/>
            </button>
            <WrapperInputNumber
              onChange={onChange}
              value={numberOfProduct}
              defaultValue={1}
              size="small"
            />
            <button style={{ border: "none", background: "transparent", cursor: "pointer" }}>
              <PlusOutlined style={{ color: "#000", fontSize: "20px" }} onClick={() => handleChangeCount('increase')} />
            </button>
          </WrapperQualityProduct>
        </div>
        <div>
          <ButtonComponent
            bordered={false}
            size={40}
            styleButton={{
              background: "rgb(255, 57, 69)",
              height: "48px",
              width: "220px",
              border: "none",
              borderRadius: "4px",
            }}           
            onClick={handleAddCartProduct}
            textButton={isLoading ? "Đang tải..." : "Chọn mua"}
            disabled={isLoading}
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
          <ButtonComponent
            bordered={false}
            size={40}
            styleButton={{
              background: "#fff",
              height: "48px",
              width: "220px",
              border: "1px solid rgb(13, 92, 182)",
              borderRadius: "4px",
            }}
            textButton={"Mua trả sau"}
            styleTextButton={{ color: "rgb(13, 92, 182)", fontSize: "15px" }}
          ></ButtonComponent>
        </div>
      </Col>
    </Row>
    </Loading>
  );
};

export default ProductDetailsComponent;
