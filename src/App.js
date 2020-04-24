import React, {useState} from 'react';
import './App.css';
import Create from './components/Create';
import Container from '@material-ui/core/Container';
import TodoList from './components/TodoList';
import CircularProgress from '@material-ui/core/CircularProgress';

// Configurations
const appConfig = require('./configs/app');
const apiRoot = `http://localhost:${appConfig.expressPort}/`;

function useAsyncHook() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState("false");

  React.useEffect(() => {

    async function getTasks(){
      try{
        setLoading("true");
      let body = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      };
      const tasks = await fetch(apiRoot + "tasks", body)
        .then(response => {
          if(response.ok) {
            return response.json();
          } else {
            console.log(response);
            return null;
          }
        })

      setResult(tasks);
      setLoading("false");
      }catch(error){
        setLoading("null");
      }
    }

    getTasks();
    

  });

  return [result, loading];
}




function App() {
  var [tasks, loading] = useAsyncHook();
  const [todos, setTodos] = useState([
    { description: 'Create main folder', status: 'done' }, 
    { description: 'Move to main folder', status: 'pending' }, 
    { description: 'Start npm in the folder', status: 'pending' }
  ]);
 


  const addTodo = (description) => {

    let body = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: description })
    };
    fetch(apiRoot + "tasks", body)
      .then(response => {
        if(response.ok) {
          console.log("inserted new");
              //Clonar valores que ya teniamos
          let cTodos = Object.assign([], tasks);
          cTodos.push({description: description, status: "pending"})
         
          setTodos(cTodos);
        } else {
          
        }
      })



    
  }

  const markAsDone = (task, pos) => {
    console.log(task);
    let body = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: task.id })
    };
    fetch(apiRoot+'tasks/'+task.id+'/done', body)
      .then(response => {
        if(response.ok) {
          let cTodos = Object.assign([], tasks);
          cTodos[pos].status = 'done';
          setTodos(cTodos);
          console.log("Task: " + task.id + " has been modified to done");
        } else {
          console.log(response);
        }
      })


  }


  const deleteTask = (task, pos) => {
    let body = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: task.id })
    };
    fetch(apiRoot + 'tasks/'+task.id, body)
      .then(response => {
        if(response.ok) {
          console.log("Deleted task: " + task.id);
          let cTodos = Object.assign([], tasks);
          cTodos.splice(pos, 1);
          setTodos(cTodos);
        } else {
          console.log(response);
        }
      })


  }

  return (
    <Container component="main" maxWidth="md">

      {loading === "false" ? (
        <div>
            <h1>Loading tasks...</h1>
            <CircularProgress />
        </div>
        ) : loading === "null" ? (
          <div>
            <h1>Tasks not found</h1>
            <Create addTodo={addTodo}></Create>
            <TodoList todoList={tasks} markAsDone={markAsDone} deleteTask={deleteTask}></TodoList>
          </div>
      
        ) : (
          <>
            <Create addTodo={addTodo}></Create>

            <TodoList todoList={tasks} markAsDone={markAsDone} deleteTask={deleteTask}></TodoList>
          </>
      )}
     
     
    </Container>
  );
}

export default App;
