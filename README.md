📘 EXPENSE TRACKER – REQUIREMENTS
1. Mục tiêu sản phẩm

Ứng dụng giúp người dùng:

Ghi lại các khoản chi tiêu hằng ngày

Theo dõi tổng chi tiêu theo ngày/tháng

Xem biểu đồ phân bổ chi tiêu theo danh mục

Quản lý dữ liệu cá nhân mà không cần backend, lưu trên localStorage

2. Đối tượng sử dụng

Người muốn theo dõi chi tiêu cá nhân

Người có nhu cầu quản lý tài chính đơn giản

Không yêu cầu tài khoản đăng nhập

3. Scope

Ứng dụng gồm các tính năng:

CRUD (Create – Read – Update – Delete) chi tiêu

Lọc chi tiêu theo tháng, danh mục

Thống kê tổng số tiền

Biểu đồ Pie Chart phân bổ theo category

4. Functional Requirements
4.1. Expense Management
4.1.1. Tạo mới chi tiêu

User story:
Là người dùng, tôi muốn thêm một khoản chi tiêu để theo dõi chi tiêu hằng ngày.

Trường dữ liệu của Expense:

id (string, UUID)

title (string, required)

amount (number > 0, required)

category (string, required) — Ví dụ:

Food & Drinks

Transportation

Shopping

Bills

Others

date (ISO date string, required)

note (string, optional)

Validation:

Title không được rỗng

Amount phải > 0

Category phải thuộc danh sách cho phép

Date phải hợp lệ

4.1.2. Xem danh sách chi tiêu

Hiển thị dạng list

Mặc định sort theo date DESC

Mỗi item hiển thị:

title

amount

category

date

4.1.3. Cập nhật chi tiêu

User có thể:

Nhấn "Edit"

Mở modal hoặc form

Thay đổi title, amount, category, date, note

Lưu lại → cập nhật vào localStorage

4.1.4. Xóa chi tiêu

Click "Delete" tại từng item

Xác nhận (Confirm)

Xóa khỏi localStorage

4.2. Filtering & CRUD Enhancements
4.2.1. Lọc theo tháng

User chọn tháng (Month Picker)

Danh sách và biểu đồ cập nhật theo tháng đó

4.2.2. Lọc theo category

Dropdown category

Danh sách hiển thị theo category được chọn

4.2.3. Tìm kiếm theo tên

Tìm theo title (search input)

Không phân biệt chữ hoa thường

4.3. Statistics / Analytics
4.3.1. Tổng quan chi tiêu trong tháng

Total Expense

Tổng số giao dịch

Top 3 categories tiêu nhiều nhất

4.3.2. Biểu đồ pie chart theo category

Dùng thư viện:

Recharts

hoặc Chart.js

Hiển thị:

% tổng chi tiêu của từng category

Màu sắc tự động

4.4. Data Storage
4.4.1. Lưu tất cả dữ liệu vào localStorage

Key: "expenses"

Format:

[
  {
    "id": "uuid",
    "title": "Coffee",
    "amount": 30000,
    "category": "Food & Drinks",
    "date": "2025-11-13",
    "note": ""
  }
]

4.4.2. Tự động load dữ liệu khi mở app

Nếu localStorage rỗng: hiển thị empty state.

5. Non-Functional Requirements
5.1. Performance

UI load dưới 0.5s

Sort + filter thực hiện trên client (array operations)

5.2. UI/UX

Form tạo mới đơn giản, dễ sử dụng

Dark mode (optional nhưng đẹp)

Dùng Mantine hoặc Shadcn UI

5.3. Responsive

Mobile-first

List + Chart hiển thị tốt trên màn hình nhỏ

6. Optional Features (Nâng cấp nếu có thời gian)
⭐ 1. Export CSV
⭐ 2. Biểu đồ dạng line chart theo ngày trong tháng
⭐ 3. Budget limit (đặt hạn mức chi tiêu)
⭐ 4. Notification khi vượt mức
⭐ 5. Import/Export JSON backup
7. Minimum Viable Product (MVP)

Để đưa vào portfolio nhanh nhất, MVP gồm:

✔ Add/Edit/Delete expense
✔ Filter theo tháng
✔ Total expense
✔ Biểu đồ Pie Chart theo category
✔ Lưu localStorage
✔ UI đẹp (Mantine / Shadcn / Tailwind)

Hoàn thành trong 1–2 ngày.

Nếu bạn muốn, mình có thể viết tiếp cho bạn:
✅ kiến trúc thư mục project
✅ danh sách component
✅ mock UI (wireframe)
✅ data type + Zod schema
➡️ Bạn muốn mình chuẩn bị phần nào tiếp theo?
