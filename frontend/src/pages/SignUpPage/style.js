import style from "styled-components";

export const WrapperContainerLeft = style.div`
  flex: 1;
  padding: 0px 45px 24px;
  display: flex;
  flex-direction: column;
`;

export const WrapperContainerRight = style.div`
  width: 300px;
  background: linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const WrapperTextLight = style.span`
  color: rgb(13, 92, 182);
  font-size: 13px;
  cursor: pointer; /* Hiển thị con trỏ ngón tay khi hover */
  transition: color 0.3s ease; /* Hiệu ứng chuyển đổi màu mượt khi hover */

  &:hover {
    color: rgb(10, 75, 150); /* Đổi màu chữ khi hover để làm nổi bật */
  }
`;
export const PasswordToggleIcon = style.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
  transition: color 0.3s ease;

  &:hover {
    color: #666; /* Đổi màu biểu tượng khi hover */
  }
`;
