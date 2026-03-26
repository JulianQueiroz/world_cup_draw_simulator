import { Button } from '../../../components/ui/button';
import CompletedSelectionProgress from '../CompletedSelectionProgress';
import SliderComponent from '../Slider';
import TeamSelection from '../TeamSelection';
import { Card } from '../ui/card';
import { useState } from 'react';

type Props = {
  setDrawnGroups: React.Dispatch<React.SetStateAction<Group[]>>;
};

const Menu = ({setDrawnGroups}:Props) => {
  const [groupsCount, setGroupsCount] = useState<number[]>([2]);
  const [teamsPerGroup, setTeamsPerGroup] = useState<number[]>([4]);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);

  const totalGroups = groupsCount[0];
  const totalTeamsPerGroup = teamsPerGroup[0];
  const maxTeams = totalGroups * totalTeamsPerGroup;
  const selectedCount = selectedTeams.length;

  function handleDrawGroups() {
    const shuffledTeams = shuffleArray(selectedTeams);

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

  function shuffleArray<T>(array: T[]) {
    const copied = [...array];

    for (let i = copied.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[randomIndex]] = [copied[randomIndex], copied[i]];
    }

    return copied;
  }

  return (
    <Card className="mx-auto flex w-full max-w-sm flex-col p-5">
      <SliderComponent title="Número de grupos" sliderValue={groupsCount} onChange={setGroupsCount} />

      <SliderComponent title="Times por grupo" sliderValue={teamsPerGroup} onChange={setTeamsPerGroup} />

      <TeamSelection selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams} maxTeams={maxTeams} />

      <CompletedSelectionProgress selectedCount={selectedCount} maxTeams={maxTeams} />

      <Button onClick={handleDrawGroups}>Sortear grupos</Button>
      <Button onClick={handleReshuffle}>Re-sortear</Button>
      <Button>Avançar para Mata-Mata</Button>
    </Card>
  );
};

export default Menu