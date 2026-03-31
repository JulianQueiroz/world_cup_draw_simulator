import { Group, Team } from '@/types/draw';
import CompletedSelectionProgress from '../CompletedSelectionProgress';
import SliderComponent from '../Slider';
import TeamSelection from '../TeamSelection';
import { useState } from 'react';
import { shuffleArray } from '@/lib/utils';
import { useStore } from '@/lib/store';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import data from '@/data/team.json';

const MAX_TEAMS = 32;

const allTeams: Team[] = data.teams.map((team) => ({
  id: team.code,
  name: team.name,
  code: team.code,
  iso: team.iso,
  confederation: team.confederation,
}));

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const Menu = ({ setActiveTab }: Props) => {
  const { setGroups, groups } = useStore();
  const [groupsCount, setGroupsCount] = useState<number[]>([2]);
  const [teamsPerGroup, setTeamsPerGroup] = useState<number[]>([4]);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);

  const totalGroups = groupsCount[0];
  const totalTeamsPerGroup = teamsPerGroup[0];
  const maxTeams = Math.min(totalGroups * totalTeamsPerGroup, MAX_TEAMS);
  const selectedCount = selectedTeams.length;

  const maxTeamsPerGroup = Math.floor(MAX_TEAMS / totalGroups);
  const maxGroups = Math.floor(MAX_TEAMS / totalTeamsPerGroup);

  function handleDrawGroups() {
    if (selectedTeams.length === 0) {
      setError('Selecione ao menos uma seleção antes de sortear.');
      return;
    }
    if (selectedTeams.length !== maxTeams) {
      setError(`Selecione exatamente ${maxTeams} seleções para sortear.`);
      return;
    }
    setError(null);

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

  function handleSelectAll() {
    setSelectedTeams(allTeams.slice(0, maxTeams));
  }

  function handleAutoDrawGroups() {
    const shuffledAll = shuffleArray(allTeams).slice(0, maxTeams);
    setSelectedTeams(shuffledAll);

    const groups: Group[] = Array.from({ length: totalGroups }, (_, index) => ({
      id: `group-${index + 1}`,
      name: `Grupo ${String.fromCharCode(65 + index)}`,
      teams: [],
    }));

    let teamIndex = 0;
    for (let groupIndex = 0; groupIndex < totalGroups; groupIndex++) {
      for (let slot = 0; slot < totalTeamsPerGroup; slot++) {
        if (teamIndex >= shuffledAll.length) break;
        groups[groupIndex].teams.push(shuffledAll[teamIndex]);
        teamIndex++;
      }
    }

    setGroups(groups);
    setError(null);
  }

  function handleAdvanceToKnockout() {
    const expectedTeams = totalGroups * totalTeamsPerGroup;
    const totalTeamsInGroups = groups.reduce((acc, g) => acc + g.teams.length, 0);

    if (totalTeamsInGroups !== expectedTeams) {
      setError(`Os grupos precisam ter exatamente ${expectedTeams} seleções no total para avançar.`);
      return;
    }
    setError(null);
    setActiveTab('knockout');
  }

  return (
    <Card className="mx-auto flex w-full max-w-sm flex-col gap-2 p-5">
      <SliderComponent
        title="Número de grupos"
        sliderValue={groupsCount}
        onChange={(val) => {
          const newMax = Math.floor(MAX_TEAMS / teamsPerGroup[0]);
          setGroupsCount([Math.min(val[0], newMax)]);
        }}
        max={maxGroups}
      />

      <SliderComponent
        title="Times por grupo"
        sliderValue={teamsPerGroup}
        onChange={(val) => {
          const newMax = Math.floor(MAX_TEAMS / groupsCount[0]);
          setTeamsPerGroup([Math.min(val[0], newMax)]);
        }}
        max={maxTeamsPerGroup}
      />

      <TeamSelection selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams} maxTeams={maxTeams} />

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1 text-xs" onClick={handleSelectAll}>
          Selecionar todos ({maxTeams})
        </Button>
        <Button variant="outline" className="flex-1 text-xs" onClick={handleAutoDrawGroups}>
          Sortear automaticamente
        </Button>
      </div>

      <CompletedSelectionProgress selectedCount={selectedCount} maxTeams={maxTeams} />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleDrawGroups}>
        Sortear grupos
      </Button>
      <Button className="bg-green-100 text-green-700 hover:bg-green-200" onClick={handleAdvanceToKnockout}>
        Avançar para Mata-Mata
      </Button>
      <Button className="bg-gray-100 text-gray-700" onClick={handleDrawGroups}>
        Re-sortear
      </Button>
    </Card>
  );
};

export default Menu;
