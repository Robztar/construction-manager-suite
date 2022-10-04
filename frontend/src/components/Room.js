import React from 'react';
import { useStore } from '../hooks/useStore';
import { useInterval } from '../hooks/useInterval';

import Wall from './Wall';

export default function Room() {
     const [room, addWall, removeWall, saveScene] = useStore((state) => [
          state.room,
          state.addWall,
          state.removeWall,
          state.saveWorld,
     ]);

  // useInterval(
  //   () => {
  //     saveScene(cubes);
  //   },
  //   // every 10 seconds
  //   10000,
  // );

     return room.map((wall) => {
          return (
               <Wall
                    key={wall.key}
                    texture={wall.texture}
                    position={wall.pos}
                    addWall={addWall}
                    removeWall={removeWall}
               />
          );
     });
}
