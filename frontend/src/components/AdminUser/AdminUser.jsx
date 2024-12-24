import React, { useState, useEffect, useRef } from 'react'
import { WrapperHeader } from './style'
import { Button, Form, Space } from 'antd'
import TableComponent from "../TableComponent/TableComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import InputComponent from "../InputComponent/InputComponent"; 
import DrawerComponent from "../../components/DrawerComponent/DrawerComponent";
import Loading from '../LoadingComponent/Loading';
import { WrapperUploadFile } from '../AdminUser/style';
import * as Message from "../../components/Message/Message";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from '../../hooks/useMutationHook';
import { getBase64} from "../../utils";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from 'react-redux';
import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
  } from "@ant-design/icons";
import moment from 'moment/moment';




const AdminUser = () => {
      /*--- Init ---*/
  //Table content - Check Row Selected
  const [rowSelected, setRowSelected] = useState("");

  //Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [stateDetailedUser, setStateDetailedUser] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
    avatar: "",
    address: "",
  });
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const user = useSelector((state) => state?.user); //retrive from store redux

  //delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //Search
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);


  /*--- Hooks ---*/
  //Update user mutation hooks
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data; 
    const res = UserService.updateUser(
      id,
      token,
      {...rests});
    return res;
   },
  );

  //Delete user mutation hooks
  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data; //gán giá trị các thuộc tính vào biến có cùng tên
    const res = UserService.deleteUser(
      id,
      token);
    return res;
   },
  );

    //Delete many users mutation hooks
    const mutationDeleteMany = useMutationHooks((data) => {
      const { token, ...ids } = data; //gán giá trị các thuộc tính vào biến có cùng tên
      const res = UserService.deleteManyUsers(
        ids,
        token);
      return res;
     },
    );

  //Get mutation props:
  const {
    data: dataUpdated,
    isPending: isPendingUpdated,
    isError: isErrorUpdated,
    isSuccess: isSuccessUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isPending: isPendingDeleted,
    isError: isErrorDeleted,
    isSuccess: isSuccessDeleted,
  } = mutationDelete;
  const {
    data: dataManyDeleted,
    isPending: isPendingManyDeleted,
    isError: isErrorManyDeleted,
    isSuccess: isSuccessManyDeleted,
  } = mutationDeleteMany;

  //Form hook:
  const [formDrawer] = Form.useForm();

  /*--- HANDLE TABLE CONTENTS  ---*/

  //fetch api to get detailed user data
  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected, user?.access_token);
    if (res?.data) {
      setStateDetailedUser({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
        address: res?.data?.address,
        avatar: res?.data?.avatar,
      });
    }
    setIsLoadingUpdate(false);
  };

  //Handle a detailed user
  const handleDetailedUser = () => {
    setIsDrawerOpen(true);
  };

  //Render Action
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "24px", cursor: "pointer" }}
          onClick={() => setIsDeleteModalOpen(true)}
        />
        <EditOutlined
          style={{
            color: "orange",
            fontSize: "24px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
          onClick={handleDetailedUser}
        />
      </div>
    );
  };

  //Lấy thông tin toàn bộ người dùng
  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token);
    return res;
  };
  

  //Query
  const queryUser = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const { isPending: isLoadingUsers, data: users } = queryUser; 

  /*--- Handle Drawer ---*/

  const handleOnChangeDetailed = (e) => {
    setStateDetailedUser({
      ...stateDetailedUser,
      [e.target.name]: e.target.value, //Thay đổi giá trị của trường tương ứng và giữ nguyên giá trị các trường còn lại
    });
  };

  const handleOnchangeAvatarDetail = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj); //chuyển ảnh thành URL tạm thời để có thể hiển thị ảnh ngay lập tức
    }

    setStateDetailedUser({
      ...stateDetailedUser,
      avatar: file.preview,
    });
  };

  const onUpdateUser = () => { 
    mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateDetailedUser}, {
      onSettled : () =>{
        queryUser.refetch();
      }

    })
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setStateDetailedUser({
      name: "",
      type: "",
      phone: "",
      address: "",
      isAdmin: false,
    });
    formDrawer.resetFields();
  };

  /*--- Handle Delete Modal ---*/
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteUser = () => {
    mutationDelete.mutate({id: rowSelected, token: user?.access_token},{
      onSettled: () => {
        queryUser.refetch();
      }
    });
  }

  const handleDeleteManyUsers = (ids) => {
    console.log("debug _ ids duoc truyen vao ham handleDeleteMany", {ids})
    mutationDeleteMany.mutate({ids: ids, token: user?.access_token},{
      onSettled: () => {
        queryUser.refetch();
      }
    });
  }

  /*--- Handle Search ---*/

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText("");
    confirm();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()} // Ngăn không truyền tín hiệu (onkeydown) lên các phần tử cha
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  /*--- Handle Column and Row of Table ---*/
  //Column Processing
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      filters: [
    {
      text: "Yes",
      value: true,
    },
    {
      text: "No",
      value: false,
    },
  ],
  onFilter: (value, record) => {
    return record.isAdmin === value;
  },
  render: (isAdmin) => (isAdmin ? "Yes" : "No"),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (createdAt) => moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
      render: (updatedAt) => moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  //Row data Processing
  const dataTable =
    users?.data?.length &&
    users?.data?.map((user) => {
      return { ...user, key: user._id }; 
    });

  /*--- Handle Effect ---*/
  //Effect sau khi apply trên wrapper form
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      Message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      Message.error();
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  //Effect hiển thị dữ liệu vào form của drawer
  useEffect(() => {
    formDrawer.setFieldsValue(stateDetailedUser);
  }, [formDrawer, stateDetailedUser]);

  //Dùng effect sau khi chọn row
  useEffect(() => {
    if (rowSelected && isDrawerOpen) {
      setIsLoadingUpdate(true);
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected, isDrawerOpen]);

  //Dùng effect sau khi chọn trên delete modal
  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      Message.success();
      handleDeleteCancel();
    } else if (isErrorDeleted) {
      Message.error();
    }
  }, [isSuccessDeleted, isErrorDeleted]);

    //Dùng effect sau khi chọn trên delete many modal
    useEffect(() => {
      if (isSuccessManyDeleted && dataManyDeleted?.status === "OK") {
        Message.success();
      } else if (isErrorManyDeleted) {
        Message.error();
      }
    }, [isSuccessManyDeleted]);

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <TableComponent
          handleDeleteMany={handleDeleteManyUsers}
          columns={columns}
          data={dataTable}
          isLoading={isLoadingUsers} 
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id); //truyền id của đối tượng được nhấn vào trong rowselected
              },
            };
          }}
        />
      </div>
      <DrawerComponent
        title="Chi tiết người dùng"
        forceRender 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        width="70%"
      >
        <Loading isLoading={isLoadingUpdate || isPendingUpdated}>
          <Form
            name="drawer"
            labelCol={{ span: 5 }} // Cột label chiếm 8 phần
            wrapperCol={{ span: 19 }} // Cột input chiếm 16 phần
            style={{ maxWidth: 600 }} // Chiều rộng tối đa của form
            onFinish={onUpdateUser} // Tự cấu hình hàm khi submit (POST để gửi form đến url backend)
            autoComplete="on" // Tắt tính năng autocomplete
            form={formDrawer}
          >
            {/* Name field */}
            <Form.Item
              label="Name"
              name="name"
            >
              <InputComponent
                name="name"
                value={stateDetailedUser.name}
                onChange={handleOnChangeDetailed}
              />
            </Form.Item>

            {/* Email field */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
              ]}
            >
              <InputComponent
                name="email"
                value={stateDetailedUser.email}
                onChange={handleOnChangeDetailed}
              />
            </Form.Item>

            {/* Phone field */}
            <Form.Item
              label="Phone"
              name="phone"
            >
              <InputComponent
                name="phone"
                value={stateDetailedUser.phone}
                onChange={handleOnChangeDetailed}
              />
            </Form.Item>
            {/* Is Admin field */}
            {/* <Form.Item
              label="isAdmin"
              name="isAdmin"
              rules={[
                { required: true, message: "Is this an admin account ?" },
              ]}
            >
              <InputComponent
                name="isAdmin"
                value={stateDetailedUser.isAdmin}
                onChange={handleOnChangeDetailed}
              />
            </Form.Item> */}
            {/* Address field */}
            <Form.Item
              label="Address"
              name="address"
            >
              <InputComponent name="address" value={stateDetailedUser.address} onChange={handleOnChangeDetailed} />
            </Form.Item>
          {/* Avatar Field*/}
            <Form.Item
              label="Avatar"
              name="avatar"
            >
              <WrapperUploadFile
                beforeUpload={() => false}
                onChange={handleOnchangeAvatarDetail}
                maxCount={1}
              >
                <Button>Select File</Button>
                {stateDetailedUser.avatar && ( //Nhúng: nếu tồn tại avatar thì hiển thị
                  <img
                    src={stateDetailedUser?.avatar}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            {/* Submit button */}
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent
        forceRender
        title="Xoá người dùng"
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel} //Vẫn phải giữ lại để thực hiện cancel thông qua ESC hoặc nút X
        onOk={handleDeleteUser}
      >
        <Loading isLoading={isPendingDeleted}>
          <div>Bạn có chắc muốn xoá tài khoản này không?</div>
        </Loading>
      </ModalComponent>
    </div>



    
  )
}

export default AdminUser