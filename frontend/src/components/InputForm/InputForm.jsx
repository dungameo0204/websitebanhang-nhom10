import React, { useState } from "react";
import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
  const [valueInput, setValueInput] = useState("");
  const { placeholder = "Nhập text", ...rest } = props;
  return (
    <WrapperInputStyle
      placeholder={placeholder}
      valueInput={valueInput}
      {...rest}
    ></WrapperInputStyle>
  );
};

export default InputForm;
