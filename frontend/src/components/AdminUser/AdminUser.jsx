import React from 'react'
import { WrapperHeader } from './style'
import { Button } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'

const AdminUser = () => {
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <Button><PlusCircleFilled /></Button>
      <div style={{ margin: '20px' }}>
        <TableComponent />
      </div>

    </div>

  )
}

export default AdminUser