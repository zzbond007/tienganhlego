/* =========================================================
   curriculum-stage1.js – LỘ TRÌNH 9 THÁNG · GIAI ĐOẠN 1 (Tháng 1–3)
   🌱 FOUNDATION & MY DAILY WORLD – Nền tảng Lớp 3 & Đời sống quanh em
   12 Tuần (Vùng đất w1–w12) × 3 bài + 1 Mystery Mission mỗi tuần.

   Định dạng giống curriculum.js (RAW), thêm cho mỗi bài:
   - snow / cb / tb : Snowball 3 tầng, hội thoại rẽ nhánh Bước 3 & Bước 5 (xem expert-data.js)
   - fact : ['Real-Life / Science Fact tiếng Anh', 'nghĩa Việt']
   - tf   : [['câu nghe Đúng/Sai', true|false, 'giải thích', 'giải thích Việt'], ...]  → Listening Gym
   - qa   : ['câu hỏi đời sống', 'nghĩa', 'câu trả lời mẫu', [từ khóa]]                → Speaking Gym
   Mỗi Vùng đất: model: [mẫu mô hình, tên EN, tên VI] (xem LegoSvg.TEMPLATES)
   ========================================================= */
(function (global) {
  'use strict';

  const M1 = ['Me, My Home & Morning Habits', 'Bản thân, Ngôi nhà & Thói quen tự lập'];
  const M2 = ['School Life, Friends & Good Manners', 'Trường lớp, Bạn bè & Ứng xử văn minh'];
  const M3 = ['Food, Health & My Amazing Body', 'Ẩm thực, Sức khỏe & Cơ thể kỳ diệu'];
  const Z = [];

  /* ======================= THÁNG 1 ======================= */
  Z.push(
    /* ---------- WEEK 1: Morning & Bedtime Habits ---------- */
    {
      id: 'w1', week: 1, month: 1, monthTitle: M1[0], monthTitleVi: M1[1],
      name: 'Morning & Bedtime Habits', vi: 'Thói quen buổi sáng & buổi tối', short: 'Daily Habits',
      topic: 'Morning & Bedtime Habits', topicVi: 'Tự lập từ sáng đến tối',
      color: '#F97316', dark: '#C2410C', icon: '🌅', model: ['bedroom', 'Cozy Bedroom', 'Phòng ngủ ấm áp'],
      chars: { a: { name: 'Minh', fig: 'hair-brown|smile|torso-blue|legs-blue|none' }, b: { name: 'Mum', fig: 'hair-blonde|smile|torso-red|legs-black|none' } },
      chatter: [
        ['Good morning! Time to wake up!', 'Chào buổi sáng! Đến giờ dậy rồi!'],
        ['I make my bed every morning.', 'Sáng nào mình cũng gấp chăn.'],
        ["Don't forget to pack your schoolbag!", 'Đừng quên chuẩn bị cặp sách nhé!'],
        ['Brush your teeth before bed.', 'Đánh răng trước khi đi ngủ nhé.'],
        ['Good night! Sweet dreams!', 'Chúc ngủ ngon! Mơ đẹp nhé!']
      ],
      lessons: [
        {
          title: 'Rise and Shine', titleVi: 'Chào ngày mới', icon: '☀️',
          words: [
            ['wake up', 'verb', '/weɪk ʌp/', 'thức dậy', '⏰', "I wake up at six o'clock.", 'Mình thức dậy lúc sáu giờ.', 'You open your eyes and get out of bed in the morning.'],
            ['make my bed', 'verb', '/meɪk maɪ bed/', 'gấp chăn, dọn giường', '🛏️', 'I make my bed every morning.', 'Sáng nào mình cũng dọn giường.', 'You fold your blanket and put your pillow in the right place.'],
            ['wash my face', 'verb', '/wɒʃ maɪ feɪs/', 'rửa mặt', '🧼', 'I wash my face with cold water.', 'Mình rửa mặt bằng nước mát.', 'You use water to clean your eyes, nose and cheeks.'],
            ['brush my teeth', 'verb', '/brʌʃ maɪ tiːθ/', 'đánh răng', '🪥', 'I brush my teeth for two minutes.', 'Mình đánh răng trong hai phút.', 'You need a toothbrush and toothpaste to do this.'],
            ['get dressed', 'verb', '/ɡet drest/', 'mặc quần áo', '👕', 'I get dressed for school.', 'Mình mặc quần áo đi học.', 'You put on your shirt, trousers and socks.']
          ],
          comic: {
            title: 'The Sleepy Morning', titleVi: 'Buổi sáng ngái ngủ',
            panels: [
              ['b', "Minh, it's six o'clock. Time to wake up!", 'Minh ơi, sáu giờ rồi. Dậy thôi con!', '⏰'],
              ['a', "Five more minutes, Mum... I'm so sleepy!", 'Năm phút nữa thôi mẹ ơi... Con buồn ngủ quá!', '😴'],
              ['b', 'Come on! Make your bed and wash your face.', 'Nào! Con gấp chăn và rửa mặt đi.', '🛏️'],
              ['a', 'Okay! Now I feel fresh and ready!', 'Vâng ạ! Giờ con thấy tỉnh táo và sẵn sàng rồi!', '😃']
            ],
            blanks: [[0, 'wake up', ['wake up', 'go to bed', 'have lunch']], [2, 'Make your bed', ['Make your bed', 'Make a cake', 'Read your bed']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình gấp chăn mỗi sáng.', a: ['I', 'make', 'my bed', 'every morning.'], x: ['makes', 'night'] },
            { vi: 'Em muốn nói: Mình rửa mặt bằng nước mát.', a: ['I', 'wash', 'my face', 'with cold water.'], x: ['washes', 'teeth'] }
          ],
          talk: [
            { q: 'What time do you wake up?', vi: 'Bạn thức dậy lúc mấy giờ?', hint: "I wake up at six o'clock.", k: ['wake|get', "o'clock|oclock|six|seven|half|past|at"], c: ["I wake up at six o'clock.", 'I wake up at my bed.', "It's a toothbrush."] },
            { q: 'Do you make your bed every morning?', vi: 'Bạn có gấp chăn mỗi sáng không?', hint: 'Yes, I make my bed every morning.', k: ['yes|no|sometimes|always|usually', 'make|bed|it'], c: ['Yes, I make my bed every morning.', 'Yes, I eat my bed.', 'No, it is Tuesday blue.'] }
          ],
          snow: { vi: 'Kể về buổi sáng của em', l: [[['wake up'], 'thức dậy'], [['I', 'wake up', 'early.'], 'Mình dậy sớm.'], [['Every morning,', 'I', 'wake up', 'early', 'and make my bed.'], 'Mỗi sáng, mình dậy sớm và gấp chăn.']], x: ['wakes', 'night'] },
          cb: ['b', 'Minh, would you like to help me make your bed?', 'Minh ơi, con có muốn giúp mẹ gấp chăn không?', [
            ['yes', 'Sure, Mum! I can do it myself!', 'Vâng mẹ! Con tự làm được ạ!', 'Wow! What a big helper!', 'Oa! Con giỏi quá!', '🛏️'],
            ['idea', 'Can I wash my face first, please?', 'Con rửa mặt trước được không ạ?', 'Of course. Then make your bed!', 'Được chứ. Sau đó gấp chăn nhé!', '🧼']]],
          tb: ['b', 'Good morning! Did you sleep well?', 'Chào buổi sáng! Con ngủ ngon không?', [
            ['yes', 'Yes, I did! I feel great today!', 'Có ạ! Hôm nay con thấy khỏe lắm!', "Great! Let's have a happy day!", 'Tuyệt! Chúc con một ngày vui!', '🌞'],
            ['calm', 'Not really. I had a bad dream.', 'Không lắm ạ. Con gặp ác mộng.', "Oh dear! Come here, I'll give you a hug.", 'Ôi con! Lại đây mẹ ôm nào.', '🤗']]],
          fact: ['Your body grows the most while you are sleeping at night!', 'Cơ thể con lớn nhanh nhất khi con ngủ vào ban đêm đấy!'],
          tf: [
            ['You should brush your teeth for two minutes.', true, 'Yes! Two minutes keeps your teeth clean.', 'Đúng! Đánh răng hai phút giúp răng sạch.'],
            ['You make your bed with a toothbrush.', false, 'No! You make your bed with your hands. A toothbrush is for your teeth.', 'Sai! Con gấp chăn bằng tay. Bàn chải để đánh răng.']
          ],
          qa: ['What do you do after you wake up?', 'Bạn làm gì sau khi thức dậy?', 'I make my bed and wash my face.', ['make|wash|brush|get|have', 'bed|face|teeth|dressed|breakfast']]
        },
        {
          title: 'Ready for School', titleVi: 'Sẵn sàng đến trường', icon: '🎒',
          words: [
            ['pack my schoolbag', 'verb', '/pæk maɪ ˈskuːlbæɡ/', 'chuẩn bị cặp sách', '🎒', 'I pack my schoolbag the night before.', 'Mình chuẩn bị cặp sách từ tối hôm trước.', 'You put your books and pencil case into it before school.'],
            ['put on my shoes', 'verb', '/pʊt ɒn maɪ ʃuːz/', 'đi giày', '👟', 'I put on my shoes at the door.', 'Mình đi giày ở cửa.', 'You do this with your feet before you go outside.'],
            ['have breakfast', 'verb', '/hæv ˈbrekfəst/', 'ăn sáng', '🍳', 'I have breakfast with my family.', 'Mình ăn sáng cùng gia đình.', 'This is the first meal of the day.'],
            ['say goodbye', 'verb', '/seɪ ɡʊdˈbaɪ/', 'chào tạm biệt', '👋', 'I say goodbye to my mum and dad.', 'Mình chào tạm biệt bố mẹ.', 'You wave your hand when you leave.'],
            ['Have a nice day!', 'phrase', '/hæv ə naɪs deɪ/', 'Chúc một ngày tốt lành!', '🌈', 'Have a nice day at school!', 'Chúc con một ngày tốt lành ở trường!', 'A kind thing to say when someone leaves in the morning.']
          ],
          comic: {
            title: 'Where Is My Ruler?', titleVi: 'Thước kẻ của con đâu?',
            panels: [
              ['a', "Mum, I can't find my ruler!", 'Mẹ ơi, con không tìm thấy thước kẻ!', '📏'],
              ['b', 'Did you pack your schoolbag last night?', 'Tối qua con đã chuẩn bị cặp sách chưa?', '🎒'],
              ['a', 'Oops! Here it is, under my bed!', 'Ối! Nó đây rồi, dưới gầm giường!', '😅'],
              ['b', 'Put on your shoes, Minh. Have a nice day!', 'Con đi giày vào đi Minh. Chúc con một ngày tốt lành!', '👟']
            ],
            blanks: [[1, 'pack your schoolbag', ['pack your schoolbag', 'eat your schoolbag', 'wash your schoolbag']], [3, 'Have a nice day!', ['Have a nice day!', 'Good night!', 'Happy birthday!']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình chuẩn bị cặp sách từ tối hôm trước.', a: ['I', 'pack', 'my schoolbag', 'the night before.'], x: ['packs', 'shoes'] },
            { vi: 'Em muốn chào mẹ: Tạm biệt mẹ! Chúc mẹ một ngày tốt lành!', a: ['Goodbye, Mum!', 'Have', 'a nice day!'], x: ['Has', 'night'] }
          ],
          talk: [
            { q: 'What do you have for breakfast?', vi: 'Bạn ăn gì vào bữa sáng?', hint: 'I have bread and milk for breakfast.', k: ['have|eat|drink|usually', 'bread|milk|rice|noodles|pho|egg|eggs|cereal|fruit|banana|sticky'], c: ['I have bread and milk for breakfast.', 'I have breakfast in my shoes.', 'It is a schoolbag.'] },
            { q: 'Do you pack your schoolbag by yourself?', vi: 'Bạn có tự chuẩn bị cặp sách không?', hint: 'Yes, I pack it by myself.', k: ['yes|no|sometimes', 'pack|myself|it|mum|dad'], c: ['Yes, I pack it by myself.', 'Yes, my schoolbag is a banana.', 'No, I am breakfast.'] }
          ],
          snow: { vi: 'Kể về việc chuẩn bị đi học', l: [[['my schoolbag'], 'cặp sách của mình'], [['I', 'pack', 'my schoolbag.'], 'Mình chuẩn bị cặp sách.'], [['Every evening,', 'I', 'pack', 'my schoolbag', 'for the next day.'], 'Mỗi tối, mình chuẩn bị cặp sách cho ngày hôm sau.']], x: ['packs', 'shoes'] },
          cb: ['b', "Minh, it's raining. Do you want to take an umbrella?", 'Minh ơi, trời mưa rồi. Con có muốn mang ô không?', [
            ['yes', 'Yes, please! Thank you, Mum!', 'Có ạ! Con cảm ơn mẹ!', 'Here you are. Stay dry!', 'Của con đây. Đừng để bị ướt nhé!', '☂️'],
            ['idea', "How about my raincoat? It's easier.", 'Con mặc áo mưa được không ạ? Tiện hơn.', 'Good idea! Your raincoat is in the wardrobe.', 'Ý hay! Áo mưa ở trong tủ quần áo đó.', '🧥']]],
          tb: ['b', 'Goodbye, sweetie! Have a nice day!', 'Tạm biệt con yêu! Chúc con một ngày tốt lành!', [
            ['yes', 'Thank you, Mum! You too!', 'Con cảm ơn mẹ! Mẹ cũng vậy nhé!', 'Love you! See you this afternoon!', 'Mẹ thương con! Chiều gặp lại nhé!', '💖'],
            ['ask', "Can you pick me up at four o'clock?", 'Mẹ đón con lúc bốn giờ được không ạ?', "Sure! I'll wait at the school gate.", 'Được chứ! Mẹ sẽ đợi ở cổng trường.', '🏫']]],
          fact: ['Breakfast gives your brain energy to learn at school!', 'Bữa sáng cho bộ não năng lượng để học ở trường đấy!'],
          tf: [
            ['Breakfast is the first meal of the day.', true, 'Yes! We eat breakfast in the morning.', 'Đúng! Bữa sáng là bữa ăn đầu tiên trong ngày.'],
            ['You put on your shoes on your hands.', false, 'No! Shoes go on your feet.', 'Sai! Giày để đi ở chân.']
          ],
          qa: ['What did you have for breakfast today?', 'Hôm nay bạn đã ăn sáng món gì?', 'I had pho for breakfast.', ['had|have|ate|eat', 'pho|bread|milk|rice|noodles|egg|eggs|banh|sticky|cereal']]
        },
        {
          title: 'Bedtime Routine', titleVi: 'Thói quen trước khi ngủ', icon: '🌙',
          words: [
            ['take a shower', 'verb', '/teɪk ə ˈʃaʊə/', 'tắm vòi sen', '🚿', 'I take a shower after dinner.', 'Mình tắm sau bữa tối.', 'You stand under warm water and wash your body.'],
            ['put on my pyjamas', 'verb', '/pʊt ɒn maɪ pəˈdʒɑːməz/', 'mặc đồ ngủ', '🩳', "I put on my pyjamas at eight o'clock.", 'Mình mặc đồ ngủ lúc tám giờ.', 'You wear these soft clothes when you sleep.'],
            ['read a bedtime story', 'verb', '/riːd ə ˈbedtaɪm ˈstɔːri/', 'đọc truyện trước khi ngủ', '📖', 'My dad reads a bedtime story to me.', 'Bố đọc truyện cho mình nghe trước khi ngủ.', 'You open a book in bed before you sleep.'],
            ['turn off the light', 'verb', '/tɜːn ɒf ðə laɪt/', 'tắt đèn', '💡', 'Please turn off the light.', 'Con tắt đèn giúp mẹ nhé.', 'You press the switch and the room becomes dark.'],
            ['Good night!', 'phrase', '/ɡʊd naɪt/', 'Chúc ngủ ngon!', '🌙', 'Good night, Mum! Good night, Dad!', 'Chúc mẹ ngủ ngon! Chúc bố ngủ ngon!', 'You say this before you go to sleep.']
          ],
          comic: {
            title: 'One More Story!', titleVi: 'Thêm một truyện nữa!',
            panels: [
              ['a', 'Mum, I took a shower and put on my pyjamas.', 'Mẹ ơi, con tắm rồi và mặc đồ ngủ rồi.', '🚿'],
              ['b', "Good boy! Let's read a bedtime story.", 'Ngoan quá! Mình đọc truyện trước khi ngủ nhé.', '📖'],
              ['a', 'The end? One more story, please!', 'Hết rồi ạ? Thêm một truyện nữa đi mẹ!', '🙏'],
              ['b', 'Tomorrow! Now turn off the light. Good night!', 'Mai nhé! Giờ tắt đèn đi con. Chúc ngủ ngon!', '🌙']
            ],
            blanks: [[1, 'read a bedtime story', ['read a bedtime story', 'eat a bedtime story', 'wash a bedtime story']], [3, 'turn off the light', ['turn off the light', 'turn on the TV', 'make my bed']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình tắm sau bữa tối.', a: ['I', 'take', 'a shower', 'after dinner.'], x: ['takes', 'morning'] },
            { vi: 'Em muốn nhờ bố: Bố đọc truyện cho con được không ạ?', a: ['Can you', 'read', 'a bedtime story,', 'please?'], x: ['reads', 'Do'] }
          ],
          talk: [
            { q: 'What time do you go to bed?', vi: 'Bạn đi ngủ lúc mấy giờ?', hint: "I go to bed at nine o'clock.", k: ['bed|sleep', "o'clock|oclock|nine|ten|eight|half|past|at"], c: ["I go to bed at nine o'clock.", 'I go to bed in my shoes.', 'It is a bedtime story.'] },
            { q: 'Who reads you a bedtime story?', vi: 'Ai đọc truyện cho bạn trước khi ngủ?', hint: 'My mum reads me a bedtime story.', k: ['mum|mom|dad|mother|father|grandma|grandpa|sister|brother|myself|i', 'read|reads|story|stories'], c: ['My mum reads me a bedtime story.', 'My shoes read me a story.', 'I read the light.'] }
          ],
          snow: { vi: 'Kể về giờ đi ngủ', l: [[['Good night!'], 'Chúc ngủ ngon!'], [['I', 'go', 'to bed.'], 'Mình đi ngủ.'], [['After my bedtime story,', 'I', 'say', 'Good night', 'and turn off the light.'], 'Sau khi nghe truyện, mình chúc ngủ ngon và tắt đèn.']], x: ['goes', 'morning'] },
          cb: ['b', "It's nine o'clock. Time for bed, Minh!", 'Chín giờ rồi. Đến giờ đi ngủ rồi Minh!', [
            ['yes', 'Okay, Mum. Good night!', 'Vâng mẹ. Chúc mẹ ngủ ngon!', 'Good night, sweetie. Sweet dreams!', 'Ngủ ngon con yêu. Mơ đẹp nhé!', '🌙'],
            ['no', 'Can I finish my LEGO tower first, please?', 'Con lắp xong tháp LEGO đã được không ạ?', 'Five minutes only, then bed!', 'Chỉ năm phút thôi, rồi đi ngủ nhé!', '🧱']]],
          tb: ['b', 'Would you like a bedtime story tonight?', 'Tối nay con có muốn nghe truyện trước khi ngủ không?', [
            ['yes', 'Yes, please! A story about dinosaurs!', 'Có ạ! Truyện về khủng long ạ!', 'Roar! Once upon a time...', 'Gừm! Ngày xửa ngày xưa...', '🦖'],
            ['idea', 'No, thanks. Can I read it by myself?', 'Dạ thôi ạ. Con tự đọc được không?', "Wow! You're a big reader now!", 'Oa! Con thành người đọc giỏi rồi!', '📖']]],
          fact: ['Children aged nine need about ten hours of sleep every night.', 'Trẻ chín tuổi cần ngủ khoảng mười tiếng mỗi đêm.'],
          tf: [
            ['We turn off the light when we go to sleep.', true, 'Yes! A dark room helps you sleep well.', 'Đúng! Phòng tối giúp con ngủ ngon.'],
            ['You should play video games until midnight.', false, 'No! You should go to bed early.', 'Sai! Con nên đi ngủ sớm.']
          ],
          qa: ['What do you do before you go to bed?', 'Bạn làm gì trước khi đi ngủ?', 'I take a shower and brush my teeth.', ['shower|brush|read|wash|put|pyjamas', 'teeth|story|book|shower|face|pyjamas']]
        }
      ],
      mystery: {
        t: "Minh's Lost Thing", tv: 'Đồ vật thất lạc của Minh',
        intro: ['Minh is looking for something before bed. What is it?', 'Minh đang tìm một món đồ trước khi đi ngủ. Đó là gì?'],
        clues: [['Clue one: It is not in the bathroom.', 'Manh mối 1: Nó không ở trong phòng tắm.'],
          ["Clue two: You don't take it to school.", 'Manh mối 2: Bạn không mang nó đến trường.'],
          ['Clue three: You wear it when you sleep.', 'Manh mối 3: Bạn mặc nó khi đi ngủ.']],
        q: ['What is Minh looking for?', 'Minh đang tìm gì?'],
        o: [['a toothbrush', '🪥', 'bàn chải đánh răng'], ['a schoolbag', '🎒', 'cặp sách'], ['a blanket', '🛏️', 'cái chăn'], ['pyjamas', '🩳', 'đồ ngủ']], a: 3,
        win: ['Found them! The pyjamas were under the pillow!', 'Tìm thấy rồi! Bộ đồ ngủ ở dưới gối!']
      }
    },

    /* ---------- WEEK 2: Inside My Cozy Home ---------- */
    {
      id: 'w2', week: 2, month: 1, monthTitle: M1[0], monthTitleVi: M1[1],
      name: 'Inside My Cozy Home', vi: 'Ngôi nhà ấm áp của em', short: 'My Home',
      topic: 'Rooms, Furniture & a Tidy Home', topicVi: 'Các phòng, đồ đạc & nhà gọn gàng',
      color: '#DC2626', dark: '#991B1B', icon: '🏠', model: ['house', 'Family House', 'Ngôi nhà gia đình'],
      chars: { a: { name: 'Lily', fig: 'hair-blonde|grin|torso-stars|legs-blue|book' }, b: { name: 'Grandpa Joe', fig: 'none-hat|wink|torso-detective|legs-tan|book' } },
      chatter: [
        ['Welcome to my home!', 'Chào mừng đến nhà mình!'],
        ['The living room is big and bright.', 'Phòng khách rộng và sáng.'],
        ['Please keep your room tidy.', 'Hãy giữ phòng gọn gàng nhé.'],
        ['Turn off the lights when you go out.', 'Tắt đèn khi ra ngoài nhé.'],
        ['My bed is next to the window.', 'Giường của mình ở cạnh cửa sổ.']
      ],
      lessons: [
        {
          title: 'Rooms in My House', titleVi: 'Các phòng trong nhà', icon: '🏠',
          words: [
            ['living room', 'noun', '/ˈlɪvɪŋ ruːm/', 'phòng khách', '🛋️', 'We watch TV in the living room.', 'Nhà mình xem ti vi ở phòng khách.', 'Your family sits on the sofa and talks here.'],
            ['bedroom', 'noun', '/ˈbedruːm/', 'phòng ngủ', '🛏️', 'My bedroom is small but cozy.', 'Phòng ngủ của mình nhỏ nhưng ấm cúng.', 'You sleep in this room at night.'],
            ['kitchen', 'noun', '/ˈkɪtʃɪn/', 'nhà bếp', '🍳', 'Mum cooks dinner in the kitchen.', 'Mẹ nấu bữa tối trong bếp.', 'People cook food in this room.'],
            ['bathroom', 'noun', '/ˈbɑːθruːm/', 'phòng tắm', '🛁', 'I brush my teeth in the bathroom.', 'Mình đánh răng trong phòng tắm.', 'You take a shower in this room.'],
            ['garden', 'noun', '/ˈɡɑːdn/', 'khu vườn', '🌻', 'Grandpa waters the flowers in the garden.', 'Ông tưới hoa trong vườn.', 'Flowers and trees grow here, outside the house.']
          ],
          comic: {
            title: 'Hide and Seek at Home', titleVi: 'Trốn tìm trong nhà',
            panels: [
              ['b', 'Lily, where are you? Are you in the kitchen?', 'Lily ơi, cháu ở đâu? Cháu ở trong bếp à?', '🍳'],
              ['a', 'No, Grandpa! Try again!', 'Không phải ông ơi! Ông đoán lại đi!', '🙈'],
              ['b', 'Is she in the bathroom? No... The bedroom? No...', 'Cháu ở phòng tắm à? Không... Phòng ngủ à? Không...', '🛁'],
              ['a', "Surprise! I'm behind the sofa in the living room!", 'Bất ngờ chưa! Cháu ở sau ghế sofa trong phòng khách!', '🛋️']
            ],
            blanks: [[0, 'kitchen', ['kitchen', 'pencil', 'lunch box']], [3, 'living room', ['living room', 'school bus', 'birthday cake']]]
          },
          build: [
            { vi: 'Em muốn kể: Nhà mình xem ti vi ở phòng khách.', a: ['We', 'watch TV', 'in', 'the living room.'], x: ['watches', 'kitchen'] },
            { vi: 'Em muốn hỏi ông: Ông đang ở đâu ạ? Ông ở trong vườn à?', a: ['Where are you?', 'Are you', 'in the garden?'], x: ['Is', 'kitchens'] }
          ],
          talk: [
            { q: 'How many bedrooms are there in your house?', vi: 'Nhà bạn có mấy phòng ngủ?', hint: 'There are two bedrooms in my house.', k: ['there|have|has|is|are', 'one|two|three|four|bedroom|bedrooms'], c: ['There are two bedrooms in my house.', 'There are two kitchens in my bed.', 'My house is a banana.'] },
            { q: 'Where do you do your homework?', vi: 'Bạn làm bài tập ở đâu?', hint: 'I do my homework in my bedroom.', k: ['in|at|on', 'bedroom|living|kitchen|room|desk|table'], c: ['I do my homework in my bedroom.', 'I do my homework in the bathtub.', 'My homework is a garden.'] }
          ],
          snow: { vi: 'Giới thiệu căn phòng em yêu thích', l: [[['my bedroom'], 'phòng ngủ của mình'], [['I', 'love', 'my bedroom.'], 'Mình yêu phòng ngủ của mình.'], [['I', 'really love', 'my bedroom', 'because', 'it is cozy and quiet.'], 'Mình rất thích phòng ngủ vì nó ấm cúng và yên tĩnh.']], x: ['loves', 'kitchen'] },
          cb: ['b', "Lily, let's play hide and seek again!", 'Lily ơi, mình chơi trốn tìm nữa nhé!', [
            ['yes', "Yes! I'll hide in the garden this time!", 'Vâng! Lần này cháu trốn ngoài vườn!', 'Ready or not, here I come!', 'Dù sẵn sàng hay chưa, ông đến đây!', '🌻'],
            ['idea', 'How about a puzzle in the living room?', 'Hay mình chơi xếp hình ở phòng khách ạ?', "Good idea! Grandpa's legs are tired!", 'Ý hay! Chân ông mỏi rồi!', '🧩']]],
          tb: ['b', 'Which room do you like best in your house?', 'Cháu thích phòng nào nhất trong nhà?', [
            ['yes', 'I like my bedroom best! It has my LEGO!', 'Cháu thích phòng ngủ nhất! Có LEGO của cháu ở đó!', 'Of course! LEGO makes every room better!', 'Tất nhiên rồi! LEGO làm phòng nào cũng đẹp hơn!', '🧱'],
            ['calm', 'I like the kitchen because it smells good.', 'Cháu thích nhà bếp vì ở đó thơm lắm.', "Ha ha! You love Grandma's cooking!", 'Ha ha! Cháu mê món bà nấu rồi!', '🍲']]],
          fact: ['Houses in hot countries often have big windows to let the wind come in.', 'Nhà ở những nước nóng thường có cửa sổ lớn để gió thổi vào.'],
          tf: [
            ['We cook food in the kitchen.', true, 'Yes! The kitchen is for cooking.', 'Đúng! Nhà bếp là nơi nấu ăn.'],
            ['We take a shower in the living room.', false, 'No! We take a shower in the bathroom.', 'Sai! Mình tắm trong phòng tắm.']
          ],
          qa: ['What can you see in your living room?', 'Bạn thấy gì trong phòng khách nhà bạn?', 'I can see a sofa and a TV.', ['see|have|has|there', 'sofa|tv|table|lamp|chair|clock|picture|television']]
        },
        {
          title: 'Things in My Room', titleVi: 'Đồ đạc trong phòng', icon: '🪑',
          words: [
            ['desk', 'noun', '/desk/', 'bàn học', '📝', 'I do my homework at my desk.', 'Mình làm bài tập ở bàn học.', 'You sit here to write and draw.'],
            ['lamp', 'noun', '/læmp/', 'cái đèn bàn', '💡', 'My lamp is on the desk.', 'Đèn bàn của mình ở trên bàn học.', 'It gives you light when you read at night.'],
            ['wardrobe', 'noun', '/ˈwɔːdrəʊb/', 'tủ quần áo', '🚪', 'My clothes are in the wardrobe.', 'Quần áo của mình ở trong tủ.', 'You keep your clothes inside it.'],
            ['bookshelf', 'noun', '/ˈbʊkʃelf/', 'giá sách', '📚', 'There are many books on my bookshelf.', 'Có nhiều sách trên giá sách của mình.', 'You put your books on it.'],
            ['next to', 'prep', '/nekst tuː/', 'bên cạnh', '↔️', 'My bed is next to the window.', 'Giường của mình ở cạnh cửa sổ.', 'Very close, on the left or the right of something.']
          ],
          comic: {
            title: 'Where Is Teddy?', titleVi: 'Gấu bông đâu rồi?',
            panels: [
              ['a', "Grandpa, I can't find my teddy bear!", 'Ông ơi, cháu không tìm thấy gấu bông!', '🧸'],
              ['b', 'Is it on the bookshelf?', 'Nó có ở trên giá sách không?', '📚'],
              ['a', "No. It isn't on my desk, either.", 'Không ạ. Nó cũng không ở trên bàn học.', '📝'],
              ['b', "Look! It's in the wardrobe, next to your jacket!", 'Nhìn kìa! Nó ở trong tủ quần áo, cạnh áo khoác của cháu!', '🚪']
            ],
            blanks: [[1, 'bookshelf', ['bookshelf', 'bathtub', 'breakfast']], [3, 'next to', ['next to', 'eat to', 'sleep to']]]
          },
          build: [
            { vi: 'Em muốn tả: Giường của mình ở cạnh cửa sổ.', a: ['My bed', 'is', 'next to', 'the window.'], x: ['are', 'eat'] },
            { vi: 'Em muốn tả: Có nhiều sách trên giá sách của mình.', a: ['There are', 'many books', 'on', 'my bookshelf.'], x: ['There is', 'eat'] }
          ],
          talk: [
            { q: 'Where is your lamp?', vi: 'Đèn bàn của bạn ở đâu?', hint: "It's on my desk.", k: ["it's|its|it|is|on|next|in|under", 'desk|table|bed|bookshelf|room'], c: ["It's on my desk.", "It's in my breakfast.", 'It is a wardrobe dog.'] },
            { q: 'What is in your wardrobe?', vi: 'Trong tủ quần áo của bạn có gì?', hint: 'My clothes are in my wardrobe.', k: ['clothes|shirts|shirt|jacket|dress|trousers|uniform|t-shirts'], c: ['My clothes are in my wardrobe.', 'A car is in my wardrobe.', 'My wardrobe is in the sky.'] }
          ],
          snow: { vi: 'Tả vị trí đồ vật trong phòng', l: [[['the lamp'], 'cái đèn'], [['The lamp', 'is', 'on the desk.'], 'Đèn ở trên bàn học.'], [['My new lamp', 'is', 'on the desk', 'next to', 'my bookshelf.'], 'Cái đèn mới của mình ở trên bàn, cạnh giá sách.']], x: ['are', 'eat'] },
          cb: ['b', 'Lily, shall we put your new bookshelf next to the bed?', 'Lily ơi, mình đặt giá sách mới cạnh giường nhé?', [
            ['yes', 'Yes! Then I can read in bed!', 'Vâng! Như vậy cháu có thể đọc sách trên giường!', "Smart idea! Let's move it together.", 'Ý hay! Mình cùng chuyển nhé.', '📚'],
            ['idea', "How about next to my desk? It's better for homework.", 'Cạnh bàn học thì sao ạ? Tiện làm bài tập hơn.', "You're right! Next to the desk it is.", 'Cháu nói đúng! Vậy đặt cạnh bàn học.', '📝']]],
          tb: ['b', "Lily, can you bring me my glasses? They're on the bookshelf.", 'Lily ơi, mang giúp ông cặp kính nhé? Nó ở trên giá sách.', [
            ['yes', 'Sure, Grandpa! Here you are.', 'Vâng ông! Của ông đây ạ.', 'Thank you, sweetheart!', 'Cảm ơn cháu yêu!', '👓'],
            ['ask', 'Are they next to the red book?', 'Có phải nó ở cạnh quyển sách đỏ không ông?', 'Yes! Clever girl!', 'Đúng rồi! Cháu thông minh quá!', '📕']]],
          fact: ['Reading with a good lamp is better for your eyes.', 'Đọc sách dưới ánh đèn tốt giúp bảo vệ mắt của con.'],
          tf: [
            ['A wardrobe is for clothes.', true, 'Yes! We keep clothes in a wardrobe.', 'Đúng! Tủ quần áo để cất quần áo.'],
            ['We put books in the fridge.', false, 'No! We put books on a bookshelf.', 'Sai! Mình để sách trên giá sách.']
          ],
          qa: ['What is next to your bed?', 'Cạnh giường bạn có gì?', 'My lamp is next to my bed.', ['lamp|desk|window|table|wardrobe|bookshelf|door|chair', 'next|near|bed']]
        },
        {
          title: 'A Tidy Home', titleVi: 'Ngôi nhà gọn gàng', icon: '✨',
          words: [
            ['keep my room tidy', 'verb', '/kiːp maɪ ruːm ˈtaɪdi/', 'giữ phòng gọn gàng', '✨', 'I keep my room tidy every day.', 'Ngày nào mình cũng giữ phòng gọn gàng.', 'Everything is clean and in the right place.'],
            ['put away my toys', 'verb', '/pʊt əˈweɪ maɪ tɔɪz/', 'cất đồ chơi', '🧸', 'I put away my toys after playing.', 'Mình cất đồ chơi sau khi chơi xong.', 'You put your LEGO back in the box after playing.'],
            ['turn off the lights', 'verb', '/tɜːn ɒf ðə laɪts/', 'tắt đèn', '🔌', 'Turn off the lights when you go out.', 'Hãy tắt đèn khi ra ngoài.', 'You do this to save electricity.'],
            ['messy', 'adj', '/ˈmesi/', 'bừa bộn', '🌪️', "My brother's room is very messy!", 'Phòng của em trai mình bừa bộn quá!', 'Clothes and toys are everywhere on the floor.'],
            ['clean', 'adj', '/kliːn/', 'sạch sẽ', '🫧', 'My room is clean now.', 'Giờ phòng mình sạch sẽ rồi.', 'No dust, no rubbish, everything is nice.']
          ],
          comic: {
            title: 'The LEGO Monster', titleVi: 'Quái vật LEGO',
            panels: [
              ['b', 'Ouch! I stepped on a LEGO brick!', 'Ui da! Ông giẫm phải viên gạch LEGO!', '🧱'],
              ['a', 'Sorry, Grandpa! My room is messy.', 'Cháu xin lỗi ông! Phòng cháu bừa bộn quá.', '🌪️'],
              ['b', "Let's put away your toys together.", 'Mình cùng cất đồ chơi nhé.', '🧸'],
              ['a', "Done! My room is clean now. I'll keep it tidy!", 'Xong rồi! Giờ phòng cháu sạch rồi. Cháu sẽ giữ nó gọn gàng!', '✨']
            ],
            blanks: [[1, 'messy', ['messy', 'delicious', 'sleepy']], [2, 'put away your toys', ['put away your toys', 'eat your toys', 'wash your toys']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình cất đồ chơi sau khi chơi xong.', a: ['I', 'put away', 'my toys', 'after playing.'], x: ['puts', 'eat'] },
            { vi: 'Em muốn nhắc: Hãy tắt đèn khi bạn ra ngoài nhé.', a: ['Please', 'turn off', 'the lights', 'when you go out.'], x: ['turns', 'on'] }
          ],
          talk: [
            { q: 'Is your room messy or tidy?', vi: 'Phòng bạn bừa bộn hay gọn gàng?', hint: 'My room is tidy.', k: ['messy|tidy|clean|neat'], c: ['My room is tidy.', 'My room is a bus.', 'My room eats toys.'] },
            { q: 'What do you do after playing with LEGO?', vi: 'Bạn làm gì sau khi chơi LEGO?', hint: 'I put away my toys.', k: ['put|tidy|clean|keep', 'away|toys|lego|box|bricks|up'], c: ['I put away my toys.', 'I put my toys in the soup.', 'I turn off my LEGO.'] }
          ],
          snow: { vi: 'Nói về việc giữ phòng gọn gàng', l: [[['tidy'], 'gọn gàng'], [['My room', 'is', 'tidy.'], 'Phòng mình gọn gàng.'], [['Every evening,', 'I', 'put away', 'my toys', 'and keep my room tidy.'], 'Mỗi tối, mình cất đồ chơi và giữ phòng gọn gàng.']], x: ['messy', 'puts'] },
          cb: ['b', 'Lily, your room is messy. Can you tidy it now?', 'Lily ơi, phòng cháu bừa bộn quá. Cháu dọn ngay nhé?', [
            ['yes', "Okay, Grandpa! I'll do it right now!", 'Vâng ông! Cháu dọn ngay đây!', "Thank you! You're a tidy hero!", 'Cảm ơn cháu! Cháu là người hùng ngăn nắp!', '🦸'],
            ['idea', 'Can we play a tidy-up game? Who is faster?', 'Mình chơi trò thi dọn dẹp nhé? Ai nhanh hơn?', 'Ha ha! Ready, set, go!', 'Ha ha! Chuẩn bị, bắt đầu!', '⏱️']]],
          tb: ['b', 'Lily, you left the lights on in the bathroom.', 'Lily ơi, cháu để quên đèn sáng ở phòng tắm đấy.', [
            ['calm', "Oops! Sorry, I'll turn them off.", 'Ối! Cháu xin lỗi, cháu sẽ tắt ngay ạ.', 'Thank you! We must save electricity.', 'Cảm ơn cháu! Mình phải tiết kiệm điện.', '💡'],
            ['ask', 'Why do we turn off the lights, Grandpa?', 'Sao mình phải tắt đèn hả ông?', 'To save energy and help our Earth!', 'Để tiết kiệm năng lượng và bảo vệ Trái Đất!', '🌍']]],
          fact: ['Turning off one light can save energy for the whole planet!', 'Tắt một bóng đèn cũng giúp tiết kiệm năng lượng cho cả hành tinh!'],
          tf: [
            ['We should turn off the lights when we leave a room.', true, 'Yes! It saves electricity.', 'Đúng! Việc đó giúp tiết kiệm điện.'],
            ['A messy room is easy to clean.', false, 'No! A messy room takes a long time to clean.', 'Sai! Phòng bừa bộn mất nhiều thời gian để dọn.']
          ],
          qa: ['How do you keep your room tidy?', 'Bạn giữ phòng gọn gàng như thế nào?', 'I put away my toys and make my bed.', ['put|make|clean|tidy|sweep|fold', 'toys|bed|books|clothes|room|floor']]
        }
      ],
      mystery: {
        t: "Grandpa's Missing Hat", tv: 'Chiếc mũ thất lạc của ông',
        intro: ["Grandpa Joe can't find his hat. Which room is it in?", 'Ông Joe không tìm thấy chiếc mũ. Nó ở phòng nào?'],
        clues: [["Clue one: It isn't in the room where Mum cooks.", 'Manh mối 1: Nó không ở phòng mẹ nấu ăn.'],
          ["Clue two: It isn't in the bathroom.", 'Manh mối 2: Nó không ở trong phòng tắm.'],
          ['Clue three: It is on the sofa, next to the TV.', 'Manh mối 3: Nó ở trên ghế sofa, cạnh ti vi.']],
        q: ['Where is the hat?', 'Chiếc mũ ở đâu?'],
        o: [['in the kitchen', '🍳', 'trong bếp'], ['in the bathroom', '🛁', 'trong phòng tắm'], ['in the garden', '🌻', 'ngoài vườn'], ['in the living room', '🛋️', 'trong phòng khách']], a: 3,
        win: ["Hooray! Grandpa's hat was on the sofa!", 'Hoan hô! Mũ của ông ở trên ghế sofa!']
      }
    },

    /* ---------- WEEK 3: Helping My Parents ---------- */
    {
      id: 'w3', week: 3, month: 1, monthTitle: M1[0], monthTitleVi: M1[1],
      name: 'Helping My Parents', vi: 'Phụ giúp bố mẹ việc nhà', short: 'Housework',
      topic: 'Housework, Plants & Pets', topicVi: 'Việc nhà, chăm cây & thú cưng',
      color: '#0891B2', dark: '#155E75', icon: '🧹', model: ['kitchen', 'Busy Kitchen', 'Gian bếp nhộn nhịp'],
      chars: { a: { name: 'Tom', fig: 'cap-red|grin|torso-blue|legs-blue|none' }, b: { name: 'Dad', fig: 'hair-brown|smile|torso-chef|legs-black|wrench' } },
      chatter: [
        ['Can I help you, Dad?', 'Con giúp bố được không ạ?'],
        ['I wash the dishes after dinner.', 'Mình rửa bát sau bữa tối.'],
        ["Let's sweep the floor together!", 'Mình cùng quét nhà nào!'],
        ["Don't forget to feed the fish!", 'Đừng quên cho cá ăn nhé!'],
        ['Thank you for your help!', 'Cảm ơn con đã giúp đỡ!']
      ],
      lessons: [
        {
          title: 'Kitchen Helper', titleVi: 'Phụ bếp nhí', icon: '🍽️',
          words: [
            ['set the table', 'verb', '/set ðə ˈteɪbl/', 'bày bàn ăn (bát đũa)', '🍽️', 'I set the table before dinner.', 'Mình bày bát đũa trước bữa tối.', 'You put bowls, chopsticks and spoons on the table before a meal.'],
            ['cook rice', 'verb', '/kʊk raɪs/', 'nấu cơm', '🍚', 'Dad teaches me to cook rice.', 'Bố dạy mình nấu cơm.', 'You put rice and water in the rice cooker.'],
            ['wash the dishes', 'verb', '/wɒʃ ðə ˈdɪʃɪz/', 'rửa bát', '🧽', 'I wash the dishes after dinner.', 'Mình rửa bát sau bữa tối.', 'You clean bowls and plates with soap and water.'],
            ['clear the table', 'verb', '/klɪə ðə ˈteɪbl/', 'dọn bàn sau bữa ăn', '🧺', 'We clear the table after lunch.', 'Nhà mình dọn bàn sau bữa trưa.', 'You take the dirty bowls away after a meal.'],
            ['Can I help you?', 'phrase', '/kæn aɪ help juː/', 'Con/Mình giúp bạn được không?', '🙋', 'Can I help you, Dad?', 'Con giúp bố được không ạ?', 'A kind question when someone is busy.']
          ],
          comic: {
            title: 'Dinner Time Helpers', titleVi: 'Những người phụ bếp',
            panels: [
              ['a', "Dad, you're busy. Can I help you?", 'Bố ơi, bố đang bận. Con giúp bố được không ạ?', '🙋'],
              ['b', 'Yes, please! Can you set the table?', 'Có chứ! Con bày bát đũa giúp bố nhé?', '🍽️'],
              ['a', 'Bowls, chopsticks, spoons... Done!', 'Bát, đũa, thìa... Xong rồi ạ!', '🥢'],
              ['b', "Great! After dinner, we'll wash the dishes together.", 'Giỏi lắm! Sau bữa tối, hai bố con mình cùng rửa bát nhé.', '🧽']
            ],
            blanks: [[0, 'Can I help you?', ['Can I help you?', 'Can I eat you?', 'Are you a dish?']], [1, 'set the table', ['set the table', 'eat the table', 'sleep the table']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình rửa bát sau bữa tối.', a: ['I', 'wash', 'the dishes', 'after dinner.'], x: ['washes', 'eat'] },
            { vi: 'Em muốn hỏi bố: Con giúp bố nấu cơm được không ạ?', a: ['Can I', 'help you', 'cook rice,', 'Dad?'], x: ['Do', 'cooks'] }
          ],
          talk: [
            { q: 'Do you help your parents in the kitchen?', vi: 'Bạn có giúp bố mẹ trong bếp không?', hint: 'Yes, I set the table.', k: ['yes|no|sometimes|always|usually', 'set|wash|cook|clear|help|table|dishes|rice'], c: ['Yes, I set the table.', 'Yes, I cook my shoes.', 'No, the kitchen is a bus.'] },
            { q: 'Who washes the dishes in your family?', vi: 'Ai rửa bát trong gia đình bạn?', hint: 'My mum and I wash the dishes.', k: ['mum|mom|dad|i|me|brother|sister|grandma|grandpa|we|everyone', 'wash|washes|dishes'], c: ['My mum and I wash the dishes.', 'The dishes wash my cat.', 'I wash the moon.'] }
          ],
          snow: { vi: 'Kể việc em giúp bố mẹ', l: [[['the dishes'], 'bát đĩa'], [['I', 'wash', 'the dishes.'], 'Mình rửa bát.'], [['After dinner,', 'I', 'help my dad', 'wash the dishes', 'in the kitchen.'], 'Sau bữa tối, mình giúp bố rửa bát trong bếp.']], x: ['washes', 'eat'] },
          cb: ['b', 'Tom, the rice is ready. Can you call everyone for dinner?', 'Tom ơi, cơm chín rồi. Con gọi cả nhà ăn cơm nhé?', [
            ['yes', 'Sure! Dinner is ready, everyone!', 'Vâng ạ! Cả nhà ơi, ăn cơm thôi!', 'Thank you! What a loud voice!', 'Cảm ơn con! Giọng to ghê!', '📣'],
            ['ask', 'Can I carry the soup to the table, too?', 'Con bưng nồi canh ra bàn luôn được không ạ?', "It's hot. Let me carry it. You bring the spoons!", 'Nóng lắm. Để bố bưng. Con mang thìa nhé!', '🥄']]],
          tb: ['b', 'Tom, can you wash the dishes tonight?', 'Tom ơi, tối nay con rửa bát được không?', [
            ['yes', "No problem, Dad! I'll do it after dinner.", 'Không vấn đề gì bố ạ! Con sẽ rửa sau bữa tối.', "Thank you, Tom! You're very helpful!", 'Cảm ơn Tom! Con giỏi giúp việc lắm!', '🧽'],
            ['no', 'I have a lot of homework. Can I clear the table instead?', 'Con có nhiều bài tập quá. Con dọn bàn thay được không ạ?', "Okay! That's a good deal.", 'Được! Thỏa thuận hay đấy.', '🤝']]],
          fact: ['Rice grows in wet fields called paddy fields.', 'Lúa được trồng ở những cánh đồng ngập nước gọi là ruộng lúa.'],
          tf: [
            ['We use soap and water to wash the dishes.', true, 'Yes! Soap helps remove the oil.', 'Đúng! Xà phòng giúp làm sạch dầu mỡ.'],
            ['We set the table after we finish eating.', false, 'No! We set the table before a meal and clear it after.', 'Sai! Mình bày bàn trước bữa ăn và dọn bàn sau khi ăn.']
          ],
          qa: ['How do you help your parents at home?', 'Bạn giúp bố mẹ việc nhà như thế nào?', 'I wash the dishes and set the table.', ['wash|set|sweep|clean|cook|fold|feed|water|clear|help', 'dishes|table|floor|rice|clothes|fish|plants|room']]
        },
        {
          title: 'Cleaning Day', titleVi: 'Ngày tổng vệ sinh', icon: '🧹',
          words: [
            ['sweep the floor', 'verb', '/swiːp ðə flɔː/', 'quét nhà', '✨', 'I sweep the floor on Sundays.', 'Mình quét nhà vào Chủ nhật.', 'You use a broom to make the floor clean.'],
            ['mop the floor', 'verb', '/mɒp ðə flɔː/', 'lau nhà', '🪣', 'Dad mops the floor with water.', 'Bố lau nhà bằng nước.', 'You use water and a mop after sweeping.'],
            ['fold the clothes', 'verb', '/fəʊld ðə kləʊðz/', 'gấp quần áo', '👕', 'I fold the clothes and put them away.', 'Mình gấp quần áo và cất đi.', 'You make your T-shirts neat and small before you put them in the wardrobe.'],
            ['take out the rubbish', 'verb', '/teɪk aʊt ðə ˈrʌbɪʃ/', 'đổ rác', '🗑️', 'My brother takes out the rubbish every evening.', 'Anh trai mình đổ rác mỗi tối.', 'You carry the bin bag outside the house.'],
            ['broom', 'noun', '/bruːm/', 'cái chổi', '🧹', 'Where is the broom?', 'Cái chổi ở đâu nhỉ?', 'You hold this long thing to sweep the floor.']
          ],
          comic: {
            title: 'Super Cleaning Team', titleVi: 'Đội dọn dẹp siêu đẳng',
            panels: [
              ['b', "It's Sunday! Let's clean the house together.", 'Chủ nhật rồi! Cả nhà mình cùng dọn nhà nhé.', '🏠'],
              ['a', "I'll sweep the floor with the broom!", 'Con sẽ quét nhà bằng chổi!', '🧹'],
              ['b', "Great! I'll mop the floor after you.", 'Tuyệt! Bố sẽ lau nhà sau con.', '🪣'],
              ['a', 'And now we can fold the clothes. Teamwork!', 'Và giờ mình gấp quần áo. Làm việc nhóm nào!', '👕']
            ],
            blanks: [[1, 'sweep the floor', ['sweep the floor', 'sweep the sky', 'eat the floor']], [3, 'fold the clothes', ['fold the clothes', 'fold the rice', 'cook the clothes']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình quét nhà vào Chủ nhật.', a: ['I', 'sweep', 'the floor', 'on Sundays.'], x: ['sweeps', 'eat'] },
            { vi: 'Em muốn nhờ anh: Anh đổ rác giúp em được không?', a: ['Can you', 'take out', 'the rubbish,', 'please?'], x: ['takes', 'in'] }
          ],
          talk: [
            { q: 'What housework do you do on Sundays?', vi: 'Bạn làm việc nhà gì vào Chủ nhật?', hint: 'I sweep the floor and fold the clothes.', k: ['sweep|mop|fold|wash|clean|tidy|take', 'floor|clothes|dishes|room|rubbish|house'], c: ['I sweep the floor and fold the clothes.', 'I sweep the clouds.', 'Sunday is a broom.'] },
            { q: 'Where is the broom?', vi: 'Cái chổi ở đâu?', hint: "It's behind the door.", k: ["it's|its|it|is", 'behind|next|in|under|on|kitchen|door|corner'], c: ["It's behind the door.", "It's in my soup.", 'The broom is Monday.'] }
          ],
          snow: { vi: 'Kể về ngày dọn nhà', l: [[['the floor'], 'sàn nhà'], [['I', 'sweep', 'the floor.'], 'Mình quét nhà.'], [['On Sundays,', 'I', 'sweep', 'the floor', 'with a big broom.'], 'Vào Chủ nhật, mình quét nhà bằng cây chổi to.']], x: ['sweeps', 'eat'] },
          cb: ['b', 'Tom, the rubbish bin is full. Can you take out the rubbish?', 'Tom ơi, thùng rác đầy rồi. Con đổ rác giúp bố nhé?', [
            ['yes', 'Sure, Dad! Where is the bin bag?', 'Vâng bố! Túi rác ở đâu ạ?', "It's under the sink. Thank you!", 'Ở dưới bồn rửa. Cảm ơn con!', '🗑️'],
            ['ask', 'Should I put the plastic and the paper in different bins?', 'Con có nên bỏ nhựa và giấy vào các thùng khác nhau không ạ?', "Yes! Great thinking. Let's recycle!", 'Đúng rồi! Nghĩ hay lắm. Mình tái chế nhé!', '♻️']]],
          tb: ['b', 'Wow, the house is so clean! Who swept the floor?', 'Oa, nhà sạch quá! Ai quét nhà thế?', [
            ['yes', 'I did! I swept it all by myself!', 'Con đấy ạ! Con tự quét hết luôn!', "You're amazing! High five!", 'Con giỏi quá! Đập tay nào!', '🙌'],
            ['calm', 'My sister and I did it together.', 'Em gái và con cùng quét ạ.', 'Great teamwork! Thank you both!', 'Làm việc nhóm tuyệt vời! Cảm ơn cả hai con!', '🤝']]],
          fact: ['Dust is made of tiny bits of skin, hair and dirt!', 'Bụi được tạo thành từ những mảnh da, tóc và đất rất nhỏ!'],
          tf: [
            ['We use a broom to sweep the floor.', true, 'Yes! A broom makes the floor clean.', 'Đúng! Cái chổi giúp sàn nhà sạch.'],
            ['We fold the clothes and put them in the fridge.', false, 'No! We put folded clothes in the wardrobe.', 'Sai! Mình cất quần áo đã gấp vào tủ quần áo.']
          ],
          qa: ['Do you fold your clothes by yourself?', 'Bạn có tự gấp quần áo không?', 'Yes, I fold my clothes by myself.', ['yes|no|sometimes|usually|always', 'fold|clothes|myself|mum|dad']]
        },
        {
          title: 'Caring for Plants & Pets', titleVi: 'Chăm cây & thú cưng', icon: '🐠',
          words: [
            ['feed the fish', 'verb', '/fiːd ðə fɪʃ/', 'cho cá ăn', '🐠', 'I feed the fish every morning.', 'Sáng nào mình cũng cho cá ăn.', 'You give a little food to the animals in the fish tank.'],
            ['water the plants', 'verb', '/ˈwɔːtə ðə plɑːnts/', 'tưới cây', '🪴', 'I water the plants on the balcony.', 'Mình tưới cây ngoài ban công.', 'You give plants a drink with a watering can.'],
            ['walk the dog', 'verb', '/wɔːk ðə dɒɡ/', 'dắt chó đi dạo', '🐕', 'My dad and I walk the dog in the park.', 'Bố và mình dắt chó đi dạo ở công viên.', 'You go outside with your pet and its lead.'],
            ['take care of', 'verb', '/teɪk keər ɒv/', 'chăm sóc', '🤲', 'I take care of my cat.', 'Mình chăm sóc con mèo của mình.', 'You give food, water and love to someone.'],
            ['pet', 'noun', '/pet/', 'thú cưng', '🐱', 'Do you have a pet?', 'Bạn có nuôi thú cưng không?', 'An animal that lives with your family at home.']
          ],
          comic: {
            title: 'Too Much Food!', titleVi: 'Nhiều thức ăn quá!',
            panels: [
              ['a', 'Dad, the fish look hungry. Can I feed the fish?', 'Bố ơi, mấy con cá trông đói quá. Con cho cá ăn nhé?', '🐠'],
              ['b', 'Yes, but only a little food, please.', 'Được, nhưng chỉ một chút thức ăn thôi nhé.', '🤏'],
              ['a', 'Oops! I gave them too much!', 'Ối! Con cho ăn nhiều quá rồi!', '😱'],
              ['b', "Don't worry. Let's clean the water and take care of them.", 'Đừng lo. Mình thay nước và chăm sóc chúng nhé.', '🫧']
            ],
            blanks: [[0, 'feed the fish', ['feed the fish', 'feed the rice', 'wash the fish']], [3, 'take care of', ['take care of', 'take a shower', 'take out']]]
          },
          build: [
            { vi: 'Em muốn kể: Sáng nào mình cũng cho cá ăn.', a: ['I', 'feed', 'the fish', 'every morning.'], x: ['feeds', 'night'] },
            { vi: 'Em muốn hỏi bạn: Bạn có nuôi thú cưng không?', a: ['Do you', 'have', 'a pet?'], x: ['Does', 'has'] }
          ],
          talk: [
            { q: 'Do you have a pet?', vi: 'Bạn có nuôi thú cưng không?', hint: 'Yes, I have a cat.', k: ['yes|no|have|has|got', 'cat|dog|fish|bird|rabbit|hamster|pet|turtle|no'], c: ['Yes, I have a cat.', 'Yes, I have a cloud.', 'My pet is a Tuesday.'] },
            { q: 'Who waters the plants in your house?', vi: 'Ai tưới cây trong nhà bạn?', hint: 'My grandma waters the plants.', k: ['mum|mom|dad|grandma|grandpa|i|me|brother|sister|we', 'water|waters|plants'], c: ['My grandma waters the plants.', 'The plants water my grandma.', 'I water the television.'] }
          ],
          snow: { vi: 'Kể về việc chăm thú cưng', l: [[['my cat'], 'con mèo của mình'], [['I', 'feed', 'my cat.'], 'Mình cho mèo ăn.'], [['Every day,', 'I', 'feed', 'my cat', 'and give her fresh water.'], 'Mỗi ngày, mình cho mèo ăn và cho nó nước sạch.']], x: ['feeds', 'plants'] },
          cb: ['b', 'Tom, the plants look dry. What should we do?', 'Tom ơi, cây trông khô quá. Mình nên làm gì nhỉ?', [
            ['calm', "Let's water the plants!", 'Mình tưới cây đi bố!', "Yes! Here's the watering can.", 'Đúng rồi! Bình tưới đây.', '🪴'],
            ['ask', 'Do plants need water every day?', 'Cây có cần tưới nước mỗi ngày không bố?', 'Most plants do, but not too much!', 'Hầu hết là có, nhưng đừng tưới quá nhiều!', '💧']]],
          tb: ['b', 'Our neighbour asked us to walk her dog. Do you want to come?', 'Cô hàng xóm nhờ mình dắt chó đi dạo. Con có muốn đi cùng không?', [
            ['yes', "Yes! I love dogs! Let's go to the park!", 'Có ạ! Con thích chó lắm! Mình ra công viên nhé!', 'Okay! Hold the lead carefully.', 'Được! Cầm dây dắt cẩn thận nhé.', '🐕'],
            ['no', "Sorry, Dad. I'm a little scared of big dogs.", 'Con xin lỗi bố. Con hơi sợ chó to.', "That's okay. You can feed the fish instead.", 'Không sao. Con cho cá ăn thay nhé.', '🐠']]],
          fact: ['A goldfish can remember things for months, not just three seconds!', 'Cá vàng có thể nhớ mọi thứ trong nhiều tháng, không phải chỉ ba giây đâu!'],
          tf: [
            ['Plants need water to live.', true, 'Yes! Plants drink water through their roots.', 'Đúng! Cây uống nước qua rễ.'],
            ['You should give your fish a lot of food every hour.', false, 'No! Too much food makes the water dirty.', 'Sai! Cho ăn quá nhiều làm nước bẩn.']
          ],
          qa: ['How do you take care of your pet or your plants?', 'Bạn chăm sóc thú cưng hoặc cây cối như thế nào?', 'I feed my fish and water the plants.', ['feed|water|walk|clean|give|play', 'fish|plants|dog|cat|pet|bird|water']]
        }
      ],
      mystery: {
        t: "Tom's Secret Chore", tv: 'Việc nhà bí mật của Tom',
        intro: ['Tom did one chore to surprise his dad. Which one?', 'Tom làm một việc nhà để làm bố bất ngờ. Đó là việc gì?'],
        clues: [["Clue one: He didn't use any water.", 'Manh mối 1: Bạn ấy không dùng chút nước nào.'],
          ["Clue two: He didn't give food to an animal.", 'Manh mối 2: Bạn ấy không cho con vật nào ăn.'],
          ['Clue three: He used a long broom.', 'Manh mối 3: Bạn ấy dùng một cây chổi dài.']],
        q: ['What did Tom do?', 'Tom đã làm gì?'],
        o: [['wash the dishes', '🧽', 'rửa bát'], ['water the plants', '🪴', 'tưới cây'], ['feed the fish', '🐠', 'cho cá ăn'], ['sweep the floor', '🧹', 'quét nhà']], a: 3,
        win: ['Yes! Tom swept the floor. The house is shiny!', 'Đúng rồi! Tom đã quét nhà. Nhà sạch bóng!']
      }
    },

    /* ---------- WEEK 4: My Family & Feelings ---------- */
    {
      id: 'w4', week: 4, month: 1, monthTitle: M1[0], monthTitleVi: M1[1],
      name: 'My Family & Feelings', vi: 'Gia đình & Cảm xúc của em', short: 'Family',
      topic: 'Family, Appearance & Feelings', topicVi: 'Gia đình, ngoại hình & cảm xúc',
      color: '#DB2777', dark: '#9D174D', icon: '👨‍👩‍👧', model: ['picnic', 'Family Picnic', 'Dã ngoại gia đình'],
      chars: { a: { name: 'Mai', fig: 'hair-brown|smile|torso-red|legs-blue|book' }, b: { name: 'Grandma Hoa', fig: 'hair-blonde|wink|torso-stars|legs-white|book' } },
      chatter: [
        ['This is my family!', 'Đây là gia đình mình!'],
        ['My grandma tells funny stories.', 'Bà mình kể chuyện rất vui.'],
        ['How are you feeling today?', 'Hôm nay con thấy thế nào?'],
        ["I'm happy because it's the weekend!", 'Mình vui vì là cuối tuần!'],
        ['I love my family very much.', 'Mình rất yêu gia đình mình.']
      ],
      lessons: [
        {
          title: 'My Family Tree', titleVi: 'Cây gia đình', icon: '🌳',
          words: [
            ['grandparents', 'noun', '/ˈɡrænpeərənts/', 'ông bà', '👴', 'My grandparents live in the countryside.', 'Ông bà mình sống ở quê.', "Your mum's or dad's mother and father."],
            ['aunt', 'noun', '/ɑːnt/', 'cô, dì, bác gái', '👩', 'My aunt is a teacher.', 'Cô của mình là giáo viên.', "Your mum's or dad's sister."],
            ['uncle', 'noun', '/ˈʌŋkl/', 'chú, cậu, bác trai', '👨', 'My uncle can play the guitar.', 'Chú của mình biết chơi đàn ghi-ta.', "Your mum's or dad's brother."],
            ['cousin', 'noun', '/ˈkʌzn/', 'anh chị em họ', '🧒', 'My cousin and I play football together.', 'Mình và em họ cùng chơi bóng đá.', "Your aunt's or uncle's child."],
            ['baby brother', 'noun', '/ˈbeɪbi ˈbrʌðə/', 'em trai nhỏ', '👶', 'My baby brother is one year old.', 'Em trai nhỏ của mình một tuổi.', 'A very young boy in your family.']
          ],
          comic: {
            title: 'Family Photo Day', titleVi: 'Ngày xem ảnh gia đình',
            panels: [
              ['b', "Mai, let's look at our family photo!", 'Mai ơi, mình xem ảnh gia đình nhé!', '🖼️'],
              ['a', 'Who is this, Grandma? Is he my uncle?', 'Ai đây hả bà? Có phải chú của cháu không ạ?', '👨'],
              ['b', 'Yes! And this is your aunt and your cousin, Bin.', 'Đúng rồi! Còn đây là cô và em họ Bin của cháu.', '👩'],
              ['a', 'And the baby is my baby brother! So cute!', 'Còn em bé là em trai nhỏ của cháu! Dễ thương quá!', '👶']
            ],
            blanks: [[1, 'uncle', ['uncle', 'umbrella', 'onion']], [2, 'cousin', ['cousin', 'kitchen', 'cushion']]]
          },
          build: [
            { vi: 'Em muốn kể: Ông bà mình sống ở quê.', a: ['My grandparents', 'live', 'in', 'the countryside.'], x: ['lives', 'eat'] },
            { vi: 'Em muốn giới thiệu: Đây là em họ của mình. Tên bạn ấy là Bin.', a: ['This is', 'my cousin.', 'His name', 'is Bin.'], x: ['These are', 'Her'] }
          ],
          talk: [
            { q: 'How many people are there in your family?', vi: 'Gia đình bạn có mấy người?', hint: 'There are four people in my family.', k: ['there|are|have|is', 'two|three|four|five|six|seven|people'], c: ['There are four people in my family.', 'There are four dogs in my soup.', 'My family is a pencil.'] },
            { q: 'Do you have any cousins?', vi: 'Bạn có anh chị em họ không?', hint: 'Yes, I have three cousins.', k: ['yes|no|have|got', 'cousin|cousins|one|two|three|four|five'], c: ['Yes, I have three cousins.', 'Yes, my cousin is a kitchen.', 'No, I am Monday.'] }
          ],
          snow: { vi: 'Giới thiệu người thân', l: [[['my uncle'], 'chú của mình'], [['This', 'is', 'my uncle.'], 'Đây là chú của mình.'], [['This', 'is', 'my uncle.', 'He', 'can play the guitar very well.'], 'Đây là chú của mình. Chú chơi đàn ghi-ta rất giỏi.']], x: ['are', 'aunt'] },
          cb: ['b', 'Mai, your cousins are coming this weekend. Are you happy?', 'Mai ơi, cuối tuần này các anh chị em họ của cháu sẽ đến chơi. Cháu vui không?', [
            ['yes', "Yes! I can't wait to play with them!", 'Có ạ! Cháu nóng lòng được chơi với họ!', "Let's make some cakes for them!", 'Mình làm bánh cho các anh chị nhé!', '🍰'],
            ['ask', 'Is my baby cousin coming too?', 'Em họ bé xíu cũng đến ạ?', 'Yes! Be gentle with the baby.', 'Có! Nhẹ nhàng với em bé nhé.', '👶']]],
          tb: ['b', 'Tell me about your family, Mai.', 'Kể cho bà nghe về gia đình cháu đi Mai.', [
            ['yes', 'There are four people: my parents, my brother and me!', 'Có bốn người: bố mẹ, em trai và cháu!', 'What a lovely family!', 'Một gia đình thật đáng yêu!', '👨‍👩‍👧‍👦'],
            ['calm', 'I live with my mum and my grandma.', 'Cháu sống với mẹ và bà.', 'A small family with a big heart!', 'Gia đình nhỏ nhưng trái tim lớn!', '💖']]],
          fact: ['Your cousins share some of the same grandparents as you!', 'Anh chị em họ có chung ông bà với con đấy!'],
          tf: [
            ["Your aunt is your mum's or dad's sister.", true, 'Yes! An aunt is a sister of your parent.', 'Đúng! Cô/dì là chị em gái của bố hoặc mẹ.'],
            ['Your grandparents are younger than you.', false, 'No! Grandparents are much older than you.', 'Sai! Ông bà lớn tuổi hơn con rất nhiều.']
          ],
          qa: ['Who do you live with?', 'Bạn sống cùng với ai?', 'I live with my parents and my sister.', ['live|with', 'mum|mom|dad|parents|sister|brother|grandma|grandpa|grandparents|family']]
        },
        {
          title: 'What Do They Look Like?', titleVi: 'Họ trông như thế nào?', icon: '👓',
          words: [
            ['tall', 'adj', '/tɔːl/', 'cao', '🦒', 'My dad is very tall.', 'Bố mình rất cao.', 'The opposite of short. Like a giraffe!'],
            ['short', 'adj', '/ʃɔːt/', 'thấp, ngắn', '📏', 'My grandma is short.', 'Bà mình thấp.', 'Small from your head to your feet.'],
            ['curly hair', 'noun', '/ˈkɜːli heə/', 'tóc xoăn', '👩‍🦱', 'My aunt has curly hair.', 'Cô mình có mái tóc xoăn.', 'Hair that is not straight, with lots of circles.'],
            ['glasses', 'noun', '/ˈɡlɑːsɪz/', 'kính mắt', '👓', 'My grandpa wears glasses.', 'Ông mình đeo kính.', 'You wear them on your nose to see better.'],
            ['kind', 'adj', '/kaɪnd/', 'tốt bụng', '💖', 'My teacher is kind and friendly.', 'Cô giáo mình tốt bụng và thân thiện.', 'A person who is nice and helps others.']
          ],
          comic: {
            title: 'Find Uncle Nam!', titleVi: 'Tìm chú Nam!',
            panels: [
              ['b', 'Mai, we must find Uncle Nam at the airport.', 'Mai ơi, mình phải tìm chú Nam ở sân bay.', '✈️'],
              ['a', 'What does he look like, Grandma?', 'Chú ấy trông như thế nào hả bà?', '🤔'],
              ['b', 'He is tall and he wears glasses.', 'Chú ấy cao và đeo kính.', '👓'],
              ['a', 'Look! A tall man with glasses and curly hair! Uncle Nam!', 'Nhìn kìa! Một người cao, đeo kính và tóc xoăn! Chú Nam!', '🤗']
            ],
            blanks: [[2, 'tall', ['tall', 'tired', 'tasty']], [3, 'curly hair', ['curly hair', 'curly rice', 'cold hair']]]
          },
          build: [
            { vi: 'Em muốn tả: Bố mình rất cao.', a: ['My dad', 'is', 'very', 'tall.'], x: ['are', 'eat'] },
            { vi: 'Em muốn tả: Cô mình có mái tóc xoăn và đeo kính.', a: ['My aunt', 'has', 'curly hair', 'and wears glasses.'], x: ['have', 'eats'] }
          ],
          talk: [
            { q: 'What does your best friend look like?', vi: 'Bạn thân của bạn trông như thế nào?', hint: 'She is short and she has long hair.', k: ['tall|short|long|curly|straight|hair|glasses|big|small|thin|eyes'], c: ['She is short and she has long hair.', 'She is a banana with glasses.', 'My friend is Tuesday.'] },
            { q: 'Who is the tallest in your family?', vi: 'Ai cao nhất trong gia đình bạn?', hint: 'My dad is the tallest.', k: ['dad|mum|mom|father|mother|brother|sister|grandpa|uncle|i|me', 'tallest|tall'], c: ['My dad is the tallest.', 'The tallest is my shoe.', 'My family is very curly.'] }
          ],
          snow: { vi: 'Tả ngoại hình người thân', l: [[['glasses'], 'kính mắt'], [['Grandpa', 'wears', 'glasses.'], 'Ông đeo kính.'], [['My grandpa', 'is tall,', 'and he', 'wears', 'big round glasses.'], 'Ông mình cao, và ông đeo cặp kính tròn to.']], x: ['wear', 'eats'] },
          cb: ['b', 'Mai, do you like my new glasses?', 'Mai ơi, cháu thấy kính mới của bà thế nào?', [
            ['yes', 'Yes! You look very smart, Grandma!', 'Đẹp ạ! Bà trông rất sành điệu!', "Thank you, darling! You're so kind!", 'Cảm ơn cháu yêu! Cháu tốt bụng quá!', '😎'],
            ['idea', "They're nice! But I like the red ones better.", 'Đẹp ạ! Nhưng cháu thích cặp màu đỏ hơn.', "Ha ha! Maybe I'll buy those next time!", 'Ha ha! Có lẽ lần sau bà mua cặp đó!', '👓']]],
          tb: ['b', 'Who is the kindest person in your class?', 'Ai là người tốt bụng nhất lớp cháu?', [
            ['yes', 'My friend Lan! She always helps me!', 'Bạn Lan ạ! Bạn ấy luôn giúp cháu!', 'Wonderful! A kind friend is a treasure.', 'Tuyệt vời! Một người bạn tốt là một kho báu.', '💎'],
            ['calm', 'My teacher. She is kind and patient.', 'Cô giáo ạ. Cô tốt bụng và kiên nhẫn.', 'Teachers are amazing people!', 'Thầy cô là những người tuyệt vời!', '👩‍🏫']]],
          fact: ['Glasses help light focus on the back of your eyes, so you can see clearly.', 'Kính giúp ánh sáng tập trung vào đáy mắt để con nhìn rõ hơn.'],
          tf: [
            ['A giraffe is very tall.', true, 'Yes! Giraffes are the tallest animals.', 'Đúng! Hươu cao cổ là loài vật cao nhất.'],
            ['People wear glasses on their feet.', false, 'No! We wear glasses on our nose, in front of our eyes.', 'Sai! Mình đeo kính trên mũi, trước mắt.']
          ],
          qa: ['What does your mum look like?', 'Mẹ bạn trông như thế nào?', 'My mum is tall and she has long hair.', ['tall|short|long|curly|straight|hair|glasses|beautiful|pretty|kind|eyes']]
        },
        {
          title: 'How Are You Feeling?', titleVi: 'Con đang cảm thấy thế nào?', icon: '😊',
          words: [
            ['happy', 'adj', '/ˈhæpi/', 'vui vẻ', '😊', 'I am happy when I play with my friends.', 'Mình vui khi chơi với bạn bè.', 'You smile and laugh when you feel this.'],
            ['sad', 'adj', '/sæd/', 'buồn', '😢', 'I feel sad when my friend is sick.', 'Mình buồn khi bạn bị ốm.', 'You may cry when you feel this.'],
            ['angry', 'adj', '/ˈæŋɡri/', 'tức giận', '😠', 'My brother is angry because I broke his toy.', 'Anh trai mình tức giận vì mình làm hỏng đồ chơi của anh ấy.', 'Your face is red and you want to shout.'],
            ['tired', 'adj', '/ˈtaɪəd/', 'mệt mỏi', '🥱', 'I am tired after football practice.', 'Mình mệt sau buổi tập bóng đá.', 'You need some rest or sleep.'],
            ["What's wrong?", 'phrase', '/wɒts rɒŋ/', 'Có chuyện gì vậy?', '🤔', "You look sad. What's wrong?", 'Trông bạn buồn thế. Có chuyện gì vậy?', 'A kind question when someone looks sad or worried.']
          ],
          comic: {
            title: "Grandma's Hug", titleVi: 'Cái ôm của bà',
            panels: [
              ['b', "Mai, you look sad. What's wrong?", 'Mai ơi, trông cháu buồn thế. Có chuyện gì vậy?', '🤔'],
              ['a', "My LEGO tower fell down. I'm angry!", 'Tháp LEGO của cháu đổ rồi. Cháu tức quá!', '😠'],
              ['b', "Oh, darling. Let's build it again together.", 'Ôi cháu yêu. Mình cùng xây lại nhé.', '🧱'],
              ['a', "Look, it's taller now! I feel happy again!", 'Nhìn này, giờ nó còn cao hơn! Cháu lại vui rồi!', '😊']
            ],
            blanks: [[0, "What's wrong?", ["What's wrong?", "What's for lunch?", 'What time is it?']], [3, 'happy', ['happy', 'hungry', 'heavy']]]
          },
          build: [
            { vi: 'Em muốn nói: Mình mệt sau buổi tập bóng đá.', a: ['I', 'am', 'tired', 'after football practice.'], x: ['is', 'eat'] },
            { vi: 'Em muốn hỏi bạn: Trông bạn buồn thế. Có chuyện gì vậy?', a: ['You look', 'sad.', "What's", 'wrong?'], x: ['Where', 'eat'] }
          ],
          talk: [
            { q: 'How do you feel today?', vi: 'Hôm nay bạn cảm thấy thế nào?', hint: "I'm happy today!", k: ['happy|sad|tired|angry|great|good|fine|excited|sleepy|okay|ok'], c: ["I'm happy today!", "I'm a sandwich today!", 'Today is very blue rice.'] },
            { q: 'What do you do when you feel sad?', vi: 'Bạn làm gì khi cảm thấy buồn?', hint: 'I talk to my mum.', k: ['talk|hug|play|read|draw|sleep|listen|tell|cry|sing'], c: ['I talk to my mum.', 'I eat my shoes.', 'I am a sad bus.'] }
          ],
          snow: { vi: 'Nói về cảm xúc của em', l: [[['happy'], 'vui vẻ'], [['I', 'feel', 'happy.'], 'Mình thấy vui.'], [['Today,', 'I', 'feel', 'very happy', 'because my grandma is here.'], 'Hôm nay, mình thấy rất vui vì bà đến chơi.']], x: ['feels', 'sad'] },
          cb: ['b', 'Mai, your friend Linh is crying. What can you say to her?', 'Mai ơi, bạn Linh đang khóc kìa. Cháu có thể nói gì với bạn?', [
            ['ask', "Linh, what's wrong? Can I help you?", 'Linh ơi, có chuyện gì vậy? Mình giúp bạn được không?', "That's a kind question, Mai. Now listen to her carefully.", 'Câu hỏi thật tử tế, Mai. Giờ hãy lắng nghe bạn nhé.', '👂'],
            ['yes', "Don't be sad! Let's play together!", 'Đừng buồn nữa! Mình chơi cùng nhau nhé!', 'What a kind friend you are! Look, Linh is smiling!', 'Cháu đúng là người bạn tốt! Nhìn kìa, Linh cười rồi!', '😊']]],
          tb: ['b', 'Mai, you look tired. Are you okay?', 'Mai ơi, trông cháu mệt quá. Cháu ổn không?', [
            ['calm', "I'm a little tired. I had PE today.", 'Cháu hơi mệt ạ. Hôm nay cháu có tiết thể dục.', 'Have some water and take a rest, darling.', 'Uống chút nước và nghỉ ngơi đi cháu.', '💧'],
            ['yes', "I'm okay, Grandma! Just hungry!", 'Cháu ổn ạ bà! Chỉ đói thôi!', 'Ha ha! Dinner is ready soon!', 'Ha ha! Sắp có cơm rồi!', '🍲']]],
          fact: ['Smiling can really help you feel happier!', 'Mỉm cười thật sự có thể giúp con thấy vui hơn đấy!'],
          tf: [
            ['When you are tired, you should take a rest.', true, 'Yes! Rest helps your body get strong again.', 'Đúng! Nghỉ ngơi giúp cơ thể khỏe lại.'],
            ['When your friend is sad, you should laugh at them.', false, "No! You should ask \"What's wrong?\" and help them.", 'Sai! Con nên hỏi "Có chuyện gì vậy?" và giúp bạn.']
          ],
          qa: ['What makes you happy?', 'Điều gì làm bạn vui?', 'Playing LEGO makes me happy.', ['play|playing|lego|family|friends|reading|music|games|football|happy|makes']]
        }
      ],
      mystery: {
        t: 'Who Is Uncle Ba?', tv: 'Ai là chú Ba?',
        intro: ['Grandma has an old family photo. Can you find Uncle Ba?', 'Bà có một tấm ảnh gia đình cũ. Con tìm được chú Ba không?'],
        clues: [['Clue one: Uncle Ba is a man, not a woman.', 'Manh mối 1: Chú Ba là đàn ông, không phải phụ nữ.'],
          ['Clue two: He is tall, not short.', 'Manh mối 2: Chú ấy cao, không thấp.'],
          ["Clue three: He doesn't wear glasses. He wears a hat.", 'Manh mối 3: Chú ấy không đeo kính. Chú ấy đội mũ.']],
        q: ['Which one is Uncle Ba?', 'Ai là chú Ba?'],
        o: [['the woman with glasses', '👩‍🏫', 'cô đeo kính'], ['the short man with curly hair', '👨‍🦱', 'chú thấp tóc xoăn'], ['the tall man with glasses', '🤓', 'chú cao đeo kính'], ['the tall man with a hat', '🤠', 'chú cao đội mũ']], a: 3,
        win: ['Yes! Uncle Ba is the tall man with a hat!', 'Đúng rồi! Chú Ba là người cao đội mũ!']
      }
    }
  );

  /* ======================= THÁNG 2 ======================= */
  Z.push(
    /* ---------- WEEK 5: In the Classroom ---------- */
    {
      id: 'w5', week: 5, month: 2, monthTitle: M2[0], monthTitleVi: M2[1],
      name: 'In the Classroom', vi: 'Trong lớp học', short: 'Classroom',
      topic: 'School Supplies & Classroom Language', topicVi: 'Đồ dùng học tập & ngôn ngữ lớp học',
      color: '#2563EB', dark: '#1E40AF', icon: '✏️', model: ['classroom', 'Happy Classroom', 'Lớp học vui vẻ'],
      chars: { a: { name: 'Ben', fig: 'cap-red|grin|torso-blue|legs-blue|book' }, b: { name: 'Miss Linh', fig: 'hair-blonde|smile|torso-stars|legs-black|book' } },
      chatter: [
        ['Good morning, Miss Linh!', 'Chúng em chào cô Linh ạ!'],
        ['May I borrow your ruler?', 'Mình mượn thước kẻ của bạn được không?'],
        ['Raise your hand, please.', 'Các em giơ tay nhé.'],
        ['Open your book at page ten.', 'Mở sách trang mười nhé.'],
        ['Here you are!', 'Của bạn đây!']
      ],
      lessons: [
        {
          title: 'My School Things', titleVi: 'Đồ dùng học tập của em', icon: '✏️',
          words: [
            ['ruler', 'noun', '/ˈruːlə/', 'thước kẻ', '📏', 'I draw a line with my ruler.', 'Mình kẻ đường thẳng bằng thước.', 'You use it to draw straight lines.'],
            ['eraser', 'noun', '/ɪˈreɪzə/', 'cục tẩy', '🧽', 'I use my eraser to fix mistakes.', 'Mình dùng tẩy để sửa lỗi sai.', 'You use it to rub out pencil mistakes.'],
            ['pencil case', 'noun', '/ˈpensl keɪs/', 'hộp bút', '✏️', 'My pencil case is blue.', 'Hộp bút của mình màu xanh dương.', 'You keep your pens and pencils inside it.'],
            ['scissors', 'noun', '/ˈsɪzəz/', 'cái kéo', '✂️', 'Be careful with the scissors!', 'Cẩn thận với cái kéo nhé!', 'You use them to cut paper.'],
            ['crayons', 'noun', '/ˈkreɪɒnz/', 'bút sáp màu', '🖍️', 'I colour the sun with yellow crayons.', 'Mình tô mặt trời bằng bút sáp màu vàng.', 'Colourful sticks you use to draw and colour pictures.']
          ],
          comic: {
            title: 'The Colourful Rainbow', titleVi: 'Cầu vồng nhiều màu',
            panels: [
              ['b', 'Today we will draw a rainbow. Take out your crayons!', 'Hôm nay chúng ta vẽ cầu vồng. Các em lấy bút sáp màu ra nhé!', '🌈'],
              ['a', "Oh no! My crayons aren't in my pencil case!", 'Ôi không! Bút sáp màu của em không có trong hộp bút!', '😟'],
              ['b', "Don't worry, Ben. Share with Lan. And use a ruler for the lines.", 'Đừng lo Ben. Dùng chung với bạn Lan nhé. Và dùng thước để kẻ nhé.', '📏'],
              ['a', 'Red, orange, yellow, green, blue... Our rainbow is beautiful!', 'Đỏ, cam, vàng, xanh lá, xanh dương... Cầu vồng của chúng em đẹp quá!', '🖍️']
            ],
            blanks: [[0, 'crayons', ['crayons', 'crabs', 'carrots']], [2, 'ruler', ['ruler', 'rabbit', 'river']]]
          },
          build: [
            { vi: 'Em muốn tả: Hộp bút của mình màu xanh dương.', a: ['My pencil case', 'is', 'blue.'], x: ['are', 'eat'] },
            { vi: 'Em muốn nhắc bạn: Cẩn thận với cái kéo nhé!', a: ['Be', 'careful', 'with', 'the scissors!'], x: ['Is', 'eat'] }
          ],
          talk: [
            { q: 'What is in your pencil case?', vi: 'Trong hộp bút của bạn có gì?', hint: 'There is a ruler and an eraser.', k: ['ruler|eraser|pencil|pen|pens|pencils|crayons|scissors|rubber|sharpener'], c: ['There is a ruler and an eraser.', 'There is a pizza and a cat.', 'My pencil case is Tuesday.'] },
            { q: 'What colour is your schoolbag?', vi: 'Cặp sách của bạn màu gì?', hint: "It's blue.", k: ['red|blue|green|yellow|pink|purple|black|white|orange|brown|grey|gray'], c: ["It's blue.", "It's Monday.", "It's a ruler."] }
          ],
          snow: { vi: 'Tả đồ dùng học tập', l: [[['my ruler'], 'thước kẻ của mình'], [['My ruler', 'is', 'long.'], 'Thước kẻ của mình dài.'], [['My new ruler', 'is', 'long and blue,', 'and it', 'is in my pencil case.'], 'Thước kẻ mới của mình dài và màu xanh, nó ở trong hộp bút.']], x: ['are', 'eat'] },
          cb: ['b', 'Ben, you forgot your scissors. What can you do?', 'Ben ơi, em quên mang kéo rồi. Em có thể làm gì?', [
            ['ask', 'May I borrow your scissors, Miss Linh?', 'Em mượn kéo của cô được không ạ?', 'Of course! Here you are. Be careful!', 'Tất nhiên! Của em đây. Cẩn thận nhé!', '✂️'],
            ['idea', 'I can share with my friend, Lan.', 'Em có thể dùng chung với bạn Lan ạ.', 'Great idea! Sharing is caring.', 'Ý hay! Chia sẻ là quan tâm.', '🤝']]],
          tb: ['b', 'Ben, can you give out the crayons to the class?', 'Ben ơi, em phát bút sáp màu cho cả lớp được không?', [
            ['yes', 'Sure, Miss Linh! One box for each table!', 'Vâng thưa cô! Mỗi bàn một hộp ạ!', 'Thank you, Ben! Great helper!', 'Cảm ơn Ben! Em giúp cô giỏi lắm!', '🖍️'],
            ['ask', 'How many boxes do we need?', 'Mình cần bao nhiêu hộp ạ?', 'Six boxes, please. Good counting!', 'Sáu hộp em nhé. Đếm giỏi lắm!', '🔢']]],
          fact: ['The first pencils were made more than four hundred years ago!', 'Những chiếc bút chì đầu tiên được làm ra từ hơn bốn trăm năm trước!'],
          tf: [
            ['We use scissors to cut paper.', true, 'Yes! Scissors cut paper.', 'Đúng! Kéo dùng để cắt giấy.'],
            ['A ruler helps us draw round circles.', false, 'No! A ruler helps us draw straight lines.', 'Sai! Thước giúp mình kẻ đường thẳng.']
          ],
          qa: ['What school things do you have in your schoolbag?', 'Trong cặp bạn có những đồ dùng học tập nào?', 'I have books, a ruler and a pencil case.', ['book|books|ruler|pencil|pen|eraser|crayons|notebook|scissors|case']]
        },
        {
          title: 'May I...?', titleVi: 'Xin phép lịch sự', icon: '🙋',
          words: [
            ['May I borrow your ruler?', 'phrase', '/meɪ aɪ ˈbɒrəʊ jɔː ˈruːlə/', 'Cho mình mượn thước của bạn nhé?', '📏', 'May I borrow your ruler, please?', 'Cho mình mượn thước của bạn nhé?', "You ask this when you need your friend's thing for a short time."],
            ['Here you are.', 'phrase', '/hɪə juː ɑː/', 'Của bạn đây.', '🤲', 'Here you are. – Thank you!', 'Của bạn đây. – Cảm ơn bạn!', 'You say this when you give something to someone.'],
            ['May I come in?', 'phrase', '/meɪ aɪ kʌm ɪn/', 'Em vào lớp được không ạ?', '🚪', "Sorry I'm late. May I come in?", 'Em xin lỗi vì đến muộn. Em vào lớp được không ạ?', 'You ask this at the classroom door.'],
            ['May I go out?', 'phrase', '/meɪ aɪ ɡəʊ aʊt/', 'Em ra ngoài được không ạ?', '🚶', 'May I go out, please? I need the toilet.', 'Em ra ngoài được không ạ? Em cần đi vệ sinh.', 'You ask the teacher this when you need to leave the room.'],
            ['Sure!', 'phrase', '/ʃʊə/', 'Được chứ!', '👍', 'Can I sit here? – Sure!', 'Mình ngồi đây được không? – Được chứ!', 'A happy way to say "yes".']
          ],
          comic: {
            title: 'Late for Class', titleVi: 'Đến lớp muộn',
            panels: [
              ['a', "Sorry I'm late, Miss Linh. May I come in?", 'Em xin lỗi vì đến muộn ạ. Em vào lớp được không ạ?', '🚪'],
              ['b', 'Yes, come in, Ben. Sit down, please.', 'Được, em vào đi Ben. Em ngồi xuống nhé.', '🪑'],
              ['a', 'Miss Linh, I forgot my ruler. May I borrow your ruler?', 'Cô ơi, em quên thước. Cô cho em mượn thước được không ạ?', '📏'],
              ['b', 'Sure! Here you are.', 'Được chứ! Của em đây.', '🤲']
            ],
            blanks: [[0, 'May I come in?', ['May I come in?', 'May I eat it?', 'Is it Monday?']], [3, 'Here you are.', ['Here you are.', 'Where are you?', 'How are you?']]]
          },
          build: [
            { vi: 'Em muốn xin phép: Em vào lớp được không ạ?', a: ['May I', 'come in,', 'please?'], x: ['Am', 'comes'] },
            { vi: 'Em muốn mượn bạn: Cho mình mượn cục tẩy của bạn nhé?', a: ['May I', 'borrow', 'your eraser,', 'please?'], x: ['borrows', 'Do'] }
          ],
          talk: [
            { q: 'May I borrow your pencil?', vi: 'Cho mình mượn bút chì của bạn nhé?', hint: 'Sure! Here you are.', k: ['sure|yes|here|course|okay|ok|sorry'], c: ['Sure! Here you are.', 'Sure! I am a pencil.', 'No, it is raining pencils.'] },
            { q: 'You are late for class. What do you say to the teacher?', vi: 'Bạn đến lớp muộn. Bạn nói gì với cô giáo?', hint: "Sorry I'm late. May I come in?", k: ['sorry|may|come|late|in'], c: ["Sorry I'm late. May I come in?", "Sorry, I'm a door.", 'May I eat the classroom?'] }
          ],
          snow: { vi: 'Xin phép mượn đồ lịch sự', l: [[['your ruler'], 'thước của bạn'], [['May I', 'borrow', 'your ruler?'], 'Cho mình mượn thước của bạn nhé?'], [['Excuse me, Lan.', 'May I', 'borrow', 'your ruler', 'for a minute, please?'], 'Xin lỗi Lan. Cho mình mượn thước một chút nhé?']], x: ['borrows', 'eat'] },
          cb: ['b', 'Ben, do you need anything?', 'Ben ơi, em có cần gì không?', [
            ['ask', 'May I go out, please? I need the toilet.', 'Em ra ngoài được không ạ? Em cần đi vệ sinh.', 'Sure. Come back quickly, please.', 'Được. Em quay lại nhanh nhé.', '🚶'],
            ['calm', 'May I have a new notebook, please?', 'Em xin một quyển vở mới được không ạ?', 'Of course! Here you are.', 'Tất nhiên rồi! Của em đây.', '📓']]],
          tb: ['b', 'Ben, may I borrow your crayons for a minute?', 'Ben ơi, cô mượn bút sáp màu của em một chút nhé?', [
            ['yes', 'Sure, Miss Linh! Here you are.', 'Vâng ạ, thưa cô! Của cô đây.', "Thank you, Ben. You're very kind!", 'Cảm ơn Ben. Em tốt bụng quá!', '🖍️'],
            ['ask', 'Of course! Which colour do you need?', 'Tất nhiên ạ! Cô cần màu nào ạ?', 'The red one, please. Thank you!', 'Màu đỏ em nhé. Cảm ơn em!', '❤️']]],
          fact: ['Saying "please" and "thank you" makes people want to help you more!', 'Nói "làm ơn" và "cảm ơn" khiến mọi người muốn giúp con nhiều hơn!'],
          tf: [
            ['We say "Here you are" when we give something to someone.', true, 'Yes! It means "this is for you".', 'Đúng! Câu này nghĩa là "của bạn đây".'],
            ['When you are late, you should run in without asking.', false, 'No! You should say "May I come in?"', 'Sai! Con nên hỏi "Em vào lớp được không ạ?"']
          ],
          qa: ['What do you say when you want to borrow something?', 'Bạn nói gì khi muốn mượn một thứ gì đó?', 'May I borrow your pen, please?', ['may|can|could|please', 'borrow|use|have']]
        },
        {
          title: 'Classroom Rules', titleVi: 'Nội quy lớp học', icon: '📋',
          words: [
            ['raise your hand', 'verb', '/reɪz jɔː hænd/', 'giơ tay', '✋', 'Raise your hand to answer.', 'Giơ tay để trả lời nhé.', 'You put your arm up when you want to speak in class.'],
            ['be quiet', 'verb', '/bi ˈkwaɪət/', 'giữ trật tự', '🤫', 'Please be quiet in the library.', 'Hãy giữ trật tự trong thư viện nhé.', 'Do not talk or make noise.'],
            ['listen carefully', 'verb', '/ˈlɪsn ˈkeəfəli/', 'lắng nghe cẩn thận', '👂', 'Listen carefully to your teacher.', 'Hãy lắng nghe cô giáo cẩn thận.', 'Use your ears well and do not talk.'],
            ['open your book', 'verb', '/ˈəʊpən jɔː bʊk/', 'mở sách', '📖', 'Open your book at page ten.', 'Mở sách trang mười nhé.', 'You do this before you read.'],
            ['Sit down, please.', 'phrase', '/sɪt daʊn pliːz/', 'Mời ngồi xuống.', '🪑', 'Stand up, please. Now sit down, please.', 'Đứng lên nào. Giờ ngồi xuống nhé.', 'The teacher says this when you should take your chair.']
          ],
          comic: {
            title: 'Simon Says in Class', titleVi: 'Trò chơi Simon nói',
            panels: [
              ['b', "Let's play Simon Says! Simon says: raise your hand!", 'Chơi trò Simon nói nhé! Simon nói: giơ tay lên!', '✋'],
              ['a', 'Easy! My hand is up!', 'Dễ quá! Em giơ tay rồi!', '🙋'],
              ['b', 'Open your book!', 'Mở sách ra!', '📖'],
              ['a', "Ha! You didn't say 'Simon says'! My book is still closed!", "Ha! Cô chưa nói 'Simon nói'! Sách của em vẫn đóng!", '😎']
            ],
            blanks: [[0, 'raise your hand', ['raise your hand', 'raise your lunch', 'eat your hand']], [2, 'Open your book', ['Open your book', 'Open your soup', 'Eat your book']]]
          },
          build: [
            { vi: 'Em muốn nhắc bạn: Giơ tay để trả lời nhé.', a: ['Raise', 'your hand', 'to answer.'], x: ['Raises', 'foot'] },
            { vi: 'Em muốn nhắc: Hãy giữ trật tự trong thư viện.', a: ['Please', 'be quiet', 'in', 'the library.'], x: ['is', 'noisy'] }
          ],
          talk: [
            { q: 'What do you do when you want to answer?', vi: 'Bạn làm gì khi muốn trả lời câu hỏi?', hint: 'I raise my hand.', k: ['raise|put|up', 'hand|hands|arm'], c: ['I raise my hand.', 'I raise my lunch.', 'I shout very loudly.'] },
            { q: 'What are the rules in your classroom?', vi: 'Lớp bạn có những nội quy gì?', hint: 'We must listen carefully and be quiet.', k: ['listen|quiet|raise|hand|sit|tidy|kind|share|late|must'], c: ['We must listen carefully and be quiet.', 'We must eat our books.', 'The rules are blue bananas.'] }
          ],
          snow: { vi: 'Nói về nội quy lớp học', l: [[['quiet'], 'yên lặng'], [['Please', 'be', 'quiet.'], 'Hãy giữ trật tự.'], [['In class,', 'we', 'raise our hands', 'and listen', 'carefully to the teacher.'], 'Trong lớp, chúng mình giơ tay và lắng nghe cô giáo cẩn thận.']], x: ['noisy', 'is'] },
          cb: ['b', 'Class, who knows the answer? Ben?', 'Cả lớp, ai biết câu trả lời nào? Ben?', [
            ['yes', 'Me! The answer is twelve!', 'Em ạ! Đáp án là mười hai!', 'Correct! Well done, Ben!', 'Chính xác! Giỏi lắm Ben!', '🎯'],
            ['ask', 'Sorry, can you say the question again, please?', 'Em xin lỗi, cô nhắc lại câu hỏi được không ạ?', 'Of course! Listen carefully...', 'Tất nhiên! Em nghe cẩn thận nhé...', '👂']]],
          tb: ['b', 'Ben, your friends are talking in the library. What can you say?', 'Ben ơi, các bạn đang nói chuyện trong thư viện. Em có thể nói gì?', [
            ['calm', 'Shh! Please be quiet. People are reading.', 'Suỵt! Các bạn giữ trật tự nhé. Mọi người đang đọc sách.', 'Great reminder, Ben! Thank you.', 'Nhắc nhở hay lắm Ben! Cảm ơn em.', '🤫'],
            ['idea', "Let's talk outside. We can play there!", 'Mình ra ngoài nói chuyện nhé. Ra đó chơi được mà!', 'Good idea! The library stays quiet.', 'Ý hay! Thư viện vẫn yên tĩnh.', '🌳']]],
          fact: ['Your brain learns better when the room is calm and quiet.', 'Bộ não học tốt hơn khi căn phòng yên tĩnh.'],
          tf: [
            ['We raise our hand when we want to speak in class.', true, 'Yes! Then the teacher can choose who speaks.', 'Đúng! Như vậy cô giáo có thể chọn bạn phát biểu.'],
            ['We should shout in the library.', false, 'No! We should be quiet in the library.', 'Sai! Mình nên giữ trật tự trong thư viện.']
          ],
          qa: ['What is your favourite classroom rule?', 'Nội quy lớp học bạn thích nhất là gì?', 'My favourite rule is "Be kind to your friends".', ['rule|kind|quiet|listen|raise|share|help|friends|hand']]
        }
      ],
      mystery: {
        t: 'The Secret School Thing', tv: 'Đồ dùng học tập bí mật',
        intro: ['Ben has a secret thing in his pencil case. What is it?', 'Ben có một món đồ bí mật trong hộp bút. Đó là gì?'],
        clues: [["Clue one: It isn't for cutting paper.", 'Manh mối 1: Nó không dùng để cắt giấy.'],
          ["Clue two: You don't colour pictures with it.", 'Manh mối 2: Bạn không dùng nó để tô màu tranh.'],
          ['Clue three: It is small and soft. It rubs out pencil mistakes.', 'Manh mối 3: Nó nhỏ và mềm. Nó xóa các lỗi viết bút chì.']],
        q: ["What is Ben's secret thing?", 'Món đồ bí mật của Ben là gì?'],
        o: [['scissors', '✂️', 'cái kéo'], ['crayons', '🖍️', 'bút sáp màu'], ['a ruler', '📏', 'thước kẻ'], ['an eraser', '🧽', 'cục tẩy']], a: 3,
        win: ["Correct! It's an eraser. Ben can fix his mistakes!", 'Chính xác! Đó là cục tẩy. Ben có thể sửa lỗi sai rồi!']
      }
    },

    /* ---------- WEEK 6: School Subjects & Timetable ---------- */
    {
      id: 'w6', week: 6, month: 2, monthTitle: M2[0], monthTitleVi: M2[1],
      name: 'Subjects & Timetable', vi: 'Môn học & Thời khóa biểu', short: 'Timetable',
      topic: 'Days of the Week & School Subjects', topicVi: 'Các ngày trong tuần & môn học',
      color: '#7C3AED', dark: '#5B21B6', icon: '📅', model: ['school', 'Our School', 'Ngôi trường của em'],
      chars: { a: { name: 'Sara', fig: 'hair-brown|grin|torso-stars|legs-blue|book' }, b: { name: 'Mr Nam', fig: 'none-hat|cool|torso-red|legs-black|book' } },
      chatter: [
        ['What day is it today?', 'Hôm nay là thứ mấy?'],
        ['I have Maths on Monday.', 'Mình có môn Toán vào thứ Hai.'],
        ['My favourite subject is Art.', 'Môn học yêu thích của mình là Mỹ thuật.'],
        ['English is fun and interesting!', 'Tiếng Anh vui và thú vị!'],
        ["Let's check the timetable.", 'Mình xem thời khóa biểu nhé.']
      ],
      lessons: [
        {
          title: 'Days of the Week', titleVi: 'Các ngày trong tuần', icon: '📅',
          words: [
            ['Monday', 'noun', '/ˈmʌndeɪ/', 'thứ Hai', '1️⃣', 'School starts on Monday.', 'Tuần học bắt đầu vào thứ Hai.', 'The first school day of the week.'],
            ['Wednesday', 'noun', '/ˈwenzdeɪ/', 'thứ Tư', '3️⃣', 'I have swimming on Wednesday.', 'Mình học bơi vào thứ Tư.', 'The day in the middle of the school week.'],
            ['Friday', 'noun', '/ˈfraɪdeɪ/', 'thứ Sáu', '5️⃣', 'Friday is the last school day.', 'Thứ Sáu là ngày học cuối cùng trong tuần.', 'The day before Saturday.'],
            ['weekend', 'noun', '/ˌwiːkˈend/', 'cuối tuần', '🎉', 'I visit my grandparents at the weekend.', 'Mình thăm ông bà vào cuối tuần.', 'Saturday and Sunday together.'],
            ['today', 'adv', '/təˈdeɪ/', 'hôm nay', '📆', 'What day is it today?', 'Hôm nay là thứ mấy?', 'This day, not yesterday and not tomorrow.']
          ],
          comic: {
            title: 'Is It the Weekend Yet?', titleVi: 'Đã đến cuối tuần chưa?',
            panels: [
              ['a', 'Mr Nam, what day is it today?', 'Thầy Nam ơi, hôm nay là thứ mấy ạ?', '📆'],
              ['b', "It's Wednesday, Sara.", 'Hôm nay là thứ Tư, Sara.', '3️⃣'],
              ['a', 'Oh no! The weekend is so far away!', 'Ôi không! Cuối tuần còn xa quá!', '😩'],
              ['b', 'But on Friday we have a picnic!', 'Nhưng thứ Sáu này chúng ta đi dã ngoại đấy!', '🧺']
            ],
            blanks: [[1, 'Wednesday', ['Wednesday', 'Wet day', 'Windy']], [3, 'Friday', ['Friday', 'Fried egg', 'Free time']]]
          },
          build: [
            { vi: 'Em muốn hỏi: Hôm nay là thứ mấy?', a: ['What day', 'is it', 'today?'], x: ['are', 'eat'] },
            { vi: 'Em muốn kể: Mình thăm ông bà vào cuối tuần.', a: ['I', 'visit', 'my grandparents', 'at the weekend.'], x: ['visits', 'eat'] }
          ],
          talk: [
            { q: 'What day is it today?', vi: 'Hôm nay là thứ mấy?', hint: "It's Monday.", k: ['monday|tuesday|wednesday|thursday|friday|saturday|sunday'], c: ["It's Monday.", "It's a pencil.", "It's half past blue."] },
            { q: 'What do you do at the weekend?', vi: 'Bạn làm gì vào cuối tuần?', hint: 'I play football and visit my grandparents.', k: ['play|visit|go|watch|read|swim|ride|help|clean|draw|sleep'], c: ['I play football and visit my grandparents.', 'I go to the moon on Monday morning.', 'The weekend is a ruler.'] }
          ],
          snow: { vi: 'Kể lịch trong tuần', l: [[['Friday'], 'thứ Sáu'], [['I', 'love', 'Fridays.'], 'Mình thích thứ Sáu.'], [['On Fridays,', 'I', 'have', 'swimming lessons', 'after school.'], 'Vào thứ Sáu, mình học bơi sau giờ học.']], x: ['loves', 'eat'] },
          cb: ['b', 'Sara, our class picnic is on Friday or Saturday. Which day do you like?', 'Sara, buổi dã ngoại của lớp vào thứ Sáu hoặc thứ Bảy. Em thích ngày nào?', [
            ['yes', 'Friday, please! Then we can rest at the weekend.', 'Thứ Sáu ạ! Như vậy cuối tuần mình được nghỉ.', 'Good thinking! Friday it is.', 'Nghĩ hay lắm! Chọn thứ Sáu nhé.', '🧺'],
            ['idea', 'How about Saturday? My parents can come, too!', 'Thứ Bảy thì sao ạ? Bố mẹ em cũng đi được!', 'Great idea! Families are welcome!', 'Ý hay! Mời cả gia đình nhé!', '👨‍👩‍👧']]],
          tb: ['b', "It's Friday! Do you have any plans for the weekend?", 'Thứ Sáu rồi! Em có kế hoạch gì cho cuối tuần không?', [
            ['yes', "Yes! I'm going to the zoo with my family!", 'Có ạ! Em sẽ đi sở thú với gia đình!', 'How exciting! Say hello to the monkeys!', 'Thú vị quá! Chào mấy chú khỉ giúp thầy nhé!', '🐒'],
            ['calm', "Not really. I'll stay at home and read books.", 'Không có ạ. Em sẽ ở nhà đọc sách.', 'That sounds relaxing!', 'Nghe thật thư giãn!', '📚']]],
          fact: ['There are seven days in a week and fifty-two weeks in a year.', 'Một tuần có bảy ngày và một năm có năm mươi hai tuần.'],
          tf: [
            ['Saturday and Sunday are the weekend.', true, 'Yes! The weekend is Saturday and Sunday.', 'Đúng! Cuối tuần là thứ Bảy và Chủ nhật.'],
            ['Friday comes before Monday in the same week.', false, 'No! Monday comes first, and Friday comes later.', 'Sai! Thứ Hai đến trước, thứ Sáu đến sau.']
          ],
          qa: ['What is your favourite day of the week? Why?', 'Ngày nào trong tuần bạn thích nhất? Vì sao?', "I like Saturday because I don't go to school.", ['monday|tuesday|wednesday|thursday|friday|saturday|sunday', 'because|like|love']]
        },
        {
          title: 'My Subjects', titleVi: 'Các môn học', icon: '📚',
          words: [
            ['Maths', 'noun', '/mæθs/', 'môn Toán', '➗', 'We have Maths every day.', 'Ngày nào chúng mình cũng có môn Toán.', 'In this subject you add and take away numbers.'],
            ['English', 'noun', '/ˈɪŋɡlɪʃ/', 'môn Tiếng Anh', '🇬🇧', 'I learn English with LEGO!', 'Mình học tiếng Anh cùng LEGO!', 'You are learning this language now!'],
            ['Vietnamese', 'noun', '/ˌvjetnəˈmiːz/', 'môn Tiếng Việt', '📝', 'We read stories in Vietnamese.', 'Chúng mình đọc truyện trong giờ Tiếng Việt.', 'The language of Viet Nam.'],
            ['Science', 'noun', '/ˈsaɪəns/', 'môn Khoa học', '🔬', 'In Science we learn about plants.', 'Trong giờ Khoa học chúng mình học về cây cối.', 'You learn about plants, animals and how things work.'],
            ['Art', 'noun', '/ɑːt/', 'môn Mỹ thuật', '🎨', 'I paint pictures in Art.', 'Mình vẽ tranh trong giờ Mỹ thuật.', 'You draw and paint pictures in this lesson.']
          ],
          comic: {
            title: 'The Timetable Mix-up', titleVi: 'Nhầm thời khóa biểu',
            panels: [
              ['a', 'Mr Nam, I brought my paints for Art today!', 'Thầy Nam ơi, hôm nay em mang màu vẽ cho môn Mỹ thuật ạ!', '🎨'],
              ['b', 'Oh, Sara! Today is Tuesday. We have Maths and Science.', 'Ôi Sara! Hôm nay là thứ Ba. Chúng ta có Toán và Khoa học.', '🔬'],
              ['a', 'Oops! I read the wrong timetable!', 'Ối! Em xem nhầm thời khóa biểu rồi!', '😳'],
              ['b', "Don't worry! You can paint the plants in Science!", 'Đừng lo! Em có thể vẽ cây cối trong giờ Khoa học!', '🌱']
            ],
            blanks: [[1, 'Maths', ['Maths', 'Mats', 'Meat']], [3, 'Science', ['Science', 'Scissors', 'Sandwich']]]
          },
          build: [
            { vi: 'Em muốn kể: Thứ Ba mình có môn Toán và Khoa học.', a: ['On Tuesday,', 'I have', 'Maths', 'and Science.'], x: ['has', 'eat'] },
            { vi: 'Em muốn hỏi bạn: Hôm nay bạn có những môn gì?', a: ['What subjects', 'do you have', 'today?'], x: ['does', 'eat'] }
          ],
          talk: [
            { q: 'What subjects do you have today?', vi: 'Hôm nay bạn có những môn gì?', hint: 'I have Maths, English and Art.', k: ['maths|math|english|vietnamese|science|art|music|pe|it|history|geography'], c: ['I have Maths, English and Art.', 'I have a banana and a cloud.', "It is Maths o'clock."] },
            { q: 'Who is your English teacher?', vi: 'Giáo viên Tiếng Anh của bạn là ai?', hint: 'My English teacher is Miss Linh.', k: ['teacher|miss|mr|mrs|ms|is|name'], c: ['My English teacher is Miss Linh.', 'My English teacher is a ruler.', 'My teacher is Tuesday.'] }
          ],
          snow: { vi: 'Kể về các môn học', l: [[['English'], 'môn Tiếng Anh'], [['I', 'study', 'English.'], 'Mình học Tiếng Anh.'], [['On Mondays,', 'I', 'study', 'English and Maths', 'at school.'], 'Vào thứ Hai, mình học Tiếng Anh và Toán ở trường.']], x: ['studies', 'eat'] },
          cb: ['b', 'Sara, we have a Science quiz tomorrow. Are you ready?', 'Sara ơi, mai lớp mình kiểm tra Khoa học. Em sẵn sàng chưa?', [
            ['yes', 'Yes! I love Science quizzes!', 'Rồi ạ! Em thích kiểm tra Khoa học lắm!', 'Great attitude, Sara!', 'Tinh thần tuyệt vời, Sara!', '🔬'],
            ['ask', 'Can you help me with the plant lesson, please?', 'Thầy giúp em ôn bài về cây cối được không ạ?', "Of course! Let's look at it together.", 'Tất nhiên! Mình cùng xem nhé.', '🌱']]],
          tb: ['b', 'Which subject is easy for you?', 'Môn học nào dễ đối với em?', [
            ['yes', 'English is easy! I learn it with LEGO!', 'Tiếng Anh dễ ạ! Em học cùng LEGO!', 'Wonderful! Keep building!', 'Tuyệt vời! Tiếp tục xây nhé!', '🧱'],
            ['calm', 'Art is easy, but Maths is difficult for me.', 'Mỹ thuật thì dễ, nhưng Toán thì khó với em ạ.', "Don't worry. Practice makes perfect!", 'Đừng lo. Luyện tập nhiều sẽ giỏi!', '💪']]],
          fact: ['Maths helps builders, doctors and even astronauts in their jobs!', 'Toán học giúp các thợ xây, bác sĩ và cả phi hành gia trong công việc!'],
          tf: [
            ['We draw and paint in Art.', true, 'Yes! Art is for drawing and painting.', 'Đúng! Mỹ thuật là môn vẽ và tô màu.'],
            ['We learn about plants in Maths.', false, 'No! We learn about plants in Science.', 'Sai! Mình học về cây cối trong môn Khoa học.']
          ],
          qa: ['What subjects do you have on Monday?', 'Thứ Hai bạn có những môn gì?', 'I have Maths, Vietnamese and English on Monday.', ['maths|math|english|vietnamese|science|art|music|pe|it']]
        },
        {
          title: 'My Favourite Subject', titleVi: 'Môn học yêu thích', icon: '⭐',
          words: [
            ['favourite', 'adj', '/ˈfeɪvərɪt/', 'yêu thích nhất', '⭐', 'My favourite subject is Science.', 'Môn học yêu thích nhất của mình là Khoa học.', 'The one you like the most.'],
            ['timetable', 'noun', '/ˈtaɪmteɪbl/', 'thời khóa biểu', '🗓️', "Let's check the timetable.", 'Mình xem thời khóa biểu nhé.', 'A chart that shows your lessons every day.'],
            ['interesting', 'adj', '/ˈɪntrəstɪŋ/', 'thú vị', '🤩', 'Science is very interesting.', 'Môn Khoa học rất thú vị.', 'You want to learn more about it. It is not boring.'],
            ['easy', 'adj', '/ˈiːzi/', 'dễ', '😌', 'This Maths question is easy.', 'Câu hỏi Toán này dễ.', 'Not difficult. You can do it quickly.'],
            ['difficult', 'adj', '/ˈdɪfɪkəlt/', 'khó', '🧗', 'The test is a little difficult.', 'Bài kiểm tra hơi khó.', 'You need to think very hard to do it.']
          ],
          comic: {
            title: 'Why Do You Like It?', titleVi: 'Sao em thích môn đó?',
            panels: [
              ['b', "Sara, what's your favourite subject?", 'Sara, môn học yêu thích nhất của em là gì?', '⭐'],
              ['a', "Science! It's very interesting.", 'Khoa học ạ! Môn này rất thú vị.', '🔬'],
              ['b', 'Is it easy for you?', 'Môn đó có dễ với em không?', '🤔'],
              ['a', "Sometimes it's difficult, but I love experiments!", 'Đôi khi khó ạ, nhưng em mê làm thí nghiệm!', '🧪']
            ],
            blanks: [[0, 'favourite', ['favourite', 'fever', 'furniture']], [3, 'difficult', ['difficult', 'delicious', 'dirty']]]
          },
          build: [
            { vi: 'Em muốn nói: Môn học yêu thích của mình là Mỹ thuật.', a: ['My favourite', 'subject', 'is', 'Art.'], x: ['are', 'eat'] },
            { vi: 'Em muốn giải thích: Mình thích Khoa học vì nó thú vị.', a: ['I like', 'Science', 'because', 'it is interesting.'], x: ['likes', 'eat'] }
          ],
          talk: [
            { q: "What's your favourite subject?", vi: 'Môn học yêu thích nhất của bạn là gì?', hint: 'My favourite subject is Art.', k: ['maths|math|english|vietnamese|science|art|music|pe|it|history|geography'], c: ['My favourite subject is Art.', 'My favourite subject is pizza.', 'I am Tuesday.'] },
            { q: 'Why do you like it?', vi: 'Tại sao bạn thích môn đó?', hint: "Because it's interesting.", k: ['because|interesting|fun|easy|love|like|cool|exciting'], c: ["Because it's interesting.", "Because it's a chair.", "Because it's Monday rice."] }
          ],
          snow: { vi: 'Nói về môn học yêu thích', l: [[['Art'], 'Mỹ thuật'], [['I', 'like', 'Art.'], 'Mình thích Mỹ thuật.'], [['My favourite', 'subject', 'is Art', 'because', 'I love painting.'], 'Môn yêu thích của mình là Mỹ thuật vì mình thích vẽ tranh.']], x: ['likes', 'eat'] },
          cb: ['b', 'Sara, the Maths homework is difficult. Do you want some help?', 'Sara ơi, bài tập Toán khó đấy. Em có cần giúp không?', [
            ['yes', 'Yes, please! Thank you, Mr Nam!', 'Có ạ! Em cảm ơn thầy Nam!', "Let's do the first question together.", 'Mình làm câu đầu tiên cùng nhau nhé.', '➗'],
            ['no', 'No, thank you. I want to try it by myself first.', 'Dạ thôi ạ. Em muốn tự làm thử trước.', 'Great! Ask me if you need help.', 'Tuyệt! Cần giúp thì hỏi thầy nhé.', '💪']]],
          tb: ['b', 'In my opinion, Maths is the most interesting subject. Do you agree?', 'Theo thầy, Toán là môn thú vị nhất. Em có đồng ý không?', [
            ['yes', 'Yes, I agree! Numbers are fun!', 'Có ạ, em đồng ý! Các con số rất vui!', 'High five, little mathematician!', 'Đập tay nào, nhà toán học nhí!', '🔢'],
            ['no', "I don't think so. I think English is more interesting!", 'Em không nghĩ vậy. Em thấy Tiếng Anh thú vị hơn!', "That's okay! Everyone likes different things.", 'Không sao! Mỗi người thích một điều khác nhau.', '🌈']]],
          fact: ['Learning something difficult makes your brain grow stronger!', 'Học những điều khó giúp bộ não của con khỏe hơn!'],
          tf: [
            ['A timetable shows your lessons.', true, 'Yes! It tells you which subject is on which day.', 'Đúng! Nó cho biết môn học nào vào ngày nào.'],
            ['"Difficult" means very easy.', false, 'No! "Difficult" means not easy.', 'Sai! "Difficult" nghĩa là khó, không dễ.']
          ],
          qa: ['Which subject is difficult for you?', 'Môn học nào khó đối với bạn?', 'Maths is a little difficult for me.', ['maths|math|english|vietnamese|science|art|music|pe|it', 'difficult|hard|easy']]
        }
      ],
      mystery: {
        t: 'The Art Day Mystery', tv: 'Bí ẩn ngày học Mỹ thuật',
        intro: ['Sara lost her timetable! On which day does she have Art?', 'Sara làm mất thời khóa biểu! Bạn ấy có môn Mỹ thuật vào ngày nào?'],
        clues: [['Clue one: It is a school day, not the weekend.', 'Manh mối 1: Đó là ngày đi học, không phải cuối tuần.'],
          ["Clue two: It isn't the first school day of the week.", 'Manh mối 2: Đó không phải ngày học đầu tuần.'],
          ['Clue three: It is the day before Saturday.', 'Manh mối 3: Đó là ngày trước thứ Bảy.']],
        q: ['When does Sara have Art?', 'Sara có môn Mỹ thuật vào ngày nào?'],
        o: [['Monday', '1️⃣', 'thứ Hai'], ['Wednesday', '3️⃣', 'thứ Tư'], ['Saturday', '🎉', 'thứ Bảy'], ['Friday', '5️⃣', 'thứ Sáu']], a: 3,
        win: ['Right! Sara has Art on Friday. Time to paint!', 'Đúng rồi! Sara có môn Mỹ thuật vào thứ Sáu. Vẽ tranh thôi!']
      }
    },

    /* ---------- WEEK 7: Playground, Sports & Chess ---------- */
    {
      id: 'w7', week: 7, month: 2, monthTitle: M2[0], monthTitleVi: M2[1],
      name: 'Playground, Sports & Chess', vi: 'Sân chơi, Thể thao & Cờ vua', short: 'Playground',
      topic: 'Break Time, Sports & Thinking Games', topicVi: 'Giờ ra chơi, thể thao & trò chơi tư duy',
      color: '#16A34A', dark: '#166534', icon: '⚽', model: ['playground', 'Fun Playground', 'Sân chơi vui nhộn'],
      chars: { a: { name: 'Kim', fig: 'hair-brown|determined|torso-blue|legs-green|none' }, b: { name: 'Coach Duc', fig: 'cap-red|grin|torso-stars|legs-black|flag' } },
      chatter: [
        ["It's break time! Let's play!", 'Ra chơi rồi! Chơi thôi!'],
        ['Can you jump rope?', 'Bạn có biết nhảy dây không?'],
        ['Pass the ball to me!', 'Chuyền bóng cho mình nào!'],
        ['Protect your king!', 'Bảo vệ quân vua của bạn nhé!'],
        ["Good game! Let's play again!", 'Trận hay lắm! Chơi lại nhé!']
      ],
      lessons: [
        {
          title: 'Break Time Fun', titleVi: 'Giờ ra chơi vui vẻ', icon: '🛝',
          words: [
            ['break time', 'noun', '/ˈbreɪk taɪm/', 'giờ ra chơi', '🔔', 'At break time, we play in the schoolyard.', 'Giờ ra chơi, chúng mình chơi ở sân trường.', 'The short free time between lessons.'],
            ['jump rope', 'verb', '/dʒʌmp rəʊp/', 'nhảy dây', '🪢', 'Girls and boys jump rope together.', 'Các bạn nam nữ cùng nhảy dây.', 'You jump again and again over a long string.'],
            ['play hide-and-seek', 'verb', '/pleɪ ˌhaɪd ən ˈsiːk/', 'chơi trốn tìm', '🙈', 'We play hide-and-seek in the garden.', 'Chúng mình chơi trốn tìm trong vườn.', 'One friend counts, and the others hide.'],
            ['kick a shuttlecock', 'verb', '/kɪk ə ˈʃʌtlkɒk/', 'đá cầu', '🪶', 'My friends and I kick a shuttlecock.', 'Mình và các bạn đá cầu.', 'You keep a feathered toy in the air with your feet.'],
            ['play tag', 'verb', '/pleɪ tæɡ/', 'chơi đuổi bắt', '🏃', 'We play tag at break time.', 'Chúng mình chơi đuổi bắt giờ ra chơi.', 'One friend runs after the others and touches them.']
          ],
          comic: {
            title: 'The Bell Rings', titleVi: 'Chuông reo rồi',
            panels: [
              ['a', "Ring ring! It's break time!", 'Reng reng! Ra chơi rồi!', '🔔'],
              ['b', 'What do you want to play, Kim?', 'Em muốn chơi gì, Kim?', '🤔'],
              ['a', "Let's kick a shuttlecock! I can kick it ten times!", 'Mình đá cầu nhé! Em đá được mười lần!', '🪶'],
              ['b', "Wow! After that, let's play tag. You're it!", 'Oa! Sau đó mình chơi đuổi bắt nhé. Em làm người đuổi!', '🏃']
            ],
            blanks: [[0, 'break time', ['break time', 'bedtime', 'lunch box']], [2, 'kick a shuttlecock', ['kick a shuttlecock', 'kick a sandwich', 'cook a shuttlecock']]]
          },
          build: [
            { vi: 'Em muốn kể: Giờ ra chơi, chúng mình nhảy dây.', a: ['At break time,', 'we', 'jump', 'rope.'], x: ['jumps', 'eat'] },
            { vi: 'Em muốn rủ bạn: Mình chơi trốn tìm nhé!', a: ["Let's", 'play', 'hide-and-seek!'], x: ['plays', 'eat'] }
          ],
          talk: [
            { q: 'What do you do at break time?', vi: 'Bạn làm gì vào giờ ra chơi?', hint: 'I jump rope with my friends.', k: ['jump|play|kick|run|talk|read|eat|chat', 'rope|tag|hide|shuttlecock|football|friends|chess|games'], c: ['I jump rope with my friends.', 'I jump into the timetable.', 'Break time is a pencil.'] },
            { q: 'Can you kick a shuttlecock?', vi: 'Bạn có biết đá cầu không?', hint: 'Yes, I can. I can kick it ten times!', k: ["yes|no|can|can't|cannot"], c: ['Yes, I can. I can kick it ten times!', 'Yes, I can kick the moon.', 'No, it is a sandwich.'] }
          ],
          snow: { vi: 'Kể về giờ ra chơi', l: [[['jump rope'], 'nhảy dây'], [['We', 'jump', 'rope.'], 'Chúng mình nhảy dây.'], [['At break time,', 'my friends and I', 'jump rope', 'in the schoolyard', 'every day.'], 'Giờ ra chơi, mình và các bạn nhảy dây ở sân trường mỗi ngày.']], x: ['jumps', 'eat'] },
          cb: ['b', 'Kim, a new student is alone at break time. What can you do?', 'Kim ơi, có bạn học sinh mới đang đứng một mình giờ ra chơi. Em có thể làm gì?', [
            ['yes', 'Hi! Do you want to play tag with us?', 'Chào bạn! Bạn có muốn chơi đuổi bắt với tụi mình không?', "What a kind friend! Look, she's smiling!", 'Em thật tốt bụng! Nhìn kìa, bạn ấy cười rồi!', '😊'],
            ['ask', "Hi! What's your name? What games do you like?", 'Chào bạn! Bạn tên là gì? Bạn thích trò chơi nào?', 'Great questions! Making friends is easy!', 'Câu hỏi hay lắm! Kết bạn thật dễ!', '🤝']]],
          tb: ['b', "Let's play hide-and-seek! Do you want to count?", 'Mình chơi trốn tìm nhé! Em có muốn làm người đếm không?', [
            ['yes', 'Okay! One, two, three... Ready or not, here I come!', 'Vâng! Một, hai, ba... Dù sẵn sàng hay chưa, em đến đây!', "Ha ha! I'm hiding behind the tree!", 'Ha ha! Thầy trốn sau cái cây đây!', '🌳'],
            ['no', "I'd like to hide this time. Can you count, please?", 'Lần này em muốn đi trốn ạ. Thầy đếm được không ạ?', 'Sure! One, two, three...', 'Được thôi! Một, hai, ba...', '🙈']]],
          fact: ['Running and jumping make your heart and bones stronger!', 'Chạy nhảy giúp tim và xương của con khỏe hơn!'],
          tf: [
            ['Break time is the free time between lessons.', true, 'Yes! We can play and rest at break time.', 'Đúng! Giờ ra chơi mình có thể chơi và nghỉ ngơi.'],
            ['We kick a shuttlecock with our hands.', false, 'No! We kick a shuttlecock with our feet.', 'Sai! Mình đá cầu bằng chân.']
          ],
          qa: ['What is your favourite game at break time?', 'Trò chơi bạn thích nhất giờ ra chơi là gì?', 'My favourite game is tag.', ['tag|hide|seek|rope|shuttlecock|football|chess|game|marbles|badminton']]
        },
        {
          title: "Let's Play Sports", titleVi: 'Cùng chơi thể thao', icon: '⚽',
          words: [
            ['play football', 'verb', '/pleɪ ˈfʊtbɔːl/', 'chơi bóng đá', '⚽', 'We play football after school.', 'Chúng mình chơi bóng đá sau giờ học.', 'Two teams kick a ball into a goal.'],
            ['play badminton', 'verb', '/pleɪ ˈbædmɪntən/', 'chơi cầu lông', '🏸', 'I play badminton with my dad.', 'Mình chơi cầu lông với bố.', 'You hit a shuttlecock over a net with a racket.'],
            ['play basketball', 'verb', '/pleɪ ˈbɑːskɪtbɔːl/', 'chơi bóng rổ', '🏀', 'Tall players play basketball very well.', 'Những cầu thủ cao chơi bóng rổ rất giỏi.', 'You throw a ball into a high basket.'],
            ['run fast', 'verb', '/rʌn fɑːst/', 'chạy nhanh', '💨', 'Kim can run fast!', 'Kim chạy nhanh lắm!', 'You move your legs very quickly.'],
            ['team', 'noun', '/tiːm/', 'đội', '👥', 'Our team is the red team.', 'Đội của chúng mình là đội đỏ.', 'A group of players who play together.']
          ],
          comic: {
            title: 'The Big Match', titleVi: 'Trận đấu lớn',
            panels: [
              ['b', "Today we play football. Kim, you're in the red team!", 'Hôm nay chúng ta chơi bóng đá. Kim, em ở đội đỏ!', '⚽'],
              ['a', 'Yay! I can run fast!', 'Yeah! Em chạy nhanh lắm!', '💨'],
              ['b', 'Remember: pass the ball to your team.', 'Nhớ nhé: chuyền bóng cho đồng đội.', '👥'],
              ['a', 'Goal! We did it together!', 'Vào! Chúng em cùng làm được rồi!', '🥅']
            ],
            blanks: [[0, 'play football', ['play football', 'play the moon', 'eat football']], [2, 'team', ['team', 'tea', 'teeth']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình chơi cầu lông với bố.', a: ['I', 'play', 'badminton', 'with my dad.'], x: ['plays', 'eat'] },
            { vi: 'Em muốn khen: Kim chạy nhanh lắm!', a: ['Kim', 'can', 'run', 'fast!'], x: ['cans', 'eat'] }
          ],
          talk: [
            { q: 'What sport do you like?', vi: 'Bạn thích môn thể thao nào?', hint: 'I like football.', k: ['football|badminton|basketball|swimming|volleyball|tennis|running|chess|shuttlecock|skating|martial'], c: ['I like football.', 'I like rulers.', 'Sport is a Tuesday.'] },
            { q: 'Can you play basketball?', vi: 'Bạn có biết chơi bóng rổ không?', hint: 'Yes, I can.', k: ["yes|no|can|can't|cannot"], c: ['Yes, I can.', 'Yes, I can eat basketball.', 'No, it is my team cake.'] }
          ],
          snow: { vi: 'Kể về môn thể thao', l: [[['football'], 'bóng đá'], [['I', 'play', 'football.'], 'Mình chơi bóng đá.'], [['After school,', 'I', 'play football', 'with my team', 'in the park.'], 'Sau giờ học, mình chơi bóng đá với đội ở công viên.']], x: ['plays', 'eat'] },
          cb: ['b', 'Kim, our team lost the match. How do you feel?', 'Kim ơi, đội mình thua trận rồi. Em thấy thế nào?', [
            ['calm', "I'm a little sad, but it was a good game.", 'Em hơi buồn, nhưng đó là một trận hay ạ.', "That's the spirit of a true champion!", 'Đó là tinh thần của nhà vô địch thật sự!', '🏅'],
            ['idea', "Let's practise more and win next time!", 'Mình tập luyện thêm và lần sau thắng nhé!', 'Yes! Practice starts on Monday!', 'Đúng vậy! Thứ Hai bắt đầu tập luyện!', '💪']]],
          tb: ['b', 'Would you like to join the school basketball team?', 'Em có muốn tham gia đội bóng rổ của trường không?', [
            ['yes', "Yes! I'd love to! I can run fast!", 'Có ạ! Em rất muốn! Em chạy nhanh lắm!', 'Great! Practice is on Wednesday.', 'Tuyệt! Buổi tập vào thứ Tư nhé.', '🏀'],
            ['no', 'Thank you, but I prefer badminton.', 'Em cảm ơn thầy, nhưng em thích cầu lông hơn.', 'No problem! Try the badminton club, then.', 'Không sao! Vậy em thử câu lạc bộ cầu lông nhé.', '🏸']]],
          fact: ['A football match has two halves, and each half is forty-five minutes long.', 'Một trận bóng đá có hai hiệp, mỗi hiệp dài bốn mươi lăm phút.'],
          tf: [
            ['In basketball, you throw the ball into a basket.', true, 'Yes! That is how you score.', 'Đúng! Đó là cách ghi điểm.'],
            ['A team is one person who plays alone.', false, 'No! A team is a group of players.', 'Sai! Một đội là một nhóm người chơi.']
          ],
          qa: ['Who do you play sports with?', 'Bạn chơi thể thao với ai?', 'I play badminton with my dad.', ['with|play', 'dad|mum|mom|friends|friend|brother|sister|team|classmates|cousin']]
        },
        {
          title: 'Clever Chess', titleVi: 'Cờ vua thông minh', icon: '♟️',
          words: [
            ['play chess', 'verb', '/pleɪ tʃes/', 'chơi cờ vua', '♟️', 'My grandpa and I play chess.', 'Ông và mình chơi cờ vua.', 'A thinking game on a black and white board.'],
            ['the king', 'noun', '/ðə kɪŋ/', 'quân vua', '🤴', 'Protect your king!', 'Hãy bảo vệ quân vua của bạn!', 'The most important piece in chess. It wears a crown.'],
            ['the queen', 'noun', '/ðə kwiːn/', 'quân hậu', '👸', 'The queen can move in many directions.', 'Quân hậu có thể đi theo nhiều hướng.', 'The strongest piece in chess.'],
            ['Your turn!', 'phrase', '/jɔː tɜːn/', 'Đến lượt bạn!', '🔄', 'I moved my knight. Your turn!', 'Mình đi quân mã rồi. Đến lượt bạn!', 'You say this when your friend can play now.'],
            ['Good game!', 'phrase', '/ɡʊd ɡeɪm/', 'Trận đấu hay lắm!', '🤝', "Good game! Let's play again!", 'Trận hay lắm! Chơi lại nhé!', 'A friendly thing to say after you win or lose.']
          ],
          comic: {
            title: 'Checkmate, Coach!', titleVi: 'Chiếu bí rồi thầy ơi!',
            panels: [
              ['b', 'Kim, do you want to play chess with me?', 'Kim ơi, em có muốn chơi cờ vua với thầy không?', '♟️'],
              ['a', 'Yes! I moved my pawn. Your turn!', 'Có ạ! Em đi con tốt rồi. Đến lượt thầy!', '🔄'],
              ['b', "Hmm... I'll move my queen.", 'Ừm... Thầy sẽ đi quân hậu.', '👸'],
              ['a', 'Checkmate! Good game, Coach!', 'Chiếu bí! Trận hay lắm thầy ơi!', '🤝']
            ],
            blanks: [[1, 'Your turn!', ['Your turn!', 'Your lunch!', 'Good night!']], [2, 'queen', ['queen', 'green', 'question']]]
          },
          build: [
            { vi: 'Em muốn kể: Ông và mình chơi cờ vua cùng nhau.', a: ['My grandpa and I', 'play', 'chess', 'together.'], x: ['plays', 'eat'] },
            { vi: 'Em muốn nói sau trận đấu: Trận hay lắm! Mình chơi lại nhé!', a: ['Good game!', "Let's", 'play', 'again!'], x: ['plays', 'eat'] }
          ],
          talk: [
            { q: 'Can you play chess?', vi: 'Bạn có biết chơi cờ vua không?', hint: 'Yes, I can play chess.', k: ["yes|no|can|can't|cannot", 'chess|play|little'], c: ['Yes, I can play chess.', 'Yes, I can eat chess.', 'No, chess is a fish.'] },
            { q: 'What do you say after a game?', vi: 'Bạn nói gì sau một trận đấu?', hint: 'Good game!', k: ['good|game|well|played|thank|again'], c: ['Good game!', 'Good night, ruler!', 'I am a chess piece.'] }
          ],
          snow: { vi: 'Kể về trò chơi cờ vua', l: [[['chess'], 'cờ vua'], [['I', 'play', 'chess.'], 'Mình chơi cờ vua.'], [['On Sundays,', 'I', 'play chess', 'with my grandpa', 'in the living room.'], 'Vào Chủ nhật, mình chơi cờ vua với ông trong phòng khách.']], x: ['plays', 'eat'] },
          cb: ['b', 'Kim, I won this game. What do you say?', 'Kim ơi, thầy thắng ván này rồi. Em nói gì nào?', [
            ['yes', "Good game, Coach! Let's play again!", 'Trận hay lắm thầy! Mình chơi lại nhé!', "What a good sport! Let's play!", 'Em có tinh thần thể thao thật tốt! Chơi thôi!', '🏅'],
            ['ask', 'Good game! Can you teach me that move?', 'Trận hay lắm ạ! Thầy dạy em nước đi đó được không?', 'Of course! Watch my queen carefully.', 'Tất nhiên! Xem quân hậu của thầy kỹ nhé.', '👸']]],
          tb: ['b', "Let's have a chess tournament on Friday! Will you join?", 'Thứ Sáu mình tổ chức giải cờ vua nhé! Em có tham gia không?', [
            ['yes', "Yes! I'll practise every day!", 'Có ạ! Em sẽ luyện tập mỗi ngày!', 'Great! Practice makes perfect!', 'Tuyệt! Có công mài sắt có ngày nên kim!', '🏆'],
            ['no', "I'd love to, but I'm busy on Friday. Can I watch next time?", 'Em rất muốn, nhưng thứ Sáu em bận. Lần sau em xem được không ạ?', 'Sure! See you next time.', 'Được chứ! Hẹn lần sau nhé.', '📅']]],
          fact: ['A chessboard has sixty-four squares: thirty-two black and thirty-two white.', 'Bàn cờ vua có sáu mươi tư ô: ba mươi hai ô đen và ba mươi hai ô trắng.'],
          tf: [
            ['The king is the most important piece in chess.', true, 'Yes! You must protect your king.', 'Đúng! Con phải bảo vệ quân vua.'],
            ['When you lose a game, you should shout and cry.', false, 'No! You should say "Good game!"', 'Sai! Con nên nói "Trận hay lắm!"']
          ],
          qa: ['Do you like thinking games like chess? Why?', 'Bạn có thích những trò chơi tư duy như cờ vua không? Vì sao?', 'Yes, I like chess because it makes me think.', ['yes|no|like|love', 'because|think|fun|clever|smart|difficult|interesting']]
        }
      ],
      mystery: {
        t: 'Who Won the Race?', tv: 'Ai thắng cuộc đua?',
        intro: ['Four friends ran a race at break time. Who won?', 'Bốn bạn chạy thi giờ ra chơi. Ai thắng?'],
        clues: [['Clue one: Tom was the last. He was very tired.', 'Manh mối 1: Tom về cuối. Bạn ấy rất mệt.'],
          ["Clue two: Ben didn't win. He was second.", 'Manh mối 2: Ben không thắng. Bạn ấy về thứ hai.'],
          ['Clue three: Lan was slower than Kim.', 'Manh mối 3: Lan chạy chậm hơn Kim.']],
        q: ['Who won the race?', 'Ai đã thắng cuộc đua?'],
        o: [['Tom', '👦', 'Tom'], ['Ben', '🧒', 'Ben'], ['Lan', '👧', 'Lan'], ['Kim', '🏃', 'Kim']], a: 3,
        win: ['Kim won! She can run fast! Good game, everyone!', 'Kim thắng! Bạn ấy chạy nhanh lắm! Trận hay lắm cả nhà!']
      }
    },

    /* ---------- WEEK 8: Polite Manners & Social Skills ---------- */
    {
      id: 'w8', week: 8, month: 2, monthTitle: M2[0], monthTitleVi: M2[1],
      name: 'Polite Manners', vi: 'Ứng xử lịch sự', short: 'Manners',
      topic: 'Magic Words, Helping & Waiting in Line', topicVi: 'Từ kỳ diệu, giúp đỡ & xếp hàng',
      color: '#CA8A04', dark: '#854D0E', icon: '🙏', model: ['busstop', 'Polite Bus Stop', 'Trạm xe buýt lịch sự'],
      chars: { a: { name: 'Hana', fig: 'hair-blonde|smile|torso-blue|legs-white|book' }, b: { name: 'Robo', fig: 'helmet-astro|grin|torso-astro|legs-white|wrench' } },
      chatter: [
        ['Please and thank you!', 'Làm ơn và cảm ơn nhé!'],
        ['Excuse me, can I sit here?', 'Xin lỗi, mình ngồi đây được không?'],
        ['Let me help you!', 'Để mình giúp bạn!'],
        ['Please wait in line.', 'Hãy xếp hàng nhé.'],
        ['After you!', 'Mời bạn đi trước!']
      ],
      lessons: [
        {
          title: 'Magic Words', titleVi: 'Những từ kỳ diệu', icon: '✨',
          words: [
            ['Hello!', 'phrase', '/həˈləʊ/', 'Xin chào!', '👋', 'Hello! My name is Hana.', 'Xin chào! Mình tên là Hana.', 'The first word you say when you meet someone.'],
            ['please', 'phrase', '/pliːz/', 'làm ơn, vui lòng', '🙏', 'Can I have some water, please?', 'Cho mình xin chút nước nhé?', 'A magic word to ask nicely.'],
            ['Thank you!', 'phrase', '/θæŋk juː/', 'Cảm ơn!', '💐', 'Thank you for the gift!', 'Cảm ơn bạn vì món quà!', 'You say this when someone helps you or gives you something.'],
            ['Sorry!', 'phrase', '/ˈsɒri/', 'Xin lỗi!', '😔', "Sorry! I didn't mean to.", 'Xin lỗi! Mình không cố ý.', 'You say this when you make a mistake.'],
            ['Excuse me.', 'phrase', '/ɪkˈskjuːz miː/', 'Xin lỗi (cho mình hỏi / đi qua).', '🙋', 'Excuse me, where is the library?', 'Xin lỗi, thư viện ở đâu ạ?', 'You say this before you ask a stranger a question.']
          ],
          comic: {
            title: 'Robo Learns Manners', titleVi: 'Robo học phép lịch sự',
            panels: [
              ['b', 'Hello, Hana! Robo wants water. Give me water!', 'Xin chào Hana! Robo muốn nước. Đưa nước đây!', '🤖'],
              ['a', "Robo, say 'please'! It's a magic word.", "Robo ơi, hãy nói 'làm ơn'! Đó là từ kỳ diệu đấy.", '🙏'],
              ['b', 'Can I have some water, please?', 'Cho mình xin chút nước nhé?', '💧'],
              ['a', "Here you are! And now say 'Thank you!'", "Của bạn đây! Và giờ hãy nói 'Cảm ơn!'", '💐']
            ],
            blanks: [[1, 'please', ['please', 'pizza', 'police']], [3, 'Thank you!', ['Thank you!', 'Sorry!', 'Goodbye!']]]
          },
          build: [
            { vi: 'Em muốn xin: Cho mình xin chút nước nhé?', a: ['Can I', 'have', 'some water,', 'please?'], x: ['has', 'eat'] },
            { vi: 'Em muốn xin lỗi: Xin lỗi! Mình không cố ý.', a: ['Sorry!', 'I', "didn't mean", 'to.'], x: ['Thanks!', 'eat'] }
          ],
          talk: [
            { q: 'Your friend gives you a gift. What do you say?', vi: 'Bạn của bạn tặng bạn một món quà. Bạn nói gì?', hint: 'Thank you so much!', k: ['thank|thanks'], c: ['Thank you so much!', 'Give me more!', 'Sorry, I am a gift.'] },
            { q: "You stepped on your friend's foot. What do you say?", vi: 'Bạn giẫm phải chân bạn mình. Bạn nói gì?', hint: 'Sorry! Are you okay?', k: ['sorry|okay|ok'], c: ['Sorry! Are you okay?', 'Hello! I am a foot.', 'Thank you for your foot!'] }
          ],
          snow: { vi: 'Nói lời lịch sự', l: [[['please'], 'làm ơn'], [['Water,', 'please.', 'Thank you!'], 'Cho mình nước nhé. Cảm ơn!'], [['Excuse me.', 'Can I', 'have', 'some water,', 'please?'], 'Xin lỗi. Cho mình xin chút nước nhé?']], x: ['eat', 'Go away!'] },
          cb: ['b', 'Hana, I broke your pencil. Robo is very sorry.', 'Hana ơi, Robo làm gãy bút chì của bạn rồi. Robo rất xin lỗi.', [
            ['calm', "That's okay, Robo. It was an accident.", 'Không sao đâu Robo. Đó là tai nạn mà.', 'Thank you, Hana! You are very kind!', 'Cảm ơn Hana! Bạn thật tốt bụng!', '🤖'],
            ['idea', "Don't worry! Let's fix it with a sharpener.", 'Đừng lo! Mình gọt lại bằng gọt bút chì nhé.', 'Smart idea! Robo learns so much from you!', 'Ý hay! Robo học được nhiều điều từ bạn!', '✏️']]],
          tb: ['b', 'Hello! I am Robo. Nice to meet you!', 'Xin chào! Mình là Robo. Rất vui được gặp bạn!', [
            ['yes', 'Hello, Robo! Nice to meet you, too!', 'Chào Robo! Mình cũng rất vui được gặp bạn!', "Beep beep! Let's be friends!", 'Bíp bíp! Mình làm bạn nhé!', '🤖'],
            ['ask', 'Hi, Robo! How old are you?', 'Chào Robo! Bạn bao nhiêu tuổi?', 'Robo is one year old! Beep!', 'Robo một tuổi! Bíp!', '🎂']]],
          fact: ['People in every country have a word for "thank you".', 'Ở mọi quốc gia, mọi người đều có một từ để nói "cảm ơn".'],
          tf: [
            ['We say "Excuse me" before we ask a stranger a question.', true, 'Yes! It is a polite way to start.', 'Đúng! Đó là cách mở lời lịch sự.'],
            ['We say "Sorry" when someone gives us a present.', false, 'No! We say "Thank you" for a present.', 'Sai! Mình nói "Cảm ơn" khi được tặng quà.']
          ],
          qa: ['How do you say hello to your teacher in the morning?', 'Bạn chào cô giáo vào buổi sáng như thế nào?', 'Good morning, Miss Linh!', ['good|morning|hello|hi']]
        },
        {
          title: 'Let Me Help You', titleVi: 'Để mình giúp bạn', icon: '🤝',
          words: [
            ['Let me help you!', 'phrase', '/let miː help juː/', 'Để mình giúp bạn!', '🤝', 'That bag is heavy. Let me help you!', 'Cái túi đó nặng quá. Để mình giúp bạn!', 'You say this when you want to help someone.'],
            ['Can you help me?', 'phrase', '/kæn juː help miː/', 'Bạn giúp mình được không?', '🆘', 'This box is heavy. Can you help me?', 'Cái hộp này nặng quá. Bạn giúp mình được không?', 'You ask this when you need help.'],
            ["That's very kind of you.", 'phrase', '/ðæts ˈveri kaɪnd ɒv juː/', 'Bạn thật tốt bụng.', '💖', "You carried my bag? That's very kind of you.", 'Bạn mang cặp giúp mình à? Bạn thật tốt bụng.', 'A warm way to say thank you to a helper.'],
            ['hold the door', 'verb', '/həʊld ðə dɔː/', 'giữ cửa', '🚪', 'I hold the door for my grandma.', 'Mình giữ cửa cho bà.', 'You keep the door open for someone behind you.'],
            ['share', 'verb', '/ʃeə/', 'chia sẻ', '🍪', 'I share my cookies with my friends.', 'Mình chia bánh quy cho các bạn.', 'You give part of your things to others.']
          ],
          comic: {
            title: 'The Heavy Box', titleVi: 'Chiếc hộp nặng',
            panels: [
              ['b', 'Beep! This box is heavy. Can you help me?', 'Bíp! Cái hộp này nặng quá. Bạn giúp mình được không?', '📦'],
              ['a', 'Sure! Let me help you!', 'Được chứ! Để mình giúp bạn!', '🤝'],
              ['b', "Thank you, Hana. That's very kind of you.", 'Cảm ơn Hana. Bạn thật tốt bụng.', '💖'],
              ['a', "No problem! Look, I'll hold the door, too.", 'Không có gì! Nhìn này, mình giữ cửa cho bạn luôn.', '🚪']
            ],
            blanks: [[1, 'Let me help you!', ['Let me help you!', 'Let me eat you!', 'Let me sleep!']], [3, 'hold the door', ['hold the door', 'hold the soup', 'eat the door']]]
          },
          build: [
            { vi: 'Em muốn đề nghị: Cái túi đó nặng quá. Để mình giúp bạn!', a: ['That bag', 'is heavy.', 'Let me', 'help you!'], x: ['are', 'eat'] },
            { vi: 'Em muốn kể: Mình chia bánh quy cho các bạn.', a: ['I', 'share', 'my cookies', 'with my friends.'], x: ['shares', 'eat'] }
          ],
          talk: [
            { q: 'Your friend has a lot of books. What can you say?', vi: 'Bạn của bạn mang rất nhiều sách. Bạn có thể nói gì?', hint: 'Let me help you!', k: ['help|let|carry|can'], c: ['Let me help you!', 'Let me eat your books!', 'Your books are Monday.'] },
            { q: 'Someone helps you. What do you say?', vi: 'Có người giúp bạn. Bạn nói gì?', hint: "Thank you! That's very kind of you.", k: ['thank|thanks|kind'], c: ["Thank you! That's very kind of you.", 'Go away, please!', 'I am a kind door.'] }
          ],
          snow: { vi: 'Đề nghị giúp đỡ lịch sự', l: [[['help'], 'giúp đỡ'], [['Let me', 'help', 'you!'], 'Để mình giúp bạn!'], [['Your bag', 'looks heavy.', 'Let me', 'help you', 'carry it!'], 'Cặp của bạn trông nặng quá. Để mình giúp bạn mang nhé!']], x: ['helps', 'eat'] },
          cb: ['b', 'Hana, I have one cookie, but we are two. What should we do?', 'Hana ơi, mình có một chiếc bánh quy, nhưng tụi mình có hai người. Làm sao đây?', [
            ['idea', "Let's share it! Half for you, half for me!", 'Mình chia đôi nhé! Một nửa cho bạn, một nửa cho mình!', 'Sharing is caring! Yum!', 'Chia sẻ là quan tâm! Ngon quá!', '🍪'],
            ['yes', "You can have it, Robo. I'm not hungry.", 'Bạn ăn đi Robo. Mình không đói.', "That's very kind of you, Hana!", 'Bạn thật tốt bụng, Hana!', '💖']]],
          tb: ['b', 'Hana, can you help me with my homework, please?', 'Hana ơi, bạn giúp mình làm bài tập được không?', [
            ['yes', 'Of course! Let me help you!', 'Tất nhiên rồi! Để mình giúp bạn!', "Thank you! That's very kind of you.", 'Cảm ơn! Bạn thật tốt bụng.', '📚'],
            ['no', "Sorry, I'm busy now. Can I help you after lunch?", 'Xin lỗi, giờ mình đang bận. Sau bữa trưa mình giúp được không?', 'Sure! See you after lunch.', 'Được chứ! Hẹn bạn sau bữa trưa.', '🕐']]],
          fact: ['Helping others gives your brain happy feelings!', 'Giúp đỡ người khác mang lại cho não của con cảm giác vui vẻ!'],
          tf: [
            ['We hold the door for people behind us.', true, 'Yes! It is a polite thing to do.', 'Đúng! Đó là việc làm lịch sự.'],
            ['"Share" means you keep everything for yourself.', false, 'No! "Share" means you give part of your things to others.', 'Sai! "Share" nghĩa là chia sẻ cho người khác.']
          ],
          qa: ['How do you help your friends at school?', 'Bạn giúp đỡ bạn bè ở trường như thế nào?', 'I share my crayons with my friends.', ['share|help|lend|carry|teach|hold', 'crayons|pencil|books|bag|friends|homework|door']]
        },
        {
          title: 'Wait in Line', titleVi: 'Xếp hàng trật tự', icon: '🚶',
          words: [
            ['wait in line', 'verb', '/weɪt ɪn laɪn/', 'xếp hàng', '🚶', 'Please wait in line for the bus.', 'Hãy xếp hàng chờ xe buýt nhé.', 'You stand behind other people and wait.'],
            ['take turns', 'verb', '/teɪk tɜːnz/', 'lần lượt', '🔄', 'We take turns on the slide.', 'Chúng mình lần lượt chơi cầu trượt.', 'First you, then me, then you again.'],
            ['be patient', 'verb', '/bi ˈpeɪʃnt/', 'kiên nhẫn', '⏳', 'Be patient. The bus is coming.', 'Hãy kiên nhẫn. Xe buýt sắp đến rồi.', 'You wait calmly and do not get angry.'],
            ["It's my turn.", 'phrase', '/ɪts maɪ tɜːn/', 'Đến lượt mình.', '☝️', "You played first. Now it's my turn.", 'Bạn chơi trước rồi. Giờ đến lượt mình.', 'You say this when you can play now.'],
            ['After you.', 'phrase', '/ˈɑːftə juː/', 'Mời bạn đi trước.', '🙇', 'After you, Grandma.', 'Mời bà đi trước ạ.', 'A polite way to let someone go first.']
          ],
          comic: {
            title: 'The Bus Stop', titleVi: 'Ở trạm xe buýt',
            panels: [
              ['b', 'Beep! The bus is here! Robo goes first!', 'Bíp! Xe buýt đến rồi! Robo lên trước!', '🚌'],
              ['a', 'Robo, wait in line, please. The lady was here first.', 'Robo ơi, xếp hàng nhé. Cô kia đến trước mà.', '🚶'],
              ['b', 'Oh! Sorry. After you, madam.', 'Ôi! Xin lỗi. Mời cô lên trước ạ.', '🙇'],
              ['a', "Well done, Robo! Now it's our turn.", 'Giỏi lắm Robo! Giờ đến lượt chúng mình.', '☝️']
            ],
            blanks: [[1, 'wait in line', ['wait in line', 'wait in bed', 'eat in line']], [2, 'After you', ['After you', 'Before lunch', 'Under you']]]
          },
          build: [
            { vi: 'Em muốn nhắc: Hãy xếp hàng chờ xe buýt nhé.', a: ['Please', 'wait', 'in line', 'for the bus.'], x: ['waits', 'eat'] },
            { vi: 'Em muốn nói: Bạn chơi trước rồi. Giờ đến lượt mình.', a: ['You played first.', 'Now', "it's", 'my turn.'], x: ['eat', 'yours'] }
          ],
          talk: [
            { q: 'What do you do at the bus stop?', vi: 'Bạn làm gì ở trạm xe buýt?', hint: 'I wait in line.', k: ['wait|stand|line|queue|patient'], c: ['I wait in line.', 'I eat the bus stop.', 'The bus is a pencil case.'] },
            { q: 'Your friends are on the slide. What do you do?', vi: 'Các bạn đang chơi cầu trượt. Bạn làm gì?', hint: 'I take turns and wait patiently.', k: ['take|turns|wait|patient|patiently|line'], c: ['I take turns and wait patiently.', 'I push my friends down.', 'The slide is my lunch.'] }
          ],
          snow: { vi: 'Nói về việc xếp hàng', l: [[['wait'], 'chờ đợi'], [['Please', 'wait', 'in line.'], 'Hãy xếp hàng nhé.'], [['At the canteen,', 'we', 'wait in line', 'and take turns', 'patiently.'], 'Ở căng tin, chúng mình xếp hàng và lần lượt một cách kiên nhẫn.']], x: ['waits', 'eat'] },
          cb: ['b', 'Hana, a boy pushed in front of us in the line. What can we say?', 'Hana ơi, một bạn trai chen lên trước tụi mình trong hàng. Mình có thể nói gì?', [
            ['calm', 'Excuse me, please wait in line. We were here first.', 'Xin lỗi bạn, hãy xếp hàng nhé. Tụi mình đến trước mà.', 'Polite and brave! The boy said sorry.', 'Lịch sự và dũng cảm! Bạn ấy đã xin lỗi.', '🙇'],
            ['idea', "Let's ask the teacher to help us.", 'Mình nhờ cô giáo giúp nhé.', 'Good idea! The teacher can help.', 'Ý hay! Cô giáo có thể giúp.', '👩‍🏫']]],
          tb: ['b', "Hana, there's only one swing. Can Robo go first?", 'Hana ơi, chỉ có một cái xích đu. Robo đi trước được không?', [
            ['yes', 'Sure, Robo! After you!', 'Được chứ Robo! Mời bạn đi trước!', "Thank you! Next, it's your turn!", 'Cảm ơn bạn! Tiếp theo là lượt của bạn!', '🎡'],
            ['idea', "Let's take turns. Five minutes each!", 'Mình lần lượt nhé. Mỗi người năm phút!', 'Fair and fun! Beep beep!', 'Công bằng và vui! Bíp bíp!', '⏱️']]],
          fact: ['Waiting in line helps everyone get on the bus safely and quickly.', 'Xếp hàng giúp mọi người lên xe buýt an toàn và nhanh hơn.'],
          tf: [
            ['We take turns on the slide.', true, 'Yes! Taking turns is fair for everyone.', 'Đúng! Lần lượt là công bằng với mọi người.'],
            ['It is polite to push in front of people in a line.', false, 'No! We should wait in line patiently.', 'Sai! Mình nên xếp hàng kiên nhẫn.']
          ],
          qa: ['Where do you wait in line?', 'Bạn xếp hàng ở đâu?', 'I wait in line at the canteen.', ['canteen|bus|shop|supermarket|school|library|cinema|stop|line']]
        }
      ],
      mystery: {
        t: 'The Polite Robot', tv: 'Chú robot lịch sự',
        intro: ["Four robots came to Robo's party. Which robot is the most polite?", 'Bốn chú robot đến dự tiệc của Robo. Chú nào lịch sự nhất?'],
        clues: [['Clue one: Robot Red said, "Give me cake now!"', 'Manh mối 1: Robot Đỏ nói: "Đưa bánh đây ngay!"'],
          ['Clue two: Robot Blue and Robot Yellow pushed in the line.', 'Manh mối 2: Robot Xanh dương và Robot Vàng chen ngang hàng.'],
          ['Clue three: Robot Green said, "Excuse me. Can I have some cake, please? Thank you!"', 'Manh mối 3: Robot Xanh lá nói: "Xin lỗi. Cho mình xin chút bánh nhé? Cảm ơn!"']],
        q: ['Which robot is polite?', 'Chú robot nào lịch sự?'],
        o: [['Robot Red', '🔴', 'Robot Đỏ'], ['Robot Blue', '🔵', 'Robot Xanh dương'], ['Robot Yellow', '🟡', 'Robot Vàng'], ['Robot Green', '🟢', 'Robot Xanh lá']], a: 3,
        win: ['Yes! Robot Green uses the magic words: please and thank you!', 'Đúng rồi! Robot Xanh lá dùng những từ kỳ diệu: làm ơn và cảm ơn!']
      }
    }
  );

  /* ======================= THÁNG 3 ======================= */
  Z.push(
    /* ---------- WEEK 9: Healthy Food & Vietnamese Dishes ---------- */
    {
      id: 'w9', week: 9, month: 3, monthTitle: M3[0], monthTitleVi: M3[1],
      name: 'Healthy Food & Vietnamese Dishes', vi: 'Món ăn Việt & Ăn uống lành mạnh', short: 'Healthy Food',
      topic: 'Vietnamese Dishes, Fruit & Vegetables', topicVi: 'Món Việt, rau củ & trái cây',
      color: '#E11D48', dark: '#9F1239', icon: '🍜', model: ['cafe', 'Pho Corner', 'Quán phở góc phố'],
      chars: { a: { name: 'Linh', fig: 'hair-brown|smile|torso-red|legs-blue|none' }, b: { name: 'Chef Bao', fig: 'chef-hat|grin|torso-chef|legs-black|pizza' } },
      chatter: [
        ['Pho is my favourite breakfast!', 'Phở là bữa sáng yêu thích của mình!'],
        ['Eat your vegetables, please!', 'Ăn rau đi con!'],
        ['Fresh fruit is good for you.', 'Trái cây tươi tốt cho sức khỏe.'],
        ["I'm full. Thank you!", 'Mình no rồi. Cảm ơn!'],
        ['Too much candy is bad for your teeth.', 'Ăn nhiều kẹo không tốt cho răng.']
      ],
      lessons: [
        {
          title: 'Vietnamese Food', titleVi: 'Món ăn Việt Nam', icon: '🍜',
          words: [
            ['pho', 'noun', '/fɜː/', 'phở', '🍜', 'I have pho for breakfast on Sundays.', 'Chủ nhật mình ăn phở vào bữa sáng.', 'A bowl of hot noodle soup with beef or chicken.'],
            ['broken rice', 'noun', '/ˈbrəʊkən raɪs/', 'cơm tấm', '🍛', 'My dad loves broken rice with pork.', 'Bố mình rất thích cơm tấm sườn.', 'Small pieces of rice, often eaten with grilled pork.'],
            ['spring rolls', 'noun', '/ˌsprɪŋ ˈrəʊlz/', 'nem rán, chả giò', '🌯', 'We make spring rolls for Tet.', 'Nhà mình làm nem rán dịp Tết.', 'Crispy rolls with meat and vegetables inside.'],
            ['banh mi', 'noun', '/bɑːn ˈmiː/', 'bánh mì', '🥖', 'I buy a banh mi on the way to school.', 'Mình mua một ổ bánh mì trên đường đến trường.', 'Vietnamese bread with meat and vegetables inside.'],
            ['sticky rice', 'noun', '/ˈstɪki raɪs/', 'xôi', '🍙', 'Grandma cooks sticky rice with green beans.', 'Bà nấu xôi đỗ xanh.', 'Soft rice that sticks together, often eaten for breakfast.']
          ],
          comic: {
            title: 'Breakfast Choices', titleVi: 'Chọn món ăn sáng',
            panels: [
              ['b', 'Good morning, Linh! What would you like for breakfast?', 'Chào buổi sáng Linh! Cháu muốn ăn sáng món gì?', '🍳'],
              ['a', "I'd like a bowl of pho, please!", 'Cho cháu một bát phở ạ!', '🍜'],
              ['b', 'Sorry, no pho today. We have banh mi and sticky rice.', 'Xin lỗi, hôm nay hết phở rồi. Chú có bánh mì và xôi.', '🥖'],
              ['a', "Then sticky rice, please! It's yummy, too!", 'Vậy cho cháu xôi ạ! Xôi cũng ngon!', '🍙']
            ],
            blanks: [[1, 'pho', ['pho', 'phone', 'photo']], [3, 'sticky rice', ['sticky rice', 'sticky glue', 'sticky shoes']]]
          },
          build: [
            { vi: 'Em muốn gọi món: Cho cháu một bát phở ạ.', a: ["I'd like", 'a bowl of', 'pho,', 'please.'], x: ['eat', 'likes'] },
            { vi: 'Em muốn kể: Bố mình rất thích cơm tấm.', a: ['My dad', 'loves', 'broken rice.'], x: ['love', 'eat'] }
          ],
          talk: [
            { q: 'What Vietnamese food do you like?', vi: 'Bạn thích món ăn Việt Nam nào?', hint: 'I like pho and spring rolls.', k: ['pho|rice|rolls|banh|mi|sticky|noodles|bun|soup|spring|broken'], c: ['I like pho and spring rolls.', 'I like pencils and rulers.', 'Food is a Monday.'] },
            { q: 'What do you usually have for breakfast?', vi: 'Bạn thường ăn gì vào bữa sáng?', hint: 'I usually have sticky rice.', k: ['have|eat|usually', 'pho|rice|banh|bread|milk|noodles|egg|eggs|sticky|cereal'], c: ['I usually have sticky rice.', 'I usually have a schoolbag.', 'Breakfast is in my wardrobe.'] }
          ],
          snow: { vi: 'Gọi món ăn sáng', l: [[['pho'], 'phở'], [['I', 'want', 'pho.'], 'Mình muốn ăn phở.'], [["I'd like", 'a big bowl', 'of chicken pho', 'for breakfast,', 'please.'], 'Cho cháu một bát phở gà to cho bữa sáng ạ.']], x: ['wants', 'eat'] },
          cb: ['b', 'Linh, would you like to try my new spicy noodles?', 'Linh ơi, cháu có muốn thử món mì cay mới của chú không?', [
            ['yes', 'Yes, please! I love spicy food!', 'Có ạ! Cháu thích đồ cay lắm!', 'Brave girl! Drink some water, too!', 'Cô bé dũng cảm! Uống thêm nước nhé!', '🌶️'],
            ['no', 'No, thank you. Spicy food hurts my mouth. Can I have spring rolls?', 'Dạ thôi ạ. Đồ cay làm cháu rát miệng. Cho cháu nem rán được không ạ?', 'Of course! Crispy spring rolls coming!', 'Tất nhiên! Nem rán giòn tới ngay!', '🌯']]],
          tb: ['b', 'What is your favourite Vietnamese dish?', 'Món ăn Việt Nam yêu thích của cháu là gì?', [
            ['yes', 'Broken rice! I love the grilled pork!', 'Cơm tấm ạ! Cháu mê sườn nướng!', 'Yum! Me too!', 'Ngon tuyệt! Chú cũng vậy!', '🍛'],
            ['calm', "I like banh mi because it's quick and tasty.", 'Cháu thích bánh mì vì nó nhanh và ngon.', 'Good choice for busy mornings!', 'Lựa chọn hay cho những buổi sáng vội vàng!', '🥖']]],
          fact: ['Pho is famous all around the world. People eat it in many countries!', 'Phở nổi tiếng khắp thế giới. Người ta ăn phở ở rất nhiều nước!'],
          tf: [
            ['Pho is a hot noodle soup.', true, 'Yes! Pho is noodle soup with beef or chicken.', 'Đúng! Phở là món bánh phở nước với bò hoặc gà.'],
            ['Banh mi is a kind of drink.', false, 'No! Banh mi is Vietnamese bread.', 'Sai! Bánh mì là một loại bánh.']
          ],
          qa: ['What did you have for dinner yesterday?', 'Tối qua bạn đã ăn món gì?', 'I had rice, fish and vegetables.', ['had|ate|have|eat', 'rice|fish|meat|chicken|pork|vegetables|soup|noodles|pho|egg|tofu']]
        },
        {
          title: 'Fruit & Vegetables', titleVi: 'Rau củ & Trái cây', icon: '🥕',
          words: [
            ['vegetables', 'noun', '/ˈvedʒtəblz/', 'rau củ', '🥗', 'Eat your vegetables every day.', 'Hãy ăn rau mỗi ngày.', 'Carrots, cabbage and beans are all in this food group.'],
            ['carrot', 'noun', '/ˈkærət/', 'cà rốt', '🥕', 'Rabbits love carrots.', 'Thỏ rất thích cà rốt.', 'A long orange vegetable that grows under the ground.'],
            ['broccoli', 'noun', '/ˈbrɒkəli/', 'bông cải xanh', '🥦', 'Broccoli looks like a little green tree.', 'Bông cải xanh trông như một cái cây nhỏ.', 'A green vegetable that looks like a tiny tree.'],
            ['mango', 'noun', '/ˈmæŋɡəʊ/', 'quả xoài', '🥭', 'This mango is sweet and juicy.', 'Quả xoài này ngọt và mọng nước.', 'A sweet yellow fruit with a big seed inside.'],
            ['watermelon', 'noun', '/ˈwɔːtəmelən/', 'dưa hấu', '🍉', 'We eat watermelon in summer.', 'Nhà mình ăn dưa hấu vào mùa hè.', 'A big green fruit. It is red and juicy inside.']
          ],
          comic: {
            title: 'The Rainbow Salad', titleVi: 'Món salad cầu vồng',
            panels: [
              ['b', 'Today we will make a rainbow salad! Can you wash the vegetables?', 'Hôm nay mình làm món salad cầu vồng! Cháu rửa rau giúp chú nhé?', '🥗'],
              ['a', 'Sure! Orange carrots, green broccoli, red tomatoes!', 'Vâng ạ! Cà rốt cam, bông cải xanh, cà chua đỏ!', '🥕'],
              ['b', 'And for dessert, we have mango and watermelon.', 'Và tráng miệng có xoài và dưa hấu.', '🥭'],
              ['a', "A rainbow on my plate! It's healthy and yummy!", 'Cả cầu vồng trên đĩa! Vừa bổ vừa ngon!', '🌈']
            ],
            blanks: [[0, 'vegetables', ['vegetables', 'vacations', 'volcanoes']], [2, 'watermelon', ['watermelon', 'water bottle', 'waiter']]]
          },
          build: [
            { vi: 'Em muốn khuyên: Hãy ăn rau mỗi ngày.', a: ['Eat', 'your vegetables', 'every day.'], x: ['Eats', 'never'] },
            { vi: 'Em muốn tả: Quả xoài này ngọt và mọng nước.', a: ['This mango', 'is', 'sweet', 'and juicy.'], x: ['are', 'eat'] }
          ],
          talk: [
            { q: 'What is your favourite fruit?', vi: 'Loại trái cây yêu thích nhất của bạn là gì?', hint: 'My favourite fruit is mango.', k: ['mango|watermelon|banana|apple|orange|grapes|papaya|pineapple|dragon|lychee|longan|strawberry|fruit'], c: ['My favourite fruit is mango.', 'My favourite fruit is a chair.', 'Fruit is Wednesday.'] },
            { q: 'Do you like vegetables?', vi: 'Bạn có thích ăn rau không?', hint: 'Yes, I like carrots and broccoli.', k: ["yes|no|like|love|don't", 'vegetables|carrots|carrot|broccoli|cabbage|beans|tomatoes|spinach'], c: ['Yes, I like carrots and broccoli.', 'Yes, I like eating my desk.', 'Vegetables are my shoes.'] }
          ],
          snow: { vi: 'Kể về trái cây yêu thích', l: [[['a mango'], 'một quả xoài'], [['I', 'like', 'mangoes.'], 'Mình thích xoài.'], [['In summer,', 'I', 'love eating', 'sweet yellow mangoes', 'with my family.'], 'Vào mùa hè, mình thích ăn xoài vàng ngọt cùng gia đình.']], x: ['likes', 'eat'] },
          cb: ['b', "Linh, you didn't eat your broccoli. Why?", 'Linh ơi, cháu chưa ăn bông cải xanh. Sao vậy?', [
            ['calm', "I don't like it very much. Can I eat carrots instead?", 'Cháu không thích lắm ạ. Cháu ăn cà rốt thay được không?', 'Okay! Carrots are healthy, too.', 'Được! Cà rốt cũng tốt cho sức khỏe.', '🥕'],
            ['yes', "Okay, I'll try one piece. Hmm... it's not bad!", 'Vâng, cháu thử một miếng. Ừm... cũng không tệ!', "Great job! You're a brave eater!", 'Giỏi lắm! Cháu dám thử món mới!', '🥦']]],
          tb: ['b', 'Would you like some watermelon?', 'Cháu có muốn ăn chút dưa hấu không?', [
            ['yes', "Yes, please! It's so hot today!", 'Có ạ! Hôm nay nóng quá!', 'Here you are. Nice and cold!', 'Của cháu đây. Mát lạnh luôn!', '🍉'],
            ['no', "No, thank you. I'm full. Maybe later!", 'Dạ thôi ạ. Cháu no rồi. Lát nữa nhé!', "Okay! I'll keep some for you.", 'Được! Chú để phần cho cháu.', '😊']]],
          fact: ['A watermelon is about ninety percent water!', 'Dưa hấu có khoảng chín mươi phần trăm là nước!'],
          tf: [
            ['Carrots grow under the ground.', true, 'Yes! We pull carrots out of the soil.', 'Đúng! Mình nhổ cà rốt lên từ đất.'],
            ['A watermelon is blue inside.', false, 'No! A watermelon is red inside.', 'Sai! Ruột dưa hấu màu đỏ.']
          ],
          qa: ['Which vegetables do you eat at home?', 'Ở nhà bạn ăn những loại rau nào?', 'I eat cabbage and carrots.', ['cabbage|carrots|carrot|broccoli|beans|tomatoes|spinach|morning|vegetables|potatoes|cucumber']]
        },
        {
          title: 'Healthy or Junk?', titleVi: 'Lành mạnh hay ăn vặt?', icon: '🍎',
          words: [
            ['healthy food', 'noun', '/ˈhelθi fuːd/', 'đồ ăn lành mạnh', '🥗', 'Fish and vegetables are healthy food.', 'Cá và rau là đồ ăn lành mạnh.', 'Food that makes your body strong.'],
            ['junk food', 'noun', '/ˈdʒʌŋk fuːd/', 'đồ ăn vặt không tốt', '🍟', 'Chips and candy are junk food.', 'Khoai tây chiên và kẹo là đồ ăn vặt không tốt.', 'Food with too much sugar, salt or oil.'],
            ['fizzy drinks', 'noun', '/ˈfɪzi drɪŋks/', 'nước ngọt có ga', '🥤', 'Too many fizzy drinks are bad for your teeth.', 'Uống quá nhiều nước ngọt có ga không tốt cho răng.', 'Sweet drinks with lots of little bubbles.'],
            ['fresh fruit', 'noun', '/freʃ fruːt/', 'trái cây tươi', '🍎', 'I eat fresh fruit after lunch.', 'Mình ăn trái cây tươi sau bữa trưa.', 'Apples, bananas and oranges straight from the market.'],
            ["I'm full.", 'phrase', '/aɪm fʊl/', 'Mình no rồi.', '😌', "No more, thank you. I'm full.", 'Thôi ạ, cảm ơn. Cháu no rồi.', 'You say this when you cannot eat any more.']
          ],
          comic: {
            title: "Chef Bao's Challenge", titleVi: 'Thử thách của chú Bảo',
            panels: [
              ['b', 'Linh, help me sort the food: healthy food or junk food?', 'Linh ơi, giúp chú phân loại: đồ ăn lành mạnh hay đồ ăn vặt?', '🧺'],
              ['a', 'Fish, eggs and fresh fruit are healthy!', 'Cá, trứng và trái cây tươi là lành mạnh ạ!', '🍎'],
              ['b', 'What about chips, candy and fizzy drinks?', 'Còn khoai tây chiên, kẹo và nước ngọt có ga thì sao?', '🥤'],
              ['a', 'Junk food! We can eat it only sometimes.', 'Đồ ăn vặt ạ! Mình chỉ thỉnh thoảng ăn thôi.', '🍟']
            ],
            blanks: [[1, 'fresh fruit', ['fresh fruit', 'fresh socks', 'fried shoes']], [2, 'fizzy drinks', ['fizzy drinks', 'fuzzy dogs', 'funny drums']]]
          },
          build: [
            { vi: 'Em muốn nói: Cá và rau là đồ ăn lành mạnh.', a: ['Fish and vegetables', 'are', 'healthy', 'food.'], x: ['is', 'junk'] },
            { vi: 'Em muốn từ chối lịch sự: Thôi ạ, cảm ơn. Cháu no rồi.', a: ['No more,', 'thank you.', "I'm", 'full.'], x: ['hungry', 'eat'] }
          ],
          talk: [
            { q: 'Is candy healthy food or junk food?', vi: 'Kẹo là đồ ăn lành mạnh hay đồ ăn vặt?', hint: "It's junk food.", k: ['junk|unhealthy|bad'], c: ["It's junk food.", "It's a vegetable.", "It's my teacher."] },
            { q: 'What healthy food do you eat every day?', vi: 'Bạn ăn món lành mạnh nào mỗi ngày?', hint: 'I eat rice, fish and vegetables.', k: ['rice|fish|vegetables|fruit|eggs|egg|milk|meat|chicken|tofu|soup|beans'], c: ['I eat rice, fish and vegetables.', 'I eat chips and candy all day.', 'I eat my pencil case.'] }
          ],
          snow: { vi: 'Khuyên ăn uống lành mạnh', l: [[['fresh fruit'], 'trái cây tươi'], [['Eat', 'fresh', 'fruit.'], 'Hãy ăn trái cây tươi.'], [['You', 'should eat', 'fresh fruit', 'every day', 'because it is healthy.'], 'Bạn nên ăn trái cây tươi mỗi ngày vì nó tốt cho sức khỏe.']], x: ['junk', 'eats'] },
          cb: ['b', "Linh, it's a party! Would you like a fizzy drink?", 'Linh ơi, tiệc rồi! Cháu có muốn uống nước ngọt có ga không?', [
            ['yes', 'Just one small glass, please. Thank you!', 'Một ly nhỏ thôi ạ. Cháu cảm ơn!', 'Good choice! Not too much sugar.', 'Lựa chọn hay! Không quá nhiều đường.', '🥤'],
            ['idea', 'No, thanks. Can I have orange juice instead?', 'Dạ thôi ạ. Cháu uống nước cam được không?', 'Super healthy choice! Here you are.', 'Lựa chọn rất lành mạnh! Của cháu đây.', '🍊']]],
          tb: ['b', 'Would you like some more rice?', 'Cháu có muốn ăn thêm cơm không?', [
            ['yes', "Yes, please! It's delicious!", 'Có ạ! Ngon quá!', 'Here you are. Eat well!', 'Của cháu đây. Ăn ngon nhé!', '🍚'],
            ['no', "No more, thank you. I'm full.", 'Thôi ạ, cháu cảm ơn. Cháu no rồi.', "Okay! Let's have some fruit later.", 'Được! Lát nữa mình ăn trái cây nhé.', '🍎']]],
          fact: ['Your brain and muscles need healthy food to grow strong.', 'Não và cơ bắp của con cần đồ ăn lành mạnh để phát triển khỏe mạnh.'],
          tf: [
            ['Fresh fruit is healthy food.', true, 'Yes! Fruit gives you vitamins.', 'Đúng! Trái cây cung cấp vitamin cho con.'],
            ['You should drink fizzy drinks at every meal.', false, 'No! Fizzy drinks have too much sugar.', 'Sai! Nước ngọt có ga có quá nhiều đường.']
          ],
          qa: ['What do you say when you cannot eat any more?', 'Bạn nói gì khi không ăn thêm được nữa?', "No more, thank you. I'm full.", ['full|no|more|thank|thanks']]
        }
      ],
      mystery: {
        t: "Chef Bao's Mystery Dish", tv: 'Món ăn bí ẩn của chú Bảo',
        intro: ['Chef Bao cooked a secret dish for Linh. What is it?', 'Chú Bảo nấu một món bí mật cho Linh. Đó là món gì?'],
        clues: [["Clue one: It isn't bread.", 'Manh mối 1: Nó không phải bánh mì.'],
          ["Clue two: It isn't crispy.", 'Manh mối 2: Nó không giòn.'],
          ['Clue three: It is a hot soup. You eat it with chopsticks and a spoon.', 'Manh mối 3: Đó là món có nước nóng. Bạn ăn bằng đũa và thìa.']],
        q: ['What is the secret dish?', 'Món ăn bí mật là gì?'],
        o: [['banh mi', '🥖', 'bánh mì'], ['spring rolls', '🌯', 'nem rán'], ['sticky rice', '🍙', 'xôi'], ['pho', '🍜', 'phở']], a: 3,
        win: ["Delicious! It's a hot bowl of pho!", 'Ngon tuyệt! Đó là một bát phở nóng hổi!']
      }
    },

    /* ---------- WEEK 10: At the Supermarket & Bistro ---------- */
    {
      id: 'w10', week: 10, month: 3, monthTitle: M3[0], monthTitleVi: M3[1],
      name: 'Supermarket & Bistro', vi: 'Siêu thị & Nhà hàng', short: 'Shopping',
      topic: 'Shopping, Prices & Ordering Food', topicVi: 'Mua sắm, giá tiền & gọi món',
      color: '#0D9488', dark: '#115E59', icon: '🛒', model: ['shop', 'Super Supermarket', 'Siêu thị của bé'],
      chars: { a: { name: 'Peter', fig: 'cap-red|wink|torso-blue|legs-tan|none' }, b: { name: 'Mum', fig: 'hair-brown|smile|torso-red|legs-black|none' } },
      chatter: [
        ["Let's check the shopping list!", 'Mình xem danh sách mua sắm nhé!'],
        ['How much is it?', 'Cái này bao nhiêu tiền?'],
        ["It's twenty thousand dong.", 'Hai mươi nghìn đồng.'],
        ['Can I have the bill, please?', 'Cho cháu xin hóa đơn ạ.'],
        ['Enjoy your meal!', 'Chúc ngon miệng!']
      ],
      lessons: [
        {
          title: 'At the Supermarket', titleVi: 'Ở siêu thị', icon: '🛒',
          words: [
            ['shopping list', 'noun', '/ˈʃɒpɪŋ lɪst/', 'danh sách mua sắm', '📝', 'Mum writes a shopping list.', 'Mẹ viết danh sách mua sắm.', 'A paper that shows the things you want to buy.'],
            ['trolley', 'noun', '/ˈtrɒli/', 'xe đẩy hàng', '🛒', 'I push the trolley in the supermarket.', 'Mình đẩy xe hàng trong siêu thị.', 'You put your shopping in it and push it around the shop.'],
            ['a bottle of milk', 'noun', '/ə ˈbɒtl ɒv mɪlk/', 'một chai sữa', '🥛', 'We need a bottle of milk.', 'Nhà mình cần một chai sữa.', 'A white drink from cows, in a tall container.'],
            ['a dozen eggs', 'noun', '/ə ˈdʌzn eɡz/', 'một tá trứng (12 quả)', '🥚', 'Please buy a dozen eggs.', 'Con mua giúp mẹ một tá trứng nhé.', 'Twelve of these, from chickens.'],
            ['a bag of rice', 'noun', '/ə bæɡ ɒv raɪs/', 'một túi gạo', '🍚', 'A bag of rice is very heavy.', 'Một túi gạo rất nặng.', 'A big pack of white grains we cook every day.']
          ],
          comic: {
            title: 'The Shopping List', titleVi: 'Danh sách mua sắm',
            panels: [
              ['b', 'Peter, here is our shopping list. Can you read it?', 'Peter ơi, đây là danh sách mua sắm. Con đọc giúp mẹ nhé?', '📝'],
              ['a', 'A bottle of milk, a dozen eggs and some bananas!', 'Một chai sữa, một tá trứng và mấy quả chuối!', '🥛'],
              ['b', 'Great! Can you push the trolley, please?', 'Giỏi lắm! Con đẩy xe hàng giúp mẹ nhé?', '🛒'],
              ['a', 'Sure! Zoom zoom! Oops, careful with the eggs!', 'Vâng ạ! Vù vù! Ối, cẩn thận mấy quả trứng!', '🥚']
            ],
            blanks: [[0, 'shopping list', ['shopping list', 'shopping lizard', 'sleeping list']], [2, 'trolley', ['trolley', 'turtle', 'trumpet']]]
          },
          build: [
            { vi: 'Em muốn nói: Nhà mình cần một chai sữa.', a: ['We', 'need', 'a bottle of', 'milk.'], x: ['needs', 'eat'] },
            { vi: 'Em muốn kể: Mình đẩy xe hàng trong siêu thị.', a: ['I', 'push', 'the trolley', 'in the supermarket.'], x: ['pushes', 'eat'] }
          ],
          talk: [
            { q: 'What is on your shopping list?', vi: 'Trong danh sách mua sắm của bạn có gì?', hint: 'Milk, eggs and rice.', k: ['milk|eggs|egg|rice|bread|fruit|bananas|apples|vegetables|fish|meat|water|juice'], c: ['Milk, eggs and rice.', 'A bus, a desk and a cloud.', 'My list is Tuesday.'] },
            { q: 'Who goes shopping with you?', vi: 'Ai đi mua sắm cùng bạn?', hint: 'My mum goes shopping with me.', k: ['mum|mom|dad|grandma|grandpa|sister|brother|family|parents'], c: ['My mum goes shopping with me.', 'My trolley goes to school.', 'Shopping is my pencil.'] }
          ],
          snow: { vi: 'Đi siêu thị cùng mẹ', l: [[['some milk'], 'một ít sữa'], [['We', 'need', 'some milk.'], 'Nhà mình cần ít sữa.'], [['At the supermarket,', 'we', 'buy', 'a bottle of milk', 'and a dozen eggs.'], 'Ở siêu thị, nhà mình mua một chai sữa và một tá trứng.']], x: ['needs', 'eat'] },
          cb: ['b', "Peter, the list says one bag of rice, but it's very heavy. What can we do?", 'Peter ơi, danh sách ghi một túi gạo, nhưng nó nặng lắm. Mình làm sao đây?', [
            ['idea', "Let's put it in the trolley!", 'Mình bỏ vào xe đẩy đi mẹ!', 'Smart thinking! No heavy lifting.', 'Nghĩ hay lắm! Không phải bê nặng.', '🛒'],
            ['yes', "I'm strong! Let me carry it, Mum!", 'Con khỏe mà! Để con bê cho mẹ!', 'Wow! Thank you, my strong helper!', 'Oa! Cảm ơn người giúp việc khỏe mạnh của mẹ!', '💪']]],
          tb: ['b', 'Peter, can you find the milk for me?', 'Peter ơi, con tìm sữa giúp mẹ được không?', [
            ['yes', "Sure! It's in the fridge next to the yoghurt.", 'Vâng! Nó ở trong tủ lạnh cạnh sữa chua ạ.', "You're a supermarket detective!", 'Con đúng là thám tử siêu thị!', '🔍'],
            ['ask', 'Do we need a big bottle or a small bottle?', 'Mình cần chai to hay chai nhỏ ạ?', 'A big one, please. Good question!', 'Chai to con nhé. Câu hỏi hay!', '🥛']]],
          fact: ['A dozen means twelve. So twelve eggs is a dozen eggs!', 'Một tá nghĩa là mười hai. Vậy mười hai quả trứng là một tá trứng!'],
          tf: [
            ['A dozen eggs is twelve eggs.', true, 'Yes! A dozen means twelve.', 'Đúng! Một tá là mười hai.'],
            ['We put our shopping in the washing machine.', false, 'No! We put our shopping in a trolley.', 'Sai! Mình bỏ đồ mua vào xe đẩy hàng.']
          ],
          qa: ['What do you buy at the supermarket?', 'Bạn mua gì ở siêu thị?', 'I buy milk, fruit and bread.', ['buy|get', 'milk|fruit|bread|eggs|rice|snacks|vegetables|water|juice|meat|fish|candy|toys']]
        },
        {
          title: 'How Much Is It?', titleVi: 'Cái này bao nhiêu tiền?', icon: '💰',
          words: [
            ['How much is it?', 'phrase', '/haʊ mʌtʃ ɪz ɪt/', 'Cái này bao nhiêu tiền?', '💰', 'Excuse me, how much is it?', 'Xin lỗi, cái này bao nhiêu tiền ạ?', 'You ask this when you want to know the price.'],
            ['twenty thousand dong', 'noun', '/ˈtwenti ˈθaʊznd dɒŋ/', 'hai mươi nghìn đồng', '💵', "It's twenty thousand dong.", 'Nó giá hai mươi nghìn đồng.', 'A Vietnamese price: 20,000.'],
            ['cheap', 'adj', '/tʃiːp/', 'rẻ', '🪙', 'These pencils are cheap.', 'Mấy chiếc bút chì này rẻ.', 'It does not cost a lot of money.'],
            ['expensive', 'adj', '/ɪkˈspensɪv/', 'đắt', '💎', 'That LEGO set is expensive!', 'Bộ LEGO đó đắt quá!', 'It costs a lot of money.'],
            ['checkout', 'noun', '/ˈtʃekaʊt/', 'quầy thanh toán', '🧾', 'We pay at the checkout.', 'Nhà mình trả tiền ở quầy thanh toán.', 'The place in a shop where you pay for your things.']
          ],
          comic: {
            title: 'Can I Buy It?', titleVi: 'Con mua được không?',
            panels: [
              ['a', 'Mum, look at this robot! How much is it?', 'Mẹ ơi, nhìn con robot này! Nó bao nhiêu tiền ạ?', '🤖'],
              ['b', "It's five hundred thousand dong. It's expensive!", 'Năm trăm nghìn đồng. Đắt quá con ạ!', '💎'],
              ['a', "Okay. What about this ball? It's cheap!", 'Vâng ạ. Còn quả bóng này thì sao? Nó rẻ mà!', '⚽'],
              ['b', "Yes, twenty thousand dong. Let's pay at the checkout.", 'Ừ, hai mươi nghìn đồng. Mình ra quầy thanh toán nhé.', '🧾']
            ],
            blanks: [[0, 'How much is it?', ['How much is it?', 'How old is it?', 'What colour is it?']], [1, 'expensive', ['expensive', 'exciting', 'excellent']]]
          },
          build: [
            { vi: 'Em muốn hỏi giá: Xin lỗi, cái này bao nhiêu tiền ạ?', a: ['Excuse me,', 'how much', 'is it?'], x: ['are', 'many'] },
            { vi: 'Em muốn nói: Bộ LEGO đó đắt quá!', a: ['That LEGO set', 'is', 'very', 'expensive!'], x: ['are', 'cheap'] }
          ],
          talk: [
            { q: 'How much is this ice cream?', vi: 'Cây kem này bao nhiêu tiền?', hint: "It's ten thousand dong.", k: ['thousand|dong|hundred|ten|twenty|five|fifteen'], c: ["It's ten thousand dong.", "It's a chocolate Monday.", "It's on my head."] },
            { q: 'Is a LEGO set cheap or expensive?', vi: 'Một bộ LEGO rẻ hay đắt?', hint: "It's expensive.", k: ['cheap|expensive|dear'], c: ["It's expensive.", "It's a banana.", "It's very sleepy."] }
          ],
          snow: { vi: 'Hỏi giá khi mua đồ', l: [[['How much?'], 'Bao nhiêu tiền?'], [['How much', 'is', 'it?'], 'Cái này bao nhiêu tiền?'], [['Excuse me,', 'how much', 'is', 'this red ball,', 'please?'], 'Xin lỗi, quả bóng đỏ này bao nhiêu tiền ạ?']], x: ['are', 'many'] },
          cb: ['b', 'Peter, this toy car is expensive. What do you think?', 'Peter ơi, chiếc ô tô đồ chơi này đắt lắm. Con nghĩ sao?', [
            ['calm', "Okay, Mum. Let's buy a cheap one.", 'Vâng mẹ. Mình mua cái rẻ hơn nhé.', 'Good boy! You understand money.', 'Con ngoan! Con hiểu giá trị đồng tiền.', '🚗'],
            ['idea', 'Can I save my money and buy it next month?', 'Con để dành tiền và tháng sau mua được không ạ?', "Wonderful idea! Let's start a piggy bank.", 'Ý tuyệt vời! Mình làm heo đất nhé.', '🐷']]],
          tb: ['b', 'Welcome to our shop! Can I help you?', 'Chào mừng đến cửa hàng! Cô giúp gì được cho cháu?', [
            ['ask', 'Yes, please. How much is this notebook?', 'Dạ có ạ. Quyển vở này bao nhiêu tiền ạ?', "It's fifteen thousand dong.", 'Mười lăm nghìn đồng cháu nhé.', '📓'],
            ['calm', "No, thank you. I'm just looking.", 'Dạ thôi ạ, cháu cảm ơn. Cháu chỉ xem thôi.', 'No problem! Take your time.', 'Không sao! Cháu cứ từ từ xem nhé.', '👀']]],
          fact: ['Before coins and paper money, people swapped things like rice and salt!', 'Trước khi có tiền xu và tiền giấy, người ta trao đổi đồ vật như gạo và muối!'],
          tf: [
            ['"Expensive" means it costs a lot of money.', true, 'Yes! Expensive things cost a lot.', 'Đúng! Đồ đắt tốn nhiều tiền.'],
            ['We pay at the checkout with crayons.', false, 'No! We pay with money at the checkout.', 'Sai! Mình trả bằng tiền ở quầy thanh toán.']
          ],
          qa: ['How do you ask the price of something?', 'Bạn hỏi giá một món đồ như thế nào?', 'Excuse me, how much is it?', ['how|much|price|cost']]
        },
        {
          title: 'Ordering Politely', titleVi: 'Gọi món lịch sự', icon: '🍽️',
          words: [
            ["I'd like...", 'phrase', '/aɪd laɪk/', 'Cho tôi... / Tôi muốn...', '☝️', "I'd like a glass of orange juice, please.", 'Cho cháu một ly nước cam ạ.', 'A polite way to say what you want.'],
            ['Can I have...?', 'phrase', '/kæn aɪ hæv/', 'Cho tôi... được không?', '🙋', 'Can I have a spoon, please?', 'Cho cháu một cái thìa được không ạ?', 'A polite question when you want something.'],
            ['the menu', 'noun', '/ðə ˈmenjuː/', 'thực đơn', '📜', 'Can I see the menu, please?', 'Cho cháu xem thực đơn được không ạ?', 'A list of food and drinks in a restaurant.'],
            ['the bill', 'noun', '/ðə bɪl/', 'hóa đơn', '🧾', 'Excuse me, can we have the bill?', 'Xin lỗi, cho chúng tôi xin hóa đơn ạ.', 'A paper that shows how much you must pay at a restaurant.'],
            ['Enjoy your meal!', 'phrase', '/ɪnˈdʒɔɪ jɔː miːl/', 'Chúc ngon miệng!', '😋', 'Here is your soup. Enjoy your meal!', 'Canh của quý khách đây. Chúc ngon miệng!', 'The waiter says this when the food arrives.']
          ],
          comic: {
            title: 'Peter Orders Lunch', titleVi: 'Peter gọi món',
            panels: [
              ['a', 'Excuse me, can I see the menu, please?', 'Xin lỗi, cho cháu xem thực đơn được không ạ?', '📜'],
              ['b', 'Here you are. What would you like?', 'Đây cháu. Cháu muốn dùng gì?', '🤔'],
              ['a', "I'd like chicken rice and a glass of water, please.", 'Cho cháu cơm gà và một ly nước ạ.', '🍗'],
              ['b', "Here's your lunch. Enjoy your meal!", 'Bữa trưa của cháu đây. Chúc ngon miệng!', '😋']
            ],
            blanks: [[0, 'the menu', ['the menu', 'the moon', 'the mango']], [3, 'Enjoy your meal!', ['Enjoy your meal!', 'Wash your meal!', 'Happy birthday!']]]
          },
          build: [
            { vi: 'Em muốn gọi món: Cho cháu cơm gà và một ly nước ạ.', a: ["I'd like", 'chicken rice', 'and a glass of water,', 'please.'], x: ['likes', 'eat'] },
            { vi: 'Em muốn xin hóa đơn: Xin lỗi, cho chúng cháu xin hóa đơn ạ.', a: ['Excuse me,', 'can we have', 'the bill,', 'please?'], x: ['has', 'eat'] }
          ],
          talk: [
            { q: 'What would you like to eat?', vi: 'Bạn muốn ăn gì?', hint: "I'd like chicken rice, please.", k: ["like|i'd|have|want", 'rice|chicken|pho|noodles|pizza|banh|soup|fish|spring|please'], c: ["I'd like chicken rice, please.", "I'd like a pencil soup.", 'I am the menu.'] },
            { q: 'What do you say when you want to pay?', vi: 'Bạn nói gì khi muốn thanh toán?', hint: 'Can we have the bill, please?', k: ['bill|pay|check'], c: ['Can we have the bill, please?', 'Can we have the moon, please?', 'I want to eat the bill.'] }
          ],
          snow: { vi: 'Gọi đồ uống lịch sự', l: [[['orange juice'], 'nước cam'], [["I'd like", 'orange juice,', 'please.'], 'Cho cháu nước cam ạ.'], [['Excuse me.', "I'd like", 'a glass of', 'cold orange juice,', 'please.'], 'Xin lỗi. Cho cháu một ly nước cam mát lạnh ạ.']], x: ['likes', 'eat'] },
          cb: ['b', "Sorry, we don't have chicken rice today. What would you like instead?", 'Xin lỗi, hôm nay hết cơm gà rồi. Cháu muốn đổi món gì?', [
            ['idea', 'Can I have fried noodles, please?', 'Cho cháu mì xào được không ạ?', 'Of course! One fried noodles coming!', 'Tất nhiên! Một đĩa mì xào tới ngay!', '🍝'],
            ['ask', 'What do you recommend?', 'Cô gợi ý món nào ạ?', "Try our fish soup. It's delicious!", 'Thử canh cá nhé. Ngon lắm đấy!', '🐟']]],
          tb: ['b', "Here's your bill. It's sixty thousand dong.", 'Hóa đơn của cháu đây. Sáu mươi nghìn đồng.', [
            ['calm', 'Here you are. Thank you! The food was delicious.', 'Gửi cô ạ. Cháu cảm ơn! Đồ ăn ngon lắm.', 'Thank you! Please come again!', 'Cảm ơn cháu! Lần sau lại đến nhé!', '👋'],
            ['ask', 'Can I pay with a card, please?', 'Cháu trả bằng thẻ được không ạ?', "Yes, of course! Here's the machine.", 'Được chứ! Máy quẹt thẻ đây.', '💳']]],
          fact: ['The word "menu" comes from French. It means a small, detailed list.', 'Từ "menu" bắt nguồn từ tiếng Pháp, nghĩa là một danh sách nhỏ và chi tiết.'],
          tf: [
            ['A menu shows the food and drinks in a restaurant.', true, 'Yes! You read the menu to choose your food.', 'Đúng! Con đọc thực đơn để chọn món.'],
            ['The waiter says "Enjoy your meal!" when you leave.', false, 'No! The waiter says it when the food arrives.', 'Sai! Người phục vụ nói câu đó khi mang đồ ăn ra.']
          ],
          qa: ['What would you like for lunch today?', 'Hôm nay bạn muốn ăn gì vào bữa trưa?', "I'd like rice and chicken, please.", ["like|i'd|want|have", 'rice|chicken|pho|noodles|fish|soup|banh|pizza|vegetables|egg']]
        }
      ],
      mystery: {
        t: "Peter's Twenty Thousand Dong", tv: 'Hai mươi nghìn đồng của Peter',
        intro: ['Peter has only twenty thousand dong. What can he buy?', 'Peter chỉ có hai mươi nghìn đồng. Bạn ấy có thể mua gì?'],
        clues: [['Clue one: The robot costs five hundred thousand dong.', 'Manh mối 1: Con robot giá năm trăm nghìn đồng.'],
          ['Clue two: The LEGO car and the big bottle of milk cost more than twenty thousand dong.', 'Manh mối 2: Xe LEGO và chai sữa to đều giá hơn hai mươi nghìn đồng.'],
          ['Clue three: The pencil costs five thousand dong.', 'Manh mối 3: Chiếc bút chì giá năm nghìn đồng.']],
        q: ['What can Peter buy?', 'Peter có thể mua gì?'],
        o: [['the robot', '🤖', 'con robot'], ['the LEGO car', '🚗', 'xe LEGO'], ['the big bottle of milk', '🥛', 'chai sữa to'], ['the pencil', '✏️', 'bút chì']], a: 3,
        win: ['Yes! The pencil is cheap. Peter has fifteen thousand dong left!', 'Đúng rồi! Bút chì rẻ. Peter còn dư mười lăm nghìn đồng!']
      }
    },

    /* ---------- WEEK 11: My Five Senses (Science) ---------- */
    {
      id: 'w11', week: 11, month: 3, monthTitle: M3[0], monthTitleVi: M3[1],
      name: 'My Five Senses', vi: 'Năm giác quan của em', short: 'Five Senses',
      topic: 'Science: Sight, Hearing, Smell, Taste & Touch', topicVi: 'Khoa học: thị giác, thính giác, khứu giác, vị giác & xúc giác',
      color: '#9333EA', dark: '#6B21A8', icon: '👃', model: ['garden', 'Sensory Garden', 'Khu vườn giác quan'],
      chars: { a: { name: 'Zoe', fig: 'hair-brown|surprised|torso-blue|legs-tan|magnifier' }, b: { name: 'Professor Owl', fig: 'hat-wizard|wink|torso-stars|legs-blue|book' } },
      chatter: [
        ['I see with my eyes!', 'Mình nhìn bằng mắt!'],
        ['Listen! Can you hear the birds?', 'Nghe kìa! Bạn có nghe tiếng chim không?'],
        ['This flower smells lovely.', 'Bông hoa này thơm quá.'],
        ['Lemons taste sour!', 'Chanh có vị chua!'],
        ['The rabbit feels soft.', 'Chú thỏ sờ thấy mềm mại.']
      ],
      lessons: [
        {
          title: 'My Amazing Body', titleVi: 'Cơ thể kỳ diệu', icon: '👀',
          words: [
            ['see with my eyes', 'verb', '/siː wɪð maɪ aɪz/', 'nhìn bằng mắt', '👀', 'I see a rainbow with my eyes.', 'Mình nhìn thấy cầu vồng bằng mắt.', 'You do this to look at colours and shapes.'],
            ['hear with my ears', 'verb', '/hɪə wɪð maɪ ɪəz/', 'nghe bằng tai', '👂', 'I hear music with my ears.', 'Mình nghe nhạc bằng tai.', 'You do this to listen to sounds.'],
            ['smell with my nose', 'verb', '/smel wɪð maɪ nəʊz/', 'ngửi bằng mũi', '👃', 'I smell the flowers with my nose.', 'Mình ngửi hoa bằng mũi.', 'You do this to know if food smells good.'],
            ['taste with my tongue', 'verb', '/teɪst wɪð maɪ tʌŋ/', 'nếm bằng lưỡi', '👅', 'I taste ice cream with my tongue.', 'Mình nếm kem bằng lưỡi.', 'You do this to know if food is sweet or salty.'],
            ['touch with my hands', 'verb', '/tʌtʃ wɪð maɪ hændz/', 'chạm bằng tay', '✋', 'I touch the soft cat with my hands.', 'Mình chạm vào chú mèo mềm mại bằng tay.', 'You do this to feel if something is hot or cold.']
          ],
          comic: {
            title: 'The Five Senses Walk', titleVi: 'Cuộc dạo chơi năm giác quan',
            panels: [
              ['b', 'Welcome to the garden, Zoe! We have five senses.', 'Chào mừng đến khu vườn, Zoe! Chúng ta có năm giác quan.', '🦉'],
              ['a', 'I see a butterfly with my eyes! And I hear a bird!', 'Cháu nhìn thấy con bướm bằng mắt! Và cháu nghe thấy tiếng chim!', '🦋'],
              ['b', 'Good! Now smell with your nose. What is it?', 'Giỏi! Giờ ngửi bằng mũi xem. Đó là gì?', '🌹'],
              ['a', 'A rose! And I can taste a strawberry with my tongue. Yum!', 'Hoa hồng! Và cháu nếm quả dâu bằng lưỡi. Ngon quá!', '🍓']
            ],
            blanks: [[1, 'see', ['see', 'sea', 'sing']], [2, 'smell', ['smell', 'small', 'smile']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình nghe nhạc bằng tai.', a: ['I', 'hear', 'music', 'with my ears.'], x: ['hears', 'with my eyes.'] },
            { vi: 'Em muốn kể: Mình ngửi hoa bằng mũi.', a: ['I', 'smell', 'the flowers', 'with my nose.'], x: ['smells', 'with my feet.'] }
          ],
          talk: [
            { q: 'What do you see with your eyes right now?', vi: 'Bây giờ bạn nhìn thấy gì bằng mắt?', hint: 'I see a book and a lamp.', k: ['see|look|can', 'book|lamp|table|window|tree|tv|picture|door|chair|lego|pencil|flower|sky|cat|dog'], c: ['I see a book and a lamp.', 'I see with my shoes.', 'My eyes are Tuesday.'] },
            { q: 'What do you use to hear music?', vi: 'Bạn dùng gì để nghe nhạc?', hint: 'I use my ears.', k: ['ears|ear'], c: ['I use my ears.', 'I use my elbows.', 'I use my lunch box.'] }
          ],
          snow: { vi: 'Nói về các giác quan', l: [[['my nose'], 'mũi của mình'], [['I', 'smell', 'with my nose.'], 'Mình ngửi bằng mũi.'], [['In the garden,', 'I', 'smell', 'the lovely roses', 'with my nose.'], 'Trong vườn, mình ngửi những bông hồng thơm bằng mũi.']], x: ['smells', 'my ears'] },
          cb: ['b', 'Zoe, close your eyes. I have a mystery fruit. What can you do?', 'Zoe ơi, nhắm mắt lại. Thầy có một loại quả bí ẩn. Cháu có thể làm gì?', [
            ['yes', 'I can smell it with my nose! Hmm... is it a banana?', 'Cháu có thể ngửi bằng mũi! Ừm... có phải chuối không ạ?', 'Yes! Your nose is a great detective!', 'Đúng rồi! Mũi của cháu là thám tử giỏi đấy!', '🍌'],
            ['ask', 'Can I touch it with my hands first?', 'Cháu sờ bằng tay trước được không ạ?', 'Sure! Is it long and smooth?', 'Được chứ! Nó dài và nhẵn phải không?', '✋']]],
          tb: ['b', 'Which sense do you like best?', 'Cháu thích giác quan nào nhất?', [
            ['yes', 'Taste! Because I love yummy food!', 'Vị giác ạ! Vì cháu mê đồ ăn ngon!', 'Ha ha! A tasty answer!', 'Ha ha! Câu trả lời thật ngon lành!', '👅'],
            ['calm', 'Hearing. I love listening to music.', 'Thính giác ạ. Cháu thích nghe nhạc.', 'Music makes the brain happy!', 'Âm nhạc làm não vui vẻ!', '🎵']]],
          fact: ['Your nose can remember thousands of different smells!', 'Mũi của con có thể nhớ hàng nghìn mùi khác nhau!'],
          tf: [
            ['We hear sounds with our ears.', true, 'Yes! Ears are for hearing.', 'Đúng! Tai dùng để nghe.'],
            ['We taste food with our elbows.', false, 'No! We taste food with our tongue.', 'Sai! Mình nếm thức ăn bằng lưỡi.']
          ],
          qa: ['What can you smell in your kitchen?', 'Bạn ngửi thấy gì trong bếp nhà mình?', 'I can smell rice and soup.', ['smell|can', 'rice|soup|fish|bread|cake|coffee|food|noodles|meat|onions|garlic']]
        },
        {
          title: 'Sweet, Sour, Salty, Bitter', titleVi: 'Ngọt, chua, mặn, đắng', icon: '👅',
          words: [
            ['sweet', 'adj', '/swiːt/', 'ngọt', '🍬', 'Candy is very sweet.', 'Kẹo rất ngọt.', 'The taste of sugar and honey.'],
            ['sour', 'adj', '/ˈsaʊə/', 'chua', '🍋', 'Lemons are sour.', 'Chanh có vị chua.', 'The taste of lemons. It makes your face funny!'],
            ['salty', 'adj', '/ˈsɔːlti/', 'mặn', '🧂', 'Sea water is salty.', 'Nước biển có vị mặn.', 'The taste of the sea and of chips.'],
            ['bitter', 'adj', '/ˈbɪtə/', 'đắng', '☕', 'Coffee is bitter.', 'Cà phê có vị đắng.', 'The taste of dark coffee and some medicine.'],
            ['spicy', 'adj', '/ˈspaɪsi/', 'cay', '🌶️', 'Chilli makes the soup spicy.', 'Ớt làm canh có vị cay.', 'Hot in your mouth, like chilli.']
          ],
          comic: {
            title: 'The Taste Test', titleVi: 'Thử thách nếm vị',
            panels: [
              ['b', "Zoe, let's do a taste test! Try this lemon.", 'Zoe ơi, mình thử nếm nhé! Thử quả chanh này đi.', '🍋'],
              ['a', "Ooh! It's very sour!", 'Ối! Chua quá!', '😖'],
              ['b', 'Now try this honey.', 'Giờ thử mật ong này.', '🍯'],
              ['a', "Mmm, it's sweet! Much better than the lemon!", 'Ừm, ngọt quá! Ngon hơn chanh nhiều!', '😋']
            ],
            blanks: [[1, 'sour', ['sour', 'sore', 'sun']], [3, 'sweet', ['sweet', 'sweat', 'sweep']]]
          },
          build: [
            { vi: 'Em muốn tả: Chanh có vị chua.', a: ['Lemons', 'are', 'sour.'], x: ['is', 'sweet.'] },
            { vi: 'Em muốn tả: Ớt làm canh có vị cay.', a: ['Chilli', 'makes', 'the soup', 'spicy.'], x: ['make', 'sweet.'] }
          ],
          talk: [
            { q: 'How does candy taste?', vi: 'Kẹo có vị như thế nào?', hint: "It's sweet.", k: ['sweet'], c: ["It's sweet.", "It's salty like the sea.", "It's a pencil."] },
            { q: 'Do you like spicy food?', vi: 'Bạn có thích đồ ăn cay không?', hint: "No, I don't. It's too hot for me.", k: ["yes|no|like|love|don't|do"], c: ["No, I don't. It's too hot for me.", 'Yes, I like spicy pencils.', 'Spicy food is my teacher.'] }
          ],
          snow: { vi: 'Tả vị của thức ăn', l: [[['sweet'], 'ngọt'], [['Mangoes', 'are', 'sweet.'], 'Xoài có vị ngọt.'], [['Ripe yellow mangoes', 'are', 'very sweet,', 'but lemons', 'are sour.'], 'Xoài vàng chín rất ngọt, còn chanh thì chua.']], x: ['is', 'bitter'] },
          cb: ['b', 'Zoe, this medicine is bitter, but it helps you. What do you say?', 'Zoe ơi, thuốc này đắng, nhưng nó giúp cháu khỏe. Cháu nói gì nào?', [
            ['yes', "Okay, I'll be brave! One, two, three... done!", 'Vâng, cháu sẽ dũng cảm! Một, hai, ba... xong!', "Well done! Here's a sweet sticker!", 'Giỏi lắm! Tặng cháu một nhãn dán ngọt ngào!', '⭐'],
            ['ask', 'Can I drink some water after it, please?', 'Uống xong cháu uống chút nước được không ạ?', 'Of course! Water helps a lot.', 'Tất nhiên! Nước giúp ích nhiều lắm.', '💧']]],
          tb: ['b', 'What is your favourite taste: sweet, sour or salty?', 'Cháu thích vị nào nhất: ngọt, chua hay mặn?', [
            ['yes', 'Sweet! I love ice cream and mangoes!', 'Ngọt ạ! Cháu mê kem và xoài!', 'Sweet like you! But brush your teeth!', 'Ngọt như cháu vậy! Nhưng nhớ đánh răng nhé!', '🍦'],
            ['calm', 'Sour. I like green mangoes with salt!', 'Chua ạ. Cháu thích xoài xanh chấm muối!', 'Ooh, a real Vietnamese snack!', 'Ồ, đúng món ăn vặt Việt Nam!', '🥭']]],
          fact: ['Your tongue has thousands of tiny taste buds!', 'Lưỡi của con có hàng nghìn nụ vị giác nhỏ xíu!'],
          tf: [
            ['Lemons taste sour.', true, 'Yes! Lemons are sour.', 'Đúng! Chanh có vị chua.'],
            ['Sea water tastes sweet.', false, 'No! Sea water is salty.', 'Sai! Nước biển có vị mặn.']
          ],
          qa: ['What food tastes salty?', 'Món ăn nào có vị mặn?', 'Chips and fish sauce taste salty.', ['chips|fish|sauce|salt|soup|crisps|meat|noodles|popcorn|salty']]
        },
        {
          title: 'Touch and Feel', titleVi: 'Chạm và cảm nhận', icon: '✋',
          words: [
            ['soft', 'adj', '/sɒft/', 'mềm', '🧸', 'My teddy bear is soft.', 'Gấu bông của mình mềm mại.', 'Like a pillow or a kitten.'],
            ['hard', 'adj', '/hɑːd/', 'cứng', '🪨', 'A rock is hard.', 'Hòn đá thì cứng.', 'Like a rock or a LEGO brick.'],
            ['rough', 'adj', '/rʌf/', 'sần sùi, nhám', '🌵', 'The tree bark is rough.', 'Vỏ cây sần sùi.', 'Not smooth, like sandpaper.'],
            ['smooth', 'adj', '/smuːð/', 'nhẵn, mịn', '🪞', 'The glass is smooth.', 'Mặt kính nhẵn.', 'Flat and nice to touch, like glass.'],
            ['hot and cold', 'adj', '/hɒt ənd kəʊld/', 'nóng và lạnh', '🌡️', 'Soup is hot and ice is cold.', 'Canh thì nóng còn đá thì lạnh.', 'Fire is one of them, and snow is the other.']
          ],
          comic: {
            title: 'The Mystery Box', titleVi: 'Chiếc hộp bí ẩn',
            panels: [
              ['b', 'Put your hand in the mystery box. How does it feel?', 'Cháu cho tay vào hộp bí ẩn. Cảm giác thế nào?', '📦'],
              ['a', "It's soft and warm... Is it a kitten?", 'Nó mềm và ấm... Có phải mèo con không ạ?', '🐱'],
              ['b', "Ha ha, no! It's my wool hat. Now try this one.", 'Ha ha, không phải! Đó là mũ len của thầy. Giờ thử cái này nhé.', '🧶'],
              ['a', "It's hard and rough. It's a rock!", 'Nó cứng và sần sùi. Là hòn đá!', '🪨']
            ],
            blanks: [[1, 'soft', ['soft', 'sofa', 'soap']], [3, 'rough', ['rough', 'round', 'roof']]]
          },
          build: [
            { vi: 'Em muốn tả: Gấu bông của mình mềm mại.', a: ['My teddy bear', 'is', 'soft.'], x: ['are', 'hard.'] },
            { vi: 'Em muốn tả: Vỏ cây sần sùi nhưng lá thì nhẵn.', a: ['The tree bark', 'is rough,', 'but the leaves', 'are smooth.'], x: ['is smooth,', 'eat'] }
          ],
          talk: [
            { q: 'How does your pillow feel?', vi: 'Cái gối của bạn sờ vào thấy thế nào?', hint: "It's soft.", k: ['soft|smooth|warm|fluffy'], c: ["It's soft.", "It's a rock.", "It's very salty."] },
            { q: 'What is hard in your classroom?', vi: 'Trong lớp học có đồ vật gì cứng?', hint: 'The desk is hard.', k: ['desk|table|chair|board|door|wall|floor|ruler|window|hard'], c: ['The desk is hard.', 'The desk is a kitten.', 'Hard is my favourite soup.'] }
          ],
          snow: { vi: 'Tả cảm giác khi chạm', l: [[['soft'], 'mềm'], [['The kitten', 'is', 'soft.'], 'Chú mèo con mềm mại.'], [['When I touch it,', 'the little kitten', 'feels', 'very soft', 'and warm.'], 'Khi mình chạm vào, chú mèo nhỏ thấy rất mềm và ấm.']], x: ['hard', 'are'] },
          cb: ['b', 'Zoe, be careful! The pot is very hot. What should you do?', 'Zoe ơi, cẩn thận! Cái nồi rất nóng. Cháu nên làm gì?', [
            ['calm', "I won't touch it. I'll ask a grown-up to help.", 'Cháu sẽ không chạm vào. Cháu nhờ người lớn giúp ạ.', 'Very safe and smart!', 'Rất an toàn và thông minh!', '🛡️'],
            ['ask', 'Can I use a kitchen glove?', 'Cháu dùng găng tay nhà bếp được không ạ?', 'Good idea, but let me do it this time.', 'Ý hay, nhưng lần này để thầy làm nhé.', '🧤']]],
          tb: ['b', 'Close your eyes and touch this. Is it soft or hard?', 'Nhắm mắt lại và sờ cái này. Nó mềm hay cứng?', [
            ['yes', "It's hard and smooth. Is it a LEGO brick?", 'Nó cứng và nhẵn. Có phải viên gạch LEGO không ạ?', 'Yes! Your fingers are clever!', 'Đúng rồi! Ngón tay cháu thông minh quá!', '🧱'],
            ['calm', "It's soft... I think it's a sponge.", 'Nó mềm... Cháu nghĩ là miếng bọt biển.', 'Correct! Well done!', 'Chính xác! Giỏi lắm!', '🧽']]],
          fact: ['Your fingertips can feel things better than most parts of your body!', 'Đầu ngón tay cảm nhận tốt hơn hầu hết các phần khác trên cơ thể con!'],
          tf: [
            ['A rock feels hard.', true, 'Yes! Rocks are hard.', 'Đúng! Hòn đá cứng.'],
            ['Ice feels hot.', false, 'No! Ice feels cold.', 'Sai! Đá lạnh mà.']
          ],
          qa: ['What is soft in your bedroom?', 'Trong phòng ngủ của bạn có gì mềm?', 'My pillow and my teddy bear are soft.', ['pillow|teddy|blanket|bed|toy|cushion|bear|soft']]
        }
      ],
      mystery: {
        t: "Professor Owl's Mystery Box", tv: 'Chiếc hộp bí ẩn của Giáo sư Cú',
        intro: ["Use your senses! What is in Professor Owl's box?", 'Hãy dùng các giác quan! Trong hộp của Giáo sư Cú có gì?'],
        clues: [["Clue one: It isn't soft.", 'Manh mối 1: Nó không mềm.'],
          ["Clue two: It isn't cold.", 'Manh mối 2: Nó không lạnh.'],
          ['Clue three: It smells fresh, and it tastes sour.', 'Manh mối 3: Nó có mùi thơm mát và vị chua.']],
        q: ['What is in the box?', 'Trong hộp có gì?'],
        o: [['a teddy bear', '🧸', 'gấu bông'], ['an ice cube', '🧊', 'viên đá lạnh'], ['a rock', '🪨', 'hòn đá'], ['a lemon', '🍋', 'quả chanh']], a: 3,
        win: ["Sour and fresh: it's a lemon! Great senses, detective!", 'Chua và thơm mát: đó là quả chanh! Giác quan của thám tử nhạy quá!']
      }
    },

    /* ---------- WEEK 12: Staying Healthy & First Aid ---------- */
    {
      id: 'w12', week: 12, month: 3, monthTitle: M3[0], monthTitleVi: M3[1],
      name: 'Staying Healthy & First Aid', vi: 'Giữ gìn sức khỏe & Sơ cứu', short: 'Healthy Me',
      topic: 'Hygiene, Common Illnesses & Good Advice', topicVi: 'Vệ sinh, bệnh thường gặp & lời khuyên',
      color: '#059669', dark: '#065F46', icon: '🩺', model: ['clinic', 'Family Clinic', 'Phòng khám gia đình'],
      chars: { a: { name: 'Jack', fig: 'cap-red|grin|torso-red|legs-blue|none' }, b: { name: 'Doctor Mai', fig: 'hair-brown|smile|torso-blue|legs-white|none' } },
      chatter: [
        ['Wash your hands with soap!', 'Rửa tay bằng xà phòng nhé!'],
        ['I have a runny nose.', 'Mình bị sổ mũi.'],
        ['You should drink warm water.', 'Bạn nên uống nước ấm.'],
        ["Here's a plaster for your cut.", 'Đây là miếng băng dán cho vết xước.'],
        ['Get well soon!', 'Mau khỏe nhé!']
      ],
      lessons: [
        {
          title: 'Clean Hands', titleVi: 'Đôi tay sạch sẽ', icon: '🧼',
          words: [
            ['wash my hands', 'verb', '/wɒʃ maɪ hændz/', 'rửa tay', '🧼', 'I wash my hands before meals.', 'Mình rửa tay trước bữa ăn.', 'You use soap and water to make your fingers clean.'],
            ['soap', 'noun', '/səʊp/', 'xà phòng', '🫧', 'Use soap and warm water.', 'Dùng xà phòng và nước ấm nhé.', 'It makes bubbles and cleans your skin.'],
            ['germs', 'noun', '/dʒɜːmz/', 'vi trùng', '🦠', 'Germs can make you sick.', 'Vi trùng có thể làm con bị ốm.', 'Very tiny living things that you cannot see. Some make you ill.'],
            ['towel', 'noun', '/ˈtaʊəl/', 'khăn lau', '🧻', 'I dry my hands with a towel.', 'Mình lau khô tay bằng khăn.', 'You use it to dry your body after washing.'],
            ['before meals', 'adv', '/bɪˈfɔː miːlz/', 'trước bữa ăn', '🍽️', 'Always wash your hands before meals.', 'Luôn rửa tay trước bữa ăn nhé.', 'At the time just before breakfast, lunch or dinner.']
          ],
          comic: {
            title: 'Germ Busters', titleVi: 'Biệt đội diệt khuẩn',
            panels: [
              ['b', 'Jack, lunch is ready! Did you wash your hands?', 'Jack ơi, bữa trưa xong rồi! Cháu rửa tay chưa?', '🍽️'],
              ['a', 'My hands look clean. Do I need to wash them?', 'Tay cháu trông sạch mà. Cháu có cần rửa không ạ?', '🤔'],
              ['b', 'Yes! Germs are too small to see. Use soap and water.', 'Có chứ! Vi trùng nhỏ quá nên không nhìn thấy được. Dùng xà phòng và nước nhé.', '🦠'],
              ['a', "Bubbles! Bye-bye, germs! Now I'll dry them with a towel.", 'Bong bóng! Tạm biệt vi trùng! Giờ cháu lau khô bằng khăn.', '🫧']
            ],
            blanks: [[2, 'Germs', ['Germs', 'Gems', 'Jams']], [3, 'towel', ['towel', 'tower', 'tiger']]]
          },
          build: [
            { vi: 'Em muốn nhắc: Luôn rửa tay trước bữa ăn nhé.', a: ['Always', 'wash', 'your hands', 'before meals.'], x: ['washes', 'eat'] },
            { vi: 'Em muốn giải thích: Vi trùng có thể làm con bị ốm.', a: ['Germs', 'can', 'make you', 'sick.'], x: ['cans', 'eat'] }
          ],
          talk: [
            { q: 'When do you wash your hands?', vi: 'Bạn rửa tay khi nào?', hint: 'I wash my hands before meals.', k: ['before|after|when', 'meals|eating|lunch|dinner|breakfast|toilet|playing|school|home'], c: ['I wash my hands before meals.', 'I wash my hands with juice.', 'My hands are Wednesday.'] },
            { q: 'What do you use to wash your hands?', vi: 'Bạn dùng gì để rửa tay?', hint: 'I use soap and water.', k: ['soap|water'], c: ['I use soap and water.', 'I use crayons and paper.', 'I use a big fizzy drink.'] }
          ],
          snow: { vi: 'Nói về thói quen rửa tay', l: [[['soap'], 'xà phòng'], [['I', 'use', 'soap.'], 'Mình dùng xà phòng.'], [['Before meals,', 'I', 'wash my hands', 'with soap', 'for twenty seconds.'], 'Trước bữa ăn, mình rửa tay bằng xà phòng trong hai mươi giây.']], x: ['uses', 'eat'] },
          cb: ['b', "Jack, there's no soap in the bathroom. What can you do?", 'Jack ơi, trong phòng tắm hết xà phòng rồi. Cháu có thể làm gì?', [
            ['ask', 'Can you give me a new bar of soap, please?', 'Cô cho cháu một bánh xà phòng mới được không ạ?', 'Sure! Here you are. Good thinking!', 'Được chứ! Của cháu đây. Nghĩ hay lắm!', '🧼'],
            ['idea', 'I can use the hand gel in my schoolbag!', 'Cháu có thể dùng gel rửa tay trong cặp!', 'Smart! Hand gel kills germs, too.', 'Thông minh! Gel rửa tay cũng diệt vi trùng.', '🧴']]],
          tb: ['b', 'Jack, you played in the garden. What should you do before dinner?', 'Jack ơi, cháu chơi ngoài vườn rồi. Trước bữa tối cháu nên làm gì?', [
            ['yes', "Wash my hands with soap! I'll do it now!", 'Rửa tay bằng xà phòng ạ! Cháu đi rửa ngay!', 'Germ buster! Well done!', 'Chiến binh diệt khuẩn! Giỏi lắm!', '🦸'],
            ['calm', 'I should wash my hands and change my clothes.', 'Cháu nên rửa tay và thay quần áo ạ.', 'Perfect! Clean and fresh.', 'Hoàn hảo! Sạch sẽ và thơm tho.', '👕']]],
          fact: ['Wash your hands for about twenty seconds: that is as long as singing "Happy Birthday" twice!', 'Hãy rửa tay khoảng hai mươi giây: bằng thời gian hát bài "Happy Birthday" hai lần!'],
          tf: [
            ['Soap and water help wash away germs.', true, 'Yes! Soap removes germs from your hands.', 'Đúng! Xà phòng giúp loại bỏ vi trùng trên tay.'],
            ['We can see germs with our eyes.', false, 'No! Germs are too small to see.', 'Sai! Vi trùng quá nhỏ để nhìn thấy.']
          ],
          qa: ['How do you keep your body clean?', 'Bạn giữ cơ thể sạch sẽ như thế nào?', 'I wash my hands and take a shower every day.', ['wash|shower|bath|brush|clean', 'hands|teeth|body|face|hair|shower|every']]
        },
        {
          title: 'I Feel Sick', titleVi: 'Con thấy không khỏe', icon: '🤧',
          words: [
            ['a cold', 'noun', '/ə kəʊld/', 'bị cảm lạnh', '🤧', 'I have a cold.', 'Mình bị cảm lạnh.', 'You sneeze a lot and feel tired when you have this.'],
            ['a cough', 'noun', '/ə kɒf/', 'bị ho', '😷', 'My brother has a bad cough.', 'Anh trai mình bị ho nặng.', 'You make a loud sound from your throat again and again.'],
            ['a runny nose', 'noun', '/ə ˈrʌni nəʊz/', 'sổ mũi', '🧻', 'I have a runny nose. I need a tissue.', 'Mình bị sổ mũi. Mình cần khăn giấy.', 'Water comes out of your nose when you are ill.'],
            ['a cut', 'noun', '/ə kʌt/', 'vết đứt, vết xước', '🩸', 'I have a cut on my finger.', 'Mình bị một vết đứt ở ngón tay.', 'A small opening in your skin from something sharp.'],
            ['a plaster', 'noun', '/ə ˈplɑːstə/', 'băng dán cá nhân', '🩹', 'Put a plaster on the cut.', 'Dán băng cá nhân lên vết đứt nhé.', 'A small sticky thing that covers a cut.']
          ],
          comic: {
            title: "At Doctor Mai's Clinic", titleVi: 'Ở phòng khám của bác sĩ Mai',
            panels: [
              ['b', "Hello, Jack. What's the matter?", 'Chào Jack. Cháu bị làm sao vậy?', '🩺'],
              ['a', 'I have a cough and a runny nose.', 'Cháu bị ho và sổ mũi ạ.', '😷'],
              ['b', 'You have a cold. And what about your finger?', 'Cháu bị cảm lạnh rồi. Còn ngón tay cháu thì sao?', '👆'],
              ['a', 'I have a small cut. Can I have a plaster, please?', 'Cháu bị một vết xước nhỏ. Cho cháu một miếng băng dán được không ạ?', '🩹']
            ],
            blanks: [[1, 'a cough', ['a cough', 'a coffee', 'a cookie']], [3, 'plaster', ['plaster', 'plastic', 'planet']]]
          },
          build: [
            { vi: 'Em muốn nói với bác sĩ: Cháu bị ho và sổ mũi ạ.', a: ['I', 'have', 'a cough', 'and a runny nose.'], x: ['has', 'eat'] },
            { vi: 'Em muốn nhờ: Dán giúp mình miếng băng lên vết xước nhé.', a: ['Please', 'put', 'a plaster', 'on my cut.'], x: ['puts', 'eat'] }
          ],
          talk: [
            { q: "What's the matter?", vi: 'Bạn bị làm sao vậy?', hint: 'I have a cold.', k: ['cold|cough|runny|nose|cut|headache|fever|sore|stomachache|toothache'], c: ['I have a cold.', 'I have a pencil.', 'It is Monday.'] },
            { q: 'What do you need for a small cut?', vi: 'Bạn cần gì cho một vết xước nhỏ?', hint: 'I need a plaster.', k: ['plaster|bandage|band|aid|clean|water'], c: ['I need a plaster.', 'I need a pizza.', 'I need a fizzy drink.'] }
          ],
          snow: { vi: 'Kể với bác sĩ khi bị ốm', l: [[['a cough'], 'bị ho'], [['I', 'have', 'a cough.'], 'Mình bị ho.'], [['Doctor,', 'I', 'have', 'a bad cough', 'and a runny nose.'], 'Thưa bác sĩ, cháu bị ho nặng và sổ mũi ạ.']], x: ['has', 'eat'] },
          cb: ['b', 'Jack, your friend Lan fell down and has a cut on her knee. What can you do?', 'Jack ơi, bạn Lan bị ngã và trầy đầu gối. Cháu có thể làm gì?', [
            ['calm', "I'll tell the teacher right away!", 'Cháu sẽ báo cô giáo ngay ạ!', 'Excellent! A grown-up can help.', 'Tuyệt vời! Người lớn có thể giúp.', '🏃'],
            ['ask', "Are you okay, Lan? Let's wash it with clean water.", 'Lan ơi bạn ổn không? Mình rửa vết thương bằng nước sạch nhé.', 'Very kind and smart!', 'Rất tốt bụng và thông minh!', '💧']]],
          tb: ['b', 'Jack, you have a cold. Do you want to stay at home today?', 'Jack ơi, cháu bị cảm. Hôm nay cháu có muốn nghỉ ở nhà không?', [
            ['yes', "Yes, please. I feel tired. I'll rest in bed.", 'Vâng ạ. Cháu thấy mệt. Cháu sẽ nằm nghỉ.', 'Good idea. Get well soon!', 'Ý hay. Mau khỏe nhé!', '🛌'],
            ['no', 'I want to go to school. Can I wear a mask?', 'Cháu muốn đi học. Cháu đeo khẩu trang được không ạ?', 'Yes, and wash your hands often!', 'Được, và nhớ rửa tay thường xuyên nhé!', '😷']]],
          fact: ['When you sneeze, air comes out of your nose very, very fast!', 'Khi con hắt hơi, không khí bay ra khỏi mũi cực kỳ nhanh!'],
          tf: [
            ['A plaster covers a small cut.', true, 'Yes! It keeps the cut clean.', 'Đúng! Nó giữ vết xước sạch sẽ.'],
            ['When you have a cold, you should eat lots of ice cream.', false, 'No! You should drink warm water and rest.', 'Sai! Con nên uống nước ấm và nghỉ ngơi.']
          ],
          qa: ['What do you do when you have a cold?', 'Bạn làm gì khi bị cảm lạnh?', 'I drink warm water and rest.', ['drink|rest|sleep|stay|wear|take|see', 'water|bed|home|mask|medicine|doctor|soup']]
        },
        {
          title: 'Good Advice', titleVi: 'Lời khuyên tốt', icon: '💡',
          words: [
            ['should', 'phrase', '/ʃʊd/', 'nên', '👍', 'You should go to bed early.', 'Bạn nên đi ngủ sớm.', 'A word for good advice.'],
            ["shouldn't", 'phrase', '/ˈʃʊdnt/', 'không nên', '👎', "You shouldn't eat too much candy.", 'Bạn không nên ăn quá nhiều kẹo.', 'A word for things that are not good to do.'],
            ['drink warm water', 'verb', '/drɪŋk wɔːm ˈwɔːtə/', 'uống nước ấm', '🍵', 'You should drink warm water.', 'Bạn nên uống nước ấm.', 'A good thing to do when you have a sore throat.'],
            ['get some rest', 'verb', '/ɡet sʌm rest/', 'nghỉ ngơi', '🛌', 'You look tired. Get some rest.', 'Trông bạn mệt quá. Nghỉ ngơi đi.', 'Lie down or sleep to feel better.'],
            ['see a doctor', 'verb', '/siː ə ˈdɒktə/', 'đi khám bác sĩ', '👩‍⚕️', 'You should see a doctor.', 'Bạn nên đi khám bác sĩ.', 'You go to a clinic when you are very ill.']
          ],
          comic: {
            title: "Doctor Mai's Advice", titleVi: 'Lời khuyên của bác sĩ Mai',
            panels: [
              ['a', 'Doctor Mai, I have a sore throat. What should I do?', 'Bác sĩ Mai ơi, cháu bị đau họng. Cháu nên làm gì ạ?', '😣'],
              ['b', 'You should drink warm water and get some rest.', 'Cháu nên uống nước ấm và nghỉ ngơi.', '🍵'],
              ['a', 'Can I eat ice cream?', 'Cháu ăn kem được không ạ?', '🍦'],
              ['b', "No! You shouldn't eat cold food this week.", 'Không được! Tuần này cháu không nên ăn đồ lạnh.', '🙅']
            ],
            blanks: [[1, 'drink warm water', ['drink warm water', 'drink cold paint', 'eat warm water']], [3, "shouldn't", ["shouldn't", 'should', 'shoes']]]
          },
          build: [
            { vi: 'Em muốn khuyên: Bạn nên đi ngủ sớm.', a: ['You', 'should', 'go to bed', 'early.'], x: ['shoulds', 'eat'] },
            { vi: 'Em muốn khuyên: Bạn không nên ăn quá nhiều kẹo.', a: ['You', "shouldn't", 'eat', 'too much candy.'], x: ['eats', 'should'] }
          ],
          talk: [
            { q: 'I have a sore throat. What should I do?', vi: 'Mình bị đau họng. Mình nên làm gì?', hint: 'You should drink warm water.', k: ['should|drink|rest|see|go', 'warm|water|tea|rest|doctor|bed|honey'], c: ['You should drink warm water.', 'You should eat lots of ice.', 'You should run in the rain.'] },
            { q: 'I feel very tired. What is your advice?', vi: 'Mình thấy rất mệt. Bạn khuyên gì?', hint: 'You should get some rest.', k: ['should|rest|sleep|bed|early|go'], c: ['You should get some rest.', 'You should play games all night.', 'You should eat a pencil.'] }
          ],
          snow: { vi: 'Đưa lời khuyên', l: [[['rest'], 'nghỉ ngơi'], [['You', 'should', 'rest.'], 'Bạn nên nghỉ ngơi.'], [['You', 'should', 'drink warm water', 'and get some rest', 'because you have a cold.'], 'Bạn nên uống nước ấm và nghỉ ngơi vì bạn bị cảm.']], x: ["shouldn't", 'eat'] },
          cb: ['b', 'Jack, your friend wants to eat ten candies. What advice can you give?', 'Jack ơi, bạn của cháu muốn ăn mười cái kẹo. Cháu có thể khuyên gì?', [
            ['calm', "You shouldn't eat so many sweets. Your teeth will hurt!", 'Bạn không nên ăn nhiều kẹo thế. Răng bạn sẽ đau đấy!', 'Great advice, little doctor!', 'Lời khuyên tuyệt vời, bác sĩ nhí!', '🦷'],
            ['idea', 'How about one candy and an apple?', 'Hay ăn một cái kẹo và một quả táo nhé?', 'A healthy and happy idea!', 'Một ý vừa lành mạnh vừa vui!', '🍎']]],
          tb: ['b', 'Jack, I have a headache. Do you have any advice for me?', 'Jack ơi, cô bị đau đầu. Cháu có lời khuyên nào cho cô không?', [
            ['calm', 'You should get some rest and drink water.', 'Cô nên nghỉ ngơi và uống nước ạ.', 'Thank you, Doctor Jack!', 'Cảm ơn bác sĩ Jack!', '💧'],
            ['ask', 'Did you sleep well last night?', 'Tối qua cô có ngủ ngon không ạ?', "Not really. You're right, I need more sleep!", 'Không lắm. Cháu nói đúng, cô cần ngủ nhiều hơn!', '😴']]],
          fact: ['Drinking enough water helps your body work well every day.', 'Uống đủ nước giúp cơ thể con hoạt động tốt mỗi ngày.'],
          tf: [
            ['If you are very ill, you should see a doctor.', true, 'Yes! A doctor can help you get better.', 'Đúng! Bác sĩ có thể giúp con khỏe lại.'],
            ['You should play outside in the rain when you have a fever.', false, 'No! You should stay warm and get some rest.', 'Sai! Con nên giữ ấm và nghỉ ngơi.']
          ],
          qa: ['What should you do to stay healthy?', 'Bạn nên làm gì để giữ sức khỏe?', 'I should eat healthy food and exercise every day.', ['should|eat|drink|sleep|exercise|wash|play|run', 'healthy|food|water|vegetables|early|hands|sports|fruit|every']]
        }
      ],
      mystery: {
        t: 'Who Needs a Plaster?', tv: 'Ai cần băng dán cá nhân?',
        intro: ['Doctor Mai has only one plaster. Who needs it?', 'Bác sĩ Mai chỉ còn một miếng băng dán. Ai cần nó?'],
        clues: [['Clue one: Jack has a cold. He needs warm water.', 'Manh mối 1: Jack bị cảm. Bạn ấy cần nước ấm.'],
          ['Clue two: Tom is only tired. He needs some rest.', 'Manh mối 2: Tom chỉ bị mệt. Bạn ấy cần nghỉ ngơi.'],
          ['Clue three: Mai has a cough, but her skin is fine.', 'Manh mối 3: Mai bị ho, nhưng da của bạn ấy vẫn lành lặn.']],
        q: ['Who needs the plaster?', 'Ai cần miếng băng dán?'],
        o: [['Jack', '🤧', 'Jack'], ['Tom', '🥱', 'Tom'], ['Mai', '😷', 'Mai'], ['Lan', '👧', 'Lan']], a: 3,
        win: ['Right! Lan has a cut on her knee. Here is the plaster!', 'Đúng rồi! Lan bị trầy đầu gối. Đây là miếng băng dán!']
      }
    }
  );

  (global.CurriculumStages = global.CurriculumStages || []).push({ stage: 1, zones: Z });
})(window);
