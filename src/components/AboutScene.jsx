import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} scale={2.2}>
                <icosahedronGeometry args={[1, 4]} />
                <MeshDistortMaterial
                    color="#6c5ce7"
                    wireframe
                    transparent
                    opacity={0.35}
                    distort={0.3}
                    speed={2}
                />
            </mesh>
        </Float>
    );
}

function InnerGlow() {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={1.5}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color="#00cec9"
                    transparent
                    opacity={0.08}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </Float>
    );
}

export default function AboutScene() {
    return (
        <div className="about-canvas">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ background: 'transparent' }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#6c5ce7" />
                <pointLight position={[-3, -3, 2]} intensity={0.5} color="#00cec9" />
                <AnimatedSphere />
                <InnerGlow />
            </Canvas>
        </div>
    );
}
