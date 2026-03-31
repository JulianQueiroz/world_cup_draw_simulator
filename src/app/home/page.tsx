'use client';

import { useEffect, useState } from 'react';
import { ContentWrapper, GroupsLayout, Main } from './style';
import { TournamentBracket } from '../../components/TournamentBracket';
import { useStore } from '../../lib/store';
import SwitchTabs from '../../components/SwitchTabs';
import Menu from '../../components/Menu';
import { Group } from '../../types/draw';
import Groups from '../../components/Groups';
import { generateTournamentFromGroups } from '../../lib/knockout';
import { drawRepository } from '../../lib/repository/drawRepository';

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
    const groups = drawRepository.loadGroups();
    if (groups.length > 0) setGroups(groups);
  }, []);

  return (
    <Main className='dark:bg-zinc-900 text-black dark:text-white'>
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
