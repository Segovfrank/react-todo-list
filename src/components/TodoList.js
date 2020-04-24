import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Paper from '@material-ui/core/Paper';
import Todo from './Todo';

const TodoList = ({ todoList, markAsDone, deleteTask }) => {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todoList.map((todo, index) => (
            <Todo todo={todo} index={index} markAsDone={markAsDone} deleteTask={deleteTask} ></Todo>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TodoList;