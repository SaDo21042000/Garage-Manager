/* eslint-disable no-template-curly-in-string */

import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Breadcrumb, Typography, Divider } from 'antd';

import { MaxCarForm, CarBrandNumberForm, SupplyTypeForm } from '../../Components/SettingForm';
import { LoadingScreenCustom } from './../../Components';

const { Title } = Typography;

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

  .max-car-number {
    justify-content: center;
    margin-bottom: 25px;
  }
`;

const SettingPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <StyledSaleReportPage>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Cài đặt và thay đổi quy định</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Title className="main-title" level={2}>
          Cài đặt và thay đổi quy định
        </Title>

        <Divider />

        <MaxCarForm setIsLoading={setIsLoading} />

        <Divider />

        <CarBrandNumberForm setIsLoading={setIsLoading} />

        <Divider />

        <SupplyTypeForm setIsLoading={setIsLoading} />
        <LoadingScreenCustom isLoading={isLoading} />
      </div>
    </StyledSaleReportPage>
  );
};

export default SettingPage;
