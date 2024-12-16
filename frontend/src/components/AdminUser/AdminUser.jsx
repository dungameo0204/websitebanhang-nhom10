import React from 'react'
import { WrapperHeader } from './style'
import { Button } from 'antd'
<<<<<<< HEAD
import {PlusCircleFilled} from '@ant-design/icons'
=======
import { PlusCircleFilled, PlusOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
>>>>>>> 05935e58035916abb951a1263c44a139b62d416d

const AdminUser = () => {
  return (
    <div>
<<<<<<< HEAD
        <WrapperHeader>Quản lý người dùng</WrapperHeader>
        <Button><PlusCircleFilled/></Button>
=======
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}><PlusOutlined style={{ fontSize: '40px' }} /></Button>
      <div style={{ margin: '20px' }}>
        <TableComponent />
      </div>

>>>>>>> 05935e58035916abb951a1263c44a139b62d416d
    </div>
  )
}

export default AdminUser
