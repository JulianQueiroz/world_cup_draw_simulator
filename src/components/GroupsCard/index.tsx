'use client';

import { GroupsContent } from '@/app/home/style';
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

type Team = {
  id: string;
  name: string;
};

type Group = {
  id: string;
  name: string;
  teams: Team[];
};

type Props = {
  groups: Group[];
};

function SortableItem({ team }: { team: Team }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: team.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="mb-2 flex items-center justify-between rounded bg-muted p-2"
    >
      <span>{team.name}</span>
      <GripVertical
        {...attributes}
        {...listeners}
        className="h-4 w-4 cursor-grab opacity-60"
      />
    </li>
  );
}

const GroupCard = ({ groups }: Props) => {
  const sensors = useSensors(useSensor(PointerSensor));
  const [localGroups, setLocalGroups] = useState<Group[]>(groups);

  useEffect(() => {
    setLocalGroups(groups);
  }, [groups]);

  function handleDragEnd(event: any, groupId: string) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLocalGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;

        const oldIndex = group.teams.findIndex((team) => team.id === active.id);
        const newIndex = group.teams.findIndex((team) => team.id === over.id);

        return {
          ...group,
          teams: arrayMove(group.teams, oldIndex, newIndex),
        };
      })
    );
  }

  return (
    <GroupsContent className="w-full">
      {localGroups.map((group) => (
        <DndContext
          key={group.id}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => handleDragEnd(event, group.id)}
        >
          <Card className="mx-2 w-full max-w-sm pt-0">
            <CardHeader className="bg-blue-500">
              <CardTitle>{group.name}</CardTitle>
            </CardHeader>

            <CardContent>
              <SortableContext
                items={group.teams.map((team) => team.id)}
                strategy={verticalListSortingStrategy}
              >
                <ul>
                  {group.teams.map((team) => (
                    <SortableItem key={team.id} team={team} />
                  ))}
                </ul>
              </SortableContext>
            </CardContent>
          </Card>
        </DndContext>
      ))}
    </GroupsContent>
  );
};

export default GroupCard;