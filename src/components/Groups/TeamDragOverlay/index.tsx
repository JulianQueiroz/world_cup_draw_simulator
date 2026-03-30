import { DragOverlay } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';
import { Team } from '@/types/draw';

type Props = { activeTeam: Team | null };

const TeamDragOverlay = ({ activeTeam }: Props) => (
<DragOverlay>
  {activeTeam ? (
    <div className="flex items-center justify-between rounded bg-muted p-2 shadow-lg">
      <span>
        {activeTeam.flag} {activeTeam.name}
      </span>
      <GripVertical className="h-4 w-4 opacity-60" />
    </div>
  ) : null}
</DragOverlay>
)

export default TeamDragOverlay