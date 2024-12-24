import { Button, Form, Space } from "antd";
import React, { useEffect, useState, useRef } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import * as ProductService from "../../services/ProductService";
import * as Message from "../../components/Message/Message";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { getBase64, renderOption } from "../../utils";
import Loading from "../../components/LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../../components/DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import { Select } from "antd";

const AdminProduct = () => {
  /*--- Init ---*/
  //POP-UP - Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productState, setProductState] = useState({
    name: "",
    type: "",
    countInStock: "",
    price: "",
    rating: "",
    description: "",
    image: "",
    newType: "",
    discount:"",
  });

  //Table content - Check Row Selected
  const [rowSelected, setRowSelected] = useState("");

  //Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [stateDetailedProduct, setStateDetailedProduct] = useState({
    name: "",
    type: "",
    rating: "",
    countInStock: "",
    description: "",
    price: "",
    image: "",
    discount: ""
  });
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const user = useSelector((state) => state?.user);

  //delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //Search
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  //Select
  const [typeSelect, setTypeSelect] = useState("");

  /*--- Hooks ---*/
  //Create product mutation hooks
  const mutation = useMutationHooks((data) => {
    const { name, type, countInStock, price, rating, description,discount, image } =
      data; //gán giá trị các thuộc tính vào biến có cùng tên
    const res = ProductService.createProduct({
      name,
      type,
      countInStock,
      price,
      rating,
      description,
      discount,
      image,
    });
    return res;
  });

  //Update product mutation hooks
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data; 
    const res = ProductService.updateProduct(
      id,
      token,
      {...rests});
    return res;
   },
  );

  //Delete product mutation hooks
  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data; //gán giá trị các thuộc tính vào biến có cùng tên
    const res = ProductService.deleteProduct(
      id,
      token);
    return res;
   },
  );

  //Delete many products mutation hooks
  const mutationDeleteMany = useMutationHooks((data) => {
    const { token, ...ids } = data; //gán giá trị các thuộc tính vào biến có cùng tên
    const res = ProductService.deleteManyProducts(
      ids,
      token);
    return res;
   },
  );

  //Get mutation props:
  const { data, isPending, isError, isSuccess } = mutation;
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
  const [form] = Form.useForm(); //Dùng form hook để tạo instance của Form -> form
  const [formDrawer] = Form.useForm();


  //handle delete many
  const handleDeleteManyProduct = (ids) => {
    mutationDeleteMany.mutate({ids: ids, token: user?.access_token}, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  /*--- HANDLE FORM ---*/

  //Input Form func
  const handleOnChange = (e) => {
    setProductState({
      ...productState,
      [e.target.name]: e.target.value, //Thay đổi giá trị của trường tương ứng và giữ nguyên giá trị các trường còn lại
    });
  };

  //Image Upload Func
  const handleImageInput = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj); //chuyển ảnh thành URL tạm thời để có thể hiển thị ảnh ngay lập tức
    }

    setProductState({
      ...productState,
      image: file.preview,
    });
  };

  //Configure Submit func
  const onFinish = () => {
    const params = {
      name: productState.name,
      type: productState.type === 'add_type' ? productState.newType : productState.type,
      countInStock: productState.countInStock,
      price: productState.price,
      rating: productState.rating,
      description: productState.description,
      discount: productState.discount,
      image: productState.image,
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setProductState({
      name: "",
      type: "",
      countInStock: "",
      price: "",
      rating: "",
      description: "",
      discount: "",
      image: "",
    });
    form.resetFields();
  };

  //Type Selection
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };

  const handleChangeSelect = (value) => { 
      setProductState({
        ...productState,
        type: value,
      })
  };

  /*--- HANDLE TABLE CONTENTS  ---*/

  //fetch api to get detailed product data
  const fetchGetDetailedProduct = async (rowSelected) => {
    const res = await ProductService.getDetailedProduct(rowSelected);
    if (res?.data) {
      setStateDetailedProduct({
        name: res?.data?.name,
        type: res?.data?.type,
        rating: res?.data?.rating,
        countInStock: res?.data?.countInStock,
        description: res?.data?.description,
        discount: res?.data?.discount,
        price: res?.data?.price,
        image: res?.data?.image,
      });
    }
    setIsLoadingUpdate(false);
  };

  //Handle a detailed product
  const handleDetailedProduct = () => {
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
          onClick={handleDetailedProduct}
        />
      </div>
    );
  };

  //Get Products
  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct(undefined, 0);
    return res;
  };

  //Query
  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const typeProduct = useQuery({
    queryKey: ["type-product"],
    queryFn: fetchAllTypeProduct,
  });

  const { isPending: isLoadingProducts, data: products } = queryProduct;

  /*--- Handle Drawer ---*/

  const handleOnChangeDetailed = (e) => {
    setStateDetailedProduct({
      ...stateDetailedProduct,
      [e.target.name]: e.target.value, //Thay đổi giá trị của trường tương ứng và giữ nguyên giá trị các trường còn lại
    });
  };

  const handleImageInputDetailed = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj); //chuyển ảnh thành URL tạm thời để có thể hiển thị ảnh ngay lập tức
    }

    setStateDetailedProduct({
      ...stateDetailedProduct,
      image: file.preview,
    });
  };

  const onUpdateProduct = () => { 
    mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateDetailedProduct}, {
      onSettled : () =>{
        queryProduct.refetch();
      }

    })
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setStateDetailedProduct({
      name: "",
      type: "",
      countInStock: "",
      price: "",
      rating: "",
      description: "",
      discount: "",
      image: "",
    });
    formDrawer.resetFields();
  };

  /*--- Handle Delete Modal ---*/
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteProduct = () => {
    mutationDelete.mutate({id: rowSelected, token: user?.access_token},{
      onSettled: () => {
        queryProduct.refetch();
      }
    });
  }

  const handleDeleteManyProducts = (ids) => {
    console.log("debug _ ids duoc truyen vao ham handleDeleteMany", {ids})
    mutationDeleteMany.mutate({ids: ids, token: user?.access_token},{
      onSettled: () => {
        queryProduct.refetch();
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
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 500,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: "> 500000",
          value: ">",
        },
        {
          text: "= 500000",
          value: "=",
        },
        {
          text: "< 500000",
          value: "<",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">") {
          return record.price > 500000;
        } else if (value === "<") {
          return record.price < 500000;
        } else {
          return record.price == 500000;
        }
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: "0-1 sao",
          value: "0-1",
        },
        {
          text: "1-2 sao",
          value: "1-2",
        },
        {
          text: "2-3 sao",
          value: "2-3",
        },
        {
          text: "3-4 sao",
          value: "3-4",
        },
        {
          text: "4-5 sao",
          value: "4-5",
        },
      ],
      onFilter: (value, record) => {
        const [min, max] = value.split("-").map(Number); // Chia giá trị thành khoảng
        return record.rating >= min && record.rating <= max; // Lọc trong khoảng
      },
    },
    {
      title: 'Count In Stock',
      dataIndex: 'countInStock',
      sorter: (a, b) => a.countInStock - b.countInStock,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: "Type",
      dataIndex: "type",
      filters: isLoadingProducts
        ? []
        : typeProduct?.data?.data?.map((typeName) => ({
            text: typeName, 
            value: typeName, 
          })),
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  //Row data Processing
  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id }; // Duyệt qua mỗi phần tử trong mảng products, thêm vào dữ liệu mỗi phần tử này một thuộc tính key với giá trị của key
      // tương đương _id của đối tượng đó ==> Tạo mảng mới và gán cho data
    });

  /*--- Handle Effect ---*/

  //Effect after submit
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      Message.success();
      handleCancel();
    } else if (isError) {
      Message.error();
    }
  }, [isSuccess]);

  //Effect sau khi apply trên wrapper form
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      Message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      Message.error();
    }
  }, [isSuccessUpdated]);

  //Effect hiển thị dữ liệu vào form của drawer
  useEffect(() => {
    formDrawer.setFieldsValue(stateDetailedProduct);
  }, [formDrawer, stateDetailedProduct]);

  //Dùng effect sau khi chọn row
  useEffect(() => {
    if (rowSelected && isDrawerOpen) {
      setIsLoadingUpdate(true);
      fetchGetDetailedProduct(rowSelected);
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
  }, [isSuccessDeleted]);

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
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          handleDeleteMany={handleDeleteManyProducts}
          columns={columns}
          data={dataTable}
          isLoading={isLoadingProducts}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id); //truyền id của đối tượng được nhấn vào trong rowselected
              },
            };
          }}
        />
      </div>
      <ModalComponent
        title="Tạo sản phẩm mới"
        forceRender //Đối tượng này được hook ở trên trước khi các tp con của nó được tải => dùng để pre-render children
        open={isModalOpen}
        onCancel={handleCancel} //Vẫn phải giữ lại để thực hiện cancel thông qua ESC hoặc nút X
        footer={null}
      >
        <Loading isLoading={isPending}>
          <Form
            name="basic"
            form={form}
            labelCol={{ span: 6 }} // Cột label chiếm 8 phần
            wrapperCol={{ span: 18 }} // Cột input chiếm 16 phần
            style={{ maxWidth: 600 }} // Chiều rộng tối đa của form
            onFinish={onFinish} // Tự cấu hình hàm khi submit (POST để gửi form đến url backend)
            autoComplete="on" // Tắt tính năng autocomplete
          >
            {/* Name field */}
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input name of product!" },
              ]}
            >
              <InputComponent
                name="name"
                value={productState.name}
                onChange={handleOnChange}
              />
            </Form.Item>

            {/* Type field */}
                {/* Type selection */}
            <Form.Item
              label="Type"
              name="type"
              rules={[
                { required: true, message: "Please input type of product!" },
              ]}
            >
              <Select
                name={typeSelect !== "add_type" ? "type" : ""}
                value={productState.type}
                onChange={handleChangeSelect}
                options={renderOption(typeProduct?.data?.data)}
              />
            </Form.Item>

                {/* Add Type form */}
            {productState.type === "add_type" && (
              <Form.Item
                label='New Type'
                name="newType"
                rules={[
                  { required: true, message: "Please input type of product!" },
                ]}
              >
                  <InputComponent
                    value={productState.newType}
                    onChange={handleOnChange}
                    name="newType"
                  />
              </Form.Item>
            )}

            {/* CountInStock field */}
            <Form.Item
              label="Count In Stock"
              name="countInStock"
              rules={[
                { required: true, message: "Please input number of products!" },
              ]}
            >
              <InputComponent
                name="countInStock"
                value={productState.countInStock}
                onChange={handleOnChange}
              />
            </Form.Item>

            {/* Price field */}
            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Please input price of product!" },
              ]}
            >
              <InputComponent
                name="price"
                value={productState.price}
                onChange={handleOnChange}
              />
            </Form.Item>

            {/* Rating field */}
            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                { required: true, message: "Please input rating of product!" },
              ]}
            >
              <InputComponent
                name="rating"
                value={productState.rating}
                onChange={handleOnChange}
              />
            </Form.Item>

            {/* Description field */}
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input description of product!",
                },
              ]}
            >
              <InputComponent
                name="description"
                value={productState.description}
                onChange={handleOnChange}
              />
            </Form.Item>

            {/* Discount field */}
            <Form.Item
              label="Discount"
              name="discount"
            >
              <InputComponent
                name="discount"
                value={productState.discount}
                onChange={handleOnChange}
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please choose image",
                },
              ]}
            >
              <WrapperUploadFile
                beforeUpload={() => false}
                onChange={handleImageInput}
                maxCount={1}
              >
                <Button>Select File</Button>
                {productState.image && ( //Nhúng: nếu tồn tại image thì hiển thị
                  <img
                    src={productState?.image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="product image"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            {/* Submit button */}
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>

      <DrawerComponent
        title="Chi tiết sản phẩm"
        forceRender //Đối tượng này được hook ở trên trước khi các tp con của nó được tải => dùng để pre-render children
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
            onFinish={onUpdateProduct} // Tự cấu hình hàm khi submit (POST để gửi form đến url backend)
            autoComplete="on" // Tắt tính năng autocomplete
            form={formDrawer}
          >
            {/* Name field */}
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input name of product!" },
              ]}
            >
              <InputComponent
                name="name"
                value={stateDetailedProduct.name}
                onChange={handleOnChangeDetailed}
              />
            </Form.Item>

            {/* Type field */}
            <Form.Item
              label="Type"
              name="type"
              rules={[
                { required: true, message: "Please input type of product!" },
              ]}
            >
              <InputComponent
                name="type"
                value={stateDetailedProduct.type}
                onChange={handleOnChangeDetailed}
              />
            </Form.Item>

            {/* CountInStock field */}
            <Form.Item
              label="Count In Stock"
              name="countInStock"
              rules={[
                { required: true, message: "Please input number of products!" },
              ]}
            >
              <InputComponent
                name="countInStock"
                value={stateDetailedProduct.countInStock}
                onChange={handleOnChangeDetailed}
              />
            </Form.Item>

            {/* Price field */}
            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Please input price of product!" },
              ]}
            >
              <InputComponent
                name="price"
                value={stateDetailedProduct.price}
                onChange={handleOnChangeDetailed}
              />
            </Form.Item>

            {/* Rating field */}
            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                { required: true, message: "Please input rating of product!" },
              ]}
            >
              <InputComponent
                name="rating"
                value={stateDetailedProduct.rating}
                onChange={handleOnChangeDetailed}
              />
            </Form.Item>

            {/* Description field */}
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input description of product!",
                },
              ]}
            >
              <InputComponent
                name="description"
                value={stateDetailedProduct.description}
                onChange={handleOnChangeDetailed}
              />
            </Form.Item>

            {/* Discount field */}
            <Form.Item
              label="Discount"
              name="discount"
            >
              <InputComponent
                name="discount"
                value={stateDetailedProduct.discount}
                onChange={handleOnChangeDetailed}
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please choose image",
                },
              ]}
            >
              <WrapperUploadFile
                beforeUpload={() => false}
                onChange={handleImageInputDetailed}
                maxCount={1}
              >
                <Button>Select File</Button>
                {stateDetailedProduct.image && ( //Nhúng: nếu tồn tại image thì hiển thị
                  <img
                    src={stateDetailedProduct?.image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="product image"
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
        title="Xoá sản phẩm"
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel} //Vẫn phải giữ lại để thực hiện cancel thông qua ESC hoặc nút X
        onOk={handleDeleteProduct}
      >
        <Loading isLoading={isPendingDeleted}>
          <div>Bạn có chắc muốn xoá sản phẩm này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;