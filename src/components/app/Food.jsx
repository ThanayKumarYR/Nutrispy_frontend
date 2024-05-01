import React, { useRef, useState } from 'react'


import '../css/Food.css'
import FormDialog from './FormDialog';

export default function Food() {

    document.title = "NutriSpy - Food"

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const imagePreview = useRef()
    const inputRef = useRef()
    const deleteBtn = useRef()

    // eslint-disable-next-line
    const [foodList, setFoodList] = useState(
        [{
            "index": 1,
            "name": "Food Name 1",
            "quantity": 1,
            "measurement": "gm",
            "calories": 300
        },
        {
            "index": 2,
            "name": "Food Name 2",
            "quantity": 2,
            "measurement": "bowl",
            "calories": 400
        }]
    )

    const [data, setData] = useState({
        "index": 1,
        "name": "Food Name 1",
        "quantity": 1,
        "measurement": "bowl",
        "calories": 300
    })

    function handleImage(e) {
        const imagePreviewElement = imagePreview['current']
        let file = e.target.files[0]
        if (!file) return
        imagePreviewElement.src = URL.createObjectURL(file)
        imagePreviewElement.style.opacity = 1;
        deleteBtn['current'].style.display = "block"
    }
    function removeImage(e) {
        const imagePreviewElement = imagePreview['current']
        imagePreviewElement.src = '';
        imagePreviewElement.value = '';
        imagePreviewElement.style.opacity = 0;
        deleteBtn['current'].style.opacity = 0
        console.log("removeImage")
    }
    function closePopUp(e) {
        console.log("closePopUp")
    }
    function handlePopUpFood(e) {
        console.log("handlePopUpFood")
    }
    function editFood(e) {
        console.log("editFood")
    }
    function deleteFood(e) {
        console.log("deleteFood")
    }
    function addNewFoodItem(e) {

        console.log("addNewFoodItem")
    }


    return (
        <main className="food-app">
            <FormDialog 
            data = {data}
            open={open} 
            setOpen={() => setOpen()} 
            handleClickOpen={() => handleClickOpen()} 
            handleClose={() => handleClose()}
            setData = {setData}
            />
        
            <h2 className="heading">Add Food</h2>
            <section>
                <div className="select-image-div">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                    <img className="preview-image" src="" alt="" ref={imagePreview} />
                    <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={(e) => handleImage(e)} ref={inputRef} />
                    <button className="del-btn" onClick={() => removeImage(this)} ref={deleteBtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="#ff000d"
                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                    </button>
                </div>
            </section>

            <section className="food-list">
                {
                    (foodList.length > 0) &&
                    foodList.map(food =>
                        <div className="each-food" key={food.index}>
                            <div>
                                <h4>{food.name}</h4>
                                <br />
                                <span>{food.quantity}</span>
                                <span> || </span>
                                <span>{food.calories} cal</span>
                            </div>
                            <div className="each-food-btns">
                                <button title="Edit" onClick={(e) => editFood(e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="#0f97ff" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path>
                                    </svg>
                                </button>
                                <button title="Delete" onClick={(e) => deleteFood(e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="#ff4242" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )
                }
            </section>

            <section className="add-food-item-btn-div">
                <button className="submit-btn">Submit</button>
                <button className="add-food-item-btn" onClick={() => addNewFoodItem()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="#ffffff"
                            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                </button>
            </section>
            <section className="pop-up-window">
                <span className="outer-span" onClick={() => closePopUp(this)}></span>
                <form action="" method="" onSubmit={() => handlePopUpFood(this)}>
                    <input type="text" name="pop-name" pattern="/^[a-zA-Z]+[a-zA-Z -]*/" placeholder="Food Name" />
                    <label>
                        <input type="number" name="pop-num" pattern="[0-9]{1-4}" placeholder="Quantity" inputMode="numeric" />
                        <select name="pop-quantity" defaultValue="bowl">
                            <option value="bowl">bowl</option>
                            <option value="gm">gm</option>
                            <option value="spoon">spoon</option>
                            <option value="plate">plate</option>
                        </select>
                    </label>
                    <label>
                        <input type="number" pattern="[0-9]{1-3}" name="pop-cal" inputMode="numeric" placeholder="Calories" />
                        Cal
                    </label>
                    <div className="bottom-btns-div">
                        <button type="submit" value="Okay">Okay</button>
                        <button type="button" role="none" onClick={() => closePopUp()}>Cancel</button>
                    </div>
                </form>
            </section>
        </main >
    )
}
