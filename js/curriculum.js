/* =========================================================
   curriculum.js – Kho dữ liệu 10 Vùng đất LEGO (Lớp 4 / Cambridge Movers–Flyers)
   Mỗi vùng đất: 3 bài học × (5 từ/cụm từ + Comic 4 khung + 2 câu lắp ráp + 2 tình huống nói)
   Mỗi bài hoàn thành mở khóa 4 mảnh ghép → 12 mảnh = 1 Bộ Mô Hình Lớn.

   Định dạng gọn:
   - words: [en, từ loại, IPA, nghĩa Việt, emoji, câu ví dụ, nghĩa câu ví dụ, câu đố nghe (clue)]
   - comic.panels: [nhân vật 'a'|'b', lời thoại, nghĩa Việt, đạo cụ emoji]
   - comic.blanks: [chỉ số khung, cụm cần điền, [đáp án đúng, nhiễu 1, nhiễu 2]]
   - build: { vi: tình huống, a: [các viên gạch đúng thứ tự], x: [gạch gây nhiễu] }
   - talk: { q, vi, hint, k: từ khóa (a|b = chấp nhận 1 trong các từ), c: [đúng, sai, sai] }
   ========================================================= */
(function (global) {
  'use strict';

  const RAW = [
    /* ===================== ZONE 1 ===================== */
    {
      id: 'z1', name: 'LEGO City Center', vi: 'Trung Tâm Thành Phố LEGO', short: 'City Center',
      topic: 'Daily Routines & Time', topicVi: 'Thói quen hằng ngày & Giờ giấc',
      color: '#E3000B', dark: '#A30008', icon: '🏙️',
      chars: { a: { name: 'Mia', fig: 'hair-blonde|smile|torso-blue|legs-blue|book' }, b: { name: 'Leo', fig: 'cap-red|grin|torso-red|legs-black|none' } },
      chatter: [
        ['I always wake up early!', 'Mình luôn dậy sớm!'],
        ["What time is it? It's half past seven!", 'Mấy giờ rồi? Bảy giờ rưỡi rồi!'],
        ["I catch the school bus at seven o'clock.", 'Mình bắt xe buýt lúc bảy giờ.'],
        ["Don't forget to brush your teeth!", 'Đừng quên đánh răng nhé!'],
        ['I never go to bed late.', 'Mình không bao giờ đi ngủ muộn.']
      ],
      lessons: [
        {
          title: 'My Morning Routine', titleVi: 'Thói quen buổi sáng', icon: '🌅',
          words: [
            ['wake up early', 'verb', '/weɪk ʌp ˈɜːli/', 'thức dậy sớm', '⏰', 'I wake up early on school days.', 'Mình thức dậy sớm vào những ngày đi học.', 'You open your eyes when the sun comes up.'],
            ['brush my teeth', 'verb', '/brʌʃ maɪ tiːθ/', 'đánh răng', '🪥', 'I brush my teeth after breakfast.', 'Mình đánh răng sau bữa sáng.', 'You do this with a toothbrush and toothpaste.'],
            ['get dressed', 'verb', '/ɡet drest/', 'mặc quần áo', '👕', 'I get dressed in my school uniform.', 'Mình mặc đồng phục đi học.', 'You put on your shirt and trousers.'],
            ['have breakfast', 'verb', '/hæv ˈbrekfəst/', 'ăn sáng', '🥞', 'We have breakfast at half past six.', 'Nhà mình ăn sáng lúc sáu giờ rưỡi.', 'This is the first meal of the day.'],
            ['catch the school bus', 'verb', '/kætʃ ðə skuːl bʌs/', 'bắt xe buýt đến trường', '🚌', "I catch the school bus at seven o'clock.", 'Mình bắt xe buýt đến trường lúc bảy giờ.', 'A big yellow vehicle takes you to school.']
          ],
          comic: {
            title: 'The Sleepy Builder', titleVi: 'Thợ xây ngái ngủ',
            panels: [
              ['b', "Mia! It's seven o'clock! The school bus is here!", 'Mia ơi! Bảy giờ rồi! Xe buýt đến rồi kìa!', '🚌'],
              ['a', "Oh no! I didn't wake up early today!", 'Ôi không! Hôm nay tớ không dậy sớm!', '😴'],
              ['b', 'Quick! Brush your teeth and get dressed!', 'Nhanh lên! Đánh răng và mặc quần áo đi!', '🪥'],
              ['a', "Done! But... I'm still wearing my LEGO pajamas!", 'Xong rồi! Nhưng... tớ vẫn mặc bộ đồ ngủ LEGO!', '😂']
            ],
            blanks: [[1, 'wake up early', ['wake up early', 'go to bed', 'have lunch']], [2, 'get dressed', ['get dressed', 'catch a fish', 'do homework']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình thức dậy sớm mỗi ngày.', a: ['I', 'wake up', 'early', 'every day.'], x: ['brush', 'bus'] },
            { vi: 'Em muốn nói: Mình bắt xe buýt đến trường lúc bảy giờ.', a: ['I', 'catch', 'the school bus', 'at', "seven o'clock."], x: ['teeth', 'never'] }
          ],
          talk: [
            { q: 'What do you do after you wake up?', vi: 'Bạn làm gì sau khi thức dậy?', hint: 'I brush my teeth and get dressed.', k: ['brush|wash|dressed|breakfast|eat|shower', 'teeth|dressed|face|breakfast|shower'], c: ['I brush my teeth and get dressed.', 'I go to bed at nine.', "It's a red bus."] },
            { q: 'How do you go to school?', vi: 'Bạn đến trường bằng cách nào?', hint: 'I catch the school bus.', k: ['bus|bike|walk|car|motorbike|foot|ride'], c: ['I catch the school bus.', 'I have breakfast.', "I'm nine years old."] }
          ]
        },
        {
          title: 'What Time Is It?', titleVi: 'Bây giờ là mấy giờ?', icon: '🕖',
          words: [
            ["o'clock", 'phrase', '/əˈklɒk/', 'giờ đúng', '🕖', "It's seven o'clock.", 'Bây giờ là bảy giờ đúng.', 'The long hand points straight up at twelve.'],
            ['half past', 'phrase', '/hɑːf pɑːst/', '... rưỡi (quá 30 phút)', '🕡', "It's half past six.", 'Bây giờ là sáu giờ rưỡi.', 'Thirty minutes after the hour.'],
            ['quarter past', 'phrase', '/ˈkwɔːtə pɑːst/', '... giờ mười lăm (quá 15 phút)', '⏱️', "It's quarter past eight.", 'Bây giờ là tám giờ mười lăm.', 'Fifteen minutes after the hour.'],
            ['have lunch', 'verb', '/hæv lʌntʃ/', 'ăn trưa', '🍱', "We have lunch at eleven o'clock.", 'Chúng mình ăn trưa lúc mười một giờ.', 'You eat this meal in the middle of the day.'],
            ['go to bed', 'verb', '/ɡəʊ tə bed/', 'đi ngủ', '🛏️', "I go to bed at nine o'clock.", 'Mình đi ngủ lúc chín giờ.', 'You do this at night when you are sleepy.']
          ],
          comic: {
            title: 'Lunch Time Mix-up', titleVi: 'Nhầm giờ ăn trưa',
            panels: [
              ['b', "I'm hungry! What time is it?", 'Tớ đói quá! Mấy giờ rồi?', '😋'],
              ['a', "It's half past ten. We have lunch at eleven.", 'Mười giờ rưỡi. Mình ăn trưa lúc mười một giờ.', '🕥'],
              ['b', 'Thirty more minutes? My tummy is making robot noises!', 'Ba mươi phút nữa á? Bụng tớ kêu như robot rồi!', '🤖'],
              ['a', 'Here, have a LEGO apple... just kidding! Have a real one!', 'Đây, ăn quả táo LEGO đi... đùa thôi! Ăn táo thật nè!', '🍎']
            ],
            blanks: [[0, 'What time', ['What time', 'What colour', 'How many']], [1, 'half past', ['half past', 'go to bed', 'always']]]
          },
          build: [
            { vi: 'Em muốn nói: Bây giờ là tám giờ mười lăm.', a: ["It's", 'quarter past', 'eight.'], x: ['half', 'lunch'] },
            { vi: 'Em muốn hỏi bạn: Bạn đi ngủ lúc mấy giờ?', a: ['What time', 'do you', 'go to bed?'], x: ['does', 'lunch'] }
          ],
          talk: [
            { q: 'What time do you have lunch?', vi: 'Bạn ăn trưa lúc mấy giờ?', hint: "I have lunch at eleven o'clock.", k: ['lunch|have|eat', "o'clock|oclock|clock|half|past|quarter|eleven|twelve|one|at"], c: ["I have lunch at eleven o'clock.", 'I go to bed at lunch.', "It's a sandwich."] },
            { q: 'What time do you go to bed?', vi: 'Bạn đi ngủ lúc mấy giờ?', hint: "I go to bed at nine o'clock.", k: ['bed|sleep', "o'clock|oclock|clock|half|past|quarter|nine|ten|eight|at"], c: ["I go to bed at nine o'clock.", 'I have breakfast in bed.', "It's half past Monday."] }
          ]
        },
        {
          title: 'How Often?', titleVi: 'Bao lâu một lần?', icon: '📅',
          words: [
            ['always', 'adv', '/ˈɔːlweɪz/', 'luôn luôn', '💯', 'I always brush my teeth before bed.', 'Mình luôn đánh răng trước khi ngủ.', 'Every day, every time, one hundred percent!'],
            ['usually', 'adv', '/ˈjuːʒuəli/', 'thường thường', '📅', 'I usually walk to school.', 'Mình thường đi bộ đến trường.', 'Almost every day, but not every day.'],
            ['sometimes', 'adv', '/ˈsʌmtaɪmz/', 'thỉnh thoảng', '🎲', 'I sometimes play LEGO after school.', 'Thỉnh thoảng mình chơi LEGO sau giờ học.', 'Not often, but not never.'],
            ['never', 'adv', '/ˈnevə/', 'không bao giờ', '🚫', 'I never eat breakfast in bed.', 'Mình không bao giờ ăn sáng trên giường.', 'Zero times. Not even once!'],
            ['do homework', 'verb', '/duː ˈhəʊmwɜːk/', 'làm bài tập về nhà', '📚', "I do homework at seven o'clock.", 'Mình làm bài tập lúc bảy giờ.', 'Your teacher gives you this work to do at home.']
          ],
          comic: {
            title: 'The Homework Robot', titleVi: 'Robot làm bài tập',
            panels: [
              ['a', 'Leo, do you always do homework after school?', 'Leo ơi, cậu có luôn làm bài tập sau giờ học không?', '📚'],
              ['b', 'I usually do it at seven. But today I built a homework robot!', 'Tớ thường làm lúc bảy giờ. Nhưng hôm nay tớ lắp một con robot làm bài tập!', '🤖'],
              ['a', 'Wow! Does the robot do your homework?', 'Oa! Robot làm bài tập giúp cậu à?', '😮'],
              ['b', 'No... it never does. It only eats my pencils!', 'Không... nó chẳng bao giờ làm. Nó chỉ ăn bút chì của tớ thôi!', '✏️']
            ],
            blanks: [[1, 'usually', ['usually', 'yesterday', 'quarter']], [3, 'never', ['never', 'always', 'early']]]
          },
          build: [
            { vi: 'Em muốn nói: Mình luôn luôn làm bài tập về nhà.', a: ['I', 'always', 'do', 'my homework.'], x: ['does', 'bed'] },
            { vi: 'Em muốn hỏi: Bạn có thường đi bộ đến trường không?', a: ['Do you', 'usually', 'walk', 'to school?'], x: ['Does', 'lunch'] }
          ],
          talk: [
            { q: 'How often do you play LEGO?', vi: 'Bạn chơi LEGO bao lâu một lần?', hint: 'I usually play LEGO after school.', k: ['always|usually|sometimes|never|often|every', 'play|lego'], c: ['I usually play LEGO after school.', 'I am a LEGO brick.', 'At half past bed.'] },
            { q: 'Do you always do your homework?', vi: 'Bạn có luôn làm bài tập về nhà không?', hint: 'Yes, I always do my homework.', k: ['yes|no|always|usually|sometimes', 'homework|do|it'], c: ['Yes, I always do my homework.', 'No, I am homework.', 'Homework is a bus.'] }
          ]
        }
      ]
    },

    /* ===================== ZONE 2 ===================== */
    {
      id: 'z2', name: 'LEGO Creator Academy', vi: 'Học Viện Sáng Tạo LEGO', short: 'Academy',
      topic: 'School Subjects, Clubs & Feelings', topicVi: 'Môn học, câu lạc bộ & cảm xúc',
      color: '#006CB7', dark: '#004A80', icon: '🔬',
      chars: { a: { name: 'Ada', fig: 'hair-brown|smile|torso-chef|legs-black|book' }, b: { name: 'Max', fig: 'cat-ears|grin|torso-stars|legs-blue|wrench' } },
      chatter: [
        ['Science is my favourite subject!', 'Khoa học là môn mình thích nhất!'],
        ['I love doing cool experiments!', 'Mình mê làm thí nghiệm lắm!'],
        ["Let's join the robotics club!", 'Cùng tham gia câu lạc bộ robot nhé!'],
        ['I feel so proud of my robot!', 'Mình tự hào về con robot của mình quá!'],
        ['Beep boop! I am a LEGO robot!', 'Bíp bốp! Tớ là robot LEGO!']
      ],
      lessons: [
        {
          title: 'My School Subjects', titleVi: 'Các môn học của em', icon: '📒',
          words: [
            ['Science', 'noun', '/ˈsaɪəns/', 'môn Khoa học', '🔬', 'We do cool experiments in Science.', 'Chúng mình làm thí nghiệm thú vị trong giờ Khoa học.', 'In this subject, you study plants, animals and magnets.'],
            ['IT', 'noun', '/ˌaɪ ˈtiː/', 'môn Tin học (Information Technology)', '💻', 'In IT, we learn to use computers.', 'Trong giờ Tin học, chúng mình học dùng máy tính.', 'You use a computer in this subject.'],
            ['Art', 'noun', '/ɑːt/', 'môn Mĩ thuật', '🎨', 'I paint a big dragon in Art.', 'Mình vẽ một con rồng to trong giờ Mĩ thuật.', 'You draw and paint pictures in this subject.'],
            ['Music', 'noun', '/ˈmjuːzɪk/', 'môn Âm nhạc', '🎵', 'We sing songs in Music.', 'Chúng mình hát trong giờ Âm nhạc.', 'You sing and play instruments in this subject.'],
            ['PE', 'noun', '/ˌpiː ˈiː/', 'môn Thể dục (Physical Education)', '🤸', 'We run and jump in PE.', 'Chúng mình chạy nhảy trong giờ Thể dục.', 'You run, jump and play games in the school yard.']
          ],
          comic: {
            title: 'The Timetable', titleVi: 'Thời khóa biểu',
            panels: [
              ['b', 'What subjects do you have today, Ada?', 'Hôm nay cậu học những môn gì vậy Ada?', '📋'],
              ['a', 'I have Science and Art. What about you?', 'Tớ học Khoa học và Mĩ thuật. Còn cậu?', '🔬'],
              ['b', 'I have Music and PE. I love running!', 'Tớ học Âm nhạc và Thể dục. Tớ thích chạy lắm!', '🏃'],
              ['a', "Let's mix them! Science and Art make a painting robot!", 'Mình kết hợp đi! Khoa học cộng Mĩ thuật thành robot biết vẽ!', '🎨']
            ],
            blanks: [[0, 'subjects', ['subjects', 'teeth', 'buses']], [2, 'PE', ['PE', 'breakfast', 'bed']]]
          },
          build: [
            { vi: 'Em muốn hỏi bạn: Hôm nay bạn học những môn gì?', a: ['What subjects', 'do you', 'have', 'today?'], x: ['does', 'Art'] },
            { vi: 'Em muốn nói: Mình có môn Tin học vào thứ Hai.', a: ['I have', 'IT', 'on', 'Monday.'], x: ['at', 'has'] }
          ],
          talk: [
            { q: 'What subjects do you have today?', vi: 'Hôm nay bạn học những môn gì?', hint: 'I have Maths and English.', k: ['have|study|learn', 'science|art|music|pe|it|maths|math|english|history|geography|vietnamese'], c: ['I have Maths and English.', 'I have a toothache.', 'It is seven o\'clock.'] },
            { q: "What's your favourite subject?", vi: 'Môn học yêu thích của bạn là gì?', hint: 'My favourite subject is Art.', k: ['favourite|favorite|like|love', 'science|art|music|pe|it|maths|math|english|history|geography|vietnamese|subject'], c: ['My favourite subject is Art.', 'My favourite bus is red.', 'I go to bed at nine.'] }
          ]
        },
        {
          title: 'Why Do You Like It?', titleVi: 'Vì sao em thích?', icon: '🧪',
          words: [
            ['History', 'noun', '/ˈhɪstri/', 'môn Lịch sử', '🏛️', 'In History, we learn about kings and queens.', 'Trong giờ Lịch sử, chúng mình học về các vua và hoàng hậu.', 'You learn about people and events from long ago.'],
            ['Geography', 'noun', '/dʒiˈɒɡrəfi/', 'môn Địa lí', '🗺️', 'We study maps in Geography.', 'Chúng mình học bản đồ trong giờ Địa lí.', 'You learn about countries, rivers and mountains.'],
            ['do experiments', 'verb', '/duː ɪkˈsperɪmənts/', 'làm thí nghiệm', '🧪', 'We do experiments in the lab.', 'Chúng mình làm thí nghiệm trong phòng lab.', 'Scientists mix things to find out what happens.'],
            ['join the robotics club', 'verb', '/dʒɔɪn ðə rəʊˈbɒtɪks klʌb/', 'tham gia câu lạc bộ người máy', '🤖', 'I want to join the robotics club.', 'Mình muốn tham gia câu lạc bộ người máy.', 'You become a member of a group that builds robots.'],
            ['because', 'phrase', '/bɪˈkɒz/', 'bởi vì', '💡', "I like Science because it's fun.", 'Mình thích Khoa học vì nó vui.', 'We use this word to give a reason.']
          ],
          comic: {
            title: 'Why Science?', titleVi: 'Vì sao thích Khoa học?',
            panels: [
              ['a', 'Why do you like Science, Max?', 'Sao cậu thích môn Khoa học thế, Max?', '🔬'],
              ['b', 'Because I love doing cool experiments!', 'Vì tớ mê làm những thí nghiệm hay ho!', '🧪'],
              ['a', "Me too! Let's join the robotics club together.", 'Tớ cũng vậy! Cùng tham gia câu lạc bộ robot nhé.', '🤖'],
              ['b', 'Yes! Our first robot will clean my bedroom!', 'Được! Con robot đầu tiên sẽ dọn phòng ngủ cho tớ!', '🧹']
            ],
            blanks: [[0, 'Why', ['Why', 'What time', 'Where']], [2, 'join the robotics club', ['join the robotics club', 'go to bed', 'brush our teeth']]]
          },
          build: [
            { vi: 'Em muốn hỏi: Tại sao bạn thích môn Địa lí?', a: ['Why', 'do you', 'like', 'Geography?'], x: ['Because', 'does'] },
            { vi: 'Em muốn trả lời: Bởi vì mình thích làm thí nghiệm.', a: ['Because', 'I love', 'doing', 'experiments.'], x: ['Why', 'does'] }
          ],
          talk: [
            { q: 'Why do you like Science?', vi: 'Tại sao bạn thích môn Khoa học?', hint: 'Because I love doing experiments.', k: ['because', 'experiment|experiments|fun|cool|love|like|interesting|exciting'], c: ['Because I love doing experiments.', 'Because it is a bus.', "At seven o'clock."] },
            { q: 'Do you want to join the robotics club?', vi: 'Bạn có muốn tham gia câu lạc bộ người máy không?', hint: "Yes, I'd love to join the robotics club!", k: ['yes|no|sure|love|want', 'join|club|robot|robotics|love|to'], c: ["Yes, I'd love to join the robotics club!", 'Yes, I have a fever.', 'No, it is lunch.'] }
          ]
        },
        {
          title: 'How Do You Feel?', titleVi: 'Em cảm thấy thế nào?', icon: '🤩',
          words: [
            ['excited', 'adj', '/ɪkˈsaɪtɪd/', 'háo hức, phấn khích', '🤩', "I'm excited about the school trip!", 'Mình háo hức về chuyến dã ngoại của trường!', 'You feel this before a fun party.'],
            ['nervous', 'adj', '/ˈnɜːvəs/', 'hồi hộp, lo lắng', '😬', 'I feel nervous before a test.', 'Mình thấy hồi hộp trước bài kiểm tra.', 'Your hands shake a little before you speak in front of the class.'],
            ['proud', 'adj', '/praʊd/', 'tự hào', '🏅', "I'm proud of my LEGO robot.", 'Mình tự hào về con robot LEGO của mình.', 'You feel this when you do something great.'],
            ['confident', 'adj', '/ˈkɒnfɪdənt/', 'tự tin', '😎', 'She is confident when she speaks English.', 'Bạn ấy tự tin khi nói tiếng Anh.', 'You believe you can do it!'],
            ['bored', 'adj', '/bɔːd/', 'chán', '🥱', 'I feel bored when it rains all day.', 'Mình thấy chán khi trời mưa cả ngày.', 'Nothing is fun, and you have nothing to do.']
          ],
          comic: {
            title: 'The Science Fair', titleVi: 'Hội chợ Khoa học',
            panels: [
              ['b', 'The Science Fair is today! I feel so nervous.', 'Hôm nay là Hội chợ Khoa học! Tớ hồi hộp quá.', '😬'],
              ['a', "Don't worry! Your volcano is amazing. Be confident!", 'Đừng lo! Núi lửa của cậu tuyệt lắm. Tự tin lên!', '🌋'],
              ['b', 'BOOM! Wow, it really works!', 'BÙM! Oa, nó chạy thật rồi!', '💥'],
              ['a', "You won first prize! I'm so proud of you!", 'Cậu đạt giải nhất! Tớ tự hào về cậu quá!', '🏆']
            ],
            blanks: [[0, 'nervous', ['nervous', 'hungry', 'early']], [3, 'proud', ['proud', 'bored', 'sleepy']]]
          },
          build: [
            { vi: 'Em muốn nói: Mình cảm thấy háo hức về câu lạc bộ người máy.', a: ['I feel', 'excited', 'about', 'the robotics club.'], x: ['feels', 'because'] },
            { vi: 'Em muốn nói với bạn: Tớ rất tự hào về cậu!', a: ["I'm", 'so', 'proud', 'of you!'], x: ['nervous', 'are'] }
          ],
          talk: [
            { q: 'How do you feel before a test?', vi: 'Bạn cảm thấy thế nào trước bài kiểm tra?', hint: 'I feel nervous before a test.', k: ['feel|am|im', 'nervous|confident|excited|worried|happy|calm|okay|ok|fine|scared|bored'], c: ['I feel nervous before a test.', 'I feel a bowl of noodles.', 'It is a test bus.'] },
            { q: 'What makes you proud?', vi: 'Điều gì khiến bạn tự hào?', hint: "I'm proud when I finish my LEGO set.", k: ['proud', 'when|because|of|my|finish|win|help'], c: ["I'm proud when I finish my LEGO set.", 'I am proud of a toothache.', 'Proud is a colour.'] }
          ]
        }
      ]
    },

    /* ===================== ZONE 3 ===================== */
    {
      id: 'z3', name: 'LEGO Downtown Bistro', vi: 'Quán Ăn Phố LEGO', short: 'Bistro',
      topic: 'Food, Drinks & Ordering', topicVi: 'Đồ ăn, đồ uống & gọi món',
      color: '#FF7E14', dark: '#C25A00', icon: '🍕',
      chars: { a: { name: 'Lily', fig: 'hair-blonde|grin|torso-red|legs-blue|none' }, b: { name: 'Chef Tony', fig: 'chef-hat|smile|torso-chef|legs-black|pizza' } },
      chatter: [
        ["I'd like a crispy pizza, please!", 'Cho mình một bánh pizza giòn nhé!'],
        ['This smoothie is delicious!', 'Ly sinh tố này ngon tuyệt!'],
        ['How much is that altogether?', 'Tất cả hết bao nhiêu tiền ạ?'],
        ['Would you like a slice of cake?', 'Bạn có muốn một miếng bánh không?'],
        ['Can I see the menu, please?', 'Cho mình xem thực đơn được không?']
      ],
      lessons: [
        {
          title: 'Yummy Food', titleVi: 'Món ăn ngon', icon: '🍝',
          words: [
            ['spaghetti', 'noun', '/spəˈɡeti/', 'mì Ý', '🍝', 'Can I have spaghetti, please?', 'Cho mình món mì Ý được không?', 'Long, thin pasta with tomato sauce.'],
            ['crispy pizza', 'noun', '/ˈkrɪspi ˈpiːtsə/', 'bánh pizza giòn', '🍕', 'This crispy pizza has lots of cheese.', 'Bánh pizza giòn này có rất nhiều phô mai.', 'A round, flat food with cheese and tomato on top.'],
            ['a bowl of noodles', 'noun', '/ə bəʊl əv ˈnuːdlz/', 'một tô mì / phở', '🍜', "I'd like a bowl of noodles, please.", 'Cho mình một tô mì nhé.', 'Hot, long food in soup. You eat it with chopsticks.'],
            ['a slice of cake', 'noun', '/ə slaɪs əv keɪk/', 'một miếng bánh ngọt', '🍰', 'Can I have a slice of cake for dessert?', 'Cho mình một miếng bánh tráng miệng nhé?', 'A sweet piece of a birthday treat.'],
            ['delicious', 'adj', '/dɪˈlɪʃəs/', 'ngon tuyệt', '😋', 'Mmm! This pizza is delicious!', 'Ừm! Bánh pizza này ngon tuyệt!', 'When food tastes very, very good.']
          ],
          comic: {
            title: 'Pizza Emergency', titleVi: 'Pizza khẩn cấp',
            panels: [
              ['a', "Chef Tony, I'd like a crispy pizza, please!", 'Chú Tony ơi, cho cháu một bánh pizza giòn ạ!', '🍕'],
              ['b', 'Coming right up! Extra cheese?', 'Có ngay! Thêm phô mai không cháu?', '🧀'],
              ['a', 'Yes, please! Mmm... it smells delicious!', 'Có ạ! Ừm... thơm ngon quá!', '😋'],
              ['b', 'Oops! I made a pizza shaped like a LEGO brick!', 'Ối! Chú làm cái pizza hình viên gạch LEGO mất rồi!', '🧱']
            ],
            blanks: [[0, 'crispy pizza', ['crispy pizza', 'school bus', 'toothbrush']], [2, 'delicious', ['delicious', 'nervous', 'bored']]]
          },
          build: [
            { vi: 'Em muốn gọi món: Cho mình một tô mì, làm ơn.', a: ["I'd like", 'a bowl of', 'noodles,', 'please.'], x: ['a slice of', 'Would'] },
            { vi: 'Em muốn khen: Món mì Ý này ngon tuyệt!', a: ['This', 'spaghetti', 'is', 'delicious!'], x: ['are', 'nervous'] }
          ],
          talk: [
            { q: "What's your favourite food?", vi: 'Món ăn yêu thích của bạn là gì?', hint: 'My favourite food is crispy pizza.', k: ['favourite|favorite|like|love', 'pizza|noodles|spaghetti|cake|rice|chicken|fish|pho|burger|ice|bread|fries|egg|eggs|food'], c: ['My favourite food is crispy pizza.', 'My favourite food is a bus.', 'I eat at the library.'] },
            { q: 'Would you like a slice of cake?', vi: 'Bạn có muốn một miếng bánh không?', hint: 'Yes, please! It looks delicious.', k: ['yes|no|sure', 'please|thanks|thank|delicious|love'], c: ['Yes, please! It looks delicious.', 'Yes, I am a cake.', 'No, it is foggy.'] }
          ]
        },
        {
          title: 'Cool Drinks', titleVi: 'Đồ uống mát lạnh', icon: '🥤',
          words: [
            ['lemonade', 'noun', '/ˌleməˈneɪd/', 'nước chanh', '🍋', 'A glass of lemonade, please.', 'Cho mình một ly nước chanh nhé.', 'A sweet and sour yellow drink.'],
            ['smoothie', 'noun', '/ˈsmuːði/', 'sinh tố', '🥤', 'I love a mango smoothie.', 'Mình rất thích sinh tố xoài.', 'A thick, cold drink made with fruit and milk or yogurt.'],
            ['a bottle of water', 'noun', '/ə ˈbɒtl əv ˈwɔːtə/', 'một chai nước', '💧', 'Can I have a bottle of water?', 'Cho mình một chai nước được không?', 'You drink this when you are thirsty after PE.'],
            ['menu', 'noun', '/ˈmenjuː/', 'thực đơn', '📋', 'Can I see the menu, please?', 'Cho mình xem thực đơn nhé?', 'A list of food and drinks in a restaurant.'],
            ['vegetarian', 'adj', '/ˌvedʒəˈteəriən/', 'ăn chay / người ăn chay', '🥗', "My mum is vegetarian. She doesn't eat meat.", 'Mẹ mình ăn chay. Mẹ không ăn thịt.', "A person who doesn't eat meat or fish."]
          ],
          comic: {
            title: 'The Mystery Menu', titleVi: 'Thực đơn bí ẩn',
            panels: [
              ['a', 'Can I see the menu, please?', 'Cho cháu xem thực đơn được không ạ?', '📋'],
              ['b', 'Here you are! Today we have a rainbow smoothie.', 'Đây cháu! Hôm nay có sinh tố cầu vồng.', '🌈'],
              ['a', 'Ooh! And a bottle of water for my brother, please.', 'Ồ! Và một chai nước cho em trai cháu nữa ạ.', '💧'],
              ['b', 'Is he vegetarian? I have a broccoli smoothie too!', 'Em cháu ăn chay à? Chú có cả sinh tố bông cải xanh nữa!', '🥦']
            ],
            blanks: [[0, 'menu', ['menu', 'bill', 'bus']], [2, 'a bottle of water', ['a bottle of water', 'a bowl of homework', 'a slice of bed']]]
          },
          build: [
            { vi: 'Em muốn hỏi lịch sự: Cho mình xem thực đơn được không?', a: ['Can I', 'see', 'the menu,', 'please?'], x: ['drink', 'sees'] },
            { vi: 'Em muốn gọi: Cho mình một ly sinh tố xoài.', a: ["I'd like", 'a mango', 'smoothie,', 'please.'], x: ['bottle', 'likes'] }
          ],
          talk: [
            { q: 'What would you like to drink?', vi: 'Bạn muốn uống gì?', hint: "I'd like a lemonade, please.", k: ['like|want|please|have', 'lemonade|smoothie|water|juice|milk|tea|coke|soda|chocolate'], c: ["I'd like a lemonade, please.", "I'd like a raincoat, please.", 'I drink a bus.'] },
            { q: 'Are you vegetarian?', vi: 'Bạn có ăn chay không?', hint: "No, I'm not. I eat meat and fish.", k: ['yes|no', "am|not|eat|im|i'm"], c: ["No, I'm not. I eat meat and fish.", 'Yes, I am a vegetable bus.', 'It is half past six.'] }
          ]
        },
        {
          title: 'At the Bistro', titleVi: 'Gọi món & tính tiền', icon: '🧾',
          words: [
            ['order', 'verb', '/ˈɔːdə/', 'gọi món', '🛎️', 'What would you like to order?', 'Bạn muốn gọi món gì?', 'You tell the waiter what food you want.'],
            ['waiter', 'noun', '/ˈweɪtə/', 'người phục vụ (bồi bàn)', '🤵', 'The waiter brings our food.', 'Người phục vụ mang đồ ăn ra cho chúng mình.', 'This person brings food to your table.'],
            ["I'd like", 'phrase', '/aɪd laɪk/', 'Tôi muốn... (lịch sự)', '🙋', "I'd like a bowl of noodles, please.", 'Cho mình một tô mì nhé.', "A polite way to say 'I want'."],
            ['bill', 'noun', '/bɪl/', 'hóa đơn', '🧾', 'Can I have the bill, please?', 'Cho mình xin hóa đơn nhé?', 'A piece of paper that shows how much you pay.'],
            ['altogether', 'adv', '/ˌɔːltəˈɡeðə/', 'tất cả, tổng cộng', '➕', 'How much is that altogether?', 'Tất cả hết bao nhiêu tiền?', 'When you add all the prices together.']
          ],
          comic: {
            title: 'How Much Is It?', titleVi: 'Hết bao nhiêu tiền?',
            panels: [
              ['b', 'Hello! What would you like to order?', 'Xin chào! Cháu muốn gọi món gì?', '🛎️'],
              ['a', "I'd like spaghetti and a lemonade, please.", 'Cho cháu mì Ý và một ly nước chanh ạ.', '🍝'],
              ['a', 'That was yummy! How much is that altogether?', 'Ngon quá! Tất cả hết bao nhiêu tiền ạ?', '💰'],
              ['b', 'Fifty thousand dong. And the LEGO dessert is free!', 'Năm mươi nghìn đồng. Món tráng miệng LEGO thì miễn phí!', '🍨']
            ],
            blanks: [[0, 'order', ['order', 'sleep', 'build']], [2, 'altogether', ['altogether', "o'clock", 'sometimes']]]
          },
          build: [
            { vi: 'Em muốn hỏi: Tất cả hết bao nhiêu tiền?', a: ['How much', 'is that', 'altogether?'], x: ['many', 'are'] },
            { vi: 'Em muốn nói lịch sự: Cho mình xin hóa đơn ạ.', a: ['Can I', 'have', 'the bill,', 'please?'], x: ['has', 'order'] }
          ],
          talk: [
            { q: 'Hello! What would you like to order?', vi: 'Xin chào! Bạn muốn gọi món gì?', hint: "I'd like a bowl of noodles, please.", k: ['like|want|have|can', 'please|noodles|pizza|spaghetti|rice|cake|chicken|burger|smoothie|lemonade|water'], c: ["I'd like a bowl of noodles, please.", 'I would like to be a pilot.', 'The bill is my friend.'] },
            { q: 'Your meal is finished. What do you say to the waiter?', vi: 'Bạn ăn xong rồi. Bạn nói gì với người phục vụ?', hint: 'Can I have the bill, please?', k: ['bill|pay|much', 'please|can|how|altogether'], c: ['Can I have the bill, please?', 'Can I have a fever, please?', 'Turn left, please.'] }
          ]
        }
      ]
    },

    /* ===================== ZONE 4 ===================== */
    {
      id: 'z4', name: 'LEGO Ninja Dojo', vi: 'Võ Đường Ninja LEGO', short: 'Ninja Dojo',
      topic: 'Sports, Abilities & Health', topicVi: 'Thể thao, khả năng & sức khỏe',
      color: '#00A850', dark: '#007436', icon: '🥋',
      chars: { a: { name: 'Nina', fig: 'hood-ninja|determined|torso-ninja|legs-green|none' }, b: { name: 'Sensei Ken', fig: 'hat-wizard|smile|torso-knight|legs-white|book' } },
      chatter: [
        ['Hi-yah! I can do martial arts!', 'Hi-ya! Mình biết võ đấy!'],
        ["What's the matter with you?", 'Bạn bị làm sao thế?'],
        ['You should see a dentist!', 'Bạn nên đi khám nha sĩ!'],
        ["You shouldn't eat too many sweets.", 'Bạn không nên ăn quá nhiều kẹo.'],
        ['Can you swim underwater?', 'Bạn có bơi dưới nước được không?']
      ],
      lessons: [
        {
          title: 'What Can You Do?', titleVi: 'Em có thể làm gì?', icon: '🛼',
          words: [
            ['roller skate', 'verb', '/ˈrəʊlə skeɪt/', 'trượt patin', '🛼', 'I can roller skate very fast.', 'Mình có thể trượt patin rất nhanh.', 'You move on shoes with small wheels.'],
            ['play badminton', 'verb', '/pleɪ ˈbædmɪntən/', 'chơi cầu lông', '🏸', 'We play badminton in the park.', 'Chúng mình chơi cầu lông ở công viên.', 'You hit a shuttlecock over a net with a racket.'],
            ['do martial arts', 'verb', '/duː ˈmɑːʃl ɑːts/', 'tập võ', '🥋', 'Ninjas do martial arts every day.', 'Các ninja tập võ mỗi ngày.', 'Ninjas do this: kick, punch and jump!'],
            ['swim underwater', 'verb', '/swɪm ˌʌndəˈwɔːtə/', 'bơi dưới nước', '🤿', 'Can you swim underwater?', 'Bạn có bơi dưới nước được không?', 'You hold your breath and move under the water.'],
            ['ride a bike', 'verb', '/raɪd ə baɪk/', 'đạp xe đạp', '🚲', 'I ride a bike to the park.', 'Mình đạp xe đến công viên.', 'It has two wheels and pedals.']
          ],
          comic: {
            title: 'Ninja Training', titleVi: 'Luyện tập Ninja',
            panels: [
              ['b', 'Welcome to the dojo! Can you do martial arts?', 'Chào mừng đến võ đường! Con có biết võ không?', '🥋'],
              ['a', 'Yes, I can! Hi-yah! And I can roller skate too.', 'Con biết ạ! Hi-ya! Con còn biết trượt patin nữa.', '🛼'],
              ['b', 'Great! Can you swim underwater like a ninja fish?', 'Giỏi lắm! Con có bơi dưới nước như cá ninja không?', '🐟'],
              ['a', "No, I can't... but I can play badminton with a dragon!", 'Con không biết... nhưng con chơi cầu lông với rồng được!', '🐉']
            ],
            blanks: [[0, 'do martial arts', ['do martial arts', 'have lunch', 'see the menu']], [2, 'swim underwater', ['swim underwater', 'brush underwater', 'order underwater']]]
          },
          build: [
            { vi: 'Em muốn khoe: Mình có thể trượt patin rất giỏi.', a: ['I', 'can', 'roller skate', 'very well.'], x: ['cans', 'does'] },
            { vi: 'Em muốn hỏi: Bạn có thể bơi dưới nước không?', a: ['Can', 'you', 'swim', 'underwater?'], x: ['Do', 'swims'] }
          ],
          talk: [
            { q: 'What sports can you play?', vi: 'Bạn có thể chơi môn thể thao nào?', hint: 'I can play badminton and football.', k: ['can|play|like', 'badminton|football|soccer|basketball|tennis|swim|skate|volleyball|chess|martial|ride|run|table'], c: ['I can play badminton and football.', 'I can play a toothache.', 'I am a dojo.'] },
            { q: 'Can you ride a bike?', vi: 'Bạn có biết đạp xe không?', hint: "Yes, I can.", k: ['yes|no', "can|can't|cannot|cant"], c: ['Yes, I can.', 'Yes, I am a bike.', 'It is a bike day.'] }
          ]
        },
        {
          title: "What's the Matter?", titleVi: 'Em bị làm sao?', icon: '🤒',
          words: [
            ['headache', 'noun', '/ˈhedeɪk/', 'đau đầu', '🤕', "I have a headache. It's too noisy!", 'Mình bị đau đầu. Ồn quá!', 'Your head hurts.'],
            ['toothache', 'noun', '/ˈtuːθeɪk/', 'đau răng', '🦷', 'I have a terrible toothache.', 'Mình bị đau răng kinh khủng.', 'Your tooth hurts after too many sweets.'],
            ['fever', 'noun', '/ˈfiːvə/', 'sốt', '🤒', 'She has a fever. Her forehead is hot.', 'Bạn ấy bị sốt. Trán nóng lắm.', 'Your body is very hot when you are ill.'],
            ['stomachache', 'noun', '/ˈstʌmək eɪk/', 'đau bụng', '🤢', 'I ate too much cake. Now I have a stomachache.', 'Mình ăn nhiều bánh quá. Giờ bị đau bụng.', 'Your tummy hurts.'],
            ['sore throat', 'noun', '/sɔː θrəʊt/', 'đau họng', '😷', "I have a sore throat. I can't sing today.", 'Mình bị đau họng. Hôm nay mình không hát được.', 'It hurts when you swallow or talk.']
          ],
          comic: {
            title: 'The Candy Ninja', titleVi: 'Ninja mê kẹo',
            panels: [
              ['b', "Nina, what's the matter with you?", 'Nina, con bị làm sao thế?', '❓'],
              ['a', 'I have a terrible toothache, Sensei.', 'Con bị đau răng kinh khủng, thưa thầy.', '🦷'],
              ['b', 'Did you eat too many sweets again?', 'Con lại ăn nhiều kẹo quá phải không?', '🍬'],
              ['a', 'Just... forty-two lollipops. Ninja-style!', 'Chỉ... bốn mươi hai cây kẹo mút thôi ạ. Kiểu ninja!', '🍭']
            ],
            blanks: [[0, 'the matter', ['the matter', 'the time', 'the menu']], [1, 'toothache', ['toothache', 'bus', 'smoothie']]]
          },
          build: [
            { vi: 'Em muốn hỏi thăm: Bạn bị làm sao vậy?', a: ["What's", 'the matter', 'with', 'you?'], x: ['time', 'How'] },
            { vi: 'Em muốn nói: Mình bị sốt và đau đầu.', a: ['I have', 'a fever', 'and', 'a headache.'], x: ['has', 'am'] }
          ],
          talk: [
            { q: "What's the matter with you?", vi: 'Bạn bị làm sao thế?', hint: 'I have a headache.', k: ['have|got|feel', 'headache|toothache|fever|stomachache|stomach|sore|throat|cold|cough|ill|sick'], c: ['I have a headache.', 'I have a crispy pizza.', 'I am the matter.'] },
            { q: 'Do you have a fever?', vi: 'Bạn có bị sốt không?', hint: "No, I don't. I feel fine.", k: ['yes|no', "do|don't|dont|have|feel|fine|ok|okay"], c: ["No, I don't. I feel fine.", 'Yes, I have a fever bus.', 'Fever is my friend.'] }
          ]
        },
        {
          title: 'Good Advice', titleVi: 'Lời khuyên hay', icon: '👍',
          words: [
            ['take a rest', 'verb', '/teɪk ə rest/', 'nghỉ ngơi', '🛌', 'You should take a rest.', 'Bạn nên nghỉ ngơi.', 'You stop working and relax for a while.'],
            ['see a dentist', 'verb', '/siː ə ˈdentɪst/', 'đi khám nha sĩ', '😁', 'You should see a dentist.', 'Bạn nên đi khám nha sĩ.', 'Go to the doctor who checks your teeth.'],
            ['see a doctor', 'verb', '/siː ə ˈdɒktə/', 'đi khám bác sĩ', '🩺', 'You have a fever. You should see a doctor.', 'Bạn bị sốt. Bạn nên đi khám bác sĩ.', 'Go to the person who helps you when you are ill.'],
            ['should', 'phrase', '/ʃʊd/', 'nên', '👍', 'You should drink lots of water.', 'Bạn nên uống nhiều nước.', 'We use this word to give good advice.'],
            ["shouldn't", 'phrase', '/ˈʃʊdnt/', 'không nên', '👎', "You shouldn't eat too many sweets.", 'Bạn không nên ăn quá nhiều kẹo.', "We use this word to say 'this is not a good idea'."]
          ],
          comic: {
            title: "Sensei's Advice", titleVi: 'Lời khuyên của thầy',
            panels: [
              ['a', 'Sensei, I have a stomachache. What should I do?', 'Thưa thầy, con bị đau bụng. Con nên làm gì ạ?', '🤢'],
              ['b', 'You should take a rest and drink warm water.', 'Con nên nghỉ ngơi và uống nước ấm.', '🍵'],
              ['a', 'And can I eat a slice of cake?', 'Thế con ăn một miếng bánh được không ạ?', '🍰'],
              ['b', "You shouldn't eat cake today. Have some rice soup!", 'Hôm nay con không nên ăn bánh. Ăn cháo đi con!', '🥣']
            ],
            blanks: [[1, 'take a rest', ['take a rest', 'roller skate', 'play badminton']], [3, "shouldn't", ["shouldn't", 'should', 'always']]]
          },
          build: [
            { vi: 'Em muốn khuyên bạn: Bạn nên đi khám nha sĩ.', a: ['You', 'should', 'see', 'a dentist.'], x: ['shoulds', 'sees'] },
            { vi: 'Em muốn khuyên bạn: Bạn không nên ăn quá nhiều kẹo.', a: ['You', "shouldn't", 'eat', 'too many sweets.'], x: ['eats', 'rest'] }
          ],
          talk: [
            { q: 'I have a toothache. What should I do?', vi: 'Mình bị đau răng. Mình nên làm gì?', hint: 'You should see a dentist.', k: ['should|go|see', 'dentist|doctor|rest'], c: ['You should see a dentist.', 'You should eat more sweets.', 'You should catch the bus to the moon.'] },
            { q: 'I have a fever. Can I play badminton?', vi: 'Mình bị sốt. Mình chơi cầu lông được không?', hint: "No, you shouldn't. You should take a rest.", k: ["no|shouldn't|shouldnt|should|not", 'rest|doctor|bed|water|sleep'], c: ["No, you shouldn't. You should take a rest.", 'Yes, play all night!', 'Badminton is a fever.'] }
          ]
        }
      ]
    },

    /* ===================== ZONE 5 ===================== */
    {
      id: 'z5', name: 'LEGO Rescue Heroes', vi: 'Đội Cứu Hộ LEGO', short: 'Rescue',
      topic: 'Jobs, Workplaces & Future Dreams', topicVi: 'Nghề nghiệp, nơi làm việc & ước mơ',
      color: '#C91A09', dark: '#8A1206', icon: '🚒',
      chars: { a: { name: 'Zoe', fig: 'hair-brown|freckles|torso-blue|legs-tan|none' }, b: { name: 'Captain Sam', fig: 'helmet-fire|grin|torso-fire|legs-black|wrench' } },
      chatter: [
        ["I'd like to be an astronaut!", 'Mình muốn trở thành phi hành gia!'],
        ['Firefighters save people!', 'Lính cứu hỏa cứu người!'],
        ['A programmer writes code.', 'Lập trình viên viết mã.'],
        ['Where does a nurse work?', 'Y tá làm việc ở đâu?'],
        ['To the rescue!', 'Đội cứu hộ xuất phát!']
      ],
      lessons: [
        {
          title: 'Cool Jobs', titleVi: 'Những nghề thú vị', icon: '🧑‍🚒',
          words: [
            ['firefighter', 'noun', '/ˈfaɪəfaɪtə/', 'lính cứu hỏa', '🧑‍🚒', 'The firefighter puts out the fire.', 'Người lính cứu hỏa dập tắt đám cháy.', 'This person drives a big red truck and puts out fires.'],
            ['architect', 'noun', '/ˈɑːkɪtekt/', 'kiến trúc sư', '📐', 'An architect designs houses and towers.', 'Kiến trúc sư thiết kế nhà và tòa tháp.', 'This person draws plans for new buildings.'],
            ['programmer', 'noun', '/ˈprəʊɡræmə/', 'lập trình viên', '👩‍💻', 'A programmer writes code for games.', 'Lập trình viên viết mã cho trò chơi.', 'This person writes code on a computer.'],
            ['astronaut', 'noun', '/ˈæstrənɔːt/', 'phi hành gia', '🧑‍🚀', 'The astronaut flies to the Moon.', 'Phi hành gia bay lên Mặt Trăng.', 'This person travels into space.'],
            ['vet', 'noun', '/vet/', 'bác sĩ thú y (veterinarian)', '🐶', 'The vet helps sick animals.', 'Bác sĩ thú y chữa cho các con vật bị ốm.', 'This doctor takes care of cats, dogs and other animals.']
          ],
          comic: {
            title: 'Job Day', titleVi: 'Ngày hội nghề nghiệp',
            panels: [
              ['a', 'Captain Sam, are you a firefighter?', 'Chú Sam ơi, chú là lính cứu hỏa ạ?', '🚒'],
              ['b', 'Yes, I am! I drive the big red fire truck.', 'Đúng rồi! Chú lái chiếc xe cứu hỏa màu đỏ to đùng.', '🧑‍🚒'],
              ['a', 'Cool! My dad is a programmer. He writes code all day.', 'Hay quá! Bố cháu là lập trình viên. Bố viết mã cả ngày.', '💻'],
              ['b', 'Can he write code for a robot that sprays water?', 'Bố cháu viết mã cho robot phun nước được không?', '🤖']
            ],
            blanks: [[0, 'firefighter', ['firefighter', 'smoothie', 'menu']], [2, 'programmer', ['programmer', 'pizza', 'fever']]]
          },
          build: [
            { vi: 'Em muốn hỏi: Bố của bạn làm nghề gì?', a: ['What', 'does', 'your father', 'do?'], x: ['is', 'job'] },
            { vi: 'Em muốn nói: Mẹ mình là bác sĩ thú y.', a: ['My mother', 'is', 'a', 'vet.'], x: ['an', 'are'] }
          ],
          talk: [
            { q: 'What does your mother do?', vi: 'Mẹ bạn làm nghề gì?', hint: 'She is a teacher.', k: ['she|mother|mom|mum|is|works', 'teacher|doctor|nurse|engineer|worker|farmer|driver|cook|vet|pilot|architect|programmer|office|business|seller|is|a|an'], c: ['She is a teacher.', 'She is a crispy pizza.', 'She has a toothache.'] },
            { q: 'Do you want to be an astronaut?', vi: 'Bạn có muốn làm phi hành gia không?', hint: 'Yes, I do! I want to fly to the Moon.', k: ['yes|no', "do|don't|dont|want|would|like"], c: ['Yes, I do! I want to fly to the Moon.', 'Yes, I am the Moon.', 'Astronaut is delicious.'] }
          ]
        },
        {
          title: 'Where Do They Work?', titleVi: 'Họ làm việc ở đâu?', icon: '🏥',
          words: [
            ['pilot', 'noun', '/ˈpaɪlət/', 'phi công', '✈️', 'The pilot flies a big plane.', 'Phi công lái một chiếc máy bay lớn.', 'This person flies a plane.'],
            ['detective', 'noun', '/dɪˈtektɪv/', 'thám tử', '🕵️', 'The detective finds clues.', 'Thám tử tìm manh mối.', 'This person solves mysteries with a magnifying glass.'],
            ['nurse', 'noun', '/nɜːs/', 'y tá', '👩‍⚕️', 'The nurse works with the doctors.', 'Y tá làm việc cùng các bác sĩ.', 'This person helps doctors and takes care of patients.'],
            ['hospital', 'noun', '/ˈhɒspɪtl/', 'bệnh viện', '🏥', 'Doctors and nurses work in a hospital.', 'Bác sĩ và y tá làm việc ở bệnh viện.', 'Sick people go here to get better.'],
            ['fire station', 'noun', '/ˈfaɪə ˌsteɪʃn/', 'trạm cứu hỏa', '🚒', 'The fire truck is at the fire station.', 'Xe cứu hỏa ở trạm cứu hỏa.', 'Firefighters work and wait here.']
          ],
          comic: {
            title: 'Where Do They Work?', titleVi: 'Họ làm ở đâu?',
            panels: [
              ['a', 'Where does a nurse work?', 'Y tá làm việc ở đâu ạ?', '👩‍⚕️'],
              ['b', 'A nurse works in a hospital.', 'Y tá làm việc ở bệnh viện.', '🏥'],
              ['a', 'And where do you work, Captain?', 'Còn chú làm ở đâu ạ?', '❓'],
              ['b', "At the fire station! But right now I'm saving a cat from a tree!", 'Ở trạm cứu hỏa! Nhưng bây giờ chú đang cứu một chú mèo trên cây!', '🐱']
            ],
            blanks: [[1, 'hospital', ['hospital', 'menu', 'bedroom']], [3, 'fire station', ['fire station', 'bowl of noodles', 'Science']]]
          },
          build: [
            { vi: 'Em muốn hỏi: Phi công làm việc ở đâu?', a: ['Where', 'does', 'a pilot', 'work?'], x: ['do', 'works'] },
            { vi: 'Em muốn nói: Y tá làm việc ở bệnh viện.', a: ['A nurse', 'works', 'in', 'a hospital.'], x: ['work', 'school bus'] }
          ],
          talk: [
            { q: 'Where does a firefighter work?', vi: 'Lính cứu hỏa làm việc ở đâu?', hint: 'A firefighter works at a fire station.', k: ['work|works|at|in', 'fire|station'], c: ['A firefighter works at a fire station.', 'A firefighter works in a pizza.', 'At half past seven.'] },
            { q: 'Where does a doctor work?', vi: 'Bác sĩ làm việc ở đâu?', hint: 'A doctor works in a hospital.', k: ['work|works|in|at', 'hospital|clinic'], c: ['A doctor works in a hospital.', 'A doctor works in a smoothie.', 'A doctor is a bus.'] }
          ]
        },
        {
          title: 'Dream Big', titleVi: 'Ước mơ lớn', icon: '🌟',
          words: [
            ['design buildings', 'verb', '/dɪˈzaɪn ˈbɪldɪŋz/', 'thiết kế các tòa nhà', '🏗️', 'Architects design buildings.', 'Kiến trúc sư thiết kế các tòa nhà.', 'Architects do this with pencils and computers.'],
            ['write code', 'verb', '/raɪt kəʊd/', 'viết mã lập trình', '⌨️', 'Programmers write code for apps.', 'Lập trình viên viết mã cho ứng dụng.', 'Programmers do this to make games and apps.'],
            ['save people', 'verb', '/seɪv ˈpiːpl/', 'cứu người', '🦸', 'Firefighters save people from fires.', 'Lính cứu hỏa cứu người khỏi đám cháy.', 'Heroes do this when someone is in danger.'],
            ['in the future', 'phrase', '/ɪn ðə ˈfjuːtʃə/', 'trong tương lai', '🔮', 'What would you like to be in the future?', 'Bạn muốn làm nghề gì trong tương lai?', 'The time after now: when you grow up.'],
            ["I'd like to be", 'phrase', '/aɪd laɪk tə biː/', 'Tôi muốn trở thành', '🌟', "I'd like to be a pilot.", 'Mình muốn trở thành phi công.', 'We say this to talk about our dream job.']
          ],
          comic: {
            title: 'Dream Big', titleVi: 'Ước mơ thật lớn',
            panels: [
              ['b', 'Zoe, what would you like to be in the future?', 'Zoe, sau này cháu muốn làm nghề gì?', '🔮'],
              ['a', "I'd like to be an architect!", 'Cháu muốn trở thành kiến trúc sư!', '📐'],
              ['b', 'Wow! Why?', 'Oa! Vì sao thế?', '🤔'],
              ['a', 'Because I want to build giant LEGO towers as tall as the clouds!', 'Vì cháu muốn xây những tháp LEGO khổng lồ cao tới mây!', '☁️']
            ],
            blanks: [[0, 'in the future', ['in the future', 'at half past', 'in the menu']], [1, 'architect', ['architect', 'toothache', 'lemonade']]]
          },
          build: [
            { vi: 'Em muốn nói: Mình muốn trở thành phi công.', a: ["I'd like", 'to be', 'a', 'pilot.'], x: ['an', 'being'] },
            { vi: 'Em muốn nói: Lính cứu hỏa cứu người khỏi đám cháy.', a: ['Firefighters', 'save', 'people', 'from fires.'], x: ['saves', 'code'] }
          ],
          talk: [
            { q: 'What would you like to be in the future?', vi: 'Sau này bạn muốn làm nghề gì?', hint: "I'd like to be an architect.", k: ['like|want|would', 'be|become'], c: ["I'd like to be an architect.", "I'd like a bowl of noodles.", 'I am in the future bus.'] },
            { q: 'Why do you want that job?', vi: 'Tại sao bạn muốn làm nghề đó?', hint: 'Because I want to help people.', k: ['because', 'want|like|love|help|save|build|make|fly'], c: ['Because I want to help people.', 'Because it is Tuesday.', 'Because I have a fever.'] }
          ]
        }
      ]
    },

    /* ===================== ZONE 6 ===================== */
    {
      id: 'z6', name: 'LEGO Dino & Safari', vi: 'Công Viên Khủng Long & Safari', short: 'Dino Safari',
      topic: 'Wild Animals, Dinosaurs & Comparisons', topicVi: 'Động vật hoang dã, khủng long & so sánh',
      color: '#5A9E3A', dark: '#3D6E27', icon: '🦖',
      chars: { a: { name: 'Ben', fig: 'cap-red|surprised|torso-blue|legs-tan|camera' }, b: { name: 'Ranger Ruby', fig: 'cap-detective|smile|torso-detective|legs-tan|magnifier' } },
      chatter: [
        ["ROAR! I'm a LEGO T-Rex!", 'GÀO! Tớ là khủng long T-Rex LEGO!'],
        ['A cheetah is faster than a horse!', 'Báo săn nhanh hơn ngựa!'],
        ['The giraffe is the tallest animal!', 'Hươu cao cổ là con vật cao nhất!'],
        ['Crocodiles are dangerous. Be careful!', 'Cá sấu nguy hiểm lắm. Cẩn thận nhé!'],
        ['Dolphins are very intelligent.', 'Cá heo rất thông minh.']
      ],
      lessons: [
        {
          title: 'Wild Animals', titleVi: 'Động vật hoang dã', icon: '🦒',
          words: [
            ['cheetah', 'noun', '/ˈtʃiːtə/', 'báo săn', '🐆', 'A cheetah can run very fast.', 'Báo săn có thể chạy rất nhanh.', 'The fastest animal on land. It has spots.'],
            ['blue whale', 'noun', '/bluː weɪl/', 'cá voi xanh', '🐋', 'The blue whale lives in the ocean.', 'Cá voi xanh sống ở đại dương.', 'The biggest animal in the world. It lives in the sea.'],
            ['giraffe', 'noun', '/dʒəˈrɑːf/', 'hươu cao cổ', '🦒', 'A giraffe has a very long neck.', 'Hươu cao cổ có cái cổ rất dài.', 'It has a very long neck and eats leaves from tall trees.'],
            ['crocodile', 'noun', '/ˈkrɒkədaɪl/', 'cá sấu', '🐊', 'The crocodile has big teeth.', 'Cá sấu có hàm răng to.', 'It lives in rivers and has a long mouth with sharp teeth.'],
            ['elephant', 'noun', '/ˈelɪfənt/', 'con voi', '🐘', 'An elephant has big ears and a long trunk.', 'Con voi có đôi tai to và cái vòi dài.', 'A huge grey animal with a long trunk.']
          ],
          comic: {
            title: 'Safari Jeep', titleVi: 'Xe jeep safari',
            panels: [
              ['a', 'Look! A giraffe! Its neck is so long!', 'Nhìn kìa! Hươu cao cổ! Cổ nó dài ghê!', '🦒'],
              ['b', "And over there is a cheetah. It's very fast.", 'Đằng kia là báo săn. Nó chạy rất nhanh.', '🐆'],
              ['a', "What's that in the river? A log?", 'Cái gì dưới sông thế? Khúc gỗ à?', '🪵'],
              ['b', "That's not a log, Ben... it's a crocodile! Drive!", 'Không phải khúc gỗ đâu Ben... cá sấu đấy! Lái xe đi!', '🐊']
            ],
            blanks: [[0, 'giraffe', ['giraffe', 'pilot', 'bill']], [3, 'crocodile', ['crocodile', 'smoothie', 'dentist']]]
          },
          build: [
            { vi: 'Em muốn nói: Hươu cao cổ có cái cổ rất dài.', a: ['A giraffe', 'has', 'a very', 'long neck.'], x: ['have', 'short'] },
            { vi: 'Em muốn hỏi: Cá voi xanh sống ở đâu?', a: ['Where', 'does', 'the blue whale', 'live?'], x: ['do', 'lives'] }
          ],
          talk: [
            { q: "What's your favourite animal?", vi: 'Con vật yêu thích của bạn là gì?', hint: 'My favourite animal is the elephant.', k: ['favourite|favorite|like|love', 'cheetah|whale|giraffe|crocodile|elephant|dog|cat|tiger|lion|panda|monkey|rabbit|bird|horse|dolphin|dinosaur|rex|bear|fish|animal'], c: ['My favourite animal is the elephant.', 'My favourite animal is a menu.', 'I like half past.'] },
            { q: 'Which animal has a very long neck?', vi: 'Con vật nào có cái cổ rất dài?', hint: 'The giraffe has a long neck.', k: ['giraffe|giraffes'], c: ['The giraffe has a long neck.', 'The crocodile has a long neck.', 'The bus has a long neck.'] }
          ]
        },
        {
          title: 'Dino Park', titleVi: 'Công viên khủng long', icon: '🦕',
          words: [
            ['T-Rex', 'noun', '/ˌtiː ˈreks/', 'khủng long bạo chúa', '🦖', 'The T-Rex has tiny arms and big teeth.', 'Khủng long bạo chúa có tay tí hon và răng to.', 'A huge dinosaur with tiny arms and a big roar.'],
            ['Triceratops', 'noun', '/traɪˈserətɒps/', 'khủng long ba sừng', '🦕', 'A Triceratops has three horns.', 'Khủng long ba sừng có ba cái sừng.', 'A dinosaur with three horns on its face.'],
            ['heavy', 'adj', '/ˈhevi/', 'nặng', '🏋️', 'An elephant is very heavy.', 'Con voi rất nặng.', 'Not light. Hard to lift!'],
            ['dangerous', 'adj', '/ˈdeɪndʒərəs/', 'nguy hiểm', '⚠️', 'Crocodiles are dangerous.', 'Cá sấu rất nguy hiểm.', 'It can hurt you. Be careful!'],
            ['intelligent', 'adj', '/ɪnˈtelɪdʒənt/', 'thông minh', '🧠', 'Dolphins are very intelligent.', 'Cá heo rất thông minh.', 'Very clever. It can learn things quickly.']
          ],
          comic: {
            title: 'Dino Park', titleVi: 'Công viên khủng long',
            panels: [
              ['a', 'Wow! Is that T-Rex real?', 'Oa! Con T-Rex kia là thật à?', '🦖'],
              ['b', "No, it's a LEGO T-Rex. But it's very heavy!", 'Không, nó là T-Rex LEGO. Nhưng nó nặng lắm!', '🧱'],
              ['a', 'Is the Triceratops dangerous?', 'Khủng long ba sừng có nguy hiểm không ạ?', '🦕'],
              ['b', "No, it only eats plants. And it's very intelligent!", 'Không, nó chỉ ăn cây cỏ thôi. Và nó rất thông minh!', '🌿']
            ],
            blanks: [[1, 'heavy', ['heavy', 'delicious', 'nervous']], [2, 'dangerous', ['dangerous', 'altogether', 'early']]]
          },
          build: [
            { vi: 'Em muốn nói: Khủng long bạo chúa rất nguy hiểm.', a: ['The T-Rex', 'is', 'very', 'dangerous.'], x: ['are', 'has'] },
            { vi: 'Em muốn nói: Cá heo là loài vật thông minh.', a: ['Dolphins', 'are', 'intelligent', 'animals.'], x: ['is', 'has'] }
          ],
          talk: [
            { q: 'Which dinosaur do you like?', vi: 'Bạn thích loài khủng long nào?', hint: 'I like the Triceratops.', k: ['like|love|favourite|favorite', 'rex|trex|triceratops|dinosaur|stegosaurus|raptor|velociraptor|brachiosaurus|diplodocus|pterodactyl'], c: ['I like the Triceratops.', 'I like the bill.', 'Dinosaurs like homework.'] },
            { q: 'Is a crocodile dangerous?', vi: 'Cá sấu có nguy hiểm không?', hint: "Yes, it is. It's very dangerous.", k: ['yes|no', "is|isn't|dangerous|it"], c: ["Yes, it is. It's very dangerous.", 'No, it is a smoothie.', 'Yes, it is a pilot.'] }
          ]
        },
        {
          title: 'The Great Race', titleVi: 'Cuộc đua lớn', icon: '💨',
          words: [
            ['graceful', 'adj', '/ˈɡreɪsfl/', 'duyên dáng, uyển chuyển', '🦢', 'The swan is graceful.', 'Thiên nga thật duyên dáng.', 'Moving in a smooth and beautiful way.'],
            ['faster than', 'phrase', '/ˈfɑːstə ðən/', 'nhanh hơn', '💨', 'A cheetah is faster than a horse.', 'Báo săn nhanh hơn ngựa.', 'We use this to compare speed.'],
            ['bigger than', 'phrase', '/ˈbɪɡə ðən/', 'to hơn', '🦣', 'An elephant is bigger than a lion.', 'Con voi to hơn sư tử.', 'We use this to compare size.'],
            ['the tallest', 'phrase', '/ðə ˈtɔːlɪst/', 'cao nhất', '🗼', 'The giraffe is the tallest animal.', 'Hươu cao cổ là con vật cao nhất.', 'Taller than all the others!'],
            ['more dangerous than', 'phrase', '/mɔː ˈdeɪndʒərəs ðən/', 'nguy hiểm hơn', '☠️', 'A crocodile is more dangerous than a frog.', 'Cá sấu nguy hiểm hơn con ếch.', "We use 'more' with long words to compare."]
          ],
          comic: {
            title: 'The Great Race', titleVi: 'Cuộc đua lớn',
            panels: [
              ['a', 'Which animal is faster, a horse or a cheetah?', 'Con nào nhanh hơn, ngựa hay báo săn?', '🐎'],
              ['b', 'A cheetah is much faster than a horse!', 'Báo săn nhanh hơn ngựa nhiều!', '🐆'],
              ['a', 'And which animal is the tallest?', 'Thế con vật nào cao nhất ạ?', '📏'],
              ['b', 'The giraffe! But our LEGO T-Rex is the tallest in this park!', 'Hươu cao cổ! Nhưng T-Rex LEGO là cao nhất công viên này!', '🦖']
            ],
            blanks: [[1, 'faster than', ['faster than', 'hungry than', 'usually']], [2, 'the tallest', ['the tallest', 'the bill', 'the menu']]]
          },
          build: [
            { vi: 'Em muốn so sánh: Báo săn nhanh hơn ngựa.', a: ['A cheetah', 'is', 'faster than', 'a horse.'], x: ['fast', 'more'] },
            { vi: 'Em muốn so sánh: Cá sấu nguy hiểm hơn ếch.', a: ['A crocodile', 'is', 'more dangerous', 'than', 'a frog.'], x: ['dangerouser', 'the'] }
          ],
          talk: [
            { q: 'Which animal is faster, a horse or a cheetah?', vi: 'Con nào nhanh hơn, ngựa hay báo săn?', hint: 'A cheetah is faster than a horse.', k: ['cheetah', 'faster|fast'], c: ['A cheetah is faster than a horse.', 'A horse is faster than a rocket.', 'A cheetah is a menu.'] },
            { q: 'Which animal is the tallest?', vi: 'Con vật nào cao nhất?', hint: 'The giraffe is the tallest animal.', k: ['giraffe|giraffes', 'tallest|tall|is'], c: ['The giraffe is the tallest animal.', 'The frog is the tallest animal.', 'The tallest is lunch.'] }
          ]
        }
      ]
    },

    /* ===================== ZONE 7 ===================== */
    {
      id: 'z7', name: 'LEGO Holiday Airport', vi: 'Sân Bay Du Lịch LEGO', short: 'Airport',
      topic: 'Weather, Clothes & Travel Plans', topicVi: 'Thời tiết, quần áo & kế hoạch du lịch',
      color: '#3D9BE0', dark: '#1F6FAE', icon: '✈️',
      chars: { a: { name: 'Nam', fig: 'cap-red|grin|torso-red|legs-blue|camera' }, b: { name: 'Pilot Anna', fig: 'hair-blonde|cool|torso-blue|legs-black|flag' } },
      chatter: [
        ["It's sunny and warm today!", 'Hôm nay trời nắng và ấm áp!'],
        ["Don't forget your passport!", 'Đừng quên hộ chiếu nhé!'],
        ["Here's your boarding pass.", 'Đây là thẻ lên máy bay của bạn.'],
        ["Let's go camping!", 'Mình đi cắm trại thôi!'],
        ['Put on your sunglasses!', 'Đeo kính râm vào nào!']
      ],
      lessons: [
        {
          title: "What's the Weather Like?", titleVi: 'Thời tiết thế nào?', icon: '🌦️',
          words: [
            ['sunny and warm', 'adj', '/ˈsʌni ənd wɔːm/', 'nắng và ấm áp', '☀️', "It's sunny and warm in Nha Trang.", 'Ở Nha Trang trời nắng và ấm áp.', 'Great weather for the beach!'],
            ['stormy', 'adj', '/ˈstɔːmi/', 'có bão', '⛈️', "It's stormy. Stay inside!", 'Trời đang bão. Ở trong nhà nhé!', 'Lots of rain, thunder and strong wind.'],
            ['freezing cold', 'adj', '/ˈfriːzɪŋ kəʊld/', 'lạnh cóng', '🥶', "It's freezing cold in winter.", 'Mùa đông trời lạnh cóng.', 'Very, very cold. You can see snow and ice.'],
            ['foggy', 'adj', '/ˈfɒɡi/', 'có sương mù', '🌫️', "It's cool and foggy in Da Lat.", 'Đà Lạt mát mẻ và có sương mù.', "You can't see far because the air is white and cloudy."],
            ['windy', 'adj', '/ˈwɪndi/', 'có gió', '🌬️', "It's windy. Let's fly a kite!", 'Trời có gió. Mình đi thả diều thôi!', 'Good weather for flying a kite.']
          ],
          comic: {
            title: 'Weather Report', titleVi: 'Bản tin thời tiết',
            panels: [
              ['a', "What's the weather like in Da Lat today?", 'Hôm nay thời tiết ở Đà Lạt thế nào ạ?', '🗺️'],
              ['b', "It's cool and foggy. Don't forget your warm jacket!", 'Trời mát và có sương mù. Đừng quên áo ấm nhé!', '🌫️'],
              ['a', 'And in Nha Trang?', 'Còn ở Nha Trang ạ?', '🏖️'],
              ['b', "It's sunny and warm. Perfect for building a LEGO sandcastle!", 'Trời nắng và ấm. Tuyệt để xây lâu đài cát LEGO!', '☀️']
            ],
            blanks: [[0, 'weather', ['weather', 'homework', 'bill']], [1, 'foggy', ['foggy', 'delicious', 'proud']]]
          },
          build: [
            { vi: 'Em muốn hỏi: Thời tiết ở Hà Nội hôm nay thế nào?', a: ["What's", 'the weather', 'like', 'in Ha Noi today?'], x: ['How', 'are'] },
            { vi: 'Em muốn nói: Trời nắng và ấm áp.', a: ["It's", 'sunny', 'and', 'warm.'], x: ['Its', 'are'] }
          ],
          talk: [
            { q: "What's the weather like today?", vi: 'Hôm nay thời tiết thế nào?', hint: "It's sunny and warm.", k: ["it's|it|its|is", 'sunny|warm|hot|cold|rainy|windy|foggy|cloudy|stormy|cool|freezing|nice|raining'], c: ["It's sunny and warm.", "It's a bowl of noodles.", 'I have a stormy toothache.'] },
            { q: 'Do you like stormy weather?', vi: 'Bạn có thích thời tiết bão bùng không?', hint: "No, I don't. I like sunny weather.", k: ['yes|no', "like|don't|dont|do"], c: ["No, I don't. I like sunny weather.", 'Yes, I am a storm.', 'Stormy is my teacher.'] }
          ]
        },
        {
          title: 'Packing Time', titleVi: 'Xếp đồ đi chơi', icon: '🧳',
          words: [
            ['raincoat', 'noun', '/ˈreɪnkəʊt/', 'áo mưa', '🧥', "Take your raincoat. It's rainy.", 'Mang áo mưa đi. Trời đang mưa.', 'You wear this to stay dry in the rain.'],
            ['sunglasses', 'noun', '/ˈsʌnɡlɑːsɪz/', 'kính râm', '🕶️', 'I wear sunglasses at the beach.', 'Mình đeo kính râm ở bãi biển.', "You wear these on your eyes when it's sunny."],
            ['sweater', 'noun', '/ˈswetə/', 'áo len', '🧶', "Wear a sweater. It's cold!", 'Mặc áo len vào. Lạnh lắm!', 'A warm top made of wool.'],
            ['suitcase', 'noun', '/ˈsuːtkeɪs/', 'va li', '🧳', 'My suitcase is full of clothes.', 'Va li của mình đầy quần áo.', 'You put your clothes in this when you travel.'],
            ['pack', 'verb', '/pæk/', 'xếp đồ (vào túi, va li)', '🎒', "Don't forget to pack your toothbrush!", 'Đừng quên xếp bàn chải đánh răng nhé!', 'You put things into a bag before a trip.']
          ],
          comic: {
            title: 'Packing Time', titleVi: 'Giờ xếp đồ',
            panels: [
              ['b', "Nam, are you ready? Let's pack your suitcase.", 'Nam ơi, sẵn sàng chưa? Mình xếp va li nhé.', '🧳'],
              ['a', 'I have my sunglasses and my raincoat.', 'Cháu có kính râm và áo mưa rồi ạ.', '🕶️'],
              ['b', "It's freezing cold in Sa Pa. Take a sweater too!", 'Sa Pa lạnh cóng đấy. Mang thêm áo len nữa!', '🥶'],
              ['a', "Hmm... there's no room. Can my LEGO dragon wear it?", 'Hừm... hết chỗ rồi. Cho rồng LEGO của cháu mặc được không?', '🐉']
            ],
            blanks: [[0, 'suitcase', ['suitcase', 'stomachache', 'spaghetti']], [2, 'sweater', ['sweater', 'lemonade', 'dentist']]]
          },
          build: [
            { vi: 'Em muốn nhắc bạn: Đừng quên mang áo mưa nhé!', a: ["Don't", 'forget', 'to pack', 'your raincoat!'], x: ["Doesn't", 'sunny'] },
            { vi: 'Em muốn nói: Mình đeo kính râm khi trời nắng.', a: ['I wear', 'sunglasses', 'when', "it's sunny."], x: ['wears', 'because'] }
          ],
          talk: [
            { q: "It's raining. What should you take?", vi: 'Trời đang mưa. Bạn nên mang theo gì?', hint: 'I should take a raincoat.', k: ['raincoat|umbrella|coat|jacket'], c: ['I should take a raincoat.', 'I should take a crispy pizza.', 'I should take a toothache.'] },
            { q: 'What do you pack in your suitcase?', vi: 'Bạn xếp gì vào va li?', hint: 'I pack my clothes and my toothbrush.', k: ['pack|bring|take|put', 'clothes|toothbrush|sweater|sunglasses|raincoat|shirt|book|toys|lego|shoes|hat|jacket'], c: ['I pack my clothes and my toothbrush.', 'I pack a blue whale.', 'I pack the fire station.'] }
          ]
        },
        {
          title: 'At the Airport', titleVi: 'Ở sân bay', icon: '🛂',
          words: [
            ['passport', 'noun', '/ˈpɑːspɔːt/', 'hộ chiếu', '🛂', 'Show your passport, please.', 'Vui lòng cho xem hộ chiếu.', 'A small book you need to travel to another country.'],
            ['boarding pass', 'noun', '/ˈbɔːdɪŋ pɑːs/', 'thẻ lên máy bay', '🎫', 'Here is your boarding pass. Gate 5.', 'Đây là thẻ lên máy bay của bạn. Cửa số 5.', 'A ticket you show before you get on the plane.'],
            ['go camping', 'verb', '/ɡəʊ ˈkæmpɪŋ/', 'đi cắm trại', '⛺', "Let's go camping in the mountains!", 'Mình đi cắm trại trên núi nhé!', 'You sleep in a tent outside.'],
            ['build a sandcastle', 'verb', '/bɪld ə ˈsændkɑːsl/', 'xây lâu đài cát', '🏖️', 'We build a sandcastle on the beach.', 'Chúng mình xây lâu đài cát trên bãi biển.', 'You do this with sand and a bucket at the beach.'],
            ['go on holiday', 'verb', '/ɡəʊ ɒn ˈhɒlədeɪ/', 'đi nghỉ mát', '🌴', 'We go on holiday every summer.', 'Nhà mình đi nghỉ mát mỗi mùa hè.', "You travel for fun and don't go to school or work."]
          ],
          comic: {
            title: 'At the Airport', titleVi: 'Ở sân bay',
            panels: [
              ['b', 'Good morning! Your passport, please.', 'Chào buổi sáng! Cho cô xem hộ chiếu nhé.', '🛂'],
              ['a', "Here you are. We're going on holiday to Phu Quoc!", 'Đây ạ. Nhà cháu đi nghỉ mát ở Phú Quốc!', '🌴'],
              ['b', "Great! Here's your boarding pass. What will you do there?", 'Tuyệt! Thẻ lên máy bay của cháu đây. Cháu sẽ làm gì ở đó?', '🎫'],
              ['a', 'Build a sandcastle... shaped like a LEGO airport!', 'Xây lâu đài cát... hình sân bay LEGO ạ!', '🏖️']
            ],
            blanks: [[0, 'passport', ['passport', 'pizza', 'fever']], [2, 'boarding pass', ['boarding pass', 'bowl of noodles', 'school subject']]]
          },
          build: [
            { vi: 'Em muốn nói: Hè này chúng mình sẽ đi cắm trại.', a: ["We're going to", 'go camping', 'this', 'summer.'], x: ['goes', 'sandcastle'] },
            { vi: 'Em muốn hỏi lịch sự: Cho tôi xem hộ chiếu của bạn.', a: ['Can I', 'see', 'your passport,', 'please?'], x: ['sees', 'menu'] }
          ],
          talk: [
            { q: 'Where would you like to go on holiday?', vi: 'Bạn muốn đi nghỉ mát ở đâu?', hint: "I'd like to go to Da Nang.", k: ['go|like|want|visit|travel', 'to|nang|long|quoc|trang|lat|beach|japan|korea|paris|london|pa|hue|hoi|mountain|sea'], c: ["I'd like to go to Da Nang.", "I'd like to go to a toothache.", 'I go on holiday at seven.'] },
            { q: 'What do you do at the beach?', vi: 'Bạn làm gì ở bãi biển?', hint: 'I build a sandcastle and swim.', k: ['build|swim|play|sandcastle|run|eat|relax|surf|walk|collect'], c: ['I build a sandcastle and swim.', 'I do my homework in the sea bus.', 'I see a dentist.'] }
          ]
        }
      ]
    },

    /* ===================== ZONE 8 ===================== */
    {
      id: 'z8', name: 'LEGO Mystery Detective', vi: 'Thám Tử Bí Ẩn LEGO', short: 'Detective',
      topic: 'Past Events & Storytelling', topicVi: 'Chuyện đã xảy ra & kể chuyện',
      color: '#7C4A1E', dark: '#4F2E12', icon: '🔍',
      chars: { a: { name: 'Finn', fig: 'hair-brown|surprised|torso-red|legs-blue|book' }, b: { name: 'Detective Dot', fig: 'cap-detective|wink|torso-detective|legs-black|magnifier' } },
      chatter: [
        ['Where were you yesterday afternoon?', 'Chiều hôm qua bạn ở đâu?'],
        ['I found a clue!', 'Mình tìm thấy manh mối rồi!'],
        ['We had a great time at the museum!', 'Chúng mình đã rất vui ở bảo tàng!'],
        ['Elementary, my dear builder!', 'Đơn giản thôi, bạn thợ xây thân mến!'],
        ['I lost my backpack... again!', 'Mình lại làm mất ba lô rồi!']
      ],
      lessons: [
        {
          title: 'Where Were You?', titleVi: 'Bạn đã ở đâu?', icon: '📆',
          words: [
            ['yesterday', 'adv', '/ˈjestədeɪ/', 'hôm qua', '📆', 'I played football yesterday.', 'Hôm qua mình chơi bóng đá.', 'The day before today.'],
            ['last weekend', 'phrase', '/lɑːst ˌwiːkˈend/', 'cuối tuần trước', '🗓️', 'I visited the zoo last weekend.', 'Cuối tuần trước mình đi sở thú.', 'Saturday and Sunday of last week.'],
            ['I was', 'phrase', '/aɪ wɒz/', 'tôi đã (ở / là) – quá khứ của I am', '⏪', 'I was at home yesterday.', 'Hôm qua mình ở nhà.', "The past form of 'I am'."],
            ['at the bookshop', 'phrase', '/æt ðə ˈbʊkʃɒp/', 'ở hiệu sách', '📖', 'I was at the bookshop yesterday afternoon.', 'Chiều hôm qua mình ở hiệu sách.', 'A shop where you buy books.'],
            ['visited my grandparents', 'verb', '/ˈvɪzɪtɪd maɪ ˈɡrænpeərənts/', 'đã thăm ông bà', '👵', 'I visited my grandparents last Sunday.', 'Chủ nhật tuần trước mình đã thăm ông bà.', 'You went to see Grandma and Grandpa.']
          ],
          comic: {
            title: 'The Missing Cake', titleVi: 'Chiếc bánh biến mất',
            panels: [
              ['b', 'Where were you yesterday afternoon, Finn?', 'Chiều hôm qua cậu ở đâu, Finn?', '🔍'],
              ['a', 'I was at the bookshop. I bought a comic.', 'Tớ ở hiệu sách. Tớ mua một cuốn truyện tranh.', '📖'],
              ['b', 'Hmm... then who ate the chocolate cake?', 'Hừm... thế ai đã ăn cái bánh sô-cô-la?', '🍫'],
              ['a', 'Not me! But why is there chocolate on your magnifying glass, Detective?', 'Không phải tớ! Nhưng sao kính lúp của cậu dính sô-cô-la thế, thám tử?', '🤭']
            ],
            blanks: [[0, 'yesterday', ['yesterday', 'tomorrow', 'usually']], [1, 'at the bookshop', ['at the bookshop', 'in the future', 'more dangerous']]]
          },
          build: [
            { vi: 'Em muốn hỏi: Hôm qua bạn ở đâu?', a: ['Where', 'were', 'you', 'yesterday?'], x: ['was', 'did'] },
            { vi: 'Em muốn kể: Cuối tuần trước mình đã thăm ông bà.', a: ['I', 'visited', 'my grandparents', 'last weekend.'], x: ['visit', 'tomorrow'] }
          ],
          talk: [
            { q: 'Where were you yesterday?', vi: 'Hôm qua bạn ở đâu?', hint: 'I was at home yesterday.', k: ['was|went', 'at|in|home|school|park|bookshop|zoo|house|grandparents|beach'], c: ['I was at home yesterday.', 'I am a yesterday.', 'I was a crispy pizza.'] },
            { q: 'What did you do last weekend?', vi: 'Cuối tuần trước bạn đã làm gì?', hint: 'I visited my grandparents.', k: ['visited|played|went|watched|saw|had|ate|read|did|made|built|swam|cooked|stayed|helped'], c: ['I visited my grandparents.', 'I visit my grandparents tomorrow.', 'I am last weekend.'] }
          ]
        },
        {
          title: 'The Museum Trip', titleVi: 'Chuyến đi bảo tàng', icon: '🦴',
          words: [
            ['went to the museum', 'verb', '/went tə ðə mjuˈziːəm/', 'đã đi bảo tàng', '🦴', 'We went to the museum last Saturday.', 'Thứ Bảy tuần trước chúng mình đã đi bảo tàng.', 'You saw old and interesting things there.'],
            ['saw a parade', 'verb', '/sɔː ə pəˈreɪd/', 'đã xem diễu hành', '🎉', 'We saw a parade in the city.', 'Chúng mình đã xem diễu hành trong thành phố.', 'You watched many people marching and playing music in the street.'],
            ['bought a souvenir', 'verb', '/bɔːt ə ˌsuːvəˈnɪə/', 'đã mua quà lưu niệm', '🎁', 'I bought a souvenir for my mum.', 'Mình đã mua quà lưu niệm cho mẹ.', 'You paid for a small gift to remember a trip.'],
            ['took photos', 'verb', '/tʊk ˈfəʊtəʊz/', 'đã chụp ảnh', '📸', 'I took photos of the dinosaurs.', 'Mình đã chụp ảnh những con khủng long.', 'You used a camera.'],
            ['had a great time', 'verb', '/hæd ə ɡreɪt taɪm/', 'đã có khoảng thời gian tuyệt vời', '🥳', 'We had a great time at the zoo.', 'Chúng mình đã rất vui ở sở thú.', 'You say this when the day was really fun.']
          ],
          comic: {
            title: 'The Museum Trip', titleVi: 'Chuyến đi bảo tàng',
            panels: [
              ['a', 'Last weekend, I went to the museum.', 'Cuối tuần trước, tớ đã đi bảo tàng.', '🏛️'],
              ['b', 'What did you do there?', 'Cậu đã làm gì ở đó?', '🤔'],
              ['a', 'I took photos of a T-Rex and bought a souvenir.', 'Tớ chụp ảnh khủng long T-Rex và mua quà lưu niệm.', '📸'],
              ['b', 'Sounds like you had a great time! Is that a LEGO dinosaur bone?', 'Nghe vui quá! Kia là khúc xương khủng long LEGO à?', '🦴']
            ],
            blanks: [[0, 'went to the museum', ['went to the museum', 'go to bed', 'have a fever']], [2, 'took photos', ['took photos', 'take a rest', 'write code']]]
          },
          build: [
            { vi: 'Em muốn hỏi: Bạn đã làm gì ở đó?', a: ['What', 'did', 'you do', 'there?'], x: ['do', 'does'] },
            { vi: 'Em muốn kể: Chúng mình đã rất vui ở buổi diễu hành.', a: ['We', 'had', 'a great time', 'at the parade.'], x: ['have', 'has'] }
          ],
          talk: [
            { q: 'Did you go to the museum last weekend?', vi: 'Cuối tuần trước bạn có đi bảo tàng không?', hint: 'Yes, I did. I took lots of photos.', k: ['yes|no', "did|didn't|didnt|went"], c: ['Yes, I did. I took lots of photos.', 'Yes, I do a museum.', 'No, I am a souvenir.'] },
            { q: 'What did you buy on your holiday?', vi: 'Bạn đã mua gì trong kỳ nghỉ?', hint: 'I bought a souvenir for my friend.', k: ['bought|buy|got', 'souvenir|toy|gift|present|hat|book|lego|candy|shirt|postcard|for'], c: ['I bought a souvenir for my friend.', 'I buy a fever yesterday.', 'I bought the weather.'] }
          ]
        },
        {
          title: 'Solve the Mystery', titleVi: 'Phá giải bí ẩn', icon: '🕵️',
          words: [
            ['found a clue', 'verb', '/faʊnd ə kluː/', 'đã tìm thấy manh mối', '🔍', 'The detective found a clue under the table.', 'Thám tử đã tìm thấy manh mối dưới gầm bàn.', 'You discovered something that helps solve a mystery.'],
            ['lost my backpack', 'verb', '/lɒst maɪ ˈbækpæk/', 'đã làm mất ba lô', '😟', 'Oh no! I lost my backpack at the park.', 'Ôi không! Mình làm mất ba lô ở công viên rồi.', "You can't find your school bag anywhere!"],
            ['watched a film', 'verb', '/wɒtʃt ə fɪlm/', 'đã xem phim', '🎬', 'We watched a film at the cinema.', 'Chúng mình đã xem phim ở rạp.', 'You saw a movie.'],
            ['witness', 'noun', '/ˈwɪtnəs/', 'nhân chứng', '👀', 'The witness saw everything.', 'Nhân chứng đã thấy mọi chuyện.', 'A person who saw what happened.'],
            ['What happened?', 'phrase', '/wɒt ˈhæpənd/', 'Chuyện gì đã xảy ra?', '❓', 'What happened to your bike?', 'Chuyện gì đã xảy ra với xe đạp của bạn?', 'You ask this when you want to know the story.']
          ],
          comic: {
            title: 'The Lost Backpack', titleVi: 'Chiếc ba lô thất lạc',
            panels: [
              ['a', 'Detective Dot! I lost my backpack!', 'Thám tử Dot ơi! Tớ làm mất ba lô rồi!', '🎒'],
              ['b', 'What happened? Where were you this morning?', 'Chuyện gì đã xảy ra? Sáng nay cậu ở đâu?', '❓'],
              ['a', 'I watched a film at the cinema... then I bought popcorn.', 'Tớ xem phim ở rạp... rồi mua bỏng ngô.', '🎬'],
              ['b', 'I found a clue! Popcorn on the floor leads to your backpack!', 'Tớ tìm ra manh mối rồi! Bỏng ngô rơi trên sàn dẫn tới ba lô của cậu!', '🍿']
            ],
            blanks: [[0, 'lost my backpack', ['lost my backpack', 'saw a parade', 'had a great time']], [3, 'found a clue', ['found a clue', 'ate a cake', 'rode a bike']]]
          },
          build: [
            { vi: 'Em muốn hỏi: Chuyện gì đã xảy ra với ba lô của bạn?', a: ['What', 'happened', 'to', 'your backpack?'], x: ['happen', 'does'] },
            { vi: 'Em muốn kể: Thám tử đã tìm thấy một manh mối trong vườn.', a: ['The detective', 'found', 'a clue', 'in the garden.'], x: ['find', 'finds'] }
          ],
          talk: [
            { q: 'Oh no! What happened?', vi: 'Ôi không! Chuyện gì đã xảy ra thế?', hint: 'I lost my backpack at the park.', k: ['lost|broke|fell|forgot|dropped|missed', 'my|backpack|bag|bike|book|key|keys|pencil'], c: ['I lost my backpack at the park.', 'I lose a parade tomorrow.', 'It is a delicious clue.'] },
            { q: 'Did you watch a film yesterday?', vi: 'Hôm qua bạn có xem phim không?', hint: 'Yes, I did. I watched a funny film.', k: ['yes|no', "did|didn't|didnt|watched"], c: ['Yes, I did. I watched a funny film.', 'Yes, I watch a bus.', 'A film is my dentist.'] }
          ]
        }
      ]
    },

    /* ===================== ZONE 9 ===================== */
    {
      id: 'z9', name: 'LEGO Space Station', vi: 'Trạm Vũ Trụ LEGO', short: 'Space',
      topic: 'Directions, Places in Town & Prepositions', topicVi: 'Chỉ đường, địa điểm & giới từ',
      color: '#8E44AD', dark: '#5E2B75', icon: '🚀',
      chars: { a: { name: 'Kai', fig: 'helmet-astro|surprised|torso-astro|legs-white|none' }, b: { name: 'Astro Luna', fig: 'helmet-astro|smile|torso-stars|legs-white|flag' } },
      chatter: [
        ['Excuse me, how do I get to the Moon?', 'Xin lỗi, làm sao để đến Mặt Trăng ạ?'],
        ['Go straight ahead and turn left!', 'Đi thẳng rồi rẽ trái!'],
        ['The planetarium is next to the cinema.', 'Cung thiên văn ở cạnh rạp chiếu phim.'],
        ['3... 2... 1... Blast off!', '3... 2... 1... Phóng!'],
        ['Turn right at the traffic lights.', 'Rẽ phải ở chỗ đèn giao thông.']
      ],
      lessons: [
        {
          title: 'Places in Space Town', titleVi: 'Địa điểm trong thị trấn', icon: '🏤',
          words: [
            ['library', 'noun', '/ˈlaɪbrəri/', 'thư viện', '📚', 'I borrow books from the library.', 'Mình mượn sách ở thư viện.', 'You can read and borrow books here.'],
            ['post office', 'noun', '/pəʊst ˈɒfɪs/', 'bưu điện', '🏤', 'I send letters at the post office.', 'Mình gửi thư ở bưu điện.', 'You send letters and parcels here.'],
            ['cinema', 'noun', '/ˈsɪnəmə/', 'rạp chiếu phim', '🎦', "Let's watch a film at the cinema.", 'Mình đi xem phim ở rạp nhé.', 'You watch films on a big screen here.'],
            ['pharmacy', 'noun', '/ˈfɑːməsi/', 'hiệu thuốc', '💊', 'You can buy medicine at the pharmacy.', 'Bạn có thể mua thuốc ở hiệu thuốc.', "You buy medicine here when you're ill."],
            ['planetarium', 'noun', '/ˌplænɪˈteəriəm/', 'cung thiên văn', '🪐', 'We saw the stars at the planetarium.', 'Chúng mình đã ngắm sao ở cung thiên văn.', 'You can learn about stars and planets here.']
          ],
          comic: {
            title: 'Space Town Tour', titleVi: 'Tham quan thị trấn vũ trụ',
            panels: [
              ['b', 'Welcome to Space Town! This is the planetarium.', 'Chào mừng đến Thị trấn Vũ trụ! Đây là cung thiên văn.', '🪐'],
              ['a', 'Cool! Where can I buy medicine for a headache?', 'Tuyệt! Mình mua thuốc đau đầu ở đâu nhỉ?', '🤕'],
              ['b', 'At the pharmacy, next to the cinema.', 'Ở hiệu thuốc, cạnh rạp chiếu phim.', '💊'],
              ['a', 'Space medicine... does it taste like moon cheese?', 'Thuốc vũ trụ... có vị như phô mai mặt trăng không nhỉ?', '🧀']
            ],
            blanks: [[0, 'planetarium', ['planetarium', 'raincoat', 'toothache']], [2, 'pharmacy', ['pharmacy', 'library', 'post office']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình mượn sách ở thư viện.', a: ['I', 'borrow', 'books', 'from the library.'], x: ['borrows', 'cinema'] },
            { vi: 'Em muốn hỏi: Bưu điện ở đâu?', a: ['Where', 'is', 'the post office?'], x: ['are', 'does'] }
          ],
          talk: [
            { q: 'Where can you watch a film?', vi: 'Bạn có thể xem phim ở đâu?', hint: 'At the cinema.', k: ['cinema|movie|movies|theater|theatre'], c: ['At the cinema.', 'At the pharmacy.', 'At the post office.'] },
            { q: 'Where can you buy medicine?', vi: 'Bạn có thể mua thuốc ở đâu?', hint: 'At the pharmacy.', k: ['pharmacy|drugstore|chemist|hospital'], c: ['At the pharmacy.', 'At the library.', 'At the planetarium.'] }
          ]
        },
        {
          title: 'Where Is It?', titleVi: 'Nó ở đâu?', icon: '🚦',
          words: [
            ['next to', 'prep', '/nekst tuː/', 'bên cạnh', '👫', 'The cinema is next to the library.', 'Rạp chiếu phim ở cạnh thư viện.', 'Very close, at the side of something.'],
            ['between', 'prep', '/bɪˈtwiːn/', 'ở giữa', '↔️', 'The bank is between the cinema and the pharmacy.', 'Ngân hàng ở giữa rạp phim và hiệu thuốc.', 'In the middle of two things.'],
            ['across from', 'prep', '/əˈkrɒs frɒm/', 'đối diện', '↕️', 'The post office is across from the park.', 'Bưu điện ở đối diện công viên.', 'On the other side of the street.'],
            ['on the corner of', 'prep', '/ɒn ðə ˈkɔːnə əv/', 'ở góc (đường)', '↪️', 'The pharmacy is on the corner of Moon Street.', 'Hiệu thuốc ở góc đường Mặt Trăng.', 'Where two streets meet.'],
            ['traffic lights', 'noun', '/ˈtræfɪk laɪts/', 'đèn giao thông', '🚦', 'Stop at the traffic lights.', 'Dừng lại ở chỗ đèn giao thông.', 'Red means stop, green means go.']
          ],
          comic: {
            title: 'Lost on the Moon', titleVi: 'Lạc trên Mặt Trăng',
            panels: [
              ['a', 'Excuse me, where is the library?', 'Xin lỗi, thư viện ở đâu ạ?', '📚'],
              ['b', "It's between the cinema and the post office.", 'Nó ở giữa rạp chiếu phim và bưu điện.', '🏤'],
              ['a', 'And the space ice-cream shop?', 'Còn tiệm kem vũ trụ ạ?', '🍦'],
              ['b', "It's across from the planetarium. Put on your moon boots and go!", 'Nó ở đối diện cung thiên văn. Mang giày mặt trăng vào rồi đi thôi!', '🥾']
            ],
            blanks: [[1, 'between', ['between', 'yesterday', 'delicious']], [3, 'across from', ['across from', 'faster than', 'half past']]]
          },
          build: [
            { vi: 'Em muốn nói: Rạp chiếu phim ở bên cạnh thư viện.', a: ['The cinema', 'is', 'next to', 'the library.'], x: ['are', 'between'] },
            { vi: 'Em muốn nói: Hiệu thuốc ở giữa bưu điện và công viên.', a: ['The pharmacy', 'is', 'between', 'the post office', 'and', 'the park.'], x: ['next', 'are'] }
          ],
          talk: [
            { q: 'Where is the library?', vi: 'Thư viện ở đâu?', hint: "It's next to the cinema.", k: ["it's|it|its|library|is", 'next|between|across|near|corner|behind|opposite|front'], c: ["It's next to the cinema.", "It's half past the cinema.", "It's a sore throat."] },
            { q: 'Where is your school?', vi: 'Trường của bạn ở đâu?', hint: "It's next to the park.", k: ["it's|it|its|school|is", 'next|between|across|near|corner|behind|opposite|front|on|in'], c: ["It's next to the park.", "It's a delicious school.", 'My school is a T-Rex.'] }
          ]
        },
        {
          title: 'Direction Mission', titleVi: 'Nhiệm vụ chỉ đường', icon: '🧭',
          words: [
            ['turn left', 'verb', '/tɜːn left/', 'rẽ trái', '⬅️', 'Turn left at the traffic lights.', 'Rẽ trái ở chỗ đèn giao thông.', 'Go to the side of your left hand.'],
            ['turn right', 'verb', '/tɜːn raɪt/', 'rẽ phải', '➡️', 'Turn right at the cinema.', 'Rẽ phải ở rạp chiếu phim.', 'Go to the side of your right hand.'],
            ['go straight ahead', 'verb', '/ɡəʊ streɪt əˈhed/', 'đi thẳng', '⬆️', 'Go straight ahead for two minutes.', 'Đi thẳng khoảng hai phút.', "Don't turn. Keep walking forward."],
            ['Excuse me', 'phrase', '/ɪkˈskjuːz miː/', 'Xin lỗi (cho tôi hỏi)', '🙏', 'Excuse me, where is the bus stop?', 'Xin lỗi, trạm xe buýt ở đâu ạ?', 'A polite way to start a question to a stranger.'],
            ['how to get to', 'phrase', '/haʊ tə ɡet tuː/', 'cách đi đến', '🧭', 'Could you tell me how to get to the zoo?', 'Bạn chỉ mình đường đến sở thú được không?', 'You ask this when you need directions.']
          ],
          comic: {
            title: 'Direction Mission', titleVi: 'Nhiệm vụ chỉ đường',
            panels: [
              ['a', 'Excuse me, could you tell me how to get to the Science Museum?', 'Xin lỗi, chị chỉ em đường đến Bảo tàng Khoa học được không ạ?', '🏛️'],
              ['b', 'Sure! Go straight ahead and turn left at the traffic lights.', 'Được chứ! Đi thẳng rồi rẽ trái ở chỗ đèn giao thông.', '🚦'],
              ['a', 'Turn left at the traffic lights... then?', 'Rẽ trái ở đèn giao thông... rồi sao nữa ạ?', '🤔'],
              ['b', "It's on your right, next to the rocket. You can't miss it!", 'Nó ở bên phải em, cạnh tên lửa. Không lạc được đâu!', '🚀']
            ],
            blanks: [[0, 'how to get to', ['how to get to', 'what time is', 'how much is']], [1, 'turn left', ['turn left', 'take a rest', 'took photos']]]
          },
          build: [
            { vi: 'Em muốn hỏi lịch sự: Xin lỗi, bạn chỉ mình đường đến thư viện được không?', a: ['Excuse me,', 'could you tell me', 'how to get to', 'the library?'], x: ['where', 'does'] },
            { vi: 'Em muốn chỉ đường: Đi thẳng rồi rẽ phải.', a: ['Go', 'straight ahead', 'and', 'turn right.'], x: ['Goes', 'turns'] }
          ],
          talk: [
            { q: 'Excuse me, how can I get to the post office?', vi: 'Xin lỗi, làm sao để đến bưu điện?', hint: 'Go straight ahead and turn left.', k: ['go|turn|walk', 'straight|left|right|ahead'], c: ['Go straight ahead and turn left.', 'Go to bed and have lunch.', "It's sunny and warm."] },
            { q: 'Excuse me, is the cinema near here?', vi: 'Xin lỗi, rạp chiếu phim có gần đây không?', hint: 'Yes. Turn right at the traffic lights.', k: ['yes|no|turn|go', 'right|left|straight|near|next|lights'], c: ['Yes. Turn right at the traffic lights.', 'Yes. I have a toothache.', 'No. I am a cinema.'] }
          ]
        }
      ]
    },

    /* ===================== ZONE 10 ===================== */
    {
      id: 'z10', name: 'LEGO Champions Stage', vi: 'Sân Khấu Nhà Vô Địch', short: 'Castle',
      topic: 'Social Expressions, Invitations & Opinions', topicVi: 'Mẫu câu giao tiếp, lời mời & ý kiến',
      color: '#FFB400', dark: '#B37E00', icon: '🏰',
      chars: { a: { name: 'Jack', fig: 'crown|grin|torso-blue|legs-red|guitar' }, b: { name: 'Knight Rosa', fig: 'helmet-knight|determined|torso-knight|legs-black|sword' } },
      chatter: [
        ['Would you like to visit my castle?', 'Bạn có muốn ghé thăm lâu đài của mình không?'],
        ['That sounds awesome!', 'Nghe tuyệt quá!'],
        ['In my opinion, LEGO is the best!', 'Theo mình, LEGO là tuyệt nhất!'],
        ['Thank you so much!', 'Cảm ơn bạn rất nhiều!'],
        ['Congratulations, Champion Builder!', 'Chúc mừng Nhà vô địch xây dựng!']
      ],
      lessons: [
        {
          title: 'Castle Party Invitations', titleVi: 'Lời mời dự tiệc', icon: '💌',
          words: [
            ['Would you like to...?', 'phrase', '/wʊd juː laɪk tuː/', 'Bạn có muốn... không?', '💌', 'Would you like to come to my party?', 'Bạn có muốn đến bữa tiệc của mình không?', 'A polite way to invite a friend.'],
            ['How about...?', 'phrase', '/haʊ əˈbaʊt/', '... thì sao? / Hay là...?', '🤔', 'How about playing LEGO together?', 'Hay là mình cùng chơi LEGO nhé?', 'You use this to give an idea.'],
            ["Let's...", 'phrase', '/lets/', 'Chúng mình hãy...', '🙌', "Let's build a castle!", 'Chúng mình cùng xây lâu đài nào!', 'You say this to do something together.'],
            ['That sounds awesome!', 'phrase', '/ðæt saʊndz ˈɔːsəm/', 'Nghe tuyệt quá!', '🎊', 'A LEGO party? That sounds awesome!', 'Tiệc LEGO á? Nghe tuyệt quá!', 'You say this when you love an idea.'],
            ["I'd love to, but I'm busy.", 'phrase', '/aɪd lʌv tuː bʌt aɪm ˈbɪzi/', 'Mình rất muốn, nhưng mình bận rồi.', '🙇', "I'd love to, but I'm busy on Sunday.", 'Mình rất muốn, nhưng Chủ nhật mình bận rồi.', 'A kind way to say no to an invitation.']
          ],
          comic: {
            title: 'Castle Party', titleVi: 'Tiệc ở lâu đài',
            panels: [
              ['b', 'Would you like to come to my castle party on Saturday?', 'Cậu có muốn đến bữa tiệc ở lâu đài của tớ vào thứ Bảy không?', '🏰'],
              ['a', 'That sounds awesome! What time?', 'Nghe tuyệt quá! Mấy giờ thế?', '🎊'],
              ['b', "At three o'clock. How about bringing your guitar?", 'Lúc ba giờ. Hay là cậu mang đàn guitar theo nhé?', '🎸'],
              ['a', "I'd love to! Let's rock the castle!", 'Tớ rất thích! Cùng quẩy tung lâu đài nào!', '🤘']
            ],
            blanks: [[1, 'That sounds awesome!', ['That sounds awesome!', 'I have a fever.', 'Turn left.']], [2, 'How about', ['How about', 'How much', 'How often']]]
          },
          build: [
            { vi: 'Em muốn mời bạn: Bạn có muốn đến bữa tiệc của mình không?', a: ['Would you like', 'to come', 'to my', 'party?'], x: ['Do', 'comes'] },
            { vi: 'Em muốn từ chối khéo: Mình rất muốn, nhưng mình bận rồi.', a: ["I'd love to,", 'but', "I'm", 'busy.'], x: ['and', 'because'] }
          ],
          talk: [
            { q: 'Would you like to play LEGO with me?', vi: 'Bạn có muốn chơi LEGO với mình không?', hint: "Yes, I'd love to!", k: ['love|sure|yes|okay|ok|great|awesome|busy|sorry|course'], c: ["Yes, I'd love to!", 'Yes, I have a stomachache bus.', 'LEGO is a pharmacy.'] },
            { q: "Let's go to the cinema on Sunday!", vi: 'Chủ nhật mình đi xem phim nhé!', hint: 'That sounds awesome!', k: ['sounds|great|awesome|good|sure|ok|okay|love|busy|sorry|yes|cool'], c: ['That sounds awesome!', 'That sounds like a toothache.', 'Turn right at the bill.'] }
          ]
        },
        {
          title: 'What Do You Think?', titleVi: 'Bạn nghĩ sao?', icon: '💭',
          words: [
            ['In my opinion', 'phrase', '/ɪn maɪ əˈpɪnjən/', 'Theo ý kiến của mình', '💭', 'In my opinion, cats are cuter than dogs.', 'Theo mình, mèo dễ thương hơn chó.', 'You say this before you give your idea.'],
            ['I agree with you', 'phrase', '/aɪ əˈɡriː wɪð juː/', 'Mình đồng ý với bạn', '🤝', 'I agree with you. Science is fun!', 'Mình đồng ý với bạn. Khoa học vui lắm!', 'You say this when you think the same.'],
            ["I don't think so", 'phrase', '/aɪ dəʊnt θɪŋk səʊ/', 'Mình không nghĩ vậy', '🙅', "Pizza for breakfast? I don't think so!", 'Pizza cho bữa sáng á? Mình không nghĩ vậy đâu!', "A polite way to say 'no' to an idea."],
            ['What do you think?', 'phrase', '/wɒt duː juː θɪŋk/', 'Bạn nghĩ sao?', '🗨️', 'This castle is great. What do you think?', 'Lâu đài này đẹp quá. Bạn nghĩ sao?', "You ask this to hear a friend's idea."],
            ["You're right", 'phrase', '/jɔː raɪt/', 'Bạn nói đúng', '✅', "You're right! The blue brick is better.", 'Bạn nói đúng! Viên gạch xanh đẹp hơn.', 'You say this when your friend is correct.']
          ],
          comic: {
            title: 'Best Castle Colour', titleVi: 'Màu lâu đài đẹp nhất',
            panels: [
              ['a', 'Our castle should be pink. What do you think?', 'Lâu đài của mình nên màu hồng. Cậu nghĩ sao?', '🩷'],
              ['b', "Pink? I don't think so. In my opinion, grey is better.", 'Hồng á? Tớ không nghĩ vậy. Theo tớ, màu xám đẹp hơn.', '🩶'],
              ['a', 'But grey is boring! How about a rainbow castle?', 'Nhưng màu xám chán lắm! Hay là lâu đài cầu vồng?', '🌈'],
              ['b', "A rainbow castle! You're right. I agree with you!", 'Lâu đài cầu vồng! Cậu nói đúng. Tớ đồng ý!', '🏰']
            ],
            blanks: [[0, 'What do you think?', ['What do you think?', "What's the matter?", 'What time is it?']], [3, 'I agree with you', ['I agree with you', 'I lost my backpack', 'I have a toothache']]]
          },
          build: [
            { vi: 'Em muốn nêu ý kiến: Theo mình, mèo dễ thương hơn chó.', a: ['In my opinion,', 'cats', 'are cuter', 'than dogs.'], x: ['is', 'more'] },
            { vi: 'Em muốn hỏi ý kiến bạn: Bạn nghĩ sao?', a: ['What', 'do you', 'think?'], x: ['does', 'agree'] }
          ],
          talk: [
            { q: 'In my opinion, LEGO is the best toy. What do you think?', vi: 'Theo mình, LEGO là đồ chơi tuyệt nhất. Bạn nghĩ sao?', hint: 'I agree with you!', k: ['agree|think|right|yes|no|opinion|true'], c: ['I agree with you!', 'I agree with a toothache.', 'I think it is half past.'] },
            { q: 'I think homework is fun. Do you agree?', vi: 'Mình nghĩ bài tập về nhà rất vui. Bạn đồng ý không?', hint: "Yes, I agree with you.", k: ['agree|think|yes|no|right|so'], c: ['Yes, I agree with you.', 'Yes, homework is a dinosaur.', 'I agree with the bus.'] }
          ]
        },
        {
          title: 'Champion Manners', titleVi: 'Ứng xử của nhà vô địch', icon: '🏆',
          words: [
            ['Could you help me with this?', 'phrase', '/kʊd juː help miː wɪð ðɪs/', 'Bạn giúp mình việc này được không?', '🆘', 'This box is heavy. Could you help me with this?', 'Cái hộp này nặng quá. Bạn giúp mình được không?', 'A polite way to ask for help.'],
            ['No problem at all!', 'phrase', '/nəʊ ˈprɒbləm ət ɔːl/', 'Không vấn đề gì đâu!', '👌', 'Help you? No problem at all!', 'Giúp bạn á? Không vấn đề gì đâu!', "You say this when you're happy to help."],
            ['Thank you so much!', 'phrase', '/θæŋk juː səʊ mʌtʃ/', 'Cảm ơn bạn rất nhiều!', '💖', 'Thank you so much for the gift!', 'Cảm ơn bạn rất nhiều vì món quà!', "A big, warm 'thanks'."],
            ["You're welcome.", 'phrase', '/jɔː ˈwelkəm/', 'Không có chi.', '😊', "Thank you! – You're welcome.", 'Cảm ơn bạn! – Không có chi.', "What you say after someone says 'thank you'."],
            ['Congratulations!', 'phrase', '/kənˌɡrætʃuˈleɪʃnz/', 'Chúc mừng!', '🏆', 'You won! Congratulations!', 'Bạn thắng rồi! Chúc mừng!', 'You say this when a friend wins or does something great.']
          ],
          comic: {
            title: 'The Champion Build', titleVi: 'Công trình vô địch',
            panels: [
              ['a', 'Rosa, this tower keeps falling. Could you help me with this?', 'Rosa ơi, cái tháp này cứ đổ mãi. Cậu giúp tớ được không?', '🧱'],
              ['b', 'No problem at all! Put the big bricks at the bottom.', 'Không vấn đề gì! Đặt gạch to ở dưới cùng nhé.', '👌'],
              ['a', 'It works! Thank you so much!', 'Được rồi! Cảm ơn cậu nhiều lắm!', '💖'],
              ['b', "You're welcome. Look, we won the LEGO Champions Cup! Congratulations!", 'Không có chi. Nhìn kìa, chúng mình thắng Cúp Vô địch LEGO! Chúc mừng!', '🏆']
            ],
            blanks: [[0, 'Could you help me with this?', ['Could you help me with this?', 'How much is that altogether?', 'Where were you yesterday?']], [2, 'Thank you so much!', ['Thank you so much!', "I don't think so!", 'Turn right!']]]
          },
          build: [
            { vi: 'Em muốn nhờ bạn: Bạn giúp mình việc này được không?', a: ['Could you', 'help me', 'with', 'this?'], x: ['Does', 'helps'] },
            { vi: 'Em muốn đáp lời bạn: Không vấn đề gì đâu!', a: ['No', 'problem', 'at all!'], x: ['Not', 'any'] }
          ],
          talk: [
            { q: 'Could you help me with my homework?', vi: 'Bạn giúp mình làm bài tập được không?', hint: 'No problem at all!', k: ['problem|sure|course|yes|ok|okay|sorry|busy|help'], c: ['No problem at all!', 'No, I am a T-Rex.', 'Yes, it is foggy.'] },
            { q: 'Thank you so much for your help!', vi: 'Cảm ơn bạn rất nhiều vì đã giúp mình!', hint: "You're welcome.", k: ['welcome|problem|pleasure|worries'], c: ["You're welcome.", "You're a lemonade.", 'Turn left at the castle.'] }
          ]
        }
      ]
    }
  ];

  /* ---------- Chuẩn hóa dữ liệu ---------- */
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const POS_LABEL = { verb: 'verb phrase', noun: 'noun', adj: 'adjective', adv: 'adverb', phrase: 'phrase', prep: 'preposition' };
  const POS_VI = { verb: 'động từ / cụm động từ', noun: 'danh từ', adj: 'tính từ', adv: 'trạng từ', phrase: 'mẫu câu / cụm từ', prep: 'giới từ' };

  const EXPERT = global.ExpertData || { LESSONS: {}, MYSTERY: {} };

  /** Chia 12 mảnh ghép cho n bài học (3 bài → 4 mảnh/bài). */
  function partsFor(li, n) {
    const out = [];
    for (let i = 0; i < 12; i++) if (Math.min(n - 1, Math.floor((i * n) / 12)) === li) out.push(i);
    return out;
  }

  /** Cắt một câu thành ~n viên gạch (dùng khi bài học tùy chỉnh thiếu dữ liệu Snowball). */
  function chunkSentence(sentence, n) {
    const words = String(sentence || '').split(/\s+/).filter(Boolean);
    if (words.length <= n) return words;
    const out = [];
    let start = 0;
    for (let k = 0; k < n; k++) {
      const end = Math.round(((k + 1) * words.length) / n);
      out.push(words.slice(start, end).join(' '));
      start = end;
    }
    return out.filter(Boolean);
  }

  /** Snowball tự sinh: Level 1 = từ khóa, Level 2 = câu ngắn, Level 3 = câu dài nhất (≥ 5 gạch). */
  function autoSnow(lesson) {
    const w0 = lesson.words[0];
    if (!w0) return null;
    const builds = lesson.build.slice().sort((a, b) => a.answer.length - b.answer.length);
    const short = builds.find((b) => b.answer.length >= 2 && b.answer.length <= 4);
    const long = builds.slice().reverse().find((b) => b.answer.length >= 5);
    const longEx = lesson.words.map((w) => w.ex).sort((a, b) => b.split(' ').length - a.split(' ').length)[0] || w0.ex;
    const l2 = short ? { bricks: short.answer, vi: short.vi } : { bricks: chunkSentence(w0.ex, 3), vi: w0.exVi };
    const l3 = long ? { bricks: long.answer, vi: long.vi } : { bricks: chunkSentence(longEx, 5), vi: (lesson.words.find((w) => w.ex === longEx) || w0).exVi };
    if (l3.bricks.length < 5 || l2.bricks.length < 2) return null;
    const extra = lesson.words.slice(1, 3).map((w) => w.en.split(' ')[0]).filter((x) => l3.bricks.indexOf(x) === -1);
    return {
      vi: 'Nâng cấp câu từ ngắn đến dài',
      levels: [
        { level: 1, bricks: [w0.en.replace(/\.\.\.|…/g, '').trim()], vi: w0.vi },
        { level: 2, bricks: l2.bricks, vi: l2.vi },
        { level: 3, bricks: l3.bricks, vi: l3.vi }
      ],
      extra
    };
  }

  function normSnow(sn) {
    if (!sn || !Array.isArray(sn.l) || sn.l.length !== 3) return null;
    return {
      vi: sn.vi || '',
      levels: sn.l.map((lv, i) => ({ level: i + 1, bricks: lv[0], vi: lv[1] || '', roles: lv[2] || null })),
      extra: sn.x || []
    };
  }

  function normBranch(br) {
    if (!br || !Array.isArray(br[3]) || br[3].length < 2) return null;
    return {
      who: br[0] === 'a' ? 'a' : 'b', q: br[1], vi: br[2] || '',
      options: br[3].map((o) => ({ tone: o[0] || 'calm', en: o[1], vi: o[2] || '', re: o[3] || 'Great!', reVi: o[4] || '', emoji: o[5] || '🙂' }))
    };
  }

  function normMystery(m) {
    if (!m || !Array.isArray(m.clues) || !Array.isArray(m.o)) return null;
    return {
      title: m.t, titleVi: m.tv || '',
      intro: { en: (m.intro || [])[0] || '', vi: (m.intro || [])[1] || '' },
      clues: m.clues.map((c) => ({ en: c[0], vi: c[1] || '' })),
      q: { en: m.q[0], vi: m.q[1] || '' },
      options: m.o.map((o) => ({ en: o[0], emoji: o[1] || '❓', vi: o[2] || '' })),
      answer: m.a,
      win: { en: (m.win || [])[0] || 'Mystery solved!', vi: (m.win || [])[1] || 'Phá án thành công!' }
    };
  }

  /** Mystery tự sinh từ từ vựng (cho Vùng đất tùy chỉnh không có sẵn câu đố). */
  function autoMystery(zone) {
    const all = [];
    zone.lessons.forEach((l) => l.words.forEach((w) => all.push(w)));
    if (all.length < 4) return null;
    const target = all[Math.floor(all.length / 2)];
    const others = all.filter((w) => w !== target);
    const opts = [target].concat([others[0], others[Math.floor(others.length / 2)], others[others.length - 1]]);
    const blanked = target.ex.replace(new RegExp(target.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), '_____');
    return normMystery({
      t: 'The Secret Word', tv: 'Từ khóa bí mật',
      intro: ['A secret word is hiding in this zone. Listen to the clues and find it!', 'Một từ khóa bí mật đang trốn trong vùng đất này. Nghe manh mối và tìm ra nó nhé!'],
      clues: [
        ['Clue one: ' + target.clue, 'Manh mối 1 (gợi ý bằng tiếng Anh)'],
        [`Clue two: It starts with the letter "${target.en.trim()[0].toUpperCase()}".`, `Manh mối 2: Nó bắt đầu bằng chữ cái "${target.en.trim()[0].toUpperCase()}".`],
        ['Clue three: ' + (blanked !== target.ex ? blanked : target.ex), 'Manh mối 3: điền từ còn thiếu vào câu']
      ],
      q: ['What is the secret word?', 'Từ khóa bí mật là gì?'],
      o: opts.map((w) => [w.en, w.emoji, w.vi]), a: 0,
      win: [`Yes! The secret word is "${target.en}".`, `Đúng rồi! Từ khóa bí mật là "${target.en}" – ${target.vi}.`]
    });
  }

  /** Chuẩn hóa 1 Vùng đất từ định dạng gọn (RAW) → đối tượng dùng trong app. */
  function buildZone(z, extras) {
    const ex = extras || {};
    const zone = Object.assign({}, z);
    const n = z.lessons.length;
    zone.custom = !!z.custom;
    zone.lessons = z.lessons.map((l, li) => {
      const id = `${z.id}l${li + 1}`;
      const xl = (ex.lessons && ex.lessons[id]) || l.expert || {};
      const words = l.words.map((w) => ({
        id: `${z.id}-${slug(w[0])}`,
        en: w[0], pos: w[1], posLabel: POS_LABEL[w[1]] || w[1], posVi: POS_VI[w[1]] || '',
        ipa: w[2], vi: w[3], emoji: w[4], ex: w[5], exVi: w[6], clue: w[7], role: w[8] || null,
        zoneId: z.id, lessonId: id
      }));
      const lesson = {
        id, index: li, zoneId: z.id, title: l.title, titleVi: l.titleVi, icon: l.icon, words,
        comic: {
          title: l.comic.title, titleVi: l.comic.titleVi,
          panels: l.comic.panels.map((p) => ({ who: p[0], text: p[1], vi: p[2], prop: p[3] })),
          blanks: l.comic.blanks.map((b) => ({ panel: b[0], answer: b[1], options: b[2] }))
        },
        build: l.build.map((b) => ({ vi: b.vi, answer: b.a, extra: b.x, roles: b.r || null })),
        talk: l.talk.map((t) => ({ q: t.q, vi: t.vi, hint: t.hint, keywords: t.k, choices: t.c })),
        parts: partsFor(li, n)
      };
      lesson.snowball = normSnow(xl.snow) || autoSnow(lesson);
      lesson.branchComic = normBranch(xl.cb);
      lesson.branchTalk = normBranch(xl.tb);
      return lesson;
    });
    zone.mystery = normMystery((ex.mystery) || z.mystery) || autoMystery(zone);
    return zone;
  }

  const ZONES = RAW.map((z) => buildZone(z, {
    lessons: EXPERT.LESSONS,
    mystery: EXPERT.MYSTERY[z.id]
  }));
  const BUILTIN_COUNT = ZONES.length;

  const WORDS = {};
  function indexWords(z) { z.lessons.forEach((l) => l.words.forEach((w) => { WORDS[w.id] = w; })); }
  ZONES.forEach(indexWords);

  /** Thêm Vùng đất tùy chỉnh (từ Custom Unit Importer). Trả về zone đã chuẩn hóa. */
  function addZone(raw) {
    removeZone(raw.id);
    const zone = buildZone(raw, {});
    ZONES.push(zone);
    indexWords(zone);
    return zone;
  }

  function removeZone(id) {
    const i = ZONES.findIndex((z) => z.id === id);
    if (i < BUILTIN_COUNT || i === -1) return false;
    ZONES[i].lessons.forEach((l) => l.words.forEach((w) => { delete WORDS[w.id]; }));
    ZONES.splice(i, 1);
    return true;
  }

  /* ---------- Học Cùng Lớp 4: Tiếng Anh 4 Global Success (Bộ GD&ĐT) ----------
     Mỗi Unit được nối với bài học LEGO có từ vựng/mẫu câu gần nhất để bé ôn đúng tuần học trên lớp. */
  const SCHOOL_BOOKS = {
    gs4: {
      name: 'Tiếng Anh 4 – Global Success',
      units: [
        { unit: 1, title: 'My friends', lesson: 'z10l1' },
        { unit: 2, title: 'Time and daily routines', lesson: 'z1l2' },
        { unit: 3, title: 'My week', lesson: 'z1l3' },
        { unit: 4, title: 'My birthday party', lesson: 'z3l1' },
        { unit: 5, title: 'Things we can do', lesson: 'z4l1' },
        { unit: 6, title: 'Our school facilities', lesson: 'z9l1' },
        { unit: 7, title: 'Our timetables', lesson: 'z2l1' },
        { unit: 8, title: 'My favourite subjects', lesson: 'z2l2' },
        { unit: 9, title: 'Our sports day', lesson: 'z4l1' },
        { unit: 10, title: 'Our summer holidays', lesson: 'z8l2' },
        { unit: 11, title: 'My home', lesson: 'z9l2' },
        { unit: 12, title: 'Jobs', lesson: 'z5l1' },
        { unit: 13, title: 'Appearance', lesson: 'z6l2' },
        { unit: 14, title: 'Daily activities', lesson: 'z1l1' },
        { unit: 15, title: "My family's weekends", lesson: 'z8l1' },
        { unit: 16, title: 'Weather', lesson: 'z7l1' },
        { unit: 17, title: 'In the city', lesson: 'z9l3' },
        { unit: 18, title: 'At the shopping centre', lesson: 'z3l3' },
        { unit: 19, title: 'The animal world', lesson: 'z6l1' },
        { unit: 20, title: 'At the summer camp', lesson: 'z7l3' }
      ]
    }
  };

  /* ---------- Lời khen & khích lệ song ngữ ---------- */
  const PRAISE = [
    { en: 'Awesome!', vi: 'Tuyệt vời!' },
    { en: 'Brilliant Builder!', vi: 'Thợ xây xuất sắc!' },
    { en: 'Spot on!', vi: 'Chuẩn không cần chỉnh!' },
    { en: 'Super job!', vi: 'Giỏi quá đi!' },
    { en: 'You nailed it!', vi: 'Con làm đúng rồi!' },
    { en: 'Brick-tastic!', vi: 'Đỉnh như gạch LEGO!' },
    { en: 'Fantastic!', vi: 'Tuyệt cú mèo!' },
    { en: 'Well done, Champ!', vi: 'Làm tốt lắm, nhà vô địch!' }
  ];
  const ENCOURAGE = [
    { en: 'Almost! Try again.', vi: 'Gần đúng rồi! Thử lại nhé.' },
    { en: 'Nice try! You can do it!', vi: 'Cố lên, con làm được mà!' },
    { en: "Oops! Let's try another brick.", vi: 'Ối! Mình thử viên gạch khác nhé.' },
    { en: 'Good thinking! One more try.', vi: 'Suy nghĩ hay đó! Thử thêm lần nữa.' }
  ];

  const STEPS = [
    { key: 'discover', en: 'Brick Discovery', vi: 'Khám phá từ vựng', color: '#E3000B' },
    { key: 'reflex', en: 'Sound-to-Brick', vi: 'Nghe nhanh chọn đúng', color: '#FF7E14' },
    { key: 'comic', en: 'Comic Dialogue', vi: 'Truyện tranh giao tiếp', color: '#FFD500' },
    { key: 'build', en: 'Sentence Builder', vi: 'Lắp ráp câu', color: '#00A850' },
    { key: 'talk', en: 'Role-Play Talk', vi: 'Luyện nói', color: '#006CB7' },
    { key: 'unbox', en: 'Unbox & Build!', vi: 'Mở túi & lắp ráp', color: '#8E44AD' }
  ];

  global.Curriculum = {
    ZONES,
    WORDS,
    SCHOOL_BOOKS,
    PRAISE,
    ENCOURAGE,
    STEPS,
    BUILTIN_COUNT,
    buildZone,
    addZone,
    removeZone,
    chunkSentence,
    totalLessons: () => ZONES.reduce((s, z) => s + z.lessons.length, 0),
    totalWords: () => Object.keys(WORDS).length,
    zone: (id) => ZONES.find((z) => z.id === id),
    lesson: (id) => {
      for (const z of ZONES) { const l = z.lessons.find((x) => x.id === id); if (l) return l; }
      return null;
    }
  };
})(window);
