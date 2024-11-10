import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'

const DefaultComonent = ({ children }) => {
    return (
        <div>
            <HeaderComponent />
            {children}
        </div>
    )
}

export default DefaultComonent