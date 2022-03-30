import React from "react";
import styles from './LandingPage.module.css'
import Input from '../../components/input/Input'

const LandingPage = () => {
  return (
    <div className={styles.title}>
      Hello I am a landing page
      <main>
        <div className={styles.containerLeft}>
          Greetings here
        </div>
        <div className={styles.containerRight}>
          <form>
            <h2>Login your dasboard</h2>
            <label>Email</label>
            <Input />
            <label>Password</label>
            <Input />
            <button>Submit</button>
          </form>
        </div>
      </main>
    </div>

  )};

export default LandingPage;
