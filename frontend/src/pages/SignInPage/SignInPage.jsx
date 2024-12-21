import React, { useState, useEffect } from "react";
import { WrapperTextLight } from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperContainerLeft, WrapperContainerRight } from "./style";
import imageLogo from "../../assets/images/logo-login.png";
import { Image as AntImage } from "antd"; // Đổi tên tránh xung đột
import { useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as Message from "../../components/Message/Message";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  //Mutation (For Signin)
  const mutation = useMutationHooks((data) => UserService.loginUser(data));

  const {data, error, isPending, isSuccess, isError} = mutation


  const handleNavigateSignUp = () => {
    navigate("/signup");
  };

  const handleNavigateHomePage = () => {
    navigate("/");
  };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
  };

  const saveTokenInLocalStorage = (tokenName, token) => {
    localStorage.setItem(tokenName, token);
  };

  //User Details
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token })); // cập nhật slice với dispatch
  };

  //Effect
  useEffect (() => {
      if(isSuccess){
        handleNavigateHomePage()
        saveTokenInLocalStorage('access_token', data?.access_token)
        if(data?.access_token) {
          const decoded = jwtDecode(data?.access_token);
          if(decoded?.id){
            handleGetDetailsUser(decoded?.id, data?.access_token)
          }
        }
      }else if (isError){
        Message.error()
      }

      handleNavigateHomePage();
      saveTokenInLocalStorage("access_token", data?.access_token);

      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    } else if (isError) {
      Message.error();
    }
  }, [isSuccess, isError]);

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
          <p>Đăng nhập hoặc tạo tài khoản</p>
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="abc@gmail.com"
            value={email}
            handleOnChange={handleOnChangeEmail}
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
              type={isShowPassword ? "text" : "password"}
              value={password}
              handleOnChange={handleOnChangePassword}
            />
          </div>
          {isError && error?.response && (
            <span style={{ color: "red" }}>{error.response.data.message}</span>
          )}
          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
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
            />
          </Loading>
          <p>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateSignUp}>
              Tạo tài khoản
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <AntImage
            src={imageLogo}
            preview={false}
            alt="image-logo"
            style={{ height: "230px", width: "270px" }}
          />
          <h4>Mua sắm tại ...</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
