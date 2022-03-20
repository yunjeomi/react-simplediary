import React, { useRef, useState } from "react";
import { ListType } from "./DiaryList";

interface ItemProps {
  item: ListType;
  onRemove: (id: number) => void;
  onEdit: (id: number, content: string) => void;
}

const DiaryItem = ({ item, onRemove, onEdit }: ItemProps) => {
  const localContentRef = useRef<HTMLTextAreaElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const [localContent, setLocalContent] = useState(item.content);

  const handleRemove = (id: number) => {
    if (window.confirm(`Are you sure to delete item ${id}?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    toggleIsEdit();
    setLocalContent(item.content);
  };

  const handleEdit = (id: number, content: string) => {
    if (content.length < 5) {
      localContentRef.current?.focus();
      return;
    }

    if (window.confirm(`Are you sure to edit item ${id}?`)) {
      onEdit(id, content);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <div>
          author: {item.author} | score: {item.emotion}
        </div>
        <div className="date">
          {new Date(item.created_date).toLocaleString()}
        </div>
      </div>
      <div className="content">
        {isEdit ? (
          <textarea
            ref={localContentRef}
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
          />
        ) : (
          <>{item.content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>Cancel</button>
          <button onClick={() => handleEdit(item.id, localContent)}>
            Save
          </button>
        </>
      ) : (
        <>
          <button onClick={toggleIsEdit}>Edit</button>
          <button onClick={() => handleRemove(item.id)}>Remove</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
