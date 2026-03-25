'use client';

import styled from 'styled-components';

export { Main, ContentWrapper,SearchBar,NationsBox,GroupsContent};

const Main = styled.main`
  width: 100%;
  min-height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 4rem 0rem 2rem 0rem;

  box-sizing: border-box;

  @media (max-width: 1440px) {
    padding: 1.5rem;
  }

  @media (max-width: 860px) {
    display: block;
    padding: 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.gap.xl};

  max-width: 100%;
  box-sizing: border-box;
`;

const SearchBar = styled.div`
  display:flex
`
const NationsBox = styled.div`
  display:flex
`

const GroupsContent = styled.div`
  display:flex
`