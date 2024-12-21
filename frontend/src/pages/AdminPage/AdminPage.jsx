<<<<<<< HEAD
import React, { useState } from 'react'
import { Menu } from 'antd'
import { getItem } from '../../untils';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';

const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />,),
        getItem('Sản phẩm', 'Product', <AppstoreOutlined />,)
    ];

    const [keySelected, setKeySelected] = useState('');

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
    }
    const handleOnclick = ({ key }) => {
        setKeySelected(key);
=======
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
>>>>>>> 9ef70801a3fceb2bc5da36913b2bb2b6db70ac44

  const onOpenChange = (keys) => {
    const lastestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(lastestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(lastestOpenKey ? [lastestOpenKey] : []);
    }
  };

<<<<<<< HEAD
    return (
        <>
            <HeaderComponent />
            <div style={{ display: 'flex' }}>
                <Menu
                    mode="inline"

                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: ' 100vh',

                    }}
                    items={items}
                    onClick={handleOnclick}
                />
                <div style={{ flex: 1, padding: '15px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>

=======
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
>>>>>>> 9ef70801a3fceb2bc5da36913b2bb2b6db70ac44

export default AdminPage;