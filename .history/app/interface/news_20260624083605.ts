import { RowDataPacket } from "mysql2/promise"

export interface NewsRow extends RowDataPacket {
    id: number
    header: string
    descript: string
    text: string
    date: string
}