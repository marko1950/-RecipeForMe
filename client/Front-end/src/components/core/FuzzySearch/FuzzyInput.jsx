import { TextField } from "@mui/material";
import Fuse from "fuse.js";
import FuzzyTable from "./FuzzyTable";
import { useState, useMemo, useEffect, useRef } from "react";
import ingredients from "./ingredients.json";
import debounce from "lodash.debounce";

/* 
Work flow: Entering an ingredient triggers handleChange which updates the state newIngredient. 
After that, function debouncedHandleSearch calls handleSearch after 600ms of waiting after the last keystroke.
If there is no value in search bar, list is set to an empty aray [], however, if there is, fuzzy search is being 
initialized and shown as a table (component FuzzyTable). When we select(click) an ingredient from the table,
the table stops rendering (isSelected is used for connditional rendering). As soon as new value is put into the
search bar, the process starts all over again. useEffect is used for clearing memory.
*/

const FuzzyInput = ({ newIngredient, setNewIngredient, searchValue }) => {
  const [searchResults, setSearchResults] = useState([]); //fuzzy search results (list of ingredients)
  const [isSelected, setIsSelected] = useState(false); //its used for enabling and preventing table to render
  const options = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.4,
  };

  const fuse = new Fuse(ingredients, options);
  const handleSearch = (value) => {
    // If the search is empty it gets empty string, otherwise it does a fuzzy search
    if (value.length !== 0) {
      const results = fuse.search(value);
      const items = results.map((result) => result.item);
      setSearchResults(items);
    } else {
      setSearchResults([]);
    }
    setIsSelected(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewIngredient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    debouncedHandleSearch(value);
  };

  const debouncedHandleSearch = useMemo(() => debounce(handleSearch, 600), []); // second argument is configurable time for a delay

  useEffect(() => {
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [debouncedHandleSearch]);

  const tableRef = useRef();

  //if something else than the table is clicked, it removes the table
  useEffect(() => {
    const handleBodyClick = (event) => {
      if (
        tableRef.current &&
        !event.composedPath().includes(tableRef.current)
      ) {
        setIsSelected(true);
      }
    };
    document.body.addEventListener("click", handleBodyClick);
    // Cleanup function to remove the event listener
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  return (
    <div>
      <TextField
        name="name"
        label="Ingredient"
        color="secondary"
        size="small"
        focused
        value={newIngredient.name}
        onChange={handleChange}
      />
      {!isSelected ? (
        <FuzzyTable
          searchResults={searchResults}
          setNewIngredient={setNewIngredient}
          setIsSelected={setIsSelected}
          ref={tableRef}
        />
      ) : null}
    </div>
  );
};

export default FuzzyInput;
