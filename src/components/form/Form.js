import React from "react";
import styles from "./Form.module.css";

const Form = () => {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h1>NPS Survey Form</h1>
        <p>
          Questions marked with <sup>*</sup> are required
        </p>
      </div>
      <div className={styles.question}>
        <p>
          Would you recomend PHZ Full Stack for your friends as an employer?
          <sup>*</sup>
        </p>
      </div>

      <div className={styles.tool}>
        <input type="radio" id="1" name="rad" value="1" />
        <label for="1">1</label>
        <input type="radio" id="2" name="rad" value="2" />
        <label for="2">2</label>
        <input type="radio" id="3" name="rad" value="3" />
        <label for="3">3</label>
        <input type="radio" id="4" name="rad" value="4" />
        <label for="4">4</label>
        <input type="radio" id="5" name="rad" value="5" />
        <label for="5">5</label>
        <input type="radio" id="6" name="rad" value="6" />
        <label for="6">6</label>
        <input type="radio" id="7" name="rad" value="7" />
        <label for="7">7</label>
        <input type="radio" id="8" name="rad" value="8" />
        <label for="8">8</label>
        <input type="radio" id="9" name="rad" value="9" />
        <label for="9">9</label>
        <input type="radio" id="10" name="rad" value="10" />
        <label for="10">10</label>
      </div>
      <div className={styles.describers}>
        <p>not likely at all</p>
        <p>extreamly likely</p>
      </div>
      <div className={styles.precomment}>
        <p>
          What is the main reason for your score?<sup>*</sup>
        </p>
      </div>
      <textarea name="message" rows="6" cols="30" />

      <button className={styles.button}>Submit</button>
    </div>
  );
};

export default Form;
