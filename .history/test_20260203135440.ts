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


console.log(filtred, sort, names, user = ["retard?", true, 2])
