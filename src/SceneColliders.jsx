
import React from 'react'
import { Sphere, useGLTF } from '@react-three/drei'

const LIMITLESS = (props) => {
  const { nodes, materials } = useGLTF('../public/models/LIMITLESS.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Torus.geometry} material={nodes.Torus.material} position={[-0.189, 0.006, 1]} scale={0.5} />
      <mesh geometry={nodes.Torus001.geometry} material={nodes.Torus001.material} position={[0.806, -0.076, 1]} scale={0.5} />
    </group>
  )
}
export default LIMITLESS;
useGLTF.preload('../public/models/LIMITLESS.gltf')





// const VERTICAL_OFFSET =1;
// const random = mulberry32(12345)

// export function SceneColliders() {
//     const sphereCount = 15;
//     const variants = ['rock', 'black', 'green']

//     return(
//         <>
//         <Physics gravity={[0,0,0]}>
//             {[...Array(sphereCount).map((_, i) =>(
//                 <Sphere key={i} index={i} verticalOffset={VERTICAL_OFFSET} />
//             ))]}
//         </Physics>
   
//         </>
//     )
// }

// function Sphere ({vec = new THREE.Vector3(), verticalOffset}){

//     const api = useRef()

//     const pos = useMemo(() => [
//         (random() - 0.5) *10,
//         (random() - 0.5) *10 + verticalOffset,
//         (random() - 0.5) *10
//     ], [verticalOffset])
  
  
//     useFrame((state, delta) => {
//       delta = Math.min(0.1, delta)
//       api.current?.applyImpulse(vec.copy(api.current.translation()).set(new THREE.Vector3(0, verticalOffset, 0)).negate().multiplyScalar(0.2))
//     })

//     return(
//         <RigidBody linearDamping={4} angularDamping={1} friction ={0.1} position={pos} ref={api} colliders={false}>
//             <mesh>
//             <sphereGeometry args={[1,32,32]} />
//             <meshStandardMaterial color="royalblue" />
//             </mesh>
//         </RigidBody>

//     )
// }


// function Pointer({ vec = new THREE.Vector3() }) {
//   const ref = useRef()
//   useFrame(({ mouse, viewport }) => {
//     ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0))
//   })
//   return (
//     <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
//       <BallCollider args={[0.5]} />
//     </RigidBody>
//   )
// }