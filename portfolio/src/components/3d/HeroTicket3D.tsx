"use client";

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer, Text } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { useTheme } from 'next-themes';
import { Suspense, ErrorInfo, Component, ReactNode } from 'react';

// Error Boundary definition to prevent total white screen crashes
class CanvasErrorBoundary extends Component<{ children: ReactNode, fallback: ReactNode }, { hasError: boolean }> {
    state = { hasError: false };
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch(error: Error, info: ErrorInfo) { console.error("3D Canvas Error:", error, info); }
    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}


// Preload assets to prevent popping
useGLTF.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb');
useTexture.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg');

export default function HeroTicket3D() {
    const { theme } = useTheme();
    const isDark = theme !== 'light';

    // Ensure Meshline is extended only on the client
    useEffect(() => {
        extend({ MeshLineGeometry, MeshLineMaterial });
    }, []);

    return (
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative cursor-pointer touch-none rounded-2xl overflow-hidden bg-zinc-950/20">
            <CanvasErrorBoundary fallback={
                <div className="flex flex-col items-center justify-center w-full h-full text-zinc-500 border border-zinc-800 rounded-2xl bg-zinc-950/50">
                    <svg className="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
                    <p className="text-sm">Experiencia 3D no compatible o cargando...</p>
                </div>
            }>
                <Suspense fallback={null}>
                    {/* Make background transparent so it blends with dark mode instead of being white */}
                    <Canvas camera={{ position: [0, 0, 10.5], fov: 25 }} gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }} style={{ background: 'transparent' }}>
                        <ambientLight intensity={Math.PI} />
                        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
                            <Band />
                        </Physics>
                        <Environment blur={0.75}>
                            {/* Custom Lighting matching portfolio theme */}
                            <Lightformer intensity={isDark ? 1.5 : 2} color={isDark ? "#10b981" : "white"} position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                            <Lightformer intensity={isDark ? 2 : 3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                            <Lightformer intensity={isDark ? 2 : 3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                            <Lightformer intensity={isDark ? 5 : 10} color={isDark ? "#34d399" : "white"} position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
                        </Environment>
                    </Canvas>
                </Suspense>
            </CanvasErrorBoundary>
        </div>
    );
}

function Band({ maxSpeed = 50, minSpeed = 10 }) {
    const band = useRef<any>(null);
    const fixed = useRef<any>(null);
    const j1 = useRef<any>(null);
    const j2 = useRef<any>(null);
    const j3 = useRef<any>(null);
    const card = useRef<any>(null);

    const vec = new THREE.Vector3();
    const ang = new THREE.Vector3();
    const rot = new THREE.Vector3();
    const dir = new THREE.Vector3();

    const segmentProps = { type: 'dynamic' as const, canSleep: true, colliders: false as any, angularDamping: 2, linearDamping: 2 };
    const { nodes, materials } = useGLTF('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb') as any;
    // @ts-ignore
    const texture = useTexture('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg');

    const { width, height } = useThree((state) => state.size);
    const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));

    const [dragged, drag] = useState<THREE.Vector3 | false>(false);
    const [hovered, hover] = useState(false);

    // @ts-ignore
    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    // @ts-ignore
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    // @ts-ignore
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    // @ts-ignore
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab';
            return () => { document.body.style.cursor = 'auto'; };
        }
    }, [hovered, dragged]);

    useFrame((state, delta) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));

            [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
        }

        if (fixed.current) {
            // Fix jitter when over-pulling the card
            [j1, j2].forEach((ref) => {
                if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
                const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
                ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
            });

            // Calculate catmull curve points
            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.lerped);
            curve.points[2].copy(j1.current.lerped);
            curve.points[3].copy(fixed.current.translation());
            band.current.geometry.setPoints(curve.getPoints(32));

            // Tilt it back towards the screen
            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
        }
    });

    (curve as any).curveType = 'chordal';
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    return (
        <>
            <group position={[0, 4, 0]}>
                <RigidBody ref={fixed} {...segmentProps} type="fixed" />
                <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
                    <CuboidCollider args={[0.8, 1.125, 0.01]} />
                    <group
                        scale={2.25}
                        position={[0, -1.2, -0.05]}
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={(e) => {
                            (e.target as any).releasePointerCapture(e.pointerId);
                            drag(false);
                        }}
                        onPointerDown={(e) => {
                            (e.target as any).setPointerCapture(e.pointerId);
                            drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
                        }}>
                        <mesh geometry={nodes.card.geometry}>
                            <meshPhysicalMaterial
                                color="#020617"
                                clearcoat={1}
                                clearcoatRoughness={0.15}
                                roughness={0.4}
                                metalness={0.5}
                            />
                        </mesh>
                        <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
                        <mesh geometry={nodes.clamp.geometry} material={materials.metal} />

                        {/* Custom 3D Text Overlay - Tech Blue Layout */}
                        <group position={[0, -0.05, 0.02]}>
                            {/* Top Badge shape using a plane */}
                            <mesh position={[-0.12, 0.35, -0.001]}>
                                <planeGeometry args={[0.38, 0.08]} />
                                <meshBasicMaterial color="#38bdf8" />
                            </mesh>
                            <Text
                                position={[-0.3, 0.35, 0]}
                                fontSize={0.035}
                                color="#0f172a"
                                anchorX="left"
                                anchorY="middle"
                            >
                                🎁 SORTEO MENSUAL
                            </Text>

                            <Text
                                position={[-0.3, 0.15, 0]}
                                fontSize={0.09}
                                color="white"
                                anchorX="left"
                                anchorY="middle"
                                maxWidth={0.65}
                                textAlign="left"
                                lineHeight={1.1}
                                letterSpacing={-0.02}
                            >
                                ¿Confías en la{"\n"}presencia de{"\n"}tu negocio?
                            </Text>

                            <mesh position={[0, -0.08, 0]}>
                                <planeGeometry args={[0.6, 0.002]} />
                                <meshBasicMaterial color="white" transparent opacity={0.3} />
                            </mesh>

                            <Text
                                position={[-0.3, -0.18, 0]}
                                fontSize={0.045}
                                color="#94a3b8"
                                anchorX="left"
                                anchorY="middle"
                                maxWidth={0.6}
                                textAlign="left"
                            >
                                Postula ahora y gana{"\n"}1 mes de desarrollo.
                            </Text>
                        </group>
                    </group>
                </RigidBody>
            </group>
            <mesh ref={band}>
                {/* @ts-ignore */}
                <meshLineGeometry />
                {/* @ts-ignore */}
                <meshLineMaterial color="white" depthTest={false} resolution={[width, height]} useMap map={texture} repeat={[-3, 1]} lineWidth={1} />
            </mesh>
        </>
    );
}
