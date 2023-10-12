import { DndContext, useDroppable } from "@dnd-kit/core";

export const CardCreativo = ({ className, nCreativo }) => {
  const { setNodeRef } = useDroppable({
    id: "CardCreativo",
  });
  return (
    <div className={className} ref={setNodeRef}>
      {nCreativo.map((v) => (
        <div key={v?._id} className="bg-white">
          {v.contenido}
        </div>
      ))}
    </div>
  );
};
