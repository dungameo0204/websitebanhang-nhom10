import React, { useState } from "react";
import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
  const { placeholder = "Nhập text", ...rest } = props;
  const handleOnChangeInput = (e) => {
    props.onChange(e.target.value);
  };
  return (
    <WrapperInputStyle
      placeholder={placeholder}
      value={props.value}
      {...rest}
      onChange={handleOnChangeInput}
    ></WrapperInputStyle>
  );
};

export default InputForm;
