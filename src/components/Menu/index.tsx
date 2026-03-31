import { DrawMenuState, Group, Team } from '../../types/draw';
import CompletedSelectionProgress from '../CompletedSelectionProgress';
import SliderComponent from '../Slider';
import TeamSelection from '../TeamSelection';
import { useEffect, useState } from 'react';
import { shuffleArray } from '../../lib/utils';
import { useStore } from '../../lib/store';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import data from '../../data/team.json';
import { validateDrawSelection, validateDuplicateTeams, validateGroupCompletion } from '../../lib/validations';
import { drawRepository } from '@/lib/repository/drawRepository';
import { generateTournamentFromGroups } from '@/lib/knockout';
import { buildGroups } from '@/lib/groups';

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
  const { setGroups, groups, setTournament } = useStore();
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
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedSettings = drawRepository.loadSettings();
    if (savedSettings) {
      const restoredMaxTeams = Math.min(savedSettings.totalGroups * savedSettings.teamsPerGroup, MAX_TEAMS);

      setGroupsCount([savedSettings.totalGroups]);
      setTeamsPerGroup([savedSettings.teamsPerGroup]);
      setSelectedTeams((savedSettings.selectedTeams ?? []).slice(0, restoredMaxTeams));
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (selectedTeams.length > maxTeams) {
      setSelectedTeams((prev) => prev.slice(0, maxTeams));
    }
  }, [maxTeams, selectedTeams.length]);

  useEffect(() => {
    if (!isHydrated) return;

    const settings: DrawMenuState = {
      totalGroups,
      teamsPerGroup: totalTeamsPerGroup,
      maxTeams,
      selectedTeams,
    };

    drawRepository.saveSettings(settings);
  }, [isHydrated, totalGroups, totalTeamsPerGroup, maxTeams, selectedTeams]);

  function handleDrawGroups() {
    const selectionError = validateDrawSelection(selectedTeams, maxTeams);
    if (selectionError) {
      setError(selectionError);
      return;
    }

    const duplicateError = validateDuplicateTeams(selectedTeams);
    if (duplicateError) {
      setError(duplicateError);
      return;
    }
    setError(null);

    const shuffledTeams = shuffleArray(selectedTeams);
    const groups = buildGroups(shuffledTeams, totalGroups, totalTeamsPerGroup);

    let teamIndex = 0;
    for (let groupIndex = 0; groupIndex < totalGroups; groupIndex++) {
      for (let slot = 0; slot < totalTeamsPerGroup; slot++) {
        if (teamIndex >= shuffledTeams.length) break;
        groups[groupIndex].teams.push(shuffledTeams[teamIndex]);
        teamIndex++;
      }
    }
    const tournament = generateTournamentFromGroups(groups, 2);

    setGroups(groups);
    drawRepository.saveGroups(groups);

    setTournament(tournament);
    drawRepository.saveTournament(tournament);
  }

  function handleSelectAll() {
    setSelectedTeams(allTeams.slice(0, maxTeams));
  }

  function handleAutoDrawGroups() {
    const shuffledAll = shuffleArray(allTeams).slice(0, maxTeams);
    setSelectedTeams(shuffledAll);

    const groups = buildGroups(shuffledAll, totalGroups, totalTeamsPerGroup);


    let teamIndex = 0;
    for (let groupIndex = 0; groupIndex < totalGroups; groupIndex++) {
      for (let slot = 0; slot < totalTeamsPerGroup; slot++) {
        if (teamIndex >= shuffledAll.length) break;
        groups[groupIndex].teams.push(shuffledAll[teamIndex]);
        teamIndex++;
      }
    }

    const tournament = generateTournamentFromGroups(groups, 2);

    setGroups(groups);
    drawRepository.saveGroups(groups);

    setTournament(tournament);
    drawRepository.saveTournament(tournament);

    setError(null);
  }

  function handleAdvanceToKnockout() {
    const completionError = validateGroupCompletion(groups, totalGroups * totalTeamsPerGroup);
    if (completionError) {
      setError(completionError);
      return;
    }

    const tournament = generateTournamentFromGroups(groups, 2);

    setTournament(tournament);
    drawRepository.saveTournament(tournament);

    setError(null);
    setActiveTab('knockout');
  }

  return (
    <Card className="mx-auto flex w-full max-w-sm flex-col gap-2 p-5 ">
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
