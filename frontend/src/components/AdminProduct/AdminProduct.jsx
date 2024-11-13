import { Button, Modal, Form } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import * as ProductService from "../../services/ProductService";
import * as Message from "../../components/Message/Message";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { getBase64 } from "../../utils";
import Loading from "../../components/LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../../components/DrawerComponent/DrawerComponent";


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
  });

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

  //Use mutation hooks
  const mutation = useMutationHooks((data) => {
    const { name, type, countInStock, price, rating, description, image } =
      data; //gán giá trị các thuộc tính vào biến có cùng tên
    const res = ProductService.createProduct({
      name,
      type,
      countInStock,
      price,
      rating,
      description,
      image,
    });
    return res;
  });

  //Get mutation props:
  const { data, isPending, isError, isSuccess } = mutation;

  //Form hook:
  const [form] = Form.useForm(); //Dùng form hook để tạo instance của Form -> form

  //Configure Submit func
  const onFinish = () => {
    mutation.mutate(productState);
    console.log("check", productState);
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
      image: "",
    });
    form.resetFields();
  };

  /*--- HANDLE TABLE CONTENTS  ---*/

  //fetch api to get detailed product data
  const fetchGetDetailedProduct = async (rowSelected) => {
    const res = ProductService.getDetailedProduct(rowSelected);
    console.log('check fetching func',rowSelected,ProductService.getDetailedProduct(rowSelected) )
    if (res?.data) {
      setStateDetailedProduct({
        name: res?.data?.name,
        type: res?.data?.type,
        rating: res?.data?.rating,
        countInStock: res?.data?.countInStock,
        description: res?.data?.description,
        price: res?.data?.price,
        image: res?.data?.image,
      });
    }
  };

  //Handle a detailed product
  const handleDetailedProduct = () => {
    if (rowSelected) {
      fetchGetDetailedProduct(rowSelected);
      console.log("check", "handle");
    }
    setIsDrawerOpen(true);
  };

  //Render Action
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "24px", cursor: "pointer" }}
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
    const res = await ProductService.getAllProduct();
    return res;
  };

  //Query
  const { isPending: isLoadingProducts, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  //Column Processing
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Type",
      dataIndex: "type",
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

  //Effect hiển thị dữ liệu vào form của drawer
  useEffect(() => {
    console.log('effect form',form)
    form.setFieldsValue(stateDetailedProduct);
  }, [form, stateDetailedProduct]);

  //Dùng effect sau khi chọn row
  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailedProduct(rowSelected);
    }
  }, [rowSelected]);

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
      <Modal
        title="Tạo sản phẩm mới"
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
            <Form.Item
              label="Type"
              name="type"
              rules={[
                { required: true, message: "Please input type of product!" },
              ]}
            >
              <InputComponent
                name="type"
                value={productState.type}
                onChange={handleOnChange}
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
      </Modal>

      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        width="70%"
      >
        <Loading isLoading={isPending}>
          <Form
            name="drawer"
            labelCol={{ span: 5 }} // Cột label chiếm 8 phần
            wrapperCol={{ span: 19 }} // Cột input chiếm 16 phần
            style={{ maxWidth: 600 }} // Chiều rộng tối đa của form
            onFinish={onFinish} // Tự cấu hình hàm khi submit (POST để gửi form đến url backend)
            autoComplete="on" // Tắt tính năng autocomplete
            form={form}
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
    </div>
  );
};

export default AdminProduct;
