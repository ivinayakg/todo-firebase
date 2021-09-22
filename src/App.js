import "./App.css";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { db } from "./firebase_config";
import Todos from "./Todos";
import firebase from "firebase/app";

function App() {
  const [Input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      todo: Input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      is_in_progress: false,
    });
    setInput("");
  };

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            is_in_progress: doc.data().is_in_progress,
          }))
        );
      });
  }, []);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Todo App</h1>
        <form>
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            value={Input}
            style={{ maxWidth: "300px", width: "90vw" }}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Button
            type="submit"
            disabled={!Input}
            style={{ display: "none" }}
            variant="contained"
            onClick={addTodo}
          >
            Add Todo
          </Button>
        </form>
        <Todos todos={todos} />
      </div>
    </div>
  );
}

export default App;
