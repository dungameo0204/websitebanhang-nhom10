import React from 'react'
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style'
import { Checkbox, Rate } from 'antd'

const NavBarComponent = () => {
    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return (
                        <WrapperTextValue> {option}</WrapperTextValue>
                    )
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox style={{ marginleft: 0 }} value={option.value}>{option.Label}</Checkbox>
                            )
                        })}
                        <Checkbox value="B">B</Checkbox>
                    </Checkbox.Group>
                )

            case 'star':
                return options.map((option) => {
                    console.log('check', option)
                    return (
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option}></Rate>
                            <span> {`tu ${option} sao`}</span>



                        </div>
                    )
                })

            case 'price':
                return options.map((option) => {

                    return (
                        <WrapperTextPrice> {option} </WrapperTextPrice>
                    )
                })
            default:
                return {}
        }
    }
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <WrapperLableText>Lable</WrapperLableText>
            <WrapperContent>
                {renderContent('text', ['Tu lanh', 'TV', 'May Giat'])}
                {renderContent('checkbox', [
                    { value: 'a', Label: 'A' },
                    { value: 'b', Label: 'B' }
                ])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('star', [3, 4, 5])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('price', ['duoi 40000', 'tren 50000'])}
            </WrapperContent>
        </div>
    )
}

export default NavBarComponent