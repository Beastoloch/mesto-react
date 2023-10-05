import React from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Card from "./Card";
import api from "../../utils/Api";

function Main(props) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    let userLoadedInfo;
    let cardsData;

    React.useEffect(() => {
        Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
        ])
            .then((values) => {
                [userLoadedInfo, cardsData] = values;
                setUserName(userLoadedInfo.name);
                setUserDescription(userLoadedInfo.about);
                setUserAvatar(userLoadedInfo.avatar);
                setCards(cardsData);
            })
    }, [])
    return (
        <main className="content">
            <section className="profile" id="profile">
                <div className="profile__avatar-border">
                    <img className="profile__avatar" src={`${userAvatar}`}/>
                    <div className="profile__avatar-edit" onClick={props.onEditAvatar}></div>
                </div>
                <div className="profile__info">
                    <div className="profile__edit-line">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__job">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements" id="elements">
                {cards.map(card => (
                    <Card card={card} onCardClick={props.onCardClick}></Card>
                ))}
            </section>
            <PopupWithForm title="Редактировать профиль" name="edit" button="Сохранить" isOpen={props.isEditProfilePopupOpen}
                           onClose={props.onClose}>
                <input className="form__input form__input_type_name" type="text" placeholder="Имя" value=""
                       id="name-input" name="name" required minLength="2" maxLength="40"/>
                <span className="name-input-error"></span>
                <input className="form__input form__input_type_job" type="text" placeholder="О себе" value=""
                       id="job-input" name="info" required minLength="2" maxLength="200"/>
                <span className="job-input-error"></span>
            </PopupWithForm>
            <PopupWithForm title="Новое место" name="add" button="Создать" isOpen={props.isAddPlacePopupOpen}
                           onClose={props.onClose}>
                <input className="form__input form__input_type_place" type="text" placeholder="Название" id="place-input"
                       name="place-input" required minLength="2" maxLength="30"/>
                <span className="place-input-error"></span>
                <input className="form__input form__input_type_image" type="url" placeholder="Ссылка на картинку"
                       id="image-input" name="image-input" required/>
                <span className="image-input-error"></span>
            </PopupWithForm>
            <PopupWithForm title="Вы уверены?" name="delete" button="Да" onClose={props.onClose}></PopupWithForm>
            <PopupWithForm title="Обновить аватар" name="avatar" button="Сохранить" isOpen={props.isEditAvatarPopupOpen}
                           onClose={props.onClose}>
                <input className="form__input form__input_type_avatar" type="url" placeholder="Ссылка на картинку"
                       id="avatar-input" name="avatar" required/>
                <span className="avatar-input-error"></span>
            </PopupWithForm>
            <ImagePopup selectedCard={props.selectedCard} onClose={props.onClose}></ImagePopup>
        </main>
    );
}

export default Main;