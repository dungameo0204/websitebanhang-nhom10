import React from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperContainerLeft,WrapperContainerRight, WrapperTextLight } from "../SignInPage/style";
import imageLogo from "../../assets/images/logo-login.png"; 
import { Image } from "antd";

const SignUpPage = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', background:'rgba(0,0,0,0.53)', height:'100vh'}}>
            <div style={{width: '800px', height: '445px', borderRadius:'6px', background: '#fff', display: 'flex'}}>
            <WrapperContainerLeft>
                <h1>Xin chào</h1>
                <p>Đăng ký tạo tài khoản mới</p>
                <InputForm style={{marginBottom: '10px'}} placeholder= "password"/>
                <InputForm style={{marginBottom: '10px'}} placeholder= "password"/>
                <InputForm placeholder= "comfirm password"/>
                <ButtonComponent
                    bordered = {false}
                    size = {40}
                    styleButton={{
                        background: 'rgb(255,57,69)',
                        height: '48px',
                        width: '100%',
                        border: 'none',
                        borderRadius: '4px',
                        margin: '26px 0 10px'
                    }}
                    textButton={'Đăng nhập'}
                    styleTextButton={{color: '#fff', fontSize: '15px', fontWeight: '700'}}
                ></ButtonComponent>
                <p>Bạn đã có tài khoản? <WrapperTextLight>Đăng nhập</WrapperTextLight></p>
            </WrapperContainerLeft>
            <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt="image-logo-login" width="203px" height="203px"/>
                    <h4>Mua sắm thoả thích</h4>
            </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignUpPage