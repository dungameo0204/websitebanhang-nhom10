import React, { useState } from "react";
import { Checkbox } from "antd";
import {
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperPriceDiscount,
  WrapperPriceOrder,
  WrapperRight,
  WrapperTitle,
  WrapperTotalOrder,
} from "./OderPage.style";
import { DeleteOutlined, MinusOutLined, PlusOutlined } from "@ant-design/icons";
import imag from "../../assets/images/oder.png";
import {
  WrapperInputNumber,
  WrapperQualityProduct,
} from "../../components/ProductDetailsComponent/style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";

const OderPage = () => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const handleChangeCount = () => {
    dispatch(increaseAmount({ idProduct }));
  };
  return <div>OderPage</div>;
};

export default OderPage;
