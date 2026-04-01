'use client';

import * as React from 'react';
import { Badge } from '../../components/ui/badge';
import ComboboxComponent from './Combobox';
import { Team } from '../../types/draw';
import ReactCountryFlag from 'react-country-flag';

type Props = {
  selectedTeams: Team[];
  setSelectedTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  maxTeams: number;
};

const TeamSelection = ({ selectedTeams, setSelectedTeams, maxTeams }: Props) => {
  return (
    <>
      <ComboboxComponent selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams} maxTeams={maxTeams} />
      {selectedTeams.length > 0 && (
        <button onClick={() => setSelectedTeams([])} className="mt-1 text-xs text-gray-400 hover:text-gray-300 transition-colors self-end">
          Desmarcar todos
        </button>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {selectedTeams.map((team) => (
          <Badge
            key={team.code}
            variant="outline"
            className="cursor-pointer flex items-center gap-2 group"
            onClick={() => setSelectedTeams((prev) => prev.filter((item) => item.code !== team.code))}>
            <ReactCountryFlag countryCode={team.iso} svg style={{ width: '1.2em', height: '1.2em' }} /> {team.name}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">×</span>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default TeamSelection;
