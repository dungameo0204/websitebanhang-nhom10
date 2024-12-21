import React, { useState } from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from '@tanstack/react-query';
<<<<<<< HEAD
import { getAllProduct } from "../../services/ProductService"
=======
import {getAllProduct, getAllTypeProduct} from "../../services/ProductService"
import { useEffect } from "react";
>>>>>>> 9ef70801a3fceb2bc5da36913b2bb2b6db70ac44
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Color } from "antd/es/color-picker";
import { Col } from "antd";
import * as ProductService from "../../services/ProductService";

const HomePage = () => {
    const [typeProducts, setTypeProducts] = useState([])
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct()
        console.log('res', res);

        return res
    }
    const fetchAllTypeProduct = async () => {
        const res = await getAllTypeProduct()
        if(res?.status === 'OK'){
            setTypeProducts(res?.data)
        }        
    }
    const { isLoading, data: products } = useQuery({
        queryKey: ['product'],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000
    })
<<<<<<< HEAD
=======

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])
>>>>>>> 9ef70801a3fceb2bc5da36913b2bb2b6db70ac44
    return (
        <>
            <div style={{ padding: "0 120px" }}>
                <WrapperTypeProduct>
                    {typeProducts.map((item) => (
                        <TypeProduct name={item} key={item} />
                    ))}
                </WrapperTypeProduct>
            </div>
            <div id="body" style={{ width: '100%', backgroundColor: '#efefef' }}>
                <div
                    id="container"
                    style={{
                        backgroundColor: "#efefef",
                        padding: "0 120px",
                        height: "1000px",
                    }}
                >
                    <SliderComponent arrImages={[slider1, slider2, slider3]} />
                    <WrapperProducts>
                        {products?.data?.map((product) => {
                            return (
                                <CardComponent
                                    key={product._id}
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.types}
                                    discount={product.discount}
                                    selled={product.selled}
                                />
                            )
                        })}
<<<<<<< HEAD
                        <CardComponent />

=======
>>>>>>> 9ef70801a3fceb2bc5da36913b2bb2b6db70ac44
                    </WrapperProducts>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px",
                        }}
                    >
                        <WrapperButtonMore
                            textButton="Xem Them"
                            type="outline"
                            styleButton={{
                                border: "1px solid rgb(11, 116, 229)",
                                Color: "rgb(11, 116, 229",
                                width: "240px",
                                height: "38px",
                                borderRadius: "4px",
                            }}
                            styleTextButton={{ fontWeight: 500 }}
                        />
                    </div>
                </div>
            </div>

        </>
    );
};

export default HomePage;