export type PendingGoalsResponse = GoalType[]

export type GoalType = {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}

export async function getPendingGaols(): Promise<PendingGoalsResponse> {
  const res = await fetch('http://localhost:3333/pending-goals')
  const data = await res.json()

  return data.pendingGoals
}
