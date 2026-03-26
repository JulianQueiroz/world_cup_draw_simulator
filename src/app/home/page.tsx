'use client';

import { ContentWrapper, Main } from './style';
import { Card } from '@/components/ui/card';
import { Button } from '../../../components/ui/button';
import SwitchTabs from '@/components/SwitchTabs';
import SliderComponent from '@/components/Slider';
import TeamSelection from '@/components/TeamSelection';
import GroupCard from '@/components/GroupsCard';
import CompletedSelectionProgress from '@/components/CompletedSelectionProgress';
import { useState } from 'react';

type Team = {
  id: string;
  name: string;
};

type Group = {
  id: string;
  name: string;
  teams: Team[];
};

const Home = () => {
  const [groupsCount, setGroupsCount] = useState<number[]>([2]);
  const [teamsPerGroup, setTeamsPerGroup] = useState<number[]>([4]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [drawnGroups, setDrawnGroups] = useState<Group[]>([]);

  const totalGroups = groupsCount[0];
  const totalTeamsPerGroup = teamsPerGroup[0];
  const maxTeams = totalGroups * totalTeamsPerGroup;
  const selectedCount = selectedTeams.length;

  function shuffleArray<T>(array: T[]) {
    const copied = [...array];

    for (let i = copied.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[randomIndex]] = [copied[randomIndex], copied[i]];
    }

    return copied;
  }

  function handleDrawGroups() {
    const teamObjects: Team[] = selectedTeams.map((code) => ({
      id: code.toLowerCase(),
      name: code,
    }));

    const shuffledTeams = shuffleArray(teamObjects);

    const groups: Group[] = Array.from({ length: totalGroups }, (_, index) => ({
      id: `group-${index + 1}`,
      name: `Grupo ${String.fromCharCode(65 + index)}`,
      teams: [],
    }));

    let teamIndex = 0;

    for (let groupIndex = 0; groupIndex < totalGroups; groupIndex++) {
      for (let slot = 0; slot < totalTeamsPerGroup; slot++) {
        if (teamIndex >= shuffledTeams.length) break;
        groups[groupIndex].teams.push(shuffledTeams[teamIndex]);
        teamIndex++;
      }
    }

    setDrawnGroups(groups);
  }

  function handleReshuffle() {
    handleDrawGroups();
  }

  return (
    <Main>
      <ContentWrapper>
        <SwitchTabs />

        <Card className="mx-auto flex w-full max-w-sm flex-col p-5">
          <SliderComponent
            title="Número de grupos"
            sliderValue={groupsCount}
            onChange={setGroupsCount}
          />

          <SliderComponent
            title="Times por grupo"
            sliderValue={teamsPerGroup}
            onChange={setTeamsPerGroup}
          />

          <TeamSelection
            selectedTeams={selectedTeams}
            setSelectedTeams={setSelectedTeams}
            maxTeams={maxTeams}
          />

          <CompletedSelectionProgress
            selectedCount={selectedCount}
            maxTeams={maxTeams}
          />

          <Button onClick={handleDrawGroups}>Sortear grupos</Button>
          <Button onClick={handleReshuffle}>Re-sortear</Button>
          <Button>Avançar para Mata-Mata</Button>
        </Card>

        <GroupCard groups={drawnGroups} />
      </ContentWrapper>
    </Main>
  );
};

export default Home;