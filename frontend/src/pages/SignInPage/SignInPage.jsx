import react from "react";
import { WrapperTextLight } from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperContainerLeft, WrapperContainerRight } from "./style";
import imageLogo from "../../assets/images/logo-login.png";
import { Image } from "antd";

const SignInPage = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.53",
                height: "100vh",
            }}
        >
            <div
                style={{
                    width: "800px",
                    height: "445px",
                    borderRadius: "6px",
                    background: "#fff",
                    display: "flex",
                }}
            >
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập vào tạo tài khoản</p>
                    <InputForm
                        style={{ marginBottom: "10px" }}
                        placeholder="abc@gmail.com"
                    />
                    <InputForm placeholder="Mật khẩu" />
                    <ButtonComponent
                        bordered={false}
                        size={40}
                        styleButton={{
                            background: "rgb(255, 57, 69)",
                            height: "48px",
                            width: "100%",
                            borderRadius: "4px",
                            border: "none",
                            margin: "26px 0 10px",
                        }}
                        textButton={"Đăng nhập"}
                        styleTextButton={{
                            color: "#fff",
                            fontSize: "15px",
                            fontWeight: "700",
                        }}
                    ></ButtonComponent>
                    <p>
                        <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
                    </p>
                    <p>
                        Chưa có tài khoản?{" "}
                        <WrapperTextLight> Tạo tài khoản</WrapperTextLight>
                    </p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image
                        src={imageLogo}
                        preview={false}
                        alt="image-logo"
                        height="203px"
                        width="203px"
                    />
                    <h4>Mua sắm tại ...</h4>
                </WrapperContainerRight>
            </div>
        </div>
    );
};

export default SignInPage;