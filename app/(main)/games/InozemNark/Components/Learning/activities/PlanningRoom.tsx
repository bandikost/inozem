
"use client"

import { useCallback, useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { PointerLockControls, Text } from "@react-three/drei"
import * as THREE from "three"

type Props = {
    placed: (string | null)[]
    heldId: string | null
    onInteract: (playerPosition: THREE.Vector3) => void
    onFinishAttempt: () => void | Promise<void>
}

type Step = {
    id: string
    title: string
    shortTitle: string
    color: string
}

const steps: Step[] = [
    {
        id: "responsible",
        title: "Назначение ответственных лиц",
        shortTitle: "Ответственные",
        color: "#8b75b5",
    },
    {
        id: "groups",
        title: "Создание рабочих групп",
        shortTitle: "Рабочие группы",
        color: "#5b9caa",
    },
    {
        id: "assortment",
        title: "Согласование ассортимента",
        shortTitle: "Ассортимент",
        color: "#c58b55",
    },
    {
        id: "budget",
        title: "Планирование финансовых средств",
        shortTitle: "Бюджет",
        color: "#719b71",
    },
    {
        id: "purchase",
        title: "Проведение закупки",
        shortTitle: "Закупка",
        color: "#b66f83",
    },
]

const positions = [-4, -2, 0, 2, 4]
const tableZ = 2.5
const shelfZ = -4.5

function MedicineBottle({
    color,
    title,
    position,
}: {
    color: string
    title: string
    position: [number, number, number]
}) {
    return (
        <group position={position}>
           
            <mesh castShadow>
                <cylinderGeometry args={[0.28, 0.32, 0.75, 24]} />
                <meshStandardMaterial color={color} roughness={0.35} />
            </mesh>

            
            <mesh position={[0, 0.42, 0]}>
                <cylinderGeometry args={[0.15, 0.18, 0.12, 20]} />
                <meshStandardMaterial color="#e8e2d7" />
            </mesh>

            {/* Крышка */}
            <mesh position={[0, 0.53, 0]}>
                <cylinderGeometry args={[0.19, 0.19, 0.15, 20]} />
                <meshStandardMaterial color="#ded6c8" />
            </mesh>

            {/* Этикетка */}
            <mesh position={[0, 0, 0.29]}>
                <planeGeometry args={[0.48, 0.3]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            <Text
                position={[0, 0, 0.305]}
                fontSize={0.075}
                color="#30283c"
                maxWidth={0.43}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
            >
                {title}
            </Text>
        </group>
    )
}

function HeldBottle({ step }: { step: Step }) {
    const ref = useRef<THREE.Group>(null)
    const { camera } = useThree()

    useFrame(() => {
        if (!ref.current) return

        const direction = new THREE.Vector3()
        camera.getWorldDirection(direction)

        ref.current.position
            .copy(camera.position)
            .add(direction.multiplyScalar(0.8))
            .add(new THREE.Vector3(0.35, -0.25, 0))

        ref.current.quaternion.copy(camera.quaternion)
    })

    return (
        <group ref={ref}>
            <MedicineBottle
                color={step.color}
                title={step.shortTitle}
                position={[0, 0, 0]}
            />
        </group>
    )
}


function PlanningScene({ placed, heldId, onInteract, onFinishAttempt }: Props) {
    const { camera, gl } = useThree()

    const keys = useRef<Record<string, boolean>>({})
    const interactRef = useRef(onInteract)

    // Всегда используем актуальную функцию взаимодействия
    interactRef.current = onInteract

    useEffect(() => {
        camera.position.set(0, 1.65, 7)
        camera.rotation.set(0, 0, 0)
        camera.rotation.order = "YXZ"

        const canvas = gl.domElement

        // Захват мыши по клику на игровое поле
        const requestLock = () => {
            if (document.pointerLockElement !== canvas) {
                canvas.requestPointerLock()
            }
        }

        // Клавиатура
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "KeyW" ||
                event.code === "KeyA" ||
                event.code === "KeyS" ||
                event.code === "KeyD" ||
                event.code.startsWith("Arrow")) {
                event.preventDefault()
                keys.current[event.code] = true
            }

            if (event.code === "KeyE" && !event.repeat) {
                event.preventDefault()
                interactRef.current(camera.position.clone())
            }
        }

        const handleKeyUp = (event: KeyboardEvent) => {
            keys.current[event.code] = false
        }

        // Поворот камеры мышью
        const handleMouseMove = (event: MouseEvent) => {
            if (document.pointerLockElement !== canvas) return

            const sensitivity = 0.002

            camera.rotation.y -= event.movementX * sensitivity
            camera.rotation.x -= event.movementY * sensitivity

            camera.rotation.x = THREE.MathUtils.clamp(
                camera.rotation.x,
                -Math.PI / 2.2,
                Math.PI / 2.2
            )
        }

        const handleBlur = () => {
            keys.current = {}
        }

        canvas.addEventListener("click", requestLock)
        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("blur", handleBlur)

        return () => {
            canvas.removeEventListener("click", requestLock)
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("blur", handleBlur)
        }
    }, [camera, gl])

    // Ходьба
    useFrame((_, delta) => {
        const direction = new THREE.Vector3()
        camera.getWorldDirection(direction)
        direction.y = 0
        direction.normalize()

        const right = new THREE.Vector3()
            .crossVectors(direction, camera.up)
            .normalize()

        const movement = new THREE.Vector3()

        if (keys.current["KeyW"] || keys.current["ArrowUp"]) {
            movement.add(direction)
        }

        if (keys.current["KeyS"] || keys.current["ArrowDown"]) {
            movement.sub(direction)
        }

        if (keys.current["KeyD"] || keys.current["ArrowRight"]) {
            movement.add(right)
        }

        if (keys.current["KeyA"] || keys.current["ArrowLeft"]) {
            movement.sub(right)
        }

        if (movement.lengthSq() > 0) {
            movement.normalize()

            camera.position.addScaledVector(
                movement,
                Math.min(delta, 0.05) * 4
            )
        }

        // Границы комнаты
        camera.position.x = THREE.MathUtils.clamp(
            camera.position.x,
            -7,
            7
        )

        camera.position.z = THREE.MathUtils.clamp(
            camera.position.z,
            -7,
            8
        )

        camera.position.y = 1.65
    })

    return (
        <>
            <ambientLight intensity={1.4} />

            <directionalLight
                position={[4, 9, 5]}
                intensity={2}
                castShadow
            />

            {/* Пол */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.15, 0]}
                receiveShadow
            >
                <planeGeometry args={[16, 18]} />
                <meshStandardMaterial color="#e9e5ef" />
            </mesh>

            {/* Стены */}
            <mesh position={[0, 2.5, -8]}>
                <boxGeometry args={[16, 5, 0.2]} />
                <meshStandardMaterial color="#d8d0e5" />
            </mesh>

            <mesh position={[-8, 2.5, 0]}>
                <boxGeometry args={[0.2, 5, 16]} />
                <meshStandardMaterial color="#c9bfd9" />
            </mesh>

            <mesh position={[8, 2.5, 0]}>
                <boxGeometry args={[0.2, 5, 16]} />
                <meshStandardMaterial color="#c9bfd9" />
            </mesh>

            {/* Стол */}
            <group position={[0, 0, tableZ]}>
                <mesh position={[0, 0.85, 0]} castShadow>
                    <boxGeometry args={[12, 0.2, 1.5]} />
                    <meshStandardMaterial color="#8d789f" />
                </mesh>

                {[-5, -3, -1, 1, 3, 5].map((x) => (
                    <mesh key={x} position={[x, 0.4, 0]}>
                        <boxGeometry args={[0.15, 0.8, 0.15]} />
                        <meshStandardMaterial color="#6f5c83" />
                    </mesh>
                ))}
            </group>

            {/* Баночки на столе */}
            {steps.map((step, index) => {
                if (placed.includes(step.id) || heldId === step.id) {
                    return null
                }

                return (
                    <MedicineBottle
                        key={step.id}
                        color={step.color}
                        title={step.shortTitle}
                        position={[positions[index], 1.45, tableZ]}
                    />
                )
            })}

            {/* Стеллаж */}
            <group position={[0, 0, shelfZ]}>
                <mesh position={[0, 1.7, 0]}>
                    <boxGeometry args={[12, 3.4, 0.35]} />
                    <meshStandardMaterial color="#927da8" />
                </mesh>

                {[0.1, 1.35, 2.6].map((y) => (
                    <mesh key={y} position={[0, y, 0.35]}>
                        <boxGeometry args={[12.2, 0.15, 0.8]} />
                        <meshStandardMaterial color="#69547f" />
                    </mesh>
                ))}
            </group>

            {/* Места для баночек */}
            {positions.map((x, index) => {
                const stepId = placed[index]
                const step = steps.find((item) => item.id === stepId)
                const correct = stepId === steps[index].id

                return (
                    <group key={index}>
                        <mesh position={[x, 1.95, shelfZ + 0.55]}>
                            <boxGeometry args={[1.65, 1.05, 0.08]} />
                            <meshStandardMaterial
                                color={
                                    stepId
                                        ? correct
                                            ? "#8bd6a5"
                                            : "#efa0a0"
                                        : "#c5b8d4"
                                }
                            />
                        </mesh>

                        <Text
                            position={[x, 2.7, shelfZ + 0.6]}
                            fontSize={0.19}
                            color="#ffffff"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {`МЕСТО ${index + 1}`}
                        </Text>

                        {step && (
                            <MedicineBottle
                                color={step.color}
                                title={step.shortTitle}
                                position={[x, 1.65, shelfZ + 0.8]}
                            />
                        )}
                    </group>
                )
            })}

            {/* Баночка в руках */}
            {heldId && (
                <HeldBottle
                    step={steps.find((item) => item.id === heldId)!}
                />
            )}
        </>
    )
}

export default function PlanningRoom(props: Props) {
    return <PlanningScene {...props} />
}
