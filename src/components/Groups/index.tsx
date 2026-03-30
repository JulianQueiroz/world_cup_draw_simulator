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
import { Group, Team } from '@/types/draw';
import TeamDragItem from './TeamDragItem';
import GroupContainer from './GroupContainer';
import { findGroupByTeamId, findTeamById } from '@/lib/groups';
import TeamDragOverlay from './TeamDragOverlay';

type Props = {
  groups: Group[];
  onGroupsChange: React.Dispatch<React.SetStateAction<Group[]>>;
};

const Groups = ({ groups, onGroupsChange }: Props) => {
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const activeId = String(event.active.id);
    const team = findTeamById(groups,activeId);
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

    const sourceGroup = findGroupByTeamId(groups,activeId);
    const targetGroup = findGroupByTeamId(groups,overId) || groups.find((group) => group.id === overId);

    if (!sourceGroup || !targetGroup) {
      setActiveTeam(null);
      return;
    }

    if (sourceGroup.id === targetGroup.id) {
      const oldIndex = sourceGroup.teams.findIndex((team) => team.id === activeId);
      const newIndex = sourceGroup.teams.findIndex((team) => team.id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        onGroupsChange((prev) =>
          prev.map((group) =>
            group.id === sourceGroup.id
              ? { ...group, teams: arrayMove(group.teams, oldIndex, newIndex) }
              : group,
          ),
        );
      }

      setActiveTeam(null);
      return;
    }

    onGroupsChange((prev) => {
      const nextGroups = [...prev];

      const sourceIndex = nextGroups.findIndex(
        (group) => group.id === sourceGroup.id,
      );
      const targetIndex = nextGroups.findIndex(
        (group) => group.id === targetGroup.id,
      );

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
      <TeamDragOverlay activeTeam={activeTeam}/> {/* faz com que o item flutue entre containeres */}
    </DndContext>
  );
};

export default Groups;