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

const TeamSelection = ({selectedTeams,setSelectedTeams,maxTeams}: Props) => {
  return (
    <>
      <ComboboxComponent selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams} maxTeams={maxTeams}/>

      <div className="mt-3 flex flex-wrap gap-2">
        {selectedTeams.map((team) => (
          <Badge
            key={team.code}
            variant="outline"
            className="cursor-pointer"
            onClick={() => setSelectedTeams((prev) => prev.filter((item) => item.code !== team.code))}>
            <ReactCountryFlag countryCode={team.iso} svg style={{ width: '1.2em', height: '1.2em' }} /> {team.name}
          </Badge>
        ))}
      </div>
    </>
  );
};

export default TeamSelection;
