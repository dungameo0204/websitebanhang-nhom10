import React from "react";
import { Table } from "antd";
import Loading from "../../components/LoadingComponent/Loading";

const TableComponent = (props) => {
  const { selectionType = "checkbox", columns = [], data = [], isLoading = false } = props;

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

  {/* truyền giá trị biến rowselection vào ...rowselection */ }
  return (
    <Loading isLoading={isLoading}>
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