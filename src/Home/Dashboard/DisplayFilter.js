import styles from "./DisplayFilter.module.css";
const DisplayFilter = (props) => {
  const options = [
    { label: "1 month", value: "30" },
    { label: "3 months", value: "90" },
    { label: "6 months", value: "180" },
    { label: "1 year", value: "365" },
  ];
  const selectChangeHandler = (event) => {
    props.onFilter(event.target.value);
    // console.log(event.target.value);
  };
  return (
    <div className={styles.selectWrapper}>
      <select
        value={props.selected}
        onChange={selectChangeHandler}
        className={styles.select}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DisplayFilter;
