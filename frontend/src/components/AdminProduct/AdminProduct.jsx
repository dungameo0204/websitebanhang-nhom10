import { Button, Form, Space } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
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
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";


const AdminProduct = () => {

///////////////////////////Xoá những func dưới sau khi đã update token
const onUpdateProduct= () => {
  mutationUpdate.mutate({id: rowSelected, productData: stateDetailedProduct}, {
    onSettled : () =>{
      queryProduct.refetch();
    }

  });
}

const mutationUpdate = useMutationHooks((data) => {
  const { id, productData } = data; //gán giá trị các thuộc tính vào biến có cùng tên
  const res = ProductService.updateProduct(
    id,
    productData
  );
  return res;
});

const mutationDelete = useMutationHooks((id) => { /////////////////////////////////////////////// Mở lại sau khi đã có token
    const res = ProductService.deleteProduct(id);
    return res;
  },
);

const handleDeleteProduct = () => {
  mutationDelete.mutate(rowSelected, {
    onSettled : () =>{
      queryProduct.refetch();
    }

  });
}

///////////////////////////////////////////////////////////

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
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  // const user = useSelector((state) => state?.user); //////////////////////////////////////////// Mở lại sau khi đã có token

  //delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //Search
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  /*--- Hooks ---*/
  //Create product mutation hooks
  const mutation = useMutationHooks((data) => {
      const { name, type, countInStock, price, rating, description, image } = data; //gán giá trị các thuộc tính vào biến có cùng tên
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

  //Update product mutation hooks
  // const mutationUpdate = useMutationHooks((data) => { /////////////////////////////////////////////// Mở lại sau khi đã có token
  //   const { id, token, ...rests } = data; //gán giá trị các thuộc tính vào biến có cùng tên
  //   const res = ProductService.updateProduct(
  //     id, 
  //     token,
  //     {...rests});
  //   return res;
  //  },
  // );

  //Delete product mutation hooks
  // const mutationDelete = useMutationHooks((data) => { /////////////////////////////////////////////// Mở lại sau khi đã có token
  //   const { id, token } = data; //gán giá trị các thuộc tính vào biến có cùng tên
  //   const res = ProductService.deleteProduct(
  //     id, 
  //     token);
  //   return res;
  //  },
  // );


  //Get mutation props:
  const { data, isPending, isError, isSuccess } = mutation;
  const { data: dataUpdated, isPending: isPendingUpdated, isError: isErrorUpdated, isSuccess: isSuccessUpdated } = mutationUpdate;
  const { data: dataDeleted, isPending: isPendingDeleted, isError: isErrorDeleted, isSuccess: isSuccessDeleted } = mutationDelete;

  
  //Form hook:
  const [form] = Form.useForm(); //Dùng form hook để tạo instance của Form -> form
  const [formDrawer] = Form.useForm();


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
    mutation.mutate(productState , {
      onSettled : () =>{
        queryProduct.refetch();
      }

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
      image: "",
    });
    form.resetFields();
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
    const res = await ProductService.getAllProduct();
    return res;
  };

  //Query
  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
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

  // const onUpdateProduct = () => { /////////////////////////////////////////////////////////////////////// Mở lại hàm sau khi đã thêm script kiểm tra token
  //   mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateDetailedProduct}, {
  //     onSettled : () =>{
  //       queryProduct.refetch();
  //     }

  //   })
  // }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setStateDetailedProduct({
      name: "",
      type: "",
      countInStock: "",
      price: "",
      rating: "",
      description: "",
      image: "",
    });
    formDrawer.resetFields();
  };


  /*--- Handle Delete Modal ---*/
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  }

  // const handleDeleteProduct = () => {/////////////////////////////////////////////////////////////////////// Mở lại hàm sau khi đã thêm script kiểm tra token
  //   mutationDelete.mutate({id: rowSelected, token: user?.access_token},{
  //     onSettled: () => {
  //       queryProduct.refetch();
  //     }
  //   });
  // }


  /*--- Handle Search ---*/

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };


  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText('');
    confirm();
  };


  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}   // Ngăn không truyền tín hiệu (onkeydown) lên các phần tử cha
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
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
            onClick={() => clearFilters && handleReset(clearFilters,confirm)}
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
          color: filtered ? '#1677ff' : undefined,
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
      sorter: (a,b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a,b) => a.price - b.price,
      filters: [
        {
          text: '> 500000',
          value: '>',
        },
        {
          text: '= 500000',
          value : '='
        },
        {
          text: '< 500000',
          value: '<',
        },
      ],
      onFilter: (value, record) => {
        if(value === '>'){
          return record.price > 500000;
        } else if (value === '<'){
          return record.price < 500000;
        } else{
          return record.price == 500000;
        }
        }
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a,b) => a.rating - b.rating,
      filters: [
        {
          text: '> 4.7',
          value: '>',
        },
        {
          text: '= 4.7',
          value : '='
        },
        {
          text: '< 4.7',
          value: '<',
        },
      ],
      onFilter: (value, record) => {
        if(value === '>'){
          return record.rating > 4.7;
        } else if (value === '<'){
          return record.rating < 4.7;
        } else{
          return record.rating == 4.7;
        }
        }
    },
    {
      title: "Type",
      dataIndex: "type",
      ...getColumnSearchProps('type')
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
    if (rowSelected) {
      setIsLoadingUpdate(true);
      fetchGetDetailedProduct(rowSelected);
    }
  }, [rowSelected]);

  //Dùng effect sau khi chọn trên delete modal
   useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      Message.success();
      handleDeleteCancel();
    } else if (isErrorDeleted) {
      Message.error();
    }
  }, [isSuccessDeleted]);



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
        title="Xoá sản phẩm"
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel} //Vẫn phải giữ lại để thực hiện cancel thông qua ESC hoặc nút X
        onOk = {handleDeleteProduct}
      >
        <Loading isLoading={isPendingDeleted}>
          <div>Bạn có chắc xoá sản phẩm không?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;