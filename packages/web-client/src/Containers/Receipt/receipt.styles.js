import styled from 'styled-components';
import { InventoryReportStyles } from '../InventoryPage/styles';

export const ReceiptStyles = styled(InventoryReportStyles)``;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 2rem;

  @media (min-width: 0px) and (max-width: 576px) {
    width: 100%;

    display: flex;
    flex-direction: column;

    > button {
      margin: 10px;
      left: 5%;
      width: fit-content;
    }
  }

  @media (min-width: 577px) and (max-width: 768px) {
    width: 100%;

    display: flex;
    flex-direction: column;

    > button {
      margin: 10px auto !important;
      width: fit-content;
    }
  }

  @media (min-width: 769px) {
    > button {
      margin-bottom: 20px;
    }
  }
`;
