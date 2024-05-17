import { Link } from "react-router-dom";
import React from "react";
import AppContext from "../context";
import { useCart } from "../hooks/useCart";
// компонент шапки передаем пропс из него вытаскиваем функцию onClickCart которая отвечает за открытие карзины
function Header(props) {
  const { totalPrice } = useCart();
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="headerLeft d-flex align-center">
        <img alt="logo" width={40} height={40} src="img/logo.png" />
        <Link to="/">
          <div className="headerInfo">
            <h3 className="text-uppercase">Обувь.РУ</h3>
            <p className="opacity-5">Магазин кроссовок Таганрог</p>
          </div>
        </Link>
      </div>
      <ul className="d-flex align-center">
        <li className="mr-30">
          <img alt="curt" width={18} height={18} src="img/curt.svg" />
          <span className="cu-p" onClick={props.onClickCart}>
            {totalPrice} руб.
          </span>
        </li>
        <li className="mr-30">
          <Link to="/favorites">
            <img
              alt="favorites"
              width={18}
              height={18}
              src="img/favorites.svg"
            />
          </Link>
        </li>

        <li>
          <Link to="/orders">
            <img alt="Пользователь" width={18} height={18} src="img/user.svg" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
