import React, { useEffect, useState } from "react";
import DayColumn from "./DayColumn";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/CustomCalendar.css"; // Import custom CSS for styling

import { FaCalendarAlt } from "react-icons/fa"; // Import an icon for the calendar toggle

// Utility function to get the date of the previous or next Sunday
const getStartOfWeek = (date) => {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Adjust to Sunday (0) or Monday (1)
  startOfWeek.setDate(startOfWeek.getDate() + diff);
  return startOfWeek;
};

// Utility function to get an array of dates for the current week
const getWeekDates = (startOfWeek) => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    dates.push(day);
  }
  return dates;
};

const SchedulerTable = () => {
  const meals = ["Breakfast", "Lunch", "Dinner"]; // Rows represent meals
  const [weekDates, setWeekDates] = useState([]);
  const [dayCalendar, setDayCalendar] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // Track calendar visibility

  useEffect(() => {
    // Calculate the start of the week for the initial date
    const startOfWeek = getStartOfWeek(dayCalendar);
    const dates = getWeekDates(startOfWeek);
    setWeekDates(dates);
  }, [dayCalendar]);

  const toggleCalendarVisibility = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  const handleCellClick = (meal, date) => {
    alert(`You clicked on ${meal} for ${date}`);
  };

  const changeWeek = (direction) => {
    const newDates = weekDates.map((date) => {
      const newDate = new Date(date);
      if (direction === "next") {
        newDate.setDate(newDate.getDate() + 7); // Move forward by a week
      } else {
        newDate.setDate(newDate.getDate() - 7); // Move backward by a week
      }
      return newDate;
    });

    setWeekDates(newDates);
    setDayCalendar(newDates[0]); // Update the calendar to reflect the first day of the week
  };

  const isSameWeek = (date, selectedDate) => {
    const startOfWeek = getStartOfWeek(selectedDate);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return date >= startOfWeek && date <= endOfWeek;
  };

  return (
    <div>
      <div className="grid grid-cols-7 text-center font-bold mb-2">
        {weekDates.map((date, index) => (
          <p key={index} className="p-4 border-b text-lg">
            {date.toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
            })}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {weekDates.map((date, colIndex) => (
          <DayColumn
            key={colIndex}
            date={date}
            meals={meals}
            handleCellClick={handleCellClick}
          />
        ))}
      </div>

      <div className="flex justify-end items-center mt-5 relative">
        <button
          className="text-xl bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 focus:outline-none"
          onClick={toggleCalendarVisibility}
        >
          <FaCalendarAlt />
        </button>

        {isCalendarVisible && (
          <div className="absolute top-full right-0 mt-2 shadow-lg">
            <Calendar
              value={dayCalendar}
              view="month" // Set the view to "month" only
              onChange={(date) => {
                const startOfWeek = getStartOfWeek(date);
                const dates = getWeekDates(startOfWeek);
                setDayCalendar(date); // Update the calendar value
                setWeekDates(dates); // Update the big week selection
                setIsCalendarVisible(false); // Hide calendar after selection
              }}
              tileClassName={({ date }) =>
                isSameWeek(date, dayCalendar) ? "highlight-week" : null
              }
              onClickMonth={null} // Disable month click interaction if you want to make it only viewable
              onClickDay={null} // Disable clicking days directly to avoid any unwanted interactions
            />
          </div>
        )}

        <button
          onClick={() => changeWeek("previous")}
          className="ml-2 text-xl bg-gray-500 text-white rounded-full p-3 hover:bg-gray-600 focus:outline-none"
        >
          Previous Week
        </button>

        <button
          onClick={() => changeWeek("next")}
          className="ml-2 text-xl bg-gray-500 text-white rounded-full p-3 hover:bg-gray-600 focus:outline-none"
        >
          Next Week
        </button>
      </div>
    </div>
  );
};

export default SchedulerTable;
