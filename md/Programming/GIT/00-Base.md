# Обычный процесс работы
[usualProccess]: #обычный-процесс-работы

Основной процесс работы с git выглядит так:
````bash
git pull
git status
git add .
git commit --amend --no-edit
git commit -m "message"
git push
````

[Пояснения][ex_usualProccess]

# Настройка config GIT
[configGIT]: #настройка-config-GIT

Настройки идут каскадом. Сначало глобальные, а потом вглубь по файловой структуре. Для каждого репозитория можно сделать свои настройки

````bash
git config --global user.name "CatOnDrugs"
git config --global user.email "stepanov_grigorii99@mail"
````

Устанавливаем имя и имейл. С их помощью можно войти по https протоколу

````bash
git config user.name
git config user.email
````

[Пояснения][ex_cloneRemote]

# Работа с GIT по SSH
[gitSSH]: #работа-с-git-по-ssh

Генерируем ключ SSH на устройстве:
````bash
ssh-keygen
````
Копируем из файла id_rsa.pub значение

Открываем GitHub -> Users -> SSH and GPG keys -> New SSH key -> Вводим название и вставляем SSH в Key -> Add SSH Key

В репозитории GitHub выбираем не HTTP, а SSH сылку. SSH ссылка выглядит так:

````bush
git@github.com:<user-name>/<repository-name>.git
````

В остальном ничем не отличается от создания по http:
- [Создание GIT клонированием с GitHub][cloneRemote]
- [Создание GIT локально, с загрузкой на GitHub][gitLocal]

Поменять GIT на SSH и наоборот
========
[changeRemoteType]: #работа-с-git-по-ssh

Меняем ссылку связывающую текущую ветку и репозиторий. Команды:
1. Позволяет посмотреть какая сейчас ссылка
1. Заменяет ссылку

````bash
git remote -v
>> https://github.com/CatOnDrugs/shandlebars-cli.git (fetch)
>> https://github.com/CatOnDrugs/shandlebars-cli.git (push)
git remote set-url origin git@github.com:CatOnDrugs/shandlebars-cli.git
````

# Создание GIT

Сначало нужно [настроить config][configGIT]

## Клонирование с GitHub
[cloneRemote]: #клонирование-с-github

````bash
git clone https://github.com/CatOnDrugs/shandlebars-cli.git
git remote add origin https://gith...ars-cli.git
git push -u origin master
````
[Пояснение][ex_cloneRemote]
## Локально с загрузкой на GitHub
[gitLocal]: #локально-с-загрузкой-на-github

````bash
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/<user_name>/<project_name>.git
````

[Пояснение][ex_gitLocal]

# Пояснение
## Обычный процесс работы 
[ex_usualProccess]: #обычный-процесс-работы

[(обратно)][usualProccess]
С этого ВСЕГДА надо начинать. Скачать изменения с удаленного репозитория

````bash
git pull
````

Получить статус локальных изменений
1. Вариант - длинный
1. Вариант - короткий

````bash
git status
git status -s - статус файлов сокращенно
````

Добавляем все файлы и папки текущей дериктории в __staged__ (этап)

````bash
git add .
````

Делаем коммит
1. Вариант - оставляем сообщение
1. Вариант - открывает редактор для текста commita
1. Вариант - просто делаем коммит без записей (???)
````bash
git commit -m "message"
git commit
git commit --amend --no-edit
````

Все отправляем на удаленный сервер
````bash
git push - все закинуть на github
````

## Создание GIT клонированием с GitHub
[ex_cloneRemote]: #создание-git-клонированием-с-github

[(обратно)][cloneRemote] Делаем клонирование
1. В перовм случае имя папки будет как на GitHub
1. Во втором случае имя папки будет какое напишешь

````bash
git clone https://github.com/CatOnDrugs/shandlebars-cli.git
git clone https://...rs-cli.git ./05-shandler-cli
````

Связываем origin(основная ветка) и удаленный репозиторий
````bash
git remote add origin https://gith...ars-cli.git
````

Команла отправляет закомиченные файлы в репозиторий. Поскольку это делается впервые, необходимо указать ветку. Чтобы в дальнейшем сервер знал куда вы отправляете коммиты
````bash
git push -u origin master
````

## Создание GIT локально с загрузкой на GitHub
[ex_gitLocal]: #создание-git-локально-с-загрузкой-на-github

[(обратно)][gitLocal]
Создаем в папке папку .git с файлами для GIT'а

````bash
git init
````

Добавляем все файлы и папки текущей дериктории в __staged__ (этап)

````bash
git add .
````

Делаем коммит. Файлы и папки из __staged__ переводим в __unmodified__ (немодифицированный). Задаем заголовок

````bash
git commit -m "first commit"
````

Связываем origin(основная ветка) и удаленный репозиторий

````bash
git remote add origin https://github.com/<user_name>/<project_name>.git
````

Отправляем данные на удаленный сервер

````bash
git push -u origin master
````
