import { DrawMenuState, Group, Team } from '../../types/draw';
import CompletedSelectionProgress from '../CompletedSelectionProgress';
import TeamSelection from '../TeamSelection';
import { useEffect, useState } from 'react';
import { shuffleArray } from '../../lib/utils';
import { useStore } from '../../lib/store';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import data from '../../data/team.json';
import { validateDrawSelection, validateDuplicateTeams, validateEqualGroupSizes, validateGroupCompletion } from '../../lib/draw/validations';
import { drawRepository } from '@/lib/repository/drawRepository';
import { generateTournamentFromGroups } from '@/lib/knockout/knockout';
import { buildGroups } from '@/lib/draw/groups';
import RadioGroup from '../RadioGroup';
import SliderComponent from '../Slider';

const MAX_TEAMS = 32;

const allTeams: Team[] = data.teams.map((team) => ({
  id: team.code,
  name: team.name,
  code: team.code,
  iso: team.iso,
  confederation: team.confederation,
}));

type Props = {
  setActiveTab: (tab: string) => void;
};

const Menu = ({ setActiveTab }: Props) => {
  const { setGroups, groups, setTournament } = useStore();
  const [groupsCount, setGroupsCount] = useState(2);
  const [teamsPerGroup, setTeamsPerGroup] = useState(4);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const totalGroups = groupsCount;
  const totalTeamsPerGroup = teamsPerGroup;
  const maxTeams = Math.min(totalGroups * totalTeamsPerGroup, MAX_TEAMS);
  const maxTeamsPerGroup = Math.floor(MAX_TEAMS / totalGroups);
  const selectedCount = selectedTeams.length;

  useEffect(() => {
    const savedSettings = drawRepository.loadSettings();
    if (savedSettings) {
      const restoredMaxTeams = Math.min(savedSettings.totalGroups * savedSettings.teamsPerGroup, MAX_TEAMS);
      setGroupsCount(savedSettings.totalGroups);
      setTeamsPerGroup(savedSettings.teamsPerGroup);
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
    if (selectionError) return setError(selectionError);

    const duplicateError = validateDuplicateTeams(selectedTeams);
    if (duplicateError) return setError(duplicateError);

    setError(null);

    const shuffled = shuffleArray(selectedTeams);
    const groups = buildGroups(shuffled, totalGroups, totalTeamsPerGroup);
    const tournament = generateTournamentFromGroups(groups, 2);

    setGroups(groups);
    setTournament(tournament);
  }

  function handleSelectAll() {
    setSelectedTeams(allTeams.slice(0, maxTeams));
  }

  function handleAutoDrawGroups() {
    const shuffled = shuffleArray(allTeams).slice(0, maxTeams);
    const groups = buildGroups(shuffled, totalGroups, totalTeamsPerGroup);
    const tournament = generateTournamentFromGroups(groups, 2);

    setSelectedTeams(shuffled);
    setGroups(groups);
    setTournament(tournament);
    setError(null);
  }

  function handleAdvanceToKnockout() {
    const completionError = validateGroupCompletion(groups, totalGroups * totalTeamsPerGroup);
    if (completionError) return setError(completionError);

    const sizeError = validateEqualGroupSizes(groups);
    if (sizeError) return setError(sizeError);

    const tournament = generateTournamentFromGroups(groups, 2);
    setTournament(tournament);

    setError(null);
    setActiveTab('knockout');
  }

  return (
    <Card className="mx-auto flex w-full max-w-sm flex-col gap-2 p-5">
      <RadioGroup
        title="Número de grupos"
        value={groupsCount}
        onChange={(val) => setGroupsCount(val)}
        options={[2, 4, 8]}
      />

      <SliderComponent
        title="Times por grupo"
        sliderValue={[teamsPerGroup]}
        onChange={(val) => setTeamsPerGroup(Math.min(val[0], maxTeamsPerGroup))}
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