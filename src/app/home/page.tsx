'use client';

import { useEffect, useState } from 'react';
import { ContentWrapper, GroupsLayout, Main } from './style';
import SwitchTabs from '@/components/SwitchTabs';
import Menu from '@/components/Menu';
import Groups from '@/components/Groups';
import { TournamentBracket } from '@/components/TournamentBracket';
import type { Tournament } from '@/types/knockout';
import { Group } from '@/types/draw';
import { generateTournamentFromGroups } from '@/lib/knockout';
import { useStore } from '@/lib/store';

const Home = () => {
  const [activeTab, setActiveTab] = useState('groups');
  const {groups, setGroups, tournament, setTournament} = useStore()
  const showKnockout = activeTab === 'knockout';


  const syncTournament = (groups:Group[]) => {
    localStorage.setItem('drawnGroups', JSON.stringify(groups))
    setTournament(generateTournamentFromGroups(groups,2))
  } 

  useEffect(() => {
    if (groups.length > 0) syncTournament(groups)
  }, [groups]);

  useEffect(() => {
    const saved = localStorage.getItem('drawnGroups')
    if (saved) setGroups(JSON.parse(saved))
  }, []);

  return (
    <Main>
      <ContentWrapper>
        <SwitchTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'groups' && (
              <GroupsLayout>
                <Menu
                  setActiveTab={setActiveTab}
                />
                <Groups />
              </GroupsLayout>
            )}
        {showKnockout && tournament && <TournamentBracket/>}
        {showKnockout && !tournament && <div>Nenhum mata-mata gerado ainda.</div>}
      </ContentWrapper>
    </Main>
  );
};

export default Home;
