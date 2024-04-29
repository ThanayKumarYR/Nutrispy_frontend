import React from 'react'

import '../css/Food.css'

export default function Food() {

    document.title = "NutriSpy - Food"


    function handleImage(e) {
        console.log("handleImage")
    }
    function removeImage(e) {
        console.log("removeImage")
    }
    function closePopUp(e) {
        console.log("closePopUp")
    }
    function handlePopUpFood(e) {
        console.log("handlePopUpFood")
    }
    function addNewFoodItem(e) {
        console.log("addNewFoodItem")
    }

    return (
        <main className="food-app">
            <h2 className="heading">Add Food</h2>
            <section>
                <div className="select-image-div">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                    <img className="preview-image" src="" alt="" />
                    <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImage(this)} />
                    <button className="del-btn" onClick={() => removeImage(this)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="#ff000d"
                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                    </button>
                </div>
            </section>

            <section className="food-list">
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
            <section className="pop-up-window" id="pop-up-window">
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
                        <button type="button" role="none" onClick={closePopUp()}>Cancel</button>
                    </div>
                </form>
            </section>
        </main>
    )
}
