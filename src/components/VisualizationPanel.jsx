import React, { useEffect, useRef, useState } from 'react';

// Utility: draw starfield background
function drawStarfield(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);
  const gradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, Math.max(w,h));
  gradient.addColorStop(0, '#0b0b1d');
  gradient.addColorStop(1, '#050513');
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,w,h);
  // twinkling stars
  for (let i = 0; i < 160; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = Math.random() * 1.2;
    const alpha = 0.5 + Math.random() * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  }
}

// Regions helpers
function regionLabels(type){
  if(type==='GALAXY') return ['Core','Spiral Arms','Disk','Halo'];
  if(type==='STAR') return ['Core','Photosphere','Chromosphere','Corona'];
  return ['Accretion Disk','Jets','Event Horizon','Torus'];
}

function factsFor(type){
  return {
    GALAXY: {
      Core: 'Galactic cores often host supermassive black holes millions to billions of times the Sun’s mass.',
      'Spiral Arms': 'Spiral density waves compress gas, igniting star formation along the luminous arms.',
      Disk: 'The thin disk contains most of the galaxy’s gas and young stars orbiting the center.',
      Halo: 'A vast, faint halo of dark matter and old stars surrounds the visible galaxy.'
    },
    STAR: {
      Core: 'Nuclear fusion in the core converts hydrogen into helium, releasing prodigious energy.',
      Photosphere: 'The visible “surface” where most of the star’s light escapes into space.',
      Chromosphere: 'A hotter, tenuous layer above the photosphere with spicules and emission lines.',
      Corona: 'The ultra-hot outer atmosphere, reaching millions of degrees with dynamic loops.'
    },
    QUASAR: {
      'Accretion Disk': 'Matter swirls inward, heating to extreme temperatures and emitting intense radiation.',
      Jets: 'Relativistic jets fire perpendicular to the disk, carrying energy across intergalactic space.',
      'Event Horizon': 'The point of no return—gravity is so strong that not even light can escape.',
      Torus: 'A dusty molecular doughnut obscures and reprocesses radiation around the nucleus.'
    }
  }[type];
}

export default function VisualizationPanel({ resultType, onRegionClick }){
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [dims, setDims] = useState({w: 640, h: 420});

  useEffect(()=>{
    function onResize(){
      const parent = canvasRef.current?.parentElement;
      if(!parent) return;
      const w = parent.clientWidth;
      const h = Math.min(460, Math.max(320, Math.round(w*0.55)));
      setDims({w, h});
    }
    onResize();
    window.addEventListener('resize', onResize);
    return ()=> window.removeEventListener('resize', onResize);
  },[]);

  useEffect(()=>{
    let raf;
    const loop = () => {
      setRotation((r)=> (r+0.01) % (Math.PI*2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return ()=> cancelAnimationFrame(raf);
  },[]);

  useEffect(()=>{
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const {width:w,height:h} = canvas;
    drawStarfield(ctx, w, h);

    ctx.save();
    ctx.translate(w/2, h/2);

    const t = rotation;

    if(resultType === 'GALAXY'){
      // Core
      const coreGrad = ctx.createRadialGradient(0,0,0,0,0,40);
      coreGrad.addColorStop(0,'rgba(255,220,180,1)');
      coreGrad.addColorStop(1,'rgba(255,160,80,0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath(); ctx.arc(0,0,42,0,Math.PI*2); ctx.fill();

      // Disk
      ctx.rotate(0.1);
      ctx.fillStyle = 'rgba(120,140,255,0.08)';
      for(let r=90;r<=140;r+=10){
        ctx.beginPath(); ctx.ellipse(0,0,r,r*0.35, 0, 0, Math.PI*2); ctx.fill();
      }

      // Spiral arms
      ctx.strokeStyle = 'rgba(180,160,255,0.65)';
      ctx.lineWidth = 2;
      const arms = 2;
      for(let a=0; a<arms; a++){
        ctx.beginPath();
        for(let s=0; s<260; s++){
          const rr = 20 + s*0.5;
          const ang = 0.15*s + a*Math.PI;
          ctx.lineTo(Math.cos(ang+t)*rr, Math.sin(ang+t)*rr*0.6);
        }
        ctx.stroke();
      }
      // Halo
      ctx.strokeStyle = 'rgba(180,220,255,0.15)';
      ctx.lineWidth = 8;
      ctx.beginPath(); ctx.arc(0,0,170,0,Math.PI*2); ctx.stroke();
    }

    if(resultType === 'STAR'){
      // Corona glow
      const glow = ctx.createRadialGradient(0,0,0,0,0,120);
      glow.addColorStop(0,'rgba(255,200,80,0.5)');
      glow.addColorStop(1,'rgba(255,120,0,0)');
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(0,0,130,0,Math.PI*2); ctx.fill();

      // Photosphere
      const core = ctx.createRadialGradient(-10,-10,10,0,0,70);
      core.addColorStop(0,'#fff2c0');
      core.addColorStop(1,'#ff9f3b');
      ctx.fillStyle = core; ctx.beginPath(); ctx.arc(0,0,70,0,Math.PI*2); ctx.fill();

      // Rays
      ctx.strokeStyle = 'rgba(255,210,120,0.6)';
      ctx.lineWidth = 2;
      for(let i=0;i<24;i++){
        const ang = (i/24)*Math.PI*2 + t;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang)*80, Math.sin(ang)*80);
        ctx.lineTo(Math.cos(ang)*120, Math.sin(ang)*120);
        ctx.stroke();
      }

      // Chromosphere ripples
      ctx.strokeStyle = 'rgba(255,180,60,0.5)';
      ctx.lineWidth = 3;
      for(let r=80;r<=110;r+=10){
        ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.stroke();
      }
    }

    if(resultType === 'QUASAR'){
      // Background warp
      const warp = ctx.createRadialGradient(0,0,0,0,0,220);
      warp.addColorStop(0,'rgba(140,160,255,0.15)');
      warp.addColorStop(1,'rgba(80,90,160,0)');
      ctx.fillStyle = warp; ctx.beginPath(); ctx.arc(0,0,220,0,Math.PI*2); ctx.fill();

      // Accretion disk
      ctx.rotate(0.4);
      ctx.fillStyle = 'rgba(255,140,80,0.8)';
      for(let r=70;r<=120;r+=6){
        ctx.beginPath(); ctx.ellipse(0,0,r,r*0.25, 0, 0, Math.PI*2); ctx.fill();
      }

      // Event horizon
      ctx.fillStyle = '#070710';
      ctx.beginPath(); ctx.arc(0,0,30,0,Math.PI*2); ctx.fill();

      // Jets
      const jetGrad = ctx.createLinearGradient(0,-200,0,200);
      jetGrad.addColorStop(0,'rgba(120,200,255,0)');
      jetGrad.addColorStop(0.3,'rgba(120,200,255,0.7)');
      jetGrad.addColorStop(0.7,'rgba(180,120,255,0.7)');
      jetGrad.addColorStop(1,'rgba(180,120,255,0)');
      ctx.fillStyle = jetGrad;
      ctx.fillRect(-6,-200,12,400);
    }

    ctx.restore();
  }, [rotation, resultType, dims]);

  // region detection: split canvas into 4 quadrants / rings depending on type
  function handleClick(e){
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    const cx = rect.width/2; const cy = rect.height/2;
    const dx = x - cx; const dy = y - cy;
    const r = Math.hypot(dx,dy);

    let region;
    if(resultType === 'GALAXY'){
      if(r < 50) region = 'Core';
      else if(r < 110) region = 'Spiral Arms';
      else if(r < 150) region = 'Disk';
      else region = 'Halo';
    } else if(resultType === 'STAR'){
      if(r < 40) region = 'Core';
      else if(r < 75) region = 'Photosphere';
      else if(r < 110) region = 'Chromosphere';
      else region = 'Corona';
    } else {
      // QUASAR
      if(r < 35) region = 'Event Horizon';
      else if(r < 90) region = 'Accretion Disk';
      else if(y < cy*0.5 || y > cy*1.5) region = 'Jets';
      else region = 'Torus';
    }

    onRegionClick && onRegionClick(region, factsFor(resultType)[region]);
  }

  return (
    <div className="w-full">
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40">
        <canvas
          ref={canvasRef}
          width={Math.round(dims.w)}
          height={Math.round(dims.h)}
          onClick={handleClick}
          className="w-full h-auto cursor-crosshair"
        />
      </div>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-violet-200/80">
        {regionLabels(resultType).map((r) => (
          <div key={r} className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-center">
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}
