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

## Разработка скрипта с параметрами

Для работа с параметрами переданными из командной строки, нужно их получить:

````js 
process.argv
````

Если вызвать например так:

````bash 
node ./test.js 1 vasiliivanovich -h
````

То process.argv вернет:

````js 
['C://Syste.../node.exe', 'C://Syste.../test.js', '1', 'vasiliivanovich', '-h']
````

Чтобы узнать, запустили скрипт из консоли или он импортирован:

````js 
if(require.main === 'module') {
    console.log('Console');
} else {
    coonsole.log('Required');
}
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

