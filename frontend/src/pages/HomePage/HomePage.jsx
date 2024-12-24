import React, { useRef, useState } from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAllProduct, getAllTypeProduct } from "../../services/ProductService"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 1000)
    const [stateProduct, setStateProduct] = useState([])
    const [typeProducts, setTypeProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(12)
    
    const fetchProductAll = async (search, limit) => {
        const res = await getAllProduct(search, limit)
        return res;
    }
    const fetchAllTypeProduct = async () => {
        const res = await getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }
    const { isLoading, data: products } = useQuery({
        queryKey: ['product', limit, searchDebounce],
        queryFn: () => fetchProductAll(searchDebounce, limit),
        retry: 3,
        retryDelay: 1000,
        placeholderData: keepPreviousData
    })

    {/* Use Effect */ }
    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    const isDisabled = products?.data?.length === products?.pagination?.totalProductNumber;


    return (
        <Loading isLoading={isLoading || loading}>
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
                                    id={product._id}
                                />
                            )
                        })}
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
                            disabled={isDisabled}
                            textButton={isDisabled ? "Đã hiển thị toàn bộ" : "Xem Thêm"}
                            type="outline"
                            styleButton={{
                                border: "1px solid rgb(11, 116, 229)",
                                Color: `${isDisabled ? "##f2f3f4" : "rgb(11, 116, 229)"}`,
                                width: "240px",
                                height: "38px",
                                borderRadius: "4px",
                            }}
                            styleTextButton={{ fontWeight: 500, color: isDisabled && '#fff' }}
                            onClick={() => setLimit((prev) => prev + 12)}
                        />
                    </div>
                </div>
            </div>

        </Loading>
    );
};

export default HomePage;