import React from "react";
import Header from "./landing/Header";
import Main from "./landing/Main";
import Footer from "./landing/Footer";

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
                <Main isEditProfilePopupOpen={this.state.isEditProfilePopupOpen} onEditProfile={this.handleEditProfileClick}
                      isAddPlacePopupOpen={this.state.isAddPlacePopupOpen} onAddPlace={this.handleAddPlaceClick}
                      isEditAvatarPopupOpen={this.state.isEditAvatarPopupOpen} onEditAvatar={this.handleEditAvatarClick}
                      onClose={this.closeAllPopups} onEscClose={this.handleEscClose} onCardClick={this.handleCardClick}
                      selectedCard={this.state.selectedCard}/>
                <Footer />
            </div>
        );
    }
}

export default App;
