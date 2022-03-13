import DiaryItem from "./DiaryItem";

export interface ListType {
  id: number;
  author: string;
  content: string;
  emotion: number;
  created_date: number;
}

interface ListProps {
  diaryList: ListType[];
  onRemove: (id: number) => void;
  onEdit: (id: number, content: string) => void;
}

const DiaryList = ({ diaryList, onRemove, onEdit }: ListProps) => {
  return (
    <div className="DiaryList">
      <h1>✨Diary List</h1>
      <div className="item">
        {diaryList.length < 2 ? (
          <span>{diaryList.length} item</span>
        ) : (
          <span>{diaryList.length} items</span>
        )}
      </div>

      <div>
        {diaryList.map((item) => (
          <DiaryItem key={item.id} item={item} onRemove={onRemove} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
