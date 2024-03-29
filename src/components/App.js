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
    const [isAnyPopupOpen, setAnyPopupState] = useState(false);
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
            .catch((err)=>{
                console.log(`Ошибка...: ${err}`);
            })
    }, [])

    useEffect(() => {
        const close = (evt) => {
            if(evt.key === 'Escape'){
                closeAllPopups();
            }
        }
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close)
    },[isAnyPopupOpen]);

    useEffect(() => {
        api.getInitialCards()
            .then(value => {
                setCards(value.reverse());
            })
            .catch((err)=>{
                console.log(`Ошибка...: ${err}`);
            })
    }, []);

    const handleEditAvatarClick = () => {
        setEditAvatarPopupState(true);
        setAnyPopupState(true);
    }

    const handleEditProfileClick = () => {
        setEditProfilePopupState(true);
        setAnyPopupState(true);
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupState(true);
        setAnyPopupState(true);
    }

    const handleDeletePlaceClick = (card) => {
        setDeletePlacePopupState(true);
        setAnyPopupState(true);
        setCardToDelete(card);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setImagePopupState(true);
        setAnyPopupState(true);
    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) =>
                        c._id === card._id ? newCard : c));
            })
            .catch((err)=>{
                console.log(`Ошибка...: ${err}`);
            })
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then((deletedCard) => {
                setCards((state) =>
                    state.filter((c) =>
                        c._id !== card._id))
                closeAllPopups();
            })
            .catch((err)=>{
                console.log(`Ошибка...: ${err}`);
            })
    }

    const handleUpdateUser = (userInfo) => {
        api.setUserInfo(userInfo.name, userInfo.about)
            .then(user => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch((err)=>{
                console.log(`Ошибка...: ${err}`);
            })
    }

    const handleUpdateAvatar = (avatarLink) => {
        api.setUserAvatar(avatarLink)
            .then(user => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch((err)=>{
                console.log(`Ошибка...: ${err}`);
            })
    }

    const handleAddPlaceSubmit = (card) => {
        api.postNewCard(card.name, card.link)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err)=>{
                console.log(`Ошибка...: ${err}`);
            })
    }

    const closeAllPopups = () => {
        setEditAvatarPopupState(false);
        setEditProfilePopupState(false);
        setAddPlacePopupState(false);
        setImagePopupState(false);
        setDeletePlacePopupState(false);
        setAnyPopupState(false);
    }
    return (
        <div className="page">
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
