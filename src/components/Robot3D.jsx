import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Robot({ mouse, onRobotClick }) {
    const groupRef = useRef();
    const headRef = useRef();
    const leftEyeRef = useRef();
    const rightEyeRef = useRef();
    const antennaRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [waving, setWaving] = useState(false);
    const rightArmRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Head follows mouse
        if (headRef.current) {
            const targetRotX = mouse.y * 0.3;
            const targetRotY = mouse.x * 0.4;
            headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.05);
            headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.05);
        }

        // Eyes follow mouse
        [leftEyeRef, rightEyeRef].forEach((eyeRef) => {
            if (eyeRef.current) {
                eyeRef.current.position.x = THREE.MathUtils.lerp(
                    eyeRef.current.position.x,
                    eyeRef.current.userData.baseX + mouse.x * 0.05,
                    0.08
                );
                eyeRef.current.position.y = THREE.MathUtils.lerp(
                    eyeRef.current.position.y,
                    eyeRef.current.userData.baseY + mouse.y * 0.03,
                    0.08
                );
            }
        });

        // Antenna bob
        if (antennaRef.current) {
            antennaRef.current.rotation.z = Math.sin(t * 2) * 0.1 + mouse.x * 0.15;
            antennaRef.current.rotation.x = Math.sin(t * 1.5) * 0.05 + mouse.y * 0.1;
        }

        // Body subtle idle
        if (groupRef.current) {
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.15, 0.03);
        }

        // Waving arm
        if (rightArmRef.current) {
            if (waving) {
                rightArmRef.current.rotation.z = -Math.PI / 2 + Math.sin(t * 8) * 0.3;
            } else {
                rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
                    rightArmRef.current.rotation.z,
                    Math.sin(t * 1.2) * 0.08,
                    0.05
                );
            }
        }
    });

    const handleClick = () => {
        setWaving(true);
        setTimeout(() => {
            setWaving(false);
            // Scroll down after wave animation
            if (onRobotClick) onRobotClick();
        }, 1200);
    };

    const bodyColor = '#2a2a4a';
    const metalColor = '#4a4a6a';
    const accentColor = '#8b7cf7';
    const accentColor2 = '#00e5df';
    const glowPurple = '#a78bfa';
    const glowCyan = '#22d3ee';

    return (
        <group
            ref={groupRef}
            onClick={handleClick}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
        >
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* ===== BODY ===== */}
                <group position={[0, -0.2, 0]}>
                    {/* Main torso */}
                    <mesh castShadow>
                        <boxGeometry args={[1, 1.1, 0.7]} />
                        <meshStandardMaterial
                            color={bodyColor}
                            metalness={0.4}
                            roughness={0.4}
                        />
                    </mesh>
                    {/* Chest plate glow */}
                    <mesh position={[0, 0.05, 0.36]}>
                        <boxGeometry args={[0.7, 0.7, 0.02]} />
                        <meshStandardMaterial
                            color={accentColor}
                            emissive={glowPurple}
                            emissiveIntensity={0.8}
                            metalness={0.5}
                            roughness={0.3}
                        />
                    </mesh>
                    {/* Chest line accents */}
                    <mesh position={[0, 0.3, 0.37]}>
                        <boxGeometry args={[0.5, 0.03, 0.01]} />
                        <meshStandardMaterial
                            color={accentColor2}
                            emissive={glowCyan}
                            emissiveIntensity={1.2}
                        />
                    </mesh>
                    <mesh position={[0, -0.15, 0.37]}>
                        <boxGeometry args={[0.5, 0.03, 0.01]} />
                        <meshStandardMaterial
                            color={accentColor2}
                            emissive={glowCyan}
                            emissiveIntensity={1.2}
                        />
                    </mesh>
                    {/* Heart light */}
                    <mesh position={[0, 0.1, 0.39]}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshStandardMaterial
                            color={accentColor2}
                            emissive={glowCyan}
                            emissiveIntensity={hovered ? 3 : 1.5}
                        />
                    </mesh>

                    {/* ===== HEAD ===== */}
                    <group ref={headRef} position={[0, 0.95, 0]}>
                        {/* Head box */}
                        <mesh castShadow>
                            <boxGeometry args={[0.85, 0.7, 0.65]} />
                            <meshStandardMaterial
                                color={bodyColor}
                                metalness={0.4}
                                roughness={0.4}
                            />
                        </mesh>
                        {/* Visor */}
                        <mesh position={[0, -0.02, 0.33]}>
                            <boxGeometry args={[0.65, 0.4, 0.02]} />
                            <meshStandardMaterial
                                color="#0a0a1f"
                                metalness={0.9}
                                roughness={0.1}
                            />
                        </mesh>
                        {/* Visor border glow */}
                        <mesh position={[0, -0.02, 0.335]}>
                            <boxGeometry args={[0.68, 0.43, 0.005]} />
                            <meshStandardMaterial
                                color={accentColor}
                                emissive={glowPurple}
                                emissiveIntensity={0.6}
                                transparent
                                opacity={0.5}
                            />
                        </mesh>
                        {/* Left eye - bigger and brighter */}
                        <mesh
                            ref={leftEyeRef}
                            position={[-0.15, 0, 0.35]}
                            userData={{ baseX: -0.15, baseY: 0 }}
                        >
                            <sphereGeometry args={[0.09, 16, 16]} />
                            <meshStandardMaterial
                                color="#ffffff"
                                emissive={glowCyan}
                                emissiveIntensity={hovered ? 4 : 2}
                            />
                        </mesh>
                        {/* Right eye */}
                        <mesh
                            ref={rightEyeRef}
                            position={[0.15, 0, 0.35]}
                            userData={{ baseX: 0.15, baseY: 0 }}
                        >
                            <sphereGeometry args={[0.09, 16, 16]} />
                            <meshStandardMaterial
                                color="#ffffff"
                                emissive={glowCyan}
                                emissiveIntensity={hovered ? 4 : 2}
                            />
                        </mesh>
                        {/* Mouth */}
                        <mesh position={[0, -0.13, 0.35]}>
                            <boxGeometry args={[hovered ? 0.28 : 0.2, 0.035, 0.01]} />
                            <meshStandardMaterial
                                color={hovered ? accentColor2 : accentColor}
                                emissive={hovered ? glowCyan : glowPurple}
                                emissiveIntensity={1.5}
                            />
                        </mesh>
                        {/* Antenna */}
                        <group ref={antennaRef} position={[0, 0.35, 0]}>
                            <mesh>
                                <cylinderGeometry args={[0.025, 0.025, 0.3, 8]} />
                                <meshStandardMaterial
                                    color={metalColor}
                                    emissive={glowPurple}
                                    emissiveIntensity={0.2}
                                    metalness={0.7}
                                    roughness={0.3}
                                />
                            </mesh>
                            <mesh position={[0, 0.2, 0]}>
                                <sphereGeometry args={[0.07, 16, 16]} />
                                <meshStandardMaterial
                                    color={accentColor}
                                    emissive={glowPurple}
                                    emissiveIntensity={hovered ? 3.5 : 2}
                                />
                            </mesh>
                        </group>
                        {/* Ear panels with glow */}
                        <mesh position={[-0.47, 0, 0]}>
                            <boxGeometry args={[0.08, 0.25, 0.2]} />
                            <meshStandardMaterial
                                color={metalColor}
                                emissive={glowPurple}
                                emissiveIntensity={0.3}
                                metalness={0.6}
                                roughness={0.3}
                            />
                        </mesh>
                        <mesh position={[0.47, 0, 0]}>
                            <boxGeometry args={[0.08, 0.25, 0.2]} />
                            <meshStandardMaterial
                                color={metalColor}
                                emissive={glowPurple}
                                emissiveIntensity={0.3}
                                metalness={0.6}
                                roughness={0.3}
                            />
                        </mesh>
                    </group>

                    {/* ===== ARMS ===== */}
                    {/* Left arm */}
                    <group position={[-0.65, 0.15, 0]}>
                        <mesh>
                            <boxGeometry args={[0.18, 0.7, 0.18]} />
                            <meshStandardMaterial color={metalColor} metalness={0.5} roughness={0.4} />
                        </mesh>
                        {/* Shoulder joint glow */}
                        <mesh position={[0, 0.35, 0]}>
                            <sphereGeometry args={[0.1, 16, 16]} />
                            <meshStandardMaterial
                                color={accentColor}
                                emissive={glowPurple}
                                emissiveIntensity={0.5}
                            />
                        </mesh>
                        <mesh position={[0, -0.42, 0]}>
                            <sphereGeometry args={[0.12, 16, 16]} />
                            <meshStandardMaterial color={bodyColor} metalness={0.5} roughness={0.4} />
                        </mesh>
                    </group>
                    {/* Right arm */}
                    <group ref={rightArmRef} position={[0.65, 0.15, 0]}>
                        <mesh>
                            <boxGeometry args={[0.18, 0.7, 0.18]} />
                            <meshStandardMaterial color={metalColor} metalness={0.5} roughness={0.4} />
                        </mesh>
                        <mesh position={[0, 0.35, 0]}>
                            <sphereGeometry args={[0.1, 16, 16]} />
                            <meshStandardMaterial
                                color={accentColor}
                                emissive={glowPurple}
                                emissiveIntensity={0.5}
                            />
                        </mesh>
                        <mesh position={[0, -0.42, 0]}>
                            <sphereGeometry args={[0.12, 16, 16]} />
                            <meshStandardMaterial color={bodyColor} metalness={0.5} roughness={0.4} />
                        </mesh>
                    </group>

                    {/* ===== LEGS ===== */}
                    <mesh position={[-0.25, -0.75, 0]}>
                        <boxGeometry args={[0.22, 0.5, 0.22]} />
                        <meshStandardMaterial color={metalColor} metalness={0.5} roughness={0.4} />
                    </mesh>
                    <mesh position={[0.25, -0.75, 0]}>
                        <boxGeometry args={[0.22, 0.5, 0.22]} />
                        <meshStandardMaterial color={metalColor} metalness={0.5} roughness={0.4} />
                    </mesh>
                    {/* Feet */}
                    <mesh position={[-0.25, -1.05, 0.05]}>
                        <boxGeometry args={[0.26, 0.12, 0.35]} />
                        <meshStandardMaterial color={bodyColor} metalness={0.5} roughness={0.4} />
                    </mesh>
                    <mesh position={[0.25, -1.05, 0.05]}>
                        <boxGeometry args={[0.26, 0.12, 0.35]} />
                        <meshStandardMaterial color={bodyColor} metalness={0.5} roughness={0.4} />
                    </mesh>
                </group>
            </Float>
        </group>
    );
}

export default function Robot3D() {
    const containerRef = useRef();
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            setMouse({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleScrollDown = () => {
        const robotSection = containerRef.current?.closest('.robot-section');
        if (robotSection) {
            const nextSection = robotSection.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <div ref={containerRef} className="robot-3d-container">
            <Canvas
                camera={{ position: [0, 0.3, 3.5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.6} />
                <pointLight position={[3, 3, 3]} intensity={2} color="#8b7cf7" />
                <pointLight position={[-3, 2, 2]} intensity={1.5} color="#22d3ee" />
                <pointLight position={[0, -2, 3]} intensity={0.8} color="#a78bfa" />
                <spotLight
                    position={[0, 5, 5]}
                    angle={0.4}
                    penumbra={0.8}
                    intensity={1.5}
                    color="#ffffff"
                />
                <Robot mouse={mouse} onRobotClick={handleScrollDown} />
            </Canvas>
            <p className="robot-hint">click to explore</p>
        </div>
    );
}
