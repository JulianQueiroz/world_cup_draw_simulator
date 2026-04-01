import { describe, test } from "vitest"

describe('applyWinner', () => {
  test('define o vencedor no match correto')
  test('propaga o vencedor pro próximo match como team1')
  test('propaga o vencedor pro próximo match como team2')
  test('trocar vencedor atualiza o match seguinte')
  test('match sem nextMatchId não propaga')
})

describe('generateTournamentFromGroups', () => {
  test('2 grupos geram oitavas com 2 partidas')
  test('cada partida tem team1 e team2 definidos')
  test('nextMatchId está encadeado corretamente')
})