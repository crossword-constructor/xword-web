import styled from '@emotion/styled';

export const Page = styled.div`
  height: calc(100vh - ${({ theme }) => theme.sizes.NAV_HEIGHT}rem);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.sizes.s5}rem;
`;

export const Box = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
`;
