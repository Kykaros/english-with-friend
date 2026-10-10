/* Nội dung luyện 4 kỹ năng — 600 Essential Words for TOEIC, bài 41–50. Cấu trúc: xem toeic600-skills-1.js. */
(function () {
  const Q = (q, o, a, why) => ({ q, o, a, why });
  const add = (id, data) => EWF.addSkills("toeic600", id, data);

  add(41, {
    read: {
      type: "Article", title: "Local film company signs Hollywood deal",
      text: `Moonlight Pictures, a small film company based in Ho Chi Minh City, has signed an agreement with a major Hollywood studio to release its next three films in the United States.

The company's latest movie, "River of Lanterns," has attained great success in Asia. It combines action with a moving family story, and its description of life in the Mekong Delta has been praised by critics. The film was the top entertainment choice in Vietnamese cinemas for five successive weeks.

"Our films represent Vietnamese culture, but their stories are for everyone," said director Le Thu. She believes the deal will influence other Asian studios to look for international partners.

Moonlight plans to continue making films in Vietnamese, with English subtitles. The studio will also produce a separate version for streaming services. Its new film, set for release next spring, covers a broad range of topics, from technology to friendship.`,
      q: [
        Q("What is the article mainly about?", ["A new cinema in Ho Chi Minh City", "A film company's deal with a Hollywood studio", "An award ceremony", "A famous actor"], 1,
          "Moonlight Pictures ký thoả thuận phát hành phim tại Mỹ với hãng phim Hollywood."),
        Q("How long was “River of Lanterns” the top choice in Vietnamese cinemas?", ["Three weeks", "One month", "Five weeks in a row", "One year"], 2,
          "“for five successive weeks.” — successive = liên tiếp."),
        Q("What does director Le Thu believe?", ["The deal will influence other Asian studios", "Her films are only for Vietnamese viewers", "Streaming will replace cinemas", "Hollywood films are better"], 0,
          "“the deal will influence other Asian studios to look for international partners.”"),
        Q("In what language will Moonlight continue to make films?", ["English", "Chinese", "Korean", "Vietnamese"], 3,
          "“Moonlight plans to continue making films in Vietnamese, with English subtitles.”"),
      ],
    },
    listen: {
      title: "Choosing a movie",
      lines: [
        ["W", "Do you want to see a movie tonight?"],
        ["M", "Sure. What's showing?"],
        ["W", "There's the new action film and a comedy that was just released."],
        ["M", "I saw the reviews for the action film. People say the story is weak."],
        ["W", "Then let's see the comedy. It's light entertainment, and it starts at seven forty-five."],
        ["M", "Great. I'll buy the tickets online so we don't have to wait in line."],
      ],
      q: [
        Q("What are the speakers planning to do?", ["Watch a movie", "Have dinner", "Go to a concert", "Visit a museum"], 0,
          "“Do you want to see a movie tonight?”"),
        Q("Why don't they choose the action film?", ["It is too long", "The reviews say the story is weak", "It is sold out", "It starts too late"], 1,
          "“People say the story is weak.”"),
        Q("What will the man do?", ["Read more reviews", "Call the cinema", "Buy tickets online", "Meet the woman at seven"], 2,
          "“I'll buy the tickets online”."),
      ],
    },
    speak: {
      q: ["Describe a movie you enjoyed recently. What was it about?",
        "Do you prefer watching movies at the cinema or at home? Why?"],
    },
    write: {
      s: [["release", "Viết câu về một bộ phim hoặc sản phẩm sắp ra mắt."],
        ["entertainment", "Viết câu về hình thức giải trí bạn thích."],
        ["influence", "Viết câu về người đã ảnh hưởng đến bạn."]],
      email: {
        task: "Viết email mời một người bạn đi xem phim cuối tuần: giới thiệu bộ phim, thời gian và địa điểm.",
        use: ["release", "combine", "description"],
        sample: "Hi Nam,\n\nAre you free on Saturday evening? The new film \"River of Lanterns\" was released last week, and I would love to see it with you. The reviews say it combines action with a beautiful family story, and the description of the Mekong Delta is amazing. It's showing at CGV Vincom at 7:30 p.m.\n\nLet me know, and I'll book the tickets.\n\nCheers,\nAn",
      },
    },
  });

  add(42, {
    read: {
      type: "Theater review", title: "“The Last Train” at the City Theater",
      text: `"The Last Train," which opened at the City Theater on Friday, is an experience no theater lover should miss.

The play takes place on a train traveling through the night. Almost all the action occurs in a single carriage, where five strangers slowly reveal their secrets. The writer has created sharp, funny dialogue, and the cast performs it brilliantly.

What makes the production special is its approach to sound. The audience hears the train through speakers placed around the theater, and this element makes everyone feel as if they are on board.

The actors clearly rehearsed for months; not a single line was missed. My only criticism is that the second half is slightly too long.

The first two weeks are already sold out, but extra shows have been added for June. I strongly recommend booking soon.`,
      q: [
        Q("Where does most of the play take place?", ["In a train station", "In a train carriage", "In a hotel", "In a theater"], 1,
          "“Almost all the action occurs in a single carriage”."),
        Q("What does the reviewer praise about the production?", ["The costumes", "The ticket prices", "The use of sound", "The theater seats"], 2,
          "“What makes the production special is its approach to sound.”"),
        Q("What is the reviewer's criticism?", ["The second half is too long", "The actors forgot lines", "The dialogue is boring", "The sound is too loud"], 0,
          "“My only criticism is that the second half is slightly too long.”"),
        Q("What has the theater done because of high demand?", ["Raised prices", "Moved to a bigger theater", "Shortened the play", "Added extra shows"], 3,
          "“extra shows have been added for June.”"),
      ],
    },
    listen: {
      title: "Tickets for a play",
      lines: [
        ["M", "I'd like two tickets for 'The Last Train' this Saturday, please."],
        ["W", "I'm sorry, Saturday is sold out. We have seats on Sunday afternoon."],
        ["M", "What time does it start?"],
        ["W", "At two o'clock. The actors perform for about two and a half hours."],
        ["M", "That works. Are there seats near the front?"],
        ["W", "Yes, row C. That's forty dollars each."],
      ],
      q: [
        Q("Why can't the man get tickets for Saturday?", ["The show is sold out", "The theater is closed", "The actors are sick", "Tickets are too expensive"], 0,
          "“Saturday is sold out.”"),
        Q("How long is the performance?", ["One hour", "About two and a half hours", "Three hours", "Two hours"], 1,
          "“The performance lasts about two and a half hours.”"),
        Q("How much does each ticket cost?", ["Twenty dollars", "Thirty dollars", "Forty dollars", "Fifty dollars"], 2,
          "“That's forty dollars each.”"),
      ],
    },
    speak: {
      q: ["Have you ever seen a play or a live performance? Describe the experience.",
        "Why do you think some people prefer theater to movies?"],
    },
    write: {
      s: [["audience", "Viết câu về khán giả tại một buổi biểu diễn."],
        ["perform", "Viết câu về một ca sĩ hoặc diễn viên biểu diễn."],
        ["sell out", "Viết câu về việc vé hoặc sản phẩm bán hết."]],
      email: {
        task: "Viết email cho nhà hát hỏi mua vé nhóm cho 10 đồng nghiệp xem một vở kịch và hỏi có giảm giá không.",
        use: ["perform", "audience", "sell out"],
        sample: "Dear City Theater,\n\nI would like to buy ten tickets for \"The Last Train\" for my colleagues. We heard that the actors perform brilliantly and that the audience loves the show. Since the first weeks have sold out, could you tell me which dates in June are still available? We would also like to know if you offer a discount for groups.\n\nThank you.\n\nBest regards,\nMy Tran",
      },
    },
  });

  add(43, {
    read: {
      type: "Article", title: "What your playlist says about you",
      text: `Why do people have such disparate tastes in music? A new study from the University of Melbourne suggests that our preferences are linked to our personality and our reasons for listening.

Researchers divided 3,000 volunteers into groups according to the music categories they listened to most. People who used music mainly for relaxation often chose classical or jazz. Those who said they felt an urge to move or exercise preferred pop and dance music.

Interestingly, most people said they choose their favorite songs by instinct rather than by thinking about it. "We don't decide to like a song," says lead researcher Dr. Emma Brooks. "We simply feel it."

The study also found that young people now listen to a much broader range of music than ten years ago. Experts believe this is because millions of songs are available online for free.`,
      q: [
        Q("What did the study examine?", ["How to write songs", "Why people like different music", "How much music costs", "Where people buy music"], 1,
          "Nghiên cứu vì sao mọi người có gu âm nhạc khác nhau."),
        Q("What kind of music do people who listen for relaxation choose?", ["Pop", "Dance", "Classical or jazz", "Rock"], 2,
          "“People who used music mainly for relaxation often chose classical or jazz.”"),
        Q("According to the study, how do most people choose their favorite songs?", ["By instinct", "By reading reviews", "By asking friends", "By price"], 0,
          "“most people said they choose their favorite songs by instinct”."),
        Q("Why do young people listen to a broader range of music?", ["Schools teach more music", "Concerts are cheaper", "Radio stations changed", "Songs are available online for free"], 3,
          "“millions of songs are available online for free.”"),
      ],
    },
    listen: {
      title: "Music at work",
      lines: [
        ["W", "Do you mind if I play some music while we work?"],
        ["M", "Not at all. What kind of music do you like?"],
        ["W", "Mostly jazz. It's my favorite kind of relaxation, and it helps me concentrate."],
        ["M", "Same here. I can't work with songs that have lyrics, though."],
        ["W", "Then I'll play instrumental jazz. Let me know if it's too loud."],
        ["M", "Thanks. That sounds perfect."],
      ],
      q: [
        Q("What does the woman want to do?", ["Play music while working", "Go to a concert", "Buy a speaker", "Learn an instrument"], 0,
          "“Do you mind if I play some music while we work?”"),
        Q("Why does the woman like jazz?", ["It is popular", "It helps her relax and concentrate", "It is her job", "Her friend plays it"], 1,
          "“It helps me relax and concentrate.”"),
        Q("What does the man say he cannot do?", ["Listen to jazz", "Work in silence", "Work with songs that have lyrics", "Hear well"], 2,
          "“I can't work with songs that have lyrics”."),
      ],
    },
    speak: {
      q: ["What is your favorite kind of music? When do you usually listen to it?",
        "Describe a song that has a special meaning for you."],
    },
    write: {
      s: [["favorite", "Viết câu về ca sĩ hoặc bài hát yêu thích."],
        ["relaxation", "Viết câu về cách bạn thư giãn."],
        ["taste", "Viết câu về gu âm nhạc hoặc thời trang của bạn."]],
      email: {
        task: "Bạn phụ trách tiệc công ty. Viết email hỏi đồng nghiệp về thể loại nhạc họ muốn nghe tại bữa tiệc.",
        use: ["preference", "category", "taste"],
        sample: "Hi everyone,\n\nWe are preparing the music for our year-end party, and we want everyone to enjoy it. Since we all have different tastes, please tell me your preference by Friday. You can choose one category: pop, rock, jazz, or Vietnamese classics. We will make a playlist based on the most popular choices.\n\nThanks for your help!\nQuan",
      },
    },
  });

  add(44, {
    read: {
      type: "Museum notice", title: "New exhibition: A Century of Fashion",
      text: `The City Museum of Art is proud to present "A Century of Fashion," a new exhibition opening on March 3.

The exhibition shows how clothing has expressed social change from 1920 to today. It includes more than 200 dresses, suits, and accessories, many of them recently acquired from private collections. Visitors can admire a significant collection of áo dài, from early silk designs to modern versions.

The museum, which specializes in Southeast Asian design, has responded to criticism that past exhibitions were too small. This exhibition covers three floors and a wide spectrum of styles.

The museum is open from 9 a.m. to 6 p.m., Tuesday to Sunday. Guided tours are scheduled daily at 10 a.m. and 2 p.m. Admission is free on the first Sunday of each month. Why not spend some of your leisure time with us?`,
      q: [
        Q("What is the exhibition about?", ["Modern painting", "The history of fashion", "Southeast Asian food", "Famous designers' lives"], 1,
          "“A Century of Fashion” — clothing from 1920 to today."),
        Q("Where did many of the items come from?", ["Other museums", "Fashion schools", "Private collections", "Online auctions"], 2,
          "“many of them recently acquired from private collections.”"),
        Q("How has the museum responded to past criticism?", ["By making the exhibition bigger", "By lowering prices", "By opening later", "By hiring new guides"], 0,
          "Bị chê triển lãm trước nhỏ, nay trải rộng 3 tầng."),
        Q("When is admission free?", ["Every Tuesday", "Every day after 2 p.m.", "On March 3", "On the first Sunday of each month"], 3,
          "“Admission is free on the first Sunday of each month.”"),
      ],
    },
    listen: {
      title: "At the museum",
      lines: [
        ["M", "Excuse me, what time is the next guided tour?"],
        ["W", "It's scheduled for two o'clock, in about twenty minutes."],
        ["M", "Is it in English?"],
        ["W", "Yes, the two o'clock tour is in English. It lasts one hour."],
        ["M", "Great. Can I take photos during the tour?"],
        ["W", "Yes, but please don't use the flash. It can damage the older pieces in the collection."],
      ],
      q: [
        Q("When does the next tour start?", ["At two o'clock", "In one hour", "At ten o'clock", "At three o'clock"], 0,
          "“It starts at two o'clock”."),
        Q("How long is the tour?", ["Twenty minutes", "One hour", "Two hours", "Thirty minutes"], 1,
          "“It lasts one hour.”"),
        Q("What are visitors asked not to do?", ["Take photos", "Touch the walls", "Use the flash", "Talk loudly"], 2,
          "“please don't use the flash.”"),
      ],
    },
    speak: {
      q: ["Describe a museum or exhibition you have visited. What did you see there?",
        "How do you like to spend your leisure time on weekends?"],
    },
    write: {
      s: [["admire", "Viết câu về một người hoặc tác phẩm bạn ngưỡng mộ."],
        ["collection", "Viết câu về một bộ sưu tập (tem, sách, ảnh…)."],
        ["leisure", "Viết câu về thời gian rảnh của bạn."]],
      email: {
        task: "Viết email cho bảo tàng đặt một tour có hướng dẫn cho nhóm 15 người và hỏi về giá vé nhóm.",
        use: ["schedule", "collection", "admire"],
        sample: "Dear City Museum of Art,\n\nI am organizing a visit for a group of 15 colleagues on Saturday, March 15. We would love to admire your new fashion collection with a guide. Could you tell me if you can schedule an English-speaking tour at 10 a.m. that day? I would also like to know whether there is a discount for groups.\n\nThank you in advance.\n\nBest regards,\nLinh Do",
      },
    },
  });

  add(45, {
    read: {
      type: "Article", title: "Newspapers fight back with in-depth reporting",
      text: `For years, newspapers have struggled as readers chose free news on social media. But some papers are finding a new way forward: thorough, investigative journalism.

The Daily Mekong, for example, now gives each reporter fewer assignments so that they can spend weeks on a single story. Its recent series on air pollution had a decisive impact on city policy: two weeks after it was published, the city council introduced new rules for factories.

"Readers are tired of constant headlines and click-bait links," says editor Hoa Pham. "When people choose to subscribe, they are paying for quality."

The paper now disseminates its stories through a mobile app as well as in print. Digital subscribers constitute more than half of its readers, and that number is growing every month.`,
      q: [
        Q("What new approach are some newspapers taking?", ["Publishing more short stories", "Focusing on in-depth investigative reporting", "Stopping print editions", "Using only social media"], 1,
          "“thorough, investigative journalism.”"),
        Q("Why do Daily Mekong reporters receive fewer assignments?", ["The paper has less money", "There is less news", "So they can spend weeks on one story", "So they can work from home"], 2,
          "“so that they can spend weeks on a single story.”"),
        Q("What happened after the series on air pollution?", ["The city introduced new rules for factories", "The newspaper was closed", "Factories sued the paper", "Readers cancelled subscriptions"], 0,
          "“the city council introduced new rules for factories.”"),
        Q("What is true about digital subscribers?", ["They are a small group", "They pay less than print readers", "They are decreasing", "They make up more than half of readers"], 3,
          "“Digital subscribers constitute more than half of its readers”."),
      ],
    },
    listen: {
      title: "A news assignment",
      lines: [
        ["W", "I have a new assignment for you. I'd like an in-depth story on the city's traffic problems."],
        ["M", "Great. How much time do I have?"],
        ["W", "Three weeks. Be thorough — interview drivers, experts, and city officials."],
        ["M", "Should I include photos as well?"],
        ["W", "Yes, and a short video for our website. Online readers love that."],
        ["M", "Okay. I'll send you an outline by Friday."],
      ],
      q: [
        Q("What is the man's new assignment about?", ["Traffic problems", "Air pollution", "A new mayor", "Online news"], 0,
          "“an in-depth story on the city's traffic problems.”"),
        Q("How long does the man have to complete the story?", ["One week", "Three weeks", "Until Friday", "One month"], 1,
          "“Three weeks.”"),
        Q("What will the man send by Friday?", ["The final story", "A video", "An outline", "Photos"], 2,
          "“I'll send you an outline by Friday.”"),
      ],
    },
    speak: {
      q: ["How do you usually get the news? Which source do you trust most?",
        "Should people pay for news, or should all news be free? Explain your opinion."],
    },
    write: {
      s: [["subscribe", "Viết câu về việc đăng ký một kênh hoặc tạp chí."],
        ["impact", "Viết câu về tác động của mạng xã hội."],
        ["thorough", "Viết câu về việc kiểm tra kỹ lưỡng."]],
      email: {
        task: "Viết email cho một tờ báo/tạp chí online hỏi về gói đăng ký đọc báo và các ưu đãi cho người mới.",
        use: ["subscribe", "in-depth", "choose"],
        sample: "Dear Daily Mekong,\n\nI have read several of your in-depth articles online and would like to subscribe to your digital edition. Could you tell me the price of the monthly and yearly plans? I would also like to know if new subscribers can choose a free trial period before paying.\n\nThank you for your help.\n\nBest regards,\nKhoa",
      },
    },
  });

  add(46, {
    read: {
      type: "Clinic notice", title: "Greenfield Medical Center — patient information",
      text: `Welcome to Greenfield Medical Center. Please read this information before your appointment.

We recommend that all adults have a full health check annually. During the check, the doctor will assess your blood pressure, heart, and general health. Regular checks are the most effective way to prevent serious illness.

Please arrive ten minutes early to update your medical record. If you need to cancel, call us at least 24 hours in advance.

Our doctors can diagnose and manage most common conditions. If you need special tests or treatment, your doctor will refer you to a specialist at City Hospital.

New this year: our clinic has new instruments for checking eyesight and hearing, so these tests no longer require a separate visit.

Opening hours: Monday to Friday, 7:30 a.m. to 7:00 p.m.; Saturday, 8:00 a.m. to noon.`,
      q: [
        Q("How often does the clinic recommend a full health check?", ["Every month", "Once a year", "Every five years", "Only when sick"], 1,
          "“have a full health check annually.” — annually = hằng năm."),
        Q("Why should patients arrive early?", ["To pay the bill", "To see the specialist", "To update their medical record", "To get a parking space"], 2,
          "“Please arrive ten minutes early to update your medical record.”"),
        Q("What happens if a patient needs special treatment?", ["The doctor refers them to a specialist", "They must call another clinic", "They are asked to come back next year", "They receive medicine by mail"], 0,
          "“your doctor will refer you to a specialist at City Hospital.”"),
        Q("What is new at the clinic this year?", ["Longer opening hours", "A new doctor", "Online appointments", "Instruments for eye and hearing tests"], 3,
          "“new instruments for checking eyesight and hearing”."),
      ],
    },
    listen: {
      title: "Making an appointment",
      lines: [
        ["W", "Greenfield Medical Center. How can I help you?"],
        ["M", "Hi, I'd like to make an appointment with Dr. Kim. I've had a bad cough for two weeks."],
        ["W", "Dr. Kim is available tomorrow at ten thirty or on Friday at four."],
        ["M", "Tomorrow, please. The sooner the better."],
        ["W", "All right. Please bring your insurance card. I also recommend that you arrive ten minutes early."],
        ["M", "I will. Thank you."],
      ],
      q: [
        Q("Why does the man want to see the doctor?", ["He has a bad cough", "He needs a health check", "He hurt his leg", "He needs a vaccine"], 0,
          "“I've had a bad cough for two weeks.”"),
        Q("When will the man see Dr. Kim?", ["Friday at four", "Tomorrow at ten thirty", "Today at ten", "Next week"], 1,
          "Anh chọn “Tomorrow, please.” — ngày mai lúc 10:30."),
        Q("What should the man bring?", ["His medical record", "Cash", "His insurance card", "A letter from his employer"], 2,
          "“Please bring your insurance card”."),
      ],
    },
    speak: {
      q: ["What do you do to stay healthy?",
        "Do people in your country usually have regular health checks? Why or why not?"],
    },
    write: {
      s: [["appointment", "Viết câu về một cuộc hẹn khám bệnh."],
        ["prevent", "Viết câu về cách phòng tránh bệnh cảm cúm."],
        ["recommend", "Viết câu khuyên một thói quen tốt cho sức khoẻ."]],
      email: {
        task: "Viết email cho phòng khám để dời lịch hẹn khám sức khoẻ sang ngày khác vì bạn bận công tác.",
        use: ["appointment", "annually", "record"],
        sample: "Dear Greenfield Medical Center,\n\nI have an appointment with Dr. Kim on Thursday, May 8, at 9 a.m. for my health check, which I do annually. Unfortunately, I have to go on a business trip that week. Could I move my appointment to the following Tuesday or Wednesday morning? My medical record number is 55120.\n\nThank you for your understanding.\n\nBest regards,\nHai Nguyen",
      },
    },
  });

  add(47, {
    read: {
      type: "Leaflet", title: "Keep your smile healthy",
      text: `At Bright Smile Dental Clinic, we believe that good habits are the key to healthy teeth. Here is a short overview of what you can do at home.

Brush your teeth regularly, at least twice a day, for two minutes each time. Many people stop too early because of distractions such as their phone. Use a soft brush: a hard one can irritate your gums.

It is also important to be aware of the effect of sugary drinks. Even one soda a day can damage your teeth over time, although the damage may not be evident for several years.

If you have missed your regular check-ups, don't worry — it's never too late to catch up. Our dentists use a special light to illuminate every area of your mouth and can restore damaged teeth quickly and painlessly.

Children receive a small gift after each visit as encouragement. Book online or call 555-0136.`,
      q: [
        Q("What is the leaflet mainly about?", ["Opening a dental clinic", "How to keep teeth healthy", "The price of dental treatment", "A new type of toothpaste"], 1,
          "Hướng dẫn giữ răng khoẻ tại nhà và giới thiệu phòng khám."),
        Q("Why does the leaflet recommend a soft brush?", ["It lasts longer", "It is cheaper", "A hard brush can irritate gums", "It cleans faster"], 2,
          "“a hard one can irritate your gums.”"),
        Q("What does the leaflet say about sugary drinks?", ["Damage may take years to appear", "They are safe in small amounts", "They clean teeth", "They should be drunk with meals"], 0,
          "“the damage may not be evident for several years.”"),
        Q("What do children receive after each visit?", ["A free toothbrush", "A discount", "A free check-up", "A small gift"], 3,
          "“Children receive a small gift after each visit as encouragement.”"),
      ],
    },
    listen: {
      title: "At the dentist",
      lines: [
        ["M", "When was your last check-up?"],
        ["W", "About two years ago, I'm afraid. I've been very busy."],
        ["M", "That's all right. Let's catch up today. Do you have any pain?"],
        ["W", "Yes, a tooth on the left side hurts when I drink something cold."],
        ["M", "Let me take a look. There's a small hole. I can restore it today. It will only take twenty minutes."],
        ["W", "Great. I'd like to get it done now."],
      ],
      q: [
        Q("When was the woman's last check-up?", ["About two years ago", "Last month", "Six months ago", "Last week"], 0,
          "“About two years ago”."),
        Q("What problem does the woman have?", ["Her gums bleed", "A tooth hurts when she drinks something cold", "She lost a tooth", "Her teeth are yellow"], 1,
          "“a tooth on the left side hurts when I drink something cold.”"),
        Q("How long will the treatment take?", ["Two hours", "One hour", "Twenty minutes", "Two days"], 2,
          "“It will only take twenty minutes.”"),
      ],
    },
    speak: {
      q: ["Describe a good habit you have and a bad habit you would like to change.",
        "Why are many people afraid of going to the dentist? What could dentists do about it?"],
    },
    write: {
      s: [["habit", "Viết câu về một thói quen hằng ngày của bạn."],
        ["regularly", "Viết câu về việc bạn làm thường xuyên."],
        ["aware", "Viết câu về việc nhận thức được một vấn đề."]],
      email: {
        task: "Viết email cho phòng khám nha khoa đặt lịch khám định kỳ và mô tả ngắn vấn đề răng của bạn.",
        use: ["regularly", "catch up", "position"],
        sample: "Dear Bright Smile Dental Clinic,\n\nI would like to book a check-up. I know I should visit the dentist regularly, but my last check-up was two years ago, so I need to catch up. Recently, one of my back teeth has been hurting when I drink cold water. I think it is the tooth in the second position on the lower left. Are you available next Saturday morning?\n\nThank you.\n\nBest regards,\nTrang",
      },
    },
  });

  add(48, {
    read: {
      type: "Memo", title: "Changes to the staff health insurance policy",
      text: `To: All personnel
From: Human Resources
Re: New health insurance policy from January 1

We are pleased to announce a new health insurance policy for all staff, regardless of position or salary level.

The most important aspect of the new plan is that it now allows employees to choose their own doctor. Previously, staff could only use clinics on the insurer's list. We also want to emphasize that dental care is now included.

The company will continue to pay the larger portion of the monthly premium, 80%. Employees will pay the remaining 20%, which will be deducted from their salary. Please note that you may incur extra costs if you choose a private hospital room.

We understand that some staff may have concerns about the changes. If the new plan is not suitable for you, an alternative plan with lower monthly costs is available. HR will hold two information sessions next week.`,
      q: [
        Q("Who is covered by the new policy?", ["Managers only", "All staff", "Full-time staff only", "New employees only"], 1,
          "“for all staff, regardless of position or salary level.”"),
        Q("What is the most important change?", ["Lower premiums", "Free medicine", "Employees can choose their own doctor", "Coverage for family members"], 2,
          "“it now allows employees to choose their own doctor.”"),
        Q("What portion of the premium will employees pay?", ["20%", "80%", "50%", "None"], 0,
          "“Employees will pay the remaining 20%”."),
        Q("What is available for staff who are not satisfied with the plan?", ["A cash payment", "A private room", "Free dental care", "An alternative plan with lower costs"], 3,
          "“an alternative plan with lower monthly costs is available.”"),
      ],
    },
    listen: {
      title: "Questions about insurance",
      lines: [
        ["W", "Did you read the memo about the new health insurance policy?"],
        ["M", "Yes. I'm glad dental care is included now."],
        ["W", "Me too. But I'm concerned about the cost. Will our monthly payment go up?"],
        ["M", "Only a little. The company still pays eighty percent."],
        ["W", "That's not bad. I'll go to the information session on Tuesday to ask about my children."],
        ["M", "Good idea. I think family members can be added for a small fee."],
      ],
      q: [
        Q("What change is the man happy about?", ["Dental care is included", "His salary increased", "He can work from home", "The cost went down"], 0,
          "“I'm glad dental care is included now.”"),
        Q("What is the woman concerned about?", ["Finding a doctor", "The cost of the insurance", "Losing her job", "The memo"], 1,
          "“I'm concerned about the cost.”"),
        Q("Why will the woman attend the session on Tuesday?", ["To change her doctor", "To complain", "To ask about her children", "To sign a contract"], 2,
          "“to ask about my children.”"),
      ],
    },
    speak: {
      q: ["How important is health insurance when you choose a job? Explain.",
        "What are the advantages and disadvantages of public and private health care?"],
    },
    write: {
      s: [["policy", "Viết câu về một chính sách của công ty bạn."],
        ["concern", "Viết câu bày tỏ mối lo ngại về một vấn đề."],
        ["suitable", "Viết câu về một lựa chọn phù hợp với bạn."]],
      email: {
        task: "Viết email cho phòng Nhân sự hỏi về chính sách bảo hiểm sức khoẻ mới: có thể thêm người thân không và chi phí thế nào.",
        use: ["policy", "concern", "alternative"],
        sample: "Dear HR team,\n\nThank you for the information about the new health insurance policy. I have one concern. My wife does not work, and I would like to add her to my plan. Could you tell me how much this would cost each month? If it is too expensive, is there an alternative plan for family members?\n\nI look forward to your reply.\n\nBest regards,\nViet",
      },
    },
  });

  add(49, {
    read: {
      type: "Hospital information", title: "Information for visitors and patients",
      text: `Welcome to Saint Mary's Hospital. Our mission is to give every patient safe, caring treatment.

When you are admitted, a nurse will check your name and date of birth to identify you correctly. Please tell the nurse about all medicines you are taking; this information is pertinent to your treatment.

Visiting hours are from 3 p.m. to 8 p.m. Children under 12 are permitted to visit only with an adult. Smoking is allowed only in the designated area outside the main entrance.

Before any procedure, your doctor will explain what will happen, and you will be asked to sign an authorization form. Test results are usually available within two days, and your doctor will discuss them with you.

When you leave, a staff member will escort you to the exit if needed, and you will receive a statement of all charges. As usual, payment can be made at the cashier on the ground floor.`,
      q: [
        Q("Why will a nurse check a patient's name and date of birth?", ["To prepare the bill", "To identify the patient correctly", "To contact the family", "To book a room"], 1,
          "“to identify you correctly.”"),
        Q("Who can children under 12 visit with?", ["Alone", "With a doctor", "With an adult", "Only on weekends"], 2,
          "“Children under 12 are permitted to visit only with an adult.”"),
        Q("What must patients sign before a procedure?", ["An authorization form", "A payment receipt", "A visitor list", "A statement of charges"], 0,
          "“you will be asked to sign an authorization form.”"),
        Q("Where can patients pay?", ["In their room", "At the main entrance", "Online only", "At the cashier on the ground floor"], 3,
          "“payment can be made at the cashier on the ground floor.”"),
      ],
    },
    listen: {
      title: "Visiting a patient",
      lines: [
        ["M", "Excuse me, I'm here to visit my father, Mr. Hung. He was admitted yesterday."],
        ["W", "Let me check. He's in room 304 on the third floor."],
        ["M", "Thank you. Can I bring my daughter? She's eight."],
        ["W", "Yes, children are permitted with an adult. Visiting hours end at eight."],
        ["M", "Do you know when his test results will be ready?"],
        ["W", "Usually within two days. His doctor will explain them to you."],
      ],
      q: [
        Q("Who is the man visiting?", ["His father", "His daughter", "His wife", "A colleague"], 0,
          "“I'm here to visit my father”."),
        Q("Where is the patient's room?", ["On the first floor", "On the third floor", "On the eighth floor", "On the ground floor"], 1,
          "“He's in room 304 on the third floor.”"),
        Q("When will the test results probably be ready?", ["Tonight", "In one week", "Within two days", "Tomorrow morning"], 2,
          "“Usually within two days.”"),
      ],
    },
    speak: {
      q: ["What qualities should a good doctor or nurse have?",
        "Describe a time you or someone you know stayed in a hospital. How was the experience?"],
    },
    write: {
      s: [["admit", "Viết câu về việc ai đó nhập viện."],
        ["procedure", "Viết câu về một quy trình bạn phải làm theo."],
        ["result", "Viết câu về kết quả của một bài kiểm tra."]],
      email: {
        task: "Người thân của bạn vừa xuất viện. Viết email cảm ơn đội ngũ bác sĩ, y tá của bệnh viện.",
        use: ["admit", "procedure", "mission"],
        sample: "Dear Saint Mary's Hospital,\n\nMy mother was admitted to your hospital on May 2 for a knee operation. I would like to thank the doctors and nurses on the fourth floor. They explained every procedure clearly and were always kind and patient. Your staff truly follow the hospital's mission of caring treatment. My mother is now recovering well at home.\n\nWith sincere thanks,\nThuy",
      },
    },
  });

  add(50, {
    read: {
      type: "Pharmacy leaflet", title: "Using your medicine safely",
      text: `At Wellness Pharmacy, our pharmacists are always happy to help. Please consult us before taking any new medicine, even one you can buy without a prescription.

Some medicines can cause a harmful interaction when taken together. Age, weight, and other health conditions are also important factors. Tell your pharmacist about everything you take, including vitamins.

Never take more than the daily limit printed on the box. If you are on long-term treatment, your doctor may ask you to monitor your blood pressure at home. We sell easy-to-use machines that can detect potential problems early.

For your convenience, you can now order refills online and pick them up at a time that is convenient for you.

This month, we are looking for volunteers to test a new blood sugar monitor. Participants will receive free samples of our new vitamin range. It makes sense to take control of your health!`,
      q: [
        Q("What does the pharmacy advise customers to do before taking new medicine?", ["Read reviews online", "Consult a pharmacist", "Buy vitamins", "Wait one week"], 1,
          "“Please consult us before taking any new medicine”."),
        Q("Why should customers tell the pharmacist about everything they take?", ["To get a discount", "To order online", "To avoid harmful interactions", "To join a program"], 2,
          "Một số thuốc dùng chung có thể gây “harmful interaction”."),
        Q("What can blood pressure machines do?", ["Detect potential problems early", "Replace a doctor", "Order medicine", "Measure weight"], 0,
          "“machines that can detect potential problems early.”"),
        Q("What will volunteers receive?", ["A free blood pressure machine", "Free medicine for a year", "A cash payment", "Free vitamin samples"], 3,
          "“Participants will receive free samples of our new vitamin range.”"),
      ],
    },
    listen: {
      title: "At the pharmacy",
      lines: [
        ["W", "Hi, I'd like something for a headache, please."],
        ["M", "Sure. Are you taking any other medicine at the moment?"],
        ["W", "Yes, I take medicine for high blood pressure."],
        ["M", "Then I'd recommend this one. It won't cause an interaction with your blood pressure medicine."],
        ["W", "How many can I take a day?"],
        ["M", "No more than three tablets. That's the daily limit. If the headache continues for more than three days, please see your doctor."],
      ],
      q: [
        Q("What does the woman want?", ["Medicine for a headache", "Blood pressure medicine", "Vitamins", "A prescription refill"], 0,
          "“I'd like something for a headache”."),
        Q("Why does the man ask about other medicine?", ["To give a discount", "To avoid an interaction", "To check her insurance", "To order more stock"], 1,
          "Anh chọn thuốc “won't cause an interaction” với thuốc huyết áp."),
        Q("What should the woman do if the headache continues for more than three days?", ["Take more tablets", "Come back to the pharmacy", "See her doctor", "Stop taking all medicine"], 2,
          "“please see your doctor.”"),
      ],
    },
    speak: {
      q: ["When you feel a little sick, do you go to a pharmacy or a doctor first? Why?",
        "What advice would you give someone who wants to live a healthier life?"],
    },
    write: {
      s: [["consult", "Viết câu khuyên ai đó hỏi ý kiến chuyên gia."],
        ["convenient", "Viết câu về một dịch vụ tiện lợi."],
        ["limit", "Viết câu về giới hạn thời gian hoặc số lượng."]],
      email: {
        task: "Viết email đăng ký làm tình nguyện viên thử máy đo đường huyết của nhà thuốc trong tờ rơi trên và hỏi thêm chi tiết.",
        use: ["volunteer", "monitor", "convenient"],
        sample: "Dear Wellness Pharmacy,\n\nI read in your leaflet that you are looking for volunteers to test a new blood sugar monitor. I would like to take part. I am 45 years old and check my blood sugar every week. Could you tell me how long the test lasts and what I would need to do? Weekday evenings are most convenient for me.\n\nThank you.\n\nBest regards,\nTien Pham",
      },
    },
  });
})();
