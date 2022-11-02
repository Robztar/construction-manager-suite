import dirtImg from './images/dirt.jpg';
import concreteImg from './images/concrete_clean_0041_01_s.jpg';
import grassImg from './images/grass.jpg';
import glassImg from './images/glass.png';
import logImg from './images/log.jpg';
import woodImg from './images/wood.jpg';
import blankImg from './images/blank.jpg';
import { TextureLoader, NearestFilter, LinearMipMapLinearFilter  } from 'three';

// ---- Export textures ----
export const dirt = new TextureLoader().load(dirtImg);
export const concrete = new TextureLoader().load(concreteImg);
export const grass = new TextureLoader().load(grassImg);
export const glass = new TextureLoader().load(glassImg);
export const wood = new TextureLoader().load(woodImg);
export const log = new TextureLoader().load(logImg);
export const blank = new TextureLoader().load(blankImg);


// ---- Texture Mapping Rules ----
dirt.magFilter = NearestFilter;
dirt.minFilter = LinearMipMapLinearFilter;

concrete.magFilter = NearestFilter;
concrete.minFilter = LinearMipMapLinearFilter;

grass.magFilter = NearestFilter;
grass.minFilter = LinearMipMapLinearFilter;

glass.magFilter = NearestFilter;
glass.minFilter = LinearMipMapLinearFilter;

wood.magFilter = NearestFilter;
wood.minFilter = LinearMipMapLinearFilter;

log.magFilter = NearestFilter;
log.minFilter = LinearMipMapLinearFilter;

blank.magFilter = NearestFilter;
blank.minFilter = LinearMipMapLinearFilter;

// Textures Source:
// http://texturelib.com/