/* Nội dung luyện 4 kỹ năng cho Hackers TOEIC Vocabulary — Day 1–10. Cấu trúc: xem toeic600-skills-1.js. Nội dung viết mới. */
(function () {
  const Q = (q, o, a, why) => ({ q, o, a, why });
  const add = (id, data) => EWF.addSkills("hackers", id, data);

  add(1, {
    read: {
      type: "Job posting", title: "Customer Service Team Leader",
      text: `Brightline Telecom has an opening for a Customer Service Team Leader at its Hanoi office.

Requirements: Applicants must hold a degree in business or a related field and have at least three years of managerial experience. Proficiency in English is essential, and candidates should be familiar with call-center software. Those who lack experience in team management will not be considered.

The successful candidate will be diligent, confident, and highly professional. Our recruiters will contact qualified candidates within two weeks to set up an interview.

We offer a competitive wage, paid training, and excellent conditions of employment. Full-time staff are entitled to 15 days of paid leave per year.

To apply, send your résumé and two references to jobs@brightline.vn. Prospective applicants who meet all requirements are encouraged to apply before May 30.`,
      q: [
        Q("What is the purpose of the notice?", ["To announce a promotion", "To advertise a job opening", "To introduce new software", "To describe a training course"], 1,
          "Tin tuyển dụng vị trí Customer Service Team Leader — “has an opening”."),
        Q("Who will NOT be considered?", ["People without a business degree in English", "People who live outside Hanoi", "People who lack team management experience", "People who have worked in call centers"], 2,
          "“Those who lack experience in team management will not be considered.”"),
        Q("What benefit is mentioned?", ["Paid training", "A company car", "Free lunch", "Health club membership"], 0,
          "“We offer a competitive wage, paid training...”"),
        Q("The word “entitled” in paragraph 4 is closest in meaning to", ["required", "named", "invited", "given the right"], 3,
          "“entitled to 15 days of paid leave” = có quyền được hưởng → “given the right”."),
      ],
    },
    listen: {
      title: "After the interview",
      lines: [
        ["W", "So, how did the interview with the last applicant go?"],
        ["M", "Very well. She meets all our requirements, and her references are excellent."],
        ["W", "What about her managerial experience?"],
        ["M", "She has led a team of ten people for four years. I was really impressed."],
        ["W", "Great. Should we offer her the position?"],
        ["M", "Yes. I'll call her this afternoon and arrange a start date."],
      ],
      q: [
        Q("What are the speakers discussing?", ["A job applicant", "A new product", "A training session", "A customer complaint"], 0,
          "“the interview with the last applicant”."),
        Q("What impressed the man?", ["Her language skills", "Her managerial experience", "Her degree", "Her salary request"], 1,
          "Cô ấy đã quản lý nhóm 10 người trong 4 năm — “I was really impressed”."),
        Q("What will the man do this afternoon?", ["Interview another candidate", "Check her references", "Call the applicant", "Post a new ad"], 2,
          "“I'll call her this afternoon and arrange a start date.”"),
      ],
    },
    speak: {
      q: ["Describe the qualities that make a candidate attractive to an employer.",
        "How would you prepare for an important job interview?"],
    },
    write: {
      s: [["qualified", "Viết câu nói bạn đủ trình độ cho một công việc."],
        ["requirement", "Viết câu nêu một yêu cầu bắt buộc của vị trí tuyển dụng."],
        ["hire", "Viết câu về việc công ty thuê thêm người."]],
      email: {
        task: "Viết email ứng tuyển vị trí Customer Service Team Leader ở trên: nêu kinh nghiệm và nói rằng bạn gửi kèm CV.",
        use: ["applicant", "requirement", "reference"],
        sample: "Dear Hiring Manager,\n\nI would like to apply for the Customer Service Team Leader position. I have a degree in business and four years of managerial experience at a call center. I believe I meet all of your requirements, including proficiency in English. As an applicant, I would be happy to provide additional references. Please find my résumé attached.\n\nThank you for your consideration.\n\nSincerely,\nThao Nguyen",
      },
    },
  });

  add(2, {
    read: {
      type: "Memo", title: "Updated building access policy",
      text: `To: All employees
From: Facilities Management

Starting next Monday, a revised building access policy will take effect. According to the new regulations, all staff must wear their ID badges at all times. There will be no exceptions.

Access to the server room and the laboratory is restricted to authorized personnel only. Employees who need to enter these areas must request permission from their department head and receive written approval.

We ask that you refrain from propping open fire doors, as this is prohibited by city safety codes. Security guards will enforce the policy strictly, and inspections will be carried out monthly.

These changes are part of a new approach to protecting company information. If you have any concerns, please contact Facilities by e-mail. Thank you for your cooperation and for complying with these procedures.`,
      q: [
        Q("What is the memo about?", ["A new dress code", "A change in building access rules", "A fire drill", "An office move"], 1,
          "Chính sách ra vào tòa nhà được sửa đổi."),
        Q("What must employees do to enter the server room?", ["Show their ID at reception", "Call security", "Get written approval from their department head", "Complete a training course"], 2,
          "“request permission from their department head and receive written approval.”"),
        Q("Why should employees not prop open fire doors?", ["It is against city safety codes", "It wastes energy", "It lets in noise", "It damages the doors"], 0,
          "“this is prohibited by city safety codes.”"),
        Q("How often will inspections take place?", ["Daily", "Weekly", "Every year", "Monthly"], 3,
          "“inspections will be carried out monthly.”"),
      ],
    },
    listen: {
      title: "A forgotten badge",
      lines: [
        ["M", "Excuse me, I left my ID badge at home. Can I still go up to my office?"],
        ["W", "I'm sorry, but the new policy doesn't allow any exceptions."],
        ["M", "I see. Is there anything I can do?"],
        ["W", "You can get a temporary pass, but your manager needs to approve it."],
        ["M", "All right. I'll call her now."],
        ["W", "Thank you. Once she confirms, I'll print the pass for you."],
      ],
      q: [
        Q("What is the man's problem?", ["He forgot his ID badge", "He is late for a meeting", "He lost his key", "His office is locked"], 0,
          "“I left my ID badge at home.”"),
        Q("What does the woman say about the policy?", ["It will change soon", "It has no exceptions", "It applies only to visitors", "It is optional"], 1,
          "“the new policy doesn't allow any exceptions.”"),
        Q("What must happen before the man gets a pass?", ["He must pay a fee", "He must fill out a form", "His manager must approve it", "He must wait until noon"], 2,
          "“your manager needs to approve it.”"),
      ],
    },
    speak: {
      q: ["Describe a rule at your workplace or school that you think is important.",
        "Do you think strict rules make people work better? Why or why not?"],
    },
    write: {
      s: [["comply", "Viết câu yêu cầu nhân viên tuân thủ quy định an toàn."],
        ["permission", "Viết câu về việc cần xin phép trước khi làm gì đó."],
        ["exception", "Viết câu khẳng định quy định không có ngoại lệ."]],
      email: {
        task: "Bạn là quản lý. Viết email nhắc nhân viên về quy định mới: phải đeo thẻ nhân viên và không được vào khu vực hạn chế khi chưa được phép.",
        use: ["regulation", "access", "permission"],
        sample: "Dear team,\n\nThis is a reminder about the new building regulations that start on Monday. Please wear your ID badge at all times. Access to the server room is now restricted, so you must ask for permission from me before entering. Security staff will check badges at every entrance.\n\nThank you for your cooperation.\n\nBest regards,\nMinh Tran",
      },
    },
  });

  add(3, {
    read: {
      type: "E-mail", title: "Project deadline and assignments",
      text: `To: Marketing division
From: Laura Chen, Department Manager
Subject: Spring catalog

Hi everyone,

I'd like to remind you that the deadline for the spring catalog is Friday, March 14. Please submit your sections to me directly by 5 p.m. that day.

To help us work more efficiently, I have divided the entire project into smaller assignments. Ken will oversee the layout, and Mia will manage the product photos. I will delegate the remaining tasks at Tuesday's meeting, so attendance is required.

If you need an extension, please notify me as soon as possible. Late requests may not be approved, since the printer has asked for the files on Monday.

Finally, product samples from our suppliers have arrived at headquarters. They are stored in Room 210 for anyone who wants to check them.

Thanks for your hard work,
Laura`,
      q: [
        Q("When is the catalog deadline?", ["Monday", "Tuesday", "Friday, March 14", "Room 210"], 2,
          "“the deadline for the spring catalog is Friday, March 14.”"),
        Q("What will Ken do?", ["Oversee the layout", "Take product photos", "Contact the printer", "Write the text"], 0,
          "“Ken will oversee the layout”."),
        Q("What should staff do if they need more time?", ["Ask Ken", "Tell Laura early", "Work on the weekend", "Contact the printer"], 1,
          "“If you need an extension, please notify me as soon as possible.”"),
        Q("Where are the product samples?", ["At the printer", "At the supplier", "In Laura's office", "In Room 210"], 3,
          "“They are stored in Room 210”."),
      ],
    },
    listen: {
      title: "Asking for an extension",
      lines: [
        ["M", "Laura, do you have a minute? I'm worried about the catalog deadline."],
        ["W", "Sure. What's the problem?"],
        ["M", "Some of the product samples arrived late, so I haven't finished the descriptions."],
        ["W", "How much more time do you need?"],
        ["M", "Just one more day. I could submit everything on Saturday morning."],
        ["W", "That's fine, but please send it before nine. The printer needs it by Monday."],
      ],
      q: [
        Q("Why is the man worried?", ["He may miss a deadline", "He lost a file", "His computer broke", "He is sick"], 0,
          "“I'm worried about the catalog deadline.”"),
        Q("Why hasn't the man finished?", ["He was on vacation", "Some samples arrived late", "The printer was busy", "He had another project"], 1,
          "“Some of the product samples arrived late”."),
        Q("When must the man send his work?", ["Friday afternoon", "Monday morning", "Saturday before nine", "Sunday night"], 2,
          "“please send it before nine” (Saturday morning)."),
      ],
    },
    speak: {
      q: ["How do you organize your work when you have several deadlines at the same time?",
        "Is it better for a manager to delegate tasks or do important work alone? Explain."],
    },
    write: {
      s: [["deadline", "Viết câu về một hạn chót bạn sắp phải hoàn thành."],
        ["submit", "Viết câu nhắc đồng nghiệp nộp báo cáo."],
        ["notify", "Viết câu yêu cầu thông báo khi có thay đổi lịch."]],
      email: {
        task: "Viết email xin sếp gia hạn thêm 2 ngày để hoàn thành báo cáo, nêu lý do ngắn gọn.",
        use: ["deadline", "extension", "submit"],
        sample: "Dear Ms. Chen,\n\nI am writing to ask for a short extension on the sales report. The deadline is Wednesday, but some figures from our branch offices have not arrived yet. If possible, I would like to submit the report on Friday instead. I will make sure it is complete and accurate.\n\nThank you for your understanding.\n\nBest regards,\nKen",
      },
    },
  });

  add(4, {
    read: {
      type: "Notice", title: "Team coordination workshop",
      text: `To all employees:

Human Resources will conduct a one-day workshop on team coordination on June 12. All personnel who supervise three or more coworkers are required to attend. Other employees may join voluntarily.

The workshop will help managers assign tasks more skillfully, adjust schedules when problems occur, and deal with conflicts in a respectful manner. Participants will also learn how to keep confidential information secure.

Last year's session was a great success, and most attendees said they were satisfied with the program. One leading expert, Dr. Paul Kim, will direct the afternoon session.

Please register by June 5 through the staff directory page. Seats are limited, so we encourage you to sign up early. If you are unable to attend, please inform your supervisor.`,
      q: [
        Q("Who must attend the workshop?", ["All employees", "New staff only", "Employees who supervise three or more people", "Human Resources staff"], 2,
          "“All personnel who supervise three or more coworkers are required to attend.”"),
        Q("What will participants learn?", ["How to keep information secure", "How to use new software", "How to hire staff", "How to write reports"], 0,
          "“learn how to keep confidential information secure.”"),
        Q("Who is Dr. Paul Kim?", ["A new manager", "An expert leading a session", "A Human Resources officer", "A former employee"], 1,
          "“One leading expert, Dr. Paul Kim, will direct the afternoon session.”"),
        Q("What should employees do if they cannot attend?", ["Register online", "Call Dr. Kim", "Watch a video", "Inform their supervisor"], 3,
          "“If you are unable to attend, please inform your supervisor.”"),
      ],
    },
    listen: {
      title: "A busy week",
      lines: [
        ["W", "Tom, you look tired. Is everything okay?"],
        ["M", "I'm responsible for two projects this week, and one of my coworkers is sick."],
        ["W", "Why don't you assign some of the tasks to the new intern?"],
        ["M", "Good idea. She's very capable, and she offered to assist me yesterday."],
        ["W", "And let me know if I can help with the client report."],
        ["M", "Thanks. That would be great."],
      ],
      q: [
        Q("Why is the man tired?", ["He has too much work", "He worked overnight", "He is sick", "He traveled a lot"], 0,
          "Anh phụ trách 2 dự án và một đồng nghiệp bị ốm."),
        Q("What does the woman suggest?", ["Taking a day off", "Giving tasks to the intern", "Asking the manager for help", "Postponing a project"], 1,
          "“assign some of the tasks to the new intern”."),
        Q("What does the woman offer to help with?", ["A presentation", "Hiring staff", "The client report", "A training session"], 2,
          "“let me know if I can help with the client report.”"),
      ],
    },
    speak: {
      q: ["Describe a good coworker you have worked or studied with.",
        "What should a supervisor do when two team members disagree?"],
    },
    write: {
      s: [["assign", "Viết câu về việc giao nhiệm vụ cho một thành viên trong nhóm."],
        ["confidential", "Viết câu nhắc giữ bí mật thông tin."],
        ["supervise", "Viết câu nói ai đang giám sát một dự án."]],
      email: {
        task: "Viết email gửi nhóm của bạn phân công nhiệm vụ cho dự án mới và nhắc giữ bí mật tài liệu.",
        use: ["assign", "responsible", "confidential"],
        sample: "Hi team,\n\nI have assigned tasks for the new client project. Linh is responsible for market research, and Duc will prepare the budget. I will supervise the whole project and meet with the client. Please remember that all project documents are confidential and should not be shared outside the team.\n\nLet me know if you have any questions.\n\nBest,\nHoa",
      },
    },
  });

  add(5, {
    read: {
      type: "Announcement", title: "New online request system",
      text: `Dear staff,

We are pleased to announce that our new online request system will be implemented on September 1. The system is more sophisticated than the old paper forms and will allow us to respond to your requests in a more timely manner.

All requests for equipment replacement, repairs, and office supplies must now be submitted online. Once you submit a request, you will receive an automatic e-mail confirming that it has been received. Our team will inform you promptly when your request has been fulfilled.

An overview of the system is available on the intranet, and the IT department will demonstrate its main features at a short session on August 28. The system will be accessible from any office computer.

We welcome your feedback during the first month. Please send any comments directly to the facilities department.`,
      q: [
        Q("What is being announced?", ["A new office", "A new online request system", "A new IT manager", "A change in working hours"], 1,
          "“our new online request system will be implemented on September 1.”"),
        Q("What will employees receive after submitting a request?", ["A phone call", "A paper form", "An automatic e-mail", "A visit from IT"], 2,
          "“you will receive an automatic e-mail confirming that it has been received.”"),
        Q("What will happen on August 28?", ["A demonstration of the system", "The system will start", "Feedback will be collected", "Old forms will be collected"], 0,
          "“the IT department will demonstrate its main features at a short session on August 28.”"),
        Q("Where should comments be sent?", ["To the IT department", "To their manager", "To the intranet", "To the facilities department"], 3,
          "“send any comments directly to the facilities department.”"),
      ],
    },
    listen: {
      title: "A broken monitor",
      lines: [
        ["M", "Hi, this is Peter from accounting. My monitor stopped working this morning."],
        ["W", "Have you submitted a request through the new online system?"],
        ["M", "Not yet. I wasn't sure how to use it."],
        ["W", "It's easy. Just open the facilities page and choose 'equipment replacement'."],
        ["M", "Okay. How long does it usually take?"],
        ["W", "We'll bring you a replacement by tomorrow morning at the latest."],
      ],
      q: [
        Q("What is the man's problem?", ["His monitor is broken", "He lost a file", "His password expired", "His phone does not work"], 0,
          "“My monitor stopped working this morning.”"),
        Q("What does the woman tell him to do?", ["Call IT", "Submit a request online", "Buy a new monitor", "Restart his computer"], 1,
          "Cô hướng dẫn gửi yêu cầu qua hệ thống online."),
        Q("When will the man get a replacement?", ["In an hour", "Next week", "By tomorrow morning", "This afternoon"], 2,
          "“by tomorrow morning at the latest.”"),
      ],
    },
    speak: {
      q: ["Describe a time you gave feedback to improve something at work or school.",
        "Do you prefer paper forms or online systems? Why?"],
    },
    write: {
      s: [["promptly", "Viết câu về việc trả lời email nhanh chóng."],
        ["feedback", "Viết câu xin góp ý về một dịch vụ."],
        ["replacement", "Viết câu yêu cầu thay thế một thiết bị hỏng."]],
      email: {
        task: "Viết email cho bộ phận cơ sở vật chất yêu cầu thay máy in hỏng ở phòng bạn và hỏi khi nào có máy mới.",
        use: ["replacement", "request", "promptly"],
        sample: "Dear Facilities Department,\n\nI would like to request a replacement for the printer in Room 305. It has stopped working, and our team cannot print any documents. We have several important reports to send this week. I would appreciate it if you could handle this promptly and let me know when a new printer will arrive.\n\nThank you.\n\nBest regards,\nPeter",
      },
    },
  });

  add(6, {
    read: {
      type: "Advertisement", title: "Riverside Museum: summer exhibition",
      text: `This summer, the Riverside Museum presents "Treasures of the Silk Road," a special exhibition featuring more than 300 objects from its permanent collection, along with rare antiques lent by private collectors.

Visitors can admire ancient manuscripts, jewelry, and pottery, and watch live demonstrations by local artists every Saturday. The museum's popular guided tours are informative and beneficial for students.

Admission is free for members. Non-members pay $12, and children under 12 must be accompanied by an adult.

To celebrate its 50th anniversary, the museum will hold a fund-raising banquet on August 20. A famous author will present her new book about the Silk Road. All donations will support education programs for local schools.

For tickets and a variety of membership options, visit our website or call 555-0189.`,
      q: [
        Q("What is the exhibition about?", ["Modern art", "The Silk Road", "Local history", "Famous authors"], 1,
          "“Treasures of the Silk Road”."),
        Q("What happens every Saturday?", ["Free admission", "Live demonstrations by artists", "A banquet", "Book signings"], 1,
          "“watch live demonstrations by local artists every Saturday.”"),
        Q("Who must be accompanied by an adult?", ["Students", "Members", "Children under 12", "Tour groups"], 2,
          "“children under 12 must be accompanied by an adult.”"),
        Q("What will donations from the banquet support?", ["New exhibits", "Building repairs", "An author's book", "Education programs"], 3,
          "“All donations will support education programs for local schools.”"),
      ],
    },
    listen: {
      title: "Weekend plans",
      lines: [
        ["W", "Are you doing anything this weekend?"],
        ["M", "I'm thinking of visiting the new exhibition at the Riverside Museum."],
        ["W", "Oh, the Silk Road one? I heard it's fascinating."],
        ["M", "Yes. And there's a live demonstration of pottery on Saturday."],
        ["W", "Can I come along? I have a membership, so admission is free for me."],
        ["M", "Sure. Let's meet at the entrance at ten."],
      ],
      q: [
        Q("What is the man planning to do?", ["Visit a museum", "Go shopping", "Watch a movie", "Attend a banquet"], 0,
          "“visiting the new exhibition at the Riverside Museum.”"),
        Q("Why is admission free for the woman?", ["She is a student", "She has a membership", "She works there", "It is a free day"], 1,
          "“I have a membership, so admission is free for me.”"),
        Q("Where will the speakers meet?", ["At a café", "At the station", "At the museum entrance", "At the woman's office"], 2,
          "“Let's meet at the entrance at ten.”"),
      ],
    },
    speak: {
      q: ["Describe a museum, exhibition, or festival you have enjoyed.",
        "How do you like to spend your free time on weekends?"],
    },
    write: {
      s: [["exhibition", "Viết câu giới thiệu một triển lãm sắp tới."],
        ["admission", "Viết câu về giá vé vào cửa."],
        ["donation", "Viết câu kêu gọi quyên góp cho một mục đích tốt."]],
      email: {
        task: "Viết email mời đồng nghiệp đi xem triển lãm cuối tuần: giới thiệu triển lãm, thời gian, giá vé.",
        use: ["exhibition", "admission", "upcoming"],
        sample: "Hi everyone,\n\nWould you like to visit the upcoming exhibition at the Riverside Museum this Saturday? It is called \"Treasures of the Silk Road\" and includes many rare antiques. Admission is $12, but it is free for members. There is also a live pottery demonstration at 11 a.m.\n\nLet me know by Thursday if you want to join.\n\nCheers,\nLan",
      },
    },
  });

  add(7, {
    read: {
      type: "Article", title: "Survey shows demand for healthy snacks",
      text: `A recent survey by the market research firm Data Plus found that consumer demand for healthy snacks has grown for five consecutive years. More than 60 percent of respondents said they prefer snacks with less sugar.

According to the analysis, the snack market is extremely competitive. Several large brands now spend heavily on advertising campaigns targeting young adults. However, analysts say there is still a gap for smaller companies that focus on local ingredients.

One such company, Green Bite, plans to expand into three new cities next year. "We are watching the market closely," said its marketing director. "Seasonal products, such as mango chips in summer, have been especially popular."

Experts expect competition to become even stronger, and they say companies must cooperate with stores to stay ahead.`,
      q: [
        Q("What did the survey find?", ["Snack prices are falling", "Demand for healthy snacks is growing", "Young adults eat fewer snacks", "Large brands are losing money"], 1,
          "“consumer demand for healthy snacks has grown for five consecutive years.”"),
        Q("What opportunity do analysts see for small companies?", ["Selling cheaper snacks", "Using local ingredients", "Advertising on TV", "Exporting abroad"], 1,
          "“there is still a gap for smaller companies that focus on local ingredients.”"),
        Q("What does Green Bite plan to do?", ["Lower its prices", "Hire a new director", "Expand into new cities", "Stop seasonal products"], 2,
          "“plans to expand into three new cities next year.”"),
        Q("The word “consecutive” in paragraph 1 is closest in meaning to", ["difficult", "different", "recent", "successive"], 3,
          "“consecutive” = liên tiếp → “successive”."),
      ],
    },
    listen: {
      title: "Survey results",
      lines: [
        ["M", "Have you seen the results of our customer survey?"],
        ["W", "Yes. Most respondents want more seasonal flavors."],
        ["M", "Interesting. Our competitors already offer three summer products."],
        ["W", "Then we should launch a campaign before June."],
        ["M", "I agree. Can you prepare a short analysis for Friday's meeting?"],
        ["W", "Sure, I'll start on it today."],
      ],
      q: [
        Q("What did most respondents want?", ["Lower prices", "More seasonal flavors", "Bigger packages", "Faster delivery"], 1,
          "“Most respondents want more seasonal flavors.”"),
        Q("What does the woman suggest?", ["Launching a campaign before June", "Doing another survey", "Lowering prices", "Hiring more staff"], 0,
          "“we should launch a campaign before June.”"),
        Q("What will the woman prepare?", ["A product sample", "A budget", "An analysis", "A press release"], 2,
          "“prepare a short analysis for Friday's meeting”."),
      ],
    },
    speak: {
      q: ["Describe a product that became very popular recently. Why do you think people like it?",
        "How can a small company compete with large brands?"],
    },
    write: {
      s: [["survey", "Viết câu về một cuộc khảo sát khách hàng."],
        ["competition", "Viết câu về sự cạnh tranh trong một ngành."],
        ["campaign", "Viết câu về một chiến dịch quảng cáo."]],
      email: {
        task: "Viết email cho sếp tóm tắt kết quả khảo sát khách hàng và đề xuất một chiến dịch quảng cáo.",
        use: ["survey", "respondent", "campaign"],
        sample: "Dear Mr. Park,\n\nI have finished analyzing our customer survey. About 65% of respondents said they would like more seasonal flavors, especially in summer. Since our competitors already offer such products, I suggest we start an advertising campaign for our new mango snack in May. I will send you a detailed plan by Thursday.\n\nBest regards,\nMai",
      },
    },
  });

  add(8, {
    read: {
      type: "E-mail", title: "Plan for the new loyalty program",
      text: `To: Marketing team
From: Daniel Ross
Subject: Loyalty program

Team,

As discussed, our strategy for next year is to attract more regular customers rather than spend aggressively on advertisements. Our analysis indicates that customers who join loyalty programs buy 30% more each year.

We will introduce a creative points system in March. Customers will earn points instantly with each purchase and can use them for discounts. To create a strong incentive, new members will receive 500 bonus points.

Initial feedback from a test group has been largely favorable, although some members said the rules were not clear. We need to resolve this before the launch.

Please forward any ideas to me by Friday. I'd prefer short proposals, ideally one page each. We'll discuss them at Monday's meeting.

Daniel`,
      q: [
        Q("What is the main strategy for next year?", ["Spending more on ads", "Attracting regular customers", "Opening new stores", "Lowering prices"], 1,
          "“our strategy for next year is to attract more regular customers”."),
        Q("What will new members receive?", ["A free gift", "500 bonus points", "A 30% discount", "Free shipping"], 1,
          "“new members will receive 500 bonus points.”"),
        Q("What problem did the test group mention?", ["The rules were unclear", "Points expired too fast", "Discounts were too small", "The app was slow"], 0,
          "“some members said the rules were not clear.”"),
        Q("What does Daniel ask the team to do by Friday?", ["Join the program", "Test the app", "Contact customers", "Send short proposals"], 3,
          "“Please forward any ideas to me by Friday... short proposals”."),
      ],
    },
    listen: {
      title: "Loyalty program feedback",
      lines: [
        ["W", "Daniel, I've reviewed the comments from the test group."],
        ["M", "Good. What did they say?"],
        ["W", "Most liked earning points instantly, but they found the rules confusing."],
        ["M", "Then let's simplify them. Maybe one simple rule: one point for every dollar."],
        ["W", "That's easy to understand. I'll update the brochure."],
        ["M", "Great. Please send me the new version before Monday."],
      ],
      q: [
        Q("What did the test group like?", ["The discounts", "Earning points instantly", "The brochure", "The design"], 1,
          "“Most liked earning points instantly”."),
        Q("What does the man suggest?", ["Simplifying the rules", "Canceling the program", "Giving more bonus points", "Testing again"], 0,
          "“let's simplify them... one point for every dollar.”"),
        Q("What will the woman update?", ["The website", "The budget", "The brochure", "The contract"], 2,
          "“I'll update the brochure.”"),
      ],
    },
    speak: {
      q: ["Are you a member of any loyalty or rewards program? Describe how it works.",
        "Which kind of advertising influences you the most? Explain."],
    },
    write: {
      s: [["attract", "Viết câu về cách thu hút khách hàng mới."],
        ["strategy", "Viết câu nêu một chiến lược kinh doanh."],
        ["incentive", "Viết câu về một ưu đãi khuyến khích khách mua hàng."]],
      email: {
        task: "Viết email gửi khách hàng giới thiệu chương trình tích điểm mới và ưu đãi cho thành viên mới.",
        use: ["introduce", "customer", "incentive"],
        sample: "Dear valued customer,\n\nWe are excited to introduce our new loyalty program starting in March. You will earn one point for every dollar you spend, and you can use your points for discounts on future purchases. As a special incentive, every new member will receive 500 bonus points. Signing up is free and takes only a minute on our website.\n\nThank you for shopping with us.\n\nBest regards,\nThe Fresh Mart Team",
      },
    },
  });

  add(9, {
    read: {
      type: "Article", title: "Tourism helps the local economy thrive",
      text: `After three years of stagnant growth, the economy of Hoa Binh Province is showing promising signs. According to new figures, tourism revenue rose dramatically last year, and analysts expect the boom to continue.

The provincial director of tourism said that new hotels and better roads have boosted visitor numbers. "Business has been brisk, especially on weekends," said one restaurant owner.

However, some experts warn that the region remains too dependent on a single industry. If fuel prices soar, the number of visitors could dwindle quickly. They also point out that limited public transportation may impede further growth.

The provincial government is now considering a plan to support local farms and small factories. "We want our prosperity to be shared evenly," the director said.`,
      q: [
        Q("What has happened to tourism revenue?", ["It has fallen", "It has risen sharply", "It has stayed the same", "It is unknown"], 1,
          "“tourism revenue rose dramatically last year”."),
        Q("What has helped increase visitor numbers?", ["Lower taxes", "New hotels and better roads", "A new airport", "Free tours"], 1,
          "“new hotels and better roads have boosted visitor numbers.”"),
        Q("What concern do experts mention?", ["The region depends too much on one industry", "Hotels are too expensive", "There are too many tourists", "Farms are closing"], 0,
          "“the region remains too dependent on a single industry.”"),
        Q("What is the government considering?", ["Building an airport", "Raising taxes", "Closing factories", "Supporting farms and small factories"], 3,
          "“a plan to support local farms and small factories.”"),
      ],
    },
    listen: {
      title: "Economic news",
      lines: [
        ["M", "Did you read the report on the local economy?"],
        ["W", "Yes. Tourism is booming, but analysts are worried about fuel prices."],
        ["M", "Right. If prices soar, fewer people will travel."],
        ["W", "Our restaurant depends on tourists, so that could be a problem."],
        ["M", "Maybe we should attract more local customers, too."],
        ["W", "Good idea. Let's offer a weekday lunch menu for office workers."],
      ],
      q: [
        Q("What are analysts worried about?", ["Fuel prices", "Bad weather", "New competitors", "Taxes"], 0,
          "“analysts are worried about fuel prices.”"),
        Q("What kind of business do the speakers run?", ["A hotel", "A restaurant", "A travel agency", "A factory"], 1,
          "“Our restaurant depends on tourists”."),
        Q("What does the woman suggest?", ["Raising prices", "Closing on weekdays", "Offering a weekday lunch menu", "Hiring more staff"], 2,
          "“offer a weekday lunch menu for office workers.”"),
      ],
    },
    speak: {
      q: ["How has the economy of your city or country changed in recent years?",
        "Is tourism good or bad for a local community? Give reasons."],
    },
    write: {
      s: [["boost", "Viết câu về điều gì đó thúc đẩy doanh số."],
        ["likely", "Viết câu dự đoán điều có khả năng xảy ra năm tới."],
        ["costly", "Viết câu về một quyết định tốn kém."]],
      email: {
        task: "Viết email cho đối tác dự báo tình hình kinh doanh quý tới và đề xuất một giải pháp nếu chi phí tăng.",
        use: ["likely", "boost", "costly"],
        sample: "Dear Mr. Lam,\n\nBased on recent figures, sales are likely to grow by about 10% next quarter, thanks to the busy tourist season. However, fuel prices are rising, and shipping may become costly. To protect our profits, I suggest we order supplies early and share delivery trucks with other shops. This could also boost our efficiency.\n\nBest regards,\nHanh",
      },
    },
  });

  add(10, {
    read: {
      type: "Store notice", title: "Return and refund policy",
      text: `Thank you for shopping at HomeLink Electronics.

Items purchased at our stores may be returned within 30 days for a full refund. Please bring your receipt and the original packaging. Clearance items and gift cards cannot be returned.

All large appliances come with a two-year warranty. If a product stops working during this period, our experienced technicians will repair or replace it free of charge.

Customers may also pay for purchases over $300 in six monthly installments with no extra charge. This offer is valid until the end of the year.

Delivery is free within the city for orders over $100. Our staff will carefully install your appliance and explain the instructions.

Prices and offers are subject to change without notice. For more information, please ask an assistant.`,
      q: [
        Q("How long do customers have to return an item?", ["7 days", "14 days", "30 days", "Two years"], 2,
          "“may be returned within 30 days for a full refund.”"),
        Q("What cannot be returned?", ["Large appliances", "Clearance items", "Items bought online", "Items over $300"], 1,
          "“Clearance items and gift cards cannot be returned.”"),
        Q("What is offered for purchases over $300?", ["Free installation", "A gift card", "Payment in installments", "A longer warranty"], 2,
          "“pay... in six monthly installments with no extra charge.”"),
        Q("When is delivery free?", ["Always", "For members only", "On weekends", "For city orders over $100"], 3,
          "“Delivery is free within the city for orders over $100.”"),
      ],
    },
    listen: {
      title: "Returning a kettle",
      lines: [
        ["W", "Hi, I'd like to return this electric kettle. It stopped working."],
        ["M", "I'm sorry about that. When did you buy it?"],
        ["W", "About two weeks ago. Here's the receipt."],
        ["M", "Thank you. Would you like a refund or a replacement?"],
        ["W", "A replacement, please. I really like this model."],
        ["M", "No problem. I'll get a new one from the storage room."],
      ],
      q: [
        Q("Why does the woman want to return the kettle?", ["It stopped working", "It is the wrong color", "It was too expensive", "She received it as a gift"], 0,
          "“It stopped working.”"),
        Q("When did she buy the kettle?", ["Yesterday", "About two weeks ago", "Last year", "A month ago"], 1,
          "“About two weeks ago.”"),
        Q("What does the woman choose?", ["A refund", "A store credit", "A replacement", "A repair"], 2,
          "“A replacement, please.”"),
      ],
    },
    speak: {
      q: ["Describe a time you returned something you bought. What happened?",
        "Do you prefer to pay in cash, by card, or in installments? Why?"],
    },
    write: {
      s: [["refund", "Viết câu yêu cầu hoàn tiền cho món hàng lỗi."],
        ["warranty", "Viết câu về thời hạn bảo hành của một sản phẩm."],
        ["receipt", "Viết câu nhắc khách giữ hóa đơn."]],
      email: {
        task: "Bạn mua một chiếc máy hút bụi online nhưng bị hỏng sau một tuần. Viết email yêu cầu cửa hàng đổi hoặc hoàn tiền.",
        use: ["purchase", "refund", "warranty"],
        sample: "Dear HomeLink Electronics,\n\nI made a purchase on your website on May 2: a VX200 vacuum cleaner. Unfortunately, it stopped working after only one week. I believe this problem is covered by the warranty. I would prefer a full refund, but a replacement would also be acceptable. I have attached a copy of my receipt.\n\nThank you for your help.\n\nSincerely,\nTuan Le",
      },
    },
  });
})();
