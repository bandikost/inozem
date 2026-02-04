let username: string = ""
let age: number = 0

// Тип any (нестрогий)
let something: any = 10

console.log(username = "Roman", age = 24, `have ${something} niggers` )

let numbers: number[] = [1,2,3,4]
numbers.push(5)

let names: Array<string> = ["Roman", "Jack"]

// Кортеж — фиксированная длина и типы
let user: [string, boolean, number] 

console.log(numbers, names, user = ["", true, 2])
