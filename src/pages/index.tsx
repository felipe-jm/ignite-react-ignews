import { GetStaticProps } from "next";
import Head from "next/head";

import { Header } from "components/Header";
import { SubscribeButton } from "components/SubscribeButton";

import styles from "./home.module.scss";
import { stripe } from "services/stripe";

type HomProps = {
  product: {
    priceId: string;
    amount: number;
  };
};

const Home = ({ product }: HomProps) => (
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
          <span>for {product.amount} month</span>
        </p>
        <SubscribeButton priceId={product.priceId} />
      </section>

      <img
        src="/images/avatar.svg"
        alt="A Woman with a laptop with the React logo"
      />
    </main>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1IXq7RAj29YgoVdLuTK8MJ8h");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    revalidate: 60 * 60 * 24, // 24 hours
    props: {
      product,
    },
  };
};

export default Home;
