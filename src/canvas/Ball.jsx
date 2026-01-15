import React, {Suspense, memo, useRef, useEffect, useState} from 'react'
import { Canvas, useFrame} from '@react-three/fiber'
import {
    Decal, Float, OrbitControls, useTexture
} from '@react-three/drei'

import CanvasLoader from '../components/Loader';
import ballColor from '../utils/BallColor';

const Ball = memo((props) => {
    const [decal] = useTexture([props.imgUrl])
    const meshRef = useRef()
    const [ballHex, setBallHex] = useState('#1B1816')

    useEffect(() => {
        // Pick a random color once on mount
        const randomIndex = Math.floor(Math.random() * ballColor.length);
        setBallHex(ballColor[randomIndex]);
    }, [])

    // Animate the scale up and down and rotate automatically
    useFrame((state) => {
        if (meshRef.current) {
            // Create a pulsing effect using sine wave
            const scale = 2.75 + Math.sin(state.clock.elapsedTime * 1.5) * 0.30;
            meshRef.current.scale.setScalar(scale);
            
            // Rotate the ball automatically on multiple axes
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.015;
        }
    })

    return (
        <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>

            <ambientLight intensity={0.25} />
            <directionalLight position={[0, 0, 0.05]} />
            <mesh ref={meshRef} castShadow receiveShadow scale={2.75}>
                <icosahedronGeometry args={[1,1]} />
                <meshStandardMaterial 
                    color={"#14161A"}
                    polygonOffset
                    polygonOffsetFactor={-5}    
                    flatShading
                />
                <Decal 
                    position={[0, 0, 1]}
                    map={decal}
                    rotation={[2 * Math.PI, 0, 6.25]}
                    flatShading
                />

            </mesh>

        </Float>
        
    )


})


const BallCanvas = memo(({icon}) => {

    return (
        <Canvas
            frameloop='always'
            gl={{ preserveDrawingBuffer: true }}
            performance={{ min: 0.5 }}
            dpr={[1, 2]}
        >
            <Suspense fallback={<CanvasLoader />}> 
                <OrbitControls 
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                />
                <Ball imgUrl={icon} />
            </Suspense>

                
        </Canvas>
    ) 
}, (prevProps, nextProps) => {
    // Only re-render if icon prop actually changes
    return prevProps.icon === nextProps.icon;
})

export default BallCanvas;