'use client';

import { useEffect, useState } from 'react';
import { ContentWrapper, Main } from './style';
import SwitchTabs from '@/components/SwitchTabs';
import Menu from '@/components/Menu';
import Groups from '@/components/Groups';
import { TournamentBracket } from '@/components/TournamentBracket';
import type { Tournament } from '@/types/knockout';
import { Group, Team } from '@/types/draw';
import { generateTournamentFromGroups } from '@/lib/knockout';


const Home = () => {
  const [activeTab, setActiveTab] = useState('groups');
  const [groupsCount, setGroupsCount] = useState<number[]>([2]);
  const [teamsPerGroup, setTeamsPerGroup] = useState<number[]>([4]);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [drawnGroups, setDrawnGroups] = useState<Group[]>([]);
  const [tournament, setTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    if (drawnGroups.length > 0) {
      localStorage.setItem('drawnGroups', JSON.stringify(drawnGroups));

      const generatedTournament = generateTournamentFromGroups(drawnGroups, 2);
      setTournament(generatedTournament);
    }
  }, [drawnGroups]);

  useEffect(() => {
    const savedGroups = localStorage.getItem('drawnGroups');

    if (savedGroups) {
      const parsedGroups: Group[] = JSON.parse(savedGroups);
      setDrawnGroups(parsedGroups);

      const generatedTournament = generateTournamentFromGroups(parsedGroups, 2);
      setTournament(generatedTournament);
    }
  }, []);
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
        {activeTab === 'knockout' && tournament && <TournamentBracket tournament={tournament} setTournament={setTournament} />}
        {activeTab === 'knockout' && !tournament && <div>Nenhum mata-mata gerado ainda.</div>}
      </ContentWrapper>
    </Main>
  );
};

export default Home;
