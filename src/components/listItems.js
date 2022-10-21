import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useNavigate} from "react-router-dom";
import pageList from "../utills/pageList";
import {ShortText} from "@mui/icons-material";


const DashboardMenuList = ({current, setCurrentMenu, user}) => {
    const navigate = useNavigate();
    console.log(user)
    return (
        <>
            { user &&
                pageList.filter(page => {
                    return (page.roles.indexOf(user.role) !== -1);
                }).map( (page, index) => <ListItemButton key={index}
                                                         onClick={()=> {navigate(page.path); setCurrentMenu(page)}}
                                                         selected={current.name === page.name}
                    // style={{backgroundColor: 'rgba(0,0,0,0.1)'}}
                >
                    <ListItemIcon>
                        {
                            page.icon?page.icon:<ShortText/>
                        }
                    </ListItemIcon>
                    <ListItemText primary={page.name} />
                </ListItemButton>)
            }
        </>
    );
};

export default DashboardMenuList;

