<<<<<<< HEAD
import React from 'react'
import { WrapperHeader } from './style'
import { Button } from 'antd'
import { PlusCircleFilled, PlusOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'

const AdminUser = () => {
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}><PlusOutlined style={{ fontSize: '40px' }} /></Button>
      <div style={{ margin: '20px' }}>
        <TableComponent />
      </div>

    </div>

  )
}
=======
// import React from 'react'
// import { WrapperHeader } from './style'
// import { Button, Form } from 'antd'
// import {PlusCircleFilled, PlusOutlined} from '@ant-design/icons'
// import TableComponent from "../TableComponent/TableComponent";
// import ModalComponent from "../ModalComponent/ModalComponent";
// import InputComponent from "../InputComponent/InputComponent"; 
// import DrawerComponent from "../../components/DrawerComponent/DrawerComponent";
// import Loading from '../LoadingComponent/Loading';
// import { WrapperUploadFile } from '../AdminUser/style';

>>>>>>> 9ef70801a3fceb2bc5da36913b2bb2b6db70ac44

// const AdminUser = () => {
//   return (
//     <div>
//       <WrapperHeader>Quản lý người dùng</WrapperHeader>
//       <div style={{ marginTop: '10px'}}>
//         <Button style={{height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed'}}><PlusOutlined style={{fontSize: '60px'}}></PlusOutlined></Button>
//       </div>
//       <div style={{ marginTop: "20px" }}>
//         <TableComponent
//           columns={columns}
//           data={dataTable}
//           isLoading={isLoadingProducts}
//           onRow={(record, rowIndex) => {
//             return {
//               onClick: (event) => {
//                 setRowSelected(record._id); //truyền id của đối tượng được nhấn vào trong rowselected
//               },
//             };
//           }}
//         />
//       </div>
//       <ModalComponent
//         title="Tạo sản phẩm mới"
//         forceRender //Đối tượng này được hook ở trên trước khi các tp con của nó được tải => dùng để pre-render children
//         open={isModalOpen}
//         onCancel={handleCancel} //Vẫn phải giữ lại để thực hiện cancel thông qua ESC hoặc nút X
//         footer={null}
//       >
//         <Loading isLoading={isPending}>
//           <Form
//             name="basic"
//             form={form}
//             labelCol={{ span: 6 }} // Cột label chiếm 8 phần
//             wrapperCol={{ span: 18 }} // Cột input chiếm 16 phần
//             style={{ maxWidth: 600 }} // Chiều rộng tối đa của form
//             onFinish={onFinish} // Tự cấu hình hàm khi submit (POST để gửi form đến url backend)
//             autoComplete="on" // Tắt tính năng autocomplete
//           >
//             {/* Name field */}
//             <Form.Item
//               label="Name"
//               name="name"
//               rules={[
//                 { required: true, message: "Please input name of product!" },
//               ]}
//             >
//               <InputComponent
//                 name="name"
//                 value={productState.name}
//                 onChange={handleOnChange}
//               />
//             </Form.Item>

//             {/* Type field */}
//                 {/* Type selection */}
//             <Form.Item
//               label="Type"
//               name="type"
//               rules={[
//                 { required: true, message: "Please input type of product!" },
//               ]}
//             >
//               <Select
//                 name={typeSelect !== "add_type" ? "type" : ""}
//                 value={productState.type}
//                 onChange={handleChangeSelect}
//                 options={renderOption(typeProduct?.data?.data)}
//               />
//             </Form.Item>

//                 {/* Add Type form */}
//             {productState.type === "add_type" && (
//               <Form.Item
//                 label='New Type'
//                 name="newType"
//                 rules={[
//                   { required: true, message: "Please input type of product!" },
//                 ]}
//               >
//                   <InputComponent
//                     value={productState.newType}
//                     onChange={handleOnChange}
//                     name="newType"
//                   />
//               </Form.Item>
//             )}

//             {/* CountInStock field */}
//             <Form.Item
//               label="Count In Stock"
//               name="countInStock"
//               rules={[
//                 { required: true, message: "Please input number of products!" },
//               ]}
//             >
//               <InputComponent
//                 name="countInStock"
//                 value={productState.countInStock}
//                 onChange={handleOnChange}
//               />
//             </Form.Item>

//             {/* Price field */}
//             <Form.Item
//               label="Price"
//               name="price"
//               rules={[
//                 { required: true, message: "Please input price of product!" },
//               ]}
//             >
//               <InputComponent
//                 name="price"
//                 value={productState.price}
//                 onChange={handleOnChange}
//               />
//             </Form.Item>

//             {/* Rating field */}
//             <Form.Item
//               label="Rating"
//               name="rating"
//               rules={[
//                 { required: true, message: "Please input rating of product!" },
//               ]}
//             >
//               <InputComponent
//                 name="rating"
//                 value={productState.rating}
//                 onChange={handleOnChange}
//               />
//             </Form.Item>

//             {/* Description field */}
//             <Form.Item
//               label="Description"
//               name="description"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input description of product!",
//                 },
//               ]}
//             >
//               <InputComponent
//                 name="description"
//                 value={productState.description}
//                 onChange={handleOnChange}
//               />
//             </Form.Item>

//             <Form.Item
//               label="Image"
//               name="image"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please choose image",
//                 },
//               ]}
//             >
//               <WrapperUploadFile
//                 beforeUpload={() => false}
//                 onChange={handleImageInput}
//                 maxCount={1}
//               >
//                 <Button>Select File</Button>
//                 {productState.image && ( //Nhúng: nếu tồn tại image thì hiển thị
//                   <img
//                     src={productState?.image}
//                     style={{
//                       height: "60px",
//                       width: "60px",
//                       borderRadius: "50%",
//                       objectFit: "cover",
//                       marginLeft: "10px",
//                     }}
//                     alt="product image"
//                   />
//                 )}
//               </WrapperUploadFile>
//             </Form.Item>

//             {/* Submit button */}
//             <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
//               <Button type="primary" htmlType="submit">
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         </Loading>
//       </ModalComponent>

//       <DrawerComponent
//         title="Chi tiết sản phẩm"
//         forceRender //Đối tượng này được hook ở trên trước khi các tp con của nó được tải => dùng để pre-render children
//         isOpen={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//         width="70%"
//       >
//         <Loading isLoading={isLoadingUpdate || isPendingUpdated}>
//           <Form
//             name="drawer"
//             labelCol={{ span: 5 }} // Cột label chiếm 8 phần
//             wrapperCol={{ span: 19 }} // Cột input chiếm 16 phần
//             style={{ maxWidth: 600 }} // Chiều rộng tối đa của form
//             onFinish={onUpdateProduct} // Tự cấu hình hàm khi submit (POST để gửi form đến url backend)
//             autoComplete="on" // Tắt tính năng autocomplete
//             form={formDrawer}
//           >
//             {/* Name field */}
//             <Form.Item
//               label="Name"
//               name="name"
//               rules={[
//                 { required: true, message: "Please input name of product!" },
//               ]}
//             >
//               <InputComponent
//                 name="name"
//                 value={stateDetailedProduct.name}
//                 onChange={handleOnChangeDetailed}
//               />
//             </Form.Item>

//             {/* Type field */}
//             <Form.Item
//               label="Type"
//               name="type"
//               rules={[
//                 { required: true, message: "Please input type of product!" },
//               ]}
//             >
//               <InputComponent
//                 name="type"
//                 value={stateDetailedProduct.type}
//                 onChange={handleOnChangeDetailed}
//               />
//             </Form.Item>

//             {/* CountInStock field */}
//             <Form.Item
//               label="Count In Stock"
//               name="countInStock"
//               rules={[
//                 { required: true, message: "Please input number of products!" },
//               ]}
//             >
//               <InputComponent
//                 name="countInStock"
//                 value={stateDetailedProduct.countInStock}
//                 onChange={handleOnChangeDetailed}
//               />
//             </Form.Item>

//             {/* Price field */}
//             <Form.Item
//               label="Price"
//               name="price"
//               rules={[
//                 { required: true, message: "Please input price of product!" },
//               ]}
//             >
//               <InputComponent
//                 name="price"
//                 value={stateDetailedProduct.price}
//                 onChange={handleOnChangeDetailed}
//               />
//             </Form.Item>

//             {/* Rating field */}
//             <Form.Item
//               label="Rating"
//               name="rating"
//               rules={[
//                 { required: true, message: "Please input rating of product!" },
//               ]}
//             >
//               <InputComponent
//                 name="rating"
//                 value={stateDetailedProduct.rating}
//                 onChange={handleOnChangeDetailed}
//               />
//             </Form.Item>

//             {/* Description field */}
//             <Form.Item
//               label="Description"
//               name="description"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input description of product!",
//                 },
//               ]}
//             >
//               <InputComponent
//                 name="description"
//                 value={stateDetailedProduct.description}
//                 onChange={handleOnChangeDetailed}
//               />
//             </Form.Item>

//             <Form.Item
//               label="Image"
//               name="image"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please choose image",
//                 },
//               ]}
//             >
//               <WrapperUploadFile
//                 beforeUpload={() => false}
//                 onChange={handleImageInputDetailed}
//                 maxCount={1}
//               >
//                 <Button>Select File</Button>
//                 {stateDetailedProduct.image && ( //Nhúng: nếu tồn tại image thì hiển thị
//                   <img
//                     src={stateDetailedProduct?.image}
//                     style={{
//                       height: "60px",
//                       width: "60px",
//                       borderRadius: "50%",
//                       objectFit: "cover",
//                       marginLeft: "10px",
//                     }}
//                     alt="product image"
//                   />
//                 )}
//               </WrapperUploadFile>
//             </Form.Item>

//             {/* Submit button */}
//             <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
//               <Button type="primary" htmlType="submit">
//                 Apply
//               </Button>
//             </Form.Item>
//           </Form>
//         </Loading>
//       </DrawerComponent>

//       <ModalComponent
//         forceRender
//         title="Xoá sản phẩm"
//         open={isDeleteModalOpen}
//         onCancel={handleDeleteCancel} //Vẫn phải giữ lại để thực hiện cancel thông qua ESC hoặc nút X
//         onOk={handleDeleteProduct}
//       >
//         <Loading isLoading={isPendingDeleted}>
//           <div>Bạn có chắc xoá sản phẩm không?</div>
//         </Loading>
//       </ModalComponent>
//     </div>



    
//   )
// }

// export default AdminUser