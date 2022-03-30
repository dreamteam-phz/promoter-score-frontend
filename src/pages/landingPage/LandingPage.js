/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styles from './LandingPage.module.css'
import Input from '../../components/input/Input'
import Button from "../../components/button/Button";

const LandingPage = () => {
  return (
    <>
    <div className={styles.title}>
      Hello I am a landing page
      <main>
        <div className={styles.containerLeft}>
          <div>
            <h2>Get the most of your forms</h2>
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.stack.imgur.com%2Fe2kSK.png&f=1&nofb=1" />
          
          </div>

        </div>
        <div className={styles.containerRight}>
          <form>
            <h2>Login to your dashboard</h2>
            <label>Email</label>
            <Input />
            <label>Password</label>
            <Input />
            <div className={styles.button}>
              <Button></Button>
            </div>
          </form>
          
          <div className={styles.register}>
            <h2>Don't you have an account yet</h2>
            <div className={styles.button}>
             <Button></Button>
            </div>
          </div>
        
        </div>
      </main>
    </div>
    </>
  )};

export default LandingPage;
