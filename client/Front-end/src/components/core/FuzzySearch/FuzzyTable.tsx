import React, { forwardRef } from "react";
import { PropsFuzzyTable } from "../../../types/pantry/fuzzySearch.types";

const FuzzyTable = forwardRef<HTMLDivElement, PropsFuzzyTable>(
  ({ searchResults, setNewIngredient, setIsSelected }, ref) => {
    // Sets a value from a row to the input bar when clicked
    const handleClick = (event: React.MouseEvent<HTMLTableCellElement>) => {
      const value = event.currentTarget.innerText;
      setNewIngredient((prevState: any) => ({
        ...prevState,
        name: value,
      }));
      setIsSelected(true);
    };

    // Displays a table of recommended fuzzy search results (limits it to 6 searches)
    return (
      <div ref={ref}>
        <table>
          <tbody>
            {searchResults.slice(0, 6).map((ingredient, index) => (
              <tr key={index}>
                <td onClick={handleClick}>{ingredient}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

export default FuzzyTable;
