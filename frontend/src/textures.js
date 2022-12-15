import blankImg from './images/blank.jpg';
import grassImg from './images/grass.jpg';
import glassImg from './images/glass.jpg';
import woodImg from './images/wood.jpg';
import wornWoodImg from './images/worn-wood.jpg';
import plywoodImg from './images/plywood.jpg';
import laminateImg from './images/laminate.jpg';
import concreteImg from './images/concrete_clean_0041_01_s.jpg';
import bfConcreteImg from './images/bf-concrete.jpg';
import brickImg from './images/brick.jpg';
import stoneImg from './images/stone.jpg';

import { TextureLoader, RepeatWrapping, MirroredRepeatWrapping } from 'three';

// ---- Export textures + Mapping Rules ----

// --Plain--
export const blank = new TextureLoader().load(blankImg);
blank.wrapS = RepeatWrapping;
blank.wrapT = RepeatWrapping;

// --Wood--
export const wood = new TextureLoader().load(woodImg);
export const wornWood = new TextureLoader().load(wornWoodImg);
export const plywood = new TextureLoader().load(plywoodImg);
export const laminate = new TextureLoader().load(laminateImg);
wood.wrapS = RepeatWrapping;
wood.wrapT = RepeatWrapping;
wornWood.wrapS = RepeatWrapping;
wornWood.wrapT = RepeatWrapping;
plywood.wrapS = MirroredRepeatWrapping;
plywood.wrapT = MirroredRepeatWrapping;
laminate.wrapS = MirroredRepeatWrapping;
laminate.wrapT = MirroredRepeatWrapping;

// --Stones/Concrete--
export const concrete = new TextureLoader().load(concreteImg);
export const bfConcrete = new TextureLoader().load(bfConcreteImg);
export const stone = new TextureLoader().load(stoneImg);
export const brick = new TextureLoader().load(brickImg);
concrete.wrapS = MirroredRepeatWrapping;
concrete.wrapT = MirroredRepeatWrapping;
bfConcrete.wrapS = MirroredRepeatWrapping;
bfConcrete.wrapT = MirroredRepeatWrapping;
stone.wrapS = RepeatWrapping;
stone.wrapT = RepeatWrapping;
brick.wrapS = RepeatWrapping;
brick.wrapT = RepeatWrapping;

// --Glass--
export const glass = new TextureLoader().load(glassImg);

// --Grass--
export const grass = new TextureLoader().load(grassImg);
grass.wrapS = MirroredRepeatWrapping;
grass.wrapT = MirroredRepeatWrapping;

// Textures Source:
     // https://polyhaven.com/textures
     // http://texturelib.com/
     // https://www.poliigon.com/search?credit=0
          // https://cloudconvert.com/avif-to-jpg

// Color help
     // https://www.rapidtables.com/web/color/RGB_Color.html
     // https://fffuel.co/cccolor/