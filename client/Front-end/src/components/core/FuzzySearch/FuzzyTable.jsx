import React, { forwardRef } from "react";

const FuzzyTable = forwardRef(
  ({ searchResults, setNewIngredient, setIsSelected }, ref) => {
    //Sets a value from a row to the input bar when clicked
    const handleClick = (event) => {
      const value = event.target.outerText;
      setNewIngredient((prevState) => ({
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
                <td
                  name={ingredient}
                  value={ingredient}
                  onClick={(event) => {
                    handleClick(event);
                  }}
                >
                  {ingredient}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

export default FuzzyTable;
