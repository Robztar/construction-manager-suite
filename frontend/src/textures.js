import dirtImg from './images/dirt.jpg';
import concreteImg from './images/concrete_clean_0041_01_s.jpg';
import grassImg from './images/grass.jpg';
import glassImg from './images/glass.jpg';
import logImg from './images/log.jpg';
import woodImg from './images/wood.jpg';
import wornWoodImg from './images/worn-wood.jpg';
import plywoodImg from './images/plywood.jpg';
import laminateImg from './images/laminate.jpg';
import blankImg from './images/blank.jpg';
import { TextureLoader, NearestFilter, LinearMipMapLinearFilter  } from 'three';

// ---- Export textures + Mapping Rules ----

// --Plain--
export const blank = new TextureLoader().load(blankImg);
blank.magFilter = NearestFilter;
blank.minFilter = LinearMipMapLinearFilter;

// --Wood--
export const wood = new TextureLoader().load(woodImg);
export const wornWood = new TextureLoader().load(wornWoodImg);
export const plywood = new TextureLoader().load(plywoodImg);
export const laminate = new TextureLoader().load(laminateImg);
wood.magFilter = NearestFilter;
wood.minFilter = LinearMipMapLinearFilter;
wornWood.magFilter = NearestFilter;
wornWood.minFilter = LinearMipMapLinearFilter;
plywood.magFilter = NearestFilter;
plywood.minFilter = LinearMipMapLinearFilter;
laminate.magFilter = NearestFilter;
laminate.minFilter = LinearMipMapLinearFilter;

// --Concrete--
export const concrete = new TextureLoader().load(concreteImg);
concrete.magFilter = NearestFilter;
concrete.minFilter = LinearMipMapLinearFilter;

// --Glass--
export const glass = new TextureLoader().load(glassImg);
glass.magFilter = NearestFilter;
glass.minFilter = LinearMipMapLinearFilter;

// --Grass--
export const grass = new TextureLoader().load(grassImg);
grass.magFilter = NearestFilter;
grass.minFilter = LinearMipMapLinearFilter;

// --Log *Temporary
export const log = new TextureLoader().load(logImg);
log.magFilter = NearestFilter;
log.minFilter = LinearMipMapLinearFilter;

// --Dirt * Temporary
export const dirt = new TextureLoader().load(dirtImg);
dirt.magFilter = NearestFilter;
dirt.minFilter = LinearMipMapLinearFilter;


// Textures Source:
     // https://polyhaven.com/textures
     // http://texturelib.com/
     // https://www.poliigon.com/search?credit=0