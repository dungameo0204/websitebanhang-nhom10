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
import { useQuery } from '@tanstack/react-query';

const TypeProductPage = () => {
  const { state } = useLocation();
  const searchedText = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchedText, 500);
  const [paginate, setPaginate] = useState({
    page: 1,
    limit: 10,
    total: 1,
  });

  const fetchProductsAndUpdate = async (search, type, page, limit) => {
    const res = await ProductService.getProductsWithType(search, type, page, limit);
    setPaginate((prev) => ({
      ...prev,
      total: res?.pagination?.totalProductNumber,
    }));
    return res;
  };

  const { isLoading, data: searchedProducts } = useQuery({
    queryKey: ['searchedProducts', state, searchDebounce, paginate.page, paginate.limit],
    queryFn: () => fetchProductsAndUpdate(searchDebounce, state, paginate.page, paginate.limit),
    retry: 3,
    retryDelay: 1000,
    enabled: !!searchDebounce || !!state,
  });  

  const onChangePagination = (current, pageSize) => {
    setPaginate((prev) => ({
      ...prev,
      page: current,
      limit: pageSize,
    }));
  };

  // useEffect(() => {
  //   console.log("debug_paginate", paginate.page, paginate.limit);
  // }, [paginate]);

  return (
    <Loading isLoading={isLoading}>
      <div
        style={{
          padding: "0 120px",
          background: "#efefef",
          height: "calc(100vh - 64px)",
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
              height: "calc(100% - 20px)",
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
                {searchedProducts?.data?.map((product) => {
                  return (
                    <CardComponent
                      id={product._id}
                      countInStock={product.countInStock}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      type={product.type}
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
                onChange={onChangePagination}
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
