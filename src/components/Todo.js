import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import grey from '@material-ui/core/colors/grey';


import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CheckOutlined from '@material-ui/icons/CheckOutlined';

const Todo = ({ todo, markAsDone, index, deleteTask }) => {
    
    const doneColor = grey[200];

  const handleMarkAsDone = (event, todo, pos) => {
    markAsDone(todo, pos);
  }

  const handleDelete = (event, todo, pos) => {
    deleteTask(todo, pos);
  }

  return (
        <TableRow key={todo.name} style={{backgroundColor: todo.status == 'pending' ? 'white' : doneColor}}>
            <TableCell component="th" scope="todo">
            {index}
            </TableCell>
            <TableCell>
            {todo.description}
            </TableCell>
            <TableCell align="right">{todo.status}</TableCell>
            <TableCell align="right"  >
                {todo.status == 'pending' && (
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="submit-btn"
                    onClick={(event) => handleMarkAsDone(event, todo, index)}
                    >
                    <CheckOutlined></CheckOutlined>
                    Done
                </Button>
                )}
            </TableCell>
            <TableCell align="right"  >
            <Button
                    type="submit"
                    variant="outlined"
                    color="secondary"
                    className="submit-btn"
                    onClick={(event) => handleDelete(event, todo, index)}
                    >
                    <DeleteOutlinedIcon></DeleteOutlinedIcon>
                    Delete
                </Button>
            </TableCell>
        </TableRow>
  );
}

export default Todo;