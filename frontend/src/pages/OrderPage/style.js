import styled from "styled-components";

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const WrapperStyleHeader = styled.div`
  background: rgb(255,255,255);
  padding: 9px 16px;
  display: flex;
  align-items: center;
  span{
    color: rgb(36,36,36);
    font-weight: 400;
    font-size: 13px;
  }
  border-radius: 4px;
`;

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius  : 6px;
  border-top-left-radius : 6px;
  width: 100%;
`;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16;
  background: #fff;
  margin-top: 12px;
`;

export const WrapperLeft = styled.div`
  width: 910px;
`;

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const WrapperOrderItemImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

export const WrapperOrderItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const WrapperOrderItemPrice = styled.div`
  font-weight: bold;
  color: #333;
`;

export const WrapperOrderItemTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const WrapperOrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid #ddd;
  margin-top: 20px;
`;

export const WrapperOrderTotalContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const WrapperOrderTotalPrice = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

export const WrapperPriceDiscount = styled.div`
  font-size: 12px;
  color: red;
  text-decoration: line-through;
  margin-left: 4px;
`;

export const WrapperTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 17px 20px;
  background: #fff;
  border-bottom-right-radius  : 6px;
  border-bottom-left-radius : 6px;
`;
