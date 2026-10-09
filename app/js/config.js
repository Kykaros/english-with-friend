/* Kết nối Supabase để học cùng bạn. Để trống thì app chạy một mình như cũ.
   Lấy 2 giá trị này ở Supabase Dashboard → Project Settings → API (hoặc nút "Connect"):
   - supabaseUrl: "Project URL", dạng https://xxxx.supabase.co
   - supabaseKey: khóa "anon" / "publishable" (KHÔNG dùng khóa service_role / secret).
   Khóa anon được thiết kế để công khai; dữ liệu được bảo vệ bằng Row Level Security trong supabase/schema.sql. */
window.EWF_CONFIG = {
  supabaseUrl: "https://rostbjuwepvkbwmfzlvr.supabase.co",
  supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvc3RianV3ZXB2a2J3bWZ6bHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1NTQxMTksImV4cCI6MjEwNzEzMDExOX0.r-6WCHSnAGVv9_yMIsPP4-ddytoxYhuAJ667PBtbFkY",
  // Tên đăng nhập được đổi thành email nội bộ <tên>@<emailDomain> (không gửi thư nào cả).
  emailDomain: "ewf.local",
};
