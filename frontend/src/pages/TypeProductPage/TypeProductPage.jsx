import React, { Fragment, useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Pagination, Row } from "antd";
import { Col } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/LoadingComponent/Loading"

const TypeProductPage = () => {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState([])

  const fetchProductsWithType = async (type) => {

    setIsLoading(true)

    const res = await ProductService.getProductsWithType(type);
    if (res?.status == "OK") {
      setProducts(res?.data);
      setIsLoading(false)
    } else {
      setIsLoading(false)
      console.log("error", "res not OK");
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductsWithType(state);

    }
  }, [state]);

  const onChange = () => {};
  return (
    <Loading isLoading={isLoading}>
    <div style={{ padding: "0 120px", background: "#efefef", height: 'calc(100vh-64px)' }}>
      <Row style={{ flexWrap: "nowrap", paddingTop: "10px" }}>
        <WrapperNavbar span={4}>
          <NavBarComponent />
        </WrapperNavbar>
        <Col span={20} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <WrapperProducts>
            {products?.map((product) => {
              return (
                <CardComponent
                  key={product._id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.types}
                  discount={product.discount}
                  selled={product.selled}
                />
              );
            })}
          </WrapperProducts>
          <Pagination
            defaultCurrent={2}
            total={100}
            onChange={onChange}
            style={{ textAlign: "center", marginTop: "10px" }}
          />
        </Col>
      </Row>
    </div>
    </Loading>
  );
};

export default TypeProductPage;
