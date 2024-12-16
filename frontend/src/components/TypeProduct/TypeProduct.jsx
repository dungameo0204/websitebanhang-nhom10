import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const TypeProduct = ({ name }) => {
  const navigate = useNavigate();

  const handleNavigateType = (type) => {
    navigate(`/product/${type?.replace(/ /g,"_")}`, {state: type});

    /*--- Thay bằng câu lệnh dưới nếu product type dùng tiếng Việt*/ 
    // navigate(
    //   `/product/${type
    //     .normalize("NFD")
    //     .replace(/[\u0300- \u036f]/g, "")
    //     ?.replace(/ /g, "_")}`
    // );
  };

  return (
    <div
      style={{ padding: "0 10px", cursor: "pointer" }}
      onClick={() => handleNavigateType(name)}
    >
      {name}
    </div>
  );
};

export default TypeProduct;
