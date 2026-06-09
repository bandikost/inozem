import type { LucideIcon } from "lucide-react"
import { GraduationCap, CheckCircle, Flame } from "lucide-react"

type AchievementStyle = {
    name: string
    icon: LucideIcon
    color: string
    borderColor: string
    bgColor: string
    suptitle: string
    exp: number
}

export const achievementsMap = {
  first_lesson: {
    name: "Вы прошли первый урок",
    suptitle: "Поздравляем с началом пути! Продолжайте в том же духе, и вас ждут великие достижения!",
    icon: GraduationCap,
    color: "#3b82f6",
    borderColor: "#60a5fa",
    bgColor: "#eff6ff",
    exp: 10
  },
  second_lesson: {
    name: "Вы прошли второй урок",
    suptitle: "Это уже серьезное заявление! Продолжайте в том же духе, и вас ждут великие достижения!",
    icon: CheckCircle,
    color: "#22c55e",
    borderColor: "#4ade80",
    bgColor: "#ecfdf5",
    exp: 20
  },
  three_lesson: {
    name: "3 пройденных урока",
    suptitle: "Вас просто не остановить! Продолжайте в том же духе, и вас ждут великие достижения!",
    icon: Flame,
    color: "#f97316", 
    borderColor: "#fb923c",
    bgColor: "#fff7ed",
    exp: 30
  },
} satisfies Record<string, AchievementStyle>

export type AchievementKey = keyof typeof achievementsMap