import { Team } from "@/types/draw";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import { CSS } from '@dnd-kit/utilities';

export default function TeamDragItem({ team }: { team: Team }) { // componente arrastavel
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
      <span>
        {team.flag} {team.name}
      </span>

      <GripVertical
        {...attributes}
        {...listeners}
        className="h-4 w-4 cursor-grab opacity-60"
      />
    </li>
  );
}
