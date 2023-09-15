import { useEffect, useState } from "react";

import save from "./assets/images/save.png";
import edit from "./assets/images/edit.png";
import del from "./assets/images/delete.png";

import "./App.scss";

const App = () => {
  const getData = () => {
    const storageData = localStorage.getItem("notes");
    console.log(storageData);
    if (storageData) {
      return JSON.parse(storageData);
    } else {
      return [];
    }
    // console.log(storageData);
  };

  const [inputData, setInputData] = useState("");
  const [userData, setUserData] = useState(getData);
  const [id, setId] = useState();

  /* ________-- cock--__________*/
  const [time, setTime] = useState({
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
    seconds: new Date().getSeconds(),
  });
  const date = new Date().toDateString();
  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setTime({
        minutes: date.getMinutes(),
        hours: date.getHours(),
        seconds: date.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const Time =
    date + " ⌚ " + time.hours + " : " + time.minutes + " : " + time.seconds;

  const addData = () => {
    if (!inputData) {
      alert("first make the note then save !");
    } else if (inputData && id) {
      setUserData(
        userData.map((curEle) => {
          if (curEle.id === id) {
            return { ...curEle, name: inputData, saveTime: Time };
          }
          return curEle;
        })
      );
      setInputData([]);
      setId(null);
    } else {
      const idData = {
        id: new Date().getTime().toString(),
        saveTime: Time,
        name: inputData,
      };
      setUserData([...userData, idData]);
      setInputData("");
    }
  };

  const deleteData = (id) => {
    const deleteItem = userData.filter((curEle) => {
      return curEle.id !== id;
    });
    setUserData(deleteItem);
  };

  const EditData = (id) => {
    const editedData = userData.find((curEle) => {
      return curEle.id === id;
    });
    setInputData(editedData.name);
    setId(id);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(userData));
  }, [userData]);

  return (
    <>
      <div className="container">
        <div className="userInput">
          <textarea
            name="userInput"
            id="userInput"
            cols="30"
            rows="10"
            placeholder="keep your notes here ..... "
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          ></textarea>
          <div className="userInput_features">
            <button onClick={() => addData()}>
              <img src={save} alt={save} />
            </button>
            <p>{Time}</p>
          </div>
        </div>
        <div className="notes">
          {userData.map((curEle) => {
            return (
              <>
                <div className="saveNotes" key={curEle.id}>
                  <div className="userNotes">
                    <div className="boder">
                      <p>{`${curEle.saveTime} `}</p>
                      <div className="notesData">{curEle.name}</div>
                      <div className="buttons">
                        <button id="btn" onClick={() => EditData(curEle.id)}>
                          <img src={edit} alt={edit} />
                        </button>
                        <button onClick={() => deleteData(curEle.id)}>
                          <img src={del} alt={del} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
