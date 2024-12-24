import { Button } from 'antd'
import React from 'react'

const ButtonComponent = ({ size, styleButton, styleTextButton, textButton,icon, disabled, ...rest }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc': styleButton.background
            }}
            size={size}
            disabled={disabled}
            icon={icon}
            {...rest}
        >
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    )
}

export default ButtonComponent