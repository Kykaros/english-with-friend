/*
 * Nội dung luyện 4 kỹ năng cho 600 Essential Words for TOEIC — bài 1–10.
 * Mỗi bài: read (đoạn văn + 4 câu hỏi), listen (hội thoại M/W + 3 câu hỏi), speak (câu hỏi mở), write (đặt câu + email).
 * a = vị trí đáp án đúng (0 = A). why = giải thích tiếng Việt.
 */
(function () {
  const Q = (q, o, a, why) => ({ q, o, a, why });
  const add = (id, data) => EWF.addSkills("toeic600", id, data);

  add(1, {
    read: {
      type: "E-mail", title: "Renewing the cleaning contract",
      text: `To: Diane Moore, Office Manager
From: Robert Lin, Brightway Cleaning Services
Subject: Your service agreement

Dear Ms. Moore,

Thank you for choosing Brightway for the past two years. Our current agreement with your company expires on March 31, and we would be pleased to renew it. The new contract will specify the same daily cleaning schedule, but it adds a provision for window washing once a month at no extra cost.

As always, both parties must abide by the terms. If you need to cancel the service, the contract obligates you to give us 30 days' written notice. In return, you have our assurance that any complaint will be resolved within 48 hours.

Please let me know if you would like to engage us for another year. We can also meet to determine whether any changes are needed before you sign.

Sincerely,
Robert Lin`,
      q: [
        Q("What is the main purpose of the e-mail?", ["To complain about a service", "To offer to renew a contract", "To announce a price increase", "To cancel a cleaning service"], 1,
          "Câu “we would be pleased to renew it” và “engage us for another year” cho thấy mục đích là đề nghị gia hạn hợp đồng."),
        Q("What is new in the contract?", ["A higher monthly fee", "A shorter cleaning schedule", "Monthly window washing", "Weekend cleaning"], 2,
          "Hợp đồng mới “adds a provision for window washing once a month at no extra cost” — thêm lau cửa kính mỗi tháng."),
        Q("What must Ms. Moore do if she wants to end the service?", ["Pay a cancellation fee", "Call Mr. Lin within 48 hours", "Sign a new agreement", "Give 30 days' written notice"], 3,
          "“the contract obligates you to give us 30 days' written notice” — phải báo trước bằng văn bản 30 ngày."),
        Q("The word “resolved” in paragraph 2 is closest in meaning to", ["dealt with", "repeated", "reported", "ignored"], 0,
          "“resolve” = giải quyết, gần nghĩa nhất với “dealt with” (được xử lý)."),
      ],
    },
    listen: {
      title: "Checking a contract",
      lines: [
        ["W", "Have you had a chance to read the contract from the printing company?"],
        ["M", "Yes, and I think we should ask them to change one provision."],
        ["W", "Which one? I thought the agreement looked fine."],
        ["M", "It doesn't specify a delivery date for the brochures."],
        ["W", "That's a problem. The trade fair starts on the twelfth."],
        ["M", "Right. I'll call them this afternoon and ask them to add a date."],
        ["W", "Good. Let's not sign anything until that issue is resolved."],
      ],
      q: [
        Q("What are the speakers discussing?", ["A contract with a printing company", "A job interview", "A trade fair schedule", "A delivery that arrived late"], 0,
          "Ngay câu đầu: “the contract from the printing company”."),
        Q("What problem does the man mention?", ["The price is too high", "No delivery date is given", "The brochures have errors", "The company closed early"], 1,
          "Người đàn ông nói hợp đồng “doesn't specify a delivery date” — không ghi rõ ngày giao."),
        Q("What does the woman suggest?", ["Finding a new printer", "Postponing the trade fair", "Waiting before signing", "Paying in advance"], 2,
          "“Let's not sign anything until that issue is resolved” — chờ giải quyết xong mới ký."),
      ],
    },
    speak: {
      q: ["Describe a contract or agreement you have signed, such as a phone plan or a rental. What were the main terms?",
        "Why is it important for both parties to read a contract carefully before signing it?"],
      tips: ["Gợi ý: I signed a… / It specified that… / I had to…", "Gợi ý: First,… Also,… If they don't,…"],
    },
    write: {
      s: [["abide by", "Viết câu về việc nhân viên phải tuân thủ nội quy công ty."],
        ["cancel", "Viết câu về một cuộc họp hoặc chuyến bay bị huỷ và lý do."],
        ["specify", "Viết câu yêu cầu khách hàng ghi rõ điều gì đó trong đơn hàng."]],
      email: {
        task: "Bạn là trưởng phòng hành chính. Viết email cho nhà cung cấp nước uống, đề nghị thay đổi một điều khoản trong hợp đồng (ví dụ: ngày giao hàng) trước khi ký.",
        use: ["agreement", "provision", "specify"],
        sample: "Dear Mr. Patel,\n\nThank you for sending the new agreement. Before we sign, we would like to change one provision. The contract does not specify a delivery day, and we need the water delivered every Monday morning. Could you please add this to the document and send us a revised copy?\n\nWe look forward to working with you again this year.\n\nBest regards,\nAnna Tran",
      },
    },
  });

  add(2, {
    read: {
      type: "Article", title: "Smoothies win over young shoppers",
      text: `When FreshCup launched its line of fruit smoothies last spring, few analysts expected it to compete with the big soft-drink brands. A year later, the small company has convinced thousands of young consumers to change their habits.

According to marketing director Elena Ruiz, the secret was simple. "We didn't try to persuade people with famous faces," she said. "We asked customers to compare our ingredients with those of other drinks." The campaign attracted students and young office workers who care about health.

Some experts warn that healthy drinks may be just a fad. Ms. Ruiz disagrees. She says current research shows that people under 30 consume fewer sugary drinks every year. To keep customers satisfied, FreshCup plans to introduce three new flavors in June. The company also hopes its success will inspire other small producers to enter the market.`,
      q: [
        Q("What is the article mainly about?", ["A famous soft-drink brand", "The success of a small drink company", "A new law about sugar", "A health study of students"], 1,
          "Bài viết kể về việc FreshCup (công ty nhỏ) thành công với dòng sinh tố."),
        Q("How did FreshCup attract customers?", ["By using famous actors", "By lowering its prices", "By asking people to compare ingredients", "By giving away free samples"], 2,
          "“We asked customers to compare our ingredients with those of other drinks.”"),
        Q("What does Ms. Ruiz think about healthy drinks?", ["They are only a fad", "They will not last", "They are too expensive", "They reflect a real trend"], 3,
          "Bà không đồng ý rằng đó là “fad” và dẫn nghiên cứu cho thấy người trẻ uống ít đồ ngọt hơn mỗi năm."),
        Q("What will FreshCup do in June?", ["Introduce new flavors", "Open a new factory", "Hire a new director", "Sell the company"], 0,
          "“FreshCup plans to introduce three new flavors in June.”"),
      ],
    },
    listen: {
      title: "Planning an ad campaign",
      lines: [
        ["M", "The sales figures for our new running shoes are lower than we expected."],
        ["W", "I know. I think our ads aren't attracting the right customers."],
        ["M", "What do you mean?"],
        ["W", "We're showing them on TV during the evening news. Most viewers are over fifty."],
        ["M", "So you'd rather market them online?"],
        ["W", "Exactly. Young runners spend most of their time on social media. Short videos could persuade them to try the shoes."],
        ["M", "Okay. Prepare a plan and we'll present it to the director on Friday."],
      ],
      q: [
        Q("What product are the speakers discussing?", ["Sports drinks", "Running shoes", "A TV program", "A fitness app"], 1,
          "“our new running shoes”."),
        Q("Why does the woman think sales are low?", ["The price is too high", "The shoes are uncomfortable", "The ads reach the wrong audience", "A competitor opened a store"], 2,
          "Cô nói quảng cáo chiếu lúc thời sự tối, người xem hầu hết trên 50 tuổi — sai đối tượng."),
        Q("What will happen on Friday?", ["A plan will be presented", "A video will be filmed", "A new store will open", "The ads will stop"], 0,
          "“we'll present it to the director on Friday.”"),
      ],
    },
    speak: {
      q: ["Describe an advertisement that convinced you to buy something. What made it persuasive?",
        "Do you think social media is a good way to market products to young people? Why or why not?"],
    },
    write: {
      s: [["attract", "Viết câu về cách một cửa hàng thu hút khách hàng."],
        ["compare", "Viết câu về việc bạn so sánh giá trước khi mua điện thoại."],
        ["satisfy", "Viết câu về việc làm hài lòng khách hàng."]],
      email: {
        task: "Viết email cho đồng nghiệp ở phòng Marketing, đề xuất một ý tưởng quảng cáo mới cho sản phẩm cà phê đóng chai của công ty.",
        use: ["attract", "persuade", "consume"],
        sample: "Hi Mark,\n\nI have an idea for our bottled coffee campaign. Many young consumers buy coffee on their way to work, so we could put free samples in train stations for one week. I think tasting the product will persuade people more than a TV ad. It could also attract new customers who usually drink tea.\n\nCan we discuss this at Thursday's meeting?\n\nThanks,\nLinh",
      },
    },
  });

  add(3, {
    read: {
      type: "Notice", title: "HomePlus limited warranty",
      text: `Thank you for purchasing a HomePlus coffee maker. Please read this warranty carefully and keep your receipt.

HomePlus promises that this product will be free from defects for two years from the date of purchase. The warranty covers parts and labor for repairs at any authorized service center. It does not cover damage caused by dropping the machine, using the wrong voltage, or failing to clean it regularly. As a consequence, we strongly recommend that you descale the machine frequently.

Repair times may vary depending on your location. To make a claim, you will be required to show proof of purchase. Please note that the warranty will expire after two years and cannot be extended.

HomePlus has built its reputation on quality. If you have any questions, please consider calling our customer line at 1-800-555-0144 before sending your product for repair.`,
      q: [
        Q("How long is the warranty valid?", ["Six months", "One year", "Two years", "Five years"], 2,
          "“free from defects for two years from the date of purchase”."),
        Q("What is NOT covered by the warranty?", ["Damage from dropping the machine", "Replacement parts", "Labor for repairs", "Repairs at service centers"], 0,
          "Đoạn 2 liệt kê: không bảo hành hư hỏng do làm rơi máy, sai điện áp, không vệ sinh."),
        Q("What must customers show to make a claim?", ["A photo of the damage", "Proof of purchase", "An identification card", "A repair estimate"], 1,
          "“you will be required to show proof of purchase”."),
        Q("The word “vary” in paragraph 3 is closest in meaning to", ["improve", "remain", "end", "differ"], 3,
          "“vary” = thay đổi, khác nhau tùy nơi → “differ”."),
      ],
    },
    listen: {
      title: "A broken printer",
      lines: [
        ["W", "Customer service, this is Karen. How can I help you?"],
        ["M", "Hi. The printer I bought from you last year has stopped working."],
        ["W", "I'm sorry to hear that. Is it still covered by the warranty?"],
        ["M", "I think so. The warranty doesn't expire until next month."],
        ["W", "Then we can repair it for free. Do you have the receipt?"],
        ["M", "Yes, I kept it in the box."],
        ["W", "Great. Please bring the printer and the receipt to our store on Main Street."],
      ],
      q: [
        Q("Why is the man calling?", ["To buy a new printer", "To report a broken printer", "To ask about store hours", "To cancel an order"], 1,
          "“The printer I bought from you last year has stopped working.”"),
        Q("When does the warranty expire?", ["Yesterday", "Next week", "Next month", "Next year"], 2,
          "“The warranty doesn't expire until next month.”"),
        Q("What does the woman ask the man to bring?", ["The printer and the receipt", "A credit card", "The original box only", "A photo of the problem"], 0,
          "“bring the printer and the receipt to our store”."),
      ],
    },
    speak: {
      q: ["Tell me about a time something you bought broke. What did you do?",
        "When you buy electronics, how important is the warranty to you? Explain your reasons."],
    },
    write: {
      s: [["cover", "Viết câu nói bảo hành có (hoặc không) chi trả cho một loại hư hỏng."],
        ["expire", "Viết câu về hộ chiếu hoặc thẻ thành viên sắp hết hạn."],
        ["reputation", "Viết câu về danh tiếng của một thương hiệu bạn biết."]],
      email: {
        task: "Chiếc máy xay sinh tố bạn mua 6 tháng trước bị hỏng. Viết email cho cửa hàng để yêu cầu sửa chữa theo bảo hành.",
        use: ["warranty", "cover", "require"],
        sample: "Dear HomePlus Customer Service,\n\nI bought a blender from your store six months ago, and it suddenly stopped working last week. I used it carefully and never dropped it. I believe the problem should be covered by the two-year warranty. Could you tell me what documents you require and where I should send the blender for repair?\n\nThank you for your help.\n\nSincerely,\nMinh Le",
      },
    },
  });

  add(4, {
    read: {
      type: "Memo", title: "Planning for the new branch",
      text: `To: All department heads
From: Thomas Grant, CEO
Re: Strategy meeting, May 14

As you know, we plan to develop a second branch in the northern district next year. Before we make a final decision, I would like each department to evaluate the risks and benefits.

Please gather information on local rents, competitors, and the number of potential customers. The finance team should demonstrate how the new branch would be funded. Our primary goal is to grow without damaging our strong position downtown, so we must avoid taking on too much debt.

At the meeting, we will also address one concern raised by staff: whether online sales could be a substitute for a physical store. Lena Park has offered to present some figures on this.

Please send your reports to my assistant by May 10.`,
      q: [
        Q("What is the purpose of the memo?", ["To announce a new CEO", "To prepare for a planning meeting", "To report last year's sales", "To introduce a new employee"], 1,
          "Bản ghi nhớ yêu cầu các phòng chuẩn bị đánh giá cho cuộc họp chiến lược ngày 14/5."),
        Q("What should the finance team do?", ["Show how the branch would be funded", "Find a new office downtown", "Hire more sales staff", "Reduce online prices"], 0,
          "“The finance team should demonstrate how the new branch would be funded.”"),
        Q("What is the company's primary goal?", ["To close the downtown store", "To sell only online", "To grow while staying strong downtown", "To borrow as much as possible"], 2,
          "“Our primary goal is to grow without damaging our strong position downtown”."),
        Q("When are the reports due?", ["May 14", "Next year", "May 1", "May 10"], 3,
          "“send your reports to my assistant by May 10.”"),
      ],
    },
    listen: {
      title: "Opening a café",
      lines: [
        ["M", "So, have you decided where to open your café?"],
        ["W", "Not yet. I'm still gathering information about two locations."],
        ["M", "What's the biggest risk?"],
        ["W", "Rent. The place near the university is cheap, but students only come during the semester."],
        ["M", "And the other one?"],
        ["W", "It's in the business district. It's more expensive, but there are customers all year."],
        ["M", "I'd evaluate the costs for a full year before you decide."],
      ],
      q: [
        Q("What is the woman planning to do?", ["Open a café", "Rent an apartment", "Apply to a university", "Sell her business"], 0,
          "Câu hỏi đầu: “where to open your café”."),
        Q("What is the problem with the location near the university?", ["It is too expensive", "It is too small", "Customers come only part of the year", "It is far from the bus stop"], 2,
          "“students only come during the semester” — khách chỉ đến trong học kỳ."),
        Q("What does the man suggest?", ["Choosing the cheaper place", "Comparing costs for a whole year", "Asking students for advice", "Waiting until next year"], 1,
          "“I'd evaluate the costs for a full year before you decide.”"),
      ],
    },
    speak: {
      q: ["If you could start a small business, what would it be? Describe your strategy.",
        "What are the biggest risks of starting a new business in your city?"],
    },
    write: {
      s: [["avoid", "Viết câu về điều doanh nghiệp nên tránh khi mới thành lập."],
        ["develop", "Viết câu về việc công ty phát triển một sản phẩm hoặc kế hoạch mới."],
        ["strategy", "Viết câu nêu một chiến lược để tăng doanh thu."]],
      email: {
        task: "Viết email cho sếp, đề xuất mở thêm một kênh bán hàng online và nêu một rủi ro cần cân nhắc.",
        use: ["strategy", "risk", "evaluate"],
        sample: "Dear Ms. Grant,\n\nI would like to suggest a new strategy for next year: selling our products online. Many of our customers already shop on their phones, and an online store could bring in new buyers. However, there is one risk. Delivery costs may be high at the beginning. I suggest we evaluate these costs for three months before making a decision.\n\nBest regards,\nHuy Nguyen",
      },
    },
  });

  add(5, {
    read: {
      type: "Announcement", title: "Asian Tourism Association annual conference",
      text: `The Asian Tourism Association is pleased to announce that its annual conference will be held at the Riverside Convention Center in Da Nang from September 18 to 20.

More than 600 members are expected to attend. This year's sessions will focus on sustainable travel and digital marketing. Participants may select up to four workshops when they register online. Because last year's event was overcrowded, the number of seats in each workshop will be limited to 50.

The convention center can accommodate guests with special needs, and the association has made arrangements with three nearby hotels to offer discounted rooms. The location is only 15 minutes from the airport.

Members who would like to take part in the poster session should get in touch with the organizing committee before August 1. Registration closes on August 31.`,
      q: [
        Q("Where will the conference take place?", ["At a hotel near the airport", "At a convention center", "At a university", "Online"], 1,
          "“will be held at the Riverside Convention Center in Da Nang”."),
        Q("Why will workshop seats be limited?", ["The building is under repair", "Few members registered", "Last year's event was too crowded", "Speakers asked for small groups"], 2,
          "“Because last year's event was overcrowded, the number of seats... will be limited to 50.”"),
        Q("What has the association arranged?", ["Free airport transport", "Discounted hotel rooms", "Free meals for members", "A city tour"], 1,
          "“has made arrangements with three nearby hotels to offer discounted rooms”."),
        Q("What should members do before August 1 to join the poster session?", ["Pay a fee", "Book a hotel", "Contact the organizing committee", "Select four workshops"], 2,
          "“should get in touch with the organizing committee before August 1.”"),
      ],
    },
    listen: {
      title: "Registering for a conference",
      lines: [
        ["W", "Hi, I'd like to register for the medical conference next month."],
        ["M", "Certainly. Are you a member of the association?"],
        ["W", "Yes, I am. My membership number is 4721."],
        ["M", "Thank you. Which sessions would you like to attend?"],
        ["W", "The ones on Saturday morning. Is the session on new treatments still open?"],
        ["M", "I'm afraid it's full, but we've just added a second session in the afternoon."],
        ["W", "That's fine. Please put me in the afternoon one."],
      ],
      q: [
        Q("What does the woman want to do?", ["Register for a conference", "Become a member", "Change her hotel", "Give a presentation"], 0,
          "“I'd like to register for the medical conference”."),
        Q("What problem does the man mention?", ["The conference is cancelled", "A session is full", "Her membership has expired", "The fee has increased"], 1,
          "“I'm afraid it's full” — phiên buổi sáng đã kín chỗ."),
        Q("What will the woman probably do?", ["Attend another conference", "Ask for a refund", "Attend the afternoon session", "Call back later"], 2,
          "“Please put me in the afternoon one.”"),
      ],
    },
    speak: {
      q: ["Describe a conference, workshop, or seminar you have attended. What did you learn?",
        "Do you prefer attending events in person or online? Give reasons."],
    },
    write: {
      s: [["attend", "Viết câu về một sự kiện bạn sẽ tham dự tháng tới."],
        ["register", "Viết câu hướng dẫn cách đăng ký một khoá học."],
        ["get in touch", "Viết câu đề nghị ai đó liên hệ với bạn nếu có câu hỏi."]],
      email: {
        task: "Bạn phụ trách tổ chức một hội thảo. Viết email gửi khách mời thông báo thời gian, địa điểm và cách đăng ký.",
        use: ["hold", "location", "register"],
        sample: "Dear colleagues,\n\nWe are happy to invite you to our annual marketing workshop. It will be held on Friday, June 6, from 9 a.m. to 4 p.m. The location is the Sunrise Hotel, which is close to the city center. Please register on our website by May 30, as seats are limited.\n\nIf you have any questions, feel free to get in touch with me.\n\nBest regards,\nThu Pham",
      },
    },
  });

  add(6, {
    read: {
      type: "E-mail", title: "Changes to the shared drive",
      text: `To: All staff
From: IT Department
Subject: Shared drive update

Dear colleagues,

Over the weekend, the server will be shut down from 10 p.m. Saturday to 6 a.m. Sunday so that we can install a new storage system. During this time, you will not be able to access the shared drive.

After the update, each department will be allocated 500 GB of space. Please delete any duplicate files before Friday. Our records show that many folders contain several copies of the same document, which makes it difficult to search for the correct version.

Some older programs may not be compatible with the new system. If a program fails to open or displays an error message, do not ignore it. Contact the help desk right away, and we will figure out a solution.

We want to warn everyone that files left in the "Temp" folder will be removed permanently.

IT Department`,
      q: [
        Q("Why will the server be shut down?", ["To fix a virus", "To install a new storage system", "To move the office", "To train new staff"], 1,
          "“so that we can install a new storage system”."),
        Q("What are employees asked to do before Friday?", ["Buy new computers", "Change their passwords", "Delete duplicate files", "Install new programs"], 2,
          "“Please delete any duplicate files before Friday.”"),
        Q("What should employees do if a program displays an error?", ["Contact the help desk", "Restart the server", "Ignore the message", "Buy a new program"], 0,
          "“do not ignore it. Contact the help desk right away”."),
        Q("What will happen to files in the “Temp” folder?", ["They will be moved", "They will be copied", "They will be checked", "They will be deleted permanently"], 3,
          "“files left in the Temp folder will be removed permanently.”"),
      ],
    },
    listen: {
      title: "A computer problem",
      lines: [
        ["M", "Hi, Sarah. My computer keeps shutting down every few minutes."],
        ["W", "Did you install anything new recently?"],
        ["M", "Just a program for editing photos."],
        ["W", "That might be the problem. It may not be compatible with your operating system."],
        ["M", "Should I delete it?"],
        ["W", "Yes, try that first. If it still fails, bring it to me and I'll figure out what's wrong."],
      ],
      q: [
        Q("What is the man's problem?", ["He forgot his password", "His computer keeps shutting down", "His printer is broken", "He lost a file"], 1,
          "“My computer keeps shutting down every few minutes.”"),
        Q("What does the woman think caused the problem?", ["A new program", "A virus", "Old hardware", "A power cut"], 0,
          "Chương trình chỉnh ảnh mới cài “may not be compatible” — có thể không tương thích."),
        Q("What does the woman tell the man to do first?", ["Buy a new computer", "Call the manufacturer", "Delete the program", "Restart the network"], 2,
          "“Should I delete it?” — “Yes, try that first.”"),
      ],
    },
    speak: {
      q: ["Describe a problem you had with a computer or phone. How did you solve it?",
        "How do you organize the files on your computer so that you can find them easily?"],
    },
    write: {
      s: [["access", "Viết câu về việc không truy cập được email hoặc trang web."],
        ["delete", "Viết câu nhắc đồng nghiệp xoá các file cũ."],
        ["warn", "Viết câu cảnh báo ai đó về một vấn đề máy tính."]],
      email: {
        task: "Bạn là nhân viên IT. Viết email thông báo cho nhân viên rằng hệ thống email sẽ tạm ngừng để bảo trì và họ cần làm gì trước đó.",
        use: ["shut down", "access", "duplicate"],
        sample: "Dear all,\n\nPlease note that the e-mail system will be shut down for maintenance this Saturday from 8 a.m. to noon. During this time, you will not be able to access your inbox. Before Friday, please save any important attachments and delete duplicate messages to free up space.\n\nIf you have problems after the update, contact the help desk.\n\nThank you,\nIT Team",
      },
    },
  });

  add(7, {
    read: {
      type: "Advertisement", title: "OfficePro copiers: built for busy teams",
      text: `Is your old copier slowing your team down? OfficePro is the provider that hundreds of small businesses trust.

Our new X200 copier has a capacity of 1,000 pages and prints 40 pages per minute. It is made with a durable metal frame, so it will keep working for years. Best of all, it is affordable: lease it for only $59 a month.

With our Smart Supply initiative, you never have to stay on top of ink and paper yourself. The copier tells us when supplies are low, and we send what you need, as needed. If a problem recurs, a technician will visit your office within one business day.

Customers report a 30% reduction in printing costs in the first year. Call today to have a physical demonstration in your office. Supplies are limited — order before our current stock runs out!`,
      q: [
        Q("What is being advertised?", ["A printing service", "A copier", "Office furniture", "Ink cartridges"], 1,
          "Quảng cáo máy photocopy X200 của OfficePro."),
        Q("What is the Smart Supply initiative?", ["A training program", "A discount for new customers", "Automatic delivery of supplies", "A free repair service"], 2,
          "Máy tự báo khi sắp hết mực/giấy và công ty gửi đến khi cần — giao vật tư tự động."),
        Q("What happens if a problem happens again?", ["A technician visits within a day", "The customer gets a new copier", "The lease becomes free", "The customer must call the factory"], 0,
          "“If a problem recurs, a technician will visit your office within one business day.”"),
        Q("Why should customers order soon?", ["Prices will rise", "The offer ends today", "Technicians are busy", "Stock is limited"], 3,
          "“order before our current stock runs out!” — hàng còn ít."),
      ],
    },
    listen: {
      title: "Choosing a new printer",
      lines: [
        ["W", "We really need to replace the printer on our floor. It breaks down every week."],
        ["M", "I agree. Who's in charge of ordering equipment?"],
        ["W", "Daniel is. He sent me a list of three models."],
        ["M", "Which one do you like?"],
        ["W", "The cheapest one is affordable, but it doesn't look very durable."],
        ["M", "Then let's pay a little more for something that lasts. I'll talk to Daniel this afternoon."],
      ],
      q: [
        Q("What is the problem with the current printer?", ["It is too slow", "It breaks down often", "It uses too much ink", "It is too loud"], 1,
          "“It breaks down every week.”"),
        Q("Who is responsible for ordering equipment?", ["The woman", "The man", "Daniel", "The manager"], 2,
          "“Who's in charge of ordering equipment?” — “Daniel is.”"),
        Q("What does the man suggest?", ["Buying a more durable model", "Repairing the old printer", "Buying the cheapest model", "Waiting until next year"], 0,
          "“let's pay a little more for something that lasts.”"),
      ],
    },
    speak: {
      q: ["What piece of office technology do you use most often? How does it help you?",
        "When you buy equipment, which is more important: a low price or durability? Why?"],
    },
    write: {
      s: [["affordable", "Viết câu về một sản phẩm có giá phải chăng."],
        ["be in charge of", "Viết câu nói ai phụ trách việc gì trong công ty bạn."],
        ["durable", "Viết câu mô tả một món đồ bền."]],
      email: {
        task: "Viết email cho phòng mua hàng, đề nghị mua một máy in mới cho phòng bạn và giải thích lý do.",
        use: ["capacity", "durable", "affordable"],
        sample: "Dear Daniel,\n\nOur department would like to request a new printer. The current one has a small paper capacity and breaks down almost every week, which wastes a lot of time. We found a durable model from OfficePro that costs only $59 a month to lease. We think it is affordable and will save money on repairs.\n\nCould we discuss this next week?\n\nBest regards,\nLan",
      },
    },
  });

  add(8, {
    read: {
      type: "Notice", title: "Updated office dress code",
      text: `To all employees:

Starting next Monday, our office will follow a new dress code. We appreciate the feedback many of you gave in last month's survey.

From Monday to Thursday, employees should wear business clothing. On Fridays, casual clothing is allowed, but clothes made of very thin material, sports shorts, and sandals are still not permitted. Staff who are exposed to customers at the front desk must wear their name badges at all times.

This change brings in a more relaxed atmosphere while keeping a professional image. Our old policy was outdated and did not match current practice in our industry.

Managers will reinforce these rules, but they will give a verbal warning first if an employee is out of line. You can get a glimpse of examples of acceptable clothing in the photos on the staff website.

Human Resources`,
      q: [
        Q("What is the notice about?", ["A new uniform supplier", "A new dress code", "A staff survey", "A new front desk"], 1,
          "Thông báo về quy định trang phục mới (dress code)."),
        Q("What is allowed on Fridays?", ["Sports shorts", "Sandals", "Casual clothing", "Very thin clothing"], 2,
          "“On Fridays, casual clothing is allowed” — các món còn lại vẫn bị cấm."),
        Q("Why was the policy changed?", ["The old policy was outdated", "Customers complained", "Managers asked for it", "Clothing costs increased"], 0,
          "“Our old policy was outdated and did not match current practice”."),
        Q("What will managers do first if someone breaks the rules?", ["Send them home", "Write a report", "Reduce their salary", "Give a spoken warning"], 3,
          "“they will give a verbal warning first” — verbal = bằng lời nói."),
      ],
    },
    listen: {
      title: "First day at the office",
      lines: [
        ["M", "Welcome to the team, Anna. Let me explain a few office procedures."],
        ["W", "Thank you. I'd really appreciate that."],
        ["M", "First, everyone needs to swipe their card at the entrance. Here's the door code in case you forget it."],
        ["W", "Got it. Is there a dress code?"],
        ["M", "Business casual most days. On Fridays you can wear jeans."],
        ["W", "Great. And where do I bring in visitors?"],
        ["M", "Always meet them at reception and sign them in first."],
      ],
      q: [
        Q("Who most likely is the woman?", ["A new employee", "A visitor", "A receptionist", "A customer"], 0,
          "“Welcome to the team, Anna” — cô là nhân viên mới."),
        Q("What can employees wear on Fridays?", ["Uniforms", "Jeans", "Suits", "Sports clothes"], 1,
          "“On Fridays you can wear jeans.”"),
        Q("What must the woman do when visitors arrive?", ["Call security", "Give them a card", "Sign them in at reception", "Take them to her desk"], 2,
          "“Always meet them at reception and sign them in first.”"),
      ],
    },
    speak: {
      q: ["Describe the rules at your workplace or school. Which rule do you think is the most useful?",
        "Do you prefer a strict dress code or casual clothing at work? Explain why."],
    },
    write: {
      s: [["appreciate", "Viết câu cảm ơn đồng nghiệp đã giúp bạn."],
        ["casual", "Viết câu về trang phục thoải mái vào cuối tuần hoặc thứ Sáu."],
        ["outdated", "Viết câu về một quy trình hoặc thiết bị đã lỗi thời."]],
      email: {
        task: "Viết email cho phòng Nhân sự, góp ý rằng quy định đi muộn của công ty đã lỗi thời và đề xuất thay đổi.",
        use: ["outdated", "practice", "appreciate"],
        sample: "Dear HR team,\n\nI would like to share some feedback about our policy on working hours. The rule that everyone must arrive at exactly 8 a.m. seems outdated. In current practice, many companies allow staff to start between 7:30 and 9:00. This would help employees avoid traffic and work more efficiently.\n\nI would appreciate it if you could consider this idea.\n\nBest regards,\nTuan",
      },
    },
  });

  add(9, {
    read: {
      type: "Article", title: "Cloud storage takes over small offices",
      text: `Ten years ago, most small offices kept their files on a disk in a single computer. Today, a quiet revolution is changing the way they work. Cloud storage has grown sharply in popularity because it lets staff open documents from anywhere.

"Our team works in three cities," says Minh Tran, manager of a design studio. "Online software facilitates our work because everyone can edit the same file at the same time." His company replaced its old office network last year and has saved on technical support.

The process of moving to the cloud is not always easy, however. Employees need new skills, and some worry about security. Experts recommend that companies train staff before the change and keep a backup copy of important data.

Analysts predict that by 2030, more than 80 percent of small businesses will use some form of cloud storage.`,
      q: [
        Q("What is the article mainly about?", ["The history of computer disks", "The growth of cloud storage", "A design competition", "A new computer brand"], 1,
          "Bài viết nói về việc lưu trữ đám mây ngày càng phổ biến ở văn phòng nhỏ."),
        Q("Why does Mr. Tran like online software?", ["It is free", "It is very fast", "His team can edit files together", "It needs no internet"], 2,
          "“everyone can edit the same file at the same time.”"),
        Q("What do experts recommend?", ["Training staff before the change", "Avoiding the cloud completely", "Buying more disks", "Hiring more managers"], 0,
          "“companies train staff before the change and keep a backup copy”."),
        Q("The word “sharply” in paragraph 1 is closest in meaning to", ["slowly", "carefully", "slightly", "quickly"], 3,
          "“grown sharply” = tăng mạnh, nhanh → “quickly”."),
      ],
    },
    listen: {
      title: "Running out of storage",
      lines: [
        ["W", "My laptop says the storage is almost full. I can't save anything else."],
        ["M", "Do you keep a lot of videos on it?"],
        ["W", "Yes, from our training sessions."],
        ["M", "You could move them to the company network. There's plenty of space there."],
        ["W", "Is that process complicated?"],
        ["M", "Not at all. I'll show you after lunch. It only takes a few minutes."],
      ],
      q: [
        Q("What is the woman's problem?", ["Her laptop is broken", "Her laptop storage is full", "She lost some videos", "She can't connect to Wi-Fi"], 1,
          "“the storage is almost full. I can't save anything else.”"),
        Q("What does the man suggest?", ["Buying a new laptop", "Deleting the videos", "Moving files to the network", "Calling technical support"], 2,
          "“You could move them to the company network.”"),
        Q("When will the man help her?", ["After lunch", "Tomorrow morning", "Right now", "Next week"], 0,
          "“I'll show you after lunch.”"),
      ],
    },
    speak: {
      q: ["Which electronic device could you not live without? Why?",
        "How has technology changed the way people work in your country in the last ten years?"],
    },
    write: {
      s: [["replace", "Viết câu về việc thay thế một thiết bị cũ."],
        ["skill", "Viết câu về một kỹ năng bạn muốn học."],
        ["software", "Viết câu về một phần mềm bạn hay dùng."]],
      email: {
        task: "Viết email đề nghị công ty tổ chức một buổi đào tạo về phần mềm mới cho nhân viên.",
        use: ["software", "skill", "facilitate"],
        sample: "Dear Mr. Hoang,\n\nNext month, we will start using the new accounting software. Many staff members have not used this kind of program before, so I suggest we organize a short training session. It would help everyone learn the basic skills quickly and facilitate the change. The software provider offers a free two-hour class.\n\nPlease let me know if this is possible.\n\nKind regards,\nMai",
      },
    },
  });

  add(10, {
    read: {
      type: "Letter", title: "About your brochure order",
      text: `Dear Mr. Kato,

Thank you for your order of 2,000 brochures. Before we print them, we need you to check the proof that is attached to this letter. Please read it carefully and mention any changes you would like us to make.

As you requested, we have revised the layout so that your company logo appears on the front cover. The brochures will be folded in three and assembled into packs of 50. Because the design is quite complicated, printing will take five working days.

When the brochures are ready, we will send them to you by courier. If you prefer, we can also send them by registered mail, which takes two days longer.

Please return the signed proof beforehand, no later than Thursday, so that we can express our commitment to your deadline.

Yours sincerely,
Mai Nguyen
Sunrise Printing`,
      q: [
        Q("Why did Ms. Nguyen write the letter?", ["To ask Mr. Kato to check a proof", "To cancel an order", "To offer a discount", "To apologize for a delay"], 0,
          "“we need you to check the proof that is attached”."),
        Q("What change was made to the brochure?", ["The paper was changed", "The logo was moved to the front cover", "The price was lowered", "The size was increased"], 1,
          "“we have revised the layout so that your company logo appears on the front cover”."),
        Q("Why will printing take five days?", ["The printer is broken", "The order is very large", "The design is complicated", "Staff are on holiday"], 2,
          "“Because the design is quite complicated, printing will take five working days.”"),
        Q("What is Mr. Kato asked to do by Thursday?", ["Pay the invoice", "Call the courier", "Visit the printer", "Return the signed proof"], 3,
          "“Please return the signed proof... no later than Thursday”."),
      ],
    },
    listen: {
      title: "Sending a package",
      lines: [
        ["M", "Hi, I need to send these contracts to our office in Singapore."],
        ["W", "Would you like regular mail or express courier?"],
        ["M", "How long does each one take?"],
        ["W", "Regular mail takes about a week. Express courier arrives in two days."],
        ["M", "They need to be signed by Friday, so express, please."],
        ["W", "Okay. Please fill out this form and mention the recipient's phone number."],
      ],
      q: [
        Q("What does the man want to send?", ["Contracts", "Brochures", "A gift", "Product samples"], 0,
          "“I need to send these contracts”."),
        Q("How long does express courier take?", ["One day", "Two days", "Five days", "A week"], 1,
          "“Express courier arrives in two days.”"),
        Q("What does the woman ask the man to do?", ["Pay in cash", "Come back on Friday", "Fill out a form", "Sign the contracts"], 2,
          "“Please fill out this form and mention the recipient's phone number.”"),
      ],
    },
    speak: {
      q: ["Do you prefer to communicate at work by e-mail, phone, or chat? Explain why.",
        "Describe the last important letter or package you sent. How did you send it?"],
    },
    write: {
      s: [["beforehand", "Viết câu khuyên ai đó chuẩn bị trước cho một cuộc họp."],
        ["mention", "Viết câu nhắc đến một chi tiết quan trọng trong email."],
        ["revise", "Viết câu về việc sửa lại một bản báo cáo."]],
      email: {
        task: "Bạn đã nhận bản in thử (proof) tờ rơi từ công ty in. Viết email phản hồi: yêu cầu sửa một lỗi và hỏi về cách giao hàng.",
        use: ["proof", "revise", "courier"],
        sample: "Dear Ms. Nguyen,\n\nThank you for sending the proof of our brochure. Overall, it looks great. However, our phone number on the back page is wrong. Please revise it to 028 3822 5566. Once the change is made, could you send the brochures by courier to our office? We need them before next Tuesday.\n\nThank you for your help.\n\nBest regards,\nKenji Kato",
      },
    },
  });
})();
