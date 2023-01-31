import React from "react";

export const InfoToolTip = ({ isOpen, onClose, imgSrc,  message }) => {
  return (
    <div className={isOpen ? 'popup popup_opened' : 'popup'} >
      <div className="popup__container popup__tooltip">
        <button className="popup__close-button" title='Закрыть попап' onClick={onClose}></button>
        {<>
          <img className="popup__tooltip_image" src={imgSrc} alt={message} />
          <p className="popup__tooltip_message">
            {message}
          </p>
          </>}
      </div>
    </div>
  );
}





