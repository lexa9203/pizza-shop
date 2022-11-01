import React from 'react';
import { Link } from 'react-router-dom';

import empty from '../assets/img/empty-cart.png';

const EmptyCart: React.FC = () => {
  return (
    <div className="container activeType--cart">
      <div className="cart cart--empty">
        <h2>Корзина пустая 😕</h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={empty} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Вернуться на главную</span>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
