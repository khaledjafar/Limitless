import { useEffect, useLayoutEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, usePlane, useSphere } from "@react-three/cannon";



const Ballpit = () => {
  function InstancedSpheres({ count = 200 }) {
    const { viewport } = useThree();
    const fixedColor = "#AD98E0"; 

    // Ensure we don't try to access undefined elements in data
    const [ref, api] = useSphere((index) => {
      const scale = 0.25 + Math.random(); // Random scale
      return {
        mass: scale * 100,
        position: [Math.random() * 10 - 5, Math.random() * 10 + 5, Math.random() * 10 - 5], // Random position within view
        args: [scale],
      };
    });

    // Generate a color array with the same color for all spheres
    const colorArray = useMemo(
      () =>
        new Array(count).fill().flatMap(() => {
          return [1, 0.388, 0.278]; // RGB for #ff6347 (Tomato color)
        }),
      [count]
    );

    useLayoutEffect(() => {
      for (let i = 0; i < count; i++) {
        const { scale } = { scale: 1 }; // Fallback to default scale
        api.at(i).scaleOverride([scale, scale, scale]);
      }
    }, [api, count]);

    return (
      <instancedMesh ref={ref} args={[null, null, count]}>
        <ambientLight position={[0, 0, 2]}  intensity={0.3} />
        <directionalLight position={[0, 3, 20]} intensity={1} />
        <sphereGeometry args={[0.5, 64, 64]} />
        <instancedBufferAttribute  args={[new Float32Array(colorArray.flat()), 4]} />
        <meshStandardMaterial     
          color={fixedColor} 
          toneMapped={false} 
          metalness={0.5} 
          roughness={0.5} />
      </instancedMesh>
    );
  }

  function Borders() {
    const { viewport } = useThree();
    return (
      <>
        <Plane position={[0, -viewport.height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        <Plane position={[-viewport.width / 2 - 1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <Plane position={[viewport.width / 2 + 1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
        <Plane position={[0, 0, -2]} rotation={[0, 0, 0]} />
        <Plane position={[0, 0, 2]} rotation={[0, -Math.PI, 0]} />
      </>
    );
  }

  function Plane({ color, position = [0, 0, 0], ...props }) {
    const [, api] = usePlane(() => ({ ...props }));
    useEffect(() => api.position.set(...position), [api, position]);
  }

  function Mouse() {
    const { viewport } = useThree();
    const [, api] = useSphere(() => ({ type: "Kinematic", args: [3,1,1] }));
  
    // Update the position of the sphere based on mouse movement
    useFrame((state) => {
      // Center the mouse position at [0, 0, 0] by directly mapping to the scene's origin
      api.position.set(state.mouse.x * viewport.width / 2, state.mouse.y * viewport.height / 2, 0);
    });
  }

  return (
    <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
      <Physics gravity={[0, -150, 0]}>
        <group position={[0, 0, -10]}>
          <Mouse />
          <Borders />
          <InstancedSpheres />
        </group>
      </Physics>
    </Canvas>
  );
};

export default Ballpit;
