import { Button, Checkbox, Form } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import {
  WrapperCountOrder,
  WrapperTotal,
  WrapperStyleHeader,
  WrapperPriceDiscount,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperRight,
  WrapperOrderItemImg,
  WrapperOrderItemInfo,
  WrapperOrderItemPrice,
  WrapperOrderItemTitle,
  WrapperListOrder,
  WrapperOrderTotal,
  WrapperOrderTotalContent,
  WrapperOrderTotalPrice,
} from "./style";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import { useDispatch, useSelector } from "react-redux";
import {selectedOrderItems} from '../../redux/slices/orderSlice'
import {
  resetCart,
  removeCartProducts,
  increaseAmount,
  decreaseAmount,
} from "../../redux/slices/cartSlice";
import * as CartService from "../../services/cartSevice";
import { useDebounce } from "../../hooks/useDebounce";
import {convertPrice} from "../../utils"
import InputComponent from "../../components/InputComponent/InputComponent";
import { useNavigate } from "react-router-dom";


const OrderPage = ({ count = 1 }) => {
  const user = useSelector((state) => state?.user);
  const cart = useSelector((state) => state?.cart);
  const [changes, setChanges] = useState([]);
  const [listChecked, setListChecked] = useState([]);
  const [IsModalUpdateInfo, setIsModalUpdateInfo] = useState(false);
  const dispatch = useDispatch();
  const debouncedChanges = useDebounce(changes, 1000);
  const navigate = useNavigate()

  {/* dùng cho checkboxes */}
  const onChange = (event) => {
    if (listChecked.includes(event.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== event.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, event.target.value]);
    }
  };

  const handleOnChangeCheckAll = (event) => {
    const newListChecked = [];
    if (event.target.checked) {
      cart?.cartItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  const itemChecked = (cartItems, listChecked) => {
    return cartItems.filter(item => listChecked.includes(item.product));
  };

  {/* dùng cho tính toán giá tiền */}
  const rawTotalMemo = useMemo(() => {
    const result = itemChecked(cart?.cartItems, listChecked).reduce((total, current) => {
      return total + (current.price * current.amount);
    }, 0);
  
    return result;
  }, [cart, listChecked]);

  const totalDiscountMemo = useMemo(() => {
    const result = itemChecked(cart?.cartItems, listChecked).reduce((total, current) => {
      return total + (current.price * current.amount) * (current.discount / 100);
    }, 0);
  
    return result;
  }, [cart, listChecked]);

  const shippingFeeMemo = useMemo (() => {
    if(!rawTotalMemo){
      return 0;
    }
    if(rawTotalMemo > 2000000){
      return 0;
    }else if(1000000 <= rawTotalMemo && rawTotalMemo <= 2000000){
      return 15000;
    }else return 30000;
    
  }, [rawTotalMemo])

  const finalPriceMemo = useMemo (() => {
    return (rawTotalMemo - totalDiscountMemo + shippingFeeMemo)*1.1;
  }, [rawTotalMemo, totalDiscountMemo, shippingFeeMemo])


  {/* Thay đổi item trong cart */}
  const UpdateCartItem = async () => {
    if (debouncedChanges.length > 0) {
      await CartService.changeCartItem(
        user?.id,
        user?.access_token,
        debouncedChanges,
        "change"
      );
      setChanges([]);
    }
  };  

  useEffect(() => {
    UpdateCartItem();
  }, [debouncedChanges]);

  const handleIncreaseAmount = (cartItem) => {
    setChanges((prevChanges) => {
      const existingItem = prevChanges.find(
        (item) => item.product === cartItem.product
      );

      if (existingItem) {
        const updatedChanges = prevChanges.map((item) =>
          item.product === cartItem.product
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        return updatedChanges;
      } else {
        return [...prevChanges, { product: cartItem.product, amount: 1 }];
      }
    });

    dispatch(increaseAmount({ idProduct: cartItem.product }));
  };

  const handleDecreaseAmount = (cartItem) => {
    setChanges((prevChanges) => {
      const existingItem = prevChanges.find(
        (item) => item.product === cartItem.product
      );
      if (existingItem) {
        const updatedChanges = prevChanges.map((item) =>
          item.product === cartItem.product
            ? { ...item, amount: item.amount - 1 }
            : item
        );
        return updatedChanges;
      } else {
        return [...prevChanges, { product: cartItem.product, amount: -1 }];
      }
    });

    dispatch(decreaseAmount({ idProduct: cartItem.product }));
  };

  const handleRemoveProducts = async (idProductList) => {
    await CartService.removeCartItem(
      user?.id,
      user?.access_token,
      idProductList
    );
    if (idProductList.length === cart?.cartItems?.length) {
      dispatch(resetCart());
    } else {
      dispatch(removeCartProducts({ idProductList }));
    }
    setListChecked([]);
  };

  {/* Dùng cho Order */}

  const processCreatingOrder = () => {
    // dispatch(selectedOrderItems({ selectedItems: itemChecked(cart?.cartItems, listChecked) }));
    navigate('/payment');
  }

  const handleOnChangeDetailed = (e) => {
    setStateDetailedUser({
      ...stateDetailedUser,
      [e.target.name]: e.target.value, 
    });
  };

  const userInfoProvidingForm = () => {
    setIsModalUpdateInfo(true);
  }

  const handleCancelUpdate = () => {
    setIsModalUpdateInfo(false);
  }

  const handleUpdateOrderInfo = () => {
    console.log("debug", stateDetailedUser)
  }

  const handleChangeShippingAddress = () => {

  }

  //Form hook:
    const [formDrawer] = Form.useForm();

    const [stateDetailedUser, setStateDetailedUser] = useState({
        name: "",
        phone: "",
        address: "",
      });

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div
        style={{
          height: "100%",
          width: "1270px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        <WrapperLeft>
          <h3>Giỏ hàng</h3>
          <WrapperStyleHeader>
            <span style={{ display: "inline-block", width: "390px" }}>
              <Checkbox
                style={{ marginRight: "10px" }}
                onChange={handleOnChangeCheckAll}
                checked={
                  listChecked?.length > 0 &&
                  listChecked?.length === cart?.cartItems?.length
                }
              ></Checkbox>
              <span>Tất cả ({cart?.cartItems.length} Sản phẩm)</span>
            </span>
            <div
              style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>Đơn giá</span>
              <span style={{ alignSelf: "center" }}>Số lượng</span>
              <span>Thành tiền</span>
              {listChecked?.length > 0 && (
                <DeleteOutlined
                  onClick={() => handleRemoveProducts(listChecked)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          </WrapperStyleHeader>

          <WrapperListOrder>
            {cart?.cartItems?.map((cartItem) => {
              return (
                <WrapperItemOrder key={cartItem.product}>
                  <div
                    style={{
                      width: "390px",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Checkbox
                      style={{ marginRight: "10px" }}
                      onChange={onChange}
                      value={cartItem?.product}
                      checked={listChecked?.includes(cartItem?.product)}
                    ></Checkbox>
                    <img
                      src={cartItem?.image}
                      alt="product"
                      style={{
                        width: "77px",
                        height: "79px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginRight: "20px",
                      }}
                    />
                    <div
                      style={{
                        width: "calc(267px)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cartItem?.name}
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr 1fr",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>
                      <span style={{ fontSize: "13px", color: "#242424" }}>
                        {convertPrice(cartItem?.price)}
                      </span>
                      <WrapperPriceDiscount>{`-${cartItem.discount} %`}</WrapperPriceDiscount>
                    </span>
                    <WrapperCountOrder>
                      <button
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor:
                            cartItem?.amount === 1 ? "not-allowed" : "pointer",
                        }}
                        disabled={cartItem?.amount === 1}
                      >
                        <MinusOutlined
                          onClick={() => handleDecreaseAmount(cartItem)}
                        ></MinusOutlined>
                      </button>
                      <WrapperInputNumber
                        value={cartItem?.amount}
                        defaultValue={cartItem?.amount}
                        size="small"
                      ></WrapperInputNumber>
                      <button
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <PlusOutlined
                          onClick={() => handleIncreaseAmount(cartItem)}
                          style={{ color: "#000", fontSize: "10px" }}
                        ></PlusOutlined>
                      </button>
                    </WrapperCountOrder>
                    <span
                      style={{
                        color: "rgb(255,66,78)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {convertPrice(cartItem?.price * cartItem?.amount * (100-cartItem?.discount)/100)}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <DeleteOutlined
                        onClick={() =>
                          handleRemoveProducts([cartItem?.product])
                        }
                        style={{ cursor: "pointer" }}
                      ></DeleteOutlined>
                    </div>
                  </div>
                </WrapperItemOrder>
              );
            })}
          </WrapperListOrder>
        </WrapperLeft>

        <WrapperRight>
          <div style={{ width: "100%", marginTop: "61px" }}>
            <WrapperInfo>
              <div>
                <span>Địa chỉ: </span>
                <span style={{fontWeight:'bold'}}>{user?.address}</span>
                <span onClick={handleChangeShippingAddress} style={{color:'blue', cursor:'pointer'}}>Thay đổi</span>
              </div>
            </WrapperInfo>
            <WrapperInfo style={{marginTop: '10px'}}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Tạm tính</span>
                <span
                  style={{
                    color: "#000",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {convertPrice(rawTotalMemo)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Giảm giá</span>
                <span
                  style={{
                    color: "#000",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {`- ${convertPrice(totalDiscountMemo)}`}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Thuế</span>
                <span
                  style={{
                    color: "#000",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  10%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Phí giao hàng</span>
                <span
                  style={{
                    color: "#000",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {convertPrice(shippingFeeMemo)}
                </span>
              </div>
            </WrapperInfo>

            <WrapperTotal>
              <span>Tổng tiền</span>
              <span style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    color: "rgb(254,56,52)",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {convertPrice(finalPriceMemo)}
                </span>
                <span style={{ color: "#000", fontSize: "11px" }}>
                  {" "}
                  Đã bao gồm thuế
                </span>
              </span>
            </WrapperTotal>
          </div>

          <ButtonComponent
            onClick = {processCreatingOrder}
            disabled={listChecked.length === 0}
            size={40}
            styleButton={{
              background: "rgb(255,57,69)",
              height: "48px",
              width: "350px",
              border: "none",
              borderRadius: "4px",
              marginTop: "5px",
            }}
            textButton={"Mua hàng"}
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperRight>
      </div>
      <ModalComponent title="Cập nhật thông tin người dùng" open={IsModalUpdateInfo} onCancel={handleCancelUpdate} onOk = {handleUpdateOrderInfo} >
      <Form
            name="drawer"
            labelCol={{ span: 4 }} // Cột label chiếm 8 phần
            wrapperCol={{ span: 20 }} // Cột input chiếm 16 phần
            style={{ maxWidth: 600 }} // Chiều rộng tối đa của form
            // onFinish={onUpdateUser} // Tự cấu hình hàm khi submit (POST để gửi form đến url backend)
            autoComplete="on" // Tắt tính năng autocomplete
            form={formDrawer}
          >
            {/* Name field */}
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <InputComponent
                name="name"
                value={stateDetailedUser.name}
                onChange={handleOnChangeDetailed}
              />
            </Form.Item>

            {/* Phone field */}
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <InputComponent
                name="phone"
                value={stateDetailedUser.phone}
                onChange={handleOnChangeDetailed}
              />
            </Form.Item>
            {/* Address field */}
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <InputComponent name="address" value={stateDetailedUser.address} onChange={handleOnChangeDetailed} />
            </Form.Item>
          </Form>
      </ModalComponent>
    </div>
  );
};

export default OrderPage;