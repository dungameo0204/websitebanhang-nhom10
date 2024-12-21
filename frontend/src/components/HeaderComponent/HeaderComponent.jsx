import { Button, Col, Flex, Popover, Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  WrapperContentPopup,
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
import * as UserService from "../../services/UserService";
import {resetUser} from '../../redux/slices/userSlice';
import Loading from "../LoadingComponent/Loading";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleNavigateLogin = () => {
    navigate("/signin");
  };
<<<<<<< HEAD
  //bo sung vid32
  // const handleLogout = async () => {
  //   setLoading(true)
  //   await UserService.logoutUser()
  //   dispatchEvent(resetUser())
  //   setLoading(false)
  // }

  const content = (
    <div>
      {/* <WrapperContentPopup onClick={handleLogout}>dang xuat</WrapperContentPopup> */}
      <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thong tin nguoi dung</WrapperContentPopup>

    </div>
  )
=======

  const handleLogout = async () => {
    setLoading(true);
    localStorage.removeItem('access_token');
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  }

  //Dùng cho Popover:
  const content = (
    <div>
      <WrapperContentPopup>Thông tin người dùng</WrapperContentPopup>
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  );  
>>>>>>> 9ef70801a3fceb2bc5da36913b2bb2b6db70ac44

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
          <Loading isLoading={loading}>
          <WrapperHeaderAccout>
            <UserOutlined style={{ fontSize: "30px" }} />
            {user?.name ? (
              <>
              <Popover content={content} trigger="click">
                <div style={{ cursor: "pointer" }}>{user.name}</div>
              </Popover>
              </>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                <WrapperTextHeaderSmall>
                  Đăng nhập/Đăng ký
                </WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
          </WrapperHeaderAccout>
          </Loading>
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
