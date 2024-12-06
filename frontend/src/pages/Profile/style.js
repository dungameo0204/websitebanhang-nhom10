import { Upload } from "antd";
import styled from "styled-components";

export const WrapperUploadFile = styled(Upload)`
  & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  & .ant-upload-list-item-info {
    display: none;
  }
`;
