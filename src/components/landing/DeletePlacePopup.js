import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onDeletePlace(props.cardToDelete);
    }

    return(
        <PopupWithForm title="Вы уверены?" name="delete" button="Да" isOpen={props.isOpen} onClose={props.onClose}
               onSubmit={handleSubmit}/>
    );
}

export default DeletePlacePopup