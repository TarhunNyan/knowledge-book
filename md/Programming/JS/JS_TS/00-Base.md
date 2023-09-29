# TypeScript

Расширенная версия js, в которой есть возможность строго типизации

# Настройка

## Базовая настройка

Устанавливаем typescript:

```bash
npm -i g typescript
```

## Файл конигурации

Создаем tsconfig.json:

```bash
tsc -init
```

Примр конфигурации:

```json
{
    "compilerOptions" : {
        ...
        // Компиляция в ES6
        "target": "es2015",

        // Поддержка модульного импорта и экспорта
        "module": "es2015",

        // rootDir - Корень скомпилированной папки
        // outDit  - Куда компилируем
        "rootDir": "./src",
        "outDir": "./public",

        // allowJS - компиляция JS файлов
        // checkJS - проверка типов в JS файлах
        "allowJS": true,
        "checkJS": true,

        // Удалять комментарии
        "removeComments": true,

        // Строгая проверка типов. Никаких any и undefined и null не прощаются
        "strict": true,
    }

    // Компилировать файлы только из папки "src"
    "include": ["scr"]

    // Генерирует sourceMap файлы
    // Позволяют через DevTools, узнать, какая часть сгенерированног кода где находится в исходном
    "sourceMap": true
}
```

# Запуск

## Скомпилировать все

Компилирует все файлы в проекте и начинает наблюдать изменения:

```bash
tsc -w
```

## Компиляция файла

Компилируем index.ts в index.js:

```bash
tsc index
```

Компилируем index.ts в new-filename.js:

```bash
tsc index.ts --outfile new-filename.js
```

## Автоматическая компиляция

Мы можем сказать TypeScript, чтобы отслеживал изменения:

```bash
tsc index.js -w
```

# Как использовать язык

## Поддерживаемые примитивы

Поддержка 7 примитивных типов данных:

-   string
-   number
-   bigint
-   boolean
-   undefined
-   null
-   symbol

## Объявление типа

Явное объявление типа:

```typescript
let id: number = 5;
```

Неявное объявление типа:

```typescript
let id = 5;
```

Объединенный тип:

```typescript
let age: string | number;
age = 26;
age = "26";
```

Любой тип:

```typescript
let age: any;
age = 10;
age = "10";
```

## Объявление типа: литерал(константа)

Мы можем указать какие конкретно значения может принимать переменная:

```typescript
let color: "red" | "blue" | "green" | 0;
```

## Объявление типа: массив

Явное объявление:

```typescript
let ids: number[] = [1, 2, 3];
let ids: Array<number> = [1, 2, 3];

let names: object[] = [
	{ name: "Jhon", age: "20" },
	{ name: "Valera", age: "42" },
];
```

Неявное объявление типа, только при инициализации со значением:

```typescript
let arr = ["Hello", 10, true];

// Аналогично
let arr: (string | number | boolean)[] = ["Hello", 10, true];
```

Объединенный тип:

```typescript
let arr: (string | number | boolean)[] = ["Hello", 10, true];
```

Любой тип:

```typescript
let arr: any[] = ["Hello", 10, true];
```

## Объявление типа: объект

Объявление типа переменной:

```typescript
let person: {
	name: string;
	location: string;
	isProgramming: boolean;
	sayHi: (text: string) => string;
};

person = {
	name: "Petia",
	location: "RU",
	isProgramming: true,
	sayHi: (text) => "Hi, " + text,
};
```

Шаблон, для использования в нескольких местах:

```typescript
interface Person {
    name: string;
    location: string;
    isProgramming: boolean;
    sayHi: (text: string) => string;
}

let person1: Person = {
    ...
}

let person2: Person = {
    ...
}
```

Наследование, interface:

```typescript
interface Person {
	name: string;
	location: string;
	isProgramming: boolean;
}

interface PersonSay extends Person {
	sayHi: (text: string) => string;
}
```

Изменяемость, interface:

```typescript
interface Animal {
	name: string;
}

interface Animal {
	weight: number;
}
```

## Объявление типа: функция

Явное объявление типа:

```typescript
let circle: Function = (diam: number): string => {
	return "Circle length: " + Math.PI * diam;
};
```

Неявное объявление типа:

```typescript
let circle = (diam: number) => {
	return "Circle length: " + Math.PI * diam;
};
```

Необязательный параметр, c:

```typescript
let func = (a: number, b: number, c?: number | string) => {
    ...
};
```

Функция ничего не возвращает, void:

```typescript
let func = (a: number) => void {
    ...
};
```

## Объявление типа: DOM

Для работы с DOM, можно использовать приведение типа, as:

```typescript
const form = document.getElementById("signup-form") as HTMLFormElement;
```

TypeScript имеет поддуржку типа Event:

```typescript
const form = document.getElementById('signup-form') as HTMLFormElement;

form.addEventListener( 'submit', (e: Event) => {
    ...
});
```

## Объявление типа: Псевдонимы

Псевдонимы позволяют не повторяться, type:

```typescript
type StringOrNumber = string | number;
```

Используя, type:

```typescript
type Person = {
    name: string;
    location: string;
    isProgramming: boolean;
    sayHi: (text: string) => string;
}

let person1: Person = {
    ...
}

let person2: Person = {
    ...
}
```

Для объектов существует interface. Разница в том, что interface - можно наследовать, а type - нельзя, хотя есть трюк:

```typescript
type Animal = {
	name: string;
};

type Bear = Animal & {
	isHoney: boolean;
};
```

## Объявление типа: Class

Просто объявляем типы:

```typescript
class Persom {
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}
```

Методы доступа:

```typescript
class Persom {
    public friends: number;  // чтение и изменение откуда угодно
    protect email: string;   // чтение и изменение только в пределах класса и наследников
    private iscool: boolean; // чтение и изменение только в пределах класса
    readonly name: string;   // только чтение

    ...
}
```

Имплементация интерфейса:

```typescript
interface HasFormatter {
	format(): string;
}

class Persom implements HasFormatter {
	format() {
		return "Formatted string";
	}
}

let person: HasFormatter;
person = new Person();
```

## Объявление типа: Дженерики

Проблема: typescript знает только про поле id:

```typescript
const addId = (obj: object) => {
	const id = Math.floor(Math.random() * 1000);
	return { ...obj, id };
};

const person = { name: "Jhon", age: 40 };
const newPerson = addId(person);

// Ошибка
console.log(newPerson.name);
```

Добавили дженерик - \<T\>. Проблема: typescript согласен принять все что угодно:

```typescript
const addId = <T>(obj: T) => {
	const id = Math.floor(Math.random() * 1000);
	return { ...obj, id };
};

// Передали строку, а ошибки нет
const newPerson = addId("Person");
```

Исключили свойство length - \<T extend { length?: never }\>:

```typescript
const addId = <T extend { length?: never }>(obj: T) => {
    const id = Math.floor(Math.random() * 1000);
    return { ...obj, id };
};
```

## Объявление типа: enum

Набор констант. TypeScript их автоматически сгенерирует:

```typescript
enum Direction {
	UP = "up",
	RIGHT = "right",
	DOWN = "down",
	LEFT = "left",
}

console.log(Direction.UP);
// => up
```

Автогенераця числовых значений:

```typescript
enum ResourceType {
	BOOK,
	FILM,
}

console.log(Direction.BOOK);
// => 0
```

Автогенераця числовых значений, начиная с n:

```typescript
enum ResourceType {
	BOOK = 10,
	FILM,
}

console.log(Direction.FILM);
// => 11
```
