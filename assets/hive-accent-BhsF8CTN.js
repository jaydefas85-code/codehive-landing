function e(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(e.deleteShader(r),null)}function t(t){let n=t.getContext(`webgl2`,{alpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:`low-power`,preserveDrawingBuffer:!1});if(!n)return null;let r=e(n,n.VERTEX_SHADER,`#version 300 es
in vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`),i=e(n,n.FRAGMENT_SHADER,`#version 300 es
precision mediump float;
uniform vec2 uRes;uniform float uT;out vec4 o;
const vec2 S=vec2(1.,1.7320508);
const vec3 GROUND=vec3(.039,.039,.043);
const vec3 RULE=vec3(.176,.180,.196);
const vec3 SIGNAL=vec3(1.,.702,.251);
const float TRAIT=.012;
vec4 hex(vec2 p){
  vec4 c=floor(vec4(p,p-vec2(.5,1.))/S.xyxy)+.5;
  vec4 h=vec4(p-c.xy*S,p-(c.zw+.5)*S);
  return dot(h.xy,h.xy)<dot(h.zw,h.zw)?vec4(h.xy,c.xy):vec4(h.zw,c.zw+.5);
}
float hd(vec2 p){p=abs(p);return max(dot(p,S*.5),p.x);}
float hash(vec2 p){return fract(sin(dot(p,vec2(41.3,289.1)))*43758.5453);}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*uRes)/uRes.y*7.2;
  vec4 h=hex(uv);
  float d=hd(h.xy);
  float px=fwidth(d)*1.4;
  /* respiration : phase decalee par cellule, periode phi^3 secondes */
  float ph=hash(h.zw);
  float breath=.5+.5*sin(uT*1.4832-ph*6.2831-length(h.zw)*.42);
  /* LA cellule qui refuse : coordonnee fixe, jamais animee */
  float refus=step(distance(h.zw,vec2(1.5,-.5)),.25);
  breath=mix(breath,0.,refus);
  /* trait sur l'arete : d culmine a .5, jamais plus (voir le JS au-dessus) */
  float rim=1.-smoothstep(TRAIT,TRAIT+px,.5-d);
  vec3 col=GROUND+RULE*rim*(.55+.45*breath)+SIGNAL*rim*breath*breath*.34;
  col=mix(col,SIGNAL*.9,rim*refus);
  /* vignette : le champ s'eteint sur ses bords, il ne deborde jamais sur la page */
  float v=1.-smoothstep(.55,1.05,length((gl_FragCoord.xy/uRes-.5)*vec2(1.15,1.)));
  o=vec4(col*v,v);
}`),a=r&&i?n.createProgram():null;if(a&&(n.attachShader(a,r),n.attachShader(a,i),n.linkProgram(a)),r&&n.deleteShader(r),i&&n.deleteShader(i),!a||!n.getProgramParameter(a,n.LINK_STATUS))return a&&n.deleteProgram(a),n.getExtension(`WEBGL_lose_context`)?.loseContext(),null;n.useProgram(a);let o=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,o),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW);let s=n.getAttribLocation(a,`a`);n.enableVertexAttribArray(s),n.vertexAttribPointer(s,2,n.FLOAT,!1,0,0);let c=n.getUniformLocation(a,`uRes`),l=n.getUniformLocation(a,`uT`),u=0,d=0,f=0,p=!0,m=!0,h=!1,g=()=>{let e=Math.min(devicePixelRatio||1,1.75),r=Math.round(t.clientWidth*e),i=Math.round(t.clientHeight*e);h&&t.width===r&&t.height===i||(h=!0,t.width=r,t.height=i,n.viewport(0,0,r,i),n.uniform2f(c,r,i))},_=e=>{u=requestAnimationFrame(_),d+=Math.min((e-f)/1e3,1/30),f=e,g(),n.uniform1f(l,d),n.drawArrays(n.TRIANGLES,0,3)},v=e=>{e&&!u&&m&&(f=performance.now(),u=requestAnimationFrame(_)),!e&&u&&(cancelAnimationFrame(u),u=0)},y=new IntersectionObserver(([e])=>{p=e.isIntersecting,v(p)},{threshold:0});y.observe(t);let b=()=>v(p&&document.visibilityState===`visible`);document.addEventListener(`visibilitychange`,b);let x=e=>{e.preventDefault?.(),m=!1,v(!1),t.parentElement?.removeAttribute(`data-accent`),t.remove()};return t.addEventListener(`webglcontextlost`,x),()=>{v(!1),y.disconnect(),document.removeEventListener(`visibilitychange`,b),t.removeEventListener(`webglcontextlost`,x),n.deleteBuffer(o),n.deleteProgram(a),n.getExtension(`WEBGL_lose_context`)?.loseContext()}}export{t as mountHiveAccent};