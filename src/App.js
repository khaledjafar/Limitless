import * as THREE from 'three'
import { useState, useEffect, useRef, useReducer, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, MeshTransmissionMaterial, Environment, Lightformer } from '@react-three/drei'
import { CuboidCollider, BallCollider, Physics, RigidBody } from '@react-three/rapier'
import { EffectComposer, N8AO } from '@react-three/postprocessing'
import { easing } from 'maath'
import { Text3D } from '@react-three/drei'

import HeroSection from './HorizontalScroll'
import AnimatedPointer from './AnimatedPointer'
import Sidebar from './Sidebar'
import Footer from './Footer'
import InfiniteSlider from './InfiniteSlider'
import CustomCursor from './CursorTrail'
import Ballpit from './Ballpit'

const accents = ['#D4BEE4', '#AD98E0', '#b98df7'];
const shuffle = (accent = 0) => [
  { color: '#444', roughness: 0.2, metalness: 0.5 },  
  { color: '#444', roughness: 0.2, metalness: 0.5 }, 
  { color: '#444', roughness: 0.2, metalness: 0.5 },
  { color: 'white', roughness: 0.05, metalness: 0.6 },  
  { color: 'white', roughness: 0.05, metalness: 0.6 },
  { color: 'white', roughness: 0.05, metalness: 0.6 },
  { color: accents[accent], roughness: 0.05, metalness: 0.6, accent: true }, 
  { color: accents[accent], roughness: 0.05, metalness: 0.6, accent: true },
  { color: accents[accent], roughness: 0.05, metalness: 0.6, accent: true },
  { color: accents[accent], roughness: 0.05, metalness: 0.6, accent: true },
  { color: accents[accent], roughness: 0.05, metalness: 0.6, accent: true },
  { color: accents[accent], roughness: 0.05, metalness: 0.6, accent: true },
  { color: accents[accent], roughness: 0.05, metalness: 0.6, accent: true },
  { color: accents[accent], roughness: 0.05, metalness: 0.6, accent: true },
  { color: accents[accent], roughness: 0.05, metalness: 0.6, accent: true }
];

export const App = () => (
  <>
<div className="container" >
    <Scene className="Scene-canv"/>
    
      <div className="logo-container">
        <a href='#Home' id='Home'>LIMITLESS</a>
      </div>
      
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className='h1-header-popup'>
          <h1>
              NO <span>LIMITS</span>  TO YOUR <span> IDEAS</span>
          </h1>
      </div>

      {/* <div className='header-content'>
        <nav>
          <ul>
            <li><a href='#Projects'>PROJEC</a></li>
            <li><a href='#Footer'>ABOUT</a></li>
            <li><a href='#Footer'>CONTACTS</a></li>
          </ul>
        </nav>
      </div>  */}




   

      <div className='animatedPointer'>
        <AnimatedPointer />
      </div>

      {/* <div className='header-end-content1'>
        <div className='header-end-content'>
            <p>
              Check out some of my latest projects
            </p>
            <a href='#Projects' className='a-arrow'><i className="bx bx-down-arrow-alt"></i></a>
        </div>
      </div> */}
  </div>
  

          
        <div id='Projects'>
          <HeroSection />
        </div>
        

         
        <div className='Footer' id='Footer'>
          <InfiniteSlider />

          <div className='header-info-conatiner'>
        
            {/* <div className='avatar-container'>
              <img src="./images/Avatar.png" alt="Avatar" className="avatar-image" />
            </div> */}

       
      {/* <div className='header-content-info'>
                  <a href='https://github.com/khaledjafar' target="_blank" rel="noopener noreferrer"><img src="./images/icons8-github-100.png" alt="Avatar"  /></a>
                  <a href='https://www.linkedin.com/in/khaled-jafar-abu-ijdea-a-547483274/' target="_blank" rel="noopener noreferrer"><img src="./images/icons8-linkedin-100.png" alt="Avatar" className="icons" /></a>
                  <a href='https://www.instagram.com/khaled__jafar/' target="_blank" rel="noopener noreferrer"><img src="./images/icons8-instagram-100.png" alt="Avatar" className="icons" /></a>
                </div> */}

          </div>
          <div className='Footer'>
            <Footer />
          </div>
          
        </div>

       {/*  <div className='Footer'>
           <Ballpit /> 
          
         </div>*/}
      </>
)

function Scene(props) {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0)
  const connectors = useMemo(() => shuffle(accent), [accent])
  return (
    <>
    <Canvas onClick={click} shadows dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }} {...props}>
      <ambientLight intensity={0.4} />
      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow /> */}
      <Physics /*debug*/ gravity={[0, 0, 0]}>
      <ResponsiveText />
        <Pointer />
        {connectors.map((props, i) => <Connector key={i} {...props} />)}
      </Physics>
      {/* <EffectComposer disableNormalPass multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer> */}
      <Environment resolution={3256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
        {/*   <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} /> */}
        </group>
      </Environment>
    </Canvas>

    {/* <CustomCursor/> */}
    
    </>
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

// function Model({ children, color = 'white', roughness = 0, ...props }) {
//   const ref = useRef()
//   const { nodes, materials } = useGLTF('./model/c-transformed.glb')
//   useFrame((state, delta) => {
//     easing.dampC(ref.current.material.color, color, 0.2, delta)
//   })
//   return (
//     <mesh ref={ref} castShadow receiveShadow scale={10} geometry={nodes.connector.geometry}>
//       <meshStandardMaterial metalness={0.2} roughness={roughness} map={materials.base.map} />
//       {children}
//     </mesh>
    
//   )
// }
function Model({ color = 'white', roughness = 0, scale = 0.5, ...props }) {
  const ref = useRef();

  // Animate color change (optional)
  useFrame((state, delta) => {
    // Example of animating the material color
    ref.current.material.color.lerp(new THREE.Color(color), delta * 0.2);
  });

  // Calculate the bounding box of the geometry to adjust positions without gaps
  const geometry = useMemo(() => new THREE.TorusGeometry(1, 0.4, 16, 100), []);
  const boundingBox = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));

  // Get the size of the bounding box and adjust the position accordingly
  const size = new THREE.Vector3();
  boundingBox.getSize(size);
  
  // Adjust the position based on the scale to avoid gaps
  const adjustedPosition = new THREE.Vector3(0, 0, 0).sub(size.multiplyScalar(0.7)).multiplyScalar(scale);

  return (
    <Physics position={[0,0,0]}>
    <mesh ref={ref} castShadow receiveShadow scale={scale} position={adjustedPosition} {...props}>
      <torusGeometry args={[1, 0.4, 16, 100]} /> {/* Torus geometry */}
      <meshStandardMaterial color={color} roughness={roughness} metalness={0.2} />
    </mesh>
    </Physics>
  );
}
// Text Code
function ResponsiveText({ text = "Limitless" }) {
  const ref = useRef()
  const [fontSize, setFontSize] = useState(getResponsiveFontSize())

  function getResponsiveFontSize() {
      const width = window.innerWidth 
      if (width <= 380) return 0.3 ;
      if (width <= 570) return 0.4 ;
      
      return 0.6    ;          
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
      if (width <= 380) return [-0.78, 0, -1] ; 
      if (width <= 570) return [-1.05, 0, -1] ; 
     
      return [-1.58, 0, -1]  ;                 
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
        <meshStandardMaterial color={"#ffffff"} metalness={1.2} roughness={0.3} emissive="#ffffff" emissiveIntensity={0.1}/>
      </Text3D>
    </RigidBody>
  )
}
