
import React from 'react'
import { AdsBadge, StyledTextBadge, StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReporText } from './style'
import {
    StarFilled
} from '@ant-design/icons';
const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            //style={{ width: 240, header: { width: '200px', height: '200px' }, padding: '10px' }}

            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <StyledTextBadge>11.11</StyledTextBadge>
            <AdsBadge>AD</AdsBadge>
            <StyleNameProduct>Iphone</StyleNameProduct>
            <WrapperReporText>
                <span>
                    <span>4.96</span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                </span>
                <span>| Da ban 1000+</span>
            </WrapperReporText>
            <WrapperPriceText>
                1.000.000d
                <WrapperDiscountText>
                    -5%
                </WrapperDiscountText>
            </WrapperPriceText>

        </WrapperCardStyle>
    )
}

export default CardComponent

