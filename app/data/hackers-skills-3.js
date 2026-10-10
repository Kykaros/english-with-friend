/* Nội dung luyện 4 kỹ năng cho Hackers TOEIC Vocabulary — Day 21–30. Nội dung viết mới. */
(function () {
  const Q = (q, o, a, why) => ({ q, o, a, why });
  const add = (id, data) => EWF.addSkills("hackers", id, data);

  add(21, {
    read: {
      type: "Business news", title: "Two software firms announce merger",
      text: `Codewise and BrightApps, two of the country's leading software companies, announced yesterday that they will merge by the end of the year. The new company will be one of the largest competitors in the region.

According to the announcement, the merger will help both firms reach more customers and enhance productivity. The combined company plans to relocate its headquarters to a larger office in Ho Chi Minh City.

Analysts say the deal makes sense. "Both firms have valuable assets, and their products are very different," said one renowned economist. "Together, they will have a clear edge in the market."

Some employees are uncertain about their future, but the new CEO said no jobs will be cut in the first year. Details of the deal will be revealed at a press conference next week.`,
      q: [
        Q("What did the two companies announce?", ["A new product", "A merger", "A price cut", "Job cuts"], 1,
          "“they will merge by the end of the year.”"),
        Q("Where will the new headquarters be?", ["In Hanoi", "In Ho Chi Minh City", "In Singapore", "It has not been decided"], 1,
          "“relocate its headquarters to a larger office in Ho Chi Minh City.”"),
        Q("Why do analysts think the deal makes sense?", ["The firms have different products and valuable assets", "Both companies are losing money", "The government asked for it", "Prices will fall"], 0,
          "“Both firms have valuable assets, and their products are very different”."),
        Q("What did the new CEO promise?", ["Higher salaries", "A new office in every city", "Free training", "No job cuts in the first year"], 3,
          "“no jobs will be cut in the first year.”"),
      ],
    },
    listen: {
      title: "Talking about the merger",
      lines: [
        ["W", "Did you hear that our company is merging with BrightApps?"],
        ["M", "Yes, it was announced this morning. I'm a bit uncertain about what will happen."],
        ["W", "The CEO said nobody will lose their job this year."],
        ["M", "That's good. Will we have to move to a new office?"],
        ["W", "Probably. They plan to relocate headquarters next spring."],
        ["M", "Well, a bigger office would be nice."],
      ],
      q: [
        Q("What are the speakers discussing?", ["A company merger", "A new client", "A holiday", "A training course"], 0,
          "Việc công ty sáp nhập với BrightApps."),
        Q("How does the man feel at first?", ["Excited", "Uncertain", "Angry", "Bored"], 1,
          "“I'm a bit uncertain about what will happen.”"),
        Q("When will the headquarters probably move?", ["Next week", "Next month", "Next spring", "In two years"], 2,
          "“They plan to relocate headquarters next spring.”"),
      ],
    },
    speak: {
      q: ["What are the advantages and disadvantages of two companies merging?",
        "Describe a business that has grown quickly in your city."],
    },
    write: {
      s: [["announce", "Viết câu về một thông báo quan trọng của công ty."],
        ["expansion", "Viết câu về việc mở rộng kinh doanh."],
        ["competitor", "Viết câu về đối thủ cạnh tranh của một công ty."]],
      email: {
        task: "Bạn là trưởng phòng. Viết email gửi nhân viên thông báo về việc sáp nhập công ty và trấn an họ.",
        use: ["announce", "merge", "relocate"],
        sample: "Dear team,\n\nAs you may know, the company announced today that we will merge with BrightApps at the end of the year. I understand some of you may be worried. Please be assured that no jobs will be cut in the first year. We will probably relocate to a larger office next spring, and I will share more details as soon as I receive them.\n\nBest regards,\nHoa",
      },
    },
  });

  add(22, {
    read: {
      type: "Minutes", title: "Summary of the March staff meeting",
      text: `The monthly staff meeting was convened on March 5 and presided over by Ms. Grant. Due to time constraints, only three items on the agenda were discussed.

First, Mr. Kumar reported on the second phase of the office renovation, which is undergoing final inspection. The meeting room will reopen on March 20.

Second, staff discussed a suggestion to reschedule weekly meetings from Monday to Wednesday. After some discussion, there was a general consensus that Wednesday would be better, and the change was approved unanimously.

Third, Ms. Grant emphasized the importance of constructive feedback in performance reviews. She asked managers to organize short training sessions.

The remaining items were deferred until April. The meeting was adjourned at 11:30 a.m. Ms. Lee recorded the minutes.`,
      q: [
        Q("Who led the meeting?", ["Mr. Kumar", "Ms. Grant", "Ms. Lee", "The CEO"], 1,
          "“presided over by Ms. Grant.”"),
        Q("When will the meeting room reopen?", ["March 5", "March 20", "In April", "Next Wednesday"], 1,
          "“The meeting room will reopen on March 20.”"),
        Q("What was decided about weekly meetings?", ["They will be held on Wednesday", "They will be canceled", "They will be longer", "They will be online"], 0,
          "“there was a general consensus that Wednesday would be better... approved unanimously.”"),
        Q("What happened to the remaining agenda items?", ["They were canceled", "They were discussed quickly", "They were sent by e-mail", "They were deferred until April"], 3,
          "“The remaining items were deferred until April.”"),
      ],
    },
    listen: {
      title: "Rescheduling a meeting",
      lines: [
        ["M", "Sarah, can we reschedule our meeting with the design team?"],
        ["W", "Sure. What's the problem with Thursday?"],
        ["M", "The client wants a presentation that day, so I won't be available."],
        ["W", "How about Friday morning at ten?"],
        ["M", "That works. I'll send the new agenda to everyone today."],
        ["W", "Thanks. And please book the small conference room."],
      ],
      q: [
        Q("Why does the man want to reschedule?", ["He has a client presentation", "He is sick", "The room is booked", "He is traveling"], 0,
          "“The client wants a presentation that day”."),
        Q("When will the new meeting be?", ["Thursday afternoon", "Friday at ten", "Monday morning", "Next week"], 1,
          "“How about Friday morning at ten?” — “That works.”"),
        Q("What does the woman ask the man to do?", ["Call the client", "Prepare slides", "Book a conference room", "Order lunch"], 2,
          "“please book the small conference room.”"),
      ],
    },
    speak: {
      q: ["What makes a meeting productive? Give examples.",
        "Do you prefer meetings in person or online? Explain."],
    },
    write: {
      s: [["agenda", "Viết câu về chương trình cuộc họp."],
        ["reschedule", "Viết câu xin đổi lịch hẹn."],
        ["suggestion", "Viết câu đưa ra đề xuất trong cuộc họp."]],
      email: {
        task: "Viết email thông báo dời cuộc họp nhóm sang ngày khác, nêu lý do và chương trình họp.",
        use: ["reschedule", "agenda", "meeting"],
        sample: "Dear team,\n\nI need to reschedule our weekly meeting from Thursday to Friday at 10 a.m., because I have a client presentation on Thursday. The agenda will stay the same: updates on the website project and the summer budget. The meeting will be held in the small conference room.\n\nThank you for your understanding.\n\nBest,\nTom",
      },
    },
  });

  add(23, {
    read: {
      type: "Notice", title: "New employee benefits program",
      text: `We are pleased to announce changes to our benefits program, which will commence on January 1.

All full-time employees will now receive an annual bonus based on company results. In addition, staff who work overtime will be paid one and a half times their regular salary.

The company also encourages employees to enroll in professional development courses. Up to $500 per year will be reimbursed for courses related to your job. To register, please complete the form on the HR website.

We will host an information session on December 10 to explain the new program. Attendance is not required, but it is recommended. Participants will have the chance to ask questions directly to the HR director.

We are grateful for your hard work and hope these benefits show our appreciation.`,
      q: [
        Q("When will the new benefits start?", ["December 10", "January 1", "Next month", "Immediately"], 1,
          "“which will commence on January 1.”"),
        Q("How will overtime be paid?", ["At the same rate", "One and a half times the regular salary", "Double the regular salary", "With extra vacation"], 1,
          "“paid one and a half times their regular salary.”"),
        Q("How much will be reimbursed for courses?", ["Up to $500 per year", "$100 per course", "The full cost", "Nothing"], 0,
          "“Up to $500 per year will be reimbursed”."),
        Q("What is true about the information session?", ["It is required", "It is online only", "It is for managers only", "It is recommended but optional"], 3,
          "“Attendance is not required, but it is recommended.”"),
      ],
    },
    listen: {
      title: "Signing up for a course",
      lines: [
        ["W", "Did you read about the new benefits program?"],
        ["M", "Yes. I'm thinking of enrolling in an evening English course."],
        ["W", "The company will reimburse up to five hundred dollars, right?"],
        ["M", "That's right. The course costs four hundred, so it's fully covered."],
        ["W", "Lucky you. When does it start?"],
        ["M", "Next month. I'll register on the HR website today."],
      ],
      q: [
        Q("What does the man plan to do?", ["Take an English course", "Apply for a new job", "Work overtime", "Go on vacation"], 0,
          "“enrolling in an evening English course.”"),
        Q("How much does the course cost?", ["$500", "$400", "$100", "$1,000"], 1,
          "“The course costs four hundred”."),
        Q("Where will the man register?", ["At a school", "In person at HR", "On the HR website", "By phone"], 2,
          "“I'll register on the HR website today.”"),
      ],
    },
    speak: {
      q: ["Apart from salary, which benefit would you most like your employer to offer? Why?",
        "Do you think working overtime is a good idea? Explain."],
    },
    write: {
      s: [["enroll", "Viết câu về việc đăng ký một khóa học."],
        ["bonus", "Viết câu về tiền thưởng cuối năm."],
        ["attend", "Viết câu về một sự kiện bạn sẽ tham dự."]],
      email: {
        task: "Viết email cho phòng Nhân sự hỏi về chính sách hoàn tiền học phí và cách đăng ký khóa học.",
        use: ["enroll", "reimbursement", "register"],
        sample: "Dear HR team,\n\nI read about the new benefits program and would like to enroll in an evening English course that starts next month. The course costs $400. Could you tell me how to register for reimbursement and which documents I need to submit? I would also like to know when the money will be paid.\n\nThank you.\n\nBest regards,\nDuc",
      },
    },
  });

  add(24, {
    read: {
      type: "Company newsletter", title: "Congratulations to our new director",
      text: `We are pleased to announce that Maria Lopez has been promoted to Director of Marketing. The board voted unanimously to appoint her after a careful search.

Ms. Lopez joined the company eight years ago as a marketing assistant. Her exceptional performance and dedication quickly earned the praise of her managers. In her most recent position, she led the team that won last year's national advertising award.

"Maria is a competent and skilled leader who encourages everyone on her team," said CEO David Kim. "We have great appreciation for her accomplishments."

Ms. Lopez replaces Robert Hall, who will retire next month after 30 years with the company. Staff are invited to a party on Friday to celebrate both Mr. Hall's retirement and Ms. Lopez's promotion.`,
      q: [
        Q("What is the article about?", ["A new product", "A promotion", "A company merger", "A training program"], 1,
          "Maria Lopez được thăng chức Giám đốc Marketing."),
        Q("What was Ms. Lopez's first job at the company?", ["Marketing director", "Marketing assistant", "Sales manager", "CEO"], 1,
          "“joined the company eight years ago as a marketing assistant.”"),
        Q("What did her team win last year?", ["A national advertising award", "A new client", "A sales contest", "A design competition"], 0,
          "“won last year's national advertising award.”"),
        Q("Why will there be a party on Friday?", ["To welcome new staff", "To launch a product", "To end the year", "To celebrate a retirement and a promotion"], 3,
          "“celebrate both Mr. Hall's retirement and Ms. Lopez's promotion.”"),
      ],
    },
    listen: {
      title: "Good news",
      lines: [
        ["M", "Congratulations, Maria! I just heard about your promotion."],
        ["W", "Thank you, Tom. I'm still a little surprised."],
        ["M", "You deserve it. Your team's performance has been excellent."],
        ["W", "That's kind of you. Everyone worked very hard."],
        ["M", "When do you start your new position?"],
        ["W", "Next month, after Mr. Hall retires."],
      ],
      q: [
        Q("Why does the man congratulate the woman?", ["She was promoted", "She got married", "She won a prize", "She finished a project"], 0,
          "“I just heard about your promotion.”"),
        Q("What does the woman say about her team?", ["It needs more people", "Everyone worked very hard", "It will move offices", "It will be reorganized"], 1,
          "“Everyone worked very hard.”"),
        Q("When will the woman start her new position?", ["Today", "Next week", "Next month", "Next year"], 2,
          "“Next month, after Mr. Hall retires.”"),
      ],
    },
    speak: {
      q: ["What qualities should a good manager have?",
        "How should companies reward employees who perform well?"],
    },
    write: {
      s: [["promote", "Viết câu về việc ai đó được thăng chức."],
        ["evaluate", "Viết câu về việc đánh giá hiệu quả công việc."],
        ["retire", "Viết câu về việc nghỉ hưu của một đồng nghiệp."]],
      email: {
        task: "Viết email chúc mừng một đồng nghiệp được thăng chức và nhắc đến thành tích của họ.",
        use: ["promote", "performance", "accomplishment"],
        sample: "Dear Maria,\n\nCongratulations on being promoted to Director of Marketing! Your performance over the past eight years has been an inspiration to all of us. Winning the national advertising award was a great accomplishment, and I know you will lead the department successfully.\n\nI look forward to working with you in your new role.\n\nWarm regards,\nTom",
      },
    },
  });

  add(25, {
    read: {
      type: "City announcement", title: "Road work on Tran Phu Street",
      text: `The city transportation department announces that Tran Phu Street will be closed between Le Loi and Nguyen Hue Streets from June 1 to June 15 for road repairs.

During the closure, traffic will be diverted along Hai Ba Trung Street. Drivers should expect delays and are encouraged to take public transit or find an alternative route. A detailed map of the detour is available on the city's website.

Parking will be permitted only in designated areas. Vehicles left in the closed section will be towed at the owner's expense, and drivers may also face a fine.

The ongoing project aims to alleviate congestion at the busy intersection near the central bus station. City officials thank residents and commuters for their patience.`,
      q: [
        Q("Why will Tran Phu Street be closed?", ["For a festival", "For road repairs", "For a parade", "Because of flooding"], 1,
          "“closed... for road repairs.”"),
        Q("Where will traffic be sent during the closure?", ["Le Loi Street", "Hai Ba Trung Street", "Nguyen Hue Street", "The highway"], 1,
          "“traffic will be diverted along Hai Ba Trung Street.”"),
        Q("What will happen to cars left in the closed section?", ["They will be towed", "They will get a warning", "They will be moved for free", "Nothing"], 0,
          "“Vehicles left in the closed section will be towed at the owner's expense”."),
        Q("What is the aim of the project?", ["To build a new station", "To widen the sidewalk", "To add parking", "To reduce traffic congestion"], 3,
          "“aims to alleviate congestion at the busy intersection”."),
      ],
    },
    listen: {
      title: "Late for work",
      lines: [
        ["W", "Sorry I'm late. Traffic on Tran Phu Street was terrible."],
        ["M", "Didn't you hear? That street is closed for road work this week."],
        ["W", "No, I didn't. I had to take a long detour."],
        ["M", "You should take the bus tomorrow. It uses a special lane."],
        ["W", "Good idea. Where's the nearest bus stop?"],
        ["M", "Right in front of the bank, across the street."],
      ],
      q: [
        Q("Why was the woman late?", ["Heavy traffic", "Her car broke down", "She overslept", "She missed the bus"], 0,
          "“Traffic on Tran Phu Street was terrible.”"),
        Q("What does the man suggest?", ["Leaving earlier", "Taking the bus", "Working from home", "Driving another car"], 1,
          "“You should take the bus tomorrow.”"),
        Q("Where is the nearest bus stop?", ["Next to the office", "At the station", "In front of the bank", "On Tran Phu Street"], 2,
          "“Right in front of the bank, across the street.”"),
      ],
    },
    speak: {
      q: ["How do you usually commute to work or school? Describe your route.",
        "What can a city do to reduce traffic congestion?"],
    },
    write: {
      s: [["congestion", "Viết câu về tình trạng tắc đường giờ cao điểm."],
        ["commute", "Viết câu về cách bạn đi làm hoặc đi học."],
        ["alternative", "Viết câu đề xuất một phương án khác."]],
      email: {
        task: "Viết email thông báo cho nhân viên về việc đóng đường gần văn phòng và đề xuất cách đi lại khác.",
        use: ["closure", "detour", "public transportation"],
        sample: "Dear all,\n\nPlease note that Tran Phu Street will be closed from June 1 to June 15 for road repairs. Because of the closure, drivers will have to take a detour along Hai Ba Trung Street, and there may be long delays. We recommend using public transportation during this period. Bus number 12 stops right in front of our building.\n\nThank you,\nOffice Administration",
      },
    },
  });

  add(26, {
    read: {
      type: "Bank notice", title: "Changes to your account",
      text: `Dear Customer,

Starting July 1, Urban Bank will introduce several changes to personal accounts.

First, monthly statements will be sent electronically unless you request paper copies. You can check your balance and view every transaction online at any time.

Second, customers can now deposit checks by taking a photo with our mobile app. Withdrawals of up to $1,000 a day can be made at any of our cash machines.

Third, we are lowering interest rates on personal loans by 0.5%. Customers who are interested in a mortgage can speak to an advisor for free.

Please note that overdue payments may result in additional fees. If your account becomes delinquent, it may be temporarily suspended. For identification purposes, please keep your contact information up to date.

Sincerely,
Urban Bank`,
      q: [
        Q("How will monthly statements be sent?", ["By regular mail", "Electronically", "By fax", "They will not be sent"], 1,
          "“monthly statements will be sent electronically”."),
        Q("What new service is mentioned?", ["Depositing checks with a mobile app", "Free credit cards", "Longer opening hours", "Foreign currency exchange"], 0,
          "“deposit checks by taking a photo with our mobile app.”"),
        Q("What will happen to personal loan interest rates?", ["They will rise", "They will stay the same", "They will fall by 0.5%", "They will double"], 2,
          "“lowering interest rates on personal loans by 0.5%.”"),
        Q("What may happen if an account becomes delinquent?", ["It will be closed forever", "It will earn interest", "It will be moved", "It may be temporarily suspended"], 3,
          "“it may be temporarily suspended.”"),
      ],
    },
    listen: {
      title: "At the bank",
      lines: [
        ["M", "Hi, I'd like to open a savings account."],
        ["W", "Certainly. May I see two forms of identification?"],
        ["M", "Here's my passport and my driver's license."],
        ["W", "Thank you. The minimum amount to open an account is fifty dollars."],
        ["M", "No problem. I'd like to deposit two hundred."],
        ["W", "Great. You'll receive your bank card in the mail within a week."],
      ],
      q: [
        Q("What does the man want to do?", ["Open a savings account", "Apply for a loan", "Exchange money", "Close an account"], 0,
          "“I'd like to open a savings account.”"),
        Q("How much will the man deposit?", ["$50", "$200", "$100", "$500"], 1,
          "“I'd like to deposit two hundred.”"),
        Q("When will he receive his bank card?", ["Today", "Tomorrow", "Within a week", "In a month"], 2,
          "“within a week.”"),
      ],
    },
    speak: {
      q: ["Do you prefer online banking or visiting a bank branch? Why?",
        "What advice would you give a young person about saving money?"],
    },
    write: {
      s: [["deposit", "Viết câu về việc gửi tiền vào tài khoản."],
        ["balance", "Viết câu về việc kiểm tra số dư tài khoản."],
        ["loan", "Viết câu về một khoản vay."]],
      email: {
        task: "Bạn thấy một giao dịch lạ trong tài khoản. Viết email cho ngân hàng báo sự việc và đề nghị kiểm tra.",
        use: ["transaction", "account", "balance"],
        sample: "Dear Urban Bank,\n\nWhen I checked my balance online this morning, I noticed a transaction that I did not make. On July 3, $350 was taken from my account for an online purchase. I still have my card with me. Could you please investigate this and block my card if necessary?\n\nThank you for your quick help.\n\nSincerely,\nAnh Tran",
      },
    },
  });

  add(27, {
    read: {
      type: "Financial column", title: "Smart investing for beginners",
      text: `Many young professionals want to invest but don't know where to start. Financial adviser Kevin Ho says the first step is to be cautious and patient.

"Stock market investment is inherently risky," he explains. "Never invest money you may need in the foreseeable future." He suggests that beginners build a portfolio that includes both shares and government bonds, which offer more stability.

Mr. Ho also warns against speculation. "Some people buy shares solely because they heard a rumor. That is not investing; it's gambling."

Property is another option, but buying real estate requires a large amount of money. For those with limited funds, investment funds managed by professionals can be a wise choice.

"The outlook for the economy is positive," Mr. Ho says, "but rapid gains are rare. Investing is a long-term commitment."`,
      q: [
        Q("What is the first step for beginners, according to Mr. Ho?", ["To borrow money", "To be cautious and patient", "To buy property", "To follow rumors"], 1,
          "“the first step is to be cautious and patient.”"),
        Q("Why does Mr. Ho recommend government bonds?", ["They offer more stability", "They are free", "They grow quickly", "They are popular"], 0,
          "“government bonds, which offer more stability.”"),
        Q("What does Mr. Ho say about buying shares because of rumors?", ["It is smart", "It is like gambling", "It is required", "It is the best way to start"], 1,
          "“That is not investing; it's gambling.”"),
        Q("What does he suggest for people with limited funds?", ["Buying property", "Saving cash at home", "Borrowing from a bank", "Investment funds managed by professionals"], 3,
          "“investment funds managed by professionals can be a wise choice.”"),
      ],
    },
    listen: {
      title: "Talking to an adviser",
      lines: [
        ["W", "I've saved about ten thousand dollars. Should I invest it?"],
        ["M", "That depends. Will you need the money soon?"],
        ["W", "Not for at least five years."],
        ["M", "Then I'd suggest a conservative fund with some bonds. It's safer."],
        ["W", "What about technology shares? My friend made a lot of money."],
        ["M", "They're riskier. Put only a small portion there."],
      ],
      q: [
        Q("How much has the woman saved?", ["$10,000", "$5,000", "$1,000", "$50,000"], 0,
          "“about ten thousand dollars.”"),
        Q("What does the man suggest?", ["Buying property", "A conservative fund with bonds", "Only technology shares", "Keeping the money in cash"], 1,
          "“a conservative fund with some bonds.”"),
        Q("What does the man say about technology shares?", ["They are the safest", "She should avoid them completely", "Put only a small portion there", "They always lose money"], 2,
          "“Put only a small portion there.”"),
      ],
    },
    speak: {
      q: ["If you had $10,000 to invest, what would you do with it? Explain.",
        "Is it better to save money or to invest it? Why?"],
    },
    write: {
      s: [["investment", "Viết câu về một khoản đầu tư khôn ngoan."],
        ["cautious", "Viết câu khuyên ai đó thận trọng khi đầu tư."],
        ["portfolio", "Viết câu về danh mục đầu tư."]],
      email: {
        task: "Viết email cho chuyên viên tư vấn tài chính, giới thiệu tình hình tài chính của bạn và xin lời khuyên đầu tư.",
        use: ["investment", "consult", "portfolio"],
        sample: "Dear Mr. Ho,\n\nI would like to consult you about my first investment. I am 28 years old and have saved about $10,000. I won't need this money for at least five years. I would like to build a safe portfolio with some shares and bonds. Could we arrange a meeting next week to discuss my options?\n\nThank you in advance.\n\nBest regards,\nQuynh",
      },
    },
  });

  add(28, {
    read: {
      type: "Advertisement", title: "Apartments for rent at Green Park Residence",
      text: `Green Park Residence offers spacious, fully furnished apartments in a quiet district just ten minutes from downtown.

The building was recently renovated, and all apartments now have new kitchens and air conditioners. A playground and a swimming pool are located adjacent to the main building, making it ideal for families.

Rent includes building maintenance, but utilities are not included. Tenants must sign a lease of at least one year. Several units are currently unoccupied and available immediately.

The residence is managed by an experienced team that regularly checks all facilities. Any repairs requested by tenants are handled within 48 hours.

To arrange a viewing, please contact our leasing office at 555-0177. Our staff will be happy to show you around.`,
      q: [
        Q("Where is Green Park Residence?", ["Downtown", "In a quiet district near downtown", "Near the airport", "In the countryside"], 1,
          "“in a quiet district just ten minutes from downtown.”"),
        Q("What was recently added to all apartments?", ["New kitchens and air conditioners", "Balconies", "Parking spaces", "New furniture"], 0,
          "“all apartments now have new kitchens and air conditioners.”"),
        Q("What is NOT included in the rent?", ["Maintenance", "The swimming pool", "Utilities", "Repairs"], 2,
          "“utilities are not included.”"),
        Q("How quickly are repairs handled?", ["Immediately", "Within a week", "Within a month", "Within 48 hours"], 3,
          "“handled within 48 hours.”"),
      ],
    },
    listen: {
      title: "Looking at an apartment",
      lines: [
        ["W", "This apartment is very spacious. Is it furnished?"],
        ["M", "Yes, it comes with a sofa, beds, and a dining table."],
        ["W", "Great. What about the utilities? Are they included in the rent?"],
        ["M", "No, tenants pay for electricity and water separately."],
        ["W", "I see. How long is the lease?"],
        ["M", "The minimum is one year, but you can renew it after that."],
      ],
      q: [
        Q("What does the woman like about the apartment?", ["It is spacious", "It is cheap", "It is near her office", "It has a garden"], 0,
          "“This apartment is very spacious.”"),
        Q("What must tenants pay separately?", ["Furniture", "Electricity and water", "Cleaning", "Parking"], 1,
          "“tenants pay for electricity and water separately.”"),
        Q("What is the minimum lease?", ["Six months", "Two years", "One year", "Three months"], 2,
          "“The minimum is one year”."),
      ],
    },
    speak: {
      q: ["Describe your ideal home. Where would it be, and what would it look like?",
        "Is it better to rent or to buy a home in your city? Why?"],
    },
    write: {
      s: [["furnished", "Viết câu mô tả một căn hộ có sẵn nội thất."],
        ["renovation", "Viết câu về việc cải tạo một tòa nhà."],
        ["repair", "Viết câu yêu cầu sửa chữa thiết bị trong căn hộ."]],
      email: {
        task: "Viết email cho ban quản lý tòa nhà báo một sự cố trong căn hộ (ví dụ: điều hòa hỏng) và yêu cầu sửa chữa.",
        use: ["repair", "tenant", "maintenance"],
        sample: "Dear Green Park Residence,\n\nI am a tenant in apartment 805. The air conditioner in the bedroom stopped working yesterday, and it is very hot at night. Since repairs are included in the maintenance fee, could you please send a technician as soon as possible? I am at home after 5 p.m. every day.\n\nThank you for your help.\n\nBest regards,\nPhuong Nguyen",
      },
    },
  });

  add(29, {
    read: {
      type: "Article", title: "City launches recycling program",
      text: `The city council has launched a new recycling program to reduce waste and protect the environment. Starting next month, residents must separate plastic, paper, and glass before disposing of their garbage.

Officials say that excessive waste has become a significant problem. Landfills are almost full, and pollutants from burning trash have damaged air quality.

To help residents, the city will provide free recycling bins and a detailed guide. Environmental organizations will also hold workshops in local communities.

Experts believe the program could cut waste by 30 percent within two years. "Recycling conserves natural resources and saves energy," said one environmental scientist. "It is an ideal solution for a growing city."

The council also plans to plant 10,000 trees in parks and along major roads to improve the city's ecology.`,
      q: [
        Q("What must residents do starting next month?", ["Pay a waste fee", "Separate their garbage", "Plant trees", "Attend a workshop"], 1,
          "“residents must separate plastic, paper, and glass”."),
        Q("What problem is mentioned?", ["Landfills are almost full", "There are too many parks", "Water prices are rising", "Roads are crowded"], 0,
          "“Landfills are almost full”."),
        Q("What will the city provide for free?", ["Trees", "Bags", "Recycling bins and a guide", "Bus passes"], 2,
          "“free recycling bins and a detailed guide.”"),
        Q("How much could waste be reduced within two years?", ["10 percent", "20 percent", "50 percent", "30 percent"], 3,
          "“cut waste by 30 percent within two years.”"),
      ],
    },
    listen: {
      title: "Weekend clean-up",
      lines: [
        ["M", "Are you joining the beach clean-up this Saturday?"],
        ["W", "I'd like to, but the weather forecast says there's a chance of rain."],
        ["M", "Only in the afternoon. We're starting at seven in the morning."],
        ["W", "Then I'll come. Should I bring anything?"],
        ["M", "Just gloves and a water bottle. The organizers will provide bags."],
        ["W", "Great. See you there."],
      ],
      q: [
        Q("What event are the speakers discussing?", ["A beach clean-up", "A concert", "A sports game", "A picnic"], 0,
          "“the beach clean-up this Saturday”."),
        Q("Why is the woman worried at first?", ["She has to work", "It might rain", "She has no car", "It starts too late"], 1,
          "“there's a chance of rain.”"),
        Q("What will the organizers provide?", ["Gloves", "Water", "Bags", "Lunch"], 2,
          "“The organizers will provide bags.”"),
      ],
    },
    speak: {
      q: ["What do you do in your daily life to protect the environment?",
        "Should companies pay more for the pollution they cause? Why?"],
    },
    write: {
      s: [["waste", "Viết câu về việc giảm rác thải."],
        ["environmental", "Viết câu về một vấn đề môi trường."],
        ["conserve", "Viết câu về cách tiết kiệm năng lượng hoặc nước."]],
      email: {
        task: "Viết email gửi đồng nghiệp đề xuất một chương trình tái chế trong văn phòng.",
        use: ["recycling", "waste", "environmental"],
        sample: "Hi everyone,\n\nOur office produces a lot of paper and plastic waste every week. I would like to suggest a simple recycling program. We could put separate bins for paper, plastic, and cans in the kitchen and near the printers. It is a small step, but it shows that we care about environmental issues. Please let me know what you think.\n\nBest,\nLinh",
      },
    },
  });

  add(30, {
    read: {
      type: "Health center notice", title: "Free health checkups for employees",
      text: `To improve staff health, the company will offer free comprehensive checkups at the City Medical Center during the week of October 7.

The examination includes a blood pressure test, an eye test, and a dental checkup. Physicians will also give advice on nutrition and the prevention of common illnesses.

Employees who wish to participate must make an appointment through the HR website by September 30. Please do not eat anything for eight hours before the examination.

Results will be sent to you privately within two weeks. If any symptoms require further treatment, the doctor will recommend a specialist. Treatment costs are covered by our insurance, depending on your plan.

We encourage everyone to take part. Regular checkups are one of the most effective ways to maintain good health.`,
      q: [
        Q("What is being offered?", ["Free gym memberships", "Free health checkups", "A new insurance plan", "Cooking classes"], 1,
          "“free comprehensive checkups at the City Medical Center”."),
        Q("What should employees do before the examination?", ["Exercise", "Drink coffee", "Not eat for eight hours", "Bring their results"], 2,
          "“do not eat anything for eight hours before the examination.”"),
        Q("When will results be sent?", ["Within two weeks", "Immediately", "Within a month", "On September 30"], 0,
          "“Results will be sent to you privately within two weeks.”"),
        Q("What will happen if further treatment is needed?", ["The employee must pay", "The company will close", "The checkup will be repeated", "A doctor will recommend a specialist"], 3,
          "“the doctor will recommend a specialist.”"),
      ],
    },
    listen: {
      title: "Making an appointment",
      lines: [
        ["W", "City Medical Center. How can I help you?"],
        ["M", "Hi, I'd like to make an appointment for my company health checkup."],
        ["W", "Of course. We have openings on Tuesday at nine or Thursday at two."],
        ["M", "Tuesday morning, please."],
        ["W", "All right. Please remember not to eat anything after midnight."],
        ["M", "Got it. Thank you."],
      ],
      q: [
        Q("Why is the man calling?", ["To make an appointment", "To get test results", "To cancel a visit", "To ask about insurance"], 0,
          "“make an appointment for my company health checkup.”"),
        Q("When will the man go to the center?", ["Thursday at two", "Tuesday at nine", "Monday morning", "Friday afternoon"], 1,
          "“Tuesday morning, please.” (lúc 9 giờ)."),
        Q("What does the woman remind him to do?", ["Bring his ID", "Arrive early", "Not eat after midnight", "Pay in advance"], 2,
          "“remember not to eat anything after midnight.”"),
      ],
    },
    speak: {
      q: ["What do you do to stay healthy when you are busy?",
        "Should companies pay for employees' health checkups? Why or why not?"],
    },
    write: {
      s: [["symptom", "Viết câu mô tả triệu chứng khi bị cảm."],
        ["recommend", "Viết câu khuyên một thói quen tốt cho sức khỏe."],
        ["prevention", "Viết câu về việc phòng ngừa bệnh tật."]],
      email: {
        task: "Viết email cho phòng khám để đặt lịch khám sức khỏe và hỏi cần chuẩn bị gì trước khi khám.",
        use: ["appointment", "checkup", "physician"],
        sample: "Dear City Medical Center,\n\nI would like to make an appointment for a general checkup next week. I am available on Tuesday or Thursday morning. I would prefer to see a physician who speaks English. Could you also tell me what I should prepare before the examination, such as whether I should avoid eating?\n\nThank you for your help.\n\nBest regards,\nKhanh",
      },
    },
  });
})();
