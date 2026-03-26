'use client';

import styled from 'styled-components';

export { Main, ContentWrapper, SearchBar, NationsBox, GroupsContent,ContentGroups };

const Main = styled.main`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  padding: 4rem 1.5rem 2rem;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.xl};
  box-sizing: border-box;
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;
`;

const NationsBox = styled.div`
  display: flex;
  width: 100%;
`;

const GroupsContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
`;
const ContentGroups = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
`;