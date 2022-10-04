import React from 'react';
import notFound from '../assets/img/pizza-empty-state-error-404-flat-illustration_288067-137.jpg';

const NotFound = () => {
  return (
    <div className="notFound">
      <h1>Страница не найдена 😢</h1>
      <img src={notFound} alt="notFound" />
    </div>
  );
};

export default NotFound;
