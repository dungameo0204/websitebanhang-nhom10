import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    border-bottom: 1px solid red;
    height : 44px;
`
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: rgb(13, 92, 182);
        span {
        color: #fff;
        }
    }
    width: 100%;
   text-align: center;
    color: rgb(13, 92, 182);

`
export const WrapperButtonMore1 = styled.a`
cursor: pointer;
    display: inline-block;
    width: 240px;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid rgb(10, 104, 255);
    color: rgb(10, 104, 255);
    font-size: 16px;
    line-height: 150%;
    font-weight: 400;
    text-align: center;
    &:hover {
        color: #fff;
        background: rgb(13, 92, 182);
    }`

