import Card from "../components/Card";
import AppContext from "../context";
import React from "react";
// страница понравившихся товаров 
//получаем в пропсе товары чтобы отображать их тут 
//получаем функцию  onAddToFavorite которую передаем в качестве  onCLickFavorite в компонент карточки 
function Favorites(
{
  
  onAddToFavorite
}

)
{
  const {favorites} = React.useContext(AppContext);
console.log(favorites)
  return(
    <div className="content p-40">
    <div className="d-flex align-center mb-40 justify-between">
      <h1 className="">
       Мои закладки
      </h1>
     
    </div>

    <div className="d-flex flex-wrap">
    {favorites.map((item, index) => (
  <Card
    key={index}
    favorited={true}
    onClickFavorite={onAddToFavorite} // Corrected prop name
    {...item}
  />
))}
    </div>
  </div>
  )
}

export default Favorites;