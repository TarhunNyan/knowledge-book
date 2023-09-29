# Коротко про Branch

[aboutBranch]: #коротко-про-branch

В GIT используется понятие веток. Ветки, это разные версии программы, развиваемые паралельно

После эти изменения можно совместить(merge), чтобы получить финальную версию со всеми внесенными изменениями

# Устройство веток

Например у на с есть две ветки, master и feature:

```bash
                                        master
                                           v
[20c4] -> [1913] -> [54a4] -> [2fad] -> [4594]
                           -> [2702] -> [2c11]
                                           ^
                                        feature
```

В коммандах git используются особые наименования:

-   HEAD - то в каком коммте мы сейчас нахожимся
-   ours - версия в которую объединяем
-   theirs - версия из которой объединяем
-   base - место в котором ветки разъединились

Например:

```bash
                                        master
                     base              HEAD/ours
                      v                    v
[20c4] -> [1913] -> [54a4] -> [2fad] -> [4594]
                           -> [2702] -> [2c11]
                                           ^
                                         theirs
                                        feature
```

# Обычный процесс работы

[usualProccess]: #обычный-процесс-работы

## Создаем ветку

Создаем ветку из текущего коммита:

```bash
git branch another_branch
```

Создаем ветку из указанного коммита:

```bash
git branch another_branch
```

## Удаляем ветку

```bash
git branch -D another_branch
```

## Список веток

```bash
git branch
>> * master
>>   another_branch
```

## Переключаемся на другую ветку

Изменит содержимое проекта на то, которое в выбранной ветке

```bash
git checkout another_branch
```

## Добавляем ветку в удаленный репозиторий

Пушим в репозиторий origin, в ветку another_branch

```bash
git push origin another_branch
```

То же что и команда выше, но --set-upstream запоминает и при следующем пуше достаточно прописать просто git push

```bash
git push -u origin another_branch
git push --set-upstream origin another_branch
```

## Объединяем текущую ветку с указанной

```bash
git merge another_branch
```

## Конфликты

При объединении git модифицирует файлы, в местах конфликта. Офорляются они так:

```bash
<<<<<<< HEAD

sayBye();

=======

work();

>>>>>>> feature
```

Иногда очевидно что нужен файл из ours, тогда:

```bash
git checkout --ours index.html
```

Иногда очевидно что нужен файл из theirs, тогда:

```bash
git checkout --theirs index.html
```

Вернуть версию файла который merhg'им:

```bash
git checkout --merge index.html
```

Отменяем merge:

```bash
git reset --merge
```

По разрешению конфликтов, нужно добавить файлы в отслеживание и закомитить:

```bash
git add .
git commit -m 'Message'
```
