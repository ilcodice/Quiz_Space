"use client"

import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Float, Environment } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"
import { Play, Plus, Gamepad2 } from "lucide-react"

// 3D Quiz Elements Component
function QuizElements() {
  const groupRef = useRef<any>()
  const cubeRef = useRef<Mesh>(null)
  const sphereRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.elapsedTime * 0.5
      cubeRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      {/* Floating Question Mark */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Text
          position={[0, 2, 0]}
          fontSize={2}
          color="#60a5fa"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.ttf"
        >
          ?
        </Text>
      </Float>

      {/* Animated Cube */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={cubeRef} position={[-3, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
      </Float>

      {/* Animated Sphere */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh ref={sphereRef} position={[3, 0, 0]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      </Float>

      {/* Quiz Options */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <Text
          position={[-2, -1.5, 1]}
          fontSize={0.3}
          color="#9ca3af"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.ttf"
        >
          A) Option 1
        </Text>
      </Float>

      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1}>
        <Text
          position={[2, -1.5, 1]}
          fontSize={0.3}
          color="#9ca3af"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.ttf"
        >
          B) Option 2
        </Text>
      </Float>

      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.9}>
        <Text
          position={[-1, -2.5, 1]}
          fontSize={0.3}
          color="#9ca3af"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.ttf"
        >
          C) Option 3
        </Text>
      </Float>

      <Float speed={1.3} rotationIntensity={0.6} floatIntensity={1.2}>
        <Text
          position={[1, -2.5, 1]}
          fontSize={0.3}
          color="#9ca3af"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.ttf"
        >
          D) Option 4
        </Text>
      </Float>

      {/* Central Quiz Title */}
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.5}>
        <Text
          position={[0, 0.5, 2]}
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.ttf"
        >
          QUIZ GAME
        </Text>
      </Float>
    </group>
  )
}

export default function HomePage() {
  return (
    <div className="bg-black/40">
      {/* Hero Section with 3D Animation */}
      <div className="relative h-screen flex items-center justify-center">
        {/* 3D Canvas */}
        <div className="absolute inset-0 w-full h-full">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <Environment preset="night" />
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <QuizElements />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Description */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Gamepad2 className="h-8 w-8 text-blue-400" />
                <h1 className="text-4xl lg:text-6xl font-bold text-white">Quiz Space</h1>
              </div>

              <p className="text-xl text-gray-300 leading-relaxed">
                Challenge your knowledge with our interactive quiz platform. Create custom quizzes, compete with
                friends, and test your skills across various topics.
              </p>

              <p className="text-lg text-gray-400">
                From easy trivia to expert-level challenges, discover the perfect quiz for your skill level and
                interests.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                  <Play className="mr-2 h-5 w-5" />
                  See All Games
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create Game
                </Button>
              </div>
            </div>

            {/* Right Side - Stats Cards */}
            {/* <div className="space-y-4">
              <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-400 mb-2">1000+</div>
                  <div className="text-gray-300">Active Players</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
                  <div className="text-gray-300">Quiz Games</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
                  <div className="text-gray-300">Categories</div>
                </CardContent>
              </Card>
            </div> */}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Quiz Space?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900/70 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Easy to Play</h3>
                <p className="text-gray-400">
                  Simple interface makes it easy for anyone to jump in and start playing immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/70 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Create Custom Quizzes</h3>
                <p className="text-gray-400">
                  Build your own quizzes with custom questions, difficulty levels, and topics.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/70 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gamepad2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Compete & Learn</h3>
                <p className="text-gray-400">
                  Challenge friends, track your progress, and learn something new every day.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}