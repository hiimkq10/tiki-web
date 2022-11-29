import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({children}) {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    document.title = "Tiki - Mua hàng online, giá tốt, hàng chuẩn, ship nhanh"
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);

  return children;
}