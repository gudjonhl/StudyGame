import type { ReadingText } from './types';

/**
 * Danskir lestrartextar. Spurningar og svör eru á íslensku af því að krakkarnir
 * eru að læra dönsku. `glossary` eru orð sem hægt er að ýta á í textanum til
 * að sjá íslenska þýðingu.
 *
 * Til að bæta við texta: afritaðu eina færslu og breyttu. `level` er 1–3 og
 * `correctIndex` segir hvaða svarmöguleiki er réttur (0 = sá fyrsti).
 */
export const DANISH_TEXTS: ReadingText[] = [
  {
    id: 'da-bella',
    language: 'da',
    level: 1,
    title: 'Min hund Bella',
    body:
      'Jeg hedder Emma, og jeg er ti år gammel. Jeg har en hund. Den hedder Bella. Bella er tre år gammel og meget sød. Den er brun og hvid.\n\nBella elsker at lege i haven. Hver morgen går jeg en tur med Bella. Om aftenen sover den i min seng. Bella er min bedste ven.',
    glossary: [
      { word: 'hedder', translation: 'heiti' },
      { word: 'hund', translation: 'hundur' },
      { word: 'sød', translation: 'sæt/krúttleg' },
      { word: 'haven', translation: 'garðurinn' },
      { word: 'morgen', translation: 'morgunn' },
      { word: 'aftenen', translation: 'kvöldið' },
      { word: 'seng', translation: 'rúm' },
      { word: 'ven', translation: 'vinur' },
    ],
    questions: [
      {
        prompt: 'Hvað heitir hundurinn?',
        choices: ['Bella', 'Emma', 'Lúna', 'Snati'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvernig er Bella á litinn?',
        choices: ['Brún og hvít', 'Svört', 'Grá og hvít', 'Gul'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvar elskar Bella að leika sér?',
        choices: ['Í garðinum', 'Í fjörunni', 'Í skólanum', 'Inni í eldhúsi'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvar sefur Bella á kvöldin?',
        choices: ['Í rúminu hjá Emmu', 'Úti í garði', 'Í körfu í eldhúsinu', 'Í sófanum'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-skolen',
    language: 'da',
    level: 1,
    title: 'I skolen',
    body:
      'Jeg hedder Lukas. Jeg går i fjerde klasse. Min skole er stor og gul. Min lærer hedder Mette. Hun er sød og dygtig.\n\nJeg kan godt lide matematik og idræt. I frikvarteret spiller jeg fodbold med mine venner. Efter skole spiser jeg et æble og laver lektier.',
    glossary: [
      { word: 'klasse', translation: 'bekkur' },
      { word: 'lærer', translation: 'kennari' },
      { word: 'dygtig', translation: 'dugleg(ur)' },
      { word: 'idræt', translation: 'íþróttir' },
      { word: 'frikvarteret', translation: 'frímínúturnar' },
      { word: 'venner', translation: 'vinir' },
      { word: 'æble', translation: 'epli' },
      { word: 'lektier', translation: 'heimanám' },
    ],
    questions: [
      {
        prompt: 'Í hvaða bekk er Lukas?',
        choices: ['Fjórða bekk', 'Þriðja bekk', 'Fimmta bekk', 'Sjötta bekk'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað heitir kennarinn hans?',
        choices: ['Mette', 'Lukas', 'Emma', 'Sofie'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gerir Lukas í frímínútum?',
        choices: ['Spilar fótbolta', 'Les bók', 'Teiknar', 'Spilar tölvuleiki'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað borðar Lukas eftir skóla?',
        choices: ['Epli', 'Banana', 'Köku', 'Brauð'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-familie',
    language: 'da',
    level: 1,
    title: 'Min familie',
    body:
      'Vi er fem i min familie: mor, far, min storebror, min lillesøster og mig. Vi bor i et rødt hus med en lille have.\n\nMin mor arbejder på et hospital. Min far laver god mad. Min bror spiller computer hele dagen, og min søster er kun fire år. Om søndagen ser vi film sammen og spiser popcorn.',
    glossary: [
      { word: 'storebror', translation: 'stóri bróðir' },
      { word: 'lillesøster', translation: 'litla systir' },
      { word: 'bor', translation: 'búum' },
      { word: 'hus', translation: 'hús' },
      { word: 'arbejder', translation: 'vinnur' },
      { word: 'mad', translation: 'matur' },
      { word: 'søndagen', translation: 'sunnudaginn' },
      { word: 'sammen', translation: 'saman' },
    ],
    questions: [
      {
        prompt: 'Hvað eru margir í fjölskyldunni?',
        choices: ['Fimm', 'Fjórir', 'Sex', 'Þrír'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvar vinnur mamman?',
        choices: ['Á spítala', 'Í skóla', 'Í búð', 'Á veitingastað'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gerir bróðirinn allan daginn?',
        choices: ['Spilar tölvuleiki', 'Spilar fótbolta', 'Les bækur', 'Eldar mat'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gerir fjölskyldan á sunnudögum?',
        choices: ['Horfir á mynd saman', 'Fer í sund', 'Fer í göngutúr', 'Spilar á spil'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-fodselsdag',
    language: 'da',
    level: 1,
    title: 'Min fødselsdag',
    body:
      'I dag har jeg fødselsdag. Jeg bliver elleve år. Mine venner kommer klokken to. Vi skal spise chokoladekage og drikke saftevand. Min mor har lavet kagen.\n\nJeg ønsker mig en ny cykel og en fodbold. Om aftenen åbner jeg mine gaver. Fødselsdage er den bedste dag i året!',
    glossary: [
      { word: 'fødselsdag', translation: 'afmæli' },
      { word: 'elleve', translation: 'ellefu' },
      { word: 'chokoladekage', translation: 'súkkulaðikaka' },
      { word: 'saftevand', translation: 'saft/djús' },
      { word: 'ønsker', translation: 'óska' },
      { word: 'cykel', translation: 'hjól' },
      { word: 'gaver', translation: 'gjafir' },
      { word: 'bedste', translation: 'besti' },
    ],
    questions: [
      {
        prompt: 'Hvað verður krakkinn gamall?',
        choices: ['Ellefu ára', 'Tíu ára', 'Tólf ára', 'Níu ára'],
        correctIndex: 0,
      },
      {
        prompt: 'Klukkan hvað koma vinirnir?',
        choices: ['Klukkan tvö', 'Klukkan þrjú', 'Klukkan eitt', 'Klukkan fjögur'],
        correctIndex: 0,
      },
      {
        prompt: 'Hver bjó til kökuna?',
        choices: ['Mamma', 'Pabbi', 'Amma', 'Vinirnir'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað óskar krakkinn sér í afmælisgjöf?',
        choices: ['Hjól og fótbolta', 'Tölvuleik og bók', 'Hund og kött', 'Síma og úr'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-fodbold',
    language: 'da',
    level: 2,
    title: 'Fodboldkampen',
    body:
      'I lørdags spillede vores hold en vigtig fodboldkamp. Vejret var koldt, og det regnede lidt. I første halvleg scorede det andet hold to mål. Vi var meget kede af det.\n\nMen i anden halvleg spillede vi meget bedre. Jonas scorede et flot mål, og lige før kampen sluttede, scorede jeg selv! Kampen endte to-to. Bagefter fik vi varm kakao. Det var en god dag alligevel.',
    glossary: [
      { word: 'lørdags', translation: 'laugardaginn' },
      { word: 'hold', translation: 'lið' },
      { word: 'kamp', translation: 'leikur/kappleikur' },
      { word: 'halvleg', translation: 'hálfleikur' },
      { word: 'mål', translation: 'mark' },
      { word: 'sluttede', translation: 'endaði' },
      { word: 'bagefter', translation: 'á eftir' },
      { word: 'alligevel', translation: 'samt' },
    ],
    questions: [
      {
        prompt: 'Hvernig var veðrið á leikdaginn?',
        choices: ['Kalt og smá rigning', 'Sól og hiti', 'Snjókoma', 'Mikið rok'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gerðist í fyrri hálfleik?',
        choices: ['Hitt liðið skoraði tvö mörk', 'Okkar lið skoraði tvö mörk', 'Enginn skoraði', 'Leikurinn var flautaður af'],
        correctIndex: 0,
      },
      {
        prompt: 'Hver skoraði fyrra mark liðsins?',
        choices: ['Jonas', 'Sögumaðurinn', 'Markvörðurinn', 'Þjálfarinn'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvernig endaði leikurinn?',
        choices: ['Jafntefli, 2-2', 'Þeir unnu 2-1', 'Þeir töpuðu 0-2', 'Þeir unnu 3-2'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-tivoli',
    language: 'da',
    level: 2,
    title: 'En tur i Tivoli',
    body:
      'I sommerferien var jeg i Tivoli i København med min familie. Tivoli er en gammel forlystelsespark midt i byen. Vi prøvede rutsjebanen tre gange! Min lillebror turde ikke, så han kørte i de små biler i stedet.\n\nTil frokost spiste vi pølser og is. Om aftenen blev der tændt tusindvis af små lys i parken. Det så ud som et eventyr. Jeg vil gerne tilbage næste år.',
    glossary: [
      { word: 'sommerferien', translation: 'sumarfríið' },
      { word: 'forlystelsespark', translation: 'skemmtigarður' },
      { word: 'rutsjebanen', translation: 'rússíbaninn' },
      { word: 'turde', translation: 'þorði' },
      { word: 'frokost', translation: 'hádegismatur' },
      { word: 'pølser', translation: 'pylsur' },
      { word: 'lys', translation: 'ljós' },
      { word: 'eventyr', translation: 'ævintýri' },
    ],
    questions: [
      {
        prompt: 'Hvar er Tivoli?',
        choices: ['Í Kaupmannahöfn', 'Í Óðinsvéum', 'Í Árósum', 'Í Álaborg'],
        correctIndex: 0,
      },
      {
        prompt: 'Hve oft fór fjölskyldan í rússíbanann?',
        choices: ['Þrisvar sinnum', 'Einu sinni', 'Tvisvar sinnum', 'Fjórum sinnum'],
        correctIndex: 0,
      },
      {
        prompt: 'Af hverju fór litli bróðir í litlu bílana?',
        choices: ['Hann þorði ekki í rússíbanann', 'Hann var of lítill', 'Bílarnir voru skemmtilegri', 'Röðin var styttri'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gerðist um kvöldið í garðinum?',
        choices: ['Þúsundir lítilla ljósa voru kveikt', 'Það var flugeldasýning', 'Garðurinn lokaði snemma', 'Það byrjaði að rigna'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-vejret',
    language: 'da',
    level: 2,
    title: 'Vejret i Danmark',
    body:
      'Danmark er et fladt land med meget vind. Om vinteren er det koldt og gråt, men det sner ikke så tit som i Island. Om sommeren kan det blive dejligt varmt, nogle gange over femogtyve grader. Så tager danskerne til stranden for at bade.\n\nDet regner ofte i Danmark, så de fleste har altid en regnjakke med. Mange danskere cykler til skole og arbejde — også når det regner!',
    glossary: [
      { word: 'fladt', translation: 'flatt' },
      { word: 'vind', translation: 'vindur' },
      { word: 'vinteren', translation: 'veturinn' },
      { word: 'sner', translation: 'snjóar' },
      { word: 'sommeren', translation: 'sumarið' },
      { word: 'stranden', translation: 'ströndin' },
      { word: 'regnjakke', translation: 'regnjakki' },
      { word: 'cykler', translation: 'hjóla' },
    ],
    questions: [
      {
        prompt: 'Hvernig er landslagið í Danmörku?',
        choices: ['Flatt og vindasamt', 'Fjöllótt', 'Þakið skógi', 'Mjög þurrt'],
        correctIndex: 0,
      },
      {
        prompt: 'Snjóar meira í Danmörku en á Íslandi?',
        choices: ['Nei, sjaldnar', 'Já, miklu meira', 'Það snjóar aldrei í Danmörku', 'Jafn mikið'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gera Danir þegar það er heitt á sumrin?',
        choices: ['Fara á ströndina að synda', 'Fara á skíði', 'Halda sig inni', 'Fara til Íslands'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvernig komast margir Danir í skóla og vinnu?',
        choices: ['Á hjóli', 'Á hestbaki', 'Með flugvél', 'Á vélsleða'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-mad',
    language: 'da',
    level: 2,
    title: 'Min yndlingsmad',
    body:
      'Min yndlingsmad er pizza med skinke og ananas. Min far synes, at ananas på pizza er mærkeligt, men jeg elsker det. Hver fredag laver vi mad sammen i køkkenet. Min søster vælger altid pandekager med sukker.\n\nI Danmark spiser mange børn rugbrød med leverpostej til frokost. Det smager faktisk godt! Til min fødselsdag ønsker jeg mig lagkage med jordbær og fløde.',
    glossary: [
      { word: 'yndlingsmad', translation: 'uppáhaldsmatur' },
      { word: 'skinke', translation: 'skinka' },
      { word: 'mærkeligt', translation: 'skrítið' },
      { word: 'vælger', translation: 'velur' },
      { word: 'pandekager', translation: 'pönnukökur' },
      { word: 'rugbrød', translation: 'rúgbrauð' },
      { word: 'smager', translation: 'bragðast' },
      { word: 'jordbær', translation: 'jarðarber' },
      { word: 'fløde', translation: 'rjómi' },
    ],
    questions: [
      {
        prompt: 'Hver er uppáhaldsmatur sögumannsins?',
        choices: ['Pizza með skinku og ananas', 'Pönnukökur með sykri', 'Rúgbrauð með lifrarkæfu', 'Lagkaka með jarðarberjum'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað finnst pabbanum um ananas á pizzu?',
        choices: ['Honum finnst það skrítið', 'Hann elskar það', 'Hann hefur aldrei smakkað það', 'Honum er alveg sama'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvenær eldar fjölskyldan saman?',
        choices: ['Á föstudögum', 'Á mánudögum', 'Á sunnudögum', 'Á hverjum degi'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað borða mörg dönsk börn í hádeginu?',
        choices: ['Rúgbrauð með lifrarkæfu', 'Pizzu', 'Pönnukökur', 'Pylsur'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-kobenhavn',
    language: 'da',
    level: 3,
    title: 'En rejse til København',
    body:
      'Sidste efterår rejste min klasse til København. Vi fløj fra Keflavík tidligt om morgenen og landede i lufthavnen Kastrup tre timer senere. Først besøgte vi Den Lille Havfrue, en berømt statue ved havnen. Den var mindre, end jeg troede!\n\nBagefter gik vi op i Rundetårn, hvor man kan se ud over hele byen. Om eftermiddagen sejlede vi med båd gennem kanalerne i Nyhavn. Husene der er gule, røde og blå. Til sidst købte vi softice — danskernes berømte is.\n\nKøbenhavn er en fantastisk by, og jeg vil gerne rejse dertil igen.',
    glossary: [
      { word: 'efterår', translation: 'haust' },
      { word: 'lufthavnen', translation: 'flugvöllurinn' },
      { word: 'besøgte', translation: 'heimsóttum' },
      { word: 'berømt', translation: 'fræg(ur)' },
      { word: 'statue', translation: 'stytta' },
      { word: 'troede', translation: 'hélt' },
      { word: 'sejlede', translation: 'sigldum' },
      { word: 'kanalerne', translation: 'síkin' },
    ],
    questions: [
      {
        prompt: 'Hvernig komst bekkurinn til Kaupmannahafnar?',
        choices: ['Með flugvél frá Keflavík', 'Með skipi', 'Með lest', 'Með rútu'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað fannst sögumanninum um Litlu hafmeyjuna?',
        choices: ['Hún var minni en hann hélt', 'Hún var stærri en hann hélt', 'Hún var falleg á litinn', 'Hún var lokuð fyrir gestum'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað sést úr Sívalaturni (Rundetårn)?',
        choices: ['Yfir alla borgina', 'Bara höfnin', 'Til Svíþjóðar', 'Inn í Tívolí'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvernig eru húsin í Nyhavn á litinn?',
        choices: ['Gul, rauð og blá', 'Öll hvít', 'Grá og svört', 'Græn og brún'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-mystiske-hus',
    language: 'da',
    level: 3,
    title: 'Det mystiske hus',
    body:
      'For enden af vores vej ligger et gammelt hus, hvor ingen har boet i mange år. Vinduerne er mørke, og haven er fuld af høje træer. En aften så min ven Oliver et lys i et af vinduerne. Vi besluttede at undersøge det.\n\nMed bankende hjerter gik vi gennem den knirkende låge og op til døren. Pludselig åbnede døren sig — og der stod en gammel dame med en lommelygte. «Endelig kommer der gæster,» sagde hun og smilede. «Jeg er lige flyttet ind. Vil I have varm kakao?»\n\nVi grinede af lettelse. Huset var slet ikke mystisk — bare fuldt af flyttekasser og bøger.',
    glossary: [
      { word: 'mystiske', translation: 'dularfulla' },
      { word: 'besluttede', translation: 'ákváðum' },
      { word: 'undersøge', translation: 'rannsaka' },
      { word: 'knirkende', translation: 'ískrandi' },
      { word: 'låge', translation: 'hlið' },
      { word: 'lommelygte', translation: 'vasaljós' },
      { word: 'gæster', translation: 'gestir' },
      { word: 'lettelse', translation: 'léttir' },
      { word: 'flyttekasser', translation: 'flutningskassar' },
    ],
    questions: [
      {
        prompt: 'Hvað sá Oliver eitt kvöldið?',
        choices: ['Ljós í glugga gamla hússins', 'Draug í garðinum', 'Opnar dyr', 'Kött á þakinu'],
        correctIndex: 0,
      },
      {
        prompt: 'Hver opnaði dyrnar?',
        choices: ['Gömul kona með vasaljós', 'Enginn — þær opnuðust sjálfar', 'Lögreglumaður', 'Oliver'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað bauð konan strákunum?',
        choices: ['Heitt kakó', 'Köku', 'Te', 'Ís'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvernig leið strákunum í lokin?',
        choices: ['Þeim létti og þeir hlógu', 'Þeir voru enn hræddir', 'Þeir urðu reiðir', 'Þeim leiddist'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-hcandersen',
    language: 'da',
    level: 3,
    title: 'H.C. Andersen',
    body:
      'Hans Christian Andersen er Danmarks mest berømte forfatter. Han blev født i byen Odense i 1805. Hans familie var meget fattig, og som barn måtte han ofte lege alene.\n\nSom fjortenårig rejste han helt alene til København for at blive skuespiller. Det lykkedes ikke — men i stedet begyndte han at skrive. Han skrev over 150 eventyr, blandt andet «Den grimme ælling», «Den lille havfrue» og «Kejserens nye klæder».\n\nHans historier er oversat til mere end 125 sprog. I dag kender børn i hele verden hans eventyr.',
    glossary: [
      { word: 'forfatter', translation: 'rithöfundur' },
      { word: 'født', translation: 'fæddur' },
      { word: 'fattig', translation: 'fátæk' },
      { word: 'alene', translation: 'einn/ein' },
      { word: 'skuespiller', translation: 'leikari' },
      { word: 'lykkedes', translation: 'tókst' },
      { word: 'eventyr', translation: 'ævintýri' },
      { word: 'oversat', translation: 'þýdd' },
      { word: 'sprog', translation: 'tungumál' },
    ],
    questions: [
      {
        prompt: 'Í hvaða bæ fæddist H.C. Andersen?',
        choices: ['Odense', 'Kaupmannahöfn', 'Árósum', 'Hróarskeldu'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað ætlaði hann að verða þegar hann fór til Kaupmannahafnar?',
        choices: ['Leikari', 'Rithöfundur', 'Kennari', 'Sjómaður'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað skrifaði hann mörg ævintýri?',
        choices: ['Yfir 150', 'Um 50', 'Nákvæmlega 100', 'Yfir 1000'],
        correctIndex: 0,
      },
      {
        prompt: 'Á hve mörg tungumál hafa sögurnar hans verið þýddar?',
        choices: ['Meira en 125', 'Um 20', 'Meira en 500', 'Aðeins dönsku og íslensku'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-vikingerne',
    language: 'da',
    level: 3,
    title: 'Vikingerne',
    body:
      'For over tusind år siden boede vikingerne i Danmark, Norge og Sverige. De var dygtige søfolk og byggede hurtige skibe med drager i stævnen. Nogle vikinger sejlede ud for at handle, andre for at røve.\n\nVikingerne fandt også nye lande. De sejlede til Island, Grønland og helt til Amerika — længe før Columbus! Mange islændinge stammer fra vikingerne.\n\nI byen Roskilde i Danmark kan man i dag se fem rigtige vikingeskibe på et museum. Vikingetiden sluttede for omkring 950 år siden, men historierne om vikingerne lever stadig.',
    glossary: [
      { word: 'søfolk', translation: 'sjómenn' },
      { word: 'skibe', translation: 'skip' },
      { word: 'stævnen', translation: 'stafninn' },
      { word: 'handle', translation: 'versla' },
      { word: 'røve', translation: 'ræna' },
      { word: 'stammer', translation: 'eru komnir (af)' },
      { word: 'museum', translation: 'safn' },
      { word: 'stadig', translation: 'ennþá' },
    ],
    questions: [
      {
        prompt: 'Hvar bjuggu víkingarnir?',
        choices: ['Í Danmörku, Noregi og Svíþjóð', 'Bara í Danmörku', 'Á Spáni og í Frakklandi', 'Í Ameríku'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvert sigldu víkingar löngu á undan Kólumbusi?',
        choices: ['Til Ameríku', 'Til Ástralíu', 'Til Kína', 'Til Afríku'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað má sjá á safninu í Hróarskeldu (Roskilde)?',
        choices: ['Fimm alvöru víkingaskip', 'Gullsjóð víkinga', 'Stærsta víkingasverð í heimi', 'Beinagrind af víkingakonungi'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvenær lauk víkingaöldinni?',
        choices: ['Fyrir um 950 árum', 'Fyrir um 100 árum', 'Fyrir um 5000 árum', 'Hún er enn í gangi'],
        correctIndex: 0,
      },
    ],
  },
];
