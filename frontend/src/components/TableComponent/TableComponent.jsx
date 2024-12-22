import React, { useState } from "react";
import { Table } from "antd";
import Loading from "../../components/LoadingComponent/Loading";
import { use } from "react";

const TableComponent = (props) => {
  const { selectionType = "checkbox", columns=[], data=[], isLoading=false, handleDeleteManyProducts } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

  //Khi người dùng thay đổi lựa chọn hàng (row) bằng checkbox
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRows);
    },

    // getCheckboxProps: (record) => ({
    //   disabled: record.name === "Disabled User", // vô hiệu hoá check box với đối tượng hàng có tên là "Disabled User"
    //   name: record.name,                         //Đặt tên checkbox là tên đối tượng hàng
    // }),
  };

  const handleDeleteAll = () => { 
    handleDeleteManyProducts(rowSelectedKeys); 
  }

  {/* truyền giá trị biến rowselection vào ...rowselection */ }
  return (
    <Loading isLoading={isLoading}>
      {rowSelectedKeys.length > 0 && (
      <div style={{ marginBottom: 16, textAlign: 'left' }}>
        <button 
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#f5222d', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onClick={handleDeleteAll}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#ff4d4f'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#f5222d'}
        >
          Xóa tất cả
        </button>
      </div>
      )}
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
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