import { useMemo } from 'react';
import { Tournament } from '@/types/knockout';
import MatchCard from '../Knockouts/MatchCard';

type TournamentBracketProps = {
  tournament: Tournament;
  setTournament: React.Dispatch<React.SetStateAction<Tournament | null>>;
}

export function TournamentBracket({ tournament, setTournament }: TournamentBracketProps) {
  const totalRounds = useMemo(() => tournament.rounds.length, [tournament]);

  const isLastRound = useMemo(() => (roundNumber: number) => roundNumber === totalRounds, [totalRounds]);

  function handleSelectWinner(matchId: string, teamId: string) {
    setTournament((prev) => {
      if(!prev) return prev
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
    <div className="">
      {/* bracket container */}
      <div className="overflow-x-auto pb-6 flex justify-center sm:overflow-x-auto">
        <div className="flex flex-col gap-0 w-full sm:inline-flex sm:flex-row sm:gap-12 sm:min-w-min sm:px-4">
          {tournament.rounds.map((round) => (
            <div key={round.id} className="flex flex-col border-l-2 border-gray-200 pl-3 ml-2 pb-5 last:pb-0 sm:border-l-0 sm:pl-0 sm:ml-0 sm:pb-0">
              {/* round header */}
              <div className="mb-6">
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">{round.name}</h2>
              </div>

              {/* matches container */}
              <div className="flex flex-col flex-1 gap-6 justify-center">
                {round.matches.map((match) => (
                  <div key={match.id} className="transform">
                    <MatchCard isLastRound={isLastRound(round.number)} match={match} onSelectWinner={handleSelectWinner} />
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
