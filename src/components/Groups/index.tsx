'use client';

import { GroupsContent } from '@/app/home/style';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors, useDroppable, type DragEndEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useState } from 'react';

type Props = {
  groups: Group[];
  onGroupsChange: React.Dispatch<React.SetStateAction<Group[]>>;
};

function GroupContainer({ group, children }: { group: Group; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({
    id: group.id,
  });

  return (
    <Card ref={setNodeRef} className="mx-2 w-full max-w-sm pt-0">
      <CardHeader className="bg-blue-500">
        <CardTitle>{group.name}</CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}

function SortableItem({ team }: { team: Team }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: team.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} className="mb-2 flex items-center justify-between rounded bg-muted p-2">
      <span>
        {team.flag} {team.name}
      </span>

      <GripVertical {...attributes} {...listeners} className="h-4 w-4 cursor-grab opacity-60" />
    </li>
  );
}

const Groups = ({ groups, onGroupsChange }: Props) => {
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
  function findGroupByTeamId(teamId: string) {
    return groups.find((group) => group.teams.some((team) => team.id === teamId));
  }
  function findTeamById(teamId: string) {
    for (const group of groups) {
      const team = group.teams.find((team) => team.id === teamId);
      if (team) return team;
    }
    return null;
  }

  function handleDragStart(event: DragStartEvent) {
    const activeId = String(event.active.id);
    const team = findTeamById(activeId);
    setActiveTeam(team ?? null);
  }
  function handleDragCancel() {
    setActiveTeam(null);
  }
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const sourceGroup = findGroupByTeamId(activeId);
    const targetGroup = findGroupByTeamId(overId) || groups.find((group) => group.id === overId);

    if (!sourceGroup || !targetGroup) return;

    if (sourceGroup.id === targetGroup.id) {
      const oldIndex = sourceGroup.teams.findIndex((team) => team.id === activeId);
      const newIndex = sourceGroup.teams.findIndex((team) => team.id === overId);

      if (oldIndex === -1 || newIndex === -1) return;

      onGroupsChange((prev) => prev.map((group) => (group.id === sourceGroup.id ? { ...group, teams: arrayMove(group.teams, oldIndex, newIndex) } : group)));

      return;
    }

    onGroupsChange((prev) => {
      const nextGroups = [...prev];

      const sourceIndex = nextGroups.findIndex((group) => group.id === sourceGroup.id);
      const targetIndex = nextGroups.findIndex((group) => group.id === targetGroup.id);

      if (sourceIndex === -1 || targetIndex === -1) return prev;

      const sourceTeams = [...nextGroups[sourceIndex].teams];
      const targetTeams = [...nextGroups[targetIndex].teams];

      const movingTeamIndex = sourceTeams.findIndex((team) => team.id === activeId);
      if (movingTeamIndex === -1) return prev;

      const [movingTeam] = sourceTeams.splice(movingTeamIndex, 1);

      const overTeamIndex = targetTeams.findIndex((team) => team.id === overId);

      if (overTeamIndex === -1) {
        targetTeams.push(movingTeam);
      } else {
        targetTeams.splice(overTeamIndex, 0, movingTeam);
      }

      nextGroups[sourceIndex] = {
        ...nextGroups[sourceIndex],
        teams: sourceTeams,
      };

      nextGroups[targetIndex] = {
        ...nextGroups[targetIndex],
        teams: targetTeams,
      };

      return nextGroups;
    });
    setActiveTeam(null);
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <GroupsContent className="w-full">
        {groups.map((group) => (
          <GroupContainer key={group.id} group={group}>
            <SortableContext items={group.teams.map((team) => team.id)} strategy={verticalListSortingStrategy}>
              <ul>
                {group.teams.map((team) => (
                  <SortableItem key={team.id} team={team} />
                ))}
              </ul>
            </SortableContext>
          </GroupContainer>
        ))}
      </GroupsContent>
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
    </DndContext>
  );
};

export default Groups;
