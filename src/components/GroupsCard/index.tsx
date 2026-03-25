import { GroupsContent } from "@/app/home/style";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { CSS } from "@dnd-kit/utilities"

function SortableItem({ team }: { team: { id: string; name: string } }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: team.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 mb-2 bg-muted rounded cursor-grab"
    >
      {team.name}
    </li>
  )
}

const GroupCard = () => {
  const sensors = useSensors(useSensor(PointerSensor));

  const [groupA, setGroupA] = useState([
    { id: 'brasil', name: 'Brasil' },
    { id: 'gana', name: 'Gana' },
    { id: 'marrocos', name: 'Marrocos' },
    { id: 'franca', name: 'França' },
  ]);
  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = groupA.findIndex((i) => i.id === active.id);
    const newIndex = groupA.findIndex((i) => i.id === over.id);

    setGroupA(arrayMove(groupA, oldIndex, newIndex));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <GroupsContent>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Grupo A</CardTitle>
          </CardHeader>

          <CardContent>
            <SortableContext items={groupA.map((i) => i.id)} strategy={verticalListSortingStrategy}>
              <ul>
                {groupA.map((team) => (
                  <SortableItem key={team.id} team={team} />
                ))}
              </ul>
            </SortableContext>
          </CardContent>
        </Card>
      </GroupsContent>
    </DndContext>
  );
};


export default GroupCard