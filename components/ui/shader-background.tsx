"use client"

// Orb shader background (21st.dev Shader Builder, "dark" by vodichka.vldk), trimmed to what BXP uses
// (no cursor modes, no OKLab, no blur tap) and recoloured black to gold. One WebGL1 canvas that
// fills its parent, drawn only while on screen, still when the visitor prefers reduced motion.

import { useEffect, useRef } from "react"

const VERT = `attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }`

const FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec3 u_colors[4];
uniform vec4 u_scene; // resolution.xy, time, seed

float hash21(vec2 p) {
  p = mod(p, 31.0);
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
             mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}
vec3 palette(float x) {
  float f = clamp(x, 0.0, 1.0) * 3.0;
  vec3 col = u_colors[0];
  col = mix(col, u_colors[1], smoothstep(0.0, 1.0, clamp(f, 0.0, 1.0)));
  col = mix(col, u_colors[2], smoothstep(0.0, 1.0, clamp(f - 1.0, 0.0, 1.0)));
  col = mix(col, u_colors[3], smoothstep(0.0, 1.0, clamp(f - 2.0, 0.0, 1.0)));
  return col;
}

void main() {
  vec2 res = u_scene.xy;
  float t = u_scene.z;
  float seed = u_scene.w;
  vec2 screenUv = gl_FragCoord.xy / res;
  vec2 p = (gl_FragCoord.xy - 0.5 * res) / min(res.x, res.y);
  p *= 0.9;
  float cr = cos(2.6), sr = sin(2.6);
  p = mat2(cr, -sr, sr, cr) * p;
  p += vec2(-0.01, -0.02) + 0.076 * vec2(sin(t * 0.31), cos(t * 0.23));
  p += 0.246 * (vec2(fbm(p * 3.552 + seed), fbm(p * 3.552 + vec2(5.2, 1.3))) - 0.5);
  float wob = fbm(p * 2.0 + t * 0.25 + seed) - 0.5;
  float d = length(p) + wob * 0.73 * 0.5;
  float core = 1.0 - smoothstep(0.0, 0.75, d);
  float halo = exp(-d * 2.5) * 0.5;
  vec3 col = palette(core + halo);
  col = (col - 0.5) * 1.25 + 0.5;
  float luma = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(luma), col, 0.9) - 0.05;
  float vd = length(screenUv - 0.5) * 1.41421356;
  col *= 1.0 - smoothstep(0.35, 1.0, vd);
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`

// night, ember, deep gold, gold (the page's own tokens)
const COLORS = [0.027, 0.027, 0.031, 0.165, 0.122, 0.031, 0.541, 0.416, 0.133, 0.902, 0.741, 0.318]

export function ShaderBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", { antialias: false })
    if (!gl) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    gl.uniform3fv(gl.getUniformLocation(program, "u_colors"), new Float32Array(COLORS))
    const scene = gl.getUniformLocation(program, "u_scene")

    let raf = 0
    let inView = true
    const start = performance.now()

    const draw = (now: number) => {
      raf = 0
      // ponytail: fixed 1x pixel ratio, the glow is soft so half resolution is invisible
      const w = Math.max(1, Math.round(canvas.clientWidth * 0.5))
      const h = Math.max(1, Math.round(canvas.clientHeight * 0.5))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      gl.uniform4f(scene, w, h, reduce ? 4 : ((now - start) / 1000) * 0.5, 3505)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!reduce && inView) raf = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting
      if (inView && !raf) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)
    const ro = new ResizeObserver(() => {
      if (!raf) raf = requestAnimationFrame(draw)
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      // no loseContext(): React Strict Mode re-runs this effect on the same canvas, and a lost context cannot be revived
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={className} style={{ display: "block", width: "100%", height: "100%" }} />
}

export default ShaderBackground
