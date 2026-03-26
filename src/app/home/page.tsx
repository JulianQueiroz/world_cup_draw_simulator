'use client';

import { useState } from 'react';
import { ContentWrapper, Main } from './style';
import SwitchTabs from '@/components/SwitchTabs';
import Menu from '@/components/Menu';
import Groups from '@/components/Groups';
import { TournamentBracket } from '@/components/TournamentBracket';
import type { Tournament } from '@/types/knockout';
import { Group, Team } from '@/types/draw';
import tournamentData from '@/data/knockout.json';

const initialTournament = tournamentData.tournament as Tournament;

const Home = () => {
  const [activeTab, setActiveTab] = useState('groups');
  const [groupsCount, setGroupsCount] = useState<number[]>([2]);
  const [teamsPerGroup, setTeamsPerGroup] = useState<number[]>([4]);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [drawnGroups, setDrawnGroups] = useState<Group[]>([]);
  const [tournament, setTournament] = useState<Tournament>(initialTournament);

  return (
    <Main>
      <ContentWrapper>
        <SwitchTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'groups' && (
          <>
            <Menu
              groupsCount={groupsCount}
              setGroupsCount={setGroupsCount}
              teamsPerGroup={teamsPerGroup}
              setTeamsPerGroup={setTeamsPerGroup}
              selectedTeams={selectedTeams}
              setSelectedTeams={setSelectedTeams}
              drawnGroups={drawnGroups}
              setDrawnGroups={setDrawnGroups}
              setActiveTab={setActiveTab}
            />

            <Groups groups={drawnGroups} onGroupsChange={setDrawnGroups} />
          </>
        )}

        {activeTab === 'knockout' && <TournamentBracket tournament={tournament} setTournament={setTournament} />}
      </ContentWrapper>
    </Main>
  );
};

export default Home;
