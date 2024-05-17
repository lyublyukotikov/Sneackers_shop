import React from "react";
import styles from "./Card.module.scss";
import AppContext from "../../context";
import ContentLoader from "react-content-loader";
function Card({
  id,
  title,
  price,
  imageUrl,
  onClickFavorite,
  onPlus,
  favorited = false,
  added = false,
  isLoading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);

  const [isFavorite, setIsFavorite] = React.useState(favorited);

  // при клике вызываем функцию добавления
  const onClickPlus = () => {
    //вызываем функцию onPlus  которая пришла через пропс
    onPlus({ id, title, price, imageUrl });
  };
  //при клике вызываем функцию favorite
  const onFavorite = () => {
    //вызываем функцию  onCLickFavorite которая пришла через пропс
    onClickFavorite({ id, title, price, imageUrl });
    // делаем метку что мы добавили в favorite
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={300}
          viewBox="0 0 150 300"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="85" />
          <rect x="0" y="93" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="131" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="160" rx="5" ry="5" width="80" height="24" />
          <rect x="109" y="151" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onClickFavorite && (
            <div className={styles.favorite} onClick={onFavorite}>
              <img
                src={
                  isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"
                }
                alt="heart"
              />
            </div>
          )}
          <img alt="products" width={133} height={112} src={imageUrl} />
          <h5>{title}</h5>
          <div className="cardButtom d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price}</b>
            </div>

            {onPlus && (
              <img
                width={32}
                height={32}
                onClick={onClickPlus}
                src={isItemAdded(id) ? "img/btn-checked.svg" : "img/plus.svg"}
                alt="Plus"
              ></img>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
