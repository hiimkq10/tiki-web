 /* eslint-disable */
import "./CreateCoupon.scss"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import {
    Stack,
    Box,
    Button,
    Typography,
    MenuItem,
    InputBase,
    Radio,
    RadioGroup,
    FormControlLabel,
    Modal,
    Select
} from "@mui/material"
import DiscountIcon from '@mui/icons-material/Discount';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";
import apiCoupon from "../../../../apis/apiCoupon";

const style = {
    position: 'absolute',
    left: '50%',
    top: "50%",
    transform: 'translate(-50%,-50%)',
    width: "calc(100% - 64px)",
    maxHeight: "calc(100% - 32px)",
    bgcolor: 'background.paper',
    border: '1px solid #bfbfbf',
    outline: "none",
    borderRadius: "2px",
    boxShadow: 24,
    overflowY: "auto",
    "& p": {
        fontSize: "14px"
    }
};
function CreateCoupon(props) {
    const [publicCoupon, setPublicCoupon] = useState(true)
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState(0)
    const [category, setCategory] = useState(0)
    const [nameCoupon, setNameCoupon] = useState({ error: false, value: "" })
    const [codeCoupon, setCodeCoupon] = useState({ error: false, value: "" })
    const [product, setProduct] = useState("0")
    const [typeCoupon, setTypeCoupon] = useState("0")
    const [typeCouponValue, setTypeCouponValue] = useState({ error: false, value: "" })
    const [valueMin, setValueMin] = useState({ error: false, value: "" })
    const [quantityCoupon, setQuantityCoupon] = useState({ error: false, value: "" })
    const [couponPerCustomer, setCouponPerCustomer] = useState({ error: false, value: "" })
    const [valueMinSelected, setValueMinSelected] = useState("0")
    const [limitUseCoupon, setLimitUseCoupon] = useState("0")
    const [dateStart, setDateStart] = useState(new Date())
    const [dateExpired, setDateExpired] = useState(new Date())
    const [edit, setEdit] = useState(props.edit)

    const idCoupon = useParams().id
    const navigate = useNavigate()

    const onChangeNameCoupon = (e) => {
        let error = false
        if (e.target.value === "")
            error = true
        setNameCoupon({ error, value: e.target.value })
    }
    const onChangeCodeCoupon = (e) => {
        let error = false
        if (e.target.value === "")
            error = true
        setCodeCoupon({ error, value: e.target.value })
    }
    const onChangeTypeCouponValue = (e) => {
        let error = false
        if (e.target.value === "")
            error = true
        setTypeCouponValue({ error, value: e.target.value })
    }
    const onChangeValueMin = (e) => {
        let error = false
        if (e.target.value === "")
            error = true
        setValueMin({ error, value: e.target.value })
    }
    const onChangeQuantityCoupon = (e) => {
        let error = false
        if (e.target.value === "")
            error = true
        setQuantityCoupon({ error, value: e.target.value })
    }
    const onChangeCouponPerCustomer = (e) => {
        let error = false
        if (e.target.value === "")
            error = true
        setCouponPerCustomer({ error, value: e.target.value })
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }
    const onChangeCategory = (e) => {
        setCategory(e.target.value)
    }
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onChangeDateStart = (e) => {
        // setDateStart();
        let start = new Date(e.target.value)
        setDateStart(start)
        // console.log(e.target.value)
    };

    const onChangeDateExpired = (e) => {
        let expired = new Date(e.target.value)
        setDateExpired(expired)
    }

    const handleCreate = () => {
        const params = {
            "name": nameCoupon.value,
            "slug": codeCoupon.value,
            "public": publicCoupon,
            "product": [],
            "unit": typeCoupon === "0" ? '??' : "%",
            "value": Number(typeCouponValue.value),
            "limit": valueMinSelected.value === "0" ? 0 : Number(valueMin.value),
            "quantity": Number(quantityCoupon.value),
            "used": 0,
            "start": dateStart.getTime(),
            "expired": dateExpired.getTime(),
            "img": "https://salt.tikicdn.com/cache/128x128/ts/upload/92/ad/57/0d9a096885400b7b4752b67afdc72898.png"
        }
        apiCoupon.postCoupon(params)
            .then(res => {
                toast.success("???? th??m th??nh c??ng")
            })
            .catch(error => {
                toast.error("Th??m kh??ng th??nh c??ng")
            })
    };

    useEffect(() => {
        const loadData = () => {
            if (edit === true) {
                apiCoupon.findCouponById({ id: idCoupon })
                    .then(res => {
                        const coupon = res[0]
                        console.log(res)
                        if (coupon) {
                            setNameCoupon({error:false, value:coupon.name})
                            setCodeCoupon({error:false, value:coupon.slug})
                            setPublicCoupon(coupon.public)
                            // setTypeCoupon({value:coupon.unit})
                            if (coupon.unit === '%')
                            setTypeCoupon('1')
                            setTypeCouponValue({error:false, value:coupon.value})
                            setQuantityCoupon({error:false, value:coupon.quantity})
                            // setValueMinSelected({value:coupon.})
                            setValueMin({value:coupon.limit})
                            if(coupon.limit>0)
                            setValueMinSelected('1')
                            setDateStart(new Date(coupon.start))
                            setDateExpired(new Date(coupon.expired))
                        }
                        else {
                            navigate("/admin/coupon")
                            toast.error("S???n ph???m n??y kh??ng t???n t???i!")
                        }
                    }
                    )
            }
        }
        loadData()
    }, [edit])

    const handleUpdate = () => {
        const params = {
            "name": nameCoupon.value,
            "slug": codeCoupon.value,
            "public": publicCoupon,
            "product": [],
            "unit": typeCoupon === "0" ? '??' : "%",
            "value": Number(typeCouponValue.value),
            "limit": valueMinSelected.value === "0" ? 0 : Number(valueMin.value),
            "quantity": Number(quantityCoupon.value),
            "used": 0,
            "start": dateStart.getTime(),
            "expired": dateExpired.getTime(),
            "img": "https://salt.tikicdn.com/cache/128x128/ts/upload/92/ad/57/0d9a096885400b7b4752b67afdc72898.png"
        }
        apiCoupon.updateCoupon(params,idCoupon)
            .then(res => {
                toast.success("C???p nh???t th??nh c??ng")
            })
            .catch(error => {
                toast.error("C???p nh???t th???t b???i!")
            })
    };

    return (
        <Box>
            <Box px={3}>
                <Stack direction="row"><DiscountIcon /> T???o m?? gi???m gi?? m???i</Stack>
            </Box>
            <Stack direction="row" spacing={2.5} mx={3} mt={2} mb={11.5} justifyContent="space-between">
                <Stack sx={{ flex: 1 }}>
                    <Box className="createCoupon__form">
                        <Box className="createCoupon__title">TH??NG TIN</Box>
                        <Stack p={1.5} spacing={4}>
                            <Stack direction="row" alignItems={"flex-start"} sx={{ width: "100%" }}>
                                <LabelCustom>T??n m?? gi???m gi?? <InfoOutlinedIcon /></LabelCustom>
                                <Stack sx={{ flex: 1 }}>
                                    <InputCustom placeholder="T??n m?? gi???m gi??" value={nameCoupon.value} onChange={onChangeNameCoupon} className={`${nameCoupon.error && "errorInput"}`} />
                                    {nameCoupon.error && <Typography sx={{ fontSize: "14px", color: "#ff4d4f" }}>Vui l??ng nh???p th??ng tin n??y</Typography>}
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems={"flex-start"} sx={{ width: "100%" }}>
                                <LabelCustom>M?? gi???m gi?? <InfoOutlinedIcon /></LabelCustom>
                                <Stack sx={{ flex: 1 }}>
                                    <Stack direction={"row"} alignItems="center" justifyContent="space-between">
                                        <Typography sx={{ fontSize: "12px", fontWeight: 300 }}>Ch??? bao g???m t??? 5 - 10 k?? t??? th?????ng v?? ch??? s???.</Typography>
                                        <LabelCustom sx={{ fontWeight: 300, width: "fit-content" }}>M?? gi???m gi?? <InfoOutlinedIcon /></LabelCustom>
                                    </Stack>
                                    <InputCustom placeholder="Nh???p m?? gi???m gi??" value={codeCoupon.value} onChange={onChangeCodeCoupon} className={`${codeCoupon.error && "errorInput"}`} />
                                    {codeCoupon.error && <Typography sx={{ fontSize: "14px", color: "#ff4d4f" }}>Vui l??ng nh???p th??ng tin n??y</Typography>}
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems={"flex-start"}>
                                <LabelCustom>M?? gi???m gi?? <InfoOutlinedIcon /></LabelCustom>
                                <Box sx={{ flex: 1 }}>
                                    <div onClick={() => { setPublicCoupon(!publicCoupon) }} className={`createCoupon__switch ${publicCoupon ? "active" : ""}`}>
                                        <div className="createCoupon__switch__handle"></div>
                                        <span className="createCoupon__switch__text">{publicCoupon ? "C??ng khai" : "???n"}</span>
                                    </div>
                                    {
                                        publicCoupon ? <Typography sx={{ fontSize: "14px", color: "#ff0000" }}>L??u ??: M?? gi???m gi?? ???????c c??ng khai trong trang chi ti???t s???n ph???m, cho t???t c??? c??c kh??ch h??ng!</Typography> : ""
                                    }
                                </Box>
                            </Stack>
                        </Stack>
                    </Box>

                    <Box className="createCoupon__form" mt={3}>
                        <Box className="createCoupon__title">??I???U KI???N</Box>
                        <Stack p={1.5} spacing={4}>
                            <Stack direction="row" alignItems={"flex-start"} sx={{ width: "100%" }}>
                                <LabelCustom>S???n ph???m ??p d???ng</LabelCustom>
                                <Box sx={{ flex: 1 }}>
                                    <RadioGroupCustom
                                        defaultValue={"0"}
                                        onChange={(e) => setProduct(e.target.value)}
                                        name="typeProduct"
                                    >
                                        <FormControlLabelCustom value="0" control={<RadioCustom />} label="T???t c??? s???n ph???m" />
                                        <FormControlLabelCustom value="1" control={<RadioCustom />} label="S???n ph???m c??? th???" />
                                    </RadioGroupCustom>
                                    {
                                        product === "1" &&
                                        <Box mt={1.5}>
                                            <Button onClick={handleOpen} variant="contained" sx={{ height: "32px" }}>Ch???n s???n ph???m</Button>
                                            <Typography sx={{ fontSize: "14px", color: "#ff4d4f" }}>Vui l??ng ch???n t???i thi???u m???t s???n ph???m</Typography>
                                        </Box>
                                    }
                                </Box>
                            </Stack>

                            <Stack className="createCoupon__form__item" direction="row">
                                <LabelCustom>Lo???i gi???m gi??</LabelCustom>
                                <Box sx={{ flex: 1 }}>
                                    <RadioGroupCustom
                                        defaultValue={0}
                                        value={typeCoupon}
                                        onChange={(e) => setTypeCoupon(e.target.value)}
                                        name="coupon"
                                    >
                                        <FormControlLabelCustom value={0} control={<RadioCustom />}
                                            label={<>Theo s??? ti???n<InfoOutlinedIcon sx={{ fontSize: "16px", verticalAlign: "text-top", marginLeft: "4px" }} /> </>}
                                        />
                                        <FormControlLabelCustom value={1} control={<RadioCustom />}
                                            label={<>Theo ph???n tr??m<InfoOutlinedIcon sx={{ fontSize: "16px", verticalAlign: "text-top", marginLeft: "4px" }} /> </>}
                                        />
                                    </RadioGroupCustom>
                                    <Box mt={1.5} sx={{ width: "100%" }}>
                                        <InputCustom placeholder="Nh???p" value={typeCouponValue.value} onChange={onChangeTypeCouponValue} className={`${typeCouponValue.error && "errorInput"}`} />
                                        {codeCoupon.error && <Typography sx={{ fontSize: "14px", color: "#ff4d4f" }}>Vui l??ng nh???p th??ng tin n??y</Typography>}
                                    </Box>
                                </Box>
                            </Stack>

                            <Stack direction="row" className="createCoupon__form__item">
                                <LabelCustom>Gi?? tr??? ????n h??ng t???i thi???u</LabelCustom>
                                <Box sx={{ flex: 1 }}>
                                    <RadioGroupCustom
                                        value={valueMinSelected}
                                        defaultValue={0}
                                        name="valueMin"
                                        onChange={(e) => setValueMinSelected(e.target.value)}
                                    >
                                        <FormControlLabelCustom value={0} control={<RadioCustom />}
                                            label="Kh??ng r??ng bu???c" />
                                        <FormControlLabelCustom value={1} control={<RadioCustom />}
                                            label="Gi?? tr??? ????n h??ng t???i thi???u" />
                                    </RadioGroupCustom>
                                    {
                                        valueMinSelected === "1" &&
                                        <Box mt={1.5} sx={{ width: "100%" }}>
                                            <InputCustom placeholder="Nh???p s??? ti???n" value={valueMin.value} onChange={onChangeValueMin} className={`${valueMin.error && "errorInput"}`} />
                                            {valueMin.error && <Typography sx={{ fontSize: "14px", color: "#ff4d4f" }}>Vui l??ng nh???p th??ng tin n??y</Typography>}
                                        </Box>
                                    }
                                </Box>
                            </Stack>

                            <Stack direction="row" className="createCoupon__form__item">
                                <LabelCustom>S??? l?????ng m?? gi???m gi??</LabelCustom>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ width: "100%" }}>
                                        <InputCustom placeholder="S??? l?????ng m?? gi???m gi??" value={quantityCoupon.value} onChange={onChangeQuantityCoupon} className={`${quantityCoupon.error && "errorInput"}`} />
                                        {quantityCoupon.error && <Typography sx={{ fontSize: "14px", color: "#ff4d4f" }}>Vui l??ng nh???p th??ng tin n??y</Typography>}
                                    </Box>
                                </Box>
                            </Stack>

                            {/* <Stack direction="row" className="createCoupon__form__item">
                                <LabelCustom>L?????t s??? d???ng m???i kh??ch h??ng</LabelCustom>
                                <Box sx={{ flex: 1 }}>
                                    <FormControlLabelCustom control={<Checkbox onChange={e => setLimitUseCoupon(e.target.checked ? "1" : "0")} sx={{ padding: 0 }} />}
                                        label="Gi???i h???n s??? l?????ng s??? d???ng" />
                                    {limitUseCoupon === "1" && <Box mt={1.5} sx={{ width: "100%" }}>
                                        <InputCustom placeholder="L?????t s??? d???ng m???i kh??ch h??ng" value={couponPerCustomer.value} onChange={onChangeCouponPerCustomer} className={`${couponPerCustomer.error && "errorInput"}`} />
                                        {couponPerCustomer.error && <Typography sx={{ fontSize: "14px", color: "#ff4d4f" }}>Vui l??ng nh???p th??ng tin n??y</Typography>}
                                    </Box>
                                    }
                                </Box>
                            </Stack> */}

                            <Stack direction="row" className="createCoupon__form__item">
                                <LabelCustom>Th???i gian hi???u l???c</LabelCustom>
                                <Stack sx={{ flex: 1 }} spacing={2} >
                                    <Stack direction="row" sx={{ flex: 1 }}>
                                        <label style={{ width: "90px" }} for="birthdaytime">Ng??y b???t ?????u:</label>
                                        <input type="datetime-local" id="birthdaytime" name="birthdaytime"
                                            value={dateStart.toISOString().substring(0, 16)}
                                            onChange={onChangeDateStart} style={{}} />
                                    </Stack>
                                    <Stack direction="row" sx={{ flex: 1 }}>
                                        <label style={{ width: "90px" }} for="birthdaytime">Ng??y k???t th??c:</label>
                                        <input type="datetime-local" id="birthdaytime" name="birthdaytime"
                                            value={dateExpired.toISOString().substring(0, 16)}
                                            onChange={onChangeDateExpired} />
                                    </Stack>
                                </Stack>
                            </Stack>

                        </Stack>
                    </Box>
                </Stack>
                <Stack sx={{ width: "400px" }}>
                    <Box className="createCoupon__form">
                        <Box className="createCoupon__title">??I???U KI???N ??P D???NG</Box>
                        <Box p={1.5}>
                            <Typography mb={1.25}>333333 - <span style={{ color: "#1890ff", fontWeight: 500 }}>OOOOO</span></Typography>
                            <Box p={1.5} className="createCoupon__condition">
                                <Box>Gi???m&nbsp;<span> 5.000 ??? </span></Box>
                                <Box><span>???n </span>&nbsp;m?? gi???m gi?? trong [Trang Chi Ti???t S???n Ph???m]</Box>
                                <Box>??p d???ng cho:&nbsp;<span> t???t c??? s???n ph???m </span></Box>
                                <Box>Gi?? tr??? ????n h??ng t???i thi???u:&nbsp;<span>kh??ng r??ng bu???c</span></Box>
                                <Box>Nh??m kh??ch h??ng ??p d???ng: &nbsp;<span> T???t c???</span></Box>
                                <Box>Kh??ng gi???i h???n s??? l???n s??? d???ng t???i ??a</Box>
                                <Box>Gi???i h???n 1 l???n s??? d???ng m???i kh??ch h??ng</Box>
                            </Box>

                        </Box>
                    </Box>
                </Stack>
            </Stack>

            <Stack direction="row" className="createCoupon__footer">
                <Link to="/admin/coupon">
                    <Button variant="text" sx={{ border: "1px solid #bfbfbf", color: "#333", height: "32px" }}>Quay l???i</Button>
                </Link>
                <Button variant="contained" sx={{ height: "32px" }} onClick={edit ? handleUpdate : handleCreate}>{edit ? "C???p nh???t":"Th??m"}</Button>
            </Stack>

            {/* Modal ch???n s???n ph???m */}
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" px={3} py={2}
                        sx={{ border: "1px solid #dfdfdf" }}>
                        <Typography sx={{ fontWeight: 500 }} component="h2">
                            Ch???n s???n ph???m
                        </Typography>
                        <CloseIcon onClick={handleClose} />
                    </Stack>
                    <Box px={3} py={2}>
                        <Stack direction="row" spacing={2}>
                            <Stack sx={{ width: "256px" }}>
                                <label style={{ marginBottom: "8px" }}>T??n s???n ph???m</label>
                                <InputCustom sx={{ '& .MuiInputBase-input': { height: "40px" } }} placeholder="T??n m?? gi???m gi??" />
                            </Stack>
                            <Stack sx={{ width: "256px" }}>
                                <label style={{ marginBottom: "8px" }}>Danh m???c s???n ph???m</label>
                                <Select
                                    value={category}
                                    onChange={onChangeCategory}
                                    input={<InputCustom sx={{ '& .MuiInputBase-input': { height: "40px !important" } }} />}
                                >{
                                        Array.from({ length: listCategory.length }, (_, i) => i).map(item =>
                                            <MenuItem value={item}>{listCategory[item]}</MenuItem>)
                                    }
                                </Select>
                            </Stack>
                            <Stack sx={{ width: "256px" }}>
                                <label style={{ marginBottom: "8px" }}>Tr???ng th??i</label>
                                <Select
                                    value={status}
                                    onChange={onChangeStatus}
                                    input={<InputCustom sx={{ '& .MuiInputBase-input': { height: "40px !important" } }} />}
                                >{
                                        Array.from({ length: listStatus.length }, (_, i) => i).map(item =>
                                            <MenuItem value={item}>{listStatus[item]}</MenuItem>)
                                    }
                                </Select>
                            </Stack>
                            <Stack direction="row" alignItems="flex-end" spacing={1}>
                                <Button variant="contained" sx={{ height: "40px" }}>T??m ki???m</Button>
                                <Button variant="text" sx={{ border: "1px solid #bfbfbf", color: "#333", height: "40px" }}>L??m m???i</Button>
                            </Stack>

                        </Stack>
                        <Stack direction="row" justifyContent="space-between" spacing={3} mt={3}>
                            <Box sx={{ flex: 1 }}>
                                <Stack direction="row" alignItems="center" justifyContent={"space-between"} p={1.5} sx={{ backgroundColor: "#f5f5f5", border: "1px solid #dfdfdf", borderRadius: "4px 4px 0 0" }}>
                                    <Typography sx={{ fontWeight: 500 }}>Danh s??ch s???n ph???m</Typography>
                                    <Typography sx={{ color: "#1890ff", cursor: "pointer" }}>Ch???n t???t c???</Typography>
                                </Stack>
                                <Stack p={1.5} sx={{ border: "1px solid #dfdfdf", minHeight: "282px" }}>
                                    {
                                        [1, 2, 3].map(item =>
                                            <Stack key={item} direction='row' spacing={1} alignItems="center">
                                                <img height="80px" width="80px" style={{ padding: "10px" }} src="https://salt.tikicdn.com/cache/400x400/ts/product/87/dd/35/b3e1e0a707885e795ca7c92d29f1ac90.png.webp" alt="" />
                                                <Typography>
                                                    ??o Thun Nam C??? Tr??n Nhi???u M??u
                                                </Typography>
                                            </Stack>)
                                    }

                                </Stack>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Stack direction="row" alignItems="center" justifyContent={"space-between"} p={1.5} sx={{ backgroundColor: "#f5f5f5", border: "1px solid #dfdfdf", borderRadius: "4px 4px 0 0" }}>
                                    <Typography sx={{ fontWeight: 500 }}>S???n ph???m ???? ch???n</Typography>
                                    <Typography sx={{ color: "#1890ff", cursor: "pointer" }}>Xo?? t???t c???</Typography>
                                </Stack>
                                <Stack p={1.5} sx={{ border: "1px solid #dfdfdf", minHeight: "282px" }}>
                                    <Stack sx={{ height: "258px", justifyContent: "center", alignItems: "center" }}>
                                        <Typography sx={{ color: "#888" }}>Tr???ng</Typography>
                                    </Stack>
                                </Stack>
                            </Box>

                        </Stack>
                    </Box>
                    <Stack direction="row" px={3} py={2} justifyContent="flex-end" sx={{ borderTop: "1px solid #dfdfdf" }} >
                        <Button variant="contained" sx={{ height: "32px" }}>T???o m???i</Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    )
}

const LabelCustom = styled(Typography)(() => ({
    fontSize: "14px",
    color: "#108EE9",
    width: "198px",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "4px",
    "& .MuiSvgIcon-root": {
        fontSize: "14px"
    }
}))

const RadioGroupCustom = styled(RadioGroup)(() => ({
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    "&>*": {
        flex: 1
    }
}))

const RadioCustom = styled(Radio)(() => ({
    "padding": "0",
    "& .MuiSvgIcon-root": {
        fontSize: "18px"
    }
}))

const FormControlLabelCustom = styled(FormControlLabel)(() => ({
    margin: 0,
    "& .MuiTypography-root": {
        fontSize: "14px",
        marginLeft: "4px"
    },
}))

const InputCustom = styled(InputBase)(({ theme }) => ({
    flex: 1,
    width: "100%",
    '&.errorInput .MuiInputBase-input:focus ': {
        borderColor: '#ff0000',
        boxShadow: '0 0 0 0.2rem rgba(255,0,0,.25)',
    }
    ,
    '& .MuiInputBase-input': {
        boxSizing: "border-box",
        borderRadius: 2,
        position: 'relative',
        border: '1px solid #bfbfbf',
        fontSize: 14,
        height: '32px',
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: '4px 10px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 2,
            borderColor: '#1890ff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));


const listCategory = ["T???t c???", "Qu???n ??o", "Gi??y d??p", "Thi???t b??? ??i???n t???", "????? gia d???ng"]
const listStatus = ["T???t c???", "B???t", "T???t", "???n"]
export default CreateCoupon