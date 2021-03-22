import { SignInButton } from "components/SignInButton";

import styles from "./styles.module.scss";

export const Header = () => (
  <header className={styles.headerContainer}>
    <div className={styles.headerContent}>
      <img src="/images/logo.svg" alt="ig.news Logo" />
      <nav>
        <a className={styles.active}>Home</a>
        <a>Posts</a>
      </nav>

      <SignInButton />
    </div>
  </header>
);
