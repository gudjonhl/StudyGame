import type { VocabPair } from './types';

/**
 * Dönsk ↔ íslensk orðapör.
 *
 * Til að bæta við orði: afritaðu línu og breyttu. `level` er 1 (létt),
 * 2 (miðlungs) eða 3 (erfitt). `category` flokkar orðin svo rangir
 * svarmöguleikar séu úr sama flokki.
 *
 * Dæmi:
 * { id: 'dyr-11', da: 'ulv', is: 'úlfur', category: 'Dýr', level: 1 },
 */
export const DANISH_VOCAB: VocabPair[] = [
  // --- Tölur (1) ---
  { id: 'tal-1', da: 'en', is: 'einn', category: 'Tölur', level: 1 },
  { id: 'tal-2', da: 'to', is: 'tveir', category: 'Tölur', level: 1 },
  { id: 'tal-3', da: 'tre', is: 'þrír', category: 'Tölur', level: 1 },
  { id: 'tal-4', da: 'fire', is: 'fjórir', category: 'Tölur', level: 1 },
  { id: 'tal-5', da: 'fem', is: 'fimm', category: 'Tölur', level: 1 },
  { id: 'tal-6', da: 'seks', is: 'sex', category: 'Tölur', level: 1 },
  { id: 'tal-7', da: 'syv', is: 'sjö', category: 'Tölur', level: 1 },
  { id: 'tal-8', da: 'otte', is: 'átta', category: 'Tölur', level: 1 },
  { id: 'tal-9', da: 'ni', is: 'níu', category: 'Tölur', level: 1 },
  { id: 'tal-10', da: 'ti', is: 'tíu', category: 'Tölur', level: 1 },

  // --- Litir (1) ---
  { id: 'lit-1', da: 'rød', is: 'rauður', category: 'Litir', level: 1 },
  { id: 'lit-2', da: 'blå', is: 'blár', category: 'Litir', level: 1 },
  { id: 'lit-3', da: 'grøn', is: 'grænn', category: 'Litir', level: 1 },
  { id: 'lit-4', da: 'gul', is: 'gulur', category: 'Litir', level: 1 },
  { id: 'lit-5', da: 'sort', is: 'svartur', category: 'Litir', level: 1 },
  { id: 'lit-6', da: 'hvid', is: 'hvítur', category: 'Litir', level: 1 },
  { id: 'lit-7', da: 'brun', is: 'brúnn', category: 'Litir', level: 1 },
  { id: 'lit-8', da: 'lilla', is: 'fjólublár', category: 'Litir', level: 1 },

  // --- Fjölskyldan (1) ---
  { id: 'fjo-1', da: 'mor', is: 'mamma', category: 'Fjölskyldan', level: 1 },
  { id: 'fjo-2', da: 'far', is: 'pabbi', category: 'Fjölskyldan', level: 1 },
  { id: 'fjo-3', da: 'søster', is: 'systir', category: 'Fjölskyldan', level: 1 },
  { id: 'fjo-4', da: 'bror', is: 'bróðir', category: 'Fjölskyldan', level: 1 },
  { id: 'fjo-5', da: 'bedstemor', is: 'amma', category: 'Fjölskyldan', level: 1 },
  { id: 'fjo-6', da: 'bedstefar', is: 'afi', category: 'Fjölskyldan', level: 1 },
  { id: 'fjo-7', da: 'familie', is: 'fjölskylda', category: 'Fjölskyldan', level: 1 },
  { id: 'fjo-8', da: 'børn', is: 'börn', category: 'Fjölskyldan', level: 1 },

  // --- Dýr (1) ---
  { id: 'dyr-1', da: 'hund', is: 'hundur', category: 'Dýr', level: 1 },
  { id: 'dyr-2', da: 'kat', is: 'köttur', category: 'Dýr', level: 1 },
  { id: 'dyr-3', da: 'hest', is: 'hestur', category: 'Dýr', level: 1 },
  { id: 'dyr-4', da: 'fugl', is: 'fugl', category: 'Dýr', level: 1 },
  { id: 'dyr-5', da: 'fisk', is: 'fiskur', category: 'Dýr', level: 1 },
  { id: 'dyr-6', da: 'ko', is: 'kýr', category: 'Dýr', level: 1 },
  { id: 'dyr-7', da: 'får', is: 'kind', category: 'Dýr', level: 1 },
  { id: 'dyr-8', da: 'mus', is: 'mús', category: 'Dýr', level: 1 },
  { id: 'dyr-9', da: 'kanin', is: 'kanína', category: 'Dýr', level: 1 },
  { id: 'dyr-10', da: 'bjørn', is: 'björn', category: 'Dýr', level: 1 },

  // --- Kveðjur og smáorð (1) ---
  { id: 'kve-1', da: 'hej', is: 'hæ', category: 'Kveðjur', level: 1 },
  { id: 'kve-2', da: 'farvel', is: 'bless', category: 'Kveðjur', level: 1 },
  { id: 'kve-3', da: 'tak', is: 'takk', category: 'Kveðjur', level: 1 },
  { id: 'kve-4', da: 'ja', is: 'já', category: 'Kveðjur', level: 1 },
  { id: 'kve-5', da: 'nej', is: 'nei', category: 'Kveðjur', level: 1 },
  { id: 'kve-6', da: 'godmorgen', is: 'góðan daginn', category: 'Kveðjur', level: 1 },

  // --- Matur (2) ---
  { id: 'mat-1', da: 'brød', is: 'brauð', category: 'Matur', level: 2 },
  { id: 'mat-2', da: 'mælk', is: 'mjólk', category: 'Matur', level: 2 },
  { id: 'mat-3', da: 'ost', is: 'ostur', category: 'Matur', level: 2 },
  { id: 'mat-4', da: 'æble', is: 'epli', category: 'Matur', level: 2 },
  { id: 'mat-5', da: 'kartoffel', is: 'kartafla', category: 'Matur', level: 2 },
  { id: 'mat-6', da: 'kød', is: 'kjöt', category: 'Matur', level: 2 },
  { id: 'mat-7', da: 'is', is: 'ís', category: 'Matur', level: 2 },
  { id: 'mat-8', da: 'kage', is: 'kaka', category: 'Matur', level: 2 },
  { id: 'mat-9', da: 'vand', is: 'vatn', category: 'Matur', level: 2 },
  { id: 'mat-10', da: 'æg', is: 'egg', category: 'Matur', level: 2 },

  // --- Skólinn (2) ---
  { id: 'sko-1', da: 'skole', is: 'skóli', category: 'Skólinn', level: 2 },
  { id: 'sko-2', da: 'lærer', is: 'kennari', category: 'Skólinn', level: 2 },
  { id: 'sko-3', da: 'bog', is: 'bók', category: 'Skólinn', level: 2 },
  { id: 'sko-4', da: 'blyant', is: 'blýantur', category: 'Skólinn', level: 2 },
  { id: 'sko-5', da: 'taske', is: 'taska', category: 'Skólinn', level: 2 },
  { id: 'sko-6', da: 'ven', is: 'vinur', category: 'Skólinn', level: 2 },
  { id: 'sko-7', da: 'frikvarter', is: 'frímínútur', category: 'Skólinn', level: 2 },
  { id: 'sko-8', da: 'lektier', is: 'heimanám', category: 'Skólinn', level: 2 },
  { id: 'sko-9', da: 'klasseværelse', is: 'skólastofa', category: 'Skólinn', level: 2 },

  // --- Heimilið (2) ---
  { id: 'hei-1', da: 'hus', is: 'hús', category: 'Heimilið', level: 2 },
  { id: 'hei-2', da: 'værelse', is: 'herbergi', category: 'Heimilið', level: 2 },
  { id: 'hei-3', da: 'køkken', is: 'eldhús', category: 'Heimilið', level: 2 },
  { id: 'hei-4', da: 'seng', is: 'rúm', category: 'Heimilið', level: 2 },
  { id: 'hei-5', da: 'bord', is: 'borð', category: 'Heimilið', level: 2 },
  { id: 'hei-6', da: 'stol', is: 'stóll', category: 'Heimilið', level: 2 },
  { id: 'hei-7', da: 'dør', is: 'hurð', category: 'Heimilið', level: 2 },
  { id: 'hei-8', da: 'vindue', is: 'gluggi', category: 'Heimilið', level: 2 },
  { id: 'hei-9', da: 'have', is: 'garður', category: 'Heimilið', level: 2 },

  // --- Tíminn (2) ---
  { id: 'tim-1', da: 'dag', is: 'dagur', category: 'Tíminn', level: 2 },
  { id: 'tim-2', da: 'nat', is: 'nótt', category: 'Tíminn', level: 2 },
  { id: 'tim-3', da: 'morgen', is: 'morgunn', category: 'Tíminn', level: 2 },
  { id: 'tim-4', da: 'aften', is: 'kvöld', category: 'Tíminn', level: 2 },
  { id: 'tim-5', da: 'uge', is: 'vika', category: 'Tíminn', level: 2 },
  { id: 'tim-6', da: 'år', is: 'ár', category: 'Tíminn', level: 2 },
  { id: 'tim-7', da: 'i dag', is: 'í dag', category: 'Tíminn', level: 2 },
  { id: 'tim-8', da: 'i morgen', is: 'á morgun', category: 'Tíminn', level: 2 },
  { id: 'tim-9', da: 'mandag', is: 'mánudagur', category: 'Tíminn', level: 2 },
  { id: 'tim-10', da: 'søndag', is: 'sunnudagur', category: 'Tíminn', level: 2 },

  // --- Líkaminn (2) ---
  { id: 'lik-1', da: 'hoved', is: 'höfuð', category: 'Líkaminn', level: 2 },
  { id: 'lik-2', da: 'hånd', is: 'hönd', category: 'Líkaminn', level: 2 },
  { id: 'lik-3', da: 'fod', is: 'fótur', category: 'Líkaminn', level: 2 },
  { id: 'lik-4', da: 'øje', is: 'auga', category: 'Líkaminn', level: 2 },
  { id: 'lik-5', da: 'mund', is: 'munnur', category: 'Líkaminn', level: 2 },
  { id: 'lik-6', da: 'næse', is: 'nef', category: 'Líkaminn', level: 2 },
  { id: 'lik-7', da: 'hår', is: 'hár', category: 'Líkaminn', level: 2 },
  { id: 'lik-8', da: 'øre', is: 'eyra', category: 'Líkaminn', level: 2 },

  // --- Sagnir (3) ---
  { id: 'sag-1', da: 'at løbe', is: 'að hlaupa', category: 'Sagnir', level: 3 },
  { id: 'sag-2', da: 'at spise', is: 'að borða', category: 'Sagnir', level: 3 },
  { id: 'sag-3', da: 'at drikke', is: 'að drekka', category: 'Sagnir', level: 3 },
  { id: 'sag-4', da: 'at sove', is: 'að sofa', category: 'Sagnir', level: 3 },
  { id: 'sag-5', da: 'at læse', is: 'að lesa', category: 'Sagnir', level: 3 },
  { id: 'sag-6', da: 'at skrive', is: 'að skrifa', category: 'Sagnir', level: 3 },
  { id: 'sag-7', da: 'at lege', is: 'að leika', category: 'Sagnir', level: 3 },
  { id: 'sag-8', da: 'at gå', is: 'að ganga', category: 'Sagnir', level: 3 },
  { id: 'sag-9', da: 'at se', is: 'að sjá', category: 'Sagnir', level: 3 },
  { id: 'sag-10', da: 'at høre', is: 'að heyra', category: 'Sagnir', level: 3 },
  { id: 'sag-11', da: 'at tale', is: 'að tala', category: 'Sagnir', level: 3 },
  { id: 'sag-12', da: 'at købe', is: 'að kaupa', category: 'Sagnir', level: 3 },

  // --- Lýsingarorð (3) ---
  { id: 'lys-1', da: 'stor', is: 'stór', category: 'Lýsingarorð', level: 3 },
  { id: 'lys-2', da: 'lille', is: 'lítill', category: 'Lýsingarorð', level: 3 },
  { id: 'lys-3', da: 'glad', is: 'glaður', category: 'Lýsingarorð', level: 3 },
  { id: 'lys-4', da: 'træt', is: 'þreyttur', category: 'Lýsingarorð', level: 3 },
  { id: 'lys-5', da: 'hurtig', is: 'fljótur', category: 'Lýsingarorð', level: 3 },
  { id: 'lys-6', da: 'langsom', is: 'hægur', category: 'Lýsingarorð', level: 3 },
  { id: 'lys-7', da: 'smuk', is: 'fallegur', category: 'Lýsingarorð', level: 3 },
  { id: 'lys-8', da: 'gammel', is: 'gamall', category: 'Lýsingarorð', level: 3 },
  { id: 'lys-9', da: 'ny', is: 'nýr', category: 'Lýsingarorð', level: 3 },
  { id: 'lys-10', da: 'kold', is: 'kaldur', category: 'Lýsingarorð', level: 3 },
  { id: 'lys-11', da: 'varm', is: 'heitur', category: 'Lýsingarorð', level: 3 },
  { id: 'lys-12', da: 'sjov', is: 'skemmtilegur', category: 'Lýsingarorð', level: 3 },

  // --- Veðrið (3) ---
  { id: 'ved-1', da: 'regn', is: 'rigning', category: 'Veðrið', level: 3 },
  { id: 'ved-2', da: 'sne', is: 'snjór', category: 'Veðrið', level: 3 },
  { id: 'ved-3', da: 'sol', is: 'sól', category: 'Veðrið', level: 3 },
  { id: 'ved-4', da: 'vind', is: 'vindur', category: 'Veðrið', level: 3 },
  { id: 'ved-5', da: 'sky', is: 'ský', category: 'Veðrið', level: 3 },
  { id: 'ved-6', da: 'vejr', is: 'veður', category: 'Veðrið', level: 3 },
  { id: 'ved-7', da: 'storm', is: 'stormur', category: 'Veðrið', level: 3 },
  { id: 'ved-8', da: 'tordenvejr', is: 'þrumuveður', category: 'Veðrið', level: 3 },

  // --- Farartæki (1) ---
  { id: 'far-1', da: 'bil', is: 'bíll', category: 'Farartæki', level: 1 },
  { id: 'far-2', da: 'bus', is: 'strætó', category: 'Farartæki', level: 1 },
  { id: 'far-3', da: 'tog', is: 'lest', category: 'Farartæki', level: 1 },
  { id: 'far-4', da: 'fly', is: 'flugvél', category: 'Farartæki', level: 1 },
  { id: 'far-5', da: 'båd', is: 'bátur', category: 'Farartæki', level: 1 },
  { id: 'far-6', da: 'cykel', is: 'hjól', category: 'Farartæki', level: 1 },

  // --- Tölur 11–20 og meira (2) ---
  { id: 'tal-11', da: 'elleve', is: 'ellefu', category: 'Tölur', level: 2 },
  { id: 'tal-12', da: 'tolv', is: 'tólf', category: 'Tölur', level: 2 },
  { id: 'tal-13', da: 'tretten', is: 'þrettán', category: 'Tölur', level: 2 },
  { id: 'tal-14', da: 'fjorten', is: 'fjórtán', category: 'Tölur', level: 2 },
  { id: 'tal-15', da: 'femten', is: 'fimmtán', category: 'Tölur', level: 2 },
  { id: 'tal-16', da: 'seksten', is: 'sextán', category: 'Tölur', level: 2 },
  { id: 'tal-17', da: 'sytten', is: 'sautján', category: 'Tölur', level: 2 },
  { id: 'tal-18', da: 'atten', is: 'átján', category: 'Tölur', level: 2 },
  { id: 'tal-19', da: 'nitten', is: 'nítján', category: 'Tölur', level: 2 },
  { id: 'tal-20', da: 'tyve', is: 'tuttugu', category: 'Tölur', level: 2 },
  { id: 'tal-21', da: 'hundrede', is: 'hundrað', category: 'Tölur', level: 2 },

  // --- Föt (2) ---
  { id: 'fot-1', da: 'bukser', is: 'buxur', category: 'Föt', level: 2 },
  { id: 'fot-2', da: 'trøje', is: 'peysa', category: 'Föt', level: 2 },
  { id: 'fot-3', da: 'sko', is: 'skór', category: 'Föt', level: 2 },
  { id: 'fot-4', da: 'jakke', is: 'jakki', category: 'Föt', level: 2 },
  { id: 'fot-5', da: 'hue', is: 'húfa', category: 'Föt', level: 2 },
  { id: 'fot-6', da: 'vanter', is: 'vettlingar', category: 'Föt', level: 2 },
  { id: 'fot-7', da: 'kjole', is: 'kjóll', category: 'Föt', level: 2 },
  { id: 'fot-8', da: 'strømper', is: 'sokkar', category: 'Föt', level: 2 },

  // --- Náttúran (2) ---
  { id: 'nat-1', da: 'træ', is: 'tré', category: 'Náttúran', level: 2 },
  { id: 'nat-2', da: 'blomst', is: 'blóm', category: 'Náttúran', level: 2 },
  { id: 'nat-3', da: 'himmel', is: 'himinn', category: 'Náttúran', level: 2 },
  { id: 'nat-4', da: 'å', is: 'á (fljót)', category: 'Náttúran', level: 2 },
  { id: 'nat-5', da: 'skov', is: 'skógur', category: 'Náttúran', level: 2 },
  { id: 'nat-6', da: 'strand', is: 'strönd', category: 'Náttúran', level: 2 },
  { id: 'nat-7', da: 'bjerg', is: 'fjall', category: 'Náttúran', level: 2 },
  { id: 'nat-8', da: 'græs', is: 'gras', category: 'Náttúran', level: 2 },

  // --- Spurnarorð (2) ---
  { id: 'spu-1', da: 'hvad', is: 'hvað', category: 'Spurnarorð', level: 2 },
  { id: 'spu-2', da: 'hvem', is: 'hver', category: 'Spurnarorð', level: 2 },
  { id: 'spu-3', da: 'hvor', is: 'hvar', category: 'Spurnarorð', level: 2 },
  { id: 'spu-4', da: 'hvornår', is: 'hvenær', category: 'Spurnarorð', level: 2 },
  { id: 'spu-5', da: 'hvorfor', is: 'af hverju', category: 'Spurnarorð', level: 2 },
  { id: 'spu-6', da: 'hvordan', is: 'hvernig', category: 'Spurnarorð', level: 2 },

  // --- Bærinn (3) ---
  { id: 'baer-1', da: 'by', is: 'bær', category: 'Bærinn', level: 3 },
  { id: 'baer-2', da: 'gade', is: 'gata', category: 'Bærinn', level: 3 },
  { id: 'baer-3', da: 'butik', is: 'búð', category: 'Bærinn', level: 3 },
  { id: 'baer-4', da: 'kirke', is: 'kirkja', category: 'Bærinn', level: 3 },
  { id: 'baer-5', da: 'bibliotek', is: 'bókasafn', category: 'Bærinn', level: 3 },
  { id: 'baer-6', da: 'sygehus', is: 'sjúkrahús', category: 'Bærinn', level: 3 },
  { id: 'baer-7', da: 'banegård', is: 'lestarstöð', category: 'Bærinn', level: 3 },
  { id: 'baer-8', da: 'torv', is: 'torg', category: 'Bærinn', level: 3 },

  // --- Fleiri sagnir (3) ---
  { id: 'sag-13', da: 'at synge', is: 'að syngja', category: 'Sagnir', level: 3 },
  { id: 'sag-14', da: 'at danse', is: 'að dansa', category: 'Sagnir', level: 3 },
  { id: 'sag-15', da: 'at svømme', is: 'að synda', category: 'Sagnir', level: 3 },
  { id: 'sag-16', da: 'at arbejde', is: 'að vinna', category: 'Sagnir', level: 3 },
  { id: 'sag-17', da: 'at bo', is: 'að búa', category: 'Sagnir', level: 3 },
  { id: 'sag-18', da: 'at hjælpe', is: 'að hjálpa', category: 'Sagnir', level: 3 },
  { id: 'sag-19', da: 'at finde', is: 'að finna', category: 'Sagnir', level: 3 },
  { id: 'sag-20', da: 'at give', is: 'að gefa', category: 'Sagnir', level: 3 },
  { id: 'sag-21', da: 'at tage', is: 'að taka', category: 'Sagnir', level: 3 },
  { id: 'sag-22', da: 'at komme', is: 'að koma', category: 'Sagnir', level: 3 },
];
