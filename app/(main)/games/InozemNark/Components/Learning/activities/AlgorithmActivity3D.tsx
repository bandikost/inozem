
"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import {
    CheckCircle2,
    RotateCcw,
    Trophy,
    Play,
    Keyboard,
    Mouse,
    DoorOpen,
} from "lucide-react"
import * as THREE from "three"
import PlanningRoom from "./PlanningRoom"

const steps = [
    { id: "responsible", title: "Назначение ответственных лиц" },
    { id: "groups", title: "Создание рабочих групп" },
    { id: "assortment", title: "Согласование ассортимента" },
    { id: "budget", title: "Планирование финансовых средств" },
    { id: "purchase", title: "Проведение закупки" },
]

const positions = [-4, -2, 0, 2, 4]
const tableZ = 2.5
const shelfZ = -4.5

const initialPlaced: (string | null)[] = [
    null, null, null, null, null,
]

export default function AlgorithmActivity3D() {
    const [started, setStarted] = useState(false)
    const [finished, setFinished] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const [placed, setPlaced] = useState(initialPlaced)
    const [heldId, setHeldId] = useState<string | null>(null)

    const [message, setMessage] = useState(
        "Подойдите к столу, чтобы взять первую баночку."
    )

    const gameRef = useRef<HTMLDivElement>(null)

    // Проверяем, правильно ли собран алгоритм
    const completed = placed.every(
        (id, index) => id === steps[index].id
    )

    const correctCount = placed.filter(
        (id, index) => id === steps[index].id
    ).length

    const placedCount = placed.filter(Boolean).length

    // Открываем игру на весь экран
    const startGame = useCallback(async () => {
        if (!gameRef.current) return

        try {
            await gameRef.current.requestFullscreen()
            setStarted(true)
            setFinished(false)
        } catch (error) {
            console.error("Не удалось открыть игру на весь экран:", error)
            setMessage("Не удалось открыть полноэкранный режим. Попробуйте ещё раз.")
        }
    }, [])

    // Завершаем попытку через дверь в игровой комнате
    const finishGame = useCallback(async () => {
        if (finished) return

        setFinished(true)
        setHeldId(null)

        if (document.fullscreenElement) {
            try {
                await document.exitFullscreen()
            } catch (error) {
                console.error("Не удалось закрыть полноэкранный режим:", error)
            }
        }
    }, [finished])

    // Отслеживаем выход из полноэкранного режима
    useEffect(() => {
        const handleFullscreenChange = () => {
            const fullscreen = document.fullscreenElement === gameRef.current

            setIsFullscreen(fullscreen)

            // Если пользователь самостоятельно вышел из полноэкранного режима,
            // попытка не завершается. Он может продолжить игру.
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange)

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    }, [])

    // Взаимодействие с баночками
    const handleInteract = useCallback(
        (playerPosition: THREE.Vector3) => {
            if (!started || finished) return

            if (heldId) {
                let nearestIndex = -1
                let nearestDistance = Infinity

                positions.forEach((x, index) => {
                    if (placed[index]) return

                    const target = new THREE.Vector3(
                        x,
                        1.65,
                        shelfZ + 0.8
                    )

                    const distance = playerPosition.distanceTo(target)

                    if (distance < nearestDistance) {
                        nearestDistance = distance
                        nearestIndex = index
                    }
                })

                if (nearestIndex === -1 || nearestDistance > 2.1) {
                    setMessage(
                        "Подойдите ближе к свободному месту на стеллаже."
                    )
                    return
                }

                const correct = heldId === steps[nearestIndex].id

                setPlaced((previous) => {
                    const next = [...previous]
                    next[nearestIndex] = heldId
                    return next
                })

                setHeldId(null)

                setMessage(
                    correct
                        ? "Отлично! Этап установлен правильно."
                        : "Неверный порядок. Продолжайте собирать алгоритм."
                )

                return
            }

            let nearestStep: string | null = null
            let nearestDistance = Infinity

            steps.forEach((step, index) => {
                if (placed.includes(step.id)) return

                const bottlePosition = new THREE.Vector3(
                    positions[index],
                    1.45,
                    tableZ
                )

                const distance = playerPosition.distanceTo(bottlePosition)

                if (distance < nearestDistance) {
                    nearestDistance = distance
                    nearestStep = step.id
                }
            })

            if (!nearestStep || nearestDistance > 2.1) {
                setMessage("Подойдите к столу с баночками.")
                return
            }

            setHeldId(nearestStep)

            const selected = steps.find(
                (step) => step.id === nearestStep
            )

            setMessage(
                `Вы взяли: ${selected?.title}. Теперь отнесите её на стеллаж.`
            )
        },
        [started, finished, heldId, placed]
    )

    // Сброс попытки
    const reset = () => {
        setPlaced([...initialPlaced])
        setHeldId(null)
        setFinished(false)
        setStarted(false)
        setMessage("Подойдите к столу, чтобы взять первую баночку.")

        if (document.fullscreenElement) {
            document.exitFullscreen().catch(console.error)
        }
    }

    return (
        <section className="my-8 overflow-hidden rounded-2xl border border-[#e4ddec] bg-white shadow-sm">

            {/* Заголовок задания */}
            {!isFullscreen && (
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eee8f3] p-5">
                    <div>
                        <div className="text-lg font-bold text-[#49365f]">
                            Практическое задание
                        </div>

                        <div className="mt-1 text-sm text-gray-500">
                            Соберите алгоритм планирования запаса ЛП
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-600">
                            <span className="font-bold text-[#674b91]">
                                {correctCount}/5
                            </span>{" "}
                            правильно
                        </div>

                        <button
                            type="button"
                            onClick={reset}
                            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
                        >
                            <RotateCcw size={16} />
                            Заново
                        </button>
                    </div>
                </div>
            )}

            {/* Игровое поле */}
            <div
                ref={gameRef}
                className={`relative w-full overflow-hidden bg-slate-950 ${
                    isFullscreen
                        ? "h-screen rounded-none"
                        : "h-[600px] rounded-xl"
                }`}
            >
                <Canvas
                    shadows
                    camera={{
                        position: [0, 1.65, 7],
                        fov: 65,
                    }}
                >
                    <PlanningRoom
                        placed={placed}
                        heldId={heldId}
                        onInteract={handleInteract}
                        onFinishAttempt={finishGame}
                    />
                </Canvas>

                {/* Стартовый экран */}
                {!started && !finished && (
                    <div className="absolute inset-0 z-40 flex items-center justify-center overflow-y-auto bg-slate-950/95 p-5 text-white">
                        <div className="my-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl sm:p-8">

                            <div className="mb-5 text-center">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-300">
                                    <Play size={28} />
                                </div>

                                <h2 className="text-2xl font-bold">
                                    Планирование запаса ЛП
                                </h2>

                                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                    Практическое задание по сборке алгоритма
                                    планирования потребности в лекарственных препаратах.
                                </p>
                            </div>

                            <div className="mb-5 rounded-xl bg-white/5 p-4">
                                <h3 className="mb-2 font-semibold text-violet-300">
                                    Ваша задача
                                </h3>

                                <p className="text-sm leading-relaxed text-slate-200">
                                    На столе находятся пять баночек. Каждая из них
                                    обозначает один этап планирования. Перенесите
                                    все баночки на стеллаж и расположите их слева
                                    направо в правильной последовательности.
                                </p>
                            </div>

                            <div className="mb-5">
                                <h3 className="mb-3 font-semibold text-violet-300">
                                    Управление
                                </h3>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                                        <Keyboard className="shrink-0 text-violet-300" />
                                        <div>
                                            <div className="text-sm font-semibold">
                                                W A S D
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                Передвижение по комнате
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                                        <Mouse className="shrink-0 text-violet-300" />
                                        <div>
                                            <div className="text-sm font-semibold">
                                                Мышь
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                Осмотреться вокруг
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-violet-300 text-xs font-bold text-violet-300">
                                            E
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold">
                                                Клавиша E
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                Взять или положить баночку
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                                        <div className="flex h-6 w-12 shrink-0 items-center justify-center rounded border border-violet-300 text-xs font-bold text-violet-300">
                                            ESC
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold">
                                                Клавиша ESC
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                Освободить курсор мыши
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-5 rounded-xl border border-white/10 p-4">
                                <h3 className="mb-2 font-semibold text-violet-300">
                                    Порядок выполнения
                                </h3>

                                <ol className="list-inside list-decimal space-y-2 text-sm leading-relaxed text-slate-200">
                                    <li>Нажмите «Начать игру».</li>
                                    <li>Подойдите к столу с баночками.</li>
                                    <li>Встаньте рядом с нужной баночкой и нажмите E.</li>
                                    <li>Перенесите её к свободному месту на стеллаже.</li>
                                    <li>Нажмите E, чтобы установить баночку.</li>
                                    <li>Повторите действия со всеми пятью баночками.</li>
                                    <li>Подойдите к двери «Закончить попытку» и нажмите E.</li>
                                </ol>
                            </div>

                            <div className="mb-5 rounded-lg bg-amber-400/10 p-3 text-sm leading-relaxed text-amber-200">
                                <b>Важно:</b> результат зависит от того, насколько
                                правильно вы расположили этапы на стеллаже.
                                Для завершения задания обязательно подойдите к двери.
                                Первое нажатие ESC освобождает мышь, а не завершает попытку.
                            </div>

                            <button
                                type="button"
                                onClick={startGame}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-4 font-bold text-white transition hover:bg-violet-500"
                            >
                                <Play size={19} />
                                Начать игру
                            </button>
                        </div>
                    </div>
                )}

                {/* Прицел */}
                {started && !finished && (
                    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                        <div className="relative h-5 w-5">
                            <div className="absolute left-1/2 top-0 h-2 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_3px_#000]" />
                            <div className="absolute bottom-0 left-1/2 h-2 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_3px_#000]" />
                            <div className="absolute left-0 top-1/2 h-[2px] w-2 -translate-y-1/2 bg-white shadow-[0_0_3px_#000]" />
                            <div className="absolute right-0 top-1/2 h-[2px] w-2 -translate-y-1/2 bg-white shadow-[0_0_3px_#000]" />
                            <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_3px_#000]" />
                        </div>
                    </div>
                )}

                {/* Игровая информация */}
                {started && !finished && (
                    <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 w-fit max-w-[90%] -translate-x-1/2 rounded-lg bg-slate-950/80 px-5 py-3 text-center text-sm text-white shadow-lg">
                        {message}
                        <div className="mt-1 text-xs text-slate-400">
                            Правильно установлено: {correctCount}/5
                            {" · "}
                            Перенесено: {placedCount}/5
                        </div>
                    </div>
                )}
            </div>

            {/* Результат попытки */}
            {finished && (
                <div className="bg-white p-8 text-center">
                    <Trophy
                        className="mx-auto mb-4 text-amber-500"
                        size={48}
                    />

                    <h3 className="text-2xl font-bold text-[#49365f]">
                        Попытка завершена
                    </h3>

                    <div className="mt-5">
                        <div className="text-5xl font-bold text-[#674b91]">
                            {correctCount}/5
                        </div>

                        <div className="mt-2 text-gray-600">
                            Правильно расположенных этапов
                        </div>
                    </div>

                    <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-gray-500">
                        {correctCount === 5
                            ? "Отличная работа! Вы правильно расположили все этапы алгоритма планирования запаса лекарственных препаратов."
                            : correctCount >= 3
                                ? "Хороший результат. Рекомендуем повторить материал и обратить внимание на последовательность этапов, в которых были допущены ошибки."
                                : "Рекомендуем ещё раз изучить алгоритм планирования потребности в лекарственных препаратах и повторить практическое задание."}
                    </p>

                    <button
                        type="button"
                        onClick={reset}
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#674b91] px-6 py-3 font-medium text-white transition hover:bg-[#543b7b]"
                    >
                        <RotateCcw size={17} />
                        Повторить попытку
                    </button>
                </div>
            )}

            {/* Сообщение под игрой */}
            {!isFullscreen && !finished && (
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                    <div className="text-sm text-gray-600">
                        {message}
                    </div>

                    <div className="text-sm text-gray-600">
                        <span className="font-bold text-[#674b91]">
                            {correctCount}/5
                        </span>{" "}
                        правильно
                    </div>
                </div>
            )}
        </section>
    )
}
