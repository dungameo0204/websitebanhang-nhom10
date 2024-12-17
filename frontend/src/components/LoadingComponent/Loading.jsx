import { Spin } from "antd";
import React, { Children } from "react";

const Loading = ({children, isLoading, delay = 500}) => {
    return (
        <Spin spinning= {isLoading} delay = {delay}>
            {children}
        </Spin>
    )
}

export default Loading;