import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import FullScreenDialog from "../components/FullScreenDialog";
import {Button} from "@mui/material";

const Home = ({initialLoading, initialData}) => {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <div>
            <Helmet>
                <title>Home Page</title>
            </Helmet>
            Home
            {initialLoading ? <p>Loading...</p> : <p>Data...</p>}
            <Button variant="outlined" onClick={()=>setOpenDialog(true)}>Outlined</Button>
            <FullScreenDialog open={openDialog} setOpen={setOpenDialog}>
                Salom lorem
            </FullScreenDialog>
        </div>
    );
};

export default Home;
