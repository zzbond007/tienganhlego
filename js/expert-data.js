/* =========================================================
   expert-data.js – Nội dung sư phạm chuyên sâu (Expert ESL Add-on)
   - snow : Snowball Sentence Upgrade – 3 tầng câu (1 gạch → 3 gạch → 5+ gạch lịch sự)
            { vi: tình huống, l: [[gạch Level 1], [gạch L2], [gạch L3]] kèm nghĩa, x: gạch nhiễu }
   - cb   : Branching Dialogue ở Bước 3 (Comic) – [người hỏi, câu hỏi, nghĩa, [lựa chọn...]]
   - tb   : Branching Dialogue ở Bước 5 (Role-Play) – cùng định dạng
            lựa chọn = [sắc thái, câu trả lời, nghĩa, phản ứng của nhân vật, nghĩa phản ứng, emoji]
            sắc thái: yes (hào hứng) | no (từ chối lịch sự) | idea (đề xuất khác) | ask (hỏi thêm) | calm (trả lời bình tĩnh)
   - MYSTERY: "LEGO Mystery Mission" cuối mỗi Vùng đất – 3 manh mối tiếng Anh → giải câu đố logic
   ========================================================= */
(function (global) {
  'use strict';

  const LESSONS = {
    /* ---------- ZONE 1: City Center (Mia & Leo) ---------- */
    z1l1: {
      snow: { vi: 'Kể về bữa sáng của em', l: [[['breakfast'], 'bữa sáng'], [['I', 'have', 'breakfast.'], 'Mình ăn sáng.'], [['Every morning,', 'I', 'have', 'breakfast', 'with my family.'], 'Mỗi sáng, mình ăn sáng cùng gia đình.']], x: ['brush', 'bed'] },
      cb: ['b', "Mia, let's run to the bus together!", 'Mia ơi, mình cùng chạy ra xe buýt nhé!', [
        ['yes', "Okay! Let's go!", 'Được! Đi thôi!', "Hooray! We won't be late!", 'Hoan hô! Mình sẽ không bị muộn!', '🏃'],
        ['no', 'Wait a minute, please. I need my shoes!', 'Chờ chút nhé. Tớ cần đôi giày!', "No problem. I'll wait for you!", 'Không sao. Tớ sẽ đợi cậu!', '👟'],
        ['ask', 'Can I eat my breakfast on the bus?', 'Tớ ăn sáng trên xe buýt được không?', 'Hmm... just a banana, okay?', 'Ừm... chỉ một quả chuối thôi nhé?', '🍌']]],
      tb: ['b', 'Do you want to have breakfast with me tomorrow?', 'Mai bạn có muốn ăn sáng cùng mình không?', [
        ['yes', "Yes, I'd love to! What time?", 'Có, mình rất thích! Mấy giờ vậy?', 'At half past six. See you!', 'Sáu giờ rưỡi nhé. Hẹn gặp bạn!', '🥞'],
        ['no', "Sorry, I can't. How about Sunday?", 'Xin lỗi, mình không được. Chủ nhật thì sao?', 'Sunday is perfect! See you then!', 'Chủ nhật thì tuyệt! Hẹn gặp nhé!', '📅']]]
    },
    z1l2: {
      snow: { vi: 'Nói về giờ đi ngủ', l: [[["nine o'clock"], 'chín giờ'], [['I', 'go to bed', 'at nine.'], 'Mình đi ngủ lúc chín giờ.'], [['On school days,', 'I', 'usually', 'go to bed', "at nine o'clock."], 'Vào ngày đi học, mình thường đi ngủ lúc chín giờ.']], x: ['lunch', 'half'] },
      cb: ['b', "It's eleven o'clock! Lunch time! Do you want my sandwich?", 'Mười một giờ rồi! Giờ ăn trưa! Cậu muốn ăn bánh mì của tớ không?', [
        ['yes', "Yes, please! I'm so hungry!", 'Có, cảm ơn cậu! Tớ đói quá!', 'Here you are! Yum yum!', 'Của cậu đây! Ngon ngon!', '🥪'],
        ['no', 'No, thanks. I have an apple. Do you want half?', 'Không, cảm ơn. Tớ có quả táo. Cậu muốn một nửa không?', 'Sharing is great! Thanks, Mia!', 'Chia sẻ thật tuyệt! Cảm ơn Mia!', '🍎']]],
      tb: ['b', "Let's play LEGO at half past four!", 'Bốn giờ rưỡi mình chơi LEGO nhé!', [
        ['yes', 'Great idea! See you at half past four!', 'Ý hay đó! Hẹn bạn lúc bốn giờ rưỡi!', "Don't be late! Bring your bricks!", 'Đừng muộn nhé! Mang gạch theo nha!', '🧱'],
        ['idea', "Sorry, I have a lesson then. How about five o'clock?", 'Xin lỗi, lúc đó mình có tiết học. Năm giờ thì sao?', "Five o'clock is fine. See you!", 'Năm giờ cũng được. Hẹn gặp nhé!', '🕔']]]
    },
    z1l3: {
      snow: { vi: 'Kể về việc làm bài tập', l: [[['homework'], 'bài tập về nhà'], [['I', 'do', 'my homework.'], 'Mình làm bài tập.'], [['I', 'always', 'do', 'my homework', 'after school.'], 'Mình luôn làm bài tập sau giờ học.']], x: ['never', 'does'] },
      cb: ['b', 'Mia, can you help me fix my homework robot?', 'Mia ơi, cậu giúp tớ sửa con robot làm bài tập được không?', [
        ['yes', 'Sure! I love fixing robots!', 'Được chứ! Tớ thích sửa robot lắm!', "Yay! Let's take out the pencils first!", 'Yeah! Lấy hết bút chì ra trước đã!', '🤖'],
        ['no', "Sorry, I'm doing my homework now. How about after dinner?", 'Xin lỗi, tớ đang làm bài tập. Sau bữa tối nhé?', 'Okay! After dinner is perfect.', 'Được! Sau bữa tối là tuyệt nhất.', '🍽️']]],
      tb: ['b', 'How often do you play outside?', 'Bạn có thường chơi ngoài trời không?', [
        ['yes', "I play outside every day! It's fun!", 'Ngày nào mình cũng chơi ngoài trời! Vui lắm!', "Wow, you're so active!", 'Oa, bạn năng động thật!', '⚽'],
        ['calm', 'I sometimes play outside. I usually read books.', 'Thỉnh thoảng mình chơi ngoài trời. Mình thường đọc sách.', "Books are great too! What's your favourite?", 'Sách cũng tuyệt! Bạn thích cuốn nào nhất?', '📚']]]
    },

    /* ---------- ZONE 2: Creator Academy (Ada & Max) ---------- */
    z2l1: {
      snow: { vi: 'Kể về môn học hôm nay', l: [[['Science'], 'môn Khoa học'], [['I', 'have', 'Science.'], 'Mình có môn Khoa học.'], [['On Monday,', 'I', 'have', 'Science and Art', 'at school.'], 'Thứ Hai, mình có Khoa học và Mỹ thuật ở trường.']], x: ['has', 'PE'] },
      cb: ['b', 'Ada, we have PE now! Do you want to play football with me?', 'Ada ơi, giờ thể dục rồi! Cậu muốn đá bóng với tớ không?', [
        ['yes', 'Yes! I love football!', 'Có! Tớ thích bóng đá lắm!', 'Great! You can be the goalkeeper!', 'Tuyệt! Cậu làm thủ môn nhé!', '⚽'],
        ['no', 'Sorry, my leg hurts. Can I keep the score?', 'Xin lỗi, chân tớ đau. Tớ ghi điểm được không?', "Of course! You're our score captain!", 'Tất nhiên! Cậu là đội trưởng ghi điểm!', '📋']]],
      tb: ['b', 'Do you want to join the Music club with me?', 'Bạn có muốn vào câu lạc bộ Âm nhạc với mình không?', [
        ['yes', "Yes, I'd love to! I can play the guitar.", 'Có, mình rất thích! Mình chơi được đàn ghi-ta.', "Awesome! Let's make a band!", 'Tuyệt vời! Mình lập ban nhạc nhé!', '🎸'],
        ['idea', 'Hmm, I prefer Art. How about the Art club?', 'Ừm, mình thích Mỹ thuật hơn. Câu lạc bộ Mỹ thuật thì sao?', "Good idea! Let's paint together!", 'Ý hay! Mình cùng vẽ nhé!', '🎨']]]
    },
    z2l2: {
      snow: { vi: 'Nói lý do em thích một môn học', l: [[['experiments'], 'thí nghiệm'], [['I', 'like', 'Science.'], 'Mình thích môn Khoa học.'], [['I', 'like', 'Science', 'because', 'I love doing experiments.'], 'Mình thích Khoa học vì mình mê làm thí nghiệm.']], x: ['Why', 'likes'] },
      cb: ['b', "Ada, let's do an experiment with a volcano!", 'Ada ơi, mình làm thí nghiệm núi lửa đi!', [
        ['yes', "Wow! Let's do it!", 'Oa! Làm thôi!', 'Three, two, one... BOOM! Ha ha!', 'Ba, hai, một... BÙM! Ha ha!', '🌋'],
        ['idea', "Hmm, it's messy. How about a robot experiment?", 'Ừm, bừa bộn lắm. Hay mình thí nghiệm robot?', 'Good idea! Robots are cleaner!', 'Ý hay! Robot sạch sẽ hơn!', '🤖']]],
      tb: ['b', 'Would you like to join the robotics club?', 'Bạn có muốn vào câu lạc bộ robot không?', [
        ['yes', 'Yes! I want to build robots!', 'Có! Mình muốn lắp robot!', 'Cool! The club meets on Friday.', 'Hay quá! Câu lạc bộ họp vào thứ Sáu.', '🤖'],
        ['no', "No, thanks. I'd like to join the Art club because I love drawing.", 'Không, cảm ơn. Mình muốn vào CLB Mỹ thuật vì mình thích vẽ.', "That's a great reason! Have fun!", 'Lý do hay đó! Chơi vui nhé!', '🖍️']]]
    },
    z2l3: {
      snow: { vi: 'Nói về cảm xúc của em', l: [[['excited'], 'hào hứng'], [['I', 'feel', 'excited.'], 'Mình thấy hào hứng.'], [['Today,', 'I', 'feel', 'really excited', 'about the robot show.'], 'Hôm nay, mình thấy rất hào hứng về buổi trình diễn robot.']], x: ['bored', 'feels'] },
      cb: ['b', "I'm so nervous about the robot show. Can you help me?", 'Tớ hồi hộp quá vì buổi trình diễn robot. Cậu giúp tớ nhé?', [
        ['yes', "Of course! Don't worry. You can do it!", 'Tất nhiên! Đừng lo. Cậu làm được mà!', 'Thanks, Ada! I feel more confident now!', 'Cảm ơn Ada! Giờ tớ tự tin hơn rồi!', '💪'],
        ['ask', 'Why are you nervous? Your robot is great!', 'Sao cậu hồi hộp? Robot của cậu tuyệt lắm mà!', 'Really? Thank you! Now I feel proud!', 'Thật à? Cảm ơn cậu! Giờ tớ thấy tự hào rồi!', '🥰']]],
      tb: ['b', 'How do you feel today?', 'Hôm nay bạn cảm thấy thế nào?', [
        ['yes', "I feel great! I'm excited about the weekend!", 'Mình thấy tuyệt lắm! Mình háo hức chờ cuối tuần!', 'Me too! Weekends are the best!', 'Mình cũng vậy! Cuối tuần là nhất!', '🎉'],
        ['calm', "I feel a bit tired, but I'm okay.", 'Mình hơi mệt, nhưng không sao.', "Have some water and take a rest. You'll feel better!", 'Uống chút nước và nghỉ ngơi nhé. Bạn sẽ thấy khỏe hơn!', '💧']]]
    },

    /* ---------- ZONE 3: Downtown Bistro (Lily & Chef Tony) ---------- */
    z3l1: {
      snow: { vi: 'Gọi món mì ở nhà hàng', l: [[['noodles'], 'mì'], [['I', 'want', 'noodles.'], 'Mình muốn ăn mì.'], [['Could I', 'have', 'a bowl of', 'chicken noodles,', 'please?'], 'Cho cháu một bát mì gà được không ạ?']], x: ['pizza', 'eats'] },
      cb: ['b', 'Would you like to try my new chocolate pizza?', 'Cháu có muốn thử món pizza sô-cô-la mới của chú không?', [
        ['yes', 'Yes, please! It sounds delicious!', 'Có ạ! Nghe ngon quá!', 'Here you are! Enjoy!', 'Của cháu đây! Ăn ngon nhé!', '🍕'],
        ['no', 'No, thank you. Could I have a slice of cake instead?', 'Dạ không, cảm ơn chú. Cho cháu một miếng bánh ngọt được không ạ?', 'Of course! One slice of cake coming up!', 'Tất nhiên! Một miếng bánh tới ngay!', '🍰']]],
      tb: ['b', 'Would you like some spaghetti?', 'Cháu có muốn ăn mì Ý không?', [
        ['yes', 'Yes, please! I love spaghetti!', 'Có ạ! Cháu thích mì Ý lắm!', 'Here you are. Enjoy your meal!', 'Của cháu đây. Chúc ngon miệng!', '🍝'],
        ['no', "No, thanks. I'd like a bowl of noodles, please.", 'Dạ không, cảm ơn. Cho cháu một bát mì ạ.', 'Sure! Noodles are coming!', 'Được thôi! Mì tới ngay!', '🍜']]]
    },
    z3l2: {
      snow: { vi: 'Gọi đồ uống lịch sự', l: [[['a smoothie'], 'một ly sinh tố'], [['I', 'want', 'a strawberry smoothie.'], 'Mình muốn một ly sinh tố dâu.'], [['Could I', 'have', 'a cold', 'strawberry smoothie,', 'please?'], 'Cho cháu một ly sinh tố dâu mát lạnh được không ạ?']], x: ['lemonade', 'wants'] },
      cb: ['b', "Today's special is a broccoli smoothie! Do you want one?", 'Món đặc biệt hôm nay là sinh tố bông cải xanh! Cháu muốn thử không?', [
        ['yes', "Sure! I'd love to try it!", 'Dạ có! Cháu rất muốn thử!', "Brave builder! It's super healthy!", 'Thợ xây dũng cảm! Món này rất bổ đó!', '🥦'],
        ['no', 'Hmm, no, thank you. Can I have lemonade, please?', 'Ừm, cháu cảm ơn, không ạ. Cho cháu nước chanh được không ạ?', 'No problem! One cold lemonade!', 'Không vấn đề! Một ly nước chanh mát lạnh!', '🍋']]],
      tb: ['b', 'Would you like a glass of lemonade?', 'Cháu có muốn một ly nước chanh không?', [
        ['yes', "Yes, please! I'm very thirsty.", 'Có ạ! Cháu khát nước lắm.', 'Here you are. Nice and cold!', 'Của cháu đây. Mát lạnh luôn!', '🍋'],
        ['no', 'No, thank you. A bottle of water, please.', 'Dạ không, cảm ơn. Cho cháu một chai nước ạ.', 'Sure! Water is good for you!', 'Được! Nước rất tốt cho cháu!', '💧']]]
    },
    z3l3: {
      snow: { vi: 'Xin hóa đơn ở nhà hàng', l: [[['the bill'], 'hóa đơn'], [['I', 'want', 'the bill.'], 'Mình muốn hóa đơn.'], [['Excuse me,', 'could I', 'have', 'the bill,', 'please?'], 'Xin lỗi, cho cháu xin hóa đơn được không ạ?']], x: ['menu', 'has'] },
      cb: ['b', "That's fifty thousand dong altogether. Would you like dessert?", 'Tất cả là năm mươi nghìn đồng. Cháu có muốn ăn tráng miệng không?', [
        ['yes', 'Yes, please! Ice cream, please!', 'Có ạ! Cho cháu kem ạ!', 'Great choice! Strawberry or chocolate?', 'Chọn hay lắm! Vị dâu hay sô-cô-la?', '🍨'],
        ['no', "No, thank you. I'm full. Here you are!", 'Dạ không, cảm ơn. Cháu no rồi. Tiền đây ạ!', 'Thank you! Come back soon!', 'Cảm ơn cháu! Lần sau lại đến nhé!', '👋']]],
      tb: ['b', 'Are you ready to order?', 'Cháu sẵn sàng gọi món chưa?', [
        ['yes', "Yes! I'd like a pizza and a lemonade, please.", 'Rồi ạ! Cho cháu một pizza và một nước chanh ạ.', "Good choice! It's coming soon.", 'Chọn hay lắm! Món sẽ có ngay.', '🍕'],
        ['ask', 'Not yet. Can I see the menu, please?', 'Chưa ạ. Cho cháu xem thực đơn được không ạ?', 'Of course! Here is the menu.', 'Tất nhiên! Thực đơn đây.', '📜']]]
    },

    /* ---------- ZONE 4: Ninja Dojo (Nina & Sensei Ken) ---------- */
    z4l1: {
      snow: { vi: 'Khoe khả năng bơi của em', l: [[['swim'], 'bơi'], [['I', 'can', 'swim.'], 'Mình biết bơi.'], [['I', 'can', 'swim', 'very well', 'in the sea.'], 'Mình bơi rất giỏi ở biển.']], x: ['ride', 'cans'] },
      cb: ['b', "Nina, let's do martial arts on the beach!", 'Nina ơi, mình tập võ trên bãi biển nhé!', [
        ['yes', "Yes! Let's go! Hi-yah!", 'Vâng! Đi thôi! Hây-da!', 'Great kick, Nina!', 'Cú đá tuyệt lắm, Nina!', '🥋'],
        ['idea', "Sorry, Sensei. I'm tired. Can we swim instead?", 'Xin lỗi thầy. Con mệt rồi. Mình đi bơi được không ạ?', 'Good idea! Swimming is fun too!', 'Ý hay! Bơi cũng vui lắm!', '🏊']]],
      tb: ['b', 'Can you ride a bike?', 'Bạn có biết đi xe đạp không?', [
        ['yes', 'Yes, I can! I ride my bike every day.', 'Có! Ngày nào mình cũng đạp xe.', "Awesome! Let's ride to the park!", 'Tuyệt! Mình đạp xe ra công viên nhé!', '🚲'],
        ['calm', "No, I can't. But I can roller skate!", 'Mình không biết. Nhưng mình biết trượt patin!', 'Cool! Roller skating is fun too!', 'Hay quá! Trượt patin cũng vui lắm!', '🛼']]]
    },
    z4l2: {
      snow: { vi: 'Kể với thầy cô khi em bị đau đầu', l: [[['a headache'], 'đau đầu'], [['I', 'have', 'a headache.'], 'Con bị đau đầu.'], [['Excuse me,', 'I', 'have', 'a bad headache', 'today.'], 'Thưa thầy/cô, hôm nay con bị đau đầu nhiều ạ.']], x: ['fever', 'has'] },
      cb: ['b', "Nina, you look sick. What's the matter?", 'Nina, trông con có vẻ ốm. Con bị sao vậy?', [
        ['calm', 'I have a sore throat.', 'Con bị đau họng ạ.', 'Oh dear! Drink some warm water.', 'Ôi trời! Uống chút nước ấm đi con.', '🍵'],
        ['ask', 'I have a stomachache. Can I take a rest?', 'Con bị đau bụng. Con nghỉ một chút được không ạ?', 'Of course. No training today!', 'Tất nhiên rồi. Hôm nay nghỉ tập nhé!', '🛌']]],
      tb: ['b', 'Are you okay? You look tired.', 'Bạn ổn không? Trông bạn mệt quá.', [
        ['calm', 'I have a fever. I feel hot.', 'Mình bị sốt. Mình thấy nóng người.', 'Oh no! You should see a doctor.', 'Ôi không! Bạn nên đi khám bác sĩ.', '🤒'],
        ['yes', "I'm fine, thanks! Just a little tired.", 'Mình ổn, cảm ơn bạn! Chỉ hơi mệt thôi.', 'Good! Go to bed early tonight!', 'Tốt rồi! Tối nay đi ngủ sớm nhé!', '😴']]]
    },
    z4l3: {
      snow: { vi: 'Khuyên bạn khi bạn bị đau răng', l: [[['a dentist'], 'nha sĩ'], [['You', 'should', 'see a dentist.'], 'Bạn nên đi khám nha sĩ.'], [['You', 'should', 'see a dentist', 'because', 'you have a toothache.'], 'Bạn nên đi nha sĩ vì bạn bị đau răng.']], x: ["shouldn't", 'sees'] },
      cb: ['b', 'I want to eat ten candies! Is that okay?', 'Thầy muốn ăn mười cái kẹo! Được không con?', [
        ['no', "I don't think so. You shouldn't eat too many sweets.", 'Con không nghĩ vậy đâu. Thầy không nên ăn quá nhiều đồ ngọt.', "You're right. Just one candy, then!", 'Con nói đúng. Vậy chỉ một cái thôi!', '🍬'],
        ['idea', "How about an apple instead? It's healthy!", 'Thầy ăn táo thay thế nhé? Tốt cho sức khỏe!', 'Great advice! Crunch, crunch!', 'Lời khuyên hay! Rộp rộp!', '🍎']]],
      tb: ['b', 'I have a toothache. What should I do?', 'Mình bị đau răng. Mình nên làm gì?', [
        ['calm', 'You should see a dentist.', 'Bạn nên đi khám nha sĩ.', "Thank you! I'll go today.", 'Cảm ơn bạn! Hôm nay mình sẽ đi.', '🦷'],
        ['idea', "You shouldn't eat sweets. Brush your teeth, please!", 'Bạn không nên ăn đồ ngọt. Đánh răng đi nhé!', "Good advice! I'll brush my teeth now.", 'Lời khuyên hay! Mình đi đánh răng ngay.', '🪥']]]
    },

    /* ---------- ZONE 5: Rescue Heroes (Zoe & Captain Sam) ---------- */
    z5l1: {
      snow: { vi: 'Giới thiệu nghề của mẹ', l: [[['a vet'], 'bác sĩ thú y'], [['She', 'is', 'a vet.'], 'Mẹ là bác sĩ thú y.'], [['My mother', 'is', 'a kind vet', 'at', 'the animal hospital.'], 'Mẹ mình là bác sĩ thú y tốt bụng ở bệnh viện thú y.']], x: ['does', 'pilot'] },
      cb: ['b', 'Zoe, do you want to visit the fire station with me?', 'Zoe, cháu có muốn tham quan trạm cứu hỏa với chú không?', [
        ['yes', "Yes, I'd love to! I want to see the fire engine!", 'Có ạ! Cháu muốn xem xe cứu hỏa!', 'Let\'s go! Put on your helmet!', 'Đi thôi! Đội mũ bảo hiểm vào nào!', '🚒'],
        ['no', "Sorry, I'm busy today. How about tomorrow?", 'Xin lỗi, hôm nay cháu bận. Ngày mai được không ạ?', 'Sure! See you tomorrow morning!', 'Được chứ! Hẹn cháu sáng mai!', '📅']]],
      tb: ['b', 'What does your father do?', 'Bố bạn làm nghề gì?', [
        ['calm', 'He is a programmer. He writes code.', 'Bố mình là lập trình viên. Bố viết mã máy tính.', 'Cool! Maybe he can build a robot!', 'Hay quá! Có khi bố bạn làm được robot!', '💻'],
        ['yes', 'He is an architect! He designs buildings.', 'Bố mình là kiến trúc sư! Bố thiết kế các tòa nhà.', 'Wow! Can he design a LEGO castle?', 'Oa! Bố bạn thiết kế lâu đài LEGO được không?', '🏰']]]
    },
    z5l2: {
      snow: { vi: 'Kể về nơi làm việc của cô y tá', l: [[['a hospital'], 'bệnh viện'], [['Nurses', 'work', 'in a hospital.'], 'Y tá làm việc ở bệnh viện.'], [['My aunt', 'is', 'a nurse.', 'She works', 'in a big hospital.'], 'Dì mình là y tá. Dì làm ở một bệnh viện lớn.']], x: ['pilot', 'working'] },
      cb: ['b', 'A cat is stuck in a tree! Can you help me, Zoe?', 'Một chú mèo bị kẹt trên cây! Cháu giúp chú được không, Zoe?', [
        ['yes', "Of course! Let's rescue it!", 'Tất nhiên! Mình cứu nó thôi!', "You're a real hero, Zoe!", 'Cháu đúng là người hùng, Zoe!', '🐱'],
        ['ask', 'Should we call a vet first?', 'Mình có nên gọi bác sĩ thú y trước không ạ?', "Good thinking! Let's call the vet!", 'Nghĩ hay lắm! Mình gọi bác sĩ thú y nào!', '📞']]],
      tb: ['b', 'Where does a pilot work?', 'Phi công làm việc ở đâu?', [
        ['calm', 'A pilot works on a plane.', 'Phi công làm việc trên máy bay.', "That's right! Up in the sky!", 'Đúng rồi! Trên bầu trời!', '✈️'],
        ['ask', 'At the airport! Do you want to be a pilot?', 'Ở sân bay! Bạn có muốn làm phi công không?', 'Yes! I love flying!', 'Có! Mình thích bay lắm!', '🧑‍✈️']]]
    },
    z5l3: {
      snow: { vi: 'Nói về ước mơ nghề nghiệp', l: [[['a pilot'], 'phi công'], [['I', 'want to be', 'a pilot.'], 'Mình muốn làm phi công.'], [['In the future,', 'I', 'would like to be', 'a brave pilot', 'because I love planes.'], 'Trong tương lai, mình muốn làm phi công dũng cảm vì mình yêu máy bay.']], x: ['astronaut', 'likes'] },
      cb: ['b', 'Zoe, would you like to fly my rescue helicopter?', 'Zoe, cháu có muốn lái trực thăng cứu hộ của chú không?', [
        ['yes', "Wow! Yes, please! That's my dream!", 'Oa! Có ạ! Đó là ước mơ của cháu!', 'Hold on tight! Up we go!', 'Bám chắc nhé! Cất cánh nào!', '🚁'],
        ['no', "Thank you, but I'm a little scared. Can I watch first?", 'Cháu cảm ơn, nhưng cháu hơi sợ. Cháu xem trước được không ạ?', 'Of course! You can be my co-pilot!', 'Tất nhiên! Cháu làm phi công phụ nhé!', '👀']]],
      tb: ['b', 'What would you like to be in the future?', 'Trong tương lai bạn muốn làm nghề gì?', [
        ['yes', "I'd like to be an astronaut! I want to go to the moon.", 'Mình muốn làm phi hành gia! Mình muốn lên mặt trăng.', "Amazing! Don't forget your space helmet!", 'Tuyệt vời! Đừng quên mũ vũ trụ nhé!', '🧑‍🚀'],
        ['calm', "I'd like to be a vet because I love animals.", 'Mình muốn làm bác sĩ thú y vì mình yêu động vật.', "That's a wonderful dream!", 'Ước mơ đẹp quá!', '🐶']]]
    },

    /* ---------- ZONE 6: Dino & Safari (Ben & Ranger Ruby) ---------- */
    z6l1: {
      snow: { vi: 'Nói về con vật em thích', l: [[['giraffes'], 'hươu cao cổ'], [['I', 'like', 'giraffes.'], 'Mình thích hươu cao cổ.'], [['I', 'really like', 'giraffes', 'because', 'they have long necks.'], 'Mình rất thích hươu cao cổ vì chúng có cổ dài.']], x: ['elephant', 'likes'] },
      cb: ['b', 'Ben, do you want to feed the elephant?', 'Ben ơi, cháu muốn cho voi ăn không?', [
        ['yes', 'Yes, please! I love elephants!', 'Có ạ! Cháu yêu voi lắm!', "Here's a banana. Be gentle!", 'Đây là quả chuối. Nhẹ nhàng thôi nhé!', '🐘'],
        ['idea', "No, thanks. It's too big! Can I feed the giraffe?", 'Dạ thôi ạ. Nó to quá! Cháu cho hươu cao cổ ăn được không?', 'Sure! Hold the leaves up high!', 'Được chứ! Giơ lá lên thật cao nhé!', '🦒']]],
      tb: ['b', 'Would you like to see the crocodile?', 'Bạn có muốn xem cá sấu không?', [
        ['yes', "Yes! Let's go! I'm not scared!", 'Có! Đi thôi! Mình không sợ!', 'Brave Ben! Stay behind the fence!', 'Ben dũng cảm! Đứng sau hàng rào nhé!', '🐊'],
        ['no', "No, thank you. It's dangerous! Can we see the whale?", 'Không, cảm ơn. Nguy hiểm lắm! Mình xem cá voi được không?', 'Good idea! The blue whale is so big!', 'Ý hay! Cá voi xanh to lắm!', '🐋']]]
    },
    z6l2: {
      snow: { vi: 'Nêu ý kiến về khủng long T-Rex', l: [[['the T-Rex'], 'khủng long bạo chúa'], [['The T-Rex', 'is', 'dangerous.'], 'Khủng long bạo chúa rất nguy hiểm.'], [['I think', 'the T-Rex', 'is', 'very dangerous', 'and heavy.'], 'Mình nghĩ khủng long bạo chúa rất nguy hiểm và nặng.']], x: ['are', 'Triceratops'] },
      cb: ['b', 'The Triceratops is friendly. Do you want to ride on it?', 'Khủng long ba sừng rất hiền. Cháu muốn cưỡi nó không?', [
        ['yes', 'Wow! Yes! This is awesome!', 'Oa! Có ạ! Tuyệt quá!', 'Hold on, Ben! Dino ride time!', 'Bám chắc nhé Ben! Cưỡi khủng long nào!', '🦕'],
        ['idea', 'No, thank you! How about taking a photo?', 'Dạ thôi ạ! Hay mình chụp ảnh nhé?', 'Good idea! Say cheese!', 'Ý hay! Cười lên nào!', '📸']]],
      tb: ['b', 'Which dinosaur do you like best?', 'Bạn thích loài khủng long nào nhất?', [
        ['yes', "I like the T-Rex best because it's strong!", 'Mình thích khủng long bạo chúa nhất vì nó khỏe!', 'Roar! Me too!', 'Gừm! Mình cũng vậy!', '🦖'],
        ['calm', "I like the Triceratops. It's friendly and intelligent.", 'Mình thích khủng long ba sừng. Nó hiền và thông minh.', "Great choice! It's my favourite too!", 'Chọn hay lắm! Mình cũng thích nó nhất!', '🦕']]]
    },
    z6l3: {
      snow: { vi: 'So sánh tốc độ con vật', l: [[['faster'], 'nhanh hơn'], [['A cheetah', 'is', 'faster.'], 'Báo săn nhanh hơn.'], [['A cheetah', 'is', 'much faster', 'than', 'a horse.'], 'Báo săn nhanh hơn ngựa rất nhiều.']], x: ['fast', 'more'] },
      cb: ['b', "Let's have a race! The cheetah and the elephant. Who will win?", 'Thi chạy nào! Báo săn và voi. Ai sẽ thắng?', [
        ['calm', "The cheetah, because it's faster than the elephant!", 'Báo săn, vì nó nhanh hơn voi!', "You're right! Zoom!", 'Cháu nói đúng! Vèo!', '🐆'],
        ['idea', "The elephant! It's bigger and stronger!", 'Con voi! Nó to hơn và khỏe hơn!', "Ha ha! It's bigger, but it's slower!", 'Ha ha! Nó to hơn, nhưng chậm hơn đó!', '🐘']]],
      tb: ['b', 'Which is bigger, a giraffe or an elephant?', 'Con nào to hơn, hươu cao cổ hay voi?', [
        ['calm', 'An elephant is bigger than a giraffe.', 'Voi to hơn hươu cao cổ.', 'Right! But the giraffe is the tallest!', 'Đúng rồi! Nhưng hươu cao cổ cao nhất đó!', '🐘'],
        ['ask', 'Hmm... is the giraffe taller?', 'Ừm... hươu cao cổ cao hơn phải không?', 'Yes! The giraffe is the tallest animal!', 'Đúng! Hươu cao cổ là con vật cao nhất!', '🦒']]]
    },

    /* ---------- ZONE 7: Holiday Airport (Nam & Pilot Anna) ---------- */
    z7l1: {
      snow: { vi: 'Nói về thời tiết hôm nay', l: [[['sunny'], 'nắng'], [['It', 'is', 'sunny.'], 'Trời nắng.'], [['Today,', 'it', 'is', 'sunny and warm', 'in Da Nang.'], 'Hôm nay, ở Đà Nẵng trời nắng và ấm.']], x: ['rainy', 'are'] },
      cb: ['b', "It's stormy today. Do you still want to fly?", 'Hôm nay có bão. Cháu vẫn muốn bay chứ?', [
        ['no', "No, thanks. Let's wait for sunny weather.", 'Dạ thôi ạ. Mình đợi trời nắng nhé.', 'Good idea! Safety first!', 'Ý hay! An toàn là trên hết!', '⛈️'],
        ['idea', 'How about playing board games at the airport?', 'Hay mình chơi cờ ở sân bay nhé?', 'Great idea! I love board games!', 'Ý hay quá! Cô thích chơi cờ lắm!', '🎲']]],
      tb: ['b', "It's sunny and warm! Let's go to the beach!", 'Trời nắng ấm! Mình đi biển nhé!', [
        ['yes', "Yes! Let's build a sandcastle!", 'Có! Mình xây lâu đài cát nhé!', "Don't forget your sunglasses!", 'Đừng quên kính râm nhé!', '🏖️'],
        ['no', "Sorry, I'm busy. How about tomorrow?", 'Xin lỗi, mình bận. Ngày mai được không?', 'Okay! See you tomorrow!', 'Được! Hẹn mai gặp nhé!', '📅']]]
    },
    z7l2: {
      snow: { vi: 'Nhắc bạn mang áo mưa', l: [[['a raincoat'], 'áo mưa'], [['I', 'pack', 'my raincoat.'], 'Mình xếp áo mưa vào vali.'], [['Please', 'pack', 'your raincoat', 'because', 'it is rainy.'], 'Hãy mang theo áo mưa vì trời đang mưa nhé.']], x: ['sunglasses', 'packs'] },
      cb: ['b', 'Nam, your suitcase is too heavy! Can I help you?', 'Nam ơi, vali của cháu nặng quá! Cô giúp nhé?', [
        ['yes', 'Yes, please! Thank you so much!', 'Vâng ạ! Cháu cảm ơn cô nhiều!', 'No problem! Wow, ten sweaters?!', 'Không có gì! Ôi, mười cái áo len á?!', '🧳'],
        ['no', "No, thanks. I can do it! I'm strong!", 'Dạ thôi ạ. Cháu tự làm được! Cháu khỏe mà!', 'Ha ha! Okay, strong Nam!', 'Ha ha! Được rồi, Nam khỏe mạnh!', '💪']]],
      tb: ['b', "It's freezing cold in London. What will you pack?", 'Ở London trời lạnh cóng. Bạn sẽ mang gì?', [
        ['calm', "I'll pack a warm sweater and a coat.", 'Mình sẽ mang áo len ấm và áo khoác.', "Smart! Don't forget your gloves!", 'Thông minh! Đừng quên găng tay nhé!', '🧤'],
        ['ask', 'Can I pack my sunglasses too?', 'Mình mang cả kính râm được không?', "Sure! But it's not very sunny there!", 'Được chứ! Nhưng ở đó không nắng lắm đâu!', '🕶️']]]
    },
    z7l3: {
      snow: { vi: 'Kể về kế hoạch đi cắm trại', l: [[['camping'], 'cắm trại'], [['We', 'go', 'camping.'], 'Chúng mình đi cắm trại.'], [['This summer,', 'we', 'are going to', 'go camping', 'in the mountains.'], 'Hè này, chúng mình sẽ đi cắm trại trên núi.']], x: ['passport', 'goes'] },
      cb: ['b', "We're going to Phu Quoc! Do you want to sit by the window?", 'Mình sắp bay đi Phú Quốc! Cháu muốn ngồi cạnh cửa sổ không?', [
        ['yes', 'Yes, please! I want to see the clouds!', 'Có ạ! Cháu muốn ngắm mây!', 'Here you are! Enjoy the view!', 'Chỗ của cháu đây! Ngắm cảnh vui nhé!', '☁️'],
        ['no', 'No, thanks. I want to sleep. Can I sit by the aisle?', 'Dạ thôi ạ. Cháu muốn ngủ. Cháu ngồi cạnh lối đi được không?', 'Sure! Sweet dreams!', 'Được chứ! Ngủ ngon nhé!', '😴']]],
      tb: ['b', "Let's go camping this weekend!", 'Cuối tuần này mình đi cắm trại nhé!', [
        ['yes', "That sounds awesome! I'll bring the tent!", 'Nghe tuyệt quá! Mình sẽ mang lều!', "Great! I'll bring the marshmallows!", 'Tuyệt! Mình sẽ mang kẹo dẻo nướng!', '⛺'],
        ['no', "I'd love to, but I'm busy. How about next weekend?", 'Mình rất muốn, nhưng mình bận. Cuối tuần sau thì sao?', 'Okay! Next weekend, then!', 'Được! Vậy cuối tuần sau nhé!', '📅']]]
    },

    /* ---------- ZONE 8: Mystery Detective (Finn & Detective Dot) ---------- */
    z8l1: {
      snow: { vi: 'Kể hôm qua em ở đâu', l: [[['yesterday'], 'hôm qua'], [['I', 'was', 'at home.'], 'Mình đã ở nhà.'], [['Yesterday,', 'I', 'was', 'at the bookshop', 'with my dad.'], 'Hôm qua, mình ở hiệu sách với bố.']], x: ['were', 'is'] },
      cb: ['b', 'Finn, where were you last weekend? I need a witness!', 'Finn, cuối tuần trước cháu ở đâu? Cô cần một nhân chứng!', [
        ['calm', 'I was at the bookshop with my mum.', 'Cháu ở hiệu sách với mẹ ạ.', "Thank you! That's a good clue!", 'Cảm ơn cháu! Đó là một manh mối tốt!', '🔍'],
        ['ask', 'Why? What happened, Detective?', 'Sao vậy ạ? Có chuyện gì thế, thám tử?', "Someone took the museum's golden brick!", 'Ai đó đã lấy viên gạch vàng của bảo tàng!', '🧱']]],
      tb: ['b', 'Where were you yesterday?', 'Hôm qua bạn ở đâu?', [
        ['calm', 'I was at home. I did my homework.', 'Mình ở nhà. Mình làm bài tập.', 'Good job! Was it difficult?', 'Giỏi lắm! Bài có khó không?', '🏠'],
        ['yes', 'I visited my grandparents! It was fun!', 'Mình đi thăm ông bà! Vui lắm!', 'How lovely! What did you do there?', 'Thật đáng yêu! Bạn đã làm gì ở đó?', '👵']]]
    },
    z8l2: {
      snow: { vi: 'Kể về chuyến đi bảo tàng', l: [[['the museum'], 'bảo tàng'], [['I', 'went', 'to the museum.'], 'Mình đã đi bảo tàng.'], [['Last Sunday,', 'we', 'went', 'to the museum', 'and took photos.'], 'Chủ nhật tuần trước, chúng mình đi bảo tàng và chụp ảnh.']], x: ['go', 'take'] },
      cb: ['b', 'Finn, would you like to see my museum photos?', 'Finn, cháu có muốn xem ảnh bảo tàng của cô không?', [
        ['yes', 'Yes, please! I love dinosaur photos!', 'Có ạ! Cháu thích ảnh khủng long lắm!', "Look! Here's the T-Rex!", 'Nhìn này! Khủng long bạo chúa đây!', '📷'],
        ['ask', 'Did you buy a souvenir too?', 'Cô có mua quà lưu niệm không ạ?', 'Yes! I bought a mini LEGO detective!', 'Có! Cô mua một thám tử LEGO tí hon!', '🕵️']]],
      tb: ['b', 'What did you do last weekend?', 'Cuối tuần trước bạn đã làm gì?', [
        ['calm', 'I went to the museum and took photos.', 'Mình đi bảo tàng và chụp ảnh.', 'Wow! Did you have a great time?', 'Oa! Bạn có vui không?', '🏛️'],
        ['yes', 'I saw a parade! It was amazing!', 'Mình xem diễu hành! Tuyệt lắm!', 'Fantastic! I love parades!', 'Tuyệt vời! Mình thích diễu hành lắm!', '🎉']]]
    },
    z8l3: {
      snow: { vi: 'Kể thám tử đã tìm thấy gì', l: [[['a clue'], 'manh mối'], [['The detective', 'found', 'a clue.'], 'Thám tử đã tìm thấy một manh mối.'], [['Yesterday,', 'the detective', 'found', 'an important clue', 'in the garden.'], 'Hôm qua, thám tử tìm thấy một manh mối quan trọng trong vườn.']], x: ['find', 'witness'] },
      cb: ['b', 'I found a clue! A blue LEGO brick! Do you want to help me solve the mystery?', 'Cô tìm thấy manh mối! Một viên gạch LEGO xanh! Cháu muốn giúp cô phá án không?', [
        ['yes', "Yes! Let's solve it together!", 'Có ạ! Mình cùng phá án nhé!', 'Great! Follow the blue bricks!', 'Tuyệt! Đi theo những viên gạch xanh nào!', '🔎'],
        ['ask', 'What happened? Did someone lose it?', 'Chuyện gì đã xảy ra? Có ai làm rơi nó không ạ?', "Maybe! Let's ask the witness!", 'Có thể lắm! Mình hỏi nhân chứng nào!', '🗣️']]],
      tb: ['b', 'Oh no! I lost my backpack. Can you help me find it?', 'Ôi không! Mình làm mất ba lô rồi. Bạn giúp mình tìm được không?', [
        ['yes', 'Of course! Where were you this morning?', 'Tất nhiên! Sáng nay bạn đã ở đâu?', "I was at the library! Let's go there!", 'Mình ở thư viện! Mình tới đó nhé!', '🎒'],
        ['idea', "Let's ask the teacher. Maybe she found it.", 'Mình hỏi cô giáo nhé. Có thể cô đã tìm thấy nó.', 'Good idea! Thank you!', 'Ý hay! Cảm ơn bạn!', '👩‍🏫']]]
    },

    /* ---------- ZONE 9: Space Station (Kai & Astro Luna) ---------- */
    z9l1: {
      snow: { vi: 'Kể về việc em đi thư viện', l: [[['the library'], 'thư viện'], [['I', 'go', 'to the library.'], 'Mình đi thư viện.'], [['On Saturdays,', 'I', 'go', 'to the library', 'to borrow books.'], 'Vào các ngày thứ Bảy, mình đi thư viện để mượn sách.']], x: ['cinema', 'goes'] },
      cb: ['b', "Kai, let's go to the planetarium!", 'Kai ơi, mình đi cung thiên văn nhé!', [
        ['yes', 'Yes! I love stars!', 'Đi! Tớ thích ngắm sao lắm!', "Look up! It's the Milky Way!", 'Nhìn lên kìa! Dải Ngân Hà đó!', '✨'],
        ['no', 'Sorry, I need to go to the pharmacy first. Can we go later?', 'Xin lỗi, tớ phải ra hiệu thuốc trước. Mình đi sau được không?', "Sure! See you at three o'clock!", 'Được! Hẹn cậu lúc ba giờ!', '💊']]],
      tb: ['b', 'Would you like to go to the cinema with me?', 'Bạn có muốn đi xem phim với mình không?', [
        ['yes', "Yes, I'd love to! What film?", 'Có, mình rất muốn! Phim gì vậy?', 'A space film, of course!', 'Phim vũ trụ, tất nhiên rồi!', '🎬'],
        ['no', "Sorry, I can't. How about the library?", 'Xin lỗi, mình không đi được. Đi thư viện nhé?', 'Great idea! I need some books!', 'Ý hay! Mình đang cần vài cuốn sách!', '📚']]]
    },
    z9l2: {
      snow: { vi: 'Chỉ vị trí rạp chiếu phim', l: [[['next to'], 'bên cạnh'], [['It', 'is', 'next to the park.'], 'Nó ở cạnh công viên.'], [['The cinema', 'is', 'between', 'the library', 'and the post office.'], 'Rạp chiếu phim ở giữa thư viện và bưu điện.']], x: ['across', 'are'] },
      cb: ['b', 'Where is the post office? I need to send a space letter!', 'Bưu điện ở đâu nhỉ? Cô cần gửi một lá thư vũ trụ!', [
        ['calm', "It's next to the library.", 'Nó ở cạnh thư viện ạ.', 'Thank you! Zoom!', 'Cảm ơn cháu! Vèo!', '✉️'],
        ['ask', "Is it across from the cinema? Let's check the map!", 'Có phải đối diện rạp phim không ạ? Mình xem bản đồ nhé!', 'Good idea! Yes, there it is!', 'Ý hay! Đúng rồi, nó kia kìa!', '🗺️']]],
      tb: ['b', 'Excuse me, where is the pharmacy?', 'Xin lỗi, hiệu thuốc ở đâu vậy?', [
        ['calm', "It's between the cinema and the bank.", 'Nó ở giữa rạp chiếu phim và ngân hàng.', 'Thank you so much!', 'Cảm ơn bạn rất nhiều!', '💊'],
        ['calm', "It's on the corner of Moon Street.", 'Nó ở góc phố Mặt Trăng.', 'Great! Thanks!', 'Tuyệt! Cảm ơn nhé!', '🌙']]]
    },
    z9l3: {
      snow: { vi: 'Hỏi đường lịch sự', l: [[['turn left'], 'rẽ trái'], [['Turn left', 'at', 'the corner.'], 'Rẽ trái ở góc đường.'], [['Excuse me,', 'could you', 'tell me', 'how to get to', 'the planetarium?'], 'Xin lỗi, bạn có thể chỉ mình đường đến cung thiên văn không?']], x: ['right', 'straight'] },
      cb: ['b', 'Excuse me, how do I get to the space museum?', 'Xin lỗi, đường đến bảo tàng vũ trụ đi thế nào nhỉ?', [
        ['calm', 'Go straight ahead and turn left.', 'Đi thẳng rồi rẽ trái ạ.', "Thank you! You're a great guide!", 'Cảm ơn cháu! Cháu chỉ đường giỏi lắm!', '🚀'],
        ['idea', "Sorry, I don't know. Let's ask the robot!", 'Xin lỗi, cháu không biết. Mình hỏi chú robot nhé!', 'Good idea! Robots know everything!', 'Ý hay! Robot biết hết mọi thứ!', '🤖']]],
      tb: ['b', 'Excuse me, could you tell me how to get to the cinema?', 'Xin lỗi, bạn chỉ giúp mình đường đến rạp chiếu phim được không?', [
        ['calm', 'Sure! Go straight ahead and turn right.', 'Được chứ! Đi thẳng rồi rẽ phải.', 'Thank you so much!', 'Cảm ơn bạn rất nhiều!', '🎬'],
        ['idea', "Sorry, I'm not sure. How about asking the police officer?", 'Xin lỗi, mình không chắc. Bạn hỏi chú công an nhé?', 'Good idea! Thank you anyway!', 'Ý hay! Dù sao cũng cảm ơn bạn!', '👮']]]
    },

    /* ---------- ZONE 10: Champions Stage (Jack & Knight Rosa) ---------- */
    z10l1: {
      snow: { vi: 'Mời bạn đến dự tiệc', l: [[['my party'], 'bữa tiệc của mình'], [['Come', 'to', 'my party!'], 'Đến dự tiệc của mình nhé!'], [['Would you like to', 'come', 'to', 'my castle party', 'on Sunday?'], 'Bạn có muốn đến dự tiệc lâu đài của mình vào Chủ nhật không?']], x: ['comes', 'Do'] },
      cb: ['b', 'Jack, would you like to come to my castle party on Sunday?', 'Jack ơi, cậu có muốn đến tiệc lâu đài của tớ vào Chủ nhật không?', [
        ['yes', "Yes, I'd love to! That sounds awesome!", 'Có, tớ rất muốn! Nghe tuyệt quá!', 'Yay! Wear your knight costume!', 'Yeah! Mặc đồ hiệp sĩ đến nhé!', '🏰'],
        ['no', "I'd love to, but I'm busy on Sunday. How about Saturday?", 'Tớ rất muốn, nhưng Chủ nhật tớ bận. Thứ Bảy thì sao?', 'Saturday is fine! See you then!', 'Thứ Bảy cũng được! Hẹn gặp cậu!', '📅']]],
      tb: ['b', 'How about playing badminton after school?', 'Sau giờ học mình chơi cầu lông nhé?', [
        ['yes', "That sounds awesome! Let's go!", 'Nghe tuyệt quá! Đi thôi!', "Great! I'll bring the rackets!", 'Tuyệt! Mình sẽ mang vợt!', '🏸'],
        ['no', "I'd love to, but I'm busy. Let's play tomorrow!", 'Mình rất muốn, nhưng mình bận. Mai mình chơi nhé!', 'Okay! See you tomorrow!', 'Được! Hẹn mai nhé!', '📅']]]
    },
    z10l2: {
      snow: { vi: 'Nêu ý kiến về mèo và chó', l: [[['cats'], 'những chú mèo'], [['Cats', 'are', 'cute.'], 'Mèo rất dễ thương.'], [['In my opinion,', 'cats', 'are', 'cuter', 'than dogs.'], 'Theo mình, mèo dễ thương hơn chó.']], x: ['is', 'more'] },
      cb: ['b', 'In my opinion, dragons are the best LEGO sets. What do you think?', 'Theo tớ, rồng là bộ LEGO đẹp nhất. Cậu nghĩ sao?', [
        ['yes', 'I agree with you! Dragons are cool!', 'Tớ đồng ý với cậu! Rồng ngầu lắm!', "Yes! Let's build a dragon together!", 'Đúng vậy! Mình cùng lắp một con rồng nhé!', '🐉'],
        ['no', "I don't think so. In my opinion, spaceships are the best!", 'Tớ không nghĩ vậy. Theo tớ, tàu vũ trụ mới là đẹp nhất!', "Interesting! Let's build both!", 'Thú vị đấy! Mình lắp cả hai nhé!', '🚀']]],
      tb: ['b', 'I think pizza is the best food. Do you agree?', 'Mình nghĩ pizza là món ngon nhất. Bạn đồng ý không?', [
        ['yes', 'Yes, I agree with you! Pizza is yummy!', 'Có, mình đồng ý với bạn! Pizza ngon tuyệt!', 'High five!', 'Đập tay nào!', '🍕'],
        ['no', "I don't think so. In my opinion, noodles are better!", 'Mình không nghĩ vậy. Theo mình, mì ngon hơn!', 'Hmm, noodles are yummy too!', 'Ừm, mì cũng ngon thật!', '🍜']]]
    },
    z10l3: {
      snow: { vi: 'Nhờ bạn giúp một cách lịch sự', l: [[['help'], 'giúp đỡ'], [['Help', 'me,', 'please!'], 'Giúp mình với!'], [['Excuse me,', 'could you', 'help', 'me', 'with this box?'], 'Xin lỗi, bạn giúp mình mang cái hộp này được không?']], x: ['helps', 'Does'] },
      cb: ['b', 'Jack, could you help me carry the trophy?', 'Jack ơi, cậu giúp tớ khiêng chiếc cúp được không?', [
        ['yes', "No problem at all! Let's do it together!", 'Không vấn đề gì! Mình cùng làm nhé!', "Thank you so much! You're a true champion!", 'Cảm ơn cậu nhiều lắm! Cậu đúng là nhà vô địch!', '🏆'],
        ['no', 'Sorry, my hands are full. Can I help you in a minute?', 'Xin lỗi, tay tớ đang bận. Một phút nữa tớ giúp nhé?', 'No problem! Thank you anyway!', 'Không sao! Dù sao cũng cảm ơn cậu!', '🙏']]],
      tb: ['b', 'Congratulations! You won the LEGO contest!', 'Chúc mừng! Bạn thắng cuộc thi LEGO rồi!', [
        ['yes', "Thank you so much! I'm so happy!", 'Cảm ơn bạn rất nhiều! Mình vui quá!', 'You worked very hard!', 'Bạn đã rất chăm chỉ!', '🏆'],
        ['ask', 'Really? Thank you! Can we celebrate together?', 'Thật sao? Cảm ơn bạn! Mình cùng ăn mừng nhé?', "Of course! Let's have a party!", 'Tất nhiên! Mở tiệc thôi!', '🎉']]]
    }
  };

  /* ---------- LEGO Mystery Mission – mỗi Vùng đất 1 câu đố logic 3 manh mối ---------- */
  const MYSTERY = {
    z1: {
      t: "Leo's Secret Item", tv: 'Món đồ bí mật của Leo',
      intro: ['Leo forgot something this morning! Listen to the clues and find it.', 'Sáng nay Leo quên một món đồ! Nghe manh mối và tìm ra nó nhé.'],
      clues: [['Clue one: You cannot eat it.', 'Manh mối 1: Bạn không ăn được nó.'],
        ['Clue two: You use it in the bathroom, not on the street.', 'Manh mối 2: Bạn dùng nó trong phòng tắm, không phải ngoài đường.'],
        ['Clue three: You use it after breakfast to clean your teeth.', 'Manh mối 3: Bạn dùng nó sau bữa sáng để làm sạch răng.']],
      q: ['What did Leo forget?', 'Leo đã quên món gì?'],
      o: [['breakfast', '🥞', 'bữa sáng'], ['the school bus', '🚌', 'xe buýt'], ['a toothbrush', '🪥', 'bàn chải đánh răng'], ['an alarm clock', '⏰', 'đồng hồ báo thức']], a: 2,
      win: ['Yes! Leo forgot his toothbrush. Brush your teeth, Leo!', 'Đúng rồi! Leo quên bàn chải. Đánh răng đi Leo!']
    },
    z2: {
      t: 'The Secret Subject', tv: 'Môn học bí mật',
      intro: ["Max has a secret subject today. Can you guess it?", 'Hôm nay Max có một môn học bí mật. Con đoán được không?'],
      clues: [["Clue one: In this lesson, we don't paint pictures.", 'Manh mối 1: Trong tiết này, chúng mình không vẽ tranh.'],
        ["Clue two: We don't sing songs or play the piano.", 'Manh mối 2: Chúng mình không hát hay chơi đàn piano.'],
        ['Clue three: We sit down and use a computer.', 'Manh mối 3: Chúng mình ngồi và dùng máy tính.']],
      q: ["What is Max's secret subject?", 'Môn học bí mật của Max là gì?'],
      o: [['Art', '🎨', 'Mỹ thuật'], ['Music', '🎵', 'Âm nhạc'], ['PE', '⚽', 'Thể dục'], ['IT', '💻', 'Tin học']], a: 3,
      win: ['Correct! It is IT. Max is writing code!', 'Chính xác! Đó là môn Tin học. Max đang viết mã!']
    },
    z3: {
      t: 'The Mystery Drink', tv: 'Đồ uống bí ẩn',
      intro: ['Lily ordered a secret drink. Chef Tony made it. What is it?', 'Lily gọi một đồ uống bí mật. Chú Tony đã pha nó. Đó là gì?'],
      clues: [["Clue one: It's cold, not hot.", 'Manh mối 1: Nó lạnh, không nóng.'],
        ["Clue two: It isn't water.", 'Manh mối 2: Nó không phải là nước lọc.'],
        ["Clue three: Chef Tony made it with milk and red fruit. It's pink!", 'Manh mối 3: Chú Tony làm nó từ sữa và trái cây đỏ. Nó màu hồng!']],
      q: ['What did Lily order?', 'Lily đã gọi món gì?'],
      o: [['hot chocolate', '☕', 'sô-cô-la nóng'], ['a bottle of water', '💧', 'một chai nước'], ['lemonade', '🍋', 'nước chanh'], ['a strawberry smoothie', '🍓', 'sinh tố dâu']], a: 3,
      win: ['Delicious! It is a strawberry smoothie!', 'Ngon quá! Đó là sinh tố dâu!']
    },
    z4: {
      t: "What's the Matter, Sensei?", tv: 'Thầy Ken bị làm sao?',
      intro: ['Sensei Ken is sick today. Read the clues. What is the matter with him?', 'Hôm nay thầy Ken bị ốm. Đọc manh mối nhé. Thầy bị làm sao?'],
      clues: [["Clue one: His head doesn't hurt.", 'Manh mối 1: Đầu thầy không đau.'],
        ['Clue two: He can eat sweets. His teeth and his tummy are fine.', 'Manh mối 2: Thầy ăn được kẹo. Răng và bụng thầy đều ổn.'],
        ['Clue three: His body is very hot. His temperature is thirty-nine degrees!', 'Manh mối 3: Người thầy rất nóng. Nhiệt độ là 39 độ!']],
      q: ['What is the matter with Sensei Ken?', 'Thầy Ken bị làm sao?'],
      o: [['a headache', '🤕', 'đau đầu'], ['a stomachache', '🤢', 'đau bụng'], ['a toothache', '🦷', 'đau răng'], ['a fever', '🤒', 'bị sốt']], a: 3,
      win: ['Right! He has a fever. He should take a rest!', 'Đúng! Thầy bị sốt. Thầy nên nghỉ ngơi!']
    },
    z5: {
      t: 'Who Am I?', tv: 'Tôi là ai?',
      intro: ['A mystery hero is helping in LEGO City. Who is it?', 'Một người hùng bí ẩn đang giúp đỡ Thành phố LEGO. Đó là ai?'],
      clues: [["Clue one: I don't work in a hospital for people.", 'Manh mối 1: Tôi không làm việc ở bệnh viện cho người.'],
        ["Clue two: I don't fly planes or rockets.", 'Manh mối 2: Tôi không lái máy bay hay tên lửa.'],
        ['Clue three: I help cats and dogs when they are sick.', 'Manh mối 3: Tôi giúp chó mèo khi chúng bị ốm.']],
      q: ['Who is the mystery hero?', 'Người hùng bí ẩn là ai?'],
      o: [['a nurse', '👩‍⚕️', 'y tá'], ['a pilot', '🧑‍✈️', 'phi công'], ['an astronaut', '🧑‍🚀', 'phi hành gia'], ['a vet', '🐶', 'bác sĩ thú y']], a: 3,
      win: ["You got it! I'm a vet. I love animals!", 'Con đoán đúng rồi! Tôi là bác sĩ thú y. Tôi yêu động vật!']
    },
    z6: {
      t: 'The Mystery Animal', tv: 'Con vật bí ẩn',
      intro: ['Ranger Ruby saw a mystery animal on the safari. What is it?', 'Kiểm lâm Ruby thấy một con vật bí ẩn ở khu safari. Đó là con gì?'],
      clues: [["Clue one: It doesn't swim in rivers or in the sea.", 'Manh mối 1: Nó không bơi ở sông hay biển.'],
        ["Clue two: It isn't the tallest animal.", 'Manh mối 2: Nó không phải con vật cao nhất.'],
        ['Clue three: It has spots, and it is faster than a car!', 'Manh mối 3: Nó có đốm và chạy nhanh hơn ô tô!']],
      q: ['What is the mystery animal?', 'Con vật bí ẩn là con gì?'],
      o: [['a blue whale', '🐋', 'cá voi xanh'], ['a crocodile', '🐊', 'cá sấu'], ['a giraffe', '🦒', 'hươu cao cổ'], ['a cheetah', '🐆', 'báo săn']], a: 3,
      win: ['Zoom! It is a cheetah, the fastest animal on land!', 'Vèo! Đó là báo săn, con vật chạy nhanh nhất trên cạn!']
    },
    z7: {
      t: "Nam's Secret Suitcase", tv: 'Chiếc vali bí mật của Nam',
      intro: ["Nam is going to a freezing cold place. He packed one secret thing. What is it?", 'Nam sắp đến một nơi lạnh cóng. Bạn ấy xếp một món đồ bí mật. Đó là gì?'],
      clues: [["Clue one: He doesn't need it at the beach.", 'Manh mối 1: Bạn ấy không cần nó ở bãi biển.'],
        ["Clue two: It isn't for rainy days.", 'Manh mối 2: Nó không dành cho ngày mưa.'],
        ['Clue three: It is warm and soft. You wear it over your T-shirt.', 'Manh mối 3: Nó ấm và mềm. Bạn mặc nó bên ngoài áo phông.']],
      q: ['What did Nam pack?', 'Nam đã xếp món gì?'],
      o: [['sunglasses', '🕶️', 'kính râm'], ['a swimsuit', '🩱', 'đồ bơi'], ['a raincoat', '🧥', 'áo mưa'], ['a sweater', '🧶', 'áo len']], a: 3,
      win: ['Brrr! It is a warm sweater. Smart packing, Nam!', 'Brrr! Đó là áo len ấm. Nam xếp đồ thông minh quá!']
    },
    z8: {
      t: 'The Golden Brick Thief', tv: 'Kẻ trộm viên gạch vàng',
      intro: ["Someone took the museum's golden brick yesterday! Help Detective Dot find the thief.", 'Hôm qua ai đó đã lấy viên gạch vàng của bảo tàng! Giúp thám tử Dot tìm ra kẻ trộm nhé.'],
      clues: [["Clue one: The witness said: the thief wasn't wearing a uniform.", 'Manh mối 1: Nhân chứng nói: kẻ trộm không mặc đồng phục.'],
        ['Clue two: The painter was at the bookshop all day yesterday.', 'Manh mối 2: Họa sĩ đã ở hiệu sách cả ngày hôm qua.'],
        ['Clue three: The thief took lots of photos of the golden brick.', 'Manh mối 3: Kẻ trộm đã chụp rất nhiều ảnh viên gạch vàng.']],
      q: ['Who took the golden brick?', 'Ai đã lấy viên gạch vàng?'],
      o: [['the guard', '👮', 'chú bảo vệ'], ['the chef', '🧑‍🍳', 'đầu bếp'], ['the painter', '🧑‍🎨', 'họa sĩ'], ['the tourist', '📸', 'khách du lịch']], a: 3,
      win: ['Case closed! The tourist said sorry and gave the brick back.', 'Phá án thành công! Vị khách du lịch đã xin lỗi và trả lại viên gạch.']
    },
    z9: {
      t: 'The Secret Space Base', tv: 'Căn cứ vũ trụ bí mật',
      intro: ['Astro Luna hid a secret base in Space Town. Which building is it?', 'Astro Luna giấu một căn cứ bí mật ở Thị trấn Vũ trụ. Đó là tòa nhà nào?'],
      clues: [["Clue one: You don't borrow books there.", 'Manh mối 1: Bạn không mượn sách ở đó.'],
        ["Clue two: You don't buy medicine there.", 'Manh mối 2: Bạn không mua thuốc ở đó.'],
        ['Clue three: You can watch films there and eat popcorn.', 'Manh mối 3: Bạn có thể xem phim và ăn bỏng ngô ở đó.']],
      q: ['Where is the secret base?', 'Căn cứ bí mật ở đâu?'],
      o: [['the library', '📚', 'thư viện'], ['the pharmacy', '💊', 'hiệu thuốc'], ['the post office', '📮', 'bưu điện'], ['the cinema', '🎬', 'rạp chiếu phim']], a: 3,
      win: ['Found it! The secret base is under the cinema!', 'Tìm ra rồi! Căn cứ bí mật nằm dưới rạp chiếu phim!']
    },
    z10: {
      t: 'Who Is Coming to the Party?', tv: 'Ai sẽ đến dự tiệc?',
      intro: ['Knight Rosa invited three friends to her castle party. Listen to their answers.', 'Hiệp sĩ Rosa mời ba người bạn đến tiệc lâu đài. Nghe câu trả lời của họ nhé.'],
      clues: [["Clue one: Jack said: I'd love to, but I'm busy.", "Manh mối 1: Jack nói: Tớ rất muốn, nhưng tớ bận."],
        ["Clue two: Mia said: Sorry, I can't come.", 'Manh mối 2: Mia nói: Xin lỗi, tớ không đến được.'],
        ["Clue three: Ben said: That sounds awesome! See you there!", 'Manh mối 3: Ben nói: Nghe tuyệt quá! Hẹn gặp ở đó nhé!']],
      q: ['Who is coming to the party?', 'Ai sẽ đến dự tiệc?'],
      o: [['Jack', '🧑', 'Jack'], ['Mia', '👧', 'Mia'], ['Ben', '👦', 'Ben'], ['Nobody', '🙅', 'Không ai cả']], a: 2,
      win: ["That's right! Ben said yes. Let's party!", 'Đúng rồi! Ben đồng ý. Vào tiệc thôi!']
    }
  };

  global.ExpertData = { LESSONS, MYSTERY };
})(window);
