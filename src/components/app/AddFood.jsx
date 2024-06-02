import React, { useRef, useState } from 'react'

import FormData from 'form-data'

import './css/AddFood.css'
import FormDialog from './FormDialog';

import Loading from '../../images/loading.gif'
import customAxios from "../../utilities/axios"

import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CommentDialog from './CommentDialog';
import { LoadingButton } from '@mui/lab';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import recomFoods, { foods } from '../../utilities/nutrition'
import axios from 'axios';

export default function AddFood({ selectRecomFoods, setSelectRecomFoods }) {

    document.title = "NutriSpy - Add Food"

    const [open, setOpen] = React.useState(false);
    const [infoOpen, setInfoOpen] = React.useState(false);
    const [foodInfo, setFoodInfo] = React.useState({});
    const [isNew, setIsNew] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({});

    const [comment, setComment] = useState({
        "loading": false,
        "comment": null,
        "show": false
    })

    const [imagesAndDetails, setImagesAndDetails] = useState(
        selectRecomFoods.length > 0 ?
            recomFoods
                .filter(food => selectRecomFoods.includes(recomFoods.indexOf(food)))
                .map((food, index) => {
                    const details = {
                        food: "yes",
                        name: food.name,
                        nutrients: {
                            name: food.name,
                            quantity: 1,
                            measurement: "bowl",
                            ...food
                        }
                    };
                    return {
                        index,
                        img: "",
                        details
                    };
                })
            : []
    );


    const [currentPreview, setCurrentPreview] = useState({
        img: "",
        index: selectRecomFoods.length - 1 ?? ""
    })

    const [error, setError] = useState({
        "message": ""
    })

    function setTheError(data) {
        setError(data)
        setTimeout(() => {
            setError({})
        }, 5000)
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setData({})
        setOpen(false);
    };
    const handleInfoOpen = () => {
        setInfoOpen(true);
    };
    const handleInfoClose = () => {
        setInfoOpen(false);
    };

    const imagePreview = useRef()

    const frontPage = useRef()

    async function handleImage(e) {
        e.preventDefault()
        let file = e.target.files[0]
        if (!file)
            return

        var allowedExtensions = ['png', 'jpeg', 'jpg'];
        var extension = file.name.split('.').pop().toLowerCase();

        if (!allowedExtensions.includes(extension)) {
            return
        }
        setLoading(true)
        const fileUrl = URL.createObjectURL(file);
        let index = imagesAndDetails.length ? imagesAndDetails[imagesAndDetails.length - 1]?.index + 1 : 0;
        setImagesAndDetails(prevData => {
            let newIndex = prevData.length ? prevData[prevData.length - 1].index + 1 : 0;
            return [...prevData, { index: newIndex, img: fileUrl }];
        })
        const imagePreviewElement = imagePreview['current']
        setCurrentPreview({
            index,
            "img": fileUrl
        })

        imagePreviewElement.style.opacity = 1;

        var formData = new FormData();
        formData.append('image', file)

        try {
            const response = await customAxios.posting("/detect", formData);
            setImagesAndDetails(prevData => {
                const prev = prevData;
                if (response.data.data.food === "yes") {
                    prev[prev.length - 1].details = {
                        ...response.data.data,
                        "nutrients": {
                            "name": response.data.data.name,
                            "quantity": 1,
                            "measurement": "bowl",
                            ...foods.filter(e => e.name.toLowerCase() === response.data.data.name.toLowerCase())[0]
                        }
                    };
                }
                else {
                    prev[prev.length - 1].details = {
                        ...response.data.data
                    };
                }
                return prev;
            });

        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setLoading(false);
        }
    }

    function editFood(e) {
        const theFood = imagesAndDetails.filter(food => food["index"] === e)[0]
        const nutrients = theFood.details.nutrients
        const sett = { ...nutrients, "index": e }
        setData(sett)
        handleClickOpen()
    }

    function deleteFood(e) {
        setImagesAndDetails(prevList =>
            prevList.filter(food => food.index !== e)
        )
    }

    function addNewFoodItem(e) {
        setIsNew(true)
        setOpen(true)
    }

    function submitFood() {
        if (imagesAndDetails.filter(e => e.details.food === "yes").length === 0) {
            setTheError({
                message: "Add atleast one food",
                "severity": "info"
            })
            return
        }
        setComment({ "loading": true, "message": null, "show": false })
        const toBeSentData = imagesAndDetails.filter(e => e.details.food === "yes").filter(e => e.details.food === "yes").map(f => {
            return {
                "name": f.details.name,
                "type": f.details.type || f.details.nutrients["Food Type"] || null,
                "quantity": f.details.nutrients.quantity,
                "measurement": f.details.nutrients.measurement,
                "calories": f.details.nutrients.calories,
            }
        })
        console.log(toBeSentData)

        // axios.get("https://cat-fact.herokuapp.com/facts", undefined)
        // customAxios.posting("/detect/data", toBeSentData)
        customAxios.getting("/detect/data", undefined)
            .then(response => {
                console.log(response.data.data[0])
                if (response.data.response.toLowerCase().includes("success")) {
                    const res = {
                        "data": response.data.data[0].answer,
                        "response": response.data.response,
                        "statusCode": response.data.responeCode
                    }
                    setComment({
                        "loading": false,
                        "message": response.data.data[0].answer,
                        "show": true
                    })
                }
            })
            .catch(err => {
                console.log(err)
                setComment({
                    "loading": false,
                    "message": null,
                    "show": false
                })
            })
            .finally(() => {
                setComment(oldComment => ({
                    ...oldComment,
                    "loading": false,
                }))
            })
        // console.table(toBeSentData)
    }

    return (
        <main className="add-food-main">
            <CommentDialog
                open={comment}
                setOpen={setComment}
            />
            <FormDialog
                open={open}
                handleClose={handleClose}
                imagesAndDetails={imagesAndDetails}
                setImagesAndDetails={setImagesAndDetails}
                data={data}
                setData={setData}
                isNew={isNew}
                setIsNew={setIsNew}
                currentPreview={currentPreview}
                setCurrentPreview={setCurrentPreview}
                comment={comment}
            />
            {
                infoOpen &&
                <Dialog
                    open={infoOpen}
                    onClose={handleInfoClose}
                    className='food-info'
                >
                    <DialogTitle className='food-info-title'>
                        {foodInfo["name"]}
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleInfoClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent>
                        <DialogContentText >
                            {
                                Object.entries(foodInfo).map(([key, value], index) => (
                                    ["name", "index", "food", "Food Type"].includes(key) ? null :
                                        <span key={index}>
                                            {key === "nutrients" ?
                                                <span>
                                                    {value["Food Type"] ? <>Food Type: {value["Food Type"]}<br /></> : null}
                                                    {key === "nutrients" ? 'Quantity' : null}: {value.quantity} {value.measurement[0].toUpperCase() + value.measurement.slice(1, value.measurement.length)}<br />
                                                    {Object.entries(value).map(([nutrientKey, nutrientValue], nutrientIndex) => (
                                                        nutrientKey === "name" || nutrientKey === "quantity" || nutrientKey === "measurement" || nutrientKey === "Food Type" ? null :
                                                            <span key={nutrientIndex}>{nutrientKey[0].toUpperCase() + nutrientKey.slice(1, nutrientKey.length)}: {nutrientValue}<br /></span>
                                                    ))}
                                                </span>
                                                :
                                                <span>{key[0].toUpperCase() + key.slice(1, key.length)}: {value}<br /></span>
                                            }
                                        </span>
                                ))
                            }
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            }

            <h2 className="heading">Add Food</h2>
            {error.message?.length > 0 && <Alert variant="filled" severity={error.severity} sx={{ m: 1, minWidth: "200px", mx: "auto", position: "absolute", top: "50px", left: "50%", transform: "translateX(-50%)", zIndex: 10 }} >
                {error.message}
            </Alert>}
            <section className={`add-food-after ${imagesAndDetails.length ? "" : "hide"}`}>
                <section>
                    <div className="select-image-div">
                        <img className="preview-image" src={currentPreview.img} alt="" ref={imagePreview} style={{ display: currentPreview.img ? "block" : "none" }} />
                        {imagesAndDetails.length ? currentPreview?.img ? null : "NO IMAGE - MANUAL ENTRY" : null}
                    </div>
                </section>
                <section className='cards-container' >
                    <section className='uploaded-image-cards'>
                        {imagesAndDetails.length ?
                            imagesAndDetails.map((eachImage, index) =>
                                <Button variant="outlined" className={`each-card ${eachImage.index === currentPreview.index ? "active" : ""} ${eachImage.details?.food === "no" ? "no-food" : ""}`} key={index} onClick={() => {
                                    setCurrentPreview({
                                        "index": eachImage.index,
                                        "img": eachImage.img
                                    })
                                }} title={`${eachImage.details && (eachImage.details?.name) ? eachImage.details?.name : "Not Food"}`}>
                                    {eachImage.img ? <img src={eachImage.img} alt="" /> : "No Image"}
                                </Button>
                            )
                            : null
                        }
                    </section>
                    <section className='add-item-container'>
                        <Button
                            className="each-card add-item"
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            title='Add food image'
                        >
                            <CameraAltIcon />
                            <VisuallyHiddenInput type="file" className='file-input' onChange={(e) => handleImage(e)} accept="image/png, image/jpeg, image/jpg" />
                        </Button>
                    </section>
                </section>
                <section className="food-list">
                    {imagesAndDetails.length > 0 && !loading ?
                        <h3 className='calo-heading'>
                            {imagesAndDetails.filter(prev => prev.details && prev.details.food === "yes").length ?? 0} Food items&nbsp;-&nbsp;
                            {imagesAndDetails.reduce((acc, currentValue) =>
                                acc + (Number(currentValue.details?.nutrients?.calories ?? 0) * Number(currentValue.details?.nutrients?.quantity ?? 1)), 0
                            )} calories
                        </h3>
                        : null}
                    {
                        (imagesAndDetails.length > 0) ?
                            imagesAndDetails.map(food =>
                                (food.details && food.details.food === "yes") ?
                                    <div className={`each-food ${food.index === currentPreview.index ? "active" : ""}`} key={food.index}>
                                        <div>
                                            <h3>{food.details.name[0].toUpperCase() + food.details.name.slice(1, food.details.name.length)}
                                                <InfoIcon
                                                    className='info-icon'
                                                    onClick={
                                                        () => {
                                                            setFoodInfo(food.details)
                                                            handleInfoOpen()
                                                        }
                                                    } />
                                            </h3>
                                            <span>{food.details.nutrients.calories} cal</span>
                                            <span> - </span>
                                            <span>{food.details.nutrients.quantity} {food.details.nutrients.measurement}</span>
                                        </div>
                                        <div className="each-food-btns">
                                            <button title="Edit" onClick={() => editFood(food.index)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill="#0f97ff" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path>
                                                </svg>
                                            </button>
                                            <button title="Delete" onClick={(e) => deleteFood(food.index)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="#ff4242" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    : null
                            )
                            : null
                    }
                    {
                        loading &&
                        <div className='loading-div'>
                            <img src={Loading} alt="loading" />
                            <center>We hope you are having a great meal😋. Hang on tight, while we spy on your foooooooood</center>
                        </div>
                    }
                </section>
                <section className="add-food-item-btn-div">
                    <Button className="add-food-btn" onClick={() => addNewFoodItem()} variant='contained'>
                        <AddIcon sx={{ fontSize: "2.5rem" }} />
                    </Button>
                    <LoadingButton
                        loading={comment.loading}
                        className='submit-btn'
                        variant="contained"
                        onClick={(e) => { submitFood(e); setSelectRecomFoods([]); }}
                        startIcon={<SendIcon />}
                    >
                    </LoadingButton>
                </section>
            </section >
            <section className={`add-section before-add ${imagesAndDetails.length ? "hide" : ""}`} ref={frontPage}>
                <img src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1661385244-3b38a8fc-796c-4545-8394-ac9a7bfe3455-1661385196.png?crop=1xw:1xh;center,top&resize=980:*" alt="" />
                <Stack direction="row" spacing={2}>
                    <Button
                        className="upload-btn"
                        component="label"
                        sx={{ maxWidth: 300, py: 1, mb: 2 }}
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Pic
                        <VisuallyHiddenInput type="file" className='file-input' onChange={(e) => { handleImage(e); }} accept="image/png, image/jpeg, image/jpg" />
                    </Button>
                    <Button
                        className="upload-btn"
                        component="label"
                        sx={{ maxWidth: 300, py: 1, mb: 2 }}
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<ModeEditIcon />}
                        onClick={() => { addNewFoodItem(); }}
                    >
                        Add Manually
                    </Button>
                </Stack>
            </section>
        </main >
    )
}