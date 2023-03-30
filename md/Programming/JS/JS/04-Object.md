# Object

## Получить ключи/значения

````js
// Получить ключи
Object.keys( obj );

// Получить значения
Object.values( obj );

// Получить ключи и значения
for (const [key, value] of Object.entries(obj)) {
    console.log(`${key}: ${value}`);
}
````

## Использовать this в аттрибуте функции

Важно чтобы функция была не стрелочной, тогда все работает

````js
obj = { 
    val: "some val",
    run: function () { return this.val }
}

console.log(obj.run);
````

## Define Property

# Setter и getter

Смотри [defineProperty](#define-property)  
Смотри второй пример в [Class](#class)  

Или вот так:

````js
var user = {
    firstName: "Вася",
    surname: "Петров",

    get fullName() {
      return this.firstName + ' ' + this.surname;
    },

    set fullName(value) {
      var split = value.split(' ');
      this.firstName = split[0];
      this.surname = split[1];
    }
};
````

# Prototypes

Все не очень сложно, хоть и немного запутано. Итак, у каждого объекта(кроме undefine) есть свойство __`__proto__`__:

- Что такое __`__proto__`__? 
    - Ссылка на объект
- Откуда берется __`__proto__`__? 
    - Копируется из аттрибута __prototype__ функции конструктора
- Зачем нужен __`__proto__`__? 
    - Если у объекта нет аттрибута, он берется у объекта из __`__proto__`__. А поскольку __`__proto__`__ это объект, к нему это правило так же применяется. И идет дальше по всей цепочке

## Пример

````js
function constructorFunc() {
    this.someVariable = "value"
}
constructorFunc.prototype = { ok: 200 }

const obj = new constructorFunc();

console.log( obj.someVariable )
// => "value"
console.log( obj.ok )
// => 200
console.log( obj.__proto__ )
// => { ok: 200 }
console.log( obj.__proto__ === constructorFunc.prototype )
// => true
````

Изменив __prototype__ старые объекты не изменятся, а новые объекты будут ссылаться на другой объект

````js
function constructorFunc() {
    this.someVariable = "value"
}
constructorFunc.prototype = { ok: 200 }

const obj = new constructorFunc();

constructorFunc.prototype = { ok: 400 }
const newObj = new constructorFunc();

console.log( obj.ok )
// => 200
console.log( newObj.ok )
// => 400
````

Изменив __`__proto__`__ старые объект изменятся, а новые объекты нет    

````js
function constructorFunc() {
    this.someVariable = "value"
}
constructorFunc.prototype = { ok: 200 }

const obj = new constructorFunc();
obj.__proto__ = { ok: 400 }

const newObj = new constructorFunc();

console.log( obj.ok )
// => 400
console.log( newObj.ok )
// => 200
````

# Class

Чисто синтаксический сахар, но знать надо

````js
class Person {

    // список свойств для упрощения чтения кода
    name;

    // конструктор вызываемый new
    constructor(name) {
        this.name = name;
    }
}

class Lena extends Person {
    
    // приватная переменная. Доступно только внутри класса
    #year;
    
    constructor() {
        // super вызывает конструктор предка применительно к текущему объекту
        super('Lena')
        this.#year = 1990;
    }
    
    // приватная функция. Доступно только внутри класса
    #somePrivateMethod() {
        console.log('You called me?');
    }

    // getter и stter
    get firstName() { ... }
    set firstName( value ) { ... }
}

let person = new Person('Vova');
let lena = new Lena();

console.log( person.name )
// => Vova
console.log( lena.name )
// => Lena

console.log( lena.year )
console.log( lena.#year )
// => ERROR
````