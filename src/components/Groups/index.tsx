'use client';

import { GroupsContent } from '@/app/home/style';
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { Team } from '@/types/draw';
import TeamDragItem from './TeamDragItem';
import GroupContainer from './GroupContainer';
import { findGroupByTeamId, findTeamById } from '@/lib/draw/groups';
import TeamDragOverlay from './TeamDragOverlay';
import { useStore } from '@/lib/store';

const Groups = () => {
  const { groups, setGroups } = useStore();
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const team = findTeamById(groups, String(event.active.id));
    setActiveTeam(team ?? null);
  }

  function handleDragCancel() {
    setActiveTeam(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      setActiveTeam(null);
      return;
    }

    const activeId = String(active.id);
    const overId = String(over.id);

    const sourceGroup = findGroupByTeamId(groups, activeId);
    const targetGroup = findGroupByTeamId(groups, overId) || groups.find((g) => g.id === overId);

    if (!sourceGroup || !targetGroup) {
      setActiveTeam(null);
      return;
    }

    if (sourceGroup.id === targetGroup.id) {
      const oldIndex = sourceGroup.teams.findIndex((t) => t.id === activeId);
      const newIndex = sourceGroup.teams.findIndex((t) => t.id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        setGroups(
          groups.map((group) =>
            group.id === sourceGroup.id
              ? { ...group, teams: arrayMove(group.teams, oldIndex, newIndex) }
              : group,
          ),
        );
      }

      setActiveTeam(null);
      return;
    }

    const nextGroups = [...groups];

    const sourceIndex = nextGroups.findIndex((g) => g.id === sourceGroup.id);
    const targetIndex = nextGroups.findIndex((g) => g.id === targetGroup.id);

    if (sourceIndex === -1 || targetIndex === -1) {
      setActiveTeam(null);
      return;
    }

    const sourceTeams = [...nextGroups[sourceIndex].teams];
    const targetTeams = [...nextGroups[targetIndex].teams];

    const movingTeamIndex = sourceTeams.findIndex((t) => t.id === activeId);
    if (movingTeamIndex === -1) {
      setActiveTeam(null);
      return;
    }

    const [movingTeam] = sourceTeams.splice(movingTeamIndex, 1);
    const overTeamIndex = targetTeams.findIndex((t) => t.id === overId);

    if (overTeamIndex === -1) {
      targetTeams.push(movingTeam);
    } else {
      targetTeams.splice(overTeamIndex, 0, movingTeam);
    }

    nextGroups[sourceIndex] = { ...nextGroups[sourceIndex], teams: sourceTeams };
    nextGroups[targetIndex] = { ...nextGroups[targetIndex], teams: targetTeams };

    setGroups(nextGroups);
    setActiveTeam(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
    >
      <GroupsContent className="w-full">
        {groups.map((group) => (
          <GroupContainer key={group.id} group={group}>
            <SortableContext
              items={group.teams.map((team) => team.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul>
                {group.teams.map((team) => (
                  <TeamDragItem key={team.id} team={team} />
                ))}
              </ul>
            </SortableContext>
          </GroupContainer>
        ))}
      </GroupsContent>
      <TeamDragOverlay activeTeam={activeTeam} />
    </DndContext>
  );
};

export default Groups;