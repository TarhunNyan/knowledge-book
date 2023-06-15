# String

Строки. Определяются следующим образом

````js
'строка текста'
"строка текста"
`многострочная строка текста так еще и
можно всталять значения переменных ${ obj }`
````

## Получить по индексу

Только at может получить значение с испльзоанием отрицательного индекса. Лучше не оспльзоать нотацию с квадратными скобками, она не во всех случаях хорошо работает

````js
let line = "this string";
line[2];
// => "i"
line.charAt(2);
// => "i"
line.at(-3);
// => "i"
````

# Получить срез

## slice 

Не мутирует

````js 
let line = "Text here and here";

line.slice(5);
// => "here and here"
line.slice(5, 8);
// => "here"
line.slice(-4);
// => "here"
line.slice(-8, -6);
// => "and"
````

## substring

Не мутирует

````js 
let line = "Text here and here";

line.substring(5);
// => "here and here"
line.substring(5, 8);
// => "here"
````

## substr

Устарело. Не мутирует

````js 
let line = "Text: 1234567890";

line.substr(13);
// => "890"
line.substr(6, 3);
// => "123"
````

# Соединить строки 

## concat

Не мутирует

````js 
const str1 = "Hello";
const str2 = "World";

str1.concat(', ', str2, '!');
// => Hello, World!
````

## repeat

Не мутирует

````js
let repeatText = "Happy!";
repeatText.repeat(3);
// => "Happy!Happy!Happy!"
````

# Разбить строки

## split

Не мутирует

````js
let line = "Ok, we go to hub!";
line.split(' ');
// => ["Ok,", "we", "go", "to", "hub"]
````

# Поиск подстрок

## indexOf

Вхождение подстроки в строке. Не мутирует

````js 
let line = "This is test string!"

line.indexOf("is");
// => 2
line.includes("is", 3);
// => 5
line.includes("WHAT");
// => -1
````

## lastIndexOf

Вхождение подстроки в строке. Поиск с конца. Не мутирует

````js 
let line = "This is test string!"

line.lastIndexOf("is");
// => 5
line.lastIndexOf("is", 3);
// => 2
line.lastIndexOf("WHAT");
// => -1
````

## includes

Регистро-чувствительная функция. Проверяет наличие подстроки в строке. Не мутирует

````js 
let line = "This is test string!"

line.includes("is");
// => true
line.includes("is", 10);
// => false
````

## endsWith

Окончание строки. Не мутирует

````js
let line = "This is test string!"

line.endsWith("string!");
// => true
line.endsWith("test");
// => false
line.endsWith("test", 11);
// => true
````

## startsWith

Начало строки. Не мутирует

````js
let line = "This is test string!"

line.startsWith("This");
// => true
line.startsWith("is");
// => false
line.startsWith("is", 5);
// => true
````

# Сортирока

## localeCompare

У этой функции есть еще параметры, но мне впадлу разбиратья. Не мутирует

````js
let a = "bc";
let b = "ab";

a.localeCompare(b);
// => 1
```` 

При сортировке a идет до b      , возвращает положительное число
При сортировке a и b одинаковы  , возвращает 0
При сортировке a идет после b   , возвращает отрицательное число

# Регулярные выражения

Смотри [регулярные выражения](../../Regexp/Regexp_JS.md)

## match

## matchAll

## replace

## replaceAll

## search

# Форматирование

## trim

Удаляем пробелы вначале и вконце. Не мутирует

````js 
let line = "     Hello    ";
line.trim();
// => Hello
````

## trimEnd, trimRight

Удаляем пробелы вконце. Не мутирует

````js 
let line = "     Hello    ";
line.trim();
// => "     Hello"
````

## trimStart, trimLeft

Удаляем пробелы вначале. Не мутирует

````js 
let line = "     Hello    ";
line.trim();
// => "Hello    "
````

## padEnd

````js
let line = "Is a text"

line.padEnd( 25, "." );
// => 'Is a text................'
````

## padStart

````js
let line = "Is a text"

line.padStart( 25, "." );
// => '................Is a text'
````

## raw

Текст без необходимости экранирования

````js 
const filePath = String.raw`C:\Development\profile\aboutme.html`;
````

# Строчные/Заглавные

## toLowerCase 

Делает все буквы строчными. Не мутирует

````js 
const sentence = 'The qUicK brOwn fOx';
sentence.toLowerCase();
// => the quick brown fox
````

## toUpperCase 

Делает все буквы заглавными. Не мутирует

````js 
const sentence = 'The qUicK brOwn fOx';
sentence.toUpperCase();
// => THE QUICK BROWN FOX
````

## toLocaleLowerCase

Использует специальные локальные карты, чтобы сделать все буквы строчными. Не мутирует

````js 
const dotted = 'İstanbul';

dotted.toLocaleLowerCase('en-US');
// => "i̇stanbul"

dotted.toLocaleLowerCase('tr');
// => "istanbul"
````

## toLocaleUpperCase

Использует специальные локальные карты, чтобы сделать все буквы заглавными. Не мутирует

````js 
const city = 'istanbul';

console.log(city.toLocaleUpperCase('en-US'));
// Expected output: "ISTANBUL"

console.log(city.toLocaleUpperCase('TR'));
// Expected output: "İSTANBUL"
````

# Обрамление тегами

## link

Устарело. Не мутирует

````js
let line = "This is test string!"

line.link( "www://..." );
// => '<a href="www://...">This is test string!</a>'
````

## italics, bold, blink, strike

Устарело. Не мутирует

````js
let line = "This is test string!"

line.italics();
// => '<i>This is test string!</i>'
line.bold();
// => '<b>This is test string!</b>'
line.blink();
// => '<blink>This is test string!</blink>'
line.strike();
// => '<strike>This is test string!</strike>'
````

## fontColor

Устарело. Не мутирует

````js
let line = "This is test string!"

line.fontColor("FF00");
// => '<font color="FF00">This is test string!</font>'
````

## fontSize, small, big

Устарело. Не мутирует

````js
let line = "This is test string!"

line.fontSize(7);
// => '<font size="7">This is test string!</font>'
line.small();
// => '<small>This is test string!</small>'
line.big();
// => '<big>This is test string!</big>'
````

## sub, sup

````js
let line = "This is test string!"

line.sub();
// => '<sub>This is test string!</sub>'
line.sup();
// => '<sup>This is test string!</sup>'
````

## fixed

Устарело. Не мутирует

````js
let line = "This is test string!"

line.fixed();
// => "<tt>This is test string!</tt>"
````

# Число в строку, строку в число

## fromCharCode

Создает строку из чисел. Возвращает примитивную строку, нужно еще обернуть в String, чтобы получить объект

````js 
String.fromCharCode( 65, 66, 67);
//  "ABC"
````

## charCodeAt

Символ с указанным индексом в число

````js 
let line = "The quick";
line.charCodeAt( 4 );
// => 113
````

## codePointAt

Нифига не понял. Возвращает какйю-то кодоую точку... Хз короче...

````js 
let line = "U_U";
line.codePointAt( 1 );
// => 9733
````








## normilize

Нормализует строку к Нормальной Юникод Форме. Аргумент принимает к какой из форм приводить. Есть: "NFC", "NFD", "NFKC", "NFKD". Для чего это применять - хз

````js 
const name1 = '\u0041\u006d\u00e9\u006c\u0069\u0065';
const name2 = '\u0041\u006d\u0065\u0301\u006c\u0069\u0065';

console.log(`${name1}, ${name2}`);
// => "Amélie, Amélie"
console.log(name1 === name2);
// => false
console.log(name1.length === name2.length);
// => false

const name1NFC = name1.normalize('NFC');
const name2NFC = name2.normalize('NFC');

console.log(`${name1NFC}, ${name2NFC}`);
// => "Amélie, Amélie"
console.log(name1NFC === name2NFC);
// => true
console.log(name1NFC.length === name2NFC.length);
// => true
````
