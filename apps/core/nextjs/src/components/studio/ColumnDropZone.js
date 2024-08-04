import { useDrop } from "react-dnd";
import DraggableItem from "./DraggableItem";

const ColumnDropZone = ({
  column,
  sectionId,
  selectedFieldId,
  handleFocus,
  handleBlur,
  handleInputChange,
  handleMoveItem,
  deleteField,
  ItemType,
}) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: () => ({ id: column.id, type: "column" }),
  });

  return (
    <div ref={drop} className="flex-1 bg-white rounded-lg">
      {column.fields.length === 0 ? (
        <div>
          <DraggableItem
            key={0}
            item={{}}
            index={0}
            column={{}}
            selectedFieldId={selectedFieldId}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            handleInputChange={handleInputChange}
            moveItem={handleMoveItem}
            parentId={column.id}
            placeholder={true}
          />
        </div>
      ) : (
        column.fields.map((field, index) => (
          <DraggableItem
            key={field.id}
            item={field}
            index={index}
            column={column}
            selectedFieldId={selectedFieldId}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            handleInputChange={handleInputChange}
            moveItem={handleMoveItem}
            parentId={column.id}
            deleteField={deleteField}
          />
        ))
      )}
    </div>
  );
};

export default ColumnDropZone;
