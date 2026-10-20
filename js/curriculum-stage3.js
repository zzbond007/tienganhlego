/* =========================================================
   curriculum-stage3.js – LỘ TRÌNH 9 THÁNG · GIAI ĐOẠN 3 (Tháng 7–9)
   🚀 REAL-WORLD ADVENTURES & CONFIDENT SPEAKER – Giao tiếp Tự tin & Thế giới
   12 Tuần (Vùng đất w25–w36) × 3 bài + 1 Mystery Mission mỗi tuần.
   Định dạng giống curriculum-stage1.js (words, comic, build, talk, snow, cb, tb, fact, tf, qa, mystery).
   Nội dung được thiết kế MỚI theo chủ đề lộ trình – không chép lại bài/hội thoại SGK, mà mở rộng
   bằng thí nghiệm nhỏ, nhiệm vụ đời thực, câu chuyện và câu đố logic để bé không "biết rồi".
   ========================================================= */
(function (global) {
  'use strict';

  const Z = [];

  /* ======================= THÁNG 7 ======================= */
  const M7 = ['My Neighborhood, Traffic & Jobs', 'Khu phố, Giao thông & Nghề nghiệp'];
  Z.push(
    /* ---------- WEEK 25: Places in My Town ---------- */
    {
      id: 'w25', week: 25, month: 7, monthTitle: M7[0], monthTitleVi: M7[1],
      name: 'Places in My Town', vi: 'Những nơi trong thị trấn của em', short: 'My Town',
      topic: 'Town Places, Map Words & Errands', topicVi: 'Địa điểm trong phố, từ chỉ vị trí & việc vặt giúp mẹ',
      color: '#0EA5E9', dark: '#0369A1', icon: '🏘️', model: ['town', 'LEGO Town Street', 'Phố LEGO nhộn nhịp'],
      chars: { a: { name: 'Bin', fig: 'cap-red|grin|torso-blue|legs-blue|flag' }, b: { name: 'Mum', fig: 'hair-brown|smile|torso-red|legs-black|book' } },
      chatter: [
        ['The bakery smells of warm bread!', 'Tiệm bánh thơm mùi bánh mì nóng!'],
        ['The museum is opposite the market.', 'Bảo tàng ở đối diện chợ.'],
        ["Let's build a bus stop next!", 'Tiếp theo mình lắp trạm xe buýt nhé!'],
        ['Can you post a letter for me, Bin?', 'Bin gửi giúp mẹ lá thư được không?'],
        ['My LEGO town has a swimming pool!', 'Thị trấn LEGO của mình có cả bể bơi!']
      ],
      lessons: [
        {
          title: 'Town Explorer', titleVi: 'Nhà thám hiểm khu phố', icon: '🗺️',
          words: [
            ['bakery', 'noun', '/ˈbeɪkəri/', 'tiệm bánh', '🥖', 'The bakery opens at six in the morning.', 'Tiệm bánh mở cửa lúc sáu giờ sáng.', 'You can buy fresh bread and birthday cakes in this shop.'],
            ['museum', 'noun', '/mjuˈziːəm/', 'bảo tàng', '🏛️', 'We saw old coins at the museum.', 'Chúng mình đã xem tiền xu cổ ở bảo tàng.', 'A building full of old and special things you can look at.'],
            ['market', 'noun', '/ˈmɑːkɪt/', 'chợ', '🧺', 'Grandma buys fish at the market.', 'Bà mua cá ở chợ.', 'A busy place with many stalls selling fruit, fish and vegetables.'],
            ['swimming pool', 'noun', '/ˈswɪmɪŋ puːl/', 'bể bơi', '🏊', 'The swimming pool is cool in summer.', 'Bể bơi mát rượi vào mùa hè.', 'A big blue place full of water where you can swim.'],
            ['bus stop', 'noun', '/ˈbʌs stɒp/', 'trạm xe buýt', '🚏', 'I wait for the bus at the bus stop.', 'Mình đợi xe buýt ở trạm xe buýt.', 'People stand here and wait for a big vehicle with many seats.']
          ],
          comic: {
            title: 'The Smell Map', titleVi: 'Bản đồ mùi hương',
            panels: [
              ['a', 'Mum, I can find places with my nose!', 'Mẹ ơi, con tìm được các nơi bằng mũi đấy!', '👃'],
              ['b', 'Really? Where are we now, detective?', 'Thật à? Thế giờ mình đang ở đâu, thám tử?', '🤔'],
              ['a', 'Warm bread! We are near the bakery!', 'Bánh mì nóng! Mình đang ở gần tiệm bánh!', '🥖'],
              ['b', 'Right! And that fishy smell is the market.', 'Đúng rồi! Còn mùi tanh tanh kia là chợ đấy.', '🐟']
            ],
            blanks: [[2, 'bakery', ['bakery', 'swimming pool', 'bus stop']], [3, 'market', ['market', 'museum', 'moon']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình đợi xe buýt ở trạm xe buýt.', a: ['I', 'wait for', 'the bus', 'at the bus stop.'], x: ['waits for', 'at the bakery.'] },
            { vi: 'Em muốn nói: Bà mua cá ở chợ.', a: ['Grandma', 'buys', 'fish', 'at the market.'], x: ['buy', 'at the museum.'] }
          ],
          talk: [
            { q: 'What is your favourite place in your town?', vi: 'Nơi nào trong khu phố bạn thích nhất?', hint: 'My favourite place is the swimming pool.', k: ['favourite|like|love|best', 'pool|park|market|bakery|museum|library|cinema|shop|zoo|playground|beach|mall|lake'], c: ['My favourite place is the swimming pool.', 'I go to the swimming pool on Sunday.', 'My favourite food is pizza.'] },
            { q: 'What can you buy at a bakery?', vi: 'Bạn có thể mua gì ở tiệm bánh?', hint: 'I can buy bread and cakes.', k: ['bread|cake|cakes|cookies|banh|croissant|croissants|biscuits|buns|pies|donuts|doughnuts'], c: ['I can buy bread and cakes.', 'I can buy fish and vegetables.', 'I can buy stamps and envelopes.'] }
          ],
          snow: { vi: 'Kể về một nơi trong khu phố', l: [[['the museum'], 'bảo tàng'], [['I', 'visit', 'the museum.'], 'Mình đi thăm bảo tàng.'], [['On Sundays,', 'I', 'visit', 'the museum', 'with my dad.'], 'Vào Chủ nhật, mình đi thăm bảo tàng với bố.']], x: ['visits', 'swim'] },
          cb: ['b', 'Bin, we have one hour. Market or museum?', 'Bin ơi, mình có một tiếng. Đi chợ hay đi bảo tàng?', [
            ['idea', "Market first! Then we can cook lunch together.", 'Đi chợ trước ạ! Rồi mình cùng nấu bữa trưa.', 'Smart plan, little chef!', 'Kế hoạch hay đấy, đầu bếp nhí!', '🧺'],
            ['ask', 'Can we see the dinosaur room at the museum?', 'Mình xem phòng khủng long ở bảo tàng được không ạ?', "Okay! Let's go and say hello to the T-Rex!", 'Được! Đi chào chú khủng long bạo chúa nào!', '🏛️']]],
          tb: ['b', 'The bus is late. What shall we do?', 'Xe buýt đến muộn. Mình làm gì bây giờ?', [
            ['calm', "Let's wait at the bus stop and play I spy.", 'Mình đợi ở trạm và chơi trò "Tớ nhìn thấy" nhé.', 'Good idea! I spy something red!', 'Ý hay! Mẹ nhìn thấy một thứ màu đỏ!', '🚏'],
            ['idea', "Let's walk. The bakery is near here!", 'Mình đi bộ đi ạ. Tiệm bánh ở gần đây mà!', 'Walking is healthy. Off we go!', 'Đi bộ tốt cho sức khỏe. Đi thôi!', '🚶']]],
          fact: ['Bến Thành Market in Sài Gòn is more than one hundred years old!', 'Chợ Bến Thành ở Sài Gòn đã hơn một trăm tuổi rồi đấy!'],
          tf: [
            ['You can see old and special things in a museum.', true, 'Yes! Museums keep old and special things for us to see.', 'Đúng! Bảo tàng giữ những đồ cổ và đặc biệt cho chúng ta xem.'],
            ['You go swimming at the bus stop.', false, 'No! You swim in a swimming pool. You wait for buses at a bus stop.', 'Sai! Con bơi ở bể bơi. Trạm xe buýt là nơi đợi xe.']
          ],
          qa: ['Which places are near your home?', 'Gần nhà bạn có những nơi nào?', 'There is a market and a bakery near my home.', ['market|bakery|pool|museum|bus|park|school|shop|library', 'near|next|home|house|street']]
        },
        {
          title: 'My LEGO Town Map', titleVi: 'Bản đồ thị trấn LEGO', icon: '📍',
          words: [
            ['opposite', 'prep', '/ˈɒpəzɪt/', 'đối diện', '↔️', 'The bakery is opposite the museum.', 'Tiệm bánh ở đối diện bảo tàng.', 'Two shops face each other across the street.'],
            ['behind', 'prep', '/bɪˈhaɪnd/', 'phía sau', '🔙', 'The swimming pool is behind the school.', 'Bể bơi ở phía sau trường học.', 'At the back of something, so you cannot see it from the front.'],
            ['in front of', 'prep', '/ɪn frʌnt ɒv/', 'phía trước', '⬆️', 'The bus stop is in front of the market.', 'Trạm xe buýt ở phía trước chợ.', 'The opposite of behind: you can see it first.'],
            ['near', 'prep', '/nɪə/', 'gần', '📏', 'My house is near the park.', 'Nhà mình ở gần công viên.', 'Not far away. You can walk there in two minutes.'],
            ['at the end of', 'prep', '/ət ðiː end ɒv/', 'ở cuối (con đường)', '🔚', 'The museum is at the end of the street.', 'Bảo tàng ở cuối con phố.', 'Walk to the very last part of the road and you will find it.']
          ],
          comic: {
            title: 'Where Did the Bakery Go?', titleVi: 'Tiệm bánh biến đi đâu rồi?',
            panels: [
              ['a', 'Look, Mum! My LEGO town map is finished!', 'Mẹ xem này! Bản đồ thị trấn LEGO của con xong rồi!', '🧱'],
              ['b', 'Great! But where is the bakery?', 'Tuyệt! Nhưng tiệm bánh ở đâu nhỉ?', '🥖'],
              ['a', "It's behind the museum. You can't see it!", 'Nó ở phía sau bảo tàng. Mẹ không thấy được đâu!', '🏛️'],
              ['b', 'Hmm, move it opposite the market. Now customers can find it!', 'Hừm, chuyển nó ra đối diện chợ đi. Giờ khách mới tìm thấy!', '🧺']
            ],
            blanks: [[2, 'behind', ['behind', 'inside', 'on top of the sun']], [3, 'opposite', ['opposite', 'under the sea', 'in my pocket']]]
          },
          build: [
            { vi: 'Em muốn nói: Tiệm bánh ở đối diện bảo tàng.', a: ['The bakery', 'is', 'opposite', 'the museum.'], x: ['are', 'behind'] },
            { vi: 'Em muốn chỉ đường: Bảo tàng ở cuối con phố.', a: ['The museum', 'is', 'at the end of', 'the street.'], x: ['am', 'in front of'] }
          ],
          talk: [
            { q: 'What is near your school?', vi: 'Gần trường bạn có gì?', hint: 'There is a bakery near my school.', k: ['bakery|market|park|shop|pool|bus|museum|library|cafe|hospital|post|supermarket|playground|restaurant|bookshop|pharmacy|zoo|cinema|stop|temple|pagoda|lake', 'near|next|opposite|behind|front|beside|close'], c: ['There is a bakery near my school.', 'There are many classrooms in my school.', 'I walk to school with my mum.'] },
            { q: 'What is opposite your house?', vi: 'Đối diện nhà bạn là gì?', hint: 'A small shop is opposite my house.', k: ['shop|park|school|market|cafe|tree|trees|pharmacy|bakery|museum|pool|library|restaurant|hospital|supermarket|temple|pagoda|building|houses|lake', 'opposite|front|across'], c: ['A small shop is opposite my house.', 'A small shop is behind my school.', 'My house is big and yellow.'] }
          ],
          snow: { vi: 'Mô tả vị trí trên bản đồ LEGO', l: [[['opposite'], 'đối diện'], [['The bakery', 'is', 'opposite.'], 'Tiệm bánh ở phía đối diện.'], [['On my map,', 'the bakery', 'is', 'opposite', 'the swimming pool.'], 'Trên bản đồ của mình, tiệm bánh ở đối diện bể bơi.']], x: ['are', 'under'] },
          cb: ['b', 'Your town needs a bus stop. Where can it go?', 'Thị trấn của con cần trạm xe buýt. Đặt ở đâu nhỉ?', [
            ['idea', 'In front of the market, so people can carry their shopping!', 'Phía trước chợ ạ, để mọi người xách đồ đi chợ cho tiện!', 'Very clever, town planner!', 'Thông minh quá, nhà quy hoạch nhí!', '🚏'],
            ['ask', 'Can you help me choose, Mum?', 'Mẹ giúp con chọn được không ạ?', 'Sure! What about near the school?', 'Được chứ! Gần trường học thì sao?', '🏫']]],
          tb: ['b', 'Oops! I knocked over your LEGO museum!', 'Ối! Mẹ làm đổ bảo tàng LEGO của con rồi!', [
            ['calm', "It's okay, Mum. We can build it again together.", 'Không sao đâu mẹ. Mình cùng lắp lại nhé.', 'Thank you for being so kind!', 'Cảm ơn con đã thật tốt bụng!', '🧱'],
            ['idea', 'Now I can make it bigger, with a dinosaur room!', 'Giờ con làm nó to hơn, có cả phòng khủng long!', 'Ha ha! A bigger, better museum!', 'Ha ha! Bảo tàng to hơn, xịn hơn!', '🦖']]],
          fact: ['Most maps show north at the top of the page.', 'Hầu hết các bản đồ đều vẽ hướng Bắc ở phía trên cùng.'],
          tf: [
            ['If the bakery is near your house, you can walk there quickly.', true, 'Yes! Near means not far away.', 'Đúng! Gần nghĩa là không xa.'],
            ['Behind means the same as in front of.', false, 'No! They are opposites. Behind is at the back; in front of is at the front.', 'Sai! Hai từ này trái nghĩa. Behind là phía sau, in front of là phía trước.']
          ],
          qa: ['Can you describe where your house is?', 'Bạn có thể tả nhà bạn ở đâu không?', 'My house is near the market, opposite a bakery.', ['near|opposite|behind|next|front|end', 'market|bakery|park|school|shop|street|road|pool']]
        },
        {
          title: 'Errands for Mum', titleVi: 'Đi việc vặt giúp mẹ', icon: '✉️',
          words: [
            ['post a letter', 'verb', '/pəʊst ə ˈletə/', 'gửi thư', '📮', 'I post a letter to my grandma.', 'Mình gửi thư cho bà.', 'You put an envelope into a red or yellow box so it can travel.'],
            ['stamp', 'noun', '/stæmp/', 'con tem', '🏷️', 'Put a stamp on the envelope, please.', 'Con dán tem lên phong bì nhé.', 'A small picture you stick on an envelope before you send it.'],
            ['buy some medicine', 'verb', '/baɪ sʌm ˈmedsn/', 'mua thuốc', '💊', 'Mum asks me to buy some medicine.', 'Mẹ nhờ mình đi mua thuốc.', 'You do this at a pharmacy when someone in the family is ill.'],
            ['borrow a book', 'verb', '/ˈbɒrəʊ ə bʊk/', 'mượn sách', '📚', 'I borrow a book from the library every week.', 'Tuần nào mình cũng mượn sách ở thư viện.', 'You take it home from the library, then bring it back later.'],
            ['on my way home', 'phrase', '/ɒn maɪ weɪ həʊm/', 'trên đường về nhà', '🏠', 'On my way home, I buy some bread.', 'Trên đường về nhà, mình mua bánh mì.', 'While you are walking back to your house.']
          ],
          comic: {
            title: 'Three Errands, One Bin', titleVi: 'Ba việc vặt, một cậu Bin',
            panels: [
              ['b', 'Bin, can you post a letter and buy some medicine?', 'Bin ơi, con gửi thư và mua thuốc giúp mẹ được không?', '📮'],
              ['a', "Sure! Post office, pharmacy... and what's the third one?", 'Vâng ạ! Bưu điện, hiệu thuốc... còn việc thứ ba là gì ạ?', '🤔'],
              ['b', 'Buy some bread on your way home.', 'Mua bánh mì trên đường về nhà nhé.', '🥖'],
              ['a', 'Mission complete! And I got a stamp for my collection!', 'Hoàn thành nhiệm vụ! Con còn được một con tem để sưu tầm!', '🏷️']
            ],
            blanks: [[0, 'post a letter', ['post a letter', 'eat a letter', 'paint a letter']], [2, 'on your way home', ['on your way home', 'on the moon', 'in your bed']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình mượn sách ở thư viện mỗi tuần.', a: ['I', 'borrow', 'a book', 'from the library', 'every week.'], x: ['borrows', 'from the bakery'] },
            { vi: 'Em muốn hỏi: Con có thể mua thuốc ở đâu ạ?', a: ['Where', 'can I', 'buy', 'some medicine?'], x: ['buys', 'stamp'] }
          ],
          talk: [
            { q: 'Do you help your family with errands?', vi: 'Bạn có giúp gia đình làm việc vặt không?', hint: 'Yes, I buy bread for my mum.', k: ['yes|no|sometimes|often|always|usually|never', 'buy|post|carry|help|get|borrow|shop|shopping|take|clean|wash|errands'], c: ['Yes, I buy bread for my mum.', 'Yes, I play football with my friends.', 'Yes, I go to school by bus.'] },
            { q: 'Where do you post a letter?', vi: 'Bạn gửi thư ở đâu?', hint: 'I post a letter at the post office.', k: ['office|postbox|box|mailbox'], c: ['I post a letter at the post office.', 'I post a letter to my grandma.', 'I post a letter on Monday.'] }
          ],
          snow: { vi: 'Kể về một việc vặt giúp mẹ', l: [[['a letter'], 'một lá thư'], [['I', 'post', 'a letter.'], 'Mình gửi một lá thư.'], [['After school,', 'I', 'post', 'a letter', 'for my mum.'], 'Sau giờ học, mình gửi thư giúp mẹ.']], x: ['posts', 'medicine'] },
          cb: ['b', 'The pharmacy is closed! What can we do?', 'Hiệu thuốc đóng cửa rồi! Mình làm sao đây?', [
            ['idea', "Let's try the other pharmacy at the end of the street.", 'Mình thử hiệu thuốc khác ở cuối phố ạ.', 'Good thinking! Let me get my keys.', 'Nghĩ hay lắm! Để mẹ lấy chìa khóa.', '💊'],
            ['ask', 'Can we phone Auntie Lan? She is a nurse.', 'Mình gọi cô Lan được không ạ? Cô là y tá mà.', "Great idea. She'll know what to do.", 'Ý hay đấy. Cô sẽ biết phải làm gì.', '📞']]],
          tb: ['b', 'Here is fifty thousand dong. The bread costs twenty thousand.', 'Đây là năm mươi nghìn. Bánh mì giá hai mươi nghìn.', [
            ['yes', "Okay! I'll bring back thirty thousand dong change.", 'Vâng! Con sẽ mang về ba mươi nghìn tiền thừa ạ.', "Wow, your maths is great!", 'Oa, con tính nhẩm giỏi quá!', '💵'],
            ['ask', 'Can I buy a small cake with the change?', 'Con mua thêm cái bánh nhỏ bằng tiền thừa được không ạ?', 'Just one small cake. You earned it!', 'Một cái nhỏ thôi nhé. Con xứng đáng mà!', '🧁']]],
          fact: ['The first postage stamp, the Penny Black, came from Britain in 1840.', 'Con tem bưu chính đầu tiên, tem Penny Black, ra đời ở Anh năm 1840.'],
          tf: [
            ['You need a stamp to send a letter by post.', true, 'Yes! The stamp pays for the letter to travel.', 'Đúng! Con tem là tiền trả để lá thư được gửi đi.'],
            ['You borrow a book from the bakery.', false, 'No! You borrow books from a library. A bakery sells bread.', 'Sai! Con mượn sách ở thư viện. Tiệm bánh bán bánh mì.']
          ],
          qa: ['What do you buy on your way home from school?', 'Trên đường đi học về bạn hay mua gì?', 'I buy some bread on my way home.', ['buy|get|have|eat', 'bread|banh|cake|milk|fruit|snack|ice|nothing|drink']]
        }
      ],
      mystery: {
        t: "Bin's Secret Errand", tv: 'Việc vặt bí mật của Bin',
        intro: ['Mum sent Bin to one place in town. Where did he go?', 'Mẹ nhờ Bin đến một nơi trong phố. Bin đã đi đâu?'],
        clues: [['Clue one: The place does not sell food.', 'Manh mối 1: Nơi đó không bán đồ ăn.'],
          ["Clue two: You can't see old coins or dinosaur bones there.", 'Manh mối 2: Ở đó không có tiền xu cổ hay xương khủng long.'],
          ['Clue three: It is opposite the bakery, and you can buy stamps there.', 'Manh mối 3: Nó ở đối diện tiệm bánh và bạn có thể mua tem ở đó.']],
        q: ['Where did Bin go?', 'Bin đã đi đâu?'],
        o: [['the bakery', '🥖', 'tiệm bánh'], ['the museum', '🏛️', 'bảo tàng'], ['the market', '🧺', 'chợ'], ['the post office', '📮', 'bưu điện']], a: 3,
        win: ['Yes! Bin posted Mum\'s letter at the post office!', 'Đúng rồi! Bin đã gửi thư cho mẹ ở bưu điện!']
      }
    },

    /* ---------- WEEK 26: Asking Directions & Traffic Safety ---------- */
    {
      id: 'w26', week: 26, month: 7, monthTitle: M7[0], monthTitleVi: M7[1],
      name: 'Directions & Road Safety', vi: 'Hỏi đường & An toàn giao thông', short: 'Road Safety',
      topic: 'Asking the Way & Staying Safe on the Road', topicVi: 'Hỏi đường, chỉ đường & đi đường an toàn',
      color: '#EAB308', dark: '#A16207', icon: '🚦', model: ['crossing', 'Busy Crossroads', 'Ngã tư nhộn nhịp'],
      chars: { a: { name: 'Na', fig: 'hair-brown|grin|torso-red|legs-blue|flag' }, b: { name: 'Tom', fig: 'hair-blonde|surprised|torso-blue|legs-tan|camera' } },
      chatter: [
        ['Excuse me, how can I get to the river?', 'Xin lỗi, làm sao để đến bờ sông ạ?'],
        ['Look both ways before you cross!', 'Nhìn cả hai phía trước khi qua đường nhé!'],
        ['Walk on the pavement, not on the road.', 'Đi trên vỉa hè, đừng đi dưới lòng đường.'],
        ['Click! Fasten your seatbelt!', 'Tách! Thắt dây an toàn vào nào!'],
        ['Follow me! The lantern shop is this way.', 'Đi theo mình! Cửa hàng đèn lồng ở lối này.']
      ],
      lessons: [
        {
          title: 'Which Way, Please?', titleVi: 'Xin hỏi đường nào?', icon: '🧭',
          words: [
            ['How can I get to...?', 'phrase', '/haʊ kæn aɪ ɡet tuː/', 'Làm sao để tôi đến...?', '❓', 'How can I get to the museum, please?', 'Làm ơn chỉ giúp tôi cách đến bảo tàng?', 'A polite question you ask when you do not know the way.'],
            ['go past', 'verb', '/ɡəʊ pɑːst/', 'đi qua, đi ngang qua', '➡️', 'Go past the bakery and turn left.', 'Đi qua tiệm bánh rồi rẽ trái.', 'You walk next to a place but you do not stop there.'],
            ['cross the road', 'verb', '/krɒs ðə rəʊd/', 'băng qua đường', '🚸', 'Hold my hand when we cross the road.', 'Nắm tay mình khi chúng ta qua đường nhé.', 'You walk from one side of the street to the other side.'],
            ['on your left', 'phrase', '/ɒn jɔː left/', 'ở bên tay trái bạn', '⬅️', "The bank is on your left.", 'Ngân hàng ở bên tay trái bạn.', 'On the side of the hand that is not your right hand.'],
            ["You can't miss it!", 'phrase', '/juː kɑːnt mɪs ɪt/', 'Bạn sẽ thấy ngay thôi!', '👀', "It's a big yellow building. You can't miss it!", 'Đó là tòa nhà to màu vàng. Bạn sẽ thấy ngay thôi!', 'You say this when a place is very easy to see.']
          ],
          comic: {
            title: 'Tom Needs Phở', titleVi: 'Tom cần ăn phở',
            panels: [
              ['b', 'Excuse me, Na. How can I get to the phở shop?', 'Na ơi cho mình hỏi. Làm sao để đến quán phở?', '🍜'],
              ['a', 'Go straight and go past the market.', 'Cứ đi thẳng và đi qua chợ.', '🧺'],
              ['a', "Then cross the road. It's on your left.", 'Rồi băng qua đường. Quán ở bên tay trái bạn.', '⬅️'],
              ['b', "A red sign with a big bowl? You can't miss it!", 'Biển đỏ có cái bát to à? Thấy ngay thôi!', '🪧']
            ],
            blanks: [[1, 'go past', ['go past', 'go to sleep', 'go swimming']], [2, 'cross the road', ['cross the road', 'eat the road', 'paint the road']]]
          },
          build: [
            { vi: 'Em muốn hỏi đường: Làm sao để tôi đến bể bơi ạ?', a: ['How', 'can I', 'get to', 'the swimming pool?'], x: ['gets to', 'Who'] },
            { vi: 'Em muốn chỉ đường: Đi qua chợ rồi rẽ phải.', a: ['Go past', 'the market', 'and', 'turn right.'], x: ['Goes past', 'turn up.'] }
          ],
          talk: [
            { q: 'How can I get to your school from your house?', vi: 'Từ nhà bạn đến trường đi thế nào?', hint: 'Go straight and turn left. It is on your left.', k: ['straight|left|right|past|corner|along|opposite', 'go|turn|walk|cross'], c: ['Go straight and turn left. It is on your left.', 'I go to school by motorbike.', 'It takes ten minutes.'] },
            { q: 'Do you cross the road with a grown-up?', vi: 'Bạn có qua đường cùng người lớn không?', hint: 'Yes, I hold my mum\'s hand.', k: ['yes|no|sometimes|often|always|usually|never', "hand|hold|mum|mum's|dad|dad's|grandma|grandma's|grandpa|grandpa's|adult|grown|parents|sister|brother"], c: ["Yes, I hold my mum's hand.", 'Yes, I wear a helmet on the road.', 'No, I go to school by bus.'] }
          ],
          snow: { vi: 'Chỉ đường cho một người bạn', l: [[['Go past'], 'Đi qua'], [['Go past', 'the bakery', 'first.'], 'Đi qua tiệm bánh trước.'], [['Go past', 'the bakery,', 'cross the road', 'and', 'turn left.'], 'Đi qua tiệm bánh, băng qua đường rồi rẽ trái.']], x: ['Goes past', 'jump'] },
          cb: ['b', 'Na, is the phở shop far? My feet are tired!', 'Na ơi, quán phở có xa không? Chân mình mỏi rồi!', [
            ['calm', 'No, it is just five minutes. You can do it!', 'Không xa đâu, chỉ năm phút. Cố lên!', 'Okay! Phở, here I come!', 'Được! Phở ơi, mình tới đây!', '🍜'],
            ['idea', "Let's take a cyclo! It's fun and slow.", 'Mình đi xích lô đi! Vui mà lại chậm rãi.', 'A cyclo ride? Awesome!', 'Đi xích lô á? Tuyệt quá!', '🛺']]],
          tb: ['b', 'Excuse me, how can I get to the museum?', 'Xin lỗi, làm sao để đến bảo tàng?', [
            ['yes', "Go straight and go past the bank. You can't miss it!", 'Đi thẳng, qua ngân hàng. Bạn sẽ thấy ngay!', 'Thank you! You are very helpful.', 'Cảm ơn bạn! Bạn giúp ích quá.', '🏛️'],
            ['ask', "Sorry, I'm not sure. Let's ask that police officer.", 'Xin lỗi, mình không chắc. Mình hỏi chú công an kia nhé.', 'Good idea. Police officers know every street!', 'Ý hay. Các chú công an biết hết mọi con phố!', '👮']]],
          fact: ['A compass needle always turns to point north.', 'Kim la bàn luôn quay về hướng Bắc.'],
          tf: [
            ['If a place is on your left, you look to your left side.', true, 'Yes! Turn your head to the left and you will see it.', 'Đúng! Quay đầu sang trái là con sẽ thấy.'],
            ['"Go past the bakery" means "go inside the bakery".', false, 'No! Go past means walk by it without stopping.', 'Sai! Go past nghĩa là đi ngang qua, không dừng lại.']
          ],
          qa: ['How do you go to school every day?', 'Hằng ngày bạn đến trường bằng cách nào?', 'I go to school by motorbike with my dad.', ['walk|bike|motorbike|bus|car|foot|taxi|bicycle|cycle|ride|drive|scooter|boat']]
        },
        {
          title: 'Road Safety Heroes', titleVi: 'Siêu anh hùng an toàn giao thông', icon: '🦺',
          words: [
            ['zebra crossing', 'noun', '/ˌzebrə ˈkrɒsɪŋ/', 'vạch kẻ đường cho người đi bộ', '🦓', 'We cross the road at the zebra crossing.', 'Chúng mình qua đường ở vạch kẻ cho người đi bộ.', 'Black and white stripes on the road, like an animal from Africa.'],
            ['pavement', 'noun', '/ˈpeɪvmənt/', 'vỉa hè', '🚶', 'Walk on the pavement, not on the road.', 'Hãy đi trên vỉa hè, đừng đi dưới lòng đường.', 'The safe path for people at the side of the street.'],
            ['look both ways', 'verb', '/lʊk bəʊθ weɪz/', 'nhìn cả hai phía', '👀', 'Look both ways before you cross.', 'Nhìn cả hai phía trước khi qua đường.', 'You turn your head left, then right, to check for cars.'],
            ['wear a helmet', 'verb', '/weər ə ˈhelmɪt/', 'đội mũ bảo hiểm', '⛑️', 'I always wear a helmet on the motorbike.', 'Mình luôn đội mũ bảo hiểm khi đi xe máy.', 'You put a hard hat on your head to keep it safe on a bike.'],
            ['fasten your seatbelt', 'verb', '/ˈfɑːsn jɔː ˈsiːtbelt/', 'thắt dây an toàn', '🚗', 'Please fasten your seatbelt in the car.', 'Hãy thắt dây an toàn khi ngồi ô tô nhé.', 'Click! You do this in a car seat before the car moves.']
          ],
          comic: {
            title: 'Tom and the Busy Street', titleVi: 'Tom và con phố đông đúc',
            panels: [
              ['b', 'Wow, so many motorbikes! How do I cross?', 'Ôi, nhiều xe máy quá! Mình qua đường kiểu gì đây?', '🛵'],
              ['a', "Let's walk to the zebra crossing first.", 'Mình đi ra vạch kẻ đường trước đã.', '🦓'],
              ['a', 'Wait for the green man. Now look both ways!', 'Đợi đèn hình người xanh. Giờ nhìn cả hai phía!', '🚦'],
              ['b', 'Left, right... clear! Walk, not run. Safe!', 'Trái, phải... không có xe! Đi bộ, không chạy. An toàn!', '✅']
            ],
            blanks: [[1, 'zebra crossing', ['zebra crossing', 'zebra sandwich', 'swimming pool']], [2, 'look both ways', ['look both ways', 'close both eyes', 'jump both feet']]]
          },
          build: [
            { vi: 'Em muốn nhắc: Hãy đi trên vỉa hè.', a: ['Please', 'walk', 'on the pavement.'], x: ['walks', 'on the road.'] },
            { vi: 'Em muốn kể: Mình luôn đội mũ bảo hiểm khi đi xe máy.', a: ['I', 'always', 'wear a helmet', 'on the motorbike.'], x: ['wears a helmet', 'never'] }
          ],
          talk: [
            { q: 'What do you do before you cross the road?', vi: 'Bạn làm gì trước khi qua đường?', hint: 'I look both ways.', k: ['look|wait|stop|check|hold|listen', 'ways|left|right|light|lights|hand|cars|green|traffic|both'], c: ['I look both ways.', 'I wear my helmet.', 'I run fast to the other side.'] },
            { q: 'Do you wear a helmet on a motorbike?', vi: 'Bạn có đội mũ bảo hiểm khi đi xe máy không?', hint: 'Yes, I always wear a helmet.', k: ['yes|no|sometimes|often|always|usually|never', 'helmet|helmets'], c: ['Yes, I always wear a helmet.', 'Yes, I always wear a seatbelt.', 'Yes, I sit behind my dad.'] }
          ],
          snow: { vi: 'Nói về một quy tắc an toàn', l: [[['Look both ways!'], 'Nhìn cả hai phía!'], [['We', 'look both ways', 'first.'], 'Chúng mình nhìn cả hai phía trước.'], [['At the zebra crossing,', 'we', 'stop', 'and', 'look both ways.'], 'Ở vạch kẻ đường, chúng mình dừng lại và nhìn cả hai phía.']], x: ['looks', 'run'] },
          cb: ['b', 'This helmet is too big for me. It falls over my eyes!', 'Mũ này to quá. Nó trùm cả mắt mình!', [
            ['idea', 'Let me tighten the strap. Now it fits!', 'Để mình chỉnh lại quai. Giờ vừa rồi!', 'Snug and safe. Thanks, Na!', 'Vừa khít và an toàn. Cảm ơn Na!', '⛑️'],
            ['ask', 'Shall we ask the shop for a smaller one?', 'Mình hỏi cửa hàng lấy cái nhỏ hơn nhé?', 'Yes! A helmet must fit well.', 'Ừ! Mũ bảo hiểm phải vừa đầu mới được.', '🛒']]],
          tb: ['b', 'The car is starting. Can I sit in the front seat?', 'Xe sắp chạy rồi. Mình ngồi ghế trước được không?', [
            ['no', 'No, children sit in the back. Fasten your seatbelt!', 'Không được, trẻ em ngồi ghế sau. Thắt dây an toàn vào!', 'Click! Back seat, safe seat!', 'Tách! Ghế sau, ghế an toàn!', '🚗'],
            ['calm', "Let's sit in the back together and play a word game.", 'Mình cùng ngồi ghế sau và chơi đố chữ nhé.', 'Fun! And I fastened my seatbelt.', 'Vui quá! Mình cũng thắt dây an toàn rồi.', '🔤']]],
          fact: ['The zebra crossing is named after the black and white stripes of a zebra.', 'Vạch kẻ đường "zebra crossing" được đặt tên theo bộ lông sọc đen trắng của ngựa vằn.'],
          tf: [
            ['A helmet can protect your head if you fall off a bike.', true, 'Yes! A helmet keeps your brain safe.', 'Đúng! Mũ bảo hiểm bảo vệ bộ não của con.'],
            ['It is safe to play football on the road.', false, 'No! Roads are for cars and bikes. Play in the park.', 'Sai! Lòng đường dành cho xe cộ. Hãy chơi ở công viên.']
          ],
          qa: ['How do you stay safe on the road?', 'Bạn giữ an toàn khi đi đường thế nào?', 'I wear a helmet and walk on the pavement.', ['wear|walk|look|fasten|hold|wait|cross', 'helmet|pavement|ways|seatbelt|hand|crossing|light|lights']]
        },
        {
          title: 'Lost in Hội An', titleVi: 'Lạc đường ở Hội An', icon: '🏮',
          words: [
            ['tourist', 'noun', '/ˈtʊərɪst/', 'khách du lịch', '🧳', 'A tourist takes photos of the old houses.', 'Một du khách chụp ảnh những ngôi nhà cổ.', 'A visitor who travels to see a new city or country.'],
            ['lost', 'adj', '/lɒst/', 'bị lạc', '😟', "I'm lost! Where is my hotel?", 'Mình bị lạc rồi! Khách sạn của mình đâu nhỉ?', 'You feel this when you do not know where you are.'],
            ['bridge', 'noun', '/brɪdʒ/', 'cây cầu', '🌉', 'We walk over the bridge to the market.', 'Chúng mình đi qua cầu để đến chợ.', 'You walk or drive over it to get to the other side of a river.'],
            ['lantern', 'noun', '/ˈlæntən/', 'đèn lồng', '🏮', 'Hội An has red and yellow lanterns everywhere.', 'Hội An có đèn lồng đỏ vàng ở khắp nơi.', 'A colourful paper or silk light that glows at night.'],
            ['Follow me!', 'phrase', '/ˈfɒləʊ miː/', 'Đi theo mình nhé!', '👣', "Follow me! I know the way.", 'Đi theo mình nhé! Mình biết đường.', 'You say this when you want someone to walk behind you.']
          ],
          comic: {
            title: 'The Lantern Mix-Up', titleVi: 'Nhầm lẫn vì đèn lồng',
            panels: [
              ['b', "Na, I'm lost! All the streets have lanterns!", 'Na ơi, mình lạc rồi! Phố nào cũng có đèn lồng!', '🏮'],
              ['a', "Don't worry. Where is your hotel?", 'Đừng lo. Khách sạn của bạn ở đâu?', '🏨'],
              ['b', "It's near a bridge, opposite a tea shop.", 'Nó ở gần một cây cầu, đối diện một quán trà.', '🌉'],
              ['a', "That's the Japanese Bridge! Follow me!", 'Đó là Chùa Cầu rồi! Đi theo mình nhé!', '👣']
            ],
            blanks: [[0, 'lost', ['lost', 'lunch', 'lemonade']], [3, 'Follow me!', ['Follow me!', 'Eat me!', 'Sleep now!']]]
          },
          build: [
            { vi: 'Em muốn kể: Một du khách đang chụp ảnh cây cầu.', a: ['A tourist', 'is taking', 'photos', 'of the bridge.'], x: ['are taking', 'of the soup.'] },
            { vi: 'Em muốn giúp: Đi theo mình! Mình biết đường.', a: ['Follow me!', 'I', 'know', 'the way.'], x: ['knows', 'Lost'] }
          ],
          talk: [
            { q: 'What do you do if you are lost?', vi: 'Bạn làm gì nếu bị lạc?', hint: 'I stay calm and ask a police officer.', k: ['ask|call|find|tell|look|stay|wait', 'police|officer|guard|adult|grown|shop|mum|dad|help|staff|someone|calm'], c: ['I stay calm and ask a police officer.', 'I walk home by myself.', 'I cry and run around.'] },
            { q: 'Would you like to visit Hội An?', vi: 'Bạn có muốn đến thăm Hội An không?', hint: 'Yes, I want to see the lanterns.', k: ['yes|no|sure|already|visited|maybe', 'lantern|lanterns|bridge|river|town|food|houses|old|boat|boats|street|streets'], c: ['Yes, I want to see the lanterns.', 'Yes, I want to see the snow.', 'Yes, I went to the zoo last week.'] }
          ],
          snow: { vi: 'Giúp một du khách bị lạc', l: [[['Follow me!'], 'Đi theo mình!'], [['Follow me', 'to', 'the bridge.'], 'Đi theo mình đến cây cầu.'], [['Follow me!', 'We', 'can walk', 'over the bridge', 'to your hotel.'], 'Đi theo mình! Chúng ta có thể đi qua cầu đến khách sạn của bạn.']], x: ['Follows', 'swim'] },
          cb: ['b', 'Na, my phone map is not working. What now?', 'Na ơi, bản đồ trên điện thoại hỏng rồi. Giờ sao?', [
            ['idea', "Let's ask the lady at the lantern shop.", 'Mình hỏi cô bán đèn lồng nhé.', 'Good plan! Local people know every corner.', 'Kế hay! Người dân ở đây biết từng góc phố.', '🏮'],
            ['calm', "No problem! Look, there's a big map on that wall.", 'Không sao! Nhìn kìa, có tấm bản đồ to trên tường.', 'Oh yes! We are here, near the river.', 'À đúng rồi! Mình đang ở đây, gần bờ sông.', '🗺️']]],
          tb: ['b', 'Excuse me, I am a tourist. Is this the way to the night market?', 'Xin lỗi, tôi là du khách. Đây có phải đường đến chợ đêm không?', [
            ['yes', "Yes! Go over the bridge. It's on your left.", 'Đúng rồi! Đi qua cầu. Chợ ở bên tay trái.', 'Thank you so much, young guide!', 'Cảm ơn nhiều nhé, hướng dẫn viên nhí!', '🌉'],
            ['ask', "I'm going there too. Would you like to come with us?", 'Mình cũng đến đó. Bạn có muốn đi cùng không?', 'Yes, please! That is so kind.', 'Có chứ! Bạn thật tốt bụng.', '🤝']]],
          fact: ["Hội An's Japanese Covered Bridge is about four hundred years old.", 'Chùa Cầu ở Hội An đã khoảng bốn trăm năm tuổi.'],
          tf: [
            ['A tourist is someone who visits a new place.', true, 'Yes! Tourists travel to see new places.', 'Đúng! Du khách là người đi tham quan nơi mới.'],
            ['If you are lost, you should go with any stranger.', false, 'No! Ask a police officer or a shop worker for help.', 'Sai! Hãy nhờ chú công an hoặc nhân viên cửa hàng giúp đỡ.']
          ],
          qa: ['Have you ever been lost? What happened?', 'Bạn đã bao giờ bị lạc chưa? Chuyện gì đã xảy ra?', 'Yes, I was lost at the market, but a kind lady helped me.', ['yes|no|never|once', 'lost|market|park|mall|shop|helped|found|mum|dad']]
        }
      ],
      mystery: {
        t: "Tom's Missing Hotel", tv: 'Khách sạn thất lạc của Tom',
        intro: ['Tom cannot remember the name of his hotel in Hội An. Help him find it!', 'Tom không nhớ tên khách sạn của mình ở Hội An. Giúp bạn ấy tìm nhé!'],
        clues: [['Clue one: The River Hotel and the Bridge Hotel are next to the river, but Tom\'s hotel is not near the river.', 'Manh mối 1: Khách sạn Bờ Sông và Khách sạn Cây Cầu ở cạnh sông, nhưng khách sạn của Tom không gần sông.'],
          ['Clue two: Tom\'s hotel has no lanterns outside.', 'Manh mối 2: Khách sạn của Tom không treo đèn lồng bên ngoài.'],
          ['Clue three: There is a big tree with yellow fruit in front of it.', 'Manh mối 3: Phía trước khách sạn có một cây to trĩu quả vàng.']],
        q: ["Which is Tom's hotel?", 'Khách sạn của Tom là cái nào?'],
        o: [['the Lantern Hotel', '🏮', 'Khách sạn Đèn Lồng'], ['the River Hotel', '🌊', 'Khách sạn Bờ Sông'], ['the Bridge Hotel', '🌉', 'Khách sạn Cây Cầu'], ['the Mango Hotel', '🥭', 'Khách sạn Cây Xoài']], a: 3,
        win: ['Found it! Tom is home at the Mango Hotel!', 'Tìm ra rồi! Tom đã về đến Khách sạn Cây Xoài!']
      }
    },

    /* ---------- WEEK 27: Community Heroes & Jobs ---------- */
    {
      id: 'w27', week: 27, month: 7, monthTitle: M7[0], monthTitleVi: M7[1],
      name: 'Community Heroes & Jobs', vi: 'Những người hùng quanh em', short: 'Hero Jobs',
      topic: 'Jobs, Tools, Uniforms & Workplaces', topicVi: 'Nghề nghiệp, dụng cụ, đồng phục & nơi làm việc',
      color: '#EF4444', dark: '#B91C1C', icon: '🚒', model: ['firestation', 'Hero Fire Station', 'Trạm cứu hỏa anh hùng'],
      chars: { a: { name: 'Khang', fig: 'cap-detective|determined|torso-detective|legs-blue|magnifier' }, b: { name: 'Captain Lan', fig: 'helmet-fire|cool|torso-fire|legs-black|none' } },
      chatter: [
        ['Job detective on duty! Who uses this tool?', 'Thám tử nghề nghiệp vào việc! Ai dùng dụng cụ này nhỉ?'],
        ['Nee-naw! Hear the siren?', 'Ò í e! Nghe tiếng còi hụ không?'],
        ['The mechanic is fixing a car in the garage.', 'Chú thợ máy đang sửa ô tô trong xưởng.'],
        ['Firefighters climb the long ladder.', 'Lính cứu hỏa trèo lên chiếc thang dài.'],
        ['Heroes work together!', 'Những người hùng cùng nhau làm việc!']
      ],
      lessons: [
        {
          title: 'The Job Detective', titleVi: 'Thám tử nghề nghiệp', icon: '🔍',
          words: [
            ['police officer', 'noun', '/pəˈliːs ˌɒfɪsə/', 'cảnh sát, công an', '👮', 'The police officer helps lost children.', 'Chú công an giúp các bạn nhỏ bị lạc.', 'This person keeps our streets safe and catches thieves.'],
            ['engineer', 'noun', '/ˌendʒɪˈnɪə/', 'kỹ sư', '👷', 'An engineer builds strong bridges.', 'Kỹ sư xây những cây cầu chắc chắn.', 'This person plans and builds bridges, roads and machines.'],
            ['mechanic', 'noun', '/məˈkænɪk/', 'thợ sửa máy, thợ sửa xe', '🔧', 'The mechanic fixes my dad\'s motorbike.', 'Chú thợ sửa chiếc xe máy của bố.', 'This person repairs cars and motorbikes with a big wrench.'],
            ['hairdresser', 'noun', '/ˈheədresə/', 'thợ cắt tóc', '💇', 'The hairdresser cuts my hair short.', 'Cô thợ cắt tóc cắt tóc mình ngắn.', 'This person uses scissors and a comb to give you a new look.'],
            ['postman', 'noun', '/ˈpəʊstmən/', 'người đưa thư', '📬', 'The postman brings letters to our house.', 'Chú đưa thư mang thư đến nhà mình.', 'This person brings letters and parcels to your door.']
          ],
          comic: {
            title: 'Guess the Uniform', titleVi: 'Đoán bộ đồng phục',
            panels: [
              ['b', 'Detective Khang! Whose tools are these: a wrench and an oily cloth?', 'Thám tử Khang! Đây là đồ của ai: cờ lê và một mảnh giẻ dính dầu?', '🔧'],
              ['a', "Easy! They belong to a mechanic.", 'Dễ ạ! Chúng là của thợ sửa xe.', '🚗'],
              ['b', 'Correct! Now: a comb, scissors and a big mirror?', 'Chính xác! Còn: lược, kéo và một cái gương to?', '🪞'],
              ['a', "That's a hairdresser! Case closed!", 'Là thợ cắt tóc! Vụ án khép lại!', '💇']
            ],
            blanks: [[1, 'mechanic', ['mechanic', 'magician', 'mango']], [3, 'hairdresser', ['hairdresser', 'hair dryer', 'hippo']]]
          },
          build: [
            { vi: 'Em muốn nói: Chú thợ máy sửa ô tô.', a: ['The mechanic', 'fixes', 'cars', 'in a garage.'], x: ['fix', 'in a bakery.'] },
            { vi: 'Em muốn kể: Chú đưa thư mang thư đến nhà mình mỗi sáng.', a: ['The postman', 'brings', 'letters', 'every morning.'], x: ['bring', 'pizzas'] }
          ],
          talk: [
            { q: 'Which job do you think is the most exciting?', vi: 'Bạn nghĩ nghề nào thú vị nhất?', hint: 'I think a police officer has an exciting job.', k: ['police|engineer|mechanic|hairdresser|postman|firefighter|pilot|vet|doctor|chef|astronaut|teacher|nurse|scientist|officer|driver|farmer|singer|footballer|detective|inventor', 'exciting|think|cool|best|like|love|fun'], c: ['I think a police officer has an exciting job.', 'A police officer works at the police station.', 'I think football is very exciting.'] },
            { q: 'Who cuts your hair?', vi: 'Ai cắt tóc cho bạn?', hint: 'A hairdresser cuts my hair.', k: ['hairdresser|mum|dad|grandma|barber|aunt|uncle|grandpa|sister|brother|mother|father', 'cut|cuts|cutting'], c: ['A hairdresser cuts my hair.', 'My mum washes my hair.', 'A hairdresser works in a salon.'] }
          ],
          snow: { vi: 'Giới thiệu một nghề', l: [[['an engineer'], 'một kỹ sư'], [['She', 'is', 'an engineer.'], 'Cô ấy là kỹ sư.'], [['My aunt', 'is', 'an engineer', 'and', 'she builds bridges.'], 'Dì mình là kỹ sư và dì xây cầu.']], x: ['are', 'eats'] },
          cb: ['b', 'Khang, can you guess my job from my helmet?', 'Khang ơi, đoán xem cô làm nghề gì qua cái mũ này?', [
            ['yes', "You're a firefighter! Your helmet is so shiny!", 'Cô là lính cứu hỏa! Mũ của cô bóng quá!', 'Right! Want to visit my fire station?', 'Đúng rồi! Muốn đến thăm trạm cứu hỏa của cô không?', '🚒'],
            ['ask', 'Can I have one more clue, please?', 'Cô cho con thêm một gợi ý được không ạ?', 'Okay: I use water and a long ladder.', 'Được: cô dùng nước và một cái thang dài.', '🪜']]],
          tb: ['b', 'The postman left a parcel for your neighbour. What will you do?', 'Chú đưa thư để quên bưu kiện của nhà hàng xóm. Con sẽ làm gì?', [
            ['yes', "I'll take it next door after dinner.", 'Con sẽ mang sang nhà bên sau bữa tối.', 'What a helpful neighbour you are!', 'Con đúng là người hàng xóm tốt bụng!', '📦'],
            ['ask', 'I will ask Mum to come with me first.', 'Con sẽ nhờ mẹ đi cùng trước đã.', 'Smart and safe. Good thinking!', 'Thông minh và an toàn. Nghĩ hay lắm!', '👩']]],
          fact: ['Police dogs can smell things that a human nose cannot smell at all.', 'Chó nghiệp vụ có thể ngửi thấy những mùi mà mũi người hoàn toàn không ngửi được.'],
          tf: [
            ['A mechanic repairs cars and motorbikes.', true, 'Yes! Mechanics fix engines and wheels.', 'Đúng! Thợ máy sửa động cơ và bánh xe.'],
            ['A hairdresser brings letters to your house.', false, 'No! A postman brings letters. A hairdresser cuts hair.', 'Sai! Người đưa thư mang thư. Thợ cắt tóc thì cắt tóc.']
          ],
          qa: ['What job does someone in your family do?', 'Một người trong gia đình bạn làm nghề gì?', 'My uncle is an engineer. He builds roads.', ['mum|dad|uncle|aunt|grandpa|grandma|brother|sister|cousin', 'engineer|mechanic|teacher|doctor|police|driver|farmer|nurse|worker|cook|officer']]
        },
        {
          title: 'A Day at the Fire Station', titleVi: 'Một ngày ở trạm cứu hỏa', icon: '🚒',
          words: [
            ['fire engine', 'noun', '/ˈfaɪər ˌendʒɪn/', 'xe cứu hỏa', '🚒', 'The fire engine is big and red.', 'Xe cứu hỏa to và màu đỏ.', 'A big truck that carries water and heroes to a fire.'],
            ['ladder', 'noun', '/ˈlædə/', 'cái thang', '🪜', 'She climbs the ladder to save a cat.', 'Cô ấy trèo thang để cứu chú mèo.', 'You climb up its steps to reach a high window.'],
            ['hose', 'noun', '/həʊz/', 'vòi phun nước', '🧯', 'The firefighter holds a long hose.', 'Chú lính cứu hỏa cầm một vòi nước dài.', 'A long tube that sprays lots of water.'],
            ['siren', 'noun', '/ˈsaɪərən/', 'còi hụ', '🚨', 'The siren is very loud: nee-naw!', 'Còi hụ kêu rất to: ò í e!', 'A very loud sound that tells cars to move out of the way.'],
            ['put out a fire', 'verb', '/pʊt aʊt ə ˈfaɪə/', 'dập lửa', '💦', 'Firefighters put out a fire with water.', 'Lính cứu hỏa dập lửa bằng nước.', 'You stop the flames so they are gone.']
          ],
          comic: {
            title: 'Nee-Naw Alarm!', titleVi: 'Báo động ò í e!',
            panels: [
              ['b', 'Welcome, Khang! This is our fire engine.', 'Chào mừng Khang! Đây là xe cứu hỏa của chúng ta.', '🚒'],
              ['a', 'Wow! Can I touch the long hose?', 'Oa! Con chạm vào cái vòi nước dài được không ạ?', '🧯'],
              ['b', 'Sure! Oh, listen! The siren! A cat is stuck in a tree!', 'Được chứ! Ôi, nghe kìa! Còi hụ! Có chú mèo mắc kẹt trên cây!', '🚨'],
              ['a', 'Quick! Get the ladder! Go, team, go!', 'Nhanh lên! Lấy thang đi! Tiến lên, đội ơi!', '🐱']
            ],
            blanks: [[1, 'hose', ['hose', 'horse', 'house']], [3, 'ladder', ['ladder', 'lemon', 'ladybird']]]
          },
          build: [
            { vi: 'Em muốn kể: Lính cứu hỏa dập lửa bằng nước.', a: ['Firefighters', 'put out', 'fires', 'with water.'], x: ['puts out', 'with juice.'] },
            { vi: 'Em muốn nói: Cô ấy trèo thang để cứu chú mèo.', a: ['She', 'climbs', 'the ladder', 'to save a cat.'], x: ['climb', 'the hose'] }
          ],
          talk: [
            { q: 'What colour is a fire engine in Vietnam?', vi: 'Xe cứu hỏa ở Việt Nam màu gì?', hint: 'It is red.', k: ['red'], c: ['It is red.', 'It is big and fast.', 'It is yellow.'] },
            { q: 'What do you do if you hear a fire alarm?', vi: 'Bạn làm gì khi nghe chuông báo cháy?', hint: 'I stay calm and go outside quickly.', k: ['outside|out|exit|leave|downstairs|teacher|line|street'], c: ['I stay calm and go outside quickly.', 'I hide under my bed.', 'I stay in my classroom.'] }
          ],
          snow: { vi: 'Kể về lính cứu hỏa', l: [[['the hose'], 'vòi nước'], [['Firefighters', 'use', 'the hose.'], 'Lính cứu hỏa dùng vòi nước.'], [['Firefighters', 'use', 'the hose', 'to put out', 'big fires.'], 'Lính cứu hỏa dùng vòi nước để dập những đám cháy lớn.']], x: ['uses', 'small cats'] },
          cb: ['b', 'Would you like to sit in the fire engine, Khang?', 'Khang có muốn ngồi vào xe cứu hỏa không?', [
            ['yes', 'Yes, please! Can I press the siren button?', 'Có ạ! Con bấm nút còi hụ được không?', 'Just once! Nee-naw!', 'Một lần thôi nhé! Ò í e!', '🚨'],
            ['ask', 'Can I take a photo with you first?', 'Con chụp ảnh với cô trước được không ạ?', 'Of course! Say "hero"!', 'Tất nhiên! Cùng nói "người hùng" nào!', '📸']]],
          tb: ['b', 'Firefighters must practise every day. Want to try our drill?', 'Lính cứu hỏa phải luyện tập mỗi ngày. Con muốn thử bài tập không?', [
            ['yes', "Yes! I'll put on the helmet super fast!", 'Có ạ! Con sẽ đội mũ thật nhanh!', 'Ten seconds! You are a natural!', 'Mười giây! Con có năng khiếu đấy!', '⏱️'],
            ['calm', "I'll watch first and learn the steps.", 'Con sẽ xem trước để học các bước.', 'Good idea. Watching is learning too.', 'Ý hay. Quan sát cũng là học mà.', '👀']]],
          fact: ['Firefighters practise putting on their gear very fast – often in just one or two minutes!', 'Lính cứu hỏa luyện mặc đồ bảo hộ thật nhanh – thường chỉ trong một đến hai phút!'],
          tf: [
            ['Fire engines use sirens so cars move out of the way.', true, 'Yes! The loud siren says: please let us pass!', 'Đúng! Tiếng còi to báo hiệu: xin hãy nhường đường!'],
            ['You should hide in a cupboard if there is a fire.', false, 'No! Get out quickly and tell a grown-up.', 'Sai! Hãy ra ngoài thật nhanh và báo cho người lớn.']
          ],
          qa: ['Would you like to visit a fire station? Why?', 'Bạn có muốn đến thăm trạm cứu hỏa không? Vì sao?', 'Yes, because I want to see the fire engine.', ['yes|no|sure', 'engine|truck|ladder|hose|firefighters|siren|helmet|station']]
        },
        {
          title: 'Where Do Heroes Work?', titleVi: 'Người hùng làm việc ở đâu?', icon: '🏢',
          words: [
            ['police station', 'noun', '/pəˈliːs ˌsteɪʃn/', 'đồn công an', '🚓', 'We took the lost wallet to the police station.', 'Chúng mình mang chiếc ví bị rơi đến đồn công an.', 'Officers work in this building and you can ask them for help.'],
            ['garage', 'noun', '/ˈɡærɑːʒ/', 'xưởng sửa xe', '🛠️', 'The mechanic works in a garage.', 'Thợ máy làm việc trong xưởng sửa xe.', 'A place where cars are fixed, full of tools and oil.'],
            ['construction site', 'noun', '/kənˈstrʌkʃn saɪt/', 'công trường xây dựng', '🏗️', 'The construction site has a tall crane.', 'Công trường có một cần cẩu cao.', 'Builders and engineers work here to make a new building.'],
            ['uniform', 'noun', '/ˈjuːnɪfɔːm/', 'đồng phục', '🦺', 'Police officers wear a green uniform in Vietnam.', 'Ở Việt Nam, công an mặc đồng phục màu xanh.', 'Special clothes that show what job you do.'],
            ['work together', 'verb', '/wɜːk təˈɡeðə/', 'cùng nhau làm việc', '🤝', 'Firefighters work together to save people.', 'Lính cứu hỏa cùng nhau làm việc để cứu người.', 'Many people help each other to finish a job.']
          ],
          comic: {
            title: 'The Lost Wallet', titleVi: 'Chiếc ví bị đánh rơi',
            panels: [
              ['a', 'Captain Lan, I found a wallet near the garage!', 'Cô Lan ơi, con nhặt được một chiếc ví gần xưởng sửa xe!', '👛'],
              ['b', "Great job! Let's take it to the police station.", 'Giỏi lắm! Mình mang nó đến đồn công an nhé.', '🚓'],
              ['a', 'Look! An officer in a green uniform!', 'Nhìn kìa! Một chú công an mặc đồng phục xanh!', '👮'],
              ['b', 'Heroes work together. Now the owner can get it back!', 'Người hùng cùng nhau làm việc. Giờ chủ ví sẽ lấy lại được!', '🤝']
            ],
            blanks: [[1, 'police station', ['police station', 'swimming pool', 'ice cream shop']], [2, 'uniform', ['uniform', 'unicorn', 'umbrella']]]
          },
          build: [
            { vi: 'Em muốn nói: Kỹ sư làm việc ở công trường.', a: ['Engineers', 'work', 'at a construction site.'], x: ['works', 'at a bakery.'] },
            { vi: 'Em muốn kể: Những người hùng cùng nhau làm việc mỗi ngày.', a: ['Heroes', 'work together', 'every day.'], x: ['works together', 'never'] }
          ],
          talk: [
            { q: 'Where does a mechanic work?', vi: 'Thợ sửa xe làm việc ở đâu?', hint: 'A mechanic works in a garage.', k: ['garage|workshop|repair'], c: ['A mechanic works in a garage.', 'A mechanic works in a hospital.', 'A mechanic fixes cars and bikes.'] },
            { q: 'Do you wear a uniform at school?', vi: 'Bạn có mặc đồng phục khi đi học không?', hint: 'Yes, I wear a white shirt and blue shorts.', k: ['yes|no|sometimes|always|usually|every', 'uniform|shirt|skirt|shorts|trousers|tie|white|blue|scarf'], c: ['Yes, I wear a white shirt and blue shorts.', 'Yes, I wear a helmet on my bike.', 'No, I wear my pyjamas at home.'] }
          ],
          snow: { vi: 'Kể về nơi làm việc', l: [[['a garage'], 'xưởng sửa xe'], [['Mechanics', 'work', 'in a garage.'], 'Thợ máy làm việc trong xưởng.'], [['In a garage,', 'mechanics', 'work together', 'to fix', 'cars and motorbikes.'], 'Trong xưởng, các thợ máy cùng nhau sửa ô tô và xe máy.']], x: ['works', 'bread'] },
          cb: ['b', 'Khang, the construction site is noisy. Do you want to go closer?', 'Khang ơi, công trường ồn lắm. Con có muốn lại gần không?', [
            ['no', 'No, thanks. It is not safe without a hard hat.', 'Dạ thôi ạ. Không đội mũ bảo hộ thì không an toàn.', 'Very wise, little engineer!', 'Rất khôn ngoan, kỹ sư nhí!', '⛑️'],
            ['ask', 'Can we watch the crane from here?', 'Mình đứng đây xem cần cẩu được không ạ?', 'Yes! Look, it lifts the steel up high.', 'Được! Xem kìa, nó nâng thép lên cao.', '🏗️']]],
          tb: ['b', 'Who is your community hero, Khang?', 'Người hùng trong khu phố của con là ai, Khang?', [
            ['yes', 'Our street cleaner! She keeps our street tidy every morning.', 'Cô lao công! Sáng nào cô cũng giữ phố sạch sẽ.', 'Yes! Every job helps our town.', 'Đúng vậy! Nghề nào cũng giúp ích cho thị trấn.', '🧹'],
            ['idea', "You! And I'm going to make you a thank-you card.", 'Là cô ạ! Con sẽ làm tặng cô một tấm thiệp cảm ơn.', 'Oh, that makes my heart warm!', 'Ôi, cô thấy ấm lòng quá!', '💌']]],
          fact: ['A big tower crane can lift as much as three elephants!', 'Một cần cẩu tháp lớn có thể nâng nặng ngang ba chú voi!'],
          tf: [
            ['Builders and engineers work at a construction site.', true, 'Yes! They work together to make buildings.', 'Đúng! Họ cùng nhau xây dựng các tòa nhà.'],
            ['A garage is a place to buy medicine.', false, 'No! You buy medicine at a pharmacy. Cars are fixed in a garage.', 'Sai! Con mua thuốc ở hiệu thuốc. Xe được sửa ở xưởng.']
          ],
          qa: ['Who is a hero in your neighbourhood? Why?', 'Ai là người hùng ở khu phố bạn? Vì sao?', 'The street cleaner is a hero because she keeps our street clean.', ['cleaner|police|officer|postman|doctor|nurse|mum|dad|teacher|guard|firefighter|mechanic', 'because|helps|keeps|saves|works']]
        }
      ],
      mystery: {
        t: 'The Forgotten Toolbox', tv: 'Hộp dụng cụ bị bỏ quên',
        intro: ['Someone left a toolbox at the fire station. Whose is it?', 'Ai đó để quên hộp dụng cụ ở trạm cứu hỏa. Nó là của ai?'],
        clues: [["Clue one: The owner doesn't work at a police station.", 'Manh mối 1: Chủ nhân không làm việc ở đồn công an.'],
          ["Clue two: The owner doesn't cut hair.", 'Manh mối 2: Chủ nhân không cắt tóc.'],
          ['Clue three: The owner works in a garage, not at a construction site.', 'Manh mối 3: Chủ nhân làm việc trong xưởng sửa xe, không phải ở công trường.']],
        q: ['Who left the toolbox?', 'Ai đã để quên hộp dụng cụ?'],
        o: [['the police officer', '👮', 'chú công an'], ['the hairdresser', '💇', 'cô thợ cắt tóc'], ['the engineer', '👷', 'cô kỹ sư'], ['the mechanic', '🔧', 'chú thợ sửa xe']], a: 3,
        win: ['Case closed! The mechanic gets his toolbox back. Thanks, detective!', 'Vụ án khép lại! Chú thợ sửa xe đã lấy lại hộp dụng cụ. Cảm ơn thám tử!']
      }
    },

    /* ---------- WEEK 28: My Future Dreams & Why ---------- */
    {
      id: 'w28', week: 28, month: 7, monthTitle: M7[0], monthTitleVi: M7[1],
      name: 'My Future Dreams & Why', vi: 'Ước mơ tương lai & lý do', short: 'Future Dreams',
      topic: 'Dream Jobs, Skills & Reasons', topicVi: 'Nghề mơ ước, kỹ năng & lý do vì sao',
      color: '#8B5CF6', dark: '#6D28D9', icon: '🚀', model: ['rocket', 'Dream Rocket', 'Tên lửa ước mơ'],
      chars: { a: { name: 'Mai', fig: 'helmet-astro|grin|torso-astro|legs-white|flag' }, b: { name: 'Grandpa Tư', fig: 'none-hat|wink|torso-blue|legs-tan|book' } },
      chatter: [
        ['When I grow up, I want to be an inventor!', 'Lớn lên, mình muốn làm nhà phát minh!'],
        ["I'm good at drawing and building.", 'Mình giỏi vẽ và lắp ráp.'],
        ['Be brave and never give up!', 'Hãy dũng cảm và đừng bao giờ bỏ cuộc!'],
        ['Grandpa, what was your dream when you were young?', 'Ông ơi, hồi nhỏ ông mơ ước làm gì ạ?'],
        ['3, 2, 1... Blast off, dream rocket!', '3, 2, 1... Phóng lên nào, tên lửa ước mơ!']
      ],
      lessons: [
        {
          title: 'When I Grow Up', titleVi: 'Khi em lớn lên', icon: '🌟',
          words: [
            ['when I grow up', 'phrase', '/wen aɪ ɡrəʊ ʌp/', 'khi em lớn lên', '🌱', 'When I grow up, I want to fly a plane.', 'Khi lớn lên, mình muốn lái máy bay.', 'You say this to talk about the time when you are an adult.'],
            ['I want to be', 'phrase', '/aɪ wɒnt tə biː/', 'em muốn trở thành', '💭', 'I want to be a scientist.', 'Mình muốn trở thành nhà khoa học.', 'You use these words to say your dream job.'],
            ['inventor', 'noun', '/ɪnˈventə/', 'nhà phát minh', '💡', 'An inventor makes new machines.', 'Nhà phát minh chế tạo những cỗ máy mới.', 'This person has new ideas and makes things nobody had before.'],
            ['dream job', 'noun', '/driːm dʒɒb/', 'nghề mơ ước', '✨', 'My dream job is a zookeeper.', 'Nghề mơ ước của mình là người chăm sóc thú.', 'The work you hope to do one day more than any other.'],
            ['because I want to', 'phrase', '/bɪˈkɒz aɪ wɒnt tuː/', 'vì em muốn', '❤️', 'I want to be a vet because I want to help animals.', 'Mình muốn làm bác sĩ thú y vì mình muốn giúp đỡ động vật.', 'You use these words to give the reason for your dream.']
          ],
          comic: {
            title: 'The Robot Mango Picker', titleVi: 'Rô-bốt hái xoài',
            panels: [
              ['b', 'Mai, what do you want to be when you grow up?', 'Mai ơi, lớn lên con muốn làm nghề gì?', '👴'],
              ['a', 'I want to be an inventor, Grandpa!', 'Con muốn làm nhà phát minh, ông ạ!', '💡'],
              ['b', 'An inventor? What will you make?', 'Nhà phát minh à? Con sẽ chế tạo gì?', '🤔'],
              ['a', 'A robot mango picker, because I want to help you!', 'Một rô-bốt hái xoài, vì con muốn giúp ông!', '🥭']
            ],
            blanks: [[1, 'inventor', ['inventor', 'invitation', 'elephant']], [3, 'because I want to', ['because I want to', 'but I never', 'so I sleep']]]
          },
          build: [
            { vi: 'Em muốn nói: Khi lớn lên, mình muốn trở thành nhà phát minh.', a: ['When I grow up,', 'I', 'want to be', 'an inventor.'], x: ['wants to be', 'a inventor.'] },
            { vi: 'Em muốn giải thích: Mình muốn làm bác sĩ thú y vì mình muốn giúp động vật.', a: ['I', 'want to be', 'a vet', 'because I want to help animals.'], x: ['wanting', 'because I want to eat animals.'] }
          ],
          talk: [
            { q: 'What do you want to be when you grow up?', vi: 'Lớn lên bạn muốn làm nghề gì?', hint: 'I want to be an inventor.', k: ['inventor|scientist|astronaut|doctor|teacher|engineer|pilot|vet|chef|artist|programmer|singer|footballer|police|designer|architect|nurse|firefighter|farmer|dancer|detective|cook|driver|officer|writer'], c: ['I want to be an inventor.', 'I want to be tall and strong.', 'I like playing football.'] },
            { q: 'Why do you want that job?', vi: 'Tại sao bạn muốn làm nghề đó?', hint: 'Because I want to help people.', k: ['because|want|like|love', 'help|people|animals|make|build|travel|fly|create|children|space|invent|save|teach|cook|draw|sick|fix|things'], c: ['Because I want to help people.', 'I want to be a doctor.', 'Because I am nine years old.'] }
          ],
          snow: { vi: 'Kể về ước mơ của em', l: [[['an inventor'], 'nhà phát minh'], [['I', 'want to be', 'an inventor.'], 'Mình muốn làm nhà phát minh.'], [['When I grow up,', 'I', 'want to be', 'an inventor', 'because I love new ideas.'], 'Khi lớn lên, mình muốn làm nhà phát minh vì mình yêu những ý tưởng mới.']], x: ['wants', 'old shoes'] },
          cb: ['b', 'Your friend Bin says inventors are boring. What do you say?', 'Bạn Bin bảo nhà phát minh chán lắm. Con nói gì?', [
            ['calm', "That's okay. Everyone has a different dream.", 'Không sao ạ. Mỗi người có một ước mơ khác nhau.', 'Wise words, Mai! Dreams are all different.', 'Nói hay lắm, Mai! Ước mơ thì mỗi người mỗi khác.', '🌈'],
            ['idea', "I'll show him my robot. Then he will see!", 'Con sẽ cho bạn xem rô-bốt của con. Rồi bạn sẽ thấy!', 'Ha ha! Show, don\'t tell!', 'Ha ha! Làm cho xem thay vì nói!', '🤖']]],
          tb: ['b', 'Do you think your dream will change one day?', 'Con có nghĩ một ngày ước mơ của con sẽ thay đổi không?', [
            ['yes', 'Maybe! Last year I wanted to be a chef.', 'Có thể ạ! Năm ngoái con còn muốn làm đầu bếp cơ.', "That's normal. Dreams grow with you!", 'Bình thường thôi. Ước mơ lớn lên cùng con mà!', '👩‍🍳'],
            ['no', 'No! I will always love inventing things.', 'Không ạ! Con sẽ luôn thích phát minh.', 'Then keep building, little inventor!', 'Vậy thì cứ lắp ráp tiếp nhé, nhà phát minh nhí!', '🔧']]],
          fact: ['Phạm Tuân became the first Vietnamese person in space in 1980.', 'Phạm Tuân trở thành người Việt Nam đầu tiên bay vào vũ trụ năm 1980.'],
          tf: [
            ['An inventor makes new things.', true, 'Yes! Inventors turn new ideas into real things.', 'Đúng! Nhà phát minh biến ý tưởng mới thành đồ vật thật.'],
            ['You must choose your dream job today and never change it.', false, 'No! Many people change their dreams as they grow.', 'Sai! Nhiều người thay đổi ước mơ khi lớn lên.']
          ],
          qa: ['What is your dream job and why?', 'Nghề mơ ước của bạn là gì và vì sao?', 'My dream job is a vet because I want to help animals.', ['vet|inventor|scientist|astronaut|doctor|teacher|engineer|pilot|chef|artist|programmer|singer|footballer|architect|job', 'because|want|help|love|like']]
        },
        {
          title: 'My Super Skills', titleVi: 'Siêu kỹ năng của em', icon: '💪',
          words: [
            ["I'm good at", 'phrase', '/aɪm ɡʊd æt/', 'em giỏi về', '👍', "I'm good at drawing robots.", 'Mình giỏi vẽ rô-bốt.', 'You say this to tell people about something you do well.'],
            ['creative', 'adj', '/kriˈeɪtɪv/', 'sáng tạo', '🎨', 'Mai is creative. She builds LEGO dragons.', 'Mai rất sáng tạo. Bạn ấy lắp rồng LEGO.', 'Someone with lots of new and colourful ideas.'],
            ['brave', 'adj', '/breɪv/', 'dũng cảm', '🦁', 'Firefighters are brave.', 'Lính cứu hỏa rất dũng cảm.', 'Someone who does scary things to help others.'],
            ['patient', 'adj', '/ˈpeɪʃnt/', 'kiên nhẫn', '🐢', 'A good teacher is patient.', 'Một giáo viên giỏi thì kiên nhẫn.', 'Someone who can wait calmly and does not get angry.'],
            ['hard-working', 'adj', '/ˌhɑːd ˈwɜːkɪŋ/', 'chăm chỉ', '🐝', 'My mum is very hard-working.', 'Mẹ mình rất chăm chỉ.', 'Someone who works a lot and does not give up, like a busy bee.']
          ],
          comic: {
            title: 'The Skill Rocket', titleVi: 'Tên lửa kỹ năng',
            panels: [
              ['a', "Grandpa, an astronaut must be brave, right?", 'Ông ơi, phi hành gia phải dũng cảm, đúng không ạ?', '🚀'],
              ['b', 'Yes! And patient. Space trips are very long.', 'Đúng! Và kiên nhẫn nữa. Chuyến bay vũ trụ rất dài.', '⏳'],
              ['a', "I'm good at puzzles. I'm patient too!", 'Con giỏi giải đố. Con cũng kiên nhẫn nữa!', '🧩'],
              ['b', 'And you are hard-working. Your skill rocket is ready!', 'Và con chăm chỉ. Tên lửa kỹ năng của con sẵn sàng rồi!', '🌟']
            ],
            blanks: [[0, 'brave', ['brave', 'bread', 'sleepy']], [3, 'hard-working', ['hard-working', 'hard-boiled', 'lazy-sleeping']]]
          },
          build: [
            { vi: 'Em muốn nói: Mình giỏi vẽ rô-bốt.', a: ["I'm", 'good at', 'drawing', 'robots.'], x: ['good in', 'draw'] },
            { vi: 'Em muốn kể: Lính cứu hỏa dũng cảm và chăm chỉ.', a: ['Firefighters', 'are', 'brave', 'and hard-working.'], x: ['is', 'and lazy.'] }
          ],
          talk: [
            { q: 'What are you good at?', vi: 'Bạn giỏi về điều gì?', hint: "I'm good at drawing.", k: ['good|great|best|well', 'drawing|maths|singing|dancing|swimming|building|lego|english|reading|football|running|cooking|chess|painting|coding|draw|sing|dance|swim|cook|run|science|music|art'], c: ["I'm good at drawing.", "I'm bad at singing.", 'I like eating ice cream.'] },
            { q: 'Are you patient or do you get angry quickly?', vi: 'Bạn kiên nhẫn hay dễ nổi nóng?', hint: "I'm quite patient.", k: ['patient|angry|calm|quickly|cross|mad|upset|impatient'], c: ["I'm quite patient.", "I'm nine years old.", "I'm good at drawing."] }
          ],
          snow: { vi: 'Khoe kỹ năng của em', l: [[['creative'], 'sáng tạo'], [['I', 'am', 'creative.'], 'Mình sáng tạo.'], [['I', 'am', 'creative', 'and', "I'm good at building."], 'Mình sáng tạo và mình giỏi lắp ráp.']], x: ['is', 'lazy'] },
          cb: ['b', 'This LEGO rocket keeps falling down. Do you want to stop?', 'Tên lửa LEGO cứ đổ hoài. Con có muốn dừng không?', [
            ['no', "No way! I'm patient. I'll try again.", 'Không đời nào! Con kiên nhẫn mà. Con sẽ thử lại.', "That's the spirit of an inventor!", 'Đó chính là tinh thần của nhà phát minh!', '🧱'],
            ['idea', "Let's make the bottom wider. Then it will stand!", 'Mình làm đáy rộng hơn đi ạ. Thế là nó đứng vững!', 'So creative! Engineers think like that.', 'Sáng tạo quá! Kỹ sư cũng nghĩ như vậy đấy.', '🚀']]],
          tb: ['b', 'Your friend is scared to sing on stage. What do you say?', 'Bạn con sợ hát trên sân khấu. Con sẽ nói gì?', [
            ['calm', "Be brave! I'll stand next to you.", 'Dũng cảm lên! Mình sẽ đứng cạnh bạn.', 'What a kind and brave friend!', 'Đúng là người bạn tốt bụng và dũng cảm!', '🎤'],
            ['idea', "Let's practise together first. Practice helps!", 'Mình cùng tập trước nhé. Luyện tập sẽ giúp ích!', 'Great idea! Practice makes it easier.', 'Ý hay! Luyện tập làm mọi thứ dễ hơn.', '🎶']]],
          fact: ['Every time you practise a skill, your brain builds stronger connections.', 'Mỗi lần con luyện tập một kỹ năng, não con tạo ra những kết nối mạnh hơn.'],
          tf: [
            ['A patient person can wait calmly.', true, 'Yes! Patient people stay calm while they wait.', 'Đúng! Người kiên nhẫn vẫn bình tĩnh khi chờ đợi.'],
            ['Brave means you are scared of everything.', false, 'No! Brave people do hard things even when they feel scared.', 'Sai! Người dũng cảm vẫn làm việc khó dù thấy sợ.']
          ],
          qa: ['Which word describes you best: creative, brave, patient or hard-working?', 'Từ nào miêu tả bạn đúng nhất: sáng tạo, dũng cảm, kiên nhẫn hay chăm chỉ?', "I'm creative because I love drawing.", ['creative|brave|patient|hard|working|kind', 'because|love|like|good|always']]
        },
        {
          title: 'Dream Interviews & Rocket Show', titleVi: 'Phỏng vấn ước mơ & Trình diễn tên lửa', icon: '🎤',
          words: [
            ['interview', 'verb', '/ˈɪntəvjuː/', 'phỏng vấn', '🎙️', 'I interview my grandpa about his childhood.', 'Mình phỏng vấn ông về tuổi thơ của ông.', 'You ask someone many questions and listen to their answers.'],
            ['when you were young', 'phrase', '/wen juː wə jʌŋ/', 'khi ông/bà/bố/mẹ còn nhỏ', '👶', 'What did you want to be when you were young?', 'Khi còn nhỏ ông muốn làm nghề gì ạ?', 'You ask about the time when a grown-up was a child.'],
            ['come true', 'verb', '/kʌm truː/', 'thành sự thật', '🌠', 'I hope my dream will come true.', 'Mình mong ước mơ của mình sẽ thành sự thật.', 'When a wish really happens in real life.'],
            ['practise', 'verb', '/ˈpræktɪs/', 'luyện tập', '🔁', 'I practise English every day.', 'Mình luyện tập tiếng Anh mỗi ngày.', 'You do something again and again to get better at it.'],
            ['presentation', 'noun', '/ˌpreznˈteɪʃn/', 'bài thuyết trình', '📊', 'My presentation is about my dream rocket.', 'Bài thuyết trình của mình nói về tên lửa ước mơ.', 'You stand in front of the class and talk about your project.']
          ],
          comic: {
            title: "Grandpa's Secret Dream", titleVi: 'Ước mơ bí mật của ông',
            panels: [
              ['a', 'Grandpa, can I interview you for my class?', 'Ông ơi, con phỏng vấn ông cho bài ở lớp được không ạ?', '🎙️'],
              ['b', 'Of course, reporter Mai! Ask away.', 'Tất nhiên rồi, phóng viên Mai! Hỏi đi con.', '😄'],
              ['a', 'What did you want to be when you were young?', 'Hồi còn nhỏ ông muốn làm nghề gì ạ?', '👶'],
              ['b', 'A pilot! It did not come true, but now I fly kites with you!', 'Phi công! Ước mơ chưa thành, nhưng giờ ông được thả diều cùng con!', '🪁']
            ],
            blanks: [[0, 'interview', ['interview', 'invent', 'ice cream']], [2, 'when you were young', ['when you were young', 'when you were a mango', 'when you sleep']]]
          },
          build: [
            { vi: 'Em muốn hỏi ông: Hồi nhỏ ông muốn làm nghề gì ạ?', a: ['What', 'did you', 'want to be', 'when you were young?'], x: ['do you', 'when you are old?'] },
            { vi: 'Em muốn nói: Mình luyện tập bài thuyết trình mỗi tối.', a: ['I', 'practise', 'my presentation', 'every evening.'], x: ['practises', 'my pizza'] }
          ],
          talk: [
            { q: 'What did your grandparents want to be when they were young?', vi: 'Hồi nhỏ ông bà bạn muốn làm nghề gì?', hint: 'My grandma wanted to be a teacher.', k: ['wanted|dreamed|dream|wished', 'teacher|doctor|pilot|farmer|singer|soldier|nurse|driver|engineer|police|dancer|artist|chef|cook|vet|scientist|writer|actor|actress|footballer|tailor|officer'], c: ['My grandma wanted to be a teacher.', 'My grandma is a teacher now.', 'My grandpa wanted to visit Hà Nội.'] },
            { q: 'How do you get ready for a presentation?', vi: 'Bạn chuẩn bị cho bài thuyết trình thế nào?', hint: 'I practise in front of my family.', k: ['practise|practice|prepare|rehearse|read|write|make|draw', 'family|mirror|mum|dad|friends|again|poster|slides|notes|times|loud'], c: ['I practise in front of my family.', 'I feel very nervous.', 'I wear my best clothes.'] }
          ],
          snow: { vi: 'Giới thiệu tên lửa ước mơ', l: [[['my dream'], 'ước mơ của mình'], [['My dream', 'will', 'come true.'], 'Ước mơ của mình sẽ thành sự thật.'], [['If I', 'practise', 'every day,', 'my dream', 'will come true.'], 'Nếu mình luyện tập mỗi ngày, ước mơ của mình sẽ thành sự thật.']], x: ['practises', 'never'] },
          cb: ['b', "It's your turn to present. Are you nervous?", 'Đến lượt con thuyết trình rồi. Con có hồi hộp không?', [
            ['yes', "A little, but I practised a lot. I'm ready!", 'Hơi hơi ạ, nhưng con đã tập nhiều. Con sẵn sàng rồi!', 'Take a deep breath. You will shine!', 'Hít một hơi thật sâu. Con sẽ tỏa sáng!', '🌟'],
            ['ask', 'Can you sit in the front row and smile at me?', 'Ông ngồi hàng đầu và cười với con được không ạ?', "Of course! I'll give you a big thumbs-up.", 'Tất nhiên! Ông sẽ giơ ngón tay cái thật to.', '👍']]],
          tb: ['b', 'After your presentation, a classmate asks a hard question. What do you do?', 'Sau bài thuyết trình, một bạn hỏi câu rất khó. Con làm gì?', [
            ['calm', "I'll say: Great question! Let me think.", 'Con sẽ nói: Câu hỏi hay quá! Để mình nghĩ đã.', 'Smart! Taking time to think is okay.', 'Thông minh! Dành thời gian suy nghĩ là được mà.', '🤔'],
            ['idea', "I'll say: I don't know yet, but I'll find out!", 'Con sẽ nói: Mình chưa biết, nhưng mình sẽ tìm hiểu!', 'Honest and curious. That is how inventors think!', 'Trung thực và ham học. Nhà phát minh nghĩ như thế đấy!', '🔎']]],
          fact: ['Thomas Edison tested thousands of materials before his light bulb worked well.', 'Thomas Edison đã thử hàng nghìn vật liệu trước khi bóng đèn của ông hoạt động tốt.'],
          tf: [
            ['When you practise a lot, you usually get better.', true, 'Yes! Practice helps your brain and body learn.', 'Đúng! Luyện tập giúp não và cơ thể học hỏi.'],
            ['In an interview, only one person talks and nobody listens.', false, 'No! One person asks questions and the other answers. Both listen.', 'Sai! Một người hỏi, một người trả lời. Cả hai đều lắng nghe.']
          ],
          qa: ['If you build a dream rocket, where will it take you?', 'Nếu bạn chế tạo tên lửa ước mơ, nó sẽ đưa bạn đến đâu?', 'It will take me to Mars because I want to be an astronaut.', ['take|go|fly|travel', 'mars|moon|space|stars|future|school|lab|stage|sky|world']]
        }
      ],
      mystery: {
        t: 'The Mystery Rocket', tv: 'Tên lửa bí ẩn',
        intro: ['A dream rocket has no name on it. Which dream job is it for?', 'Một chiếc tên lửa ước mơ không có tên. Nó dành cho nghề mơ ước nào?'],
        clues: [['Clue one: This dream job does not happen in space.', 'Manh mối 1: Nghề mơ ước này không làm việc ngoài vũ trụ.'],
          ["Clue two: You don't need a guitar or a microphone for it.", 'Manh mối 2: Nghề này không cần đàn ghi-ta hay micrô.'],
          ['Clue three: The owner is creative, patient and makes new machines.', 'Manh mối 3: Chủ nhân sáng tạo, kiên nhẫn và chế tạo máy móc mới.']],
        q: ['Which dream job is on the rocket?', 'Nghề mơ ước nào ở trên tên lửa?'],
        o: [['an astronaut', '👩‍🚀', 'phi hành gia'], ['a singer', '🎤', 'ca sĩ'], ['a hairdresser', '💇', 'thợ cắt tóc'], ['an inventor', '💡', 'nhà phát minh']], a: 3,
        win: ['Blast off! It is the rocket of a future inventor!', 'Phóng lên nào! Đó là tên lửa của một nhà phát minh tương lai!']
      }
    }
  );

  /* ======================= THÁNG 8 ======================= */
  const M8 = ['Travel, Past Stories & Detective Logic', 'Du lịch, Kể chuyện Quá khứ & Tư duy Thám tử'];
  Z.push(
    /* ---------- WEEK 29: Packing & Going on a Trip ---------- */
    {
      id: 'w29', week: 29, month: 8, monthTitle: M8[0], monthTitleVi: M8[1],
      name: 'Packing & Going on a Trip', vi: 'Xếp đồ & Lên đường du lịch', short: 'Trip Time',
      topic: 'Packing Lists, Airports & Camping Adventures', topicVi: 'Danh sách đồ, sân bay & cắm trại phiêu lưu',
      color: '#0D9488', dark: '#115E59', icon: '🏕️', model: ['campsite', 'Ba Vì Campsite', 'Khu cắm trại Ba Vì'],
      chars: { a: { name: 'Bin', fig: 'cap-red|grin|torso-red|legs-green|flag' }, b: { name: 'Uncle Hải', fig: 'none-hat|cool|torso-blue|legs-tan|camera' } },
      chatter: [
        ["Don't forget your torch!", 'Đừng quên đèn pin nhé!'],
        ['Beach or mountains? Let us vote!', 'Đi biển hay lên núi? Cùng bỏ phiếu nào!'],
        ['Our flight leaves from Gate 5.', 'Chuyến bay của chúng ta khởi hành ở Cổng 5.'],
        ["Let's put up the tent before dark.", 'Mình dựng lều trước khi trời tối nhé.'],
        ['The campfire is warm and cosy!', 'Lửa trại ấm áp quá!']
      ],
      lessons: [
        {
          title: 'Beach or Mountains?', titleVi: 'Đi biển hay lên núi?', icon: '🧳',
          words: [
            ['packing list', 'noun', '/ˈpækɪŋ lɪst/', 'danh sách đồ cần mang', '📝', 'I write a packing list before every trip.', 'Mình viết danh sách đồ cần mang trước mỗi chuyến đi.', 'You write the things you need for a trip on this paper.'],
            ['sun cream', 'noun', '/ˈsʌn kriːm/', 'kem chống nắng', '🧴', 'Put on sun cream at the beach.', 'Bôi kem chống nắng khi ở bãi biển nhé.', 'You rub it on your skin so the sun does not burn you.'],
            ['swimsuit', 'noun', '/ˈswɪmsuːt/', 'đồ bơi', '🩱', 'My swimsuit is in the blue bag.', 'Đồ bơi của mình ở trong túi xanh.', 'You wear it in the sea or in the swimming pool.'],
            ['hiking boots', 'noun', '/ˈhaɪkɪŋ buːts/', 'giày leo núi', '🥾', 'I wear hiking boots in the mountains.', 'Mình đi giày leo núi khi lên núi.', 'Strong shoes for walking up rocky hills.'],
            ['first-aid kit', 'noun', '/ˌfɜːst ˈeɪd kɪt/', 'hộp sơ cứu', '🩹', 'We always take a first-aid kit.', 'Nhà mình luôn mang theo hộp sơ cứu.', 'A small box with plasters and cream for little accidents.']
          ],
          comic: {
            title: 'The Giant Suitcase', titleVi: 'Chiếc vali khổng lồ',
            panels: [
              ['b', 'Bin, we are going to Đà Lạt. Where is your packing list?', 'Bin ơi, mình sắp đi Đà Lạt. Danh sách đồ của con đâu?', '📝'],
              ['a', 'Here! A swimsuit, a beach ball and my LEGO!', 'Đây ạ! Đồ bơi, quả bóng bãi biển và LEGO của con!', '🏖️'],
              ['b', "Đà Lạt is in the mountains! It's cool there.", 'Đà Lạt ở trên núi mà! Ở đó mát lắm.', '⛰️'],
              ['a', 'Oops! I need hiking boots and a warm jacket!', 'Ối! Con cần giày leo núi và áo khoác ấm!', '🥾']
            ],
            blanks: [[0, 'packing list', ['packing list', 'shopping cake', 'sleeping list']], [3, 'hiking boots', ['hiking boots', 'swimming boots', 'banana boots']]]
          },
          build: [
            { vi: 'Em muốn nói: Mình cần kem chống nắng cho bãi biển.', a: ['I', 'need', 'sun cream', 'for the beach.'], x: ['needs', 'hiking boots'] },
            { vi: 'Em muốn nhắc: Đừng quên hộp sơ cứu nhé!', a: ["Don't", 'forget', 'the first-aid kit!'], x: ['forgets', 'Doesn\'t'] }
          ],
          talk: [
            { q: 'Do you like the beach or the mountains?', vi: 'Bạn thích biển hay núi?', hint: 'I like the mountains because they are cool.', k: ['beach|mountain|mountains|sea|both', 'because|cool|swim|sand|walk|climb|fresh|hot|beautiful|quiet'], c: ['I like the mountains because they are cool.', 'I went to the beach last summer.', 'My favourite season is summer.'] },
            { q: 'What is on your packing list?', vi: 'Danh sách đồ của bạn có gì?', hint: 'A swimsuit, sun cream and a hat.', k: ['swimsuit|cream|hat|boots|toothbrush|clothes|jacket|towel|kit|book|camera|sunglasses|shorts|torch|passport|ticket|bag|map|water'], c: ['A swimsuit, sun cream and a hat.', 'I am going to the beach.', 'I write my list on Sunday.'] }
          ],
          snow: { vi: 'Kể em mang gì cho chuyến đi biển', l: [[['sun cream'], 'kem chống nắng'], [['I', 'pack', 'sun cream.'], 'Mình xếp kem chống nắng.'], [['For the beach trip,', 'I', 'pack', 'sun cream', 'and my swimsuit.'], 'Cho chuyến đi biển, mình xếp kem chống nắng và đồ bơi.']], x: ['packs', 'hiking boots'] },
          cb: ['b', 'Your suitcase is too heavy, Bin. What can we take out?', 'Vali của con nặng quá Bin ạ. Mình bỏ bớt gì được?', [
            ['idea', 'I can take out three toys and keep one.', 'Con bỏ ra ba món đồ chơi và giữ lại một món ạ.', 'Smart choice! Now it is light.', 'Lựa chọn thông minh! Giờ nhẹ rồi.', '🧸'],
            ['ask', 'Can you help me check my packing list?', 'Chú giúp con kiểm tra danh sách đồ được không ạ?', 'Sure! Let us tick each thing together.', 'Được chứ! Mình cùng đánh dấu từng món nhé.', '✅']]],
          tb: ['b', 'Let us vote: beach in Nha Trang or mountains in Sa Pa?', 'Bỏ phiếu nào: biển Nha Trang hay núi Sa Pa?', [
            ['yes', 'Nha Trang! I want to swim and build sandcastles!', 'Nha Trang ạ! Con muốn bơi và xây lâu đài cát!', 'Great! Pack your swimsuit!', 'Tuyệt! Xếp đồ bơi đi con!', '🏖️'],
            ['idea', 'Sa Pa! I want to see the rice terraces.', 'Sa Pa ạ! Con muốn ngắm ruộng bậc thang.', 'Lovely! Bring your hiking boots!', 'Hay quá! Mang giày leo núi nhé!', '🌾']]],
          fact: ['Sand and water reflect sunlight, so you can get sunburnt at the beach even under an umbrella.', 'Cát và nước phản chiếu ánh nắng, nên ở biển con vẫn có thể bị cháy nắng dù ngồi dưới ô.'],
          tf: [
            ['It is usually cooler in the mountains than at the beach.', true, 'Yes! The higher you go, the cooler the air gets.', 'Đúng! Càng lên cao, không khí càng mát.'],
            ['You need sun cream only when it is raining.', false, 'No! Sun cream protects your skin from the sun.', 'Sai! Kem chống nắng bảo vệ da khỏi ánh nắng mặt trời.']
          ],
          qa: ['What do you pack for a beach trip?', 'Bạn xếp gì cho chuyến đi biển?', 'I pack my swimsuit, sun cream and a towel.', ['pack|take|bring|need', 'swimsuit|cream|towel|hat|sunglasses|ball|kit']]
        },
        {
          title: 'Ready to Fly!', titleVi: 'Sẵn sàng cất cánh!', icon: '✈️',
          words: [
            ['ticket', 'noun', '/ˈtɪkɪt/', 'vé', '🎫', 'Show your ticket, please.', 'Vui lòng cho xem vé.', 'You need this paper to get on a plane, a train or a bus.'],
            ['check in', 'verb', '/tʃek ɪn/', 'làm thủ tục', '🛄', 'We check in two hours before the flight.', 'Nhà mình làm thủ tục hai tiếng trước chuyến bay.', 'At the airport, you give your bags and show your passport.'],
            ['luggage', 'noun', '/ˈlʌɡɪdʒ/', 'hành lý', '🧳', 'Our luggage goes on the moving belt.', 'Hành lý của nhà mình đi trên băng chuyền.', 'All your bags and suitcases for a trip.'],
            ['gate', 'noun', '/ɡeɪt/', 'cổng ra máy bay', '🚪', 'Our plane leaves from gate number five.', 'Máy bay của mình khởi hành ở cổng số năm.', 'At the airport, you wait here before you walk to the plane.'],
            ['window seat', 'noun', '/ˈwɪndəʊ siːt/', 'ghế cạnh cửa sổ', '🪟', 'I love the window seat on a plane.', 'Mình thích ghế cạnh cửa sổ trên máy bay.', 'You sit here to look at the clouds outside.']
          ],
          comic: {
            title: 'Run to Gate 5!', titleVi: 'Chạy đến Cổng 5!',
            panels: [
              ['b', 'We need to check in now. Where is your ticket?', 'Mình cần làm thủ tục ngay. Vé của con đâu?', '🎫'],
              ['a', "It's in my pocket... no, in my hat!", 'Nó ở trong túi... à không, trong mũ ạ!', '🧢'],
              ['b', 'Phew! Our flight leaves from gate 5. Hurry!', 'Phù! Chuyến bay của mình ở cổng 5. Nhanh lên!', '🏃'],
              ['a', 'Yay! I got the window seat! I can see the clouds!', 'Yeah! Con được ngồi cạnh cửa sổ! Con thấy mây rồi!', '☁️']
            ],
            blanks: [[0, 'check in', ['check in', 'check out', 'chicken']], [3, 'window seat', ['window seat', 'window cat', 'kitchen seat']]]
          },
          build: [
            { vi: 'Em muốn hỏi: Cho cháu ngồi ghế cạnh cửa sổ được không ạ?', a: ['Can I', 'have', 'a window seat,', 'please?'], x: ['has', 'door'] },
            { vi: 'Em muốn kể: Nhà mình làm thủ tục ở sân bay.', a: ['We', 'check in', 'at the airport.'], x: ['checks in', 'at the beach.'] }
          ],
          talk: [
            { q: 'Do you like the window seat or the aisle seat?', vi: 'Bạn thích ghế cạnh cửa sổ hay ghế cạnh lối đi?', hint: 'I like the window seat because I can see the clouds.', k: ['window|aisle|middle', 'because|see|clouds|sleep|walk|toilet|view|sky|look'], c: ['I like the window seat because I can see the clouds.', 'My seat is number twelve.', 'I have a window in my bedroom.'] },
            { q: 'What do you need at the airport?', vi: 'Ở sân bay bạn cần gì?', hint: 'I need my ticket and my passport.', k: ['ticket|tickets|passport|luggage|suitcase|boarding|pass|bag|bags'], c: ['I need my ticket and my passport.', 'I need my swimsuit and sun cream.', 'I need to wait at the bus stop.'] }
          ],
          snow: { vi: 'Kể về chuyến bay của em', l: [[['the gate'], 'cổng ra máy bay'], [['We', 'wait', 'at the gate.'], 'Nhà mình chờ ở cổng.'], [['After we check in,', 'we', 'wait', 'at the gate', 'for our plane.'], 'Sau khi làm thủ tục, nhà mình chờ máy bay ở cổng.']], x: ['waits', 'at the beach'] },
          cb: ['b', 'Our flight is late. We must wait one more hour.', 'Chuyến bay bị trễ. Mình phải đợi thêm một tiếng.', [
            ['calm', "That's okay. I can read my comic book.", 'Không sao ạ. Con đọc truyện tranh được mà.', 'Good idea! Time flies when you read.', 'Ý hay! Đọc truyện thì thời gian trôi nhanh lắm.', '📚'],
            ['idea', "Let's watch the planes from the big window!", 'Mình ra cửa sổ lớn ngắm máy bay đi chú!', 'Look! That one is taking off!', 'Nhìn kìa! Chiếc kia đang cất cánh!', '🛫']]],
          tb: ['b', 'Excuse me, this is my seat. Can I sit here?', 'Xin lỗi, đây là ghế của chú. Chú ngồi đây được không?', [
            ['yes', 'Oh, sorry! Let me check my ticket.', 'Ôi, cháu xin lỗi! Để cháu xem lại vé ạ.', 'No worries. Your seat is next to mine.', 'Không sao. Ghế cháu ngay cạnh chú đó.', '🎫'],
            ['ask', 'Could you show me your ticket, please?', 'Chú cho cháu xem vé của chú được không ạ?', 'Of course. Oh! I am in the wrong row!', 'Được chứ. Ối! Chú nhầm hàng rồi!', '😅']]],
          fact: ['A big passenger plane usually flies about ten kilometres above the ground.', 'Một chiếc máy bay chở khách lớn thường bay cao khoảng mười ki-lô-mét so với mặt đất.'],
          tf: [
            ['You check in at the airport before your flight.', true, 'Yes! You give your luggage and get your boarding pass.', 'Đúng! Con gửi hành lý và nhận thẻ lên máy bay.'],
            ['You can take your pet elephant as luggage.', false, 'No! An elephant is far too big for a plane.', 'Sai! Con voi quá to để mang lên máy bay.']
          ],
          qa: ['Where do you want to fly one day?', 'Một ngày nào đó bạn muốn bay đến đâu?', 'I want to fly to Phú Quốc.', ['want|would|like|love|dream', 'fly|go|visit|travel']]
        },
        {
          title: 'Camping in Ba Vì', titleVi: 'Cắm trại ở Ba Vì', icon: '⛺',
          words: [
            ['tent', 'noun', '/tent/', 'cái lều', '⛺', 'We sleep in a tent at the campsite.', 'Nhà mình ngủ trong lều ở khu cắm trại.', 'A small house made of cloth that you can carry.'],
            ['put up the tent', 'verb', '/pʊt ʌp ðə tent/', 'dựng lều', '🏕️', "Let's put up the tent before dark.", 'Mình dựng lều trước khi trời tối nhé.', 'You push poles into the ground and pull the cloth tight.'],
            ['sleeping bag', 'noun', '/ˈsliːpɪŋ bæɡ/', 'túi ngủ', '🛌', 'My sleeping bag is warm and soft.', 'Túi ngủ của mình ấm và mềm.', 'You zip yourself inside it to sleep outdoors.'],
            ['torch', 'noun', '/tɔːtʃ/', 'đèn pin', '🔦', 'I use my torch to find the path at night.', 'Mình dùng đèn pin để tìm đường ban đêm.', 'A small light you hold in your hand in the dark.'],
            ['campfire', 'noun', '/ˈkæmpfaɪə/', 'lửa trại', '🔥', 'We sing songs around the campfire.', 'Mọi người hát quanh lửa trại.', 'People sit around this warm fire outdoors at night.']
          ],
          comic: {
            title: 'The Wobbly Tent', titleVi: 'Chiếc lều lung lay',
            panels: [
              ['b', "Bin, the sun is going down. Let's put up the tent!", 'Bin ơi, mặt trời sắp lặn rồi. Mình dựng lều thôi!', '🌅'],
              ['a', "Oh no! It's wobbly... and now it's on my head!", 'Ôi không! Nó lung lay... giờ nó trùm lên đầu con rồi!', '😵'],
              ['b', 'Ha ha! Hold the torch. I will fix the poles.', 'Ha ha! Con cầm đèn pin. Chú sẽ sửa cọc lều.', '🔦'],
              ['a', 'Perfect! Now we can sit by the campfire.', 'Hoàn hảo! Giờ mình ngồi bên lửa trại được rồi.', '🔥']
            ],
            blanks: [[0, 'put up the tent', ['put up the tent', 'put on the tent', 'eat the tent']], [3, 'campfire', ['campfire', 'campfish', 'fire engine']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình ngủ trong túi ngủ ở trong lều.', a: ['I', 'sleep', 'in my sleeping bag', 'in the tent.'], x: ['sleeps', 'in the river.'] },
            { vi: 'Em muốn nhắc bạn: Đừng quên đèn pin của bạn nhé!', a: ["Don't", 'forget', 'your torch!'], x: ['forgot', 'Not'] }
          ],
          talk: [
            { q: 'Have you ever slept in a tent?', vi: 'Bạn đã bao giờ ngủ trong lều chưa?', hint: 'Yes, I slept in a tent in Ba Vì.', k: ['yes|no|never|once|twice', 'tent|tents|camping|camp'], c: ['Yes, I slept in a tent in Ba Vì.', "Yes, I slept at my grandma's house.", 'Yes, I swam in the sea.'] },
            { q: 'What do you do around a campfire?', vi: 'Bạn làm gì quanh lửa trại?', hint: 'We sing songs and tell stories.', k: ['sing|tell|eat|dance|play|roast|cook|sit|talk|warm', 'songs|song|stories|story|corn|potatoes|games|marshmallows|together|hands|sausages'], c: ['We sing songs and tell stories.', 'We sleep in a tent.', 'We swim in the river.'] }
          ],
          snow: { vi: 'Kể về đêm cắm trại', l: [[['the campfire'], 'lửa trại'], [['We', 'sit', 'by the campfire.'], 'Mọi người ngồi bên lửa trại.'], [['At night in Ba Vì,', 'we', 'sit', 'by the campfire', 'and roast sweet potatoes.'], 'Buổi tối ở Ba Vì, mọi người ngồi bên lửa trại và nướng khoai lang.']], x: ['sits', 'in the sea'] },
          cb: ['b', 'It is very dark in the forest. Are you scared, Bin?', 'Trong rừng tối quá. Con có sợ không Bin?', [
            ['calm', 'A little. But I have my torch!', 'Một chút ạ. Nhưng con có đèn pin mà!', 'Brave camper! Let us look at the stars.', 'Nhà cắm trại dũng cảm! Mình ngắm sao nhé.', '✨'],
            ['ask', 'Can I sit next to you by the campfire?', 'Con ngồi cạnh chú bên lửa trại được không ạ?', 'Of course! It is warm and safe here.', 'Tất nhiên! Ở đây ấm và an toàn lắm.', '🔥']]],
          tb: ['b', 'Who wants to roast sweet potatoes on the campfire?', 'Ai muốn nướng khoai lang trên lửa trại nào?', [
            ['yes', 'Me! I love hot sweet potatoes!', 'Con ạ! Con thích khoai lang nóng lắm!', 'Careful! They are very hot!', 'Cẩn thận nhé! Nóng lắm đấy!', '🍠'],
            ['idea', 'Can we roast corn too?', 'Mình nướng cả bắp được không chú?', 'Great idea! I brought some corn.', 'Ý hay! Chú có mang bắp đây.', '🌽']]],
          fact: ['A fire needs three things to burn: heat, fuel and air.', 'Lửa cần ba thứ để cháy: nhiệt, chất đốt và không khí.'],
          tf: [
            ['You should put out the campfire before you go to sleep.', true, 'Yes! A campfire left alone can start a forest fire.', 'Đúng! Lửa trại bỏ mặc có thể gây cháy rừng.'],
            ['A sleeping bag is for carrying your lunch.', false, 'No! You sleep inside a sleeping bag.', 'Sai! Con ngủ bên trong túi ngủ.']
          ],
          qa: ['What do you take when you go camping?', 'Bạn mang gì khi đi cắm trại?', 'I take a tent, a torch and a sleeping bag.', ['take|bring|pack|need', 'tent|torch|sleeping|bag|food|water|kit|jacket']]
        }
      ],
      mystery: {
        t: 'What Did Bin Forget?', tv: 'Bin đã quên gì?',
        intro: ['Bin is at the campsite in Ba Vì. Something is missing from his bag!', 'Bin đang ở khu cắm trại Ba Vì. Trong túi cậu thiếu một món đồ!'],
        clues: [['Clue one: It is not something you wear.', 'Manh mối 1: Nó không phải thứ để mặc hay đi.'],
          ['Clue two: Bin cannot see the path at night without it.', 'Manh mối 2: Không có nó, ban đêm Bin không nhìn thấy đường.'],
          ['Clue three: It is small and you hold it in your hand.', 'Manh mối 3: Nó nhỏ và cầm vừa trong tay.']],
        q: ['What did Bin forget?', 'Bin đã quên gì?'],
        o: [['hiking boots', '🥾', 'giày leo núi'], ['a tent', '⛺', 'cái lều'], ['a torch', '🔦', 'đèn pin'], ['a swimsuit', '🩱', 'đồ bơi']], a: 2,
        win: ['Uncle Hải had a spare torch! Now Bin can see the path!', 'Chú Hải có đèn pin dự phòng! Giờ Bin thấy đường rồi!']
      }
    },

    /* ---------- WEEK 30: Where Were You Yesterday? ---------- */
    {
      id: 'w30', week: 30, month: 8, monthTitle: M8[0], monthTitleVi: M8[1],
      name: 'Where Were You Yesterday?', vi: 'Hôm qua bạn ở đâu?', short: 'Was & Were',
      topic: 'Past Simple 1: was / were at the Train Station', topicVi: 'Thì quá khứ 1: was / were ở ga tàu',
      color: '#2563EB', dark: '#1E3A8A', icon: '🚂', model: ['station', 'Hà Nội Train Station', 'Ga tàu Hà Nội'],
      chars: { a: { name: 'Na', fig: 'hair-blonde|wink|torso-stars|legs-red|book' }, b: { name: 'Robo-Clock', fig: 'helmet-astro|cool|torso-astro|legs-white|wrench' } },
      chatter: [
        ['Where were you last night?', 'Tối qua bạn ở đâu?'],
        ['I was on the train to Huế!', 'Mình đã ở trên tàu đi Huế!'],
        ['The train was late. Oh no!', 'Tàu đến muộn. Ôi không!'],
        ['We were at platform two an hour ago.', 'Một tiếng trước tụi mình ở sân ga số hai.'],
        ['Beep! Time travel to the past!', 'Bíp! Du hành về quá khứ nào!']
      ],
      lessons: [
        {
          title: 'Where Were You?', titleVi: 'Bạn đã ở đâu?', icon: '❓',
          words: [
            ['Where were you?', 'phrase', '/weə wɜː juː/', 'Bạn đã ở đâu?', '❓', 'Where were you at eight o\'clock?', 'Lúc tám giờ bạn đã ở đâu?', 'You ask this when you want to know the place of a friend in the past.'],
            ['last night', 'phrase', '/lɑːst naɪt/', 'tối qua', '🌙', 'I was at my grandma\'s house last night.', 'Tối qua mình ở nhà bà.', 'The evening before today, when it was dark.'],
            ["wasn't", 'verb', '/ˈwɒznt/', 'đã không ở / không phải (was not)', '🚫', "I wasn't at school yesterday. I was ill.", 'Hôm qua mình không đi học. Mình bị ốm.', 'The short way to say was not.'],
            ["weren't", 'verb', '/wɜːnt/', 'đã không ở / không phải (were not)', '🙅', "We weren't at home on Sunday.", 'Chủ nhật nhà mình không ở nhà.', 'The short way to say were not.'],
            ['ago', 'adv', '/əˈɡəʊ/', 'trước đây (cách đây)', '⏳', 'I was in Đà Nẵng two days ago.', 'Cách đây hai ngày mình ở Đà Nẵng.', 'You say this after a time, like three days or one hour, to talk about the past.']
          ],
          comic: {
            title: 'The Missing Robot', titleVi: 'Chú robot biến mất',
            panels: [
              ['a', 'Robo-Clock! Where were you last night?', 'Robo-Clock! Tối qua cậu đã ở đâu?', '🤖'],
              ['b', 'Beep! I was in the year 1990!', 'Bíp! Tớ đã ở năm 1990!', '⏰'],
              ['a', "Really? You weren't in your box!", 'Thật á? Cậu không có trong hộp mà!', '📦'],
              ['b', 'Two hours ago, I was back. Now I am hungry for batteries!', 'Hai tiếng trước tớ đã quay về. Giờ tớ đói pin quá!', '🔋']
            ],
            blanks: [[0, 'last night', ['last night', 'next night', 'lost night']], [2, "weren't", ["weren't", "aren't", 'wasn\'t']]]
          },
          build: [
            { vi: 'Em muốn kể: Tối qua mình ở nhà.', a: ['I', 'was', 'at home', 'last night.'], x: ['were', 'tomorrow.'] },
            { vi: 'Em muốn kể: Chủ nhật tụi mình không ở trường.', a: ['We', "weren't", 'at school', 'on Sunday.'], x: ["wasn't", 'are'] }
          ],
          talk: [
            { q: 'Where were you last night?', vi: 'Tối qua bạn ở đâu?', hint: 'I was at home with my family.', k: ['was|stayed', 'home|house|park|cinema|grandma|grandpa|school|restaurant|market|mall|class|party|friend'], c: ['I was at home with my family.', 'I am at school now.', 'I was very tired last night.'] },
            { q: 'Were you at school yesterday?', vi: 'Hôm qua bạn có đi học không?', hint: 'Yes, I was. I was at school all day.', k: ['yes|no', "was|wasn't|wasnt|went"], c: ['Yes, I was. I was at school all day.', 'Yes, I am at school today.', 'No, I go to school on Monday.'] }
          ],
          snow: { vi: 'Kể em đã ở đâu tối qua', l: [[['last night'], 'tối qua'], [['I', 'was', 'at home.'], 'Mình đã ở nhà.'], [['Last night,', 'I', 'was', 'at home', 'with my grandparents.'], 'Tối qua mình ở nhà với ông bà.']], x: ['were', 'tomorrow'] },
          cb: ['b', 'Na, where were you at five o\'clock? I was looking for you!', 'Na ơi, lúc năm giờ cậu ở đâu thế? Tớ tìm cậu mãi!', [
            ['yes', 'I was at the park with my cousin.', 'Mình ở công viên với em họ.', 'Ah! That is why your shoes are muddy!', 'À! Thảo nào giày cậu dính bùn!', '🌳'],
            ['ask', 'Why? Was something wrong?', 'Sao thế? Có chuyện gì à?', 'No, I just wanted to play chess with you!', 'Không, tớ chỉ muốn chơi cờ với cậu thôi!', '♟️']]],
          tb: ['b', 'You were not at the class party yesterday. Were you ill?', 'Hôm qua cậu không đến tiệc lớp. Cậu bị ốm à?', [
            ['calm', 'Yes, I was. I had a fever, but I am fine now.', 'Ừ, mình bị sốt, nhưng giờ khỏe rồi.', 'I am glad! I saved you a cupcake.', 'Mừng quá! Tớ để dành cho cậu một chiếc bánh nướng.', '🧁'],
            ['idea', 'No, I was at my aunt\'s wedding. Was the party fun?', 'Không, mình đi đám cưới cô. Tiệc có vui không?', 'Yes! We were very loud and happy!', 'Có! Cả lớp ồn ào và vui lắm!', '🎉']]],
          fact: ['Your brain sorts and saves memories while you sleep at night.', 'Bộ não của con sắp xếp và lưu giữ ký ức khi con ngủ vào ban đêm.'],
          tf: [
            ['We use were with we, you and they.', true, 'Yes! We were, you were, they were.', 'Đúng! We were, you were, they were.'],
            ['Last night is the night after today.', false, 'No! Last night was the night before today.', 'Sai! Tối qua là đêm trước hôm nay.']
          ],
          qa: ['Where were you last weekend?', 'Cuối tuần trước bạn ở đâu?', 'I was at my grandparents\' house.', ['was|were|went', 'home|house|park|beach|grandparents|village|zoo|cinema|mall|countryside']]
        },
        {
          title: 'The Station Alibi Game', titleVi: 'Trò chơi chứng cứ ngoại phạm ở ga', icon: '🚉',
          words: [
            ['platform', 'noun', '/ˈplætfɔːm/', 'sân ga', '🚉', 'The train to Huế leaves from platform two.', 'Tàu đi Huế khởi hành ở sân ga số hai.', 'You stand here and wait for the train to stop.'],
            ['waiting room', 'noun', '/ˈweɪtɪŋ ruːm/', 'phòng chờ', '🪑', 'We were in the waiting room for an hour.', 'Nhà mình đã ở phòng chờ một tiếng.', 'A room with chairs where people sit before the train comes.'],
            ['ticket office', 'noun', '/ˈtɪkɪt ˈɒfɪs/', 'quầy bán vé', '🏢', 'Dad was at the ticket office at nine.', 'Lúc chín giờ bố ở quầy bán vé.', 'You go here to buy your train ticket.'],
            ['on time', 'phrase', '/ɒn taɪm/', 'đúng giờ', '⏱️', 'The train was on time today.', 'Hôm nay tàu đến đúng giờ.', 'Not early and not late. Exactly at the right minute.'],
            ['late', 'adj', '/leɪt/', 'muộn, trễ', '🐢', 'The train was ten minutes late.', 'Tàu đến muộn mười phút.', 'When you arrive after the right time.']
          ],
          comic: {
            title: 'Who Took the Last Bánh Mì?', titleVi: 'Ai lấy ổ bánh mì cuối cùng?',
            panels: [
              ['b', 'Beep! The last bánh mì is gone! Where were you at ten?', 'Bíp! Ổ bánh mì cuối cùng biến mất! Lúc mười giờ cậu ở đâu?', '🥖'],
              ['a', 'I was at the ticket office with Dad!', 'Mình ở quầy bán vé với bố!', '🎫'],
              ['b', 'Hmm... and the cat was in the waiting room.', 'Hừm... còn con mèo thì ở phòng chờ.', '🐱'],
              ['a', 'Look! Crumbs on its whiskers! The cat was the thief!', 'Nhìn kìa! Vụn bánh trên râu nó! Con mèo là thủ phạm!', '😹']
            ],
            blanks: [[1, 'ticket office', ['ticket office', 'pocket office', 'post office']], [2, 'waiting room', ['waiting room', 'eating room', 'waiting spoon']]]
          },
          build: [
            { vi: 'Em muốn kể: Tàu đã đến muộn mười phút.', a: ['The train', 'was', 'ten minutes', 'late.'], x: ['were', 'early'] },
            { vi: 'Em muốn nói: Lúc chín giờ tụi mình ở sân ga.', a: ['We', 'were', 'on the platform', "at nine o'clock."], x: ['was', 'tomorrow'] }
          ],
          talk: [
            { q: 'Were you on time for school today?', vi: 'Hôm nay bạn đi học có đúng giờ không?', hint: 'Yes, I was on time.', k: ['yes|no', "was|wasn't|wasnt", 'time|late|early'], c: ['Yes, I was on time.', 'Yes, I am on time today.', 'No, I was at home.'] },
            { q: 'Where were you at ten o\'clock this morning?', vi: 'Lúc mười giờ sáng nay bạn ở đâu?', hint: 'I was in my classroom.', k: ['was', 'class|classroom|school|home|park|library|playground|market'], c: ['I was in my classroom.', "I get up at six o'clock.", 'I am in my classroom now.'] }
          ],
          snow: { vi: 'Kể về chuyến tàu đến muộn', l: [[['late'], 'muộn'], [['The train', 'was', 'late.'], 'Tàu đến muộn.'], [['Yesterday,', 'the train', 'was', 'late', 'because of the heavy rain.'], 'Hôm qua tàu đến muộn vì mưa to.']], x: ['were', 'early'] },
          cb: ['b', 'The train is twenty minutes late. What can we do?', 'Tàu muộn hai mươi phút. Mình làm gì đây?', [
            ['idea', "Let's play I Spy in the waiting room!", 'Mình chơi trò "Tớ nhìn thấy" ở phòng chờ đi!', 'Beep! I spy something red... a ticket!', 'Bíp! Tớ thấy thứ gì đó màu đỏ... một tấm vé!', '👀'],
            ['calm', 'Let us sit down and eat our sticky rice.', 'Mình ngồi xuống ăn xôi đi.', 'Yummy! Waiting is easy with food.', 'Ngon quá! Có đồ ăn thì đợi dễ hơn.', '🍙']]],
          tb: ['b', 'Excuse me, is this platform two?', 'Xin lỗi, đây có phải sân ga số hai không?', [
            ['yes', 'Yes, it is. The train to Huế stops here.', 'Đúng rồi ạ. Tàu đi Huế dừng ở đây.', 'Thank you! You are very helpful.', 'Cảm ơn cháu! Cháu giỏi quá.', '🚉'],
            ['ask', 'I am not sure. Shall we ask at the ticket office?', 'Cháu không chắc ạ. Mình hỏi ở quầy vé nhé?', 'Good idea! Let us go together.', 'Ý hay! Cùng đi nào.', '🏢']]],
          fact: ['The train from Hà Nội to Sài Gòn travels more than 1,700 kilometres!', 'Tàu từ Hà Nội vào Sài Gòn chạy hơn 1.700 ki-lô-mét đấy!'],
          tf: [
            ['If a train is late, it comes after the right time.', true, 'Yes! Late means after the right time.', 'Đúng! Muộn nghĩa là đến sau giờ đã định.'],
            ['You buy train tickets at the swimming pool.', false, 'No! You buy tickets at the ticket office.', 'Sai! Con mua vé ở quầy bán vé.']
          ],
          qa: ['Were you ever late for school?', 'Bạn đã bao giờ đi học muộn chưa?', 'Yes, I was late once because it was raining.', ['yes|no|never|once', "was|wasn't|wasnt|late|time"]]
        },
        {
          title: 'My Time-Travel Diary', titleVi: 'Nhật ký du hành thời gian', icon: '📔',
          words: [
            ['diary', 'noun', '/ˈdaɪəri/', 'nhật ký', '📔', 'I write in my diary every evening.', 'Tối nào mình cũng viết nhật ký.', 'A secret notebook where you write about your day.'],
            ['in the past', 'phrase', '/ɪn ðə pɑːst/', 'ngày xưa, trong quá khứ', '🕰️', 'In the past, there were no smartphones.', 'Ngày xưa không có điện thoại thông minh.', 'A long time before now, not today and not tomorrow.'],
            ['was born', 'verb', '/wɒz bɔːn/', 'được sinh ra', '👶', 'I was born in 2017 in Hà Nội.', 'Mình sinh năm 2017 ở Hà Nội.', 'You say this with the day or year you came into the world.'],
            ['last summer', 'phrase', '/lɑːst ˈsʌmə/', 'mùa hè năm ngoái', '🌞', 'Last summer, we were in Phú Quốc.', 'Hè năm ngoái nhà mình ở Phú Quốc.', 'The hot holiday season of the year before this one.'],
            ['a hundred years ago', 'phrase', '/ə ˈhʌndrəd jɪəz əˈɡəʊ/', 'một trăm năm trước', '📜', 'A hundred years ago, there were no planes in Vietnam.', 'Một trăm năm trước, Việt Nam chưa có máy bay.', 'A very long time back, when your great-great-grandparents were young.']
          ],
          comic: {
            title: 'Grandpa Was a Kid!', titleVi: 'Ông nội từng là trẻ con!',
            panels: [
              ['b', 'Beep! Time machine ready. Where shall we go?', 'Bíp! Cỗ máy thời gian sẵn sàng. Mình đi đâu nào?', '⏰'],
              ['a', 'To 1970! My grandpa was born then!', 'Đến năm 1970! Ông nội mình sinh năm đó!', '👶'],
              ['b', 'Look! In the past, there were bicycles everywhere.', 'Nhìn kìa! Ngày xưa đâu đâu cũng có xe đạp.', '🚲'],
              ['a', 'Wow! I must write this in my diary!', 'Oa! Mình phải ghi vào nhật ký mới được!', '📔']
            ],
            blanks: [[1, 'was born', ['was born', 'was bored', 'were bone']], [3, 'diary', ['diary', 'dairy cow', 'dinosaur']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình sinh ra ở Hà Nội.', a: ['I', 'was born', 'in Hà Nội.'], x: ['were born', 'am born'] },
            { vi: 'Em muốn kể: Ngày xưa ông bà mình là nông dân.', a: ['My grandparents', 'were', 'farmers', 'in the past.'], x: ['was', 'tomorrow'] }
          ],
          talk: [
            { q: 'Where were you born?', vi: 'Bạn sinh ra ở đâu?', hint: 'I was born in Hanoi.', k: ['born', 'hanoi|ha|noi|saigon|ho|chi|minh|danang|da|nang|hue|haiphong|hai|phong|city|vietnam|hospital|town|village|nha|trang|can|tho|countryside'], c: ['I was born in Hanoi.', 'I was born in 2017.', 'I live in Hanoi now.'] },
            { q: 'Where were you last summer?', vi: 'Hè năm ngoái bạn ở đâu?', hint: 'I was at the beach in Đà Nẵng.', k: ['was|went|stayed|visited', 'beach|home|village|grandma|grandpa|mountains|sea|camp|city|countryside|nang|nha|trang|sapa|sa|hanoi|park'], c: ['I was at the beach in Đà Nẵng.', 'I am at the beach now.', 'I was very happy last summer.'] }
          ],
          snow: { vi: 'Viết nhật ký du hành thời gian', l: [[['in the past'], 'ngày xưa'], [['There', 'were', 'no phones.'], 'Đã không có điện thoại.'], [['A hundred years ago,', 'there', 'were', 'no phones', 'in my village.'], 'Một trăm năm trước, làng mình chưa có điện thoại.']], x: ['was', 'are'] },
          cb: ['b', 'Beep! Which year shall we visit in the time machine?', 'Bíp! Mình đến năm nào bằng cỗ máy thời gian đây?', [
            ['idea', 'The year I was born! I want to see baby me!', 'Năm mình sinh ra! Mình muốn xem mình hồi bé!', 'Ha ha! You were so tiny and loud!', 'Ha ha! Hồi đó cậu bé xíu mà khóc to lắm!', '👶'],
            ['ask', 'Can we go to the time of the dinosaurs?', 'Mình đến thời khủng long được không?', 'Beep! Too dangerous! Let us look at photos instead.', 'Bíp! Nguy hiểm quá! Mình xem ảnh thay vậy.', '🦕']]],
          tb: ['b', 'Grandma, what was school like when you were a child?', 'Bà ơi, hồi bà còn nhỏ trường học thế nào ạ?', [
            ['yes', 'There were forty children in one class!', 'Một lớp có tới bốn mươi bạn!', 'Wow! It was very crowded then!', 'Oa! Hồi đó đông quá!', '🏫'],
            ['calm', 'There were no computers. We wrote with ink pens.', 'Không có máy tính. Bà viết bằng bút mực.', 'I want to try an ink pen too!', 'Cháu cũng muốn thử bút mực!', '🖋️']]],
          fact: ['Sunlight takes about eight minutes to reach Earth, so we always see the Sun as it was in the past!', 'Ánh sáng Mặt Trời mất khoảng tám phút để đến Trái Đất, nên ta luôn thấy Mặt Trời của tám phút trước!'],
          tf: [
            ['Sunlight takes about eight minutes to travel to Earth.', true, 'Yes! The Sun is very far away, so light needs time.', 'Đúng! Mặt Trời rất xa nên ánh sáng cần thời gian.'],
            ['A hundred years ago, children played games on smartphones.', false, 'No! There were no smartphones a hundred years ago.', 'Sai! Một trăm năm trước chưa có điện thoại thông minh.']
          ],
          qa: ['What year were you born?', 'Bạn sinh năm nào?', 'I was born in 2017.', ['born', '2014|2015|2016|2017|2018|2019|twenty|two|thousand']]
        }
      ],
      mystery: {
        t: 'The Station Alibi', tv: 'Chứng cứ ngoại phạm ở nhà ga',
        intro: ["Someone ate Robo-Clock's battery cake at ten o'clock! Who was at the cake table?", 'Ai đó đã ăn bánh pin của Robo-Clock lúc mười giờ! Ai đã ở chỗ bàn bánh?'],
        clues: [["Clue one: Na was at the ticket office at ten. Dad saw her there.", 'Manh mối 1: Lúc mười giờ Na ở quầy bán vé. Bố đã thấy bạn ấy ở đó.'],
          ["Clue two: The train driver wasn't at the station. His train was late.", 'Manh mối 2: Bác lái tàu không ở nhà ga. Tàu của bác bị muộn.'],
          ['Clue three: The guard was in the waiting room at ten. He was with a lady.', 'Manh mối 3: Lúc mười giờ chú bảo vệ ở phòng chờ, cùng với một cô.']],
        q: ['The cake table was on the platform. Who ate the cake?', 'Bàn bánh ở sân ga. Ai đã ăn bánh?'],
        o: [['Na', '👧', 'Na'], ['the train driver', '👨‍✈️', 'bác lái tàu'], ['the guard', '💂', 'chú bảo vệ'], ['the puppy', '🐶', 'chú cún']], a: 3,
        win: ['The puppy has cake on its nose! Case closed, Robo-Clock!', 'Chú cún còn dính bánh trên mũi! Phá án xong rồi, Robo-Clock!']
      }
    },

    /* ---------- WEEK 31: My Weekend Story ---------- */
    {
      id: 'w31', week: 31, month: 8, monthTitle: M8[0], monthTitleVi: M8[1],
      name: 'My Weekend Story', vi: 'Câu chuyện cuối tuần của em', short: 'Weekend Story',
      topic: 'Past Simple 2: Telling a Story with First, Then, Finally', topicVi: 'Thì quá khứ 2: Kể chuyện theo trình tự',
      color: '#B45309', dark: '#78350F', icon: '🏛️', model: ['museum', 'History Museum', 'Bảo tàng Lịch sử'],
      chars: { a: { name: 'Mai', fig: 'hair-brown|freckles|torso-red|legs-blue|camera' }, b: { name: 'Dr Lan', fig: 'none-hat|smile|torso-detective|legs-black|book' } },
      chatter: [
        ['Last Sunday, we went to the museum!', 'Chủ nhật tuần trước, nhà mình đã đi bảo tàng!'],
        ['I saw real dinosaur bones!', 'Mình đã thấy xương khủng long thật!'],
        ['First we ate phở, then we visited the museum.', 'Đầu tiên tụi mình ăn phở, sau đó đi thăm bảo tàng.'],
        ['This bronze drum is over 2,000 years old.', 'Chiếc trống đồng này hơn 2.000 năm tuổi.'],
        ['Finally, we went home. It was amazing!', 'Cuối cùng, tụi mình về nhà. Thật tuyệt vời!']
      ],
      lessons: [
        {
          title: 'Super Past Verbs', titleVi: 'Siêu động từ quá khứ', icon: '⚡',
          words: [
            ['went', 'verb', '/went/', 'đã đi (quá khứ của go)', '🚶', 'I went to Hồ Tây on Saturday.', 'Thứ Bảy mình đã đi Hồ Tây.', 'The past of go. You did this when you moved to another place.'],
            ['saw', 'verb', '/sɔː/', 'đã thấy (quá khứ của see)', '👀', 'We saw a huge rainbow yesterday.', 'Hôm qua tụi mình đã thấy cầu vồng to lắm.', 'The past of see. You did this with your eyes.'],
            ['ate', 'verb', '/et/', 'đã ăn (quá khứ của eat)', '🍜', 'I ate bánh cuốn for breakfast.', 'Mình đã ăn bánh cuốn vào bữa sáng.', 'The past of eat. You did this with food and your mouth.'],
            ['bought', 'verb', '/bɔːt/', 'đã mua (quá khứ của buy)', '🛍️', 'Mum bought me a kite at the market.', 'Mẹ đã mua cho mình một con diều ở chợ.', 'The past of buy. You paid money for something.'],
            ['tried', 'verb', '/traɪd/', 'đã thử', '🥢', 'I tried durian for the first time!', 'Mình đã thử sầu riêng lần đầu tiên!', 'You did something new to see what it was like.']
          ],
          comic: {
            title: 'The Verb Machine', titleVi: 'Cỗ máy động từ',
            panels: [
              ['b', 'Mai, put go into the Past Machine!', 'Mai ơi, bỏ chữ go vào Cỗ máy Quá khứ nào!', '⚙️'],
              ['a', 'Ding! It says went! I went to the market!', 'Ting! Nó ra chữ went! Mình đã đi chợ!', '🛒'],
              ['b', 'Now try eat. Oh! It says ate!', 'Giờ thử eat nhé. Ồ! Nó ra ate!', '🍜'],
              ['a', 'I ate three spring rolls and tried durian!', 'Mình đã ăn ba cái nem và thử sầu riêng!', '😋']
            ],
            blanks: [[1, 'went', ['went', 'goed', 'wented']], [3, 'tried', ['tried', 'tryed', 'cried']]]
          },
          build: [
            { vi: 'Em muốn kể: Hôm qua mình đã thấy một con khỉ ở sở thú.', a: ['I', 'saw', 'a monkey', 'at the zoo', 'yesterday.'], x: ['see', 'seed'] },
            { vi: 'Em muốn kể: Mẹ đã mua cho mình một con diều.', a: ['Mum', 'bought', 'me', 'a kite.'], x: ['buyed', 'buys'] }
          ],
          talk: [
            { q: 'What did you eat yesterday?', vi: 'Hôm qua bạn đã ăn gì?', hint: 'I ate phở and some mango.', k: ['ate|had', 'pho|rice|noodles|bread|banh|mango|chicken|fish|egg|eggs|soup|cake|fruit|spring|rolls|pizza|meat|vegetables|apple|banana'], c: ['I ate phở and some mango.', 'I eat rice every day.', "I ate at my grandma's house."] },
            { q: 'Did you try any new food last week?', vi: 'Tuần trước bạn có thử món mới nào không?', hint: 'Yes, I tried durian. It was smelly!', k: ['yes|no', 'tried|try|ate|tasted|had'], c: ['Yes, I tried durian. It was smelly!', 'Yes, I like durian very much.', 'No, I went to the park.'] }
          ],
          snow: { vi: 'Kể chuyến đi chợ cuối tuần', l: [[['went'], 'đã đi'], [['We', 'went', 'to the market.'], 'Tụi mình đã đi chợ.'], [['On Saturday,', 'we', 'went', 'to the market', 'and bought fresh mangoes.'], 'Thứ Bảy, tụi mình đã đi chợ và mua xoài tươi.']], x: ['go', 'goed'] },
          cb: ['b', 'Mai, what did you do last weekend?', 'Mai ơi, cuối tuần trước con đã làm gì?', [
            ['yes', 'I went to Hồ Tây and saw a big swan boat!', 'Con đã đi Hồ Tây và thấy một chiếc thuyền thiên nga to!', 'How lovely! Did you ride it?', 'Hay quá! Con có đi thuyền không?', '🦢'],
            ['idea', 'I stayed home and built a LEGO train!', 'Con ở nhà và lắp một đoàn tàu LEGO ạ!', 'Wow! Show me a photo, please!', 'Oa! Cho cô xem ảnh nhé!', '🧱']]],
          tb: ['b', 'Would you like to try a bánh xèo? It is hot and crispy!', 'Con có muốn thử bánh xèo không? Nóng giòn lắm!', [
            ['yes', 'Yes, please! I tried it in Huế and loved it!', 'Có ạ! Con đã thử ở Huế và rất thích!', 'Great! Here is a big one for you.', 'Tuyệt! Một cái to cho con nè.', '🥞'],
            ['calm', 'Just a little piece, please. I am a bit full.', 'Con xin một miếng nhỏ thôi ạ. Con hơi no.', 'Sure, a small piece to taste.', 'Được, một miếng nhỏ để nếm thử nhé.', '🙂']]],
          fact: ['Most English past verbs end in -ed, but many common ones, like went and saw, are irregular.', 'Phần lớn động từ quá khứ tiếng Anh có đuôi -ed, nhưng nhiều từ hay dùng như went và saw là bất quy tắc.'],
          tf: [
            ['The past of buy is bought.', true, 'Yes! Buy becomes bought, not buyed.', 'Đúng! Buy thành bought, không phải buyed.'],
            ['The past of eat is eated.', false, 'No! The past of eat is ate.', 'Sai! Quá khứ của eat là ate.']
          ],
          qa: ['Where did you go last weekend?', 'Cuối tuần trước bạn đã đi đâu?', 'I went to the park with my family.', ['went|was|visited|stayed', 'park|zoo|museum|beach|market|grandma|grandpa|home|cinema|mall|lake|pool']]
        },
        {
          title: 'First, Then, Finally', titleVi: 'Đầu tiên, Sau đó, Cuối cùng', icon: '🔢',
          words: [
            ['First', 'adv', '/fɜːst/', 'Đầu tiên', '1️⃣', 'First, we ate breakfast at home.', 'Đầu tiên, tụi mình ăn sáng ở nhà.', 'You use this word to tell number one in a story.'],
            ['Then', 'adv', '/ðen/', 'Sau đó', '2️⃣', 'Then, we took a bus to the old town.', 'Sau đó, tụi mình đi xe buýt ra phố cổ.', 'You use this word for the next thing in a story.'],
            ['After that', 'phrase', '/ˈɑːftə ðæt/', 'Sau đó nữa', '3️⃣', 'After that, we watched a water puppet show.', 'Sau đó nữa, tụi mình xem múa rối nước.', 'Two words that mean next again, in the middle of a story.'],
            ['Finally', 'adv', '/ˈfaɪnəli/', 'Cuối cùng', '🏁', 'Finally, we went home and slept.', 'Cuối cùng, tụi mình về nhà và đi ngủ.', 'You use this word for the last thing in a story.'],
            ['It was amazing!', 'phrase', '/ɪt wɒz əˈmeɪzɪŋ/', 'Thật tuyệt vời!', '🤩', 'We saw the puppet dragons. It was amazing!', 'Tụi mình thấy rồng rối nước. Thật tuyệt vời!', 'You say this when something in the past was super, super good.']
          ],
          comic: {
            title: 'The Mixed-Up Story', titleVi: 'Câu chuyện lộn xộn',
            panels: [
              ['a', 'Finally, we woke up. First, we went to bed!', 'Cuối cùng, tụi mình thức dậy. Đầu tiên, tụi mình đi ngủ!', '🙃'],
              ['b', 'Ha ha! That is upside down! Try again.', 'Ha ha! Ngược hết rồi! Thử lại nào.', '🔄'],
              ['a', 'First, we ate phở. Then, we saw the water puppets.', 'Đầu tiên, tụi mình ăn phở. Sau đó, tụi mình xem múa rối nước.', '🎎'],
              ['b', 'Perfect order! And how was the show?', 'Đúng thứ tự rồi! Buổi diễn thế nào?', '👏']
            ],
            blanks: [[2, 'Then', ['Then', 'Tomorrow', 'Never']], [3, 'was', ['was', 'were', 'is']]]
          },
          build: [
            { vi: 'Em muốn kể: Đầu tiên, tụi mình đã ăn bánh mì.', a: ['First,', 'we', 'ate', 'bánh mì.'], x: ['Finally', 'eat'] },
            { vi: 'Em muốn kể: Cuối cùng, tụi mình đã về nhà.', a: ['Finally,', 'we', 'went', 'home.'], x: ['First', 'go'] }
          ],
          talk: [
            { q: 'What did you do first this morning?', vi: 'Sáng nay việc đầu tiên bạn làm là gì?', hint: 'First, I woke up and brushed my teeth.', k: ['first|firstly|then', 'woke|brushed|ate|had|washed|got|made|drank|went|did'], c: ['First, I woke up and brushed my teeth.', 'First, I wake up at six.', 'Finally, I went to bed.'] },
            { q: 'How was your last holiday?', vi: 'Kỳ nghỉ gần nhất của bạn thế nào?', hint: 'It was amazing! We went to the beach.', k: ['was|were', 'amazing|great|fun|good|nice|boring|wonderful|okay|ok|cool|exciting|awesome|bad'], c: ['It was amazing! We went to the beach.', 'It is amazing! I love holidays.', 'It was in July.'] }
          ],
          snow: { vi: 'Kể theo thứ tự về buổi xem múa rối nước', l: [[['After that,'], 'Sau đó nữa,'], [['We', 'watched', 'a puppet show.'], 'Tụi mình đã xem múa rối.'], [['After that,', 'we', 'watched', 'a water puppet show', 'by the lake.'], 'Sau đó nữa, tụi mình xem múa rối nước bên hồ.']], x: ['watch', 'Tomorrow,'] },
          cb: ['b', 'Mai, tell the class your weekend story, please.', 'Mai ơi, con kể cho cả lớp nghe chuyện cuối tuần nhé.', [
            ['yes', 'First, we went to the old town. Then, we ate ice cream!', 'Đầu tiên, nhà con đi phố cổ. Sau đó, tụi con ăn kem!', 'Yummy story! What happened after that?', 'Câu chuyện ngon quá! Sau đó thế nào nữa?', '🍦'],
            ['ask', 'Can I show my photos while I talk?', 'Con vừa kể vừa cho xem ảnh được không ạ?', 'Great idea! Pictures make stories better.', 'Ý hay! Có hình thì kể hay hơn.', '📷']]],
          tb: ['b', 'How was the water puppet show?', 'Buổi múa rối nước thế nào?', [
            ['yes', 'It was amazing! The dragons sprayed water!', 'Thật tuyệt vời! Mấy con rồng phun nước!', 'Ha ha! Did you get wet?', 'Ha ha! Con có bị ướt không?', '🐉'],
            ['calm', 'It was okay, but it was very loud.', 'Cũng được ạ, nhưng ồn quá.', 'That is fine. Next time we can sit at the back.', 'Không sao. Lần sau mình ngồi phía sau nhé.', '🙂']]],
          fact: ['Vietnamese water puppetry is about 1,000 years old!', 'Múa rối nước Việt Nam đã có khoảng 1.000 năm tuổi!'],
          tf: [
            ['Finally comes at the end of a story.', true, 'Yes! Finally tells the last thing.', 'Đúng! Finally kể việc cuối cùng.'],
            ['We usually start a story with Finally.', false, 'No! We start with First.', 'Sai! Mình bắt đầu bằng First.']
          ],
          qa: ['What did you do last Sunday? Tell me in order.', 'Chủ nhật tuần trước bạn đã làm gì? Kể theo thứ tự nhé.', 'First, I went to the park. Then, I ate ice cream.', ['first|then|after|finally', 'went|ate|saw|played|visited|watched|had|bought']]
        },
        {
          title: 'A Day at the Museum', titleVi: 'Một ngày ở bảo tàng', icon: '🦴',
          words: [
            ['dinosaur bones', 'noun', '/ˈdaɪnəsɔː bəʊnz/', 'xương khủng long', '🦴', 'We saw giant dinosaur bones at the museum.', 'Tụi mình đã thấy bộ xương khủng long khổng lồ ở bảo tàng.', 'Very old and very big pieces of a skeleton from an animal that lived long ago.'],
            ['bronze drum', 'noun', '/brɒnz drʌm/', 'trống đồng', '🥁', 'The Đông Sơn bronze drum has a star in the middle.', 'Trống đồng Đông Sơn có hình ngôi sao ở giữa.', 'An old metal instrument from Vietnam with birds and a sun on top.'],
            ['ancient', 'adj', '/ˈeɪnʃənt/', 'cổ xưa', '🏺', 'This ancient pot is three thousand years old.', 'Chiếc bình cổ xưa này ba nghìn năm tuổi.', 'Very, very old, from thousands of years ago.'],
            ['tour guide', 'noun', '/tʊə ɡaɪd/', 'hướng dẫn viên', '🧑‍🏫', 'The tour guide told us a funny story.', 'Cô hướng dẫn viên kể cho tụi mình một câu chuyện vui.', 'This person shows visitors around and explains things.'],
            ['fossil', 'noun', '/ˈfɒsl/', 'hóa thạch', '🐚', 'I touched a fossil of a sea shell.', 'Mình đã chạm vào hóa thạch của một vỏ sò.', 'An animal or plant from long ago that turned into stone.']
          ],
          comic: {
            title: 'The Drum That Talked', titleVi: 'Chiếc trống biết nói',
            panels: [
              ['b', 'Welcome! I am your tour guide today.', 'Chào mừng các con! Hôm nay cô là hướng dẫn viên.', '👋'],
              ['a', 'Wow! Is this a real bronze drum?', 'Oa! Đây là trống đồng thật ạ?', '🥁'],
              ['b', 'Yes! It is ancient. People made it over 2,000 years ago.', 'Đúng vậy! Nó rất cổ. Người xưa làm ra nó hơn 2.000 năm trước.', '🏺'],
              ['a', 'I took a photo for my weekend story!', 'Con đã chụp ảnh cho câu chuyện cuối tuần!', '📸']
            ],
            blanks: [[1, 'bronze drum', ['bronze drum', 'brown drum', 'bronze drink']], [2, 'ancient', ['ancient', 'brand-new', 'angry']]]
          },
          build: [
            { vi: 'Em muốn kể: Tụi mình đã thấy xương khủng long ở bảo tàng.', a: ['We', 'saw', 'dinosaur bones', 'at the museum.'], x: ['see', 'at the cinema.'] },
            { vi: 'Em muốn kể: Cô hướng dẫn viên đã kể cho tụi mình một câu chuyện.', a: ['The tour guide', 'told', 'us', 'a story.'], x: ['telled', 'tells'] }
          ],
          talk: [
            { q: 'What did you see at the museum?', vi: 'Bạn đã thấy gì ở bảo tàng?', hint: 'I saw dinosaur bones and a bronze drum.', k: ['saw|looked|watched|found', 'bones|dinosaur|dinosaurs|drum|fossil|fossils|pot|pots|boat|boats|statue|statues|painting|paintings|coins|map|old'], c: ['I saw dinosaur bones and a bronze drum.', 'I want to see dinosaur bones.', 'I saw my friends at the zoo.'] },
            { q: 'Do you like museums? Why?', vi: 'Bạn có thích bảo tàng không? Tại sao?', hint: 'Yes, because I can learn about the past.', k: ['yes|no|sometimes', 'learn|past|old|interesting|boring|fun|dinosaurs|history|things|cool|quiet'], c: ['Yes, because I can learn about the past.', 'Yes, I went to a museum last week.', 'Yes, because I like swimming.'] }
          ],
          snow: { vi: 'Kể về chuyến đi bảo tàng', l: [[['a fossil'], 'một hóa thạch'], [['I', 'touched', 'a fossil.'], 'Mình đã chạm vào hóa thạch.'], [['At the museum,', 'I', 'touched', 'an ancient fossil', 'with my finger.'], 'Ở bảo tàng, mình đã chạm vào một hóa thạch cổ bằng ngón tay.']], x: ['touch', 'tomorrow'] },
          cb: ['b', 'Please do not touch the bronze drum. It is very old.', 'Các con đừng chạm vào trống đồng nhé. Nó rất cổ.', [
            ['yes', 'Okay! I will just look and take notes.', 'Vâng ạ! Con chỉ nhìn và ghi chép thôi.', 'Thank you! You are a great museum visitor.', 'Cảm ơn con! Con là khách tham quan tuyệt vời.', '📝'],
            ['ask', 'Why are there birds on top of the drum?', 'Sao trên mặt trống lại có hình chim ạ?', 'Good question! People long ago loved birds and the sun.', 'Câu hỏi hay! Người xưa yêu chim và mặt trời.', '🐦']]],
          tb: ['b', 'The museum shop has dinosaur toys and postcards. What do you want?', 'Cửa hàng bảo tàng có đồ chơi khủng long và bưu thiếp. Con muốn gì?', [
            ['yes', 'A dinosaur toy, please! For my little brother.', 'Con muốn đồ chơi khủng long ạ! Cho em trai con.', 'How kind! He will love it.', 'Con tốt bụng quá! Em sẽ thích lắm.', '🦖'],
            ['idea', 'A postcard! I want to send it to my pen pal.', 'Bưu thiếp ạ! Con muốn gửi cho bạn qua thư.', 'Lovely! Write about the bronze drum.', 'Hay quá! Viết về trống đồng nhé.', '💌']]],
          fact: ['The famous Đông Sơn bronze drums were made more than 2,000 years ago.', 'Những chiếc trống đồng Đông Sơn nổi tiếng được làm từ hơn 2.000 năm trước.'],
          tf: [
            ['A fossil can be millions of years old.', true, 'Yes! Some fossils are older than the dinosaurs.', 'Đúng! Có những hóa thạch còn cổ hơn cả khủng long.'],
            ['Dinosaurs and people lived at the same time.', false, 'No! Dinosaurs died out millions of years before people.', 'Sai! Khủng long tuyệt chủng hàng triệu năm trước khi có con người.']
          ],
          qa: ['What did you see on your last school trip?', 'Bạn đã thấy gì trong chuyến dã ngoại gần nhất của trường?', 'I saw old boats and a bronze drum.', ['saw|visited|went|watched', 'museum|drum|boats|animals|zoo|park|farm|temple|bones|pagoda|fossil']]
        }
      ],
      mystery: {
        t: "Mai's Favourite Thing", tv: 'Món đồ Mai thích nhất',
        intro: ['Mai visited the museum. She took a photo of her favourite thing. What is it?', 'Mai đã đi bảo tàng. Bạn ấy chụp ảnh món đồ mình thích nhất. Đó là gì?'],
        clues: [['Clue one: It did not come from an animal.', 'Manh mối 1: Nó không đến từ một con vật.'],
          ['Clue two: It is not made of wood. It is made of metal.', 'Manh mối 2: Nó không làm bằng gỗ. Nó làm bằng kim loại.'],
          ['Clue three: Long ago, people hit it to make music.', 'Manh mối 3: Ngày xưa, người ta đánh vào nó để tạo ra âm nhạc.']],
        q: ['What did Mai take a photo of?', 'Mai đã chụp ảnh món gì?'],
        o: [['dinosaur bones', '🦴', 'xương khủng long'], ['a water puppet', '🎎', 'con rối nước'], ['a bronze drum', '🥁', 'trống đồng'], ['an ancient wooden boat', '🛶', 'thuyền gỗ cổ']], a: 2,
        win: ['Yes! The Đông Sơn bronze drum! Boom, boom!', 'Đúng rồi! Trống đồng Đông Sơn! Tùng, tùng!']
      }
    },

    /* ---------- WEEK 32: Little Detective & Finding Clues ---------- */
    {
      id: 'w32', week: 32, month: 8, monthTitle: M8[0], monthTitleVi: M8[1],
      name: 'Little Detective & Finding Clues', vi: 'Thám tử nhí & Đi tìm manh mối', short: 'Little Detective',
      topic: 'Observation, Clues & Logical Deduction', topicVi: 'Quan sát, manh mối & suy luận logic',
      color: '#4B5563', dark: '#1F2937', icon: '🔍', model: ['detective', 'Detective Office', 'Văn phòng thám tử'],
      chars: { a: { name: 'Khoa', fig: 'cap-detective|determined|torso-detective|legs-tan|magnifier' }, b: { name: 'Grandpa Tư', fig: 'none-hat|wink|torso-blue|legs-black|book' } },
      chatter: [
        ['Look! A muddy footprint!', 'Nhìn kìa! Một dấu chân dính bùn!'],
        ['I noticed crumbs on the floor.', 'Mình để ý thấy vụn bánh trên sàn.'],
        ['The birthday cake is missing!', 'Bánh sinh nhật biến mất rồi!'],
        ['It must be the cat! Look at its whiskers!', 'Chắc chắn là con mèo! Nhìn râu nó kìa!'],
        ['Case closed! Good job, detective!', 'Phá án xong! Giỏi lắm, thám tử!']
      ],
      lessons: [
        {
          title: 'My Detective Toolkit', titleVi: 'Bộ đồ nghề thám tử', icon: '🧰',
          words: [
            ['clue', 'noun', '/kluː/', 'manh mối', '🧩', 'This muddy shoe is a big clue!', 'Chiếc giày dính bùn này là một manh mối lớn!', 'A small sign that helps you solve a mystery.'],
            ['footprint', 'noun', '/ˈfʊtprɪnt/', 'dấu chân', '👣', 'There is a footprint in the mud.', 'Có một dấu chân trong bùn.', 'The mark your shoe makes on the ground.'],
            ['fingerprint', 'noun', '/ˈfɪŋɡəprɪnt/', 'dấu vân tay', '🖐️', 'I found a fingerprint on the glass.', 'Mình tìm thấy một dấu vân tay trên cốc.', 'The tiny lines from your fingertip on a window or a cup.'],
            ['magnifying glass', 'noun', '/ˈmæɡnɪfaɪɪŋ ɡlɑːs/', 'kính lúp', '🔍', 'I look at the clue with my magnifying glass.', 'Mình nhìn manh mối bằng kính lúp.', 'A round glass that makes small things look big.'],
            ['I noticed', 'phrase', '/aɪ ˈnəʊtɪst/', 'Mình để ý thấy', '👁️', 'I noticed a red hair on the sofa.', 'Mình để ý thấy một sợi tóc đỏ trên ghế sofa.', 'You say this when your eyes found something small and important.']
          ],
          comic: {
            title: 'Detective School', titleVi: 'Trường học thám tử',
            panels: [
              ['b', 'Khoa, a good detective looks carefully. What can you see?', 'Khoa ơi, thám tử giỏi phải nhìn kỹ. Con thấy gì nào?', '🧐'],
              ['a', 'I noticed a footprint by the door!', 'Con để ý thấy một dấu chân cạnh cửa!', '👣'],
              ['b', 'Good! Now use the magnifying glass.', 'Giỏi! Giờ dùng kính lúp nhé.', '🔍'],
              ['a', 'There is a fingerprint on the cup! It is a clue!', 'Có dấu vân tay trên cốc! Đó là một manh mối!', '🖐️']
            ],
            blanks: [[1, 'footprint', ['footprint', 'football', 'foot spoon']], [2, 'magnifying glass', ['magnifying glass', 'magic noodle', 'glass of milk']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình để ý thấy một dấu chân trong vườn.', a: ['I', 'noticed', 'a footprint', 'in the garden.'], x: ['notice', 'a fingernail'] },
            { vi: 'Em muốn nói: Thám tử dùng kính lúp.', a: ['Detectives', 'use', 'magnifying glasses.'], x: ['uses', 'sunglasses.'] }
          ],
          talk: [
            { q: 'What can a detective find with a magnifying glass?', vi: 'Thám tử tìm được gì bằng kính lúp?', hint: 'A detective can find fingerprints and hair.', k: ['fingerprint|fingerprints|hair|hairs|footprint|footprints|clue|clues|crumbs|marks|dust|tiny|small'], c: ['A detective can find fingerprints and hair.', 'A detective can find a lost dog.', 'A detective wears a big hat.'] },
            { q: 'Look around you. What did you notice?', vi: 'Nhìn xung quanh xem. Bạn để ý thấy gì?', hint: 'I noticed a pencil under the table.', k: ['noticed|see|saw|notice|spotted|found', 'pencil|book|bag|toy|cup|shoe|table|chair|window|door|cat|dog|desk|pen|bottle|clock|box|lamp'], c: ['I noticed a pencil under the table.', 'I am a good detective.', 'I lost my pencil case yesterday.'] }
          ],
          snow: { vi: 'Kể về manh mối em tìm thấy', l: [[['a footprint'], 'một dấu chân'], [['I', 'noticed', 'a footprint.'], 'Mình để ý thấy một dấu chân.'], [['This morning,', 'I', 'noticed', 'a big footprint', 'near the kitchen door.'], 'Sáng nay, mình để ý thấy một dấu chân to gần cửa bếp.']], x: ['notice', 'tomorrow'] },
          cb: ['b', 'Detective Khoa, what do you need for your toolkit?', 'Thám tử Khoa, con cần gì cho bộ đồ nghề?', [
            ['idea', 'A magnifying glass, a notebook and a torch!', 'Một kính lúp, một cuốn sổ và một đèn pin ạ!', 'Perfect! Now you are ready for a case.', 'Hoàn hảo! Giờ con sẵn sàng phá án rồi.', '🧰'],
            ['ask', 'Can I borrow your old detective hat, Grandpa?', 'Ông cho con mượn mũ thám tử cũ được không ạ?', 'Of course! It brings good luck.', 'Tất nhiên! Nó mang lại may mắn đấy.', '🕵️']]],
          tb: ['b', 'Can you find my glasses? I think I lost them.', 'Con tìm giúp ông cặp kính được không? Ông làm mất rồi.', [
            ['yes', 'Sure! I noticed something on your head, Grandpa!', 'Được ạ! Con để ý thấy có gì đó trên đầu ông kìa!', 'Ha ha! They were there all the time!', 'Ha ha! Kính ở đó suốt mà ông không biết!', '👓'],
            ['ask', 'Where were you when you last had them?', 'Lần cuối ông đeo kính là ở đâu ạ?', 'In the garden! Let us look there.', 'Ở ngoài vườn! Mình ra đó tìm nhé.', '🌿']]],
          fact: ['Every person has different fingerprints, even identical twins!', 'Mỗi người có dấu vân tay khác nhau, kể cả cặp song sinh giống hệt nhau!'],
          tf: [
            ['A magnifying glass makes small things look bigger.', true, 'Yes! The curved glass bends light and makes things look big.', 'Đúng! Mặt kính cong bẻ cong ánh sáng làm vật trông to hơn.'],
            ['Two people can have exactly the same fingerprints.', false, 'No! Every person has different fingerprints.', 'Sai! Mỗi người có dấu vân tay khác nhau.']
          ],
          qa: ['What would you put in a detective toolkit?', 'Bạn sẽ bỏ gì vào bộ đồ nghề thám tử?', 'I would put a magnifying glass and a notebook.', ['put|need|take|have|bring', 'magnifying|glass|notebook|torch|pen|camera|pencil|gloves|map']]
        },
        {
          title: 'The Missing Birthday Cake', titleVi: 'Chiếc bánh sinh nhật biến mất', icon: '🎂',
          words: [
            ['missing', 'adj', '/ˈmɪsɪŋ/', 'bị mất, biến mất', '❔', 'My birthday cake is missing!', 'Bánh sinh nhật của mình biến mất rồi!', 'When something is not in its place and nobody can find it.'],
            ['suspect', 'noun', '/ˈsʌspekt/', 'nghi phạm', '🕵️', 'The dog is our first suspect.', 'Chú chó là nghi phạm đầu tiên của tụi mình.', 'A person or animal who maybe did the bad thing.'],
            ['crumbs', 'noun', '/krʌmz/', 'vụn bánh', '🍪', 'There were crumbs on the dog\'s nose.', 'Có vụn bánh trên mũi chú chó.', 'Tiny little pieces of bread or cake.'],
            ['It must be', 'phrase', '/ɪt mʌst biː/', 'Chắc chắn là', '💡', 'It must be the cat! It loves cream.', 'Chắc chắn là con mèo! Nó thích kem lắm.', 'You say this when you are almost sure of the answer.'],
            ['evidence', 'noun', '/ˈevɪdəns/', 'bằng chứng', '📁', 'The crumbs are our evidence.', 'Vụn bánh là bằng chứng của tụi mình.', 'Things you find that show what really happened.']
          ],
          comic: {
            title: 'Who Ate the Cake?', titleVi: 'Ai đã ăn bánh?',
            panels: [
              ['b', 'Oh no! The birthday cake is missing!', 'Ôi không! Bánh sinh nhật biến mất rồi!', '🎂'],
              ['a', 'Look, Grandpa! I noticed crumbs on the floor.', 'Ông ơi, nhìn kìa! Con để ý thấy vụn bánh trên sàn.', '🍰'],
              ['b', 'The crumbs go to the garden. Who is our suspect?', 'Vụn bánh dẫn ra vườn. Ai là nghi phạm đây?', '🌿'],
              ['a', 'There is cream on Lucky\'s nose. It must be Lucky!', 'Có kem trên mũi Lucky. Chắc chắn là Lucky rồi!', '🐶']
            ],
            blanks: [[0, 'missing', ['missing', 'singing', 'swimming']], [3, 'It must be', ['It must be', 'It mustard', 'It mustn\'t eat']]]
          },
          build: [
            { vi: 'Em muốn kể: Có vụn bánh trên sàn bếp.', a: ['There', 'were', 'crumbs', 'on the kitchen floor.'], x: ['was', 'clouds'] },
            { vi: 'Em muốn kết luận: Chắc chắn là chú chó, vì có kem trên mũi nó.', a: ['It', 'must be', 'the dog', 'because of the cream.'], x: ['musts be', 'the moon'] }
          ],
          talk: [
            { q: 'The cake is missing. What do you do first?', vi: 'Bánh biến mất rồi. Việc đầu tiên bạn làm là gì?', hint: 'First, I look for clues like crumbs.', k: ['look|find|search|ask|check|follow', 'clues|clue|crumbs|footprints|fingerprints|kitchen|floor|everyone|plate|table'], c: ['First, I look for clues like crumbs.', 'First, I eat some ice cream.', 'First, I cry because I am sad.'] },
            { q: 'There is cream on the cat\'s face. Who ate the cake?', vi: 'Có kem trên mặt con mèo. Ai đã ăn bánh?', hint: 'It must be the cat!', k: ['cat'], c: ['It must be the cat!', 'It must be my brother!', 'It must be the dog!'] }
          ],
          snow: { vi: 'Kể về vụ án chiếc bánh', l: [[['missing'], 'biến mất'], [['The cake', 'was', 'missing.'], 'Chiếc bánh đã biến mất.'], [['At the party,', 'the birthday cake', 'was', 'missing', 'from the table.'], 'Ở bữa tiệc, chiếc bánh sinh nhật đã biến mất khỏi bàn.']], x: ['were', 'found'] },
          cb: ['b', 'Your little sister says she did not take the cake. Do you believe her?', 'Em gái con nói em không lấy bánh. Con có tin em không?', [
            ['calm', 'Let us look for evidence first.', 'Mình tìm bằng chứng trước đã ạ.', 'Wise! A good detective checks the facts.', 'Khôn ngoan! Thám tử giỏi luôn kiểm tra sự thật.', '📁'],
            ['ask', 'Can I check her hands for cream?', 'Con xem tay em có dính kem không nhé?', 'Clean hands! She is not the suspect.', 'Tay sạch! Em không phải nghi phạm.', '🙌']]],
          tb: ['b', 'We found the thief. It was Lucky the dog! What now?', 'Mình tìm ra thủ phạm rồi. Là chú chó Lucky! Giờ sao đây?', [
            ['idea', 'Let us bake a new cake together!', 'Mình cùng nướng bánh mới đi ông!', 'Yes! And this time we hide it well.', 'Đúng! Lần này mình giấu thật kỹ.', '🧁'],
            ['calm', 'Poor Lucky! Cake is not good for dogs.', 'Tội Lucky! Bánh không tốt cho chó đâu.', 'You are right. Let us give him water.', 'Con nói đúng. Mình cho nó uống nước nhé.', '💧']]],
          fact: ['A dog can smell thousands of times better than a person.', 'Chó có thể ngửi thính hơn con người hàng nghìn lần.'],
          tf: [
            ['Chocolate is bad for dogs.', true, 'Yes! Chocolate can make dogs very ill.', 'Đúng! Sô-cô-la có thể làm chó bị ốm nặng.'],
            ['A suspect is always the thief.', false, 'No! A suspect is only maybe the thief. We need evidence.', 'Sai! Nghi phạm chỉ là người có thể đã làm. Mình cần bằng chứng.']
          ],
          qa: ['Did you ever lose something? How did you find it?', 'Bạn đã bao giờ làm mất đồ chưa? Bạn tìm lại thế nào?', 'Yes, I lost my eraser. I found it under my desk.', ['lost|lose|yes|no', 'found|find|looked|under|bag|desk|bed|mum|friend']]
        },
        {
          title: 'The Case of the Lost Cat', titleVi: 'Vụ án chú mèo đi lạc',
          icon: '🐈',
          words: [
            ['search for', 'verb', '/sɜːtʃ fɔː/', 'tìm kiếm', '🔦', 'We search for the cat in every room.', 'Tụi mình tìm con mèo ở mọi phòng.', 'You look very carefully for something lost.'],
            ['paw prints', 'noun', '/pɔː prɪnts/', 'dấu chân thú', '🐾', 'There are paw prints on the car roof.', 'Có dấu chân mèo trên nóc xe.', 'Little marks from the feet of a cat or a dog.'],
            ['whiskers', 'noun', '/ˈwɪskəz/', 'ria (mèo)', '🐱', 'My cat has long white whiskers.', 'Mèo nhà mình có bộ ria dài màu trắng.', 'Long thin hairs on the face of a cat.'],
            ['reward', 'noun', '/rɪˈwɔːd/', 'phần thưởng', '🎁', 'Mrs Lan gave us a reward: a box of mangoes!', 'Cô Lan tặng tụi mình phần thưởng: một hộp xoài!', 'A present you get for doing something good or helpful.'],
            ['Case closed!', 'phrase', '/keɪs kləʊzd/', 'Phá án xong!', '✅', 'We found the cat. Case closed!', 'Tụi mình tìm thấy mèo rồi. Phá án xong!', 'A detective says this when the mystery is solved.']
          ],
          comic: {
            title: 'Where Is Mướp?', titleVi: 'Mướp đâu rồi?',
            panels: [
              ['b', 'Mrs Lan\'s cat, Mướp, is lost. Can you help?', 'Mèo Mướp của cô Lan bị lạc. Con giúp được không?', '🐈'],
              ['a', 'Yes! Let us search for paw prints first.', 'Được ạ! Mình tìm dấu chân mèo trước đã.', '🐾'],
              ['b', 'Listen! A tiny meow from the mango tree!', 'Nghe kìa! Có tiếng meo nhỏ từ cây xoài!', '🌳'],
              ['a', 'I can see her whiskers! Come down, Mướp!', 'Con thấy ria của nó rồi! Xuống đây nào Mướp!', '😺']
            ],
            blanks: [[1, 'paw prints', ['paw prints', 'pancakes', 'paw paint']], [3, 'whiskers', ['whiskers', 'wheels', 'windows']]]
          },
          build: [
            { vi: 'Em muốn kể: Tụi mình đã thấy dấu chân mèo cạnh cây xoài.', a: ['We', 'saw', 'paw prints', 'near the mango tree.'], x: ['see', 'in the sky.'] },
            { vi: 'Em muốn kể: Cô Lan đã tặng tụi mình một phần thưởng.', a: ['Mrs Lan', 'gave', 'us', 'a reward.'], x: ['gived', 'gives'] }
          ],
          talk: [
            { q: 'Your cat is lost. Where do you search for it?', vi: 'Mèo của bạn bị lạc. Bạn tìm nó ở đâu?', hint: 'I search for it under the beds and in the trees.', k: ['search|look|find|check', 'bed|beds|tree|trees|garden|kitchen|roof|box|street|sofa|cupboard|under|park|house'], c: ['I search for it under the beds and in the trees.', 'I give it some milk.', 'I make a poster with a photo.'] },
            { q: 'What reward would you like for helping?', vi: 'Bạn muốn phần thưởng gì khi giúp đỡ?', hint: 'I would like a big hug and some mangoes.', k: ['like|want|love', 'hug|mango|mangoes|cake|book|toy|lego|sweets|ice|cream|sticker|stickers|candy|chocolate|present|gift'], c: ['I would like a big hug and some mangoes.', 'I would like to help my friend.', 'I helped my grandma yesterday.'] }
          ],
          snow: { vi: 'Kể về cuộc tìm mèo', l: [[['paw prints'], 'dấu chân mèo'], [['We', 'found', 'paw prints.'], 'Tụi mình tìm thấy dấu chân mèo.'], [['In the garden,', 'we', 'found', 'small paw prints', 'under the mango tree.'], 'Trong vườn, tụi mình tìm thấy dấu chân mèo nhỏ dưới gốc xoài.']], x: ['find', 'footballs'] },
          cb: ['b', 'Mướp is stuck in the tall tree. What should we do?', 'Mướp bị kẹt trên cây cao. Mình nên làm gì?', [
            ['idea', 'Let us put some fish under the tree!', 'Mình đặt ít cá dưới gốc cây đi ông!', 'Clever! Look, she is coming down!', 'Thông minh! Nhìn kìa, nó đang xuống!', '🐟'],
            ['calm', 'I should not climb. Can we ask a grown-up with a ladder?', 'Con không nên trèo. Mình nhờ người lớn mang thang nhé?', 'Very safe thinking! Let us call Uncle Hùng.', 'Suy nghĩ rất an toàn! Gọi chú Hùng nhé.', '🪜']]],
          tb: ['b', 'Thank you for finding Mướp! Here is your reward.', 'Cảm ơn con đã tìm thấy Mướp! Phần thưởng của con đây.', [
            ['yes', 'Thank you! Can I share the mangoes with Grandpa?', 'Con cảm ơn cô! Con chia xoài cho ông được không ạ?', 'Of course! You are a kind detective.', 'Tất nhiên! Con là thám tử tốt bụng.', '🥭'],
            ['calm', 'No reward, please. I am happy Mướp is safe.', 'Con không cần thưởng đâu ạ. Mướp an toàn là con vui rồi.', 'Then come and play with Mướp any time!', 'Vậy con cứ đến chơi với Mướp bất cứ lúc nào nhé!', '🐈']]],
          fact: ['Cats can hear very high sounds that people cannot hear, like tiny mouse squeaks.', 'Mèo nghe được những âm thanh rất cao mà con người không nghe thấy, như tiếng chuột kêu chít chít.'],
          tf: [
            ['Cats use their whiskers to feel things around them.', true, 'Yes! Whiskers help cats feel the space around them, even in the dark.', 'Đúng! Ria giúp mèo cảm nhận không gian xung quanh, kể cả trong bóng tối.'],
            ['Paw prints are made by fish.', false, 'No! Fish have no paws. Cats and dogs make paw prints.', 'Sai! Cá không có chân. Chó mèo mới để lại dấu chân.']
          ],
          qa: ['How can you help a lost pet?', 'Bạn có thể giúp thú cưng bị lạc như thế nào?', 'I can search for it and tell a grown-up.', ['search|look|find|tell|ask|call|make|put', 'pet|grown-up|adult|mum|dad|neighbours|poster|food|street']]
        }
      ],
      mystery: {
        t: 'Who Took the Birthday Cake?', tv: 'Ai đã lấy bánh sinh nhật?',
        intro: ["Khoa's birthday cake is missing from the kitchen! There are four suspects.", 'Bánh sinh nhật của Khoa biến mất khỏi bếp! Có bốn nghi phạm.'],
        clues: [['Clue one: Grandpa Tư noticed the thief had four legs.', 'Manh mối 1: Ông Tư để ý thấy thủ phạm có bốn chân.'],
          ['Clue two: The cat was asleep upstairs all afternoon.', 'Manh mối 2: Con mèo ngủ trên lầu cả buổi chiều.'],
          ['Clue three: The paw prints were big and muddy, and they went to the garden.', 'Manh mối 3: Dấu chân thú to và dính bùn, dẫn ra vườn.']],
        q: ['Who took the cake?', 'Ai đã lấy bánh?'],
        o: [['the baby brother', '👶', 'em bé'], ['Lucky the dog', '🐶', 'chú chó Lucky'], ['the cat', '🐱', 'con mèo'], ['Grandpa Tư', '👴', 'ông Tư']], a: 1,
        win: ['It must be Lucky! He is in the garden with cream on his nose. Case closed!', 'Chắc chắn là Lucky! Nó đang ở ngoài vườn, mũi dính kem. Phá án xong!']
      }
    }
  );

  /* ======================= THÁNG 9 ======================= */
  const M9 = ['Space, Inventions & Confident Communicator', 'Vũ trụ, Phát minh & Giao tiếp Tự tin'];

  /* ======================= THÁNG 9 ======================= */
  Z.push(
    /* ---------- WEEK 33: Day, Night & The Solar System ---------- */
    {
      id: 'w33', week: 33, month: 9, monthTitle: M9[0], monthTitleVi: M9[1],
      name: 'Day, Night & The Solar System', vi: 'Ngày, Đêm & Hệ Mặt Trời', short: 'Solar System',
      topic: 'Day, Night & The Solar System (Science)', topicVi: 'Khám phá vũ trụ: vì sao có ngày và đêm?',
      color: '#4F46E5', dark: '#312E81', icon: '🪐', model: ['observatory', 'Rooftop Observatory', 'Đài thiên văn trên sân thượng'],
      chars: { a: { name: 'Bin', fig: 'helmet-astro|surprised|torso-astro|legs-white|flag' }, b: { name: 'Dad', fig: 'hair-brown|grin|torso-stars|legs-black|camera' } },
      chatter: [
        ['The Earth spins like a top!', 'Trái Đất quay tròn như con quay!'],
        ['Look! The Moon is very bright tonight.', 'Nhìn kìa! Tối nay Mặt Trăng sáng quá.'],
        ['The Sun is a star. Did you know?', 'Mặt Trời là một ngôi sao. Con biết không?'],
        ["Let's count the planets: one, two, three...", 'Mình đếm các hành tinh nhé: một, hai, ba...'],
        ['I wonder what is out there in space.', 'Mình tự hỏi ngoài vũ trụ kia có gì nhỉ.']
      ],
      lessons: [
        {
          title: 'Why Do We Have Day and Night?', titleVi: 'Vì sao có ngày và đêm?', icon: '🌗',
          words: [
            ['spin', 'verb', '/spɪn/', 'quay tròn', '🌀', 'The Earth spins once every day.', 'Trái Đất quay một vòng mỗi ngày.', 'A toy top does this on the floor. Round and round!'],
            ['orbit', 'verb', '/ˈɔːbɪt/', 'bay quanh, quay quanh (quỹ đạo)', '🔄', 'The Earth orbits the Sun once a year.', 'Trái Đất quay quanh Mặt Trời mỗi năm một vòng.', 'The Moon travels round and round the Earth. It does this.'],
            ['sunrise', 'noun', '/ˈsʌnraɪz/', 'bình minh, lúc mặt trời mọc', '🌅', 'We watched the sunrise at Vũng Tàu beach.', 'Nhà mình ngắm bình minh ở biển Vũng Tàu.', 'The sky turns pink and orange early in the morning when the day begins.'],
            ['sunset', 'noun', '/ˈsʌnset/', 'hoàng hôn, lúc mặt trời lặn', '🌇', 'The sunset over West Lake is beautiful.', 'Hoàng hôn trên Hồ Tây đẹp lắm.', 'In the evening, the Sun goes down and the sky turns red.'],
            ['torch', 'noun', '/tɔːtʃ/', 'đèn pin', '🔦', 'Shine the torch on the ball.', 'Con chiếu đèn pin vào quả bóng nhé.', 'A small light you hold in your hand when it is dark.']
          ],
          comic: {
            title: 'The Torch-and-Ball Experiment', titleVi: 'Thí nghiệm đèn pin và quả bóng',
            panels: [
              ['a', 'Dad, why is it dark at night?', 'Bố ơi, sao ban đêm trời lại tối ạ?', '🌙'],
              ['b', "Let's find out! This torch is the Sun. This ball is the Earth.", 'Mình cùng tìm hiểu nhé! Đèn pin này là Mặt Trời. Quả bóng là Trái Đất.', '🔦'],
              ['a', 'I spin the ball... One side is bright, the other side is dark!', 'Con xoay quả bóng... Một bên sáng, bên kia tối!', '🌍'],
              ['b', 'Yes! The Earth spins, so we have day and night.', 'Đúng rồi! Trái Đất quay nên chúng ta có ngày và đêm.', '🌗']
            ],
            blanks: [[1, 'torch', ['torch', 'pizza', 'pillow']], [3, 'spins', ['spins', 'sleeps', 'sings']]]
          },
          build: [
            { vi: 'Em muốn giải thích: Trái Đất quay một vòng mỗi ngày.', a: ['The Earth', 'spins', 'once', 'every day.'], x: ['spin', 'every year.'] },
            { vi: 'Em muốn kể: Trái Đất quay quanh Mặt Trời.', a: ['The Earth', 'orbits', 'the Sun.'], x: ['orbit', 'the Moon orbits'] }
          ],
          talk: [
            { q: 'Why do we have day and night?', vi: 'Vì sao chúng ta có ngày và đêm?', hint: 'Because the Earth spins.', k: ['earth', 'spin|spins|spinning|turn|turns|turning|rotates|round'], c: ['Because the Earth spins.', 'Because the Sun is very hot.', 'Because the Earth is very big.'] },
            { q: 'Do you like sunrise or sunset?', vi: 'Bạn thích bình minh hay hoàng hôn?', hint: 'I like sunset because the sky is red.', k: ['sunrise|sunset|both', 'because|beautiful|red|pink|orange|colourful|pretty|sky|quiet|cool'], c: ['I like sunset because the sky is red.', 'I watch TV at sunset.', 'I like the beach because it is sunny.'] }
          ],
          snow: { vi: 'Giải thích vì sao có ngày và đêm', l: [[['The Earth'], 'Trái Đất'], [['The Earth', 'spins', 'slowly.'], 'Trái Đất quay chậm rãi.'], [['The Earth', 'spins', 'slowly,', 'so we have', 'day and night.'], 'Trái Đất quay chậm rãi, nên chúng ta có ngày và đêm.']], x: ['spin', 'the Moon'] },
          cb: ['b', 'Bin, shall we wake up early to watch the sunrise?', 'Bin ơi, mình dậy sớm ngắm bình minh nhé?', [
            ['yes', "Yes! I'll set my alarm for five o'clock!", 'Có ạ! Con sẽ đặt báo thức lúc năm giờ!', 'Great! Bring your camera too.', 'Tuyệt! Mang cả máy ảnh nữa nhé.', '🌅'],
            ['idea', 'Can we watch the sunset instead? I love sleeping!', 'Mình ngắm hoàng hôn thay vì vậy được không bố? Con mê ngủ lắm!', 'Ha ha! Okay, sunset on the rooftop at six.', 'Ha ha! Được, sáu giờ ngắm hoàng hôn trên sân thượng.', '🌇']]],
          tb: ['b', "It's night here. Do you know what time it is in America now?", 'Ở đây là ban đêm. Con có biết bây giờ ở Mỹ là mấy giờ không?', [
            ['idea', "It's daytime there! Their side faces the Sun.", 'Bên đó là ban ngày! Phía của họ đang hướng về Mặt Trời.', 'Super scientist! You remembered the torch and ball.', 'Nhà khoa học siêu quá! Con nhớ thí nghiệm đèn pin rồi.', '🌎'],
            ['ask', "I'm not sure. Can we call Uncle Nam to find out?", 'Con không chắc. Mình gọi chú Nam để hỏi được không?', "Good idea! He'll say: Good morning!", 'Ý hay! Chú sẽ nói: Chào buổi sáng!', '📞']]],
          fact: ['The Earth spins once about every 24 hours, and that makes one day.', 'Trái Đất tự quay một vòng khoảng 24 giờ, và đó chính là một ngày.'],
          tf: [
            ['When it is night in Việt Nam, it is daytime on the other side of the Earth.', true, 'Yes! The side facing the Sun has day.', 'Đúng! Phía hướng về Mặt Trời là ban ngày.'],
            ['The Sun goes around the Earth every day.', false, 'No! The Earth spins, so the Sun only looks like it moves.', 'Sai! Trái Đất tự quay nên Mặt Trời chỉ trông như đang di chuyển thôi.']
          ],
          qa: ['What do you do at sunset?', 'Bạn thường làm gì lúc hoàng hôn?', 'I play in the park with my friends at sunset.', ['play|ride|walk|go|watch|eat|cook|read|help', 'park|friends|home|dinner|bike|homework|sky|rooftop|sunset']]
        },
        {
          title: 'Our Solar System', titleVi: 'Hệ Mặt Trời của chúng ta', icon: '🪐',
          words: [
            ['planet', 'noun', '/ˈplænɪt/', 'hành tinh', '🪐', 'There are eight planets in our solar system.', 'Có tám hành tinh trong hệ Mặt Trời của chúng ta.', 'Earth, Mars and Jupiter are all one of these.'],
            ['solar system', 'noun', '/ˈsəʊlə ˈsɪstəm/', 'hệ Mặt Trời', '☀️', 'The Sun is in the middle of the solar system.', 'Mặt Trời nằm ở giữa hệ Mặt Trời.', 'The Sun and its family of eight planets.'],
            ['gravity', 'noun', '/ˈɡrævəti/', 'lực hấp dẫn', '🍎', 'Gravity pulls the apple down to the ground.', 'Lực hấp dẫn kéo quả táo rơi xuống đất.', 'This invisible pull keeps your feet on the ground.'],
            ['float', 'verb', '/fləʊt/', 'lơ lửng, trôi nổi', '🎈', 'Astronauts float inside the space station.', 'Các phi hành gia lơ lửng trong trạm vũ trụ.', 'In space, you do not fall down. You do this in the air.'],
            ['spacesuit', 'noun', '/ˈspeɪssuːt/', 'bộ đồ phi hành gia', '👩‍🚀', 'You must wear a spacesuit on the Moon.', 'Con phải mặc bộ đồ phi hành gia trên Mặt Trăng.', 'Special white clothes with a helmet that give you air in space.']
          ],
          comic: {
            title: 'Bin the Space Explorer', titleVi: 'Nhà thám hiểm vũ trụ Bin',
            panels: [
              ['a', 'Dad, look! I made the solar system with LEGO!', 'Bố ơi, nhìn này! Con lắp hệ Mặt Trời bằng LEGO!', '🧱'],
              ['b', 'Wow! Eight planets around the Sun. Which one is the biggest?', 'Oa! Tám hành tinh quanh Mặt Trời. Hành tinh nào to nhất?', '🪐'],
              ['a', 'Jupiter! I want to go there in my spacesuit.', 'Sao Mộc ạ! Con muốn mặc đồ phi hành gia bay đến đó.', '👩‍🚀'],
              ['b', "Without gravity, you'll float like a balloon!", 'Không có lực hấp dẫn, con sẽ lơ lửng như quả bóng bay đấy!', '🎈']
            ],
            blanks: [[0, 'solar system', ['solar system', 'school bus', 'rice cooker']], [3, 'float', ['float', 'cook', 'sneeze']]]
          },
          build: [
            { vi: 'Em muốn nói: Có tám hành tinh trong hệ Mặt Trời.', a: ['There are', 'eight planets', 'in our solar system.'], x: ['There is', 'eight planet'] },
            { vi: 'Em muốn giải thích: Lực hấp dẫn giữ chân mình trên mặt đất.', a: ['Gravity', 'keeps', 'my feet', 'on the ground.'], x: ['keep', 'in the sky.'] }
          ],
          talk: [
            { q: 'Which planet would you like to visit?', vi: 'Bạn muốn đến thăm hành tinh nào?', hint: "I'd like to visit Mars because it is red.", k: ['mercury|venus|mars|jupiter|saturn|uranus|neptune|moon', 'visit|go|because|like|want|fly'], c: ["I'd like to visit Mars because it is red.", 'Mars is the red planet.', "I'd like to visit Japan."] },
            { q: 'What do astronauts wear in space?', vi: 'Phi hành gia mặc gì trong vũ trụ?', hint: 'They wear a spacesuit and a helmet.', k: ['spacesuit|spacesuits|suit|suits|helmet|helmets|gloves|boots'], c: ['They wear a spacesuit and a helmet.', 'They wear a T-shirt and shorts.', 'They eat food from a tube.'] }
          ],
          snow: { vi: 'Kể về hệ Mặt Trời', l: [[['planets'], 'các hành tinh'], [['Eight planets', 'orbit', 'the Sun.'], 'Tám hành tinh quay quanh Mặt Trời.'], [['Eight planets', 'orbit', 'the Sun', 'in our solar system', 'all the time.'], 'Tám hành tinh quay quanh Mặt Trời trong hệ Mặt Trời của chúng ta.']], x: ['orbits', 'the Moon'] },
          cb: ['b', 'Bin, would you like to be an astronaut one day?', 'Bin ơi, con có muốn làm phi hành gia không?', [
            ['yes', "Yes! I want to float in space and see the Earth!", 'Có ạ! Con muốn lơ lửng trong vũ trụ và ngắm Trái Đất!', "Then eat your vegetables and study science!", 'Vậy thì ăn rau và học khoa học thật giỏi nhé!', '🚀'],
            ['idea', "No, I'd like to build spaceships on Earth.", 'Không ạ, con muốn chế tạo tàu vũ trụ ở dưới Trái Đất.', 'An engineer! Space needs builders too.', 'Kỹ sư à! Vũ trụ cũng cần người chế tạo đấy.', '🛠️']]],
          tb: ['b', 'Why do you think astronauts float in the space station?', 'Con nghĩ sao phi hành gia lại lơ lửng trong trạm vũ trụ?', [
            ['idea', 'I think they are falling around the Earth all the time!', 'Con nghĩ là họ luôn rơi vòng quanh Trái Đất!', 'Wow, that is exactly right! Clever boy!', 'Oa, chính xác luôn! Con thông minh quá!', '🛰️'],
            ['ask', "I'm not sure. Can we read a space book together?", 'Con không chắc. Mình đọc sách vũ trụ cùng nhau được không bố?', "Sure! Let's find out tonight.", 'Được chứ! Tối nay mình cùng tìm hiểu.', '📚']]],
          fact: ['Jupiter is so big that more than 1,300 Earths could fit inside it!', 'Sao Mộc to đến mức hơn 1.300 Trái Đất có thể nằm gọn bên trong!'],
          tf: [
            ['There are eight planets in our solar system.', true, 'Yes! From Mercury to Neptune, there are eight.', 'Đúng! Từ Sao Thủy đến Sao Hải Vương, có tám hành tinh.'],
            ['Astronauts do not need a spacesuit on the Moon.', false, 'No! There is no air on the Moon, so they need a spacesuit.', 'Sai! Mặt Trăng không có không khí nên họ cần mặc đồ phi hành gia.']
          ],
          qa: ['What do you know about the solar system?', 'Bạn biết gì về hệ Mặt Trời?', 'There are eight planets and the Sun is in the middle.', ['eight|sun|planet|planets|earth|jupiter|mars', 'middle|orbit|big|biggest|hot|star|eight']]
        },
        {
          title: 'Stargazing on the Rooftop', titleVi: 'Ngắm sao trên sân thượng', icon: '🔭',
          words: [
            ['telescope', 'noun', '/ˈtelɪskəʊp/', 'kính thiên văn', '🔭', 'I can see the Moon with my telescope.', 'Mình nhìn thấy Mặt Trăng bằng kính thiên văn.', 'A long tube that makes faraway stars look big and close.'],
            ['full moon', 'noun', '/fʊl muːn/', 'trăng tròn', '🌕', 'There is a full moon at Mid-Autumn.', 'Tết Trung thu có trăng tròn.', 'The Moon looks like a big round circle of light.'],
            ['crescent moon', 'noun', '/ˈkresnt muːn/', 'trăng lưỡi liềm', '🌙', 'The crescent moon looks like a smile.', 'Trăng lưỡi liềm trông như một nụ cười.', 'A thin curved Moon, like a banana in the sky.'],
            ['shooting star', 'noun', '/ˈʃuːtɪŋ stɑː/', 'sao băng', '🌠', 'I saw a shooting star last night!', 'Tối qua mình thấy sao băng!', 'A quick line of light flies across the night sky. Make a wish!'],
            ['twinkle', 'verb', '/ˈtwɪŋkl/', 'lấp lánh', '✨', 'The stars twinkle in the dark sky.', 'Các vì sao lấp lánh trên bầu trời đêm.', 'Stars seem to do this: shine, then a little dark, then shine again.']
          ],
          comic: {
            title: 'A Wish on the Rooftop', titleVi: 'Điều ước trên sân thượng',
            panels: [
              ['b', 'Bin, come up to the rooftop. I set up the telescope!', 'Bin ơi, lên sân thượng đi. Bố dựng kính thiên văn rồi!', '🔭'],
              ['a', 'Wow! The Moon has holes! And it is a crescent moon tonight.', 'Oa! Mặt Trăng có những cái hố! Tối nay là trăng lưỡi liềm.', '🌙'],
              ['b', 'Look up there! A shooting star! Quick, make a wish!', 'Nhìn lên kia! Sao băng! Nhanh, ước đi con!', '🌠'],
              ['a', 'I wish I could visit the Moon with you, Dad!', 'Con ước được cùng bố lên Mặt Trăng!', '💫']
            ],
            blanks: [[0, 'telescope', ['telescope', 'toothbrush', 'teapot']], [2, 'shooting star', ['shooting star', 'shopping list', 'sleeping cat']]]
          },
          build: [
            { vi: 'Em muốn kể: Mình nhìn thấy Mặt Trăng bằng kính thiên văn.', a: ['I', 'can see', 'the Moon', 'with my telescope.'], x: ['sees', 'with my spoon.'] },
            { vi: 'Em muốn tả: Các vì sao lấp lánh trên bầu trời đêm.', a: ['The stars', 'twinkle', 'in the night sky.'], x: ['twinkles', 'in the morning.'] }
          ],
          talk: [
            { q: 'Have you ever seen a shooting star?', vi: 'Bạn đã từng thấy sao băng chưa?', hint: 'Yes, I saw one at my grandma\'s house.', k: ['yes|no|never|not|once', 'saw|seen|see|wish'], c: ["Yes, I saw one at my grandma's house.", 'Yes, I like stars very much.', 'Yes, I have a telescope at home.'] },
            { q: 'What does the Moon look like tonight?', vi: 'Tối nay Mặt Trăng trông như thế nào?', hint: 'It is a crescent moon. It looks like a smile.', k: ['full|crescent|half|round|thin|big|bright|smile|banana|ball|circle|new'], c: ['It is a crescent moon. It looks like a smile.', 'It is very far away.', 'I can see the stars tonight.'] }
          ],
          snow: { vi: 'Kể về buổi ngắm sao', l: [[['a shooting star'], 'một ngôi sao băng'], [['I', 'saw', 'a shooting star.'], 'Mình đã thấy sao băng.'], [['Last night,', 'I', 'saw', 'a shooting star', 'on the rooftop', 'with Dad.'], 'Tối qua, mình thấy sao băng trên sân thượng cùng bố.']], x: ['see', 'telescopes'] },
          cb: ['b', "It's ten o'clock. Shall we look at Saturn for one more minute?", 'Mười giờ rồi. Mình ngắm Sao Thổ thêm một phút nữa nhé?', [
            ['yes', 'Yes, please! I want to see its rings!', 'Vâng ạ! Con muốn xem vành đai của nó!', 'There they are! Like a hat on the planet.', 'Đó, thấy chưa! Như chiếc mũ trên hành tinh.', '🪐'],
            ['calm', "No, thanks. I'm sleepy. Can we look again tomorrow?", 'Thôi ạ. Con buồn ngủ rồi. Mai mình ngắm tiếp được không bố?', 'Of course. The stars will wait for us.', 'Tất nhiên. Các vì sao sẽ đợi chúng ta.', '😴']]],
          tb: ['b', 'Why do you think the stars twinkle?', 'Con nghĩ vì sao các ngôi sao lại lấp lánh?', [
            ['idea', 'Maybe the air moves and makes the light shake.', 'Có lẽ không khí chuyển động làm ánh sáng rung rinh.', "Brilliant! That's the real reason!", 'Xuất sắc! Đó chính là lý do thật!', '✨'],
            ['ask', 'Are they blinking at us, Dad?', 'Chúng đang nháy mắt với mình hả bố?', 'Ha ha! It is the moving air. Funny idea, though!', 'Ha ha! Đó là do không khí chuyển động. Nhưng ý đó vui ghê!', '😉']]],
          fact: ['The Moon does not make its own light. It reflects light from the Sun.', 'Mặt Trăng không tự phát sáng. Nó phản chiếu ánh sáng từ Mặt Trời.'],
          tf: [
            ['The Sun is a star.', true, 'Yes! The Sun is a star. It is the closest star to us.', 'Đúng! Mặt Trời là một ngôi sao, ngôi sao gần chúng ta nhất.'],
            ['A shooting star is a real star falling into your garden.', false, 'No! It is a tiny space rock burning up in the sky.', 'Sai! Đó là một mẩu đá vũ trụ nhỏ bốc cháy trên bầu trời.']
          ],
          qa: ['What would you wish for on a shooting star?', 'Bạn sẽ ước gì khi thấy sao băng?', 'I would wish for a big LEGO space station.', ['wish|want|would|like', 'lego|dog|cat|trip|moon|space|bike|family|toy|book']]
        }
      ],
      mystery: {
        t: "Dad's Secret Planet", tv: 'Hành tinh bí mật của bố',
        intro: ["Dad hid a planet sticker under Bin's telescope. Which planet is it?", 'Bố giấu một miếng dán hình hành tinh dưới kính thiên văn của Bin. Đó là hành tinh nào?'],
        clues: [['Clue one: It is not the red planet.', 'Manh mối 1: Nó không phải hành tinh đỏ.'],
          ['Clue two: It is not the biggest planet in the solar system.', 'Manh mối 2: Nó không phải hành tinh lớn nhất trong hệ Mặt Trời.'],
          ['Clue three: It is not the hottest planet. It is very cold.', 'Manh mối 3: Nó không phải hành tinh nóng nhất. Nó rất lạnh.']],
        q: ['Which planet is on the sticker?', 'Miếng dán là hành tinh nào?'],
        o: [['Mars', '🔴', 'Sao Hỏa'], ['Jupiter', '🟠', 'Sao Mộc'], ['Venus', '🟡', 'Sao Kim'], ['Saturn', '🪐', 'Sao Thổ']], a: 3,
        win: ['Saturn! The planet with beautiful rings!', 'Sao Thổ! Hành tinh có vành đai tuyệt đẹp!']
      }
    },

    /* ---------- WEEK 34: Great Inventions & How We Build ---------- */
    {
      id: 'w34', week: 34, month: 9, monthTitle: M9[0], monthTitleVi: M9[1],
      name: 'Great Inventions & How We Build', vi: 'Phát minh vĩ đại & Cách chế tạo', short: 'Inventions',
      topic: 'Great Inventions & How We Build', topicVi: 'Nhà phát minh nhí: tưởng tượng, thiết kế, thử nghiệm',
      color: '#EA580C', dark: '#9A3412', icon: '💡', model: ['hangar', 'Inventors\' Hangar', 'Xưởng chế tạo của nhà phát minh'],
      chars: { a: { name: 'Na', fig: 'hair-blonde|determined|torso-red|legs-tan|wrench' }, b: { name: 'Grandpa Tư', fig: 'none-hat|wink|torso-blue|legs-black|book' } },
      chatter: [
        ['I have an idea! Let me draw it.', 'Mình có ý tưởng rồi! Để mình vẽ ra.'],
        ['It did not work. Let\'s try again!', 'Nó chưa chạy. Thử lại nào!'],
        ['Imagine, plan, build, test, improve!', 'Tưởng tượng, lên kế hoạch, lắp, thử, cải tiến!'],
        ['Mistakes help us learn.', 'Sai lầm giúp chúng ta học hỏi.'],
        ['Who invented the light bulb?', 'Ai đã phát minh ra bóng đèn?']
      ],
      lessons: [
        {
          title: 'Inventions That Changed the World', titleVi: 'Những phát minh thay đổi thế giới', icon: '🛞',
          words: [
            ['wheel', 'noun', '/wiːl/', 'bánh xe', '🛞', 'A bike has two wheels.', 'Xe đạp có hai bánh xe.', 'It is round and it turns, so cars and bikes can move.'],
            ['light bulb', 'noun', '/laɪt bʌlb/', 'bóng đèn', '💡', 'The light bulb lights up our room at night.', 'Bóng đèn chiếu sáng phòng mình vào ban đêm.', 'A glass thing that glows when you press the switch.'],
            ['aeroplane', 'noun', '/ˈeərəpleɪn/', 'máy bay', '✈️', 'We took an aeroplane from Hà Nội to Đà Nẵng.', 'Nhà mình đi máy bay từ Hà Nội đến Đà Nẵng.', 'It has wings and an engine, and it carries people in the sky.'],
            ['invent', 'verb', '/ɪnˈvent/', 'phát minh', '🧠', 'The Wright brothers invented the first aeroplane.', 'Anh em nhà Wright đã phát minh ra chiếc máy bay đầu tiên.', 'To make something new that nobody made before.'],
            ['inventor', 'noun', '/ɪnˈventə/', 'nhà phát minh', '👩‍🔬', 'Na wants to be an inventor.', 'Na muốn trở thành nhà phát minh.', 'A person who thinks of a brand-new machine and makes it.']
          ],
          comic: {
            title: "Grandpa's Old Bike", titleVi: 'Chiếc xe đạp cũ của ông',
            panels: [
              ['a', 'Grandpa, who invented the wheel?', 'Ông ơi, ai đã phát minh ra bánh xe ạ?', '🛞'],
              ['b', 'Nobody knows! People used it more than 5,000 years ago.', 'Không ai biết cả! Con người đã dùng nó từ hơn 5.000 năm trước.', '🏺'],
              ['a', 'Without wheels, no bikes, no cars, no aeroplanes!', 'Không có bánh xe thì không có xe đạp, ô tô, máy bay!', '✈️'],
              ['b', "That's right. One small idea can change the world.", 'Đúng vậy. Một ý tưởng nhỏ có thể thay đổi cả thế giới.', '🌍']
            ],
            blanks: [[0, 'invented', ['invented', 'ate', 'washed']], [2, 'aeroplanes', ['aeroplanes', 'bananas', 'pillows']]]
          },
          build: [
            { vi: 'Em muốn kể: Anh em nhà Wright đã phát minh ra máy bay.', a: ['The Wright brothers', 'invented', 'the aeroplane.'], x: ['invent', 'the banana.'] },
            { vi: 'Em muốn nói: Mình muốn trở thành nhà phát minh.', a: ['I', 'want to be', 'an inventor.'], x: ['wants to be', 'an invent.'] }
          ],
          talk: [
            { q: 'What is the most useful invention in your home?', vi: 'Phát minh hữu ích nhất trong nhà bạn là gì?', hint: 'I think the fridge is the most useful.', k: ['fridge|light|bulb|fan|phone|computer|washing|tv|rice|cooker|air|conditioner|bike|wheel|oven|microwave|lamp|clock', 'useful|best|important|because|need|helps'], c: ['I think the fridge is the most useful.', 'The fridge is in the kitchen.', 'My bedroom is the best room.'] },
            { q: 'Would you like to be an inventor? Why?', vi: 'Bạn có muốn làm nhà phát minh không? Vì sao?', hint: 'Yes, because I like making new things.', k: ['yes|no|maybe', 'make|making|build|building|new|help|things|create|ideas|invent|inventing|fix'], c: ['Yes, because I like making new things.', 'Yes, I like reading books.', 'Yes, I went to the science museum.'] }
          ],
          snow: { vi: 'Kể về một phát minh tuyệt vời', l: [[['the light bulb'], 'bóng đèn'], [['Edison', 'improved', 'the light bulb.'], 'Edison đã cải tiến bóng đèn.'], [['Long ago,', 'Edison', 'improved', 'the light bulb', 'after many tests.'], 'Ngày xưa, Edison đã cải tiến bóng đèn sau rất nhiều lần thử nghiệm.']], x: ['improve', 'the wheel'] },
          cb: ['b', 'Na, which invention would you take to a desert island?', 'Na ơi, con sẽ mang phát minh nào ra đảo hoang?', [
            ['idea', 'A light bulb! I am scared of the dark.', 'Bóng đèn ạ! Con sợ bóng tối.', "Ha ha! You'll need electricity too!", 'Ha ha! Con sẽ cần cả điện nữa đấy!', '💡'],
            ['ask', 'Can I take an aeroplane? Then I can fly home!', 'Con mang máy bay được không ạ? Để con bay về nhà!', 'Very smart! But who will fly it?', 'Thông minh quá! Nhưng ai sẽ lái nó?', '✈️']]],
          tb: ['b', 'Na, the old fan is broken. Can you help me look at it?', 'Na ơi, cái quạt cũ hỏng rồi. Con giúp ông xem nhé?', [
            ['yes', "Sure! I'll get my wrench, Grandpa!", 'Vâng ạ! Con đi lấy cờ lê, ông ơi!', 'Thank you, little inventor!', 'Cảm ơn nhà phát minh nhí!', '🔧'],
            ['calm', 'Let\'s unplug it first. Safety first!', 'Mình rút điện ra trước đã ông nhé. An toàn là trên hết!', 'Good thinking! You are a careful engineer.', 'Nghĩ hay lắm! Con là kỹ sư cẩn thận đấy.', '🔌']]],
          fact: ['The first aeroplane flight in 1903 lasted only about 12 seconds!', 'Chuyến bay đầu tiên năm 1903 chỉ kéo dài khoảng 12 giây!'],
          tf: [
            ['People used the wheel thousands of years ago.', true, 'Yes! The wheel is more than 5,000 years old.', 'Đúng! Bánh xe đã có hơn 5.000 năm tuổi.'],
            ['The aeroplane was invented before the wheel.', false, 'No! The wheel came thousands of years before the aeroplane.', 'Sai! Bánh xe có trước máy bay hàng nghìn năm.']
          ],
          qa: ['What would you like to invent?', 'Bạn muốn phát minh ra cái gì?', 'I would like to invent a robot that does my homework.', ['invent|make|build|would|like', 'robot|machine|car|bike|house|bag|shoes|pen|toy|gadget']]
        },
        {
          title: 'The Design Loop', titleVi: 'Vòng tròn thiết kế', icon: '🔁',
          words: [
            ['imagine', 'verb', '/ɪˈmædʒɪn/', 'tưởng tượng', '💭', 'Imagine a bike that can fly!', 'Hãy tưởng tượng một chiếc xe đạp biết bay!', 'You close your eyes and make a picture in your head.'],
            ['design', 'noun', '/dɪˈzaɪn/', 'bản thiết kế', '📐', 'Na drew a design for her new machine.', 'Na vẽ bản thiết kế cho cỗ máy mới của mình.', 'A drawing that shows how your idea will look and work.'],
            ['prototype', 'noun', '/ˈprəʊtətaɪp/', 'mẫu thử, nguyên mẫu', '🧩', 'Our first prototype is made of cardboard.', 'Mẫu thử đầu tiên của bọn mình làm bằng bìa các-tông.', 'The first model you build to try your idea before the real one.'],
            ['test', 'verb', '/test/', 'thử nghiệm, kiểm tra', '🧪', 'We test the car on the ramp.', 'Bọn mình thử chiếc xe trên dốc.', 'You try your machine to see if it works.'],
            ['improve', 'verb', '/ɪmˈpruːv/', 'cải tiến, làm tốt hơn', '📈', 'We can improve it with bigger wheels.', 'Bọn mình có thể cải tiến nó bằng bánh xe to hơn.', 'You change your model to make it better than before.']
          ],
          comic: {
            title: 'The Wobbly Car', titleVi: 'Chiếc xe lắc lư',
            panels: [
              ['a', 'First, I imagine a car that climbs stairs. Next, I draw a design.', 'Đầu tiên, con tưởng tượng chiếc xe leo được cầu thang. Tiếp theo, con vẽ bản thiết kế.', '📐'],
              ['b', 'Good plan! Now build a prototype with LEGO.', 'Kế hoạch tốt đấy! Giờ lắp mẫu thử bằng LEGO đi.', '🧱'],
              ['a', 'Let\'s test it... Oh no! It falls over!', 'Mình thử nhé... Ôi không! Nó đổ rồi!', '😱'],
              ['b', "Don't worry. Let's improve it. Try wider wheels.", 'Đừng lo. Mình cải tiến nó nhé. Thử bánh xe rộng hơn xem.', '🛞']
            ],
            blanks: [[1, 'prototype', ['prototype', 'pancake', 'pyjamas']], [3, 'improve', ['improve', 'eat', 'hide']]]
          },
          build: [
            { vi: 'Em muốn kể: Đầu tiên, bọn mình lắp một mẫu thử.', a: ['First,', 'we', 'build', 'a prototype.'], x: ['builds', 'a pyjamas.'] },
            { vi: 'Em muốn nói: Bọn mình thử chiếc xe trên dốc.', a: ['We', 'test', 'the car', 'on the ramp.'], x: ['tests', 'in the fridge.'] }
          ],
          talk: [
            { q: 'What do you do when your model breaks?', vi: 'Bạn làm gì khi mô hình bị hỏng?', hint: 'I try again and improve it.', k: ['try|fix|improve|build|change|test|rebuild|repair|again'], c: ['I try again and improve it.', 'I cry and put it away.', 'I buy a new toy.'] },
            { q: 'What are the steps of the design loop?', vi: 'Các bước của vòng tròn thiết kế là gì?', hint: 'Imagine, plan, build, test and improve.', k: ['imagine|plan|idea', 'test|improve'], c: ['Imagine, plan, build, test and improve.', 'Plan, draw and colour.', 'Open the box and build it.'] }
          ],
          snow: { vi: 'Kể các bước của vòng tròn thiết kế', l: [[['test'], 'thử nghiệm'], [['We', 'test', 'our prototype.'], 'Bọn mình thử nghiệm mẫu thử.'], [['After that,', 'we', 'test', 'our prototype', 'and improve it', 'again and again.'], 'Sau đó, bọn mình thử nghiệm mẫu thử và cải tiến nó hết lần này đến lần khác.']], x: ['tests', 'give up'] },
          cb: ['b', 'Na, your car fell over three times. Do you want to stop?', 'Na ơi, xe của con đổ ba lần rồi. Con có muốn dừng lại không?', [
            ['no', "No way! Inventors never give up. Let's test again!", 'Không đời nào! Nhà phát minh không bao giờ bỏ cuộc. Thử lại thôi!', "That's the spirit! Try number four!", 'Tinh thần đó! Lần thử thứ tư nào!', '💪'],
            ['calm', "Let's take a break and think. Maybe I need a new design.", 'Mình nghỉ một chút và suy nghĩ đã. Có lẽ con cần bản thiết kế mới.', 'Wise idea. Good inventors stop and think.', 'Ý khôn ngoan. Nhà phát minh giỏi biết dừng lại suy nghĩ.', '🤔']]],
          tb: ['b', 'Your paper plane flies only one metre. How can you improve it?', 'Máy bay giấy của con chỉ bay được một mét. Làm sao để cải tiến nó?', [
            ['idea', 'I can fold bigger wings and test it again.', 'Con có thể gấp cánh to hơn rồi thử lại.', 'Look! Now it flies four metres!', 'Nhìn kìa! Giờ nó bay được bốn mét rồi!', '✈️'],
            ['ask', 'Can you show me a different design, Grandpa?', 'Ông chỉ con một kiểu thiết kế khác được không ạ?', 'Of course! Watch me fold this one.', 'Tất nhiên! Xem ông gấp kiểu này nhé.', '📄']]],
          fact: ['Thomas Edison tested thousands of materials before his light bulb worked well.', 'Thomas Edison đã thử hàng nghìn vật liệu trước khi bóng đèn của ông hoạt động tốt.'],
          tf: [
            ['Engineers test their prototypes many times.', true, 'Yes! Testing helps them find problems and improve.', 'Đúng! Thử nghiệm giúp họ tìm ra lỗi và cải tiến.'],
            ['A good inventor gives up after the first mistake.', false, 'No! Good inventors learn from mistakes and try again.', 'Sai! Nhà phát minh giỏi học từ sai lầm và thử lại.']
          ],
          qa: ['Tell me about something you built and improved.', 'Kể về một thứ bạn đã lắp và cải tiến.', 'I built a LEGO bridge and made it stronger.', ['built|build|made|make', 'lego|bridge|car|house|tower|plane|boat|robot|stronger|better|bigger']]
        },
        {
          title: 'Mission: A Gadget for Home', titleVi: 'Nhiệm vụ: Chế tạo đồ dùng cho gia đình', icon: '🔧',
          words: [
            ['problem', 'noun', '/ˈprɒbləm/', 'vấn đề, rắc rối', '❓', 'Our problem is that the cat eats the fish food.', 'Vấn đề của nhà mình là con mèo ăn mất thức ăn của cá.', 'Something that goes wrong and you need to fix.'],
            ['solve', 'verb', '/sɒlv/', 'giải quyết', '✅', 'We can solve this with a LEGO lid.', 'Mình có thể giải quyết việc này bằng một cái nắp LEGO.', 'You find an answer and fix the trouble.'],
            ['gadget', 'noun', '/ˈɡædʒɪt/', 'đồ dùng nhỏ thông minh', '⚙️', 'Na made a gadget that waters the plants.', 'Na làm một đồ dùng nhỏ để tưới cây.', 'A small clever machine that helps you do a job.'],
            ['idea', 'noun', '/aɪˈdɪə/', 'ý tưởng', '💡', 'I have a great idea!', 'Mình có một ý tưởng hay!', 'A new thought that pops into your head like a light bulb.'],
            ['It works!', 'phrase', '/ɪt wɜːks/', 'Nó chạy rồi! Thành công rồi!', '🎉', 'Hooray! It works!', 'Hoan hô! Nó chạy rồi!', 'You shout this when your machine finally does its job.']
          ],
          comic: {
            title: 'The Glasses-Finder Gadget', titleVi: 'Máy tìm kính',
            panels: [
              ['b', 'Na, every morning I lose my glasses. What a problem!', 'Na ơi, sáng nào ông cũng làm mất kính. Rắc rối quá!', '👓'],
              ['a', 'I have an idea, Grandpa! A LEGO glasses box with a bell.', 'Con có ý tưởng rồi ông ơi! Một hộp đựng kính LEGO có chuông.', '🔔'],
              ['b', 'Let me try... Ding! I found my glasses!', 'Để ông thử... Ding! Ông tìm thấy kính rồi!', '🛎️'],
              ['a', 'Yay! It works! We solved the problem!', 'Yeah! Nó chạy rồi! Mình giải quyết được rắc rối rồi!', '🎉']
            ],
            blanks: [[1, 'idea', ['idea', 'egg', 'umbrella']], [3, 'It works!', ['It works!', 'It sleeps!', 'It rains!']]]
          },
          build: [
            { vi: 'Em muốn nói: Mình có thể giải quyết vấn đề này.', a: ['I', 'can solve', 'this problem.'], x: ['can solves', 'this banana.'] },
            { vi: 'Em muốn kể: Na làm một đồ dùng để tưới cây.', a: ['Na', 'made', 'a gadget', 'to water the plants.'], x: ['make', 'to eat the plants.'] }
          ],
          talk: [
            { q: 'What problem do you have at home?', vi: 'Ở nhà bạn có rắc rối gì?', hint: 'I often lose my pencils.', k: ['lose|lost|forget|messy|noisy|hot|dark|broken|break|leaks|small|slow|fight|late|untidy'], c: ['I often lose my pencils.', 'I often play with my pencils.', 'My home is near the park.'] },
            { q: 'How can a gadget help your family?', vi: 'Một đồ dùng thông minh có thể giúp gia đình bạn thế nào?', hint: 'It can help my mum clean the floor.', k: ['help|clean|cook|water|find|wake|feed|wash|carry|sweep', 'mum|dad|grandma|grandpa|family|floor|plants|food|dishes|clothes|us|parents'], c: ['It can help my mum clean the floor.', 'It is small and blue.', 'It can play music for me.'] }
          ],
          snow: { vi: 'Kể về đồ dùng em chế tạo', l: [[['a gadget'], 'một đồ dùng thông minh'], [['I', 'built', 'a gadget.'], 'Mình đã chế tạo một đồ dùng.'], [['Last weekend,', 'I', 'built', 'a gadget', 'to help Grandpa', 'find his glasses.'], 'Cuối tuần trước, mình chế tạo một đồ dùng giúp ông tìm kính.']], x: ['build', 'lose'] },
          cb: ['b', 'Na, your gadget is great. Shall we show it to the class?', 'Na ơi, đồ dùng của con hay lắm. Mình mang nó khoe cả lớp nhé?', [
            ['yes', "Yes! I'll explain how I designed it.", 'Vâng ạ! Con sẽ giải thích cách con thiết kế nó.', "They'll love it, little inventor!", 'Các bạn sẽ thích lắm, nhà phát minh nhí!', '🏫'],
            ['idea', 'Can we improve it first? I want to add a light.', 'Mình cải tiến nó trước được không ạ? Con muốn gắn thêm đèn.', 'Great thinking! A light will help at night.', 'Ý hay! Có đèn sẽ tiện vào ban đêm.', '💡']]],
          tb: ['b', 'Oh no! The cat jumps on the table and eats the fish food again!', 'Ôi không! Con mèo lại nhảy lên bàn ăn thức ăn của cá!', [
            ['idea', 'I can build a LEGO lid for the fish food!', 'Con có thể lắp một cái nắp LEGO cho hộp thức ăn cá!', 'Brilliant! Problem solved!', 'Tuyệt vời! Giải quyết xong rắc rối!', '🐟'],
            ['ask', 'Shall we put the fish food in a high cupboard?', 'Mình cất thức ăn cá lên tủ cao nhé ông?', 'Simple and smart! Sometimes the easy idea is best.', 'Đơn giản mà thông minh! Đôi khi ý tưởng dễ nhất lại hay nhất.', '🐈']]],
          fact: ['Velcro was invented after a man saw tiny burrs stuck to his dog\'s fur.', 'Băng dán Velcro được phát minh sau khi một người thấy những quả gai nhỏ bám vào lông chó của mình.'],
          tf: [
            ['Many inventions start with a problem.', true, 'Yes! Inventors see a problem and think of a way to solve it.', 'Đúng! Nhà phát minh thấy rắc rối và nghĩ cách giải quyết.'],
            ['Only grown-ups can invent things.', false, 'No! Many children have invented useful things.', 'Sai! Nhiều bạn nhỏ đã phát minh ra những thứ hữu ích.']
          ],
          qa: ['What gadget would you build for your family?', 'Bạn sẽ chế tạo đồ dùng gì cho gia đình?', 'I would build a gadget that feeds my cat.', ['build|make|invent|would', 'gadget|robot|machine|box|lamp|alarm|cat|dog|plants|glasses|shoes']]
        }
      ],
      mystery: {
        t: 'The Mystery Invention Box', tv: 'Chiếc hộp phát minh bí ẩn',
        intro: ['Grandpa Tư put a famous invention in a box. Na must guess it!', 'Ông Tư đặt một phát minh nổi tiếng vào hộp. Na phải đoán ra!'],
        clues: [['Clue one: You cannot talk to your friends with it.', 'Manh mối 1: Bạn không thể nói chuyện với bạn bè bằng nó.'],
          ['Clue two: It does not fly in the sky.', 'Manh mối 2: Nó không bay trên trời.'],
          ['Clue three: It does not need electricity.', 'Manh mối 3: Nó không cần điện.']],
        q: ['What invention is in the box?', 'Phát minh trong hộp là gì?'],
        o: [['a telephone', '☎️', 'điện thoại'], ['an aeroplane', '✈️', 'máy bay'], ['a light bulb', '💡', 'bóng đèn'], ['a wheel', '🛞', 'bánh xe']], a: 3,
        win: ['The wheel! Simple, round and very old!', 'Bánh xe! Đơn giản, tròn và rất cổ xưa!']
      }
    },

    /* ---------- WEEK 35: Invitations, Plans & Suggestions ---------- */
    {
      id: 'w35', week: 35, month: 9, monthTitle: M9[0], monthTitleVi: M9[1],
      name: 'Invitations, Plans & Suggestions', vi: 'Lời mời, Kế hoạch & Gợi ý', short: 'Party Plans',
      topic: 'Invitations, Plans & Suggestions', topicVi: 'Mời bạn, lên kế hoạch và từ chối lịch sự',
      color: '#DB2777', dark: '#9D174D', icon: '🎉', model: ['partyhall', 'Party Hall', 'Sảnh tiệc'],
      chars: { a: { name: 'Khoa', fig: 'cap-red|grin|torso-red|legs-blue|none' }, b: { name: 'Lily', fig: 'hair-blonde|smile|torso-stars|legs-red|guitar' } },
      chatter: [
        ['Would you like to come to my party?', 'Bạn có muốn đến bữa tiệc của mình không?'],
        ["I'd love to! Thank you!", 'Mình rất thích! Cảm ơn bạn!'],
        ['Shall we make lanterns together?', 'Mình cùng làm đèn lồng nhé?'],
        ["Sorry, I can't. Maybe next time.", 'Xin lỗi, mình không đi được. Hẹn lần sau nhé.'],
        ["Let's meet at seven o'clock!", 'Mình gặp nhau lúc bảy giờ nhé!']
      ],
      lessons: [
        {
          title: "You're Invited!", titleVi: 'Bạn được mời rồi!', icon: '💌',
          words: [
            ['invite', 'verb', '/ɪnˈvaɪt/', 'mời', '📨', 'I want to invite Lily to my birthday party.', 'Mình muốn mời Lily đến dự sinh nhật.', 'You ask a friend to come to your party or your home.'],
            ['invitation', 'noun', '/ˌɪnvɪˈteɪʃn/', 'thiệp mời, lời mời', '💌', 'Khoa made an invitation with stickers.', 'Khoa làm một tấm thiệp mời có dán hình.', 'A card that tells the date, time and place of a party.'],
            ['guest', 'noun', '/ɡest/', 'khách', '🧑‍🤝‍🧑', 'We have ten guests at the party.', 'Bữa tiệc có mười vị khách.', 'A person who comes to your party because you asked them.'],
            ['Would you like to come?', 'phrase', '/wʊd juː laɪk tə kʌm/', 'Bạn có muốn đến không?', '🙋', 'My party is on Sunday. Would you like to come?', 'Tiệc của mình vào Chủ nhật. Bạn có muốn đến không?', 'A polite question to ask a friend to join your party.'],
            ["I'd love to!", 'phrase', '/aɪd lʌv tuː/', 'Mình rất muốn! Mình đồng ý!', '😍', "I'd love to! Thank you for inviting me.", 'Mình rất muốn! Cảm ơn bạn đã mời mình.', 'A happy way to say yes to an invitation.']
          ],
          comic: {
            title: 'The Secret Invitation', titleVi: 'Tấm thiệp mời bí mật',
            panels: [
              ['a', 'Lily, this card is for you. Open it!', 'Lily ơi, tấm thiệp này cho bạn. Mở ra đi!', '💌'],
              ['b', "An invitation! A LEGO party on Sunday at three o'clock!", 'Thiệp mời! Tiệc LEGO vào Chủ nhật lúc ba giờ!', '🧱'],
              ['a', 'Yes! Would you like to come?', 'Đúng rồi! Bạn có muốn đến không?', '🙋'],
              ['b', "I'd love to! Can I bring my guitar?", 'Mình rất muốn! Mình mang đàn ghi-ta theo được không?', '🎸']
            ],
            blanks: [[1, 'invitation', ['invitation', 'injection', 'onion']], [3, "I'd love to!", ["I'd love to!", "I'd love a sandwich!", "I'm a lantern!"]]]
          },
          build: [
            { vi: 'Em muốn nói: Mình muốn mời bạn đến dự tiệc của mình.', a: ['I', 'want to invite', 'you', 'to my party.'], x: ['wants to invite', 'to my homework.'] },
            { vi: 'Em muốn hỏi: Bạn có muốn đến vào thứ Bảy không?', a: ['Would you like', 'to come', 'on Saturday?'], x: ['Do you like', 'to came'] }
          ],
          talk: [
            { q: 'Would you like to come to my LEGO party?', vi: 'Bạn có muốn đến bữa tiệc LEGO của mình không?', hint: "I'd love to! Thank you!", k: ['love|yes|sure|sorry|great|ok|okay|course', 'thank|thanks|come|party|cant|time'], c: ["I'd love to! Thank you!", 'I love LEGO very much.', 'My party is on Saturday.'] },
            { q: 'Who will you invite to your next birthday?', vi: 'Bạn sẽ mời ai đến sinh nhật sắp tới?', hint: 'I will invite my best friends and my cousins.', k: ['invite|ask|will|call', 'friend|friends|cousin|cousins|class|classmates|family|grandma|grandpa|teacher|brother|sister|neighbours'], c: ['I will invite my best friends and my cousins.', 'My best friends like cake.', 'I will have a big cake.'] }
          ],
          snow: { vi: 'Mời bạn đến dự tiệc', l: [[['my party'], 'bữa tiệc của mình'], [['Please', 'come to', 'my party.'], 'Hãy đến dự tiệc của mình nhé.'], [['Please', 'come to', 'my party', 'on Sunday', "at three o'clock."], 'Hãy đến dự tiệc của mình vào Chủ nhật lúc ba giờ nhé.']], x: ['comes to', 'yesterday'] },
          cb: ['b', 'Khoa, can I invite my cousin Emma to your party too?', 'Khoa ơi, mình mời em họ Emma đến tiệc của bạn được không?', [
            ['yes', 'Of course! The more, the merrier!', 'Tất nhiên rồi! Càng đông càng vui!', 'Yay! Emma loves LEGO too!', 'Yeah! Emma cũng mê LEGO lắm!', '🥳'],
            ['ask', 'Let me ask my mum first, okay?', 'Để mình hỏi mẹ trước nhé, được không?', 'Sure! Tell me tomorrow.', 'Được chứ! Mai báo mình nhé.', '📱']]],
          tb: ['b', 'Oh! I forgot to bring a present for your party!', 'Ôi! Mình quên mang quà đến tiệc của bạn rồi!', [
            ['calm', "Don't worry! You are my best present.", 'Đừng lo! Bạn chính là món quà tuyệt nhất của mình.', 'Aww, you are so sweet, Khoa!', 'Ôi, Khoa đáng yêu quá!', '🎁'],
            ['idea', 'Can you play a song on your guitar for me?', 'Bạn đàn tặng mình một bài hát được không?', 'Great idea! Happy birthday to you...', 'Ý hay! Chúc mừng sinh nhật bạn...', '🎸']]],
          fact: ['The song "Happy Birthday to You" is sung in many languages all around the world.', 'Bài hát "Chúc mừng sinh nhật" được hát bằng nhiều thứ tiếng trên khắp thế giới.'],
          tf: [
            ['An invitation tells guests the time and place of a party.', true, 'Yes! Guests need to know when and where to come.', 'Đúng! Khách cần biết khi nào và ở đâu.'],
            ["You say \"I'd love to!\" when you don't want to go.", false, "No! \"I'd love to!\" means yes, happily.", "Sai! \"I'd love to!\" nghĩa là đồng ý một cách vui vẻ."]
          ],
          qa: ['What do you write on a party invitation?', 'Bạn viết gì trên thiệp mời dự tiệc?', 'I write the date, the time and the place.', ['write|put|draw', 'date|time|place|name|day|address|party']]
        },
        {
          title: "Let's Make a Plan", titleVi: 'Cùng lên kế hoạch', icon: '🏮',
          words: [
            ['Shall we...?', 'phrase', '/ʃæl wiː/', 'Chúng ta... nhé?', '🤝', 'Shall we make a star lantern?', 'Chúng mình làm đèn ông sao nhé?', 'A friendly way to suggest doing something together.'],
            ['Why don\'t we...?', 'phrase', '/waɪ dəʊnt wiː/', 'Sao chúng ta không... nhỉ?', '💬', "Why don't we meet at the park?", 'Sao chúng mình không gặp nhau ở công viên nhỉ?', 'Another way to give an idea to your friends, starting with a question word.'],
            ['decorate', 'verb', '/ˈdekəreɪt/', 'trang trí', '🎀', 'We decorate the room with balloons.', 'Bọn mình trang trí phòng bằng bóng bay.', 'You make a place look pretty with lights, flowers and balloons.'],
            ['lantern', 'noun', '/ˈlæntən/', 'đèn lồng', '🏮', 'Children carry a lantern at Mid-Autumn.', 'Trẻ em rước đèn lồng vào Tết Trung thu.', 'A paper light that children carry on the full-moon festival.'],
            ['Sounds great!', 'phrase', '/saʊndz ɡreɪt/', 'Nghe hay đấy!', '👍', "Sounds great! Let's do it!", 'Nghe hay đấy! Làm thôi!', 'You say this when you like a friend\'s idea.']
          ],
          comic: {
            title: 'Mid-Autumn Lantern Night', titleVi: 'Đêm rước đèn Trung thu',
            panels: [
              ['a', 'Lily, Mid-Autumn is next Friday. Shall we make lanterns?', 'Lily ơi, thứ Sáu tới là Trung thu rồi. Mình làm đèn lồng nhé?', '🏮'],
              ['b', "Sounds great! Why don't we make a star lantern?", 'Nghe hay đấy! Sao mình không làm đèn ông sao nhỉ?', '⭐'],
              ['a', "Good idea! Then let's decorate the yard with lights.", 'Ý hay! Rồi mình trang trí sân bằng đèn nhé.', '✨'],
              ['b', "And we can eat mooncakes under the full moon!", 'Và mình có thể ăn bánh trung thu dưới trăng tròn!', '🥮']
            ],
            blanks: [[1, 'Sounds great!', ['Sounds great!', 'Smells bad!', 'Sounds sleepy!']], [2, 'decorate', ['decorate', 'eat', 'forget']]]
          },
          build: [
            { vi: 'Em muốn gợi ý: Chúng mình làm đèn lồng nhé?', a: ['Shall we', 'make', 'lanterns', 'together?'], x: ['makes', 'Shall us'] },
            { vi: 'Em muốn kể: Bọn mình trang trí lớp học bằng bóng bay.', a: ['We', 'decorate', 'the classroom', 'with balloons.'], x: ['decorates', 'with noodles.'] }
          ],
          talk: [
            { q: 'Shall we have a picnic on Sunday?', vi: 'Chủ nhật mình đi dã ngoại nhé?', hint: "Sounds great! Let's bring sandwiches.", k: ['sounds|great|yes|sure|ok|okay|sorry|good|love', "bring|take|let's|lets|idea|can't|cant|fun"], c: ["Sounds great! Let's bring sandwiches.", 'Yes, I had a picnic last Sunday.', 'I like sandwiches very much.'] },
            { q: 'How do you decorate your house for Tết or Mid-Autumn?', vi: 'Nhà bạn trang trí thế nào vào dịp Tết hoặc Trung thu?', hint: 'We decorate it with lanterns and flowers.', k: ['decorate|put|hang|use|buy|make', 'lantern|lanterns|flowers|lights|peach|apricot|kumquat|red|star|stars|blossom'], c: ['We decorate it with lanterns and flowers.', 'We eat mooncakes and watch the moon.', 'We visit our grandparents.'] }
          ],
          snow: { vi: 'Lên kế hoạch cho đêm Trung thu', l: [[['lanterns'], 'đèn lồng'], [['We', 'make', 'lanterns.'], 'Bọn mình làm đèn lồng.'], [['On Mid-Autumn night,', 'we', 'make', 'lanterns', 'and walk', 'around the street.'], 'Đêm Trung thu, bọn mình làm đèn lồng và rước quanh phố.']], x: ['makes', 'mooncake'] },
          cb: ['b', "Why don't we start the party at nine at night?", 'Sao mình không bắt đầu bữa tiệc lúc chín giờ tối nhỉ?', [
            ['idea', "That's too late. How about six o'clock instead?", 'Muộn quá. Thay vào đó sáu giờ thì sao?', "You're right. Six o'clock it is!", 'Bạn nói đúng. Chốt sáu giờ nhé!', '🕕'],
            ['ask', "Let's ask our parents. What time is okay for them?", 'Mình hỏi bố mẹ đi. Mấy giờ thì bố mẹ đồng ý?', 'Smart! Parents always know best.', 'Thông minh! Bố mẹ luôn biết rõ nhất.', '👨‍👩‍👦']]],
          tb: ['b', 'We have only one star lantern. Who will carry it?', 'Mình chỉ có một chiếc đèn ông sao. Ai sẽ cầm nó?', [
            ['idea', 'Shall we take turns? Five minutes each!', 'Mình thay phiên nhé? Mỗi người năm phút!', 'Fair and fun! You go first.', 'Công bằng và vui! Bạn cầm trước đi.', '⭐'],
            ['yes', 'You can carry it. I will hold the mooncakes!', 'Bạn cầm đi. Mình sẽ cầm bánh trung thu!', 'Ha ha! Don\'t eat them all!', 'Ha ha! Đừng ăn hết nhé!', '🥮']]],
          fact: ['The Mid-Autumn Festival is on the 15th day of the 8th lunar month, when the moon is full.', 'Tết Trung thu vào ngày rằm tháng Tám âm lịch, khi trăng tròn.'],
          tf: [
            ['Mid-Autumn Festival happens on a full-moon night.', true, 'Yes! It is on the fifteenth day of the lunar month.', 'Đúng! Trung thu vào ngày rằm âm lịch.'],
            ['"Shall we...?" is a way to say goodbye.', false, 'No! It is a way to suggest something.', 'Sai! Đó là cách để đưa ra gợi ý.']
          ],
          qa: ['What do you do on Mid-Autumn night?', 'Bạn làm gì vào đêm Trung thu?', 'I carry a lantern and eat mooncakes with my family.', ['carry|eat|watch|make|play|walk|see|sing', 'lantern|lanterns|mooncake|mooncakes|moon|lion|dance|family|friends']]
        },
        {
          title: 'Saying No Nicely', titleVi: 'Từ chối thật lịch sự', icon: '🙏',
          words: [
            ["Sorry, I can't.", 'phrase', '/ˈsɒri aɪ kɑːnt/', 'Xin lỗi, mình không đi được.', '😔', "Sorry, I can't. I'm visiting my grandma.", 'Xin lỗi, mình không đi được. Mình đi thăm bà.', 'A polite way to say no when a friend invites you.'],
            ['I have to...', 'phrase', '/aɪ hæv tuː/', 'Mình phải...', '📋', 'I have to go to my piano class.', 'Mình phải đi học đàn piano.', 'You use this to give a reason when you must do something.'],
            ['Maybe next time.', 'phrase', '/ˈmeɪbi nekst taɪm/', 'Hẹn lần sau nhé.', '🔜', 'I can\'t come today. Maybe next time!', 'Hôm nay mình không đến được. Hẹn lần sau nhé!', 'You say this to keep the door open for another day.'],
            ['Thanks for asking.', 'phrase', '/θæŋks fər ˈɑːskɪŋ/', 'Cảm ơn bạn đã rủ.', '💗', "Thanks for asking, but I'm busy.", 'Cảm ơn bạn đã rủ, nhưng mình bận rồi.', 'A kind way to say thank you for the invitation.'],
            ['Never mind.', 'phrase', '/ˈnevə maɪnd/', 'Không sao đâu.', '🙂', "Never mind! We can play next week.", 'Không sao đâu! Tuần sau mình chơi nhé.', 'You say this to show you are not upset.']
          ],
          comic: {
            title: 'A Busy Saturday', titleVi: 'Một ngày thứ Bảy bận rộn',
            panels: [
              ['b', 'Khoa, shall we go to the water park on Saturday?', 'Khoa ơi, thứ Bảy mình đi công viên nước nhé?', '🌊'],
              ['a', "Thanks for asking, Lily. Sorry, I can't. I have to visit my grandpa.", 'Cảm ơn Lily đã rủ. Xin lỗi, mình không đi được. Mình phải về thăm ông.', '👴'],
              ['b', 'Never mind! Say hello to your grandpa for me.', 'Không sao đâu! Gửi lời chào ông bạn giúp mình nhé.', '👋'],
              ['a', "I will! Maybe next time. How about Sunday?", 'Mình sẽ chào! Hẹn lần sau nhé. Chủ nhật thì sao?', '📅']
            ],
            blanks: [[1, 'I have to', ['I have to', 'I eat to', 'I fly to']], [2, 'Never mind!', ['Never mind!', 'Never wash!', 'Go away!']]]
          },
          build: [
            { vi: 'Em muốn từ chối: Xin lỗi, mình không đi được. Mình phải làm bài tập.', a: ["Sorry, I can't.", 'I', 'have to', 'do my homework.'], x: ['has to', 'eat my homework.'] },
            { vi: 'Em muốn nói: Cảm ơn bạn đã rủ, nhưng mình bận rồi.', a: ['Thanks for asking,', 'but', "I'm busy."], x: ['and', "I'm a busy."] }
          ],
          talk: [
            { q: 'Would you like to play football this afternoon?', vi: 'Chiều nay bạn có muốn đá bóng không?', hint: "Sorry, I can't. I have to help my mum.", k: ["sorry|yes|sure|love|can't|cant|thanks|ok|okay", 'help|busy|play|homework|mum|next|time'], c: ["Sorry, I can't. I have to help my mum.", 'I play football every Sunday.', 'Yes, I like football very much.'] },
            { q: 'What do you have to do every weekend?', vi: 'Cuối tuần nào bạn cũng phải làm gì?', hint: 'I have to clean my room and do my homework.', k: ['have|must|need', 'clean|homework|help|visit|study|practise|class|swim|piano|tidy|wash|cook'], c: ['I have to clean my room and do my homework.', 'I like to play LEGO with my dad.', 'I have a big room.'] }
          ],
          snow: { vi: 'Từ chối một lời mời thật lịch sự', l: [[["Sorry, I can't."], 'Xin lỗi, mình không đi được.'], [['I', 'have to', 'visit my grandma.'], 'Mình phải đi thăm bà.'], [["Sorry, I can't.", 'I', 'have to', 'visit my grandma.', 'Maybe next time!'], 'Xin lỗi, mình không đi được. Mình phải đi thăm bà. Hẹn lần sau nhé!']], x: ['has to', 'Go away!'] },
          cb: ['b', "Khoa, would you like to come to my house tonight? We're watching a film.", 'Khoa ơi, tối nay bạn có muốn sang nhà mình không? Bọn mình xem phim.', [
            ['no', "Thanks for asking, but I have to go to bed early. Maybe next time!", 'Cảm ơn bạn đã rủ, nhưng mình phải đi ngủ sớm. Hẹn lần sau nhé!', 'Never mind! Next Friday, then.', 'Không sao đâu! Vậy thứ Sáu tuần sau nhé.', '🌙'],
            ['ask', "I'd love to! Let me ask my dad first.", 'Mình rất muốn! Để mình hỏi bố trước nhé.', 'Okay! Call me back soon.', 'Được! Gọi lại cho mình sớm nhé.', '📞']]],
          tb: ['b', "Oh no! You can't come to my party? I'm a little sad.", 'Ôi không! Bạn không đến tiệc của mình được à? Mình hơi buồn.', [
            ['calm', "I'm really sorry. Shall we have lunch together on Monday?", 'Mình thật sự xin lỗi. Thứ Hai mình ăn trưa cùng nhau nhé?', 'Okay! That makes me feel better.', 'Được! Thế mình thấy vui hơn rồi.', '🍱'],
            ['idea', 'I can make you a LEGO card to say sorry!', 'Mình sẽ làm tặng bạn một tấm thiệp LEGO để xin lỗi!', 'Aww! You are a true friend.', 'Ôi! Bạn đúng là bạn thân.', '💌']]],
          fact: ['Mooncakes are round like the full moon, a sign of the whole family being together.', 'Bánh trung thu tròn như trăng rằm, tượng trưng cho gia đình sum vầy.'],
          tf: [
            ['It is polite to give a reason when you say no.', true, 'Yes! A reason helps your friend understand.', 'Đúng! Nêu lý do giúp bạn mình hiểu.'],
            ['"Never mind" means you are very angry.', false, 'No! It means "It\'s okay, don\'t worry."', 'Sai! Nó có nghĩa là "Không sao đâu, đừng lo."']
          ],
          qa: ['How do you say no to a friend politely?', 'Bạn từ chối bạn bè một cách lịch sự thế nào?', "I say: Sorry, I can't. Maybe next time.", ['sorry|thanks|thank', "cant|can't|next|time|maybe|busy|have"]]
        }
      ],
      mystery: {
        t: 'Who Is Coming to the Lantern Night?', tv: 'Ai sẽ đến đêm rước đèn?',
        intro: ['Khoa invited four friends to the Mid-Autumn lantern night. Only one can come!', 'Khoa mời bốn người bạn đến đêm rước đèn Trung thu. Chỉ một bạn đến được!'],
        clues: [["Clue one: Tom said, \"Sorry, I can't. I have to visit my grandma.\"", 'Manh mối 1: Tom nói: "Xin lỗi, mình không đi được. Mình phải đi thăm bà."'],
          ['Clue two: Mai said, "Thanks for asking. Maybe next time."', 'Manh mối 2: Mai nói: "Cảm ơn bạn đã rủ. Hẹn lần sau nhé."'],
          ['Clue three: Lan has a fever, so she has to stay at home.', 'Manh mối 3: Lan bị sốt nên bạn ấy phải ở nhà.']],
        q: ['Who is coming to the lantern night?', 'Ai sẽ đến đêm rước đèn?'],
        o: [['Tom', '👦', 'Tom'], ['Mai', '👧', 'Mai'], ['Lan', '👩', 'Lan'], ['Huy', '🧒', 'Huy']], a: 3,
        win: ['Huy said, "I\'d love to!" Let\'s carry our lanterns together!', 'Huy nói: "Mình rất muốn!" Cùng rước đèn nào!']
      }
    },

    /* ---------- WEEK 36: Expressing Opinions & Mini-Debate ---------- */
    {
      id: 'w36', week: 36, month: 9, monthTitle: M9[0], monthTitleVi: M9[1],
      name: 'Expressing Opinions & Mini-Debate', vi: 'Nêu ý kiến & Tranh luận nhí', short: 'Mini-Debate',
      topic: 'Expressing Opinions & Mini-Debate', topicVi: 'Tự tin nêu ý kiến, tranh luận và tỏa sáng trên sân khấu',
      color: '#CA8A04', dark: '#854D0E', icon: '🎤', model: ['stage', 'Confident Speaker Stage', 'Sân khấu Người nói tự tin'],
      chars: { a: { name: 'Mai', fig: 'crown|cool|torso-stars|legs-red|flag' }, b: { name: 'Ms Hoa', fig: 'hair-brown|smile|torso-blue|legs-black|book' } },
      chatter: [
        ['Cats or dogs? What is your opinion?', 'Mèo hay chó? Ý kiến của bạn thế nào?'],
        ['I see your point, but I prefer summer.', 'Mình hiểu ý bạn, nhưng mình thích mùa hè hơn.'],
        ['Good point! I agree.', 'Ý hay đấy! Mình đồng ý.'],
        ['Speak loudly and smile at the audience.', 'Nói to và mỉm cười với khán giả nhé.'],
        ['Nine months! Look how far we have come!', 'Chín tháng rồi! Nhìn xem chúng ta đã đi xa thế nào!']
      ],
      lessons: [
        {
          title: 'Sharing My Opinion', titleVi: 'Chia sẻ ý kiến của em', icon: '💬',
          words: [
            ['opinion', 'noun', '/əˈpɪnjən/', 'ý kiến, quan điểm', '💭', 'My opinion is that dogs are the best pets.', 'Ý kiến của mình là chó là thú cưng tuyệt nhất.', 'What you think or feel about something. Everyone can have a different one.'],
            ['I prefer...', 'phrase', '/aɪ prɪˈfɜː/', 'Mình thích... hơn', '⚖️', 'I prefer summer to winter.', 'Mình thích mùa hè hơn mùa đông.', 'You say this when you like one thing more than another.'],
            ['for example', 'phrase', '/fər ɪɡˈzɑːmpl/', 'ví dụ như', '👉', 'Dogs are clever. For example, they can find lost things.', 'Chó rất thông minh. Ví dụ như chúng có thể tìm đồ bị mất.', 'Words you use before you show one real case to explain your idea.'],
            ['The best part is...', 'phrase', '/ðə best pɑːt ɪz/', 'Điều tuyệt nhất là...', '🌟', 'The best part is swimming in the sea.', 'Điều tuyệt nhất là được bơi ở biển.', 'You say this to tell the most fun or most wonderful thing.'],
            ['reason', 'noun', '/ˈriːzn/', 'lý do', '🔍', 'My reason is simple: cats are quiet.', 'Lý do của mình đơn giản thôi: mèo rất yên lặng.', 'It answers the question "Why?"']
          ],
          comic: {
            title: 'Cats or Dogs?', titleVi: 'Mèo hay chó?',
            panels: [
              ['b', 'Mai, cats or dogs? What is your opinion?', 'Mai ơi, mèo hay chó? Ý kiến của con thế nào?', '🐱'],
              ['a', 'I prefer cats. My reason: they are quiet and clean.', 'Con thích mèo hơn. Lý do: chúng yên lặng và sạch sẽ.', '🐈'],
              ['b', 'Can you give an example?', 'Con có thể đưa ra ví dụ không?', '🤔'],
              ['a', 'For example, my cat Mít washes her face every day! The best part is her purr.', 'Ví dụ như mèo Mít nhà con ngày nào cũng tự rửa mặt! Điều tuyệt nhất là tiếng gừ gừ của nó.', '😸']
            ],
            blanks: [[1, 'I prefer', ['I prefer', 'I sneeze', 'I cook']], [3, 'For example', ['For example', 'For breakfast', 'Good night']]]
          },
          build: [
            { vi: 'Em muốn nói: Mình thích mùa hè hơn mùa đông.', a: ['I', 'prefer', 'summer', 'to winter.'], x: ['prefers', 'to Tuesday.'] },
            { vi: 'Em muốn kể: Điều tuyệt nhất là bơi ở biển.', a: ['The best part', 'is', 'swimming', 'in the sea.'], x: ['are', 'in the fridge.'] }
          ],
          talk: [
            { q: 'Summer or winter? Which do you prefer?', vi: 'Mùa hè hay mùa đông? Bạn thích mùa nào hơn?', hint: 'I prefer summer because I can swim.', k: ['summer|winter|spring|autumn', 'because|swim|cold|hot|beach|snow|warm|sunny'], c: ['I prefer summer because I can swim.', 'My birthday is in summer.', 'I prefer the beach because I can swim.'] },
            { q: 'What is the best part of your weekend?', vi: 'Điều tuyệt nhất trong cuối tuần của bạn là gì?', hint: 'The best part is playing LEGO with my dad.', k: ['play|playing|lego|visit|visiting|swim|swimming|sleep|sleeping|eat|eating|park|family|friends|reading|cooking|football'], c: ['The best part is playing LEGO with my dad.', 'My weekend is on Saturday and Sunday.', 'The best part of school is maths.'] }
          ],
          snow: { vi: 'Nêu ý kiến kèm lý do', l: [[['I prefer'], 'Mình thích hơn'], [['I prefer', 'dogs', 'to cats.'], 'Mình thích chó hơn mèo.'], [['In my view,', 'I prefer', 'dogs', 'to cats', 'because they are friendly.'], 'Theo mình, mình thích chó hơn mèo vì chúng thân thiện.']], x: ['I prefers', 'because they is'] },
          cb: ['b', 'Mai, your friend says dogs are better. What do you say?', 'Mai ơi, bạn con nói chó tốt hơn. Con nói gì?', [
            ['calm', "That's okay. We can have different opinions.", 'Không sao ạ. Mỗi người có thể có ý kiến khác nhau.', 'Wonderful! That is a very grown-up answer.', 'Tuyệt vời! Câu trả lời rất người lớn đấy.', '🤝'],
            ['ask', 'Can you tell me your reason? I want to understand.', 'Bạn cho mình biết lý do được không? Mình muốn hiểu.', 'Great question! Good speakers listen too.', 'Câu hỏi hay! Người nói giỏi cũng biết lắng nghe.', '👂']]],
          tb: ['b', 'Mai, what is your opinion: phở or bánh mì for breakfast?', 'Mai ơi, ý kiến của con thế nào: phở hay bánh mì cho bữa sáng?', [
            ['yes', 'I prefer phở! For example, it keeps me warm in winter.', 'Con thích phở hơn! Ví dụ như nó giữ ấm cho con vào mùa đông.', 'Yum! A clear opinion with an example!', 'Ngon! Ý kiến rõ ràng có cả ví dụ!', '🍜'],
            ['idea', 'Both! Phở on Monday and bánh mì on Tuesday!', 'Cả hai ạ! Thứ Hai ăn phở, thứ Ba ăn bánh mì!', 'Ha ha! A smart way to choose!', 'Ha ha! Cách chọn thông minh đấy!', '🥖']]],
          fact: ['Cats sleep for about 12 to 16 hours a day!', 'Mèo ngủ khoảng 12 đến 16 tiếng mỗi ngày!'],
          tf: [
            ['A good opinion has a reason.', true, 'Yes! A reason makes your opinion strong.', 'Đúng! Có lý do thì ý kiến của con mạnh mẽ hơn.'],
            ['Everyone must have the same opinion.', false, 'No! People can think differently, and that is okay.', 'Sai! Mỗi người có thể nghĩ khác nhau, và điều đó không sao cả.']
          ],
          qa: ['Cats or dogs? Which do you prefer and why?', 'Mèo hay chó? Bạn thích con nào hơn và vì sao?', 'I prefer dogs because they are friendly.', ['cat|cats|dog|dogs|both', 'because|prefer|friendly|cute|quiet|clever|play']]
        },
        {
          title: 'Agree or Disagree?', titleVi: 'Đồng ý hay không đồng ý?', icon: '⚖️',
          words: [
            ['I agree.', 'phrase', '/aɪ əˈɡriː/', 'Mình đồng ý.', '👍', 'I agree. Reading is fun!', 'Mình đồng ý. Đọc sách rất vui!', 'You say this when you think the same as your friend.'],
            ['I disagree because...', 'phrase', '/aɪ ˌdɪsəˈɡriː bɪˈkɒz/', 'Mình không đồng ý vì...', '👎', 'I disagree because winter is too cold.', 'Mình không đồng ý vì mùa đông lạnh quá.', 'A polite way to say you think differently and give a reason.'],
            ['I see your point, but...', 'phrase', '/aɪ siː jɔː pɔɪnt bʌt/', 'Mình hiểu ý bạn, nhưng...', '👀', 'I see your point, but homework helps us learn.', 'Mình hiểu ý bạn, nhưng bài tập giúp chúng mình học.', 'You show you understand your friend first, then you give a different idea.'],
            ['Good point!', 'phrase', '/ɡʊd pɔɪnt/', 'Ý hay đấy!', '🎯', 'Good point! I never thought of that.', 'Ý hay đấy! Mình chưa bao giờ nghĩ đến điều đó.', 'You say this when your friend says something smart.'],
            ['debate', 'noun', '/dɪˈbeɪt/', 'cuộc tranh luận', '🗣️', 'Our class had a debate about homework.', 'Lớp mình có một cuộc tranh luận về bài tập về nhà.', 'Two teams talk about a question. One team says yes, one team says no.']
          ],
          comic: {
            title: 'The Great Homework Debate', titleVi: 'Cuộc tranh luận lớn về bài tập',
            panels: [
              ['b', "Today's debate: Should kids have homework?", 'Tranh luận hôm nay: Trẻ em có nên có bài tập về nhà không?', '📚'],
              ['a', 'I disagree because kids need time to play and rest.', 'Con không đồng ý vì trẻ em cần thời gian để chơi và nghỉ ngơi.', '⚽'],
              ['b', 'I see your point, but a little homework helps you remember.', 'Cô hiểu ý con, nhưng một chút bài tập giúp con ghi nhớ.', '🧠'],
              ['a', 'Good point! Maybe ten minutes a day is fair.', 'Ý hay ạ! Có lẽ mười phút mỗi ngày là công bằng.', '⏱️']
            ],
            blanks: [[1, 'I disagree because', ['I disagree because', 'I sneeze because', 'I eat because']], [3, 'Good point!', ['Good point!', 'Good night!', 'Bad pizza!']]]
          },
          build: [
            { vi: 'Em muốn nói: Mình hiểu ý bạn, nhưng mùa hè nóng quá.', a: ['I see your point,', 'but', 'summer', 'is too hot.'], x: ['and', 'are too hot.'] },
            { vi: 'Em muốn phản biện: Mình không đồng ý vì chó cần nhiều không gian.', a: ['I disagree', 'because', 'dogs', 'need lots of space.'], x: ['needs lots of space.', 'so'] }
          ],
          talk: [
            { q: 'Should kids have homework? What do you think?', vi: 'Trẻ em có nên có bài tập về nhà không? Bạn nghĩ sao?', hint: 'I agree, because homework helps us learn.', k: ['agree|disagree|yes|no|think|should', 'learn|play|rest|help|helps|tired|practise|time|remember'], c: ['I agree, because homework helps us learn.', 'I do my homework every evening.', 'Yes, I have homework today.'] },
            { q: 'Your friend says winter is better than summer. What do you say?', vi: 'Bạn của bạn nói mùa đông tốt hơn mùa hè. Bạn nói gì?', hint: 'I see your point, but I love the beach in summer.', k: ['agree|disagree|see|point|but|think|right', 'summer|winter|beach|cold|hot|swim|snow'], c: ['I see your point, but I love the beach in summer.', 'You are wrong! Go away!', 'It is very hot today.'] }
          ],
          snow: { vi: 'Phản biện lịch sự', l: [[['I disagree'], 'Mình không đồng ý'], [['I disagree', 'with', 'this idea.'], 'Mình không đồng ý với ý này.'], [['I see your point,', 'but', 'I disagree', 'with this idea', 'because kids need to play.'], 'Mình hiểu ý bạn, nhưng mình không đồng ý với ý này vì trẻ em cần được chơi.']], x: ['I disagrees', 'You are wrong!'] },
          cb: ['b', "Mai, Nam says your idea is silly. How do you answer?", 'Mai ơi, Nam nói ý của con ngớ ngẩn. Con trả lời thế nào?', [
            ['calm', 'I see your point, but here is my reason...', 'Mình hiểu ý bạn, nhưng đây là lý do của mình...', 'Calm and kind. That is how winners debate!', 'Bình tĩnh và tử tế. Người chiến thắng tranh luận như thế đấy!', '😌'],
            ['ask', 'Nam, which part do you disagree with?', 'Nam ơi, bạn không đồng ý phần nào?', 'Great! Asking questions makes the debate better.', 'Tuyệt! Đặt câu hỏi giúp cuộc tranh luận hay hơn.', '❓']]],
          tb: ['b', 'Your team must choose: a trip to the beach or to the mountains?', 'Đội con phải chọn: đi biển hay đi núi?', [
            ['idea', "Let's vote! Then everyone can give their opinion.", 'Mình bỏ phiếu đi ạ! Như thế ai cũng được nêu ý kiến.', 'Fair and fun! Hands up for the beach!', 'Công bằng và vui! Ai chọn biển giơ tay nào!', '🙋'],
            ['yes', 'I agree with Lan. The mountains are cool in summer!', 'Con đồng ý với Lan. Mùa hè trên núi mát lắm!', 'Good point! Sa Pa, here we come!', 'Ý hay đấy! Sa Pa ơi, chúng mình đến đây!', '⛰️']]],
          fact: ['People in ancient Greece held public debates more than 2,000 years ago.', 'Người Hy Lạp cổ đại đã tổ chức tranh luận trước công chúng từ hơn 2.000 năm trước.'],
          tf: [
            ['In a good debate, you listen to the other team.', true, 'Yes! Listening helps you answer well.', 'Đúng! Lắng nghe giúp con trả lời tốt.'],
            ['"I see your point" means you cannot see.', false, 'No! It means "I understand your idea."', 'Sai! Nó có nghĩa là "Mình hiểu ý bạn."']
          ],
          qa: ['Tell me something you disagree with and why.', 'Kể một điều bạn không đồng ý và vì sao.', 'I disagree with short break time because we need to play.', ['disagree|dont|not|think', 'because|need|want|play|time|too|homework']]
        },
        {
          title: 'The Confident Speaker Show', titleVi: 'Chương trình Người nói tự tin', icon: '🎓',
          words: [
            ['audience', 'noun', '/ˈɔːdiəns/', 'khán giả', '👏', 'The audience clapped for Mai.', 'Khán giả vỗ tay cho Mai.', 'All the people who sit and watch a show.'],
            ['give a speech', 'verb', '/ɡɪv ə spiːtʃ/', 'phát biểu, đọc bài nói', '🗣️', 'I will give a speech on stage tomorrow.', 'Ngày mai mình sẽ phát biểu trên sân khấu.', 'You stand in front of many people and talk about your ideas.'],
            ['microphone', 'noun', '/ˈmaɪkrəfəʊn/', 'micrô', '🎤', 'Hold the microphone close to your mouth.', 'Cầm micrô gần miệng nhé.', 'You hold it and speak into it, so everyone can hear you.'],
            ['take a bow', 'verb', '/teɪk ə baʊ/', 'cúi chào (khi kết thúc màn biểu diễn)', '🙇', 'At the end, we take a bow.', 'Cuối buổi, bọn mình cúi chào khán giả.', 'You bend your body forward at the end of a show to say thank you.'],
            ['journey', 'noun', '/ˈdʒɜːni/', 'hành trình', '🗺️', 'Our English journey was nine months long.', 'Hành trình tiếng Anh của chúng mình kéo dài chín tháng.', 'A long trip from one place to another, or a long time of learning.']
          ],
          comic: {
            title: 'Graduation Day on Stage', titleVi: 'Ngày tốt nghiệp trên sân khấu',
            panels: [
              ['a', "Ms Hoa, I'm a bit nervous. The audience is so big!", 'Cô Hoa ơi, con hơi run. Khán giả đông quá!', '😬'],
              ['b', 'Take a deep breath. Hold the microphone and smile.', 'Hít thở sâu nào. Cầm micrô và mỉm cười nhé.', '🎤'],
              ['a', 'Hello, everyone! Today I will give a speech about my English journey.', 'Xin chào mọi người! Hôm nay con sẽ phát biểu về hành trình tiếng Anh của con.', '🗺️'],
              ['b', 'Bravo, Mai! Now take a bow. We are so proud of you!', 'Hoan hô Mai! Giờ cúi chào đi con. Cả nhà rất tự hào về con!', '🎓']
            ],
            blanks: [[1, 'microphone', ['microphone', 'mooncake', 'motorbike']], [3, 'take a bow', ['take a bow', 'take a bath', 'take a nap']]]
          },
          build: [
            { vi: 'Em muốn nói: Mình sẽ phát biểu trên sân khấu.', a: ['I', 'will give', 'a speech', 'on stage.'], x: ['will gives', 'in the bath.'] },
            { vi: 'Em muốn kể: Khán giả vỗ tay cho chúng mình.', a: ['The audience', 'clapped', 'for us.'], x: ['clap', 'for the fridge.'] }
          ],
          talk: [
            { q: 'How do you feel before you speak on stage?', vi: 'Bạn cảm thấy thế nào trước khi nói trên sân khấu?', hint: 'I feel a bit nervous, but I take a deep breath.', k: ['nervous|excited|happy|scared|ok|fine|shy|worried|calm|ready|good|great', 'breath|breathe|smile|practise|but|because|so'], c: ['I feel a bit nervous, but I take a deep breath.', 'I speak about my LEGO town.', 'I felt happy after the show.'] },
            { q: 'What was the best part of your English journey?', vi: 'Điều tuyệt nhất trong hành trình tiếng Anh của bạn là gì?', hint: 'The best part was building LEGO models and speaking English.', k: ['was|liked|loved|enjoyed', 'lego|speaking|comics|stories|games|words|friends|building|space|mystery|songs|reading'], c: ['The best part was building LEGO models and speaking English.', 'The best part is my new bike.', 'I started English when I was six.'] }
          ],
          snow: { vi: 'Kể về buổi biểu diễn cuối khóa', l: [[['a speech'], 'một bài phát biểu'], [['I', 'gave', 'a speech.'], 'Mình đã phát biểu.'], [['At the end of our journey,', 'I', 'gave', 'a speech', 'in front of', 'a big audience.'], 'Cuối hành trình, mình đã phát biểu trước rất đông khán giả.']], x: ['give', 'a small mouse'] },
          cb: ['b', 'Mai, you finished nine months of English! How do you feel?', 'Mai ơi, con đã hoàn thành chín tháng tiếng Anh! Con thấy thế nào?', [
            ['yes', 'I feel brave! I can speak English with confidence now!', 'Con thấy mình dũng cảm! Giờ con nói tiếng Anh thật tự tin!', 'You did it, superstar! Take a bow!', 'Con làm được rồi, siêu sao! Cúi chào nào!', '🌟'],
            ['idea', "I'm happy, but I want to keep learning. What's next?", 'Con vui lắm, nhưng con muốn học tiếp. Tiếp theo là gì ạ?', 'That is the spirit of a true learner! New adventures await!', 'Đó là tinh thần của người học thực thụ! Những cuộc phiêu lưu mới đang chờ!', '🚀']]],
          tb: ['b', 'Oh no! You forgot one line of your speech on stage!', 'Ôi không! Con quên mất một câu trong bài nói trên sân khấu!', [
            ['calm', 'I smile, take a breath, and say the next part.', 'Con mỉm cười, hít thở, rồi nói phần tiếp theo.', 'Perfect! Nobody even noticed. Real speakers do that!', 'Hoàn hảo! Không ai nhận ra cả. Người nói chuyên nghiệp làm đúng như vậy!', '😊'],
            ['ask', 'I look at my little card. It has my key words!', 'Con nhìn tấm thẻ nhỏ. Trên đó có từ khóa của con!', 'Smart! A note card is a speaker\'s best friend.', 'Thông minh! Thẻ ghi chú là bạn thân của người nói.', '🗒️']]],
          fact: ['Taking slow, deep breaths can help your body feel calm before you speak.', 'Hít thở chậm và sâu có thể giúp cơ thể con bình tĩnh trước khi nói.'],
          tf: [
            ['Many famous speakers feel nervous before they go on stage.', true, 'Yes! Even famous people get nervous. Practice helps.', 'Đúng! Ngay cả người nổi tiếng cũng run. Luyện tập sẽ giúp con.'],
            ['You should whisper so the audience cannot hear you.', false, 'No! Speak clearly and loudly so everyone can hear.', 'Sai! Hãy nói rõ ràng và to để mọi người đều nghe thấy.']
          ],
          qa: ['What will you say in your graduation speech?', 'Bạn sẽ nói gì trong bài phát biểu tốt nghiệp?', 'I will say thank you to my family and talk about my journey.', ['thank|say|talk|tell|love|learned|learnt', 'family|mum|dad|teacher|journey|english|friends|lego|words']]
        }
      ],
      mystery: {
        t: 'Who Won the Debate Trophy?', tv: 'Ai giành cúp tranh luận?',
        intro: ['Four friends joined the final debate show. One of them won the golden trophy!', 'Bốn bạn tham gia chương trình tranh luận chung kết. Một bạn đã giành cúp vàng!'],
        clues: [['Clue one: Bin did not debate. He held the microphone for everyone.', 'Manh mối 1: Bin không tranh luận. Bạn ấy cầm micrô cho mọi người.'],
          ['Clue two: Khoa sat in the audience and clapped.', 'Manh mối 2: Khoa ngồi dưới khán giả và vỗ tay.'],
          ['Clue three: Na said to the winner, "I see your point, but I disagree." Then Na took second place.', 'Manh mối 3: Na nói với người thắng cuộc: "Mình hiểu ý bạn, nhưng mình không đồng ý." Rồi Na đạt giải nhì.']],
        q: ['Who won the debate trophy?', 'Ai đã giành cúp tranh luận?'],
        o: [['Bin', '🎤', 'Bin'], ['Khoa', '👏', 'Khoa'], ['Na', '🧒', 'Na'], ['Mai', '👧', 'Mai']], a: 3,
        win: ['Mai won! She gave clear opinions, good reasons and great examples. Congratulations, confident speaker!', 'Mai thắng rồi! Bạn ấy nêu ý kiến rõ ràng, lý do thuyết phục và ví dụ hay. Chúc mừng người nói tự tin!']
      }
    }
  );

  (global.CurriculumStages = global.CurriculumStages || []).push({ stage: 3, zones: Z });
})(window);
