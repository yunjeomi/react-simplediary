import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

export interface DiaryType {
  id: number;
  author: string;
  content: string;
  emotion: number;
  created_date: number;
}

function App() {
  const [data, setData] = useState(Array<DiaryType>());

  const dataId = useRef(0);

  const onCreate = (author: string, content: string, emotion: number) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId: number) => {
    console.log(`${targetId}가 삭제 되었음.`);
    setData(data.filter((item) => item.id !== targetId));
  };

  const onEdit = (targetId: number, newContent: string) => {
    setData(
      data.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : { ...item }
      )
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
