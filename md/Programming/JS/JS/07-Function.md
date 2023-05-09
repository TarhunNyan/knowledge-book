# Function

## length

Солько параметров принимает Функция

````js
function functionName(a, b, ...args) {}

console.log( functionName.length );
// => 2

````

## name

Возвращает имя функции

````js
function functionName(a, b, ...args) {}

console.log( functionName.name );
// => "functionName"
````

## Prototype

Смотри [Object](./04-Object.md#prototypes)

# Создание функции 

Вне зависимости от принимаемых аргументов, функция их может принимать сколько угодно. Хранит все аргументы в массиве arguments

````js 
// Такой способ объявлять функцию называется: Function Declaration
function nameFunction(a, b, c, ...arr) {
    console.log( arguments );
    return a+b;
}

console.log( nameFunction(1, 2, 3, 200, 300) );
//     a  b  c [  arr  ]
// => [1, 2, 3, 200, 300]
````

Так тоже можно объявлять функцию

````js 
// Такой способ объявлять функцию называется: Function Expression
let nameVariable = function(a, b) { ... }
````

## Анонимная функция

Не обладает контекстом, то бишь this в ней не работает

````js 
let anonimFunction = (a, b) => { return ...; };
````

Так тоже можно, но если аргумент один, и функция однострочная

````js 
let nameFunction = a => 10*a;
````

## void

Тут же вызывает объявленную функцию. Функция будет возращат undefined всегда

````js 
void function iife() {
  console.log("Executed!");
}();

// => "Executed!"
````

# Итераторы/Генераторы

## Итератор

Функция типа фабрика. Возвращаемый объект хранит в себе состояние коллекции и имеет метод next

````js 
function makeIterator(array){
    var nextIndex = 0;

    return {
       next: function(){
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false} :
               {done: true};
       }
    }
}

var it = makeIterator(['yo', 'ya']);
console.log(it.next().value); // 'yo'
console.log(it.next().value); // 'ya'
console.log(it.next().done);  // true
````

## Генераторы

Функция со зездочкой, вместо return используется yield

````js 
function* idMaker(){
  var index = 0;
  while(true)
    yield index++;
}

var it = idMaker();

console.log(it.next().value); // 0
console.log(it.next().value); // 1
console.log(it.next().value); // 2
````

## Пользовательский иттерируемый объект 

````js 
svar myIterable = {}
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
````

## next с аргументом

Последний раз где вызывался yield, вернет то, что передадут в качестве аргумента в next

````js 
function* fibonacci(){
  var fn1 = 1;
  var fn2 = 1;
  while (true){
    var current = fn2;
    fn2 = fn1;
    fn1 = fn1 + current;
    var reset = yield current;
    if (reset){
        fn1 = 1;
        fn2 = 1;
    }
  }
}

var sequence = fibonacci();
console.log(sequence.next().value);     // => 1
console.log(sequence.next().value);     // => 1
console.log(sequence.next().value);     // => 2
console.log(sequence.next().value);     // => 3
console.log(sequence.next().value);     // => 5
console.log(sequence.next().value);     // => 8
console.log(sequence.next().value);     // => 13
console.log(sequence.next(true).value); // => 1
console.log(sequence.next().value);     // => 1
console.log(sequence.next().value);     // => 2
console.log(sequence.next().value);     // => 3
```

## return в генераторах

````js 
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next();        // { value: 1, done: false }
g.return('foo'); // { value: "foo", done: true }
g.next();        // { value: undefined, done: true }
````

## Встроенные иттерируемые объекты 

String, Array, TypedArray, Map, Set

# Методы

## bind

Устанавливаеи новый контекст

````js
let obj = { 
    name: "Vasia",
    hello: function( endText ) { console.log( `Hello, ${this.name}! ${(endText===undefined ? "" : endText)}` ); }
};

let anotherObj = {
    name: "Petia"
};

let hello = obj.hello;
let helloVasia = hello.bind(obj); 
let helloPetia = hello.bind(anotherObj); 

// передаем контекст(this)
hello();
// => "Hello, indefined!"
helloVasia();
// => "Hello, Vasia!"
helloPetia();
// => "Hello, Petia!"

// передаем параметры
helloVasia("Good Luck!");
// => "Hello, Vasia! Good Luck!"
helloPetia("Good Luck!");
// => "Hello, Petia! Good Luck!"
````

## call 

Позоляет переопредлить контекст(this) функции и вызвает ее в новом контексте. Очень похожа на [apply](#apply)

````js 
let obj = { 
    name: "Vasia",
    hello: function( endText ) { console.log( `Hello, ${this.name}! ${(endText===undefined ? "" : endText)}` ); }
};

let anotherObj = {
    name: "Petia"
};

let hello = obj.hello;


// передаем контекст(this)
hello();
// => "Hello, indefined!"
hello.call(obj);
// => "Hello, Vasia!"
hello.call(anotherObj);
// => "Hello, Petia!"

// передаем параметры
hello.call(obj, "Good Luck!");
// => "Hello, Vasia! Good Luck!"
hello.call(anotherObj, "Good Luck!");
// => "Hello, Petia! Good Luck!"
````

## apply

Позоляет переопредлить контекст(this) функции и вызвает ее в новом контексте. Очень похожа на [call](#call)

````js
let obj = { 
    name: "Vasia",
    hello: function( endText ) { console.log( `Hello, ${this.name}! ${(endText===undefined ? "" : endText)}` ); }
};

let anotherObj = {
    name: "Petia"
};

let hello = obj.hello;


// передаем контекст(this)
hello();
// => "Hello, indefined!"
hello.apply(obj);
// => "Hello, Vasia!"
hello.apply(anotherObj);
// => "Hello, Petia!"

// передаем параметры
hello.apply(obj, ["Good Luck!"]);
// => "Hello, Vasia! Good Luck!"
hello.apply(anotherObj, ["Good Luck!"]);
// => "Hello, Petia! Good Luck!"
````
