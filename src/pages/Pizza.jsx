import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

const Pizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://6321e67782f8687273bc24b7.mockapi.io/pizzas/${id}`)
      .then((res) => setPizza(res.data))
      .catch((err) => {
        console.log(err);
        alert('Пицца не найдена...');
        navigate('/');
      });
  }, [id]);

  if (!pizza) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <h1>
        Pizza id: <span>{pizza.id}</span>
      </h1>
      <img src={pizza.imageUrl} alt="pizza" />
    </>
  );
};

export default Pizza;
