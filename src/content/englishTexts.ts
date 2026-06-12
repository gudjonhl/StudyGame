import type { ReadingText } from './types';

/**
 * Enskir lestrartextar. Spurningarnar eru á ensku því krakkarnir skilja ensku.
 * Til að bæta við texta: afritaðu færslu og breyttu.
 */
export const ENGLISH_TEXTS: ReadingText[] = [
  {
    id: 'en-mars',
    language: 'en',
    level: 2,
    title: 'The Red Planet',
    body:
      'Mars is the fourth planet from the Sun. People call it the Red Planet because its soil is full of rusty iron dust, which makes the whole planet look orange-red.\n\nMars is smaller than Earth and much colder. A day on Mars is almost the same length as a day on Earth, but a year lasts 687 days! Mars has two tiny moons named Phobos and Deimos.\n\nRobots called rovers drive around on Mars right now, taking photos and studying rocks. Scientists hope that one day astronauts will travel there too. The journey would take about seven months.',
    questions: [
      {
        prompt: 'Why is Mars called the Red Planet?',
        choices: [
          'Its soil is full of rusty iron dust',
          'It is very hot',
          'Its sky is always red',
          'It is covered in red plants',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'How long is a year on Mars?',
        choices: ['687 days', '365 days', '100 days', '24 hours'],
        correctIndex: 0,
      },
      {
        prompt: 'What are Phobos and Deimos?',
        choices: ['The two moons of Mars', 'Two famous astronauts', 'Two rovers', 'Two volcanoes on Mars'],
        correctIndex: 0,
      },
      {
        prompt: 'What is exploring Mars right now?',
        choices: ['Robot rovers', 'Astronauts', 'Trained animals', 'Nothing yet'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'en-dolphins',
    language: 'en',
    level: 2,
    title: 'Dolphins',
    body:
      'Dolphins are some of the smartest animals in the ocean. They are not fish — they are mammals, just like humans. This means they need to swim up to the surface to breathe air.\n\nDolphins live together in groups called pods. They talk to each other with clicks and whistles, and every dolphin has its own special whistle, almost like a name!\n\nDolphins love to play. They surf on waves, throw seaweed to each other, and jump high out of the water. They also work as a team when they hunt fish. Some dolphins even help fishermen by pushing fish towards their nets.',
    questions: [
      {
        prompt: 'Why do dolphins swim up to the surface?',
        choices: ['To breathe air', 'To catch birds', 'To get warm', 'To see boats'],
        correctIndex: 0,
      },
      {
        prompt: 'What is a group of dolphins called?',
        choices: ['A pod', 'A pack', 'A school', 'A flock'],
        correctIndex: 0,
      },
      {
        prompt: 'How do dolphins talk to each other?',
        choices: ['With clicks and whistles', 'With songs like birds', 'By slapping the water', 'They cannot communicate'],
        correctIndex: 0,
      },
      {
        prompt: 'What does each dolphin have that is special?',
        choices: ['Its own whistle, like a name', 'A different colour', 'A lucky fish', 'Its own wave'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'en-lost-cat',
    language: 'en',
    level: 2,
    title: 'The Lost Cat',
    body:
      'One rainy afternoon, Maja heard a strange sound outside the kitchen window. It was a small grey cat, completely wet and shivering. It had no collar.\n\nMaja brought it inside, dried it with a towel and gave it some leftover chicken. The cat purred and fell asleep on her lap. Maja really wanted to keep it.\n\nBut her dad said they had to look for the owner first. They put up posters around the neighbourhood. Three days later, an old man knocked on their door. His eyes filled with tears when he saw the cat. "Smokey! I have been looking everywhere for you!"\n\nMaja was sad to say goodbye. But the next weekend, the old man invited her to visit Smokey — and they became good friends.',
    questions: [
      {
        prompt: 'Where did Maja find the cat?',
        choices: ['Outside the kitchen window', 'At school', 'In the park', 'At the beach'],
        correctIndex: 0,
      },
      {
        prompt: 'What did Maja give the cat to eat?',
        choices: ['Leftover chicken', 'Fish', 'Milk and bread', 'Cat food'],
        correctIndex: 0,
      },
      {
        prompt: 'How did they look for the owner?',
        choices: ['They put up posters', 'They called the police', 'They posted online', 'They asked at school'],
        correctIndex: 0,
      },
      {
        prompt: 'How did the story end?',
        choices: [
          'Maja could visit Smokey and made a new friend',
          'Maja kept the cat',
          'The cat ran away again',
          'The owner never came',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'en-football',
    language: 'en',
    level: 2,
    title: 'Football Around the World',
    body:
      'Football is the most popular sport in the world. More than 250 million people play it, in almost every country on Earth. All you need is a ball — that is why children play it everywhere, on grass, sand or street corners.\n\nThe biggest competition is the World Cup, which happens every four years. Billions of people watch it on TV. Brazil has won the World Cup five times, more than any other country.\n\nIceland has a famous football story too. In 2016, the Icelandic men’s team reached the quarter-finals of the European Championship, even though Iceland has fewer people than many single cities! Fans celebrated with the famous "Viking clap".',
    questions: [
      {
        prompt: 'Why can children play football almost anywhere?',
        choices: ['You only need a ball', 'It is free to watch', 'Every school teaches it', 'The rules are short'],
        correctIndex: 0,
      },
      {
        prompt: 'How often is the World Cup played?',
        choices: ['Every four years', 'Every year', 'Every two years', 'Every ten years'],
        correctIndex: 0,
      },
      {
        prompt: 'Which country has won the World Cup most often?',
        choices: ['Brazil', 'Germany', 'Iceland', 'England'],
        correctIndex: 0,
      },
      {
        prompt: 'What did Icelandic fans become famous for in 2016?',
        choices: ['The Viking clap', 'Singing the national anthem backwards', 'Wearing horned helmets', 'Bringing drums to games'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'en-northern-lights',
    language: 'en',
    level: 3,
    title: 'Hunting the Northern Lights',
    body:
      'Every winter, thousands of tourists travel to Iceland with one wish: to see the northern lights, also called the aurora borealis.\n\nThe lights appear when tiny particles from the Sun crash into gases high above the Earth. The collisions make the sky glow in waves of green, purple and pink. The best time to see them is on cold, clear nights far away from city lights.\n\nSeeing the aurora is never guaranteed — it depends on the weather and on activity from the Sun. Scientists publish an aurora forecast, a bit like a weather forecast, that shows the chances each night. Patient hunters sometimes wait outside for hours in the freezing cold. But when the sky suddenly explodes in dancing green light, everyone agrees it was worth the wait.',
    questions: [
      {
        prompt: 'What causes the northern lights?',
        choices: [
          'Particles from the Sun crashing into gases above Earth',
          'Moonlight reflecting on ice',
          'Lightning inside high clouds',
          'City lights bouncing off the sky',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'What conditions are best for seeing the aurora?',
        choices: [
          'Cold, clear nights away from city lights',
          'Warm summer evenings',
          'Cloudy winter days',
          'Right after sunset in town',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'What is the aurora forecast?',
        choices: [
          'A prediction of the chances of seeing the lights',
          'A map of the best hotels',
          'A list of guided tours',
          'A warning about storms',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'What does "guaranteed" mean in this text?',
        choices: ['Certain to happen', 'Very expensive', 'Forbidden', 'Dangerous'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'en-volcanoes',
    language: 'en',
    level: 3,
    title: 'Volcanoes: Windows into the Earth',
    body:
      'Deep under our feet, the Earth is so hot that rock melts. This melted rock is called magma. A volcano is like a chimney that lets magma escape to the surface. Once it flows out, we call it lava.\n\nThere are around 1,500 active volcanoes in the world. Some erupt quietly, with glowing rivers of lava. Others explode violently, throwing ash many kilometres into the sky.\n\nVolcanoes can be destructive, but they are also creative: entire islands, like Iceland and Hawaii, were built by eruptions over millions of years. Volcanic soil is rich and good for farming, and volcanic heat can be used to make electricity and warm houses — exactly what Icelanders do today.',
    questions: [
      {
        prompt: 'What is the difference between magma and lava?',
        choices: [
          'Magma is underground; lava has reached the surface',
          'Magma is cold; lava is hot',
          'They are completely different rocks',
          'Lava is underground; magma is on the surface',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'About how many active volcanoes are there in the world?',
        choices: ['1,500', '150', '15,000', '50'],
        correctIndex: 0,
      },
      {
        prompt: 'How were islands like Iceland and Hawaii created?',
        choices: ['By volcanic eruptions over millions of years', 'By earthquakes', 'By falling meteorites', 'By melting glaciers'],
        correctIndex: 0,
      },
      {
        prompt: 'How do Icelanders use volcanic heat?',
        choices: [
          'To make electricity and warm houses',
          'To cook all their food',
          'To melt roads in winter',
          'They do not use it',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'en-lighthouse',
    language: 'en',
    level: 3,
    title: 'The Mystery of the Old Lighthouse',
    body:
      'Nobody had lived in the lighthouse for forty years. Still, every Sunday night, the people of the village saw its light sweep across the bay. The adults said it was just reflections. The children knew better.\n\nOne Sunday, twins Anna and Bjarni decided to solve the mystery. They hid behind the rocks and waited. At exactly midnight, the light blinked on. They crept up the spiral stairs, hearts pounding.\n\nAt the top, they found no ghost — just their own grandfather, polishing the old lamp. "Someone has to keep it working," he said quietly. "Fifty years ago, this light saved my ship in a storm. I promised I would never let it go dark."\n\nThe twins kept his secret. But from that night on, two more pairs of hands helped polish the lamp every Sunday.',
    questions: [
      {
        prompt: 'What strange thing happened every Sunday night?',
        choices: [
          'The empty lighthouse shone its light',
          'A ship appeared in the bay',
          'The village lights went out',
          'Strange music came from the rocks',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Who was secretly lighting the lamp?',
        choices: ['The twins’ grandfather', 'A ghost', 'The mayor', 'A fisherman from another village'],
        correctIndex: 0,
      },
      {
        prompt: 'Why did he keep the light working?',
        choices: [
          'The light once saved his ship, and he made a promise',
          'He was paid to do it',
          'He was afraid of the dark',
          'He wanted to scare the village',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'What did the twins do after that night?',
        choices: [
          'They helped polish the lamp every Sunday',
          'They told the whole village',
          'They never returned',
          'They wrote about it in the newspaper',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'en-videogames',
    language: 'en',
    level: 3,
    title: 'Video Games and Your Brain',
    body:
      'Did you know that playing video games can actually train your brain? Scientists have studied gamers for years, and the results might surprise you.\n\nAction games can improve your reaction time and your ability to notice small details. Puzzle games train problem-solving, and building games like Minecraft boost creativity and planning. Playing online with others can even improve teamwork — when players communicate well.\n\nBut there is a catch. Too much gaming steals time from sleep, homework, sports and friends, and tired brains learn nothing at all. Experts recommend taking breaks, playing a mix of game types, and keeping screens out of the bedroom at night. Like sweets, games are best enjoyed in sensible amounts.',
    questions: [
      {
        prompt: 'What can action games improve, according to scientists?',
        choices: [
          'Reaction time and noticing details',
          'Singing ability',
          'Height and strength',
          'Nothing at all',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Which type of game boosts creativity and planning?',
        choices: ['Building games like Minecraft', 'Racing games', 'Sports games', 'Card games'],
        correctIndex: 0,
      },
      {
        prompt: 'What is "the catch" mentioned in the text?',
        choices: [
          'Too much gaming steals time from sleep and friends',
          'Games are too expensive',
          'Games make you smarter instantly',
          'Only adults should play games',
        ],
        correctIndex: 0,
      },
      {
        prompt: 'What do experts recommend?',
        choices: [
          'Taking breaks and keeping screens out of the bedroom',
          'Playing only one game type',
          'Gaming every evening before sleep',
          'Avoiding all games completely',
        ],
        correctIndex: 0,
      },
    ],
  },
];
