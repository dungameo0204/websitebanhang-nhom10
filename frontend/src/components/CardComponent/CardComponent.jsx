
import React from 'react'
import { AdsBadge, StyledTextBadge, StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import {
    StarFilled
} from '@ant-design/icons';
const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled } = props
    return (
        <WrapperCardStyle
            hoverable
            //style={{ width: 240, header: { width: '200px', height: '200px' }, padding: '10px' }}

            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <StyledTextBadge>11.11</StyledTextBadge>
            <AdsBadge>AD</AdsBadge>
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span>
                    <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                </span>
                <span>| Da ban {selled || 1000}+</span>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{price}</span>
                <WrapperDiscountText>
<<<<<<< HEAD
                    {discount || -5}%
=======
                    {- discount || -5} %
>>>>>>> 9ef70801a3fceb2bc5da36913b2bb2b6db70ac44
                </WrapperDiscountText>
            </WrapperPriceText>

        </WrapperCardStyle>
    )
}

export default CardComponent

