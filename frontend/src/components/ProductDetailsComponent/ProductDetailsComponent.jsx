import { Col, Image, Row } from "antd";
import React from "react";
import imageProduct from "../../assets/images/test.webp";
import imageProductSmall from "../../assets/images/imagesmall.webp";
import { WrapperStyleImageSmall, WrapperStyleColImage } from "./style";
import { WrapperAddressProduct } from "./style";

const ProductDetailsComponent = () => {
    return (
        <Row style={{ padding: "16px", background: "#fff" }}>
            <Col span={10}>
                <Image src={imageProduct} alt="image product" preview={false} />
                <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
                    <WrapperStyleColImage span={4} sty>
                        <WrapperStyleImageSmall
                            src={imageProductSmall}
                            alt="image small"
                            preview={false}
                        />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall
                            src={imageProductSmall}
                            alt="image small"
                            preview={false}
                        />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall
                            src={imageProductSmall}
                            alt="image small"
                            preview={false}
                        />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall
                            src={imageProductSmall}
                            alt="image small"
                            preview={false}
                        />
                    </WrapperStyleColImage>
                </Row>
            </Col>
            <Col span={14}>
                <WrapperStyleNameProduct>
                    Sách - Thám tử lừng danh Conan - Combo 10 tập từ tập 81 đến tập 90
                </WrapperStyleNameProduct>
                <div>
                    <StarFilled
                        style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }}
                    />
                    <StarFilled
                        style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }}
                    />
                    <StarFilled
                        style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }}
                    />
                </div>
                <WrapperPricceProduct>
                    <wrapperPriceTextProduct>200.0000</wrapperPriceTextProduct>
                </WrapperPricceProduct>
                <WrapperAddressProduct>
                    <span>Giao đến</span>
                    <span className="address">Q. 1, P. Bến Nghé, Hồ Chí Minh</span> -
                    <span className="change-address">Đổi địa chỉ</span>
                </WrapperAddressProduct>
                <WrapperQualityProduct>
                    <div>Số Lượng</div>
                    <div>
                        <PlusOutlined
                            style={{ color: "#000", fontSize: "20px" }}
                            size="10"
                        />
                    </div>
                </WrapperQualityProduct>
            </Col>
        </Row>
    );
};

export default ProductDetailsComponent;