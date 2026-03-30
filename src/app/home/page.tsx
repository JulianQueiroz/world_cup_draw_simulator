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

const Home = () => {
  const [activeTab, setActiveTab] = useState('groups');
  const [drawnGroups, setDrawnGroups] = useState<Group[]>([]);
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const showKnockout = activeTab === 'knockout';


  const syncTournament = (groups:Group[]) => {
    localStorage.setItem('drawnGroups', JSON.stringify(groups))
    setTournament(generateTournamentFromGroups(groups,2))
  } 

  useEffect(() => {
    if (drawnGroups.length > 0) syncTournament(drawnGroups)
  }, [drawnGroups]);

  useEffect(() => {
    const saved = localStorage.getItem('drawnGroups')
    if (saved) setDrawnGroups(JSON.parse(saved))
  }, []);

  return (
    <Main>
      <ContentWrapper>
        <SwitchTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'groups' && (
              <GroupsLayout>
                <Menu
                  setDrawnGroups={setDrawnGroups}
                  setActiveTab={setActiveTab}
                />
                <Groups groups={drawnGroups} onGroupsChange={setDrawnGroups} />
              </GroupsLayout>
            )}
        {showKnockout && tournament && <TournamentBracket tournament={tournament} setTournament={setTournament} />}
        {showKnockout && !tournament && <div>Nenhum mata-mata gerado ainda.</div>}
      </ContentWrapper>
    </Main>
  );
};

export default Home;
