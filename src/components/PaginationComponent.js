import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    TablePagination,
    TextField
} from "@mui/material";
import axiosClient from "../utills/axiosClient";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {ArrowDownward, ArrowUpward} from "@mui/icons-material";

const PaginationComponent = ({show = false, loading, refresh, setData, setLoading, pageable}) => {

    const currentDate = new Date()

    const [page, setPage] = useState((pageable && pageable.page) ? pageable.page : 0);
    const [totalElements, setTotalElements] = useState(0);
    const [size, setSize] = useState((pageable && pageable.size) ? pageable.size : 25);
    const [orderBy, setOrderBy] = useState((pageable && pageable.sort && pageable.sort.options) ? pageable.sort.options[0].value : "id");
    const [desc, setDesc] = useState((pageable && pageable.sort) ? pageable.sort.desc : false);
    const [fromDate, setFromDate] = useState((pageable && pageable.filter && pageable.filter.from) ? dayjs(pageable.filter.from.toISOString()) : dayjs(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString()));
    const [toDate, setToDate] = useState((pageable && pageable.filter && pageable.filter.to) ? dayjs(pageable.filter.to.toISOString()) : dayjs(currentDate.toISOString()));

    useEffect(() => {
        if (pageable) {
            setPage((pageable.page) ? pageable.page : 0)
            setSize((pageable.size) ? pageable.size : 20)
            setOrderBy((pageable && pageable.sort && pageable.sort.options) ? pageable.sort.options[0].value : "id")
            setDesc(pageable.sort ? pageable.sort.desc : false)
        }
    }, [pageable]);

    useEffect(() => {
        if (pageable) {
            setLoading(true)
            axiosClient.get(`${pageable.fetchLink}?page=${page}&size=${size}&orderBy=${orderBy?orderBy:'id'}&desc=${desc}` + (fromDate ? `&from=${fromDate.format('YYYY-MM-DD')}` : '') + (toDate ? `&to=${toDate.format('YYYY-MM-DD')}` : '')).then(r => {
                setData(r.data.data)
                if (size < r.data.totalElements)
                    setSize(r.data.totalElements)
                setTotalElements(r.data.totalElements)
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
        }
    }, [refresh, page, size, pageable, orderBy, desc, fromDate, toDate]);

    return (
        <>
            {show ?
                <div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <FormControl sx={{m: 1, minWidth: 120}} size="small">
                                <InputLabel id="demo-select-small">Sort by</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    variant="outlined"
                                    value={orderBy}
                                    onChange={(event) => {
                                        setOrderBy(event.target.value)
                                    }}
                                    label="Sort by"
                                >
                                    {
                                        (pageable && pageable.sort && pageable.sort.options) ?
                                            pageable.sort.options.map(option => <MenuItem key={option.value}
                                                                                          value={option.value}>{option.name}</MenuItem>) :
                                            <MenuItem value={'id'}>Id</MenuItem>
                                    }
                                </Select>
                            </FormControl>
                            <div className="d-block">
                                <IconButton onClick={() => setDesc(!desc)}>
                                    {desc ? <ArrowDownward/> : <ArrowUpward/>}
                                </IconButton>
                            </div>

                        </div>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className="d-flex">
                                <DesktopDatePicker

                                    label="From"
                                    inputFormat="DD.MM.YYYY"
                                    value={fromDate}
                                    maxDate={toDate}
                                    onChange={(e) => {
                                        setFromDate(e)
                                    }}
                                    renderInput={(params) => <TextField size="small" sx={{width: 150}} {...params} />}
                                />
                                <div className="p-2"></div>
                                <DesktopDatePicker
                                    label="To"
                                    inputFormat="DD.MM.YYYY"
                                    value={toDate}
                                    disableFuture={true}
                                    onChange={(e) => {
                                        setToDate(e)
                                    }}
                                    renderInput={(params) => <TextField size="small" sx={{width: 150}} {...params} />}
                                />
                            </div>

                        </LocalizationProvider>

                        <TablePagination
                            component="div"
                            count={totalElements}
                            page={page}
                            onPageChange={(e, val) => {
                                setPage(val)
                            }
                            }
                            rowsPerPageOptions={[5, 10, 20, 25, 50, 100, 150, 200]}
                            rowsPerPage={size}
                            onRowsPerPageChange={e => {
                                setSize(e.target.value)
                            }}
                        />
                    </div>

                    <Outlet/>
                </div> : <div>
                    <Outlet/>
                </div>}

            {(show && (totalElements / size) > 1) && <div className="d-flex justify-content-end">
                <Pagination size="large" variant="text" color="primary" style={{marginTop: 24}} shape="rounded"
                            disabled={loading} count={Math.ceil(totalElements / size)} defaultPage={page + 1}
                            boundaryCount={4} onChange={(e, val) => {
                    setPage(val)
                }
                }/>
            </div>}
        </>
    );
};

export default PaginationComponent;
