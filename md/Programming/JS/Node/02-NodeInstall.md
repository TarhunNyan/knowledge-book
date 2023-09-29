# Установка модулей в Node

Для установки модулей используют npm. Идет с node по умолчанию. Организует модули проекта. Устанавливает нужные и следит за версиями модулей. Устанавливает все в node_modules

## Используя: npm

Модули которые лежат на npm можно установить так:

```bash
npm install module_name
```

## Используя: github

Модули которые лежат на github можно установить так:

```bash
npm install git+https://github.com/<user_name>/<project_name>.git
```

Или по SSH:

```bash
npm install git+ssh://git@github.com/<user_name>/<project_name>.git
```

Установка из конкретно ветки:

```bash
npm install git+...git#<branch>
```

## Используя: locale

Можно установить прямо из локаьной директории

```bash
npm install /path
```

## npm install: global

Есть несколько важных флагов. Позволяющих установить пакет глобально. После чего его можно будет запускать из любой папки без npm:

```bash
npm install <package_name> -g

<package_name> <cmd_name> <cmd_params>
```

## npm install: save

Добавить зависимость в список dependencies. Можно не прописывать так как npm при установке модуля делает это по умолчанию:

```bash
npm install <pkg_name> --save
npm install <pkg_name> -S
```

В package.json, появляется запись в dependencies:

```json
{
    ...,
    "dependencies": {
        "markdown-it": "^13.0.1",
        ...
    },
    ...,
}
```

## npm install: save-dev

Добавить зависимость в список devDependencies:

```bash
npm install <pkg_name> --save
npm install <pkg_name> -S
```

В package.json, появляется запись в devDependencies:

```json
{
    ...,
    "devDependencies": {
        "markdown-it": "^13.0.1",
        ...
    },
    ...,
}
```

## npm install: save-optional

Добавить зависимость в список optionalDependencies:

```bash
npm install <pkg_name> --save
npm install <pkg_name> -S
```

В package.json, появляется запись в optionalDependencies:

```json
{
    ...,
    "optionalDependencies": {
        "markdown-it": "^13.0.1",
        ...
    },
    ...,
}
```

## npm install: save-optional

Никуда не записывать:

```bash
npm install <pkg_name> --no-save
```

# Обновить модуль

Обновить все модули

```bash
npm update
```

Обновить модуль

```bash
npm update <module_name>
```

# Удалить модуль

Удалить модуль

```bash
npm remove <module_name>
```

# Настройка npm модуля

Для создаваемых модулей есть файл настройки - package.json

## Создать package.json

Можно руками, а можно использовать cli комманду:

```bash
npm init
```

## Основные поля в package.json

Пример:

```json
{
    // имя проекта. Не должно пересекаться на npm с другими
    "name": "name_project",

    // при каждой публикации на npm версия должна отсличаться от существующей
    // рекомендации по ведению версии:
    // 1.0.0 - типа готова к использованию
    // +1.0.0 - глобальное обновление
    // +0.1.0 - новая фича
    // +0.0.1 - фикс багов
    "version": "0.0.2",

    // текстовое описание
    "description": "It is a description"

    // ключевые слова по которым на npm.org можно будет найти пакет
    "keywords": [
        "physic",
        "postfix"
    ]

    // домашняя страница, сайт проекта
    "homepage": "htps://site_name.org",

    // куда отправлять инфу по багам
    "bugs": {
        "url": "http://github.com/CatOnDrugs/name_project",
        "email": "name_project@gmail.com"
    }

    // лицензия, иногда кладут файл текстом лицензии в проект
    "license": "GPL v3",

    // автор
    "author": "CatOnDrugs",

    // точка входа в проект. Отсуда начинается запуск
    "main": "./index.js",

    // cli команды модуля. Смотри раздел: "Команды cli"
    "scripts": {}

    // зависимости проекта. Смотри раздел: "Установка модулей в Node"
    "dependencies": {}
}
```

## Команды cli

Команды которые можно вызвать из консоли:

```bash
npm run <cmd_name> <cmd_params>
```

Для вызова команд не проекта, а пакета лежащего в node_modules, служит npx:

```bash
npx <package_naem> <cmd_name>
```

Чтобы определить cli команду для текущего проекта нужно в package.json прописать:

```json
{
    ...
    "scripts": {
        "dev" : "webpack --mode development",
        "build": "webpack --mode production",
        "<command>": "<cli>",
        ...
    }
    ...
}
```

# Команды NPM

## Проверить версию

Версия ноды. Просто проверить установлен ли вообще:

```bash
npm -v
```

## Список модулей

Список модулей из ./node_modules в локальном локальном пространстве

```bash
npm list
```

Список модулей из ./node_modules в глобальном пространстве

```bash
npm list -g
```

## Путь до папки модулей

Путь до папки node_modules в текущем модуле

```bash
npm root
```

Путь до папки node_modules в глобальном модуле

```bash
npm root -g
```
