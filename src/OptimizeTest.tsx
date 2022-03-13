import React, { useState, useEffect } from "react";

const CounterA = React.memo(({ count }: any) => {
  useEffect(() => {
    console.log(`counterA update - count : ${count}`);
  });
  return <div>{count}</div>;
});

const CounterB = ({ obj }: any) => {
  useEffect(() => {
    console.log(`counterB update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

// react 함수의 비교함수로 작용
const areEqual = (prev: any, next: any) => {
  //return true // prev == next -> 리렌더링 x
  //return false // prev != next -> 리렌더링 o

  /*
  if(prev.obj.count === next.obj.count) {
    return true;
  }

  return false;
  */

  return prev.obj.count === next.obj.count;
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });
  return (
    <div style={{ padding: 30 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A butn</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B butn
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
