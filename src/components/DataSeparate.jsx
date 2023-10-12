import { DndContext, useDroppable } from "@dnd-kit/core";

export const DataSeparate = ({ children, ...props }) => {
  const { attributes, listeners, setNodeRef, transform } = useDroppable({
    id: children,
    data: { title: children },
  });
  return (
    <div
      ref={setNodeRef}
      {...props}
      //   rows="3"
      //   className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};
