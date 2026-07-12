"use client";
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo } from 'react';
import MorphingBlob from './MorphingBlob';

export default function LavaLampScene() {
  const { scene } = useThree();
  
  // Define the start and end background colors
  const bgStart = useMemo(() => new THREE.Color("#708C5A"), []); // Oevra dark green
  const bgEnd = useMemo(() => new THREE.Color("#C1B4D1"), []);   // Sleek matte black
  const currentBg = useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    if (typeof window !== 'undefined') {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      
      // Smoothly blend the scene's background color
      currentBg.lerpColors(bgStart, bgEnd, scrollProgress);
      scene.background = currentBg;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      
      {/* 
        The blobs start green, but transition into cyberpunk-inspired 
        neon cyans, deep purples, and dark tones against the matte black background.
      */}
      <MorphingBlob 
        position={[-3, 2, -2]} 
        colorStartHex="#518F3D" 
        colorEndHex="#47FFB8" // Neon cyan
        scale={2.0} speed={1.3} offset={10} 
      />
      <MorphingBlob 
        position={[3, -2, -1]} 
        colorStartHex="#2F5236" 
        colorEndHex="#9D47FF" // Deep purple
        scale={1.8} speed={1.4} offset={45} 
      />
      <MorphingBlob 
        position={[-4, -3, -3]} 
        colorStartHex="#749441" 
        colorEndHex="#FF47E0" // Dark grey/matte
        scale={2.5} speed={2.2} offset={80} 
      />
      <MorphingBlob 
        position={[2, 3, -4]} 
        colorStartHex="#71A321" 
        colorEndHex="#47FFF3" // Bright blue
        scale={3.0} speed={1.25} offset={12} 
      />
      <MorphingBlob 
        position={[0, 0, -2]} 
        colorStartHex="#A1D6AD" 
        colorEndHex="#69FF47" // Deep matte tone
        scale={2.2} speed={1.5} offset={99} 
      />
      <MorphingBlob 
        position={[-2, -3, -4]} 
        colorStartHex="#0C1F10" 
        colorEndHex="#F0FF47" // Bright blue
        scale={3.0} speed={1.25} offset={12} 
      />
      <MorphingBlob 
        position={[10, 6, -2]} 
        colorStartHex="#195E28" 
        colorEndHex="#FFAF47" // Deep matte tone
        scale={2.2} speed={1.5} offset={99} 
      />
    </>
  );
}