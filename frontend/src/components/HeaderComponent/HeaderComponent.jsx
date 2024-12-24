import { Badge, Button, Col, Flex, Popover, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import * as UserService from "../../services/UserService";
import { resetUser } from '../../redux/slices/userSlice';
import { resetCart } from "../../redux/slices/cartSlice";
import { searchProduct } from "../../redux/slices/productSlice";
import Loading from "../LoadingComponent/Loading";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log('user', user);

  const [search, setSearch] = useState("");
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const order = useSelector((state) => state.order)
  const handleNavigateLogin = () => {
    navigate("/signin");
  };

  const handleNavigateProf = () => {
    navigate("/profile-user");
  };
  const handleNavigateHomePage = () => {
    navigate("/");
  };
  const handleNavigateSystem = () => {
    navigate("/system/admin");
  }

  const handleNavigateShoppingCart = () => {
    navigate("/order");
  }
  const handleLogout = async () => {
    setLoading(true);
    localStorage.removeItem('access_token');
    await UserService.logoutUser();
    dispatch(resetUser());
    dispatch(resetCart());
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  //Dùng cho Popover:
  const content = (
    <div>
      { user?.isAdmin && (
        <WrapperContentPopup onClick={handleNavigateSystem}>Quản lý hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleNavigateProf}>Thông tin người dùng</WrapperContentPopup>
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  );  

  {/*Dùng cho ButtonInputSearch:*/ }
  const onSearch = (event) => {
    setSearch(event.target.value);
    dispatch(searchProduct(event.target.value));

  }
  const handleNavigateOrder = () => {
    navigate('/order')
  }

  return (
    <div>
      <WrapperHeader >
        <Col span={6}>
          <WrapperTextHeader style={{cursor:'pointer'}} onClick={handleNavigateHomePage}>NHOM10</WrapperTextHeader>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            size="large"
            textButton="Tìm kiếm"
            placeholder="input search text"
            onChange={onSearch}

          //onSearch={onSearch}
          />
        </Col>
        <Col
          span={6}
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          <Loading isLoading={loading}>
            <WrapperHeaderAccount>
              {userAvatar ? (
                <img src={userAvatar} alt="avatar" style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ cursor: "pointer" }}>{userName?.length ? userName : user?.email}</div>
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
            </WrapperHeaderAccount>
            </Loading>
          <div onClick={handleNavigateShoppingCart} style={{ cursor: "pointer" }}>
            <Badge count={cart?.cartItems?.length} size="small">
            <ShoppingCartOutlined
              style={{ fontSize: "30px", color: "#fff " }}
            />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
