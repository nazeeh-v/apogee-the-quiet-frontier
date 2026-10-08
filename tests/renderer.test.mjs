import test from 'node:test';import assert from 'node:assert/strict';
import {multiply,perspective,viewMatrix,project,SpaceRenderer} from '../dist/space-renderer.js';
import {create} from '../dist/survival.js';
import {mockGL} from './helpers/gl.mjs';

test('projection centers points in front of the camera and rejects those behind',()=>{const vp=multiply(perspective(Math.PI/2,1,.1,100),viewMatrix([0,0,0],0,0));const p=project([0,0,-10],vp,800,800);assert.equal(p.x,400);assert.equal(p.y,400);assert.equal(project([0,0,10],vp,800,800),null);});
test('camera matrix correctly handles translated and rotated viewpoints',()=>{const vp=multiply(perspective(Math.PI/2,1,.1,100),viewMatrix([5,2,3],Math.PI/2,0));const p=project([-5,2,3],vp,500,500);assert.ok(Math.abs(p.x-250)<1e-4);assert.ok(Math.abs(p.y-250)<1e-4);});
test('procedural geometry and draw transforms stay finite across the world',()=>{const {gl,stats}=mockGL(),canvas={clientWidth:1280,clientHeight:720,width:0,height:0,getContext(){return gl;}};const renderer=new SpaceRenderer(canvas),s=create();renderer.render(s,10);assert.equal(canvas.width,1280);assert.ok(stats().draws>100);assert.ok(stats().buffers>=12);assert.ok(renderer.marker([0,0,0]));s.modules=['solar'];s.pos=[-500,70,-890];s.yaw=1.2;s.pitch=.7;renderer.render(s,40);assert.ok(stats().draws>200);});
test('renderer failure is explicit when WebGL is unavailable',()=>{assert.throws(()=>new SpaceRenderer({getContext(){return null;}}),/WebGL is unavailable/);});
