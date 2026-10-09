/*
 * File MẪU để bạn tự thêm bộ từ của mình.
 * Có thể viết từ dạng object (dễ đọc) như bên dưới, hoặc dạng mảng như toeic600.js.
 * Các trường: word (bắt buộc), pos, vi, def, example, family.
 */
EWF.addDeck({
  id: "my-words",
  name: "Từ của tôi",
  description: "Bộ từ mẫu — sửa file data/mau-bo-tu.js để thêm từ bạn gặp hằng ngày",
  lessons: [
    {
      id: 1, title: "Daily conversation", titleVi: "Giao tiếp hằng ngày",
      words: [
        { word: "catch up", pos: "v", vi: "gặp lại để trò chuyện, cập nhật tin tức", def: "to talk to someone you have not seen for a while", example: "Let's grab coffee and catch up this weekend.", family: "" },
        { word: "run late", pos: "v", vi: "bị trễ", def: "to be later than planned", example: "Sorry, I'm running a bit late — see you in 10 minutes.", family: "" },
        { word: "figure out", pos: "v", vi: "tìm ra, hiểu ra", def: "to understand or solve something", example: "I finally figured out how to use this app.", family: "" },
      ],
    },
  ],
});
