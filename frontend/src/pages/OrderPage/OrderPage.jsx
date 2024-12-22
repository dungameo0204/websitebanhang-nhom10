import { Checkbox } from 'antd';
import React, { useState } from 'react';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { WrapperCountOrder,WrapperTotal, WrapperStyleHeader,WrapperPriceDiscount, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperRight, WrapperOrderItemImg, WrapperOrderItemInfo, WrapperOrderItemPrice, WrapperOrderItemTitle, WrapperListOrder, WrapperOrderTotal, WrapperOrderTotalContent, WrapperOrderTotalPrice } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import image from '../../assets/images/test.webp';

const OrderPage = ({ count = 1 }) => {

    const onChange = (e) => {}

  const handleOnChangeCheckAll = () => {
  };

  const handleOnChangeCheck = (event) => {
  };

  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3>Giỏ hàng</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}></div>
        <WrapperLeft>
          <WrapperStyleHeader>
            <span style={{ display: 'inline-block', width: '390px' }}>
              <Checkbox onChange={handleOnChangeCheckAll}></Checkbox>
              <span>Tất cả ({count} Sản phẩm)</span>
            </span>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>Đơn giá</span>
              <span>Số lượng</span>
              <span>Thành tiền</span>
              <DeleteOutlined style={{ cursor: 'pointer' }} />
            </div>
          </WrapperStyleHeader>
          <WrapperListOrder>
              <WrapperItemOrder>
                <div style={{width: '390px', display: 'flex', alignItems: 'center'}}>
                    <Checkbox onChange={onChange}></Checkbox>
                    <img src={image} alt="product" style={{width: '77px', height: '79px', objectFit: 'cover', borderRadius: '8px', marginRight: '20px'}} />
                    <div>tên sản phẩm</div>
                </div>
                <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <span>
                        <span style={{fontSize: '13px', color: '#242424'}}>211</span>
                        <WrapperPriceDiscount>230</WrapperPriceDiscount>
                    </span>
                    <WrapperCountOrder>
                        <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}}>
                            <MinusOutlined style={{color: '#000', fontSize:'10px'}}></MinusOutlined>
                        </button>
                        <WrapperInputNumber OnChange={onChange} value={count} defaultValue={1} size="small"></WrapperInputNumber>
                        <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}}>
                            <PlusOutlined style={{color: '#000', fontSize:'10px'}}></PlusOutlined>
                        </button>
                    </WrapperCountOrder>
                    <span style={{color: 'rgb(255,66,78)', fontSize: '13px'}}>Xoá?</span>
                    <DeleteOutlined style={{cursor: 'pointer'}}></DeleteOutlined>
                </div>
                </WrapperItemOrder>
            </WrapperListOrder>
            </WrapperLeft>
            <WrapperRight>
              <div style={{width:'100%'}}>
                <WrapperInfo>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span>Tạm tính</span>
                        <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>15000000</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span>Giảm giá</span>
                        <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>15%</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span>Thuế</span>
                        <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>10%</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span>Phí giao hàng</span>
                        <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>10%</span>
                    </div>
                </WrapperInfo>
                <WrapperTotal>
                    <span>Tổng tiền</span>
                    <span style = {{display: 'flex', flexDirection:'column'}}>
                        <span style={{color: '#rgb(254,56,52)', fontSize: '24px', fontWeight: 'bold'}}>17500000</span>
                        <span style={{color: '#000', fontSize: '11px'}}> Đã bao gồm thuế</span>
                    </span>
                </WrapperTotal>
              </div>
              <ButtonComponent
                size={40}
                styleButton={
                    {
                        background: '#rgb(255,57,69)',
                        height: '48px',
                        width: '220px',
                        border: 'none',
                        borderRadius: '4px'
                    }
                }
                textButton={'Mua hàng'}
                styleTextButton={{color:'#fff', fontSize: '15px', fontWeight: '700'}}
              >
              </ButtonComponent>
            </WrapperRight>
      </div>
    </div>
  );
};

export default OrderPage;