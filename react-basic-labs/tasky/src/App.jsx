import React,{ useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Task from './components/Task.jsx'
import AddTaskForm from './components/Form.jsx'
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


function App() {
   const [ taskState, setTaskState ] = useState({
    tasks: [
      { id:1 ,title:"Dishes", description: "Empty dishwasher", deadline: "Today", priority:"Medium",done: false },
      { id:2 ,title: "Laundry", description: "Fold clothes and put away", deadline: "Tomorrow", priority:"Low",done: false },
      { id:3 ,title: "Tidy up", deadline: "Today", priority:"High",done: false }
    ]
  });
    const [ formState, setFormState ] = useState({
    title: "",
    description: "",
    deadline: "",
    priority:""
  });
  const formChangeHandler = (event) => {
    let form = {...formState};

    switch(event.target.name) {
      case "title":
          form.title = event.target.value;
          break;
      case "description":
          form.description = event.target.value;
          break;
      case "deadline":
          form.deadline = event.target.value;
          break;
          case "priority":
          form.priority = event.target.value;
          break;
      default:
          form = formState;
    }
    setFormState(form);
  }
  const formSubmitHandler = (event) => {
    event.preventDefault();

    const tasks = [...taskState.tasks];
    const form = {...formState};

    form.id = uuidv4();
    
    tasks.push(form);
    setTaskState({tasks});
  }


  const doneHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks[taskIndex].done = !tasks[taskIndex].done;
    setTaskState({tasks});
    console.log(`${taskIndex} ${tasks[taskIndex].done}`);
  }
  const deleteHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks.splice(taskIndex, 1);
    setTaskState({tasks});
  } 


  return (
  <div className="container">
    <Container component="main">
  <Typography
    component="h1"
    variant="h2"
    align="center"
    gutterBottom
    sx={{
      backgroundColor: '#5c6bc0',
      textAlign: 'center',
      color: 'white',
      padding: '20px',
      margin: '20px 0 40px 0',
      borderRadius: '16px',
      fontWeight: 'bold',
      letterSpacing: '2px',
      boxShadow: 3
    }}
  >
    Tasky
  </Typography>
</Container>
     <Container maxWidth="md" component="main">
    <Grid
      container
      spacing={5}
      sx={{
        justifyContent: "center"
      }}
    >
    {taskState.tasks.map((task, index) => (
      <Task
        title={task.title}
        description={task.description}
        deadline={task.deadline}
        priority={task.priority}
        done={task.done}
        key={task.id}
        markDone={() => doneHandler(index)}
        deleteTask={() => deleteHandler(index)}
      />
    ))}
  </Grid>
</Container>
     <Container
  component="footer"
  sx={{
    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
    my: 6,
    py: 6,
  }}
>
  <Grid container sx={{
    justifyContent: "center"
  }}>
    <AddTaskForm
      submit={formSubmitHandler}
      change={formChangeHandler}
    />
  </Grid>
</Container>

  </div>
);

}

export default App
