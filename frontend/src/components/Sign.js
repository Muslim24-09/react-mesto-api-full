import React from "react";

export const Sign = ({ btnClassName, title, btnText, onSubmit, messageIsRegistered, children }) => {
	return (
		<section className="auth">
			<h2 className="auth__title">
				{title}
			</h2>
			<form
				className="auth__form"
				onSubmit={onSubmit}
			>
				{children}
				<button
					className={btnClassName}
					type="submit"
				>
					{btnText}
				</button>
				{messageIsRegistered && messageIsRegistered}
			</form>
		</section>
	)
}