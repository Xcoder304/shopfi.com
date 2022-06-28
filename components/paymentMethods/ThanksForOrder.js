import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { useRouter } from "next/router";
import Head from "next/head";
import { IoCheckmarkDone } from "react-icons/io5";
import { Button } from "@mantine/core";

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

function getAnimationSettings(originXA, originXB) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  };
}

export default function ThanksForOrder() {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();
  const router = useRouter();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 1000));
    }
  }, [intervalId, nextTickAnimation]);

  const pauseAnimation = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    startAnimation();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      pauseAnimation();
    }, 5000);
  }, []);

  return (
    <>
      <Head>
        <title>Thanks for Order - shopfi</title>
      </Head>
      <div className="flex items-center justify-center py-10 flex-col">
        <div className="w-[90px] h-[90px] rounded-full bg-App_green_L flex items-center justify-center">
          <IoCheckmarkDone className="text-5xl text-white" />
        </div>
        <h3 className="text-3xl text-App_black_L select-none capitalize font-medium mt-2">
          thanks for order
        </h3>

        <div className="flex flex-col items-center md:space-x-4 md:space-y-0 space-y-3  lg:mt-10 md:mt-5 mt-3 md:flex-row justify-center">
          <Button
            className="w-44 h-12 bg-App_green_L rounded-md text-white capitalize transition-all duration-200 ease-out hover:bg-App_green_D text-base"
            onClick={() =>
              router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}`)
            }
          >
            go back to home
          </Button>
          <Button
            className="w-38 h-12 bg-App_green_L rounded-md text-white capitalize transition-all duration-200 ease-out hover:bg-App_green_D text-base"
            onClick={() =>
              router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/profile`)
            }
          >
            view your orders
          </Button>
        </div>
      </div>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  );
}
