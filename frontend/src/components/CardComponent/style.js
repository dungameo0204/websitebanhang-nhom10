import styled from "styled-components";
import { Card } from "antd";

export const WrapperCardStyle = styled(Card)`
  width: 200px;
  & img {
    height: 200px;
    width: 200px;
  }
`;
export const StyleNameProduct = styled.div`
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;  
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: rgb(56, 56, 61);
`;

export const WrapperReportText = styled.div`
  font-size: 11px;
  color: rbg(128, 128, 137);
  display: flex;
  align-items: center;
  margin: 6px 0 0px;
`;

export const WrapperPriceText = styled.div`
  color: rgb(255, 66, 78);
  font-size: 16px;
  font-weight: 500;
`;
export const WrapperDiscountText = styled.span`
  color: rgb(255, 66, 78);
  font-size: 12px;
  font-weight: 500;
`;

export const StyledTextBadge = styled.div`
  height: 20px;
  padding: 2px 4px;
  gap: 0px;
  border-radius: 6px;
  font-size: 10px;
  line-height: 150%;
  box-sizing: border-box;
  background: rgb(217, 56, 67);
  color: rgb(255, 240, 241);
  border: 1px solid rgb(255, 255, 255);
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
`;

export const AdsBadge = styled.p`
  display: inline-block;
  height: 20px;
  margin: 0px;
  padding: 2px 4px;
  background: var(--alias-themeVariant, #f5f5fa);
  border-radius: 6px;
  color: rgb(39, 39, 42);
  font-size: 10px;
  font-weight: 700;
  line-height: 150%;
  box-sizing: border-box;
  text-transform: uppercase;
  border: 1px solid rgb(255, 255, 255);
  z-index: 2;
  white-space: nowrap;
  position: absolute;
  top: 16px;
  right: 16px;
`;
