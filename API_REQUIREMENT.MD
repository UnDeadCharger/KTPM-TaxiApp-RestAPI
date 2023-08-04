Hệ thống Điều phối Taxi là một ứng dụng đa nền tảng cho phép khách hàng đặt xe taxi thông qua cuộc gọi, ứng dụng di động hoặc trang web. Hệ thống sẽ tìm và gửi thông tin đặt xe tới tài xế thích hợp dựa trên khoảng cách và các yêu cầu khác.

Các thành phần trong hệ thống:

1. Hệ thống tổng đài đặt xe CallCenter(Web/WPF/Winforms):
   Cho phép khách hàng đặt xe thông qua cuộc gọi điện thoại. > Đặt xe functions:
   Thu thập thông tin như số điện thoại, địa chỉ đặt xe từ cuộc gọi.

   > Nhận thông tin từ front end, và tạo khách hàng trong database
   > Tạo Chuyến Xe từ cuộc gọi
   > Mở rộng: Hỗ trợ đặt xe theo hẹn giờ chỉ dành cho khách hàng VIP.

2. App Khách Hàng(Mobile):
   Cho phép khách hàng đặt xe thông qua ứng dụng di động.
   > Mở request đặt xe cho khách hàng
   > Nhận confirmation từ tài xế và tạo chuyến xe
   > Thu thập thông tin như số điện thoại, địa chỉ và tọa độ GPS của khách hàng.
   > Mở rộng: Hỗ trợ chức năng hẹn giờ đặt xe.

Broadcast thông tin:
Khi có thông tin đặt xe từ khách hàng, hệ thống sẽ broadcast thông tin như số điện thoại khách hàng, địa chỉ và tọa độ GPS cho tài xế qua ứng dụng tài xế (Driver Apps).
Thông tin sẽ được gửi đến tài xế có khoảng cách GPS gần nhất.

1. App tài xế (Mobile):
   > Đăng kí tài xế
   > N tài xế nhận thông tin đặt xe và chọn tài xế nhanh nhất để xác nhận.
   > Broadcast cho tài xế về khách
   > Nhận confirmation của tài xế
   > Nếu tài xế đã được xác nhận và hủy, hệ thống sẽ broadcast cho tài xế kế tiếp trong danh sách.
   > Nhận Hủy chuyến xe
   > Sau khi đã có tài xế xác nhận, hệ thống sẽ gửi thông tin về tài xế (tên, số điện thoại, số tài, hình đại diện) cho khách hàng.
   > Gửi thông tin cho khách hàng
   > Nếu khách hàng không sử dụng ứng dụng, hệ thống sẽ gửi tin nhắn SMS cho khách hàng.
   > Nếu khách hàng sử dụng ứng dụng, hệ thống sẽ gửi thông báo qua ứng dụng cho khách hàng.
   > Signal Thông bao tới khach1 hagn2

\*Theo dõi realtime vị trí tài xế trên ứng dụng khách hàng

> Function lấy tài xế location every 3s? (seperate thread??)

Điểm mở rộng(điểm cộng)

- Áp dụng machine learning để đánh giá độ tin tưởng của khách hàng

Technology :

- Real-time : .Net(SignalR, Websocket), Node.js(Websocket), Provider Services
- Message Queue/Message Brokers
- Elastic Search
- Design Patterns
- Solid Principles
- Google Maps/VietBando/...=> Proxy,....
- Micro-Services
- Log Request/Response=> Debug
- Authentication (RefreshToken/AccessToken)

#table
##KhachHang
-idKhachHang
-hoTen
-soDienThoai
-diaChi
-toaDoGPS
-isRegistered
-isVIP

##TaiXe
-idTaiXe
-hoTen
-soDienThoai
-idXe
-toaDoGPS

##Xe
-id
-bienSo
-hieuXe
-loaiXe

##LoaiXe
-id
-LoaiXe

#ChuyenXe
-idChuyenXe
-idTaiXe
-idKhachHang
-trangThai
-diemDon
-diemTra
-giaTien
-gioHen

FIGURE OUT MROE
