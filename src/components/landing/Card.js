import React from "react";

class Card extends React.Component {

    handleClick = () => {
        this.props.onCardClick(this.props.card);
    }

    render() {
        return(
            <article className="element">
                <img className="element__image" alt="Ваша картинка" src={this.props.card.link} onClick={this.handleClick}/>
                <button className="element__delete-button" type="button"></button>
                <div className="element__info">
                    <h3 className="element__title">{this.props.card.name}</h3>
                    <div className="element__like-section">
                        <button className="element__like-button" type="button"></button>
                        <p className="element__like-count">{this.props.card.likes.length}</p>
                    </div>
                </div>
            </article>
        )
    }
}

export default Card