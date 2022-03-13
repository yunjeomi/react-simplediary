import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import OptimizeTest from "./OptimizeTest";

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

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0,20).map((item:any) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random()*5)+1,
        created_date: new Date().getTime(),
        id: dataId.current++
      }
    })

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, [])
  

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
    setData(data.filter((item) => item.id !== targetId));
  };

  const onEdit = (targetId: number, newContent: string) => {
    setData(
      data.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : { ...item }
      )
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((item) => item.emotion >=3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length)*100;
    return {goodCount, badCount, goodRatio};
  }, [data.length]);

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>total : {data.length}</div>
      <div>good emotions : {goodCount}</div>
      <div>bad emotions : {badCount}</div>
      <div>good ratio : {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
