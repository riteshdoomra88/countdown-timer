import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Timer from "../src/component/Timer"

const timer: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Countdown Timer</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <Timer />
            </div>

        </div>
    );
};

export default timer;
