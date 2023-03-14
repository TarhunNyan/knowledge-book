# Коротко про Branch
[aboutBranch]: #коротко-про-branch

В GIT используется понятие веток. Ветки, это разные версии программы, развиваемые паралельно

После эти изменения можно совместить(merge), чтобы получить финальную версию со всеми внесенными изменениями

# Обычный процесс работы
[usualProccess]: #обычный-процесс-работы

## Создаем ветку

````bash
git branch another_branch
````

## Удаляем ветку

````bash
git branch -D another_branch
````

## Список веток

````bash
git branch
>> * master
>>   another_branch
````

## Переключаемся на другую ветку

Изменит содержимое проекта на то, которое в выбранной ветке

````bash
git checkout another_branch
````

## Добавляем ветку в удаленный репозиторий

Пушим в репозиторий origin, в ветку another_branch

````bash
git push origin another_branch
````

То же что и команда выше, но --set-upstream запоминает и при следующем пуше достаточно прописать просто git push

````bash
git push -u origin another_branch
git push --set-upstream origin another_branch
````

## Объединяем текущую ветку с указанной

````bash
git merge another_branch
````
