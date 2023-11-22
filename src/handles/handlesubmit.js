import { addDoc, collection, getCountFromServer } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const fetchPost = async () => {
  const coll = collection(firestore, "test_time_collection");
  const snapshot = await getCountFromServer(coll);
  console.log("count:============ ", snapshot.data().count);
  return snapshot.data().count;
};

export const signingIn = (dateTime) => {
  const ref = collection(firestore, "test_time_collection");

  let data = {
    state: 1,
    dateTime: dateTime,
    id: fetchPost(),
  };

  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};

export const signingOff = (dateTime) => {
  const ref = collection(firestore, "test_time_collection");

  let data = {
    state: 2,
    dateTime: dateTime,
  };

  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};

export const away = (dateTime) => {
  const ref = collection(firestore, "test_time_collection");

  let data = {
    state: 3,
    dateTime: dateTime,
  };

  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};

export const back = (dateTime) => {
  const ref = collection(firestore, "test_time_collection");

  let data = {
    state: 4,
    dateTime: dateTime,
  };

  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};

export const undo = (dateTime) => {
  const ref = collection(firestore, "test_time_collection");

  let data = {
    state: 5,
    dateTime: dateTime,
  };

  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};
