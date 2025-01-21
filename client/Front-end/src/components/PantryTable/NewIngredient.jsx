import React from 'react';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import '../../../src/styles/Pantry.css';
import axios from 'axios';

const NewIngredient = ({ setIngredients, ingredients }) => {
  //Sprema promjene u newIngredient inputima
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewIngredient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Dodajemo novi sastojak u tablicu ako ne postoji u njemu, u suporotnome samo doda vrijednost kvantitete
  const saveNewIngredient = async () => {
    try {
      const existingIngredient = ingredients.find(
        (ingredient) =>
          ingredient.name.toLowerCase() === newIngredient.name.toLowerCase()
      );

      if (existingIngredient) {
        const updatedQuantity =
          Number(existingIngredient.quantity) + Number(newIngredient.quantity);
        await axios.put(
          `http://localhost:3005/api/v1/ingredients/${existingIngredient.ingredient_id}`,
          { quantity: updatedQuantity }
        );
        const updatedResult = await axios.get(
          `http://localhost:3005/api/v1/ingredients`
        );
        setIngredients(updatedResult.data.data.ingredients);
      } else {
        const result = await axios.post(
          'http://localhost:3005/api/v1/ingredients',
          newIngredient
        );
        setIngredients((prevState) => [
          ...prevState,
          result.data.data.ingredient,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    expiry_date: '',
  });

  return (
    <div className="new_ingredient_div">
      <p>Add new Ingredient:</p>
      <TextField
        name="name"
        label="Ingredient"
        color="secondary"
        size="small"
        focused
        onChange={handleChange}
      />
      <TextField
        name="quantity"
        className="quantity_text_field"
        label="Quantity"
        color="secondary"
        size="small"
        focused
        onChange={handleChange}
      />

      <Select
        name="unit"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={newIngredient.unit}
        label="Unit"
        onChange={handleChange}
        size="small"
        color="secondary"
      >
        <MenuItem value={'kg'}>kg</MenuItem>
        <MenuItem value={'g'}>g</MenuItem>
        <MenuItem value={'liters'}>l</MenuItem>
        <MenuItem value={'ml'}>ml</MenuItem>
        <MenuItem value={'cups'}>cups</MenuItem>
        <MenuItem value={'tsp'}>teaspoons</MenuItem>
        <MenuItem value={'pieces'}>pieces</MenuItem>
      </Select>
      <TextField
        name="expiry_date"
        label="Expiry Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        color="secondary"
        size="small"
        onChange={handleChange}
      />
      <Button variant="outlined" color="success" onClick={saveNewIngredient}>
        Add
      </Button>
    </div>
  );
};

export default NewIngredient;
