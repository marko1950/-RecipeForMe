import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';

export default function PantryTable({ setIngredients, ingredients }) {
  const deleteIngredient = async (ingredient_id) => {
    try {
      await axios.delete(
        `http://localhost:3005/api/v1/ingredients/${ingredient_id}`
      );
      const updatedResult = await axios.get(
        `http://localhost:3005/api/v1/ingredients`
      );
      setIngredients(updatedResult.data.data.ingredients);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(
  //   () => async () => {
  //     try {
  //       const result = await axios.get(
  //         `http://localhost:3005/api/v1/ingredients`
  //       );
  //       setIngredients(result.data.data.ingredients);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   []
  // );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Quantity</b>
            </TableCell>
            <TableCell>
              <b>Unit</b>
            </TableCell>
            <TableCell>
              <b>Expiry Date</b>
            </TableCell>
            <TableCell>
              <b>Delete ingredient</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.map((row) => {
            return (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.unit}</TableCell>
                <TableCell>{row.expiry_date || 'N/A'}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => deleteIngredient(row.ingredient_id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
