import type { ReadingText } from './types';

/**
 * Íslenskir lestrartextar með lesskilningsspurningum. Í hverjum texta er
 * a.m.k. ein orðskilningsspurning. Til að bæta við texta: afritaðu færslu
 * og breyttu.
 */
export const ICELANDIC_TEXTS: ReadingText[] = [
  {
    id: 'is-lundinn',
    language: 'is',
    level: 2,
    title: 'Lundinn',
    body:
      'Lundinn er einn þekktasti fugl Íslands. Hann er svartur og hvítur með stóran, marglitan gogg sem verður skærastur á sumrin. Lundinn er sjófugl og er frábær sundfugl — hann notar vængina til að „fljúga“ neðansjávar þegar hann veiðir síli.\n\nLundar verpa í holum í grasi vöxnum brekkum við sjóinn. Stærsta lundabyggð í heimi er í Vestmannaeyjum. Þar verpa milljónir lunda á hverju sumri. Lundinn eignast yfirleitt aðeins einn unga á ári og ungarnir kallast pysjur.\n\nÁ haustin fljúga pysjurnar út á sjó. Stundum villast þær inn í bæinn í Vestmannaeyjum og þá hjálpa krakkarnir þeim út á sjó aftur!',
    questions: [
      {
        prompt: 'Hvernig veiðir lundinn síli?',
        choices: [
          'Hann syndir undir yfirborðinu og notar vængina',
          'Hann stingur sér úr mikilli hæð',
          'Hann veiðir bara í fjörunni',
          'Hann stelur þeim frá öðrum fuglum',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Hvar er stærsta lundabyggð í heimi?',
        choices: ['Í Vestmannaeyjum', 'Á Látrabjargi', 'Í Grímsey', 'Á Reykjanesi'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað kallast lundaungar?',
        choices: ['Pysjur', 'Kettlingar', 'Kjúklingar', 'Lundlingar'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað þýðir orðið „sjófugl“ í textanum?',
        choices: [
          'Fugl sem lifir við og á sjónum',
          'Fugl sem getur ekki flogið',
          'Fugl sem sefur á sjónum',
          'Stærsta tegund fugla',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'is-nordurljos',
    language: 'is',
    level: 2,
    title: 'Norðurljósin',
    body:
      'Á dimmum vetrarkvöldum má stundum sjá græn, bleik og fjólublá ljós dansa um himininn. Þetta eru norðurljósin. Þau myndast þegar agnir frá sólinni rekast á lofthjúp jarðar. Áreksturinn fær loftið til að lýsa, svipað og í neonljósi.\n\nNorðurljós sjást best þar sem er dimmt og heiðskírt. Þess vegna er Ísland einn besti staður í heimi til að skoða þau. Ferðamenn koma alls staðar að úr heiminum á veturna í von um að sjá þau dansa.\n\nGrænn er algengasti litur norðurljósanna. Liturinn fer eftir því hvaða lofttegund agnirnar rekast á og í hvaða hæð það gerist.',
    questions: [
      {
        prompt: 'Hvernig myndast norðurljósin?',
        choices: [
          'Agnir frá sólinni rekast á lofthjúp jarðar',
          'Tunglið endurkastar ljósi á skýin',
          'Eldgos lýsa upp himininn',
          'Stjörnur springa í geimnum',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Hvenær sjást norðurljósin best?',
        choices: [
          'Þegar það er dimmt og heiðskírt',
          'Um hábjartan dag',
          'Þegar það er skýjað',
          'Bara á sumrin',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Hvaða litur er algengastur í norðurljósum?',
        choices: ['Grænn', 'Rauður', 'Blár', 'Gulur'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað þýðir orðið „heiðskírt“?',
        choices: ['Skýlaus himinn', 'Mikil rigning', 'Þoka', 'Mjög kalt veður'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'is-kotturinn',
    language: 'is',
    level: 2,
    title: 'Kötturinn sem opnaði hurðir',
    body:
      'Brandur var stór og loðinn köttur sem bjó hjá fjölskyldu á Akureyri. Hann var alveg eins og aðrir kettir — nema eitt: Brandur kunni að opna hurðir.\n\nFyrst hélt fjölskyldan að einhver gleymdi alltaf að loka. En eitt kvöldið sá Sara, yngsta barnið í fjölskyldunni, hvernig hann fór að þessu. Brandur stökk upp, greip um húninn með framloppunum, lét þyngdina draga húninn niður og ýtti svo hurðinni opinni!\n\nEftir þetta var ekkert herbergi öruggt. Brandur opnaði eldhússkápinn þar sem kattamaturinn var geymdur og meira að segja ísskápinn einu sinni. Fjölskyldan þurfti að lokum að setja lás á skápana. Brandur var ekki ánægður — en hann fann sér bara nýjar hurðir til að opna.',
    questions: [
      {
        prompt: 'Hvað gat Brandur gert sem aðrir kettir geta ekki?',
        choices: ['Opnað hurðir', 'Sungið', 'Synt í sjónum', 'Talað'],
        correctIndex: 0,
      },
      {
        prompt: 'Hver komst að leyndarmáli Brands?',
        choices: ['Sara', 'Mamman', 'Nágranninn', 'Enginn'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvernig opnaði Brandur hurðir?',
        choices: [
          'Hann stökk upp og dró húninn niður með loppunum',
          'Hann ýtti á hurðina þangað til hún opnaðist',
          'Hann mjálmaði þangað til einhver opnaði',
          'Hann notaði lykil',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gerði fjölskyldan að lokum?',
        choices: ['Setti lás á skápana', 'Gaf Brand frá sér', 'Tók húnana af öllum hurðum', 'Keypti annan kött'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'is-hvalaskodun',
    language: 'is',
    level: 2,
    title: 'Hvalaskoðun',
    body:
      'Hafið í kringum Ísland er fullt af lífi og þar synda margar tegundir hvala. Algengastar eru hrefnur, hnúfubakar og háhyrningar. Stundum sjást líka steypireyðar — stærstu dýr sem nokkurn tíma hafa lifað á jörðinni!\n\nÁ hverju ári fara þúsundir ferðamanna í hvalaskoðunarferðir frá Húsavík, Reykjavík og fleiri stöðum. Húsavík er stundum kölluð höfuðborg hvalaskoðunar í Evrópu.\n\nHnúfubakurinn er uppáhald margra. Hann stekkur stundum upp úr sjónum og skellur niður með risastórri gusu. Sporður hvers hnúfubaks er einstakur, rétt eins og fingraför hjá fólki, og þannig þekkja vísindamenn hvalina í sundur.',
    questions: [
      {
        prompt: 'Hvaða dýr er það stærsta sem hefur lifað á jörðinni?',
        choices: ['Steypireyður', 'Hnúfubakur', 'Háhyrningur', 'Risaeðla'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvaða bær er kallaður höfuðborg hvalaskoðunar í Evrópu?',
        choices: ['Húsavík', 'Reykjavík', 'Akureyri', 'Vestmannaeyjar'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvernig þekkja vísindamenn hnúfubaka í sundur?',
        choices: ['Á sporðinum', 'Á augunum', 'Á hljóðunum', 'Á stærðinni'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað þýðir orðið „tegund“ í textanum?',
        choices: [
          'Ákveðin gerð af dýrum',
          'Stærð á dýri',
          'Hópur af ferðamönnum',
          'Veiðarfæri',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'is-eldfjoll',
    language: 'is',
    level: 3,
    title: 'Eldfjöll á Íslandi',
    body:
      'Ísland er eitt virkasta eldfjallasvæði í heimi. Ástæðan er sú að landið situr á mótum tveggja jarðskorpufleka sem færast í sundur um nokkra sentimetra á ári. Þegar flekana rekur í sundur á bráðin kvika greiðari leið upp á yfirborðið.\n\nÁ Íslandi gýs að meðaltali á þriggja til fimm ára fresti. Frægasta eldgos síðari ára er líklega gosið í Eyjafjallajökli árið 2010. Öskuskýið frá því stöðvaði flugumferð um alla Evrópu í marga daga, og fréttamenn um allan heim reyndu að bera fram nafnið — oftast án árangurs!\n\nEn eldvirknin gefur okkur líka margt. Heita vatnið sem hitar húsin okkar og sundlaugarnar kemur úr iðrum jarðar. Jarðvarminn er ein verðmætasta auðlind Íslendinga.',
    questions: [
      {
        prompt: 'Af hverju eru svona mörg eldfjöll á Íslandi?',
        choices: [
          'Landið er á mótum tveggja jarðskorpufleka',
          'Landið er svo ungt',
          'Það er svo kalt á Íslandi',
          'Landið er umkringt sjó',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Hvaða áhrif hafði gosið í Eyjafjallajökli 2010 á umheiminn?',
        choices: [
          'Öskuskýið stöðvaði flugumferð í Evrópu',
          'Hraun rann yfir Reykjavík',
          'Sjórinn í kringum landið hitnaði',
          'Engin — gosið var mjög lítið',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Hve oft gýs á Íslandi að meðaltali?',
        choices: ['Á þriggja til fimm ára fresti', 'Á hverju ári', 'Á hundrað ára fresti', 'Tvisvar á ári'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað þýðir orðið „auðlind“?',
        choices: [
          'Verðmæti úr náttúrunni sem hægt er að nýta',
          'Stórt eldfjall',
          'Tegund af sundlaug',
          'Peningar í banka',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'is-joklar',
    language: 'is',
    level: 3,
    title: 'Jöklarnir okkar',
    body:
      'Um tíundi hluti Íslands er hulinn jöklum. Vatnajökull er stærstur — hann er reyndar stærsti jökull Evrópu utan heimskautasvæða. Undir honum leynast bæði virk eldfjöll og djúpir dalir.\n\nJökull myndast þegar meiri snjór safnast fyrir á veturna en nær að bráðna á sumrin. Snjórinn pressast saman ár eftir ár og verður að þéttum ís. Jöklar eru ekki kyrrir: þeir skríða hægt fram undan eigin þunga, oft nokkra metra á ári. Þess vegna er stundum sagt að jöklar „flæði“ eins og mjög hægfara fljót.\n\nVegna hlýnandi loftslags hopa jöklar á Íslandi hratt. Vísindamenn áætla að ef fram heldur sem horfir gætu þeir að mestu horfið á næstu 200 árum. Árið 2019 var haldin minningarathöfn um jökulinn Ok — fyrsta íslenska jökulinn sem hvarf.',
    questions: [
      {
        prompt: 'Hve stór hluti Íslands er hulinn jöklum?',
        choices: ['Um tíundi hluti', 'Um helmingur', 'Um fjórðungur', 'Næstum allt landið'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvernig myndast jökull?',
        choices: [
          'Snjór safnast upp og pressast saman í ís ár eftir ár',
          'Sjórinn frýs við ströndina',
          'Eldgos kæla landið',
          'Rigning frýs á fjallstoppum',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað var sérstakt við jökulinn Ok árið 2019?',
        choices: [
          'Hann var fyrsti íslenski jökullinn sem hvarf',
          'Hann varð stærsti jökull landsins',
          'Það gaus undir honum',
          'Hann fannst þá fyrst',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað þýðir að jöklar „hopi“?',
        choices: ['Þeir minnka og dragast saman', 'Þeir stækka', 'Þeir færast nær sjónum', 'Þeir verða dekkri'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'is-trollid',
    language: 'is',
    level: 3,
    title: 'Tröllið í fjallinu',
    body:
      'Hátt uppi í fjallinu fyrir ofan litla sveitabæinn bjó tröll sem hét Grýlukarl. Hann hafði búið þar í þúsund ár og mundi tímana þegar engin hús voru í dalnum. Tröll mega ekki sjá sólarljós, því þá verða þau að steini. Þess vegna svaf Grýlukarl allan daginn og rölti um fjallið á nóttunni.\n\nEina vetrarnótt heyrði hann grát neðan úr dalnum. Lítil kind hafði fest sig í djúpum skafli og komst hvorki fram né aftur. Grýlukarl klifraði niður, gróf kindina upp úr snjónum með risastórum höndunum og bar hana heim að fjárhúsinu.\n\nUm morguninn fann bóndinn kindina heila á húfi — og risastór fótspor í snjónum. Síðan þá skilur fjölskyldan á bænum alltaf eftir skál af skyri á tröppunum á aðfangadagskvöld. Og skálin er alltaf tóm á jóladagsmorgun.',
    questions: [
      {
        prompt: 'Af hverju svaf Grýlukarl á daginn?',
        choices: [
          'Tröll verða að steini í sólarljósi',
          'Hann var latur',
          'Það var of hávaðasamt á daginn',
          'Hann vann á nóttunni í sveitinni',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað heyrði tröllið eina vetrarnótt?',
        choices: ['Grát úr dalnum', 'Söng úr kirkjunni', 'Þrumur', 'Bíl keyra hjá'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gerði Grýlukarl við kindina?',
        choices: [
          'Gróf hana úr skaflinum og bar hana heim í fjárhús',
          'Borðaði hana',
          'Tók hana með sér upp í fjall',
          'Sótti bóndann til að hjálpa',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Hvernig þakkar fjölskyldan tröllinu fyrir?',
        choices: [
          'Skilur eftir skyrskál á aðfangadagskvöld',
          'Syngur fyrir það',
          'Byggði handa því hús',
          'Gefur því kind á hverju ári',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'is-landnam',
    language: 'is',
    level: 3,
    title: 'Landnám Íslands',
    body:
      'Fyrir rúmlega 1100 árum sigldu norrænir menn yfir hafið og settust að á Íslandi. Samkvæmt Landnámabók var Ingólfur Arnarson fyrsti landnámsmaðurinn. Hann kastaði öndvegissúlum sínum í sjóinn og hét því að byggja þar sem þær ræki á land. Súlurnar fundust í vík sem fékk nafnið Reykjavík — þar sem höfuðborgin stendur í dag.\n\nLandnámsfólkið kom flest frá Noregi, en með því kom líka fólk frá Bretlandseyjum. Það flutti með sér búfé, verkfæri og sögur. Lífið var erfitt: það þurfti að byggja bæi úr torfi og grjóti, rækta tún og lifa af langa og kalda vetur.\n\nÁrið 930 stofnuðu landnámsmennirnir Alþingi á Þingvöllum. Þar komu höfðingjar saman á hverju sumri til að setja lög og leysa deilur. Alþingi starfar enn í dag og er eitt elsta þing í heimi.',
    questions: [
      {
        prompt: 'Hver var fyrsti landnámsmaðurinn samkvæmt Landnámabók?',
        choices: ['Ingólfur Arnarson', 'Leifur Eiríksson', 'Eiríkur rauði', 'Snorri Sturluson'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvernig valdi Ingólfur sér búsetustað?',
        choices: [
          'Hann kastaði öndvegissúlum í sjóinn og byggði þar sem þær rak á land',
          'Hann valdi hlýjasta staðinn',
          'Hann fylgdi fuglum',
          'Konungurinn í Noregi valdi fyrir hann',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað gerðist á Þingvöllum árið 930?',
        choices: ['Alþingi var stofnað', 'Fyrsta kirkjan var byggð', 'Stórt eldgos hófst', 'Fyrsti skólinn var stofnaður'],
        correctIndex: 0,
      },
      {
        prompt: 'Hvað þýðir orðið „landnám“?',
        choices: [
          'Að setjast að í nýju landi',
          'Að teikna landakort',
          'Að selja land',
          'Stór bóndabær',
        ],
        correctIndex: 0,
      },
    ],
  },
];
