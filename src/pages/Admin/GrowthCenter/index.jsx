import * as React from "react";
import "./GrowthCenter.scss";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DownloadIcon from "@mui/icons-material/Download";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import apiGrowthCenter from "../../../apis/apiGrowthCenter";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};
const labels = ["January", "February", "March", "April", "May", "June", "July"];
export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [35, 65, 95, 35, 67, 70, 40],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      yAxisID: "y",
    },
    {
      label: "Dataset 2",
      data: [350, 450, 750, 650, 470, 769, 570],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y1",
    },
  ],
};

function GrowthCenter() {
  const [value, setValue] = React.useState([null, null]);
  const [growthCenter , setGrowthCenter] = useState([])

  useEffect(()=>{
    const getData = async () =>{
      apiGrowthCenter.getGrowthCenter()
      .then(res=>{
        setGrowthCenter(res.data);
      })
      .catch(error=>{
        setGrowthCenter(items);
      })
    };
    getData();
  },[])


  return (
    <Box p="1rem" width="100%" className="growthCenter">
      <Stack spacing={2}>
        <Stack bgcolor="#fff" p="1rem" spacing={1.5}>
          <Typography fontSize="20px" fontWeight={500}>
            Hi???u qu??? kinh doanh
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography >
              Th???i gian b??o c??o:
            </Typography>
            <Stack direction="row" alignItems="center" spacing ={1}>
              <Button className="growthCenter__buttonTime growthCenter__buttonTime--selected" variant="outlined">H??m nay</Button>
              <Button className="growthCenter__buttonTime" variant="outlined">7 ng??y qua</Button>
              <Button className="growthCenter__buttonTime" variant="outlined"> 30 ng??y qua</Button>
            </Stack>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              localeText={{ start: "", end: "" }}
            >
              <DateRangePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment justifyContent="center">
                    <TextField size="small" {...startProps} />
                    <Box sx={{ mx: 1 }}> to </Box>
                    <TextField size="small" {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>

            <Typography>
              (L???n c???p nh???t cu???i: 18/06/2022. 11:00)
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} bgcolor="#fff" pl="1rem" pt="1rem">
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
            spacing={1}
          >
            <Typography fontWeight={600}>
              Ch??? s??? ch??nh
            </Typography>
            <Typography color="#00000073" flex={1}>
              7 ng??y qua: 14/07/2022 - 20/07/2022 (So s??nh v???i: 05/07/2022 -
              11/07/2022)
            </Typography>
            <Button  variant="outlined" endIcon={<DownloadIcon />}>
              T???i d??? li???u
            </Button>
          </Stack>

          <Stack direction="row" spacing={2} className="growthCenter__listBox">
            {
              growthCenter.map(item =>
                <Stack className="boxInfo">
                  <Stack direction="row" justifyContent="space-between">
                    <Typography>{item.title}</Typography>
                    <InfoOutlinedIcon className="boxInfo__icon" />
                  </Stack>
                  <Typography mt="20px" fontSize="20px" fontWeight={500}>
                    {item.value}
                  </Typography>
                  <Stack direction="row" alignItems="center">
                    {item.value === "--" ?
                      <Typography className="boxInfo__nodata">{item.percent}</Typography>
                      : <><ArrowDropUpIcon className="boxInfo__Upicon" />
                        <Typography className="boxInfo__Uppercent">{item.percent}%</Typography>
                      </>
                    }
                  </Stack>
                </Stack>
              )}

          </Stack>
        </Stack>
        <Stack bgcolor="#fff" direction="row" justifyContent= "center">
          <Stack width= "70%" justifyContent="center">
            <Line options={options} data={data} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

const items = [
  {
    id: 1,
    title: "Doanh thu",
    value: "928.000??",
    percent: "100"
  },
  {
    id: 2,
    title: "????n h??ng",
    value: "1",
    percent: "100"
  },
  // {
  //   id: 3,
  //   title: "Doanh thu thu???n",
  //   value: "--",
  //   percent: "Kh??ng c?? d??? li???u"
  // },
  {
    id: 4,
    title: "L?????t xem",
    value: "928",
    percent: "200"
  },
  {
    id: 5,
    title: "T??? l??? chuy???n ?????i",
    value: "16.7%",
    percent: "100"
  },
  {
    id: 6,
    title: "????n h??ng hu???",
    value: "1",
    percent: "100"
  },
  // {
  //   id: 7,
  //   title: "SKU b??n ra",
  //   value: "1",
  //   percent: "100"
  // },
]

export default GrowthCenter;
