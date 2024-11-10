import React from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperButtonMore, WrapperButtonMore1, WrapperTypeProduct } from './style';
import slider1 from '../../assets/images/slider1.webp';
import slider2 from '../../assets/images/slider2.webp';
import slider3 from '../../assets/images/slider3.webp';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Color } from 'antd/es/color-picker';
import { Col } from 'antd';


const HomePage = () => {
    const arr = ['TV', 'Tủ lạnh', 'Laptop'];

    return (
        <>
            <div style={{ padding: '0 120px' }}>
                <WrapperTypeProduct>
                    {arr.map((item) => (
                        <TypeProduct name={item} key={item} />
                    ))}
                </WrapperTypeProduct>
            </div>

            <div id='container' style={{ backgroundColor: '#efefef', padding: '0 120px', height: '1000px' }}>
                <SliderComponent arrImages={[slider1, slider2, slider3]} />
                <div style={{ margin: '20px', display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <WrapperButtonMore textButton="Xem Them" type="outline" styleButton={{
                        border: '1px solid rgb(11, 116, 229)', Color: 'rgb(11, 116, 229',
                        width: '240px', height: '38px', borderRadius: '4px'
                    }} styleTextButton={{ fontWeight: 500 }} />
                </div>
                {/* <WrapperButtonMore1>Xem Them</WrapperButtonMore1> */}

            </div>
        </>
    );
};

export default HomePage;
