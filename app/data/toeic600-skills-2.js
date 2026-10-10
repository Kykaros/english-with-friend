/* Nội dung luyện 4 kỹ năng — 600 Essential Words for TOEIC, bài 11–20. Cấu trúc: xem toeic600-skills-1.js. */
(function () {
  const Q = (q, o, a, why) => ({ q, o, a, why });
  const add = (id, data) => EWF.addSkills("toeic600", id, data);

  add(11, {
    read: {
      type: "Job advertisement", title: "Sales Coordinator wanted",
      text: `GreenLeaf Foods is looking for an energetic Sales Coordinator to join our team in Ho Chi Minh City.

The successful candidate will bring together our sales and delivery teams and come up with new ways to reach restaurants and supermarkets. Our ideal profile is someone with at least two years of experience in sales and a record of clear accomplishments.

Qualifications:
- A university degree in business or a related field
- Good English and computer skills
- Strong organizational skills

We offer a salary commensurate with experience, plus abundant opportunities for training and promotion.

To apply, please submit your résumé and a short cover letter through our website by June 15. We know that job hunting can be time-consuming, so we will reply to every applicant within ten days. Only candidates whose experience matches our needs will be invited for an interview.`,
      q: [
        Q("What is the main job of the Sales Coordinator?", ["To deliver food to customers", "To connect sales and delivery teams", "To manage a restaurant", "To train new chefs"], 1,
          "“bring together our sales and delivery teams” — kết nối đội bán hàng và giao hàng."),
        Q("What is NOT listed as a qualification?", ["A university degree", "Good English", "A driver's license", "Organizational skills"], 2,
          "Danh sách yêu cầu không có bằng lái xe."),
        Q("How will the salary be decided?", ["It depends on experience", "It is the same for everyone", "It depends on sales", "It is paid weekly"], 0,
          "“a salary commensurate with experience” — tương xứng với kinh nghiệm."),
        Q("What does the company promise applicants?", ["A free training course", "A job within ten days", "A higher salary next year", "A reply within ten days"], 3,
          "“we will reply to every applicant within ten days.”"),
      ],
    },
    listen: {
      title: "Finding the right candidate",
      lines: [
        ["W", "How is the search for a new accountant going?"],
        ["M", "Slowly. We've received abundant applications, but most candidates don't have the right qualifications."],
        ["W", "Have you thought about using a recruitment agency?"],
        ["M", "Yes, but they're expensive."],
        ["W", "True, but reading all those résumés is time-consuming. An agency could save you weeks."],
        ["M", "You're right. I'll call one tomorrow and ask for a price."],
      ],
      q: [
        Q("What position is the company trying to fill?", ["Accountant", "Sales manager", "Receptionist", "Recruiter"], 0,
          "“the search for a new accountant”."),
        Q("What problem does the man mention?", ["Nobody has applied", "Most candidates lack the right qualifications", "The salary is too low", "The interviews were cancelled"], 1,
          "“most candidates don't have the right qualifications.”"),
        Q("What will the man do tomorrow?", ["Interview a candidate", "Post a new ad", "Contact a recruitment agency", "Read more résumés"], 2,
          "“I'll call one tomorrow and ask for a price.”"),
      ],
    },
    speak: {
      q: ["Describe your dream job. What qualifications would you need to get it?",
        "Where do people in your country usually look for jobs? Which way do you think is best?"],
    },
    write: {
      s: [["candidate", "Viết câu mô tả một ứng viên phù hợp cho vị trí bạn tuyển."],
        ["submit", "Viết câu hướng dẫn ứng viên nộp hồ sơ."],
        ["time-consuming", "Viết câu về một công việc tốn thời gian."]],
      email: {
        task: "Viết email ngắn ứng tuyển vị trí Sales Coordinator ở trên: giới thiệu bản thân, kinh nghiệm và nói rằng bạn gửi kèm CV.",
        use: ["qualifications", "accomplishment", "submit"],
        sample: "Dear Hiring Manager,\n\nI am writing to apply for the Sales Coordinator position. I have a degree in business and three years of experience in food sales. My biggest accomplishment was increasing our sales to supermarkets by 20% last year. I believe my qualifications match your needs. I have submitted my résumé through your website.\n\nThank you for your time.\n\nSincerely,\nNam Vo",
      },
    },
  });

  add(12, {
    read: {
      type: "Article", title: "Five tips for your next job interview",
      text: `Many people hesitate to apply for jobs because they are afraid of interviews. Career expert Linda Hayes says that good preparation is the key to confidence.

First, research the company's background so that you are ready for questions about its products. Second, prepare examples that show your ability to solve problems. Third, think about your weakness before the interview. "Everyone has one," Hayes says. "Explain what you are constantly doing to improve it."

Fourth, present yourself well. Arrive ten minutes early and dress a little more formally than the company's staff. Finally, follow up. Send a short thank-you e-mail within 24 hours. "Many candidates forget this step," Hayes explains, "but it shows real interest in the job."

If you are called in for a second interview, it means the company is seriously considering you.`,
      q: [
        Q("Who is Linda Hayes?", ["A job applicant", "A career expert", "A company director", "A university teacher"], 1,
          "“Career expert Linda Hayes”."),
        Q("What does Ms. Hayes say about weaknesses?", ["Candidates should hide them", "Only weak candidates have them", "Candidates should explain how they are improving", "They are never asked about"], 2,
          "“Explain what you are constantly doing to improve it.”"),
        Q("What should candidates do within 24 hours after an interview?", ["Send a thank-you e-mail", "Call the manager", "Apply for another job", "Ask about the salary"], 0,
          "“Send a short thank-you e-mail within 24 hours.”"),
        Q("What does a second interview mean?", ["The candidate was rejected", "The company made a mistake", "The job is no longer available", "The company is seriously interested"], 3,
          "“it means the company is seriously considering you.”"),
      ],
    },
    listen: {
      title: "After the interview",
      lines: [
        ["M", "How did your interview at the bank go?"],
        ["W", "I think it went well. I felt confident, and they asked a lot about my background in finance."],
        ["M", "Did they ask about your weaknesses?"],
        ["W", "Yes. I said I sometimes take on too much work, but I'm learning to share tasks."],
        ["M", "Good answer. Are you going to follow up?"],
        ["W", "I already sent a thank-you e-mail. They said they'd call in the top candidates next week."],
      ],
      q: [
        Q("Where did the woman have an interview?", ["At a bank", "At a hospital", "At a school", "At a hotel"], 0,
          "“your interview at the bank”."),
        Q("What weakness did the woman mention?", ["She is often late", "She takes on too much work", "She is shy", "She has little experience"], 1,
          "“I sometimes take on too much work”."),
        Q("What will happen next week?", ["The woman will start work", "The woman will send an e-mail", "The best candidates will be invited back", "The bank will close"], 2,
          "“they'd call in the top candidates next week.”"),
      ],
    },
    speak: {
      q: ["What is your greatest strength and your greatest weakness? Give examples.",
        "Tell me about a time you felt nervous before an important event. How did you prepare?"],
      tips: ["Gợi ý: My greatest strength is… For example,… My weakness is…, but I'm…", ""],
    },
    write: {
      s: [["ability", "Viết câu nói về một khả năng của bạn."],
        ["hesitate", "Viết câu khuyên ai đó đừng ngần ngại hỏi khi cần giúp đỡ."],
        ["follow up", "Viết câu về việc liên lạc lại sau buổi phỏng vấn."]],
      email: {
        task: "Bạn vừa phỏng vấn xong. Viết email cảm ơn người phỏng vấn và nhấn mạnh lại một điểm mạnh của bạn.",
        use: ["confidence", "background", "ability"],
        sample: "Dear Ms. Hayes,\n\nThank you for meeting with me yesterday to discuss the marketing assistant position. I enjoyed learning more about your company. With my background in digital marketing and my ability to work well in a team, I believe I could contribute a lot to your department. Our conversation gave me even more confidence that this job is right for me.\n\nI look forward to hearing from you.\n\nBest regards,\nHoa Tran",
      },
    },
  });

  add(13, {
    read: {
      type: "Memo", title: "New mentoring program",
      text: `To: All managers
From: Paul Davis, Human Resources
Subject: Mentoring program for new hires

This year, we plan to hire 40 new employees, more than ever before. To help them succeed, we are setting up a mentoring program that will begin on March 1.

Each new employee will be matched with an experienced mentor from the same department. Mentors will meet their new colleagues once a week for three months, help them keep up with company procedures, and make sure their training stays on track. We hope new staff will look up to their mentors as role models.

Last year's pilot program was a great success. It generated very positive feedback, and none of the participants left the company in their first year.

Managers who would like to volunteer as mentors should update their profile on the HR website by February 10. We will conduct a short workshop for all mentors on February 20.`,
      q: [
        Q("Why is the company starting the program?", ["To help new employees succeed", "To reduce salaries", "To replace training courses", "To reject weak candidates"], 0,
          "“To help them succeed, we are setting up a mentoring program”."),
        Q("How often will mentors meet new employees?", ["Every day", "Once a week", "Once a month", "Twice a year"], 1,
          "“once a week for three months”."),
        Q("What happened in last year's pilot program?", ["Many people left", "It was cancelled", "No participants left in their first year", "It cost too much"], 2,
          "“none of the participants left the company in their first year.”"),
        Q("What will happen on February 20?", ["New employees will start", "Profiles must be updated", "Mentors will be paid", "A workshop will be held"], 3,
          "“We will conduct a short workshop for all mentors on February 20.”"),
      ],
    },
    listen: {
      title: "Training a new employee",
      lines: [
        ["W", "How is the new sales assistant doing?"],
        ["M", "Very well. Tom learns fast, and his training is right on track."],
        ["W", "That's great. Is he keeping up with the paperwork?"],
        ["M", "Mostly. He's still a bit slow with the ordering system."],
        ["W", "Maybe you could set up a short session with Karen. She's an expert on that system."],
        ["M", "Good idea. I'll ask her to help him on Thursday."],
      ],
      q: [
        Q("Who are the speakers discussing?", ["A new employee", "A customer", "A manager", "A supplier"], 0,
          "“the new sales assistant” — Tom."),
        Q("What does Tom have difficulty with?", ["Talking to customers", "The ordering system", "Arriving on time", "Writing reports"], 1,
          "“He's still a bit slow with the ordering system.”"),
        Q("What will happen on Thursday?", ["Tom will take a test", "Tom will meet a customer", "Karen will help Tom", "The man will leave"], 2,
          "“I'll ask her to help him on Thursday.”"),
      ],
    },
    speak: {
      q: ["Describe a person you look up to. Why do you admire him or her?",
        "Is it better to learn a new job from a mentor or from a training course? Explain."],
    },
    write: {
      s: [["hire", "Viết câu về việc công ty tuyển thêm nhân viên."],
        ["keep up with", "Viết câu về việc theo kịp công nghệ hoặc tin tức mới."],
        ["training", "Viết câu về một khoá đào tạo hữu ích."]],
      email: {
        task: "Bạn là trưởng nhóm. Viết email chào mừng nhân viên mới và cho biết ai sẽ là người hướng dẫn (mentor) và lịch đào tạo tuần đầu.",
        use: ["mentor", "training", "set up"],
        sample: "Hi Tom,\n\nWelcome to the sales team! We are very happy to have you with us. During your first three months, Karen will be your mentor. She has worked here for eight years and knows everything about our products. I have set up your training schedule for the first week: product lessons in the morning and the ordering system in the afternoon.\n\nSee you on Monday at 8:30.\n\nBest,\nLinh",
      },
    },
  });

  add(14, {
    read: {
      type: "Notice", title: "Changes to employee benefits",
      text: `Dear staff,

We would like all employees to be aware of several changes to our benefits package that will take effect on July 1.

First, all full-time employees will receive a 4% raise in their basic wage. Part-time staff who work on a regular basis of at least 20 hours per week will now be eligible for health insurance.

Second, we are introducing flexible working hours. Employees may start work at any time between 7:00 and 9:30 a.m., as long as they complete eight hours per day.

Third, the company will compensate staff for travel costs when they work overtime after 9 p.m.

Finally, employees who have worked here for five years will be fully vested in the retirement plan. This means they can keep all company contributions even if they leave before they retire.

We understand that salary is a delicate subject. If you have questions, please speak to HR in private.`,
      q: [
        Q("What is the main topic of the notice?", ["A new company director", "Changes to employee benefits", "A new office location", "A training program"], 1,
          "Thông báo về các thay đổi phúc lợi (benefits package)."),
        Q("Who will become eligible for health insurance?", ["All part-time staff", "Managers only", "Part-time staff working at least 20 hours a week", "New employees only"], 2,
          "“Part-time staff who work... at least 20 hours per week will now be eligible”."),
        Q("When will the company pay for travel costs?", ["When staff work after 9 p.m.", "Every day", "When staff travel abroad", "On weekends only"], 0,
          "“compensate staff for travel costs when they work overtime after 9 p.m.”"),
        Q("What does “fully vested” mean for employees with five years of service?", ["They must retire early", "They get a higher salary", "They can work from home", "They keep all company contributions"], 3,
          "“they can keep all company contributions even if they leave”."),
      ],
    },
    listen: {
      title: "Asking for a raise",
      lines: [
        ["M", "Do you have a minute? I'd like to talk about my salary."],
        ["W", "Of course. What's on your mind?"],
        ["M", "I've taken on two new projects this year, and I think a raise would be fair."],
        ["W", "I agree you've worked hard. I can't promise a big increase, but I can offer more flexible hours."],
        ["M", "That would help. Could we also discuss the salary at my review in June?"],
        ["W", "Certainly. Bring a list of your achievements, and we'll negotiate then."],
      ],
      q: [
        Q("Why does the man want a raise?", ["He has taken on more projects", "He is moving to a new city", "He received another job offer", "His rent increased"], 0,
          "“I've taken on two new projects this year”."),
        Q("What does the woman offer?", ["A bonus", "Flexible hours", "A new title", "Extra vacation"], 1,
          "“I can offer more flexible hours.”"),
        Q("What should the man bring in June?", ["His contract", "A doctor's note", "A list of his achievements", "A new résumé"], 2,
          "“Bring a list of your achievements”."),
      ],
    },
    speak: {
      q: ["Apart from salary, which job benefit is most important to you? Why?",
        "Would you prefer a job with a high salary and long hours, or a lower salary and flexible hours? Explain."],
    },
    write: {
      s: [["benefit", "Viết câu về một phúc lợi mà công ty bạn (hoặc công ty mơ ước) có."],
        ["eligible", "Viết câu nói ai đủ điều kiện nhận một quyền lợi."],
        ["negotiate", "Viết câu về việc thương lượng lương hoặc giá cả."]],
      email: {
        task: "Viết email cho phòng Nhân sự hỏi về chính sách giờ làm linh hoạt và bạn có đủ điều kiện tham gia không.",
        use: ["flexible", "eligible", "benefit"],
        sample: "Dear HR team,\n\nI read the notice about the new benefits starting on July 1. I am very interested in the flexible working hours. I usually take my children to school at 8 a.m., so starting at 9:30 would help me a lot. Could you confirm whether I am eligible, as I joined the company only four months ago?\n\nThank you for your help.\n\nKind regards,\nThanh",
      },
    },
  });

  add(15, {
    read: {
      type: "Newsletter article", title: "Employee of the Year: Maria Santos",
      text: `This year's Employee of the Year award goes to Maria Santos from the customer service department. Her achievement is the result of ten years of hard work and dedication.

Ms. Santos joined our company as a call center assistant. Thanks to her merit, she was promoted to team leader after only three years. Her team is now the most productive in the department, and customer complaints have fallen by 35% under her leadership.

"It was obvious from the start that Maria was special," said department manager Jason Lee. "She is loyal to the company and always willing to help her colleagues."

Ms. Santos says she values the recognition but gives credit to her team. "Everyone contributed to our success," she said. "I look forward to working with them for many more years."

The company will look to Ms. Santos to lead a new training program for team leaders next year.`,
      q: [
        Q("Why is Ms. Santos receiving an award?", ["She designed a new product", "She is Employee of the Year", "She is retiring", "She won a sales contest"], 1,
          "“This year's Employee of the Year award goes to Maria Santos”."),
        Q("What was Ms. Santos's first job at the company?", ["Team leader", "Department manager", "Call center assistant", "Trainer"], 2,
          "“Ms. Santos joined our company as a call center assistant.”"),
        Q("What has happened under her leadership?", ["Complaints have dropped", "Sales have doubled", "The team has grown", "Costs have increased"], 0,
          "“customer complaints have fallen by 35%”."),
        Q("What will Ms. Santos do next year?", ["Retire", "Move to another department", "Receive a raise", "Lead a training program"], 3,
          "“lead a new training program for team leaders next year.”"),
      ],
    },
    listen: {
      title: "A retirement party",
      lines: [
        ["W", "Are you coming to Mr. Brown's retirement party on Friday?"],
        ["M", "Of course. He's been with the company for thirty years. That's real loyalty."],
        ["W", "We're collecting money for a gift. Would you like to contribute?"],
        ["M", "Sure. What are you planning to buy?"],
        ["W", "A camera. He's looking forward to traveling with his wife."],
        ["M", "That's perfect. Here's twenty dollars."],
      ],
      q: [
        Q("What event are the speakers discussing?", ["A retirement party", "A wedding", "A product launch", "An award ceremony"], 0,
          "“Mr. Brown's retirement party”."),
        Q("How long has Mr. Brown worked at the company?", ["Ten years", "Thirty years", "Twenty years", "Five years"], 1,
          "“He's been with the company for thirty years.”"),
        Q("Why did they choose a camera?", ["Mr. Brown likes photos of nature", "It was on sale", "Mr. Brown plans to travel", "His old camera broke"], 2,
          "“He's looking forward to traveling with his wife.”"),
      ],
    },
    speak: {
      q: ["Describe an achievement that you are proud of.",
        "What is the best way for a company to recognize hard-working employees?"],
    },
    write: {
      s: [["achievement", "Viết câu về một thành tích của bạn hoặc đồng nghiệp."],
        ["look forward to", "Viết câu về điều bạn đang mong chờ."],
        ["promote", "Viết câu về việc ai đó được thăng chức."]],
      email: {
        task: "Viết email chúc mừng một đồng nghiệp vừa được thăng chức và nhắc đến đóng góp của họ.",
        use: ["promote", "dedication", "contribute"],
        sample: "Hi Maria,\n\nCongratulations on being promoted to team leader! Nobody deserves it more than you. Your dedication to our customers has been an example for all of us, and you have contributed so much to the success of our department. I am sure your team will do great things under your leadership.\n\nLet's celebrate with lunch next week!\n\nBest wishes,\nAn",
      },
    },
  });

  add(16, {
    read: {
      type: "Article", title: "Shoppers return to the high street",
      text: `For years, experts predicted that online shopping would close many small shops. But a new trend shows that shoppers are returning to physical stores, especially on weekends.

According to a survey by the Retail Association, consumer behavior has changed since last year. "People want to explore and touch merchandise before they buy it," explains researcher Amy Collins. "They also enjoy the comfort of asking a real person for advice."

Many stores have responded by expanding their services. City Books now has a café, and Style Corner offers free alterations on every item of clothing. Self-checkout machines have also made shopping faster.

However, shoppers are still looking for a bargain. Stores that cannot bear the cost of regular discounts may struggle. In addition, some cities have introduced strict rules on opening hours, and in some areas weekend closing is mandatory.`,
      q: [
        Q("What trend does the article describe?", ["More people shop online", "Shoppers are returning to stores", "Stores are closing on weekends", "Prices are rising quickly"], 1,
          "“shoppers are returning to physical stores”."),
        Q("According to Ms. Collins, why do people visit stores?", ["Prices are lower", "Delivery is slow", "They want to see and touch products", "Stores open later"], 2,
          "“People want to explore and touch merchandise before they buy it”."),
        Q("What does Style Corner offer?", ["Free alterations", "A café", "Home delivery", "Self-checkout"], 0,
          "“Style Corner offers free alterations on every item of clothing.”"),
        Q("What problem might some stores face?", ["Too many customers", "A lack of staff", "Online competition only", "The cost of regular discounts"], 3,
          "“Stores that cannot bear the cost of regular discounts may struggle.”"),
      ],
    },
    listen: {
      title: "At the checkout",
      lines: [
        ["W", "Hi. I'd like to buy this jacket, please."],
        ["M", "Certainly. It's on sale today — thirty percent off."],
        ["W", "Really? That's a bargain. Can I return it if it doesn't fit my husband?"],
        ["M", "Yes, within fourteen days. Just keep the receipt. A receipt is mandatory for all returns."],
        ["W", "Okay. Can I pay by card?"],
        ["M", "Of course. Please insert your card here."],
      ],
      q: [
        Q("What is the woman buying?", ["A jacket", "A pair of shoes", "A shirt", "A bag"], 0,
          "“I'd like to buy this jacket”."),
        Q("Who is the jacket probably for?", ["The woman", "Her husband", "Her son", "Her friend"], 1,
          "“if it doesn't fit my husband”."),
        Q("What is necessary to return an item?", ["The original box", "A store card", "The receipt", "A phone number"], 2,
          "“A receipt is mandatory for all returns.”"),
      ],
    },
    speak: {
      q: ["Do you prefer shopping online or in stores? Why?",
        "Describe the best bargain you have ever found."],
    },
    write: {
      s: [["bargain", "Viết câu về một món hời bạn mua được."],
        ["item", "Viết câu về một món đồ trong giỏ hàng của bạn."],
        ["strict", "Viết câu về một quy định nghiêm ngặt ở cửa hàng hoặc công ty."]],
      email: {
        task: "Bạn mua một chiếc áo online nhưng nhận được sai cỡ. Viết email cho cửa hàng yêu cầu đổi hàng.",
        use: ["item", "merchandise", "checkout"],
        sample: "Dear Style Corner,\n\nLast week I ordered a blue jacket from your website. At checkout, I chose size M, but the item I received is size XL. The merchandise is in perfect condition, and I still have the receipt. Could you please send me the correct size and tell me how to return the wrong one?\n\nThank you for your help.\n\nBest regards,\nVy Nguyen",
      },
    },
  });

  add(17, {
    read: {
      type: "E-mail", title: "Changing our office supplier",
      text: `To: Office staff
From: Grace Liu, Office Manager
Subject: New supplier for office supplies

Hi everyone,

From next month, we will obtain our stationery and other office supplies from OfficeMart instead of PaperPlus. OfficeMart offers a more diverse range of products, from everyday items like pens and paper to essential equipment such as printer ink.

The main reason for the change is quality. Several of you complained that PaperPlus envelopes often tore and that their staplers did not function properly. OfficeMart is also a large enterprise with its own warehouse, so deliveries should be smooth and fast.

To maintain control of costs, please send all orders to me by Wednesday each week. Orders over $200 will need approval from your department head. This is a prerequisite for all purchases.

If you know a good source for any special items, please let me know.

Thanks,
Grace`,
      q: [
        Q("What is the e-mail mainly about?", ["A new office manager", "A change of supplier", "A price increase", "A new warehouse"], 1,
          "Đổi nhà cung cấp văn phòng phẩm từ PaperPlus sang OfficeMart."),
        Q("Why is the company changing suppliers?", ["To get better quality", "PaperPlus closed", "To get lower prices only", "The manager knows the owner"], 0,
          "“The main reason for the change is quality.”"),
        Q("What must staff do by Wednesday each week?", ["Pick up supplies", "Pay for orders", "Send orders to Grace", "Visit the warehouse"], 2,
          "“please send all orders to me by Wednesday each week.”"),
        Q("What is needed for orders over $200?", ["A second supplier", "A special form", "Cash payment", "Approval from a department head"], 3,
          "“Orders over $200 will need approval from your department head.”"),
      ],
    },
    listen: {
      title: "Running out of paper",
      lines: [
        ["M", "Linda, we're almost out of printer paper again."],
        ["W", "Really? I ordered five boxes just two weeks ago."],
        ["M", "The marketing team printed a lot of brochures for the trade show."],
        ["W", "I see. I'll order more stationery today. Do we need anything else?"],
        ["M", "Ink cartridges are essential, and a few notebooks would be useful."],
        ["W", "Okay. The supplier usually delivers within two days."],
      ],
      q: [
        Q("What problem does the man mention?", ["The office is almost out of paper", "The printer is broken", "An order was lost", "The supplier closed"], 0,
          "“we're almost out of printer paper again.”"),
        Q("Why was so much paper used?", ["There was a mistake", "Brochures were printed for a trade show", "New staff joined", "The printer wasted paper"], 1,
          "“The marketing team printed a lot of brochures for the trade show.”"),
        Q("How long does delivery usually take?", ["One day", "One week", "Two days", "Two weeks"], 2,
          "“The supplier usually delivers within two days.”"),
      ],
    },
    speak: {
      q: ["What office or school supplies do you use every day? Which one is most essential?",
        "When a company chooses a supplier, which is more important: price or quality? Why?"],
    },
    write: {
      s: [["essential", "Viết câu về một vật dụng thiết yếu trong văn phòng."],
        ["obtain", "Viết câu về việc lấy được giấy phép hoặc thông tin."],
        ["quality", "Viết câu nhận xét chất lượng một sản phẩm."]],
      email: {
        task: "Viết email đặt mua văn phòng phẩm cho phòng bạn: liệt kê vài món cần và hỏi thời gian giao hàng.",
        use: ["stationery", "essential", "obtain"],
        sample: "Dear OfficeMart,\n\nI would like to order some stationery for our accounting department: ten boxes of A4 paper, five packs of blue pens, and twenty notebooks. The paper is essential because we are preparing our year-end reports. Could you tell me how soon we can obtain these items? We hope to receive them before Friday.\n\nThank you.\n\nBest regards,\nGrace Liu",
      },
    },
  });

  add(18, {
    read: {
      type: "Notice", title: "Holiday shipping information",
      text: `Thank you for shopping with HomeStyle Online!

During the holiday season, we ship more than 10,000 orders a day. To fulfill every order on time, please remember the following information.

Orders placed before December 15 will arrive before the holidays. After that date, we cannot promise delivery by December 24. We work with two carriers, FastShip and Coastal Express, and we will choose the one that can deliver your order most quickly.

Our online catalog shows how many units of each item we have on hand. Because our inventory changes quickly, please check that the product is in stock before you pay. If we do not have a sufficient supply, we will contact you within 24 hours.

To minimize mistakes, make sure your address and phone number are accurate. Correct contact details are integral to a smooth delivery.`,
      q: [
        Q("By when should customers order to receive items before the holidays?", ["December 24", "December 15", "December 1", "January 1"], 1,
          "“Orders placed before December 15 will arrive before the holidays.”"),
        Q("How does HomeStyle choose a carrier?", ["By the lowest price", "By customer choice", "By the fastest delivery", "By the size of the order"], 2,
          "“we will choose the one that can deliver your order most quickly.”"),
        Q("What does the online catalog show?", ["How many items are available", "Customer reviews", "Delivery prices", "Store locations"], 0,
          "“shows how many units of each item we have on hand.”"),
        Q("What are customers asked to check?", ["Their bank account", "The carrier's website", "The return policy", "Their address and phone number"], 3,
          "“make sure your address and phone number are accurate.”"),
      ],
    },
    listen: {
      title: "A late shipment",
      lines: [
        ["W", "Hello, I'm calling about order number 5518. It was supposed to arrive on Monday."],
        ["M", "Let me check. I'm sorry, the carrier had a problem with one of its trucks."],
        ["W", "When can I expect it? We need the supplies for a training session."],
        ["M", "It's now scheduled for Thursday morning."],
        ["W", "Our session is on Wednesday. Is there any faster option?"],
        ["M", "We have enough items on hand in our local store. I can ship them by courier today at no extra cost."],
      ],
      q: [
        Q("Why is the woman calling?", ["Her order has not arrived", "She wants to cancel an order", "She received the wrong item", "She wants a catalog"], 0,
          "“It was supposed to arrive on Monday.” — hàng chưa tới."),
        Q("What caused the delay?", ["Bad weather", "A problem with a truck", "A wrong address", "A holiday"], 1,
          "“the carrier had a problem with one of its trucks.”"),
        Q("What does the man offer to do?", ["Give a refund", "Send a new catalog", "Ship items from a local store today", "Cancel the training"], 2,
          "“I can ship them by courier today at no extra cost.”"),
      ],
    },
    speak: {
      q: ["Describe a time a package you ordered arrived late or damaged. What happened?",
        "What can online stores do to make delivery faster and more reliable?"],
    },
    write: {
      s: [["accurate", "Viết câu nhắc khách hàng cung cấp thông tin chính xác."],
        ["ship", "Viết câu về việc gửi hàng cho khách."],
        ["sufficient", "Viết câu về việc có đủ hàng hoặc thời gian."]],
      email: {
        task: "Bạn là nhân viên chăm sóc khách hàng. Viết email xin lỗi khách vì đơn hàng bị giao chậm, nêu lý do và ngày giao mới.",
        use: ["ship", "carrier", "inventory"],
        sample: "Dear Mr. Park,\n\nI am sorry that your order has not arrived yet. One item was missing from our inventory, so we could not ship the order on time. The item arrived at our warehouse this morning, and we have already sent your package with our carrier, FastShip. You should receive it by Thursday.\n\nAs an apology, we have added a 10% discount to your account.\n\nSincerely,\nCustomer Service Team",
      },
    },
  });

  add(19, {
    read: {
      type: "Letter", title: "About your invoice",
      text: `Dear Ms. Wong,

Thank you for your recent order of 50 office chairs. We have compiled your invoice, which you will find attached.

Please note that we made a mistake on the estimate we sent you last month. The estimate did not include the delivery charge of $120. We apologize for this error. To rectify it, we have given you an extra discount of 5%, so the total amount is now lower than the original estimate.

According to our terms, payment is due within 30 days. Customers who pay promptly, within ten days, will receive an additional 2% discount. Please be aware that we impose a late fee of 1.5% per month on unpaid balances.

We aim to be efficient and fair with all our customers. If you have any questions, please contact our billing department at 555-0198.

Sincerely,
James Ortiz
Comfort Office Furniture`,
      q: [
        Q("What did Ms. Wong order?", ["Desks", "Office chairs", "Computers", "Printers"], 1,
          "“your recent order of 50 office chairs”."),
        Q("What mistake was made?", ["The wrong chairs were sent", "The invoice was late", "The delivery charge was left out of the estimate", "The price was too high"], 2,
          "“The estimate did not include the delivery charge of $120.”"),
        Q("How can Ms. Wong get an extra 2% discount?", ["By paying within ten days", "By ordering more chairs", "By paying in cash", "By picking up the order"], 0,
          "“Customers who pay promptly, within ten days, will receive an additional 2% discount.”"),
        Q("What happens if a balance is unpaid?", ["The order is cancelled", "The discount doubles", "Delivery is free", "A monthly late fee is charged"], 3,
          "“we impose a late fee of 1.5% per month on unpaid balances.”"),
      ],
    },
    listen: {
      title: "A wrong charge",
      lines: [
        ["M", "Hi, I think there's a mistake on my invoice."],
        ["W", "I'm sorry about that. What seems to be the problem?"],
        ["M", "I was charged for twelve boxes of paper, but I only ordered ten."],
        ["W", "Let me look. You're right — two boxes were added by mistake."],
        ["M", "Can you send me a corrected invoice?"],
        ["W", "Of course. I'll e-mail it within an hour and take ten percent off for the trouble."],
      ],
      q: [
        Q("What is the man's problem?", ["He was charged for too many boxes", "His order is late", "The paper is damaged", "He lost his invoice"], 0,
          "“I was charged for twelve boxes of paper, but I only ordered ten.”"),
        Q("How many boxes did the man order?", ["Twelve", "Ten", "Two", "Twenty"], 1,
          "“I only ordered ten.”"),
        Q("What will the woman do?", ["Deliver two more boxes", "Call the manager", "Send a corrected invoice with a discount", "Cancel the order"], 2,
          "“I'll e-mail it within an hour and take ten percent off”."),
      ],
    },
    speak: {
      q: ["Have you ever found a mistake on a bill or receipt? What did you do?",
        "Why is it important for a business to send accurate invoices to its customers?"],
    },
    write: {
      s: [["discount", "Viết câu về một chương trình giảm giá."],
        ["mistake", "Viết câu thừa nhận một sai sót và hứa sửa."],
        ["promptly", "Viết câu yêu cầu thanh toán hoặc trả lời nhanh chóng."]],
      email: {
        task: "Bạn nhận được hoá đơn bị tính sai tiền. Viết email cho nhà cung cấp nêu lỗi và yêu cầu gửi hoá đơn mới.",
        use: ["charge", "mistake", "rectify"],
        sample: "Dear Mr. Ortiz,\n\nThank you for sending the invoice for our order of office chairs. Unfortunately, I think there is a mistake. We were charged $95 per chair, but the price in your estimate was $85. Could you please rectify this and send us a corrected invoice? We will pay promptly once we receive it.\n\nThank you for your understanding.\n\nBest regards,\nAmy Wong",
      },
    },
  });

  add(20, {
    read: {
      type: "Memo", title: "Annual inventory count",
      text: `To: Warehouse staff
From: Kevin Moore, Warehouse Manager
Subject: Inventory count, December 28–29

As every year, we will count all stock at the end of December. Although the work can be tedious, an accurate count is crucial for our financial reports.

This year, we will use new handheld devices to scan each product's barcode. The system will automatically subtract any items sold during the count, so we will not need to close the shop. Please verify each shelf twice before moving on.

If you find a discrepancy between the number on the screen and the number on the shelf, do not adjust the figure yourself. Report it to your supervisor, who will check whether the difference reflects damaged goods or a recording error.

To avoid disturbing customers, the count will run from 6 p.m. to midnight on both days. Remember that missing stock can become a liability for the company, so please take your time.

Thank you,
Kevin`,
      q: [
        Q("Why is an accurate count important?", ["For customer surveys", "For financial reports", "For staff training", "For a new store"], 1,
          "“an accurate count is crucial for our financial reports.”"),
        Q("What is new this year?", ["The shop will close", "Staff will count by hand", "Handheld devices will scan barcodes", "Customers will help count"], 2,
          "“we will use new handheld devices to scan each product's barcode.”"),
        Q("What should staff do if they find a discrepancy?", ["Report it to a supervisor", "Change the number", "Ignore it", "Recount the whole warehouse"], 0,
          "“do not adjust the figure yourself. Report it to your supervisor”."),
        Q("Why will the count take place in the evening?", ["Staff prefer it", "Devices work better at night", "Deliveries arrive then", "To avoid disturbing customers"], 3,
          "“To avoid disturbing customers, the count will run from 6 p.m. to midnight”."),
      ],
    },
    listen: {
      title: "Checking stock",
      lines: [
        ["W", "The computer says we have forty boxes of light bulbs, but I can only find thirty-two."],
        ["M", "That's a big discrepancy. Did you check the back storage room?"],
        ["W", "Not yet. I'll look there now."],
        ["M", "Good. If they're not there, don't adjust the number. Let me know first."],
        ["W", "Okay. Should I scan the boxes I've already counted?"],
        ["M", "Yes, please. The system will update automatically."],
      ],
      q: [
        Q("What problem does the woman report?", ["Some boxes are missing", "The computer is broken", "The light bulbs are damaged", "A delivery is late"], 0,
          "Máy báo 40 hộp nhưng chỉ tìm thấy 32 — thiếu hàng."),
        Q("What does the man suggest first?", ["Calling the supplier", "Checking the storage room", "Ordering more boxes", "Changing the number"], 1,
          "“Did you check the back storage room?”"),
        Q("What will happen when the boxes are scanned?", ["A report will be printed", "The man will be notified", "The system will update automatically", "The boxes will be shipped"], 2,
          "“The system will update automatically.”"),
      ],
    },
    speak: {
      q: ["Describe a job or task you find tedious. How do you make it less boring?",
        "Do you think machines will completely replace people in warehouses? Why or why not?"],
    },
    write: {
      s: [["verify", "Viết câu yêu cầu kiểm tra lại thông tin."],
        ["tedious", "Viết câu về một công việc nhàm chán."],
        ["crucial", "Viết câu về một yếu tố cực kỳ quan trọng."]],
      email: {
        task: "Bạn là nhân viên kho. Viết email báo cho quản lý về một sự chênh lệch số liệu hàng tồn bạn phát hiện.",
        use: ["discrepancy", "verify", "inventory"],
        sample: "Dear Kevin,\n\nDuring today's inventory count, I found a discrepancy in the light bulb section. The system shows 40 boxes, but there are only 32 on the shelves and in the storage room. I verified the count twice with the scanner. It is possible that some boxes were sold yesterday without being recorded.\n\nPlease let me know how you would like me to proceed.\n\nBest regards,\nDuc",
      },
    },
  });
})();
