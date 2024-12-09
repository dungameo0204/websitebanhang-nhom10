import React, { Fragment, useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Pagination, Row } from "antd";
import { Col } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const TypeProductPage = () => {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 1,
    limit: 10,
    total: 1,
  });

  //fetch Data
  const fetchProductsWithType = async (type, page, limit) => {
    setIsLoading(true);

    const res = await ProductService.getProductsWithType(type, page, limit);
    if (res?.status === "OK") {
      setProducts(res?.data);
      setIsLoading(false);

      setPaginate((prevState) => ({
        ...prevState,
        total: res?.pagination?.totalProductNumber,
      }));
    } else {
      setIsLoading(false);
      console.log("error", "res not OK");
    }
  };

  //Khi lựa chọn trên Pagination
  useEffect(() => {
    if (state) {
      fetchProductsWithType(state, paginate.page, paginate.limit);
    }
  }, [state, paginate.page, paginate.limit]);

  const onChange = (current, pageSize) => {
    setPaginate({ ...paginate, page: current, limit: pageSize });
  };

  return (
    <Loading isLoading={isLoading}>
      <div
        style={{
          padding: "0 120px",
          background: "#efefef",
          height: "calc(100vh-64px)",
        }}
      >
        <div
          style={{
            width: "1270px",
            margin: "0 auto",
            height: "100%",
          }}
        >
          <Row
            style={{
              flexWrap: "nowrap",
              paddingTop: "10px",
              height: "calc(100%-20px)",
            }}
          >
            <WrapperNavbar span={4}>
              <NavBarComponent />
            </WrapperNavbar>
            <Col
              span={20}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
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
                current={paginate?.page}
                total={paginate?.total}
                showSizeChanger={true}
                onChange={onChange}
                style={{ textAlign: "center", marginTop: "10px" }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Loading>
  );
};

export default TypeProductPage;
