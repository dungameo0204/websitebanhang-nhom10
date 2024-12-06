import React, { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperContainerLeft,WrapperContainerRight, WrapperTextLight } from "./style";
import imageLogo from "../../assets/images/logo-login.png"; 
import { Image } from "antd";
import {EyeFilled, EyeInvisibleFilled} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setisShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [comfirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate();
    const handleNavigateSignIn = () => {
        navigate('/sign-in');
    }
    const handleSignUp = () => {
        console.log('sign-up', email, password, comfirmPassword);
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangePassword = (value) => {
        setPassword(value)
    }
    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', background:'rgba(0,0,0,0.53)', height:'100vh'}}>
            <div style={{width: '800px', height: '445px', borderRadius:'6px', background: '#fff', display: 'flex'}}>
            <WrapperContainerLeft>
                <h1>Xin chào</h1>
                <p>Đăng ký tạo tài khoản mới</p>
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
                <InputForm style={{marginBottom: '10px'}} placeholder= "password" type={isShowPassword ? "text" : "password"} 
                value={password} onChange={handleOnchangePassword}/>
                </div>
                <div style={{position: 'relative'}}>
                    <span
                        onClick={() => setisShowConfirmPassword(!isShowConfirmPassword)}
                        style={{
                            zIndex: 10,
                            position: 'absolute',
                            top:'4px',
                            right: '8px'
                        }}                                        
                    >{
                        isShowConfirmPassword ? (
                            <EyeFilled />
                        ) : (
                            <EyeInvisibleFilled/>
                        )
                    }
                    </span>
                <InputForm placeholder= "comfirm password" type={isShowConfirmPassword ? "text" : "password"}
                 value={comfirmPassword} onChange={handleOnchangeConfirmPassword}/>
                </div>
                <ButtonComponent
                    disabled = {!email.length || !password.length || !comfirmPassword.length}
                    onClick={handleSignUp}
                    size = {40}
                    styleButton={{
                        background: 'rgb(255,57,69)',
                        height: '48px',
                        width: '100%',
                        border: 'none',
                        borderRadius: '4px',
                        margin: '26px 0 10px'
                    }}
                    textButton={'Đăng ký'}
                    styleTextButton={{color: '#fff', fontSize: '15px', fontWeight: '700'}}
                ></ButtonComponent>
                <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight></p>
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