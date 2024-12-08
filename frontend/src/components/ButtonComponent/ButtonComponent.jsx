import { Button } from "antd";
import React from "react";

const ButtonComponent = ({
  size,
  styleButton,
  styleTextButton,
  textButton,
  disabled = false, // Đặt giá trị mặc định cho disabled
  ...rest
}) => {
  return (
    <Button
      style={{
        ...styleButton,
        background: disabled ? "#ccc" : styleButton?.background,
      }}
      size={size}
      disabled={disabled} // Truyền prop disabled vào Button
      {...rest}
    >
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  );
};

export default ButtonComponent;
