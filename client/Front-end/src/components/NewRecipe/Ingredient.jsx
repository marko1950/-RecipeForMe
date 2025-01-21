import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import '../../../src/styles/Ingredient.css';

const Ingredient = ({ index, ingredient, ingredients, setIngredients }) => {
  const [newIngredient, setNewIngredient] = useState({
    name: ingredient.name,
    quantity: ingredient.quantity,
    unit: ingredient.unit || 'kg',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewIngredient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //dodajemo novi sastojak u tablici novog recepta
  const saveIngredient = () => {
    if (
      newIngredient.name.trim() !== '' &&
      newIngredient.quantity.trim() !== ''
    ) {
      setIngredients((prevState) => {
        const updatedIngredients = prevState.filter((x, index) => {
          // prvo izbrisemo prazan objekt {}
          return Object.keys(x).length !== 0;
        });
        const a = [...updatedIngredients, newIngredient].filter((x, index) => {
          // onda dodajemo novi sastojak i brisemo jedan prazan koji  se stvara
          return x.name !== '';
        });
        return [...a, { name: '', quantity: '', unit: 'kg' }]; // dodajemo prazan sastojak kako korisnik moze unjeti podatke
      });
    }
  };
  const deleteIngredient = () => {
    setIngredients((prevState) => {
      const updatedIngredients = prevState.filter(
        (_, currentIndex) => currentIndex !== index
      );
      return updatedIngredients;
    });
  };

  useEffect(() => {
    setNewIngredient({
      name: '',
      quantity: '',
      unit: 'kg',
    });
  }, []);

  return (
    <div className="new-recipe-new_ingredient_div-wrapper">
      <p>{index + 1}.</p>
      {index + 1 === ingredients.length ? (
        <div className="new-recipe-new_ingredient_div">
          <TextField
            name="name"
            label="Ingredient"
            color="secondary"
            size="small"
            focused
            onChange={handleChange}
            className="new-recipe-name_text_field"
            value={newIngredient.name}
          />
          <TextField
            type="number"
            name="quantity"
            className="new-recipe-quantity_text_field"
            label="Quantity"
            color="secondary"
            size="small"
            focused
            onChange={handleChange}
            value={newIngredient.quantity}
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
          <Button
            variant="outlined"
            color="success"
            onClick={saveIngredient}
            className="new-recipe-add-button"
          >
            Add
          </Button>
        </div>
      ) : (
        <div className="new-recipe-new_ingredient_div">
          <TextField
            name="name"
            label="Ingredient"
            color="secondary"
            size="small"
            focused
            onChange={handleChange}
            className="new-recipe-name_text_field"
            value={ingredient.name}
            readOnly
          />
          <TextField
            type="number"
            name="quantity"
            className="new-recipe-quantity_text_field"
            label="Quantity"
            color="secondary"
            size="small"
            focused
            onChange={handleChange}
            value={ingredient.quantity}
            readOnly
          />

          <Select
            name="unit"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ingredient.unit}
            label="Unit"
            onChange={handleChange}
            size="small"
            color="secondary"
            readOnly
          >
            <MenuItem value={'kg'}>kg</MenuItem>
            <MenuItem value={'liters'}>liters</MenuItem>
          </Select>
          <Button
            variant="outlined"
            color="error"
            onClick={deleteIngredient}
            className="new-recipe-add-button"
          >
            DEL
          </Button>
        </div>
      )}
    </div>
  );
};

export default Ingredient;
