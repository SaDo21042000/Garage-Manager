import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';

const StyledSaleReportPage = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
  }

  .main-title {
    margin-bottom: 50px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }

  .filter-form {
    justify-content: center;
    margin-bottom: 50px;
  }

  .show {
    display: block;
  }

  .hide {
    display: none;
  }

  .result-total {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
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

const DATE = new Date();
const MONTH = DATE.getMonth();
const YEAR = DATE.getFullYear();

const columns = [
  {
    title: '#',
    dataIndex: 'carNumber',
    key: 'carNumber',
  },
  {
    title: 'Mã Hiệu Xe',
    dataIndex: 'carName',
    key: 'carName',
  },
  {
    title: 'Số Lượng Sửa',
    dataIndex: 'numberRepair',
    key: 'numberRepair',
  },
  {
    title: 'Tỉ Lệ',
    dataIndex: 'ratio',
    key: 'ratio',
  },
  {
    title: 'Tổng Tiền',
    dataIndex: 'total',
    key: 'total',
  },
];

const validateMessages = {
  required: 'Nhập ${label}!',
  types: {
    email: '${label} không phải là email hợp lệ!',
    number: '${label} không phải là số hợp lệ!',
  },
  number: {
    min: "'${label}' không thể nhỏ hơn ${min}",
    max: "'${label}' không thể lớn hơn ${max}",
    range: '${label} phải ở giữa ${min} và ${max}',
  },
};

export { StyledSaleReportPage, MONTH, YEAR, columns, validateMessages };
