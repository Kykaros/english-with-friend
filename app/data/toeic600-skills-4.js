/* Nội dung luyện 4 kỹ năng — 600 Essential Words for TOEIC, bài 31–40. Cấu trúc: xem toeic600-skills-1.js. */
(function () {
  const Q = (q, o, a, why) => ({ q, o, a, why });
  const add = (id, data) => EWF.addSkills("toeic600", id, data);

  add(31, {
    read: {
      type: "Review column", title: "Where to take your team to dinner",
      text: `Choosing a restaurant for a team dinner is never easy. Taste is subjective, and what appeals to one person may not suit another. Here is a simple guide to help you find a good compromise.

First, ask your colleagues for suggestions. If the majority prefer a familiar place, don't be afraid to choose it — people relax more in a restaurant they know. If your team is more daring, try somewhere new, such as Saigon Fusion, which mixes Vietnamese and Mexican flavors.

Second, think about location. Choose a place that everyone can arrive at easily after work, ideally near public transport.

Finally, secure a reservation at least a week in advance, especially on Fridays. Don't rely on finding a table for twelve people on the same evening. Most good restaurants are fully booked by Thursday.`,
      q: [
        Q("What is the article mainly about?", ["Opening a restaurant", "Choosing a restaurant for a team dinner", "Cooking Mexican food", "Working as a waiter"], 1,
          "Hướng dẫn chọn nhà hàng cho bữa tối của nhóm."),
        Q("What is the first step the writer recommends?", ["Booking a table", "Checking prices online", "Asking colleagues for suggestions", "Choosing a new restaurant"], 2,
          "“First, ask your colleagues for suggestions.”"),
        Q("What is special about Saigon Fusion?", ["It mixes two styles of food", "It is very cheap", "It is open all night", "It is near the office"], 0,
          "“mixes Vietnamese and Mexican flavors.”"),
        Q("Why should people book early?", ["Prices go up", "The menu changes", "Restaurants close early", "Good restaurants fill up quickly"], 3,
          "“Most good restaurants are fully booked by Thursday.”"),
      ],
    },
    listen: {
      title: "Choosing a place for lunch",
      lines: [
        ["M", "Where should we take the clients for lunch on Thursday?"],
        ["W", "How about the new Italian place on Park Street? It got great reviews."],
        ["M", "I'd rather go somewhere familiar. Last time we tried a new place, the service was slow."],
        ["W", "Fair enough. What about the Golden Lotus? Everyone liked it last month."],
        ["M", "Perfect. Could you secure a table for six at twelve thirty?"],
        ["W", "Sure. I'll call them right now."],
      ],
      q: [
        Q("Who will the speakers take to lunch?", ["Clients", "New employees", "Their manager", "Family members"], 0,
          "“take the clients for lunch”."),
        Q("Why does the man prefer a familiar restaurant?", ["It is cheaper", "A new place had slow service before", "It is closer", "The clients asked for it"], 1,
          "“Last time we tried a new place, the service was slow.”"),
        Q("What will the woman do next?", ["Check reviews", "Order the food", "Call the restaurant", "Meet the clients"], 2,
          "“I'll call them right now.”"),
      ],
    },
    speak: {
      q: ["Recommend a restaurant in your city to a visitor. Why do you like it?",
        "When you choose a restaurant, what matters most: food, price, or atmosphere?"],
    },
    write: {
      s: [["suggestion", "Viết câu đưa ra gợi ý về nơi ăn tối."],
        ["familiar", "Viết câu về một nơi quen thuộc với bạn."],
        ["rely", "Viết câu về người hoặc thứ bạn có thể tin cậy."]],
      email: {
        task: "Bạn được giao tổ chức bữa tối cho nhóm. Viết email gửi đồng nghiệp đề xuất hai nhà hàng và xin ý kiến.",
        use: ["suggestion", "majority", "secure"],
        sample: "Hi team,\n\nI'm organizing our end-of-month dinner on Friday, June 28. I have two suggestions: the Golden Lotus, which serves Vietnamese food, or Saigon Fusion, which mixes Vietnamese and Mexican dishes. Please reply with your choice by Wednesday. I'll book the restaurant that the majority prefers, so we can secure a table for twelve.\n\nThanks!\nHanh",
      },
    },
  });

  add(32, {
    read: {
      type: "Restaurant review", title: "A night at Basil & Lime",
      text: `Basil & Lime, which opened in March, has quickly become popular with local patrons. I visited last Saturday with two friends.

The menu is basic but excellent. Every dish is made with fresh ingredients from local farms, and the chef is not afraid to experiment with flavor. The lemongrass chicken was the most exciting dish of the evening.

There was one small mix-up: our waiter brought beef instead of the fish my friend had ordered. However, he quickly apologized and reminded the kitchen, and the correct dish arrived within ten minutes, free of charge.

It's hard to predict how a new restaurant will develop, but I judge Basil & Lime to be one of the best openings of the year. Don't forget to book: tables are not given to random walk-in guests on weekends. Our complete meal for three cost $75.`,
      q: [
        Q("What does the reviewer say about the ingredients?", ["They are imported", "They are fresh and local", "They are expensive", "They are frozen"], 1,
          "“made with fresh ingredients from local farms”."),
        Q("Which dish did the reviewer like most?", ["The beef", "The fish", "The lemongrass chicken", "The dessert"], 2,
          "“The lemongrass chicken was the most exciting dish of the evening.”"),
        Q("What problem happened during the meal?", ["The wrong dish was served", "The bill was wrong", "The table was dirty", "The food was cold"], 0,
          "Phục vụ mang nhầm bò thay vì cá — “mix-up”."),
        Q("What does the reviewer advise readers to do?", ["Arrive early", "Order the fish", "Bring cash", "Make a reservation"], 3,
          "“Don't forget to book”."),
      ],
    },
    listen: {
      title: "A mix-up with the order",
      lines: [
        ["W", "Excuse me. I think there's been a mix-up. I ordered the vegetable soup, not the chicken soup."],
        ["M", "I'm so sorry. Let me take this back to the kitchen."],
        ["W", "Thank you. I don't eat meat, so please make sure there's no chicken in it."],
        ["M", "Of course. I'll remind the chef. It will be ready in five minutes."],
        ["W", "That's fine."],
        ["M", "And your dessert will be free tonight, to apologize for the mistake."],
      ],
      q: [
        Q("What did the woman order?", ["Vegetable soup", "Chicken soup", "A salad", "A dessert"], 0,
          "“I ordered the vegetable soup”."),
        Q("Why is the woman concerned?", ["She is in a hurry", "She doesn't eat meat", "The soup is cold", "The price is wrong"], 1,
          "“I don't eat meat”."),
        Q("What does the man offer?", ["A discount on the bill", "A different table", "A free dessert", "A free drink"], 2,
          "“your dessert will be free tonight”."),
      ],
    },
    speak: {
      q: ["Describe a memorable meal you had at a restaurant.",
        "What should a restaurant do when a customer complains?"],
    },
    write: {
      s: [["ingredient", "Viết câu về nguyên liệu chính của một món ăn bạn thích."],
        ["flavor", "Viết câu mô tả hương vị một món ăn."],
        ["remind", "Viết câu nhắc ai đó làm việc gì."]],
      email: {
        task: "Viết email phản hồi cho nhà hàng sau bữa ăn: khen một món và góp ý về một sự nhầm lẫn khi phục vụ.",
        use: ["flavor", "mix-up", "patron"],
        sample: "Dear Basil & Lime,\n\nI had dinner at your restaurant last Saturday with my family. The lemongrass chicken had a wonderful flavor, and the staff were very friendly. There was a small mix-up with our order, as we received beef instead of fish, but the waiter fixed it quickly. As a regular patron, I just wanted to share this feedback.\n\nWe will definitely come back.\n\nBest regards,\nLong",
      },
    },
  });

  add(33, {
    read: {
      type: "E-mail", title: "New lunch ordering system",
      text: `To: All staff
From: Office Administration
Subject: Ordering lunch for meetings

Hi everyone,

Ordering lunch for meetings has become burdensome for our assistants, so we are introducing a new system starting next week.

We have narrowed our list of restaurants down to three: Green Bowl, Pho House, and Café Elegance. Each offers multiple options, including vegetarian dishes. Green Bowl and Pho House provide free delivery for orders over $50. Café Elegance does not deliver, so someone will need to pick up the food.

When you book a meeting room, please list the number of people and any individual requests, such as allergies. The task of ordering will now fall to the person who booked the room, not to the assistants.

Payment will be settled at the end of each month by the finance department. If you want to impress visiting clients, Café Elegance is the most common choice for special lunches.

Thank you!`,
      q: [
        Q("Why is the new system being introduced?", ["Food prices have increased", "Ordering lunch was too much work for assistants", "Staff complained about the food", "A restaurant closed"], 1,
          "“Ordering lunch for meetings has become burdensome for our assistants”."),
        Q("Which restaurant does NOT deliver?", ["Green Bowl", "Pho House", "Café Elegance", "None of them"], 2,
          "“Café Elegance does not deliver”."),
        Q("Who will be responsible for ordering lunch now?", ["The person who booked the room", "The assistants", "The finance department", "The restaurant"], 0,
          "“The task of ordering will now fall to the person who booked the room”."),
        Q("How will lunches be paid for?", ["In cash on delivery", "By each employee", "By the clients", "Monthly by the finance department"], 3,
          "“Payment will be settled at the end of each month by the finance department.”"),
      ],
    },
    listen: {
      title: "Ordering lunch for a meeting",
      lines: [
        ["M", "Hi, I'd like to order lunch for a meeting. It's for twelve people."],
        ["W", "Sure. Would you like our set menu or individual dishes?"],
        ["M", "The set menu, please. But two people are vegetarian."],
        ["W", "No problem. I'll add two vegetarian sets. Should we deliver it?"],
        ["M", "Yes, to Pacific Tower, tenth floor, by twelve o'clock."],
        ["W", "Great. Delivery is free for orders over fifty dollars, so there's no extra charge."],
      ],
      q: [
        Q("How many people is the lunch for?", ["Twelve", "Ten", "Two", "Fifty"], 0,
          "“It's for twelve people.”"),
        Q("What special request does the man make?", ["Extra drinks", "Two vegetarian meals", "Early delivery", "No spicy food"], 1,
          "“two people are vegetarian.”"),
        Q("Why is there no delivery charge?", ["It is the man's first order", "The office is nearby", "The order is over fifty dollars", "He paid in advance"], 2,
          "“Delivery is free for orders over fifty dollars”."),
      ],
    },
    speak: {
      q: ["What do you usually eat for lunch on a working day? Where do you get it?",
        "Is it better to eat lunch with colleagues or alone? Why?"],
    },
    write: {
      s: [["delivery", "Viết câu về dịch vụ giao đồ ăn."],
        ["pick up", "Viết câu nhờ ai đó đi lấy đồ giúp bạn."],
        ["impress", "Viết câu về việc gây ấn tượng với khách hàng."]],
      email: {
        task: "Viết email đặt bữa trưa cho một cuộc họp: số người, món ăn, yêu cầu đặc biệt và thời gian giao.",
        use: ["delivery", "individual", "multiple"],
        sample: "Dear Green Bowl,\n\nI would like to order lunch for a meeting this Friday. There will be 15 people. Please send multiple salad bowls and rice dishes so people can choose. We also have two individual requests: one person cannot eat peanuts, and another is vegetarian. We would like delivery to Pacific Tower, 10th floor, at 11:45 a.m.\n\nThank you.\n\nBest regards,\nOanh",
      },
    },
  });

  add(34, {
    read: {
      type: "Article", title: "From office worker to chef",
      text: `At 32, David Nguyen relinquished a well-paid job in banking to follow his dream of a culinary career. Today, he runs one of the most popular restaurants in Hoi An.

"Becoming a chef is very demanding," he says. "I started as an apprentice in a hotel kitchen, working twelve hours a day. It took me a year to become accustomed to the heat and the pressure."

David's restaurant, Lantern Kitchen, draws visitors from all over the world. Its theme is traditional central Vietnamese food, but David incorporates modern cooking methods, such as slow cooking at low temperatures.

The recent influx of tourists to Hoi An has helped his business grow. He has now opened a second outlet in Da Nang. "Cooking is a profession that never stops teaching you," he says. "Every day I learn something new."`,
      q: [
        Q("What did David do before becoming a chef?", ["He was a teacher", "He worked in banking", "He owned a hotel", "He was a tourist guide"], 1,
          "“relinquished a well-paid job in banking”."),
        Q("How did David start his culinary career?", ["By opening a restaurant", "By studying abroad", "As an apprentice in a hotel kitchen", "By cooking at home"], 2,
          "“I started as an apprentice in a hotel kitchen”."),
        Q("What is the theme of Lantern Kitchen?", ["Traditional central Vietnamese food", "International fast food", "French cuisine", "Vegetarian dishes"], 0,
          "“Its theme is traditional central Vietnamese food”."),
        Q("What has helped David's business grow?", ["Lower rent", "A cooking TV show", "Government support", "More tourists in Hoi An"], 3,
          "“The recent influx of tourists to Hoi An has helped his business grow.”"),
      ],
    },
    listen: {
      title: "Cooking school",
      lines: [
        ["W", "I'm thinking about going to cooking school."],
        ["M", "Really? I thought you loved your job in marketing."],
        ["W", "I do, but cooking has always been my passion. I'd like to make it my profession."],
        ["M", "It's a very demanding job, though. Long hours and weekends."],
        ["W", "I know. That's why I'm going to take an evening course first, to see if I really like it."],
        ["M", "That sounds like a smart way to start."],
      ],
      q: [
        Q("What is the woman's current job?", ["Marketing", "Cooking", "Teaching", "Banking"], 0,
          "“your job in marketing”."),
        Q("What does the man say about being a chef?", ["It is well-paid", "It is demanding", "It is easy", "It is boring"], 1,
          "“It's a very demanding job”."),
        Q("What will the woman do first?", ["Quit her job", "Open a restaurant", "Take an evening course", "Work in a hotel kitchen"], 2,
          "“I'm going to take an evening course first”."),
      ],
    },
    speak: {
      q: ["Would you like to work as a chef? Why or why not?",
        "Describe a traditional dish from your hometown and how it is made."],
    },
    write: {
      s: [["demanding", "Viết câu về một công việc đòi hỏi cao."],
        ["profession", "Viết câu về nghề nghiệp bạn mơ ước."],
        ["method", "Viết câu về một phương pháp học tiếng Anh hiệu quả."]],
      email: {
        task: "Viết email hỏi một trường dạy nấu ăn về khoá học buổi tối: thời gian, học phí và yêu cầu đầu vào.",
        use: ["culinary", "method", "apprentice"],
        sample: "Dear Saigon Culinary School,\n\nI am interested in your evening culinary course. I work full-time, so I can only study after 6 p.m. Could you tell me how long the course lasts and how much it costs? I would also like to know which cooking methods are taught and whether students can work as an apprentice in a restaurant after the course.\n\nThank you for your help.\n\nBest regards,\nTam",
      },
    },
  });

  add(35, {
    read: {
      type: "E-mail", title: "Planning the company anniversary party",
      text: `To: Event Committee
From: Helen Cho
Subject: Anniversary party — site visit

Dear committee members,

Thank you for agreeing to assist with our 20th anniversary party on November 22. Below is a general update on our plans.

After visiting four sites, I believe the Riverside Hall is ideal for our event. Its proximity to the office means staff can walk there, and its dimensions (30 by 20 meters) are perfect for 250 guests. The hall also has a stage for speeches and the band.

The exact number of guests will be confirmed next Friday. Please note that the hall needs a lead time of six weeks for catering orders, so we must finalize the menu by October 10.

Linda has kindly offered to coordinate with the decoration company. Finally, the city regulates noise after 10 p.m., so the music will end at that time.

Best,
Helen`,
      q: [
        Q("What is being planned?", ["A product launch", "An anniversary party", "A staff training day", "A wedding"], 1,
          "“our 20th anniversary party on November 22.”"),
        Q("Why is Riverside Hall a good choice?", ["It is the cheapest", "It has a large kitchen", "It is close to the office and the right size", "It is open all night"], 2,
          "Gần văn phòng (proximity) và kích thước phù hợp cho 250 khách."),
        Q("Why must the menu be decided by October 10?", ["Catering needs six weeks' notice", "Prices will rise", "The chef is going on holiday", "The guests must be invited"], 0,
          "“the hall needs a lead time of six weeks for catering orders”."),
        Q("Why will the music end at 10 p.m.?", ["The band must leave", "The hall closes", "Staff must work the next day", "The city limits noise after that time"], 3,
          "“the city regulates noise after 10 p.m.”"),
      ],
    },
    listen: {
      title: "Organizing a conference dinner",
      lines: [
        ["M", "Have you found a site for the conference dinner yet?"],
        ["W", "I've narrowed it down to two hotels. The Grand is bigger, but the Plaza is closer to the conference center."],
        ["M", "Proximity is important. People will be tired after a long day."],
        ["W", "That's what I thought. The Plaza also has a stage for the awards."],
        ["M", "Then let's choose the Plaza. How much lead time do they need?"],
        ["W", "Four weeks. I'll book it this afternoon."],
      ],
      q: [
        Q("What event are the speakers planning?", ["A conference dinner", "A hotel opening", "A staff party", "A wedding"], 0,
          "“the conference dinner”."),
        Q("Why do they choose the Plaza?", ["It is bigger", "It is closer and has a stage", "It is cheaper", "It has a better menu"], 1,
          "Gần trung tâm hội nghị và có sân khấu cho lễ trao giải."),
        Q("How much lead time does the hotel need?", ["Two weeks", "Six weeks", "Four weeks", "One week"], 2,
          "“Four weeks.”"),
      ],
    },
    speak: {
      q: ["Describe an event you helped to plan or organize. What did you do?",
        "What is the most difficult part of organizing a big event?"],
    },
    write: {
      s: [["coordinate", "Viết câu về việc điều phối công việc giữa các nhóm."],
        ["ideal", "Viết câu mô tả địa điểm lý tưởng cho một bữa tiệc."],
        ["plan", "Viết câu về kế hoạch cho cuối tuần."]],
      email: {
        task: "Viết email gửi khách sạn hỏi về việc tổ chức tiệc cuối năm cho 100 người: sức chứa, thời gian cần đặt trước, giá.",
        use: ["site", "lead time", "stage"],
        sample: "Dear Plaza Hotel,\n\nWe are looking for a site for our company's year-end party on December 20. There will be about 100 guests. Could you tell me whether your ballroom has a stage for speeches and a band? I would also like to know how much lead time you need for catering and the price per person for a dinner buffet.\n\nI look forward to hearing from you.\n\nBest regards,\nHelen Cho",
      },
    },
  });

  add(36, {
    read: {
      type: "Announcement", title: "Information for passengers",
      text: `Welcome to Lotus Air flight LA 215 to Tokyo. Please listen carefully to this announcement.

Due to bad weather in Tokyo, we expect a delay of about 40 minutes. Passengers will begin to board at 10:20 a.m. instead of 9:40 a.m. We apologize for the inconvenience.

Please have your boarding pass and a valid passport ready. Passengers traveling with small children will embark first.

Smoking is prohibited on all Lotus Air flights, including electronic cigarettes. Free beverages and a light meal will be served after take-off. Blankets are available on request.

When you arrive in Tokyo, you can claim your checked baggage at belt number 7. If your travel agency booked a connecting flight for you, please check your itinerary and speak to our staff at the transfer desk.`,
      q: [
        Q("Why is the flight delayed?", ["A technical problem", "Bad weather in Tokyo", "A late crew", "A security check"], 1,
          "“Due to bad weather in Tokyo, we expect a delay of about 40 minutes.”"),
        Q("What time will boarding start?", ["9:40 a.m.", "10:00 a.m.", "10:20 a.m.", "10:40 a.m."], 2,
          "“Passengers will begin to board at 10:20 a.m.”"),
        Q("Who will board first?", ["Passengers with small children", "Business class passengers", "Elderly passengers", "Passengers with connecting flights"], 0,
          "“Passengers traveling with small children will embark first.”"),
        Q("Where can passengers collect their luggage in Tokyo?", ["At the transfer desk", "At gate 7", "At the travel agency", "At belt number 7"], 3,
          "“claim your checked baggage at belt number 7.”"),
      ],
    },
    listen: {
      title: "At the check-in counter",
      lines: [
        ["W", "Good morning. May I see your passport and ticket, please?"],
        ["M", "Here you are. I'm flying to Bangkok."],
        ["W", "Thank you. I'm afraid your flight has a thirty-minute delay."],
        ["M", "Oh no. Will I still make my connection to Chiang Mai?"],
        ["W", "Let me check your itinerary. Yes, you'll have fifty minutes. That's enough time."],
        ["M", "That's a relief. Can I have an aisle seat, please?"],
      ],
      q: [
        Q("Where is the man flying first?", ["Bangkok", "Chiang Mai", "Tokyo", "Hanoi"], 0,
          "“I'm flying to Bangkok.”"),
        Q("What is the man worried about?", ["Losing his luggage", "Missing his connecting flight", "His passport", "The price of his ticket"], 1,
          "“Will I still make my connection to Chiang Mai?”"),
        Q("What does the man ask for at the end?", ["A window seat", "A meal", "An aisle seat", "A blanket"], 2,
          "“Can I have an aisle seat, please?”"),
      ],
    },
    speak: {
      q: ["Describe a trip you took recently. Where did you go and how did you travel?",
        "What can travelers do to make long flights more comfortable?"],
    },
    write: {
      s: [["delay", "Viết câu về một chuyến bay hoặc tàu bị hoãn."],
        ["itinerary", "Viết câu về lịch trình chuyến đi của bạn."],
        ["valid", "Viết câu nhắc mang giấy tờ còn hiệu lực."]],
      email: {
        task: "Viết email cho đại lý du lịch nhờ thay đổi lịch trình chuyến công tác vì cuộc họp bị dời ngày.",
        use: ["agency", "itinerary", "delay"],
        sample: "Dear Sunshine Travel Agency,\n\nI booked a business trip to Tokyo through your agency for May 12 to 15. Unfortunately, my client meeting has been moved, so I need to delay my trip by two days. Could you please change my itinerary to May 14 to 17 and tell me if there is any extra charge? My booking number is ST-4821.\n\nThank you for your help.\n\nBest regards,\nMinh Hoang",
      },
    },
  });

  add(37, {
    read: {
      type: "Advertisement", title: "Fly further with SkyBridge Airlines",
      text: `Are you a prospective traveler looking for an economical way to see Asia? SkyBridge Airlines now flies to 25 destinations, including Seoul, Bali, and Kathmandu.

This month, we are offering substantial discounts on all international flights. A return ticket from Hanoi to Seoul costs only $299, the equivalent of a one-way ticket on most other airlines. Fares are not expensive, but quality is high: every seat has extra legroom and a personal screen.

Members of our SkyMiles system can extend their trip with a free excursion at their destination, such as a day tour of Bali's temples.

What distinguishes SkyBridge from other low-cost airlines? Our customer service. If your flight is cancelled, our staff will deal with the situation quickly and book you on the next available flight at no cost.

Offer valid for bookings made before June 30.`,
      q: [
        Q("How many destinations does SkyBridge fly to?", ["15", "25", "30", "299"], 1,
          "“SkyBridge Airlines now flies to 25 destinations”."),
        Q("What does the ad say about the Hanoi–Seoul ticket?", ["It is one-way only", "It is for members only", "It costs the same as a one-way ticket elsewhere", "It includes a hotel"], 2,
          "“the equivalent of a one-way ticket on most other airlines.”"),
        Q("What can SkyMiles members get?", ["A free excursion", "A free upgrade", "Free meals", "A lower fare"], 0,
          "“can extend their trip with a free excursion at their destination”."),
        Q("What happens if a flight is cancelled?", ["Passengers get cash", "Passengers must pay a fee", "Passengers get a hotel room", "Staff book the next flight for free"], 3,
          "“book you on the next available flight at no cost.”"),
      ],
    },
    listen: {
      title: "Booking a flight",
      lines: [
        ["M", "I'd like to book a return flight to Singapore for next month."],
        ["W", "Certainly. Would you prefer a direct flight to your destination or one with a stop?"],
        ["M", "What's the difference in price?"],
        ["W", "The direct flight is two hundred dollars more expensive, but it saves you five hours."],
        ["M", "I'm traveling for a meeting, so time is important. I'll take the direct flight."],
        ["W", "Good choice. Shall I add travel insurance as well?"],
      ],
      q: [
        Q("Where does the man want to fly?", ["Singapore", "Seoul", "Bali", "Bangkok"], 0,
          "“a return flight to Singapore”."),
        Q("How much more does the direct flight cost?", ["Fifty dollars", "Two hundred dollars", "Five hundred dollars", "It costs the same"], 1,
          "“The direct flight is two hundred dollars more expensive”."),
        Q("Why does the man choose the direct flight?", ["It is cheaper", "It has better food", "He is traveling for a meeting", "He dislikes airports"], 2,
          "“I'm traveling for a meeting, so time is important.”"),
      ],
    },
    speak: {
      q: ["Which destination would you most like to visit? Why?",
        "Do you prefer low-cost airlines or full-service airlines? Explain your choice."],
    },
    write: {
      s: [["destination", "Viết câu về điểm đến du lịch yêu thích của bạn."],
        ["economical", "Viết câu về một cách đi du lịch tiết kiệm."],
        ["extend", "Viết câu về việc kéo dài chuyến đi hoặc hạn chót."]],
      email: {
        task: "Chuyến bay của bạn bị huỷ. Viết email cho hãng hàng không yêu cầu đổi sang chuyến khác và hỏi về bồi thường.",
        use: ["situation", "destination", "deal with"],
        sample: "Dear SkyBridge Airlines,\n\nMy flight SB 302 from Hanoi to Seoul on June 5 was cancelled this morning. I need to reach my destination by June 6 for an important meeting. Could you please book me on the next available flight? I would also like to know if you offer compensation in this situation. Thank you for helping me deal with this problem quickly.\n\nSincerely,\nThao Nguyen",
      },
    },
  });

  add(38, {
    read: {
      type: "Information leaflet", title: "Traveling with North Coast Rail",
      text: `North Coast Rail operates daily trains between Hanoi and Hue. The duration of the journey is about 13 hours.

Our trains are known for being punctual: last year, 94% arrived on time. Passengers can choose between standard seats, sleeping cabins, and deluxe cabins with a private bathroom. Deluxe tickets are relatively expensive, but they include dinner and breakfast.

Children under 6 travel free. Students with a valid ID card are entitled to a 20% discount on all fares. To offset rising fuel costs, a small surcharge will be added to tickets from July 1.

Some stations on the route are in remote mountain areas, and the remainder of the journey follows the coast. For a full list of stops, see the station directory on our website. We also offer a comprehensive travel guide to the region, available free on board.`,
      q: [
        Q("How long is the journey from Hanoi to Hue?", ["About 6 hours", "About 13 hours", "About 20 hours", "About 94 hours"], 1,
          "“The duration of the journey is about 13 hours.”"),
        Q("What is included in a deluxe ticket?", ["A free return ticket", "Free Wi-Fi", "Dinner and breakfast", "A city tour"], 2,
          "“they include dinner and breakfast.”"),
        Q("Who can get a 20% discount?", ["Students with valid ID", "Children under 6", "Elderly passengers", "Frequent travelers"], 0,
          "“Students with a valid ID card are entitled to a 20% discount”."),
        Q("Why will a surcharge be added?", ["To pay for new trains", "To reduce crowding", "To improve service", "To cover rising fuel costs"], 3,
          "“To offset rising fuel costs, a small surcharge will be added”."),
      ],
    },
    listen: {
      title: "Buying a train ticket",
      lines: [
        ["W", "I'd like a ticket to Hue on the overnight train, please."],
        ["M", "Standard seat or sleeping cabin?"],
        ["W", "A sleeping cabin. How much is the fare?"],
        ["M", "It's nine hundred thousand dong. Are you a student? Students are entitled to a discount."],
        ["W", "Yes, here's my student card."],
        ["M", "Then it's seven hundred twenty thousand. The train leaves at seven p.m. from platform two."],
      ],
      q: [
        Q("What kind of ticket does the woman buy?", ["A sleeping cabin", "A standard seat", "A deluxe cabin", "A return ticket"], 0,
          "“A sleeping cabin.”"),
        Q("Why does the woman get a discount?", ["She bought early", "She is a student", "She is traveling at night", "She is a frequent traveler"], 1,
          "“Students are entitled to a discount.” — cô đưa thẻ sinh viên."),
        Q("Where does the train leave from?", ["Platform seven", "Platform one", "Platform two", "Platform nine"], 2,
          "“from platform two.”"),
      ],
    },
    speak: {
      q: ["Describe a train or bus journey you remember well.",
        "What are the advantages of traveling by train instead of by plane?"],
    },
    write: {
      s: [["fare", "Viết câu về giá vé xe buýt hoặc tàu ở nơi bạn sống."],
        ["punctual", "Viết câu về một người hoặc phương tiện luôn đúng giờ."],
        ["duration", "Viết câu về thời lượng của một chuyến đi hoặc khoá học."]],
      email: {
        task: "Viết email cho công ty đường sắt hỏi về vé tàu đêm cho một nhóm 5 người, giá vé và giảm giá cho sinh viên.",
        use: ["fare", "entitle", "deluxe"],
        sample: "Dear North Coast Rail,\n\nI am planning a trip from Hanoi to Hue for five people on August 3. We would like to take the overnight train. Could you tell me the fare for a standard sleeping cabin and for a deluxe cabin? Three people in our group are university students. Are they entitled to a discount if they show their student cards?\n\nThank you in advance.\n\nBest regards,\nLy",
      },
    },
  });

  add(39, {
    read: {
      type: "E-mail", title: "Your reservation at the Seaview Hotel",
      text: `Dear Mr. Tanaka,

Thank you for choosing the Seaview Hotel, part of the Ocean Stay hotel chain. We are pleased to confirm your reservation for a double room from July 10 to 13.

As quoted on our website, the rate is $120 per night, including breakfast. Because you booked more than 30 days in advance, you will also receive a free airport transfer.

You can check in from 2 p.m. on the day of arrival. If you expect to arrive late, please notify us so that we can hold your room. Our reception desk offers 24-hour service.

Please note that our housekeepers clean rooms between 9 a.m. and 1 p.m. If you do not wish to be disturbed, simply hang the sign on your door.

Our cancellation policy does not preclude changes: you may cancel free of charge up to 48 hours before arrival.

We look forward to welcoming you.

Kind regards,
Mai Le, Reservations Manager`,
      q: [
        Q("What is the purpose of the e-mail?", ["To advertise a new hotel", "To confirm a reservation", "To apologize for a problem", "To ask for payment"], 1,
          "“We are pleased to confirm your reservation”."),
        Q("Why will Mr. Tanaka receive a free airport transfer?", ["He is a member", "He is staying a week", "He booked more than 30 days ahead", "He paid in cash"], 2,
          "“Because you booked more than 30 days in advance”."),
        Q("What should Mr. Tanaka do if he will arrive late?", ["Inform the hotel", "Pay an extra fee", "Book another night", "Call the airport"], 0,
          "“If you expect to arrive late, please notify us”."),
        Q("When can guests cancel free of charge?", ["Any time", "Until the day of arrival", "Up to one week before", "Up to 48 hours before arrival"], 3,
          "“cancel free of charge up to 48 hours before arrival.”"),
      ],
    },
    listen: {
      title: "Checking in",
      lines: [
        ["M", "Good evening. I reserved a room under the name Rossi."],
        ["W", "Welcome, Mr. Rossi. Yes, a single room for three nights. May I see your passport?"],
        ["M", "Here you are. Is breakfast included in the rate?"],
        ["W", "Yes, it's served from six thirty to ten in the restaurant on the first floor."],
        ["M", "Great. Could I also get a wake-up call at six tomorrow?"],
        ["W", "Of course. Here's your key card. Your room is 512."],
      ],
      q: [
        Q("How many nights will Mr. Rossi stay?", ["Three", "One", "Five", "Two"], 0,
          "“a single room for three nights.”"),
        Q("Where is breakfast served?", ["In the room", "In the restaurant on the first floor", "In the lobby", "On the fifth floor"], 1,
          "“in the restaurant on the first floor.”"),
        Q("What does Mr. Rossi ask for?", ["A bigger room", "A taxi", "A wake-up call", "A late checkout"], 2,
          "“Could I also get a wake-up call at six tomorrow?”"),
      ],
    },
    speak: {
      q: ["Describe a hotel you stayed in. What did you like or dislike about it?",
        "What services are most important to you when you choose a hotel?"],
    },
    write: {
      s: [["reserve", "Viết câu về việc đặt trước phòng hoặc bàn."],
        ["confirm", "Viết câu xác nhận một cuộc hẹn."],
        ["notify", "Viết câu yêu cầu thông báo khi có thay đổi."]],
      email: {
        task: "Viết email cho khách sạn để đặt phòng: ngày đến, số đêm, loại phòng và hỏi giá có bao gồm bữa sáng không.",
        use: ["reserve", "rate", "confirm"],
        sample: "Dear Seaview Hotel,\n\nI would like to reserve a double room for two nights, from September 5 to 7. My wife and I will arrive in the evening at around 9 p.m. Could you tell me the rate per night and whether breakfast is included? Please confirm the booking by e-mail when it is ready.\n\nThank you very much.\n\nBest regards,\nHiroshi Tanaka",
      },
    },
  });

  add(40, {
    read: {
      type: "Information page", title: "Renting a car with DriveEasy",
      text: `Thank you for choosing DriveEasy. Please read the following information before you collect your car.

To rent a car, you must be at least 21 years old and hold a valid driver's license. International customers should also bring an international driving permit.

We offer three price tiers: Economy, Comfort, and Premium. You may be tempted by the Premium tier's sports cars, but many first-time visitors find them difficult to drive in busy city traffic. If you intend to drive mainly in the city, we recommend the Economy tier.

Insurance is optional but strongly recommended. Many customers have been disappointed to learn that their credit card insurance does not cover rental cars abroad.

If your arrival coincides with a public holiday, please book early, as demand is high. In case of any confusion about your booking, contact our 24-hour help line.`,
      q: [
        Q("What must all renters have?", ["A credit card from DriveEasy", "A valid driver's license", "Their own insurance", "A sports car license"], 1,
          "“hold a valid driver's license.”"),
        Q("Which tier is recommended for city driving?", ["Premium", "Comfort", "Economy", "All tiers"], 2,
          "“If you intend to drive mainly in the city, we recommend the Economy tier.”"),
        Q("What does the page say about insurance?", ["It is optional but recommended", "It is included in the price", "It is required by law", "It is only for Premium cars"], 0,
          "“Insurance is optional but strongly recommended.”"),
        Q("Why should customers book early for public holidays?", ["Prices are lower", "Offices are closed", "Cars are newer", "Demand is high"], 3,
          "“please book early, as demand is high.”"),
      ],
    },
    listen: {
      title: "Picking up a rental car",
      lines: [
        ["W", "Hi, I booked a car online. My name is Clara Diaz."],
        ["M", "Yes, Ms. Diaz. A compact car for five days. May I see your license?"],
        ["W", "Here you are. Is insurance included?"],
        ["M", "Basic insurance is included. Full coverage is optional — it's ten dollars more per day."],
        ["W", "I'll take full coverage. I'm a bit nervous about driving in a new city."],
        ["M", "No problem. The car is in space fourteen. Here are the keys."],
      ],
      q: [
        Q("How long will the woman rent the car?", ["Five days", "One week", "Ten days", "Fourteen days"], 0,
          "“A compact car for five days.”"),
        Q("How much does full coverage cost?", ["Five dollars a day", "Ten dollars more per day", "Fourteen dollars a day", "It is free"], 1,
          "“it's ten dollars more per day.”"),
        Q("Why does the woman choose full coverage?", ["It is required", "Her friend recommended it", "She is nervous about driving in a new city", "It is on sale"], 2,
          "“I'm a bit nervous about driving in a new city.”"),
      ],
    },
    speak: {
      q: ["Would you rent a car when you travel to a new country? Why or why not?",
        "Describe the traffic in your city. What is the best way to get around?"],
    },
    write: {
      s: [["license", "Viết câu về giấy phép lái xe hoặc giấy phép kinh doanh."],
        ["optional", "Viết câu về một lựa chọn không bắt buộc."],
        ["intend", "Viết câu về dự định của bạn tháng tới."]],
      email: {
        task: "Viết email cho công ty cho thuê xe đặt một chiếc xe cho chuyến du lịch, hỏi về bảo hiểm và giấy tờ cần mang.",
        use: ["license", "optional", "intend"],
        sample: "Dear DriveEasy,\n\nI intend to rent a small car from October 3 to 7 to travel around Da Lat with my family. I will pick up the car at Lien Khuong Airport at 10 a.m. Could you tell me which documents I need besides my driver's license? I would also like to know how much the optional full insurance costs.\n\nThank you for your help.\n\nBest regards,\nClara Diaz",
      },
    },
  });
})();
