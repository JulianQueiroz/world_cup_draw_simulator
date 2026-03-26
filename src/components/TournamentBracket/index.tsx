import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Match, Tournament } from '@/types/knockout';

interface TournamentBracketProps {
  tournament: Tournament;
  setTournament: React.Dispatch<React.SetStateAction<Tournament>>;
}

function MatchCard({ match, onSelectWinner }: { match: Match; onSelectWinner: (matchId: string, teamId: string) => void }) {
  const getTeamHighlight = (teamId: string | null, winner: string | null) => {
    if (!winner || !teamId) return 'bg-muted';
    return teamId === winner ? 'bg-green-100 dark:bg-green-900/30' : 'bg-muted';
  };

  return (
    <Card className="w-48">
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {/* Team 1 */}
          <button
            onClick={() => onSelectWinner(match.id, match.team1.id)}
            className={cn('w-full px-3 py-3 text-left hover:bg-accent transition', getTeamHighlight(match.team1.id, match.winner))}>
            {match.team1.name}
          </button>

          {/* Team 2 */}
          <button
            onClick={() => onSelectWinner(match.id, match.team2.id)}
            className={cn('w-full px-3 py-3 text-left hover:bg-accent transition', getTeamHighlight(match.team2.id, match.winner))}>
            {match.team2.name}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export function TournamentBracket({ tournament,setTournament }: TournamentBracketProps) {
  const totalRounds = useMemo(() => tournament.rounds.length, [tournament]);

  const isLastRound = useMemo(() => (roundNumber: number) => roundNumber === totalRounds, [totalRounds]);

  function handleSelectWinner(matchId: string, teamId: string) {
    setTournament((prev) => {
      const next = structuredClone(prev);

      for (const round of next.rounds) {
        for (const match of round.matches) {
          if (match.id === matchId) {
            match.winner = teamId;

            if (match.nextMatchId) {
              for (const nextRound of next.rounds) {
                const nextMatch = nextRound.matches.find((m) => m.id === match.nextMatchId);

                if (nextMatch) {
                  if (match.nextMatchSlot === 'team1') {
                    nextMatch.team1 = match.team1.id === teamId ? match.team1 : match.team2;
                  } else {
                    nextMatch.team2 = match.team1.id === teamId ? match.team1 : match.team2;
                  }
                }
              }
            }
          }
        }
      }

      return next;
    });
  }

  return (
    <div className="w-full">
      {/* Bracket Container */}
      <div className="overflow-x-auto pb-6">
        <div className="inline-flex gap-12 min-w-min px-4">
          {tournament.rounds.map((round) => (
            <div key={round.id} className="flex flex-col">
              {/* Round Header */}
              <div className="mb-6">
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">{round.name}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  {round.matches.length} match{round.matches.length !== 1 ? 'es' : ''}
                </p>
              </div>

              {/* Matches Container */}
              <div className="flex flex-col flex-1 gap-6 justify-center">
                {round.matches.map((match) => (
                  <div key={match.id} className="transform transition-transform duration-200 hover:scale-105">
                    <MatchCard match={match} onSelectWinner={handleSelectWinner} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
