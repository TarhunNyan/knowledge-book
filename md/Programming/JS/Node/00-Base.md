# Node комманды

$x=10 \cdot \pi=\frac{1}{2}$  


$$\begin{array}{c}

\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} &
= \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\

\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\

\nabla \cdot \vec{\mathbf{B}} & = 0

\end{array}$$

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M30,1h40l29,29v40l-29,29h-40l-29-29v-40z" stroke="#000" fill="none"/> 
    <path d="M31,3h38l28,28v38l-28,28h-38l-28-28v-38z" fill="#a23"/>
    <foreignobject font-size="7pt" x="0" y="0" width="100" height="100">
        $\frac{10}{20}$
    </foreignobject>
</svg>

Версия ноды. Обычно ей проверяют установлена ли она вообще

````bash
node -v
````

Запускает js внутри терминала. Чтобы выйти из ноды: .exit

````bash
node
````

## Запуск кода из файла

Запускает js файл

````bash
node <file_path>
````

## Запуск debugger

Запускает js файл на debugging

````bash
node inspect <file_path>
````

# NPM(Node Package Manager)

Идет с node по умолчанию. Организует модули проекта. Устанавливает нужные и следит за версиями модулей

# package.json

package.json - JSON файл с настройками node_module. 

## package.json - scripts

Можно определить cli команды для текущего проекта:

````json
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
````

После их можно вызывать используя:

````bash
npm run build
````

# Команды NPM

Версия ноды. Просто проверить установлен ли вообще:

````bash
npm -v - 
````

Создает файл package.json в папке. Этот файл, говорит node, что в этой папке модуль. Содержит описание модуля:

````bash
npm init
````

## NPM install

Установить все зависимости из package.json. Создает node_modules:

````bash
npm install
````

Установить модуль + автоматически добавиться в dependencies. Так же создает папку node_modules, куда кидает установленные модули

````bash
npm install <package-name>
````

Установить модуль глобально. То бишь его можно будет вызвать из консоли(очень удобненько + экономит место)

````bash
npm install <package-name> -g
````

## NPM --save | --save-dev | --save-optional ...

В командах, при установке и удалении пакетов можно видеть всякие дополнительные опции. Они указывают к какой группе(зависимость/разработка/опционально/продукт) отнести устанавливаемую зависимость:

````json
// package.josn
{
    ...,
    "dependencies": {
        "markdown-it": "^13.0.1",
        ...
    },
    "dev-dependencies": {
        "handlebars": "^13.0.1",
        ...
    }
    ...
}
````

Добавить зависимость в список dependencies. Можно не прописывать так как npm при установке модуля делает это по умолчанию:

````bash
npm install <pkg_name> --save
npm install <pkg_name> -S
````bash

Добавить зависимость в список dev-dependencies:

````bash
npm install <pkg_name> --save-dev
npm install <pkg_name> -D
````

Добавить зависимость в список optionalDependencies:

````bash
npm install <pkg_name> --save-optional
npm install <pkg_name> -O
````

Никуда не записывает

````bash
npm install <pkg_name> --no-save
````

## NPM полезные команды

Список модулкй из ./node_modules:
- в локальном локальном пространстве
- в глобальном пространстве

````bash
npm list
npm list -g
````

Путь до папки node_modules:
- в текущем модуле
- в глобальном модуле

````bash
npm root
npm root -g
````
