import { Col, Flex, Row } from "antd";
import React from "react";
import {
  WrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import Search from "antd/es/transfer/search";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";

const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader gutter={16}>
        <Col span={6}>
          <WrapperTextHeader>LAPTRINHWEB</WrapperTextHeader>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            size="large"
            textButton="Tìm kiếm"
            placeholder="input search text"

            //onSearch={onSearch}
          />
        </Col>
        <Col
          span={6}
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          <WrapperHeaderAccout>
            <UserOutlined style={{ fontSize: "30px" }} />
            <div>
              <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperHeaderAccout>
          <div>
            <ShoppingCartOutlined
              style={{ fontSize: "30px", color: "#fff " }}
            />
            <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
