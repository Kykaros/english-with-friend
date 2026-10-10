# English With Friend

Trang web học từ vựng tiếng Anh. Có thể học một mình ngay trên máy, không cần internet. Cũng có thể **học cùng bạn ở xa**: xem tiến độ của nhau, thách đấu và làm bài test cuối tuần chung một đề.

## Cách mở

- **Học một mình:** nhấp đúp vào `app/index.html` (nên dùng Edge hoặc Chrome).
- **Học cùng bạn:** làm một lần theo mục [Học cùng bạn](#học-cùng-bạn) bên dưới, sau đó cả hai mở cùng một đường link GitHub Pages (mở được cả trên điện thoại).

## Có gì trong trang

- **600 Essential Words for TOEIC**: 50 bài, mỗi từ có nghĩa tiếng Việt, định nghĩa tiếng Anh, câu ví dụ, họ từ và audio đọc từng bài.
- **Hackers TOEIC Vocabulary**: 30 Day theo chủ đề.
  - Bộ "Hackers TOEIC Vocabulary" có 1.193 từ trọng tâm, kèm định nghĩa và câu ví dụ do mình tự viết, cùng phần luyện 4 kỹ năng cho cả 30 Day.
  - Bộ "Hackers – Từ vựng hoàn chỉnh" có 3.704 từ (cơ bản, 800 và 900 điểm), chỉ gồm nghĩa ngắn.
  - Bản PDF bị thiếu trang 301–311, nên Day 18 chỉ có 10 từ trọng tâm và không có danh sách từ hoàn chỉnh.
- **6 cách học** mỗi bài: Thẻ ghi nhớ · Anh → Việt · Việt → Anh · Nghe & chọn · Điền vào câu · Chính tả.
- **Luyện 4 kỹ năng** mỗi bài (mục *Luyện 4 kỹ năng* trong trang bài học):
  - **Đọc:** đoạn văn kiểu TOEIC Part 7 dùng các từ của bài (bấm vào từ để xem nghĩa), 4 câu hỏi có giải thích tiếng Việt.
  - **Nghe:** hội thoại đọc bằng 2 giọng nam/nữ, chỉnh được tốc độ, 3 câu hỏi; chép chính tả từng câu (tô đỏ từ sai).
  - **Nói:** đọc theo từng từ và câu ví dụ, máy nghe và chấm % từ đúng (cần **Chrome/Edge** và có mạng).
  - **Viết:** đặt câu với từ được giao và viết email 50–80 từ. Máy kiểm tra hình thức (dùng đúng từ, độ dài, viết hoa, lời chào/kết), có bài mẫu. Gửi bạn chấm để được sửa bài.
- **Ôn tập ngắt quãng**: mỗi từ được hẹn ôn lại sau 1 → 2 → 4 → 8 → 16 → 32 ngày; trả lời sai thì quay về từ đầu. Trang chủ cho biết hôm nay cần ôn bao nhiêu từ.
- **Tra từ** bằng tiếng Anh hoặc tiếng Việt (gõ không dấu cũng được).
- **Phát âm** bằng giọng đọc có sẵn của Windows (đổi giọng và tốc độ trong Cài đặt).
- Phím tắt: `Space` lật thẻ, `1`–`4` chấm điểm/chọn đáp án, `S` nghe lại, `Enter` sang câu tiếp.

## Thêm dữ liệu của bạn

**Cách 1, nhanh nhất:** vào mục **Nhập dữ liệu** trên trang, rồi dán bảng copy từ Excel/Google Sheets hoặc chọn file CSV/JSON.
Các cột: `lesson, word, pos, vi, def, example, family`, chỉ `word` là bắt buộc (xem `app/data/mau-nhap.csv`).
Cũng có thể dán đơn giản mỗi dòng một từ: `deadline - hạn chót`.
Bộ từ nhập theo cách này được lưu trong trình duyệt.

**Cách 2, lưu thành file cố định:** tạo một file `.js` trong `app/data/` theo mẫu `mau-bo-tu.js`,
rồi thêm tên file đó vào `app/data/manifest.js`.

## Học cùng bạn

Trang dùng **Supabase** (miễn phí) làm "bên trung gian" để lưu tiến độ và chuyển kết quả giữa hai người.
Mỗi người chỉ ghi dữ liệu của chính mình và chỉ xem được dữ liệu của bạn cùng phòng.

**Có những gì** (mục **Cùng học** trên thanh menu):
- Bảng xếp hạng tuần: số lượt ôn, số từ mới, chuỗi ngày học, số từ đã học và đã thuộc của từng người.
- Dòng hoạt động cập nhật ngay lập tức, ví dụ "Lan vừa học Bài 3: đúng 10/12".
- Nút **Chọc bạn**: người kia nhận thông báo khi mở app.
- **Thách đấu**: tạo đề từ một bài, từ của tuần, từ cần ôn hoặc từ hay sai. Người kia làm đúng bộ câu đó, rồi so điểm; hoà điểm thì ai nhanh hơn thắng.
- **Test cuối tuần**: mặc định vào Chủ nhật (đổi được). Đề có 20 câu, lấy từ những từ cả phòng đã học trong tuần. Người mở app đầu tiên vào hôm đó sẽ tạo đề. Được làm tới trước ngày test của tuần sau. Có lưu lịch sử thắng/thua.
- Tiến độ tự đồng bộ giữa điện thoại và máy tính của chính mình. Lúc mất mạng vẫn học bình thường, có mạng lại thì tự đẩy lên.

### Bước 1: Tạo project Supabase (một người làm, khoảng 5 phút)

1. Vào https://supabase.com → **Start your project** → đăng nhập bằng GitHub.
2. **New project**: đặt tên tuỳ ý, đặt mật khẩu database (lưu lại), chọn Region **Southeast Asia (Singapore)** → **Create new project**. Đợi khoảng 1–2 phút.
3. Mở **SQL Editor** → **New query** → dán toàn bộ nội dung file `supabase/schema.sql` → **Run**. Thấy "Success" là xong.
4. Vào **Authentication → Sign In / Providers → Email**, **tắt "Confirm email"** rồi bấm **Save**. App dùng tên đăng nhập và mật khẩu, không gửi email.
5. Bấm nút **Connect** ở đầu trang project (hoặc vào **Project Settings → API**), copy:
   - **Project URL**, dạng `https://abcxyz.supabase.co`
   - **anon public key** (hoặc **publishable key**). **Không** dùng `service_role` / `secret` key.
6. Mở `app/js/config.js` và điền hai giá trị trên vào `supabaseUrl` và `supabaseKey`.

### Bước 2: Đưa trang lên GitHub Pages

1. Trên GitHub tạo một repo mới, ví dụ `english-with-friend`.
2. Trong thư mục dự án chạy:
   ```
   git init -b main
   git add .
   git commit -m "English With Friend"
   git remote add origin https://github.com/<tên-github>/english-with-friend.git
   git push -u origin main
   ```
   Thư mục `Documment/` (tài liệu gốc) đã được loại trừ trong `.gitignore`.
3. Trên GitHub: **Settings → Pages → Source: GitHub Actions**. Workflow `.github/workflows/pages.yml` sẽ tự đưa thư mục `app/` lên.
   Vài phút sau trang có địa chỉ dạng `https://<tên-github>.github.io/english-with-friend/`.
4. Mỗi lần sửa xong chỉ cần `git add . && git commit -m "..." && git push`, trang sẽ tự cập nhật.

> GitHub Pages miễn phí yêu cầu repo **public**, nên mọi người đều xem được mã nguồn và file audio.
> Khóa `anon` trong `config.js` được thiết kế để công khai, dữ liệu vẫn được bảo vệ bằng Row Level Security.
> Nếu muốn repo **private**, dùng **Cloudflare Pages** (miễn phí): kết nối repo, chọn *Build output directory* = `app`, để trống build command.

### Bước 3: Vào phòng học

1. Mở link ở trên → **Cùng học** → **Tạo tài khoản** (tên đăng nhập, tên hiển thị, mật khẩu).
2. Một người bấm **Tạo phòng** rồi gửi **mã 6 ký tự** cho bạn. Người kia tạo tài khoản và nhập mã để vào phòng.
3. Tiến độ đã có trên máy sẽ được gộp vào tài khoản, không bị mất.

**Quên mật khẩu:** khi tạo tài khoản, app hiện một **mã khôi phục** (dạng `K7QM-2XFD-9PLA`), hãy lưu lại.
Quên mật khẩu thì ở màn hình đăng nhập bấm **Quên mật khẩu?** → nhập tên đăng nhập, mã khôi phục và mật khẩu mới.
Mỗi mã dùng được một lần (dùng xong app cấp mã mới). Nhập sai 5 lần thì bị khoá 1 giờ.
Lỡ mất mã khi vẫn đang đăng nhập: vào **Cùng học** → **Mã khôi phục mới**.
(Project tạo trước khi có tính năng này: chạy thêm file `supabase/recovery.sql` trong SQL Editor.)

Mất cả mã khôi phục: người tạo project vào **SQL Editor** và chạy (thay tên và mật khẩu):
```sql
update auth.users set encrypted_password = extensions.crypt('matkhaumoi', extensions.gen_salt('bf'))
where email = 'tendangnhap@ewf.local';
```
Nếu khi tạo tài khoản báo lỗi email không hợp lệ, đổi `emailDomain` trong `app/js/config.js` thành một tên miền khác (ví dụ `ewf-app.com`). Chỉ đổi trước khi có người đăng ký.

### Chấm bài cho nhau

Bài viết gửi từ phần luyện kỹ năng sẽ hiện ở **Cùng học → Chấm bài**. Người kia chấm 1–5 sao, sửa trực tiếp bài viết và nhận xét. Kết quả hiện trong dòng hoạt động.
Ghi âm chỉ thành viên trong phòng nghe được. Micro chỉ hoạt động khi mở trang qua link GitHub Pages (https) và bạn cho phép trình duyệt dùng micro.

**Test cuối tuần** giờ có thêm 2 câu đọc hiểu và 2 câu nghe hiểu, lấy từ bài cả phòng học nhiều nhất trong tuần.

## Lưu ý

Khi học một mình, tiến độ chỉ được lưu trong trình duyệt đang dùng. Muốn chuyển sang máy khác thì vào **Cài đặt → Xuất file tiến độ**, hoặc đăng nhập ở mục **Cùng học** để tự đồng bộ.

## Cấu trúc

```
app/
  index.html          trang chính
  css/style.css       giao diện (tự đổi sáng/tối theo hệ điều hành)
  js/core.js          nạp dữ liệu, lưu tiến độ, thuật toán ôn tập, gộp dữ liệu khi đồng bộ
  js/app.js           các trang và các chế độ học
  js/config.js        địa chỉ + khóa Supabase (điền ở Bước 1)
  js/sync.js          đăng nhập, phòng học, đồng bộ tiến độ, dòng hoạt động
  js/social.js        trang Cùng học, thách đấu, test cuối tuần
  js/skills.js        luyện 4 kỹ năng (Đọc, Nghe, Nói, Viết) và trang Chấm bài
  data/manifest.js    danh sách file dữ liệu được nạp
  data/toeic600.js    600 từ TOEIC
  data/toeic600-skills-1..5.js  nội dung đọc/nghe/nói/viết cho 50 bài (mỗi file 10 bài)
  data/hackers-vocab.js         Hackers: từ trọng tâm 30 Day
  data/hackers-skills-1..3.js   Hackers: đọc/nghe/nói/viết cho 30 Day
  data/hackers-plus.js          Hackers: từ vựng hoàn chỉnh (cơ bản/800/900)
  data/mau-bo-tu.js   bộ từ mẫu để bạn tự sửa
  data/mau-nhap.csv   file CSV mẫu để nhập
  audio/toeic600/     audio đọc từ của từng bài (1–50, thiếu bài 14)
supabase/schema.sql   cấu trúc dữ liệu + phân quyền trên Supabase (chạy ở Bước 1)
supabase/recovery.sql mã khôi phục mật khẩu (đã gộp trong schema.sql; project cũ chạy thêm file này)
.github/workflows/    tự đưa app/ lên GitHub Pages
```
