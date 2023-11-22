import "./App.css";
import {
  signingIn,
  signingOff,
  away,
  back,
  undo,
} from "./handles/handlesubmit";
import { useRef } from "react";

import {
  collection,
  getDocs,
  getCountFromServer,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { firestore } from "./firebase_setup/firebase";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [monday, setMonday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wednesday, setWednesday] = useState([]);

  var currentdate = new Date();
  // console.log("currentdate", currentdate.getTime());

  // console.log("monday==============", monday);
  // console.log("tuesday==============", tuesday);
  // console.log("wednesday==============", wednesday);
  //var diff = d2.getTime() - d1.getTime();

  const dataRef = useRef();

  useEffect(() => {
    fetchPost();
  }, []);

  // const getPost = async () => {
  //   const postCollection = collection(firestore, "test_time_collection");
  //   const data = await getDocs(query(postCollection, orderBy("date", "desc")));
  //   const newData = data.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));

  //   setPostList(newData);
  // };

  const fetchPost = async () => {
    const postCollection = collection(firestore, "test_time_collection");
    const data = await getDocs(
      query(postCollection, orderBy("dateTime", "desc"))
    );
    const newData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setTodos(newData);
    console.log("todos======", todos);
    // setPostList(newData);

    // const coll = collection(firestore, "test_time_collection");
    // const snapshot = await getCountFromServer(coll);
    // console.log("count:============ ", snapshot.data().count);

    // await getDocs(collection(firestore, "test_time_collection")).then(
    //   (querySnapshot) => {
    //     const newData = querySnapshot.docs.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.data().dateTime.seconds,
    //     }));
    //     setTodos(newData);
    //     console.log(todos, todos);
    //     // console.log("newData", newData[0].dateTime.toDate());
    //     // newData.forEach((dateTime) => {
    //     //   console.log("dateTime", dateTime.dateTime.toDate());
    //     // });
    //     // console.log("todos", todos[0].dateTime);
    //     // console.log("todos", todos[2].dateTime);
    //     // const temp = todos[0].dateTime - todos[2].dateTime;
    //     // console.log("compare", todos[0].dateTime.compareTo(todos[2].dateTime));
    //     // console.log("todos difference", temp);
    //     // console.log("todos difference", temp.toDate());
    //   }
    // );
  };

  // const t1 = new Date(todos[0].dateTime.seconds * 1000); // your initial time
  // const t2 = new Date(todos[9].dateTime.seconds * 1000); // your later time

  // const diff = t2 - t1;
  // const SEC = 1000,
  //   MIN = 60 * SEC,
  //   HRS = 60 * MIN;
  // const humanDiff = `${Math.floor(diff / HRS)}:${Math.floor(
  //   (diff % HRS) / MIN
  // ).toLocaleString("en-US", { minimumIntegerDigits: 2 })}:${Math.floor(
  //   (diff % MIN) / SEC
  // ).toLocaleString("en-US", { minimumIntegerDigits: 2 })}.${Math.floor(
  //   diff % SEC
  // ).toLocaleString("en-US", {
  //   minimumIntegerDigits: 4,
  //   useGrouping: false,
  // })}`;

  // console.log("humanDiff:", humanDiff);}

  const getDateOnly = (fullDate) => {
    return (
      fullDate.getFullYear() +
      "/" +
      (fullDate.getMonth() + 1) +
      "/" +
      fullDate.getDate()
    );
  };

  const getCurrentWeekDate = (weekday) => {
    let currentDate = new Date(new Date());
    let day = currentDate.getDay();
    let currentWeekMonday =
      currentDate.getDate() - day + (day == 0 ? -6 : weekday);
    return getDateOnly(new Date(currentDate.setDate(currentWeekMonday)));
  };

  const getDifference = (signingInTime, signingOffTime) => {
    const t1 = new Date(signingInTime.dateTime.seconds * 1000);
    const t2 = new Date(signingOffTime.dateTime.seconds * 1000);

    const diff = t2 - t1;
    const SEC = 1000,
      MIN = 60 * SEC,
      HRS = 60 * MIN;
    const humanDiff = `${Math.floor(diff / HRS)}:${Math.floor(
      (diff % HRS) / MIN
    ).toLocaleString("en-US", { minimumIntegerDigits: 2 })}:${Math.floor(
      (diff % MIN) / SEC
    ).toLocaleString("en-US", { minimumIntegerDigits: 2 })}.${Math.floor(
      diff % SEC
    ).toLocaleString("en-US", {
      minimumIntegerDigits: 4,
      useGrouping: false,
    })}`;

    console.log("humanDiff============================", humanDiff);
  };

  let signingInTime;
  let signingOffTime;

  const getTotalTimeDifference = (day) => {
    day.map((events) => {
      signingInTime = events.state == 1 ? events : signingInTime;
      signingOffTime = events.state == 2 ? events : signingOffTime;
    });
    getDifference(signingInTime, signingOffTime);
  };

  let dayArray = [[], [], [], [], [], []];

  const timeCalculate = () => {
    todos.map((dateTime) => {
      let currentDayDate = getDateOnly(
        new Date(dateTime.dateTime.seconds * 1000)
      );

      switch (currentDayDate) {
        case getCurrentWeekDate(1):
          dayArray[0].push(dateTime);
          // setMonday(dayArray[0]);
          break;
        // case getCurrentWeekDate(2):
        //   dayArray[1].push(dateTime);
        //   setTuesday(dayArray[1]);
        //   break;
        // case getCurrentWeekDate(3):
        //   dayArray[2].push(dateTime);
        //   setWednesday(dayArray[2]);
        //   break;
      }
    });

    console.log("dayArray[0]===========", dayArray[0]);

    dayArray.map((day) => {
      getTotalTimeDifference(day);
    });

    // dayArray[0].map((singleDay) => {
    //   signingInTime = singleDay.state == 1 ? singleDay : signingInTime;
    //   signingOffTime = singleDay.state == 2 ? singleDay : signingOffTime;
    // });

    // getDifference(signingInTime, signingOffTime);
  };

  const signingInHandler = (e) => {
    // console.log("dataRef.current.value", dataRef.current.value);
    signingIn(currentdate);
    e.preventDefault();
    // handleSubmit(dataRef.current.value);
    // dataRef.current.value = "";
  };

  const signingOffHandler = (e) => {
    signingOff(currentdate);
    e.preventDefault();
  };

  const awayHandler = (e) => {
    away(currentdate);
    e.preventDefault();
  };
  const backHandler = (e) => {
    back(currentdate);
    e.preventDefault();
  };
  const undoHandler = (e) => {
    undo(currentdate);
    e.preventDefault();
  };

  return (
    <div className="App">
      <button onClick={signingInHandler}>Signing in</button>
      <button onClick={signingOffHandler}>Signing off</button>
      <button onClick={awayHandler}>away</button>
      <button onClick={backHandler}>back</button>
      <button onClick={undoHandler}>undo</button>
      <button onClick={timeCalculate}>time</button>

      <br />
      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th>mon</th>
            <th>tue</th>
            <th>wed</th>
            <th>thur</th>
            <th>fri</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todos, key) => (
            <tr key={1}>
              <td>{todos.id}</td>
              <td>{todos.id}</td>
              <td>{todos.id}</td>
              <td>{todos.id}</td>
              <td>{todos.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
