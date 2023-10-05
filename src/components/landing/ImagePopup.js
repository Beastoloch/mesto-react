import React from "react";

class ImagePopup extends React.Component{

    isCardExists = () => {
        return !(Object.keys(this.props.selectedCard).length === 0);
    }

    handleOverlayClose = (evt) => {
        if(evt.target === evt.currentTarget)
            this.props.onClose()
    }

    render() {
        return(
            <div className={`popup popup_theme_dark ${this.isCardExists() ? 'popup_opened' : ''}`} id="image-popup"
                 onClick={this.handleOverlayClose}>
                <div className="popup__container popup__image-container">
                    <img className="popup__image" src={this.props.selectedCard.link}
                         alt="Ваша картинка в полном размере"/>
                    <p className="popup__image-title">{this.props.selectedCard.name}</p>
                    <button className="popup__exit-button" type="button" onClick={this.props.onClose}></button>
                </div>
            </div>
        );
    }
}

export default ImagePopup