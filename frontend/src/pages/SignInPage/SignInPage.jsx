import React, { useState } from "react";
import { WrapperContainerLeft,WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imageLogo from "../../assets/images/logo-login.png"; 
import {Image } from "antd";
import { EyeFilled, EyeInvisibleFilled} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";

const SignInPage = () => {
    const navigate = useNavigate();
    const handleNavigateSignUp = () => {
        navigate('/sign-up');
    }

    // const mutation = useMutationHooks(
    //      data => UserService.loginUser(data)
    // )

    // const {data, isLoading} = mutation

    // const handleSignIn = () => {
    //     mutation.mutate({
    //         email,
    //         password
    //     })
    //     console.log('sign-in', email, password);
    // }

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', background:'rgba(0,0,0,0.53)', height:'100vh'}}>
            <div style={{width: '800px', height: '445px', borderRadius:'6px', background: '#fff', display: 'flex'}}>
            <WrapperContainerLeft>
                <h1>Xin chào</h1>
                <p>Đăng nhập hoặc tạo tài khoản</p>
                <InputForm style={{marginBottom: '10px'}} placeholder= "abc@gmail.com" value={email} onChange={handleOnchangeEmail}/>
                <div style={{position: 'relative'}}>
                    <span
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        style={{
                            zIndex: 10,
                            position: 'absolute',
                            top:'4px',
                            right: '8px'
                        }}                                        
                    >{
                        isShowPassword ? (
                            <EyeFilled />
                        ) : (
                            <EyeInvisibleFilled/>
                        )
                    }
                    </span>
                <InputForm placeholder= "password" type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnchangePassword}/>
                </div>
                <ButtonComponent
                    disabled = {!email.length || !password.length}
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
                <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
                <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
            </WrapperContainerLeft>
            <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt="image-logo-login" width="203px" height="203px"/>
                    <h4>Mua sắm thoả thích</h4>
            </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignInPage