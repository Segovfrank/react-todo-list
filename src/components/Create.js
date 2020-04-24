import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const Create = ({addTodo}) => {
    const [todo, setTodo] = useState('');

    const handleTodoChange = (event) => {
        let val = event.target.value;
        setTodo(val);
    }

    const handleCreateClick = (event) => {
        addTodo(todo);
        setTodo('');
    }


    return(
        <div>
           
            <TextField
            variant="outlined"
            margin="normal"
            placeholder="Add a task..."
            fullWidth
            id="todo"
            label="Todo"
            onChange={handleTodoChange}
            name="todo"
            autoComplete="todo"
            value={todo}
          />

            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit-btn"
            onClick={handleCreateClick}
          >
            Create
          </Button>

        </div>
    )
}

export default Create;