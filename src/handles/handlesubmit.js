import { addDoc, collection, getCountFromServer } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

let dateTime = new Date();

export const signingIn = () => {
  const ref = collection(firestore, "test_time_collection");

  let data = {
    state: 1,
    dateTime: dateTime,
  };

  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};

export const signingOff = () => {
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

export const away = () => {
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

export const back = () => {
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

export const undo = () => {
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
