import type { Group } from '@/types/draw';
import type { KnockoutTeam, Match, Round, Tournament } from '@/types/knockout';

function getRoundName(teamCount: number) {
  if (teamCount === 2) return 'Final';
  if (teamCount === 4) return 'Semifinals';
  if (teamCount === 8) return 'Quarterfinals';
  if (teamCount === 16) return 'Round of 16';
  return `Round of ${teamCount}`;
}

function getQualifiedTeams(groups: Group[], qualifiedPerGroup = 2): KnockoutTeam[] {
  return groups.flatMap((group) =>
    group.teams.slice(0, qualifiedPerGroup).map((team, index) => ({
      id: team.id,
      name: team.name,
      iso: team.iso,
      seed: index + 1,
      score: null,
    }))
  );
}

export function generateTournamentFromGroups(groups: Group[], qualifiedPerGroup = 2): Tournament {
  const qualifiedTeams = getQualifiedTeams(groups, qualifiedPerGroup);

  const rounds: Round[] = [];
  let currentTeams: KnockoutTeam[] = [...qualifiedTeams];
  let roundNumber = 1;
  let matchCounter = 1;

  while (currentTeams.length >= 2) {
    const matches: Match[] = [];
    const currentRoundMatchCount = currentTeams.length / 2;

    const nextRoundStartMatchId = matchCounter + currentRoundMatchCount;

    for (let i = 0; i < currentTeams.length; i += 2) {
      const currentMatchNumberInRound = i / 2;

      let nextMatchId: string | undefined;
      let nextMatchSlot: 'team1' | 'team2' | undefined;

      if (currentRoundMatchCount > 1) {
        const nextMatchNumberInRound = Math.floor(currentMatchNumberInRound / 2);

        nextMatchId = `match-${nextRoundStartMatchId + nextMatchNumberInRound}`;
        nextMatchSlot = currentMatchNumberInRound % 2 === 0 ? 'team1' : 'team2';
      }

      matches.push({
        id: `match-${matchCounter}`,
        matchNumber: matchCounter,
        status: 'pending',
        team1: currentTeams[i] ?? { id: null, name: 'TBD' },
        team2: currentTeams[i + 1] ?? { id: null, name: 'TBD' },
        winner: null,
        nextMatchId,
        nextMatchSlot,
      });

      matchCounter++;
    }

    rounds.push({
      id: `round-${roundNumber}`,
      name: getRoundName(currentTeams.length),
      number: roundNumber,
      matches,
    });

    currentTeams = Array.from({ length: currentTeams.length / 2 }, () => ({
      id: null,
      name: 'TBD',
      score: null,
      flag: '',
    }));

    roundNumber++;
  }

  return {
    id: 'generated-tournament',
    name: 'Knockout Stage',
    description: 'Generated from group stage results',
    status: 'pending',
    rounds,
  };
}
