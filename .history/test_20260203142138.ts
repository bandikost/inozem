let username: string = ""
let age: number = 0

// Тип any (нестрогий)
let something: any = 10

console.log(username = "Roman", age = 24, `have ${something} niggers` )

let numbers: number[] = [1,2,3,4]
let filtred: number[] = numbers.filter(i => i >= 2)
let sort: number[] = numbers.sort((a, b) => b - a)


let names: Array<string> = ["Roman", "Jack"]
let array: string[] = names.map(i => i.toUpperCase())

// Кортеж — фиксированная длина и типы
let user: [string, boolean, number] 



interface Products {
    id: number
    name: string
    price: number
    discount?: boolean
}

const product1: Products = {id: 1, name: "potato", price: 22}
const product2: Products = {id: 2, name: "tomate", price: 20}
const arr: Products[] = [product1, product2]
const sorted: Products[] = arr.sort((a, b) => a.id - b.id)

console.log(sorted)
