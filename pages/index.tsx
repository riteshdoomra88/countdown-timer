import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };


  useEffect(() => {
    let interval: any;
    const target = new Date("03/02/2024 15:06:00");
    if (isActive) {
    interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
      }
    }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Countdown Timer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
     

      {partyTime ? (
        <>
          <h1>Happy new year!</h1>
          <video autoPlay loop muted>
            <source src="/party.mp4" />
          </video>
        </>
      ) : (
        <>
            <div className="timer-wrapper">
            <div className="timer-inner">
              <div className="timer-segment">
                <span className="time">{days}</span>
                <span className="label">Days</span>
              </div>
              <span className="divider">:</span>
              <div className="timer-segment">
                <span className="time">{hours}</span>
                <span className="label">Hours</span>
              </div>
              <span className="divider">:</span>
              <div className="timer-segment">
                <span className="time">{minutes}</span>
                <span className="label">Minutes</span>
              </div>
              <span className="divider">:</span>
              <div className="timer-segment">
                <span className="time">{seconds}</span>
                <span className="label">Seconds</span>
              </div>
              </div>
              <div>
                <button onClick={handleStart}>Start</button>
                <button onClick={handlePause}>Pause</button>
              </div>
          </div>
          <Image
            alt="background image"
            src="/image.webp"
            layout="fill"
            quality={100}
          />
        </>
      )}
      
    </div>
  );
};

export default Home;
