/**
 * Constant Definitions Here
 *
 * Од оваа линија надолу дефинирање на константи
 * */


import questions from "./data/questions.js"
import images_description from "./data/images_description.js";
import {WEAK_PASSWORDS} from "./data/weak_passwords.js"
import {GAME_LANGUAGES} from "./data/languages.js";
import {HELP_TEXT} from "./data/help_text.js";

import {Game2D} from "./2d_game.js";
import {resizeMiniGameCanvas} from "./resizeMiniGame.js";
import {UI_TEXT} from "./data/ui_text.js";

const startScreen = document.getElementById("start-screen")
const startBtn = document.getElementById("start-btn")
const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

const dpr = window.devicePixelRatio || 1

const SCORE_FONT_SIZE = 14
const PASSWORDS_FONT_SIZE = 22
const TOTAL_TIMER_FONT_SIZE = 18
const TIMER_RADIUS_SIZE = 20
const INFO_BUTTON_RADIUS_SIZE = 18
const INSTRUCTION_TEXT_FONT_SIZE = 20
const RETRY_BUTTON_TEXT_FONT_SIZE = 18
const GAME_OVER_TEXT_FONT_SIZE = 36

const BONUS_ROUND_HEADER_TEXT_FONT_SIZE = 26
const BONUS_ROUND_BODY_TEXT_FONT_SIZE = 20
const BONUS_ROUND_SCORE_TEXT_FONT_SIZE = 18


const INTRO_PHASE = "intro"
const PLAYING_PHASE = "playing"
const SUCCESS_PHASE = "success"
const RETRY_PROMPT_PHASE = "retryPrompt"
const BONUS_INTRO_PHASE = "bonusIntro";
const BONUS_ROUND_PHASE = "bonusRound"
const FINAL_GAME_OVER_PHASE = "finalGameOver"
const MINIGAME_INTRO_PHASE = "minigameIntro";
const DESKTOP_PREVIEW_PHASE = "desktop_preview";

let retryPromptScreensPerGame = 0


// const MINI_GAME_PHASE = "miniGame"

const MINIGAME_REASON = {
    TRAINING_COMPLETE: "trainingComplete",
    BONUS_PERFECT: "bonusPerfect",
};

const SYMBOLS = "!@#$%&*"

const PASSWORDS_MODE = "passwords"
const IMAGES_MODE = "images"

const LANG_LIST = [
    GAME_LANGUAGES.ENGLISH_LANGUAGE,
    GAME_LANGUAGES.MACEDONIAN_LANGUAGE,
    GAME_LANGUAGES.ALBANIAN_LANGUAGE
]

let langIndex = 1

export let CURRENT_GAME_LANGUAGE = LANG_LIST[langIndex]

let langButtonArea = {}

let mainRafId = null;
let isTouchActive = false;

let points = 0
let gameRunning = false
let passwordChoices = []
let currentImages = []
let roundTime = 5
let timeLeft = roundTime
let lastTime = Date.now()
let reallySafePasswords = []
let safePasswords = []
let notSafePasswords = []


let currentRoundMode = PASSWORDS_MODE

const GAME_DURATION = 20;
const PASSWORD_ROUND_DURATION = 5;
const IMAGE_ROUND_DURATION = 15;

const gameDuration = GAME_DURATION
let roundDuration = PASSWORD_ROUND_DURATION

let timeElapsed = 0
let gameEnded = false

let gamePhase = INTRO_PHASE // playing | success | retryPrompt | bonusRound | finalGameOver

let phaseTimer = 0


let bonusIndex = 0
let bonusScore = 0
let bonusActive = true

let bonusLocked = false;
let bonusTimeoutId = null;

let selectedOption = null

const MAX_SUCCESS_WAVES = 3
let successSequence = 0

const MAX_UNSAFE_CLICKS = 6
let unsafeClicks = 0

const WAVE_TARGET = 10;

let introButton = null

let bonusIntroButton = null;

let restartButton = null

let mouseData = null

let minigameReason = null;
let minigameIntroButton = null;

let bonusQuestions = [...questions[CURRENT_GAME_LANGUAGE]];

// Arrays to hold the successfully loaded image objects
const safeImages = []
const unsafeImages = []

// How many images to try loading (e.g., checks good1_final up to good20_final)
const MAX_IMAGES_TO_CHECK_GOOD = 20
const MAX_IMAGES_TO_CHECK_BAD = 20


export const images = {
    desktopBg: new Image(),
    cleanIcon: new Image(),
    uncleanIcon: new Image()
};

// const desktopBg = new Image();
// // desktopBg.src = "images/file_images/Desktop_IMG.jpg";
//
// const cleanIcon = new Image();
// // cleanIcon.src = "images/file_images/clean.png";
//
// const uncleanIcon = new Image();
// // uncleanIcon.src = "images/file_images/corrupted.png";


const {game: game, canvas: canvas2D, ctx: ctx2D, StartMiniGame} = Game2D(endMiniGame, CURRENT_GAME_LANGUAGE)

const info = {
    x: canvas.width - 40,
    y: 40,
    radius: 18,
    open: false,
    visible: true,
    text: HELP_TEXT[CURRENT_GAME_LANGUAGE]
}
const filesData = [
    {name: "reports", clean: false},
    {name: "images", clean: false},
    {name: "videos", clean: false},
    {name: "music", clean: false},
    {name: "notes", clean: false},
    {name: "backups", clean: false},
    {name: "system32", clean: false},
    {name: "data", clean: false},
    {name: "documents", clean: false},
    {name: "presentations", clean: false},
    {name: "archives", clean: false}
];

let desktopPreviewStartTime = null;
const DESKTOP_PREVIEW_DURATION = 3000; // 5 секунди


/**
 * TODO - Function Definition Logic Here
 *
 * Од оваа линија надолу дефинирање на функции
 * */

function cycleLanguage() {
    langIndex = (langIndex + 1) % LANG_LIST.length;
    // This is the variable your help text system relies on
    CURRENT_GAME_LANGUAGE = LANG_LIST[langIndex];

    bonusQuestions = questions[CURRENT_GAME_LANGUAGE]
    info.text = HELP_TEXT[CURRENT_GAME_LANGUAGE]

    safeImages.forEach(img => img.description = images_description[CURRENT_GAME_LANGUAGE][img.fileName])
    unsafeImages.forEach(img => img.description = images_description[CURRENT_GAME_LANGUAGE][img.fileName])

}

//Function that loads images and stores them in the arrays as 'Image' objects
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load: ${src}`));
        img.src = src;

        const key = src
            .split("/")
            .pop()
            .replace(".jpg", "");

        img.fileName = key
        img.description = images_description[CURRENT_GAME_LANGUAGE][key];
    });
}

function loadIntoImage(img, src) {
    return new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load: ${src}`));
        img.src = src;
    });
}

async function loadGameImages() {
    const safeSources = [];
    const unsafeSources = [];

    for (let i = 1; i <= MAX_IMAGES_TO_CHECK_GOOD; i++) {
        safeSources.push(`images/safe/good${i}_final.jpg`);
    }
    for (let i = 1; i <= MAX_IMAGES_TO_CHECK_BAD; i++) {
        unsafeSources.push(`images/unsafe/bad${i}_final.jpg`);
    }

    // Load all, but don’t die if some fail
    const safeResults = await Promise.allSettled(safeSources.map(loadImage));
    const unsafeResults = await Promise.allSettled(unsafeSources.map(loadImage));

    safeImages.length = 0;
    unsafeImages.length = 0;

    // console.log(safeResults[0].value.description)

    for (const r of safeResults) if (r.status === "fulfilled") safeImages.push(r.value);
    for (const r of unsafeResults) if (r.status === "fulfilled") unsafeImages.push(r.value);

    const uiResults = await Promise.allSettled([
        loadIntoImage(images.desktopBg, "images/file_images/Desktop_IMG.jpg"),
        loadIntoImage(images.cleanIcon, "images/file_images/clean.png"),
        loadIntoImage(images.uncleanIcon, "images/file_images/corrupted.png"),
    ]);

    // Optional: hard-fail if any of these 3 fail
    const uiFailed = uiResults.filter(r => r.status === "rejected");
    if (uiFailed.length) {
        throw new Error("Failed to load one or more UI images (desktop/clean/corrupted).");
    }

    // Hard requirement: must have at least 1 of each
    // console.log(safeImages.length)
    // console.log(unsafeImages.length)
    if (safeImages.length === 0 || unsafeImages.length === 0) {
        throw new Error("Not enough images loaded (need at least 1 safe and 1 unsafe).");
    }
}

//Resizes the canvas to the correct size, auto-called when window is resized
function resizeCanvas() {
    const topArea = document.getElementById("top-area")
    const maxWidthVW = 90 // Max 90% of screen width
    const maxHeightVH = 85 // Max 85% of screen height (leaving room for top-area)
    const aspectRatio = 17 / 11

    // 1. Calculate size based on Width
    let widthByWidth = window.innerWidth * (maxWidthVW / 100)
    if (widthByWidth > 900) widthByWidth = 900
    let heightByWidth = widthByWidth / aspectRatio

    let heightByHeight = window.innerHeight * (maxHeightVH / 100)
    let widthByHeight = heightByHeight * aspectRatio

    let displayWidth, displayHeight
    if (widthByHeight <= widthByWidth) {
        displayWidth = widthByHeight
        displayHeight = heightByHeight
    } else {
        displayWidth = widthByWidth
        displayHeight = heightByWidth
    }


    canvas.width = displayWidth * dpr
    canvas.height = displayHeight * dpr


    canvas.style.width = displayWidth + "px"
    canvas.style.height = displayHeight + "px"

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)


    resizeMiniGameCanvas(
        canvas2D,
        ctx2D,
        game,
        displayWidth,
        displayHeight,
        dpr
    )


    topArea.style.height = "10vh" // Use vh for consistency

    info.x = displayWidth - (displayWidth / 30)
    info.y = (displayWidth / 30)
    info.radius = INFO_BUTTON_RADIUS_SIZE / (900 / displayWidth)


    const vWidth = canvas.width / dpr
    const vHeight = canvas.height / dpr
    const {boxWidth, boxHeight, spacing} = getPasswordBoxDimensions(vWidth, vHeight)

    const [p1, p2] = passwordChoices

    if (p1 !== undefined) {
        p1.x = (vWidth / 2) - spacing - (boxWidth / 2)
        p1.y = vHeight * 0.5
        p1.width = boxWidth
        p1.height = boxHeight
    }
    if (p2 !== undefined) {
        p2.x = (vWidth / 2) + spacing - (boxWidth / 2)
        p2.y = vHeight * 0.5
        p2.width = boxWidth
        p2.height = boxHeight
    }

    draw()
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}

function startGame() {

    // reallySafePasswords = [];
    // safePasswords = [];
    // notSafePasswords = [];
    // passwordChoices = [];
    // currentImages = [];

    retryPromptScreensPerGame = 0
    unsafeClicks = 0
    points = 0;
    successSequence = 0;
    timeElapsed = 0;
    gameEnded = false;

    gamePhase = INTRO_PHASE;

    gameRunning = true;
    lastTime = Date.now();
    startMainLoop();
}

function startTraining() {
    points = 0;
    timeElapsed = 0;
    // gamePhase = MINIGAME_INTRO_PHASE;
    gamePhase = PLAYING_PHASE;
    startNewRound();
    lastTime = Date.now();
}

// function startGameImmediate() {
//     startGame();   // resets + intro state
//     startTraining();   // jumps into playing
// }

function randomChar(type) {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lower = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"

    if (type === "upper") return upper[Math.floor(Math.random() * upper.length)]
    if (type === "lower") return lower[Math.floor(Math.random() * lower.length)]
    if (type === "number") return numbers[Math.floor(Math.random() * numbers.length)]
    if (type === "symbol") return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
}

function getTrainingPercent() {
    const waveFrac = points / WAVE_TARGET;           // 0..1
    const overall = (successSequence + waveFrac) / MAX_SUCCESS_WAVES; // 0..1
    return Math.max(0, Math.min(1, overall));
}

function generateReallySafe() {
    let pw = ""
    const types = ["upper", "lower", "number", "symbol"]
    for (let i = 0; i < 12; i++) {
        pw += randomChar(types[Math.floor(Math.random() * types.length)])
    }
    reallySafePasswords.push(pw)
    return pw
}

function generateSafe() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let pw = ""
    for (let i = 0; i < 10; i++) {
        pw += chars[Math.floor(Math.random() * chars.length)]
    }
    safePasswords.push(pw)
    return pw
}

function generateNotSafe() {

    let pw = WEAK_PASSWORDS[Math.floor(Math.random() * WEAK_PASSWORDS.length)]
    notSafePasswords.push(pw)
    return pw
}

function getPasswordBoxDimensions(vWidth, vHeight) {
    const boxWidth = vWidth / 3.5
    const boxHeight = vHeight / 9
    const spacing = vWidth * 0.2 // 20% distance from center
    return {boxWidth, boxHeight, spacing}
}

/**
 * Puts two passwords to be later drawn,NOTE: vWidth and vHeight are used AND NOT `canvas.width` and `canvas.height` because
 * of screens having higher DPI so canvas needs to be scaled
 */
function spawnTwoPasswords() {
    roundTime = 5
    roundDuration = PASSWORD_ROUND_DURATION

    passwordChoices = []
    const vWidth = canvas.width / dpr
    const vHeight = canvas.height / dpr

    const generators = [generateReallySafe, generateSafe, generateNotSafe]
    const firstIndex = Math.floor(Math.random() * generators.length)
    let secondIndex
    do {
        secondIndex = Math.floor(Math.random() * generators.length)
    } while (secondIndex === firstIndex)

    const {boxWidth, boxHeight, spacing} = getPasswordBoxDimensions(vWidth, vHeight)

    passwordChoices.push({
        text: generators[firstIndex](),
        x: (vWidth / 2) - spacing - (boxWidth / 2),
        y: vHeight * 0.5,
        width: boxWidth,
        height: boxHeight
    })

    passwordChoices.push({
        text: generators[secondIndex](),
        x: (vWidth / 2) + spacing - (boxWidth / 2),
        y: vHeight * 0.5,
        width: boxWidth,
        height: boxHeight
    })

    passwordChoices.sort(() => Math.random() - 0.5)
}

function spawnTwoImages() {
    if (safeImages.length === 0 || unsafeImages.length === 0) {
        currentRoundMode = PASSWORDS_MODE;
        spawnTwoPasswords();
        return;
    }

    roundTime = IMAGE_ROUND_DURATION
    timeLeft = IMAGE_ROUND_DURATION
    roundDuration = IMAGE_ROUND_DURATION
    timeElapsed = Math.max(0, timeElapsed - 7);


    currentImages = [];
    const safeImg = safeImages[Math.floor(Math.random() * safeImages.length)];
    const unsafeImg = unsafeImages[Math.floor(Math.random() * unsafeImages.length)];

    currentImages.push(safeImg, unsafeImg);
    currentImages.sort(() => Math.random() - 0.5);
}

function startMiniGame() {
    stopMainLoop()
    gameRunning = false

    canvas.style.display = 'none'
    canvas2D.style.display = "block"

    initTouchControlsIfMobile(game)
    game.running = true

    StartMiniGame()
}

function endMiniGame() {
    canvas.style.display = 'block'
    canvas2D.style.display = "none"

    const controls = document.getElementById('mobile-controls');
    if (controls) {
        controls.remove(); // Completely removes the elements from the DOM
    }

    // successSequence = 0
    startGame()
}

function update() {
    const now = Date.now()
    const delta = (now - lastTime) / 1000
    lastTime = now


    if (info.open) return;

    if (gamePhase === MINIGAME_INTRO_PHASE) return;
    if (gamePhase === INTRO_PHASE) return;
    if (gamePhase === BONUS_INTRO_PHASE) return;

    if (unsafeClicks === MAX_UNSAFE_CLICKS) {
        gamePhase = FINAL_GAME_OVER_PHASE
        return;
    }


    if (gamePhase === BONUS_ROUND_PHASE) {
        return
    }

    if (gamePhase === PLAYING_PHASE) {
        timeLeft -= delta
        timeElapsed += delta


        if (timeLeft <= 0) {
            startNewRound()
        }

        if (timeElapsed >= gameDuration) {
            if (points >= WAVE_TARGET) {
                gamePhase = SUCCESS_PHASE
                phaseTimer = 3
                successSequence += 1
            } else {
                gamePhase = RETRY_PROMPT_PHASE
                // successSequence = 0
            }
        }
    }

    if (gamePhase === SUCCESS_PHASE) {
        phaseTimer -= delta

        if (phaseTimer <= 0) {
            if (successSequence >= MAX_SUCCESS_WAVES) {
                // startMiniGame()
                minigameReason = MINIGAME_REASON.TRAINING_COMPLETE;
                gamePhase = MINIGAME_INTRO_PHASE;
                gameRunning = true;     // keep drawing
                lastTime = Date.now();  // prevents delta spike
            } else {
                resetMainGame()
            }

        }
    }
}

function resetMainGame() {
    timeElapsed = 0
    gameRunning = true
    gamePhase = PLAYING_PHASE
    points = 0
    startNewRound()
    lastTime = Date.now()
    startMainLoop()
}

function addPoints(delta) {
    points += delta;

    // clamp to [0..10]
    if (points < 0) points = 0;
    if (points > WAVE_TARGET) points = WAVE_TARGET;

    // if we hit 10, end this sequence immediately
    if (points >= WAVE_TARGET) {
        timeElapsed = gameDuration + 10; // triggers success check in update()
    }
}

function drawTotalTimer(vWidth, vHeight, aspect_size) {

    const font_size = Math.round(TOTAL_TIMER_FONT_SIZE / aspect_size)

    ctx.save()
    ctx.font = `bold ${font_size}px monospace`
    // Draw the "Time Remaining" text at the bottom
    const remaining = Math.max(0, Math.ceil(gameDuration - timeElapsed))
    ctx.fillStyle = "#f6f3f3"
    ctx.textAlign = "center"
    ctx.fillText(`Time left: ${remaining}s`, vWidth / 2, vHeight - 20)
    ctx.restore()
}

/**
 * Function that draws everything,NOTE: vWidth and vHeight are used AND NOT canvas.width and canvas.height because
 * of screens having higher DPI so canvas needs to be scaled
 * */
function draw() {
    const vWidth = canvas.width / dpr
    const vHeight = canvas.height / dpr

    const aspect_size = (900 / vWidth)

    ctx.clearRect(0, 0, vWidth, vHeight)

    const blurred = info.open

    if (blurred) {
        ctx.save()
        ctx.filter = `blur(${8 / aspect_size}px)`
    }

    if (gamePhase === INTRO_PHASE) {
        drawIntroScreen(vWidth, vHeight, aspect_size);
        drawLanguageToggle(vWidth, vHeight, aspect_size);
        if (blurred) ctx.restore();
        return;
    }

    if (gamePhase === DESKTOP_PREVIEW_PHASE) {
        drawDesktop(vWidth, vHeight, aspect_size);
        drawLanguageToggle(vWidth, vHeight, aspect_size, true);

        const elapsed = performance.now() - desktopPreviewStartTime;

        if (elapsed >= DESKTOP_PREVIEW_DURATION) {
            desktopPreviewStartTime = null;
            startTraining();
        }

        if (blurred) ctx.restore();
        return;
    }


    if (gamePhase === SUCCESS_PHASE) {
        drawSuccessScreen(vWidth, vHeight)
        if (blurred) ctx.restore();
        return
    }

    if (gamePhase === BONUS_INTRO_PHASE) {
        drawBonusIntroScreen(vWidth, vHeight, aspect_size);
        drawLanguageToggle(vWidth, vHeight, aspect_size);
        if (blurred) ctx.restore();
        return;
    }

    if (gamePhase === MINIGAME_INTRO_PHASE) {
        drawMinigameIntroScreen(vWidth, vHeight, aspect_size);
        drawLanguageToggle(vWidth, vHeight, aspect_size);
        if (blurred) ctx.restore();
        return;
    }

    if (gamePhase === RETRY_PROMPT_PHASE && retryPromptScreensPerGame<1) {
        drawRetryPrompt(vWidth, vHeight, aspect_size)
        drawLanguageToggle(vWidth, vHeight, aspect_size)
        if (blurred) ctx.restore();
        return
    }

    if(retryPromptScreensPerGame>=1 && gamePhase === RETRY_PROMPT_PHASE){
        gamePhase = FINAL_GAME_OVER_PHASE
        return
    }

    if (gamePhase === FINAL_GAME_OVER_PHASE) {
        drawGameOver(vWidth, vHeight, aspect_size)
        drawLanguageToggle(vWidth, vHeight, aspect_size)
        if (blurred) ctx.restore();
        return
    }

    if (gamePhase === BONUS_ROUND_PHASE) {
        // console.log('draw() - (gamePhase === "bonusRound")')
        drawBonusRound(vWidth, vHeight, aspect_size)
        drawLanguageToggle(vWidth, vHeight, aspect_size)
        if (blurred) ctx.restore();
        return
    }

    drawInstructions(vWidth, vHeight + (100 / aspect_size), aspect_size)
    // drawScore(vWidth, aspect_size)
    drawScoreBar(vWidth, aspect_size)
    // drawMaxUnsafeClicks(vWidth, aspect_size)
    drawUnsafeIntegrity(vWidth, aspect_size)
    drawTimer(vWidth, vHeight, aspect_size)

    if (currentRoundMode === PASSWORDS_MODE) {
        drawPasswords(vWidth, vHeight, aspect_size)
    } else if (currentRoundMode === IMAGES_MODE) {
        drawImages(vWidth, vHeight, aspect_size)
    }

    drawTotalTimer(vWidth, vHeight, aspect_size)

    drawLanguageToggle(vWidth, vHeight, aspect_size)
    if (blurred) {
        ctx.restore()
    }

    drawInfoButton(vWidth, vHeight, aspect_size)
}

function drawDesktop(vWidth, vHeight, aspect_size) {
    ctx.save();

    if (images.desktopBg.complete && images.desktopBg.naturalWidth !== 0) {
        const imgRatio = images.desktopBg.width / images.desktopBg.height;
        const canvasRatio = vWidth / vHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = vWidth;
            drawHeight = vWidth / imgRatio;
            offsetX = 0;
            offsetY = (vHeight - drawHeight) / 2;
        } else {
            drawHeight = vHeight;
            drawWidth = vHeight * imgRatio;
            offsetX = (vWidth - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.drawImage(images.desktopBg, offsetX, offsetY, drawWidth, drawHeight);
    } else {
        // fallback ако сликата не е вчитана
        ctx.fillStyle = "#020617";
        ctx.fillRect(0, 0, vWidth, vHeight);
    }

    drawFiles(ctx, filesData, canvas, aspect_size, vWidth, vHeight);

    ctx.restore();
}

function drawFiles(ctx, files, canvas, aspect_size, vWidth, vHeight) {
    ctx.save();

    // ===== TITLE (bright-background variant) =====
    const titleY = vHeight * 0.08;
    const titleFontSize = Math.round(32 / aspect_size);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Dark ink for contrast
    ctx.fillStyle = "#0f172a";

    // Very soft cyan halo (accent, not glow)
    ctx.shadowBlur = 6 / aspect_size;
    ctx.shadowColor = "rgba(0, 242, 255, 0.35)";

    ctx.font = `bold ${titleFontSize}px monospace`;
    ctx.fillText(
        UI_TEXT.FILES_SCREEN_TITLE[CURRENT_GAME_LANGUAGE],
        vWidth / 2,
        titleY
    );

    // Underline — cyan accent, thin
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(0, 242, 255, 0.4)";
    ctx.lineWidth = 1 / aspect_size;
    ctx.beginPath();
    ctx.moveTo(vWidth * 0.25, titleY + (18 / aspect_size));
    ctx.lineTo(vWidth * 0.75, titleY + (18 / aspect_size));
    ctx.stroke();

    /* ===== FILE GRID (unchanged logic) ===== */
    const uiScale = 1;
    const size = (64 / aspect_size) * uiScale;
    const gap = (44 / aspect_size) * uiScale;

    let x = (24 / aspect_size) * uiScale;
    let y = (80 / aspect_size) * uiScale;

    const maxY = vHeight - size - (20 / aspect_size);

    files.forEach((file) => {
        if (y > maxY) {
            y = (80 / aspect_size) * uiScale;
            x += size + gap;
        }

        drawFileIcon(file, x, y, size, aspect_size);

        file.x = x;
        file.y = y;
        file.size = size;

        y += size + gap;
    });

    ctx.restore();
}


function drawFileIcon(file, x, y, size, aspect_size) {
    ctx.save();

    const hover = mouseIsInside(x, y, size, size);

    // Hover glow
    if (hover) {
        ctx.shadowBlur = 12 / aspect_size;
        ctx.shadowColor = "#00f2ff";
    }

    const iconImg = file.clean ? images.cleanIcon : images.uncleanIcon;

    if (iconImg.complete && iconImg.naturalWidth !== 0) {
        ctx.drawImage(iconImg, x, y, size, size);
    } else {
        // fallback ако сликата не е вчитана
        ctx.fillStyle = file.clean ? "#22c55e" : "#ef4444";
        ctx.fillRect(x, y, size, size);
    }

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#050505";
    ctx.font = `${12 / aspect_size}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    // const textY = y + size + (6 / aspect_size);

    // drawWrappedText(
    //     file.name,
    //     x + size / 2,
    //     textY,
    //     size + 10,
    //     14 / aspect_size
    // );

    ctx.restore();
}

// function drawWrappedText(text, x, y, maxWidth, lineHeight) {
//     const words = text.split(" ");
//     let line = "";
//
//     for (let i = 0; i < words.length; i++) {
//         const testLine = line + words[i];
//         const metrics = ctx.measureText(testLine);
//         const testWidth = metrics.width;
//
//         if (testWidth > maxWidth && i > 0) {
//             ctx.fillText(line, x, y);
//             line = words[i];
//             y += lineHeight;
//         } else {
//             line = testLine;
//         }
//     }
//     ctx.fillText(line, x, y);
// }


function drawSuccessScreen(vWidth, vHeight) {
    // Background
    const bgGrad = ctx.createRadialGradient(vWidth / 2, vHeight / 2, 10, vWidth / 2, vHeight / 2, vWidth);
    bgGrad.addColorStop(0, "#0f172a");
    bgGrad.addColorStop(1, "#020617");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, vWidth, vHeight);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Progress info
    const totalSteps = MAX_SUCCESS_WAVES;
    const step = Math.min(successSequence, totalSteps);
    const isFinal = step >= totalSteps;

    // Icon
    const cx = vWidth / 2;
    const cy = vHeight * 0.34;
    const r = vWidth * 0.06;

    ctx.save();
    ctx.strokeStyle = isFinal ? "#00f2ff" : "#22c55e";
    ctx.lineWidth = Math.max(4, vWidth * 0.004);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // Check mark
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.4, cy);
    ctx.lineTo(cx - r * 0.1, cy + r * 0.3);
    ctx.lineTo(cx + r * 0.45, cy - r * 0.35);
    ctx.stroke();
    ctx.restore();

    // Header
    ctx.fillStyle = isFinal ? "#00f2ff" : "#22c55e";
    ctx.font = `bold ${Math.round(vWidth * 0.05)}px "Courier New", monospace`;
    ctx.fillText(
        isFinal ? UI_TEXT.SUCCESS_SCREEN_HEADER_TEXT[CURRENT_GAME_LANGUAGE][0] : UI_TEXT.SUCCESS_SCREEN_HEADER_TEXT[CURRENT_GAME_LANGUAGE][1],
        vWidth / 2,
        vHeight * 0.52
    );

    // Progress bar text
    ctx.fillStyle = "#e5e7eb";
    ctx.font = `${Math.round(vWidth * 0.028)}px "Courier New", monospace`;
    ctx.fillText(
        UI_TEXT.SUCCESS_SCREEN_PROGREES_TEXT[CURRENT_GAME_LANGUAGE] + ` ${Math.round(step / totalSteps * 100)}%`,
        vWidth / 2,
        vHeight * 0.60
    );

    // Sub text depends on what happens next
    ctx.fillStyle = "#94a3b8";
    ctx.font = `${Math.round(vWidth * 0.022)}px "Courier New", monospace`;
    ctx.fillText(
        isFinal
            ? UI_TEXT.SUCCESS_SCREEN_SUBHEADER_TEXT[CURRENT_GAME_LANGUAGE][0]
            : UI_TEXT.SUCCESS_SCREEN_SUBHEADER_TEXT[CURRENT_GAME_LANGUAGE][1],
        vWidth / 2,
        vHeight * 0.67
    );
}

function drawRetryPrompt(vWidth, vHeight, aspect_size) {

    const bgGrad = ctx.createRadialGradient(vWidth / 2, vHeight / 2, 10, vWidth / 2, vHeight / 2, vWidth);
    bgGrad.addColorStop(0, "#0f172a");
    bgGrad.addColorStop(1, "#020617");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, vWidth, vHeight);


    ctx.fillStyle = "rgba(0, 242, 255, 0.03)";
    for (let i = 0; i < vHeight; i += 4) {
        ctx.fillRect(0, i, vWidth, 1);
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";


    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#facc15";
    ctx.fillStyle = "#facc15";
    ctx.font = `bold ${vWidth * 0.06}px monospace`; // Monospace font
    ctx.fillText(UI_TEXT.RETRY_SCREEN_HEADER_TEXT[CURRENT_GAME_LANGUAGE], vWidth / 2, vHeight * 0.3);
    ctx.restore();

    // 4. Sub-header text
    ctx.fillStyle = "#94a3b8";
    ctx.font = `${vWidth * 0.03}px monospace`;
    ctx.fillText(UI_TEXT.RETRY_SCREEN_SUBHEADER_TEXT[CURRENT_GAME_LANGUAGE], vWidth / 2, vHeight * 0.4);

    // Button sizing - making them wider for the long text
    const buttonW = vWidth * 0.35;
    const buttonH = Math.round(60 / aspect_size);
    const button_spacing = Math.round(20 / aspect_size);


    drawCyberButton(
        UI_TEXT.RETRY_SCREEN_RECOVERY_BUTTON_TEXT[CURRENT_GAME_LANGUAGE], vWidth / 2 - buttonW - button_spacing, vHeight * 0.56, buttonW, buttonH, true, aspect_size
    );

    drawCyberButton(
        UI_TEXT.RETRY_SCREEN_TERMINATE_BUTTON_TEXT[CURRENT_GAME_LANGUAGE], vWidth / 2 + button_spacing, vHeight * 0.56, buttonW, buttonH, false, aspect_size
    );
}

function drawBonusIntroScreen(vWidth, vHeight, aspect_size) {
    const bgGrad = ctx.createRadialGradient(vWidth / 2, vHeight / 2, 10, vWidth / 2, vHeight / 2, vWidth);
    bgGrad.addColorStop(0, "#0f172a");
    bgGrad.addColorStop(1, "#020617");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, vWidth, vHeight);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#00f2ff";
    ctx.font = `bold ${Math.round(28 / aspect_size)}px monospace`;
    ctx.fillText(UI_TEXT.BONUS_INTRO_TITLE[CURRENT_GAME_LANGUAGE], vWidth / 2, vHeight * 0.30);

    ctx.fillStyle = "#94a3b8";
    ctx.font = `${Math.round(16 / aspect_size)}px monospace`;
    ctx.fillText(UI_TEXT.BONUS_INTRO_LINE_1[CURRENT_GAME_LANGUAGE], vWidth / 2, vHeight * 0.40);
    ctx.fillText(UI_TEXT.BONUS_INTRO_LINE_2[CURRENT_GAME_LANGUAGE], vWidth / 2, vHeight * 0.46);

    const w = vWidth * 0.40;
    const h = Math.round(60 / aspect_size);
    const x = (vWidth - w) / 2;
    const y = vHeight * 0.62;

    bonusIntroButton = {x, y, w, h};

    drawCyberButton(UI_TEXT.BONUS_INTRO_BUTTON_TEXT[CURRENT_GAME_LANGUAGE], x, y, w, h, true, aspect_size);
}

function drawCyberButton(text, x, y, w, h, primary, aspect_size) {
    ctx.save();


    let color
    let hover
    if (mouseIsInside(x, y, w, h)) {
        color = primary ? "#22c55e" : "#ef4444";
        hover = true
    } else {
        color = primary ? "#10652e" : "#9a2a2a";
        hover = false
    }
    const fontSize = Math.round(RETRY_BUTTON_TEXT_FONT_SIZE / aspect_size);


    ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
    ctx.strokeStyle = color;
    ctx.shadowBlur = hover ? 15 : 0;
    ctx.shadowColor = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 4 / aspect_size);
    ctx.fill();
    ctx.stroke();


    ctx.lineWidth = 4 / aspect_size;


    ctx.beginPath();
    ctx.moveTo(x, y + 15 / aspect_size);
    ctx.lineTo(x, y);
    ctx.lineTo(x + 15 / aspect_size, y);
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(x + w - 15 / aspect_size, y + h);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x + w, y + h - 15 / aspect_size);
    ctx.stroke();


    ctx.shadowBlur = 10 / aspect_size;
    ctx.shadowColor = color;
    ctx.fillStyle = "#f8fafc";
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + w / 2, y + h / 2);

    ctx.restore();
}

/**
 * Function that draws the Game Over Screen, NOTE: vWidth and vHeight are used AND NOT canvas.width and canvas.height because
 * of screens having higher DPI so canvas needs to be scaled
 * */
function drawGameOver(vWidth, vHeight, aspect_size) {
    ctx.save()
    // 1. Background: Deep slate with a slight transparency for a "HUD overlay" feel
    ctx.fillStyle = "rgba(10, 15, 28, 0.95)";
    ctx.fillRect(0, 0, vWidth, vHeight);

    // 2. Neon "Game Over" Text
    const scaleFont = Math.round(GAME_OVER_TEXT_FONT_SIZE / aspect_size);
    ctx.font = `bold ${scaleFont}px "Courier New", monospace`; // Cyber Monospace
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    console.log(points)

    // Game Over Header
    ctx.shadowBlur = 15 / aspect_size;
    ctx.shadowColor = "#ff0055"; // Hot pink neon glow
    ctx.fillStyle = "#ff0055";
    ctx.fillText(UI_TEXT.GAME_OVER_HEADER_TEXT[CURRENT_GAME_LANGUAGE], vWidth / 2, vHeight / 2 - (20 / aspect_size));


    // Game Over SubHeader
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#00f2ff";
    ctx.font = `bold ${Math.round(20 / aspect_size)}px "Courier New", monospace`;
    if (unsafeClicks < MAX_UNSAFE_CLICKS) {
        ctx.fillText(UI_TEXT.GAME_OVER_SUBHEADER_TEXT[CURRENT_GAME_LANGUAGE], vWidth / 2, vHeight / 2 + (20 / aspect_size));
    } else if (unsafeClicks >= MAX_UNSAFE_CLICKS) {
        ctx.fillText(UI_TEXT.MAX_UNSAFE_CLICKS_GAME_OVER_TEXT[CURRENT_GAME_LANGUAGE], vWidth / 2, vHeight / 2 + (20 / aspect_size));
    }


    const btnW = Math.max(200, vWidth / 4);
    const btnH = 50 / aspect_size;
    const btnX = (vWidth - btnW) / 2;
    const btnY = vHeight / 2 + (80 / aspect_size);

    restartButton = {x: btnX, y: btnY, w: btnW, h: btnH};

    let isHover = mouseIsInside(
        restartButton.x,
        restartButton.y,
        restartButton.w,
        restartButton.h)

    ctx.shadowColor = isHover ? "#ff0000" : "#c52222";
    ctx.shadowBlur = isHover ? 25 / aspect_size : 0


    ctx.beginPath();
    ctx.moveTo(btnX + (15 / aspect_size), btnY);
    ctx.lineTo(btnX + btnW, btnY);
    ctx.lineTo(btnX + btnW, btnY + btnH - (15 / aspect_size));
    ctx.lineTo(btnX + btnW - (15 / aspect_size), btnY + btnH);
    ctx.lineTo(btnX, btnY + btnH);
    ctx.lineTo(btnX, btnY + (15 / aspect_size));
    ctx.closePath();


    ctx.fillStyle = isHover ? "rgba(255,0,0,0.2)" : "rgba(197,34,34,0.2)";
    ctx.fill();
    ctx.shadowBlur = 0
    ctx.strokeStyle = isHover ? "#ff0000" : "#c52222";
    ctx.lineWidth = 2 / aspect_size;


    ctx.stroke();
    ctx.fillStyle = isHover ? "#ff0000" : "#c52222";
    ctx.font = `bold ${Math.round(18 / aspect_size)}px "Courier New", monospace`;

    ctx.fillText(UI_TEXT.GAME_OVER_BUTTON_TEXT[CURRENT_GAME_LANGUAGE], vWidth / 2, btnY + btnH / 2);
    ctx.restore()
}


function drawMinigameIntroScreen(vWidth, vHeight, aspect_size) {
    // Background
    const bgGrad = ctx.createRadialGradient(vWidth / 2, vHeight / 2, 10, vWidth / 2, vHeight / 2, vWidth);
    bgGrad.addColorStop(0, "#0f172a");
    bgGrad.addColorStop(1, "#020617");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, vWidth, vHeight);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Title + text depends on why we are here
    let title = UI_TEXT.MINIGAME_REASON_TITLE[CURRENT_GAME_LANGUAGE];
    let line1 = UI_TEXT.MINIGAME_REASON_LINE_1[CURRENT_GAME_LANGUAGE];
    let line2 = UI_TEXT.MINIGAME_REASON_LINE_2[CURRENT_GAME_LANGUAGE];

    if (minigameReason === MINIGAME_REASON.BONUS_PERFECT) {
        title = UI_TEXT.MINIGAME_REASON_BONUS_PERFECT_TITLE[CURRENT_GAME_LANGUAGE];
        line1 = UI_TEXT.MINIGAME_REASON_BONUS_PERFECT_LINE_1[CURRENT_GAME_LANGUAGE];
        line2 = UI_TEXT.MINIGAME_REASON_BONUS_PERFECT_LINE_2[CURRENT_GAME_LANGUAGE];
    } else if (minigameReason === MINIGAME_REASON.TRAINING_COMPLETE) {
        title = UI_TEXT.MINIGAME_REASON_TRAINING_COMPLETE_TITLE[CURRENT_GAME_LANGUAGE];
        line1 = UI_TEXT.MINIGAME_REASON_TRAINING_COMPLETE_LINE_1[CURRENT_GAME_LANGUAGE];
        // line2 = UI_TEXT.MINIGAME_REASON_TRAINING_COMPLETE_LINE_2[CURRENT_GAME_LANGUAGE];
        line2 = UI_TEXT.MINIGAME_REASON_TRAINING_COMPLETE_LINE_2[CURRENT_GAME_LANGUAGE];

    }

    const lines = line2.split("\n");


    const lineH = Math.round(28 / aspect_size);
    let startY = vHeight * 0.47;
    //lines.forEach((t, i) => ctx.fillText(t+"", vWidth/2, startY + i * lineH));

    // Header
    ctx.save();
    ctx.fillStyle = "#00f2ff";
    ctx.shadowBlur = 14 / aspect_size;
    ctx.shadowColor = "#00f2ff";
    ctx.font = `bold ${Math.round(28 / aspect_size)}px monospace`;
    ctx.fillText(title, vWidth / 2, vHeight * 0.30);
    ctx.restore();

    // Body text
    ctx.fillStyle = "#94a3b8";
    ctx.font = `${Math.round(16 / aspect_size)}px monospace`;
    ctx.fillText(line1, vWidth / 2, vHeight * 0.42);
    lines.forEach((t, i) => ctx.fillText(t + "", vWidth / 2, startY + i * lineH));
    //ctx.fillText(line2, vWidth / 2, vHeight * 0.48);

    // Button
    const w = vWidth * 0.42;
    const h = Math.round(60 / aspect_size);
    const x = (vWidth - w) / 2;
    const y = vHeight * 0.63;

    minigameIntroButton = {x, y, w, h};

    drawCyberButton(UI_TEXT.MINIGAME_REASON_BUTTON_TEXT[CURRENT_GAME_LANGUAGE], x, y, w, h, true, aspect_size);
}


/** Functions that draw the instruction text, NOTE: vWidth and vHeight are used AND NOT canvas.width and canvas.height because
 * of screens having higher DPI so canvas needs to be scaled
 * */
function drawInstructions(vWidth, vHeight, aspect_size) {
    ctx.save();

    const scaleFont = Math.round(INSTRUCTION_TEXT_FONT_SIZE / aspect_size);
    const yPos = vHeight * 0.15 - (20 / aspect_size);

    // 1. Draw a subtle "Underline" or accent bar
    ctx.strokeStyle = "rgba(0, 242, 255, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(vWidth * 0.3, yPos + (15 / aspect_size));
    ctx.lineTo(vWidth * 0.7, yPos + (15 / aspect_size));
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${scaleFont}px "Courier New", Courier, monospace`;

    ctx.shadowBlur = 8 / aspect_size;
    ctx.shadowColor = "#00f2ff";
    ctx.fillStyle = "#00f2ff";

    //ctx.fillText("> SELECT_SAFER_PROTOCOL", vWidth / 2, yPos);
    ctx.fillText(UI_TEXT.INSTRUCTIONS_TEXT[CURRENT_GAME_LANGUAGE], vWidth / 2, yPos);

    ctx.restore();
}

// function drawMaxUnsafeClicks(vWidth, aspect_size) {
//     // === anchor to score bar ===
//     const barX = 20 / aspect_size;
//     const barY = 25 / aspect_size;
//     const barH = 18 / aspect_size;
//
//     const textY = barY + barH + (18 / aspect_size); // ⬅ below bar
//     const textX = barX;
//
//     ctx.save();
//
//     ctx.font = `bold ${Math.round(SCORE_FONT_SIZE / aspect_size)}px "Courier New", monospace`;
//     ctx.textAlign = "left";
//     ctx.textBaseline = "alphabetic";
//
//     const remaining = MAX_UNSAFE_CLICKS - unsafeClicks;
//     const textBefore = "Антивирусот може да научи уште ";
//     const textAfter = " небезбедни потези";
//
//     // before
//     ctx.fillStyle = "#00f2ff";
//     ctx.fillText(textBefore, textX, textY);
//
//     const widthBefore = ctx.measureText(textBefore).width;
//
//     // number
//     ctx.fillStyle = "#fb0000";
//     ctx.fillText(String(remaining), textX + widthBefore, textY);
//
//     const widthNumber = ctx.measureText(String(remaining)).width;
//
//     // after
//     ctx.fillStyle = "#00f2ff";
//     ctx.fillText(textAfter, textX + widthBefore + widthNumber, textY);
//
//     ctx.restore();
// }

function drawUnsafeIntegrity(vWidth, aspect_size) {

    const remaining = MAX_UNSAFE_CLICKS - unsafeClicks;

    // anchor under score bar
    const x = 20 / aspect_size;
    const y = (25 + 18 + 22) / aspect_size; // text Y

    const slotSize = 10 / aspect_size;
    const gap = 5 / aspect_size;

    ctx.save();

    // LABEL
    ctx.fillStyle = "#00f2ff";
    ctx.font = `bold ${Math.round(SCORE_FONT_SIZE * 0.9 / aspect_size)}px "Courier New", monospace`;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(
        UI_TEXT.UNSAFE_CLICKS_HEALTH_TEXT[CURRENT_GAME_LANGUAGE],
        x,
        y
    );

    // BARS — placed UNDER the text
    const barsY = y + (10 / aspect_size); // vertical spacing below text

    for (let i = 0; i < MAX_UNSAFE_CLICKS; i++) {
        const sx = x + i * (slotSize + gap);
        const intact = i < remaining;

        ctx.beginPath();
        ctx.roundRect(
            sx,
            barsY,
            slotSize,
            slotSize,
            3 / aspect_size
        );

        if (intact) {
            ctx.fillStyle = "rgba(0, 242, 255, 0.6)";
            ctx.shadowBlur = 6 / aspect_size;
            ctx.shadowColor = "#00f2ff";
        } else {
            ctx.fillStyle = "rgba(251, 0, 0, 0.6)";
            ctx.shadowBlur = 6 / aspect_size;
            ctx.shadowColor = "#fb0000";
        }

        ctx.fill();
        ctx.shadowBlur = 0;
    }

    ctx.restore();
}


function drawScoreBar(vWidth, aspect_size) {
    const x = 20 / aspect_size;
    const y = 25 / aspect_size;
    const w = vWidth * 0.25;
    const h = 18 / aspect_size;

    const p = getTrainingPercent(); // 0..1
    const fillW = w * p;


    ctx.save();

    // label
    ctx.fillStyle = "#00f2ff";
    ctx.font = `bold ${Math.round(SCORE_FONT_SIZE / aspect_size)}px "Courier New", monospace`;
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText(`${UI_TEXT.TRAINING[CURRENT_GAME_LANGUAGE]} ${Math.round(p * 100)}%`, x, y - (6 / aspect_size));

    // bar background
    ctx.fillStyle = "rgba(15,23,42,0.9)";
    ctx.strokeStyle = "#00f2ff";
    ctx.lineWidth = 2 / aspect_size;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 4 / aspect_size);
    ctx.fill();
    ctx.stroke();

    // fill
    ctx.fillStyle = "rgba(0, 242, 255, 0.35)";
    ctx.beginPath();
    ctx.roundRect(x, y, fillW, h, 4 / aspect_size);
    ctx.fill();

    ctx.restore();
}

/** Function that draws the circular timer,NOTE: `vWidth` and `vHeight` are used AND NOT `canvas.width` and `canvas.height` because
 * of screens having higher DPI so canvas needs to be scaled
 * */
function drawTimer(vWidth, vHeight, aspect_size) {
    ctx.save();
    const centerX = vWidth / 2;
    const centerY = vHeight * 0.28; // Slightly higher to clear the center play area
    const radius = Math.round(TIMER_RADIUS_SIZE / aspect_size);

    // 1. Draw Background Glow
    ctx.shadowBlur = 15 * (TIMER_RADIUS_SIZE / 25) / aspect_size;
    ctx.shadowColor = "#fb0000";

    // 2. The Inner Core (The Circle)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(251, 0, 0, 0.2)"; // Semi-transparent red
    ctx.fill();
    ctx.strokeStyle = "#fb0000";
    ctx.lineWidth = 3 / aspect_size;
    ctx.stroke();


    const startAngle = -Math.PI / 2;
    const progress = timeLeft / roundDuration; // Assuming you have roundDuration (e.g., 5s)
    const endAngle = startAngle + (Math.PI * 2 * progress);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 6 / aspect_size, startAngle, endAngle);
    ctx.strokeStyle = "#00f2ff"; // Cyber blue progress
    ctx.lineWidth = 4 / aspect_size;
    ctx.lineCap = "round";
    ctx.stroke();

    // 4. The Timer Text
    ctx.shadowBlur = 0; // Don't glow the text too much, or it's unreadable
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${radius * 0.9}px "Courier New", Courier, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // Adding +2 for that visual vertical centering fix
    ctx.fillText(Math.ceil(timeLeft) + "", centerX, centerY + (2 / aspect_size));

    ctx.restore();
}

/** Function that Draws the info button and also the info dialog,NOTE: vWidth and vHeight are used AND NOT canvas.width and canvas.height because
 * of screens having higher DPI so canvas needs to be scaled
 * */
function drawInfoButton(vWidth, vHeight, aspect_size) {
    if (!info.visible) return;

    ctx.save();


    ctx.beginPath();
    ctx.arc(info.x, info.y, info.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0f172a";
    ctx.fill();

    let strokeStyle
    let shadowColor
    if (mouseIsInsideCircle(info.x, info.y, info.radius)) {
        strokeStyle = info.open ? "#ff0000" : "#00f2ff"
        shadowColor = info.open ? "#ff0000" : "#00f2ff"
    } else {
        strokeStyle = info.open ? "#8e0000" : "#1e293b"
        shadowColor = info.open ? "#8e0000" : "#00f2ff"
    }


    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 2 / aspect_size;
    ctx.shadowBlur = info.open ? 15 / aspect_size : 0;
    ctx.shadowColor = shadowColor;
    ctx.stroke();

    ctx.shadowBlur = 0;
    // ctx.fillStyle = info.open ? "#00f2ff" : "#f8fafc";
    ctx.fillStyle = info.open ? "#ff0000" : "#f8fafc";
    ctx.font = `bold ${info.radius * 1.2}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (info.open) {
        ctx.fillText("x", info.x, info.y);
    } else {
        ctx.fillText("?", info.x, info.y);
    }

    ctx.restore();

    if (info.open) {
        drawInfoPopup(vWidth, aspect_size);
    }
}

function drawInfoPopup(vWidth, aspect_size) {
    const padding = 20 / aspect_size;
    const tooltipWidth = 450 / aspect_size;
    const lines = info.text.split("\n");
    const lineHeight = 18 / aspect_size; // Increased for better readability
    const tooltipHeight = lines.length * lineHeight + padding * 3;

    let tooltipX = info.x - tooltipWidth;
    let tooltipY = info.y + (30 / aspect_size);


    ctx.save();


    ctx.fillStyle = "rgba(10, 20, 40, 0.95)";
    ctx.strokeStyle = "#00f2ff";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 4 / aspect_size);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(0, 242, 255, 0.2)";
    ctx.fillRect(tooltipX, tooltipY, tooltipWidth, 25 / aspect_size);

    ctx.fillStyle = "#00f2ff";
    ctx.font = `bold ${10 / aspect_size}px monospace`;

    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(UI_TEXT.HELP_HEADER_TEXT[CURRENT_GAME_LANGUAGE], tooltipX + (10 / aspect_size), tooltipY + (12 / aspect_size));


    ctx.strokeStyle = "#00f2ff";
    ctx.lineWidth = 3 / aspect_size;
    const bLen = 10 / aspect_size;

    ctx.beginPath();
    ctx.moveTo(tooltipX + tooltipWidth - bLen, tooltipY + tooltipHeight);
    ctx.lineTo(tooltipX + tooltipWidth, tooltipY + tooltipHeight);
    ctx.lineTo(tooltipX + tooltipWidth, tooltipY + tooltipHeight - bLen);
    ctx.stroke();

    // 4. Drawing the Text
    ctx.fillStyle = "#f8fafc";
    ctx.font = `${14 / aspect_size}px monospace`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    lines.forEach((line, i) => {
        if (typeof line === "string") {
            // Adding a small bullet point for each line
            ctx.fillStyle = "#00f2ff";
            ctx.fillText(">", tooltipX + padding, tooltipY + (padding * 1.5) + i * lineHeight);

            ctx.fillStyle = "#f8fafc";
            ctx.fillText(line, tooltipX + padding + (15 / aspect_size), tooltipY + (padding * 1.5) + i * lineHeight);
        }

    });

    ctx.restore();
}

function drawImages(vWidth, vHeight, aspect_size) {
    const centerX = vWidth / 2;
    const centerY = vHeight * 0.5;
    const displayWidth = vWidth / 2.6;
    const displayHeight = displayWidth * (4 / 5);
    const spacing = vWidth * 0.07;

    currentImages.forEach((img, index) => {
        const x = (index === 0) ? centerX - spacing - displayWidth : centerX + spacing;
        const y = centerY - (displayHeight / 2);


        // 1) Draw "Analysis" Brackets (unchanged)
        // ctx.strokeStyle = "#00f2ff";
        // ctx.lineWidth = 2 / aspect_size;


        // 2) Draw image (first)
        if (img.complete) {
            ctx.drawImage(img, x, y, displayWidth, displayHeight);
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.strokeRect(x, y, displayWidth, displayHeight);
        } else {
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(x, y, displayWidth, displayHeight);
        }

        // 3) Description box + text (second)
        const font_size_scaled = Math.round(12 / aspect_size);
        const framePaddingX = 20 / aspect_size;
        const framePaddingY = 15 / aspect_size;

        // set font BEFORE measuring/wrapping
        ctx.font = `${font_size_scaled}px monospace`;

        // wrap width: subtract LEFT+RIGHT padding (use X padding, not Y)
        const maxTextWidth = displayWidth - (2 * framePaddingX);
        const lines = wrapTextToLines(img.description, ctx, maxTextWidth);

        const lineHeightPx = Math.round(font_size_scaled * 1.3);

        // default = 2 lines tall (even if only 1 line)
        const defaultLines = 2;
        const textLinesForHeight = Math.max(lines.length, defaultLines);

        const textBlockHeight = textLinesForHeight * lineHeightPx;
        const descHeight = textBlockHeight + (2 * framePaddingY);

        // ALIGNMENT RULE:
        // desc box vertical center == image bottom edge
        const imgBottom = y + displayHeight;
        const descY = imgBottom - (descHeight / 2);

        // make it slightly wider than image (your earlier plan) OR keep same width:
        const descWidth = displayWidth; // wider than image
        const descX = x;

        const wholeHeight = displayHeight + (descHeight / 2)
        img.hitbox = {x, y, w: displayWidth, h: wholeHeight};

        // draw box
        ctx.lineWidth = 2 / aspect_size;
        ctx.shadowBlur = 0;
        ctx.shadowColor = "#00f2ff";

        ctx.fillStyle = "rgba(15,23,42,1)";
        ctx.strokeStyle = "#00f2ff";
        drawCutCornerRect(descX, descY, descWidth, descHeight, 10 / aspect_size, true, true);

        if (mouseIsInside(img.hitbox.x, img.hitbox.y, img.hitbox.w, img.hitbox.h)) {
            ctx.save()
            ctx.strokeStyle = "#00f2ff";
            ctx.lineWidth = 2 / aspect_size

            ctx.beginPath();

            ctx.moveTo(x - (8 / aspect_size), y - (8 / aspect_size));
            ctx.lineTo(x + displayWidth + (8 / aspect_size), y - (8 / aspect_size));
            ctx.lineTo(x + displayWidth + (8 / aspect_size), descY + descHeight + (8 / aspect_size));
            ctx.lineTo(x - (8 / aspect_size), descY + descHeight + (8 / aspect_size));
            ctx.lineTo(x - (8 / aspect_size), y - (8 / aspect_size));
            ctx.stroke();
            ctx.restore()

        } else {
            ctx.save()
            const bLen = 15 / aspect_size;
            ctx.strokeStyle = "#00f2ff";
            ctx.lineWidth = 2 / aspect_size

            // Top Left
            ctx.beginPath();
            ctx.moveTo(x - (8 / aspect_size), y - (8 / aspect_size) + bLen);
            ctx.lineTo(x - (8 / aspect_size), y - (8 / aspect_size));
            ctx.lineTo(x - (8 / aspect_size) + bLen, y - (8 / aspect_size));
            ctx.stroke();

            // Top Right
            ctx.beginPath();
            ctx.moveTo(x + displayWidth + (8 / aspect_size) - bLen, y - (8 / aspect_size));
            ctx.lineTo(x + displayWidth + (8 / aspect_size), y - (8 / aspect_size));
            ctx.lineTo(x + displayWidth + (8 / aspect_size), y - (8 / aspect_size) + bLen);
            ctx.stroke();

            // Bottom Left
            ctx.beginPath();
            ctx.moveTo(x - (8 / aspect_size), descY + descHeight + (8 / aspect_size) - bLen);
            ctx.lineTo(x - (8 / aspect_size), descY + descHeight + (8 / aspect_size));
            ctx.lineTo(x - (8 / aspect_size) + bLen, descY + descHeight + (8 / aspect_size));
            ctx.stroke();

            // Bottom Right
            ctx.beginPath();
            ctx.moveTo(x + displayWidth + (8 / aspect_size) - bLen, descY + descHeight + (8 / aspect_size));
            ctx.lineTo(x + displayWidth + (8 / aspect_size), descY + descHeight + (8 / aspect_size));
            ctx.lineTo(x + displayWidth + (8 / aspect_size), descY + descHeight + (8 / aspect_size) - bLen);
            ctx.stroke();

            ctx.restore()
        }

        ctx.shadowBlur = 0;

        // draw centered text
        ctx.save();
        ctx.fillStyle = "#00f2ff";
        ctx.font = `${font_size_scaled}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const t_x_center = descX + (descWidth / 2);
        const t_y_center = descY + (descHeight / 2);

        // center *actual* lines within the box (even if defaultHeight is 2 lines)
        const actualTextHeight = lines.length * lineHeightPx;
        let text_y = t_y_center - (actualTextHeight / 2) + (lineHeightPx / 2);

        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], t_x_center, text_y + (i * lineHeightPx));
        }

        ctx.restore();
    });
}

function drawPasswords(vWidth, vHeight, aspect_size) {
    ctx.save();
    const scaleFont = Math.round(PASSWORDS_FONT_SIZE / aspect_size);
    ctx.font = `bold ${scaleFont}px monospace`; // Cyber standard
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    passwordChoices.forEach((pw) => {
        ctx.save()

        ctx.fillStyle = "#0f172a";
        ctx.strokeStyle = "#334155";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.roundRect(pw.x, pw.y, pw.width, pw.height, 4 / aspect_size);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#00f2ff";

        if (mouseIsInside(pw.x, pw.y, pw.width, pw.height)) {
            ctx.save();
            ctx.strokeStyle = "#00f2ff";
            ctx.lineWidth = 4 / aspect_size;
            ctx.shadowBlur = 10 / aspect_size;
            ctx.shadowColor = "#00f2ff";
            ctx.strokeRect(pw.x, pw.y, pw.width, pw.height);
            ctx.restore();
        } else {
            ctx.fillRect(pw.x, pw.y, 4 / aspect_size, pw.height);
        }


        let totalTextWidth = ctx.measureText(pw.text).width;
        let startX = pw.x + (pw.width / 2) - (totalTextWidth / 2);

        ctx.shadowBlur = 8 / aspect_size;
        for (let char of pw.text) {
            // const isSpecial = SYMBOLS.includes(char) || (char >= '0' && char <= '9');
            // ctx.fillStyle = isSpecial ? "#22c55e" : "#f8fafc";
            // ctx.shadowColor = isSpecial ? "#22c55e" : "transparent";

            ctx.fillStyle = "#f8fafc";
            ctx.fillText(char, startX, pw.y + pw.height / 2);
            startX += ctx.measureText(char).width;
        }

        if (mouseData) {
            const {mx, my} = mouseData
            if (isInside(mx, my, pw.x, pw.y, pw.width, pw.height)) {

            }
        }
        ctx.restore()
    });
    ctx.restore();
}

function drawCutCornerRect(x, y, w, h, cut, stroke = true, fill = true) {
    ctx.beginPath();
    ctx.moveTo(x + cut, y);
    ctx.lineTo(x + w - cut, y);
    ctx.lineTo(x + w, y + cut);
    ctx.lineTo(x + w, y + h - cut);
    ctx.lineTo(x + w - cut, y + h);
    ctx.lineTo(x + cut, y + h);
    ctx.lineTo(x, y + h - cut);
    ctx.lineTo(x, y + cut);
    ctx.closePath();

    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
}

function drawBonusRound(vWidth, vHeight, aspect_size) {
    const q = bonusQuestions[bonusIndex];

    // 1. Background (Dark Gradient for consistency)
    const bgGrad = ctx.createRadialGradient(vWidth / 2, vHeight / 2, 10, vWidth / 2, vHeight / 2, vWidth);
    bgGrad.addColorStop(0, "#0f172a");
    bgGrad.addColorStop(1, "#020617");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, vWidth, vHeight);

    // 2. Header: "DECRYPTION_PHASE"
    const header_y = 50 / aspect_size;
    const headerFont = Math.round(BONUS_ROUND_HEADER_TEXT_FONT_SIZE / aspect_size);

    ctx.fillStyle = "#00f2ff"; // Cyber Cyan
    ctx.textAlign = "center";
    ctx.font = `bold ${headerFont}px monospace`;
    ctx.fillText(`${UI_TEXT.BONUS_ROUND_HEADER_TEXT[CURRENT_GAME_LANGUAGE]} // [${bonusIndex + 1}/5]`, vWidth / 2, header_y);

    // Subtle line under header
    ctx.strokeStyle = "rgba(0, 242, 255, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(vWidth * 0.2, header_y + (15 / aspect_size));
    ctx.lineTo(vWidth * 0.8, header_y + (15 / aspect_size));
    ctx.stroke();

    // 3. The Question Panel
    const cardWidth = vWidth * 0.85;
    const cardHeight = 130 / aspect_size;
    const cardX = (vWidth - cardWidth) / 2;
    const cardY = 80 / aspect_size;

    // Panel Background
    ctx.fillStyle = "rgba(30, 41, 59, 0.6)"; // Semi-transparent dark blue
    ctx.strokeStyle = "#00f2ff";
    ctx.lineWidth = 2;
    drawCutCornerRect(cardX, cardY, cardWidth, cardHeight, 15 / aspect_size, true, true);

    // "SYSTEM_QUERY" Label
    ctx.fillStyle = "#94a3b8";
    ctx.font = `bold ${12 / aspect_size}px monospace`;
    ctx.textAlign = "left";
    ctx.fillText("SYSTEM_QUERY:", cardX + (10 / aspect_size), cardY + (20 / aspect_size));

    // The Actual Question Text
    const bodyFont = Math.round(BONUS_ROUND_BODY_TEXT_FONT_SIZE / aspect_size);
    ctx.fillStyle = "#ffffff";
    ctx.font = `${bodyFont}px monospace`; // Monospace for terminal look
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const padding = 40 / aspect_size;
    const lineHeight = bodyFont * 1.3;

    wrapText(
        ctx,
        q.question,
        vWidth / 2,
        cardY + (cardHeight / 2) + (10 / aspect_size), // Slight offset due to "SYSTEM_QUERY" label
        cardWidth - padding,
        lineHeight
    );

    // 4. The Options (Buttons)
    const optionWidth = vWidth * 0.7;
    const optionHeight = 55 / aspect_size;
    const startY = cardY + cardHeight + (30 / aspect_size);
    const optionGap = 18 / aspect_size;
    const x = (vWidth - optionWidth) / 2;

    const optionLineHeight = bodyFont * 0.8 * 1.3

    q.options.forEach((opt, i) => {
        ctx.save()
        const y = startY + i * (optionHeight + optionGap);
        const isSelected = selectedOption === i;

        // Button Styles
        ctx.lineWidth = 2 / aspect_size;
        if (isSelected) {
            // Selected: Green Glow
            ctx.shadowBlur = 15 / aspect_size;
            if (i === q.correctIndex) {
                ctx.shadowColor = "#21c02c";
                ctx.fillStyle = "rgb(20,104,5)"
                ctx.strokeStyle = "#21c02c";
            } else {
                ctx.shadowColor = "#c02121";
                ctx.fillStyle = "rgb(104,5,5)"
                ctx.strokeStyle = "#c02121";
            }


        } else {

            if (mouseIsInside(x, y, optionWidth, optionHeight)) {
                ctx.shadowBlur = 5;
                ctx.fillStyle = "rgb(5,92,104)"
                ctx.strokeStyle = "#475569"; // Slate border
            } else {
                ctx.shadowBlur = 0;
                ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
                ctx.strokeStyle = "#475569"; // Slate border
            }

        }

        drawCutCornerRect(x, y, optionWidth, optionHeight, 10 / aspect_size, true, true);
        ctx.shadowBlur = 0;

        ctx.fillStyle = isSelected ? "#ffffff" : "#cbd5f5";
        ctx.font = `bold ${bodyFont * 0.8}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const prefix = String.fromCharCode(65 + i); // 65 is 'A'
        // ctx.fillText(`[${prefix}] ${opt}`, vWidth / 2, y + optionHeight / 2);
        wrapText(ctx, `[${prefix}] ${opt}`, vWidth / 2, y + optionHeight / 2, optionWidth, optionLineHeight)
        // ctx.fillText(`${opt}`, vWidth / 2, y + optionHeight / 2);
        ctx.restore()
    });

    // 5. Score Readout (Bottom HUD)
    const scoreFont = Math.round(BONUS_ROUND_SCORE_TEXT_FONT_SIZE / aspect_size);
    ctx.fillStyle = "#00f2ff";
    ctx.textAlign = "center";
    ctx.font = `bold ${scoreFont}px monospace`;
    ctx.fillText(`DATA_RECOVERED: ${bonusScore}`, vWidth / 2, vHeight - (20 / aspect_size));
}

function drawLanguageToggle(vWidth, vHeight, aspect_size, addBackground = false) {
    const btnW = 50 / aspect_size;
    const btnH = 30 / aspect_size;

    const btnX = vWidth - btnW - (20 / aspect_size);
    const btnY = vHeight - btnH - (20 / aspect_size);

    const labels = ["EN", "МК", "SQ"];
    const activeLabel = labels[langIndex];

    // Hit area (keep this)
    langButtonArea = {x: btnX, y: btnY, w: btnW, h: btnH};

    const hovered = mouseIsInside(btnX, btnY, btnW, btnH);
    const drawColor = hovered ? "#00f2ff" : "#0099a0";

    ctx.save();

    // --- NEW: contrast plate behind the button for bright backgrounds ---
    if (addBackground) {
        const pad = 6 / aspect_size;
        const cut = 10 / aspect_size;

        const bx = btnX - pad;
        const by = btnY - pad;
        const bw = btnW + pad * 2;
        const bh = btnH + pad * 2;

        ctx.shadowBlur = 10 / aspect_size;
        ctx.shadowColor = "rgba(0,0,0,0.35)";

        // clipped cyber-style background plate
        ctx.beginPath();
        ctx.moveTo(bx + cut, by);
        ctx.lineTo(bx + bw, by);
        ctx.lineTo(bx + bw, by + bh - cut);
        ctx.lineTo(bx + bw - cut, by + bh);
        ctx.lineTo(bx, by + bh);
        ctx.lineTo(bx, by + cut);
        ctx.closePath();

        ctx.fillStyle = "rgba(2, 6, 23, 0.72)";        // dark slate plate
        ctx.fill();

        ctx.strokeStyle = "rgba(148, 163, 184, 0.30)"; // subtle edge
        ctx.lineWidth = 1 / aspect_size;
        ctx.stroke();

        ctx.shadowBlur = 0;
    }


    // --- your cyber clipped shape (unchanged) ---
    ctx.beginPath();
    ctx.moveTo(btnX + (10 / aspect_size), btnY);
    ctx.lineTo(btnX + btnW, btnY);
    ctx.lineTo(btnX + btnW, btnY + btnH - (10 / aspect_size));
    ctx.lineTo(btnX + btnW - (10 / aspect_size), btnY + btnH);
    ctx.lineTo(btnX, btnY + btnH);
    ctx.lineTo(btnX, btnY + (10 / aspect_size));
    ctx.closePath();

    // Fill and border
    ctx.fillStyle = "rgba(0, 242, 255, 0.10)";
    ctx.fill();
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = 2 / aspect_size;
    ctx.stroke();

    // Label
    ctx.fillStyle = drawColor;
    ctx.shadowBlur = hovered ? 15 / aspect_size : 6 / aspect_size;
    ctx.shadowColor = drawColor;
    ctx.font = `bold ${Math.round(14 / aspect_size)}px "Courier New", monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(activeLabel, btnX + btnW / 2, btnY + btnH / 2);

    ctx.restore();
}


function drawIntroScreen(vWidth, vHeight, aspect_size) {
    // Background
    const bgGrad = ctx.createRadialGradient(vWidth / 2, vHeight / 2, 10, vWidth / 2, vHeight / 2, vWidth);
    bgGrad.addColorStop(0, "#0f172a");
    bgGrad.addColorStop(1, "#020617");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, vWidth, vHeight);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Title
    ctx.fillStyle = "#00f2ff";
    ctx.shadowBlur = 12 / aspect_size;
    ctx.shadowColor = "#00f2ff";
    ctx.font = `bold ${Math.round(32 / aspect_size)}px monospace`;
    ctx.fillText(UI_TEXT.INTRO_PHASE_HEADER_TEXT[CURRENT_GAME_LANGUAGE], vWidth / 2, vHeight * 0.25);

    ctx.shadowBlur = 0;

    // Body text (keep it short)
    ctx.fillStyle = "#cbd5e1";
    ctx.font = `${Math.round(18 / aspect_size)}px monospace`;
    const subheader = UI_TEXT.INTRO_PHASE_SUBHEADER_TEXT[CURRENT_GAME_LANGUAGE];

    const lines = subheader.split("\n");


    const lineH = Math.round(26 / aspect_size);
    let startY = vHeight * 0.40;
    lines.forEach((t, i) => ctx.fillText(t + "", vWidth / 2, startY + i * lineH));

    // Button
    const w = vWidth * 0.35;
    const h = Math.round(60 / aspect_size);
    const x = (vWidth - w) / 2;
    const y = vHeight * 0.68;

    introButton = {x, y, w, h};

    drawCyberButton(UI_TEXT.INTRO_PHASE_BUTTON_TEXT[CURRENT_GAME_LANGUAGE], x, y, w, h, true, aspect_size);

    // Small hint
    ctx.fillStyle = "#717d8c";
    ctx.font = `${Math.round(14 / aspect_size)}px monospace`;
    ctx.fillText(UI_TEXT.INTRO_PHASE_BUTTON_LABEL_TEXT[CURRENT_GAME_LANGUAGE], vWidth / 2, y - (15 / aspect_size));
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    let lines = wrapTextToLines(text, context, maxWidth);

    // 2. Draw each line
    // We adjust the Y start point so the group of lines is vertically centered
    let totalHeight = lines.length * lineHeight
    let startY = y - (totalHeight / 2) + (lineHeight / 2)

    for (let k = 0; k < lines.length; k++) {
        context.fillText(lines[k], x, startY + (k * lineHeight))
    }
}

function wrapTextToLines(text, context, maxWidth) {
    const words = text.split(' ')
    let line = ''
    let lines = []

    // 1. Break text into lines
    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' '
        let metrics = context.measureText(testLine)
        let testWidth = metrics.width
        if (testWidth > maxWidth && n > 0) {
            lines.push(line)
            line = words[n] + ' '
        } else {
            line = testLine
        }
    }
    lines.push(line)
    return lines;
}

function gameLoop() {
    if (!gameRunning) {
        mainRafId = null
        return
    }

    update()
    draw()

    mainRafId = requestAnimationFrame(gameLoop)
}

function startMainLoop() {
    if (mainRafId !== null) return; // already running
    mainRafId = requestAnimationFrame(gameLoop);
}

function stopMainLoop() {
    if (mainRafId !== null) {
        cancelAnimationFrame(mainRafId);
        mainRafId = null;
    }
}

function handlePasswordChoice(text) {

    if (reallySafePasswords.includes(text)) {
        // points += 2
        addPoints(2)
    } else if (safePasswords.includes(text)) {
        // points += 1
        addPoints(1)
    } else {
        // points -= 1
        unsafeClicks += 1
        addPoints(-1)
    }
    startNewRound()
}

function handleImageChoice(img) {
    if (safeImages.includes(img)) {
        // points += 2
        addPoints(2)
    } else {
        // points -= 1
        unsafeClicks += 1
        addPoints(-1)
    }
    startNewRound()
}

function imagesReady() {
    return safeImages.length > 0 && unsafeImages.length > 0;
}

function startNewRound() {
    const canUseImages = imagesReady();

    if (canUseImages && Math.random() > 0.5) {
        currentRoundMode = IMAGES_MODE
        spawnTwoImages()
    } else {
        currentRoundMode = PASSWORDS_MODE
        spawnTwoPasswords()
    }

    timeLeft = roundTime
    lastTime = Date.now()
}

function mouseIsInside(x, y, w, h) {
    if (mouseData) {
        const {mx, my} = mouseData
        return isInside(mx, my, x, y, w, h)
    }

    return false
}

function mouseIsInsideCircle(x, y, radius) {
    if (mouseData) {
        const {mx, my} = mouseData
        const dx = mx - x
        const dy = my - y
        return Math.sqrt(dx * dx + dy * dy) <= radius
    }
    return false
}

function isInside(mx, my, x, y, w, h) {
    return mx >= x && mx <= x + w && my >= y && my <= y + h
}

function handleBonusAnswer(index) {
    if (bonusLocked) return
    bonusLocked = true

    selectedOption = index

    const q = bonusQuestions[bonusIndex]
    if (index === q.correctIndex) bonusScore++

    if (bonusTimeoutId !== null) clearTimeout(bonusTimeoutId)

    bonusTimeoutId = setTimeout(() => {
        selectedOption = null;
        bonusIndex++;

        bonusLocked = false

        if (bonusIndex >= 5) {
            endBonusRound()
        }
    }, 600);
}


function endBonusRound() {
    bonusActive = false

    if (bonusScore >= 3 && bonusScore < 4) {
        // points += bonusScore;
        resetMainGame()
    } else if (bonusScore >= 4) {
        // points += bonusScore;


        // startMiniGame()
        minigameReason = MINIGAME_REASON.BONUS_PERFECT;
        gamePhase = MINIGAME_INTRO_PHASE;
        timeLeft = Infinity;
        lastTime = Date.now();
    } else {
        successSequence = 0
        gamePhase = FINAL_GAME_OVER_PHASE
    }
}

function startBonusRound() {
    shuffleArray(bonusQuestions)
    bonusIndex = 0
    bonusScore = 0
    selectedOption = null
    bonusActive = true

    gamePhase = BONUS_ROUND_PHASE
    timeLeft = Infinity
}

function setupMobileControls(game) {

    if (document.getElementById('mobile-controls')) return;

    const overlay = document.createElement('div');
    overlay.id = 'mobile-controls';
    overlay.innerHTML = `
        <div class="d-pad">
            <div class="cyber-btn btn-arrow" data-key="left">←</div>
            <div class="cyber-btn btn-arrow" data-key="right">→</div>
        </div>
        <div class="action-pad">
            <div class="cyber-btn btn-jump" data-key="up">▲</div>
        </div>
    `;


    document.body.appendChild(overlay);

    const setKey = (key, state) => {
        if (game && game.key) {
            game.key[key] = state;
        }
    };

    const buttons = overlay.querySelectorAll('.cyber-btn');

    buttons.forEach(btn => {
        const key = btn.getAttribute('data-key');


        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            btn.classList.add('pressed');
            setKey(key, true);
        }, {passive: false});

        // Touch End
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            btn.classList.remove('pressed');
            setKey(key, false);
        });

        btn.addEventListener('mousedown', () => {
            btn.classList.add('pressed');
            setKey(key, true);
        });

        btn.addEventListener('mouseup', () => {
            btn.classList.remove('pressed');
            setKey(key, false);
        });
        btn.addEventListener('mouseleave', () => {
            btn.classList.remove('pressed');
            setKey(key, false);
        });
    });
}

function initTouchControlsIfMobile(game) {

    const isTouchDevice = (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );

    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isTouchDevice || isMobileUA) {
        setupMobileControls(game);
    }
}

/**
 * TODO - Execution Logic Here
 *
 * Од оваа линија надолу повикување и извршување на функции
 * */

canvas2D.style.display = 'none';

window.addEventListener("resize", resizeCanvas)
resizeCanvas()

startBtn.addEventListener("click", async () => {

    startBtn.disabled = true;
    startBtn.textContent = "Loading...";

    try {
        await loadGameImages();
    } catch (err) {
        console.error(err);
        startBtn.textContent = "Missing images!!!";
        return;
    }

    startScreen.style.display = 'none'
    document.getElementById('game-wrapper').style.display = 'flex'
    canvas.style.display = 'block'

    startBtn.textContent = "Start Game";
    startBtn.disabled = false;

    startGame()
})


canvas.addEventListener("click", (e) => {

    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top

    const dx = mx - info.x
    const dy = my - info.y

    const clickedInfo = Math.sqrt(dx * dx + dy * dy) <= info.radius;
    if (clickedInfo && gamePhase === PLAYING_PHASE) {
        info.open = !info.open;
        lastTime = Date.now();
        return;
    }
    if (info.open) return;

    if (isInside(mx, my, langButtonArea.x, langButtonArea.y, langButtonArea.w, langButtonArea.h)) {

        cycleLanguage();
        return;
    }

    const vWidth = canvas.width / dpr
    const vHeight = canvas.height / dpr

    const aspect_size = 900 / vWidth

    const cardHeight = 130 / aspect_size;
    const cardY = 80 / aspect_size;

    const optionWidth = vWidth * 0.7;
    const optionHeight = 55 / aspect_size;
    const startY = cardY + cardHeight + (30 / aspect_size);
    const optionGap = 18 / aspect_size;

    const optionX = (vWidth - optionWidth) / 2

    if (gamePhase === INTRO_PHASE && introButton) {
        if (isInside(mx, my, introButton.x, introButton.y, introButton.w, introButton.h)) {
            //startTraining()
            // console.log("INTRO CLICK → DESKTOP PREVIEW");
            gamePhase = DESKTOP_PREVIEW_PHASE;
            desktopPreviewStartTime = performance.now();
            return
        }
    }

    if (gamePhase === FINAL_GAME_OVER_PHASE && restartButton) {
        if (
            isInside(
                mx,
                my,
                restartButton.x,
                restartButton.y,
                restartButton.w,
                restartButton.h
            )
        ) {
            // unsafeClicks = 0
            //resetMainGame()
            startGame()

            // startMiniGame()
        }
    }

    if (gamePhase === BONUS_ROUND_PHASE) {
        bonusQuestions[bonusIndex].options.forEach((_, i) => {
            const optionY = startY + i * (optionHeight + optionGap);

            if (
                mx >= optionX &&
                mx <= optionX + optionWidth &&
                my >= optionY &&
                my <= optionY + optionHeight
            ) {
                handleBonusAnswer(i)
            }
        })
    }

    if (gamePhase === BONUS_INTRO_PHASE && bonusIntroButton) {
        if (isInside(mx, my, bonusIntroButton.x, bonusIntroButton.y, bonusIntroButton.w, bonusIntroButton.h)) {
            startBonusRound();
            retryPromptScreensPerGame += 1
            return;
        }
    }

    if (gamePhase === MINIGAME_INTRO_PHASE && minigameIntroButton) {
        if (isInside(mx, my, minigameIntroButton.x, minigameIntroButton.y, minigameIntroButton.w, minigameIntroButton.h)) {
            // clear hitbox so we don't accidentally reuse it
            minigameIntroButton = null;
            startMiniGame();
            return;
        }
    }

    if (gamePhase === RETRY_PROMPT_PHASE) {

        const buttonW = vWidth * 0.35;
        const buttonH = Math.round(60 / aspect_size);
        const button_spacing = Math.round(20 / aspect_size);

        if (isInside(mx, my, vWidth / 2 - buttonW - button_spacing, vHeight * 0.56, buttonW, buttonH)) {
            gamePhase = BONUS_INTRO_PHASE;
            return
        }

        if (isInside(mx, my, vWidth / 2 + button_spacing, vHeight * 0.56, buttonW, buttonH)) {
            startGame()
            return
        }
    }

    if (currentRoundMode === PASSWORDS_MODE) {
        passwordChoices.forEach(pw => {
            if (isInside(mx, my, pw.x, pw.y, pw.width, pw.height)) {
                handlePasswordChoice(pw.text)
            }
        })
    } else if (currentRoundMode === IMAGES_MODE) {
        currentImages.forEach(img => {
            if (img.hitbox && isInside(mx, my, img.hitbox.x, img.hitbox.y, img.hitbox.w, img.hitbox.h)) {
                handleImageChoice(img)
            }
        })
    }
})

canvas.addEventListener("mousemove", (e) => {

    if (isTouchActive) return;

    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    mouseData = {
        mx,
        my,
        isTouch: false
    }
})

// Handle Touches
canvas.addEventListener('touchstart', (e) => {
    isTouchActive = true;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouseData = {
        mx: touch.clientX - rect.left,
        my: touch.clientY - rect.top,
        isTouch: true // Flag to identify touch
    };
}, {passive: false});

canvas.addEventListener('touchend', () => {

    mouseData = null;


    setTimeout(() => {
        isTouchActive = false;
    }, 250);

}, {passive: false});

canvas.addEventListener("mouseleave", () => {
    mouseData = null
});

