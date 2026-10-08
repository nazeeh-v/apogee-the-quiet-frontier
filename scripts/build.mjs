import {readFile,access} from 'node:fs/promises';
const files=['index.html','app.js','engine.js','style.css','icon.svg','sw.js','manifest.webmanifest','lab.html','frontier.js','survival.js','space-renderer.js','canvas-renderer.js','frontier.css'];
for(const file of files)await access(new URL('../dist/'+file,import.meta.url));
const html=await readFile(new URL('../dist/index.html',import.meta.url),'utf8');
if(!html.includes('APOGEE')||!html.includes('type="module"'))throw Error('Static entry point is incomplete.');
console.log('Static distribution verified: '+files.length+' dependency-free assets.');
