import Head from "next/head";
import styles from "./styles.module.scss";

const Posts = () => (
  <>
    <Head>
      <title>Posts | Ignews</title>
    </Head>

    <main className={styles.container}>
      <div className={styles.posts}>
        <a href="">
          <time>asdasdasd</time>
          <strong>asdadasdasd</strong>
          <p>asefasef</p>
        </a>
        <a href="">
          <time>asdasdasd</time>
          <strong>asdadasdasd</strong>
          <p>asefasef</p>
        </a>
        <a href="">
          <time>asdasdasd</time>
          <strong>asdadasdasd</strong>
          <p>asefasef</p>
        </a>
      </div>
    </main>
  </>
);

export default Posts;
