import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float u_time;
  uniform float u_speed;
  uniform float u_offset;
  varying vec2 vUv;

  // --- GLSL 3D SIMPLEX NOISE FUNCTION ---
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    float time = (u_time * u_speed) + u_offset;
    float noise = snoise(vec3(position.x * 1.5, position.y * 1.5, position.z * 1.5 + time));
    vec3 distortedPosition = position + normal * noise * 0.7; 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(distortedPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 u_colorStart;
  uniform vec3 u_colorEnd;
  uniform float u_scroll;
  varying vec2 vUv;
  
  void main() {
    // 1. Blend between start and end colors based on the scroll progress (0.0 to 1.0)
    vec3 currentColor = mix(u_colorStart, u_colorEnd, u_scroll);
    
    // 2. Apply the volumetric depth gradient
    vec3 finalColor = mix(currentColor * 0.6, currentColor * 1.3, vUv.y);
    
    gl_FragColor = vec4(finalColor, 0.85); 
  }
`;

interface MorphingBlobProps {
  position: [number, number, number];
  colorStartHex: string;
  colorEndHex: string;
  scale?: number;
  speed?: number;
  offset?: number;
}

export default function MorphingBlob({ 
  position, 
  colorStartHex, 
  colorEndHex,
  scale = 1, 
  speed = 0.4, 
  offset = 0 
}: MorphingBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_colorStart: { value: new THREE.Color(colorStartHex) },
    u_colorEnd: { value: new THREE.Color(colorEndHex) },
    u_scroll: { value: 0 }, // Will update on frame
    u_speed: { value: speed },
    u_offset: { value: offset }
  }), [colorStartHex, colorEndHex, speed, offset]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const material = meshRef.current.material as THREE.ShaderMaterial;
      
      // Calculate Scroll Progress safely
      if (typeof window !== 'undefined') {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        // Clamp between 0 and 1
        const scrollProgress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
        
        if (material.uniforms) {
          material.uniforms.u_scroll.value = scrollProgress;
        }
      }

      if (material.uniforms) {
        material.uniforms.u_time.value = time;
      }
      
      meshRef.current.rotation.x += 0.001 * speed;
      meshRef.current.rotation.y += 0.002 * speed;

      const floatTime = (time * speed * 0.3) + offset;
      meshRef.current.position.x = position[0] + Math.sin(floatTime) * 3; 
      meshRef.current.position.y = position[1] + Math.cos(floatTime * 0.8) * 3;
      meshRef.current.position.z = position[2] + Math.sin(floatTime * 0.5) * 1.5; 
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 128, 128]} />
      <shaderMaterial 
        vertexShader={vertexShader} 
        fragmentShader={fragmentShader} 
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}