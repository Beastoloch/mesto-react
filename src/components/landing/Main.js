import {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Card from "./Card";
import api from "../../utils/Api";

function Main(props) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);


    useEffect(() => {
        Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
        ])
            .then((values) => {
                let userLoadedInfo;
                let cardsData;
                [userLoadedInfo, cardsData] = values;
                setUserName(userLoadedInfo.name);
                setUserDescription(userLoadedInfo.about);
                setUserAvatar(userLoadedInfo.avatar);
                setCards(cardsData);
            })
    }, [])
    console.log(cards);
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
                {cards.map((card) => (
                    <Card key={card._id} card={card} onCardClick={props.onCardClick}></Card>
                ))}
            </section>
        </main>
    );
}

export default Main;