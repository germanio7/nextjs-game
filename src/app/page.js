"use client";
import { Stage, Container, Sprite, useTick } from "@pixi/react";
import React, { useReducer, useRef } from "react";

export default function Home() {
  const reducer = (_, { data }) => data;

  const Bunny = () => {
    const [motion, update] = useReducer(reducer);
    const iter = useRef(0);

    useTick((delta) => {
      const i = (iter.current += 0.05 * delta);

      update({
        type: 'update',
        data: {
          x: Math.sin(i) * 100,
          y: Math.sin(i / 1.5) * 100,
          rotation: Math.sin(i) * Math.PI,
          anchor: Math.sin(i / 2),
        },
      });
    });

    return <Sprite image="/bineo.png" {...motion} />;
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex-wrap justify-center items-center">
        <div className="flex justify-center text-3xl">
          Nextjs&nbsp;+&nbsp;<a className="underline" href="https://pixijs.io/pixi-react/" target="_blank">React Pixi</a>
        </div>
        <div className="flex justify-center">
          <Stage width={300} height={300} options={{ backgroundAlpha: 0 }}>
            <Container x={150} y={150}>
              <Bunny />
            </Container>
          </Stage>
        </div>
      </div>
    </div>
  );
}
