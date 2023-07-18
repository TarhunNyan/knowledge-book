# VideoEditing

# Настраиваем рабочее пространство

## Открываем workspace

В header:

````bash 
> File | > New         |   ...
       |   Open...     |   Sculpting  
       |   Open recent |   VFX 
       |   ...         | > Video Editing
````

Через поиск:

````bash 
Video Editing
````

## Настройка Output - Format

````bash
Areas -> Properties |   Tool   | > Format
                    |   Render |   Frame Range
                    | > Output |   Stereoscopy
                    |   ...    |   ...
````

Настройка разрешения
- ResolutionX, ResolutionY
- % - уменьшит область рендера с сохранением пропорций. Обычного используется для тестового рендера

Настройка ФПС:
- Frame Rate - указываем FPS

## Настройка Output - Frame Range

````bash
Areas -> Properties |   Tool   |   Format
                    |   Render | > Frame Range
                    | > Output |   Stereoscopy
                    |   ...    |   ...
````

Настройка временной области рендера:
- Frame Start, Frame End - начальный и конечный фрейм для рендера. Можно записать в стиле 10\*24\*60, Blender сам посчитает сколько это кадров

## Настройка Output - Output

````bash
Areas -> Properties |   Tool   |   ...
                    |   Render |   Stereoscopy
                    | > Output | > Output
                    |   ...    |   ...
````

Настройка для output:
- Accept - путь к папке куда рендерим
- File Format - выбирай (FFmpegVideo), не обосрешся
- Color - выбор из (BW) черно-белое, и (RGB) цветное. Есть еще (RGBA), для активации нужно выбрать подходящий Video Codec

````bash
Areas -> Properties |   Tool   |   ...         |   Color Management
                    |   Render |   Stereoscopy | > Encoding
                    | > Output | > Output      |   ----------------
                    |   ...    |   ...         |
````

Настройка codec:
- Continer - выбирай (MPEG-4), это база, не обосрешся
- Video Codec - (H.264) это база. (PNG), (QT rle/QT Animtion) поддерживает прозрачность
- Audio Codec - (AAC) это база


# Уменьшаем тормознутость Preview

Дело в том, что пока ты редактируешь видео, оно обычно пипец как тормозит. Можно уменьшить число тормозов

## Подготавливаем Proxy

Заходим:

````bash
Areas -> Video Sequencer > Sequencer
````

Выбираем видеодорожку. В том же Areas, в настройках дорожки(панель справа) заходим в Proxy и ставим галку в Strip Proxy & Timecode

````bash
Areas -> Video Sequencer > Sequencer | /*Right Panel*/ |   Strip     |  > Strip Proxy & Timecode
                                                       |   Tool      |
                                                       |   Modifiers |
                                                       | > Proxy     |
````

В меню Strip Proxy & Timecode, настраиваем качество видео для preview:
- owerwrite - обновлять proxy или нет
- resolution - процент разрешения
- quality - качество видео

После нужно отрендерить Proxy. Для этого жмем:

````bash
Areas -> Video Sequencer > Sequencer | /*Right Panel*/ |   Strip     |  > Rebuild Proxy & Timecode Indices
                                                       |   Tool      |
                                                       |   Modifiers |
                                                       | > Proxy     |
````

## Выбираем отобржение Proxy в Preview

Заходим:

````bash
Areas -> Video Sequencer > Preview | /*Right Panel*/ |   Tool     | > View Settings
                                                     | > View     |   2D Cursor
                                                     |   Metadata |   ...
````

Настраиваем отображение Proxy:
- Proxy Render Size - выбираем размер отрендеренного Proxy
- Use Proxy - ставим галочку, должна сработать какая-то оптимизация

# Удобные штучки

## Быстрая установка начала и конца Farme Range

Почти во всех Workspace'ах внизу есть Areas -> Timeline. Используй его чтобы установить начало и конец рендера по текущему Frame:

````bash
Areas -> Timeline | /*Top Panel*/ | > Payback | > Set Start Frame
                                              | > Set End Frame
````

## Отображение аудио-дорожек

Чтобы отобразить форму звуковой дорожки в Sequebcer надо зайти:

````bash
Areas -> Video Sequencer > Sequencer | /*Right Panel*/ | > Strip     | > Sound
                                                       |   Tool      |   Time
                                                       |   Modifiers |   Source
                                                       |   Proxy     |   ...
````

Настраиваем отображение аудио-дорожки:
- Display Waveforn - ставим галочку

## Marker(пометки)

Добавить Marker

````bash
Areas -> Video Sequencer > Sequencer | /*Top Panel*/ |   View   | > Add Marker
                                                     |   Select |   Duplcate marker
                                                     | > Marker |   Duplicate Marker to Scene
                                                     |   ...    |   ...
````

В той же менюшке можно:
- Rename Marker - переименовать маркер
- Jump to next/previous Marker - перейти к след/пред маркеру
- Lock Marker - залочить маркер чтобы не двигался
- Sync Marker - перемещает маркер вмесет с перемещением ЛЮБОЙ дорожки

## Запись экрана в Windows

win + alt + r


## Создание маски для видео
[CreateMask]: #создание-маски-для-видео

Открываем Areas для создания маски

````bash
Areas -> Movie Clip Editor | /*Top Panel*/ |   Tracking   |
                                           | > Mask       |
````

Открываем видео поверх которого рисуем маску

````bash
Areas -> Movie Clip Editor | /*Top Panel*/ | > Open   |
````

Создаем новую маску

````bash
Areas -> Movie Clip Editor | /*Top Panel*/ | > New   |
````

Рисуем маску:
- через аналог кривых Безье, для этого жмем CTRL + lmouse
- через SHIFT + A рисуем кругами и квадратами

Анимируем маску. По класике расставляем точки, выбираем фрейм, жмем I

## Устанавливаем маску для видео
[SetMask]: #устанавливаем-маску-для-видео

Сначало нужно [создать маску][CreateMask]

Открываем Areas для создания работы с видео

````bash
Areas -> Video Sequencer -> Sequencer
````

Добавляем(SHIFT + A) видео strip

````bash
Areas -> Video Sequencer > Sequencer | /*Top Panel*/ |   ...    |   ...    |
                                                     |   Marker |   Mask   |
                                                     | > Add    | > Movie  |
                                                     |   Strip  |   Sound  |
                                                     |   ...    |   ...    |
````

Над видео(на слой выше) добавляем(SHIFT + A) Adjustment Layer

````bash
Areas -> Video Sequencer > Sequencer | /*Top Panel*/ |   ...    |   ...              |
                                                     |   Marker |   Text             |
                                                     | > Add    | > Adjustment Layer |
                                                     |   Strip  |   Effect Strip     |
                                                     |   ...    |   ...              |
````

Выбираем модификатор маски

````bash
Areas -> Video Sequencer > Sequencer | /*Right Panel*/ |   Strip     | > Modifiers | > Add Strip Modifier -> Mask |
                                                       |   Tool      |
                                                       | > Modifiers |
                                                       |   Proxy     |
````

Выбираем маску

````bash
Areas -> Video Sequencer > Sequencer | /*Right Panel*/ | > Mask | > Mask Input Type |   Strip |
                                                      |                   | > Mask  |
````

В открывшемся меню выбираем конкретную маску

````bash
Areas -> Video Sequencer > Sequencer | /*Right Panel*/ |   Strip     | > Mask |   Mask Mask Input Type |
                                                       |   Tool      |        | > Mask                 |
                                                       | > Modifiers |        |   Mask Time            |
                                                       |   Proxy     |
````

## Создаем эффект заблюренного лица

Сначало нужно [создать маску][CreateMask]

Потом [устанавливаем маску][SetMask]

Выбираем подходящий метод наложения. Это нужно чтобы не дублировать видео

````bash
Areas -> Video Sequencer > Sequencer | /*Right Panel*/ | > Strip     | > Compositing | > Blend -> Alpha Over |
                                                       |   Tool      |   ...         |   Opacity             |
                                                       |   Modifiers |
                                                       |   ...       |
````                                                   

Над Adjustment Layer(на слой выше) добавляем(SHIFT + A) Gaussian Blur

````bash
Areas -> Video Sequencer > Sequencer | /*Top Panel*/ |   ...    |   ...              |   ...           |
                                                     |   Marker |   Text             |   Glow          |
                                                     | > Add    |   Adjustment Layer | > Gaussian Blur |
                                                     |   Strip  | > Effect Strip     |   ------------- |
                                                     |   ...    |   ...              |
````

Настраиваем радиусы размытия для Gaussian Blur 

````bash
Areas -> Video Sequencer > Sequencer | /*Right Panel*/ | > Strip     | > Effect Strip | 
                                                       |   Tool      |   Compositing  | 
                                                       |   Modifiers |   ...          | 
                                                       |   ...       |     
                                                          ...              
````

