import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({open = false, setOpen, children, toolbarComponent: ToolbarComponent = null}) {

    const handleClose = () => {
        setOpen(false);
    };
    console.log(<ToolbarComponent/>)
    console.log(children)

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <div className="d-flex flex-column vh-100">
                <AppBar sx={{position: 'relative', boxShadow: "none"}}>
                    <Toolbar style={{minHeight: 48}}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        {ToolbarComponent && <ToolbarComponent/>}
                    </Toolbar>
                </AppBar>

                {/*<div style={{height: 24}}></div>*/}
                <div className="p-3 h-auto overflow-auto">
                    {children}
                </div>
            </div>
        </Dialog>
    );
}
