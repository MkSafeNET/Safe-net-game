# Protocol Cyber

---

<!-- TOC -->
* [Protocol Cyber](#protocol-cyber)
  * [Македонски](#македонски)
    * [Изработена од](#изработена-од)
    * [Линкови за играта](#линкови-за-играта)
    * [Опис](#опис)
      * [Прв дел: Обука на антивирусот](#прв-дел-обука-на-антивирусот)
      * [Втор дел: Корекција и дополнителна обука](#втор-дел-корекција-и-дополнителна-обука)
      * [Трет дел: Акција](#трет-дел-акција)
      * [Победа и пораз](#победа-и-пораз)
      * [Технологии](#технологии)
    * [Технички опис](#технички-опис)
      * [Целосна структура на проектот](#целосна-структура-на-проектот)
      * [Детали за датотеките](#детали-за-датотеките)
    * [Авторски права и лиценца](#авторски-права-и-лиценца)
  * [English](#english)
    * [Developed by](#developed-by)
    * [Game Links](#game-links)
    * [Description](#description)
      * [Part One: Antivirus Training](#part-one-antivirus-training)
      * [Part Two: Correction and Additional Training](#part-two-correction-and-additional-training)
      * [Part Three: Action](#part-three-action)
      * [Victory and Defeat](#victory-and-defeat)
      * [Technologies](#technologies)
    * [Technical Description](#technical-description)
      * [Full Project Structure](#full-project-structure)
      * [File Details](#file-details)
    * [Copyright and License](#copyright-and-license)
<!-- TOC -->

---

## Македонски

Protocol Cyber е игра во која системот има антивирус што не е целосно истрениран. Тој постои, но не знае доволно добро
што е опасно, а што е безбедно. Затоа му е потребен човек – играчот – кој
ќе му помогне да научи.

---

### Изработена од

Тим `Denno`:

- [Бојана Јованчева](https://github.com/bjovanceva) (221059)
- [Љупчо Јованов](https://github.com/ljupce99) (221277)
- [Љупчо Ангеловски](https://github.com/Ljupce003) (221563)

---

### Линкови за играта

- [Линк](https://drive.google.com/file/d/1jXGAJfMcltlXu7q3zHz7Jvw-FplvpLnv/view) за видеото со илустрација на играње;
- [Линк](https://bjovanceva.github.io/Safe-net-game/) до хостираната игра;

---

### Опис

#### Прв дел: Обука на антивирусот

Во првиот дел, играчот го тренира антивирусот. Со секој избор помеѓу безбедни и небезбедни лозинки или ситуации, играчот
му покажува на антивирусот што треба да смета за закана. Тајмерот
претставува активен напад во тек, при што антивирусот мора брзо да учи. Еден успешен круг значи дека антивирусот научил
нешто, но сè уште не е доволно сигурен. Затоа се потребни три успешни
круга за да се смета дека антивирусот е доволно обучен.

#### Втор дел: Корекција и дополнителна обука

Ако играчот направи премногу грешки во првиот дел, тоа значи дека антивирусот научил погрешни работи и некои закани ги
смета за безбедни. Наместо играта веднаш да заврши, системот преминува
во вториот дел за дополнителна обука. Во вториот дел, играчот го коригира и дотренира антивирусот. Прашањата
претставуваат дополнителна анализа и објаснување на грешките што биле направени. Ако
играчот ги одговори барем 4 прашања точно, антивирусот е целосно истрениран и подготвен за акција. Ако дел(2 или 3
точни) од одговорите се
точни, антивирусот е подобрен, но сè уште му е потребна дополнителна
практична обука, па играчот се враќа во првиот дел. Ако повеќето одговори се неточни(максимум 0,1 или 2 точни),
антивирусот останува несигурен и
системот не може да се спаси.

#### Трет дел: Акција

Кога антивирусот е доволно истрениран, започнува третиот дел. Тука играчот повеќе не го учи антивирусот, туку го води.
Објектот што се движи низ нивото претставува самиот антивирус кој се движи
низ фајлови и делови од системот. Препреките се заразени или оштетени делови што мора да се избегнат, а целта е
инфицираниот дел од системот што треба да се исчисти. Секое ниво претставува
различен дел од системот.

#### Победа и пораз

Ако играчот успешно ги помине сите нивоа, антивирусот целосно го уништува вирусот и системот е безбеден. Ако не успее,
тоа значи дека антивирусот е оштетен и вирусот повторно се проширил, поради
што процесот мора да започне од почеток. На овој начин играта следи јасна логика: прво го учиш антивирусот што е опасно,
потоа ги коригираш неговите грешки, и на крај му помагаш да ја примени таа
обука за целосно да го исчисти системот.

#### Технологии

Играта е изработена во JavaScript,CSS и HTML, со користење на `<canvas>` таг и `Canvas API`.

---

### Технички опис

#### Целосна структура на проектот

```
.
├── index.html              # Главна HTML датотека, дефинира canvas елементи и ги поврзува ресурсите
├── style.css               # Глобален стил и визуелна тема на играта
├── game.js                 # Главна логика на играта, управување со состојби и текот на играта
├── 2d_game.js              # Canvas исцртување и gameplay логика за третиот дел (акција)
├── resizeMiniGame.js       # Скалирање и адаптација на canvas елементот на третиот дел за различни резолуции
├── minigame_levels.js      # Дефиниција на нивоа и пречки за мини-играта (третиот дел)
│
├── data/                   # Податоци за обука, прашања и UI текст
│   ├── questions.js        # Прашања за обука и корекција на антивирусот
│   ├── weak_passwords.js   # Листа на најчесто користени небезбедни лозинки
│   ├── help_text.js        # Помошни и едукативни текстови
│   ├── ui_text.js          # UI пораки достапни на повеќе јазици
│   ├── images_description.js # Опис и метаподатоци за користените слики
│   └── languages.js        # Дефинирање на поддржаните јазици
│
├── images/                 # Графички ресурси
│   ├── file_images/
│   │   ├── clean.png
│   │   ├── corrupted.png
│   │   └── Desktop_IMG.jpg
│   │
│   ├── safe/
│   │   ├── good1_final.jpg
│   │   ├── good2_final.jpg
│   │   ├── good3_final.jpg
│   │   └── ...
│   │
│   └── unsafe/
│       ├── bad1_final.jpg
│       ├── bad2_final.jpg
│       ├── bad3_final.jpg
│       └── ...
```

#### Детали за датотеките

Главната логика на играта е имплементирана во следните датотеки:

* **`game.js`** – централна скрипта на играта. Во неа се дефинирани константи, се контролира состојбата на играта, се
  управува текот меѓу деловите и се повикува логиката за започнување на **третиот дел (мини-играта)**, која е
  имплементирана во `2d_game.js`.

* **`2d_game.js`** – целата логика за третиот дел е организирана во функцијата `Game2D`. Во неа се дефинира состојбата
  на мини-играта, се врши исцртување преку Canvas API, се управува промената на состојбите и се вчитуваат нивоата
  дефинирани во `minigame_levels.js`.

Останатите датотеки служат како помошни модули и податочни извори:

* **`questions.js`** – листа со прашања кои се користат во **вториот дел** на играта (корекција и дополнителна обука),
  достапни на повеќе јазици.
* **`weak_passwords.js`** – листа на најчесто користени и небезбедни лозинки.
* **`help_text.js`** – текст што се прикажува во помошниот екран, со поддршка за повеќе јазици.
* **`ui_text.js`** – сите UI текстуални елементи што се користат низ играта, организирани по јазици.
* **`images_description.js`** – опис и контекст за користените слики, со цел подобро разбирање на нивната намена.
* **`languages.js`** – дефинирање на поддржаните јазици во играта.
* **`resizeMiniGame.js`** – функција за правилно скалирање и исцртување на вториот `<canvas>` елемент, кој се користи за
  **третиот дел (мини-играта)**.
* **`minigame_levels.js`** – дефиниција на сите нивоа од **третиот дел**, претставени како матрици, заедно со
  дополнителни помошни функции.

Сликите `good1_final.jpg`, `good2_final.jpg`, … и `bad1_final.jpg`, `bad2_final.jpg`, … се користат во **првиот дел на
играта** и претставуваат визуелни примери на безбедни и небезбедни ситуации кои играчот треба да ги препознае при
обуката на антивирусот.

Сликите во директориумот `file_images` се користат за прикажување на **Desktop екранот** во **третиот дел на играта**,
каде визуелно се прикажува прогресот на играчот преку поминатите и завршени нивоа.

### Авторски права и лиценца

Третиот дел од играта (мини-играта за акција), имплементиран во датотеките `2d_game.js` и `minigame_levels.js`, е
базиран на
код со следната лиценца:

```text
Copyright (c) 2013 dissimulate at codepen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

---

## English

Protocol Cyber is a game where the system's antivirus is not fully trained. It exists, but it doesn't know well enough
what is dangerous and what is safe. Therefore, it needs a human—the player—to help it learn.

---

### Developed by

Team `Denno`:

* [Bojana Jovancheva](https://github.com/bjovanceva) (221059)
* [Ljupcho Jovanov](https://github.com/ljupce99) (221277)
* [Ljupcho Angelovski](https://github.com/Ljupce003) (221563)

---

### Game Links

* [Link](https://drive.google.com/file/d/1jXGAJfMcltlXu7q3zHz7Jvw-FplvpLnv/view) to the gameplay illustration video;
* [Link](https://bjovanceva.github.io/Safe-net-game/) to the hosted game;

---

### Description

#### Part One: Antivirus Training

In the first part, the player trains the antivirus. With every choice between safe and unsafe passwords or situations,
the player shows the antivirus what should be considered a threat. The timer represents an active attack in progress,
during which the antivirus must learn quickly. One successful round means the antivirus has learned something but is not
yet certain enough. Therefore, three successful rounds are required for the antivirus to be considered sufficiently
trained.

#### Part Two: Correction and Additional Training

If the player makes too many mistakes in the first part, it means the antivirus has learned the wrong things and
considers some threats to be safe. Instead of the game ending immediately, the system moves to the second part for
additional training. In the second part, the player corrects and further trains the antivirus. The questions represent
additional analysis and explanation of the mistakes made. If the player answers at least 4 questions correctly, the
antivirus is fully trained and ready for action. If some (2 or 3) answers are correct, the antivirus is improved but
still needs additional practical training, so the player returns to the first part. If most answers are incorrect (
maximum 0, 1, or 2 correct), the antivirus remains unreliable, and the system cannot be saved.

#### Part Three: Action

Once the antivirus is sufficiently trained, the third part begins. Here, the player no longer teaches the antivirus but
guides it. The object moving through the level represents the antivirus itself moving through files and system
components. Obstacles are infected or damaged parts that must be avoided, and the goal is the infected part of the
system that needs to be cleaned. Each level represents a different part of the system.

#### Victory and Defeat

If the player successfully passes all levels, the antivirus completely destroys the virus, and the system is safe. If
they fail, it means the antivirus is damaged and the virus has spread again, requiring the process to start from the
beginning. In this way, the game follows a clear logic: first, you teach the antivirus what is dangerous, then you
correct its mistakes, and finally, you help it apply that training to fully clean the system.

#### Technologies

The game is developed using JavaScript, CSS, and HTML, utilizing the `<canvas>` tag and the `Canvas API`.

---

### Technical Description

#### Full Project Structure

```
.
├── index.html              # Main HTML file, defines canvas elements and links resources
├── style.css               # Global styling and visual theme of the game
├── game.js                 # Main game logic, state management, and game flow
├── 2d_game.js              # Canvas rendering and gameplay logic for the third part (action)
├── resizeMiniGame.js       # Scaling and adaptation of the third-part canvas element for different resolutions
├── minigame_levels.js      # Definition of levels and obstacles for the mini-game (third part)
│
├── data/                   # Training data, questions, and UI text
│   ├── questions.js        # Questions for antivirus training and correction
│   ├── weak_passwords.js   # List of commonly used unsafe passwords
│   ├── help_text.js        # Help and educational texts
│   ├── ui_text.js          # UI messages available in multiple languages
│   ├── images_description.js # Descriptions and metadata for the images used
│   └── languages.js        # Definition of supported languages
│
├── images/                 # Graphical resources
│   ├── file_images/
│   │   ├── clean.png
│   │   ├── corrupted.png
│   │   └── Desktop_IMG.jpg
│   │
│   ├── safe/
│   │   ├── good1_final.jpg
│   │   ├── good2_final.jpg
│   │   ├── good3_final.jpg
│   │   └── ...
│   │
│   └── unsafe/
│       ├── bad1_final.jpg
│       ├── bad2_final.jpg
│       ├── bad3_final.jpg
│       └── ...

```

#### File Details

The main game logic is implemented in the following files:

* **`game.js`** – The central game script. It defines constants, controls the game state, manages the flow between
  parts, and calls the logic to start the **third part (mini-game)**, which is implemented in `2d_game.js`.
* **`2d_game.js`** – All logic for the third part is organized within the `Game2D` function. It defines the state of the
  mini-game, handles rendering via the Canvas API, manages state transitions, and loads the levels defined in
  `minigame_levels.js`.

The remaining files serve as helper modules and data sources:

* **`questions.js`** – A list of questions used in the **second part** of the game (correction and additional training),
  available in multiple languages.
* **`weak_passwords.js`** – A list of commonly used and unsafe passwords.
* **`help_text.js`** – Text displayed on the help screen, with multi-language support.
* **`ui_text.js`** – All UI text elements used throughout the game, organized by language.
* **`images_description.js`** – Descriptions and context for the images used to better understand their purpose.
* **`languages.js`** – Definition of the languages supported in the game.
* **`resizeMiniGame.js`** – A function for proper scaling and rendering of the second `<canvas>` element used for the *
  *third part (mini-game)**.
* **`minigame_levels.js`** – Definition of all levels in the **third part**, represented as matrices, along with
  additional helper functions.

The images `good1_final.jpg`, `good2_final.jpg`, ... and `bad1_final.jpg`, `bad2_final.jpg`, ... are used in the **first
part of the game** and represent visual examples of safe and unsafe situations that the player must recognize during
antivirus training.

Images in the `file_images` directory are used to display the **Desktop screen** in the **third part of the game**,
visually showing the player's progress through passed and completed levels.

### Copyright and License

The third part of the game (the action mini-game), implemented in the files `2d_game.js` and `minigame_levels.js`, is
based on code with the following license:

```text
Copyright (c) 2013 dissimulate at codepen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

```

---
