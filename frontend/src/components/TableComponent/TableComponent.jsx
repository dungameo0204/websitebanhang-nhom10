import React, { useState } from "react";
import { Dropdown, Space, Table } from "antd";
import Loading from "../../components/LoadingComponent/Loading";
import { DownOutlined } from "@ant-design/icons";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import moment from "moment";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    columns = [],
    data = [],
    isLoading = false,
    handleDeleteMany,
  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

  //Khi người dùng thay đổi lựa chọn hàng (row) bằng checkbox
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setRowSelectedKeys(selectedRowKeys);
    },

    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // vô hiệu hoá check box với đối tượng hàng có tên là "Disabled User"
      name: record.name, //Đặt tên checkbox là tên đối tượng hàng
    }),
  };
  
  {/* For Dropdown*/}
  {/* For EXCEL*/}
  const formatCellValue = (col, value) => {
    if (col === 'createdAt' || col === 'updatedAt') {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    }
    if (col === 'isAdmin') {
      return value ? 'Yes' : 'No';
    }
    return value;
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Downloaded Sheet");

    const exportColumns = columns.filter(col => col.dataIndex !== 'action'); //bỏ column Action
    worksheet.columns = exportColumns.map(col => ({
      header: col.title,
      key: col.dataIndex,
    }));

    data.forEach((row) => {
      const rowData = {};
      exportColumns.forEach((col) => {
        let cellValue = row[col.dataIndex];
        cellValue = formatCellValue(col.dataIndex, cellValue);
        rowData[col.dataIndex] = cellValue;
  
        // Cập nhật chiều dài cột
        const columnLength = (cellValue ? cellValue.toString().length : 0);
        const column = worksheet.getColumn(col.dataIndex);
        column.maxLength = Math.max(column.maxLength || 0, columnLength);
      });
  
      worksheet.addRow(rowData);
    });
  
    // Điều chỉnh chiều rộng cột sau khi đã tính toán
    worksheet.columns.forEach((column) => {
      column.width = Math.max(column.maxLength || column.header.length, column.header.length) + 2; // Thêm khoảng đệm
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "downloaded.xlsx");
  }

  {/* ALL DELETE*/}
  const handleDeleteAll = () => {
    console.log("debug", "delete all ben table duoc goi")
    console.log("debug_cac doi tuong se bi xoa: ", rowSelectedKeys)
    handleDeleteMany(rowSelectedKeys)
  };

  const items = [
    {
      key: "1",
      label: "In ra file excel",
      onClick: exportToExcel,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Xoá toàn bộ mục đã chọn",
      onClick: handleDeleteAll,
      disabled: rowSelectedKeys.length === 0,
    }
  ];

  return (
    <Loading isLoading={isLoading}>
        <div style={{ marginTop: "10px" ,marginBottom: "16px" }}>
          <Dropdown
            menu={{items}}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Tuỳ chọn
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
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