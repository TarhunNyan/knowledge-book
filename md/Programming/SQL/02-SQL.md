# SQL

В этой статье приведен базовый синтаксис SQL. В разных софтах разная его реализация

SQL - это реляционная БД, по английски relation, то бишь суть в том, что между таблицами есть "отношения"

# SELECT 

Самый базовый запрос. Вытаскивает данные из таблицы 

Обработка запроса/подзапроса идет в следующем порядке:
- FROM     - описываем таблицы с которыми работаем
- WHERE    - проверка для каждой строки
- GROUP BY - создаем группы
- HAVING   - делаем проверки для элементов группы
- SELECT   - тут мы выбираем столбцы и даем им имена
- ORDER BY - сортируем

Общая структура запроса:

````sql
SELECT[DISTINCT|ALL]
{ * | [<выражение для стобца> [[AS}] <псевдоним>]] [, ...] }
FROM <имя таблицы> [[AS] <псевдоним>] [, ...]
[WHERE <предикат>]
[[GROUP BY <список столбцов>]
[HAVING <условие на агрегатные состояния>]]
[ORDER BY <список столбцов>]
````

## FROM

Точечная нотация. Если берем данные из нескольких таблиц, то у них могут пересекаться названия столбцов. Для однозначности используют точечную нотацию:

````sql 
SELECT PC.price, Device.price, monitor FROM PC, Device;
````

Подзапрос внутри FROM:

````sql 
SELECT DISTINCT PC.model, maker
FROM PC, (SELECT maker, model FROM Product) AS prod
WHERE PC.model = prod.model AND price > 600;
````

Декартово произведение таблиц(на сайте oracle написано, что ACCROS JOIN имеют такое поведение, а не конструкция написанная выше, поэтому надо смотреть реализацию конкретной СУБД):

````sql
SELECT * FROM A, B;
````

## WHERE 

Выбирает только те строки, которые соответствуют условию:

````sql
SELECT DISTINCT speed, ram FROM Pc
WHERE price<500 AND cd = '24x';
````

Так же можно производить математические операции со значениями столбцов: 

````sql
SELECT DISTINCT speed, ram FROM Pc
WHERE price-100<500 AND price <= speed*2 ;
````

## GROUP BY

Создает в таблице группы, по значениям из выбранного столбца

````sql
SELECT model, COUNT(model) AS Qty_model, AVG(price) AS Avg_price FROM PC
GROUP BY model;
````

## HAVING

HAVING - как WHERE, но проверка делается для каждой группы полученной GROUP BY отдельно:

````sql
SELECT model, COUNT(model) AS Qty_model, AVG(price) AS Avg_price
FROM PC
GROUP BY model
HAVING AVG(price) < 800;
````

## SELECT 

Вытащить столбцы, в произвольном порядке:

````sql
SELECT * FROM Pc;
````

Вытащить столбцы, упорядоченно:

````sql
SELECT speed, ram FROM Pc;
````

Вытащить столбцы,с уникальными строками:

````sql
SELECT DISTINCT speed, ram FROM Pc;
````

Получить строки с пустыми значениями:

````sql 
SELECT * FROM Pc WHERE price IS NULL;
````

Переименовать столбцы:

````sql
SELECT ram AS Mb, hd Gb FROM ... WHERE ...;
````

Горизонтальная выборка:

````sql
SELECT DISTINCT speed, ram 
FROM Pc
WHERE price<500
ORDER BY 2 DESC;
````

Применить математическое преобразование к столбцу

````sql
SELECT ram * 1024 AS Kb, hd Gb
FROM Pc
WHERE cd = '24x';
````

Столбец заполненный константами. В примере, каждая ячейка столбца ram_units будет содержать 'Mb':

````sql
SELECT ram, 'Mb' AS ram_units, hd
FROM Pc
WHERE cd = '24x';
````

## ORDER BY 

Представляет из себя сортировку данных. Можно сортировать:
- ASC  - по возрастанию. Используется по усолчанию, так что можно не писать
- DESC - по убывнаию 

Пример: 
````sql 
SELECT speed, ram FROM Pc ORDER BY ram DESC;

SELECT speed, ram FROM Pc ORDER BY ram ASC;
````

Также можно сортировать не по имени столбца а по порядкову номеру:
````sql 
SELECT speed, ram FROM Pc ORDER BY 2 ASC;
````

При упорядочивании по нескольким столбцам. Сначала сортирует по первому прописанному, а потом, если значения равны, то по второму:

````sql
Упорядочить по нескольким столбцам 
SELECT speed, ram FROM Pc
ORDER BY ram DESC, speed ASC;
````

Из-за особенности в порядке обработки запроса селект, агргетные функции которые были прописаны в начале работают только в разделе ORDER BY

## Агрегатные функции

| Название функции  | Что делает                                          |
|:------------------|:----------------------------------------------------|
| COUNT(\*)       	| Возвращает количество строк источника записей       |
| COUNT(<имя поля>) | Возвращает количество значений в указанном столбце  |
| SUM(<имя поля>)   | Возвращает сумму значений в указанном столбце       |
| AVG(<имя поля>)   | Возвращает среднее значение в указанном столбце     |
| MIN(<имя поля>)   | Возвращает минимальное значение в указанном столбце |
| MAX(<имя поля>)   | Возвращает максимальное значение в указанном столбц |

Пример:

````sql
SELECT MIN(price) AS Min_price, MAX(price) AS Max_price FROM PC;
````

# Объединение таблиц 

## JOIN 

Объединение столбцов двух таблиц. После ON, идет инструкция, по которой мы сопоставяем строки в соединяемых таблицах: 

````sql
SELECT maker, Product.model AS model_1, PC.model AS model_2, price
FROM Product
INNER JOIN PC ON PC.model = Product.model
````

Так де имеется настройка того как соединять табллицы. Они связаны с диаграмами Венна:

- INNER - пересечение таблиц. То есть внутрення часть диаграммы Венна
- LEFT JOIN - к значениям 1 табл, добавляют соотвествующие значения 2 табл. Левая и внутренняя часть диаграммы Венна
- RIGHT JOIN - к значениям 2 табл, добавляют соотвествующие значения 1 табл. Правая и внутренняя часть диаграммы Венна
- FULL JOIN - соединяет как может. Где нечего соединять втыкает NULL. Левая, внутренняя и правая часть диаграмымы Венна


## UNION

Объединение всез строк в двух таблицах. Для этого таблицы должны соответствовать следующим условиям:
- Количество выходных столбцов каждого из запросов должно быть одинаковым.
- Выходные столбцы каждого из запросов должны быть сравнимыми между собой (в порядке их следования) по типам данных.
- В результирующем наборе используются имена столбцов, заданные в первом запросе.
- Предложение ORDER BY применяется к результату соединения, поэтому оно может быть указано только в конце составного запроса

Общая структура:

````sql
<запрос 1>
UNION [ALL]
<запрос 2>
````

По умолчанию UNION удаляет дублирующие строки. Если использовать ALL, то будет их оставлять:

````sql 
SELECT DISTINCT Goods.good_name AS name FROM Goods
UNION
SELECT DISTINCT FamilyMembers.member_name AS name FROM FamilyMembers;
````

Так же существуют INTERSECT(пересечение) и EXCEPT(разность). Принцип работы аналогичен UNION, но есть далеко не во всех реализация SQL

# Работа с базами данных

## CREATE DATABASE 

Создает базу данных: 

````sql 
CREATE DATABASE DataBase_name$1;
````

## DROP DATABASE 

Удаляет базу данных: 

````sql 
DROP DATABASE DataBase_name$1;
````

## SHOW DATABASE

Отображает список баз данных, включая служебные(information_schema, mysql, performance_schema, sys):

````sql 
SHOW DATABASE;
````

# Работа с таблицами 

## DROP TABLE 

Удалить таблицу: 

````sql 
DROP TABLE TableName; 
````

## CREATE TABLE

Итак, сначало нужно сздать базу данных:

````sql 
CREATE DATABASE DataBase_name$1;
````

Потом указать что сейчас будем использовать эту базу данных 

````sql 
USE DataBase_name$1;
````

Теперь создаем таблицу:

````sql 
CREATE TABLE Users (
    id INT,
    name VARCHAR(255),
    age INT
);
````

## Описание столбцов таблицы 

Так же можно указать дополнительный парамет:
- PRIMARY KEY - указывает, что стобец является первичным ключом. Несколько столбцов могут быть первичными ключами
- AUTO_INCREMENT - фактически это id-шник. Только одна колонка на таблицу может иметь это свойство. При добавлении значения 0 или NULL, автоматически найдет наибольшее значение и добавит ему единичку
- UNIQUE - значение в данной таблице для всех данных должны быть уникальны 
- NOT NULL - в столбце не должно быть NULL значений 
- DEFAULT - задает значение по умолчанию

Пример: 

````sql 
CREATE TABLE Users (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL DEFAULT 18
);
````

Чтобы просмотреть описание созданной таблицы можно вызвать: 

````sql 
DESCRIBE TableName;
````

## Foreign key 

Foreign key - внешний ключ. Например, у нас есть таблица компний: 

````sql
CREATE TABLE Companies (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
````

И мы создаем таблицу работников. Внутри таблицы работников мы хотим ссылаться на компанию в которой они работают(см. предпоследнюю строку):

````sql 
CREATE TABLE Users (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL DEFAULT 18,
    company INT,
    FOREIGN KEY (company) REFERENCES Companies (id)
);
````

Можно так же определить поведение данных, при удалении и изменении в другой таблице. Сделав вот так:

````sql 
CREATE TABLE Users (
    ...
    FOREIGN KEY (company) REFERENCES Companies (id)
    ON DELETE RESTRICT ON UPDATE CASCADE
);
````

Возможные действия: 
- ON DELETE RESTRICT - если попробовать удалить компанию, у которой в таблице Users есть данные, база данных не даст этого сделать
- ON DELETE CASCADE  - при удалении компании были бы удалены все пользователи, ссылающиеся на эту компанию
- ON DELETE SET NULL - при удалении компании в таблице пользвателей значения, ссылающиеся на эту команию, заменяться на NULL
- ON UPDATE CASCADE  - означает, что если компания изменит свой идентификатор, то все пользователи получат новый идентификатор в поле company

# Работа с данными существующей таблицы

## INSERT INTO 

Вставить новые данные в существующую таблицу

Вставляем в таблицу Goods, в столбцы good_id, good_name, type, данные:

````sql 
INSERT INTO Goods (good_id, good_name, type) VALUES (20, 'Table', 2);
````

Вставляем в таблицу Goods, подзапрос:

````sql 
INSERT INTO Goods (good_id, good_name, type) SELECT COUNT(*) + 1, 'Table', 2 FROM Goods;
````

Вставляем в таблицу Goods, подзапрос, без описания нужных столбцов:

````sql 
INSERT INTO Goods SELECT COUNT(*) + 1, 'Table', 2 FROM Goods;
````

## UPDATE 

Запрос изменяет значения полей таблицы

В таблице FamilyMembers, в столбце member_name, все значения "Andie Quincey", меняем на "Andie Anthony": 

````sql 
UPDATE FamilyMembers SET member_name = "Andie Anthony" WHERE member_name = "Andie Quincey";
````

В увеличиваем значения столбца unit_price в два раза: 

````sql 
UPDATE FamilyMembers SET unit_price = unit_price * 2;
````

Меняем сразу два столбца:

````sql 
UPDATE FamilyMembers SET unit_price = unit_price * 2, id = id + 1;
````

## DELETE 

Запрос удаляет строки из таблицы:

````sql
DELETE Roomds FROM Reservation WHERE Rooms.has_kitchen = false;
````

Пример запроса с объединением:

````sql
DELETE Reservations, Rooms FROM Reservations JOIN Rooms ON Reservations.room_id = Rooms.id WHERE Rooms.has_kitchen = false;
````

# Типы данных 

В разных реализациях БД разные типы данных, поэтому не могу привести пример 

## Типы данных 

Строковые типы данных: 
|Название     |Описание                                                                                                                                                                     |Размер                   |
|:------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------:|
|CHAR(X)      |строка длинной до 255 символов                                                                                                                                               |до 255 символов          |
|VARCHAR(X)   |текстовые строки с динамической длинной                                                                                                                                      |до 65 535 символов       |
|BINARY(X)    |двоичная строк длинной до 255 символов                                                                                                                                       |до 255 символов          |
|VARBINARY(X) |двоичная строка произвольной длины                                                                                                                                           |до 65 535 символов       |
|TINYBLOB     |Смотри BLOB                                                                                                                                                                  |до 255 символов          |
|BLOB         |содержи неограниченный двоичный текст<br>Предназначен для хранения картинок<br><br>В зависимости от размера содержимого бывает: TINYBLOB, MEDIUMBLOB, LONGBLOB               |до 65 535 символов       |
|MEDIUMBLOB   |Смотри BLOB                                                                                                                                                                  |до 16 777 215 символов   |
|LONGBLOB     |Смотри BLOB                                                                                                                                                                  |до 4 294 967 295 символов|
|TINYTEXT     |Смотри TEXT                                                                                                                                                                  |до 255 символов          |
|TEXT         |содержи неограниченный текст<br>В отличии от BLOB не чувствителен к регистру при сравнении<br><br>В зависимости от размера содержимого бывает: TINYTEXT, MEDIUMTEXT, LONGTEXT|до 65 535 символов       |
|MEDIUMTEXT   |Смотри TEXT                                                                                                                                                                  |до 16 777 215 символов   |
|LONGTEXT     |Смотри TEXT                                                                                                                                                                  |до 4 294 967 295 символов|

Числовые типы данных: 
|Название       |Описание                                                                                                   |Пример|Размер                       |
|:--------------|:----------------------------------------------------------------------------------------------------------|:-----|:---------------------------:|
| TINYINT       |                                                                                                           |      |1 байт                       |
| SMALLINT      |                                                                                                           |      |2 байт                       |
| MEDIUMINT     |                                                                                                           |      |3 байт                       |
| INT           |                                                                                                           |      |4 байт                       |
| BIGINT        |                                                                                                           |      |8 байт                       |
| DECIMAL(M, D) |хранит точную вещественну, десятичную дробь. M - сколько всего цифр хранит, D - сколько цифр после запятой |      |зависит от указанных размеров|
| BIT(M)        |хранит число в двоичном виде. M - число хранимых бит                                                       |      |не более 64                  |
| BOOL          |логический тип. Либо 1, либо 0                                                                             |b'101'|1 байт                       |
| FLOAT(M, D)   |числа с плавающей запятой                                                                                  |      |4 байта                      | 
| REAL(M, D)    |числа с плавающей запятой                                                                                  |      |8 байт                       | 

Дата и время:
|Название       |Описание                             |Пример                 |Размер |
|:--------------|:------------------------------------|:----------------------|:-----:|
|DATE           |данные вида ГГГГ-ММ-ДД               |"2022-12-03"           |3 байта|
|TIME           |данные вида ЧЧ:ММ:СС или ЧЧЧ:ММ:СС   | "178:10:23"           |3 байта|
|DATETIME       |данные вида ГГГГ-ММ-СС ЧЧ:ММ:СС      |"2022-12-03 78:10:23"  |8 байта|
|TIMESTAMP      |данные вида ГГГГ-ММ-СС ЧЧ:ММ:СС      |"2022-12-03 78:10:23"  |4 байта|

TIMESTAMP хранит сколько секунд прошло от 0 часа выбранного часового пояса. Поэтому при смене часового пояса, будут выводиться другие данные. Кроме того огранимчен датами от 1970 до 2038

## Преобразование типов

Явное преобразование типа 

````sql
CAST(<выражение> AS <тип данных>)
````

Число в строку:

````sql
CAST(AVG(price) AS CHAR(15))
````

Округление:

````sql 
CAST(AVG(launched) AS NUMERIC(6,2))
````

# Логика и условия

## Предикат 

Предикат - логическое выражение, возвращающее:
1. FALSE - 0
2. TRUE - 1
3. UNKNOWN - 1/2

NOT:

````sql
SELECT * FROM Printer
WHERE NOT (type = 'matrix');
````

AND:

````sql
SELECT * FROM Printer
WHERE (type = 'matrix') AND price < 300;
````

OR:

````sql
SELECT * FROM Printer
WHERE (type = 'matrix') OR price < 300;
````

BETWEEN:

````sql
exp1 BETWEEN exp2 AND exp3
это то же что и:
exp1>=exp2 AND exp1<=exp3
````

IN:

````sql
SELECT model, speed, hd FROM Pc
WHERE hd IN (10, 20);
````

IN с использование подзапроса:

````sql
SELECT * FROM Reservations
    WHERE (room_id, price) IN (SELECT id, price FROM Rooms);
````

IS NULL 

````sql 
SELECT model, speed, hd FROM Pc
WHERE model IS NULL;
````

EXISTS - возвращает значение TRUE, если подзапрос возвращает любое количество строк, иначе его значение равно FALSE.

````sql
EXISTS (<табличный подзапрос>)

NOT EXISTS (<табличный подзапрос>)
````

LIKE - ищет текст похожий на то что в кавычках. Особенности:
1. % - любая последовательность символов
2. _ - один любой символ
3. ESCAPE - то что в указано в кавычках после ESCAPE становится эскейп-символом

Пример:

````sql
SELECT class FORM Ships
WHERE class LIKE '%Class#__' ESCAPE '#';
````

Комбиниированный пример:

````sql
SELECT model, speed, hd
FROM Pc
WHERE hd IN (10, 20) AND
            model IN (SELECT model  FROM product
            WHERE maker = 'A');
````

## Классические операторы сравнения 

Классические операторы сравнения: >, <, >=, <=, =, <>

Сревнение различных типов данных:
- Данные типа NUMERIC (числа) сравниваются в соответствии с их алгебраическим значением.
- Данные типа CHARACTER STRING (символьные строки) сравниваются в соответствии с их алфавитной последовательностью("fol"<"for", "bar"<"barber")
- Данные типа DATETIME (дата/время) сравниваются в хронологическом порядке.
- Данные типа INTERVAL (временной интервал) преобразуются в соответствующие типы, а затем сравниваются как обычные числовые значения типа NUMERIC

## SOME, ANY, ALL

Прменяет логическое выражение к результату подзапроса и возвращает TRUE, FALSE или UNKNOWN. Общая структура такова:
- <подзапрос> - должен возвращать один столбец величин

````sql
<выражение> <оператор сравнения> SOME|ANY|ALL (<подзапрос>)
````

SOME - если хотя бы одно сравнение вернет TRUE, то SOME вернет TRUE:

````sql 
SELECT * FROM dbo.TestTable
   WHERE CategoryID = 1 
     AND Price > SOME (SELECT Price 
                         FROM dbo.TestTable 
                         WHERE CategoryID = 2)
````

ANY - если хотя бы одно сравнение вернет TRUE, то ANY вернет TRUE:

````sql 
SELECT * FROM dbo.TestTable
   WHERE CategoryID = 1 
     AND Price > ANY (SELECT Price 
                         FROM dbo.TestTable 
                         WHERE CategoryID = 2)
````

ALL - если сравнения вернут TRUE, то ALL вернет TRUE:

````sql 
SELECT * FROM dbo.TestTable
   WHERE CategoryID = 1 
     AND Price > ALL (SELECT Price 
                         FROM dbo.TestTable 
                         WHERE CategoryID = 2)
````

## IF 

Классический if, но без else:

````sql
SELECT id, price,
    IF(price >= 150, "Комфорт-класс", "Эконом-класс") AS category
    FROM Rooms
````

Вложенный IF:

````sql
SELECT id, price,
    IF(price >= 200, "Бизнес-класс",
        IF(price >= 150,
            "Комфорт-класс", "Эконом-класс")) AS category
    FROM Rooms
````

## CASE

Классический CASE 

````sql
CASE <проверяемое выражение>
   WHEN <сравниваемое выражение 1>
   THEN <возвращаемое значение 1>
   …
   WHEN <сравниваемое выражение N>
   THEN <возвращаемое значение N>
[ELSE <возвращаемое значение>]
END
````

2-я форма этого выражения

````sql
CASE
   WHEN <предикат 1>
   THEN <возвращаемое значение 1>
   …
   WHEN <предикат N>
   THEN <возвращаемое значение N>
[ELSE <возвращаемое значение>]
END
````

Пример:

````sql 
SELECT ProductNumber,
    Category = CASE ProductLine
        WHEN 'R' THEN 'Road'
        WHEN 'M' THEN 'Mountain'
        WHEN 'T' THEN 'Touring'
        WHEN 'S' THEN 'Other sale items'
        ELSE 'Not for sale'
        END,
    Name
FROM Production.Product
ORDER BY ProductNumber;
````

## WITH 

Временный набор данных, к которым могут обращаться следующие запросы. Очень удобненько:

````sql 
WITH название_cte [(столбец_1 [, столбец_2 ] …)] AS (подзапрос)
    [, название_cte [(столбец_1 [, столбец_2 ] …)] AS (подзапрос)] …
````

Пример:

````sql
WITH Aeroflot_trips (aeroflot_plane, town_from, town_to) AS
    (SELECT plane, town_from, town_to FROM Company
        INNER JOIN Trip ON Trip.company = Company.id WHERE name = "Aeroflot")

SELECT * FROM Aeroflot_trips;
````
