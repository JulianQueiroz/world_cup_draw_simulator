export type Team = {
  id: string
  name: string
  code: string
  confederation: string
  flag: string
  qualificationType?: string
}

export type Group = {
  id: string
  name: string
  teams: Team[]
}