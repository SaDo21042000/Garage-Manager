/* eslint-disable no-template-curly-in-string */

import { DownloadOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Divider,
  Form,
  InputNumber,
  Layout as AntLayout,
  notification,
  Table,
  Typography,
} from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { LoadingScreenCustom } from '../../Components';

const { Title, Text } = Typography;

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
const MONTH = DATE.getMonth() + 1;
const YEAR = DATE.getFullYear();

const SaleReportPage = () => {
  const [showReportResult, setShowReportResult] = useState(false);
  const [dateData, setDateData] = useState({ month: MONTH, year: YEAR });
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      title: '#',
      dataIndex: 'carNumber',
      key: 'carNumber',
    },
    {
      title: 'Mã Hiệu Xe',
      dataIndex: 'maHieuXe',
      key: 'maHieuXe',
    },
    {
      title: 'Số Lượng Sửa',
      dataIndex: 'soLuongSua',
      key: 'soLuongSua',
    },
    {
      title: 'Tỉ Lệ',
      dataIndex: 'tiLe',
      key: 'tiLe',
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'tongTien',
      key: 'tongTien',
    },
  ];

  dataSource.map((item, index) => (item.carNumber = index + 1));

  const validateMessages = {
    required: 'Nhập ${label}!',
    types: {
      email: '${label} không phải là email hợp lệ!',
      number: '${label} không phải là số hợp lệ!',
    },
    number: {
      min: '${label} không thể nhỏ hơn ${min}',
      max: "'${label}' không thể lớn hơn ${max}",
      range: '${label} phải ở giữa ${min} và ${max}',
    },
  };

  const onFinishCreateTable = async (values) => {
    const { month, year } = values;
    setDateData({ ...dateData, month: month, year: year });
    console.log(dateData);

    try {
      setIsLoading(true);
      const dataId = await axios.get(
        `http://localhost:5000/api/doanhsos?month=${month}&year=${year}`,
      );

      if (dataId.data.length === 0) {
        setIsLoading(false);
        setShowReportResult(false);

        notification.warning({
          message: 'Thông tin không hợp lệ. Không có báo cáo trong thời gian bạn nhập',
        });
      } else {
        notification.success({
          message: 'Lấy danh sách báo cáo thành công',
        });
        const dataRaw = await axios.get(
          `http://localhost:5000/api/chitietdoanhsos?maDoanhSo=${dataId.data[0]._id}`,
        );
        const { data } = dataRaw;
        setDataSource(data);
        setShowReportResult(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error: ', error.message);
    }
  };

  console.log(dataSource);

  const onFinishFailedCreateTable = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setShowReportResult(false);
  };

  const ResultTitle = () => (
    <Title className="main-title-result" level={4}>
      Kết quả báo cáo doanh thu tháng {dateData.month} năm {dateData.year}
    </Title>
  );

  const TotalValues = () => {
    const total = dataSource.reduce((a, b) => a + b.tongTien, 0);
    return <Text className="result-total">Tổng doanh thu tháng: {total} đồng</Text>;
  };

  return (
    <StyledSaleReportPage>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Báo cáo doanh số</Breadcrumb.Item>
        <Breadcrumb.Item>Báo cáo doanh thu tháng</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Title className="main-title" level={2}>
          Báo cáo doanh thu tháng
        </Title>

        <Form
          name="basic"
          className="filter-form"
          initialValues={{
            remember: true,
            month: MONTH,
            year: YEAR,
          }}
          onFinish={onFinishCreateTable}
          onFinishFailed={onFinishFailedCreateTable}
          autoComplete="off"
          layout="inline"
          validateMessages={validateMessages}
        >
          <Form.Item
            label="Tháng"
            name="month"
            rules={[
              {
                required: true,
                type: 'number',
                min: 1,
                max: 12,
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Năm"
            name="year"
            rules={[
              {
                required: true,
                type: 'number',
                min: 2000,
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Xem báo cáo doanh thu
            </Button>
          </Form.Item>
        </Form>

        <div className={showReportResult ? 'show' : 'hide'}>
          <Divider plain>Kết quả</Divider>
          <ResultTitle />
          <TotalValues />
          <Table
            className="result-table"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
          <Button
            className="button-finish"
            icon={<DownloadOutlined />}
            type="primary"
            size="middle"
          >
            In báo cáo doanh thu
          </Button>
        </div>
        <LoadingScreenCustom isLoading={isLoading} />
      </div>
    </StyledSaleReportPage>
  );
};

export default SaleReportPage;
