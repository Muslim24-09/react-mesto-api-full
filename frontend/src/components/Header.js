import React from "react";
import { Link, Route, Switch } from "react-router-dom"

export const Header = ({ userEmail, onSignOut }) => {

	return (
		<header className="header page__header">
			<div className="header__logo"></div>

			<Switch>
				<Route exact path="/sign-in">
					<Link  to="/sign-up" className="header__link">
						Регистрация
					</Link>
				</Route>
				<Route exact path="/sign-up">
					<Link to="/sign-in" className="header__link">
						Войти
					</Link>
				</Route>
				<Route exact path="/">
			<div className="header__user-info">
						<p className="header__email">{userEmail}</p>
						<Link to='./sign-in' className="header__link" onClick={onSignOut}>Выйти</Link>
					</div>
			</Route>

			</Switch>
		</header>
	)
}



