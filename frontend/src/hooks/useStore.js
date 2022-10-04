import create from 'zustand';
import { nanoid } from 'nanoid';

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set) => ({
  texture: 'dirt',
  room: getLocalStorage('world') || [],
  addWall: (x, y, z) =>
    set((state) => ({
      room: [
        ...state.room,
        { key: nanoid(), pos: [x, y, z], texture: state.texture },
      ],
    })),
  removeWall: (x, y, z) => {
    set((state) => ({
      room: state.room.filter((wall) => {
        const [_x, _y, _z] = wall.pos;
        return _x !== x || _y !== y || _z !== z;
      }),
    }));
  },
  setTexture: (texture) => {
    set((state) => ({
      texture,
    }));
  },
  saveWorld: () =>
    set((state) => {
      setLocalStorage('world', state.room);
    }),
}));
