import {GAME_LANGUAGES} from "./languages.js";


const HELP_TEXT = {}

HELP_TEXT[GAME_LANGUAGES.ENGLISH_LANGUAGE] = `A password is SAFE if it meets ALL of 
these rules:

Length
- At least 8 characters

Character variety
- Contains at least 3 of these 4 types:
  Uppercase (A–Z)
  Lowercase (a–z)
  Number (0–9)
  Special character (! @ # $ % & *)

No common patterns
- Does NOT contain: "1234", "password", 
"qwerty", "admin"
- No repeated characters like "aaaa"

No personal info
- Does NOT include: Name, Birth year, Username

TIPS:
- Numbers and special characters are in the color 
  Green so that they can be noticed easily`
HELP_TEXT[GAME_LANGUAGES.MACEDONIAN_LANGUAGE] = `Лозинката е БЕЗБЕДНА ако ги исполнува СИТЕ 
овие правила:

Должина
- Најмалку 8 карактери

Разновидност на карактери
- Содржи најмалку 3 од овие 4 типови:
  Големи букви (A–Z)
  Мали букви (a–z)
  Бројки (0–9)
  Специјални карактери (! @ # $ % & *)

Без вообичаени шеми
- НЕ содржи: "1234", "password", 
"qwerty", "admin"
- Без повторување карактери како "aaaa"

Без лични информации
- НЕ вклучува: Име, Година на раѓање, 
  Корисничко име

СОВЕТИ:
- Бројките и специјалните карактери се во 
  Зелена боја за полесно да се забележат`
HELP_TEXT[GAME_LANGUAGES.ALBANIAN_LANGUAGE] = `Fjalëkalimi është i SIGURT nëse plotëson TË 
GJITHA këto rregulla:

Gjatësia
- Të paktën 8 karaktere

Larmi karakteresh
- Përmban të paktën 3 nga këto 4 lloje:
  Shkronja të mëdha (A–Z)
  Shkronja të vogla (a–z)
  Numra (0–9)
  Karaktere speciale (! @ # $ % & *)

Pa modele të zakonshme
- NUK përmban: "1234", "password", 
"qwerty", "admin"
- Pa karaktere të përsëritura si "aaaa"

Pa informacione personale
- NUK përfshin: Emrin, Vitin e lindjes, Emrin 
  e përdoruesit

KËSHILLA:
- Numrat dhe karakteret speciale janë me ngjyrë 
  të Gjelbër që të dallohen më lehtë`


export {HELP_TEXT}

