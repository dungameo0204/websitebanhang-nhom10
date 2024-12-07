import styled from "styled-components";

export const WrapperContainerLeft = styled.div`
  flex: 1;
  padding: 40px 45px 24px;
  display: flex;
  flex-direction: column;
`;

export const WrapperContainerRight = styled.div`
  width: 300px;
  background: linear-gradient(
    136deg,
    rgb(240, 248, 255) -1%,
    rgb(219, 238, 255) 85%
  );
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const WrapperTextLight = styled.span`
  color: rgb(13, 92, 182);
  font-size: 13px;
  cursor: pointer; /* Đổi con trỏ thành dạng tay khi hover */

  position: relative; /* Cần thiết cho việc tạo mũi tên */

  &::after {
    content: "→"; /* Mũi tên */
    position: absolute;
    right: -20px; /* Đặt mũi tên ra ngoài bên phải */
    opacity: 0; /* Mặc định ẩn mũi tên */
    transition: opacity 0.3s ease; /* Thêm hiệu ứng chuyển mượt */
  }

  &:hover::after {
    opacity: 1; /* Hiển thị mũi tên khi hover */
  }
`;
