import { mountGlass, GLASS_PRESETS } from '../../src/glass-in-motion.js';
const root=document.querySelector('#glass-root');
const canvas=document.querySelector('#wallpaper');
const ctx=canvas.getContext('2d');
const status=document.querySelector('#status');
let glass,playing=true,raf=0,last=0,phase=0;
const motionReduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function render(time=0){
  const rect=root.getBoundingClientRect();const w=rect.width,h=rect.height;
  const dpr=Math.min(2,window.devicePixelRatio||1);
  if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){
    canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
  }
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const base=ctx.createLinearGradient(0,0,w,h);base.addColorStop(0,'#20246e');base.addColorStop(.5,'#5f337d');base.addColorStop(1,'#125773');
  ctx.fillStyle=base;ctx.fillRect(0,0,w,h);
  const orbs=[['#6b69ff',.2,.23,.36],['#ed7bcd',.78,.43,.42],['#4fd6dd',.4,.93,.43]];
  for(let i=0;i<orbs.length;i++){
    const [color,x,y,size]=orbs[i];
    const ox=(x+Math.sin(time/4800+i*2.1)*.13)*w;
    const oy=(y+Math.cos(time/5200+i*1.8)*.13)*h;
    const grad=ctx.createRadialGradient(ox,oy,0,ox,oy,Math.max(w,h)*size);
    grad.addColorStop(0,color);grad.addColorStop(1,'transparent');ctx.globalAlpha=.84;ctx.fillStyle=grad;
    ctx.fillRect(0,0,w,h);
  }
  ctx.globalAlpha=.09;ctx.strokeStyle='#fff';ctx.lineWidth=1;
  for(let x=0;x<w;x+=44){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
  for(let y=0;y<h;y+=44){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
  ctx.globalAlpha=1;
  glass?.redraw(canvas);
  last=time;
}
function animate(time){if(!playing)return;render(time);raf=requestAnimationFrame(animate);}
function setMotion(enabled){playing=enabled;cancelAnimationFrame(raf);
  if(playing)raf=requestAnimationFrame(animate);else render(last);
  document.querySelector('#toggle').textContent=playing?'Pause wallpaper':'Resume wallpaper';
}
render(0);
try{
 glass=await mountGlass({root,preset:'original'});
 status.textContent=glass.mode==='webgl'?'WebGL renderer active · Try the controls':'WebGL unavailable · CSS fallback active';
}catch(e){status.textContent='Cannot initialize glass: '+e.message;console.error(e);}
if(!motionReduce)setMotion(true);else setMotion(false);
window.addEventListener('resize',()=>render(last));
for(const id of ['first','second','third'])document.querySelector('#'+id).addEventListener('click',()=>{
 status.textContent=id==='third'?'♡ Glass liked':'You clicked a glass button';
});
const sliders=[['refract','rv','refraction',2],['chrom','cv','chromAberration',3],['thick','tv','zRadius',0]];
function syncControls(){
 const config=glass?.getConfig()||GLASS_PRESETS.original;
 for(const [id,oid,key,decimals] of sliders){
   const input=document.getElementById(id);input.value=String(config[key]);
   document.getElementById(oid).value=Number(config[key]).toFixed(decimals);
 }
}
for(const [id,oid,key,decimals] of sliders){
 document.getElementById(id).addEventListener('input',event=>{
   const value=Number(event.target.value);document.getElementById(oid).value=value.toFixed(decimals);
   glass?.update({[key]:value});
 });
}
document.getElementById('preset').addEventListener('change',e=>{glass?.setPreset(e.target.value);syncControls();});
document.getElementById('reset').addEventListener('click',()=>{
  glass?.setPreset('original');document.getElementById('preset').value='original';syncControls();
});
document.getElementById('toggle').addEventListener('click',()=>setMotion(!playing));
syncControls();
