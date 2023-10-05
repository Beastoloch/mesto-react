import React from "react";

class PopupWithForm extends React.Component{
    handleOverlayClose = (evt) => {
        if(evt.target === evt.currentTarget)
            this.props.onClose()
    }

    render() {
        return (
            <div className={`popup ${this.props.isOpen ? 'popup_opened' : ''}`} id={`${this.props.name}-popup`}
                 onClick={this.handleOverlayClose}>
                <div className="popup__container popup__form-container">
                    <button className="popup__exit-button" type="button" onClick={this.props.onClose}></button>
                    <h2 className="popup__title">{this.props.title}</h2>
                    <form id={`popup__${this.props.name}-form`} className="form" name="delete-form" noValidate>
                        {this.props.children}
                        <button className="popup__admit-button" type="submit">{this.props.button}</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default PopupWithForm