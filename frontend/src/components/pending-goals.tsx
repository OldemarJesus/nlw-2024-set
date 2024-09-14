import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { getPendingGaols, type GoalType } from '../http/get-pending-goals'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createGoalCompletion } from '../http/create-goal-completions'

export function PendingGoals() {
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGaols,
    staleTime: 1000 * 60, // 60 seconds
  })

  if (!data) {
    return null
  }

  function isCompleted(goal: GoalType) {
    return goal.completionCount >= goal.desiredWeeklyFrequency
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)
    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={isCompleted(goal)}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
