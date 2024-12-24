
import React from 'react'
import { AdsBadge, StyledTextBadge, StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import {
    StarFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {convertPrice} from '../../utils'

const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    const navigate = useNavigate()
    const handleProductDetail = (id) => {
        navigate(`/product-details/${id}`)
    }
    return (
        <WrapperCardStyle
            hoverable
            //style={{ width: 240, header: { width: '200px', height: '200px' }, padding: '10px' }}
            onClick={() => handleProductDetail(id)}

            cover={<img alt="example" src={image} />}
        >
            <StyledTextBadge>11.11</StyledTextBadge>
            <AdsBadge>AD</AdsBadge>
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span>
                    <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                </span>
                <span>| Đã bán {selled || 1000}+</span>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
                <WrapperDiscountText>
                    {- discount || -5} %
                </WrapperDiscountText>
            </WrapperPriceText>

        </WrapperCardStyle>
    )
}

export default CardComponent

