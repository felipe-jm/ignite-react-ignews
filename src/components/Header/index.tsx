import { SignInButton } from "components/SignInButton";
import { ActiveLink } from "components/ActiveLink";

import styles from "./styles.module.scss";

export const Header = () => (
  <header className={styles.headerContainer}>
    <div className={styles.headerContent}>
      <img src="/images/logo.svg" alt="ig.news Logo" />
      <nav>
        <ActiveLink activeClassName={styles.active} href="/">
          <a>Home</a>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href="/posts">
          <a>Posts</a>
        </ActiveLink>
      </nav>

      <SignInButton />
    </div>
  </header>
);
