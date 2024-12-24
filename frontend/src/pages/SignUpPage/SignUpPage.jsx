import React, { useEffect, useState } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"; // Icon mắt từ Ant Design
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import { useNavigate } from "react-router-dom";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import imageLogo from "../../assets/images/logo-login.png";
import { Image } from "antd";
import * as UserService from "../../services/UserService";
import * as CartService from "../../services/cartSevice";
import * as Message from "../../components/Message/Message";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //Mutation (For SignUp)
  const mutation = useMutationHooks(data =>  UserService.signupUser(data));

  const { data, error, isPending, isSuccess, isError } = mutation;

  const cartMutation = useMutationHooks(userID =>  CartService.createCart(userID));

  const {data: cartData, isSuccess: isCartSuccess} = cartMutation

  //Effect (Message)
  useEffect(() => {
    if (isSuccess) {
      handleInitCart(data?.data?.data._id);
      Message.success();
      handleNavigateSignIn();
    } else if (isError) {
      Message.error();
    }
  }, [isSuccess, isError]);

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  //Chuyển hướng sau khi đã đăng ký thành công
  const handleNavigateSignIn = () => {
    navigate("/signin");
  };

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword });
  };

  const handleInitCart = (newUserID) => {
    cartMutation.mutate(newUserID)
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.53)",
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
          <p>Tạo tài khoản</p>
          <InputForm
            style={{ marginBottom: "15px" }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnChangeEmail} // Correct prop name
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: "10",
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="password"
              style={{ marginBottom: "10px" }}
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnChangePassword} // Correct prop name
            />
          </div>
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: "10",
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </div>
          <div style={{ position: "relative", marginBottom: "26px" }}>
            <InputForm
              placeholder="confirm password"
              type={isShowConfirmPassword ? "text" : "password"}
              style={{ marginBottom: "10px" }}
              value={confirmPassword}
              onChange={handleOnChangeConfirmPassword} // Correct prop name
            />
          </div>
          <Loading isLoading={isPending}>
            {mutation.isError && error?.response && (
              <span style={{ color: "red" }}>
                {error.response.data.message}
              </span>
            )}
            <ButtonComponent
              disabled={
                !email.length || !password.length || !confirmPassword.length
              }
              onClick={handleSignUp}
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
              textButton={"Đăng ký"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </Loading>
          <p>
            Bạn đã có tài khoản?
            <WrapperTextLight onClick={handleNavigateSignIn}>
              {" "}
              Đăng nhập
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={imageLogo}
            preview={false}
            alt="image-logo"
            height="230px"
            width="270px"
          />
          <h4>Mua sắm tại ...</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;