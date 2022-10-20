import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import {ShortText} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import pageList from "../utills/pageList";


const DashboardMenuList = ({current, setCurrentMenu}) => {
    const navigate = useNavigate();

    return (
        <>
            {
                pageList.map( (page, index) => <ListItemButton key={index}
                    onClick={()=> {navigate(page.path); setCurrentMenu(page)}} 
                    selected={current.name === page.name}
                    // style={{backgroundColor: 'rgba(0,0,0,0.1)'}}
                >
                    <ListItemIcon>
                        {
                            page.icon
                        }
                    </ListItemIcon>
                    <ListItemText primary={page.name} />
                </ListItemButton>)
            }
        </>
    );
};

export default DashboardMenuList;

