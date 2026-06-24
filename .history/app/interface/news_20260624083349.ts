import { RowDataPacket } from "mysql2/promise"

type NewsRow = RowDataPacket & {
 num: number
  header: string
  descript: string
  text: string
  date: string
}