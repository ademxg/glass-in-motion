/**
 * Glass in Motion — lightweight reusable adapter for ybouane/liquidglass.
 * This module controls the original open-source shader; it does not reimplement it.
 * Copyright (c) 2026 ademxg; MIT for original adapter code.
 * See THIRD_PARTY_NOTICES.md for the bundled engine and dependency attribution.
 */
import { LiquidGlass } from './vendor/liquidglass.js';

export const DEFAULT_GLASS_CONFIG = Object.freeze({
  button: true, floating: false, cornerRadius: 40, zRadius: 25,
  refraction: .78, blurAmount: .03, chromAberration: .045,
  edgeHighlight: .09, specular: .08, fresnel: 1, distortion: 0,
  shadowOpacity: .22, opacity: 1, tintStrength: 0,
  saturation: 0, brightness: 0, bevelMode: 0
});

export const GLASS_PRESETS = Object.freeze({
  original: {...DEFAULT_GLASS_CONFIG},
  crystal: {...DEFAULT_GLASS_CONFIG, refraction: 1.25, chromAberration: .07,
    blurAmount: 0, edgeHighlight: .25, specular: .35, zRadius: 40},
  soft: {...DEFAULT_GLASS_CONFIG, refraction: .42, chromAberration: .02,
    blurAmount: .35, edgeHighlight: .08, zRadius: 22, cornerRadius: 45},
  prism: {...DEFAULT_GLASS_CONFIG, refraction: 1.12, chromAberration: .24,
    distortion: .12, edgeHighlight: .27, specular: .35, zRadius: 46}
});

/**
 * Mount the existing WebGL liquid-glass engine on a root with .gim-glass buttons.
 *
 * @param {Object} options
 * @param {HTMLElement} options.root - element containing background AND glass elements
 * @param {string|HTMLElement[]} [options.elements='.gim-glass'] - glass buttons/containers
 * @param {string} [options.preset='original']
 * @param {Object} [options.config] - optical config overrides
 * @returns {Promise<{mode:string,engine:object|null,update:Function,setPreset:Function,
 *   getConfig:Function,redraw:Function,destroy:Function}>}
 */
export async function mountGlass({root, elements='.gim-glass',preset='original',config={}}={}) {
  if (!(root instanceof HTMLElement)) throw new TypeError('mountGlass requires a root HTMLElement.');
  if (!Object.hasOwn(GLASS_PRESETS,preset)) throw new RangeError(`Unknown glass preset: ${preset}`);
  const items = typeof elements === 'string' ? [...root.querySelectorAll(elements)] : [...elements];
  if (!items.length || items.some(el=>!(el instanceof HTMLElement) || !root.contains(el))) {
    throw new Error('At least one glass HTMLElement inside root is required.');
  }
  const previous = new Map(items.map(el=>[el,el.getAttribute('data-config')]));
  const configs = new Map();
  for (const el of items) {
    let attrs={};
    try { attrs=JSON.parse(el.dataset.config||'{}'); } catch { /* ignore malformed user config */ }
    const combined={...GLASS_PRESETS[preset],...attrs,...config};
    configs.set(el,combined);
    el.dataset.config=JSON.stringify(combined);
  }

  let engine=null,mode='webgl',destroyed=false;
  try {
    engine=await LiquidGlass.init({root,glassElements:items});
  } catch (error) {
    mode='fallback';
    console.warn('[Glass in Motion] WebGL failed; CSS fallback enabled.',error);
    for(const el of items) el.classList.add('gim-fallback');
  }

  const targets=(target)=>{
    if(target==null) return items;
    if (!items.includes(target)) throw new Error('Target must be an element managed by this instance.');
    return [target];
  };
  function update(patch={},target){
    if (destroyed) throw new Error('Cannot update a destroyed glass instance.');
    if (!patch || typeof patch !== 'object' || Array.isArray(patch)) throw new TypeError('update(patch) requires an object.');
    for(const el of targets(target)) {
      const next={...configs.get(el),...patch};
      configs.set(el,next); el.dataset.config=JSON.stringify(next);
      if (!engine) el.style.setProperty('--gim-opacity',String(Math.max(.1,Math.min(.85,.12+next.opacity*.2))));
    }
    engine?.markChanged();
  }
  function setPreset(name,target){
    if (!Object.hasOwn(GLASS_PRESETS,name)) throw new RangeError(`Unknown glass preset: ${name}`);
    update(GLASS_PRESETS[name],target);
  }
  function getConfig(target=items[0]) {
    if (!configs.has(target)) throw new Error('Unknown glass element.');
    return {...configs.get(target)};
  }
  function redraw(element) {
    if(destroyed)return;
    engine?.markChanged(element);
  }
  function destroy(){
    if(destroyed)return;
    destroyed=true;
    engine?.destroy();
    for(const el of items) {
      el.classList.remove('gim-fallback');
      el.style.removeProperty('--gim-opacity');
      const initial=previous.get(el);
      if(initial===null) el.removeAttribute('data-config');
      else el.setAttribute('data-config',initial);
    }
  }
  return {get mode(){return mode;},engine,update,setPreset,getConfig,redraw,destroy};
}
