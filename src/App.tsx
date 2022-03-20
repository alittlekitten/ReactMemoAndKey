import { useState } from "react";
import "./App.css";
import NumComponent from "./NumComponent";

function App() {
  const [cnt, setCnt] = useState<number>(1);
  const [cntList, setCntList] = useState<number[]>([]);

  const addList = () => {
    setCntList([cnt, ...cntList]);
    setCnt(cnt + 1);
  };

  return (
    <div className="App">
      <button type="button" onClick={addList}>
        add!
      </button>
      {cntList.map((elem) => {
        return <NumComponent key={elem} x={elem} />;
      })}
    </div>
  );
}

export default App;
