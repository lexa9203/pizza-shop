import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Loader from '../components/Loader';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIsLoading(true);
    try {
      fetch('https://6321e67782f8687273bc24b7.mockapi.io/pizzas')
        .then((res) => res.json())
        .then((res) => {
          setPizzas(res);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Loader key={index} />)
          : pizzas.map((el) => (
              <PizzaBlock
                key={el.id}
                title={el.title}
                price={el.price}
                imgUrl={el.imageUrl}
                sizes={el.sizes}
                types={el.types}
              />
            ))}
      </div>
    </>
  );
};

export default Home;
