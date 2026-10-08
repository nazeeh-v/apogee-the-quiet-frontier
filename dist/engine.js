/* APOGEE: pure, deterministic educational model. SI for equations; kg, W, Wh, km, M$ in UI. */
export const VERSION = 1;
export const G0 = 9.80665;
export const MISSIONS = {
 earth: {id:'earth',name:'Earthwatch',tag:'01 / LOW EARTH ORBIT',body:'Earth',color:'#76b8cc',pitch:'Turn a small satellite into a big picture of our changing planet.',objective:'Return climate imagery and map vegetation from a near-polar orbit.',budget:70,target:145,turns:12,days:2,au:1,mu:398600.4418,radius:6378.137,altMin:350,altMax:900,alt:550,dv:90,eclipse:.36,contact:.45,required:['camera'],incl:90,brief:'Your team has 24 days of science operations. Resolve enough surface detail, keep your battery alive through eclipse, and return the observations to Earth.',inspiration:'Landsat: long-term observation of Earth’s land surface.'},
 moon: {id:'moon',name:'Lunar Atlas',tag:'02 / LUNAR ORBIT',body:'Moon',color:'#babac8',pitch:'Find the chemical clues that will guide the next lunar explorers.',objective:'Map surface geology with imaging and infrared spectroscopy.',budget:145,target:225,turns:12,days:3,au:1,mu:4902.800066,radius:1737.4,altMin:50,altMax:300,alt:100,dv:1050,eclipse:.34,contact:.28,required:['camera','spectrometer'],incl:90,brief:'The launcher supplies translunar injection. Your spacecraft must perform lunar orbit insertion and reserve fuel for corrections and a controlled terminal maneuver. Science starts after arrival.',inspiration:'Lunar Reconnaissance Orbiter: reconnaissance of the lunar surface.'},
 mars: {id:'mars',name:'Red Horizon',tag:'03 / MARS ORBIT',body:'Mars',color:'#d99176',pitch:'Cross interplanetary space. Read the history of a distant world.',objective:'Return images and spectra of the Martian surface.',budget:205,target:215,turns:12,days:7,au:1.524,mu:42828.375214,radius:3396.19,altMin:250,altMax:900,alt:400,dv:1250,eclipse:.30,contact:.18,required:['camera','spectrometer'],incl:85,brief:'The launcher supplies an idealized Mars-transfer injection. Size power for weaker sunlight, carry orbit-insertion propellant, and use a deep-space antenna. The interplanetary transfer is a game abstraction.',inspiration:'Mars Reconnaissance Orbiter: imaging and spectroscopy of Mars.'}
};
export const HARDWARE = {
 bus:[{id:'micro',name:'Scout bus',mass:65,cost:9,power:30,slots:2,payload:75,battery:190,health:88,description:'Lean and inexpensive. Two payload slots, limited battery reserve.'},{id:'standard',name:'Explorer bus',mass:180,cost:23,power:60,slots:3,payload:180,battery:550,health:100,description:'Three slots and a larger battery. Balanced for lunar missions.'},{id:'deep',name:'Pathfinder bus',mass:285,cost:38,power:88,slots:4,payload:300,battery:900,health:112,description:'Radiation-hardened electronics and redundant systems.'}],
 engine:[{id:'cold',name:'Cold gas',mass:7,cost:3,isp:70,description:'Simple and cheap. Low efficiency makes large maneuvers impractical.'},{id:'mono',name:'Monopropellant',mass:18,cost:8,isp:220,description:'Compact, reliable control and moderate orbit changes.'},{id:'biprop',name:'Bipropellant',mass:32,cost:16,isp:320,description:'Efficient high-thrust burns for planetary orbit insertion.'}],
 power:[{id:'compact',name:'Compact solar',mass:15,cost:6,watts:300,description:'300 W at 1 AU in sunlight. Affordable for a small Earth orbiter.'},{id:'large',name:'Deployable solar',mass:38,cost:13,watts:900,description:'900 W at 1 AU. Extra mass buys comfortable power margins.'},{id:'deep',name:'Deep-space solar',mass:72,cost:23,watts:1800,description:'1,800 W at 1 AU. Compensates for weaker sunlight at Mars.'}],
 comm:[{id:'sband',name:'S-band patch',mass:5,cost:4,power:18,rates:{earth:60,moon:12,mars:.8},description:'Lightweight. Poor return from deep space.'},{id:'xband',name:'X-band dish',mass:14,cost:11,power:45,rates:{earth:200,moon:100,mars:28},description:'Directional antenna for high-value science return.'},{id:'highgain',name:'High-gain dish',mass:27,cost:19,power:75,rates:{earth:320,moon:170,mars:120},description:'Strong deep-space link, but costly and power-hungry.'}],
 launcher:[{id:'small',name:'Kestrel / small lift',cost:16,caps:{earth:550,moon:210,mars:110},description:'Low-cost delivery. Capacity drops sharply for planetary injection.'},{id:'medium',name:'Meridian / medium lift',cost:36,caps:{earth:2800,moon:1600,mars:1100},description:'Flexible injection capability for planetary science.'},{id:'heavy',name:'Atlas / heavy lift',cost:68,caps:{earth:8500,moon:5000,mars:3500},description:'Plenty of lift; less money left for science and operations.'}]
};
export const INSTRUMENTS = [
 {id:'camera',name:'Multispectral camera',type:'IMAGING',mass:22,cost:9,power:35,data:13,science:{earth:19,moon:17,mars:17},description:'Images surface structure and vegetation. Resolution improves at lower altitude.'},
 {id:'spectrometer',name:'Infrared spectrometer',type:'COMPOSITION',mass:31,cost:14,power:42,data:9,science:{earth:9,moon:17,mars:19},description:'Spectral signatures reveal minerals and surface composition.'},
 {id:'radar',name:'Mapping radar',type:'RADAR',mass:64,cost:23,power:115,data:22,science:{earth:21,moon:20,mars:14},description:'Active sensing offers valuable mapping but demands more power and mass.'},
 {id:'magnetometer',name:'Magnetometer',type:'FIELDS',mass:7,cost:5,power:8,data:2,science:{earth:6,moon:8,mars:10},description:'A compact sensor for magnetic fields. Low resource cost, modest science return.'}
];
export const pick=(kind,id)=>HARDWARE[kind].find(x=>x.id===id);
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function preset(id='earth') {
 const m=MISSIONS[id]||MISSIONS.earth;
 return {mission:m.id,name:m.name+' / 01',bus:id==='earth'?'micro':id==='moon'?'standard':'deep',engine:id==='earth'?'mono':'biprop',power:id==='earth'?'compact':id==='moon'?'large':'deep',comm:id==='mars'?'highgain':id==='moon'?'xband':'sband',launcher:id==='earth'?'small':'medium',payload:id==='earth'?['camera']:['camera','spectrometer'],fuel:id==='earth'?9:id==='moon'?180:340,alt:m.alt,incl:m.incl,duty:75,seed:2026};
}
export function normalize(raw) {
 if(!raw || typeof raw!=='object' || !MISSIONS[raw.mission]) throw Error('Unknown mission blueprint.');
 const p=preset(raw.mission);
 for(const k of Object.keys(HARDWARE)) if(pick(k,raw[k])) p[k]=raw[k];
 p.name=String(raw.name||p.name).slice(0,48);
 p.payload=[...new Set(Array.isArray(raw.payload)?raw.payload: p.payload)].filter(x=>INSTRUMENTS.some(i=>i.id===x));
 for(const [k,a,b] of [['fuel',0,800],['alt',MISSIONS[p.mission].altMin,MISSIONS[p.mission].altMax],['incl',0,180],['duty',25,100],['seed',1,999999]]) p[k]=Number.isFinite(Number(raw[k]))?clamp(Number(raw[k]),a,b):p[k];
 p.seed=Math.round(p.seed); return p;
}
export function orbitalPeriod(mu,radius,alt){return 2*Math.PI*Math.sqrt((radius+alt)**3/mu)/60;}
export function deltaV(dry,fuel,isp){return G0*isp*Math.log((dry+fuel)/dry);}
export function propellantFor(dry,fuel,isp,dv){return (dry+fuel)*(1-Math.exp(-dv/(G0*isp)));}
export function evaluate(design) {
 const d=normalize(design),m=MISSIONS[d.mission],b=pick('bus',d.bus),e=pick('engine',d.engine),p=pick('power',d.power),c=pick('comm',d.comm),l=pick('launcher',d.launcher),ins=INSTRUMENTS.filter(x=>d.payload.includes(x.id));
 const payloadMass=ins.reduce((a,x)=>a+x.mass,0),dry=b.mass+e.mass+p.mass+c.mass+payloadMass,wet=dry+d.fuel;
 const hardwareCost=b.cost+e.cost+p.cost+c.cost+l.cost+ins.reduce((a,x)=>a+x.cost,0)+d.fuel*.025;
 const operationsCost=6+m.days*.3, cost=hardwareCost+operationsCost, reserve=m.budget-cost;
 const generation=p.watts/m.au**2,averageGeneration=generation*(1-m.eclipse),sciencePower=ins.reduce((a,x)=>a+x.power,0),load=b.power+sciencePower*d.duty/100+c.power*m.contact;
 const period=orbitalPeriod(m.mu,m.radius,d.alt),eclipseHours=period*m.eclipse/60;
 const eclipseEnergy=(b.power+sciencePower*d.duty/100)*eclipseHours;
 // Injection supplied by launcher; insertion + correction + end-of-mission maneuver supplied by spacecraft.
 const insertion=m.id==='earth'?0:m.dv-110,trim=30,disposal=m.id==='earth'?60:80,requiredDV=insertion+trim+disposal;
 const dv=deltaV(dry,d.fuel,e.isp),capacity=l.caps[m.id];
 const coverage=clamp(Math.sin(Math.min(d.incl,180-d.incl)*Math.PI/180),.15,1);
 const resolution=clamp(Math.sqrt(m.alt/d.alt),.65,1.35);
 const science=ins.reduce((a,x)=>a+x.science[m.id]*(x.id==='magnetometer'?1:resolution),0)*d.duty/100*coverage;
 const data=ins.reduce((a,x)=>a+x.data,0)*d.duty/100;
 const downlink=c.rates[m.id]; // Fictional net Mbit/turn at nominal contact availability.
 const issues=[]; const issue=(level,code,title,detail)=>issues.push({level,code,title,detail});
 if(cost>m.budget)issue('error','budget','Budget exceeded',`Reduce hardware or launch cost. You are $${(cost-m.budget).toFixed(1)}M over the cap.`);
 if(wet>capacity)issue('error','mass','Launch capacity exceeded',`Wet mass ${Math.round(wet)} kg exceeds ${capacity} kg at this destination. Choose a larger launcher or shed mass.`);
 if(ins.length>b.slots||payloadMass>b.payload)issue('error','payload','Bus payload limit exceeded',`This bus supports ${b.slots} instruments and ${b.payload} kg of payload.`);
 if(m.required.some(x=>!d.payload.includes(x)))issue('error','objective','Required science is missing',`The objective needs ${m.required.map(x=>INSTRUMENTS.find(i=>i.id===x).name).join(' and ')}.`);
 if(dv<requiredDV)issue('error','fuel','Insufficient maneuver capability',`Need ${requiredDV} m/s for insertion, corrections and retirement; this design provides ${Math.round(dv)} m/s.`);
 if(averageGeneration<load)issue('error','power','Negative average power balance',`Generation averages ${Math.round(averageGeneration)} W; planned load is ${Math.round(load)} W. Upgrade the array or reduce science duty.`);
 if(eclipseEnergy>b.battery*.8)issue('error','battery','Eclipse survival is inadequate',`Eclipse needs ${Math.round(eclipseEnergy)} Wh; usable battery is ${Math.round(b.battery*.8)} Wh.`);
 if(reserve<8&&reserve>=0)issue('warning','reserve','Small contingency reserve','Anomalies may require an operations response. Leave at least $8M uncommitted.');
 if(dv>=requiredDV&&dv<requiredDV*1.15)issue('warning','dv-margin','Tight fuel margin','You can meet nominal maneuvers, but a navigation error could consume the remaining margin.');
 if(downlink<data)issue('warning','link','Data backlog expected',`Instruments create ${data.toFixed(1)} Mbit/turn; the nominal link returns ${downlink.toFixed(1)}. A stronger antenna or transmit-only turns can help.`);
 if(coverage<.85)issue('warning','coverage','Limited latitude coverage','A near-polar orbit better serves this global mapping objective.');
 const predicted=science*m.turns*.93*Math.min(1,downlink/Math.max(data,.01));
 if(predicted<m.target)issue('warning','science','Science target is at risk',`Nominal return is about ${Math.round(predicted)} points; the goal is ${m.target}. Improve payload, mapping orbit, duty or communications.`);
 return {d,m,b,e,p,c,l,ins,dry,wet,payloadMass,hardwareCost,operationsCost,cost,reserve,generation,averageGeneration,load,period,eclipseEnergy,requiredDV,insertion,trim,disposal,dv,capacity,coverage,resolution,science,data,downlink,predicted,issues,valid:!issues.some(x=>x.level==='error')};
}
function random(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
export const EVENTS={
 radiation:{title:'Solar particle event',text:'Charged particles threaten avionics. Protect the spacecraft, or keep collecting while the storm passes.',lesson:'Operational safety competes with immediate science return. Redundancy reduces damage; it does not eliminate it.',choices:[{id:'safe',label:'Enter safe mode',note:'Lose this turn’s science; preserve hardware.'},{id:'shield',label:'Upload protective sequence',note:'Spend $3M; keep 65% of science.'},{id:'risk',label:'Continue observations',note:'Keep science; take hardware damage.'}]},
 pointing:{title:'Antenna pointing drift',text:'Telemetry suggests a pointing offset. A weak link will accumulate a science backlog.',lesson:'Science is only useful when it reaches the ground. Data handling and antenna pointing belong in mission design.',choices:[{id:'calibrate',label:'Recalibrate pointing',note:'Spend $2M; reduce this turn’s science by 25%.'},{id:'boost',label:'Increase transmit effort',note:'Reduced link this turn; antenna stays degraded.'},{id:'ignore',label:'Keep collecting',note:'Save money; link remains at 65% capacity.'}]},
 navigation:{title:'Trajectory correction requested',text:'Tracking reveals a small orbit error. Mission control recommends a 20 m/s correction.',lesson:'Fuel margins protect a mission from off-nominal conditions. A nominally sufficient tank may not be enough.',choices:[{id:'burn',label:'Execute correction',note:'Spend 20 m/s; protect mapping quality.'},{id:'model',label:'Refine the orbit solution',note:'Spend $4M; avoid the extra burn.'},{id:'accept',label:'Accept the drift',note:'Lose 18% of mapping quality for the rest of the mission.'}]},
 discovery:{title:'High-value observation window',text:'A rare observation opportunity is available. More science now will increase the data queue.',lesson:'An observation campaign should match power and downlink capability, not just instrument capability.',choices:[{id:'focus',label:'Prioritize the discovery',note:'Up to 1.45× science and data; capped at 100% duty, with extra power load.'},{id:'routine',label:'Follow the baseline plan',note:'Preserve nominal science and power.'},{id:'downlink',label:'Clear the data queue',note:'No new science this turn; 2× downlink capacity.'}]}
};
export function start(design){const a=evaluate(design);if(!a.valid)throw Error('Resolve launch blockers before starting.');const used=propellantFor(a.dry,a.d.fuel,a.e.isp,a.insertion);return {design:a.d,turn:0,phase:'operations',fuel:a.d.fuel-used,battery:a.b.battery*.8,health:100,reserve:a.reserve,science:0,generated:0,queue:[],link:1,quality:1,array:1,event:null,history:[],seed:a.d.seed,retired:false,log:[{turn:0,title:'Launch and insertion complete',detail:`${Math.round(a.wet)} kg delivered. ${Math.round(a.insertion)} m/s insertion maneuver completed. Science operations ready.`}]};}
export function eventFor(state){if(state.phase!=='operations')return null;const index={2:'radiation',5:'pointing',7:'navigation',9:'discovery'}[state.turn];return index||null;}
export function advance(input,mode='balanced',choice=null){
 const s=structuredClone(input),a=evaluate(s.design),m=a.m;
 if(s.phase!=='operations')throw Error('Mission is not in operations.');
 if(!['balanced','observe','transmit','safe'].includes(mode))throw Error('Unknown operations mode.');
 const key=eventFor(s);if(key&&!EVENTS[key].choices.some(x=>x.id===choice))throw Error('Choose a response to the pending event.');
 let scienceFactor=mode==='observe'?1.25:mode==='transmit'?0:mode==='safe'?0:1;
 let linkFactor=mode==='observe'?.45:mode==='transmit'?2:mode==='safe'?.25:1;
 let eventPower=1; const logs=[];const spend=(cost)=>{if(s.reserve+1e-9<cost)throw Error('Insufficient contingency reserve.');s.reserve-=cost;};
 if(key==='radiation'){if(choice==='safe')scienceFactor=0;else if(choice==='shield'){spend(3);scienceFactor*=.65;}else s.health-=s.design.bus==='deep'?9:18;logs.push('Solar particle event response: '+choice+'.');}
 if(key==='pointing'){if(choice==='calibrate'){spend(2);scienceFactor*=.75;s.link=1;}else {s.link=.65;if(choice==='boost')linkFactor*=1.25;}logs.push('Pointing response: '+choice+'.');}
 if(key==='navigation'){if(choice==='burn'){const used=propellantFor(a.dry,s.fuel,a.e.isp,20);if(used>s.fuel)throw Error('Not enough propellant for the correction.');s.fuel-=used;}else if(choice==='model')spend(4);else s.quality*=.82;logs.push('Navigation response: '+choice+'.');}
 if(key==='discovery'){if(choice==='focus'){scienceFactor*=1.45;eventPower=1.2;}else if(choice==='downlink'){scienceFactor=0;linkFactor=2;}logs.push('Observation-window response: '+choice+'.');}
 scienceFactor=Math.min(scienceFactor,100/a.d.duty);
 const rng=random(s.seed+s.turn*97),weather=.88+rng()*.20;
 const available=a.averageGeneration*s.array, demand=a.b.power+(a.ins.reduce((x,i)=>x+i.power,0)*a.d.duty/100*scienceFactor+a.c.power*m.contact*linkFactor)*eventPower;
 // Each turn is multiple days. Mean-energy shortfall cannot be bridged indefinitely by a small battery.
 const deficit=Math.max(0,demand-available)*24*m.days;
 let powerScale=1;
 if(deficit>0){powerScale=clamp((available-a.b.power)/Math.max(1,demand-a.b.power),0,1);s.battery=Math.max(0,s.battery-Math.min(deficit,s.battery));s.health-=8;logs.push('Power shortfall: automatic load shedding reduced operations.');}
 else s.battery=Math.min(a.b.battery*.8,s.battery+(available-demand)*24*m.days);
 const eclipseDemand=(a.b.power+a.ins.reduce((x,i)=>x+i.power,0)*a.d.duty/100*scienceFactor)*a.period*m.eclipse/60;
 if(eclipseDemand>a.b.battery*.8){s.health-=6;powerScale*=.8;logs.push('Eclipse demand exceeded usable battery capacity.');}
 const acquired=a.science*scienceFactor*s.quality*weather*powerScale*clamp(s.health/100,.35,1),newData=a.data*scienceFactor*powerScale;
 s.generated+=acquired;if(newData>0)s.queue.push({data:newData,science:acquired});
 let capacity=a.downlink*linkFactor*s.link*weather*powerScale,returned=0;
 while(capacity>0&&s.queue.length){const q=s.queue[0],fraction=Math.min(1,capacity/q.data),take=q.data*fraction,points=q.science*fraction;returned+=points;capacity-=take;q.data-=take;q.science-=points;if(q.data<1e-8)s.queue.shift();}
 s.science+=returned;s.turn++;s.health=clamp(s.health-.25,0,100);
 const terminal=s.turn===m.turns;
 if(terminal){const remainingDV=deltaV(a.dry,s.fuel,a.e.isp),needed=a.trim+a.disposal;if(remainingDV>=needed){s.fuel-=propellantFor(a.dry,s.fuel,a.e.isp,needed);s.retired=true;logs.push('Final corrections and terminal maneuver completed.');}else{logs.push('Insufficient fuel for final corrections and retirement.');s.retired=false;}s.phase='complete';}
 s.log.push({turn:s.turn,title:terminal?'Mission completed':`Operations block ${s.turn}`,detail:`${Math.round(acquired)} points collected; ${Math.round(returned)} returned. ${logs.join(' ')}`});
 s.history.push({turn:s.turn,science:s.science,health:s.health,battery:s.battery,queue:s.queue.reduce((x,q)=>x+q.data,0),mode,choice});return s;
}
export function result(s){const a=evaluate(s.design),science=clamp(s.science/a.m.target,0,1),efficiency=clamp(s.reserve/a.m.budget,0,1),health=clamp(s.health/100,0,1),responsibility=s.retired?1:0;const success=s.phase==='complete'&&science>=1&&s.health>30&&s.retired;return {success,score:Math.round(650*science+150*health+100*efficiency+100*responsibility),science,efficiency,health,responsibility,title:success?'Mission accomplished':s.phase==='complete'?'Mission needs another iteration':'Mission in progress'};}
export function forecast(design,runs=32){const a=evaluate(design);if(!a.valid)return null;const scores=[];let successes=0,min=Infinity,max=0;for(let i=0;i<runs;i++){let s=start({...design,seed:1000+i});while(s.phase==='operations'){const key=eventFor(s);let choice=key==='radiation'?(s.reserve>=3?'shield':'safe'):key==='pointing'?(s.reserve>=2?'calibrate':'ignore'):key==='navigation'?'burn':key==='discovery'?'routine':null;s=advance(s,'balanced',choice);}const r=result(s);if(r.success)successes++;scores.push(r.score);min=Math.min(min,s.science);max=Math.max(max,s.science);}return {runs,successes,score:Math.round(scores.reduce((x,y)=>x+y,0)/runs),min:Math.round(min),max:Math.round(max)};}
