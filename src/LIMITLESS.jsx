/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 LIMITLESS.gltf 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

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