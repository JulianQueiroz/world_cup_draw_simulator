import { TrophyIcon } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';
import { Match } from '../../../types/knockout';
import {
  MatchWrapper,
  TeamButton,
  TeamInfo,
  TeamName,
  ChampionIconWrapper,
} from './style';

type MatchCardProps = {
  match: Match;
  onSelectWinner: (matchId: string, teamId: string) => void;
  isLastRound: boolean;
};

export default function MatchCard({ match, onSelectWinner, isLastRound }: MatchCardProps) {
  const isWinner = (teamId: string | null, winner: string | null) => {
    return !!teamId && !!winner && teamId === winner;
  };

  const isChampion = (teamId: string | null) =>
    isLastRound && !!match.winner && teamId === match.winner;

  return (
    <MatchWrapper>
      <TeamButton
        onClick={() => match.team1.id && onSelectWinner(match.id, match.team1.id)}
        $isWinner={isWinner(match.team1.id, match.winner)}
      >
        <TeamInfo>
          {match.team1.iso && (
            <ReactCountryFlag
              countryCode={match.team1.iso}
              svg
              style={{ width: '1.2em', height: '1.2em' }}
            />
          )}
          <TeamName>{match.team1.name}</TeamName>
        </TeamInfo>

        {isChampion(match.team1.id) && (
          <ChampionIconWrapper>
            <TrophyIcon size={18} />
          </ChampionIconWrapper>
        )}
      </TeamButton>

      <TeamButton
        onClick={() => match.team2.id && onSelectWinner(match.id, match.team2.id)}
        $isWinner={isWinner(match.team2.id, match.winner)}
      >
        <TeamInfo>
          {match.team2.iso && (
            <ReactCountryFlag
              countryCode={match.team2.iso}
              svg
              style={{ width: '1.2em', height: '1.2em' }}
            />
          )}
          <TeamName>{match.team2.name}</TeamName>
        </TeamInfo>

        {isChampion(match.team2.id) && (
          <ChampionIconWrapper>
            <TrophyIcon size={18} />
          </ChampionIconWrapper>
        )}
      </TeamButton>
    </MatchWrapper>
  );
}