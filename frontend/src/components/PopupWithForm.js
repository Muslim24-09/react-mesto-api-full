export const PopupWithForm = (props) => {
  const handleClose = () => {
    document.querySelector(`form[name=${props.name}]`).reset()
    props.onClose()
  }
  return (
    <div className={props.isOpen ? 'popup popup_opened' : 'popup'} id={props.name} >
      <div className="popup__container">
        <h3 className="popup__title">{props.title}</h3>
        <button className="popup__close-button" title='Закрыть попап' onClick={() => handleClose()}></button>
        <form className="form form_delete-item" name={props.name} noValidate onSubmit={props.onSubmit}>
          {props.children}
          <button
            disabled={!props.valid}
            type="submit"
            className={props.valid ? `form__save-button form__save-button_${props.name}` : `form__save-button form__save-button_disabled`}
            title={props.title}>{props.btnName}
          </button>
        </form>
      </div>
    </div>
  )
}