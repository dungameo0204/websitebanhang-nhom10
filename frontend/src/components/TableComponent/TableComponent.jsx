import React from "react";
import { Table } from "antd";
import Loading from "../../components/LoadingComponent/Loading";

const TableComponent = (props) => {
<<<<<<< HEAD
  const { selectionType = "checkbox", columns=[], data=[], isLoading=false } = props;
=======
  const { selectionType = 'checkbox' } = props

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sydney No. 1 Lake Park',
    },
  ];
>>>>>>> 05935e58035916abb951a1263c44a139b62d416d

  //Khi người dùng thay đổi lựa chọn hàng (row) bằng checkbox
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },

    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // vô hiệu hoá check box với đối tượng hàng có tên là "Disabled User"
      name: record.name,                         //Đặt tên checkbox là tên đối tượng hàng
    }),
  };

  {/* truyền giá trị biến rowselection vào ...rowselection */}
  return (
    <Loading isLoading= {isLoading}>
      <Table
      rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}
      columns={columns}
      dataSource={data}
      {...props}
      />
    </Loading>
  );
};

export default TableComponent;
