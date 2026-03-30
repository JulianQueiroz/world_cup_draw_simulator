import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Group } from "@/types/draw";
import { useDroppable } from "@dnd-kit/core";

export default function GroupContainer({
  group,
  children,
}: {
  group: Group;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({
    id: group.id,
  });

  return (
    <Card ref={setNodeRef} className="mx-2 w-full max-w-sm pt-0">
      <CardHeader className="bg-green-600">
        <CardTitle className='py-1 font-bold text-white'>{group.name}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}