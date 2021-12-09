import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';

const StyledBill = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
  }

  .main-title {
    margin-bottom: 30px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }

  .result-table {
    margin-bottom: 30px;
  }

  .button-finish {
    display: flex;
    align-items: center;
    margin-left: auto;
    border-radius: 10px;
    border-color: #058d23;
    background-color: #058d23;
  }
`;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const validateMessages = {
  required: `Nhập Example!`,
  types: {
    number: `Example không phải số hợp lệ!`,
    email: `Example không phải là email hợp lệ!`,
  },
  number: {
    min: `Example không thể nhỏ hơn min`,
    max: `Example không thể lớn hơn max`,
    range: `Example phải ở giữa min và max`,
  },
};

const DATEFORMAT = 'YYYY-MM-DD';

export { StyledBill, layout, validateMessages, DATEFORMAT };
