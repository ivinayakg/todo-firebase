import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { db } from "./firebase_config";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styled from "styled-components";

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
`;

const Todos = ({ todos }) => {
  const deleteTodo = (id) => {
    db.collection("todos").doc(id).delete();
  };
  const doneTodo = (id, data) => {
    db.collection("todos")
      .doc(id)
      .update({ ...data, is_in_progress: true });
  };

  return (
    <div>
      <List>
        {todos.map((todo, index) => {
          return (
            <ListItem
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <Content>
                <ListItemIcon>
                  {todo.is_in_progress ? (
                    <CheckCircleIcon style={{ color: "blue" }} />
                  ) : (
                    <CancelIcon style={{ color: "red" }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={todo.todo} />
              </Content>
              <BtnBox>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete Me
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => doneTodo(todo.id, todo)}
                >
                  Done
                </Button>
              </BtnBox>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Todos;
