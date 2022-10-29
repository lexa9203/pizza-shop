import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Loader from '../components/Loader';
import Input from '../components/Input';
import Paginate from '../components/Paginate';
import { setActiveCategory, setSort, setOrder } from '../redux/slice/filterSlice';
import { setPage } from '../redux/slice/paginateSlice';
import { sortList } from '../components/Sort';
import { fetchPizzas } from '../redux/slice/pizzaSlice';
import { IItemCart } from '../components/ItemCart';

const Home: React.FC = () => {
  /* при первом рендере не изменять url в зависимости от фильтров */
  const isMounted = useRef(false);
  const queryFilters = useRef(false);
  const params = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const page = useSelector((state: any) => state.paginate.page);
  const { items, status } = useSelector((state: any) => state.pizza);

  const { activeCategory, sort, order, search } = useSelector((state: any) => state.filter);

  const getData = async () => {
    const category = activeCategory !== 'all' ? activeCategory : '';
    //@ts-ignore
    dispatch(fetchPizzas({ page, category, sort, order, search }));

    window.scrollTo(0, 0);
  };
  /* проверка есть ли данные в url */
  useEffect(() => {
    if (params.search) {
      const query = qs.parse(params.search.replace('?', ''));
      const sortValue = sortList.filter((el) => el.sortTitle === query.sort)[0];
      dispatch(setActiveCategory(query.category));
      dispatch(setSort(sortValue));
      dispatch(setOrder(query.order));
      dispatch(setPage(query.page));
      queryFilters.current = true;
    }
  }, []);

  useEffect(() => {
    if (!queryFilters.current) {
      getData();
    }
    queryFilters.current = false;
  }, [activeCategory, order, sort, page, search]);

  /* при первом рендере не показзывать фильтра в url */
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        page,
        category: activeCategory,
        sort: sort.sortTitle,
        order,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategory, order, sort, page, navigate]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <Input />
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'error' ? (
          <div>error</div>
        ) : status === 'loading' ? (
          [...new Array(8)].map((_, index) => <Loader key={index} />)
        ) : (
          items.map((el: any) => (
            <PizzaBlock
              key={el.id}
              id={el.id}
              title={el.title}
              price={el.price}
              imgUrl={el.imageUrl}
              sizes={el.sizes}
              types={el.types}
            />
          ))
        )}
      </div>
      {status === 'success' && <Paginate />}
    </>
  );
};

export default Home;
