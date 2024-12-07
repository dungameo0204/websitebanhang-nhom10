import React, { useState } from 'react'
import { Menu } from 'antd'
import { getItem } from '../../untils';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons'

const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'sub1', <UserOutlined />, [
            getItem('Option 1', '1'),
            getItem('Option 2', '2'),
            getItem('Option 3', '3'),
            getItem('Option 4', '4'),
        ]),
        getItem('Sản phẩm', 'sub2', <AppstoreOutlined />, [
            getItem('Option 5', '5'),
            getItem('Option 6', '6'),
            getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
        ])
    ];
    const rootSubmenuKeys = ['user', 'product'];
    const [openKeys, setOpenKeys] = useState(['user']);
    const [keySelected, setKeySelected] = useState('');
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }

    };

    const handleOnclick = ({ key }) => {
        setKeySelected(key);

    }

    return (
        <div style={{ display: 'flex' }}>
            <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{
                    width: 256,
                }}
                items={items}
                onClick={handleOnclick}
            />
            <div style={{ flex: 1 }}>
                {keySelected === '6' && <span>Key la 6</span>}
                <span>test</span>
            </div>
        </div>

    )
}

export default AdminPage