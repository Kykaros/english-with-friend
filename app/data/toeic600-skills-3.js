/* Nội dung luyện 4 kỹ năng — 600 Essential Words for TOEIC, bài 21–30. Cấu trúc: xem toeic600-skills-1.js. */
(function () {
  const Q = (q, o, a, why) => ({ q, o, a, why });
  const add = (id, data) => EWF.addSkills("toeic600", id, data);

  add(21, {
    read: {
      type: "Information page", title: "Your new First City Bank account",
      text: `Welcome to First City Bank! Here is some important information about your new checking account.

You can check your balance and view every transaction online 24 hours a day. A monthly fee of $5 will be deducted from your account unless you keep a balance of at least $1,000.

For your security, withdrawals of more than $2,000 a day are restricted. Larger amounts can be taken out at a branch with photo ID and your signature. Please be cautious when using public computers, and never share your password with anyone.

Planning to buy a home? Our advisors can explain how much you can borrow and help you prepare a down payment. We currently offer mortgage rates from 6.2%.

Savings customers also receive an annual dividend based on the bank's profits. We accept applications for savings accounts at all branches.`,
      q: [
        Q("How can customers avoid the monthly fee?", ["By banking online", "By keeping at least $1,000 in the account", "By opening a savings account", "By visiting a branch"], 1,
          "“unless you keep a balance of at least $1,000.”"),
        Q("What is required to withdraw a large amount at a branch?", ["A letter from an employer", "An online password", "Photo ID and a signature", "A mortgage"], 2,
          "“with photo ID and your signature.”"),
        Q("What does the bank advise customers to do?", ["Be careful on public computers", "Change passwords daily", "Withdraw cash every week", "Use only one card"], 0,
          "“Please be cautious when using public computers”."),
        Q("Who receives a dividend?", ["All customers", "Mortgage customers", "New customers only", "Savings customers"], 3,
          "“Savings customers also receive an annual dividend”."),
      ],
    },
    listen: {
      title: "At the bank",
      lines: [
        ["M", "Good morning. I'd like to take out a loan to buy a car."],
        ["W", "Certainly. How much would you like to borrow?"],
        ["M", "About fifteen thousand dollars. I can make a down payment of three thousand."],
        ["W", "That helps. Do you have an account with us?"],
        ["M", "Yes, I've had a checking account here for six years."],
        ["W", "Great. Please fill out this application and sign at the bottom. We'll give you an answer within two days."],
      ],
      q: [
        Q("Why is the man at the bank?", ["To get a car loan", "To open an account", "To close an account", "To change money"], 0,
          "“I'd like to take out a loan to buy a car.”"),
        Q("How much can the man pay as a down payment?", ["$15,000", "$3,000", "$6,000", "$1,500"], 1,
          "“I can make a down payment of three thousand.”"),
        Q("When will the man get an answer?", ["Today", "Next week", "Within two days", "In six days"], 2,
          "“We'll give you an answer within two days.”"),
      ],
    },
    speak: {
      q: ["Do you prefer online banking or going to a bank branch? Explain why.",
        "What advice would you give a young person who wants to save money?"],
    },
    write: {
      s: [["borrow", "Viết câu về việc vay tiền hoặc mượn đồ."],
        ["cautious", "Viết câu khuyên ai đó thận trọng khi dùng thẻ ngân hàng."],
        ["transaction", "Viết câu về một giao dịch lạ trên tài khoản của bạn."]],
      email: {
        task: "Bạn thấy một giao dịch lạ trong tài khoản. Viết email cho ngân hàng báo sự việc và đề nghị kiểm tra.",
        use: ["transaction", "balance", "deduct"],
        sample: "Dear First City Bank,\n\nThis morning I checked my balance online and noticed a transaction that I did not make. On May 3, $250 was deducted from my account for a purchase at an online electronics store. I still have my card, and I have never shopped at that store. Could you please investigate this and block my card if necessary?\n\nThank you for your quick help.\n\nSincerely,\nKhanh Do",
      },
    },
  });

  add(22, {
    read: {
      type: "E-mail", title: "Preparing for the annual audit",
      text: `To: Accounting team
From: Rachel Kim, Finance Director
Subject: Audit next month

Dear team,

The external auditors will visit our office from April 7 to 11. Before they arrive, please reconcile all bank statements for the past year and make sure every client invoice has been recorded.

We had a profitable year, with turnover rising by 12%. However, our outstanding debt has also grown, mainly because we bought new assets for the factory. The auditors will want to see clear records of these purchases.

Some of you have accumulated a lot of paperwork over the year. Please organize your files by March 31. If you need help, ask Brian, who has been building up our new digital accounting system.

Finally, I'd like to thank everyone for staying within budget this year. This is an excellent result.

Best regards,
Rachel`,
      q: [
        Q("What is the purpose of the e-mail?", ["To announce a new budget", "To prepare staff for an audit", "To hire new accountants", "To report a loss"], 1,
          "Chuẩn bị cho đợt kiểm toán tháng sau."),
        Q("Why has the company's debt increased?", ["Sales fell", "Clients paid late", "It bought new assets", "It opened new offices"], 2,
          "“our outstanding debt has also grown, mainly because we bought new assets for the factory.”"),
        Q("Who can help staff organize their files?", ["Brian", "Rachel", "The auditors", "A client"], 0,
          "“ask Brian, who has been building up our new digital accounting system.”"),
        Q("What does Rachel thank the team for?", ["Working overtime", "Finding new clients", "Passing the audit", "Staying within budget"], 3,
          "“thank everyone for staying within budget this year.”"),
      ],
    },
    listen: {
      title: "A client who hasn't paid",
      lines: [
        ["W", "Have we received payment from Pacific Hotels yet?"],
        ["M", "No. Their invoice has been outstanding for sixty days now."],
        ["W", "That's too long. They're one of our biggest clients."],
        ["M", "I sent two reminders, but nobody replied."],
        ["W", "Let's call their accounting manager directly this afternoon."],
        ["M", "Good idea. I'll find her number."],
      ],
      q: [
        Q("What problem are the speakers discussing?", ["A client has not paid", "A budget is too small", "An audit failed", "A hotel booking was lost"], 0,
          "Hoá đơn của Pacific Hotels chưa được thanh toán 60 ngày."),
        Q("What has the man already done?", ["Called the client", "Sent two reminders", "Visited the hotel", "Cancelled the contract"], 1,
          "“I sent two reminders, but nobody replied.”"),
        Q("What will they do this afternoon?", ["Send another e-mail", "Meet the director", "Call the client's accounting manager", "Prepare a new invoice"], 2,
          "“Let's call their accounting manager directly this afternoon.”"),
      ],
    },
    speak: {
      q: ["How do you keep track of your personal spending? Do you use a budget?",
        "Would you like to work in accounting? Why or why not?"],
    },
    write: {
      s: [["budget", "Viết câu về ngân sách cho một dự án hoặc chuyến đi."],
        ["client", "Viết câu về một khách hàng quan trọng."],
        ["profitable", "Viết câu về một hoạt động kinh doanh có lãi."]],
      email: {
        task: "Viết email lịch sự nhắc một khách hàng thanh toán hoá đơn đã quá hạn.",
        use: ["client", "outstanding", "invoice"],
        sample: "Dear Ms. Chen,\n\nWe value Pacific Hotels as one of our most important clients. According to our records, invoice no. 2231 for $4,800 has been outstanding since March 1. We may have missed your payment, so please let us know if it has already been sent. If not, we would appreciate payment by the end of this month.\n\nThank you for your cooperation.\n\nBest regards,\nRachel Kim",
      },
    },
  });

  add(23, {
    read: {
      type: "Article", title: "Investing for beginners",
      text: `Many young workers want to invest but don't know where to start. Financial adviser Peter Lam says the most important thing is the right attitude.

"Investing is a long-term commitment," he explains. "If you pull out of the market every time prices fall, you will lose money." He recommends that beginners build a portfolio that includes both conservative investments, such as government bonds, and a small number of more aggressive ones, such as shares in new technology companies.

Mr. Lam also suggests investing through a fund. Funds collect money from many people and are managed by professionals, so they reduce the risk for individuals.

"Use your resources wisely," he adds. "Never commit money that you might need in the next two years. And remember that a high return usually means a higher risk."`,
      q: [
        Q("According to Mr. Lam, what is most important for beginners?", ["Having a lot of money", "Having the right attitude", "Choosing aggressive investments", "Reading the news daily"], 1,
          "“the most important thing is the right attitude.”"),
        Q("What happens if investors pull out every time prices fall?", ["They make more money", "They pay lower fees", "They lose money", "They reduce their risk"], 2,
          "“you will lose money.”"),
        Q("Why does Mr. Lam suggest investing through a fund?", ["It reduces risk for individuals", "It guarantees a high return", "It has no fees", "It is only for experts"], 0,
          "“they reduce the risk for individuals.”"),
        Q("What money should people NOT invest?", ["Money from a bonus", "Money in a savings account", "Money from their parents", "Money they may need within two years"], 3,
          "“Never commit money that you might need in the next two years.”"),
      ],
    },
    listen: {
      title: "Advice from a financial adviser",
      lines: [
        ["W", "I've saved about ten thousand dollars. Should I invest it?"],
        ["M", "That depends. When will you need the money?"],
        ["W", "Not for at least five years. I'm saving for a house."],
        ["M", "Then I'd suggest a fairly conservative fund. It won't give a huge return, but it's safer."],
        ["W", "What about technology shares? My friend made a lot of money last year."],
        ["M", "They're more aggressive. Maybe put a small part there, but not everything."],
      ],
      q: [
        Q("What is the woman saving for?", ["A house", "A car", "A vacation", "Her education"], 0,
          "“I'm saving for a house.”"),
        Q("What does the man recommend?", ["Keeping cash at home", "A fairly conservative fund", "Only technology shares", "Borrowing more money"], 1,
          "“I'd suggest a fairly conservative fund.”"),
        Q("What does the man say about technology shares?", ["They are the safest", "She should avoid them completely", "She could invest a small part in them", "They always lose money"], 2,
          "“Maybe put a small part there, but not everything.”"),
      ],
    },
    speak: {
      q: ["If you had $10,000 to invest, what would you do with it? Explain.",
        "Do you think young people should start investing early? Why?"],
    },
    write: {
      s: [["invest", "Viết câu về việc đầu tư thời gian hoặc tiền bạc."],
        ["long-term", "Viết câu về một mục tiêu dài hạn của bạn."],
        ["wise", "Viết câu về một quyết định khôn ngoan."]],
      email: {
        task: "Viết email cho một chuyên viên tư vấn tài chính, giới thiệu tình hình của bạn và xin lời khuyên đầu tư.",
        use: ["invest", "long-term", "conservative"],
        sample: "Dear Mr. Lam,\n\nI am 27 years old and have saved about $10,000. I would like to invest this money, but I have no experience. My goal is long-term: I hope to buy an apartment in five or six years. I prefer conservative investments because I do not want to take big risks. Could we meet next week to discuss my options?\n\nThank you in advance.\n\nBest regards,\nQuynh",
      },
    },
  });

  add(24, {
    read: {
      type: "Notice", title: "Tax season reminders",
      text: `The tax filing deadline this year is April 15. To avoid a penalty, make sure your return arrives on time.

Before you fill out the forms, prepare the following documents: your income statement from your employer, receipts for medical costs, and records of any charitable gifts. Your employer will have already withheld part of your salary for taxes each month. If too much was withheld, you will receive a refund. If not enough was withheld, you will owe the difference.

Married couples may choose to file a joint return. In many cases, this lowers the amount of tax a family must pay. If your spouse works abroad, special rules may apply.

You can calculate your tax online with the free tool on our website. Do not give up if the forms seem difficult — our help line is open every weekday from 8 a.m. to 8 p.m.`,
      q: [
        Q("What happens if a tax return is late?", ["Nothing", "A penalty may be charged", "The refund doubles", "The form is sent back"], 1,
          "“To avoid a penalty, make sure your return arrives on time.”"),
        Q("When will a taxpayer receive a refund?", ["When they file early", "When they are married", "When too much tax was withheld", "When they use the online tool"], 2,
          "“If too much was withheld, you will receive a refund.”"),
        Q("What can married couples do?", ["File a joint return", "Skip the deadline", "Pay no tax", "Withhold their own salary"], 0,
          "“Married couples may choose to file a joint return.”"),
        Q("When is the help line open?", ["24 hours a day", "Weekends only", "Until April 15 only", "Weekdays from 8 a.m. to 8 p.m."], 3,
          "“open every weekday from 8 a.m. to 8 p.m.”"),
      ],
    },
    listen: {
      title: "Tax forms",
      lines: [
        ["M", "Have you filed your taxes yet? The deadline is next Tuesday."],
        ["W", "Not yet. I started filling out the forms, but they're so confusing."],
        ["M", "You should try the online calculator. It does most of the work for you."],
        ["W", "Really? I didn't know about that."],
        ["M", "I used it last year and got a refund in two weeks."],
        ["W", "I'll try it tonight, then. I don't want to pay a penalty."],
      ],
      q: [
        Q("When is the tax deadline?", ["Next Tuesday", "Tonight", "In two weeks", "Next month"], 0,
          "“The deadline is next Tuesday.”"),
        Q("What problem does the woman have?", ["She lost her forms", "The forms are confusing", "She owes a lot of money", "Her computer is broken"], 1,
          "“they're so confusing.”"),
        Q("What does the man suggest?", ["Hiring an accountant", "Asking for more time", "Using an online calculator", "Calling the tax office"], 2,
          "“You should try the online calculator.”"),
      ],
    },
    speak: {
      q: ["How are taxes collected from workers in your country?",
        "What are taxes used for? Do you think people should pay more or less tax? Explain."],
    },
    write: {
      s: [["deadline", "Viết câu về một hạn chót bạn phải hoàn thành."],
        ["fill out", "Viết câu hướng dẫn điền vào một mẫu đơn."],
        ["refund", "Viết câu về việc được hoàn tiền."]],
      email: {
        task: "Viết email cho phòng kế toán công ty, nhờ họ gửi giấy xác nhận thu nhập để bạn khai thuế trước hạn chót.",
        use: ["deadline", "file", "prepare"],
        sample: "Dear Accounting Department,\n\nI am preparing my tax return and need my income statement for last year. The deadline to file is April 15, and I would like to finish the forms early to avoid any problems. Could you please send me the statement by e-mail or leave a copy at reception by the end of this week?\n\nThank you very much.\n\nBest regards,\nTrung Le, Sales Department",
      },
    },
  });

  add(25, {
    read: {
      type: "Report summary", title: "Third-quarter financial results",
      text: `Overall, the third quarter was a good period for Sunrise Electronics. Sales reached $18 million, which was 6% above our target and higher than the typical level for this season.

Our projected profit for the year is now $9 million. However, we want to keep a realistic perspective. Part of the growth came from a single large order from a hotel chain, which may not happen again.

The detailed report also shows that the new line of smart speakers did not yield the desired results in Europe. Customers there complained that the instructions were difficult to understand, partly because of a poor translation. The marketing team is now preparing new materials.

For the fourth quarter, we forecast sales of $20 million. Management believes this figure is achievable if the holiday season is as strong as last year.`,
      q: [
        Q("How did third-quarter sales compare with the target?", ["They were 6% lower", "They were 6% higher", "They were the same", "They were 20% higher"], 1,
          "“6% above our target”."),
        Q("Why does the company want to be realistic?", ["Costs are rising", "A competitor is growing", "Some growth came from one large order", "The holiday season was weak"], 2,
          "“Part of the growth came from a single large order... which may not happen again.”"),
        Q("What problem did the smart speakers have in Europe?", ["The instructions were poorly translated", "They were too expensive", "They broke easily", "They arrived late"], 0,
          "Hướng dẫn khó hiểu “partly because of a poor translation.”"),
        Q("What is the sales forecast for the fourth quarter?", ["$9 million", "$18 million", "$6 million", "$20 million"], 3,
          "“we forecast sales of $20 million.”"),
      ],
    },
    listen: {
      title: "Discussing the sales forecast",
      lines: [
        ["W", "Did you see the sales forecast for next year? Fifteen percent growth."],
        ["M", "I did. I don't think that's realistic."],
        ["W", "Why not? We grew twelve percent this year."],
        ["M", "Yes, but most of that came from one big customer. Typical growth for us is about five percent."],
        ["W", "Good point. Maybe we should set a lower target and explain the reasons in detail."],
        ["M", "I agree. Let's bring it up at the meeting on Monday."],
      ],
      q: [
        Q("What does the man think of the forecast?", ["It is not realistic", "It is too low", "It is perfect", "It is not detailed enough"], 0,
          "“I don't think that's realistic.”"),
        Q("What is the company's typical growth?", ["Fifteen percent", "About five percent", "Twelve percent", "Twenty percent"], 1,
          "“Typical growth for us is about five percent.”"),
        Q("What will the speakers do on Monday?", ["Meet a big customer", "Publish the report", "Discuss the target at a meeting", "Hire an analyst"], 2,
          "“Let's bring it up at the meeting on Monday.”"),
      ],
    },
    speak: {
      q: ["What is one goal you have for this year? Is it realistic? How will you reach it?",
        "Why do companies make forecasts? What happens if a forecast is wrong?"],
    },
    write: {
      s: [["forecast", "Viết câu về dự báo thời tiết hoặc doanh thu."],
        ["realistic", "Viết câu về một kế hoạch thực tế."],
        ["target", "Viết câu về một chỉ tiêu bán hàng."]],
      email: {
        task: "Viết email cho sếp tóm tắt kết quả kinh doanh tháng này của nhóm bạn so với chỉ tiêu.",
        use: ["target", "overall", "forecast"],
        sample: "Dear Mr. Tan,\n\nHere is a short summary of our team's results for June. Overall, we sold 1,250 units, which is 4% above our monthly target. Sales of our smart speakers were especially strong in the south. However, online sales were lower than expected. For July, we forecast similar results, as many customers will be on vacation.\n\nThe full report is attached.\n\nBest regards,\nPhuong",
      },
    },
  });

  add(26, {
    read: {
      type: "Memo", title: "Office move: new floor plan",
      text: `To: All staff
From: Facilities Department

Next month, several departments will move up to the newly renovated fifth floor. The design team will sit adjacent to the marketing team to encourage collaboration on projects.

The new layout has an open plan, but we have also created six quiet rooms for staff who need to concentrate. We believe this mix will be more conducive to productive work.

We are open to suggestions about how to use the shared space near the elevator lobby. Staff can opt to join a planning group, which will meet on Thursday at noon.

Please note that the move may disrupt normal work for one or two days. To avoid hampering important projects, managers should check deadlines before choosing a moving date.

Finally, some staff have reported that loud phone calls in open areas are inconsiderate to others. Please use the quiet rooms for long calls. All new rules will be under scrutiny during the first three months.`,
      q: [
        Q("Why will the design team sit next to the marketing team?", ["To save space", "To encourage collaboration", "To be near the elevator", "To reduce noise"], 1,
          "“to encourage collaboration on projects.”"),
        Q("What are the quiet rooms for?", ["Eating lunch", "Storing equipment", "Concentrating and long calls", "Meeting clients"], 2,
          "Phòng yên tĩnh dành cho người cần tập trung và cho cuộc gọi dài."),
        Q("What can staff do on Thursday at noon?", ["Join a planning group", "Visit the fifth floor", "Move their desks", "Meet the new manager"], 0,
          "“Staff can opt to join a planning group, which will meet on Thursday at noon.”"),
        Q("What should managers do before choosing a moving date?", ["Ask the facilities team", "Order new furniture", "Inform clients", "Check project deadlines"], 3,
          "“managers should check deadlines before choosing a moving date.”"),
      ],
    },
    listen: {
      title: "A noisy office",
      lines: [
        ["M", "I'm finding it hard to concentrate since we moved to the open office."],
        ["W", "Me too. The sales team next to us is on the phone all day."],
        ["M", "Do you think we could ask for a quieter area?"],
        ["W", "Maybe. The facilities manager said she's open to suggestions."],
        ["M", "Let's write to her together. We could ask to move near the windows on the other side."],
        ["W", "Good idea. I'll draft the e-mail this afternoon."],
      ],
      q: [
        Q("What problem are the speakers discussing?", ["Their office is noisy", "Their office is too cold", "They have too many meetings", "Their computers are slow"], 0,
          "Văn phòng mở ồn ào, khó tập trung."),
        Q("Who is near the speakers?", ["The design team", "The sales team", "The manager", "Visitors"], 1,
          "“The sales team next to us is on the phone all day.”"),
        Q("What will the woman do this afternoon?", ["Move her desk", "Call the sales team", "Write an e-mail", "Buy headphones"], 2,
          "“I'll draft the e-mail this afternoon.”"),
      ],
    },
    speak: {
      q: ["Describe your ideal workspace. What makes it conducive to good work?",
        "Do you prefer working in an open office or a private room? Why?"],
    },
    write: {
      s: [["concentrate", "Viết câu về điều giúp bạn tập trung."],
        ["disrupt", "Viết câu về một sự việc làm gián đoạn công việc."],
        ["collaboration", "Viết câu về sự hợp tác giữa hai phòng ban."]],
      email: {
        task: "Viết email cho quản lý cơ sở vật chất, góp ý về tiếng ồn trong văn phòng mở và đề xuất một giải pháp.",
        use: ["concentrate", "disrupt", "open to"],
        sample: "Dear Ms. Grant,\n\nSince our team moved to the fifth floor, it has been difficult to concentrate. Phone calls from the area near the lobby often disrupt our work, especially when we are writing reports. I know you are open to suggestions, so I would like to propose adding a few glass panels between the two areas.\n\nThank you for considering this idea.\n\nBest regards,\nHieu",
      },
    },
  });

  add(27, {
    read: {
      type: "Minutes", title: "Board meeting summary — May 6",
      text: `The board met on May 6 to review progress on the company's goals for the year. The chairperson reminded members to adhere to the agenda, as last month's meeting had been too lengthy.

The first matter was the new factory in Binh Duong. Construction is on schedule, and the board agreed to go ahead with the second phase in July.

Next, the finance director brought up the issue of rising energy costs. Members agreed that reducing waste in production should be a top priority. A committee will report on possible solutions at the next meeting.

Finally, the board discussed how often it should meet. Members decided to review the company's strategy periodically, every three months, instead of every month.

The meeting concluded at 11:45 a.m. The next meeting will be held on August 5.`,
      q: [
        Q("Why did the chairperson ask members to follow the agenda?", ["New members had joined", "The last meeting was too long", "The room was booked", "A report was missing"], 1,
          "“as last month's meeting had been too lengthy.”"),
        Q("What did the board decide about the new factory?", ["To stop construction", "To find a new location", "To continue with the second phase", "To sell it"], 2,
          "“the board agreed to go ahead with the second phase in July.”"),
        Q("What was made a top priority?", ["Reducing waste in production", "Hiring new staff", "Raising prices", "Building a second factory"], 0,
          "“reducing waste in production should be a top priority.”"),
        Q("How often will the board review the strategy?", ["Every month", "Every week", "Once a year", "Every three months"], 3,
          "“periodically, every three months”."),
      ],
    },
    listen: {
      title: "Before the meeting",
      lines: [
        ["W", "Have you seen the agenda for this afternoon's meeting?"],
        ["M", "Yes. There are seven items. It's going to be a lengthy one."],
        ["W", "I want to bring up the delay in the website project. Is there time?"],
        ["M", "It's not on the agenda, but you could mention it at the end under other matters."],
        ["W", "Okay. I'll keep it short."],
        ["M", "Good. The director wants to finish by four o'clock."],
      ],
      q: [
        Q("What does the man say about the meeting?", ["It will probably be long", "It has been cancelled", "It will be short", "It starts at four"], 0,
          "“It's going to be a lengthy one.”"),
        Q("What does the woman want to discuss?", ["The budget", "A delay in a project", "A new employee", "The agenda"], 1,
          "“the delay in the website project”."),
        Q("When can the woman raise her topic?", ["At the start", "After lunch", "At the end", "At the next meeting"], 2,
          "“you could mention it at the end under other matters.”"),
      ],
    },
    speak: {
      q: ["What makes a meeting effective? Describe a good or bad meeting you have attended.",
        "What is your top priority this month? Why?"],
    },
    write: {
      s: [["agenda", "Viết câu về nội dung chương trình họp."],
        ["priority", "Viết câu về việc ưu tiên hàng đầu của bạn."],
        ["waste", "Viết câu về việc lãng phí thời gian hoặc tài nguyên."]],
      email: {
        task: "Viết email gửi các thành viên nhóm thông báo cuộc họp tuần tới, kèm chương trình họp ngắn gọn.",
        use: ["agenda", "matter", "goal"],
        sample: "Dear team,\n\nOur monthly meeting will take place next Tuesday at 2 p.m. in Room 4. Here is the agenda:\n1. Progress on the website project\n2. Budget for the summer campaign\n3. Other matters\nOur goal is to finish within one hour, so please read the attached report before the meeting.\n\nSee you on Tuesday.\n\nBest,\nNgoc",
      },
    },
  });

  add(28, {
    read: {
      type: "Article", title: "How one clothing brand protects its quality",
      text: `At the factory of BlueLine, a popular clothing brand, every garment is inspected twice before it leaves the building.

"Our customers perceive BlueLine as a high-quality brand," says quality manager Susan Ho. "One defect can damage that image." Inspectors check that each shirt conforms to the company's standards: the stitching must be straight, the colors uniform, and the fabric free of wrinkles.

Items with small problems are repaired. Those with serious defects are thrown out, which costs the company about $50,000 a year. "It's expensive," Ms. Ho admits, "but taking back faulty products from stores costs even more."

The company is also working to enhance its products. Its new line of jackets uses a special material that repels water and dirt. Early sales have been strong.`,
      q: [
        Q("How many times is each garment inspected?", ["Once", "Twice", "Three times", "Only when there is a complaint"], 1,
          "“every garment is inspected twice”."),
        Q("What is NOT mentioned as a quality standard?", ["Straight stitching", "Uniform colors", "Low price", "No wrinkles"], 2,
          "Tiêu chuẩn gồm đường may thẳng, màu đều, không nhăn — không nhắc đến giá rẻ."),
        Q("What happens to garments with serious defects?", ["They are thrown out", "They are sold at a discount", "They are sent to stores", "They are given to staff"], 0,
          "“Those with serious defects are thrown out”."),
        Q("What is special about the new jackets?", ["They are cheaper", "They are handmade", "They come in more sizes", "They repel water and dirt"], 3,
          "“a special material that repels water and dirt.”"),
      ],
    },
    listen: {
      title: "A quality problem",
      lines: [
        ["M", "We've had three customers return the same shirt this week."],
        ["W", "What's wrong with it?"],
        ["M", "The color fades after one wash. It doesn't conform to our standards."],
        ["W", "Then we should take back the whole batch from the stores."],
        ["M", "That's about two thousand shirts."],
        ["W", "I know, but our brand is more important. I'll contact the factory to find out what went wrong."],
      ],
      q: [
        Q("What is the problem with the shirts?", ["The color fades", "The size is wrong", "The buttons fall off", "The price is wrong"], 0,
          "“The color fades after one wash.”"),
        Q("What does the woman suggest?", ["Lowering the price", "Taking back the whole batch", "Ignoring the problem", "Selling them online"], 1,
          "“we should take back the whole batch from the stores.”"),
        Q("What will the woman do next?", ["Call the customers", "Visit the stores", "Contact the factory", "Design a new shirt"], 2,
          "“I'll contact the factory to find out what went wrong.”"),
      ],
    },
    speak: {
      q: ["Describe a product you bought that had a defect. What did you do?",
        "Which brand do you trust the most? Why?"],
    },
    write: {
      s: [["brand", "Viết câu về một thương hiệu bạn yêu thích."],
        ["defect", "Viết câu mô tả một lỗi sản phẩm."],
        ["inspect", "Viết câu về việc kiểm tra hàng trước khi giao."]],
      email: {
        task: "Bạn là quản lý cửa hàng. Viết email cho nhà sản xuất báo rằng một lô áo bị lỗi và yêu cầu họ nhận lại hàng.",
        use: ["defect", "garment", "take back"],
        sample: "Dear BlueLine,\n\nLast week we received 200 shirts from your company. Unfortunately, many of them have a defect: the color fades after the first wash. Three customers have already returned these garments. We would like you to take back the whole batch and send us replacement shirts as soon as possible.\n\nPlease let me know how to return the goods.\n\nBest regards,\nTuan, City Fashion Store",
      },
    },
  });

  add(29, {
    read: {
      type: "Press release", title: "NovaHome launches self-cleaning window",
      text: `After nearly a decade of research, NovaHome today announced its first self-cleaning window.

The project began when engineers examined why windows in big cities get dirty so quickly. Through a systematic series of experiments, they found a coating that breaks down dirt when exposed to sunlight. "The solution seemed logical," said project supervisor Dr. Anna Park, "but it took years to make it work outside the laboratory."

Before launching the product, the company ascertained that the coating is safe for people and the environment. Independent testers examined the windows in hot, cold, and rainy climates.

NovaHome assumes that the product will be popular with office buildings, where cleaning windows is expensive and dangerous. Dr. Park admits she was anxious before the launch. "This was my responsibility for nine years. I'm very proud of the team."`,
      q: [
        Q("How long did the research take?", ["About one year", "Nearly ten years", "Two decades", "Five years"], 1,
          "“After nearly a decade of research” — gần 10 năm."),
        Q("How does the coating work?", ["It is cleaned by rain only", "It needs special soap", "It breaks down dirt in sunlight", "It changes color"], 2,
          "“a coating that breaks down dirt when exposed to sunlight.”"),
        Q("What did the company check before the launch?", ["That the coating is safe", "That the price is low", "That stores will sell it", "That competitors had none"], 0,
          "“the company ascertained that the coating is safe for people and the environment.”"),
        Q("Who does NovaHome expect to buy the product?", ["Schools", "Car makers", "Homeowners in villages", "Office buildings"], 3,
          "“popular with office buildings, where cleaning windows is expensive and dangerous.”"),
      ],
    },
    listen: {
      title: "Testing a new product",
      lines: [
        ["W", "How are the tests on the new phone battery going?"],
        ["M", "Better than expected. It lasts two full days on one charge."],
        ["W", "That's great. Have you examined how it performs in cold weather?"],
        ["M", "Not yet. That experiment starts next week."],
        ["W", "Please send me the results as soon as you have them. The supervisor wants a report by the end of the month."],
        ["M", "No problem."],
      ],
      q: [
        Q("What product are they testing?", ["A phone battery", "A laptop", "A heater", "A camera"], 0,
          "“the new phone battery”."),
        Q("How long does the battery last?", ["One day", "Two days", "One week", "Ten hours"], 1,
          "“It lasts two full days on one charge.”"),
        Q("What will happen next week?", ["The product will launch", "The report will be sent", "A cold-weather test will start", "The supervisor will visit"], 2,
          "“That experiment starts next week.”"),
      ],
    },
    speak: {
      q: ["Describe a product you think should be invented. What problem would it solve?",
        "Why do some new products fail even after years of research?"],
    },
    write: {
      s: [["research", "Viết câu về một nghiên cứu bạn thấy thú vị."],
        ["solve", "Viết câu về cách bạn giải quyết một vấn đề."],
        ["responsibility", "Viết câu về trách nhiệm của bạn trong công việc."]],
      email: {
        task: "Bạn là trưởng nhóm phát triển sản phẩm. Viết email báo cáo tiến độ thử nghiệm một sản phẩm mới cho cấp trên.",
        use: ["experiment", "research", "examine"],
        sample: "Dear Dr. Park,\n\nI am writing to update you on our battery project. Last week we finished the first two experiments, and the results are very positive: the battery lasts two days on one charge. Next week we will examine how it performs in cold weather. Our research team expects to complete all tests by June 20.\n\nI will send you a full report then.\n\nBest regards,\nBao",
      },
    },
  });

  add(30, {
    read: {
      type: "Advertisement", title: "Office space for lease — Harbor Tower",
      text: `Modern offices are now available for lease at Harbor Tower, just five minutes from the central train station.

Due to high demand, occupancy has reached 90%, so only six units remain. Units range from 40 to 200 square meters, and all are in excellent condition.

Not sure about a long contract? We understand that business circumstances can change. That's why we offer flexible options: you can sign a one-year lease, or lock into a five-year lease at a lower monthly rate. Tenants on one-year contracts can get out of the agreement with three months' notice.

Rents in the area have fluctuated over the past two years, but most indicators suggest they will rise next year. If you are apprehensive about future increases, a long lease protects you.

All offers are subject to a credit check. Call Lily Tran at 555-0177 to arrange a viewing.`,
      q: [
        Q("Why are only six units available?", ["The building is old", "Occupancy is very high", "The rest are being repaired", "The rent is very low"], 1,
          "“occupancy has reached 90%, so only six units remain.”"),
        Q("What is an advantage of a five-year lease?", ["No credit check", "Free parking", "A lower monthly rate", "A larger office"], 2,
          "“lock into a five-year lease at a lower monthly rate.”"),
        Q("How can tenants on a one-year lease end it early?", ["By giving three months' notice", "By paying a large fee", "By finding a new tenant", "They cannot end it early"], 0,
          "“can get out of the agreement with three months' notice.”"),
        Q("What do indicators suggest about rents?", ["They will fall", "They will stay the same", "They have stopped changing", "They will rise"], 3,
          "“most indicators suggest they will rise next year.”"),
      ],
    },
    listen: {
      title: "Looking at an apartment",
      lines: [
        ["W", "The apartment is lovely, but I'm a little apprehensive about signing a two-year lease."],
        ["M", "Why is that?"],
        ["W", "My company might transfer me to another city next year."],
        ["M", "In that case, there's an option to get out of the lease early with two months' notice."],
        ["W", "Is there a fee?"],
        ["M", "Only one month's rent. It's all written in the contract."],
      ],
      q: [
        Q("Why is the woman worried about the lease?", ["She may move to another city", "The rent is too high", "The apartment is small", "She doesn't like the area"], 0,
          "“My company might transfer me to another city next year.”"),
        Q("How much notice is needed to end the lease early?", ["One month", "Two months", "Three months", "Six months"], 1,
          "“get out of the lease early with two months' notice.”"),
        Q("What is the fee for leaving early?", ["There is no fee", "Two months' rent", "One month's rent", "Half a month's rent"], 2,
          "“Only one month's rent.”"),
      ],
    },
    speak: {
      q: ["Describe the place where you live. What do you like and dislike about it?",
        "Is it better to rent or to buy a home in your city? Give reasons."],
    },
    write: {
      s: [["lease", "Viết câu về hợp đồng thuê nhà hoặc văn phòng."],
        ["condition", "Viết câu mô tả tình trạng của một căn phòng."],
        ["option", "Viết câu nêu các lựa chọn bạn có."]],
      email: {
        task: "Bạn quan tâm đến văn phòng cho thuê ở quảng cáo trên. Viết email hỏi thêm thông tin và hẹn ngày đến xem.",
        use: ["lease", "option", "condition"],
        sample: "Dear Ms. Tran,\n\nI saw your advertisement for office space at Harbor Tower. My company needs an office of about 80 square meters for twelve staff. Could you tell me the monthly rent for a one-year lease and for the five-year option? I would also like to check the condition of the units. Would it be possible to arrange a viewing next Wednesday afternoon?\n\nI look forward to your reply.\n\nBest regards,\nDung Pham",
      },
    },
  });
})();
