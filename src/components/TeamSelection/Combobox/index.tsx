import {
  Combobox,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from '../../../components/ui/combobox';
import data from '../../../data/team.json';
import { Team } from '../../../types/draw';

import React from 'react';
type Props = {
  selectedTeams: Team[];
  setSelectedTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  maxTeams: number;
};

const teamsData: Team[] = data.teams.map((team) => ({
  id: team.code,
  name: team.name,
  code: team.code,
  flag: team.flag,
  confederation: team.confederation,
}));

const ComboboxComponent = ({ selectedTeams, setSelectedTeams, maxTeams }: Props) => {
  const [search, setSearch] = React.useState('');
  const anchor = React.useRef<HTMLDivElement | null>(null);

  const filteredTeams = teamsData.filter((team) => `${team.name} ${team.code}`.toLowerCase().includes(search.toLowerCase()));

  function handleValueChange(values: string[]) {
    const nextSelectedTeams = values.map((code) => teamsData.find((team) => team.code === code)).filter(Boolean) as Team[];

    if (nextSelectedTeams.length <= maxTeams) {
      setSelectedTeams(nextSelectedTeams);
    }
  }
  return (
    <div className="relative w-full">
      <Combobox
        multiple
        autoHighlight
        items={filteredTeams}
        value={selectedTeams.map((team) => team.code)}
        onValueChange={(values) => handleValueChange(values as string[])}>
        <ComboboxChips ref={anchor} className="w-full">
          <ComboboxValue>
            {() => <ComboboxChipsInput placeholder="Pesquise por nome ou sigla" value={search} onChange={(e) => setSearch(e.target.value)} />}
          </ComboboxValue>
        </ComboboxChips>

        <ComboboxContent anchor={anchor} className="z-50 mt-2 w-[var(--radix-popper-anchor-width)]">
          <ComboboxEmpty>Nenhuma seleção encontrada.</ComboboxEmpty>

          <ComboboxList>
            {(team) => (
              <ComboboxItem key={team.code} value={team.code}>
                {team.flag} {team.name} ({team.code})
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export default ComboboxComponent