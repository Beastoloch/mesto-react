import React, {useEffect, useState} from "react";
import Header from "./landing/Header";
import Main from "./landing/Main";
import Footer from "./landing/Footer";
import PopupWithForm from "./landing/PopupWithForm";
import ImagePopup from "./landing/ImagePopup";
import EditProfilePopup from "./landing/EditProfilePopup";
import EditAvatarPopup from "./landing/EditAvatarPopup";
import AddPlacePopup from "./landing/AddPlacePopup";
import DeletePlacePopup from "./landing/DeletePlacePopup";
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function App() {

    const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
    const [isDeletePlacePopupOpen, setDeletePlacePopupState] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [cardToDelete, setCardToDelete] = useState({});
    const [isImagePopupOpen, setImagePopupState] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo()
            .then(user => {
                setCurrentUser(user);
            })
    }, [])

    useEffect(() => {
        api.getInitialCards()
            .then(value => {
                setCards(value.reverse());
            })
    }, [])

    const handleEditAvatarClick = () => {
        setEditAvatarPopupState(true);
    }

    const handleEditProfileClick = () => {
        setEditProfilePopupState(true);
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupState(true);
    }

    const handleDeletePlaceClick = (card) => {
        setDeletePlacePopupState(true);
        setCardToDelete(card);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setImagePopupState(true);
    }

    const handleEscClose = (evt) => {
        if(evt.key === 'Escape'){
            closeAllPopups();
        }
    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) =>
                state.map((c) =>
                    c._id === card._id ? newCard : c));
        })
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id).then((deletedCard) => {
            setCards((state) =>
                state.filter((c) =>
                    c._id !== card._id))
        })
        closeAllPopups();
    }

    const handleUpdateUser = (userInfo) => {
        api.setUserInfo(userInfo.name, userInfo.about)
            .then(user => {
                setCurrentUser(user);
            })
        closeAllPopups();
    }

    const handleUpdateAvatar = (avatarLink) => {
        api.setUserAvatar(avatarLink)
            .then(user => {
                setCurrentUser(user);
            })
        closeAllPopups();
    }

    const handleAddPlaceSubmit = (card) => {
        api.postNewCard(card.name, card.link)
            .then(newCard => {
                setCards([newCard, ...cards]);
            })
        closeAllPopups();
    }

    const closeAllPopups = () => {
        setEditAvatarPopupState(false);
        setEditProfilePopupState(false);
        setAddPlacePopupState(false);
        setImagePopupState(false);
        setDeletePlacePopupState(false);
    }
    return (
        <div className="page" onKeyDown={handleEscClose}>
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                      cards={cards} onCardLike={handleCardLike} onDeletePlace={handleDeletePlaceClick}/>
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
                <DeletePlacePopup isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} onDeletePlace={handleCardDelete}
                      cardToDelete={cardToDelete}/>
                <ImagePopup selectedCard={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
                <Footer />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
