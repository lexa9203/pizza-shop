import React, { useState, useEffect, createContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

export const SearchContext = createContext('');

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  /* при первом рендере не изменять url в зависимости от фильтров */
  const isMounted = useRef(false);
  const queryFilters = useRef(false);
  const params = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const page = useSelector((state) => state.paginate.page);
  const { activeCategory, sort, order } = useSelector((state) => state.filter);

  const getData = () => {
    const category = activeCategory !== 'all' ? activeCategory : '';
    setIsLoading(true);
    axios
      .get(
        `https://6321e67782f8687273bc24b7.mockapi.io/pizzas?page=${page}&limit=8${
          category ? '&category=' + category : ''
        }&sortBy=${sort.sortTitle}&order=${order ? 'desc' : 'asc'}${
          searchValue && '&search=' + searchValue
        }`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
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
  }, [activeCategory, order, sort, page, searchValue]);

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
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Input />
      </SearchContext.Provider>
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
      <Paginate />
    </>
  );
};

export default Home;
