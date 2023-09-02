# Lisp 

# Функциональные языки 

Имперовативное програмирование можно воспинимать как попытки сократить повторное использование
- переменные это кээшированный участок кода 
- циклы/функции/процедуры/наследование/полиморфизм

В функциональном программировании во главу угла ставятся чистые функции. То есть функции в математичском понимании. На практике это означает, что функция может опираться только на внутреннее состояние и никак не может ссылатьсяна внешнее.

Есть еще такая трактовка, если в коде, вместо функции подставить  возвращаемый ею результат, то ничего не должно поменяться. Это позволяет кешировать результат работы функции и вызывать их в порядке не опредленном алгоритм, а следовательно и параллелить 

Функциональные языки организованны из математической теории лямбда-исчислений. А лямбда-исчисления стротся $\beta$ редукции, но я даже не понимаю что это такое

# Структура Lisp 

Есть атомы, списки и функции
- список это то что в скобках: (+ 1 2 (10 20 30) "text") 
- атом значения в скобках разделенные пробелом: (a klda 123 "sadjkkadla")

# Атомы 

Атомы могут иметь разные роли:

## Функция 

Если атом стоит на первом месте в списке, то подставляется определенная для него функция 

````lisp 
(+ 1 2 3)
>> 6 
````

Если атом число, то подставляется число

````lisp 
10 
>> 10 
2.5 
>> 2.5 
4/9 
>> 1/3
````

Если кавычки, то атом строка: "line wihout mean"

````lisp 
'Text is here'
>> 'Text is here'
````

Nill подставляет Nill, () подставляет Nill

````lisp 
Nill 
>> Nill 
() 
>> Nill
````

T, подставляется он же. Это логическое TRUE

````lisp 
T 
>> T 
t 
>> T
````

Если для атома определенно значение, то оно подставляется

````lisp 
SETQ(a 2134)
a 
>> 2134
````

В остальных случаях возвращает ошибку 

````lisp 
abc 
>> ERRSTATE
````

Квотирование. Результат ковтирование возвращает сам атом или выражения без вычисления. То есть мы просим, ничего не делать

Например список (1 2 3) не вычисляем, хотя нужен нам в качестве аргумента. Тогда используется квотирование

````lisp 
(CAR (1 2 3))
>> ERRSTATE
(CAR (QUOTE (1 2 3)))
>> 1
(CAR `(1 2 3))
>> 1

abc 
>> ERRSTATE
'abc 
>> abc
````

# Функции 

## Математические

Сложение

````lisp 
(PLUS 1 2 3)
>> 6
(+ 1 2 3)
>> 6
````

Вычитание 

````lisp 
(MINUS 1 2 3)
>> -4
(- 1 2 3)
>> -4
````

Умножение

````lisp 
(TIMES 1 2 3)
>> 6
(* 1 2 3)
>> 6
````

Целочисленное деление 

````lisp 
(\ 9 2)
>> 4
````

Остаток от деления 

````lisp 
(REMAINDER 6 4)
>> 2
(% 6 4)
>> 2
````

Деление 

````lisp 
(QUOTIENT 6 2.0)
>> 3.0 
(/ 6 2.0)
>> 3.0 
(/ 6 2 )
>> 3 
(/ 2 6)
>> 1/2 
````

Степень

````lisp 
(^ 1 2 3)
>> 6
````

## Работа со списками 

Первый элемент списка 

````lisp
(CAR `(1 2 3))
>> 1
````

Хвост списка 

````lisp
(CDR `(1 2 3))
>> (2 3)
````

Добавить элемент в список 

````lisp
(CONS 1 `(2 3))
>> (1 2 3)
````

Создать список

````lisp 
(LIST 1 2 3)
>> (1 2 3)
(LIST `(a b) `(c d))
>> ((a b) (c d))
````

Длина списка 

````lisp 
(LENGTH `(a b c d e))
>> 5
````

## Логические функции

Является ли атомом

````lisp 
(ATOM 1)
>> T
(ATOM `(c d))
>> NIL
````

Равенство атомов

````lisp 
(EQ 2 2)
>> T
(EQ 1 4)
>> NIL
````

Проверка списка на пустоту

````lisp 
(NULL `())
>> T
(NULL NIL)
>> T
(NULL `(1 2 3))
>> NIL
````

Проверки типов

````lisp 
(FIXEDP 10)
>> T
(RATIONALP 6/5)
>> T
(FLOAT 1.212)
>> T
(COMPLEXP #C(3 2))
>> T
(STRING "12 14 21 fds ")
>> T
````

Логика 

````lisp 
(AND T T T)
>> T
(AND T T NIL)
>> NIL

(OR T NIL NIL)
>> T
(OR NIL NIL NIL)
>> NIL

(NOT T)
>> NIL 
(NOT NIL)
>> T 
````

Сравнение чисел 

````lisp 
(> 20 10)
>> T
(> 30 20 10)
>> T
(> 30 20 50)
>> NIL

(< 10 20)
>> T
(< 10 20 30)
>> T
(< 50 20 30)
>> NIL

(= 20 20 20)
>> T
(= 10 20 20)
>> NIL
(< 50 20 30)
>> NIL

(<> 20 20 20)
>> NIL
(<> 10 20 20)
>> T

(<= 10 10 20)
>> T

(>= 10 10 5)
>> T
````


## Ветвление 

Условаия if...else

````lisp
(COND((условие-1) (результат-1))
     ((условие-2) (результат-2))
     ...
     (T (результат))
)
````

## Задание значений 

Задание переменной 

````lisp 
(SETQ a \`(1 2 3))
>> (1 2 3)
a 
>> (1 2 3) 
````

Задание функции. В примере:
- time2 - имя функции 
- (x y) - переменные функции
- (\* x y) - тело функции. Вообще все выражения после переменных являются телом и исполняются все. Но возвращается только последнее

````lisp 
(DEFUN time2 (x y) (* x y))
>> time2
time2 (12 3)
>> 36
````

## Встроенные(FSUBR - не вычисляющие значения аргументов)

Присвоение значений. Присваиваем значение a

````lisp 
(SETQ a \`(1 2 3))
>> (1 2 3)
````

Новая функция. Определяется как имя, параметры, тело - одно или более S-выражение где последнее вовзращаемое значение 

````lisp 
(DEFUN *2 (x y) (* x y))
(*2 12 3)
>> 36
````

## Пользовательские(FEXPR/MACRO - не вычисляющие значения аргументов)