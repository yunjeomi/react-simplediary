import {
  ReducerAction,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import OptimizeTest from "./OptimizeTest";

export type DiaryType = {
  id: number;
  author: string;
  content: string;
  emotion: number;
  created_date: number;
};

type Init_action = {
  type: "INIT";
  data: DiaryType[];
};

type Create_action = {
  type: "CREATE";
  data: DiaryType;
};

type Remove_action = {
  type: "REMOVE";
  targetId: number;
};

type Edit_action = {
  type: "EDIT";
  targetId: number;
  newContent: string;
};

type Action = Init_action | Create_action | Remove_action | Edit_action;

const reducer = (prevState: DiaryType[], action: Action):DiaryType[] => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...prevState];
    }
    case "REMOVE": {
      return prevState.filter((item) => item.id !== action.targetId);
    }
    case "EDIT": {
      return prevState.map((item) =>
        item.id === action.targetId
          ? { ...item, content: action.newContent }
          : { ...item }
      );
    }
    default:
      return prevState;
  }
};

function App() {
  const [data, dispatch] = useReducer(reducer, Array<DiaryType>());
  // const [data, setData] = useState();

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((item: any) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    dispatch({ type: "INIT", data: initData });

    // setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback(
    (author: string, content: string, emotion: number) => {
      const newItem = {
        author,
        content,
        emotion,
        id: dataId.current,
        created_date: 0,
      };

      // dispatch 함수로 state를 변화시키겠다.
      dispatch({ type: "CREATE", data: newItem });

      dataId.current += 1;
      // setData((data) => [newItem, ...data]);
    },
    []
  );

  const onRemove = useCallback((targetId: number) => {
    dispatch({ type: "REMOVE", targetId });
    // setData((data) => data.filter((item) => item.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId: number, newContent: string) => {
    dispatch({ type: "EDIT", targetId, newContent });
    // setData((data) =>
    //   data.map((item) =>
    //     item.id === targetId ? { ...item, content: newContent } : { ...item }
    //   )
    // );
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((item:DiaryType) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

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
