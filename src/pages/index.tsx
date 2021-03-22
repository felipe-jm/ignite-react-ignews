import Head from "next/head";

import { Header } from "components/Header";

import styles from "./home.module.scss";
import { SubscribeButton } from "components/SubscribeButton";

const Home = () => (
  <>
    <Head>
      <title>Home - ig.news</title>
    </Head>

    <Header />

    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>
          News about the <span>React</span> world.
        </h1>
        <p>
          Get access to all publications <br />
          <span>for $9.90/month</span>
        </p>
        <SubscribeButton />
      </section>

      <img
        src="/images/avatar.svg"
        alt="A Woman with a laptop with the React logo"
      />
    </main>
  </>
);

export default Home;
