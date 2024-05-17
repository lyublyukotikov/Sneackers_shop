import Card from "../components/Card/index";
import React from "react";
// компонент главной страницы получаем в качестве пропса наши товары значение для поиска значение для отображения того что нашли
// значение изменения input,функцию  onAddToFavorite добавления в favorite и функцию  onAddtoCurt добавление в карзину

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddtoCurt,
  isLoading,
}) {
  // рендарим карточки
  const renderItems = () => {
    return (
      isLoading
        ? [...Array(10)]
        : items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
    ).map((item, index) => (
      <Card
        key={index}
        {...item}
        onPlus={(obj) => onAddtoCurt(obj)}
        onClickFavorite={(obj) => onAddToFavorite(obj)}
        isLoading={isLoading}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">
          {searchValue ? `Поиск по запросу : ${searchValue}` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex align-center">
          <img alt="search" src="img/search.svg" />
          <input
            onChange={onChangeSearchInput}
            className="search"
            placeholder="Поиск..."
            value={searchValue}
          />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clearBtn"
              alt="Remove"
              src="/img/remove.svg"
            />
          )}
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
