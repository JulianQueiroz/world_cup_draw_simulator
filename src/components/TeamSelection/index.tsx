'use client'

import * as React from 'react'
import data from '@/data/team.json'
import { Badge } from '@/components/ui/badge'
import {
  Combobox,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from '@/components/ui/combobox'

type Props = {
  selectedTeams: string[]
  setSelectedTeams: React.Dispatch<React.SetStateAction<string[]>>
  maxTeams: number
}

const TeamSelection = ({
  selectedTeams,
  setSelectedTeams,
  maxTeams,
}: Props) => {
  const anchor = React.useRef<HTMLDivElement | null>(null)
  const [search, setSearch] = React.useState('')

  const filteredTeams = data.teams.filter((team) =>
    `${team.name} ${team.code}`.toLowerCase().includes(search.toLowerCase())
  )

  function handleValueChange(values: string[]) {
    if (values.length <= maxTeams) {
      setSelectedTeams(values)
    }
  }

  return (
    <>
      <div className="relative w-full">
        <Combobox
          multiple
          autoHighlight
          items={filteredTeams}
          value={selectedTeams}
          onValueChange={(values) => handleValueChange(values as string[])}
        >
          <ComboboxChips ref={anchor} className="w-full">
            <ComboboxValue>
              {() => (
                <ComboboxChipsInput
                  placeholder="Pesquise por nome ou sigla"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              )}
            </ComboboxValue>
          </ComboboxChips>

          <ComboboxContent
            anchor={anchor}
            className="z-50 mt-2 w-[var(--radix-popper-anchor-width)]"
          >
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

      <div className="mt-3 flex flex-wrap gap-2">
        {selectedTeams.map((code) => {
          const team = data.teams.find((t) => t.code === code)
          if (!team) return null

          return (
            <Badge
              key={code}
              variant="outline"
              className="cursor-pointer"
              onClick={() =>
                setSelectedTeams((prev) => prev.filter((item) => item !== code))
              }
            >
              {team.flag} {team.name}
            </Badge>
          )
        })}
      </div>
    </>
  )
}

export default TeamSelection