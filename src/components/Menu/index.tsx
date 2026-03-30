import { Group, Team } from '@/types/draw';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CompletedSelectionProgress from '../CompletedSelectionProgress';
import SliderComponent from '../Slider';
import TeamSelection from '../TeamSelection';
import { useState } from 'react';
import shuffleArray from '@/lib/utils';
import { useStore } from '@/lib/store';

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const Menu = ({setActiveTab}:Props) => {
  const {setGroups} = useStore()
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

    setGroups(groups);
  }

  return (
    <Card className="mx-auto flex w-full max-w-sm flex-col p-5">
      <SliderComponent title="Número de grupos" sliderValue={groupsCount} onChange={setGroupsCount} />

      <SliderComponent title="Times por grupo" sliderValue={teamsPerGroup} onChange={setTeamsPerGroup} />

      <TeamSelection selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams} maxTeams={maxTeams} />

      <CompletedSelectionProgress  selectedCount={selectedCount} maxTeams={maxTeams} />

      <Button className='bg-green-600 hover:bg-green-700 text-white' onClick={handleDrawGroups}>Sortear grupos</Button>
      <Button className='bg-green-100 text-green-700 hover:bg-green-200' onClick={() => setActiveTab('knockout')}>Avançar para Mata-Mata</Button>
      <Button className='bg-gray-100 text-gray-700' onClick={handleDrawGroups}>Re-sortear</Button>
    </Card>
  );
};

export default Menu