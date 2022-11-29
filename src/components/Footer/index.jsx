import React from "react";
import "./Footer.scss";
import nhanhieu from "../../assets/img/nhan-hieu.png";
import tikinow from "../../assets/img/tikinow.jpg";
import fb from "../../assets/img/fb.jpg";
import youtube from "../../assets/img/ytb.jpg";
import zalo from "../../assets/img/zalo.jpg";
import { Stack, Typography, Box } from "@mui/material";
import { footerLink } from "../../constraints/Footer";

function Footer() {
  return (
    <Box className="Footer">
      <Stack className="block" direction="row">
        <Stack>
          <Typography component="h4" className="block__title">
            Hỗ trợ khách hàng
          </Typography>
          <div className="hotline">
            Hotline:&nbsp;
            <a href="tel:1900-6035"> 1900-6035</a>
            <span className="small-text" style={{ marginRight: "1rem" }}>
              (1000 đ/phút, 8-21h kể cả T7, CN)
            </span>
          </div>
          {footerLink.supportCustomer.map((item) => (
            <a key={item.id} href={item.link}>
              {item.display}
            </a>
          ))}

          <div className="security">
            Hỗ trợ khách hàng:&nbsp;
            <a href="mailto:hotro@tiki.vn">hotro@tiki.vn</a>
          </div>
          <div className="security">
            Báo lỗi bảo mật:&nbsp;
            <a href="mailto:security@tiki.vn">security@tiki.vn</a>
          </div>
        </Stack>

        <Stack>
          <Typography component="h4" className="block__title">
            Về Tiki
          </Typography>
          {footerLink.aboutTiki.map((item) => (
            <a key={item.id} href={item.link}>
              {item.display}
            </a>
          ))}
        </Stack>

        <Stack>
          <Box>
            <Typography component="h4" className="block__title">
              Hợp tác và liên kết
            </Typography>
            <a href={"https://tiki.vn/quy-che-hoat-dong-sgdtmdt"}>
              Quy chế hoạt động Sàn GDTMĐT
            </a>
            <a href={"https://tiki.vn/khuyen-mai/ban-hang-cung-tiki"}>
              Bán hàng cùng Tiki
            </a>
          </Box>
          <Box>
            <Typography
              component="h4"
              sx={{ marginTop: "16px" }}
              className="block__title"
            >
              Chứng nhận bởi
            </Typography>
            <Stack direction="row" spacing={1}>
              <a href={"https://hotro.tiki.vn/s/"} style={{ height: "32px" }}>
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png"
                  width="32"
                  height="32"
                  alt=""
                />
              </a>
              <a
                href={"http://online.gov.vn/Home/WebDetails/21193"}
                style={{ height: "32px" }}
              >
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"
                  height="32"
                  width="83"
                  alt=""
                />
              </a>
            </Stack>
          </Box>
        </Stack>

        <Stack>
          <Box>
            <Typography component="h4" className="block__title">
              Phương thức thanh toán
            </Typography>
            <img alt="" src={nhanhieu} style={{ maxWidth: "200px" }} />
          </Box>
          <Box>
            <Typography
              component="h4"
              style={{ margin: "16px 0 12px" }}
              className="block__title"
            >
              Dịch vụ giao hàng
            </Typography>
            <a href="/">
              <img alt="" src={tikinow}></img>
            </a>
          </Box>
        </Stack>

        <Stack>
          <Box>
            <Typography component="h4" className="block__title">
              Kết nối với chúng tôi
            </Typography>
            <Stack direction="row" spacing={1} mb={1}>
              <a href="https://www.facebook.com/tiki.vn/">
                <img width="32px" height="32px" alt="" src={fb} />
              </a>
              <a href="https://www.youtube.com/user/TikiVBlog">
                <img width="32px" height="32px" alt="" src={youtube} />
              </a>
              <a href="http://zalo.me/589673439383195103">
                <img width="32px" height="32px" alt="" src={zalo} />
              </a>
            </Stack>
          </Box>
          <Box>
            <Typography component="h4" className="block__title">
              Tải ứng dụng trên điện thoại
            </Typography>
            <Stack direction="row" spacing={1.25}>
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/qrcode.png"
                width="80"
                height="80"
                alt=""
              />
              <Stack direction="column">
                <a
                  href={"https://itunes.apple.com/vn/app/id958100553"}
                  style={{ height: "36px" }}
                >
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png"
                    width="122px"
                    alt=""
                  />
                </a>
                <a
                  href={
                    "https://play.google.com/store/apps/details?id=vn.tiki.app.tikiandroid"
                  }
                  style={{ height: "36px" }}
                >
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png"
                    width="122px"
                    alt=""
                  />
                </a>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>

      <Box className="container address-info">
        <Typography>
          Trụ sở chính: Tòa nhà Viettel, Số 285, đường Cách Mạng Tháng 8, phường
          12, quận 10, Thành phố Hồ Chí Minh
        </Typography>

        <Typography>
          Tiki nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua và
          nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý đơn hàng
        </Typography>

        <Typography>
          Giấy chứng nhận Đăng ký Kinh doanh số 0309532909 do Sở Kế hoạch và Đầu
          tư Thành phố Hồ Chí Minh cấp lần đầu ngày 06/01/2010 và sửa đổi lần
          thứ 23 ngày 14/02/2022
        </Typography>
        
        <Typography style={{ marginBottom: "0" }}>
          © 2022 - Bản quyền của Công ty TNHH Ti Ki
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
