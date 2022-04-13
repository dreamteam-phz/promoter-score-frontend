import React from "react";
import classes from "./PeriodFilter.module.css";
const PeriodFilter = (props) => {
  const filterHandler = (event) => {
    props.onFilter(event.target.value);
  };
  return (
    <div className={classes.container}>
      <label>Filter:</label>
      <select onChange={filterHandler}>
        <option value="12">12 months</option>
        <option value="6" selected>
          6 months
        </option>
        <option value="3">3 months</option>
        <option value="2">2 months</option>
        <option value="1">1 month</option>
      </select>
    </div>
  );
};

export default PeriodFilter;
