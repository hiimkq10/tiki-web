import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

import { Grid, Stack, Button, Box } from "@mui/material";
import CardProduct from "../../components/CardProduct";
import CardFlashsale from "../../components/CardFlashsale";

import {
  SlideThuongHieu1,
  SlideThuongHieu2,
} from "../../constraints/Home";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import apiMain from "../../apis/apiMain";
import apiHome from "../../apis/apiHome";
import Loading from "../../components/Loading";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Home() {
  const [products, setProducts] = useState([]);
  const [Quicklink, setQuicklink] = useState([]);
  const [CategorySpecify, setCategorySpecify] = useState([]);
  const [Suggestions, setSuggestions] = useState([]);
  const [loadingShowmore, setLoadingShowmore] = useState(false)
  const [chooseSuggestion, setChooseSuggestion] = useState(0)

  const [page, setPage] = useState(1);
  const size = 30;

  useEffect(() => {
    const getData = async () => {
      setLoadingShowmore(true)
      let param = {
        _page: page,
        _limit: size,
      };
      apiHome.getProducts(param)
        .then(res => {
          console.log(res.data)
          setProducts((pre) => [...pre, ...res.data]);
        })
        .finally(() => setLoadingShowmore(false))
    };
    getData();
  }, [page]);


  useEffect(() => {
    const getDataQuickLink = async () => {
      let param = {};
      const response = await apiHome.getQuickLink(param);
      if (response) {
        setQuicklink(response);
      }
    };
    getDataQuickLink();

    const getDataCategorySpecify = async () => {
      let param = {};
      const response = await apiHome.getCategorySpecify(param);
      if (response) {
        console.log('render')
        setCategorySpecify(response);
      }
    };
    getDataCategorySpecify();

    const getDataSuggestion = async () => {
      let param = {};
      const response = await apiHome.getSuggestions(param);
      if (response) {
        setSuggestions(response);
      }
    };
    getDataSuggestion();
  }, []);

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
      <Box className="category">
        <Box className="container">
          <Category />
        </Box>
      </Box>

      <Stack spacing={2} className="container home">
        <Box id="section1">
          <SlideKhuyenMai />
        </Box>

        <Box id="section2">
          <SectionFlashsale />
        </Box>

        <Box id="section3">
          <Box width="16.45%">
            <img
              style={{ maxHeight: "160px" }}
              src="https://salt.tikicdn.com/cache/w200/ts/banner/15/54/a3/dc054f7084003d4c9f5e100249fff610.png.webp"
              alt=""
            />
          </Box>
          <Box width="64.52%">
            <img
              src="https://salt.tikicdn.com/cache/w750/ts/banner/20/af/9d/85c2367e8eb8c832e631842e75364fe2.png.webp"
              alt=""
            />
          </Box>
          <Box width="16.45%">
            <img
              style={{ maxHeight: "160px" }}
              src="https://salt.tikicdn.com/cache/w200/ts/banner/da/12/bb/6c23d2e7f4a0242b01c3f9c5619bb140.png.webp"
              alt=""
            />
          </Box>
        </Box>
        <Box id="section4">
          <Box className="quicklink__wrap">
            {Quicklink.map((item) => (
              <Link key={item.id} to={item.link}>
                <Box className="quicklink__item">
                  <img
                    style={{ width: "48px" }}
                    src={item.image}
                    alt={item.alt}
                  />
                  <span>{item.alt}</span>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
        <Box id="section5">
          <Box className="banner__wrap1">
            <img
              src="https://salt.tikicdn.com/cache/w280/ts/banner/f9/50/fd/80d44082ed11e523c7a48bc648018d11.png.webp"
              alt=""
            />
            <img
              src="https://salt.tikicdn.com/cache/w280/ts/banner/88/b4/4b/84bd376e4b0c8513036a0d562c7bcfb6.png.webp"
              alt=""
            />
            <img
              src="https://salt.tikicdn.com/cache/w280/ts/banner/8a/be/67/38ec52352aa1550dc8c128dd0969f757.png.webp"
              alt=""
            />
            <img
              src="https://salt.tikicdn.com/cache/w280/ts/banner/ed/0d/3b/7dc88059494e699d3c77248d7d42e5d0.png.webp"
              alt=""
            />
          </Box>
        </Box>

        <Box id="section6">
          <Box className="section__heading" p="16px 0 !important">
            <Box className="section__title">
              <span>
                <img
                  style={{ width: "24px" }}
                  src="https://salt.tikicdn.com/ts/upload/33/0f/67/de89fab36546a63a8f3a8b7d038bff81.png"
                  alt=""
                />
              </span>
              Thương Hiệu Chính Hãng
            </Box>
            <Link className="section__more" to={"/xem-them"}>
              XEM THÊM
            </Link>
          </Box>
          <SlideThuongHieu />
        </Box>

        <Box id="section7">
          <Box className="section__heading" mb={2}>
            <Box className="section__title">Danh Mục Nổi Bật</Box>
          </Box>
          <Box className="specify__wrap">
            {CategorySpecify.map((item) => (
              <Link key={item.id} to={item.link}>
                <Box className="specify__item">
                  <img
                    style={{ width: "60px" }}
                    src={item.image}
                    alt={item.alt}
                  />
                  <span>{item.alt}</span>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>

        <Box id="section8">
          <Box className="banner__wrap2">
            <img
              src="https://salt.tikicdn.com/cache/w400/ts/banner/83/25/b8/96442cbb3cccebd796916c8af5377ecd.png.webp"
              alt=""
            />
            <img
              src="https://salt.tikicdn.com/cache/w400/ts/banner/64/4f/4a/b58dfceb83bbba5a710772d5e9fd14e9.png.webp"
              alt=""
            />
            <img
              src="https://salt.tikicdn.com/cache/w400/ts/banner/d0/09/63/2ae37cd70c15bbf073bddedb1b5b42d9.png.webp"
              alt=""
            />
          </Box>
        </Box>

        <Box id="section9">
          <Box className="suggestion">
            <Box className="section__heading">
              <Box className="section__title">Gợi Ý Hôm Nay</Box>
            </Box>
            <Box className="suggestion__wrap">
              {Suggestions.map((item, index) => (
                <Link key={item.id} to={item.link}>
                  <Box
                    onClick={() => setChooseSuggestion(index)}
                    className={`suggestion__item ${index === chooseSuggestion ? "active" : ""
                      }`}
                  >
                    <img
                      style={{ width: "48px" }}
                      src={item.image}
                      alt={item.alt}
                    />
                    <span>{item.alt}</span>
                  </Box>
                </Link>
              ))}
            </Box>
          </Box>
          <Grid container>
            {products.map((item) => (
              <Grid key={`product-${item.id}`} item lg={2} md={4} sm={6} xs={6}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
          <Stack direction='row' justifyContent="center" mt={2}>
            <Button
              width="15rem"
              height="2rem"
              color="primary"
              variant="outlined"
              onClick={handleLoadMore}
            >{loadingShowmore && <Loading />}
              Xem thêm
            </Button>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

function SlideKhuyenMai() {
  const [SlideKhuyenMai, setSlideKhuyenMai] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let param = {};
      const response = await apiHome.getSlideKhuyenMai(param);
      if (response) {
        setSlideKhuyenMai(response);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Box width="66.65%">
        <Swiper
          navigation={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay, Navigation, Pagination]}
          className="mySwiper"
          id="slider-khuyenmai"
        >
          {SlideKhuyenMai.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={item.link}>
                <Box width="100%">
                  <img src={item.image} alt="" />
                </Box>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box width="32.7%">
        <Link to={"/"}>
          <img
            alt=""
            src="https://salt.tikicdn.com/cache/w400/ts/banner/a7/ee/b9/b4931904b38e1c5d9236345aa8b02a67.png.webp"
          />
        </Link>
      </Box>
    </>
  );
}

function SlideThuongHieu() {
  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        slidesPerGroup={2}
        
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
            slidesPerGroup:1
          },
          "@0.75": {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesPerGroup:1
          },
          "@1.00": {
            slidesPerView: 2,
            spaceBetween: 30,
            slidesPerGroup:2
          },
          "@1.50": {
            slidesPerView: 2,
            spaceBetween: 40,
            slidesPerGroup:2
          },
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper"
        id="slider-thuonghieu1"
      >
        {SlideThuongHieu1.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={item.link}>
              <Box style={{ width: "100%" }}>
                <img
                  style={{ width: "100%", borderRadius: "8px" }}
                  alt={item.alt}
                  src={item.image}
                />
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        slidesPerView={6}
        slidesPerGroup={6}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper slider-thuonghieu2"
      >
        {SlideThuongHieu2.map((item) => (
          <SwiperSlide key={item.id} style={{ padding: "0 8px" }}>
            <Link to={item.link}>
              <Box className="img__thuonghieu2" style={{ width: "100%" }}>
                <img
                  style={{ width: "100%", borderRadius: "8px" }}
                  alt={item.alt}
                  src={item.image}
                />
                <p>{item.alt}</p>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

function SectionFlashsale() {
  const [sales, setSales] = useState([]);
  const [countDown, setCountDown] = useState({ hour: 0, minute: 0, second: 0 });

  useEffect(() => {
    const countDownFlashsale = () => {
      let initTime = new Date()
      let hourFlashsale = Math.ceil((initTime.getHours() + initTime.getMinutes() / 60) / 3) * 3

      initTime.setHours(hourFlashsale)
      initTime.setMinutes(0)
      initTime.setSeconds(0)
      var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = initTime - now;

        // Time calculations for days, hours, minutes and seconds
        setCountDown({
          hour: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minute: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          second: Math.floor((distance % (1000 * 60)) / 1000)
        })
        if (distance < 0) {
          clearInterval(x);
        }
      }, 1000);
    }
    countDownFlashsale()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const response = await apiMain.getProducts({_page:2,_limit:20});
      if (response) {
        
        setSales(response.data);
      }
    };
    getData();
  }, []);
  return (
    <>
      <Box
        width="59.35%"
        height="274px"
        bgcolor="#fff"
        borderRadius="4px"
      >
        <Box id="section2__heading">
          <Box id="section2__title">
            <img alt="" src="https://frontend.tikicdn.com/_desktop-next/static/img/giasoc.svg" />
            <img alt="" src="https://frontend.tikicdn.com/_desktop-next/static/img/dealFlashIcon.svg" />
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/homnay.svg" alt="" />
            <span className="flashsale__time">{("0" + countDown.hour).slice(-2)}</span>
            <span>:</span>
            <span className="flashsale__time">{("0" + countDown.minute).slice(-2)}</span>
            <span>:</span>
            <span className="flashsale__time">{("0" + countDown.second).slice(-2)}</span>
          </Box>
          <Link id="section2__more" to={"/xemthem"}>
            Xem thêm
          </Link>
        </Box>
        <Swiper
          slidesPerView={5}
          slidesPerGroup={5}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper slider-sale"
        >
          {sales.map((item) => (
            <SwiperSlide key={`sale-${item.id}`} style={{ minWidth: "148px" }}>
              <CardFlashsale data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box width="39.35%">
        <Link to={"/"}>
          <img
            alt=""
            src="https://salt.tikicdn.com/cache/w572/ts/upload/1a/8e/00/291b67286660dbc51bb8381633868927.png.webp"
          />
        </Link>
      </Box>
    </>
  );
}

function Category() {
  const categoryRef = useRef();

  const [translate,setTranslate] = useState(0)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getData = async () => {
      apiHome.getCategories({})
        .then(res => {
          setCategories(res)
        })
        .catch(error => {
          setCategories([])
        })
    }
    getData()
  }, [])

  const onClickPrev = () => {
    if (categoryRef) {
      let offset = categoryRef.current.offsetWidth - 50
      if ( translate + offset >= 0){
        setTranslate(0)
        categoryRef.current.children[0].style.display = "none";
      }
      else{
        setTranslate(translate + offset)
        categoryRef.current.children[0].style.removeProperty("display");
        categoryRef.current.children[2].style.removeProperty("display");
      }
    }
  };

  const onClickNext = () => {
    if (categoryRef) {
      let offset = categoryRef.current.offsetWidth - 50
      if(translate - 2*offset <= -categoryRef.current.children[1].offsetWidth){
        categoryRef.current.children[2].style.display = "none";
        setTranslate(-categoryRef.current.children[1].offsetWidth + offset)
      }
      else{
        setTranslate(translate - offset)
        categoryRef.current.children[0].style.removeProperty("display");
        categoryRef.current.children[2].style.removeProperty("display");
      }
    }
  };

  return (
    <Stack className='catogory'
      ref={categoryRef}
      direction='row'
      justifyContent="space-between"
      alignItems={'center'}
    >
      <Box className='catogory__prev' onClick = {onClickPrev} style={{display:'none'}}>
        <ArrowBackIosIcon />
      </Box>
      <Stack sx={{transform:`translateX(${translate}px)`}}
      className='catogory__content' direction="row" justifyContent="space-between" spacing="16px"
      >
        {categories.map((item) => (
          <Box key={item.id} >
            <Link to={`filter/${item.slug}`}>
              <Box
                style={{
                  fontSize: "14px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </Box>
            </Link>
          </Box>
        ))}
      </Stack>
      <Box className='catogory__next' onClick={onClickNext}>
        <ArrowForwardIosIcon />
      </Box>
    </Stack>

  );
}
export default Home;
