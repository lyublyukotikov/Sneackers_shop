import React from "react";
import Info from "./info/Info";
import AppContext from "../context";
import axios from "axios";
import styles from "./info/Info.module.scss";
import { useCart } from "../hooks/useCart";

// компонент корзины
// передаем массив карточек которые нам понравились
// пропсы функция закрытия функция удаления массив карточек которые отображаем в этом компоненте
const delay = (time)=>new Promise ( (resolve)=>setTimeout(resolve,time));
function Drawer({ onClose, onRemove, items = [] }) {

  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);
  const {cartItems,setCartItems,totalPrice} = useCart ();
  const onClickOrder = async () => {
    try {
      setIsloading(true);
      const { data } = await axios.post(
        "https://6635f095415f4e1a5e25c286.mockapi.io/orders",
        {
          items: cartItems
        }
      );
     
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        axios.delete(`https://6623dde83e17a3ac84707cb7.mockapi.io/cart/${item.id}`)
         await delay(1000);
        
      }
    } catch (error) {
      console.log("Не удалось создать заказ :( ");
    }

    setIsloading(false);
  };
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            onClick={onClose}
            className="cu-p"
            width={32}
            height={32}
            src="img/remove.svg"
            alt="close curt"
          />
        </h2>
        {items.length > 0 ? (
          <>
            <div className="Items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price}.</b>
                  </div>
                  <div className="removeBtn"></div>
                  <img
                    className="removeBtn"
                    width={32}
                    height={32}
                    alt="Remove"
                    src="img/remove.svg"
                    onClick={() => onRemove(obj.id)}
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li className="">
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{totalPrice / 100 * 5 } руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                className={styles.greenButton}
                onClick={onClickOrder}
              >
                Оформить заказ
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Коризна пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ ${orderId} cкоро будет передан курьерской доставке `
                : "Добавьте хотя бы одну пару кроссовок,чтобы сделать заказ "
            }
            image={
              isOrderComplete ? "img/Complete.svg" : "img/Empty-curt.svg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
