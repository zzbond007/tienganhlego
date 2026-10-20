/* =========================================================
   curriculum-stage2.js – LỘ TRÌNH 9 THÁNG · GIAI ĐOẠN 2 (Tháng 4–6)
   🌿 EVERYDAY NATURE & SCIENCE EXPLORER – Khám phá Khoa học & Tự nhiên
   12 Tuần (Vùng đất w13–w24) × 3 bài + 1 Mystery Mission mỗi tuần.
   Định dạng giống curriculum-stage1.js (words, comic, build, talk, snow, cb, tb, fact, tf, qa, mystery).
   Nội dung được thiết kế MỚI theo chủ đề lộ trình – không chép lại bài/hội thoại SGK, mà mở rộng
   bằng thí nghiệm nhỏ, nhiệm vụ đời thực, câu chuyện và câu đố logic để bé không "biết rồi".
   ========================================================= */
(function (global) {
  'use strict';

  const Z = [];

  /* ======================= THÁNG 4 ======================= */
  /* ======================= THÁNG 4 ======================= */
  const M4 = ['Backyard Nature, Plants & Aquarium', 'Khu vườn, Cây cối & Thế giới Nước'];
  Z.push(
    /* ---------- WEEK 13: How Plants Grow (Science) ---------- */
    {
      id: 'w13', week: 13, month: 4, monthTitle: M4[0], monthTitleVi: M4[1],
      name: 'How Plants Grow', vi: 'Cây lớn lên như thế nào?', short: 'Plant Science',
      topic: 'Seeds, Roots, Leaves & Sunlight', topicVi: 'Hạt, rễ, lá & ánh nắng',
      color: '#16A34A', dark: '#166534', icon: '🌱', model: ['greenhouse', 'Green Glasshouse', 'Nhà kính xanh mát'],
      chars: { a: { name: 'Bin', fig: 'hair-brown|grin|torso-blue|legs-green|magnifier' }, b: { name: 'Grandma Lan', fig: 'hair-blonde|smile|torso-red|legs-green|book' } },
      chatter: [
        ['Every big tree was once a tiny seed!', 'Cây to nào cũng từng là một hạt nhỏ xíu!'],
        ['Roots drink water from the soil.', 'Rễ uống nước từ trong đất.'],
        ['Leaves make food from sunlight.', 'Lá cây làm ra thức ăn từ ánh nắng.'],
        ['Look! My bean has a tiny sprout!', 'Nhìn kìa! Hạt đậu của mình nảy mầm rồi!'],
        ["Let's plant a mango seed at Grandma's!", 'Mình trồng hạt xoài ở nhà bà nhé!']
      ],
      lessons: [
        {
          title: 'Parts of a Plant', titleVi: 'Các bộ phận của cây', icon: '🌿',
          words: [
            ['seed', 'noun', '/siːd/', 'hạt giống', '🌰', 'A tiny seed can become a big tree.', 'Một hạt nhỏ xíu có thể thành cây to.', 'It is very small. You put it in the ground and a new plant comes out.'],
            ['roots', 'noun', '/ruːts/', 'rễ cây', '🫚', 'The roots hold the plant in the ground.', 'Rễ giữ cho cây đứng vững trong đất.', 'They are under the ground. They drink water for the plant.'],
            ['stem', 'noun', '/stem/', 'thân cây (cây nhỏ)', '🌿', 'The stem carries water up to the leaves.', 'Thân cây đưa nước lên tới lá.', 'It is the long green part that holds the plant up, like a straw.'],
            ['leaves', 'noun', '/liːvz/', 'những chiếc lá', '🍃', 'The leaves are green and flat.', 'Lá cây màu xanh và dẹt.', 'They are green and flat. They catch the sunlight.'],
            ['sunlight', 'noun', '/ˈsʌnlaɪt/', 'ánh nắng mặt trời', '☀️', 'Plants need sunlight to grow.', 'Cây cần ánh nắng để lớn.', 'It comes from the sky in the daytime. It is warm and bright.']
          ],
          comic: {
            title: 'The Thirsty Plant', titleVi: 'Cái cây khát nước',
            panels: [
              ['a', "Grandma, why is this plant so sad? Its leaves are down.", 'Bà ơi, sao cây này buồn thế? Lá nó rũ xuống hết.', '🥀'],
              ['b', 'It is thirsty, Bin. The roots need water.', 'Nó khát nước đấy Bin. Rễ cây cần nước.', '💧'],
              ['a', 'So the water goes up the stem like a straw?', 'Vậy nước đi lên thân cây giống như ống hút ạ?', '🥤'],
              ['b', 'Yes! Then it needs some sunlight, too.', 'Đúng rồi! Sau đó cây cần thêm chút ánh nắng nữa.', '☀️']
            ],
            blanks: [[1, 'roots', ['roots', 'socks', 'shoes']], [2, 'stem', ['stem', 'spoon', 'stair']]]
          },
          build: [
            { vi: 'Em muốn nói: Rễ cây uống nước từ trong đất.', a: ['The roots', 'drink', 'water', 'from the soil.'], x: ['drinks', 'sunlight'] },
            { vi: 'Em muốn giải thích: Cây cần ánh nắng để lớn.', a: ['Plants', 'need', 'sunlight', 'to grow.'], x: ['needs', 'grows'] }
          ],
          talk: [
            { q: 'What do plants need to grow?', vi: 'Cây cần gì để lớn lên?', hint: 'Plants need water and sunlight.', k: ['need|needs', 'water|sunlight|sun|soil|air|light|sunshine'], c: ['Plants need water and sunlight.', 'Plants grow in the garden.', 'Plants have green leaves.'] },
            { q: 'What colour are the leaves on your favourite tree?', vi: 'Lá của cái cây bạn thích có màu gì?', hint: 'The leaves are dark green.', k: ['green|yellow|red|orange|brown|purple|pink'], c: ['The leaves are dark green.', 'The leaves are big and soft.', 'My favourite tree is a mango tree.'] }
          ],
          snow: { vi: 'Kể về các bộ phận của cây', l: [[['the roots'], 'rễ cây'], [['The roots', 'drink', 'water.'], 'Rễ cây uống nước.'], [['Under the ground,', 'the roots', 'drink', 'water', 'and hold the plant.'], 'Dưới mặt đất, rễ cây uống nước và giữ cho cây đứng vững.']], x: ['drinks', 'sky'] },
          cb: ['b', 'Bin, this plant is too dark in the corner. What should we do?', 'Bin ơi, cây này để trong góc tối quá. Mình nên làm gì nhỉ?', [
            ['idea', "Let's move it next to the window!", 'Mình chuyển nó ra cạnh cửa sổ đi bà!', 'Clever boy! Now its leaves can catch the sunlight.', 'Cháu bà thông minh quá! Giờ lá cây đón được nắng rồi.', '🪟'],
            ['ask', 'Can I take it outside to the garden?', 'Cháu mang nó ra vườn được không ạ?', 'Yes, but put it in a place with a little shade.', 'Được, nhưng để chỗ có chút bóng râm nhé.', '🌳']]],
          tb: ['b', 'Do you want to draw a plant and label its parts?', 'Cháu có muốn vẽ một cái cây rồi ghi tên các bộ phận không?', [
            ['yes', 'Yes! Roots, stem, leaves... and a flower!', 'Có ạ! Rễ, thân, lá... và một bông hoa!', 'Beautiful! You are a little scientist!', 'Đẹp quá! Cháu là nhà khoa học nhí đấy!', '🎨'],
            ['idea', 'Can we look at a real plant first?', 'Mình xem một cái cây thật trước được không ạ?', 'Great idea! Bring your magnifier!', 'Ý hay đấy! Mang kính lúp theo nhé!', '🔍']]],
          fact: ['Leaves make food for the plant from sunlight, water and air!', 'Lá cây tự làm ra thức ăn cho cây từ ánh nắng, nước và không khí đấy!'],
          tf: [
            ['Roots grow under the ground.', true, 'Yes! Roots grow down into the soil to find water.', 'Đúng! Rễ mọc xuống đất để tìm nước.'],
            ['Plants grow best in a dark cupboard.', false, 'No! Plants need sunlight to make their food.', 'Sai! Cây cần ánh nắng để làm ra thức ăn.']
          ],
          qa: ['Do you have any plants at home?', 'Nhà bạn có trồng cây không?', 'Yes, we have a small lime tree on the balcony.', ['yes|no|sometimes', 'tree|plant|plants|flower|flowers|garden|balcony|pot|lime']]
        },
        {
          title: 'The Bean-in-a-Jar Experiment', titleVi: 'Thí nghiệm hạt đậu trong lọ', icon: '🫘',
          words: [
            ['sprout', 'verb', '/spraʊt/', 'nảy mầm', '🌱', 'The bean will sprout in three days.', 'Hạt đậu sẽ nảy mầm sau ba ngày.', 'A seed opens and a tiny green shoot comes out.'],
            ['soil', 'noun', '/sɔɪl/', 'đất trồng', '🟫', 'Put the seed in the soil.', 'Đặt hạt giống vào đất.', 'It is brown and soft. Plants grow in it and worms live in it.'],
            ['damp', 'adj', '/dæmp/', 'ẩm ướt (hơi ướt)', '💦', 'Keep the cotton wool damp, not wet.', 'Giữ bông gòn hơi ẩm thôi, đừng ướt sũng.', 'A little bit wet, like a towel after you dry your hands.'],
            ['make their own food', 'phrase', '/meɪk ðeər əʊn fuːd/', 'tự làm ra thức ăn', '🍃', 'Plants make their own food in their leaves.', 'Cây tự làm ra thức ăn trong lá của chúng.', 'Plants can do this with sunlight. Animals and people cannot!'],
            ["Let's find out!", 'phrase', '/lets faɪnd aʊt/', 'Cùng tìm hiểu nào!', '🔎', "Will the bean grow in the dark? Let's find out!", 'Hạt đậu có mọc trong bóng tối không? Cùng tìm hiểu nào!', 'You say this when you want to discover the answer with a test.']
          ],
          comic: {
            title: 'Two Jars, Two Beans', titleVi: 'Hai cái lọ, hai hạt đậu',
            panels: [
              ['b', 'Put a bean in each jar with damp cotton wool.', 'Cháu đặt một hạt đậu vào mỗi lọ với bông gòn ẩm nhé.', '🫙'],
              ['a', "One jar in the sun, one in the cupboard. Let's find out!", 'Một lọ ngoài nắng, một lọ trong tủ. Cùng tìm hiểu nào!', '🔎'],
              ['a', 'Day four! Both beans sprout, but the cupboard one is yellow!', 'Ngày thứ tư! Cả hai hạt đều nảy mầm, nhưng hạt trong tủ bị vàng!', '😮'],
              ['b', 'Without sunlight, leaves cannot make their own food.', 'Không có nắng, lá không thể tự làm ra thức ăn.', '☀️']
            ],
            blanks: [[0, 'damp', ['damp', 'dusty', 'dancing']], [2, 'sprout', ['sprout', 'sing', 'sleep']]]
          },
          build: [
            { vi: 'Em muốn kể: Hạt đậu của mình nảy mầm sau ba ngày.', a: ['My bean', 'sprouted', 'after', 'three days.'], x: ['sprouts', 'before'] },
            { vi: 'Em muốn nói: Mình giữ bông gòn luôn ẩm.', a: ['I', 'keep', 'the cotton wool', 'damp.'], x: ['keeps', 'dry'] }
          ],
          talk: [
            { q: 'Where will you put your bean jar?', vi: 'Bạn sẽ đặt lọ đậu của mình ở đâu?', hint: 'I will put it near the window.', k: ['window|sun|sunny|kitchen|balcony|table|garden|room|shelf|desk'], c: ['I will put it near the window.', 'I will water it every day.', 'It will grow big and green.'] },
            { q: 'What do you think will happen to the bean?', vi: 'Bạn nghĩ hạt đậu sẽ ra sao?', hint: 'I think it will sprout.', k: ['sprout|grow|grows|roots|leaves|shoot|bigger'], c: ['I think it will sprout.', 'I think it is in the jar.', 'I will put it near the window.'] }
          ],
          snow: { vi: 'Kể về thí nghiệm hạt đậu', l: [[['sprouted'], 'đã nảy mầm'], [['My bean', 'sprouted', 'quickly.'], 'Hạt đậu của mình nảy mầm nhanh.'], [['In the sunny jar,', 'my bean', 'sprouted', 'quickly', 'and grew green leaves.'], 'Trong lọ có nắng, hạt đậu nảy mầm nhanh và mọc lá xanh.']], x: ['sprouts', 'cupboard'] },
          cb: ['a', 'Oh no! I forgot my bean jar for a week. The cotton wool is dry!', 'Ôi không! Cháu quên lọ đậu cả tuần. Bông gòn khô hết rồi!', [
            ['calm', "It's okay. Let's start again with a new bean.", 'Không sao. Mình làm lại với hạt đậu mới nhé.', 'Good thinking! Scientists try again and again.', 'Nghĩ hay lắm! Nhà khoa học luôn thử đi thử lại mà.', '🔁'],
            ['idea', "Let's make a reminder card: Water me!", 'Mình làm một tấm thẻ nhắc: Tưới tôi nhé!', 'Great idea! Stick it on the fridge.', 'Ý tuyệt quá! Dán nó lên tủ lạnh nhé.', '📝']]],
          tb: ['b', 'Your friend wants to try the bean experiment too. What do you say?', 'Bạn của cháu cũng muốn làm thí nghiệm hạt đậu. Cháu nói gì?', [
            ['yes', "Sure! I can show you. First, take a jar.", 'Được chứ! Mình chỉ cho. Đầu tiên, lấy một cái lọ.', 'You are a great teacher, Bin!', 'Bin dạy giỏi quá!', '🫙'],
            ['ask', 'Do you want to put yours in the dark?', 'Bạn có muốn để lọ của bạn trong tối không?', "Yes! Then we can compare. Let's find out!", 'Có! Rồi tụi mình so sánh. Cùng tìm hiểu nào!', '🌑']]],
          fact: ['Roots always grow down, even if you turn the seed upside down!', 'Rễ luôn mọc hướng xuống, kể cả khi con lật ngược hạt giống!'],
          tf: [
            ['A plant in the dark can turn pale and yellow.', true, 'Yes! Without sunlight, it cannot make green leaves well.', 'Đúng! Không có nắng, cây không làm ra lá xanh tốt được.'],
            ['Seeds need lots of chocolate to sprout.', false, 'No! Seeds need water, air and warmth.', 'Sai! Hạt cần nước, không khí và hơi ấm.']
          ],
          qa: ['Have you ever grown a seed?', 'Bạn đã từng trồng một hạt giống chưa?', 'Yes, I grew a bean in a jar at school.', ['yes|no|never|grew|planted', 'bean|seed|seeds|flower|tree|jar|pot|plant']]
        },
        {
          title: "Grandma's Mango Seed", titleVi: 'Hạt xoài ở nhà bà', icon: '🥭',
          words: [
            ['plant a seed', 'verb', '/plɑːnt ə siːd/', 'gieo hạt, trồng hạt', '🌰', "Let's plant a seed in the garden.", 'Mình gieo một hạt ở trong vườn nhé.', 'You push it into the soil and wait for a new plant.'],
            ['dig a hole', 'verb', '/dɪɡ ə həʊl/', 'đào một cái hố', '⛏️', 'First, we dig a hole with a small spade.', 'Đầu tiên, mình đào một cái hố bằng xẻng nhỏ.', 'You do this with a spade before you put a young tree in the ground.'],
            ['flowerpot', 'noun', '/ˈflaʊəpɒt/', 'chậu cây', '🪴', 'I put the soil in a flowerpot.', 'Mình cho đất vào chậu cây.', 'It is a container for plants. You can keep it on a balcony.'],
            ['in the shade', 'phrase', '/ɪn ðə ʃeɪd/', 'trong bóng râm', '🌳', 'Young plants like to rest in the shade at noon.', 'Cây non thích nghỉ trong bóng râm lúc giữa trưa.', 'A cool place under a tree where the sun does not shine directly.'],
            ['harvest', 'verb', '/ˈhɑːvɪst/', 'thu hoạch', '🧺', 'We harvest the mangoes in summer.', 'Mùa hè mình thu hoạch xoài.', 'Farmers do this when the fruit or rice is ready to pick.']
          ],
          comic: {
            title: 'A Tree for Me', titleVi: 'Một cái cây cho cháu',
            panels: [
              ['a', 'Grandma, can I plant a seed from this mango?', 'Bà ơi, cháu gieo hạt của quả xoài này được không ạ?', '🥭'],
              ['b', "Of course! First, dig a hole in the flowerpot.", 'Tất nhiên rồi! Đầu tiên, đào một cái hố trong chậu cây nhé.', '🪴'],
              ['a', 'Done! When can we harvest the mangoes?', 'Xong rồi ạ! Khi nào mình thu hoạch xoài được hả bà?', '🧺'],
              ['b', 'In about six years. Be patient, little farmer!', 'Khoảng sáu năm nữa. Kiên nhẫn nhé, bác nông dân nhí!', '😄']
            ],
            blanks: [[1, 'dig a hole', ['dig a hole', 'eat a hole', 'sing a hole']], [2, 'harvest', ['harvest', 'hammer', 'hug']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình gieo một hạt xoài ở nhà bà.', a: ['I', 'planted', 'a mango seed', "at Grandma's house."], x: ['plants', 'ate'] },
            { vi: 'Em muốn kể theo thứ tự: Đầu tiên, mình đào một cái hố.', a: ['First,', 'we', 'dig', 'a hole.'], x: ['digs', 'Finally,'] }
          ],
          talk: [
            { q: 'What fruit tree would you like to plant?', vi: 'Bạn muốn trồng cây ăn quả nào?', hint: "I'd like to plant a mango tree.", k: ['mango|banana|orange|lime|papaya|guava|coconut|apple|longan|lychee|lemon|durian|jackfruit|pear|cherry|plum'], c: ["I'd like to plant a mango tree.", "I'd like to plant a rose.", "I'd like to plant it in the garden."] },
            { q: 'How do you plant a seed? Tell me the first step.', vi: 'Bạn gieo hạt như thế nào? Kể bước đầu tiên đi.', hint: 'First, I dig a hole in the soil.', k: ['first|dig|start|begin', 'hole|soil|pot|flowerpot'], c: ['First, I dig a hole in the soil.', 'Finally, I water the seed.', 'First, I pick the fruit.'] }
          ],
          snow: { vi: 'Kể các bước trồng hạt xoài', l: [[['a hole'], 'một cái hố'], [['We', 'dig', 'a hole.'], 'Mình đào một cái hố.'], [['First,', 'we', 'dig', 'a hole', 'and plant the mango seed.'], 'Đầu tiên, mình đào một cái hố và gieo hạt xoài.']], x: ['digs', 'Finally,'] },
          cb: ['b', 'Bin, the sun is very hot at noon. Where should we put the young plant?', 'Bin ơi, giữa trưa nắng gắt lắm. Mình nên để cây non ở đâu?', [
            ['idea', "Let's put it in the shade under the big tree.", 'Mình để nó trong bóng râm dưới gốc cây to ạ.', 'Smart! Young leaves can get sunburn too.', 'Thông minh! Lá non cũng có thể bị cháy nắng đấy.', '🌳'],
            ['ask', 'Can I make a little roof for it with a leaf?', 'Cháu làm một mái che nhỏ cho nó bằng lá được không ạ?', 'What a sweet idea! A tiny hat for your plant!', 'Ý dễ thương quá! Một chiếc mũ nhỏ cho cây của cháu!', '🍃']]],
          tb: ['b', 'Your mango plant has three new leaves! Who will you tell?', 'Cây xoài của cháu có ba lá mới! Cháu sẽ kể cho ai?', [
            ['yes', "I'll call Mum and Dad and show them a photo!", 'Cháu sẽ gọi bố mẹ và cho xem ảnh ạ!', 'They will be so proud of you!', 'Bố mẹ sẽ tự hào về cháu lắm!', '📱'],
            ['idea', "I'll draw it in my plant diary every week.", 'Cháu sẽ vẽ nó vào nhật ký cây trồng mỗi tuần.', 'Wonderful! Then you can see it grow.', 'Tuyệt vời! Vậy cháu sẽ thấy nó lớn dần.', '📔']]],
          fact: ['A mango tree from a seed usually needs five to eight years to make fruit.', 'Cây xoài trồng từ hạt thường cần năm đến tám năm mới ra quả.'],
          tf: [
            ['Some bamboo can grow almost one metre in one day.', true, 'Yes! Some kinds of bamboo are the fastest-growing plants.', 'Đúng! Một số loại tre là cây mọc nhanh nhất thế giới.'],
            ['You should plant a seed on the roof of a car.', false, 'No! You plant a seed in soil, in a garden or a flowerpot.', 'Sai! Con gieo hạt vào đất, trong vườn hoặc chậu cây.']
          ],
          qa: ["What would you like to grow at your grandparents' house?", 'Bạn muốn trồng gì ở nhà ông bà?', 'I would like to grow a mango tree.', ['grow|plant', 'mango|tree|trees|flower|flowers|vegetables|banana|lime|herbs|beans|rice|fruit']]
        }
      ],
      mystery: {
        t: 'The Mystery Pot', tv: 'Chậu cây bí ẩn',
        intro: ['Grandma has four pots. Only one has a new sprout. Which one?', 'Bà có bốn chậu cây. Chỉ một chậu có mầm mới. Chậu nào?'],
        clues: [['Clue one: The pot in the dark cupboard has no sprout.', 'Manh mối 1: Chậu trong tủ tối không có mầm.'],
          ['Clue two: Seeds need water, so the pot with dry soil has no sprout.', 'Manh mối 2: Hạt cần nước, nên chậu đất khô không có mầm.'],
          ['Clue three: The pot with a stone, not a seed, cannot sprout.', 'Manh mối 3: Chậu có hòn đá thay vì hạt giống thì không thể nảy mầm.']],
        q: ['Which pot has the sprout?', 'Chậu nào có mầm?'],
        o: [['the sunny pot with damp soil', '🌱', 'chậu có nắng và đất ẩm'], ['the pot in the cupboard', '🚪', 'chậu trong tủ'], ['the pot with dry soil', '🏜️', 'chậu đất khô'], ['the pot with a stone', '🪨', 'chậu có hòn đá']], a: 0,
        win: ['Yes! Sunlight, water and a seed make a happy sprout!', 'Đúng rồi! Ánh nắng, nước và hạt giống tạo nên mầm cây vui vẻ!']
      }
    },

    /* ---------- WEEK 14: Freshwater Aquarium & Underwater Life ---------- */
    {
      id: 'w14', week: 14, month: 4, monthTitle: M4[0], monthTitleVi: M4[1],
      name: 'Freshwater Aquarium', vi: 'Bể cá nước ngọt & Thế giới dưới nước', short: 'Aquarium',
      topic: 'Fish Tanks, Gills & Fish Care', topicVi: 'Bể cá, mang cá & chăm sóc cá',
      color: '#0EA5E9', dark: '#0369A1', icon: '🐠', model: ['aquarium', 'Tropical Fish Tank', 'Bể cá nhiệt đới'],
      chars: { a: { name: 'Na', fig: 'hair-brown|freckles|torso-blue|legs-blue|camera' }, b: { name: 'Uncle Khoa', fig: 'cap-red|grin|torso-red|legs-black|wrench' } },
      chatter: [
        ['Welcome to my fish shop on Fish Street!', 'Chào mừng đến cửa hàng cá của chú ở phố cá cảnh!'],
        ['The filter keeps the water clean.', 'Máy lọc giữ cho nước luôn sạch.'],
        ['Fish breathe with their gills.', 'Cá thở bằng mang.'],
        ['Just a pinch of food, please!', 'Chỉ một nhúm thức ăn thôi nhé!'],
        ['Look! Baby guppies!', 'Nhìn kìa! Cá bảy màu con!']
      ],
      lessons: [
        {
          title: 'Build a Fish Tank', titleVi: 'Dựng một bể cá', icon: '🐟',
          words: [
            ['tank', 'noun', '/tæŋk/', 'bể cá', '🫙', 'Our fish tank is next to the TV.', 'Bể cá nhà mình ở cạnh ti vi.', 'It is a big glass box full of water. Fish live in it at home.'],
            ['pebbles', 'noun', '/ˈpeblz/', 'sỏi nhỏ', '🪨', 'We put colourful pebbles at the bottom.', 'Mình rải sỏi nhiều màu dưới đáy bể.', 'Small, round, smooth stones. You often find them in rivers.'],
            ['driftwood', 'noun', '/ˈdrɪftwʊd/', 'lũa (gỗ trôi)', '🪵', 'The fish hide behind the driftwood.', 'Đàn cá trốn sau khúc lũa.', 'An old piece of wood from a river. Fish love to hide behind it.'],
            ['water plants', 'noun', '/ˈwɔːtə plɑːnts/', 'cây thủy sinh', '🌿', 'Water plants make the tank green and fresh.', 'Cây thủy sinh làm bể cá xanh mát.', 'They grow under the water and wave slowly in the tank.'],
            ['filter', 'noun', '/ˈfɪltə/', 'máy lọc nước', '⚙️', 'Turn on the filter every day.', 'Ngày nào cũng bật máy lọc nước nhé.', 'This machine cleans the water in a fish tank all day.']
          ],
          comic: {
            title: 'A Home for Fish', titleVi: 'Ngôi nhà cho cá',
            panels: [
              ['a', "Uncle Khoa, I want a fish tank! What do I need?", 'Chú Khoa ơi, cháu muốn có bể cá! Cháu cần những gì ạ?', '🫙'],
              ['b', 'First, put clean pebbles at the bottom.', 'Đầu tiên, rải sỏi sạch dưới đáy bể.', '🪨'],
              ['a', 'Next, water plants and a piece of driftwood!', 'Tiếp theo, cây thủy sinh và một khúc lũa!', '🌿'],
              ['b', 'Finally, the filter. Wait one week, then add fish.', 'Cuối cùng là máy lọc. Đợi một tuần rồi mới thả cá.', '⚙️']
            ],
            blanks: [[1, 'pebbles', ['pebbles', 'pancakes', 'pillows']], [3, 'filter', ['filter', 'fork', 'football']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình rải sỏi dưới đáy bể.', a: ['I', 'put', 'pebbles', 'at the bottom of the tank.'], x: ['puts', 'on the roof'] },
            { vi: 'Em muốn giải thích: Máy lọc giữ cho nước sạch.', a: ['The filter', 'keeps', 'the water', 'clean.'], x: ['keep', 'dirty'] }
          ],
          talk: [
            { q: 'What would you put in your dream fish tank?', vi: 'Bạn sẽ cho gì vào bể cá mơ ước của mình?', hint: 'I would put water plants and driftwood.', k: ['plants|plant|driftwood|pebbles|fish|castle|rocks|filter|shells|sand|stones'], c: ['I would put water plants and driftwood.', 'I would put it in my bedroom.', 'I would feed them every day.'] },
            { q: 'Why do fish need water plants?', vi: 'Vì sao cá cần cây thủy sinh?', hint: 'Because they can hide and rest there.', k: ['hide|rest|sleep|oxygen|safe|air|breathe|eat'], c: ['Because they can hide and rest there.', 'Because the water is warm.', 'Because they like to swim fast.'] }
          ],
          snow: { vi: 'Kể về bể cá của em', l: [[['driftwood'], 'khúc lũa'], [['My fish', 'love', 'the driftwood.'], 'Cá của mình thích khúc lũa.'], [['Every afternoon,', 'my fish', 'hide', 'behind the driftwood', 'and the water plants.'], 'Chiều nào cá của mình cũng trốn sau khúc lũa và cây thủy sinh.']], x: ['hides', 'roof'] },
          cb: ['b', 'Na, do you want ten fish in this small tank?', 'Na ơi, cháu có muốn thả mười con cá vào bể nhỏ này không?', [
            ['no', 'No, thanks. Ten fish need a bigger tank.', 'Dạ thôi ạ. Mười con cá cần bể to hơn.', 'Right! Fish need space to swim.', 'Chuẩn rồi! Cá cần chỗ để bơi.', '🐟'],
            ['ask', 'How many fish are good for this tank?', 'Bể này nuôi bao nhiêu con thì hợp ạ?', 'About four small fish. Not too many!', 'Khoảng bốn con cá nhỏ thôi. Đừng nhiều quá!', '4️⃣']]],
          tb: ['a', 'My little brother wants to put his toy car in the tank!', 'Em trai cháu muốn bỏ ô tô đồ chơi vào bể cá!', [
            ['calm', "Let's find a fish castle for the tank instead.", 'Mình tìm một lâu đài cho cá thay vào nhé.', 'Good idea! Toys can make the water dirty.', 'Ý hay! Đồ chơi có thể làm bẩn nước.', '🏰'],
            ['idea', 'He can draw a car on the glass with a sticker!', 'Em ấy có thể dán sticker ô tô ngoài kính!', 'Ha ha! The fish will enjoy the view!', 'Ha ha! Cá sẽ thích ngắm lắm!', '🚗']]],
          fact: ['Water plants help to put fresh oxygen into the tank water.', 'Cây thủy sinh giúp đưa thêm khí ô-xy tươi vào nước trong bể.'],
          tf: [
            ['A new tank should run for some days before you add fish.', true, 'Yes! The filter needs time to get ready.', 'Đúng! Máy lọc cần thời gian để sẵn sàng.'],
            ['Fish like to live in orange juice.', false, 'No! Freshwater fish need clean water.', 'Sai! Cá nước ngọt cần nước sạch.']
          ],
          qa: ['Have you ever seen a big aquarium?', 'Bạn đã bao giờ nhìn thấy một bể cá thật lớn chưa?', 'Yes, I saw a big aquarium in a shopping centre.', ['yes|no|saw|seen|never|visited', 'aquarium|tank|fish|shop|centre|mall|zoo|restaurant']]
        },
        {
          title: 'How Fish Breathe', titleVi: 'Cá thở như thế nào?', icon: '🫧',
          words: [
            ['gills', 'noun', '/ɡɪlz/', 'mang cá', '🐟', 'Fish breathe with their gills.', 'Cá thở bằng mang.', 'They are on the sides of a fish’s head. They take air from the water.'],
            ['fins', 'noun', '/fɪnz/', 'vây cá', '🐠', 'The fish moves its fins to turn left and right.', 'Con cá quẫy vây để rẽ trái rẽ phải.', 'Fish use these thin parts of the body to swim and turn.'],
            ['scales', 'noun', '/skeɪlz/', 'vảy cá', '✨', 'Its scales shine like tiny mirrors.', 'Vảy của nó lấp lánh như những chiếc gương tí hon.', 'Small, hard, shiny pieces that cover a fish’s body.'],
            ['bubbles', 'noun', '/ˈbʌblz/', 'bong bóng', '🫧', 'Bubbles go up to the top of the tank.', 'Bong bóng nổi lên mặt bể.', 'Small balls of air in water. They go up and pop.'],
            ['breathe', 'verb', '/briːð/', 'thở', '😮‍💨', 'We breathe air with our nose.', 'Chúng ta thở không khí bằng mũi.', 'You do this all day and all night to get air into your body.']
          ],
          comic: {
            title: 'Can Fish Drown?', titleVi: 'Cá có bị đuối nước không?',
            panels: [
              ['a', 'I swim underwater, but I need air. How do fish breathe?', 'Cháu bơi dưới nước nhưng vẫn cần không khí. Cá thở kiểu gì ạ?', '🤔'],
              ['b', 'Look at its head. Those are gills!', 'Nhìn đầu nó này. Đó là mang cá đấy!', '🐟'],
              ['a', 'The gills open and close! And it moves its fins.', 'Mang cá mở ra đóng vào! Nó còn quẫy vây nữa.', '😮'],
              ['b', 'Yes. The gills take oxygen from the water.', 'Đúng. Mang lấy khí ô-xy từ trong nước.', '💨']
            ],
            blanks: [[1, 'gills', ['gills', 'glasses', 'gloves']], [2, 'fins', ['fins', 'fans', 'forks']]]
          },
          build: [
            { vi: 'Em muốn giải thích: Cá thở bằng mang.', a: ['Fish', 'breathe', 'with', 'their gills.'], x: ['breathes', 'noses'] },
            { vi: 'Em muốn kể: Con cá quẫy vây để bơi.', a: ['The fish', 'moves', 'its fins', 'to swim.'], x: ['move', 'legs'] }
          ],
          talk: [
            { q: 'How do you breathe, and how do fish breathe?', vi: 'Bạn thở bằng gì, còn cá thở bằng gì?', hint: 'I breathe with my nose. Fish breathe with gills.', k: ['nose|mouth|lungs', 'gills'], c: ['I breathe with my nose. Fish breathe with gills.', 'I breathe with my nose. Fish breathe with fins.', 'I breathe with my mouth. Fish breathe air.'] },
            { q: 'What does your favourite fish look like?', vi: 'Con cá bạn thích trông như thế nào?', hint: 'It has orange scales and long fins.', k: ['scales|fins|fin|tail|orange|red|blue|yellow|long|big|small|stripes|shiny|gold|silver|black|white|spots'], c: ['It has orange scales and long fins.', 'It lives in a glass tank.', 'It swims around all day.'] }
          ],
          snow: { vi: 'Kể về cách cá thở', l: [[['gills'], 'mang cá'], [['Fish', 'have', 'gills.'], 'Cá có mang.'], [['Under the water,', 'fish', 'breathe', 'with their gills', 'all day and night.'], 'Dưới nước, cá thở bằng mang suốt ngày đêm.']], x: ['has', 'noses'] },
          cb: ['b', 'Na, the fish are at the top, opening their mouths. What does it mean?', 'Na ơi, đàn cá ngoi lên mặt nước, há miệng. Thế là sao nhỉ?', [
            ['idea', 'Maybe they need more air. Check the filter!', 'Có lẽ chúng thiếu khí. Kiểm tra máy lọc đi chú!', 'Clever! The filter was off. Now the bubbles are back.', 'Giỏi quá! Máy lọc bị tắt. Giờ bong bóng có lại rồi.', '🫧'],
            ['ask', 'Are they hungry, or are they sick?', 'Chúng đói hay bị ốm ạ?', "Good question! Let's check the water first.", 'Câu hỏi hay! Mình kiểm tra nước trước nhé.', '🔍']]],
          tb: ['b', 'Would you like to look at a fish with my magnifier?', 'Cháu có muốn xem cá bằng kính lúp của chú không?', [
            ['yes', 'Yes, please! I want to see its scales.', 'Có ạ! Cháu muốn xem vảy của nó.', 'Look closely. They are like tiny roof tiles!', 'Nhìn kỹ nhé. Chúng như những viên ngói tí hon!', '🔍'],
            ['idea', 'Can I take a photo for my science club?', 'Cháu chụp ảnh cho câu lạc bộ khoa học được không ạ?', 'Sure! Don’t use the flash. Fish don’t like it.', 'Được chứ! Đừng bật đèn flash nhé. Cá không thích đâu.', '📷']]],
          fact: ['Fish have no eyelids, so they sleep with their eyes open!', 'Cá không có mí mắt, nên chúng ngủ mà mắt vẫn mở!'],
          tf: [
            ['Fish use their gills to take oxygen from the water.', true, 'Yes! Gills work like our lungs.', 'Đúng! Mang cá hoạt động giống phổi của chúng ta.'],
            ['Fish breathe with a nose like ours.', false, 'No! Fish breathe with their gills.', 'Sai! Cá thở bằng mang.']
          ],
          qa: ['Can you hold your breath underwater?', 'Bạn có thể nín thở dưới nước không?', 'Yes, I can hold my breath for ten seconds.', ["yes|no|can|cannot|can't", 'seconds|second|minute|minutes|breath|ten|five|twenty']]
        },
        {
          title: 'The Guppy Care Mission', titleVi: 'Nhiệm vụ chăm cá bảy màu', icon: '🧽',
          words: [
            ['guppy', 'noun', '/ˈɡʌpi/', 'cá bảy màu', '🐠', 'My guppy has a rainbow tail.', 'Con cá bảy màu của mình có đuôi màu cầu vồng.', 'A small, colourful fish with a big fancy tail. It is easy to keep.'],
            ['tropical fish', 'noun', '/ˈtrɒpɪkl fɪʃ/', 'cá nhiệt đới', '🐡', 'Tropical fish like warm water.', 'Cá nhiệt đới thích nước ấm.', 'Bright, colourful fish from hot places like Việt Nam and the Amazon.'],
            ['a pinch of', 'phrase', '/ə pɪntʃ əv/', 'một nhúm', '🤏', 'Give them a pinch of fish food.', 'Cho chúng một nhúm thức ăn cho cá.', 'A tiny amount you hold between your finger and thumb.'],
            ['overfeed', 'verb', '/ˌəʊvəˈfiːd/', 'cho ăn quá nhiều', '🚫', "Don't overfeed your fish!", 'Đừng cho cá ăn quá nhiều nhé!', 'You give an animal too much food. It is bad for them.'],
            ['clean the tank', 'verb', '/kliːn ðə tæŋk/', 'vệ sinh bể cá', '🧽', 'We clean the tank every Sunday.', 'Chủ nhật nào mình cũng vệ sinh bể cá.', 'You change some water and wipe the glass of the fish home.']
          ],
          comic: {
            title: 'Too Much Food!', titleVi: 'Nhiều thức ăn quá!',
            panels: [
              ['a', 'My guppy looks hungry. I gave it a big spoon of food!', 'Cá bảy màu của cháu trông đói. Cháu cho nó một thìa đầy thức ăn!', '🥄'],
              ['b', "Oh no! Don't overfeed it. The water will get dirty.", 'Ôi không! Đừng cho ăn nhiều quá. Nước sẽ bị bẩn.', '😱'],
              ['a', 'Sorry! So how much food is enough?', 'Cháu xin lỗi! Vậy bao nhiêu thức ăn là đủ ạ?', '🤔'],
              ['b', 'Just a pinch of food, two times a day.', 'Chỉ một nhúm thôi, mỗi ngày hai lần.', '🤏']
            ],
            blanks: [[1, 'overfeed', ['overfeed', 'overtake', 'oversleep']], [3, 'a pinch of', ['a pinch of', 'a bucket of', 'a mountain of']]]
          },
          build: [
            { vi: 'Em muốn dặn: Đừng cho cá ăn quá nhiều.', a: ["Don't", 'overfeed', 'your fish.'], x: ['overfeeds', 'Doesn\'t'] },
            { vi: 'Em muốn kể: Mình vệ sinh bể cá mỗi Chủ nhật.', a: ['I', 'clean', 'the tank', 'every Sunday.'], x: ['cleans', 'yesterday'] }
          ],
          talk: [
            { q: 'How often should you feed a guppy?', vi: 'Nên cho cá bảy màu ăn bao lâu một lần?', hint: 'Two times a day, just a pinch of food.', k: ['once|one|two|twice', 'day|pinch|little|small'], c: ['Two times a day, just a pinch of food.', 'Ten times a day, a big bowl of food.', 'Once a month, a big bowl.'] },
            { q: 'Who can help you clean the tank?', vi: 'Ai có thể giúp bạn vệ sinh bể cá?', hint: 'My dad can help me clean the tank.', k: ['dad|mum|mom|brother|sister|grandpa|grandma|uncle|aunt|friend|myself|teacher|father|mother|parents'], c: ['My dad can help me clean the tank.', 'I clean the tank on Sundays.', 'We clean it with a sponge.'] }
          ],
          snow: { vi: 'Kể về cách chăm cá', l: [[['a pinch of food'], 'một nhúm thức ăn'], [['I', 'give', 'a pinch of food.'], 'Mình cho một nhúm thức ăn.'], [['Every morning,', 'I', 'give', 'my guppies', 'a pinch of food.'], 'Mỗi sáng, mình cho đàn cá bảy màu một nhúm thức ăn.']], x: ['gives', 'a bucket'] },
          cb: ['b', 'Na, we are going on holiday for three days. What about your guppies?', 'Na ơi, nhà mình đi du lịch ba ngày. Đàn cá bảy màu thì sao?', [
            ['ask', 'Can our neighbour feed them, please?', 'Nhờ hàng xóm cho cá ăn được không ạ?', 'Yes! Write a note: just a pinch of food.', 'Được! Viết giấy dặn: chỉ một nhúm thức ăn thôi.', '📝'],
            ['calm', 'Healthy fish can be fine for three days.', 'Cá khỏe mạnh có thể ổn trong ba ngày ạ.', "That's right. Don't overfeed them before you go!", 'Đúng vậy. Đừng cho ăn nhiều trước khi đi nhé!', '🧳']]],
          tb: ['b', 'Look! There are tiny baby guppies in the tank!', 'Nhìn kìa! Có cá bảy màu con tí hon trong bể!', [
            ['yes', "Wow! Let's give them names!", 'Oa! Mình đặt tên cho chúng đi!', 'Ha ha! That is a lot of names!', 'Ha ha! Nhiều tên lắm đấy!', '🐣'],
            ['idea', 'Can we move them to a safe place?', 'Mình chuyển chúng sang chỗ an toàn được không ạ?', 'Smart! Big fish sometimes eat the babies.', 'Thông minh! Cá lớn đôi khi ăn cá con.', '🛟']]],
          fact: ['Guppy mothers do not lay eggs. They give birth to baby fish!', 'Cá bảy màu mẹ không đẻ trứng. Chúng đẻ ra cá con luôn!'],
          tf: [
            ['Too much fish food makes the water dirty.', true, 'Yes! Old food goes bad in the water.', 'Đúng! Thức ăn thừa bị thối trong nước.'],
            ['You should clean the tank with soap.', false, 'No! Soap is bad for fish. Use clean water only.', 'Sai! Xà phòng có hại cho cá. Chỉ dùng nước sạch thôi.']
          ],
          qa: ['If you had a fish, what would you name it?', 'Nếu có một con cá, bạn sẽ đặt tên nó là gì?', 'I would name it Bubbles.', ['name|call|called']]
        }
      ],
      mystery: {
        t: 'Who Overfed the Fish?', tv: 'Ai cho cá ăn quá nhiều?',
        intro: ['The tank water is cloudy this morning. Someone gave the fish too much food!', 'Sáng nay nước bể đục ngầu. Ai đó đã cho cá ăn quá nhiều!'],
        clues: [['Clue one: Na was at school all day yesterday.', 'Manh mối 1: Hôm qua Na ở trường cả ngày.'],
          ['Clue two: Uncle Khoa was cleaning the filter, so his hands were wet, not floury.', 'Manh mối 2: Chú Khoa đang rửa máy lọc, tay chú ướt chứ không dính bột thức ăn.'],
          ['Clue three: The person who did it cannot read the note "Just a pinch!"', 'Manh mối 3: Người làm việc đó không đọc được tờ giấy "Chỉ một nhúm thôi!"']],
        q: ['Who overfed the fish?', 'Ai đã cho cá ăn quá nhiều?'],
        o: [['Na', '👧', 'Na'], ['Uncle Khoa', '👨', 'chú Khoa'], ['baby cousin Bơ, who is two', '👶', 'em Bơ hai tuổi'], ['Grandpa, who reads the newspaper every day', '👴', 'ông, người đọc báo mỗi ngày']], a: 2,
        win: ['Yes! Little Bơ wanted to help. Now we keep the fish food up high!', 'Đúng rồi! Bé Bơ muốn giúp thôi. Giờ mình cất thức ăn cho cá lên cao!']
      }
    },

    /* ---------- WEEK 15: Bugs & Garden Friends ---------- */
    {
      id: 'w15', week: 15, month: 4, monthTitle: M4[0], monthTitleVi: M4[1],
      name: 'Bugs & Garden Friends', vi: 'Côn trùng & Những người bạn trong vườn', short: 'Garden Bugs',
      topic: 'Bees, Butterflies, Ants & Ladybirds', topicVi: 'Ong, bướm, kiến & bọ rùa',
      color: '#EAB308', dark: '#A16207', icon: '🐞', model: ['meadow', 'Bug Meadow', 'Đồng cỏ côn trùng'],
      chars: { a: { name: 'Tí', fig: 'cap-red|grin|torso-red|legs-tan|magnifier' }, b: { name: 'Dr. Ana', fig: 'hair-blonde|wink|torso-stars|legs-green|camera' } },
      chatter: [
        ['Shh! A butterfly is drinking from the flower.', 'Suỵt! Một chú bướm đang hút mật hoa.'],
        ['Bees work hard to make honey.', 'Ong làm việc chăm chỉ để làm mật.'],
        ['Look! A line of ants!', 'Nhìn kìa! Một hàng kiến!'],
        ['Ladybirds are a gardener’s best friends.', 'Bọ rùa là bạn thân của người làm vườn.'],
        ["Let's build a bug hotel!", 'Mình cùng làm khách sạn côn trùng nào!']
      ],
      lessons: [
        {
          title: 'Busy Bees & Hard-working Ants', titleVi: 'Ong chăm chỉ & Kiến cần cù', icon: '🐝',
          words: [
            ['bee', 'noun', '/biː/', 'con ong', '🐝', 'A bee is visiting the pumpkin flowers.', 'Một chú ong đang ghé thăm hoa bí.', 'It is yellow and black. It buzzes and makes something sweet.'],
            ['honey', 'noun', '/ˈhʌni/', 'mật ong', '🍯', 'Grandma puts honey in her ginger tea.', 'Bà cho mật ong vào trà gừng.', 'It is sweet, sticky and golden. Bees make it from flowers.'],
            ['beehive', 'noun', '/ˈbiːhaɪv/', 'tổ ong', '🏠', 'Thousands of bees live in one beehive.', 'Hàng nghìn con ong sống trong một tổ.', 'It is the home of many bees. It has lots of little six-sided rooms.'],
            ['ant', 'noun', '/ænt/', 'con kiến', '🐜', 'An ant can carry a big crumb.', 'Một con kiến có thể tha một mẩu bánh to.', 'A tiny insect with six legs. It walks in long lines with its friends.'],
            ['hard-working', 'adj', '/ˌhɑːd ˈwɜːkɪŋ/', 'chăm chỉ, cần cù', '💪', 'Ants are very hard-working.', 'Kiến rất cần cù.', 'Someone who does a lot of work and never gives up.']
          ],
          comic: {
            title: 'The Picnic Thieves', titleVi: 'Những tên trộm đi picnic',
            panels: [
              ['a', 'Dr. Ana! A long line of ants is taking my cake!', 'Cô Ana ơi! Một hàng kiến dài đang tha bánh của cháu!', '🐜'],
              ['b', 'Ha ha! Ants are hard-working. They share food with their family.', 'Ha ha! Kiến cần cù lắm. Chúng chia thức ăn cho cả gia đình.', '🍰'],
              ['a', 'And that bee? Is it stealing my juice?', 'Còn con ong kia? Nó đang trộm nước ép của cháu ạ?', '🐝'],
              ['b', 'No, it wants flowers. It makes honey in the beehive.', 'Không đâu, nó tìm hoa. Nó làm mật trong tổ ong.', '🍯']
            ],
            blanks: [[1, 'hard-working', ['hard-working', 'lazy', 'sleepy']], [3, 'honey', ['honey', 'money', 'ketchup']]]
          },
          build: [
            { vi: 'Em muốn giải thích: Ong làm mật từ hoa.', a: ['Bees', 'make', 'honey', 'from flowers.'], x: ['makes', 'milk'] },
            { vi: 'Em muốn khen: Kiến rất cần cù.', a: ['Ants', 'are', 'very', 'hard-working.'], x: ['is', 'lazy'] }
          ],
          talk: [
            { q: 'Do you like honey? What do you eat it with?', vi: 'Bạn có thích mật ong không? Bạn ăn nó với gì?', hint: 'Yes, I eat honey with bread.', k: ['yes|no|like|love', 'bread|tea|pancakes|yoghurt|yogurt|milk|lemon|toast|banana|rice|cake'], c: ['Yes, I eat honey with bread.', 'Yes, bees make honey.', 'Yes, I eat it in the morning.'] },
            { q: 'What should you do if a bee comes near you?', vi: 'Bạn nên làm gì nếu một con ong bay tới gần?', hint: 'I should stay calm and walk away slowly.', k: ['calm|still|slowly|away|quiet'], c: ['I should stay calm and walk away slowly.', 'I should run and shout.', 'I should wave my hands at it.'] }
          ],
          snow: { vi: 'Kể về loài ong', l: [[['honey'], 'mật ong'], [['Bees', 'make', 'honey.'], 'Ong làm mật.'], [['In the beehive,', 'hard-working bees', 'make', 'sweet honey', 'from flowers.'], 'Trong tổ, những chú ong chăm chỉ làm mật ngọt từ hoa.']], x: ['makes', 'milk'] },
          cb: ['b', 'Tí, the ants are in the kitchen again. What should we do?', 'Tí ơi, kiến lại vào bếp rồi. Mình nên làm gì nhỉ?', [
            ['idea', "Let's keep the sugar in a closed box!", 'Mình cất đường vào hộp có nắp đi cô!', 'Smart! No sweet food, no ants.', 'Thông minh! Không có đồ ngọt thì không có kiến.', '📦'],
            ['ask', 'Where do they come in? Can we follow the line?', 'Chúng vào từ đâu ạ? Mình lần theo hàng kiến được không?', "Great detective work! Let's follow them.", 'Thám tử giỏi đấy! Mình lần theo chúng nhé.', '🔍']]],
          tb: ['b', 'Would you like to taste some fresh honey from a farm?', 'Cháu có muốn nếm thử mật ong tươi từ trang trại không?', [
            ['yes', 'Yes, please! Just a little spoon.', 'Có ạ! Một thìa nhỏ thôi ạ.', 'Here you are. Thank the bees!', 'Của cháu đây. Cảm ơn những chú ong nhé!', '🍯'],
            ['no', "No, thank you. I don't like very sweet things.", 'Dạ thôi ạ. Cháu không thích đồ ngọt lắm.', 'No problem! Try some fresh fruit instead.', 'Không sao! Ăn trái cây tươi thay nhé.', '🍉']]],
          fact: ['One honeybee makes only about one twelfth of a teaspoon of honey in its whole life!', 'Cả đời một chú ong mật chỉ làm được khoảng một phần mười hai thìa cà phê mật!'],
          tf: [
            ['Ants can carry things much heavier than their own body.', true, 'Yes! Ants are very strong for their size.', 'Đúng! So với kích thước, kiến rất khỏe.'],
            ['Bees make honey from salt and rice.', false, 'No! Bees make honey from the nectar of flowers.', 'Sai! Ong làm mật từ mật hoa.']
          ],
          qa: ['Which bug do you see most at your home?', 'Bạn hay thấy loài côn trùng nào nhất ở nhà?', 'I see ants in the kitchen every day.', ['ant|ants|mosquito|mosquitoes|fly|flies|bee|bees|butterfly|cockroach|spider|spiders|gecko|moth|moths']]
        },
        {
          title: 'The Butterfly Life Cycle', titleVi: 'Vòng đời của bướm', icon: '🦋',
          words: [
            ['caterpillar', 'noun', '/ˈkætəpɪlə/', 'sâu bướm', '🐛', 'The caterpillar eats leaves all day.', 'Con sâu bướm ăn lá suốt ngày.', 'A long, soft baby insect with many legs. It eats and eats leaves.'],
            ['chrysalis', 'noun', '/ˈkrɪsəlɪs/', 'con nhộng (bướm)', '🫘', 'The caterpillar hangs and makes a chrysalis.', 'Con sâu treo mình và hóa nhộng.', 'A hard case like a sleeping bag. A big change happens inside it.'],
            ['butterfly', 'noun', '/ˈbʌtəflaɪ/', 'con bướm', '🦋', 'A butterfly lands on the hibiscus flower.', 'Một chú bướm đậu trên bông hoa dâm bụt.', 'An insect with big, colourful wings. It was a caterpillar before.'],
            ['wings', 'noun', '/wɪŋz/', 'đôi cánh', '🪽', 'Its wings are orange and black.', 'Đôi cánh của nó màu cam và đen.', 'Birds and many insects use these to fly.'],
            ['life cycle', 'noun', '/ˈlaɪf saɪkl/', 'vòng đời', '🔄', 'The life cycle of a butterfly has four stages.', 'Vòng đời của bướm có bốn giai đoạn.', 'All the changes from egg to baby to adult, again and again.']
          ],
          comic: {
            title: 'Where Did My Caterpillar Go?', titleVi: 'Con sâu của cháu đi đâu rồi?',
            panels: [
              ['a', 'My caterpillar stopped eating. Now it is a hard green case!', 'Con sâu của cháu ngừng ăn. Giờ nó thành cái vỏ xanh cứng!', '😟'],
              ['b', "Don't worry. That's a chrysalis. Wait and see!", 'Đừng lo. Đó là con nhộng. Chờ xem nhé!', '⏳'],
              ['a', 'Two weeks later... It is a butterfly with blue wings!', 'Hai tuần sau... Nó thành con bướm cánh xanh!', '🦋'],
              ['b', 'Egg, caterpillar, chrysalis, butterfly. What a life cycle!', 'Trứng, sâu, nhộng, bướm. Thật là một vòng đời kỳ diệu!', '🔄']
            ],
            blanks: [[1, 'chrysalis', ['chrysalis', 'cheeseburger', 'chopstick']], [2, 'wings', ['wings', 'wheels', 'windows']]]
          },
          build: [
            { vi: 'Em muốn kể: Con sâu bướm ăn lá suốt ngày.', a: ['The caterpillar', 'eats', 'leaves', 'all day.'], x: ['eat', 'stones'] },
            { vi: 'Em muốn kể theo thứ tự: Cuối cùng, một chú bướm chui ra.', a: ['Finally,', 'a butterfly', 'comes out', 'of the chrysalis.'], x: ['First,', 'come out'] }
          ],
          talk: [
            { q: 'Can you tell me the life cycle of a butterfly?', vi: 'Bạn kể vòng đời của bướm được không?', hint: 'Egg, caterpillar, chrysalis, then butterfly.', k: ['caterpillar', 'chrysalis|cocoon|pupa'], c: ['Egg, caterpillar, chrysalis, then butterfly.', 'Egg, tadpole, then frog.', 'Caterpillar, egg, then butterfly.'] },
            { q: 'What colour wings would your dream butterfly have?', vi: 'Chú bướm mơ ước của bạn có cánh màu gì?', hint: 'It would have purple and gold wings.', k: ['red|blue|green|yellow|purple|pink|orange|gold|black|white|rainbow|silver|brown'], c: ['It would have purple and gold wings.', 'It would have big, soft wings.', 'It would fly over the flowers.'] }
          ],
          snow: { vi: 'Kể về vòng đời của bướm', l: [[['a caterpillar'], 'một con sâu bướm'], [['A caterpillar', 'becomes', 'a butterfly.'], 'Sâu bướm biến thành bướm.'], [['After two weeks,', 'the caterpillar', 'becomes', 'a beautiful butterfly', 'with orange wings.'], 'Sau hai tuần, con sâu biến thành chú bướm xinh đẹp có cánh màu cam.']], x: ['become', 'a fish'] },
          cb: ['a', 'Dr. Ana, a caterpillar is eating our lime tree leaves! Should I take it away?', 'Cô Ana ơi, một con sâu đang ăn lá cây chanh! Cháu có nên bắt nó đi không?', [
            ['ask', 'Can I keep it in a box and watch it change?', 'Cháu nuôi nó trong hộp để xem nó thay đổi được không ạ?', 'Yes! Give it fresh lime leaves every day.', 'Được! Cho nó lá chanh tươi mỗi ngày nhé.', '📦'],
            ['calm', "Maybe it's okay. One caterpillar won't eat the whole tree.", 'Chắc không sao đâu. Một con sâu không ăn hết cả cây được.', 'Right! Soon it will be a butterfly for our garden.', 'Đúng! Sắp tới nó sẽ thành bướm cho khu vườn.', '🍋']]],
          tb: ['b', 'Your butterfly is ready to fly. What will you do?', 'Chú bướm của cháu sẵn sàng bay rồi. Cháu sẽ làm gì?', [
            ['yes', "I'll open the box in the garden and say goodbye.", 'Cháu sẽ mở hộp ngoài vườn và chào tạm biệt nó.', 'Fly free, little friend!', 'Bay đi, bạn nhỏ ơi!', '🦋'],
            ['idea', "I'll take a photo first for my bug diary!", 'Cháu sẽ chụp ảnh cho nhật ký côn trùng trước đã!', 'Good idea! Be quick and gentle.', 'Ý hay! Nhanh và nhẹ nhàng thôi nhé.', '📷']]],
          fact: ['Butterflies taste food with their feet!', 'Bướm nếm thức ăn bằng chân đấy!'],
          tf: [
            ['A caterpillar turns into a butterfly inside a chrysalis.', true, 'Yes! Its body changes completely inside.', 'Đúng! Cơ thể nó thay đổi hoàn toàn ở bên trong.'],
            ['A butterfly makes a cocoon, the same as a moth.', false, 'No! A moth makes a soft cocoon. A butterfly makes a hard chrysalis.', 'Sai! Bướm đêm làm kén mềm. Bướm ngày hóa nhộng có vỏ cứng.']
          ],
          qa: ['Have you ever seen a caterpillar or a butterfly?', 'Bạn đã từng thấy sâu bướm hay bướm chưa?', 'Yes, I saw a butterfly in the park.', ['yes|no|saw|seen|never', 'butterfly|caterpillar|park|garden|school|flower|tree']]
        },
        {
          title: 'The Bug Hotel Mission', titleVi: 'Nhiệm vụ khách sạn côn trùng', icon: '🏨',
          words: [
            ['ladybird', 'noun', '/ˈleɪdibɜːd/', 'bọ rùa', '🐞', 'A ladybird has red wings with black spots.', 'Bọ rùa có cánh đỏ chấm đen.', 'A small round beetle, red with black spots. It eats tiny plant bugs.'],
            ['earthworm', 'noun', '/ˈɜːθwɜːm/', 'giun đất', '🪱', 'An earthworm makes the soil soft and good.', 'Giun đất làm đất tơi xốp và màu mỡ.', 'It is long and pink with no legs. It lives under the ground.'],
            ['helpful', 'adj', '/ˈhelpfl/', 'có ích', '👍', 'Ladybirds are helpful in the garden.', 'Bọ rùa có ích cho khu vườn.', 'When something or someone makes a job easier for you.'],
            ['harmful', 'adj', '/ˈhɑːmfl/', 'có hại', '⚠️', 'Aphids are harmful to roses.', 'Rệp cây có hại cho hoa hồng.', 'It hurts plants, animals or people. It is the opposite of good for you.'],
            ['bug hotel', 'noun', '/bʌɡ həʊˈtel/', 'khách sạn côn trùng', '🏨', 'We made a bug hotel from sticks and old bricks.', 'Tụi mình làm khách sạn côn trùng từ que và gạch cũ.', 'A little house made of sticks, leaves and pine cones where insects can stay.']
          ],
          comic: {
            title: 'Check-in Time!', titleVi: 'Giờ nhận phòng!',
            panels: [
              ['a', 'Our bug hotel is ready! Sticks, leaves and bamboo tubes!', 'Khách sạn côn trùng xong rồi! Có que, lá và ống tre!', '🏨'],
              ['b', 'Look! The first guest is a ladybird.', 'Nhìn kìa! Vị khách đầu tiên là bọ rùa.', '🐞'],
              ['a', 'Is it helpful or harmful?', 'Nó có ích hay có hại ạ?', '🤔'],
              ['b', 'Very helpful! It eats aphids that hurt our plants.', 'Rất có ích! Nó ăn rệp hại cây của mình.', '🌹']
            ],
            blanks: [[1, 'ladybird', ['ladybird', 'lady bus', 'lollipop']], [3, 'helpful', ['helpful', 'harmful', 'hungry']]]
          },
          build: [
            { vi: 'Em muốn giải thích: Bọ rùa ăn rệp hại cây.', a: ['Ladybirds', 'eat', 'aphids', 'on our plants.'], x: ['eats', 'honey'] },
            { vi: 'Em muốn nói: Giun đất làm cho đất tốt hơn.', a: ['Earthworms', 'make', 'the soil', 'better.'], x: ['makes', 'worse'] }
          ],
          talk: [
            { q: 'Is a ladybird helpful or harmful? Why?', vi: 'Bọ rùa có ích hay có hại? Vì sao?', hint: 'It is helpful because it eats aphids.', k: ['helpful|good|useful', 'aphids|bugs|insects|pests|greenfly'], c: ['It is helpful because it eats aphids.', 'It is harmful because it eats leaves.', 'It is helpful because it is red.'] },
            { q: 'What would you put in your bug hotel?', vi: 'Bạn sẽ cho gì vào khách sạn côn trùng của mình?', hint: 'I would put sticks, leaves and bamboo.', k: ['sticks|leaves|bamboo|bricks|stones|wood|pine|straw|cones|bark|twigs|moss'], c: ['I would put sticks, leaves and bamboo.', 'I would put it in the garden.', 'I would put ladybirds and bees.'] }
          ],
          snow: { vi: 'Kể về những người bạn có ích trong vườn', l: [[['helpful'], 'có ích'], [['Earthworms', 'are', 'helpful.'], 'Giun đất có ích.'], [['In our garden,', 'earthworms', 'are', 'helpful', 'because they make the soil soft.'], 'Trong vườn nhà mình, giun đất có ích vì chúng làm đất tơi xốp.']], x: ['is', 'harmful'] },
          cb: ['b', 'Tí, your little sister wants to step on a worm! What do you say?', 'Tí ơi, em gái cháu định giẫm lên con giun! Cháu nói gì?', [
            ['no', 'Stop, please! Earthworms are our garden friends.', 'Dừng lại em ơi! Giun đất là bạn của khu vườn.', 'Well done! You protected a helpful friend.', 'Giỏi lắm! Cháu đã bảo vệ một người bạn có ích.', '🪱'],
            ['idea', "Let's put it back in the soil together!", 'Mình cùng thả nó về đất nhé!', 'Lovely! Now it can keep making good soil.', 'Tuyệt! Giờ nó lại tiếp tục làm đất tốt.', '🟫']]],
          tb: ['b', 'Shall we hang the bug hotel on the wall or put it on the ground?', 'Mình treo khách sạn côn trùng lên tường hay đặt dưới đất nhỉ?', [
            ['idea', 'On the wall, in a sunny place for the bees!', 'Lên tường, chỗ có nắng cho ong ạ!', 'Good thinking! Bees love warm places.', 'Nghĩ hay đấy! Ong thích chỗ ấm áp.', '☀️'],
            ['ask', 'Which place do ladybirds like best?', 'Bọ rùa thích chỗ nào nhất ạ?', 'A quiet, dry place near the plants.', 'Một chỗ yên tĩnh, khô ráo, gần cây cối.', '🌿']]],
          fact: ['Earthworms have no eyes, and they breathe through their skin!', 'Giun đất không có mắt, và chúng thở qua da đấy!'],
          tf: [
            ['One ladybird can eat many aphids in a single day.', true, 'Yes! That is why farmers love ladybirds.', 'Đúng! Vì vậy nông dân rất quý bọ rùa.'],
            ['Earthworms are harmful because they make the soil bad.', false, 'No! Earthworms make the soil soft and rich.', 'Sai! Giun đất làm đất tơi xốp và màu mỡ.']
          ],
          qa: ['Which garden bug is your favourite? Why?', 'Bạn thích loài côn trùng nào trong vườn nhất? Vì sao?', 'I like ladybirds because they are cute and helpful.', ['ladybird|ladybirds|bee|bees|butterfly|butterflies|ant|ants|earthworm|worm|dragonfly', 'because|cute|helpful|beautiful|strong|colourful|colorful']]
        }
      ],
      mystery: {
        t: 'The Secret Garden Guest', tv: 'Vị khách bí mật trong vườn',
        intro: ['Someone visited the bug hotel last night. Who was it?', 'Đêm qua có ai đó ghé khách sạn côn trùng. Đó là ai?'],
        clues: [['Clue one: The guest has no wings.', 'Manh mối 1: Vị khách không có cánh.'],
          ['Clue two: The guest has no legs at all.', 'Manh mối 2: Vị khách hoàn toàn không có chân.'],
          ['Clue three: The guest left a little line of soil behind.', 'Manh mối 3: Vị khách để lại một vệt đất nhỏ phía sau.']],
        q: ['Who was the secret guest?', 'Vị khách bí mật là ai?'],
        o: [['a ladybird', '🐞', 'bọ rùa'], ['an ant', '🐜', 'con kiến'], ['an earthworm', '🪱', 'giun đất'], ['a butterfly', '🦋', 'con bướm']], a: 2,
        win: ['Yes! The earthworm came to make the soil better!', 'Đúng rồi! Giun đất đến để làm đất tốt hơn!']
      }
    },

    /* ---------- WEEK 16: Wild Animals & Comparisons ---------- */
    {
      id: 'w16', week: 16, month: 4, monthTitle: M4[0], monthTitleVi: M4[1],
      name: 'Wild Animals & Comparisons', vi: 'Động vật hoang dã & So sánh', short: 'Wild Animals',
      topic: 'Safari Animals, Dinosaurs & Animal Records', topicVi: 'Thú hoang dã, khủng long & kỷ lục động vật',
      color: '#D97706', dark: '#92400E', icon: '🦁', model: ['safari', 'Savanna Safari', 'Chuyến đi thảo nguyên'],
      chars: { a: { name: 'Khang', fig: 'hair-brown|surprised|torso-blue|legs-tan|camera' }, b: { name: 'Ranger Zuri', fig: 'cap-detective|determined|torso-detective|legs-tan|flag' } },
      chatter: [
        ['Welcome to the safari! Stay in the jeep!', 'Chào mừng đến chuyến safari! Ngồi yên trong xe nhé!'],
        ['A hippo is heavier than a car.', 'Hà mã nặng hơn cả một chiếc ô tô.'],
        ['Dinosaurs are extinct, but we find their fossils.', 'Khủng long đã tuyệt chủng, nhưng ta vẫn tìm thấy hóa thạch của chúng.'],
        ['The blue whale is the biggest animal ever!', 'Cá voi xanh là loài vật to nhất từ trước đến nay!'],
        ["Let's play Animal Top Trumps!", 'Mình chơi bài so tài động vật nhé!']
      ],
      lessons: [
        {
          title: 'Safari Snapshot', titleVi: 'Chụp ảnh thảo nguyên', icon: '🦓',
          words: [
            ['zebra', 'noun', '/ˈzebrə/', 'ngựa vằn', '🦓', 'The zebra is drinking at the river.', 'Con ngựa vằn đang uống nước ở sông.', 'It looks like a horse in black and white pyjamas.'],
            ['hippo', 'noun', '/ˈhɪpəʊ/', 'hà mã', '🦛', 'A hippo spends all day in the water.', 'Hà mã ở dưới nước cả ngày.', 'A very big, round animal with a huge mouth. It loves rivers and mud.'],
            ['rhino', 'noun', '/ˈraɪnəʊ/', 'tê giác', '🦏', 'The rhino has two horns on its nose.', 'Con tê giác có hai sừng trên mũi.', 'A big grey animal with thick skin and a horn on its nose.'],
            ['gorilla', 'noun', '/ɡəˈrɪlə/', 'khỉ đột', '🦍', 'The gorilla eats leaves and fruit.', 'Khỉ đột ăn lá và trái cây.', 'The biggest ape. It is strong and beats its chest.'],
            ['stripes', 'noun', '/straɪps/', 'sọc, vằn', '🦓', 'Every zebra has different stripes.', 'Mỗi con ngựa vằn có sọc khác nhau.', 'Long thin lines of colour, like on a zebra or a tiger.']
          ],
          comic: {
            title: 'Click! Click! Safari!', titleVi: 'Tách! Tách! Safari!',
            panels: [
              ['a', 'Ranger Zuri, look! Black and white stripes!', 'Chị Zuri ơi, nhìn kìa! Sọc đen trắng!', '📷'],
              ['b', "That's a zebra. Shh... and a hippo in the river!", 'Đó là ngựa vằn. Suỵt... còn có hà mã dưới sông nữa!', '🦛'],
              ['a', 'Wow! Is that grey animal with a horn a rhino?', 'Oa! Con vật màu xám có sừng kia là tê giác ạ?', '🦏'],
              ['b', 'Yes! Stay in the jeep. Rhinos can run fast!', 'Đúng! Ngồi yên trong xe nhé. Tê giác chạy nhanh lắm!', '🚙']
            ],
            blanks: [[0, 'stripes', ['stripes', 'strawberries', 'stairs']], [2, 'rhino', ['rhino', 'robot', 'radio']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình chụp ảnh một con ngựa vằn.', a: ['I', 'took', 'a photo', 'of a zebra.'], x: ['take', 'cake'] },
            { vi: 'Em muốn nói: Con hà mã ở dưới nước cả ngày.', a: ['The hippo', 'stays', 'in the water', 'all day.'], x: ['stay', 'tree'] }
          ],
          talk: [
            { q: 'Which safari animal would you like to photograph?', vi: 'Bạn muốn chụp ảnh con vật nào trên thảo nguyên?', hint: 'I would like to photograph a zebra.', k: ['zebra|hippo|rhino|gorilla|lion|elephant|giraffe|cheetah|tiger|monkey|leopard|crocodile'], c: ['I would like to photograph a zebra.', 'I would like to photograph a sunset.', 'I would take a photo with my camera.'] },
            { q: 'What does a rhino look like?', vi: 'Con tê giác trông như thế nào?', hint: 'It is big and grey with a horn.', k: ['big|grey|gray|large|heavy', 'horn|horns|skin'], c: ['It is big and grey with a horn.', 'It is big and grey with a long trunk.', 'It has black and white stripes.'] }
          ],
          snow: { vi: 'Kể về chuyến safari của em', l: [[['a zebra'], 'một con ngựa vằn'], [['I', 'saw', 'a zebra.'], 'Mình thấy một con ngựa vằn.'], [['On our safari,', 'I', 'saw', 'a zebra', 'and two hippos in the river.'], 'Trong chuyến safari, mình thấy một con ngựa vằn và hai con hà mã dưới sông.']], x: ['see', 'a penguin'] },
          cb: ['b', 'Khang, a gorilla is looking at you through the glass. What do you do?', 'Khang ơi, một con khỉ đột đang nhìn em qua tấm kính. Em làm gì?', [
            ['calm', 'I stay quiet and wave very slowly.', 'Em đứng yên lặng và vẫy tay thật chậm.', 'Perfect! Gorillas like calm visitors.', 'Tuyệt! Khỉ đột thích những vị khách điềm tĩnh.', '👋'],
            ['ask', 'Why is it looking at me? Is it curious?', 'Sao nó nhìn em? Nó tò mò ạ?', 'Yes! Gorillas are smart and curious, like you.', 'Đúng! Khỉ đột thông minh và tò mò, giống em đấy.', '🦍']]],
          tb: ['b', 'Some people throw food to the animals. What do you think?', 'Có người ném đồ ăn cho thú. Em nghĩ sao?', [
            ['no', "That's not okay. Our food can make animals sick.", 'Không được đâu. Đồ ăn của mình làm thú bị ốm.', 'Exactly! Only the keepers feed the animals.', 'Chính xác! Chỉ người chăm thú mới cho thú ăn.', '🚫'],
            ['idea', "Let's make a poster: Please don't feed the animals!", 'Mình làm áp phích: Xin đừng cho thú ăn!', 'Great idea! You are a real ranger now.', 'Ý tuyệt quá! Giờ em là kiểm lâm thật rồi.', '🪧']]],
          fact: ['Every zebra has its own stripe pattern, like a fingerprint!', 'Mỗi con ngựa vằn có bộ vằn riêng, giống như dấu vân tay vậy!'],
          tf: [
            ['A rhino horn is made of the same stuff as your fingernails.', true, 'Yes! Both are made of keratin.', 'Đúng! Cả hai đều làm từ chất sừng keratin.'],
            ['Hippos live in the snow at the North Pole.', false, 'No! Hippos live in warm rivers in Africa.', 'Sai! Hà mã sống ở những dòng sông ấm áp tại châu Phi.']
          ],
          qa: ['Have you been to a zoo or a safari park?', 'Bạn đã đến sở thú hay công viên safari chưa?', 'Yes, I went to the safari park in Phú Quốc.', ['yes|no|went|been|visited|never', 'zoo|safari|park|animals|saigon|hanoi|phu|quoc']]
        },
        {
          title: 'Dinosaur Showdown', titleVi: 'So tài khủng long', icon: '🦕',
          words: [
            ['dinosaur', 'noun', '/ˈdaɪnəsɔː/', 'khủng long', '🦕', 'This dinosaur ate only plants.', 'Con khủng long này chỉ ăn thực vật.', 'A huge reptile that lived millions of years ago.'],
            ['fossil', 'noun', '/ˈfɒsl/', 'hóa thạch', '🦴', 'We saw a dinosaur fossil at the museum.', 'Tụi mình thấy hóa thạch khủng long ở bảo tàng.', 'Old bones or shapes turned into stone after millions of years.'],
            ['extinct', 'adj', '/ɪkˈstɪŋkt/', 'tuyệt chủng', '☄️', 'Dinosaurs are extinct.', 'Khủng long đã tuyệt chủng.', 'When there are no more of an animal alive anywhere in the world.'],
            ['longer than', 'phrase', '/ˈlɒŋɡə ðæn/', 'dài hơn', '📏', 'This dinosaur was longer than three buses.', 'Con khủng long này dài hơn ba chiếc xe buýt.', 'You use it to compare two things: one goes further from end to end.'],
            ['heavier than', 'phrase', '/ˈheviə ðæn/', 'nặng hơn', '⚖️', 'A hippo is heavier than a car.', 'Hà mã nặng hơn một chiếc ô tô.', 'You use it to compare weight: one thing is hard to lift.']
          ],
          comic: {
            title: 'Bones in the Museum', titleVi: 'Bộ xương trong bảo tàng',
            panels: [
              ['a', 'Ranger Zuri, is this a real dinosaur?', 'Chị Zuri ơi, đây là khủng long thật ạ?', '🦕'],
              ['b', "It's a fossil. Dinosaurs are extinct now.", 'Đó là hóa thạch. Giờ khủng long đã tuyệt chủng rồi.', '🦴'],
              ['a', 'It is longer than our school bus!', 'Nó dài hơn cả xe buýt trường em!', '🚌'],
              ['b', 'And it was heavier than five elephants!', 'Và nó còn nặng hơn năm con voi nữa!', '⚖️']
            ],
            blanks: [[1, 'extinct', ['extinct', 'excited', 'expensive']], [2, 'longer than', ['longer than', 'longer then', 'long than']]]
          },
          build: [
            { vi: 'Em muốn so sánh: Khủng long này dài hơn ba xe buýt.', a: ['This dinosaur', 'was', 'longer than', 'three buses.'], x: ['longest', 'more long'] },
            { vi: 'Em muốn nói: Hà mã nặng hơn ô tô.', a: ['A hippo', 'is', 'heavier than', 'a car.'], x: ['heavy than', 'are'] }
          ],
          talk: [
            { q: 'Which is heavier: a hippo or a dog?', vi: 'Con nào nặng hơn: hà mã hay con chó?', hint: 'A hippo is heavier than a dog.', k: ['hippo', 'heavier|bigger'], c: ['A hippo is heavier than a dog.', 'A dog is heavier.', 'A hippo is faster than a dog.'] },
            { q: 'What is your favourite dinosaur? Why?', vi: 'Khủng long yêu thích của bạn là con nào? Vì sao?', hint: 'I like Stegosaurus because it has big plates.', k: ['stegosaurus|t-rex|rex|triceratops|diplodocus|brachiosaurus|velociraptor|raptor|pterodactyl|dinosaur|spinosaurus|ankylosaurus', 'because|big|long|fast|strong|horns|plates|teeth|fly|cool'], c: ['I like Stegosaurus because it has big plates.', 'Stegosaurus ate plants.', 'I like the dinosaur museum.'] }
          ],
          snow: { vi: 'So sánh khủng long', l: [[['longer than'], 'dài hơn'], [['Diplodocus', 'was', 'longer than a bus.'], 'Khủng long cổ dài dài hơn xe buýt.'], [['Millions of years ago,', 'Diplodocus', 'was', 'longer than', 'three school buses.'], 'Hàng triệu năm trước, khủng long cổ dài dài hơn ba chiếc xe buýt trường học.']], x: ['longest', 'is'] },
          cb: ['a', 'My friend says dinosaurs and people lived together. Is that true?', 'Bạn em bảo khủng long và con người từng sống cùng nhau. Đúng không ạ?', [
            ['ask', 'Can we check in a science book together?', 'Mình cùng kiểm tra trong sách khoa học được không ạ?', 'Yes! The book says dinosaurs lived long before people.', 'Được! Sách nói khủng long sống từ rất lâu trước con người.', '📚'],
            ['calm', "I think it's only in films. Let's ask the museum guide.", 'Em nghĩ chỉ có trong phim thôi. Mình hỏi hướng dẫn viên bảo tàng nhé.', 'Good thinking! Films are fun, but not always true.', 'Nghĩ hay đấy! Phim thì vui, nhưng không phải lúc nào cũng đúng.', '🎬']]],
          tb: ['b', 'Would you like to dig for fossils in the sandbox?', 'Em có muốn đào tìm hóa thạch trong hố cát không?', [
            ['yes', 'Yes! I will use a brush, not a big spade.', 'Có ạ! Em sẽ dùng bàn chải, không dùng xẻng to.', 'Just like a real scientist! Gently does it.', 'Giống nhà khoa học thật! Nhẹ nhàng thôi nhé.', '🖌️'],
            ['idea', 'Can I make a fossil with clay and a shell?', 'Em làm hóa thạch bằng đất sét và vỏ sò được không?', 'Wonderful idea! Press the shell into the clay.', 'Ý tuyệt vời! Ấn vỏ sò vào đất sét nhé.', '🐚']]],
          fact: ['Birds are living relatives of dinosaurs!', 'Các loài chim là họ hàng còn sống của khủng long đấy!'],
          tf: [
            ['Some dinosaurs were heavier than ten elephants.', true, 'Yes! Argentinosaurus was one of the heaviest animals on land ever.', 'Đúng! Argentinosaurus là một trong những loài vật trên cạn nặng nhất từ trước đến nay.'],
            ['People lived at the same time as Diplodocus.', false, 'No! Dinosaurs like Diplodocus lived millions of years before people.', 'Sai! Những loài như Diplodocus sống hàng triệu năm trước con người.']
          ],
          qa: ['If you met a dinosaur, what would you say?', 'Nếu gặp một con khủng long, bạn sẽ nói gì?', 'I would say: Hello! Please don’t eat me!', ['hello|hi|please|friend|eat|run|help|wow']]
        },
        {
          title: 'Animal Record Breakers', titleVi: 'Những nhà vô địch động vật', icon: '🏆',
          words: [
            ['the fastest', 'phrase', '/ðə ˈfɑːstɪst/', 'nhanh nhất', '⚡', 'The cheetah is the fastest land animal.', 'Báo săn là loài vật trên cạn nhanh nhất.', 'Number one for speed. Nobody can win a race against it.'],
            ['the biggest', 'phrase', '/ðə ˈbɪɡɪst/', 'to nhất', '🐋', 'The blue whale is the biggest animal in the world.', 'Cá voi xanh là loài vật to nhất thế giới.', 'Number one for size. All the others are smaller.'],
            ['the heaviest', 'phrase', '/ðə ˈheviɪst/', 'nặng nhất', '🏋️', 'The elephant is the heaviest land animal.', 'Voi là loài vật trên cạn nặng nhất.', 'Number one for weight. It is very, very hard to lift.'],
            ['slower than', 'phrase', '/ˈsləʊə ðæn/', 'chậm hơn', '🐢', 'A tortoise is slower than a rabbit.', 'Rùa chậm hơn thỏ.', 'You use it to compare speed: this one takes more time to get there.'],
            ['world record', 'noun', '/wɜːld ˈrekɔːd/', 'kỷ lục thế giới', '🏆', 'The cheetah holds a world record for speed.', 'Báo săn giữ kỷ lục thế giới về tốc độ.', 'The best result ever on Earth. Nobody has done better.']
          ],
          comic: {
            title: 'Animal Top Trumps', titleVi: 'Bài so tài động vật',
            panels: [
              ['a', 'My card: cheetah! It is the fastest land animal!', 'Lá bài của em: báo săn! Nó là loài vật trên cạn nhanh nhất!', '🐆'],
              ['b', 'My card: blue whale. Size wins this round! It is the biggest.', 'Lá của chị: cá voi xanh. Vòng này so kích thước! Nó to nhất.', '🐋'],
              ['a', 'Oh no! My sloth is slower than everything!', 'Ôi không! Con lười của em chậm hơn mọi con!', '🦥'],
              ['b', 'But sloths can hold their breath underwater for forty minutes!', 'Nhưng con lười có thể nín thở dưới nước tới bốn mươi phút đấy!', '🦥']
            ],
            blanks: [[0, 'the fastest', ['the fastest', 'the fattest', 'the faster']], [2, 'slower than', ['slower than', 'slowest than', 'slow than']]]
          },
          build: [
            { vi: 'Em muốn nói: Cá voi xanh là loài vật to nhất thế giới.', a: ['The blue whale', 'is', 'the biggest animal', 'in the world.'], x: ['bigger', 'are'] },
            { vi: 'Em muốn so sánh: Con rùa chậm hơn con thỏ.', a: ['A tortoise', 'is', 'slower than', 'a rabbit.'], x: ['slowest', 'more slow'] }
          ],
          talk: [
            { q: 'Which animal is the fastest on land?', vi: 'Loài vật nào chạy nhanh nhất trên cạn?', hint: 'The cheetah is the fastest on land.', k: ['cheetah'], c: ['The cheetah is the fastest on land.', 'The horse is the fastest on land.', 'The sailfish is the fastest in the sea.'] },
            { q: 'Who is the tallest person in your family?', vi: 'Ai là người cao nhất trong nhà bạn?', hint: 'My dad is the tallest in my family.', k: ['dad|father|mum|mom|mother|brother|sister|grandpa|grandma|uncle|aunt|i|me', 'tallest|tall|biggest'], c: ['My dad is the tallest in my family.', 'My baby sister is the shortest.', 'My dad is the oldest in my family.'] }
          ],
          snow: { vi: 'Kể về kỷ lục động vật', l: [[['the fastest'], 'nhanh nhất'], [['The cheetah', 'is', 'the fastest.'], 'Báo săn nhanh nhất.'], [['On land,', 'the cheetah', 'is', 'the fastest animal', 'in the world.'], 'Trên cạn, báo săn là loài vật nhanh nhất thế giới.']], x: ['fast', 'are'] },
          cb: ['b', 'You lost the Top Trumps game three times. How do you feel?', 'Em thua bài so tài ba lần rồi. Em thấy sao?', [
            ['calm', "It's okay. One more game? I'll choose speed!", 'Không sao ạ. Chơi ván nữa nhé? Em sẽ chọn tốc độ!', 'Great spirit! Good luck!', 'Tinh thần tuyệt vời! Chúc em may mắn!', '🍀'],
            ['idea', 'Let’s make new cards with Vietnamese animals!', 'Mình làm bài mới với các con vật Việt Nam đi!', 'Brilliant! A saola card and a Mekong catfish card!', 'Tuyệt quá! Một lá sao la và một lá cá tra dầu sông Mekong!', '🃏']]],
          tb: ['a', 'My cousin says a dog is bigger than a hippo. What do I say?', 'Anh họ em bảo chó to hơn hà mã. Em nói gì đây?', [
            ['ask', 'Do you want to look at a picture together?', 'Anh có muốn cùng xem ảnh không?', 'Good! Pictures show the answer clearly.', 'Hay đấy! Ảnh cho thấy câu trả lời rõ ràng.', '🖼️'],
            ['no', 'I don’t think so. A hippo is much heavier!', 'Em không nghĩ vậy. Hà mã nặng hơn nhiều!', 'Right! And say it kindly, with a smile.', 'Đúng! Và nói nhẹ nhàng, kèm nụ cười nhé.', '😊']]],
          fact: ['A blue whale’s heart is about as big as a small car!', 'Tim của cá voi xanh to gần bằng một chiếc ô tô nhỏ!'],
          tf: [
            ['The blue whale is bigger than any dinosaur we know.', true, 'Yes! It is the biggest animal that has ever lived.', 'Đúng! Nó là loài vật to nhất từng sống trên Trái Đất.'],
            ['A snail is faster than a cheetah.', false, 'No! A snail is much slower than a cheetah.', 'Sai! Ốc sên chậm hơn báo săn rất nhiều.']
          ],
          qa: ['What is the fastest thing you can do?', 'Việc gì bạn làm nhanh nhất?', 'I can run faster than my brother.', ['run|swim|eat|ride|read|write|draw|type|dance|count', 'faster|fastest|quick|quickly|fast']]
        }
      ],
      mystery: {
        t: 'The Mystery Top Trump Card', tv: 'Lá bài so tài bí ẩn',
        intro: ['Ranger Zuri hid one animal card. Which animal is it?', 'Chị Zuri giấu một lá bài con vật. Đó là con gì?'],
        clues: [['Clue one: It lives on land, not in the sea.', 'Manh mối 1: Nó sống trên cạn, không sống ở biển.'],
          ['Clue two: It is not extinct. You can see it today.', 'Manh mối 2: Nó chưa tuyệt chủng. Hôm nay bạn vẫn thấy nó.'],
          ['Clue three: It is faster than a zebra and has spots, not stripes.', 'Manh mối 3: Nó chạy nhanh hơn ngựa vằn và có đốm, không có sọc.']],
        q: ['Which animal is on the card?', 'Lá bài là con vật nào?'],
        o: [['a blue whale', '🐋', 'cá voi xanh'], ['a Diplodocus', '🦕', 'khủng long cổ dài'], ['a cheetah', '🐆', 'báo săn'], ['a hippo', '🦛', 'hà mã']], a: 2,
        win: ['Yes! The cheetah is the fastest land animal!', 'Đúng rồi! Báo săn là loài vật trên cạn nhanh nhất!']
      }
    }
  );

  /* ======================= THÁNG 5 ======================= */
  const M5 = ['Weather, Water Cycle & Seasons', 'Thời tiết, Vòng tuần hoàn Nước & Khí hậu'];
  Z.push(
    /* ---------- WEEK 17: Weather & Daily Forecast ---------- */
    {
      id: 'w17', week: 17, month: 5, monthTitle: M5[0], monthTitleVi: M5[1],
      name: 'Weather & Daily Forecast', vi: 'Thời tiết & Bản tin dự báo', short: 'Weather Report',
      topic: 'Weather Words, TV Forecasts & Hà Nội vs Sài Gòn', topicVi: 'Từ vựng thời tiết, làm phát thanh viên & khí hậu hai miền',
      color: '#0EA5E9', dark: '#0369A1', icon: '🌦️', model: ['weather', 'LEGO Weather Studio', 'Trường quay Dự báo thời tiết'],
      chars: { a: { name: 'Bin', fig: 'hair-brown|grin|torso-blue|legs-blue|camera' }, b: { name: 'Ms Hoa', fig: 'hair-blonde|smile|torso-red|legs-black|flag' } },
      chatter: [
        ['Good evening! Here is the weather forecast.', 'Chào buổi tối! Sau đây là bản tin dự báo thời tiết.'],
        ["It's chilly in Hà Nội today.", 'Hôm nay Hà Nội trời se lạnh.'],
        ['Look! Lightning! Count to five for the thunder.', 'Nhìn kìa! Tia chớp! Đếm đến năm sẽ nghe tiếng sấm.'],
        ['It is thirty-four degrees in Sài Gòn!', 'Sài Gòn đang ba mươi tư độ!'],
        ["Don't forget your umbrella. It might drizzle!", 'Đừng quên ô nhé. Trời có thể mưa phùn đấy!']
      ],
      lessons: [
        {
          title: 'Weather Words Level Up', titleVi: 'Nâng cấp từ vựng thời tiết', icon: '⛈️',
          words: [
            ['drizzle', 'noun', '/ˈdrɪzl/', 'mưa phùn, mưa lất phất', '🌦️', 'There is a light drizzle in Hà Nội.', 'Hà Nội đang có mưa phùn nhẹ.', 'Tiny soft raindrops fall slowly. You hardly need an umbrella.'],
            ['thunderstorm', 'noun', '/ˈθʌndəstɔːm/', 'cơn dông', '⛈️', 'A big thunderstorm is coming tonight.', 'Tối nay sẽ có một cơn dông lớn.', 'Heavy rain with loud booms and flashes in the sky.'],
            ['lightning', 'noun', '/ˈlaɪtnɪŋ/', 'tia chớp', '⚡', 'I saw lightning in the dark sky.', 'Mình thấy tia chớp trên bầu trời tối.', 'A bright flash of electricity in a storm.'],
            ['chilly', 'adj', '/ˈtʃɪli/', 'se lạnh', '🥶', "It's chilly this morning, so wear a jacket.", 'Sáng nay trời se lạnh, nên mặc áo khoác nhé.', 'A little bit cold, but not freezing.'],
            ['humid', 'adj', '/ˈhjuːmɪd/', 'nồm ẩm, oi ẩm', '💦', 'The air is hot and humid in summer.', 'Mùa hè không khí nóng và oi ẩm.', 'The air feels wet and sticky. Your clothes never dry!']
          ],
          comic: {
            title: 'Boom! What Was That?', titleVi: 'Đùng! Cái gì thế?',
            panels: [
              ['a', 'Ms Hoa, I saw a flash in the sky!', 'Cô Hoa ơi, cháu thấy một tia sáng trên trời!', '⚡'],
              ['b', "That's lightning, Bin. Now count: one, two, three...", 'Đó là tia chớp đấy Bin. Giờ đếm nhé: một, hai, ba...', '🔢'],
              ['a', 'BOOM! Ah! A thunderstorm is coming!', 'ĐÙNG! Á! Cơn dông sắp tới rồi!', '⛈️'],
              ['b', "Let's stay inside. It's safer here.", 'Mình ở trong nhà nhé. Ở đây an toàn hơn.', '🏠']
            ],
            blanks: [[1, 'lightning', ['lightning', 'lemonade', 'lunchbox']], [2, 'thunderstorm', ['thunderstorm', 'sandcastle', 'thumbs-up']]]
          },
          build: [
            { vi: 'Em muốn nói: Sáng nay trời se lạnh ở Hà Nội.', a: ['It', 'is', 'chilly', 'in Hà Nội this morning.'], x: ['are', 'chilli'] },
            { vi: 'Em muốn kể: Mình thấy tia chớp trong cơn dông.', a: ['I', 'saw', 'lightning', 'in the thunderstorm.'], x: ['see', 'lemon'] }
          ],
          talk: [
            { q: 'What is the weather like today?', vi: 'Hôm nay thời tiết thế nào?', hint: "It's chilly and cloudy today.", k: ['chilly|humid|hot|cold|sunny|rainy|cloudy|windy|drizzle|warm|cool|stormy|storm|foggy|raining|snowy|dry'], c: ["It's chilly and cloudy today.", "It's Monday today.", 'I am wearing my jacket.'] },
            { q: 'Are you scared of thunderstorms?', vi: 'Bạn có sợ cơn dông không?', hint: 'A little, but I stay inside.', k: ['yes|no|little|bit|not|sometimes', 'scared|afraid|inside|home|stay|ok|fine|brave'], c: ['A little, but I stay inside.', 'Yes, I like sunny days.', "No, it's very hot today."] }
          ],
          snow: { vi: 'Mô tả thời tiết hôm nay', l: [[['chilly'], 'se lạnh'], [['It', 'is', 'chilly.'], 'Trời se lạnh.'], [['This morning,', 'it', 'is', 'chilly', 'with a light drizzle.'], 'Sáng nay trời se lạnh và có mưa phùn nhẹ.']], x: ['are', 'humidly'] },
          cb: ['b', "Bin, there's lightning outside. Do you still want to play football?", 'Bin ơi, ngoài trời có sấm chớp. Cháu vẫn muốn đá bóng à?', [
            ['no', "No way! I'll play LEGO inside instead.", 'Không đâu ạ! Cháu chơi LEGO trong nhà thôi.', 'Smart choice! Safety first.', 'Lựa chọn thông minh! An toàn là trên hết.', '🧱'],
            ['ask', 'Can we play after the storm, please?', 'Mình chơi sau cơn dông được không ạ?', 'Sure! When the thunder stops, we wait thirty minutes.', 'Được chứ! Khi hết sấm, mình đợi thêm ba mươi phút.', '⏱️']]],
          tb: ['b', 'Hà Nội is so humid today. The walls are wet!', 'Hôm nay Hà Nội nồm quá. Tường ướt hết cả!', [
            ['idea', "Let's close the windows and turn on the fan.", 'Mình đóng cửa sổ và bật quạt nhé.', 'Good idea! That keeps the room drier.', 'Ý hay! Như vậy phòng sẽ khô hơn.', '🪟'],
            ['ask', 'Why are the walls wet?', 'Sao tường lại ướt ạ?', 'Warm wet air touches the cold walls and turns into water!', 'Không khí ấm và ẩm chạm vào tường lạnh và biến thành nước!', '💧']]],
          fact: ['Light travels faster than sound, so we see lightning before we hear thunder.', 'Ánh sáng đi nhanh hơn âm thanh, nên ta thấy tia chớp trước khi nghe tiếng sấm.'],
          tf: [
            ['You see lightning before you hear thunder.', true, 'Yes! Light is much faster than sound.', 'Đúng! Ánh sáng nhanh hơn âm thanh rất nhiều.'],
            ['It is safe to stand under a tall tree in a thunderstorm.', false, 'No! Tall trees can be hit by lightning. Go inside a building.', 'Sai! Cây cao có thể bị sét đánh. Hãy vào trong nhà.']
          ],
          qa: ['What weather do you like best?', 'Bạn thích kiểu thời tiết nào nhất?', 'I like chilly weather because I can wear my jacket.', ['like|love|enjoy', 'chilly|sunny|rainy|cool|warm|drizzle|cloudy|windy|cold|hot']]
        },
        {
          title: 'Bin the TV Weather Reporter', titleVi: 'Bin làm phát thanh viên thời tiết', icon: '📺',
          words: [
            ['forecast', 'noun', '/ˈfɔːkɑːst/', 'bản tin dự báo', '📺', 'I watch the weather forecast every evening.', 'Tối nào mình cũng xem dự báo thời tiết.', 'It tells you what the weather will be like tomorrow.'],
            ['temperature', 'noun', '/ˈtemprətʃə/', 'nhiệt độ', '🌡️', 'The temperature today is twenty degrees.', 'Nhiệt độ hôm nay là hai mươi độ.', 'It tells you how hot or cold something is.'],
            ['degrees', 'noun', '/dɪˈɡriːz/', 'độ (nhiệt độ)', '🔢', 'It is thirty-five degrees in Sài Gòn.', 'Sài Gòn đang ba mươi lăm độ.', 'We use this word with numbers on a thermometer.'],
            ['cloudy', 'adj', '/ˈklaʊdi/', 'nhiều mây', '☁️', "It's cloudy, so we can't see the sun.", 'Trời nhiều mây nên không thấy mặt trời.', 'The sky is grey and white. The sun is hiding.'],
            ["It's going to rain.", 'phrase', '/ɪts ˈɡəʊɪŋ tə reɪn/', 'Trời sắp mưa rồi.', '🌧️', "Look at those dark clouds! It's going to rain.", 'Nhìn mây đen kìa! Trời sắp mưa rồi.', 'You say this when you see dark clouds and want to warn people.']
          ],
          comic: {
            title: 'Live on LEGO TV!', titleVi: 'Trực tiếp trên LEGO TV!',
            panels: [
              ['b', "Three, two, one... You're on TV, Bin!", 'Ba, hai, một... Cháu đang lên sóng rồi, Bin!', '🎬'],
              ['a', "Good evening! Here is tomorrow's forecast.", 'Chào buổi tối! Sau đây là dự báo cho ngày mai.', '📺'],
              ['a', 'Hà Nội will be cloudy. The temperature is eighteen degrees.', 'Hà Nội trời nhiều mây. Nhiệt độ là mười tám độ.', '🌡️'],
              ['b', 'Great job! But look outside... it\'s going to rain now!', 'Giỏi lắm! Nhưng nhìn ra ngoài kìa... trời sắp mưa rồi!', '🌧️']
            ],
            blanks: [[1, 'forecast', ['forecast', 'breakfast', 'football']], [2, 'temperature', ['temperature', 'teddy bear', 'telephone']]]
          },
          build: [
            { vi: 'Em muốn đọc bản tin: Nhiệt độ hôm nay là hai mươi độ.', a: ['The temperature', 'is', 'twenty degrees', 'today.'], x: ['are', 'twenty metres'] },
            { vi: 'Em muốn kể: Mình xem dự báo thời tiết mỗi tối.', a: ['I', 'watch', 'the weather forecast', 'every evening.'], x: ['watches', 'the weather breakfast'] }
          ],
          talk: [
            { q: "What's the temperature today?", vi: 'Hôm nay nhiệt độ bao nhiêu?', hint: "It's about twenty-five degrees.", k: ['degree|degrees|twenty|thirty|fifteen|eighteen|nineteen|sixteen|seventeen|hot|cold|warm'], c: ["It's about twenty-five degrees.", "It's about five o'clock.", "It's sunny and windy today."] },
            { q: 'Who watches the weather forecast in your family?', vi: 'Ai trong nhà bạn hay xem dự báo thời tiết?', hint: 'My dad watches it every evening.', k: ['dad|mum|mom|grandpa|grandma|i|nobody|everyone|father|mother|brother|sister|grandad|grandmother|grandfather'], c: ['My dad watches it every evening.', 'It says it will rain tomorrow.', "It is on TV at seven o'clock."] }
          ],
          snow: { vi: 'Đọc bản tin thời tiết như phát thanh viên', l: [[['cloudy'], 'nhiều mây'], [['Tomorrow', 'will be', 'cloudy.'], 'Ngày mai trời sẽ nhiều mây.'], [['Tomorrow,', 'Hà Nội', 'will be', 'cloudy', 'and eighteen degrees.'], 'Ngày mai, Hà Nội sẽ nhiều mây và mười tám độ.']], x: ['are', 'yesterday'] },
          cb: ['b', 'Oh no, Bin! You forgot the temperature on TV!', 'Ôi Bin ơi! Cháu quên đọc nhiệt độ trên TV rồi!', [
            ['calm', "No problem. I'll say it now: twenty degrees!", 'Không sao ạ. Cháu nói ngay đây: hai mươi độ!', 'Cool and calm! A real reporter!', 'Bình tĩnh quá! Đúng là phóng viên thật!', '🎙️'],
            ['ask', 'Can I start again from the beginning?', 'Cháu đọc lại từ đầu được không ạ?', 'Of course! Take two. Action!', 'Tất nhiên rồi! Quay lần hai. Bắt đầu!', '🎬']]],
          tb: ['b', 'Bin, what weather symbol should we put on Đà Nẵng?', 'Bin ơi, mình đặt biểu tượng thời tiết nào cho Đà Nẵng?', [
            ['idea', "Let's check the forecast app first.", 'Mình kiểm tra ứng dụng dự báo trước đã ạ.', 'Very professional! Real reporters check facts.', 'Rất chuyên nghiệp! Phóng viên thật luôn kiểm tra thông tin.', '📱'],
            ['yes', "A sun! It's sunny and thirty degrees there.", 'Mặt trời ạ! Ở đó nắng và ba mươi độ.', 'Perfect! Stick the sun on the map.', 'Hoàn hảo! Dán mặt trời lên bản đồ nào.', '☀️']]],
          fact: ['TV weather reporters often stand in front of a green screen, and the map is added by computer!', 'Phát thanh viên thời tiết thường đứng trước phông xanh, còn bản đồ được máy tính ghép vào!'],
          tf: [
            ['A thermometer tells us the temperature.', true, 'Yes! A thermometer measures how hot or cold it is.', 'Đúng! Nhiệt kế đo độ nóng hay lạnh.'],
            ['Thirty-five degrees is very cold weather.', false, 'No! Thirty-five degrees is very hot.', 'Sai! Ba mươi lăm độ là rất nóng.']
          ],
          qa: ["What's the weather forecast for tomorrow?", 'Dự báo thời tiết ngày mai thế nào?', "Tomorrow will be cloudy and twenty-two degrees.", ['cloudy|sunny|rainy|chilly|hot|cold|degrees|drizzle|storm|windy|warm|cool|rain']]
        },
        {
          title: 'Trip Check: North vs South', titleVi: 'Kiểm tra thời tiết trước chuyến đi', icon: '🧳',
          words: [
            ['rainy season', 'noun', '/ˈreɪni ˈsiːzn/', 'mùa mưa', '🌧️', 'In Sài Gòn, the rainy season starts in May.', 'Ở Sài Gòn, mùa mưa bắt đầu vào tháng Năm.', 'Months when it rains almost every afternoon in the South.'],
            ['dry season', 'noun', '/draɪ ˈsiːzn/', 'mùa khô', '🏜️', 'The dry season is sunny and hot.', 'Mùa khô trời nắng và nóng.', 'Months with lots of sun and very little rain.'],
            ['umbrella', 'noun', '/ʌmˈbrelə/', 'cái ô, cây dù', '☂️', 'Take an umbrella in the rainy season.', 'Mang theo ô vào mùa mưa nhé.', 'You open it over your head to stay dry.'],
            ['flood', 'noun', '/flʌd/', 'lũ lụt, ngập nước', '🌊', 'After the heavy rain, there was a flood on our street.', 'Sau trận mưa to, đường nhà mình bị ngập.', 'Too much water covers the streets and fields.'],
            ['check the weather', 'verb', '/tʃek ðə ˈweðə/', 'xem thời tiết', '📱', 'We check the weather before every trip.', 'Nhà mình xem thời tiết trước mỗi chuyến đi.', 'You look at an app or TV before you go out.']
          ],
          comic: {
            title: 'Hà Nội or Sài Gòn?', titleVi: 'Hà Nội hay Sài Gòn?',
            panels: [
              ['a', "We're flying to Sài Gòn in July! What should I pack?", 'Tháng Bảy nhà cháu bay vào Sài Gòn! Cháu nên mang gì ạ?', '✈️'],
              ['b', "Let's check the weather. July is the rainy season there.", 'Mình xem thời tiết nhé. Tháng Bảy ở đó là mùa mưa.', '📱'],
              ['a', "But Hà Nội is chilly in December. It's so different!", 'Nhưng Hà Nội tháng Mười Hai lại se lạnh. Khác nhau quá!', '🧣'],
              ['b', 'Yes! In Sài Gòn, take an umbrella every afternoon.', 'Đúng vậy! Ở Sài Gòn, chiều nào cũng mang ô nhé.', '☂️']
            ],
            blanks: [[1, 'rainy season', ['rainy season', 'rainy sausage', 'sunny Monday']], [3, 'umbrella', ['umbrella', 'ukulele', 'unicorn']]]
          },
          build: [
            { vi: 'Em muốn kể: Ở Sài Gòn, mùa mưa bắt đầu vào tháng Năm.', a: ['In Sài Gòn,', 'the rainy season', 'starts', 'in May.'], x: ['start', 'on Monday.'] },
            { vi: 'Em muốn khuyên: Chúng ta nên xem thời tiết trước chuyến đi.', a: ['We', 'should', 'check the weather', 'before the trip.'], x: ['checks', 'after the trip.'] }
          ],
          talk: [
            { q: 'Do you check the weather before you go out?', vi: 'Bạn có xem thời tiết trước khi ra ngoài không?', hint: 'Yes, I check it on my mum\'s phone.', k: ['yes|no|sometimes|always|usually|never|often', 'check|look|phone|tv|app|forecast'], c: ["Yes, I check it on my mum's phone.", 'Yes, I go out with my friends.', 'No, I go to school by bus.'] },
            { q: 'What do you take in the rainy season?', vi: 'Mùa mưa bạn mang theo gì?', hint: 'I take an umbrella and a raincoat.', k: ['umbrella|raincoat|boots|poncho|coat|jacket'], c: ['I take an umbrella and a raincoat.', 'I take sunglasses and sun cream.', 'I take my swimsuit.'] }
          ],
          snow: { vi: 'Kể về mùa mưa ở miền Nam', l: [[['an umbrella'], 'một cái ô'], [['We', 'need', 'an umbrella.'], 'Chúng ta cần một cái ô.'], [['In the rainy season,', 'we', 'need', 'an umbrella', 'every afternoon.'], 'Vào mùa mưa, chiều nào chúng ta cũng cần ô.']], x: ['needs', 'a snowball'] },
          cb: ['b', 'The forecast says a big flood is coming to our street tonight.', 'Dự báo nói tối nay đường mình sẽ bị ngập to.', [
            ['idea', "Let's move my LEGO box upstairs!", 'Mình mang hộp LEGO lên tầng trên thôi ạ!', 'Ha ha! Good thinking. Shoes and bags too!', 'Ha ha! Nghĩ hay đấy. Cả giày và cặp nữa nhé!', '📦'],
            ['ask', 'Should we tell Grandma next door?', 'Mình có nên báo bà hàng xóm không ạ?', 'Yes! What a kind boy. Let\'s go together.', 'Có chứ! Cháu thật tốt bụng. Mình cùng đi nhé.', '👵']]],
          tb: ['b', 'Bin, which city would you like to visit in December?', 'Bin ơi, tháng Mười Hai cháu muốn đi thành phố nào?', [
            ['yes', 'Sài Gòn! It is in the dry season and warm.', 'Sài Gòn ạ! Lúc đó là mùa khô và ấm áp.', 'Smart! Lots of sunshine for you.', 'Thông minh! Cháu sẽ có nhiều nắng.', '☀️'],
            ['idea', 'Hà Nội! I want to feel the chilly air and eat hot phở.', 'Hà Nội ạ! Cháu muốn cảm nhận gió lạnh và ăn phở nóng.', 'Yummy! Bring a warm jacket.', 'Ngon quá! Nhớ mang áo khoác ấm nhé.', '🍜']]],
          fact: ['North Vietnam has four seasons, but South Vietnam has just two: a rainy season and a dry season.', 'Miền Bắc Việt Nam có bốn mùa, còn miền Nam chỉ có hai mùa: mùa mưa và mùa khô.'],
          tf: [
            ['Sài Gòn has a rainy season and a dry season.', true, 'Yes! The South has two main seasons.', 'Đúng! Miền Nam có hai mùa chính.'],
            ['It often snows in Sài Gòn in December.', false, 'No! Sài Gòn is warm all year. It never snows there.', 'Sai! Sài Gòn ấm quanh năm. Ở đó không bao giờ có tuyết.']
          ],
          qa: ['What is the weather like in your city in winter?', 'Mùa đông ở thành phố bạn thời tiết thế nào?', 'It is chilly and there is a light drizzle.', ['chilly|cold|cool|warm|hot|drizzle|rainy|dry|humid|cloudy|sunny|windy']]
        }
      ],
      mystery: {
        t: 'The Perfect Picnic Day', tv: 'Ngày dã ngoại hoàn hảo',
        intro: ['Bin wants a picnic by Hoàn Kiếm Lake this week. Which day is best?', 'Bin muốn đi dã ngoại bên hồ Hoàn Kiếm tuần này. Ngày nào đẹp nhất?'],
        clues: [['Clue one: On Monday, there will be a thunderstorm. No picnics in a storm!', 'Manh mối 1: Thứ Hai sẽ có dông. Không dã ngoại khi trời dông!'],
          ['Clue two: On Tuesday, the temperature will be thirty-nine degrees. Much too hot!', 'Manh mối 2: Thứ Ba nhiệt độ lên tới ba mươi chín độ. Nóng quá!'],
          ['Clue three: It will drizzle all day on Wednesday, so the grass will be wet.', 'Manh mối 3: Thứ Tư mưa phùn cả ngày, nên cỏ sẽ bị ướt.']],
        q: ['Which day should Bin choose?', 'Bin nên chọn ngày nào?'],
        o: [['Monday', '⛈️', 'thứ Hai'], ['Tuesday', '🔥', 'thứ Ba'], ['Wednesday', '🌦️', 'thứ Tư'], ['Thursday', '⛅', 'thứ Năm']], a: 3,
        win: ['Thursday! Cool, dry and cloudy – perfect for sandwiches by the lake!', 'Thứ Năm! Mát mẻ, khô ráo, nhiều mây – tuyệt vời để ăn bánh mì bên hồ!']
      }
    },

    /* ---------- WEEK 18: Where Does Rain Come From? ---------- */
    {
      id: 'w18', week: 18, month: 5, monthTitle: M5[0], monthTitleVi: M5[1],
      name: 'Where Does Rain Come From?', vi: 'Mưa từ đâu mà có?', short: 'Water Cycle',
      topic: 'Science: Evaporation, Clouds, Rain, Ice & Rainbows', topicVi: 'Khoa học: bốc hơi, mây, mưa, băng & cầu vồng',
      color: '#06B6D4', dark: '#0E7490', icon: '💧', model: ['watercycle', 'Water Cycle Machine', 'Cỗ máy Vòng tuần hoàn nước'],
      chars: { a: { name: 'Na', fig: 'hair-blonde|surprised|torso-stars|legs-green|magnifier' }, b: { name: 'Drip', fig: 'helmet-astro|wink|torso-blue|legs-blue|none' } },
      chatter: [
        ["Hi! I'm Drip, a tiny water drop!", 'Xin chào! Mình là Giọt, một giọt nước bé xíu!'],
        ['The sun warms me and I evaporate!', 'Mặt trời sưởi ấm mình và mình bốc hơi!'],
        ['Up, up, up into the clouds!', 'Bay lên, lên, lên tận những đám mây!'],
        ['I wonder why the sky has a rainbow.', 'Mình tự hỏi vì sao bầu trời có cầu vồng.'],
        ["Let's find out with an experiment!", 'Cùng tìm hiểu bằng một thí nghiệm nào!']
      ],
      lessons: [
        {
          title: "Drip's Big Adventure", titleVi: 'Chuyến phiêu lưu của Giọt Nước', icon: '💧',
          words: [
            ['evaporate', 'verb', '/ɪˈvæpəreɪt/', 'bốc hơi', '♨️', 'Puddles evaporate in the hot sun.', 'Vũng nước bốc hơi dưới nắng nóng.', 'Water gets warm and turns into an invisible gas.'],
            ['water vapour', 'noun', '/ˈwɔːtə ˈveɪpə/', 'hơi nước', '🌫️', 'Water vapour floats up into the sky.', 'Hơi nước bay lên bầu trời.', 'Water as a gas. You cannot see it in the air.'],
            ['condense', 'verb', '/kənˈdens/', 'ngưng tụ', '🫧', 'Water vapour cools and condenses into tiny drops.', 'Hơi nước nguội đi và ngưng tụ thành những giọt nhỏ.', 'A gas gets cold and turns back into little drops of water.'],
            ['raindrop', 'noun', '/ˈreɪndrɒp/', 'giọt mưa', '🌧️', 'A raindrop fell on my nose!', 'Một giọt mưa rơi trúng mũi mình!', 'A small drop of water that falls from a cloud.'],
            ['the water cycle', 'noun', '/ðə ˈwɔːtə ˈsaɪkl/', 'vòng tuần hoàn nước', '🔄', 'The water cycle never stops.', 'Vòng tuần hoàn nước không bao giờ dừng lại.', 'Water goes up to the sky, falls down, and goes up again and again.']
          ],
          comic: {
            title: 'Up, Up and Away!', titleVi: 'Bay lên, bay lên nào!',
            panels: [
              ['b', 'Hi Na! I live in the Mekong River. Now the sun is hot!', 'Chào Na! Mình sống ở sông Mê Kông. Giờ mặt trời nóng quá!', '☀️'],
              ['b', 'Whoosh! I evaporate. Now I am water vapour!', 'Vù! Mình bốc hơi. Giờ mình là hơi nước!', '🌫️'],
              ['a', 'Where are you going, Drip?', 'Giọt ơi, bạn đi đâu thế?', '❓'],
              ['b', 'Up high! It is cold, so I condense into a cloud.', 'Lên cao! Trên đó lạnh, nên mình ngưng tụ thành mây.', '☁️']
            ],
            blanks: [[1, 'evaporate', ['evaporate', 'elephant', 'eat a plate']], [3, 'condense', ['condense', 'candy dance', 'count ten']]]
          },
          build: [
            { vi: 'Em muốn giải thích: Hơi nước bay lên bầu trời.', a: ['Water vapour', 'floats', 'up', 'into the sky.'], x: ['float', 'into the sea.'] },
            { vi: 'Em muốn giải thích: Vũng nước bốc hơi dưới nắng nóng.', a: ['Puddles', 'evaporate', 'in the hot sun.'], x: ['evaporates', 'in the freezer.'] }
          ],
          talk: [
            { q: 'Where does rain come from?', vi: 'Mưa đến từ đâu?', hint: 'Rain comes from the clouds.', k: ['cloud|clouds|sky'], c: ['Rain comes from the clouds.', 'Rain goes into the rivers.', 'Rain falls in the rainy season.'] },
            { q: 'What happens to a puddle on a sunny day?', vi: 'Vũng nước sẽ ra sao vào ngày nắng?', hint: 'It evaporates and disappears.', k: ['evaporate|evaporates|disappear|disappears|dry|dries|gone|vapour|vapor|steam'], c: ['It evaporates and disappears.', 'It gets bigger and deeper.', 'It turns into ice.'] }
          ],
          snow: { vi: 'Kể chuyến phiêu lưu của Giọt Nước', l: [[['evaporates'], 'bốc hơi'], [['Drip', 'evaporates', 'in the sun.'], 'Giọt bốc hơi dưới nắng.'], [['First,', 'Drip', 'evaporates', 'from the river', 'and floats up to the sky.'], 'Đầu tiên, Giọt bốc hơi từ dòng sông và bay lên bầu trời.']], x: ['evaporate', 'down to the ground.'] },
          cb: ['b', 'Na, I am so heavy now! Too many drops in this cloud!', 'Na ơi, mình nặng quá rồi! Đám mây này nhiều giọt quá!', [
            ['idea', 'Then fall down as a raindrop!', 'Vậy thì rơi xuống thành giọt mưa đi!', 'Wheee! Here I come, rice fields!', 'Uiii! Ruộng lúa ơi, mình đến đây!', '🌾'],
            ['ask', 'Will you come back to the river?', 'Bạn có quay lại dòng sông không?', 'Yes! That is the water cycle. Round and round!', 'Có chứ! Đó là vòng tuần hoàn nước. Cứ quay vòng mãi!', '🔄']]],
          tb: ['b', 'Na, I wonder... how old am I?', 'Na ơi, mình tự hỏi... mình bao nhiêu tuổi nhỉ?', [
            ['ask', 'Are you older than my grandpa?', 'Bạn già hơn ông mình à?', 'Much older! Earth water is billions of years old!', 'Già hơn nhiều! Nước trên Trái Đất có từ hàng tỉ năm trước!', '🦕'],
            ['idea', 'Maybe a dinosaur drank you!', 'Có khi một con khủng long đã uống bạn rồi!', 'Ha ha! Maybe! Water goes round and round for ever.', 'Ha ha! Có thể lắm! Nước cứ tuần hoàn mãi mãi.', '🦖']]],
          fact: ['The water you drink today may once have been drunk by a dinosaur!', 'Nước con uống hôm nay có thể đã từng được một con khủng long uống đấy!'],
          tf: [
            ['Water evaporates faster on a hot, sunny day.', true, 'Yes! Heat makes water evaporate quickly.', 'Đúng! Hơi nóng làm nước bốc hơi nhanh.'],
            ['Clouds are made of cotton.', false, 'No! Clouds are made of tiny drops of water or ice.', 'Sai! Mây được tạo từ những giọt nước hoặc tinh thể băng nhỏ li ti.']
          ],
          qa: ['Where do you see water evaporate at home?', 'Ở nhà bạn thấy nước bốc hơi ở đâu?', 'I see it when my mum boils water in the kettle.', ['boil|boils|cook|cooks|dry|dries|steam|hot', 'kettle|pot|soup|rice|clothes|floor|water|puddle|tea']]
        },
        {
          title: 'Kitchen Cloud Experiment', titleVi: 'Thí nghiệm làm mây trong bếp', icon: '🧪',
          words: [
            ['kettle', 'noun', '/ˈketl/', 'ấm đun nước', '🫖', 'Mum boils water in the kettle.', 'Mẹ đun nước bằng ấm.', 'You use it in the kitchen to make water hot for tea.'],
            ['steam', 'noun', '/stiːm/', 'hơi nước nóng (khói trắng)', '♨️', 'White steam comes out of the hot soup.', 'Hơi nóng trắng bốc lên từ bát canh nóng.', 'The white cloud above a pot of boiling water.'],
            ['heat up', 'verb', '/hiːt ʌp/', 'làm nóng, đun nóng', '🔥', 'We heat up the water on the stove.', 'Chúng mình đun nóng nước trên bếp.', 'You make something warmer or hotter.'],
            ['cool down', 'verb', '/kuːl daʊn/', 'nguội đi, làm mát', '❄️', 'The plate cools down in the fridge.', 'Cái đĩa được làm lạnh trong tủ lạnh.', 'Something gets less hot.'],
            ["Let's find out!", 'phrase', '/lets faɪnd aʊt/', 'Cùng tìm hiểu nào!', '🔍', "Why does it rain? Let's find out!", 'Vì sao trời mưa? Cùng tìm hiểu nào!', 'Scientists say this before they test an idea.']
          ],
          comic: {
            title: 'Rain on a Plate', titleVi: 'Mưa trên chiếc đĩa',
            panels: [
              ['a', "Can we make rain at home? Let's find out!", 'Mình có thể tạo mưa ở nhà không? Cùng tìm hiểu nào!', '🔍'],
              ['b', 'Ask Mum to heat up water in the kettle. Look at the steam!', 'Nhờ mẹ đun nước trong ấm. Nhìn hơi nóng kìa!', '🫖'],
              ['b', 'Mum holds a cold plate above the steam. Do not touch!', 'Mẹ cầm đĩa lạnh phía trên hơi nóng. Đừng chạm vào nhé!', '🍽️'],
              ['a', 'Wow! Drops are falling from the plate. It\'s raining!', 'Oa! Những giọt nước rơi từ đĩa xuống. Mưa rồi!', '💧']
            ],
            blanks: [[1, 'kettle', ['kettle', 'kitten', 'kite']], [1, 'steam', ['steam', 'stone', 'storm']]]
          },
          build: [
            { vi: 'Em muốn kể: Mẹ đun nước bằng ấm.', a: ['Mum', 'heats up', 'water', 'in the kettle.'], x: ['heat up', 'in the fridge.'] },
            { vi: 'Em muốn giải thích: Hơi nước ngưng tụ trên chiếc đĩa lạnh.', a: ['The steam', 'condenses', 'on the cold plate.'], x: ['condense', 'on the hot sun.'] }
          ],
          talk: [
            { q: 'What do you see above a hot bowl of phở?', vi: 'Bạn thấy gì phía trên bát phở nóng?', hint: 'I see white steam.', k: ['steam|vapour|vapor|smoke'], c: ['I see white steam.', 'I see noodles and beef.', 'I see ice cubes.'] },
            { q: 'Who helps you with experiments at home?', vi: 'Ở nhà ai giúp bạn làm thí nghiệm?', hint: 'My mum helps me.', k: ['mum|mom|dad|grandpa|grandma|sister|brother|nobody|myself|teacher|father|mother|aunt|uncle'], c: ['My mum helps me.', 'I do experiments in the kitchen.', 'We use water and a kettle.'] }
          ],
          snow: { vi: 'Kể lại các bước thí nghiệm', l: [[['the kettle'], 'cái ấm'], [['Mum', 'heats up', 'the kettle.'], 'Mẹ đun nóng ấm nước.'], [['First,', 'Mum', 'heats up', 'the kettle.', 'Next, steam rises.', 'Finally, drops fall from the plate.'], 'Đầu tiên, mẹ đun ấm. Tiếp theo, hơi nóng bốc lên. Cuối cùng, giọt nước rơi từ đĩa.']], x: ['heat up', 'Yesterday,'] },
          cb: ['b', 'Na, the kettle is very hot. What should you do?', 'Na ơi, ấm nước rất nóng. Bạn nên làm gì?', [
            ['calm', "I'll ask a grown-up to hold it.", 'Mình sẽ nhờ người lớn cầm ạ.', 'Safe scientist! Steam can burn your hands.', 'Nhà khoa học cẩn thận! Hơi nóng có thể làm bỏng tay.', '🧑‍🔬'],
            ['idea', "I'll watch from far away and take notes.", 'Mình sẽ đứng xa quan sát và ghi chép.', 'Perfect! Good scientists always write things down.', 'Tuyệt! Nhà khoa học giỏi luôn ghi chép lại.', '📝']]],
          tb: ['b', 'Why did the drops fall from the plate, Na?', 'Vì sao giọt nước rơi từ cái đĩa xuống, Na?', [
            ['yes', 'Because the steam cooled down and condensed!', 'Vì hơi nước nguội đi và ngưng tụ!', 'Bingo! Just like a real cloud!', 'Chuẩn luôn! Giống hệt đám mây thật!', '☁️'],
            ['ask', "I'm not sure. Can you give me a hint?", 'Mình chưa chắc. Bạn gợi ý được không?', 'Hint: the plate was cold and the steam was hot!', 'Gợi ý: cái đĩa thì lạnh còn hơi nước thì nóng!', '💡']]],
          fact: ['Real water vapour is invisible. The white steam you see is lots of tiny water drops!', 'Hơi nước thật thì vô hình. Làn khói trắng con nhìn thấy là vô số giọt nước li ti đấy!'],
          tf: [
            ['Steam turns into water drops on a cold plate.', true, 'Yes! The cold makes the steam condense.', 'Đúng! Hơi lạnh làm hơi nước ngưng tụ.'],
            ['Children should hold a boiling kettle by themselves.', false, 'No! A boiling kettle is dangerous. Ask a grown-up.', 'Sai! Ấm nước sôi rất nguy hiểm. Hãy nhờ người lớn.']
          ],
          qa: ['What experiment would you like to try?', 'Bạn muốn thử thí nghiệm nào?', 'I would like to make rain on a plate.', ['rain|cloud|ice|rainbow|plate|steam|volcano|experiment|water|magnet|egg']]
        },
        {
          title: 'Ice, Snow & Rainbows', titleVi: 'Băng, tuyết & cầu vồng', icon: '🌈',
          words: [
            ['melt', 'verb', '/melt/', 'tan chảy', '🫠', 'Ice cream melts quickly in the sun.', 'Kem tan rất nhanh dưới nắng.', 'Ice becomes water when it gets warm.'],
            ['freeze', 'verb', '/friːz/', 'đóng băng', '🧊', 'Water freezes at zero degrees.', 'Nước đóng băng ở không độ.', 'Water gets very cold and becomes hard ice.'],
            ['ice cube', 'noun', '/aɪs kjuːb/', 'viên đá lạnh', '🧊', 'I put an ice cube in my lemon tea.', 'Mình bỏ một viên đá vào trà chanh.', 'A small square of frozen water for cold drinks.'],
            ['snowflake', 'noun', '/ˈsnəʊfleɪk/', 'bông tuyết', '❄️', 'Every snowflake has six sides.', 'Mỗi bông tuyết đều có sáu cánh.', 'A tiny white ice star that falls from the sky in winter.'],
            ['rainbow', 'noun', '/ˈreɪnbəʊ/', 'cầu vồng', '🌈', 'After the rain, we saw a rainbow over the river.', 'Sau cơn mưa, chúng mình thấy cầu vồng trên sông.', 'A colourful arch in the sky when sunlight shines through rain.']
          ],
          comic: {
            title: 'Drip Turns to Ice', titleVi: 'Giọt Nước hóa băng',
            panels: [
              ['b', 'Brrr! Na, I am in the freezer. I freeze into an ice cube!', 'Brrr! Na ơi, mình ở trong ngăn đá. Mình đóng băng thành viên đá rồi!', '🧊'],
              ['a', "Oh! Let's put you in the sun.", 'Ôi! Để mình đặt bạn ra nắng nhé.', '☀️'],
              ['b', 'Ahh, warm! I melt and become water again!', 'Ahh, ấm quá! Mình tan chảy và lại thành nước!', '💧'],
              ['a', 'Look! The sun and the rain made a rainbow!', 'Nhìn kìa! Mặt trời và mưa tạo ra cầu vồng!', '🌈']
            ],
            blanks: [[0, 'freeze', ['freeze', 'fries', 'free']], [2, 'melt', ['melt', 'milk', 'meet']]]
          },
          build: [
            { vi: 'Em muốn giải thích: Nước đóng băng ở không độ.', a: ['Water', 'freezes', 'at zero degrees.'], x: ['freeze', 'at ninety degrees.'] },
            { vi: 'Em muốn kể: Chúng mình thấy cầu vồng sau cơn mưa.', a: ['We', 'saw', 'a rainbow', 'after the rain.'], x: ['see', 'a snowman'] }
          ],
          talk: [
            { q: 'Have you ever seen a rainbow?', vi: 'Bạn đã bao giờ thấy cầu vồng chưa?', hint: 'Yes, I saw one after the rain.', k: ['yes|no|never|sometimes|once', 'saw|seen|see|rain|sky|rainbow'], c: ['Yes, I saw one after the rain.', 'Yes, I like the colour red.', 'No, it is sunny today.'] },
            { q: 'What happens to an ice cube in a hot drink?', vi: 'Viên đá sẽ ra sao trong đồ uống nóng?', hint: 'It melts very quickly.', k: ['melt|melts|melting|water'], c: ['It melts very quickly.', 'It gets bigger and harder.', 'It sinks to the bottom.'] }
          ],
          snow: { vi: 'Giải thích băng tan', l: [[['melts'], 'tan chảy'], [['The ice', 'melts', 'quickly.'], 'Băng tan nhanh.'], [['In the hot sun,', 'the ice cube', 'melts', 'quickly', 'into water.'], 'Dưới nắng nóng, viên đá tan nhanh thành nước.']], x: ['melt', 'freezes'] },
          cb: ['b', 'Na, your ice lolly is melting! What will you do?', 'Na ơi, que kem của bạn đang chảy kìa! Bạn sẽ làm gì?', [
            ['yes', 'Eat it fast! Yum!', 'Ăn nhanh thôi! Ngon quá!', 'Ha ha! Science is delicious!', 'Ha ha! Khoa học ngon thật đấy!', '🍦'],
            ['idea', "I'll put it back in the freezer.", 'Mình sẽ cất lại vào ngăn đá.', 'Clever! It will freeze again.', 'Thông minh! Nó sẽ đóng băng lại.', '🧊']]],
          tb: ['b', 'How can we make a rainbow at home?', 'Làm sao để tạo cầu vồng ở nhà?', [
            ['idea', "Spray water in the sunshine with the sun behind us!", 'Xịt nước dưới nắng, quay lưng về phía mặt trời!', 'Yes! Tiny drops split the sunlight into colours.', 'Đúng! Các giọt nhỏ tách ánh nắng thành nhiều màu.', '🌈'],
            ['ask', 'Can we use a glass of water and a torch?', 'Mình dùng cốc nước và đèn pin được không?', "Great idea! Let's find out together.", 'Ý hay! Cùng nhau tìm hiểu nào.', '🔦']]],
          fact: ['Water gets bigger when it freezes, so a full glass bottle can crack in the freezer!', 'Nước nở ra khi đóng băng, nên chai thủy tinh đầy nước có thể nứt trong ngăn đá!'],
          tf: [
            ['A rainbow has seven colours.', true, 'Yes! Red, orange, yellow, green, blue, indigo and violet.', 'Đúng! Đỏ, cam, vàng, lục, lam, chàm, tím.'],
            ['Ice melts when it gets colder.', false, 'No! Ice melts when it gets warmer.', 'Sai! Băng tan khi trời ấm lên.']
          ],
          qa: ['What do you put in the freezer at home?', 'Ở nhà bạn để gì trong ngăn đá?', 'We put ice cubes and ice cream in the freezer.', ['ice|cream|meat|fish|lolly|water|chicken|cube|cubes|peas|vegetables']]
        }
      ],
      mystery: {
        t: 'Where Is Drip Now?', tv: 'Giọt Nước đang ở đâu?',
        intro: ['Drip has changed again! Na must find out what Drip is now.', 'Giọt Nước lại biến hình rồi! Na phải tìm xem bây giờ Giọt là gì.'],
        clues: [['Clue one: Drip is not in the sea or in a puddle.', 'Manh mối 1: Giọt không ở dưới biển, cũng không ở trong vũng nước.'],
          ['Clue two: Drip is not hard or cold.', 'Manh mối 2: Giọt không cứng và cũng không lạnh.'],
          ['Clue three: The sun heated Drip. Now Drip is invisible and floating up!', 'Manh mối 3: Mặt trời làm nóng Giọt. Giờ Giọt vô hình và đang bay lên!']],
        q: ['What is Drip now?', 'Bây giờ Giọt là gì?'],
        o: [['water in the sea', '🌊', 'nước biển'], ['a puddle', '🟦', 'vũng nước'], ['an ice cube', '🧊', 'viên đá'], ['water vapour', '🌫️', 'hơi nước']], a: 3,
        win: ['Drip evaporated into water vapour! Next stop: a cloud!', 'Giọt đã bốc hơi thành hơi nước! Trạm tiếp theo: đám mây!']
      }
    },

    /* ---------- WEEK 19: Clothes for Every Season ---------- */
    {
      id: 'w19', week: 19, month: 5, monthTitle: M5[0], monthTitleVi: M5[1],
      name: 'Clothes for Every Season', vi: 'Trang phục cho mọi mùa', short: 'Season Clothes',
      topic: 'Dressing for the Weather, Packing & Shopping', topicVi: 'Mặc hợp thời tiết, xếp vali & đi mua sắm',
      color: '#EC4899', dark: '#BE185D', icon: '🧣', model: ['boutique', 'LEGO Fashion Boutique', 'Cửa hàng thời trang LEGO'],
      chars: { a: { name: 'Su', fig: 'cat-ears|grin|torso-red|legs-tan|none' }, b: { name: 'Aunt Thu', fig: 'hair-brown|smile|torso-stars|legs-black|camera' } },
      chatter: [
        ['Welcome to my boutique! Can I help you?', 'Chào mừng đến cửa hàng của cô! Cô giúp gì được cháu?'],
        ["It's chilly in Sa Pa. Bring a scarf!", 'Sa Pa se lạnh lắm. Mang khăn quàng nhé!'],
        ['Phú Quốc is sunny. Pack your sandals!', 'Phú Quốc nắng lắm. Xếp dép xăng-đan vào nhé!'],
        ['Can I try on these boots?', 'Cháu thử đôi bốt này được không ạ?'],
        ['Hooray! It fits perfectly!', 'Hoan hô! Vừa khít luôn!']
      ],
      lessons: [
        {
          title: 'Dress for the Weather', titleVi: 'Mặc đồ hợp thời tiết', icon: '🧤',
          words: [
            ['scarf', 'noun', '/skɑːf/', 'khăn quàng cổ', '🧣', 'Grandma knitted a red scarf for me.', 'Bà đan cho mình một chiếc khăn quàng đỏ.', 'You wrap it around your neck to keep warm.'],
            ['gloves', 'noun', '/ɡlʌvz/', 'găng tay', '🧤', 'I wear gloves on my motorbike rides in winter.', 'Mùa đông mình đeo găng tay khi đi xe máy.', 'You wear them on your hands. Each finger has its own little house.'],
            ['sun hat', 'noun', '/sʌn hæt/', 'mũ chống nắng', '👒', 'Wear a sun hat on the beach.', 'Đội mũ chống nắng khi ra biển nhé.', 'It has a wide brim to keep the sun off your face.'],
            ['boots', 'noun', '/buːts/', 'giày bốt, ủng', '👢', 'I wear rain boots to jump in puddles.', 'Mình đi ủng để nhảy vào vũng nước.', 'Tall shoes that cover your feet and ankles.'],
            ['wear layers', 'verb', '/weə ˈleɪəz/', 'mặc nhiều lớp', '🧅', 'In Hà Nội winter, I wear layers.', 'Mùa đông Hà Nội, mình mặc nhiều lớp áo.', 'You put on a T-shirt, then a jumper, then a coat – like an onion!']
          ],
          comic: {
            title: 'The Onion Girl', titleVi: 'Cô bé củ hành',
            panels: [
              ['a', "Aunt Thu, it's so chilly! I'm wearing one big coat.", 'Cô Thu ơi, lạnh quá! Cháu mặc một áo khoác to.', '🥶'],
              ['b', 'Try to wear layers, like an onion. Shirt, jumper, then coat!', 'Thử mặc nhiều lớp như củ hành xem. Áo phông, áo len, rồi áo khoác!', '🧅'],
              ['a', 'And a scarf and gloves too?', 'Thêm khăn quàng và găng tay nữa ạ?', '🧣'],
              ['b', 'Yes! At noon, if you are hot, just take off one layer.', 'Đúng rồi! Buổi trưa nóng thì cởi bớt một lớp thôi.', '☀️']
            ],
            blanks: [[1, 'wear layers', ['wear layers', 'eat layers', 'wear lemons']], [2, 'gloves', ['gloves', 'grapes', 'goats']]]
          },
          build: [
            { vi: 'Em muốn kể: Mùa đông mình quàng khăn và đeo găng tay.', a: ['In winter,', 'I', 'wear', 'a scarf and gloves.'], x: ['wears', 'a swimsuit'] },
            { vi: 'Em muốn khuyên: Bạn nên đội mũ chống nắng ở bãi biển.', a: ['You', 'should', 'wear', 'a sun hat', 'on the beach.'], x: ['wearing', 'in the snow.'] }
          ],
          talk: [
            { q: 'What do you wear on a chilly morning?', vi: 'Bạn mặc gì vào buổi sáng se lạnh?', hint: 'I wear a jumper and a scarf.', k: ['jumper|sweater|scarf|gloves|coat|jacket|boots|hoodie|socks|hat|layers|cardigan'], c: ['I wear a jumper and a scarf.', 'I wear a T-shirt and shorts.', 'I wear a swimsuit and sandals.'] },
            { q: 'Do you have rain boots?', vi: 'Bạn có ủng đi mưa không?', hint: 'Yes, I have yellow rain boots.', k: ['yes|no', 'boots|wellies|wellingtons'], c: ['Yes, I have yellow rain boots.', 'Yes, I have a yellow raincoat.', 'No, I have a blue umbrella.'] }
          ],
          snow: { vi: 'Nói về cách mặc mùa đông', l: [[['layers'], 'nhiều lớp'], [['I', 'wear', 'layers.'], 'Mình mặc nhiều lớp.'], [['On chilly mornings,', 'I', 'wear', 'layers', 'and a warm scarf.'], 'Vào những sáng se lạnh, mình mặc nhiều lớp và quàng khăn ấm.']], x: ['wears', 'a sun hat'] },
          cb: ['b', 'Su, it is thirty-five degrees today. Why are you wearing gloves?', 'Su ơi, hôm nay ba mươi lăm độ. Sao cháu lại đeo găng tay?', [
            ['yes', "Oops! You're right. I'll take them off.", 'Ối! Cô nói đúng. Cháu tháo ra đây ạ.', 'Good! Wear a sun hat instead.', 'Tốt! Đội mũ chống nắng thay vào nhé.', '👒'],
            ['idea', "They're for the motorbike! The sun burns my hands.", 'Để đi xe máy ạ! Nắng làm cháy tay cháu.', 'Ah, smart! Thin gloves protect your skin.', 'À, thông minh! Găng mỏng bảo vệ da cháu.', '🛵']]],
          tb: ['b', 'Your friend is shivering in the cold wind. What do you do?', 'Bạn của cháu đang run vì gió lạnh. Cháu làm gì?', [
            ['yes', 'I lend her my scarf.', 'Cháu cho bạn mượn khăn quàng.', 'So kind! Now you are both warm.', 'Tốt bụng quá! Giờ cả hai đều ấm áp.', '💗'],
            ['idea', "Let's go inside and have hot soy milk!", 'Mình vào trong nhà uống sữa đậu nành nóng đi!', 'Yummy and warm! Great idea.', 'Vừa ngon vừa ấm! Ý hay đấy.', '🥛']]],
          fact: ['Wearing layers keeps you warmer, because warm air gets trapped between the clothes.', 'Mặc nhiều lớp giúp con ấm hơn, vì không khí ấm bị giữ lại giữa các lớp áo.'],
          tf: [
            ['A scarf keeps your neck warm.', true, 'Yes! You wrap a scarf around your neck.', 'Đúng! Khăn quàng giữ ấm cổ.'],
            ['You wear gloves on your feet.', false, 'No! Gloves are for your hands. Socks are for your feet.', 'Sai! Găng tay để đeo ở tay. Tất mới để đi ở chân.']
          ],
          qa: ['What do you wear on a hot sunny day?', 'Bạn mặc gì vào ngày nắng nóng?', 'I wear a T-shirt, shorts and a sun hat.', ['shirt|t-shirt|shorts|hat|sandals|dress|cap|sunglasses|skirt']]
        },
        {
          title: 'Pack for Sa Pa or Phú Quốc?', titleVi: 'Xếp vali đi Sa Pa hay Phú Quốc?', icon: '🧳',
          words: [
            ['jacket', 'noun', '/ˈdʒækɪt/', 'áo khoác', '🧥', 'I need a warm jacket in Sa Pa.', 'Mình cần một chiếc áo khoác ấm ở Sa Pa.', 'You wear it over your clothes when it is cool or windy.'],
            ['hoodie', 'noun', '/ˈhʊdi/', 'áo nỉ có mũ', '🧑‍💻', 'My blue hoodie is soft and warm.', 'Áo nỉ có mũ màu xanh của mình mềm và ấm.', 'A soft top with a hood for your head.'],
            ['sandals', 'noun', '/ˈsændlz/', 'dép xăng-đan', '🩴', 'I walk on the beach in my sandals.', 'Mình đi dép xăng-đan trên bãi biển.', 'Open shoes for hot days. Your toes can see the sun!'],
            ['swimsuit', 'noun', '/ˈswɪmsuːt/', 'đồ bơi', '🩱', "Don't forget your swimsuit for Phú Quốc!", 'Đừng quên đồ bơi khi đi Phú Quốc nhé!', 'You wear it in the sea or the swimming pool.'],
            ['sun cream', 'noun', '/sʌn kriːm/', 'kem chống nắng', '🧴', 'Put on sun cream before you swim.', 'Bôi kem chống nắng trước khi bơi nhé.', 'You put it on your skin so the sun does not burn you.']
          ],
          comic: {
            title: 'The Mixed-Up Suitcase', titleVi: 'Chiếc vali lộn xộn',
            panels: [
              ['b', 'Su, we are going to Sa Pa. It is ten degrees there!', 'Su ơi, mình đi Sa Pa. Ở đó chỉ mười độ thôi!', '🏔️'],
              ['a', 'I packed my swimsuit and sandals!', 'Cháu xếp đồ bơi và dép xăng-đan rồi ạ!', '🩱'],
              ['b', 'Ha ha! Those are for Phú Quốc. You need a jacket and a hoodie.', 'Ha ha! Mấy thứ đó để đi Phú Quốc. Cháu cần áo khoác và áo nỉ.', '🧥'],
              ['a', "Oops! Let's swap. Phú Quốc can wait!", 'Ối! Đổi đồ thôi. Phú Quốc đợi lần sau!', '😅']
            ],
            blanks: [[1, 'swimsuit', ['swimsuit', 'sweet corn', 'snowman']], [2, 'jacket', ['jacket', 'jelly', 'jungle']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình cần một chiếc áo khoác ấm ở Sa Pa.', a: ['I', 'need', 'a warm jacket', 'in Sa Pa.'], x: ['needs', 'a swimsuit'] },
            { vi: 'Em muốn nhắc: Hãy bôi kem chống nắng trước khi bơi.', a: ['Put on', 'sun cream', 'before you swim.'], x: ['Puts on', 'after you sleep.'] }
          ],
          talk: [
            { q: 'What would you pack for a beach trip?', vi: 'Bạn sẽ xếp gì cho chuyến đi biển?', hint: 'I would pack a swimsuit and sun cream.', k: ['swimsuit|sun|cream|sandals|hat|towel|sunglasses|shorts|ball|suncream|goggles'], c: ['I would pack a swimsuit and sun cream.', 'I would pack a scarf and gloves.', 'I would pack a warm jacket.'] },
            { q: 'Have you ever been to a cold place?', vi: 'Bạn đã từng đến nơi lạnh chưa?', hint: 'Yes, I went to Sa Pa last winter.', k: ['yes|no|never', 'sa pa|sapa|dalat|da lat|ha noi|hanoi|mountain|mountains|cold|winter|japan|korea|snow'], c: ['Yes, I went to Sa Pa last winter.', 'Yes, I went to the beach last summer.', 'No, I like hot weather.'] }
          ],
          snow: { vi: 'Kể về chuyến đi Phú Quốc', l: [[['sandals'], 'dép xăng-đan'], [['I', 'pack', 'sandals.'], 'Mình xếp dép xăng-đan.'], [['For Phú Quốc,', 'I', 'pack', 'sandals,', 'a swimsuit and sun cream.'], 'Đi Phú Quốc, mình xếp dép, đồ bơi và kem chống nắng.']], x: ['packs', 'gloves'] },
          cb: ['b', 'Su, the suitcase is too full. It will not close!', 'Su ơi, vali đầy quá. Không đóng được!', [
            ['idea', 'I can wear my hoodie on the plane!', 'Cháu mặc áo nỉ lên máy bay luôn ạ!', 'Clever! Now there is more space.', 'Thông minh! Giờ có thêm chỗ rồi.', '✈️'],
            ['calm', "Let's take out some toys. I only need two.", 'Mình bỏ bớt đồ chơi ra ạ. Cháu chỉ cần hai món.', 'Good choice! Clothes first, toys second.', 'Lựa chọn đúng! Quần áo trước, đồ chơi sau.', '🧸']]],
          tb: ['b', 'Which trip do you want: Sa Pa mountains or Phú Quốc beach?', 'Cháu muốn đi đâu: núi Sa Pa hay biển Phú Quốc?', [
            ['yes', 'Phú Quốc! I want to swim and build sandcastles.', 'Phú Quốc ạ! Cháu muốn bơi và xây lâu đài cát.', "Don't forget your sun cream!", 'Đừng quên kem chống nắng nhé!', '🏖️'],
            ['idea', 'Sa Pa! Maybe I can see frost on the grass.', 'Sa Pa ạ! Biết đâu cháu thấy sương muối trên cỏ.', 'Pack your warmest jacket then!', 'Vậy thì mang áo khoác ấm nhất nhé!', '🏔️']]],
          fact: ['It sometimes snows in Sa Pa in winter, while Phú Quốc stays warm all year!', 'Sa Pa đôi khi có tuyết vào mùa đông, trong khi Phú Quốc ấm áp quanh năm!'],
          tf: [
            ['You should put on sun cream at the beach.', true, 'Yes! Sun cream protects your skin from sunburn.', 'Đúng! Kem chống nắng bảo vệ da khỏi cháy nắng.'],
            ['A swimsuit is the best clothes for a cold mountain.', false, 'No! On a cold mountain, you need a jacket and a hoodie.', 'Sai! Trên núi lạnh, con cần áo khoác và áo nỉ.']
          ],
          qa: ['Where would you like to go on holiday, and what would you pack?', 'Bạn muốn đi nghỉ ở đâu và sẽ xếp gì?', 'I would like to go to Phú Quốc. I would pack my swimsuit.', ['go|visit|travel', 'pack|take|bring']]
        },
        {
          title: 'Shopping at the LEGO Boutique', titleVi: 'Mua sắm ở cửa hàng LEGO', icon: '🛍️',
          words: [
            ['try on', 'verb', '/traɪ ɒn/', 'mặc thử, đi thử', '👗', 'Can I try on this jacket, please?', 'Cho cháu mặc thử chiếc áo này được không ạ?', 'You put on clothes in a shop to see if they are good for you.'],
            ['changing room', 'noun', '/ˈtʃeɪndʒɪŋ ruːm/', 'phòng thử đồ', '🚪', 'The changing room is next to the mirror.', 'Phòng thử đồ ở cạnh tấm gương.', 'A small room in a clothes shop with a curtain and a mirror.'],
            ['too big', 'adj', '/tuː bɪɡ/', 'rộng quá, to quá', '🐘', 'These boots are too big for me.', 'Đôi bốt này to quá so với mình.', 'Your feet slide around and the clothes fall down.'],
            ['too small', 'adj', '/tuː smɔːl/', 'chật quá, nhỏ quá', '🐭', 'This hoodie is too small. I can\'t move my arms!', 'Áo nỉ này chật quá. Mình không cử động tay được!', 'It is tight and you can hardly put it on.'],
            ['It fits perfectly!', 'phrase', '/ɪt fɪts ˈpɜːfɪktli/', 'Vừa khít luôn!', '✅', 'Look, Mum! It fits perfectly!', 'Mẹ nhìn này! Vừa khít luôn!', 'You say this when clothes are just the right size.']
          ],
          comic: {
            title: 'Goldilocks and the Three Jackets', titleVi: 'Cô bé tóc vàng và ba chiếc áo khoác',
            panels: [
              ['a', 'Excuse me, can I try on this red jacket?', 'Cô ơi, cháu mặc thử chiếc áo khoác đỏ này được không ạ?', '🧥'],
              ['b', 'Sure! The changing room is over there.', 'Được chứ! Phòng thử đồ ở đằng kia.', '🚪'],
              ['a', 'Hmm. This one is too big, and that one is too small.', 'Ừm. Cái này rộng quá, còn cái kia chật quá.', '🤔'],
              ['a', 'Size M... yes! It fits perfectly!', 'Cỡ M... đúng rồi! Vừa khít luôn!', '🎉']
            ],
            blanks: [[0, 'try on', ['try on', 'cry on', 'fry on']], [2, 'too small', ['too small', 'too smelly', 'two snails']]]
          },
          build: [
            { vi: 'Em muốn hỏi: Cho cháu đi thử đôi bốt này được không ạ?', a: ['Can I', 'try on', 'these boots,', 'please?'], x: ['tries on', 'this boots'] },
            { vi: 'Em muốn nói: Chiếc áo khoác này rộng quá so với cháu.', a: ['This jacket', 'is', 'too big', 'for me.'], x: ['are', 'too long ago'] }
          ],
          talk: [
            { q: 'What do you say when shoes are too small?', vi: 'Bạn nói gì khi giày bị chật?', hint: 'Can I try a bigger size, please?', k: ['bigger|larger'], c: ['Can I try a bigger size, please?', 'Can I try a smaller size, please?', 'How much are these shoes?'] },
            { q: 'Do you like shopping for clothes?', vi: 'Bạn có thích đi mua quần áo không?', hint: 'Yes, I love trying on new clothes.', k: ['yes|no|sometimes|love|like|not', 'shop|shopping|clothes|try|trying|buy|mall|market'], c: ['Yes, I love trying on new clothes.', 'Yes, I like playing football.', "No, I don't like cooking."] }
          ],
          snow: { vi: 'Kể về lần mua sắm', l: [[['fits'], 'vừa'], [['The jacket', 'fits', 'perfectly!'], 'Chiếc áo vừa khít!'], [['In the boutique,', 'the red jacket', 'fits', 'perfectly,', 'so I buy it.'], 'Trong cửa hàng, chiếc áo đỏ vừa khít, nên mình mua nó.']], x: ['fit', 'too big'] },
          cb: ['b', 'Sorry, Su. We have no size M in red. Only blue.', 'Xin lỗi Su. Màu đỏ hết cỡ M rồi. Chỉ còn màu xanh.', [
            ['calm', "That's okay. Can I try on the blue one?", 'Không sao ạ. Cháu thử cái màu xanh được không?', 'Sure! Blue looks great on you.', 'Được chứ! Màu xanh hợp với cháu lắm.', '💙'],
            ['ask', 'Will you get more red ones next week?', 'Tuần sau cô có thêm màu đỏ không ạ?', 'Yes! I will call your mum when they arrive.', 'Có! Khi nào có hàng cô sẽ gọi cho mẹ cháu.', '📞']]],
          tb: ['b', 'This hoodie is too small for you. What can we do with it?', 'Áo nỉ này chật với cháu rồi. Mình làm gì với nó đây?', [
            ['idea', 'Give it to my little cousin!', 'Tặng cho em họ của cháu ạ!', 'Lovely! Clothes can have a second life.', 'Tuyệt vời! Quần áo có thể có cuộc đời thứ hai.', '🎁'],
            ['yes', 'Put it in the charity box at school.', 'Bỏ vào thùng từ thiện ở trường ạ.', 'Kind heart! Another child will be warm.', 'Trái tim nhân hậu! Một bạn nhỏ khác sẽ được ấm áp.', '📦']]],
          fact: ['Your feet are a little bigger in the afternoon, so it is a good time to try on new shoes!', 'Bàn chân con to hơn một chút vào buổi chiều, nên đó là lúc tốt để thử giày mới!'],
          tf: [
            ['We try on clothes in the changing room.', true, 'Yes! The changing room has a mirror and a curtain.', 'Đúng! Phòng thử đồ có gương và rèm.'],
            ['If shoes are too small, they are comfortable.', false, 'No! Shoes that are too small hurt your feet.', 'Sai! Giày chật làm đau chân.']
          ],
          qa: ['What clothes would you like to buy?', 'Bạn muốn mua quần áo gì?', 'I would like to buy a new hoodie.', ['hoodie|jacket|shoes|boots|dress|scarf|hat|shirt|t-shirt|jeans|sandals|trainers|skirt|shorts']]
        }
      ],
      mystery: {
        t: 'The Perfect Jacket', tv: 'Chiếc áo khoác hoàn hảo',
        intro: ['Su bought one jacket at the LEGO Boutique. Which one did she buy?', 'Su đã mua một chiếc áo khoác ở cửa hàng LEGO. Bạn ấy mua chiếc nào?'],
        clues: [['Clue one: Su loves red. She did not buy a blue jacket.', 'Manh mối 1: Su mê màu đỏ. Bạn ấy không mua áo màu xanh.'],
          ['Clue two: Size S was too small. Su could not move her arms!', 'Manh mối 2: Cỡ S chật quá. Su không cử động tay được!'],
          ['Clue three: Size L was too big. It looked like a dress!', 'Manh mối 3: Cỡ L rộng quá. Trông như một chiếc váy!']],
        q: ['Which jacket did Su buy?', 'Su đã mua chiếc áo nào?'],
        o: [['a red jacket, size S', '🔴', 'áo đỏ cỡ S'], ['a red jacket, size L', '🟥', 'áo đỏ cỡ L'], ['a blue jacket, size M', '🔵', 'áo xanh cỡ M'], ['a red jacket, size M', '❤️', 'áo đỏ cỡ M']], a: 3,
        win: ['The red jacket in size M! It fits perfectly!', 'Áo khoác đỏ cỡ M! Vừa khít luôn!']
      }
    },

    /* ---------- WEEK 20: Green Earth & Recycling ---------- */
    {
      id: 'w20', week: 20, month: 5, monthTitle: M5[0], monthTitleVi: M5[1],
      name: 'Green Earth & Recycling', vi: 'Trái Đất xanh & Tái chế', short: 'Eco Heroes',
      topic: 'Recycling, Saving Water & Eco-Hero Missions', topicVi: 'Tái chế, tiết kiệm nước & nhiệm vụ siêu anh hùng môi trường',
      color: '#22C55E', dark: '#15803D', icon: '♻️', model: ['recycling', 'Eco Recycling Centre', 'Trạm tái chế xanh'],
      chars: { a: { name: 'Tí', fig: 'cap-red|determined|torso-ninja|legs-green|flag' }, b: { name: 'Captain Eco', fig: 'helmet-astro|cool|torso-astro|legs-green|wrench' } },
      chatter: [
        ['Eco heroes, ready for a green mission?', 'Các siêu anh hùng xanh, sẵn sàng làm nhiệm vụ chưa?'],
        ['Plastic bottles go in the yellow bin!', 'Chai nhựa bỏ vào thùng màu vàng!'],
        ["Turn off the tap! Every drop counts.", 'Khóa vòi nước lại! Giọt nào cũng quý.'],
        ["Don't litter! Keep our park clean.", 'Đừng xả rác! Giữ công viên sạch đẹp nhé.'],
        ["Let's plant a tree for our Earth!", 'Cùng trồng một cái cây cho Trái Đất nào!']
      ],
      lessons: [
        {
          title: 'Sort It Out!', titleVi: 'Phân loại rác nào!', icon: '🗑️',
          words: [
            ['recycle', 'verb', '/ˌriːˈsaɪkl/', 'tái chế', '♻️', 'We recycle old paper to make new paper.', 'Chúng mình tái chế giấy cũ để làm giấy mới.', 'You turn old things into new things instead of throwing them away.'],
            ['plastic bottle', 'noun', '/ˈplæstɪk ˈbɒtl/', 'chai nhựa', '🧴', 'Put the plastic bottle in the recycling bin.', 'Bỏ chai nhựa vào thùng tái chế nhé.', 'A light, clear container for water or juice. It does not break when it falls.'],
            ['glass jar', 'noun', '/ɡlɑːs dʒɑː/', 'lọ thủy tinh', '🫙', 'Grandma keeps pickles in a glass jar.', 'Bà đựng dưa muối trong lọ thủy tinh.', 'A see-through pot with a lid. It can break if you drop it.'],
            ['cardboard box', 'noun', '/ˈkɑːdbɔːd bɒks/', 'thùng các-tông', '📦', 'My LEGO set came in a cardboard box.', 'Bộ LEGO của mình được đựng trong thùng các-tông.', 'A brown box made of thick paper.'],
            ['recycling bin', 'noun', '/ˌriːˈsaɪklɪŋ bɪn/', 'thùng rác tái chế', '🚮', 'Our class has a recycling bin for paper.', 'Lớp mình có một thùng tái chế cho giấy.', 'A special box for rubbish that can be made into new things.']
          ],
          comic: {
            title: 'The Bin Mix-Up', titleVi: 'Nhầm thùng rồi!',
            panels: [
              ['a', 'Captain Eco, I put everything in one bin!', 'Đội trưởng Eco ơi, cháu bỏ hết vào một thùng rồi!', '🗑️'],
              ['b', "Oh no! Let's sort it. The plastic bottle goes here.", 'Ôi không! Mình phân loại nhé. Chai nhựa bỏ vào đây.', '🧴'],
              ['a', 'And the glass jar? Careful, it can break!', 'Còn lọ thủy tinh thì sao? Cẩn thận, nó dễ vỡ!', '🫙'],
              ['b', 'Glass bin! Now we can recycle them all.', 'Thùng thủy tinh! Giờ mình có thể tái chế tất cả.', '♻️']
            ],
            blanks: [[1, 'plastic bottle', ['plastic bottle', 'plastic dinosaur', 'pink bottle cap']], [3, 'recycle', ['recycle', 'ride a bicycle', 'reply']]]
          },
          build: [
            { vi: 'Em muốn kể: Chúng mình tái chế giấy cũ ở trường.', a: ['We', 'recycle', 'old paper', 'at school.'], x: ['recycles', 'old pizza'] },
            { vi: 'Em muốn hướng dẫn: Bỏ chai nhựa vào thùng tái chế.', a: ['Put', 'the plastic bottle', 'in the recycling bin.'], x: ['Puts', 'in the fish tank.'] }
          ],
          talk: [
            { q: 'Do you recycle at home?', vi: 'Nhà bạn có tái chế không?', hint: 'Yes, we recycle paper and bottles.', k: ['yes|no|sometimes|always|never', 'recycle|paper|bottle|bottles|plastic|glass|cans|boxes|sort'], c: ['Yes, we recycle paper and bottles.', 'Yes, we put rubbish in one big bag.', 'No, we throw everything away.'] },
            { q: 'Where does a glass jar go?', vi: 'Lọ thủy tinh bỏ vào đâu?', hint: 'It goes in the glass bin.', k: ['glass', 'bin|recycling'], c: ['It goes in the glass bin.', 'It goes in the paper bin.', 'It goes in the plastic bin.'] }
          ],
          snow: { vi: 'Hướng dẫn phân loại rác', l: [[['recycle'], 'tái chế'], [['We', 'recycle', 'bottles.'], 'Chúng mình tái chế chai.'], [['Every Friday,', 'we', 'recycle', 'plastic bottles and cardboard boxes', 'at school.'], 'Thứ Sáu hằng tuần, chúng mình tái chế chai nhựa và thùng các-tông ở trường.']], x: ['recycles', 'throw away'] },
          cb: ['b', 'Tí, your friend throws a plastic bottle in the wrong bin. What do you say?', 'Tí ơi, bạn cháu ném chai nhựa vào nhầm thùng. Cháu nói gì?', [
            ['calm', "Hey, can you put it in the yellow bin? It's for plastic.", 'Này, bạn bỏ nó vào thùng vàng được không? Thùng đó cho đồ nhựa.', 'Polite and clear! Great eco hero.', 'Lịch sự và rõ ràng! Siêu anh hùng xanh tuyệt vời.', '💛'],
            ['idea', "Let's make bin labels with pictures together!", 'Mình cùng làm nhãn dán có hình cho thùng rác đi!', 'Brilliant! Now everyone can sort easily.', 'Xuất sắc! Giờ ai cũng phân loại dễ dàng.', '🏷️']]],
          tb: ['b', 'What can we make from an old cardboard box?', 'Mình làm được gì từ thùng các-tông cũ?', [
            ['idea', 'A robot costume!', 'Một bộ đồ rô-bốt ạ!', 'Beep boop! Super creative!', 'Bíp bốp! Sáng tạo quá!', '🤖'],
            ['yes', 'A house for my LEGO people!', 'Một ngôi nhà cho các nhân vật LEGO ạ!', 'Cosy! Your minifigures will love it.', 'Ấm cúng ghê! Các nhân vật sẽ thích lắm.', '🏠']]],
          fact: ['Glass can be recycled again and again, and it never wears out!', 'Thủy tinh có thể được tái chế hết lần này đến lần khác mà không bị hỏng!'],
          tf: [
            ['Old paper can be recycled into new paper.', true, 'Yes! Recycling paper saves trees.', 'Đúng! Tái chế giấy giúp bảo vệ cây xanh.'],
            ['A plastic bottle disappears in the ground in one week.', false, 'No! A plastic bottle takes hundreds of years to break down.', 'Sai! Chai nhựa cần hàng trăm năm mới phân hủy.']
          ],
          qa: ['What can you recycle in your classroom?', 'Trong lớp bạn có thể tái chế gì?', 'We can recycle paper and plastic bottles.', ['recycle|reuse', 'paper|bottle|bottles|plastic|boxes|box|cans|glass']]
        },
        {
          title: 'Water & Energy Heroes', titleVi: 'Siêu anh hùng tiết kiệm nước & điện', icon: '🚰',
          words: [
            ['save water', 'verb', '/seɪv ˈwɔːtə/', 'tiết kiệm nước', '💧', 'We save water by taking short showers.', 'Chúng mình tiết kiệm nước bằng cách tắm nhanh.', 'You use less from the tap so there is more for everyone.'],
            ['turn off the tap', 'verb', '/tɜːn ɒf ðə tæp/', 'khóa vòi nước', '🚰', 'Turn off the tap when you brush your teeth.', 'Khóa vòi nước khi đánh răng nhé.', 'You twist it so the water stops running.'],
            ['reuse', 'verb', '/ˌriːˈjuːz/', 'tái sử dụng', '🔁', 'I reuse my water bottle every day.', 'Ngày nào mình cũng dùng lại bình nước của mình.', 'You use the same thing again instead of buying a new one.'],
            ['refill', 'verb', '/ˌriːˈfɪl/', 'đổ đầy lại', '🫗', 'I refill my bottle at the school water fountain.', 'Mình đổ đầy lại bình ở vòi nước của trường.', 'You fill something again when it is empty.'],
            ['unplug', 'verb', '/ʌnˈplʌɡ/', 'rút phích cắm', '🔌', 'Unplug the TV when you go on holiday.', 'Rút phích cắm TV khi đi du lịch nhé.', 'You pull the cable out of the wall socket.']
          ],
          comic: {
            title: 'The Dripping Tap', titleVi: 'Chiếc vòi nhỏ giọt',
            panels: [
              ['b', 'Tí! The water is running while you brush your teeth!', 'Tí ơi! Nước chảy suốt khi cháu đánh răng kìa!', '🚰'],
              ['a', 'Oops! I will turn off the tap.', 'Ối! Cháu sẽ khóa vòi nước lại.', '🙈'],
              ['b', 'Good! Let\'s save water. Use a cup instead.', 'Tốt lắm! Mình tiết kiệm nước nhé. Dùng cốc thay vào.', '🥛'],
              ['a', 'And I can reuse the cup every morning!', 'Và cháu có thể dùng lại cái cốc mỗi sáng!', '🔁']
            ],
            blanks: [[1, 'turn off the tap', ['turn off the tap', 'turn on the TV', 'tap my nose']], [2, 'save water', ['save water', 'waste water', 'drink a sofa']]]
          },
          build: [
            { vi: 'Em muốn nhắc: Hãy khóa vòi nước khi đánh răng.', a: ['Turn off', 'the tap', 'when you brush your teeth.'], x: ['Turns off', 'when you sleep.'] },
            { vi: 'Em muốn kể: Mình dùng lại bình nước mỗi ngày.', a: ['I', 'reuse', 'my water bottle', 'every day.'], x: ['reuses', 'my plastic bag'] }
          ],
          talk: [
            { q: 'How can you save water at home?', vi: 'Ở nhà bạn tiết kiệm nước bằng cách nào?', hint: 'I turn off the tap when I brush my teeth.', k: ['turn|close|short|less|cup|reuse|bucket|fix', 'tap|shower|water|teeth|leak|bath'], c: ['I turn off the tap when I brush my teeth.', 'I turn off the lights when I leave.', 'I take a long bath every day.'] },
            { q: 'Do you reuse a water bottle?', vi: 'Bạn có dùng lại bình nước không?', hint: 'Yes, I refill it every day.', k: ['yes|no|sometimes|always|never', 'refill|reuse|again|fill'], c: ['Yes, I refill it every day.', 'Yes, I buy a new one every day.', 'No, I drink juice at lunch.'] }
          ],
          snow: { vi: 'Kể về việc tiết kiệm nước', l: [[['the tap'], 'vòi nước'], [['I', 'turn off', 'the tap.'], 'Mình khóa vòi nước.'], [['When I brush my teeth,', 'I', 'turn off', 'the tap', 'to save water.'], 'Khi đánh răng, mình khóa vòi để tiết kiệm nước.']], x: ['turns off', 'to waste water.'] },
          cb: ['b', 'Tí, nobody is in the living room, but the fan and lights are on.', 'Tí ơi, phòng khách không có ai mà quạt và đèn vẫn bật.', [
            ['yes', "I'll turn them off right now!", 'Cháu tắt ngay đây ạ!', 'Energy saved! Well done, hero!', 'Đã tiết kiệm điện! Giỏi lắm, siêu anh hùng!', '💡'],
            ['idea', "Let's make a 'Switch Off!' sign for the door.", "Mình làm biển 'Tắt điện!' dán ở cửa đi ạ.", 'Great reminder for the whole family!', 'Lời nhắc tuyệt vời cho cả nhà!', '🪧']]],
          tb: ['b', 'Your school has no water fountain. What can you do?', 'Trường cháu không có vòi nước uống. Cháu làm gì được?', [
            ['idea', 'I can bring a big bottle from home and share it.', 'Cháu mang một bình to từ nhà và chia cho bạn.', 'Smart and kind! No plastic cups needed.', 'Thông minh và tốt bụng! Không cần cốc nhựa nữa.', '🧃'],
            ['ask', 'Can we ask the head teacher for a fountain?', 'Mình xin cô hiệu trưởng lắp vòi nước được không?', 'Yes! Write a polite letter together.', 'Được chứ! Cùng viết một lá thư lịch sự nào.', '✉️']]],
          fact: ['A running tap can waste several litres of water every minute!', 'Một vòi nước để chảy có thể lãng phí vài lít nước mỗi phút!'],
          tf: [
            ['Turning off the tap while brushing your teeth saves water.', true, 'Yes! You only need water to rinse.', 'Đúng! Con chỉ cần nước để súc miệng.'],
            ['Leaving the TV on all night saves electricity.', false, 'No! It wastes electricity. Turn it off.', 'Sai! Như vậy là lãng phí điện. Hãy tắt TV đi.']
          ],
          qa: ['What do you do to save energy at home?', 'Bạn làm gì để tiết kiệm điện ở nhà?', 'I turn off the lights and unplug the TV.', ['turn|unplug|switch|close', 'light|lights|tv|fan|computer|air|plug']]
        },
        {
          title: 'Eco-Hero Mission', titleVi: 'Nhiệm vụ siêu anh hùng xanh', icon: '🌳',
          words: [
            ['compost', 'noun', '/ˈkɒmpɒst/', 'phân hữu cơ (ủ từ rác)', '🪱', 'We turn banana peels into compost for the garden.', 'Chúng mình biến vỏ chuối thành phân bón cho vườn.', 'Old food and leaves rot and become rich soil. Worms love it!'],
            ['plant a tree', 'verb', '/plɑːnt ə triː/', 'trồng cây', '🌳', 'Our class will plant a tree on Earth Day.', 'Lớp mình sẽ trồng một cái cây vào Ngày Trái Đất.', 'You dig a hole, put in a young plant and water it.'],
            ["Don't litter!", 'phrase', '/dəʊnt ˈlɪtə/', 'Đừng xả rác bừa bãi!', '🚯', "Don't litter! Put your rubbish in the bin.", 'Đừng xả rác! Hãy bỏ rác vào thùng.', 'A sign in the park that tells you not to drop rubbish on the ground.'],
            ['cloth bag', 'noun', '/klɒθ bæɡ/', 'túi vải', '👜', 'Mum takes a cloth bag to the market.', 'Mẹ mang túi vải đi chợ.', 'A strong bag you can use again and again, not a plastic one.'],
            ['eco-friendly', 'adj', '/ˌiːkəʊ ˈfrendli/', 'thân thiện với môi trường', '🌍', 'Bamboo straws are eco-friendly.', 'Ống hút tre thân thiện với môi trường.', 'It is good for nature and does not hurt the Earth.']
          ],
          comic: {
            title: 'Mission: Clean Park', titleVi: 'Nhiệm vụ: Công viên sạch',
            panels: [
              ['b', 'Mission time! The park is full of rubbish.', 'Đến giờ làm nhiệm vụ! Công viên đầy rác kìa.', '🦸'],
              ['a', "Look at that sign: Don't litter! But people did.", 'Nhìn biển kia: Đừng xả rác! Vậy mà mọi người vẫn xả.', '🚯'],
              ['b', "Let's pick it up. Banana peels go in the compost bin.", 'Mình nhặt lên nhé. Vỏ chuối bỏ vào thùng ủ phân.', '🍌'],
              ['a', "Mission complete! Now let's plant a tree here!", 'Hoàn thành nhiệm vụ! Giờ mình trồng một cái cây ở đây nào!', '🌳']
            ],
            blanks: [[2, 'compost', ['compost', 'comic book', 'cupcake']], [3, 'plant a tree', ['plant a tree', 'paint a tree', 'eat a tree']]]
          },
          build: [
            { vi: 'Em muốn kể: Lớp mình sẽ trồng cây vào Ngày Trái Đất.', a: ['Our class', 'will plant', 'a tree', 'on Earth Day.'], x: ['planted', 'a TV'] },
            { vi: 'Em muốn kể: Mẹ mang túi vải đi chợ.', a: ['Mum', 'takes', 'a cloth bag', 'to the market.'], x: ['take', 'a plastic bag'] }
          ],
          talk: [
            { q: 'What would you do to help the Earth?', vi: 'Bạn sẽ làm gì để giúp Trái Đất?', hint: 'I would plant a tree and pick up litter.', k: ['plant|pick|recycle|save|reuse|clean|turn', 'tree|trees|litter|rubbish|water|bag|bags|plastic|bin|energy|lights'], c: ['I would plant a tree and pick up litter.', 'I would throw rubbish in the river.', 'I would use more plastic bags.'] },
            { q: 'What do you say when someone drops rubbish?', vi: 'Bạn nói gì khi ai đó vứt rác?', hint: "Please don't litter. Use the bin.", k: ['litter|bin|rubbish|pick|trash'], c: ["Please don't litter. Use the bin.", 'Thank you very much!', 'Please pass me the ball.'] }
          ],
          snow: { vi: 'Kể về nhiệm vụ siêu anh hùng xanh', l: [[['a tree'], 'một cái cây'], [['We', 'plant', 'a tree.'], 'Chúng mình trồng một cái cây.'], [['On Earth Day,', 'we', 'plant', 'a tree', 'in the school garden.'], 'Vào Ngày Trái Đất, chúng mình trồng cây trong vườn trường.']], x: ['plants', 'a plastic bag'] },
          cb: ['b', 'Tí, a boy drops a sweet wrapper on the ground. What do you do?', 'Tí ơi, một bạn vứt vỏ kẹo xuống đất. Cháu làm gì?', [
            ['calm', 'Excuse me, the bin is over there.', 'Bạn ơi, thùng rác ở đằng kia kìa.', 'Polite and helpful! He picks it up.', 'Lịch sự và hữu ích! Bạn ấy nhặt lên rồi.', '😊'],
            ['yes', "I'll pick it up and put it in the bin.", 'Cháu sẽ nhặt lên và bỏ vào thùng.', 'A true eco hero! Now he is helping too.', 'Siêu anh hùng xanh thực thụ! Giờ bạn ấy cũng giúp rồi.', '🦸']]],
          tb: ['b', 'The shopkeeper gives you a plastic bag for one small pencil.', 'Cô bán hàng đưa cháu túi nilon chỉ để đựng một cây bút chì.', [
            ['no', "No, thank you. I don't need a bag.", 'Dạ thôi ạ, cháu cảm ơn. Cháu không cần túi.', 'One less plastic bag! The sea says thank you.', 'Bớt được một túi nilon! Biển cả cảm ơn cháu.', '🐢'],
            ['idea', 'I brought my cloth bag. Can I use it?', 'Cháu có mang túi vải. Cháu dùng túi này được không ạ?', 'Of course! So eco-friendly!', 'Tất nhiên! Thật thân thiện với môi trường!', '👜']]],
          fact: ['Earthworms help turn food scraps into compost, which makes soil healthy for plants.', 'Giun đất giúp biến rác thức ăn thành phân hữu cơ, làm đất màu mỡ cho cây.'],
          tf: [
            ['A cloth bag can be used many times.', true, 'Yes! It is strong and eco-friendly.', 'Đúng! Túi vải bền và thân thiện với môi trường.'],
            ['Plastic bags are good food for sea turtles.', false, 'No! Turtles think bags are jellyfish, and it makes them sick.', 'Sai! Rùa biển tưởng túi nilon là sứa và bị bệnh khi ăn phải.']
          ],
          qa: ['What eco-hero mission can you do this week?', 'Tuần này bạn có thể làm nhiệm vụ xanh nào?', 'I can pick up litter in the park.', ['plant|pick|recycle|save|reuse|turn|clean', 'litter|rubbish|tree|water|bottle|bag|tap|lights|park|school']]
        }
      ],
      mystery: {
        t: "Captain Eco's Mystery Box", tv: 'Chiếc hộp bí ẩn của Đội trưởng Eco',
        intro: ['Captain Eco has a mystery item in a box. Which bin does it go in? First, find out what it is!', 'Đội trưởng Eco có một món đồ bí ẩn trong hộp. Hãy đoán xem đó là gì!'],
        clues: [['Clue one: It is not hard or shiny.', 'Manh mối 1: Nó không cứng và không bóng.'],
          ['Clue two: You cannot fold it flat like paper.', 'Manh mối 2: Bạn không thể gấp phẳng nó như giấy.'],
          ['Clue three: Worms love to eat it in the compost bin.', 'Manh mối 3: Giun rất thích ăn nó trong thùng ủ phân.']],
        q: ['What is in the box?', 'Trong hộp có gì?'],
        o: [['a glass jar', '🫙', 'lọ thủy tinh'], ['a plastic bottle', '🧴', 'chai nhựa'], ['a cardboard box', '📦', 'thùng các-tông'], ['a banana peel', '🍌', 'vỏ chuối']], a: 3,
        win: ['A banana peel! Into the compost bin – yummy for the worms!', 'Vỏ chuối! Bỏ vào thùng ủ phân – món ngon cho giun!']
      }
    }
  );

  /* ======================= THÁNG 6 ======================= */
  const M6 = ['Everyday Physics & How Things Work', 'Vật lý Đời sống & Đồ vật quanh ta'];

  /* ======================= THÁNG 6 ======================= */
  Z.push(
    /* ---------- WEEK 21: Materials Around Us ---------- */
    {
      id: 'w21', week: 21, month: 6, monthTitle: M6[0], monthTitleVi: M6[1],
      name: 'Materials Around Us', vi: 'Vật liệu quanh em', short: 'Materials',
      topic: 'Science: Materials, Properties & Engineering', topicVi: 'Khoa học: vật liệu, tính chất & thử thách kỹ sư',
      color: '#B45309', dark: '#78350F', icon: '🪵', model: ['workshop', 'LEGO Maker Workshop', 'Xưởng chế tạo LEGO'],
      chars: { a: { name: 'Na', fig: 'hair-brown|determined|torso-red|legs-blue|wrench' }, b: { name: 'Engineer Kai', fig: 'cap-red|cool|torso-blue|legs-tan|book' } },
      chatter: [
        ['What is it made of? Let me check!', 'Nó làm bằng gì nhỉ? Để mình kiểm tra!'],
        ['Glass is transparent. I can see through it!', 'Thủy tinh trong suốt. Mình nhìn xuyên qua được!'],
        ['My raincoat is waterproof. No more wet clothes!', 'Áo mưa của mình không thấm nước. Hết bị ướt rồi!'],
        ['Careful! Eggs are fragile.', 'Cẩn thận! Trứng dễ vỡ lắm.'],
        ["It didn't work? Let's try again!", 'Chưa được à? Mình thử lại nào!']
      ],
      lessons: [
        {
          title: 'What Is It Made Of?', titleVi: 'Nó được làm bằng gì?', icon: '🔍',
          words: [
            ['wood', 'noun', '/wʊd/', 'gỗ', '🪵', 'My desk is made of wood.', 'Bàn học của mình làm bằng gỗ.', 'It comes from trees. Pencils and chairs are often made of it.'],
            ['plastic', 'noun', '/ˈplæstɪk/', 'nhựa', '🧴', 'This water bottle is made of plastic.', 'Chai nước này làm bằng nhựa.', 'It is light and comes in many colours. LEGO bricks are made of it.'],
            ['metal', 'noun', '/ˈmetl/', 'kim loại', '🔩', 'A spoon is made of metal.', 'Cái thìa làm bằng kim loại.', 'It is hard, cold and shiny. Keys and coins are made of it.'],
            ['glass', 'noun', '/ɡlɑːs/', 'thủy tinh', '🪟', 'The window is made of glass.', 'Cửa sổ làm bằng thủy tinh.', 'You can see through it, but it breaks if you drop it.'],
            ['fabric', 'noun', '/ˈfæbrɪk/', 'vải', '🧵', 'My T-shirt is made of fabric.', 'Áo phông của mình làm bằng vải.', 'Clothes, curtains and pillows are made of this material.']
          ],
          comic: {
            title: 'The Mystery Junk Box', titleVi: 'Thùng đồ cũ bí ẩn',
            panels: [
              ['b', 'Welcome to the workshop, Na! What is this spoon made of?', 'Chào mừng đến xưởng, Na! Cái thìa này làm bằng gì nhỉ?', '🥄'],
              ['a', "It's cold and shiny. It's made of metal!", 'Nó lạnh và sáng bóng. Nó làm bằng kim loại!', '✨'],
              ['b', 'Right! And what about this old window?', 'Đúng rồi! Còn cái cửa sổ cũ này thì sao?', '🪟'],
              ['a', "It's made of glass. Be careful, it can break!", 'Nó làm bằng thủy tinh. Cẩn thận, nó có thể vỡ đấy!', '⚠️']
            ],
            blanks: [[1, 'metal', ['metal', 'cheese', 'fabric']], [3, 'glass', ['glass', 'banana', 'cloud']]]
          },
          build: [
            { vi: 'Em muốn nói: Cái bàn này làm bằng gỗ.', a: ['This table', 'is made of', 'wood.'], x: ['are made of', 'glass.'] },
            { vi: 'Em muốn kể: Gạch LEGO được làm bằng nhựa.', a: ['LEGO bricks', 'are made of', 'plastic.'], x: ['is made of', 'paper.'] }
          ],
          talk: [
            { q: 'What is your schoolbag made of?', vi: 'Cặp sách của bạn làm bằng gì?', hint: 'My schoolbag is made of fabric.', k: ['fabric|plastic|leather|cloth|nylon|canvas|cotton'], c: ['My schoolbag is made of fabric.', 'My schoolbag is blue and big.', 'My schoolbag has three pockets.'] },
            { q: 'Can you find something made of wood in your room?', vi: 'Bạn có tìm thấy đồ gì làm bằng gỗ trong phòng không?', hint: 'Yes, my desk is made of wood.', k: ['yes|no', 'desk|bed|door|chair|table|shelf|bookshelf|wardrobe|pencil|floor|wood'], c: ['Yes, my desk is made of wood.', 'Yes, my window is made of glass.', 'Yes, my ball is made of rubber.'] }
          ],
          snow: { vi: 'Kể về đồ vật làm bằng gì', l: [[['metal'], 'kim loại'], [['Spoons', 'are made of', 'metal.'], 'Thìa làm bằng kim loại.'], [['In our kitchen,', 'spoons and pots', 'are made of', 'metal', 'because it is strong.'], 'Trong bếp nhà mình, thìa và nồi làm bằng kim loại vì nó chắc chắn.']], x: ['is made of', 'fabric'] },
          cb: ['b', 'Na, which material should we use for a LEGO bridge?', 'Na ơi, mình nên dùng vật liệu gì để làm cây cầu LEGO nhỉ?', [
            ['idea', "Let's use wood! It's light and it doesn't bend.", 'Dùng gỗ đi ạ! Nó nhẹ và không bị cong.', 'Smart thinking, Engineer Na!', 'Suy nghĩ thông minh lắm, kỹ sư Na!', '🪵'],
            ['ask', 'Can we test wood and plastic first?', 'Mình thử gỗ và nhựa trước được không ạ?', 'Great idea! Real engineers always test.', 'Ý hay! Kỹ sư thật luôn thử nghiệm trước.', '🔬']]],
          tb: ['b', 'Oops! I dropped a glass cup on the floor!', 'Ối! Chú làm rơi cái cốc thủy tinh xuống sàn rồi!', [
            ['calm', "Don't touch it! I'll get the broom.", 'Đừng chạm vào ạ! Cháu đi lấy chổi.', 'Good thinking. Safety first!', 'Nghĩ hay lắm. An toàn là trên hết!', '🧹'],
            ['ask', 'Are you okay? Did you cut your hand?', 'Chú có sao không ạ? Chú có bị đứt tay không?', "I'm fine. Thank you for asking!", 'Chú không sao. Cảm ơn cháu đã hỏi han!', '🩹']]],
          fact: ['Glass is made by melting sand in a very, very hot oven!', 'Thủy tinh được làm bằng cách nung chảy cát trong lò cực kỳ nóng đấy!'],
          tf: [
            ['Wood comes from trees.', true, 'Yes! People cut trees to get wood.', 'Đúng! Người ta lấy gỗ từ cây.'],
            ['A metal spoon is made of paper.', false, 'No! A metal spoon is made of metal. Paper is too weak.', 'Sai! Thìa kim loại làm bằng kim loại. Giấy quá yếu.']
          ],
          qa: ['What is your favourite toy made of?', 'Đồ chơi yêu thích của bạn làm bằng gì?', 'My favourite toy is made of plastic.', ['plastic|wood|metal|fabric|rubber|paper|glass|cotton']]
        },
        {
          title: 'Material Super Powers', titleVi: 'Siêu năng lực của vật liệu', icon: '🦸',
          words: [
            ['waterproof', 'adj', '/ˈwɔːtəpruːf/', 'không thấm nước', '☔', 'My raincoat is waterproof.', 'Áo mưa của mình không thấm nước.', 'Rain cannot get through this material, so you stay dry.'],
            ['transparent', 'adj', '/trænsˈpærənt/', 'trong suốt', '🔎', 'Glass is transparent, so we can see through it.', 'Thủy tinh trong suốt nên mình nhìn xuyên qua được.', 'You can see clearly through it, like clean water or a window.'],
            ['bendy', 'adj', '/ˈbendi/', 'dễ uốn cong', '🌀', 'A plastic straw is bendy.', 'Ống hút nhựa dễ uốn cong.', 'You can curve it easily and it does not break.'],
            ['stretchy', 'adj', '/ˈstretʃi/', 'co giãn', '🎈', 'A balloon is stretchy.', 'Quả bóng bay co giãn được.', 'You can pull it longer and it goes back to its shape.'],
            ['fragile', 'adj', '/ˈfrædʒaɪl/', 'dễ vỡ', '🥚', 'Be careful! Eggs are fragile.', 'Cẩn thận! Trứng dễ vỡ lắm.', 'It breaks very easily, so you must hold it gently.']
          ],
          comic: {
            title: 'Rainy Season Rescue', titleVi: 'Giải cứu mùa mưa',
            panels: [
              ['a', "Oh no! It's raining and my paper hat is all wet!", 'Ôi không! Trời mưa và mũ giấy của cháu ướt hết rồi!', '🌧️'],
              ['b', "Paper isn't waterproof. Try this plastic bag!", 'Giấy không chống nước đâu. Thử cái túi nhựa này đi!', '🛍️'],
              ['a', "Wow, it's transparent! I can see the sky!", 'Oa, nó trong suốt! Cháu nhìn thấy cả bầu trời!', '👀'],
              ['b', 'Plastic is waterproof and bendy. A super material!', 'Nhựa vừa chống nước vừa dễ uốn. Đúng là siêu vật liệu!', '🦸']
            ],
            blanks: [[1, 'waterproof', ['waterproof', 'delicious', 'sleepy']], [2, 'transparent', ['transparent', 'hungry', 'noisy']]]
          },
          build: [
            { vi: 'Em muốn nói: Áo mưa của mình không thấm nước.', a: ['My raincoat', 'is', 'waterproof.'], x: ['are', 'fragile.'] },
            { vi: 'Em muốn nói: Mình nhìn xuyên qua được vì nó trong suốt.', a: ['I', 'can see', 'through it', 'because it is transparent.'], x: ['sees', 'because it is bendy.'] }
          ],
          talk: [
            { q: 'Is your raincoat waterproof?', vi: 'Áo mưa của bạn có chống nước không?', hint: 'Yes, my raincoat is waterproof.', k: ['yes|no', 'waterproof|dry'], c: ['Yes, my raincoat is waterproof.', 'Yes, my raincoat is yellow.', 'No, my raincoat is in my bag.'] },
            { q: 'Can you name something fragile in your home?', vi: 'Bạn kể tên một đồ dễ vỡ trong nhà được không?', hint: 'A glass cup is fragile.', k: ['glass|egg|eggs|cup|plate|vase|bowl|mirror|window|bottle|cups|plates|bowls|phone|lamp|teapot'], c: ['A glass cup is fragile.', 'A pillow is soft.', 'A rubber ball is bouncy.'] }
          ],
          snow: { vi: 'Mô tả tính chất của vật liệu', l: [[['stretchy'], 'co giãn'], [['A balloon', 'is', 'stretchy.'], 'Bóng bay co giãn.'], [['A balloon', 'is', 'stretchy,', 'but it is', 'fragile too!'], 'Bóng bay co giãn, nhưng nó cũng dễ vỡ nữa!']], x: ['are', 'waterproof'] },
          cb: ['b', 'Na, can you carry this box of glass bottles?', 'Na ơi, cháu bê giúp chú thùng chai thủy tinh này được không?', [
            ['yes', "Sure! I'll walk slowly. They're fragile.", 'Được ạ! Cháu sẽ đi chậm. Chúng dễ vỡ mà.', 'Thank you! Slow and steady.', 'Cảm ơn cháu! Chậm mà chắc.', '🐢'],
            ['idea', "Let's put some fabric between them first.", 'Mình lót vải vào giữa các chai trước đã ạ.', 'Brilliant! The fabric will protect them.', 'Tuyệt vời! Lớp vải sẽ bảo vệ chúng.', '🧵']]],
          tb: ['b', "It's going to rain. Which bag will you take to school?", 'Sắp mưa rồi. Cháu sẽ mang túi nào đi học?', [
            ['idea', "The plastic one. It's waterproof!", 'Cái túi nhựa ạ. Nó chống nước!', 'Good choice! Your books will stay dry.', 'Chọn hay lắm! Sách của cháu sẽ khô ráo.', '🎒'],
            ['ask', 'Can I wrap my books in a plastic bag too?', 'Cháu bọc sách trong túi nhựa nữa được không ạ?', 'Yes! Double protection!', 'Được chứ! Bảo vệ hai lớp luôn!', '📚']]],
          fact: ['Ducks spread oil on their feathers to make them waterproof!', 'Vịt bôi dầu lên lông để lông không thấm nước đấy!'],
          tf: [
            ['A clean glass window is transparent.', true, 'Yes! Light goes through it, so we can see outside.', 'Đúng! Ánh sáng đi xuyên qua nên mình nhìn được ra ngoài.'],
            ['A paper bag is waterproof.', false, 'No! Paper gets wet and soft in the rain.', 'Sai! Giấy bị ướt và nhũn khi gặp mưa.']
          ],
          qa: ['What do you wear on rainy days?', 'Bạn mặc gì vào những ngày mưa?', 'I wear my waterproof raincoat and boots.', ['raincoat|umbrella|boots|waterproof|poncho|jacket']]
        },
        {
          title: 'The Umbrella Challenge', titleVi: 'Thử thách làm chiếc ô', icon: '☂️',
          words: [
            ['material', 'noun', '/məˈtɪəriəl/', 'vật liệu', '🧱', 'Which material is the best for an umbrella?', 'Vật liệu nào tốt nhất để làm ô?', 'Wood, metal and fabric are all kinds of this.'],
            ['rubber', 'noun', '/ˈrʌbə/', 'cao su', '🛞', 'Car tyres are made of rubber.', 'Lốp xe ô tô làm bằng cao su.', 'It comes from tree sap. Tyres and rain boots are made of it.'],
            ['strong', 'adj', '/strɒŋ/', 'chắc chắn, bền', '💪', 'Metal is strong, so it does not break easily.', 'Kim loại chắc chắn nên không dễ gãy.', 'It can hold heavy things and it does not break.'],
            ['leak', 'verb', '/liːk/', 'bị rò, bị dột', '💧', 'Oh no! Our paper umbrella leaks!', 'Ôi không! Chiếc ô giấy của tụi mình bị dột!', 'Water drips through a small hole in a roof or a bottle.'],
            ["Let's try again!", 'phrase', '/lets traɪ əˈɡen/', 'Mình thử lại nào!', '🔁', "It broke? No problem. Let's try again!", 'Gãy rồi à? Không sao. Mình thử lại nào!', 'Engineers say this when their first idea does not work.']
          ],
          comic: {
            title: 'Build the Best Umbrella', titleVi: 'Chế tạo chiếc ô tốt nhất',
            panels: [
              ['b', "Today's challenge: build an umbrella for a LEGO minifigure!", 'Thử thách hôm nay: làm chiếc ô cho người tí hon LEGO!', '☂️'],
              ['a', "I'll use paper. It's light and easy to cut.", 'Cháu sẽ dùng giấy. Nó nhẹ và dễ cắt.', '📄'],
              ['b', "Let's pour some water on it. Oh no, it leaks!", 'Mình đổ chút nước lên thử nhé. Ôi không, nó bị dột!', '💧'],
              ['a', "Let's try again! Plastic on top and a strong metal stick!", 'Mình thử lại nào! Mặt trên bằng nhựa và cán kim loại chắc chắn!', '💪']
            ],
            blanks: [[2, 'leaks', ['leaks', 'sings', 'sleeps']], [3, "Let's try again!", ["Let's try again!", "Let's go to bed!", "Let's eat the umbrella!"]]]
          },
          build: [
            { vi: 'Em muốn nói: Chiếc ô giấy của tụi mình bị dột khi trời mưa.', a: ['Our paper umbrella', 'leaks', 'in the rain.'], x: ['leak', 'in the oven.'] },
            { vi: 'Em muốn nói: Kim loại là vật liệu chắc chắn.', a: ['Metal', 'is', 'a strong material.'], x: ['are', 'a fragile material.'] }
          ],
          talk: [
            { q: 'Which material is the best for an umbrella?', vi: 'Vật liệu nào tốt nhất để làm ô?', hint: 'Plastic is the best because it is waterproof.', k: ['plastic|nylon|rubber|waterproof|fabric'], c: ['Plastic is the best because it is waterproof.', 'Paper is the best because it is light.', 'Wood is the best because it is strong.'] },
            { q: 'What do you do when your LEGO model breaks?', vi: 'Bạn làm gì khi mô hình LEGO bị hỏng?', hint: 'I try again and make it stronger.', k: ['again|fix|rebuild|stronger|repair|try'], c: ['I try again and make it stronger.', 'I put it back in the box.', 'I cry and stop playing.'] }
          ],
          snow: { vi: 'Kể về thử thách kỹ sư', l: [[["Let's try again!"], 'Mình thử lại nào!'], [['We', 'test', 'our umbrella.'], 'Tụi mình thử chiếc ô.'], [['First,', 'we', 'test', 'our umbrella', 'with a cup of water.'], 'Đầu tiên, tụi mình thử chiếc ô bằng một cốc nước.']], x: ['tests', 'with a cup of juice.'] },
          cb: ['b', 'Our umbrella leaks! How do you feel, Na?', 'Chiếc ô bị dột rồi! Cháu thấy thế nào, Na?', [
            ['calm', "It's okay. Engineers make mistakes too!", 'Không sao ạ. Kỹ sư cũng mắc lỗi mà!', 'Exactly! Mistakes help us learn.', 'Chính xác! Lỗi sai giúp chúng ta học hỏi.', '🧠'],
            ['idea', "Let's add a plastic bag on top!", 'Mình thêm một cái túi nhựa lên trên đi ạ!', "Clever! Now it's waterproof.", 'Thông minh! Giờ nó chống nước rồi.', '🛍️']]],
          tb: ['b', "Bin's LEGO boat is letting water in. What do you say to him?", 'Thuyền LEGO của Bin bị nước tràn vào. Cháu sẽ nói gì với bạn?', [
            ['ask', 'Do you want to fix it together?', 'Cậu có muốn tụi mình cùng sửa không?', 'Yes, please! Teamwork!', 'Có chứ! Làm việc nhóm nào!', '🤝'],
            ['idea', 'Try some rubber! It keeps the water out.', 'Thử dùng cao su đi! Nó chặn nước vào.', "Thanks, Na! I'll try it now.", 'Cảm ơn Na! Mình thử ngay đây.', '🛞']]],
          fact: ['Rubber comes from the white sap of rubber trees, and Vietnam grows millions of them!', 'Cao su được làm từ nhựa trắng của cây cao su, và Việt Nam trồng hàng triệu cây đấy!'],
          tf: [
            ['Rubber boots keep your feet dry.', true, 'Yes! Rubber is waterproof.', 'Đúng! Cao su không thấm nước.'],
            ['A paper umbrella is stronger than a metal one.', false, 'No! Metal is much stronger than paper.', 'Sai! Kim loại chắc hơn giấy rất nhiều.']
          ],
          qa: ['What would you use to build a toy boat?', 'Bạn sẽ dùng gì để làm một chiếc thuyền đồ chơi?', 'I would use plastic because it is waterproof.', ['plastic|wood|rubber|metal|foam|bottle|paper', 'because|waterproof|float|strong|light']]
        }
      ],
      mystery: {
        t: 'The Winning Umbrella', tv: 'Chiếc ô chiến thắng',
        intro: ['Na won the Umbrella Challenge! Which material did she use?', 'Na đã thắng Thử thách làm ô! Bạn ấy đã dùng vật liệu nào?'],
        clues: [['Clue one: Water cannot get through it.', 'Manh mối 1: Nước không thể thấm qua nó.'],
          ['Clue two: It does not break when it falls.', 'Manh mối 2: Nó không bị vỡ khi rơi xuống.'],
          ['Clue three: It is light and bendy.', 'Manh mối 3: Nó nhẹ và dễ uốn cong.']],
        q: ['What material did Na use?', 'Na đã dùng vật liệu gì?'],
        o: [['paper', '📄', 'giấy'], ['cotton fabric', '👕', 'vải bông'], ['glass', '🪟', 'thủy tinh'], ['plastic', '🛍️', 'nhựa']], a: 3,
        win: ['Yes! Plastic is waterproof, bendy and it does not break!', 'Đúng rồi! Nhựa chống nước, dễ uốn và không bị vỡ!']
      }
    },

    /* ---------- WEEK 22: Sink or Float & Magnets ---------- */
    {
      id: 'w22', week: 22, month: 6, monthTitle: M6[0], monthTitleVi: M6[1],
      name: 'Sink or Float & Magnets', vi: 'Chìm hay nổi & Nam châm', short: 'Float & Magnets',
      topic: 'Science: Experiments, Floating & Magnetism', topicVi: 'Khoa học: thí nghiệm, vật nổi & nam châm',
      color: '#0891B2', dark: '#155E75', icon: '🧲', model: ['lab', 'Kitchen Science Lab', 'Phòng thí nghiệm trong bếp'],
      chars: { a: { name: 'Bin', fig: 'cap-red|surprised|torso-blue|legs-green|magnifier' }, b: { name: 'Grandpa Tư', fig: 'none-hat|wink|torso-chef|legs-tan|book' } },
      chatter: [
        ['Will it sink or float? Let me predict!', 'Nó sẽ chìm hay nổi nhỉ? Để mình dự đoán!'],
        ["I think it will float. Let's find out!", 'Mình nghĩ nó sẽ nổi. Cùng tìm hiểu nào!'],
        ['Splash! The orange floats!', 'Tõm! Quả cam nổi kìa!'],
        ['Magnets attract paper clips.', 'Nam châm hút kẹp giấy.'],
        ['Two north poles repel each other!', 'Hai cực bắc đẩy nhau ra!']
      ],
      lessons: [
        {
          title: 'Sink or Float?', titleVi: 'Chìm hay nổi?', icon: '🛟',
          words: [
            ['sink', 'verb', '/sɪŋk/', 'chìm', '⬇️', 'A stone sinks to the bottom of the pond.', 'Hòn đá chìm xuống đáy ao.', 'It goes down, down, down to the bottom of the water.'],
            ['float', 'verb', '/fləʊt/', 'nổi', '🛟', 'A leaf floats on the river.', 'Chiếc lá nổi trên sông.', 'It stays on top of the water and does not go down.'],
            ['hollow', 'adj', '/ˈhɒləʊ/', 'rỗng ruột', '🥥', 'A bamboo stick is hollow, so it floats.', 'Cây tre rỗng ruột nên nó nổi.', 'It is empty inside, like a drum or a tube.'],
            ['surface', 'noun', '/ˈsɜːfɪs/', 'mặt nước, bề mặt', '🌊', 'The duck swims on the surface of the pond.', 'Con vịt bơi trên mặt ao.', 'It is the very top part of the water.'],
            ['push down', 'verb', '/pʊʃ daʊn/', 'ấn xuống', '👇', 'Push down the ball and let it go!', 'Ấn quả bóng xuống rồi thả tay ra nào!', 'You press something lower with your hand.']
          ],
          comic: {
            title: 'The Washing-Up Bowl Test', titleVi: 'Thí nghiệm chậu rửa bát',
            panels: [
              ['a', 'Grandpa, why does my LEGO boat float?', 'Ông ơi, sao thuyền LEGO của cháu lại nổi ạ?', '⛵'],
              ['b', "Because it's hollow. There is air inside!", 'Vì nó rỗng ruột. Bên trong có không khí đấy!', '💨'],
              ['a', 'And why does this little coin sink?', 'Thế sao đồng xu nhỏ xíu này lại chìm ạ?', '🪙'],
              ['b', "It's small, but it's very heavy for its size!", 'Nó nhỏ, nhưng rất nặng so với kích thước của nó!', '⬇️']
            ],
            blanks: [[0, 'float', ['float', 'dance', 'sneeze']], [1, 'hollow', ['hollow', 'hungry', 'purple']]]
          },
          build: [
            { vi: 'Em muốn nói: Chiếc lá nổi trên sông.', a: ['A leaf', 'floats', 'on the river.'], x: ['float', 'under the bed.'] },
            { vi: 'Em muốn nói: Hòn đá chìm xuống đáy.', a: ['The stone', 'sinks', 'to the bottom.'], x: ['sink', 'to the sky.'] }
          ],
          talk: [
            { q: 'Does a rubber duck sink or float?', vi: 'Vịt cao su chìm hay nổi?', hint: 'It floats on the water.', k: ['float|floats'], c: ['It floats on the water.', 'It sinks to the bottom.', 'It is yellow and small.'] },
            { q: 'What toys can float in your bath?', vi: 'Đồ chơi nào có thể nổi trong bồn tắm của bạn?', hint: 'My plastic boat can float.', k: ['boat|duck|ball|toy|toys|plastic|bottle|fish|ducks|boats', 'float|floats'], c: ['My plastic boat can float.', 'My metal car sinks.', 'My toy car sinks in the bath.'] }
          ],
          snow: { vi: 'Kể về thí nghiệm vật nổi', l: [[['floats'], 'nổi'], [['The ball', 'floats', 'on the water.'], 'Quả bóng nổi trên mặt nước.'], [['When I push it down,', 'the ball', 'jumps up', 'and floats', 'on the surface.'], 'Khi mình ấn xuống, quả bóng bật lên và nổi trên mặt nước.']], x: ['sinks', 'under the sand'] },
          cb: ['b', 'Bin, will this big watermelon sink or float?', 'Bin ơi, quả dưa hấu to này sẽ chìm hay nổi?', [
            ['idea', "I think it will sink. It's so big!", 'Cháu nghĩ nó sẽ chìm. Nó to quá!', "Let's see. Splash! It floats! Surprise!", 'Xem nào. Tõm! Nó nổi! Bất ngờ chưa!', '🍉'],
            ['ask', 'Can we put it in the bath and see?', 'Mình thả nó vào bồn tắm xem được không ạ?', 'Sure! Science time in the bathroom!', 'Được chứ! Giờ khoa học trong phòng tắm!', '🛁']]],
          tb: ['b', 'Oh dear, your paper boat is sinking. What will you do?', 'Ôi, thuyền giấy của cháu đang chìm. Cháu sẽ làm gì?', [
            ['idea', "I'll build a new one with a plastic bottle!", 'Cháu sẽ làm thuyền mới bằng chai nhựa!', 'Great! Plastic is waterproof.', 'Hay lắm! Nhựa không thấm nước.', '🍾'],
            ['calm', "It's okay. I can fold another one.", 'Không sao ạ. Cháu gấp cái khác được.', "That's the spirit! Never give up.", 'Tinh thần tốt lắm! Không bao giờ bỏ cuộc.', '⛵']]],
          fact: ['A huge steel ship can float because it is hollow and full of air inside!', 'Con tàu thép khổng lồ nổi được vì nó rỗng và chứa đầy không khí bên trong!'],
          tf: [
            ['A rubber duck floats in the bath.', true, 'Yes! It is light and hollow.', 'Đúng! Nó nhẹ và rỗng ruột.'],
            ['A metal key floats on water.', false, 'No! A key is heavy for its size, so it sinks.', 'Sai! Chìa khóa nặng so với kích thước nên nó chìm.']
          ],
          qa: ['What things do you think can float?', 'Bạn nghĩ những vật gì có thể nổi?', 'I think a leaf and a plastic bottle can float.', ['leaf|bottle|boat|duck|ball|wood|plastic|apple|toy|watermelon', 'float|floats|can']]
        },
        {
          title: "Grandpa's Kitchen Experiment", titleVi: 'Thí nghiệm trong bếp của ông', icon: '🧪',
          words: [
            ['predict', 'verb', '/prɪˈdɪkt/', 'dự đoán', '🤔', 'I predict the orange will sink.', 'Mình dự đoán quả cam sẽ chìm.', 'You guess what will happen before you try.'],
            ['test', 'verb', '/test/', 'thử nghiệm', '🧪', "Let's test it in a bowl of water.", 'Mình thử nó trong bát nước nhé.', 'You try something to see if your idea is right.'],
            ['result', 'noun', '/rɪˈzʌlt/', 'kết quả', '📋', 'The result is very surprising!', 'Kết quả thật bất ngờ!', 'This is what you find out at the end of an experiment.'],
            ['I think it will', 'phrase', '/aɪ θɪŋk ɪt wɪl/', 'mình nghĩ nó sẽ', '💭', 'I think it will float.', 'Mình nghĩ nó sẽ nổi.', 'You say this to give your guess about what happens next.'],
            ["Let's find out!", 'phrase', '/lets faɪnd aʊt/', 'Cùng tìm hiểu nào!', '🔍', "Will the egg sink? Let's find out!", 'Quả trứng có chìm không? Cùng tìm hiểu nào!', 'You say this when you want to discover the answer together.']
          ],
          comic: {
            title: 'The Orange Mystery', titleVi: 'Bí ẩn quả cam',
            panels: [
              ['b', 'Bin, here is an orange. Sink or float? Predict!', 'Bin ơi, đây là quả cam. Chìm hay nổi? Dự đoán đi!', '🍊'],
              ['a', "I think it will sink. It's heavy!", 'Cháu nghĩ nó sẽ chìm. Nó nặng mà!', '🤔'],
              ['b', "Let's test it. Splash! Look, it floats!", 'Mình thử nhé. Tõm! Nhìn kìa, nó nổi!', '💦'],
              ['a', 'Now we take off the peel. It sinks! What a strange result!', 'Giờ bóc vỏ ra. Nó chìm! Kết quả lạ thật!', '😲']
            ],
            blanks: [[1, 'I think it will', ['I think it will', 'I sleep it will', 'I eat it will']], [3, 'result', ['result', 'pyjamas', 'breakfast']]]
          },
          build: [
            { vi: 'Em muốn nói: Mình dự đoán quả cam sẽ chìm.', a: ['I', 'predict', 'the orange', 'will sink.'], x: ['predicts', 'will sinks.'] },
            { vi: 'Em muốn rủ: Mình thử nó trong bát nước nhé.', a: ["Let's", 'test', 'it', 'in a bowl of water.'], x: ['tests', 'in a bowl of soup.'] }
          ],
          talk: [
            { q: 'Do you think a fresh egg will sink or float?', vi: 'Bạn nghĩ quả trứng tươi sẽ chìm hay nổi?', hint: 'I think it will sink.', k: ['sink|sinks|bottom'], c: ['I think it will sink.', 'I think it will float.', 'I think it will break.'] },
            { q: 'What was the result of the orange test?', vi: 'Kết quả thí nghiệm quả cam là gì?', hint: 'It floats with its peel and sinks without it.', k: ['float|floats', 'sink|sinks'], c: ['It floats with its peel and sinks without it.', 'It sinks with its peel.', 'It floats with or without its peel.'] }
          ],
          snow: { vi: 'Kể lại thí nghiệm', l: [[['the result'], 'kết quả'], [['We', 'check', 'the result.'], 'Tụi mình kiểm tra kết quả.'], [['After the test,', 'we', 'write down', 'the result', 'in our science notebook.'], 'Sau khi thử, tụi mình ghi kết quả vào sổ khoa học.']], x: ['checks', 'in our lunch box.'] },
          cb: ['b', 'Oh! My prediction was wrong. The orange floated!', 'Ồ! Ông đoán sai rồi. Quả cam nổi!', [
            ['calm', "That's okay, Grandpa. Scientists are wrong sometimes!", 'Không sao đâu ông. Nhà khoa học đôi khi cũng sai mà!', 'You are right! We learn from mistakes.', 'Cháu nói đúng! Mình học từ lỗi sai.', '👴'],
            ['ask', 'Why did it float, Grandpa?', 'Sao nó lại nổi hả ông?', "The peel has tiny air bubbles. It's like a life jacket!", 'Vỏ cam có những bọt khí li ti. Giống như áo phao vậy!', '🦺']]],
          tb: ['b', 'Shall we test a lime and a potato next?', 'Tiếp theo mình thử quả chanh và củ khoai tây nhé?', [
            ['yes', "Yes! Let's find out!", 'Vâng ạ! Cùng tìm hiểu nào!', 'Get the bowl, little scientist!', 'Lấy cái bát ra nào, nhà khoa học nhí!', '🥣'],
            ['idea', "Let's predict first and write it down!", 'Mình dự đoán trước rồi ghi lại đi ạ!', "Good idea! Just like a real scientist's notebook.", 'Ý hay! Giống hệt sổ tay của nhà khoa học thật.', '📓']]],
          fact: ['An orange with its peel floats, but a peeled orange sinks!', 'Quả cam còn vỏ thì nổi, nhưng bóc vỏ rồi thì chìm đấy!'],
          tf: [
            ['Scientists often predict before they test.', true, 'Yes! They guess first, then they test.', 'Đúng! Họ đoán trước, rồi mới thử nghiệm.'],
            ['The result of a test is always the same as your prediction.', false, 'No! Sometimes the result surprises us.', 'Sai! Đôi khi kết quả làm mình bất ngờ.']
          ],
          qa: ['What experiment would you like to try at home?', 'Bạn muốn thử thí nghiệm gì ở nhà?', 'I would like to test which fruits float.', ['fruit|fruits|float|sink|water|magnet|egg|orange|ice|rain']]
        },
        {
          title: 'Magnet Fishing Game', titleVi: 'Trò chơi câu cá nam châm', icon: '🎣',
          words: [
            ['magnet', 'noun', '/ˈmæɡnət/', 'nam châm', '🧲', 'The magnet picks up the nails.', 'Nam châm hút những cái đinh lên.', 'It pulls iron things towards it without touching them.'],
            ['attract', 'verb', '/əˈtrækt/', 'hút', '🤝', 'Magnets attract paper clips.', 'Nam châm hút kẹp giấy.', 'This means to pull something closer to you.'],
            ['repel', 'verb', '/rɪˈpel/', 'đẩy nhau ra', '↔️', 'Two north poles repel each other.', 'Hai cực bắc đẩy nhau ra.', 'This means to push something away without touching it.'],
            ['paper clip', 'noun', '/ˈpeɪpə klɪp/', 'kẹp giấy', '📎', 'I put a paper clip on my paper fish.', 'Mình gắn một cái kẹp giấy lên con cá giấy.', 'It is a small bent piece of wire that holds sheets together.'],
            ['steel', 'noun', '/stiːl/', 'thép', '🔩', 'Scissors are made of steel.', 'Cái kéo làm bằng thép.', 'It is a very strong metal made mostly from iron.']
          ],
          comic: {
            title: 'Catch a Paper Fish!', titleVi: 'Câu cá giấy nào!',
            panels: [
              ['b', "Let's play magnet fishing! Each paper fish has a clip.", 'Mình chơi câu cá nam châm nhé! Mỗi con cá giấy có một cái kẹp.', '🐟'],
              ['a', 'Got one! The magnet attracts the clip!', 'Câu được rồi! Nam châm hút cái kẹp!', '🎣'],
              ['b', 'Now push these two magnets together, north to north.', 'Giờ cháu đẩy hai cục nam châm này lại gần, cực bắc với cực bắc.', '🧲'],
              ['a', "They repel! They're pushing each other away!", 'Chúng đẩy nhau! Chúng đang đẩy nhau ra xa!', '😮']
            ],
            blanks: [[1, 'attracts', ['attracts', 'eats', 'tickles']], [3, 'repel', ['repel', 'giggle', 'swim']]]
          },
          build: [
            { vi: 'Em muốn nói: Nam châm hút kẹp giấy.', a: ['Magnets', 'attract', 'paper clips.'], x: ['attracts', 'paper plates.'] },
            { vi: 'Em muốn nói: Hai cực bắc đẩy nhau ra.', a: ['Two north poles', 'repel', 'each other.'], x: ['repels', 'attract'] }
          ],
          talk: [
            { q: 'Does a magnet attract a plastic spoon?', vi: 'Nam châm có hút thìa nhựa không?', hint: 'No, it only attracts iron and steel.', k: ['no|not|doesn|does', 'iron|steel|metal|metals|nickel'], c: ['No, it only attracts iron and steel.', 'Yes, it attracts the plastic spoon.', 'No, it only attracts wood and paper.'] },
            { q: 'What would you catch in a magnet fishing game?', vi: 'Bạn sẽ câu được gì trong trò câu cá nam châm?', hint: 'I would catch a paper fish with a clip.', k: ['clip|clips|steel|metal|iron|paperclip'], c: ['I would catch a paper fish with a clip.', 'I would catch a plastic fish.', 'I would catch a fish with my hands.'] }
          ],
          snow: { vi: 'Nói về nam châm', l: [[['magnets'], 'nam châm'], [['Magnets', 'attract', 'steel.'], 'Nam châm hút thép.'], [['In the fishing game,', 'my magnet', 'attracts', 'a paper fish', 'with a steel clip.'], 'Trong trò câu cá, nam châm của mình hút con cá giấy có kẹp thép.']], x: ['attracting', 'plastic spoons'] },
          cb: ['b', 'Oh no! I dropped my sewing needle in the rice basket!', 'Ôi không! Ông làm rơi cây kim khâu vào rổ gạo rồi!', [
            ['idea', "Let's use a magnet to find it!", 'Mình dùng nam châm để tìm đi ông!', 'Here it is! What a clever boy!', 'Nó đây rồi! Cháu ông thông minh quá!', '🪡'],
            ['ask', 'Is the needle made of steel, Grandpa?', 'Cây kim làm bằng thép phải không ông?', "Yes! So a magnet can find it. Let's try!", 'Đúng! Nên nam châm tìm được nó. Thử nào!', '🧲']]],
          tb: ['b', 'Your cousin wants to play the fishing game too. What do you say?', 'Em họ cháu cũng muốn chơi câu cá. Cháu nói gì?', [
            ['yes', "Sure! Here's the magnet rod. You can go first!", 'Được chứ! Cần câu nam châm đây. Em chơi trước nhé!', 'How kind! Sharing is caring.', 'Tốt bụng quá! Chia sẻ là yêu thương.', '🎣'],
            ['idea', "Let's make a second rod so we can both play!", 'Mình làm thêm một cần câu để cả hai cùng chơi nhé!', 'Great idea! Two fishermen are better than one.', 'Ý hay! Hai người câu vui hơn một.', '🧲']]],
          fact: ['The Earth is like a giant magnet, so a compass needle points north!', 'Trái Đất giống như một nam châm khổng lồ, nên kim la bàn luôn chỉ hướng bắc!'],
          tf: [
            ['Magnets attract iron and steel.', true, 'Yes! Iron and steel stick to magnets.', 'Đúng! Sắt và thép bị nam châm hút.'],
            ['A magnet attracts a wooden pencil.', false, 'No! Wood is not attracted to magnets.', 'Sai! Nam châm không hút gỗ.']
          ],
          qa: ['What things in your house does a magnet stick to?', 'Nam châm dính vào những đồ vật nào trong nhà bạn?', 'A magnet sticks to our fridge door.', ['fridge|door|spoon|scissors|key|nail|clip|board|metal|steel|pot|keys|nails']]
        }
      ],
      mystery: {
        t: 'The Secret Object', tv: 'Đồ vật bí mật',
        intro: ['Grandpa hid one object in the washing-up bowl. Which one is it?', 'Ông giấu một đồ vật trong chậu rửa bát. Đó là đồ vật nào?'],
        clues: [['Clue one: It sinks to the bottom of the water.', 'Manh mối 1: Nó chìm xuống đáy nước.'],
          ['Clue two: A magnet attracts it.', 'Manh mối 2: Nam châm hút được nó.'],
          ['Clue three: You use it to open a door.', 'Manh mối 3: Bạn dùng nó để mở cửa.']],
        q: ['What did Grandpa hide?', 'Ông đã giấu gì?'],
        o: [['a cork', '🍾', 'nút bần'], ['a rubber duck', '🦆', 'vịt cao su'], ['a glass marble', '🔮', 'viên bi thủy tinh'], ['a steel key', '🔑', 'chìa khóa thép']], a: 3,
        win: ['Correct! The steel key sinks, and the magnet pulls it up!', 'Chính xác! Chìa khóa thép bị chìm, và nam châm kéo nó lên!']
      }
    },

    /* ---------- WEEK 23: Light, Shadows & Sound ---------- */
    {
      id: 'w23', week: 23, month: 6, monthTitle: M6[0], monthTitleVi: M6[1],
      name: 'Light, Shadows & Sound', vi: 'Ánh sáng, cái bóng & âm thanh', short: 'Light & Sound',
      topic: 'Science: Light Sources, Shadows, Mirrors & Sound', topicVi: 'Khoa học: nguồn sáng, cái bóng, gương & âm thanh',
      color: '#CA8A04', dark: '#854D0E', icon: '🔦', model: ['lighthouse', 'Kê Gà Lighthouse', 'Hải đăng Kê Gà'],
      chars: { a: { name: 'Mai', fig: 'hair-brown|grin|torso-stars|legs-green|camera' }, b: { name: 'Uncle Bảy', fig: 'none-hat|cool|torso-knight|legs-black|flag' } },
      chatter: [
        ['The Sun is our biggest light source!', 'Mặt Trời là nguồn sáng lớn nhất của chúng ta!'],
        ['My hand blocks the light and makes a shadow.', 'Tay mình chặn ánh sáng và tạo ra cái bóng.'],
        ['Power cut! Shadow puppet time!', 'Cúp điện rồi! Đến giờ múa rối bóng!'],
        ['Hello! Hello! Can you hear the echo?', 'Xin chào! Xin chào! Bạn có nghe tiếng vang không?'],
        ['The lighthouse shines all night for the ships.', 'Ngọn hải đăng chiếu sáng suốt đêm cho tàu thuyền.']
      ],
      lessons: [
        {
          title: 'Light and Shadow', titleVi: 'Ánh sáng và cái bóng', icon: '☀️',
          words: [
            ['light source', 'noun', '/laɪt sɔːs/', 'nguồn sáng', '💡', 'The Sun is our biggest light source.', 'Mặt Trời là nguồn sáng lớn nhất của chúng ta.', 'The Sun, a lamp and a candle all give us this.'],
            ['shadow', 'noun', '/ˈʃædəʊ/', 'cái bóng', '👤', 'My shadow follows me everywhere.', 'Cái bóng đi theo mình khắp nơi.', 'It is a dark shape on the ground when you stand in the sun.'],
            ['block', 'verb', '/blɒk/', 'chặn lại', '🚧', 'My hand blocks the light.', 'Bàn tay mình chặn ánh sáng.', 'You stop something from going through.'],
            ['shine', 'verb', '/ʃaɪn/', 'chiếu sáng', '🌞', 'The Sun shines on the rice fields.', 'Mặt Trời chiếu sáng trên cánh đồng lúa.', 'The Sun and a lamp do this to give us light.'],
            ['torch', 'noun', '/tɔːtʃ/', 'đèn pin', '🔦', 'I shine my torch under the bed.', 'Mình rọi đèn pin xuống gầm giường.', 'It is a small light you hold in your hand in the dark.']
          ],
          comic: {
            title: 'Who Is Following Me?', titleVi: 'Ai đang đi theo mình?',
            panels: [
              ['a', 'Uncle Bảy, who is that dark shape behind me?', 'Chú Bảy ơi, cái hình đen đen sau lưng cháu là ai thế?', '😨'],
              ['b', "That's your shadow! Your body blocks the sunlight.", 'Đó là cái bóng của cháu! Cơ thể cháu chặn ánh nắng.', '👤'],
              ['a', 'Oh! So the Sun is a light source?', 'Ồ! Vậy Mặt Trời là một nguồn sáng ạ?', '☀️'],
              ['b', 'Yes! And at night, my lighthouse shines for the ships.', 'Đúng! Còn ban đêm, ngọn hải đăng của chú chiếu sáng cho tàu thuyền.', '🚢']
            ],
            blanks: [[1, 'blocks', ['blocks', 'eats', 'paints']], [2, 'light source', ['light source', 'ice cream', 'sleepy cat']]]
          },
          build: [
            { vi: 'Em muốn nói: Tay mình chặn ánh sáng.', a: ['My hand', 'blocks', 'the light.'], x: ['block', 'the music.'] },
            { vi: 'Em muốn nói: Mặt Trời chiếu sáng trên cánh đồng lúa.', a: ['The Sun', 'shines', 'on the rice fields.'], x: ['shine', 'under the rice fields.'] }
          ],
          talk: [
            { q: 'Can you name a light source?', vi: 'Bạn kể tên một nguồn sáng được không?', hint: 'The Sun is a light source.', k: ['sun|lamp|torch|candle|fire|bulb|lightning|star|stars|screen|lighthouse'], c: ['The Sun is a light source.', 'The Moon is a light source.', 'A mirror is a light source.'] },
            { q: 'When can you see your shadow?', vi: 'Khi nào bạn có thể nhìn thấy cái bóng của mình?', hint: 'I can see my shadow on sunny days.', k: ['sunny|sun|light|lamp|torch|sunshine'], c: ['I can see my shadow on sunny days.', 'I can see my shadow on the ground.', 'I can see my shadow at night in the dark.'] }
          ],
          snow: { vi: 'Nói về cái bóng', l: [[['my shadow'], 'cái bóng của mình'], [['I', 'see', 'my shadow.'], 'Mình nhìn thấy cái bóng của mình.'], [['On sunny days,', 'I', 'see', 'my shadow', 'on the playground.'], 'Vào những ngày nắng, mình thấy cái bóng của mình trên sân chơi.']], x: ['sees', 'in the dark cupboard.'] },
          cb: ['b', 'Mai, the lighthouse stairs are very dark. What do you need?', 'Mai ơi, cầu thang hải đăng tối lắm. Cháu cần gì nào?', [
            ['idea', 'I need a torch! I can shine it on the steps.', 'Cháu cần đèn pin! Cháu rọi lên các bậc thang.', 'Good! Now we can see every step.', 'Giỏi! Giờ mình thấy rõ từng bậc rồi.', '🔦'],
            ['ask', 'Can I hold your hand, Uncle?', 'Cháu nắm tay chú được không ạ?', "Of course! We'll go up together.", 'Tất nhiên rồi! Mình cùng đi lên nhé.', '🤝']]],
          tb: ['b', 'Look! Your shadow is on the wall. Can you make it dance?', 'Nhìn kìa! Bóng của cháu in trên tường. Cháu làm nó nhảy được không?', [
            ['yes', 'Yes! Look, my shadow is dancing!', 'Được ạ! Nhìn này, bóng của cháu đang nhảy!', 'Ha ha! What a funny shadow dancer!', 'Ha ha! Vũ công bóng vui nhộn quá!', '💃'],
            ['idea', "Let's make a shadow monster together!", 'Mình cùng làm một con quái vật bóng nhé!', 'Roar! A scary but friendly monster!', 'Gừm! Một con quái vật đáng sợ nhưng thân thiện!', '👾']]],
          fact: ['Light is so fast that it could go around the Earth about seven times in one second!', 'Ánh sáng nhanh đến mức có thể đi vòng quanh Trái Đất khoảng bảy lần trong một giây!'],
          tf: [
            ['A shadow appears when something blocks the light.', true, 'Yes! Light cannot go through you, so a dark shape appears.', 'Đúng! Ánh sáng không đi xuyên qua người mình nên tạo ra hình tối.'],
            ['The Moon makes its own light.', false, 'No! The Moon reflects light from the Sun.', 'Sai! Mặt Trăng phản chiếu ánh sáng của Mặt Trời.']
          ],
          qa: ['What light sources are in your home?', 'Nhà bạn có những nguồn sáng nào?', 'We have lamps, a torch and some candles.', ['lamp|lamps|torch|candle|candles|light|lights|bulb|tv|screen']]
        },
        {
          title: 'Shadow Puppets in a Power Cut', titleVi: 'Múa rối bóng lúc cúp điện', icon: '🐰',
          words: [
            ['power cut', 'noun', '/ˈpaʊə kʌt/', 'cúp điện', '🔌', 'There was a power cut last night.', 'Tối qua bị cúp điện.', 'Suddenly the lights, the fan and the TV all stop working.'],
            ['shadow puppet', 'noun', '/ˈʃædəʊ ˌpʌpɪt/', 'rối bóng', '🐰', 'I made a rabbit shadow puppet with my hands.', 'Mình làm con thỏ rối bóng bằng tay.', 'You make animal shapes with your hands in front of a light.'],
            ['mirror', 'noun', '/ˈmɪrə/', 'cái gương', '🪞', 'I look in the mirror every morning.', 'Sáng nào mình cũng soi gương.', 'You can see your own face in it.'],
            ['reflect', 'verb', '/rɪˈflekt/', 'phản chiếu', '✨', 'A mirror reflects light.', 'Gương phản chiếu ánh sáng.', 'Light hits something shiny and bounces back.'],
            ['low in the sky', 'phrase', '/ləʊ ɪn ðə skaɪ/', 'ở thấp trên bầu trời', '🌅', 'In the evening, the Sun is low in the sky.', 'Buổi chiều tối, Mặt Trời ở thấp trên bầu trời.', 'Where the Sun is at sunrise and sunset, close to the hills.']
          ],
          comic: {
            title: 'The Power Cut Show', titleVi: 'Buổi diễn lúc cúp điện',
            panels: [
              ['a', "Oh! A power cut! It's so dark!", 'Ôi! Cúp điện rồi! Tối quá!', '🌑'],
              ['b', "Don't worry. I have a candle and a torch.", 'Đừng lo. Chú có nến và đèn pin đây.', '🕯️'],
              ['a', 'Look at the wall! I made a rabbit shadow puppet!', 'Nhìn lên tường kìa! Cháu làm con thỏ rối bóng!', '🐰'],
              ['b', "And I'll use a mirror to reflect light on the ceiling!", 'Còn chú sẽ dùng gương phản chiếu ánh sáng lên trần nhà!', '🪞']
            ],
            blanks: [[0, 'power cut', ['power cut', 'pizza party', 'birthday cake']], [2, 'shadow puppet', ['shadow puppet', 'shopping list', 'sandwich']]]
          },
          build: [
            { vi: 'Em muốn nói: Gương phản chiếu ánh sáng.', a: ['A mirror', 'reflects', 'the light.'], x: ['reflect', 'the smell.'] },
            { vi: 'Em muốn kể: Buổi chiều tối, Mặt Trời ở thấp trên bầu trời.', a: ['In the evening,', 'the Sun', 'is', 'low in the sky.'], x: ['are', 'under the sea.'] }
          ],
          talk: [
            { q: 'What do you do during a power cut?', vi: 'Bạn làm gì khi bị cúp điện?', hint: 'I use a torch and make shadow puppets.', k: ['torch|candle|candles|shadow|puppets|stories|story|games|outside|read|sleep|lamp|talk'], c: ['I use a torch and make shadow puppets.', 'I watch TV all night.', 'I turn on the fan and the TV.'] },
            { q: 'Why is your shadow long in the evening?', vi: 'Tại sao buổi chiều tối cái bóng của bạn lại dài?', hint: 'Because the Sun is low in the sky.', k: ['sun', 'low|down|setting'], c: ['Because the Sun is low in the sky.', 'Because the Sun is high in the sky.', 'Because I am tall.'] }
          ],
          snow: { vi: 'Kể về buổi tối cúp điện', l: [[['a power cut'], 'cúp điện'], [['We', 'had', 'a power cut.'], 'Nhà mình bị cúp điện.'], [['Last night,', 'we', 'had', 'a power cut,', 'so we made shadow puppets.'], 'Tối qua nhà mình bị cúp điện, nên cả nhà làm rối bóng.']], x: ['has', 'so we ate shadow puppets.'] },
          cb: ['b', 'Mai, the power cut is long. Are you scared?', 'Mai ơi, cúp điện lâu quá. Cháu có sợ không?', [
            ['calm', 'A little, but the torch helps me.', 'Hơi sợ ạ, nhưng có đèn pin rồi.', "Good. I'm right here with you.", 'Ừ. Chú ở ngay đây với cháu.', '🔦'],
            ['idea', "No! Let's put on a shadow puppet show!", 'Không ạ! Mình diễn múa rối bóng đi chú!', "Wonderful! I'll be the audience.", 'Tuyệt vời! Chú sẽ làm khán giả.', '🎭']]],
          tb: ['b', 'Look at the evening sun. Why is your shadow so long?', 'Nhìn Mặt Trời buổi chiều kìa. Sao bóng cháu dài thế?', [
            ['idea', 'Because the Sun is low in the sky!', 'Vì Mặt Trời ở thấp trên bầu trời ạ!', 'Correct! Low Sun, long shadow.', 'Chính xác! Mặt Trời thấp, bóng dài.', '🌅'],
            ['ask', 'Will my shadow be short at noon?', 'Buổi trưa bóng cháu sẽ ngắn phải không ạ?', "Yes! At noon the Sun is high, so it's short.", 'Đúng! Buổi trưa Mặt Trời ở cao nên bóng ngắn.', '☀️']]],
          fact: ['Your shadow is shortest around noon, when the Sun is high in the sky.', 'Cái bóng của con ngắn nhất vào khoảng giữa trưa, khi Mặt Trời ở cao trên bầu trời.'],
          tf: [
            ['A mirror reflects light.', true, 'Yes! Light bounces off a mirror.', 'Đúng! Ánh sáng bật lại khi chiếu vào gương.'],
            ['Your shadow is longest at noon.', false, 'No! It is shortest at noon and long in the morning and evening.', 'Sai! Buổi trưa bóng ngắn nhất, còn sáng sớm và chiều tối bóng dài.']
          ],
          qa: ['Which animal can you make as a shadow puppet?', 'Bạn có thể làm con vật nào bằng rối bóng?', 'I can make a rabbit and a bird.', ['rabbit|bird|dog|duck|cat|snake|crocodile|butterfly|wolf|deer|swan|eagle']]
        },
        {
          title: "The Lighthouse Keeper's Night", titleVi: 'Đêm của người gác hải đăng', icon: '📯',
          words: [
            ['loud', 'adj', '/laʊd/', 'to, ầm ĩ', '📢', 'The thunder is very loud!', 'Tiếng sấm to quá!', 'This sound is big and strong. You may cover your ears.'],
            ['quiet', 'adj', '/ˈkwaɪət/', 'yên lặng, khẽ', '🤫', 'The library is quiet.', 'Thư viện rất yên lặng.', 'There is almost no sound, like a sleeping kitten.'],
            ['vibrate', 'verb', '/vaɪˈbreɪt/', 'rung', '🎸', 'Guitar strings vibrate and make music.', 'Dây đàn ghi-ta rung và tạo ra âm nhạc.', 'It moves back and forth very fast and makes a sound.'],
            ['echo', 'noun', '/ˈekəʊ/', 'tiếng vang', '🗣️', 'I shouted in the cave and heard an echo.', 'Mình hét trong hang và nghe thấy tiếng vang.', 'Your voice bounces back to you in a big cave or an empty hall.'],
            ['foghorn', 'noun', '/ˈfɒɡhɔːn/', 'còi báo sương mù', '📯', 'The foghorn warns ships in the fog.', 'Còi báo sương mù cảnh báo tàu thuyền khi có sương.', 'A very big horn by the sea. Ships hear it when they cannot see.']
          ],
          comic: {
            title: 'A Foggy Night at Sea', titleVi: 'Đêm sương mù trên biển',
            panels: [
              ['b', "Tonight there's thick fog. The ships can't see our light!", 'Đêm nay sương mù dày đặc. Tàu thuyền không thấy đèn của mình!', '🌫️'],
              ['a', 'What can we do, Uncle Bảy?', 'Mình làm gì được hả chú Bảy?', '❓'],
              ['b', "We blow the foghorn! It's very loud. BOOOM!", 'Mình thổi còi báo sương mù! Nó rất to. BÙMMM!', '📯'],
              ['a', "Listen! The ship answered. Now it's quiet and safe.", 'Nghe kìa! Con tàu trả lời rồi. Giờ thì yên ắng và an toàn.', '🚢']
            ],
            blanks: [[2, 'loud', ['loud', 'tasty', 'fluffy']], [3, 'quiet', ['quiet', 'spicy', 'yellow']]]
          },
          build: [
            { vi: 'Em muốn nói: Dây đàn rung và tạo ra âm thanh.', a: ['Guitar strings', 'vibrate', 'and make sounds.'], x: ['vibrates', 'and make pizza.'] },
            { vi: 'Em muốn kể: Mình nghe thấy tiếng vang trong hang.', a: ['I', 'hear', 'an echo', 'in the cave.'], x: ['hears', 'in my pocket.'] }
          ],
          talk: [
            { q: 'What is the loudest sound in your street?', vi: 'Âm thanh nào to nhất trên phố nhà bạn?', hint: 'The motorbike horns are the loudest.', k: ['motorbike|motorbikes|car|cars|horn|horns|dog|dogs|music|truck|trucks|bus|drill|rooster|karaoke'], c: ['The motorbike horns are the loudest.', 'The birds are the quietest.', 'My street is very busy.'] },
            { q: 'Where do you need to be quiet?', vi: 'Ở đâu bạn cần giữ yên lặng?', hint: 'I need to be quiet in the library.', k: ['library|bedroom|hospital|class|classroom|temple|cinema|museum|night|pagoda|exam|test'], c: ['I need to be quiet in the library.', 'I need to be quiet at a football match.', 'I can shout in the playground.'] }
          ],
          snow: { vi: 'Kể về ngọn hải đăng', l: [[['the foghorn'], 'còi báo sương mù'], [['We', 'blow', 'the foghorn.'], 'Tụi mình thổi còi báo sương mù.'], [['On foggy nights,', 'the keeper', 'blows', 'the loud foghorn', 'to warn the ships.'], 'Vào những đêm sương mù, người gác thổi chiếc còi thật to để cảnh báo tàu thuyền.']], x: ['blowing', 'to wake the fish.'] },
          cb: ['b', "Shh! It's late and the baby next door is sleeping.", 'Suỵt! Muộn rồi và em bé nhà bên đang ngủ.', [
            ['calm', "Okay, I'll be quiet. Let's whisper.", 'Vâng, cháu sẽ khẽ thôi. Mình nói thầm nhé.', "Thank you. That's very thoughtful.", 'Cảm ơn cháu. Cháu thật chu đáo.', '🤫'],
            ['ask', 'Can I play my drum tomorrow morning?', 'Sáng mai cháu chơi trống được không ạ?', 'Yes! But not too loud, okay?', 'Được! Nhưng đừng to quá nhé?', '🥁']]],
          tb: ['b', "Shout 'Hello!' into this cave. What do you hear?", "Hét 'Xin chào!' vào hang này xem. Cháu nghe thấy gì?", [
            ['yes', 'I hear an echo: hello, hello!', 'Cháu nghe thấy tiếng vang: xin chào, xin chào!', "That's your voice bouncing back!", 'Đó là giọng cháu dội lại đấy!', '🗣️'],
            ['ask', 'Why does my voice come back?', 'Tại sao giọng cháu lại quay về ạ?', 'The sound hits the rock wall and bounces back.', 'Âm thanh đập vào vách đá rồi dội lại.', '🪨']]],
          fact: ['Sound cannot travel in space because there is no air there!', 'Âm thanh không thể truyền trong vũ trụ vì ở đó không có không khí!'],
          tf: [
            ['Sound is made when things vibrate.', true, 'Yes! Touch your throat when you talk. It vibrates!', 'Đúng! Chạm vào cổ khi nói, con sẽ thấy nó rung!'],
            ['A whisper is louder than a foghorn.', false, 'No! A whisper is very quiet. A foghorn is very loud.', 'Sai! Tiếng thì thầm rất khẽ. Còi báo sương mù rất to.']
          ],
          qa: ['What sound do you like to hear in the morning?', 'Buổi sáng bạn thích nghe âm thanh gì?', 'I like to hear the birds singing.', ['bird|birds|rooster|music|rain|mum|voice|song|bell|bells|sea|alarm']]
        }
      ],
      mystery: {
        t: 'The Best Shadow Puppet', tv: 'Con rối bóng tuyệt nhất',
        intro: ['Mai wants to make the best shadow puppet. Which material should she use?', 'Mai muốn làm con rối bóng đẹp nhất. Bạn ấy nên dùng vật liệu nào?'],
        clues: [['Clue one: Light cannot go through it.', 'Manh mối 1: Ánh sáng không thể đi xuyên qua nó.'],
          ['Clue two: It does not reflect light like a shiny mirror.', 'Manh mối 2: Nó không phản chiếu ánh sáng như gương sáng bóng.'],
          ['Clue three: You can cut it into a rabbit shape with scissors.', 'Manh mối 3: Bạn có thể dùng kéo cắt nó thành hình con thỏ.']],
        q: ['What should Mai use?', 'Mai nên dùng gì?'],
        o: [['clear plastic', '🧴', 'nhựa trong suốt'], ['glass', '🪟', 'thủy tinh'], ['cardboard', '📦', 'bìa các-tông'], ['a mirror', '🪞', 'cái gương']], a: 2,
        win: ['Yes! Cardboard blocks the light and makes a perfect dark shadow!', 'Đúng rồi! Bìa các-tông chặn ánh sáng và tạo ra cái bóng đen hoàn hảo!']
      }
    },

    /* ---------- WEEK 24: Smart Technology & Coding Logic ---------- */
    {
      id: 'w24', week: 24, month: 6, monthTitle: M6[0], monthTitleVi: M6[1],
      name: 'Smart Tech & Coding Logic', vi: 'Công nghệ thông minh & Tư duy lập trình', short: 'Coding Logic',
      topic: 'Technology: Commands, Debugging & Online Safety', topicVi: 'Công nghệ: ra lệnh, sửa lỗi & an toàn trên mạng',
      color: '#7C3AED', dark: '#5B21B6', icon: '🤖', model: ['robotlab', 'LEGO Robot Lab', 'Phòng thí nghiệm rô-bốt LEGO'],
      chars: { a: { name: 'Khoa', fig: 'hair-brown|determined|torso-blue|legs-black|wrench' }, b: { name: 'Robo Bit', fig: 'helmet-astro|cool|torso-astro|legs-white|lightsaber' } },
      chatter: [
        ['Beep boop! Give me a command!', 'Bíp bốp! Hãy ra lệnh cho tớ!'],
        ['Move forward three steps!', 'Tiến lên ba bước!'],
        ['Oops! A bug! Let me fix it.', 'Ối! Có lỗi! Để mình sửa.'],
        ['Keep your password secret!', 'Hãy giữ bí mật mật khẩu nhé!'],
        ['Mission complete! High five!', 'Hoàn thành nhiệm vụ! Đập tay nào!']
      ],
      lessons: [
        {
          title: 'Think Like a Robot', titleVi: 'Suy nghĩ như rô-bốt', icon: '🧠',
          words: [
            ['step by step', 'adv', '/step baɪ step/', 'từng bước một', '👣', 'Robots follow a plan step by step.', 'Rô-bốt làm theo kế hoạch từng bước một.', 'You do one small thing, then the next, then the next.'],
            ['command', 'noun', '/kəˈmɑːnd/', 'lệnh', '🗨️', 'Give the robot a command: Stop!', 'Ra lệnh cho rô-bốt: Dừng lại!', 'It is an order you give to a robot or a computer.'],
            ['instructions', 'noun', '/ɪnˈstrʌkʃnz/', 'hướng dẫn', '📜', 'Read the instructions before you build.', 'Đọc hướng dẫn trước khi lắp ráp nhé.', 'They tell you how to do something, one part after another.'],
            ['move forward', 'verb', '/muːv ˈfɔːwəd/', 'tiến lên phía trước', '⬆️', 'Move forward two steps!', 'Tiến lên hai bước!', 'You go ahead in front of you, not backwards.'],
            ['in the right order', 'phrase', '/ɪn ðə raɪt ˈɔːdə/', 'đúng thứ tự', '🔢', 'Put the steps in the right order.', 'Hãy xếp các bước theo đúng thứ tự.', 'First things first, then second, then third, with nothing mixed up.']
          ],
          comic: {
            title: 'The Sandwich Robot', titleVi: 'Rô-bốt làm bánh mì kẹp',
            panels: [
              ['a', 'Robo Bit, make me a sandwich, please!', 'Robo Bit ơi, làm cho tớ cái bánh mì kẹp nhé!', '🥪'],
              ['b', 'Error! I need instructions, step by step.', 'Lỗi! Tớ cần hướng dẫn, từng bước một.', '🤖'],
              ['a', 'Okay. First, open the bread. Next, add an egg.', 'Được rồi. Đầu tiên, mở bánh mì. Tiếp theo, cho trứng vào.', '🍞'],
              ['b', 'Command received! Finally, give it to Khoa. Here you are!', 'Đã nhận lệnh! Cuối cùng, đưa cho Khoa. Của cậu đây!', '😋']
            ],
            blanks: [[1, 'step by step', ['step by step', 'upside down', 'by the sea']], [3, 'Command', ['Command', 'Pancake', 'Pillow']]]
          },
          build: [
            { vi: 'Em muốn ra lệnh: Rô-bốt, tiến lên hai bước.', a: ['Robot,', 'move forward', 'two steps.'], x: ['moves forward', 'two spoons.'] },
            { vi: 'Em muốn nói: Rô-bốt làm theo hướng dẫn từng bước một.', a: ['The robot', 'follows', 'the instructions', 'step by step.'], x: ['follow', 'step by sleep.'] }
          ],
          talk: [
            { q: 'How do you brush your teeth, step by step?', vi: 'Bạn đánh răng từng bước thế nào?', hint: 'First, I put on toothpaste. Next, I brush. Finally, I rinse.', k: ['first|next|then|finally', 'toothpaste|brush|rinse|water|teeth'], c: ['First, I put on toothpaste. Next, I brush. Finally, I rinse.', 'First, I wash my face. Then, I comb my hair.', 'I brush my teeth two times a day.'] },
            { q: 'What command would you give to a robot?', vi: 'Bạn sẽ ra lệnh gì cho rô-bốt?', hint: 'Move forward and pick up my socks!', k: ['move|pick|clean|go|stop|bring|dance|tidy|turn|forward|jump|walk|wash|carry'], c: ['Move forward and pick up my socks!', 'My robot is red and blue.', 'I like robots very much.'] }
          ],
          snow: { vi: 'Ra lệnh cho rô-bốt', l: [[['Move forward!'], 'Tiến lên!'], [['The robot', 'moves forward', 'slowly.'], 'Rô-bốt tiến lên chậm rãi.'], [['First,', 'the robot', 'moves forward', 'three steps,', 'and then it stops.'], 'Đầu tiên, rô-bốt tiến lên ba bước, rồi nó dừng lại.']], x: ['move forwards', 'and then it sings.'] },
          cb: ['b', "Khoa, your instructions are mixed up. I'm confused!", 'Khoa ơi, hướng dẫn của cậu lộn xộn quá. Tớ bối rối rồi!', [
            ['calm', 'Sorry, Robo Bit! I will put them in the right order.', 'Xin lỗi Robo Bit! Tớ sẽ xếp lại đúng thứ tự.', 'Thank you! Now I understand.', 'Cảm ơn cậu! Giờ tớ hiểu rồi.', '🔢'],
            ['ask', 'Which step is in the wrong place?', 'Bước nào bị đặt sai chỗ vậy?', 'Step two and step three are swapped.', 'Bước hai và bước ba bị đổi chỗ.', '🔍']]],
          tb: ['b', 'Can you give me a dance command?', 'Cậu ra cho tớ một lệnh nhảy được không?', [
            ['yes', 'Sure! Spin around and wave your arms!', 'Được chứ! Xoay một vòng và vẫy tay đi!', 'Beep boop! Robot dance time!', 'Bíp bốp! Giờ nhảy của rô-bốt!', '🕺'],
            ['idea', "Let's write a dance together, step by step!", 'Mình cùng viết một điệu nhảy, từng bước một nhé!', 'Great! A robot and human dance team!', 'Tuyệt! Đội nhảy rô-bốt và con người!', '🎶']]],
          fact: ['The word "robot" comes from a Czech word that means hard work.', 'Từ "robot" bắt nguồn từ một từ tiếng Séc có nghĩa là lao động vất vả.'],
          tf: [
            ['A robot follows instructions step by step.', true, 'Yes! Robots do exactly what the code says.', 'Đúng! Rô-bốt làm chính xác những gì mã lệnh yêu cầu.'],
            ['Robots always know what to do without any commands.', false, 'No! People write the instructions for robots.', 'Sai! Con người viết hướng dẫn cho rô-bốt.']
          ],
          qa: ['What job would you like a robot to do for you?', 'Bạn muốn rô-bốt làm việc gì cho bạn?', 'I would like a robot to tidy my room.', ['tidy|clean|cook|wash|carry|help|fold|feed|water', 'room|dishes|homework|toys|clothes|floor|dog|cat|bed|plants']]
        },
        {
          title: 'Oops, a Bug in the Maze!', titleVi: 'Ối, lỗi trong mê cung!', icon: '🐞',
          words: [
            ['bug', 'noun', '/bʌɡ/', 'lỗi (trong mã lệnh)', '🐞', 'There is a bug in my code!', 'Có lỗi trong mã lệnh của mình!', 'A small mistake that makes a computer program go wrong.'],
            ['fix', 'verb', '/fɪks/', 'sửa', '🔧', "Let's find the mistake and fix it.", 'Mình tìm lỗi sai rồi sửa nó nhé.', 'You make a broken thing work again.'],
            ['repeat', 'verb', '/rɪˈpiːt/', 'lặp lại', '🔁', 'Repeat this step three times.', 'Lặp lại bước này ba lần.', 'You do the same thing again and again.'],
            ['turn around', 'verb', '/tɜːn əˈraʊnd/', 'quay ngược lại', '🔄', 'The robot hit a wall, so it must turn around.', 'Rô-bốt đụng tường nên phải quay ngược lại.', 'You face the other way, towards what was behind you.'],
            ['Mission complete!', 'phrase', '/ˈmɪʃn kəmˈpliːt/', 'Hoàn thành nhiệm vụ!', '🏁', 'The robot reached the battery. Mission complete!', 'Rô-bốt đã tới cục pin. Hoàn thành nhiệm vụ!', 'A happy thing to say when you finish your task.']
          ],
          comic: {
            title: 'Bump! The Maze Wall', titleVi: 'Cộp! Bức tường mê cung',
            panels: [
              ['a', 'Go, Robo Bit! Move forward four times!', 'Đi nào Robo Bit! Tiến lên bốn lần!', '🤖'],
              ['b', 'Bump! I hit the wall. Ouch!', 'Cộp! Tớ đụng tường rồi. Ui da!', '🧱'],
              ['a', "Oh no, there's a bug in my code. I'll fix it!", 'Ôi không, có lỗi trong mã lệnh của tớ. Tớ sẽ sửa!', '🐞'],
              ['b', 'Repeat forward two times, then turn. Mission complete!', 'Lặp lại tiến lên hai lần, rồi rẽ. Hoàn thành nhiệm vụ!', '🏁']
            ],
            blanks: [[2, 'bug', ['bug', 'banana', 'burger']], [3, 'Mission complete!', ['Mission complete!', 'Good morning!', 'Happy birthday!']]]
          },
          build: [
            { vi: 'Em muốn nói: Mình sẽ tìm lỗi và sửa nó.', a: ['I', 'will find', 'the bug', 'and fix it.'], x: ['finds', 'and break it.'] },
            { vi: 'Em muốn ra lệnh: Lặp lại bước này ba lần.', a: ['Repeat', 'this step', 'three times.'], x: ['Repeats', 'three dogs.'] }
          ],
          talk: [
            { q: 'What do you do when you find a bug in your code?', vi: 'Bạn làm gì khi tìm thấy lỗi trong mã lệnh?', hint: 'I check every step and fix it.', k: ['fix|change|check|look|try|ask|debug|read'], c: ['I check every step and fix it.', 'I start a new game.', 'I turn off the computer.'] },
            { q: 'Your robot hits a wall. What command do you give?', vi: 'Rô-bốt của bạn đụng tường. Bạn ra lệnh gì?', hint: 'Turn around and move forward!', k: ['turn|back|backward|backwards|around|left|right|reverse'], c: ['Turn around and move forward!', 'Move forward again!', 'Go faster, robot!'] }
          ],
          snow: { vi: 'Kể về việc sửa lỗi', l: [[['the bug'], 'lỗi'], [['We', 'fixed', 'the bug.'], 'Tụi mình đã sửa lỗi.'], [['After lunch,', 'we', 'fixed', 'the bug,', 'and the robot reached the battery.'], 'Sau bữa trưa, tụi mình sửa lỗi, và rô-bốt đã tới cục pin.']], x: ['fixes', 'and the robot ate the battery.'] },
          cb: ['b', 'Beep! Your code has a bug. I keep spinning in circles!', 'Bíp! Mã lệnh của cậu có lỗi. Tớ cứ quay vòng vòng!', [
            ['calm', "Don't worry! Bugs are normal. I'll fix it.", 'Đừng lo! Lỗi là chuyện bình thường. Tớ sẽ sửa.', 'Thank you! I feel so dizzy.', 'Cảm ơn cậu! Tớ chóng mặt quá.', '😵'],
            ['ask', 'Can you show me which step is wrong?', 'Cậu chỉ cho tớ bước nào sai được không?', 'Step four says: repeat forever!', 'Bước bốn ghi: lặp lại mãi mãi!', '🔁']]],
          tb: ['b', "Your friend Lan's robot has a bug too. What do you do?", 'Rô-bốt của bạn Lan cũng bị lỗi. Cậu làm gì?', [
            ['ask', "Do you need help? Let's look together.", 'Cậu cần giúp không? Mình cùng xem nhé.', 'Two coders are better than one!', 'Hai lập trình viên giỏi hơn một!', '🧑‍💻'],
            ['idea', 'Try reading your code out loud, step by step!', 'Thử đọc to mã lệnh lên, từng bước một xem!', 'Good tip! I found the mistake!', 'Mẹo hay! Mình tìm ra lỗi rồi!', '🗣️']]],
          fact: ['In 1947, computer scientists found a real moth stuck inside a computer and called it a "bug"!', 'Năm 1947, các nhà khoa học máy tính tìm thấy một con bướm đêm thật mắc kẹt trong máy tính và gọi nó là "bug"!'],
          tf: [
            ['A bug is a mistake in a computer program.', true, 'Yes! Coders look for bugs and fix them.', 'Đúng! Lập trình viên tìm lỗi và sửa chúng.'],
            ['When you repeat a step, you do it only once.', false, 'No! Repeat means you do it again and again.', 'Sai! Lặp lại nghĩa là làm đi làm lại nhiều lần.']
          ],
          qa: ['Have you ever made a mistake and fixed it?', 'Bạn đã bao giờ mắc lỗi và tự sửa chưa?', 'Yes, I fixed my LEGO tower when it fell down.', ['fix|fixed|built|tried|again|changed|corrected|rebuilt']]
        },
        {
          title: 'Smart and Safe Online', titleVi: 'Thông minh & an toàn trên mạng', icon: '🔐',
          words: [
            ['password', 'noun', '/ˈpɑːswɜːd/', 'mật khẩu', '🔐', 'Never tell anyone your password.', 'Đừng bao giờ nói mật khẩu cho ai biết.', 'It is a secret word that opens your account.'],
            ['screen time', 'noun', '/skriːn taɪm/', 'thời gian dùng màn hình', '📱', 'My screen time is one hour a day.', 'Mình dùng màn hình một tiếng mỗi ngày.', 'The minutes you spend looking at a phone, tablet or TV.'],
            ['keep it secret', 'phrase', '/kiːp ɪt ˈsiːkrət/', 'giữ bí mật', '🤐', 'This is your password, so keep it secret.', 'Đây là mật khẩu của con, nên hãy giữ bí mật.', 'Do not tell anyone, not even your best friend.'],
            ['ask an adult', 'phrase', '/ɑːsk ən ˈædʌlt/', 'hỏi người lớn', '🙋', 'If a message looks strange, ask an adult.', 'Nếu tin nhắn trông lạ, hãy hỏi người lớn.', 'When you are not sure online, talk to Mum, Dad or your teacher.'],
            ['log out', 'verb', '/lɒɡ aʊt/', 'đăng xuất', '🚪', 'Always log out when you finish.', 'Luôn đăng xuất khi dùng xong.', 'You leave your account safely when you finish using an app.']
          ],
          comic: {
            title: 'A Strange Message', titleVi: 'Tin nhắn lạ',
            panels: [
              ['a', "Robo Bit, a message says: 'Send me your password and win a prize!'", "Robo Bit ơi, có tin nhắn bảo: 'Gửi mật khẩu cho tôi để nhận quà!'", '📩'],
              ['b', 'Stop! Never share it. Keep it secret!', 'Dừng lại! Đừng bao giờ chia sẻ. Hãy giữ bí mật!', '🛑'],
              ['a', "You're right. I'll ask an adult first.", 'Cậu nói đúng. Tớ sẽ hỏi người lớn trước.', '🙋'],
              ['b', 'Smart choice! And remember to log out when you finish.', 'Lựa chọn thông minh! Và nhớ đăng xuất khi dùng xong nhé.', '🚪']
            ],
            blanks: [[0, 'password', ['password', 'pancake', 'pillow']], [1, 'Keep it secret', ['Keep it secret', 'Shout it loudly', 'Paint it blue']]]
          },
          build: [
            { vi: 'Em muốn nói: Mình không bao giờ chia sẻ mật khẩu.', a: ['I', 'never share', 'my password.'], x: ['never shares', 'always share'] },
            { vi: 'Em muốn nói: Mình hỏi người lớn khi tin nhắn trông lạ.', a: ['I', 'ask', 'an adult', 'when a message looks strange.'], x: ['asks', 'a stranger'] }
          ],
          talk: [
            { q: 'How much screen time do you have every day?', vi: 'Mỗi ngày bạn dùng màn hình bao lâu?', hint: 'I have about one hour of screen time a day.', k: ['hour|hours|minutes|minute|half'], c: ['I have about one hour of screen time a day.', 'I have screen time after dinner.', 'I watch cartoons on my tablet.'] },
            { q: 'What do you do if a stranger asks for your password?', vi: 'Bạn làm gì nếu người lạ hỏi mật khẩu của bạn?', hint: 'I say no and ask an adult.', k: ["no|never|not|don't|dont", 'adult|mum|dad|parent|parents|teacher|tell|ask'], c: ['I say no and ask an adult.', 'I tell them my password.', 'I ask them their name.'] }
          ],
          snow: { vi: 'Nói về an toàn trên mạng', l: [[['my password'], 'mật khẩu của mình'], [['I', 'keep', 'my password secret.'], 'Mình giữ bí mật mật khẩu.'], [['On the internet,', 'I', 'always keep', 'my password secret', 'and ask an adult for help.'], 'Trên mạng, mình luôn giữ bí mật mật khẩu và nhờ người lớn giúp đỡ.']], x: ['keeps', 'and ask a stranger'] },
          cb: ['b', 'Khoa, you have played games for two hours. What now?', 'Khoa ơi, cậu chơi game hai tiếng rồi đấy. Giờ sao đây?', [
            ['yes', "You're right. I'll stop and play outside!", 'Cậu nói đúng. Tớ sẽ dừng lại và ra ngoài chơi!', 'Great! Fresh air is good for your brain.', 'Tuyệt! Không khí trong lành tốt cho não lắm.', '🌳'],
            ['ask', 'Can I finish this level, then stop?', 'Tớ chơi nốt màn này rồi dừng được không?', 'Okay, one level. Then screen time is over!', 'Được, một màn thôi. Sau đó hết giờ màn hình nhé!', '⏱️']]],
          tb: ['b', 'Your friend asks for your game password. What do you say?', 'Bạn của cậu hỏi mật khẩu game. Cậu nói gì?', [
            ['no', 'Sorry, I keep my password secret.', 'Xin lỗi, tớ giữ bí mật mật khẩu.', "Smart! Even best friends shouldn't know it.", 'Thông minh! Kể cả bạn thân cũng không nên biết.', '🔐'],
            ['idea', "Let's play together on my tablet instead!", 'Hay mình cùng chơi trên máy tính bảng của tớ nhé!', 'Fun and safe! Good thinking.', 'Vừa vui vừa an toàn! Nghĩ hay lắm.', '🎮']]],
          fact: ['A long password with words, numbers and symbols is much harder for hackers to guess.', 'Mật khẩu dài có chữ, số và ký hiệu sẽ khó đoán hơn rất nhiều với kẻ gian.'],
          tf: [
            ['You should never share your password with strangers.', true, 'Yes! Your password keeps your account safe.', 'Đúng! Mật khẩu giữ cho tài khoản của con an toàn.'],
            ['It is safe to meet an online stranger alone.', false, 'No! Never meet online strangers. Always tell an adult.', 'Sai! Đừng bao giờ gặp người lạ trên mạng. Luôn báo cho người lớn.']
          ],
          qa: ['What do you like to do when screen time is over?', 'Bạn thích làm gì khi hết giờ dùng màn hình?', 'I like to build LEGO and play outside.', ['build|play|read|draw|ride|cook|help|run', 'lego|outside|books|book|bike|football|games|garden|park|pictures']]
        }
      ],
      mystery: {
        t: 'The Super Safe Password', tv: 'Mật khẩu siêu an toàn',
        intro: ['Khoa needs a new password for his robot app. Which one is the safest?', 'Khoa cần mật khẩu mới cho ứng dụng rô-bốt. Mật khẩu nào an toàn nhất?'],
        clues: [['Clue one: It is not only numbers.', 'Manh mối 1: Nó không chỉ có số.'],
          ["Clue two: It is not Khoa's own name.", 'Manh mối 2: Nó không phải tên của Khoa.'],
          ['Clue three: It mixes words, numbers and symbols.', 'Manh mối 3: Nó kết hợp chữ, số và ký hiệu.']],
        q: ['Which password should Khoa choose?', 'Khoa nên chọn mật khẩu nào?'],
        o: [['1234', '🔢', 'một hai ba bốn'], ['Khoa', '🙋', 'tên của Khoa'], ['password', '🔤', 'chữ "password"'], ['Mango!Tiger7Rain', '🔐', 'chữ, số và ký hiệu']], a: 3,
        win: ['Great choice! Mango!Tiger7Rain is long and hard to guess. Keep it secret!', 'Chọn hay lắm! Mango!Tiger7Rain dài và khó đoán. Nhớ giữ bí mật nhé!']
      }
    }
  );

  (global.CurriculumStages = global.CurriculumStages || []).push({ stage: 2, zones: Z });
})(window);
