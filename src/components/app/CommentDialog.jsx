import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CommentDialog(props) {

    const [submitDiet, setSubmitDiet] = React.useState({
        "loading": false,
        "sent": false
    })

    // const handleClickOpen = () => {
    //     props.setOpen(prev =>
    //     ({
    //         ...prev,
    //         "loading": true
    //     })
    //     );
    // };
    const navigate = useNavigate()

    function pushDiet(e) {
        setSubmitDiet(prevDiet =>
        ({
            ...prevDiet,
            "loading": true,
            "sent": false
        }))
        setTimeout(() => {
            setSubmitDiet(prevDiet =>
            ({
                ...prevDiet,
                "loading": false,
                "sent": true
            }))
            setTimeout(() => {
                navigate("/app")
            }, 5000);
        }, 5000)

    }

    const handleClose = () => {
        props.setOpen(prev =>
        ({
            ...prev,
            "show": false
        }));
    };

    return (
        <React.Fragment>
            <Dialog
                open={Boolean(props.open.show)}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ display: "flex", placeItems: "center" }}>{submitDiet.sent ? "Added to your diet" : "Review your food"}&nbsp;{submitDiet.sent && <CheckCircleIcon color='success'/>}</DialogTitle>
                <DialogContent>
                    {!submitDiet.sent ? <DialogContentText id="alert-dialog-slide-description">
                        {props.open.message}
                    </DialogContentText>
                        : <DialogContent>Heading to Dashboard</DialogContent>}
                </DialogContent>
                {!submitDiet.sent && <DialogActions>
                    <Button variant='contained' color="error" onClick={handleClose} disabled={submitDiet.loading}>Go Back</Button>
                    <LoadingButton
                        loading={submitDiet.loading}
                        variant='contained'
                        color="success"
                        endIcon={<SendIcon />}
                        onClick={(e) => pushDiet(e)}>
                        Add to Diet
                    </LoadingButton>
                    {/* <LoadingButton
                        loading={comment.loading}
                        className='submit-btn'
                        variant="contained"
                        onClick={(e) => submitFood(e)}
                    >
                    </LoadingButton> */}
                </DialogActions>}
            </Dialog>
        </React.Fragment>
    );
}