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

    // eslint-disable-next-line
    const [submitDiet, setSubmitDiet] = React.useState({
        "loading": false,
        "sent": false
    })

    const navigate = useNavigate()

    function headToDashboard(e) {
        // setSubmitDiet(prevDiet =>
        // ({
        //     ...prevDiet,
        //     "loading": true,
        //     "sent": false
        // }))
        // setTimeout(() => {
        //     setSubmitDiet(prevDiet =>
        //     ({
        //         ...prevDiet,
        //         "loading": false,
        //         "sent": true
        //     }))
        //     setTimeout(() => {
        //     }, 5000);
        // }, 5000)

        navigate("/app")
    }

    function backToDiet() {
        navigate("/app/diet")
    }

    const handleClose = () => {
        props.setOpen(prev =>
        ({
            ...prev,
            "show": false
        }));
    };

    function convertToHTML(response) {
        if(!response) return null
        response = response.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

        response = response.replace(/\n/g, "<br>");

        if (/\d+\. /.test(response)) {
            let lines = response.split(/\d+\. /);
            let numberedResponse = "<ol>";
            for (let i = 1; i < lines.length; i++) {
                numberedResponse += "<li>" + lines[i] + "</li>";
            }
            numberedResponse += "</ol>";

            return numberedResponse;
        } else {
            return response;
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={Boolean(props.open.show)}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ display: "flex", placeItems: "center" }}>{submitDiet.sent ? "Added to your diet" : "Review your food"}&nbsp;{submitDiet.sent && <CheckCircleIcon color='success' />}</DialogTitle>
                <DialogContent>
                    {!submitDiet.sent ? <DialogContentText id="alert-dialog-slide-description">
                        {convertToHTML(props.open.message)}
                        {props.open.message}
                    </DialogContentText>
                        : <DialogContent>Heading to Dashboard</DialogContent>}
                </DialogContent>
                {!submitDiet.sent && <DialogActions>
                    <Button variant='contained' color="error" onClick={backToDiet} disabled={submitDiet.loading}>Go Back to Diet Page</Button>
                    <LoadingButton
                        loading={submitDiet.loading}
                        variant='contained'
                        color="success"
                        endIcon={<SendIcon />}
                        onClick={(e) => headToDashboard(e)}>
                        Head to Dashboard
                    </LoadingButton>
                </DialogActions>}
            </Dialog>
        </React.Fragment>
    );
}