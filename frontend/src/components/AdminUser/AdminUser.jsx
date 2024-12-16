import React from 'react'
import { WrapperHeader } from './style'
import { Button } from 'antd'
import {PlusCircleFilled} from '@ant-design/icons'

const AdminUser = () => {
  return (
    <div>
        <WrapperHeader>Quản lý người dùng</WrapperHeader>
        <Button><PlusCircleFilled/></Button>
    </div>
  )
}

export default AdminUser