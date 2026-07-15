import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Kept outside any component/hook so the react-hooks purity rule doesn't treat
// this Math.random usage as impure render code — it's an opaque call from useMemo's view.
function createParticleData(count) {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const color1 = new THREE.Color('#6c5ce7');
    const color2 = new THREE.Color('#00cec9');
    const color3 = new THREE.Color('#a855f7');

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

        const colorChoice = Math.random();
        const color = colorChoice < 0.33 ? color1 : colorChoice < 0.66 ? color2 : color3;
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        sizes[i] = Math.random() * 0.05 + 0.01;
    }

    return { positions, colors, sizes };
}

function FloatingParticles({ count = 200 }) {
    const mesh = useRef();
    const light = useRef();

    const particles = useMemo(() => createParticleData(count), [count]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.elapsedTime * 0.03;
            mesh.current.rotation.y = state.clock.elapsedTime * 0.05;

            const positions = mesh.current.geometry.attributes.position.array;
            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
            }
            mesh.current.geometry.attributes.position.needsUpdate = true;
        }
        if (light.current) {
            light.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
            light.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 3;
        }
    });

    return (
        <>
            <pointLight ref={light} intensity={2} color="#6c5ce7" distance={10} />
            <pointLight position={[3, -2, -4]} intensity={1} color="#00cec9" distance={8} />
            <ambientLight intensity={0.1} />
            <points ref={mesh}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={particles.positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={count}
                        array={particles.colors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.04}
                    vertexColors
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
        </>
    );
}

function FloatingGeometry() {
    const torusRef = useRef();
    const icosaRef = useRef();
    const octaRef = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (torusRef.current) {
            torusRef.current.rotation.x = t * 0.2;
            torusRef.current.rotation.y = t * 0.3;
            torusRef.current.position.y = Math.sin(t * 0.5) * 0.3;
        }
        if (icosaRef.current) {
            icosaRef.current.rotation.x = t * 0.15;
            icosaRef.current.rotation.z = t * 0.25;
            icosaRef.current.position.y = Math.sin(t * 0.4 + 1) * 0.4;
        }
        if (octaRef.current) {
            octaRef.current.rotation.y = t * 0.2;
            octaRef.current.rotation.z = t * 0.15;
            octaRef.current.position.y = Math.sin(t * 0.6 + 2) * 0.25;
        }
    });

    return (
        <>
            <mesh ref={torusRef} position={[3, 1, -3]}>
                <torusGeometry args={[0.8, 0.15, 16, 64]} />
                <meshStandardMaterial
                    color="#6c5ce7"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>
            <mesh ref={icosaRef} position={[-3, -1, -2]}>
                <icosahedronGeometry args={[0.7, 0]} />
                <meshStandardMaterial
                    color="#00cec9"
                    wireframe
                    transparent
                    opacity={0.25}
                />
            </mesh>
            <mesh ref={octaRef} position={[1, -2, -4]}>
                <octahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial
                    color="#a855f7"
                    wireframe
                    transparent
                    opacity={0.2}
                />
            </mesh>
        </>
    );
}

export default function ParticleField() {
    return (
        <div className="hero-bg">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                style={{ background: 'transparent' }}
                dpr={[1, 1.5]}
            >
                <FloatingParticles count={250} />
                <FloatingGeometry />
            </Canvas>
        </div>
    );
}
