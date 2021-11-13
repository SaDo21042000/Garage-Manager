import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;

  display: block;
  width: 100%;
  flex: 1 0 calc(2 * 100% / 3);
  max-width: calc(2 * 100% / 3);
  position: relative;
  margin: auto;

  .month-picker-wrapper {
  }

  > h1,
  h2 {
    text-align: center;
  }

  > .btn-wrapper {
    display: flex;
    justify-content: flex-end;

    > button {
      margin: 2rem 5rem 2rem;
    }
  }

  > .content {
    margin: auto;
  }
`;

export const TimePicker = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  margin: 2rem auto 0 auto;

  .month-picker-wrapper {
    margin-right: 20px;

    > .month-picker-title {
      margin-right: 10px;
    }
  }

  .year-picker-wrapper {
    margin-right: 20px;

    > .year-picker-title {
      margin-right: 10px;
    }
  }
`;

export const CreateReportButton = styled('button')`
  background-color: #0065fd;
  color: #fff;
  border-radius: 15px;
  padding: 10px;
  outline: none;
  border: none;
`;

export const PrintReportButton = styled(CreateReportButton)`
  background-color: #058d23;
`;
