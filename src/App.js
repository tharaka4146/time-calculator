import "./App.css";
import {
  signingIn,
  signingOff,
  away,
  back,
  undo,
} from "./handles/handlesubmit";

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "./firebase_setup/firebase";
import { useState, useEffect } from "react";

function App() {
  const [dateTimeDetails, setDateTimeDetails] = useState([]);
  const [monday, setMonday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wednesday, setWednesday] = useState([]);

  console.log("monday - --------------", monday);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const postCollection = collection(firestore, "test_time_collection");
    const data = await getDocs(
      query(postCollection, orderBy("dateTime", "asc"))
    );
    const newData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setDateTimeDetails(newData);
  };

  const getDate = (fullDate) => {
    return (
      fullDate.getFullYear() +
      "/" +
      (fullDate.getMonth() + 1) +
      "/" +
      fullDate.getDate()
    );
  };

  const getCurrentWeekDate = (weekday) => {
    let currentDate = new Date();
    let day = currentDate.getDay();
    let currentWeekMonday =
      currentDate.getDate() - day + (day == 0 ? -6 : weekday);
    return getDate(new Date(currentDate.setDate(currentWeekMonday)));
  };

  const getDifference = (inTime, offTime) => {
    const t1 = new Date(inTime.dateTime.seconds * 1000);
    const t2 = new Date(offTime.dateTime.seconds * 1000);

    const diff = t2 - t1;
    const SEC = 1000,
      MIN = 60 * SEC,
      HRS = 60 * MIN;
    return `${Math.floor(diff / HRS)}:${Math.floor(
      (diff % HRS) / MIN
    ).toLocaleString("en-US", { minimumIntegerDigits: 2 })}:${Math.floor(
      (diff % MIN) / SEC
    ).toLocaleString("en-US", { minimumIntegerDigits: 2 })}.${Math.floor(
      diff % SEC
    ).toLocaleString("en-US", {
      minimumIntegerDigits: 4,
      useGrouping: false,
    })}`;
  };

  function timeToMins(time) {
    var b = time.split(":");
    return b[0] * 60 + +b[1];
  }
  function timeFromMins(mins) {
    function z(n) {
      return (n < 10 ? "0" : "") + n;
    }
    var h = ((mins / 60) | 0) % 24;
    var m = mins % 60;
    return z(h) + ":" + z(m);
  }

  function addTimes(awayTime) {
    let totAwayTimeCalc = "00:00:00";
    awayTime.map((time) => {
      totAwayTimeCalc = timeFromMins(
        timeToMins(totAwayTimeCalc) + timeToMins(time)
      );
    });

    return totAwayTimeCalc;
  }

  function subtractTimes(dayWorkTime, dayAwayTime) {
    let totWorkingTime = "00:00:00";
    if (dayWorkTime) {
      totWorkingTime = timeFromMins(
        timeToMins(dayWorkTime) - timeToMins(dayAwayTime)
      );
    }
    return totWorkingTime;
  }

  let signingInTime;
  let signingOffTime;
  //
  const getTotalTimeDifference = (day, dayNumber) => {
    if (day != "") {
      day.map((events) => {
        if (events.state == 1) {
          signingInTime = events;
        }

        if (events.state == 2) {
          signingOffTime = events;
        }
      });

      switch (dayNumber) {
        case 0:
          setMonday([signingInTime, signingOffTime]);
          break;
        default:
          break;
      }

      return getDifference(signingInTime, signingOffTime);
    }
  };

  const getTotalAwayTimeDifference = (day) => {
    let awayTime = [];
    let backTime = [];
    let totAwayTime = [];

    if (day != "") {
      day.map((events) => {
        if (events.state == 3) {
          awayTime.push(events);
        }

        if (events.state == 4) {
          backTime.push(events);
        }
      });

      for (let index = 0; index < awayTime.length; index++) {
        totAwayTime.push(getDifference(awayTime[index], backTime[index]));
      }

      return addTimes(totAwayTime);
    }
  };

  let dayDateTime = [[], [], [], [], [], []];
  let dayWorkTime = [];
  let dayAwayTime = [];
  let actualWorkingTime = [];

  const timeCalculate = () => {
    dateTimeDetails.map((dateTimeDetail) => {
      //
      let currentDate = getDate(
        new Date(dateTimeDetail.dateTime.seconds * 1000)
      );
      switch (currentDate) {
        case getCurrentWeekDate(1):
          dayDateTime[0].push(dateTimeDetail);
          break;
        case getCurrentWeekDate(2):
          dayDateTime[1].push(dateTimeDetail);
          break;
        case getCurrentWeekDate(3):
          dayDateTime[2].push(dateTimeDetail);
          break;
        case getCurrentWeekDate(4):
          dayDateTime[3].push(dateTimeDetail);
          break;
        case getCurrentWeekDate(5):
          dayDateTime[4].push(dateTimeDetail);
          break;
      }
    });

    dayDateTime.map((singleDayDateTime, dayNumber) => {
      dayWorkTime.push(getTotalTimeDifference(singleDayDateTime, dayNumber));
      dayAwayTime.push(
        getTotalAwayTimeDifference(singleDayDateTime, dayNumber)
      );
    });

    console.log("dayWorkTime", dayWorkTime);
    console.log("dayAwayTime", dayAwayTime);

    for (let index = 0; index < dayWorkTime.length; index++) {
      actualWorkingTime.push(
        subtractTimes(dayWorkTime[index], dayAwayTime[index])
      );
    }

    console.log("actualWorkingTime", actualWorkingTime);
  };

  const signingInHandler = (e) => {
    signingIn();
    e.preventDefault();
  };

  const signingOffHandler = (e) => {
    signingOff();
    e.preventDefault();
  };

  const awayHandler = (e) => {
    away();
    e.preventDefault();
  };

  const backHandler = (e) => {
    back();
    e.preventDefault();
  };

  const undoHandler = (e) => {
    undo();
    e.preventDefault();
  };

  Date.prototype.customFormat = function (formatString) {
    var YYYY,
      YY,
      MMMM,
      MMM,
      MM,
      M,
      DDDD,
      DDD,
      DD,
      D,
      hhhh,
      hhh,
      hh,
      h,
      mm,
      m,
      ss,
      s,
      ampm,
      AMPM,
      dMod,
      th;
    YY = ((YYYY = this.getFullYear()) + "").slice(-2);
    MM = (M = this.getMonth() + 1) < 10 ? "0" + M : M;
    MMM = (MMMM = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][M - 1]).substring(0, 3);
    DD = (D = this.getDate()) < 10 ? "0" + D : D;
    DDD = (DDDD = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][this.getDay()]).substring(0, 3);
    th =
      D >= 10 && D <= 20
        ? "th"
        : (dMod = D % 10) == 1
        ? "st"
        : dMod == 2
        ? "nd"
        : dMod == 3
        ? "rd"
        : "th";
    formatString = formatString
      .replace("#YYYY#", YYYY)
      .replace("#YY#", YY)
      .replace("#MMMM#", MMMM)
      .replace("#MMM#", MMM)
      .replace("#MM#", MM)
      .replace("#M#", M)
      .replace("#DDDD#", DDDD)
      .replace("#DDD#", DDD)
      .replace("#DD#", DD)
      .replace("#D#", D)
      .replace("#th#", th);
    h = hhh = this.getHours();
    if (h == 0) h = 24;
    if (h > 12) h -= 12;
    hh = h < 10 ? "0" + h : h;
    hhhh = hhh < 10 ? "0" + hhh : hhh;
    AMPM = (ampm = hhh < 12 ? "am" : "pm").toUpperCase();
    mm = (m = this.getMinutes()) < 10 ? "0" + m : m;
    ss = (s = this.getSeconds()) < 10 ? "0" + s : s;
    return formatString
      .replace("#hhhh#", hhhh)
      .replace("#hhh#", hhh)
      .replace("#hh#", hh)
      .replace("#h#", h)
      .replace("#mm#", mm)
      .replace("#m#", m)
      .replace("#ss#", ss)
      .replace("#s#", s)
      .replace("#ampm#", ampm)
      .replace("#AMPM#", AMPM);
  };

  // console.log("monday", monday[0].dateTime.seconds);

  var now = new Date(new Date(monday[0].dateTime.seconds * 1000));
  console.log("@@@@@@@@@@", now.customFormat("#hh#:#mm# #ampm# "));

  return (
    <div className="App">
      <button onClick={signingInHandler}>Signing in</button>
      <br />
      <br />
      <button onClick={signingOffHandler}>Signing off</button>
      <br />
      <br />
      <button onClick={awayHandler}>away</button>
      <br />
      <br />
      <button onClick={backHandler}>back</button>
      <br />
      <br />
      <button onClick={undoHandler}>undo</button>
      <br />
      <br />
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
          {dateTimeDetails.map((dateTimeDetails, key) => (
            <tr key={1}>
              <td>{now.customFormat("#hh#:#mm# #ampm# ")}</td>
              <td>{dateTimeDetails.id}</td>
              <td>{dateTimeDetails.id}</td>
              <td>{dateTimeDetails.id}</td>
              <td>{dateTimeDetails.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
