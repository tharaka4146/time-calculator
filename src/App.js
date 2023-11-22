import "./App.css";
import handleSubmit from "./handles/handlesubmit";
import { useRef } from "react";

function App() {
  var currentdate = new Date();
  console.log("currentdate", currentdate);

  //var diff = d2.getTime() - d1.getTime();

  const dataRef = useRef();

  const submithandler = (e) => {
    e.preventDefault();
    handleSubmit(dataRef.current.value);
    dataRef.current.value = "";
  };

  return (
    <div className="App">
      <form onSubmit={submithandler}>
        <input type="text" ref={dataRef} />
        <button type="submit">Save</button>

        <br />
        <button type="submit">main</button>
        <button type="submit">undo</button>
      </form>
    </div>
  );
}

export default App;
