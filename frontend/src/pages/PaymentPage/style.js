import styled from "styled-components";

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
  background: #f9f9f9;
`;

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 7px;
  padding: 12px 16px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
`;

export const WrapperInfo = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  background: #fff;
  border-radius: 6px 6px 0 0;
  width: 100%;
  box-sizing: border-box;
`;

export const WrapperLeft = styled.div`
  width: 70%;
`;

export const WrapperRight = styled.div`
  width: 28%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  gap: 12px;
`;

export const WrapperOrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #fff;
  border-radius: 0 0 6px 6px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
  box-sizing: border-box;
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
  color: #ff4d4f;
  margin-left: 4px;
`;

export const WrapperTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 15px;
  padding: 20px;
  background: #fff;
  border-radius: 0 0 6px 6px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
  box-sizing: border-box;
`;