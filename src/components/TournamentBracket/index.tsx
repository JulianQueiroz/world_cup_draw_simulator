import { useMemo } from 'react';
import MatchCard from '../Knockouts/MatchCard';
import { useStore } from '@/lib/store';
import { applyWinner, generateTournamentFromGroups } from '@/lib/knockout/knockout';
import { drawRepository } from '@/lib/repository/drawRepository';
import { Button } from '../../../components/ui/button';
import { RotateCcw } from 'lucide-react';

export function TournamentBracket() {
  const { tournament, setTournament, groups } = useStore();
  if (!tournament) return null;
  const totalRounds = useMemo(() => tournament.rounds.length, [tournament]);

  const isLastRound = useMemo(() => (roundNumber: number) => roundNumber === totalRounds, [totalRounds]);

  function handleSelectWinner(matchId: string, teamId: string) {
    if (!tournament) return;
    setTournament(applyWinner(tournament, matchId, teamId));
  }

  function handleResetKnockout() {
    if (!groups.length) return;

    const resetTournament = generateTournamentFromGroups(groups, 2);
    setTournament(resetTournament);
    drawRepository.saveTournament(resetTournament);
  }
  return (
    <div className="mt-5">
      <div className="mb-4 flex justify-center sm:justify-end">
        <Button variant="outline" className="bg-transparent border-0" onClick={handleResetKnockout}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Resetar mata-mata
        </Button>
      </div>
      {/* bracket container */}
      <div className="overflow-x-auto pb-6 flex justify-center sm:overflow-x-auto">
        <div className="flex flex-col gap-0 w-full sm:inline-flex sm:flex-row sm:gap-12 sm:min-w-min sm:px-4">
          {tournament.rounds.map((round) => (
            <div
              key={round.id}
              className="flex flex-col border-l-2 border-gray-200 dark:border-none pl-3 ml-2 pb-5 last:pb-0
             sm:border-l-0 sm:pl-0 sm:ml-0 sm:pb-0 sm:w-44">
              {/* round header */}
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-widest">{round.name}</h2>
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
