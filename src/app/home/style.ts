'use client';

import styled from 'styled-components';

export { Main, ContentWrapper, SearchBar, NationsBox, GroupsContent,ContentGroups, GroupsLayout};

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
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
`;

// Adicione este novo componente:
const GroupsLayout = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;  /* ← chave: alinha pelo topo, não estica */
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
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
  justify-content:center
`;
const ContentGroups = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
`;