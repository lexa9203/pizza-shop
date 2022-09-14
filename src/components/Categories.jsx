import React, { useState } from 'react';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 1, name: 'Все', translite: 'all' },
    { id: 2, name: 'Мясная', translite: 'meat' },
    { id: 3, name: 'Вегетарианская', translite: 'vegetarian' },
    { id: 4, name: 'Гриль', translite: 'grill' },
    { id: 5, name: 'Острая', translite: 'spicy' },
    { id: 6, name: 'Закрытая', translite: 'close' },
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((el) => (
          <li
            key={el.id}
            onClick={() => setActiveCategory(el.translite)}
            className={activeCategory === el.translite ? 'active ' : ''}>
            {el.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
