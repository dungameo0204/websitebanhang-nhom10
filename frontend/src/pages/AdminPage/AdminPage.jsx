import React, { useState } from "react";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import { Menu } from "antd";

const AdminPage = () => {
  const items = [
    {
      label: "User",
      key: "user",
    },
    {
      label: "Product",
      key: "product",
    },
  ];

  const rootSubmenuKeys = ["user", "product"];
  const [openKeys, setOpenKeys] = useState("user");
  const [keySelected, setKeySelected] = useState("");

<<<<<<< HEAD
  const onOpenChange = (keys) => {
    const lastestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(lastestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(lastestOpenKey ? [lastestOpenKey] : []);
=======
    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (
                    <AdminUser />
                )

            case 'product':
                return (
                    <AdminProduct />
                )
            default:
                return <></>
        }
>>>>>>> 05935e58035916abb951a1263c44a139b62d416d
    }
  };

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      default:
        return <></>;
    }
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: 1, padding: "15px" }}>
          {renderPage(keySelected)}
          {/* Mỗi lần mở một menu, sẽ render trang tương ứng */}
        </div>
      </div>
    </>
  );
};

<<<<<<< HEAD
export default AdminPage;
=======
                    }}
                    items={items}
                    onClick={handleOnclick}
                />
                <div style={{ flex: 1, padding: '15px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>


    )
}

export default AdminPage
>>>>>>> 05935e58035916abb951a1263c44a139b62d416d
