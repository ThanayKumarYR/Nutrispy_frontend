import React, { useRef, useState } from 'react'

import FormData from 'form-data'
// import fs from 'fs'

import './css/AddFood.css'
import FormDialog from './FormDialog';

import Loading from '../../images/loading.gif'
import customAxios from "../../utilities/axios"

import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

export default function AddFood() {

    document.title = "NutriSpy - Food"

    const [open, setOpen] = React.useState(false);
    const [infoOpen, setInfoOpen] = React.useState(false);
    const [foodInfo, setFoodInfo] = React.useState({});
    const [isNew, setIsNew] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({});

    const [imagesAndDetails, setImagesAndDetails] = useState([])

    const [currentPreviewUrl, setCurrentPreviewUrl] = useState("")

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
    // const deleteBtn = useRef()

    const [foodList, setFoodList] = useState([])

    async function handleImage(e) {
        e.preventDefault()
        setLoading(true)
        console.log(imagePreview)
        setFoodList([])
        let file = e.target.files[0]
        console.log(file);
        if (!file) {
            setLoading(false)
            return
        }
        const fileUrl = URL.createObjectURL(file);
        setImagesAndDetails(prevData => {
            let prev = prevData;
            if (prev.length) {
                prev.push({
                    "index": prev[prev.length - 1].index + 1,
                    "img": fileUrl
                })
            }
            else {
                prev = [
                    {
                        "index": 0,
                        "img": fileUrl
                    }]
            }
            return prev
        })
        const imagePreviewElement = imagePreview['current']
        // imagePreviewElement.src = fileUrl
        setCurrentPreviewUrl(fileUrl)
        imagePreviewElement.style.opacity = 1;
        // deleteBtn['current'].style.display = "block"

        var formData = new FormData();
        formData.append('image', file)
        console.log(formData)
        console.log(fileUrl);

        try {
            const response = await customAxios.posting("/detect", formData);
            console.log(response.data.data);
            setFoodList([response.data.data]);
            setImagesAndDetails(prevData => {
                const prev = prevData;
                if (response.data.data.food === "yes") {
                    prev[prev.length - 1].details = {
                        ...response.data.data,
                        "nutrients": {
                            "name": response.data.data.name,
                            "quantity": 1,
                            "measurement": "bowl",
                            "calories": 100,
                            "fat": 100,
                            "protiens": 200
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

    function removeImage(e) {
        e.preventDefault()
        const imagePreviewElement = imagePreview['current']
        imagePreviewElement.src = '';
        setCurrentPreviewUrl("")
        imagePreviewElement.value = '';
        imagePreviewElement.style.opacity = 0;
        // deleteBtn['current'].style.opacity = 0
        console.log("removeImage")
    }

    function editFood(e) {
        console.log("editFood", e)
        const theFood = imagesAndDetails.filter(food => food["index"] === e)[0]
        setData({
            ...theFood.details.nutrients,
            "index": e
        })
        handleClickOpen()
    }

    function deleteFood(e) {
        setImagesAndDetails(prevList =>
            prevList.filter(food => food.index !== e)
        )
        console.log("deleteFood")
    }

    function addNewFoodItem(e) {
        setIsNew(true)
        setOpen(true)
        console.log("addNewFoodItem")
    }

    function submitFood() {
        console.log("submitFood");
    }

    return (
        <main className="add-food-main">
            {
                open &&
                <FormDialog
                    open={open}
                    handleClose={handleClose}
                    setFoodList={setFoodList}
                    imagesAndDetails={imagesAndDetails}
                    setImagesAndDetails={setImagesAndDetails}
                    foodList={foodList}
                    data={data}
                    setData={setData}
                    isNew={isNew}
                    setIsNew={setIsNew}
                />
            }
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
                                    ["name", "index", "food"].includes(key) ? null :
                                        <span key={index}>
                                            {key === "nutrients" ?
                                                <span>
                                                    {key === "nutrients" ? 'quantity' : null}: {value.quantity} {value.measurement}<br />
                                                    {Object.entries(value).map(([nutrientKey, nutrientValue], nutrientIndex) => (
                                                        nutrientKey === "name" || nutrientKey === "quantity" || nutrientKey === "measurement" ? null :
                                                            <span key={nutrientIndex}>{nutrientKey}: {nutrientValue}<br /></span>
                                                    ))}
                                                </span>
                                                :
                                                <span>{key}: {value}<br /></span>
                                            }
                                        </span>
                                ))

                            }
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            }

            <h2 className="heading">Add Food</h2>
            <section className={`add-food-after ${imagesAndDetails.length > 0 ? "" : " hide"}`}>
                <section>
                    <div className="select-image-div">
                        <img className="preview-image" src={currentPreviewUrl} alt="" ref={imagePreview} />
                        {/* <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={(e) => handleImage(e)}  /> */}
                        <button className="del-btn" onClick={(e) => removeImage(e)}
                            // ref={deleteBtn}
                            type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="#ff000d"
                                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </svg>
                        </button>
                    </div>
                </section>
                {/* {currentPreviewUrl} */}
                <section className='cards-container' >
                    <section className='uploaded-image-cards'>
                        {imagesAndDetails.length &&
                            imagesAndDetails.map((eachImage, index) =>
                                <Button variant="outlined" className={`each-card ${eachImage.img === currentPreviewUrl ? "active" : ""} ${eachImage.details?.food === "no" ? "no-food" : ""}`} key={index} onClick={() => { setCurrentPreviewUrl(eachImage.img) }} title={`${eachImage.details && (eachImage.details?.name) ? eachImage.details?.name : "Not Food"}`}> 
                                    {eachImage.img ? <img src={eachImage.img} alt="" /> : "No Image"}
                                </Button>
                            )
                        }
                    </section>
                    <section className='add-item-container'>
                        {/* <Button variant="contained" className='each-card add-item'>
                            <AddIcon />
                        </Button> */}
                        <Button
                            className="each-card add-item"
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                        // startIcon={<AddIcon />}
                        >
                            <AddIcon />
                            <VisuallyHiddenInput type="file" className='file-input' onChange={(e) => handleImage(e)} accept="image/png, image/jpeg, image/jpg" />
                        </Button>
                    </section>
                    {/* <input type="file" accept="image/png, image/jpeg, image/jpg" onClick={(e) => handleImage(e)} /> */}
                </section>
                {/* {JSON.stringify(imagesAndDetails)} */}
                <section className="food-list">
                    {/* {imagesAndDetails.length > 0 && loading ? <h3>{imagesAndDetails.filter(prev => prev.details && prev.details.food === "yes").length ?? 0} Food items - {imagesAndDetails.reduce((acc, currentValue) => acc + Number(currentValue.details?.calories ?? 0), 0)} calories</h3> : null} */}
                    {imagesAndDetails.length > 0 && !loading ?
                        <h3>
                            {imagesAndDetails.filter(prev => prev.details && prev.details.food === "yes").length ?? 0} Food items -
                            {imagesAndDetails.reduce((acc, currentValue) =>
                                acc + (Number(currentValue.details?.nutrients?.calories ?? 0) * Number(currentValue.details?.nutrients?.quantity ?? 1)), 0
                            )} calories
                        </h3>
                        : null}
                    {
                        (imagesAndDetails.length > 0) &&
                        imagesAndDetails.map(food =>
                            (food.details && food.details.food === "yes") ?
                                <div className={`each-food ${food.img === currentPreviewUrl ? "active" : ""}`} key={food.index}>
                                    <div>
                                        <h3>{food.details.name}<InfoIcon
                                            className='info-icon'
                                            onClick={
                                                () => {
                                                    setFoodInfo(food.details)
                                                    handleInfoOpen()
                                                }
                                            } /></h3>
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
                    {/* <button className="submit-btn">Submit</button> */}
                    <LoadingButton
                        loading={false}
                        loadingPosition="end"
                        endIcon={<SendIcon />}
                        variant="contained"
                        onClick={submitFood}
                    >
                        Submit
                    </LoadingButton>
                    <button className="add-food-item-btn" onClick={() => addNewFoodItem()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="#ffffff"
                                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                        </svg>
                    </button>
                </section>
            </section >
            <section className={`add-section ${imagesAndDetails.length > 0 ? "hide" : ""}`}>
                <img src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1661385244-3b38a8fc-796c-4545-8394-ac9a7bfe3455-1661385196.png?crop=1xw:1xh;center,top&resize=980:*" alt="" />
                <Button
                    className="upload-btn"
                    component="label"
                    fullWidth
                    sx={{ maxWidth: 300, py: 1, mb: 2 }}
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Add Food
                    <VisuallyHiddenInput type="file" className='file-input' onChange={(e) => handleImage(e)} accept="image/png, image/jpeg, image/jpg" />
                </Button>
            </section>
        </main >
    )
}