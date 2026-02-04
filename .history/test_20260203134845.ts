let username: string = ""
let age: number = 0

// Тип any (нестрогий)
let something: any = 10

console.log(username = "Roman", age = 24, `have ${something} niggers` )

let numbers: number[] = [1,2,3,4]
let filtred: number[] = numbers.filter(i => i >= 2)
let sort: number[] = numbers.sort((b, a) => a - b)

let names: Array<string> = ["Roman", "Jack"]

// Кортеж — фиксированная длина и типы
let user: [string, boolean, number] 


console.log(filtred, names, user = ["retard?", true, 2])
