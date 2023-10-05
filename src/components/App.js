import React from "react";
import Header from "./landing/Header";
import Main from "./landing/Main";
import Footer from "./landing/Footer";
import PopupWithForm from "./landing/PopupWithForm";
import ImagePopup from "./landing/ImagePopup";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            isEditProfilePopupOpen: false,
            selectedCard: {}
        }
    }
    handleEditAvatarClick = () => {
        this.setState({
            isEditAvatarPopupOpen: true});
    }

    handleEditProfileClick = () => {
        this.setState({
            isEditProfilePopupOpen: true});
    }

    handleAddPlaceClick = () => {
        this.setState({
            isAddPlacePopupOpen: true});
    }

    handleCardClick = (card) => {
        this.setState({
            selectedCard: card
        })
    }

    handleEscClose = (evt) => {
        if(evt.key === 'Escape'){
            this.closeAllPopups();
        }
    }

    closeAllPopups = () => {
        this.setState({
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            isEditProfilePopupOpen: false,
            selectedCard: {}
        })
    }

    render() {
        return (
            <div className="page" onKeyDown={this.handleEscClose}>
                <Header />
                <Main onCardClick={this.handleCardClick}/>
                <PopupWithForm title="Редактировать профиль" name="edit" button="Сохранить" isOpen={this.state.isEditProfilePopupOpen}
                               onClose={this.closeAllPopups}>
                    <input className="form__input form__input_type_name" type="text" placeholder="Имя" value=""
                           id="name-input" name="name" required minLength="2" maxLength="40"/>
                    <span className="name-input-error"></span>
                    <input className="form__input form__input_type_job" type="text" placeholder="О себе" value=""
                           id="job-input" name="info" required minLength="2" maxLength="200"/>
                    <span className="job-input-error"></span>
                </PopupWithForm>
                <PopupWithForm title="Новое место" name="add" button="Создать" isOpen={this.state.isAddPlacePopupOpen}
                               onClose={this.closeAllPopups}>
                    <input className="form__input form__input_type_place" type="text" placeholder="Название" id="place-input"
                           name="place-input" required minLength="2" maxLength="30"/>
                    <span className="place-input-error"></span>
                    <input className="form__input form__input_type_image" type="url" placeholder="Ссылка на картинку"
                           id="image-input" name="image-input" required/>
                    <span className="image-input-error"></span>
                </PopupWithForm>
                <PopupWithForm title="Вы уверены?" name="delete" button="Да" onClose={this.closeAllPopups}></PopupWithForm>
                <PopupWithForm title="Обновить аватар" name="avatar" button="Сохранить" isOpen={this.state.isEditAvatarPopupOpen}
                               onClose={this.closeAllPopups}>
                    <input className="form__input form__input_type_avatar" type="url" placeholder="Ссылка на картинку"
                           id="avatar-input" name="avatar" required/>
                    <span className="avatar-input-error"></span>
                </PopupWithForm>
                <ImagePopup selectedCard={this.state.selectedCard} onClose={this.closeAllPopups}></ImagePopup>
                <Footer />
            </div>
        );
    }
}

export default App;
