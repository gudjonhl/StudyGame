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
  {
    id: 'da-misser',
    language: 'da',
    level: 1,
    title: 'Min kat Misser',
    body:
      'Jeg har en kat. Den hedder Misser. Misser er grå og meget blød. Den sover hele dagen i vindueskarmen, hvor solen skinner.\n\nOm aftenen er den vågen og vil lege. Misser jagter en lille rød bold rundt i stuen. Når den er sulten, siger den „mjav“. Så får den fisk. Misser er verdens bedste kat.',
    glossary: [
      { word: 'kat', translation: 'köttur' },
      { word: 'blød', translation: 'mjúk' },
      { word: 'sover', translation: 'sefur' },
      { word: 'vindueskarmen', translation: 'gluggakistunni' },
      { word: 'vågen', translation: 'vakandi' },
      { word: 'jagter', translation: 'eltir' },
      { word: 'bold', translation: 'bolti' },
      { word: 'sulten', translation: 'svöng' },
    ],
    questions: [
      {
        prompt: 'Hvernig er Misser á litinn?',
        choices: ['Grá', 'Svört', 'Hvít', 'Brún'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvar sefur Misser á daginn?',
        choices: ['Í gluggakistunni í sólinni', 'Undir rúminu', 'Í kassa', 'Úti í garði'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gerir Misser á kvöldin?',
        choices: ['Vakir og vill leika sér', 'Sefur', 'Fer út að veiða', 'Horfir á sjónvarpið'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað fær Misser að borða þegar hún mjálmar?',
        choices: ['Fisk', 'Mjólk', 'Kjöt', 'Kattanammi'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-vinter',
    language: 'da',
    level: 1,
    title: 'Vinter',
    body:
      'Det er vinter. Det er koldt udenfor, og det bliver tidligt mørkt. Børnene har huer og vanter på.\n\nNogle gange sner det. Så bygger børnene en snemand med en gulerod som næse. Bagefter drikker de varm kakao med flødeskum. Om vinteren er der også jul. Det er den bedste tid på året.',
    glossary: [
      { word: 'vinter', translation: 'vetur' },
      { word: 'koldt', translation: 'kalt' },
      { word: 'mørkt', translation: 'dimmt' },
      { word: 'huer', translation: 'húfur' },
      { word: 'vanter', translation: 'vettlingar' },
      { word: 'sner', translation: 'snjóar' },
      { word: 'snemand', translation: 'snjókarl' },
      { word: 'gulerod', translation: 'gulrót' },
      { word: 'flødeskum', translation: 'þeyttur rjómi' },
    ],
    questions: [
      {
        prompt: 'Hvað klæða börnin sig í þegar kalt er?',
        choices: ['Húfur og vettlinga', 'Stuttbuxur', 'Sundföt', 'Regnföt'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað byggja börnin þegar það snjóar?',
        choices: ['Snjókarl', 'Snjóhús', 'Kastala', 'Brettapall'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað er nefið á snjókarlinum?',
        choices: ['Gulrót', 'Steinn', 'Grein', 'Epli'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað drekka börnin á eftir?',
        choices: ['Heitt kakó með rjóma', 'Kalt vatn', 'Djús', 'Te'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-svommehal',
    language: 'da',
    level: 1,
    title: 'I svømmehallen',
    body:
      'Hver torsdag går jeg i svømmehallen med min klasse. Først tager vi bad, og så hopper vi i det store bassin. Vandet er dejligt varmt.\n\nJeg kan svømme hundrede meter uden at stoppe! Min ven Anton tør ikke springe fra vippen, men jeg elsker det. Til sidst leger vi med en stor gul bold. Bagefter er jeg altid træt og sulten.',
    glossary: [
      { word: 'svømmehallen', translation: 'sundlaugin' },
      { word: 'bad', translation: 'sturta' },
      { word: 'bassin', translation: 'laug' },
      { word: 'svømme', translation: 'synda' },
      { word: 'tør', translation: 'þorir' },
      { word: 'vippen', translation: 'stökkbrettið' },
      { word: 'træt', translation: 'þreyttur' },
      { word: 'sulten', translation: 'svangur' },
    ],
    questions: [
      {
        prompt: 'Hvenær fer bekkurinn í sund?',
        choices: ['Á fimmtudögum', 'Á mánudögum', 'Á laugardögum', 'Á hverjum degi'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gera krakkarnir fyrst?',
        choices: ['Fara í sturtu', 'Hoppa beint út í', 'Leika með bolta', 'Stökkva af brettinu'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað þorir Anton ekki að gera?',
        choices: ['Stökkva af stökkbrettinu', 'Synda í djúpu lauginni', 'Fara í kalda pottinn', 'Synda 100 metra'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvernig líður sögumanninum eftir sundið?',
        choices: ['Þreyttum og svöngum', 'Köldum', 'Leiðum', 'Hræddum'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-jul',
    language: 'da',
    level: 2,
    title: 'Jul i Danmark',
    body:
      'I Danmark fejrer man jul den fireogtyvende december om aftenen. Familien spiser and eller flæskesteg og bagefter risalamande — en kold risdessert med mandler. Den, der finder den hele mandel, vinder en gave!\n\nEfter maden danser familien rundt om juletræet og synger julesange. Så åbner alle deres gaver. I december har børnene også en julekalender med fireogtyve små låger. Mange danske familier hygger sig med lys og småkager hele måneden.',
    glossary: [
      { word: 'fejrer', translation: 'halda upp á' },
      { word: 'and', translation: 'önd' },
      { word: 'flæskesteg', translation: 'svínasteik' },
      { word: 'mandler', translation: 'möndlur' },
      { word: 'gave', translation: 'gjöf' },
      { word: 'juletræet', translation: 'jólatréð' },
      { word: 'julesange', translation: 'jólalög' },
      { word: 'låger', translation: 'lúgur' },
      { word: 'småkager', translation: 'smákökur' },
    ],
    questions: [
      {
        prompt: 'Hvenær halda Danir jólin hátíðleg?',
        choices: ['Að kvöldi 24. desember', 'Á jóladagsmorgun', '23. desember', 'Á gamlárskvöld'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað vinnur sá sem finnur heilu mönduna í eftirréttinum?',
        choices: ['Gjöf', 'Pening', 'Auka eftirrétt', 'Ekkert'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gerir fjölskyldan eftir matinn?',
        choices: ['Dansar í kringum jólatréð og syngur', 'Horfir á jólamynd', 'Fer í kirkju', 'Fer snemma að sofa'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað eru margar lúgur á jóladagatalinu?',
        choices: ['24', '12', '31', '25'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-lego',
    language: 'da',
    level: 2,
    title: 'LEGO',
    body:
      'Vidste du, at LEGO kommer fra Danmark? En tømrer, der hed Ole Kirk Christiansen, begyndte at lave legetøj af træ i byen Billund. Navnet LEGO kommer fra de danske ord „leg godt“.\n\nI 1958 fik LEGO-klodsen den form, som vi kender i dag. Klodserne passer stadig sammen med de helt gamle! I Billund ligger der i dag en kæmpe forlystelsespark, der hedder Legoland. Der kan man se hele byer bygget af millioner af klodser.',
    glossary: [
      { word: 'tømrer', translation: 'smiður' },
      { word: 'legetøj', translation: 'leikföng' },
      { word: 'træ', translation: 'viður/tré' },
      { word: 'klodsen', translation: 'kubburinn' },
      { word: 'passer', translation: 'passa' },
      { word: 'stadig', translation: 'ennþá' },
      { word: 'kæmpe', translation: 'risastór' },
      { word: 'millioner', translation: 'milljónir' },
    ],
    questions: [
      {
        prompt: 'Frá hvaða landi kemur LEGO?',
        choices: ['Danmörku', 'Þýskalandi', 'Svíþjóð', 'Bandaríkjunum'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað þýðir nafnið LEGO?',
        choices: ['„Leg godt“ – leiktu þér vel', 'Það er nafn stofnandans', '„Lítil gögn“', 'Það þýðir ekkert'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gerði Ole Kirk Christiansen fyrst?',
        choices: ['Bjó til leikföng úr tré', 'Byggði skemmtigarð', 'Seldi plastkubba', 'Teiknaði hús'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað er hægt að sjá í Legolandi?',
        choices: ['Heilar borgir byggðar úr kubbum', 'Alvöru kastala', 'Dýragarð', 'Víkingaskip'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-zoo',
    language: 'da',
    level: 2,
    title: 'En dag i Zoo',
    body:
      'I søndags var jeg i Zoologisk Have i København med min far. Vi så elefanter, giraffer og løver. Isbjørnen svømmede rundt i sit store bassin, og aberne lavede sjov, så alle børnene grinede.\n\nMit yndlingsdyr var den røde panda. Den sad højt oppe i et træ og spiste blade. Til frokost købte far is til os. På vej hjem sagde jeg: „Tak for en god dag, far!“',
    glossary: [
      { word: 'søndags', translation: 'sunnudaginn' },
      { word: 'elefanter', translation: 'fílar' },
      { word: 'løver', translation: 'ljón' },
      { word: 'isbjørnen', translation: 'ísbjörninn' },
      { word: 'aberne', translation: 'aparnir' },
      { word: 'grinede', translation: 'hlógu' },
      { word: 'yndlingsdyr', translation: 'uppáhaldsdýr' },
      { word: 'blade', translation: 'lauf' },
    ],
    questions: [
      {
        prompt: 'Með hverjum fór sögumaðurinn í dýragarðinn?',
        choices: ['Pabba sínum', 'Mömmu sinni', 'Bekknum sínum', 'Afa sínum'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gerði ísbjörninn?',
        choices: ['Synti í stóru lauginni sinni', 'Svaf allan tímann', 'Borðaði fisk', 'Faldi sig'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvert var uppáhaldsdýr sögumannsins?',
        choices: ['Rauða pandan', 'Fíllinn', 'Ljónið', 'Apinn'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað keypti pabbinn handa þeim í hádeginu?',
        choices: ['Ís', 'Pylsur', 'Popp', 'Samlokur'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-kongehus',
    language: 'da',
    level: 3,
    title: 'Det danske kongehus',
    body:
      'Danmark er et kongerige — et af de ældste i verden. Det danske kongehus kan følges mere end tusind år tilbage, helt til vikingekongen Gorm den Gamle.\n\nI dag hedder kongen Frederik den Tiende. Han blev konge i 2024, da hans mor, dronning Margrethe den Anden, valgte at give tronen videre efter 52 år som dronning. Det havde ingen dansk monark gjort i næsten 900 år! Kong Frederiks kone, dronning Mary, kommer helt fra Australien.\n\nKongefamilien bor på Amalienborg i København. Hver dag klokken tolv kan man se de kongelige livgarder skifte vagt foran slottet.',
    glossary: [
      { word: 'kongerige', translation: 'konungsríki' },
      { word: 'ældste', translation: 'elstu' },
      { word: 'kongehus', translation: 'konungsfjölskylda' },
      { word: 'tronen', translation: 'hásætið' },
      { word: 'monark', translation: 'þjóðhöfðingi' },
      { word: 'livgarder', translation: 'lífverðir' },
      { word: 'vagt', translation: 'vakt' },
      { word: 'slottet', translation: 'höllin' },
    ],
    questions: [
      {
        prompt: 'Hver er konungur Danmerkur í dag?',
        choices: ['Friðrik tíundi', 'Margrét önnur', 'Gormur gamli', 'Kristján tíundi'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gerði Margrét drottning árið 2024?',
        choices: ['Gaf hásætið áfram til sonar síns', 'Varð drottning', 'Flutti til Ástralíu', 'Hélt 52 ára afmæli'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvaðan kemur Mary drottning?',
        choices: ['Frá Ástralíu', 'Frá Danmörku', 'Frá Íslandi', 'Frá Englandi'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gerist klukkan tólf á hverjum degi við Amalienborg?',
        choices: ['Lífverðirnir skipta um vakt', 'Konungurinn veifar af svölunum', 'Kirkjuklukkurnar hringja', 'Höllin opnar fyrir gesti'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'da-skattejagt',
    language: 'da',
    level: 3,
    title: 'Skattejagten',
    body:
      'Hvert år i juli låner familien et gammelt sommerhus ved Vesterhavet. I år fandt Ida noget mærkeligt på loftet: et gulnet stykke papir med et kort over haven — og et rødt kryds bag æbletræet.\n\n„Det er helt sikkert en skattejagt!“ råbte hendes lillebror Emil. De løb ud i haven med en skovl og gravede, hvor krydset var. En halv meter nede stødte skovlen mod noget hårdt: en lille rusten dåse.\n\nI dåsen lå der ingen guldmønter — kun et gammelt foto af to børn med en hund og en seddel: „Hilsen fra sommeren 1985. Grav skatten ned igen til de næste.“ Det gjorde Ida og Emil. Men først lagde de deres eget foto i dåsen.',
    glossary: [
      { word: 'sommerhus', translation: 'sumarbústaður' },
      { word: 'loftet', translation: 'háaloftið' },
      { word: 'gulnet', translation: 'gulnað' },
      { word: 'kryds', translation: 'kross' },
      { word: 'skattejagt', translation: 'fjársjóðsleit' },
      { word: 'skovl', translation: 'skófla' },
      { word: 'gravede', translation: 'grófu' },
      { word: 'rusten', translation: 'ryðguð' },
      { word: 'dåse', translation: 'dós' },
      { word: 'seddel', translation: 'miði' },
    ],
    questions: [
      {
        prompt: 'Hvað fann Ida á háaloftinu?',
        choices: ['Gamalt kort af garðinum með rauðum krossi', 'Gamla ljósmynd', 'Ryðgaða dós', 'Gullpeninga'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvar grófu krakkarnir?',
        choices: ['Bak við eplatréð', 'Undir pallinum', 'Í fjörunni', 'Við hliðið'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað var í dósinni?',
        choices: ['Gömul ljósmynd og miði', 'Gullpeningar', 'Gamalt leikfang', 'Ekkert'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gerðu Ida og Emil að lokum?',
        choices: [
          'Settu sína eigin mynd í dósina og grófu hana aftur',
          'Tóku dósina með sér heim',
          'Sýndu foreldrum sínum dósina',
          'Leituðu að krökkunum á myndinni',
        ],
        correctIndex: 0,
      },
    ],
  },
];
