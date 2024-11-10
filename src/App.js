import * as THREE from 'three'
import { useState, useEffect, useRef, useReducer, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, MeshTransmissionMaterial, Environment, Lightformer } from '@react-three/drei'
import { CuboidCollider, BallCollider, Physics, RigidBody } from '@react-three/rapier'
import { EffectComposer, N8AO } from '@react-three/postprocessing'
import { easing } from 'maath'
import { Text3D } from '@react-three/drei'

import HeroSection from './HorizontalScroll'

import CursorTrail from './CursorTrail'



const accents = ['#D4BEE4', '#AD98E0', '#6455A5'];
const shuffle = (accent = 0) => [
  { color: '#444', roughness: 0.2, metalness: 0.5 },  
  { color: '#444', roughness: 0.2, metalness: 0.5 }, 
  { color: '#444', roughness: 0.2, metalness: 0.5 },
  { color: 'white', roughness: 0.05, metalness: 0.6 },  
  { color: 'white', roughness: 0.05, metalness: 0.6 },
  { color: 'white', roughness: 0.05, metalness: 0.6 },
  { color: accents[accent], roughness: 0.05, metalness: 0.6, accent: true }, 
  { color: accents[accent], roughness: 0.05, metalness: 0.6, accent: true },
  { color: accents[accent], roughness: 0.05, metalness: 0.6, accent: true }
];


export const App = () => (
  <>
<div className="container" >
    <Scene className="Scene-canv" style={{ width: '75%', height: '90vh'}} />
      <CursorTrail />
    <div className="logo-container">
      <a href='#'>LIMITLESS</a>
    </div>
       <div className='header-content'>
        <nav>
          <ul>
            <li><a href='#'>PROJEC</a></li>
            <li><a href='#'>ABOUT</a></li>
            <li><a href='#'>CONTACTS</a></li>
          </ul>
        </nav>
      </div> 


      <div className='header-info-conatiner'>
        <div className='avatar-container'>
          <img src="./images/Avatar.png" alt="Avatar" className="avatar-image" />
        </div>

        <div className='header-content-info'>
          <a href='#'><img src="./images/icons8-github-100.png" alt="Avatar" className="icons1" /></a>
          <a href='#'><img src="./images/icons8-linkedin-100.png" alt="Avatar" className="icons" /></a>
          <a href='#'><img src="./images/icons8-instagram-100.png" alt="Avatar" className="icons" /></a>
        </div>
       
 
        <div className='aboutme-div'>
          <p className='aboutme-text1'>
          Expand your ideas effortlessly. My designs prioritize user
           engagement and interaction, bringing your vision to life.
          </p>
        </div>
      </div>
<div className='h1-header-popup'>
  <h1>
  <span> NO </span>LIMITS <br /><span> TO YOUR </span><br/> IDEAS
  </h1>
</div>

      <div className='header-end-content1'>
        <div className='header-end-content'>
            <p>
              Check out some of my latest projects
            </p>
            <a href='#' className='a-arrow'><i className="bx bx-down-arrow-alt"></i></a>
        </div>
      </div>
  </div>

         <div>
         <HeroSection />
         </div>

         <div className='Footer'>

         </div>
      </>
)

function Scene(props) {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0)
  const connectors = useMemo(() => shuffle(accent), [accent])
  return (
    <Canvas onClick={click} shadows dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }} {...props}>
      <ambientLight intensity={0.4} />
      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow /> */}
      <Physics /*debug*/ gravity={[0, 0, 0]}>
      <ResponsiveText />
        <Pointer />
        {connectors.map((props, i) => <Connector key={i} {...props} />) /* prettier-ignore */}
      </Physics>
      {/* <EffectComposer disableNormalPass multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer> */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
        {/*   <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} /> */}
        </group>
      </Environment>
    </Canvas>
  )
}

function Connector({ position, children, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, ...props }) {
  const api = useRef()
  const pos = useMemo(() => position || [r(10), r(10), r(10)], [])
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2))
  })
  return (
    <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={false}>
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />
      {children ? children : <Model {...props} />}
      {accent && <pointLight intensity={4} distance={2.5} color={props.color} />}
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0))
  })
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1]} />
    </RigidBody>
  )
}

function Model({ children, color = 'white', roughness = 0, ...props }) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/c-transformed.glb')
  useFrame((state, delta) => {
    easing.dampC(ref.current.material.color, color, 0.2, delta)
  })
  return (
    <mesh ref={ref} castShadow receiveShadow scale={5} geometry={nodes.connector.geometry}>
      <meshStandardMaterial metalness={0.2} roughness={roughness} map={materials.base.map} />
      {children}
    </mesh>
  )
}



// Text Code
function ResponsiveText({ text = "Limitless" }) {
  const ref = useRef()
  const [fontSize, setFontSize] = useState(getResponsiveFontSize())

  function getResponsiveFontSize() {
      const width = window.innerWidth 
      if (width < 413) return 0.6 
      return 0.6              
    }

    useEffect(() => {
      function handleResize() {
        setFontSize(getResponsiveFontSize())
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])


  const [position, setPosition] = useState(getResponsivePosition())

  function getResponsivePosition() {
      const width = window.innerWidth
      if (width < 413) return [-1.4, 0, -1]  
      return [-1.55, 0, -1]                   
    }

    useEffect(() => {
      function handleResize() {
        setPosition(getResponsivePosition())
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])



  return (
    <RigidBody position={position} type="kinematicPosition" colliders={false} ref={ref}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={fontSize} 
        height={ 1} 
        curveSegments={32}
        bevelEnabled
        bevelThickness={ 0.05}
        bevelSize={0.025}
        
      >
        {text}
        <meshStandardMaterial color={"#ffffff"} metalness={0.8} roughness={0.3} emissive="#ffffff" emissiveIntensity={0.1}/>
      </Text3D>
    </RigidBody>
  )
}