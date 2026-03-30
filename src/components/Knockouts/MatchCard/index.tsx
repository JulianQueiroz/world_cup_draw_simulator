import { Card, CardContent } from "../../ui/card";
import { cn } from "../../../lib/utils"
import { Match } from "@/types/knockout";
import { TrophyIcon } from "lucide-react";

type MatchCardProps = {
  match: Match;
  onSelectWinner: (matchId: string, teamId: string) => void;
  isLastRound: boolean;
};

export default function MatchCard({ match, onSelectWinner, isLastRound }: MatchCardProps) {
  const getTeamHighlight = (teamId: string | null, winner: string | null) => {
    if (!winner || !teamId) return 'bg-muted';
    return teamId === winner ? 'bg-green-200 font-bold dark:bg-green-900/30' : 'bg-muted';
  };
  const isChampion = (teamId: string | null) => isLastRound && !!match.winner && teamId === match.winner;

  return (
    <Card className="w-full">
      <CardContent className="p-0 bg-white shadow-sm border border-gray-200">
        {/* time 1 */}
        <button
          onClick={() => match.team1.id && onSelectWinner(match.id, match.team1.id)}
          className={cn('w-full px-4 py-3 text-left divide-y divide-gray-100', getTeamHighlight(match.team1.id, match.winner))}>
          <div className="flex justify-between">
            <div>
              <span className="mr-2">{match.team1.flag}</span>
              {match.team1.name}
            </div>
            {isChampion(match.team1.id) && <TrophyIcon />}
          </div>
        </button>

        {/* time 2 */}
        <button
          onClick={() => match.team2.id && onSelectWinner(match.id, match.team2.id)}
          className={cn('w-full px-4 py-3 text-left divide-y divide-gray-100', getTeamHighlight(match.team2.id, match.winner))}>
          <div className="flex justify-between">
            <div>
              <span className="mr-2">{match.team2.flag}</span>
              {match.team2.name}
            </div>
            {isChampion(match.team2.id) && <TrophyIcon />}
          </div>
        </button>
      </CardContent>
    </Card>
  );
}