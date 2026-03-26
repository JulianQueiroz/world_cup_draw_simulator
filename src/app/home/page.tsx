'use client';

import { ContentWrapper, Main } from './style';
import SwitchTabs from '@/components/SwitchTabs';
import Menu from '@/components/Menu';
import Groups from '@/components/Groups';
import { useState } from 'react';

const Home = () => {
  const [drawnGroups, setDrawnGroups] = useState<Group[]>([]);

  return (
    <Main>
      <ContentWrapper>
        <SwitchTabs />
        <Menu setDrawnGroups={setDrawnGroups} />
        <Groups groups={drawnGroups} onGroupsChange={setDrawnGroups} />{' '}
      </ContentWrapper>
    </Main>
  );
};

export default Home;
