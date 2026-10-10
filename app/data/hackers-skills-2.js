/* Nội dung luyện 4 kỹ năng cho Hackers TOEIC Vocabulary — Day 11–20. Nội dung viết mới. */
(function () {
  const Q = (q, o, a, why) => ({ q, o, a, why });
  const add = (id, data) => EWF.addSkills("hackers", id, data);

  add(11, {
    read: {
      type: "Press release", title: "NovaTech unveils solar phone charger",
      text: `NovaTech today announced a revolutionary solar charger that can fully charge a smartphone in two hours of sunlight. The device was developed after three years of research at the company's laboratory in Da Nang.

"Our engineers wanted to devise a product that is reliable, lightweight, and compatible with every major phone brand," said product manager Lisa Tran. The company has already applied for a patent on the design.

The charger includes several innovative features, such as a built-in light and a waterproof case. Customers will also receive free software updates that improve charging efficiency.

Initial response from testers has been very positive. NovaTech intends to make the charger available in domestic stores in October and to extend sales to other Asian markets early next year. A detailed user manual can be downloaded from the company's website.`,
      q: [
        Q("What is the press release about?", ["A new smartphone", "A solar charger", "A research grant", "A software company"], 1,
          "NovaTech giới thiệu bộ sạc năng lượng mặt trời."),
        Q("What does Ms. Tran say the engineers wanted?", ["A cheaper phone", "A product that works with all major brands", "A larger battery", "A new app"], 1,
          "“compatible with every major phone brand”."),
        Q("What will customers receive for free?", ["A phone case", "Software updates", "A second charger", "Repairs for life"], 1,
          "“Customers will also receive free software updates”."),
        Q("When will the charger go on sale in domestic stores?", ["Early next year", "Next week", "In three years", "In October"], 3,
          "“available in domestic stores in October”."),
      ],
    },
    listen: {
      title: "Testing a prototype",
      lines: [
        ["W", "How did the latest tests on the charger go?"],
        ["M", "Much better. We improved the battery, and it now charges a phone in two hours."],
        ["W", "That's impressive. Is it compatible with older phones?"],
        ["M", "Most of them. We're still checking a few models."],
        ["W", "Please send me a report by Thursday. The director wants to see it before the launch."],
        ["M", "No problem. I'll include the test results and photos."],
      ],
      q: [
        Q("What has the man improved?", ["The battery", "The price", "The color", "The software"], 0,
          "“We improved the battery”."),
        Q("What is the team still checking?", ["The price of parts", "A few older phone models", "The launch date", "Customer reviews"], 1,
          "“We're still checking a few models.”"),
        Q("What does the woman ask for?", ["A meeting", "A sample", "A report", "A budget"], 2,
          "“Please send me a report by Thursday.”"),
      ],
    },
    speak: {
      q: ["Describe a piece of technology that has improved your daily life.",
        "What new product would you like a company to invent? Why?"],
    },
    write: {
      s: [["innovative", "Viết câu mô tả một sản phẩm sáng tạo."],
        ["improve", "Viết câu về việc cải thiện chất lượng sản phẩm."],
        ["reliable", "Viết câu về một thương hiệu đáng tin cậy."]],
      email: {
        task: "Bạn là trưởng nhóm phát triển sản phẩm. Viết email báo cáo tiến độ thử nghiệm một sản phẩm mới cho giám đốc.",
        use: ["research", "feature", "launch"],
        sample: "Dear Ms. Tran,\n\nI am writing to update you on our solar charger project. After months of research, the latest tests were successful: the charger now fills a phone battery in two hours. We have also added a new feature, a built-in light. We are still testing a few older phone models. If everything goes well, we can launch the product in October.\n\nBest regards,\nMinh",
      },
    },
  });

  add(12, {
    read: {
      type: "Memo", title: "Factory upgrades",
      text: `To: All production staff
From: Plant Manager

As part of our plan to increase efficiency, the packing line will be automated next month. The new equipment can operate 24 hours a day and has twice the capacity of our current machines.

Before using the machines, every worker must complete safety training. Please follow all precautions and wear protective gloves when handling chemicals or sharp components.

During installation, the east wing will be renovated, and part of production will move temporarily to Building C. Orders will still be filled on time, as the new machines are capable of handling extra work.

Managers attribute last year's success to your hard work. We believe these upgrades will help us economize on energy and produce higher-quality products. Thank you for your flexibility during this period.`,
      q: [
        Q("What will happen next month?", ["The factory will close", "The packing line will be automated", "New staff will be hired", "Prices will rise"], 1,
          "“the packing line will be automated next month.”"),
        Q("What must workers do before using the machines?", ["Complete safety training", "Sign a contract", "Move to Building C", "Clean the equipment"], 0,
          "“every worker must complete safety training.”"),
        Q("Where will part of production move?", ["The east wing", "Another city", "Building C", "The warehouse"], 2,
          "“part of production will move temporarily to Building C.”"),
        Q("What do managers say about last year's success?", ["It was due to new machines", "It was lower than expected", "It came from one large order", "It was due to the staff's hard work"], 3,
          "“Managers attribute last year's success to your hard work.”"),
      ],
    },
    listen: {
      title: "A machine problem",
      lines: [
        ["M", "Linda, machine number three stopped again this morning."],
        ["W", "Again? Did you check the power supply?"],
        ["M", "Yes, it's fine. I think one of the components is damaged."],
        ["W", "Okay. Stop the machine and call the technician."],
        ["M", "What about today's orders?"],
        ["W", "We'll use machine four. It has enough capacity to fill them."],
      ],
      q: [
        Q("What is the problem?", ["A machine stopped working", "An order was lost", "The power is off", "A worker is sick"], 0,
          "“machine number three stopped again”."),
        Q("What does the man think caused the problem?", ["A power cut", "A damaged component", "A software bug", "Too many orders"], 1,
          "“one of the components is damaged.”"),
        Q("How will today's orders be filled?", ["By hand", "They will be delayed", "With machine four", "By another factory"], 2,
          "“We'll use machine four.”"),
      ],
    },
    speak: {
      q: ["Do you think machines will replace many factory workers in the future? Why?",
        "Describe something that is produced in your city or country."],
    },
    write: {
      s: [["equipment", "Viết câu về thiết bị mới trong văn phòng hoặc nhà máy."],
        ["safety", "Viết câu nhắc nhở về an toàn lao động."],
        ["capacity", "Viết câu về công suất của một nhà máy."]],
      email: {
        task: "Bạn là quản lý nhà máy. Viết email thông báo cho công nhân về việc lắp máy mới và yêu cầu tham gia khóa an toàn.",
        use: ["equipment", "safety", "operate"],
        sample: "Dear production staff,\n\nNew packing equipment will be installed in the east wing next week. Before you operate the new machines, you must attend a two-hour safety training session on Monday or Tuesday afternoon. Please sign up with your team leader by Friday. Thank you for helping us keep our factory safe and efficient.\n\nBest regards,\nPlant Manager",
      },
    },
  });

  add(13, {
    read: {
      type: "Letter", title: "Response to a customer complaint",
      text: `Dear Mr. Patel,

Thank you for your letter of May 3. We sincerely apologize for the inconvenience you experienced with your new coffee machine.

According to your complaint, the machine stopped working after only one week. Products that are defective within the first year can be returned or replaced at no cost. We have arranged for a courier to pick up the machine and deliver a replacement on May 10.

We also take seriously your comment that our customer service agent was not courteous on the phone. Customer satisfaction is our top priority, and we have reviewed the call with our staff to ensure they respond appropriately in the future.

As a sign of our commitment, please accept the enclosed voucher for 20% off your next purchase.

Sincerely,
Anna Le
Customer Relations Manager`,
      q: [
        Q("Why did Ms. Le write the letter?", ["To advertise a new product", "To respond to a complaint", "To request payment", "To announce a price change"], 1,
          "Thư trả lời lời phàn nàn của ông Patel."),
        Q("What happened to Mr. Patel's machine?", ["It arrived late", "It stopped working after a week", "It was the wrong model", "It was too expensive"], 1,
          "“the machine stopped working after only one week.”"),
        Q("What will happen on May 10?", ["A replacement will be delivered", "Mr. Patel will get a refund", "A technician will visit", "Mr. Patel will call the store"], 0,
          "“deliver a replacement on May 10.”"),
        Q("What is enclosed with the letter?", ["A receipt", "A new manual", "A contract", "A discount voucher"], 3,
          "“the enclosed voucher for 20% off your next purchase.”"),
      ],
    },
    listen: {
      title: "A complaint call",
      lines: [
        ["W", "Customer service, this is Hana speaking. How can I help you?"],
        ["M", "Hi. I ordered a desk lamp, but it arrived with a broken switch."],
        ["W", "I'm very sorry about that. Could you give me your order number?"],
        ["M", "Yes, it's 4-5-2-1."],
        ["W", "Thank you. I'll send you a replacement today, and you can return the defective one for free."],
        ["M", "That would be great. Thanks for dealing with this so quickly."],
      ],
      q: [
        Q("What is the man's problem?", ["His lamp arrived broken", "His order is late", "He was charged twice", "He received the wrong color"], 0,
          "“it arrived with a broken switch.”"),
        Q("What does the woman ask for?", ["His address", "His order number", "A photo", "His receipt"], 1,
          "“Could you give me your order number?”"),
        Q("What will the woman do?", ["Give a refund", "Send a technician", "Send a replacement today", "Call the manager"], 2,
          "“I'll send you a replacement today”."),
      ],
    },
    speak: {
      q: ["Describe a time you received excellent or poor customer service.",
        "What is the best way for a company to handle an angry customer?"],
    },
    write: {
      s: [["complaint", "Viết câu về một lời phàn nàn của khách hàng."],
        ["apologize", "Viết câu xin lỗi vì sự chậm trễ."],
        ["satisfaction", "Viết câu về sự hài lòng của khách hàng."]],
      email: {
        task: "Bạn là nhân viên chăm sóc khách hàng. Viết email xin lỗi khách vì giao sai hàng và nêu cách khắc phục.",
        use: ["apologize", "inconvenience", "replace"],
        sample: "Dear Ms. Kim,\n\nThank you for contacting us. We apologize for sending you the wrong size of shoes, and we are sorry for any inconvenience this has caused. We will replace them with the correct size free of charge. A courier will collect the wrong pair and deliver the new one on Thursday.\n\nWe hope you enjoy your new shoes.\n\nSincerely,\nCustomer Service Team",
      },
    },
  });

  add(14, {
    read: {
      type: "Travel brochure", title: "Discover Phu Quoc with Island Tours",
      text: `Looking for an exotic destination? Island Tours offers a diverse range of trips to Phu Quoc, an island famous for its superb beaches and warm hospitality.

Our five-day itinerary includes a boat tour of the southern islands, a visit to a pepper farm, and a sunset dinner on the beach. All hotels are located within walking distance of the sea, and every room has comfortable seating and an ocean view.

International passengers can fly directly to Phu Quoc from Singapore, Bangkok, and Seoul. Our staff will meet you at the airport and help with your baggage.

Please note: if you bring goods worth more than $500, you may need to declare them at customs.

Book before July 31 and receive unlimited access to our spa.`,
      q: [
        Q("What is Phu Quoc famous for?", ["Its mountains", "Its beaches and hospitality", "Its shopping malls", "Its museums"], 1,
          "“famous for its superb beaches and warm hospitality.”"),
        Q("What is included in the itinerary?", ["A cooking class", "A visit to a pepper farm", "A city bus tour", "A golf lesson"], 1,
          "“a visit to a pepper farm”."),
        Q("What will staff do at the airport?", ["Check passports", "Sell tickets", "Help with baggage", "Change money"], 2,
          "“Our staff will meet you at the airport and help with your baggage.”"),
        Q("What do customers get if they book before July 31?", ["A free flight", "A room upgrade", "A free dinner", "Unlimited spa access"], 3,
          "“receive unlimited access to our spa.”"),
      ],
    },
    listen: {
      title: "At the airport",
      lines: [
        ["W", "Excuse me, my suitcase didn't come out on the baggage belt."],
        ["M", "I'm sorry. Which flight were you on?"],
        ["W", "Flight VN 207 from Seoul."],
        ["M", "Please fill out this form with your hotel address. We'll locate your bag and deliver it to you."],
        ["W", "How long will that take?"],
        ["M", "Usually within twenty-four hours."],
      ],
      q: [
        Q("What is the woman's problem?", ["Her suitcase is missing", "She missed her flight", "Her ticket is wrong", "She lost her passport"], 0,
          "“my suitcase didn't come out on the baggage belt.”"),
        Q("What does the man ask her to do?", ["Wait at the gate", "Fill out a form", "Call the hotel", "Buy a new bag"], 1,
          "“Please fill out this form with your hotel address.”"),
        Q("How long does it usually take to deliver a bag?", ["One hour", "Three days", "Within 24 hours", "One week"], 2,
          "“Usually within twenty-four hours.”"),
      ],
    },
    speak: {
      q: ["Describe your favorite travel destination and what makes it special.",
        "What can travelers do to avoid problems at the airport?"],
    },
    write: {
      s: [["destination", "Viết câu về điểm đến bạn muốn du lịch."],
        ["itinerary", "Viết câu về lịch trình của chuyến đi."],
        ["depart", "Viết câu về giờ khởi hành của chuyến bay."]],
      email: {
        task: "Viết email cho công ty du lịch hỏi về tour 5 ngày ở Phú Quốc cho 2 người: giá, khách sạn và ngày khởi hành.",
        use: ["itinerary", "destination", "depart"],
        sample: "Dear Island Tours,\n\nMy wife and I are interested in your five-day trip to Phu Quoc. It looks like a wonderful destination. Could you send us the full itinerary and the price for two people? We would like to depart from Hanoi in mid-August. I would also like to know whether breakfast is included at the hotel.\n\nThank you in advance.\n\nBest regards,\nHung Pham",
      },
    },
  });

  add(15, {
    read: {
      type: "E-mail", title: "Contract renewal",
      text: `To: Mark Evans, Sunrise Catering
From: Julia Park, Office Manager
Subject: Renewal of our catering contract

Dear Mr. Evans,

Our current contract with Sunrise Catering expires on June 30. We have been very satisfied with your service and would like to renew the agreement for another two years.

After reviewing your proposal, we would like to modify two terms. First, we would like lunch to be delivered at 11:30 instead of noon. Second, we request that the price remain the same for the first year. In return, we would agree to a longer term than originally planned.

I believe both parties can reach a compromise quickly. Please let me know if these changes are acceptable, and I will send the revised contract for your signature.

Best regards,
Julia Park`,
      q: [
        Q("What is the purpose of the e-mail?", ["To cancel a contract", "To renew a contract with some changes", "To complain about food", "To order a party menu"], 1,
          "Muốn gia hạn hợp đồng và sửa hai điều khoản."),
        Q("When does the current contract end?", ["June 30", "Next year", "In two years", "At noon"], 0,
          "“Our current contract... expires on June 30.”"),
        Q("What change does Ms. Park request?", ["A cheaper menu", "Earlier lunch delivery", "Fewer meals", "A new chef"], 1,
          "“lunch to be delivered at 11:30 instead of noon.”"),
        Q("What does Ms. Park offer in return?", ["A higher price", "A cash payment", "A larger office", "A longer contract term"], 3,
          "“we would agree to a longer term than originally planned.”"),
      ],
    },
    listen: {
      title: "Negotiating terms",
      lines: [
        ["M", "Hi Julia. I read your e-mail about the contract."],
        ["W", "Great. Are the changes acceptable?"],
        ["M", "We can deliver at 11:30, no problem. But keeping the same price is difficult."],
        ["W", "What if we sign for three years instead of two?"],
        ["M", "In that case, we can keep the price for the first year."],
        ["W", "Perfect. I'll send you the revised contract tomorrow."],
      ],
      q: [
        Q("What does the man agree to?", ["Delivering at 11:30", "Lowering the price", "Adding new dishes", "Ending the contract"], 0,
          "“We can deliver at 11:30, no problem.”"),
        Q("What does the woman suggest?", ["Canceling the deal", "A three-year contract", "Paying in advance", "Finding a new caterer"], 1,
          "“What if we sign for three years instead of two?”"),
        Q("What will the woman do tomorrow?", ["Visit the man", "Make a payment", "Send the revised contract", "Taste the food"], 2,
          "“I'll send you the revised contract tomorrow.”"),
      ],
    },
    speak: {
      q: ["What should people check before signing a contract?",
        "Describe a time you had to negotiate or reach a compromise."],
    },
    write: {
      s: [["contract", "Viết câu về việc ký hợp đồng với đối tác."],
        ["negotiation", "Viết câu về một cuộc đàm phán."],
        ["renew", "Viết câu về việc gia hạn hợp đồng hoặc thẻ."]],
      email: {
        task: "Viết email cho nhà cung cấp đề nghị gia hạn hợp đồng và đề xuất thay đổi một điều khoản.",
        use: ["renew", "term", "agreement"],
        sample: "Dear Mr. Evans,\n\nOur agreement with your company ends next month, and we would like to renew it for two more years. However, we would like to change one term: we need deliveries on Saturday mornings as well. Please let me know if this is possible and whether it would affect the price.\n\nI look forward to your reply.\n\nBest regards,\nJulia Park",
      },
    },
  });

  add(16, {
    read: {
      type: "Notice", title: "Bulk order discounts",
      text: `OfficeHub is pleased to offer special prices to commercial customers.

Businesses that order paper, ink, or office furniture in bulk will receive a discount of up to 15%. To place an order, contact your sales representative or use our online catalog. All orders are subject to availability.

Please note that some items are temporarily out of stock due to high demand. Our inventory is updated daily, and we will notify you if we are unable to supply any item.

Payment is due within 30 days of the invoice date. Customers will receive written confirmation for every order, and we assure you that all goods are delivered within three business days.

We look forward to serving you and providing the best selection at affordable prices.`,
      q: [
        Q("Who is the notice for?", ["Students", "Commercial customers", "New employees", "Delivery drivers"], 1,
          "“special prices to commercial customers.”"),
        Q("How much can businesses save on bulk orders?", ["Up to 5%", "Up to 15%", "Up to 30%", "Up to 50%"], 1,
          "“a discount of up to 15%.”"),
        Q("Why are some items unavailable?", ["High demand", "A factory problem", "Bad weather", "A price change"], 0,
          "“temporarily out of stock due to high demand.”"),
        Q("When must payment be made?", ["On delivery", "Before ordering", "Within three days", "Within 30 days of the invoice"], 3,
          "“Payment is due within 30 days of the invoice date.”"),
      ],
    },
    listen: {
      title: "Placing an order",
      lines: [
        ["W", "Hello, I'd like to order 50 boxes of printer paper for our office."],
        ["M", "Certainly. Since it's a bulk order, you'll get a ten percent discount."],
        ["W", "Great. When can you deliver it?"],
        ["M", "We're short on stock right now, so it will arrive next Tuesday."],
        ["W", "That's fine. Please send the invoice to our accounting department."],
        ["M", "Of course. You'll receive a confirmation e-mail shortly."],
      ],
      q: [
        Q("What does the woman want to order?", ["Printer paper", "Office chairs", "Ink cartridges", "Computers"], 0,
          "“50 boxes of printer paper”."),
        Q("Why will delivery take until Tuesday?", ["The office is closed", "Stock is low", "The truck is broken", "It is a holiday"], 1,
          "“We're short on stock right now”."),
        Q("Where should the invoice be sent?", ["To the woman", "To the manager", "To the accounting department", "To the warehouse"], 2,
          "“send the invoice to our accounting department.”"),
      ],
    },
    speak: {
      q: ["What do you think is more important when choosing a supplier: price or reliability? Why?",
        "Describe something you bought at a good discount."],
    },
    write: {
      s: [["discount", "Viết câu về một chương trình giảm giá."],
        ["invoice", "Viết câu yêu cầu gửi hóa đơn."],
        ["supply", "Viết câu về việc cung cấp hàng hóa."]],
      email: {
        task: "Viết email đặt mua văn phòng phẩm số lượng lớn, hỏi về mức giảm giá và ngày giao hàng.",
        use: ["order", "bulk", "invoice"],
        sample: "Dear OfficeHub,\n\nI would like to place an order for 100 boxes of A4 paper and 40 ink cartridges for our company. Since this is a bulk order, could you tell me what discount we will receive? We need the items by June 10. Please send the invoice to our accounting department at the address below.\n\nThank you.\n\nBest regards,\nNam Do",
      },
    },
  });

  add(17, {
    read: {
      type: "Information page", title: "Shipping with QuickPost",
      text: `QuickPost delivers packages to more than 100 countries. Please read the following guidelines to ensure your shipment arrives safely.

Fragile items must be wrapped adequately and placed in a strong carton. Write "FRAGILE" clearly on the outside of the box. Perishable goods, such as fresh fruit, can only be sent by express service.

Attach the address label firmly to the top of the package, and enclose a copy of the invoice for international shipments. An incorrect address may delay delivery.

Once your package arrives at our warehouse, you will receive a tracking number by e-mail. The recipient will be asked to sign when the package is delivered.

For your convenience, packages can also be picked up at any of our 50 storage centers. Please handle all correspondence through our website.`,
      q: [
        Q("What should be written on boxes with fragile items?", ["The sender's phone number", "FRAGILE", "EXPRESS", "The weight"], 1,
          "“Write \"FRAGILE\" clearly on the outside of the box.”"),
        Q("How can perishable goods be sent?", ["By express service only", "By regular mail", "By sea", "They cannot be sent"], 0,
          "“Perishable goods... can only be sent by express service.”"),
        Q("When will customers receive a tracking number?", ["When they pay", "When the package arrives at the warehouse", "When it is delivered", "Within a week"], 1,
          "“Once your package arrives at our warehouse, you will receive a tracking number”."),
        Q("What must the recipient do?", ["Pay a fee", "Show a passport", "Visit a storage center", "Sign for the package"], 3,
          "“The recipient will be asked to sign”."),
      ],
    },
    listen: {
      title: "Sending a package",
      lines: [
        ["M", "Hi, I'd like to send this box to Tokyo. It contains glass cups."],
        ["W", "Then it's fragile. Is it wrapped carefully inside?"],
        ["M", "Yes, I used plenty of bubble wrap."],
        ["W", "Good. Express service takes two days, and regular takes about a week."],
        ["M", "Express, please. It's a birthday gift."],
        ["W", "All right. Please attach this label and write the recipient's phone number."],
      ],
      q: [
        Q("What is in the box?", ["Glass cups", "Books", "Clothes", "Food"], 0,
          "“It contains glass cups.”"),
        Q("Why does the man choose express service?", ["It is cheaper", "It is a birthday gift", "The box is heavy", "Regular service is closed"], 1,
          "“It's a birthday gift.”"),
        Q("What does the woman ask him to write?", ["His own address", "The recipient's phone number", "The box's weight", "A message"], 1,
          "“write the recipient's phone number.”"),
      ],
    },
    speak: {
      q: ["Describe the last package you sent or received.",
        "Why is online shopping creating more work for delivery companies?"],
    },
    write: {
      s: [["fragile", "Viết câu nhắc cẩn thận với hàng dễ vỡ."],
        ["deliver", "Viết câu về thời gian giao hàng."],
        ["recipient", "Viết câu yêu cầu ghi đúng thông tin người nhận."]],
      email: {
        task: "Bạn gửi một kiện hàng nhưng đã 10 ngày chưa đến. Viết email cho công ty vận chuyển hỏi về tình trạng kiện hàng.",
        use: ["package", "deliver", "shipment"],
        sample: "Dear QuickPost,\n\nOn May 5, I sent a package to Tokyo using your express service. The tracking number is QP-77812. The shipment was supposed to arrive within two days, but the recipient has still not received it after ten days. Could you please check where the package is and tell me when you will deliver it?\n\nThank you for your help.\n\nBest regards,\nLinh Vo",
      },
    },
  });

  add(18, {
    read: {
      type: "Hotel information", title: "Welcome to the Lotus Hotel",
      text: `Welcome to the Lotus Hotel. We hope you enjoy your stay.

Guests may check in from 2 p.m. If you arrive early, our reception staff will be happy to store your luggage. A complimentary breakfast is served daily from 6:30 to 10 a.m. in the main restaurant, where our chef prepares local dishes in a variety of flavors.

The hotel can accommodate up to 250 guests and has three meeting rooms available for business functions. Our elegant ballroom is ideal for weddings and receptions.

If any part of your stay does not meet your expectations, please let us know. We will do our best to fix the problem, and in some cases we may compensate you with a discount on your next visit.

Please do not leave food containers in the hallways. Room service is available 24 hours a day.`,
      q: [
        Q("What time can guests check in?", ["From 10 a.m.", "From noon", "From 2 p.m.", "Anytime"], 2,
          "“Guests may check in from 2 p.m.”"),
        Q("What is offered for free?", ["Breakfast", "Room service", "Meeting rooms", "Airport transfer"], 0,
          "“A complimentary breakfast is served daily”."),
        Q("What is the ballroom suitable for?", ["Sports", "Weddings and receptions", "Storage", "Conferences only"], 1,
          "“ideal for weddings and receptions.”"),
        Q("What might the hotel do if guests are unhappy?", ["Move them to another hotel", "Charge them less now", "Call the manager", "Give a discount on the next visit"], 3,
          "“compensate you with a discount on your next visit.”"),
      ],
    },
    listen: {
      title: "Checking in early",
      lines: [
        ["W", "Good morning. I have a reservation, but I know it's only ten o'clock."],
        ["M", "Welcome. Your room isn't available yet, but check-in starts at two."],
        ["W", "Could I leave my bags here?"],
        ["M", "Of course. And breakfast is still being served if you'd like some."],
        ["W", "That sounds great. Is it included?"],
        ["M", "Yes, breakfast is complimentary for all guests."],
      ],
      q: [
        Q("Why can't the woman go to her room?", ["It is not available yet", "She has no reservation", "It is being cleaned all day", "She lost her key"], 0,
          "“Your room isn't available yet”."),
        Q("What does the woman ask to do?", ["Change rooms", "Leave her bags", "Cancel her booking", "Pay in advance"], 1,
          "“Could I leave my bags here?”"),
        Q("What does the man say about breakfast?", ["It costs extra", "It has finished", "It is free for guests", "It is served in the room"], 2,
          "“breakfast is complimentary for all guests.”"),
      ],
    },
    speak: {
      q: ["Describe a hotel or restaurant where you had a great experience.",
        "What should a hotel do when a guest complains?"],
    },
    write: {
      s: [["available", "Viết câu hỏi phòng còn trống hay không."],
        ["complimentary", "Viết câu về một dịch vụ miễn phí ở khách sạn."],
        ["accommodate", "Viết câu về sức chứa của một nhà hàng."]],
      email: {
        task: "Viết email cho khách sạn đặt phòng họp và phòng nghỉ cho đoàn công tác 20 người, hỏi về bữa sáng miễn phí.",
        use: ["accommodate", "available", "complimentary"],
        sample: "Dear Lotus Hotel,\n\nOur company is planning a business trip for 20 employees from October 3 to 5. Could your hotel accommodate our group? We would also like to book a meeting room for one day if one is available. Please let me know whether breakfast is complimentary and what the total price would be.\n\nThank you in advance.\n\nBest regards,\nQuang Le",
      },
    },
  });

  add(19, {
    read: {
      type: "Report summary", title: "Second-quarter sales results",
      text: `Sales for the second quarter rose significantly, reaching $4.2 million. This figure exceeded our projections by 12% and represents the company's most impressive growth in five years.

The main reason for the increase was strong demand for our new line of kitchen appliances. Regular customers accounted for about 60% of total revenue, which shows a steady improvement in loyalty.

However, production costs also increased slightly because of higher material prices. As a result, profits grew more slowly than sales. We estimate that costs will remain high for the rest of the year.

Looking ahead, we anticipate continued growth in the third quarter. Our sales representatives will focus on reaching new business clients, and we expect to reduce shipping fees by working with a new carrier.`,
      q: [
        Q("How did second-quarter sales compare with projections?", ["They were 12% lower", "They were 12% higher", "They were the same", "They were not reported"], 1,
          "“exceeded our projections by 12%”."),
        Q("What caused the increase in sales?", ["Lower prices", "Demand for new kitchen appliances", "A new store", "A celebrity ad"], 1,
          "“strong demand for our new line of kitchen appliances.”"),
        Q("Why did profits grow more slowly than sales?", ["Production costs increased", "Fewer customers bought", "Shipping was free", "Staff salaries fell"], 0,
          "“production costs also increased slightly... As a result, profits grew more slowly”."),
        Q("How does the company plan to reduce shipping fees?", ["By raising prices", "By hiring more drivers", "By opening a warehouse", "By working with a new carrier"], 3,
          "“reduce shipping fees by working with a new carrier.”"),
      ],
    },
    listen: {
      title: "Quarterly figures",
      lines: [
        ["M", "Have you seen the quarterly figures?"],
        ["W", "Yes, sales exceeded our target. That's very encouraging."],
        ["M", "But costs went up too. Material prices are still rising."],
        ["W", "Maybe we should look for a cheaper supplier."],
        ["M", "Good idea. Could you summarize the costs in a short report?"],
        ["W", "Sure. I'll have it ready by Wednesday."],
      ],
      q: [
        Q("What does the woman say about sales?", ["They exceeded the target", "They fell", "They stayed the same", "They are unknown"], 0,
          "“sales exceeded our target.”"),
        Q("What does the woman suggest?", ["Raising prices", "Finding a cheaper supplier", "Cutting staff", "Delaying production"], 1,
          "“look for a cheaper supplier.”"),
        Q("What will the woman prepare?", ["A presentation", "A budget", "A short report on costs", "A contract"], 2,
          "“summarize the costs in a short report”."),
      ],
    },
    speak: {
      q: ["What can a company do to increase its revenue?",
        "Describe a goal you achieved recently and how you achieved it."],
    },
    write: {
      s: [["revenue", "Viết câu về doanh thu của một công ty."],
        ["exceed", "Viết câu về việc vượt chỉ tiêu."],
        ["reduce", "Viết câu về cách giảm chi phí."]],
      email: {
        task: "Viết email cho sếp tóm tắt kết quả kinh doanh quý vừa rồi và một đề xuất cắt giảm chi phí.",
        use: ["revenue", "exceed", "reduce"],
        sample: "Dear Ms. Kim,\n\nI am pleased to report that our revenue for the second quarter was $4.2 million, which exceeded our target by 12%. However, material costs also rose. To reduce costs, I suggest we compare prices from at least three suppliers before placing our next large order. I can prepare a detailed comparison by Friday.\n\nBest regards,\nVinh",
      },
    },
  });

  add(20, {
    read: {
      type: "Memo", title: "Annual budget and audit",
      text: `To: Department heads
From: Finance Director

The annual audit will take place from November 3 to 7. Please make sure all financial records for this fiscal year are accurate and complete.

This year, the board has allocated a total budget of $1.5 million for operations. Because of rising inflation, expenditures in some departments exceeded their budgets. Department heads must submit a short report explaining any deficit by October 25.

Employees will continue to be reimbursed for incidental travel expenses, but receipts are now required for all claims. Claims submitted without receipts will be returned.

We were fortunate to have a strong second half of the year, and turnover increased considerably. However, we must curtail unnecessary spending to keep the company profitable next year.`,
      q: [
        Q("When will the audit take place?", ["October 25", "November 3–7", "Next year", "Every month"], 1,
          "“The annual audit will take place from November 3 to 7.”"),
        Q("What must department heads explain?", ["Any deficit", "New hires", "Travel plans", "Sales targets"], 0,
          "“submit a short report explaining any deficit”."),
        Q("What is now required for travel expense claims?", ["Manager approval", "Receipts", "An online form", "A meeting"], 1,
          "“receipts are now required for all claims.”"),
        Q("What does the director ask for next year?", ["More hiring", "Higher prices", "A larger budget", "Less unnecessary spending"], 3,
          "“we must curtail unnecessary spending”."),
      ],
    },
    listen: {
      title: "An expense claim",
      lines: [
        ["W", "Hi, I'd like to submit my travel expenses from the Singapore trip."],
        ["M", "Sure. Do you have receipts for everything?"],
        ["W", "For the hotel and flights, yes. But I lost the taxi receipts."],
        ["M", "Unfortunately, we can't reimburse claims without receipts now."],
        ["W", "I see. Then I'll just claim the hotel and flights."],
        ["M", "Okay. You'll receive the money with your next paycheck."],
      ],
      q: [
        Q("What does the woman want to do?", ["Submit travel expenses", "Book a flight", "Change her salary", "Plan a trip"], 0,
          "“submit my travel expenses from the Singapore trip.”"),
        Q("What problem does the woman have?", ["She lost some receipts", "She missed a deadline", "Her trip was cancelled", "She was overcharged"], 0,
          "“I lost the taxi receipts.”"),
        Q("When will she receive the money?", ["Today", "Next week", "With her next paycheck", "After the audit"], 2,
          "“You'll receive the money with your next paycheck.”"),
      ],
    },
    speak: {
      q: ["How do you manage your personal budget each month?",
        "Why do companies need to check their financial records regularly?"],
    },
    write: {
      s: [["budget", "Viết câu về ngân sách cho một dự án."],
        ["reimburse", "Viết câu về việc hoàn trả chi phí công tác."],
        ["accurately", "Viết câu nhắc ghi chép số liệu chính xác."]],
      email: {
        task: "Viết email cho phòng kế toán gửi chi phí công tác và hỏi khi nào được hoàn tiền.",
        use: ["expenditure", "reimburse", "receipt"],
        sample: "Dear Accounting Department,\n\nI have attached a list of my expenditures from the business trip to Singapore last week, including hotel, flights, and meals. I have included a receipt for each item. Could you tell me when I will be reimbursed? I would also like to know if there is a limit for meal costs.\n\nThank you for your help.\n\nBest regards,\nThuy",
      },
    },
  });
})();
