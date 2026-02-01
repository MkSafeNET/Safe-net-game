import {GAME_LANGUAGES} from "./languages.js";

const questions = {}

questions[GAME_LANGUAGES.ENGLISH_LANGUAGE] = [
    {
        question: "Marko receives an urgent email saying his social media account has suspicious activity and asks him to click a link to log in. What should he do?",
        options: [
            "Click the link and log in immediately",
            "Open the official website and check account security",
            "Reply to the email asking if it is real"
        ],
        correctIndex: 1
    },
    {
        question: "Ana makes a new friend in an online game who asks for her real name and school to become closer friends. What is the safest action?",
        options: [
            "Share the information to build trust",
            "Ask the friend for their information first",
            "Keep personal information private and continue playing"
        ],
        correctIndex: 2
    },
    {
        question: "Filip finds a free photo-editing app on a random website that promises extra features if installed quickly. What should he do?",
        options: [
            "Download and install it right away",
            "Download apps only from official app stores",
            "Disable antivirus so it installs faster"
        ],
        correctIndex: 1
    },
    {
        question: "Elena connects to public Wi-Fi at a café and wants to check her bank account. What is the safest choice?",
        options: [
            "Avoid sensitive logins or use a secure connection",
            "Log in normally because the Wi-Fi is free",
            "Save passwords on the browser"
        ],
        correctIndex: 0
    },
    {
        question: "Ivan sees a website claiming he won a prize and asking for his personal details. What should he do?",
        options: [
            "Enter the details to claim the prize",
            "Close the website and ignore the message",
            "Share the website with friends"
        ],
        correctIndex: 1
    },
    {
        question: "Mila struggles to remember many passwords for her accounts. What is the safest solution?",
        options: [
            "Use the same password everywhere",
            "Use a password manager with a strong master password",
            "Write passwords in an unprotected notes app"
        ],
        correctIndex: 1
    },
    {
        question: "Nikola receives an email with an attachment from an unknown sender labeled 'Important Information'. What should he do?",
        options: [
            "Delete the email without opening anything",
            "Open the attachment to check it",
            "Forward it to friends"
        ],
        correctIndex: 0
    },
    {
        question: "Sara wants more followers and thinks about sharing more personal details publicly. What is the safest option?",
        options: [
            "Keep the account private and limit shared information",
            "Share location and personal details publicly",
            "Accept all friend requests"
        ],
        correctIndex: 0
    },
    {
        question: "David receives a notification that someone tried to log into his account from another country. What should he do?",
        options: [
            "Ignore the alert",
            "Change the password and enable two-factor authentication",
            "Post about it on social media"
        ],
        correctIndex: 1
    },
    {
        question: "Lena sees a viral online challenge asking people to share personal secrets. What is the safest response?",
        options: [
            "Join the challenge to feel included",
            "Avoid the challenge and report it if needed",
            "Watch others participate"
        ],
        correctIndex: 1
    },
    {
        question: "Petar logs into his email on a shared school computer. What should he do when finished?",
        options: [
            "Leave the account logged in",
            "Save the password for later use",
            "Log out and close the browser"
        ],
        correctIndex: 2
    },
    {
        question: "Katerina sees a pop-up chat claiming to be technical support asking for her login details. What should she do?",
        options: [
            "Share the login details",
            "Continue chatting",
            "Close the chat and contact official support channels"
        ],
        correctIndex: 2
    },
    {
        question: "Alex wants to post photos from inside his home on social media. What is the safest action?",
        options: [
            "Post everything publicly",
            "Check privacy settings before posting",
            "Tag the exact location and address"
        ],
        correctIndex: 1
    },
    {
        question: "Teodora wants to install a browser extension that asks for full access to all websites. What should she do?",
        options: [
            "Install it without reading anything",
            "Check permissions and reviews before installing",
            "Disable browser security features"
        ],
        correctIndex: 1
    },
    {
        question: "Bojan receives a password reset email he did not request. What is the safest choice?",
        options: [
            "Verify the request by logging in to the official site",
            "Click the link immediately",
            "Ignore all emails forever"
        ],
        correctIndex: 0
    },
    {
        question: "A stranger sends Maria a friend request with no profile picture and few friends. What should she do?",
        options: [
            "Ignore or block the request",
            "Accept the request",
            "Send a message asking who they are"
        ],
        correctIndex: 0
    },
    {
        question: "Stefan wants to use the same password for school and gaming accounts. What is safest?",
        options: [
            "Use the same password",
            "Use different strong passwords",
            "Share passwords with friends"
        ],
        correctIndex: 1
    },
    {
        question: "A website asks Viktor for his birth year and home address to continue. What should he do?",
        options: [
            "Enter the information",
            "Guess fake information",
            "Leave the website"
        ],
        correctIndex: 2
    },
    {
        question: "An app asks for access to contacts and microphone without explanation. What is safest?",
        options: [
            "Allow everything",
            "Deny permissions or uninstall",
            "Ignore the warning"
        ],
        correctIndex: 1
    },
    {
        question: "A classmate asks for Ivana’s login details to help with homework. What should she do?",
        options: [
            "Share the login details",
            "Refuse and keep the account secure",
            "Change password later"
        ],
        correctIndex: 1
    },
    {
        question: "A website URL looks strange but has attractive offers. What should Andrej do?",
        options: [
            "Click and explore",
            "Check the URL carefully or avoid the site",
            "Enter fake data"
        ],
        correctIndex: 1
    },
    {
        question: "Tina notices her device is slower and showing many ads. What should she do?",
        options: [
            "Ignore it",
            "Install more apps",
            "Scan the device for malware"
        ],
        correctIndex: 2
    },
    {
        question: "An online quiz asks for Luka’s email and password to see results. What is safest?",
        options: [
            "Close the quiz",
            "Enter the information",
            "Use someone else’s account"
        ],
        correctIndex: 0
    },
    {
        question: "A friend sends a link saying “You must see this!” What should Jana do?",
        options: [
            "Click immediately",
            "Confirm with the friend first",
            "Forward it to others"
        ],
        correctIndex: 1
    },
    {
        question: "An unknown number messages Petar asking for a verification code. What should he do?",
        options: [
            "Send the code",
            "Ask why they need it",
            "Ignore and block the number",

        ],
        correctIndex: 2
    },
];
questions[GAME_LANGUAGES.MACEDONIAN_LANGUAGE] = [
    {
        question: "Марко добива итен е-маил во кој пишува дека неговиот профил на социјалните мрежи има сомнителна активност и бара да кликне линк за да се најави. Што треба да направи?",
        options: [
            "Да кликне на линкот и веднаш да се најави",
            "Да ја отвори официјалната веб-страница и да ја провери безбедноста на профилот",
            "Да одговори на е-маилот и да праша дали е вистински"
        ],
        correctIndex: 1
    },
    {
        question: "Ана запознава нов пријател во онлајн игра кој ја прашува за нејзиното вистинско име и училиште за да станат поблиски пријатели. Кој е најбезбедниот чекор?",
        options: [
            "Да ги сподели информациите за да изгради доверба",
            "Прво да го праша пријателот за неговите информации",
            "Да ги задржи личните информации приватни и да продолжи да игра"
        ],
        correctIndex: 2
    },
    {
        question: "Филип наоѓа бесплатна апликација за уредување фотографии на случајна веб-страница која ветува дополнителни функции ако се инсталира брзо. Што треба да направи?",
        options: [
            "Веднаш да ја преземе и инсталира",
            "Да презема апликации само од официјални продавници за апликации",
            "Да го исклучи антивирусот за побрза инсталација"
        ],
        correctIndex: 1
    },
    {
        question: "Елена се поврзува на јавна Wi-Fi мрежа во кафуле и сака да ја провери својата банкарска сметка. Кој е најбезбедниот избор?",
        options: [
            "Да избегнува чувствителни најави или да користи безбедна конекција",
            "Да се најави нормално бидејќи Wi-Fi мрежата е бесплатна",
            "Да ги зачува лозинките во прелистувачот"
        ],
        correctIndex: 0
    },
    {
        question: "Иван гледа веб-страница која тврди дека добил награда и бара лични податоци. Што треба да направи?",
        options: [
            "Да ги внесе податоците за да ја добие наградата",
            "Да ја затвори веб-страницата и да ја игнорира пораката",
            "Да ја сподели веб-страницата со пријатели"
        ],
        correctIndex: 1
    },
    {
        question: "Мила има проблем да запамети многу лозинки за своите профили. Кое е најбезбедното решение?",
        options: [
            "Да користи иста лозинка насекаде",
            "Да користи менаџер за лозинки со силна главна лозинка",
            "Да ги запише лозинките во незаштитена апликација за белешки"
        ],
        correctIndex: 1
    },
    {
        question: "Никола добива е-маил со прилог од непознат испраќач со наслов „Важни информации“. Што треба да направи?",
        options: [
            "Да го избрише е-маилот без да отвори ништо",
            "Да го отвори прилогот за да провери што е",
            "Да го препрати до пријатели"
        ],
        correctIndex: 0
    },
    {
        question: "Сара сака повеќе следбеници и размислува да споделува повеќе лични детали јавно. Кој е најбезбедниот избор?",
        options: [
            "Да го направи профилот приватен и да ги ограничи споделените информации",
            "Да споделува локација и лични детали јавно",
            "Да прифаќа сите барања за пријателство"
        ],
        correctIndex: 0
    },
    {
        question: "Давид добива известување дека некој се обидел да се најави на неговиот профил од друга држава. Што треба да направи?",
        options: [
            "Да го игнорира известувањето",
            "Да ја смени лозинката и да вклучи двофакторска автентикација",
            "Да објави за тоа на социјалните мрежи"
        ],
        correctIndex: 1
    },
    {
        question: "Лена гледа вирален онлајн предизвик кој бара луѓето да споделуваат лични тајни. Кој е најбезбедниот одговор?",
        options: [
            "Да учествува за да се чувствува прифатено",
            "Да го избегне предизвикот и да го пријави ако е потребно",
            "Само да гледа како другите учествуваат"
        ],
        correctIndex: 1
    },
    {
        question: "Петар се најавува на својот е-маил на заеднички училишен компјутер. Што треба да направи кога ќе заврши?",
        options: [
            "Да го остави профилот најавен",
            "Да ја зачува лозинката за подоцна",
            "Да се одјави и да го затвори прелистувачот"
        ],
        correctIndex: 2
    },
    {
        question: "Катерина гледа pop-up разговор кој тврди дека е техничка поддршка и бара податоци за најава. Што треба да направи?",
        options: [
            "Да ги сподели податоците за најава",
            "Да продолжи со разговорот",
            "Да го затвори разговорот и да контактира официјална поддршка"
        ],
        correctIndex: 2
    },
    {
        question: "Алекс сака да објави фотографии од внатрешноста на својот дом на социјалните мрежи. Кој е најбезбедниот чекор?",
        options: [
            "Да објави сè јавно",
            "Да ги провери поставките за приватност пред објавување",
            "Да ја означи точната локација и адреса"
        ],
        correctIndex: 1
    },
    {
        question: "Теодора сака да инсталира додаток за прелистувач кој бара целосен пристап до сите веб-страници. Што треба да направи?",
        options: [
            "Да го инсталира без да чита ништо",
            "Да ги провери дозволите и рецензиите пред инсталација",
            "Да ги исклучи безбедносните функции на прелистувачот"
        ],
        correctIndex: 1
    },
    {
        question: "Бојан добива е-маил за ресетирање лозинка што тој не го побарал. Кој е најбезбедниот избор?",
        options: [
            "Да го провери барањето со најава на официјалната веб-страница",
            "Веднаш да кликне на линкот",
            "Да ги игнорира сите е-маилови засекогаш"
        ],
        correctIndex: 0
    },
    {
        question: "Непознато лице ѝ испраќа барање за пријателство на Марија без профилна слика и со малку пријатели. Што треба да направи?",
        options: [
            "Да го игнорира или блокира барањето",
            "Да го прифати барањето",
            "Да испрати порака за да праша кој е"
        ],
        correctIndex: 0
    },
    {
        question: "Стефан сака да користи иста лозинка за училишни и гејминг профили. Што е најбезбедно?",
        options: [
            "Да користи иста лозинка",
            "Да користи различни силни лозинки",
            "Да ги споделува лозинките со пријатели"
        ],
        correctIndex: 1
    },
    {
        question: "Веб-страница бара од Виктор година на раѓање и домашна адреса за да продолжи. Што треба да направи?",
        options: [
            "Да ги внесе информациите",
            "Да внесе лажни информации",
            "Да ја напушти веб-страницата"
        ],
        correctIndex: 2
    },
    {
        question: "Апликација бара пристап до контакти и микрофон без објаснување. Што е најбезбедно?",
        options: [
            "Да дозволи сè",
            "Да ги одбие дозволите или да ја деинсталира апликацијата",
            "Да го игнорира предупредувањето"
        ],
        correctIndex: 1
    },
    {
        question: "Соученик бара од Ивана податоци за најава за да помогне со домашна задача. Што треба да направи?",
        options: [
            "Да ги сподели податоците за најава",
            "Да одбие и да го задржи профилот безбеден",
            "Подоцна да ја смени лозинката"
        ],
        correctIndex: 1
    },
    {
        question: "URL адреса на веб-страница изгледа чудно, но има привлечни понуди. Што треба да направи Андреј?",
        options: [
            "Да кликне и да истражи",
            "Внимателно да ја провери адресата или да ја избегне страницата",
            "Да внесе лажни податоци"
        ],
        correctIndex: 1
    },
    {
        question: "Тина забележува дека нејзиниот уред е побавен и прикажува многу реклами. Што треба да направи?",
        options: [
            "Да го игнорира",
            "Да инсталира уште апликации",
            "Да го скенира уредот за малициозен софтвер"
        ],
        correctIndex: 2
    },
    {
        question: "Онлајн квиз бара од Лука е-маил и лозинка за да ги види резултатите. Што е најбезбедно?",
        options: [
            "Да го затвори квизот",
            "Да ги внесе податоците",
            "Да користи туѓ профил"
        ],
        correctIndex: 0
    },
    {
        question: "Пријател испраќа линк со порака „Мораш да го видиш ова!“. Што треба да направи Јана?",
        options: [
            "Веднаш да кликне",
            "Прво да провери со пријателот",
            "Да го препрати на други"
        ],
        correctIndex: 1
    },
    {
        question: "Непознат број му пишува на Петар и бара верификациски код. Што треба да направи?",
        options: [
            "Да го испрати кодот",
            "Да праша зошто им е потребен",
            "Да го игнорира и блокира бројот"

        ],
        correctIndex: 2
    },
];
questions[GAME_LANGUAGES.ALBANIAN_LANGUAGE] = [
    {
        question: "Marko merr një email urgjent që thotë se llogaria e tij në rrjetet sociale ka aktivitet të dyshimtë dhe i kërkon të klikojë një link për t’u identifikuar. Çfarë duhet të bëjë?",
        options: [
            "Të klikojë linkun dhe të identifikohet menjëherë",
            "Të hapë faqen zyrtare dhe të kontrollojë sigurinë e llogarisë",
            "T’i përgjigjet emailit duke pyetur nëse është i vërtetë"
        ],
        correctIndex: 1
    },
    {
        question: "Ana bën një shok të ri në një lojë online që i kërkon emrin e vërtetë dhe shkollën për t’u bërë miq më të afërt. Cili është veprimi më i sigurt?",
        options: [
            "T’i ndajë informacionet për të ndërtuar besim",
            "Ta pyesë shokun për informacionet e tij fillimisht",
            "T’i mbajë private informacionet personale dhe të vazhdojë lojën"
        ],
        correctIndex: 2
    },
    {
        question: "Filipi gjen një aplikacion falas për editim fotografish në një faqe të rastësishme që premton veçori shtesë nëse instalohet shpejt. Çfarë duhet të bëjë?",
        options: [
            "Ta shkarkojë dhe instalojë menjëherë",
            "Të shkarkojë aplikacione vetëm nga dyqanet zyrtare",
            "Të çaktivizojë antivirusin që të instalohet më shpejt"
        ],
        correctIndex: 1
    },
    {
        question: "Elena lidhet me Wi-Fi publik në një kafene dhe dëshiron të kontrollojë llogarinë bankare. Cili është zgjidhja më e sigurt?",
        options: [
            "Të shmangë hyrjet e ndjeshme ose të përdorë lidhje të sigurt",
            "Të identifikohet normalisht sepse Wi-Fi është falas",
            "T’i ruajë fjalëkalimet në shfletues"
        ],
        correctIndex: 0
    },
    {
        question: "Ivani sheh një faqe interneti që pretendon se ka fituar një çmim dhe kërkon të dhëna personale. Çfarë duhet të bëjë?",
        options: [
            "T’i fusë të dhënat për të marrë çmimin",
            "Ta mbyllë faqen dhe ta injorojë mesazhin",
            "Ta ndajë faqen me miqtë"
        ],
        correctIndex: 1
    },
    {
        question: "Mila ka vështirësi të mbajë mend shumë fjalëkalime për llogaritë e saj. Cila është zgjidhja më e sigurt?",
        options: [
            "Të përdorë të njëjtin fjalëkalim kudo",
            "Të përdorë një menaxher fjalëkalimesh me fjalëkalim kryesor të fortë",
            "T’i shkruajë fjalëkalimet në një aplikacion shënimesh të pambrojtur"
        ],
        correctIndex: 1
    },
    {
        question: "Nikola merr një email me bashkëngjitje nga një dërgues i panjohur me titullin “Informacion i rëndësishëm”. Çfarë duhet të bëjë?",
        options: [
            "Ta fshijë emailin pa hapur asgjë",
            "Ta hapë bashkëngjitjen për të parë çfarë është",
            "Ta dërgojë te miqtë"
        ],
        correctIndex: 0
    },
    {
        question: "Sara dëshiron më shumë ndjekës dhe mendon të ndajë më shumë detaje personale publikisht. Cila është zgjedhja më e sigurt?",
        options: [
            "Ta mbajë llogarinë private dhe të kufizojë informacionet e ndara",
            "Të ndajë vendndodhjen dhe detaje personale publikisht",
            "Të pranojë të gjitha kërkesat për miqësi"
        ],
        correctIndex: 0
    },
    {
        question: "Davidi merr një njoftim se dikush ka tentuar të hyjë në llogarinë e tij nga një shtet tjetër. Çfarë duhet të bëjë?",
        options: [
            "Ta injorojë njoftimin",
            "Të ndryshojë fjalëkalimin dhe të aktivizojë autentifikimin me dy faktorë",
            "Të postojë për këtë në rrjetet sociale"
        ],
        correctIndex: 1
    },
    {
        question: "Lena sheh një sfidë virale online që kërkon nga njerëzit të ndajnë sekrete personale. Cili është reagimi më i sigurt?",
        options: [
            "Të marrë pjesë për t’u ndjerë e përfshirë",
            "Ta shmangë sfidën dhe ta raportojë nëse është e nevojshme",
            "Të shikojë të tjerët duke marrë pjesë"
        ],
        correctIndex: 1
    },
    {
        question: "Petari hyn në emailin e tij në një kompjuter të përbashkët në shkollë. Çfarë duhet të bëjë pasi të mbarojë?",
        options: [
            "Ta lërë llogarinë të hapur",
            "Ta ruajë fjalëkalimin për më vonë",
            "Të dalë nga llogaria dhe të mbyllë shfletuesin"
        ],
        correctIndex: 2
    },
    {
        question: "Katerina sheh një dritare pop-up që pretendon se është mbështetje teknike dhe kërkon të dhëna hyrjeje. Çfarë duhet të bëjë?",
        options: [
            "T’i ndajë të dhënat e hyrjes",
            "Të vazhdojë bisedën",
            "Ta mbyllë bisedën dhe të kontaktojë kanalet zyrtare të mbështetjes"
        ],
        correctIndex: 2
    },
    {
        question: "Aleksi dëshiron të postojë foto nga brenda shtëpisë së tij në rrjetet sociale. Cili është veprimi më i sigurt?",
        options: [
            "T’i postojë të gjitha publikisht",
            "Të kontrollojë cilësimet e privatësisë para postimit",
            "Të etiketojë vendndodhjen dhe adresën e saktë"
        ],
        correctIndex: 1
    },
    {
        question: "Teodora dëshiron të instalojë një shtesë shfletuesi që kërkon qasje të plotë në të gjitha faqet. Çfarë duhet të bëjë?",
        options: [
            "Ta instalojë pa lexuar asgjë",
            "Të kontrollojë lejet dhe vlerësimet para instalimit",
            "Të çaktivizojë veçoritë e sigurisë së shfletuesit"
        ],
        correctIndex: 1
    },
    {
        question: "Bojani merr një email për rivendosje fjalëkalimi që ai nuk e ka kërkuar. Cila është zgjedhja më e sigurt?",
        options: [
            "Ta verifikojë kërkesën duke hyrë në faqen zyrtare",
            "Të klikojë menjëherë linkun",
            "T’i injorojë të gjitha email-et përgjithmonë"
        ],
        correctIndex: 0
    },
    {
        question: "Një i panjohur i dërgon Marisë një kërkesë miqësie pa foto profili dhe me pak miq. Çfarë duhet të bëjë?",
        options: [
            "Ta injorojë ose ta bllokojë kërkesën",
            "Ta pranojë kërkesën",
            "T’i dërgojë mesazh për të pyetur kush është"
        ],
        correctIndex: 0
    },
    {
        question: "Stefani dëshiron të përdorë të njëjtin fjalëkalim për llogaritë e shkollës dhe lojërave. Çfarë është më e sigurta?",
        options: [
            "Të përdorë të njëjtin fjalëkalim",
            "Të përdorë fjalëkalime të ndryshme dhe të forta",
            "T’i ndajë fjalëkalimet me miqtë"
        ],
        correctIndex: 1
    },
    {
        question: "Një faqe interneti i kërkon Viktorit vitin e lindjes dhe adresën e shtëpisë për të vazhduar. Çfarë duhet të bëjë?",
        options: [
            "T’i fusë informacionet",
            "Të fusë informacione të rreme",
            "Ta lërë faqen"
        ],
        correctIndex: 2
    },
    {
        question: "Një aplikacion kërkon qasje në kontaktet dhe mikrofonin pa shpjegim. Çfarë është më e sigurta?",
        options: [
            "Të lejojë gjithçka",
            "T’i mohojë lejet ose ta çinstalojë aplikacionin",
            "Ta injorojë paralajmërimin"
        ],
        correctIndex: 1
    },
    {
        question: "Një shoqe klase i kërkon Ivanës të dhënat e hyrjes për ta ndihmuar me detyrat. Çfarë duhet të bëjë?",
        options: [
            "T’i ndajë të dhënat e hyrjes",
            "Të refuzojë dhe ta mbajë llogarinë të sigurt",
            "Ta ndryshojë fjalëkalimin më vonë"
        ],
        correctIndex: 1
    },
    {
        question: "Adresa URL e një faqeje duket e çuditshme por ka oferta tërheqëse. Çfarë duhet të bëjë Andreji?",
        options: [
            "Të klikojë dhe të eksplorojë",
            "Ta kontrollojë me kujdes adresën ose ta shmangë faqen",
            "Të fusë të dhëna të rreme"
        ],
        correctIndex: 1
    },
    {
        question: "Tina vëren se pajisja e saj është më e ngadaltë dhe shfaq shumë reklama. Çfarë duhet të bëjë?",
        options: [
            "Ta injorojë",
            "Të instalojë më shumë aplikacione",
            "Ta skanojë pajisjen për malware"
        ],
        correctIndex: 2
    },
    {
        question: "Një kuiz online i kërkon Lukës emailin dhe fjalëkalimin për të parë rezultatet. Çfarë është më e sigurta?",
        options: [
            "Ta mbyllë kuizin",
            "T’i fusë informacionet",
            "Të përdorë llogarinë e dikujt tjetër"
        ],
        correctIndex: 0
    },
    {
        question: "Një mik i dërgon një link me mesazhin “Duhet ta shohësh këtë!”. Çfarë duhet të bëjë Jana?",
        options: [
            "Të klikojë menjëherë",
            "Të konfirmojë fillimisht me mikun",
            "Ta dërgojë te të tjerët"
        ],
        correctIndex: 1
    },
    {
        question: "Një numër i panjohur i dërgon mesazh Petarit duke kërkuar një kod verifikimi. Çfarë duhet të bëjë?",
        options: [
            "Ta dërgojë kodin",
            "Të pyesë pse u duhet",
            "Ta injorojë dhe ta bllokojë numrin"
        ],
        correctIndex: 2
    },
];

export default questions;