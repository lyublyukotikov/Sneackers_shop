import axios from "axios";
import Card from "../components/Card/index";
import React from "react";
import AppContext from "../context";
// компонент главной страницы получаем в качестве пропса наши товары значение для поиска значение для отображения того что нашли
// значение изменения input,функцию  onAddToFavorite добавления в favorite и функцию  onAddtoCurt добавление в карзину

function Orders() {
  const {onAddToFavorite, onAddtoCurt} = React.useContext(AppContext);
  const [orders,setOrders] = React.useState([]);
  const [isLoading,setIsLoading] = React.useState(true);

  React.useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const response= await axios.get('https://6635f095415f4e1a5e25c286.mockapi.io/orders');
        setOrders(response.data.map(obj => obj.items).flat())
        console.log(response.data.map(obj => obj.items).flat())
        setIsLoading(false);
        
      } catch (error) {
        console.error("Error Fetching data:",error)
        alert('Ошибка при запросе заказов')
      }
    }
    fetchData();
  },[])
  
    return (
      <div className="content p-40">
    <div className="d-flex align-center mb-40 justify-between">
      <h1 className="">
       Мои заказы
      </h1>
     
    </div>

    <div className="d-flex flex-wrap">
    {(isLoading
        ? [...Array(10)]
        : orders).map((item, index) => (
  <Card
    key={index}
   
    
    
    isLoading={isLoading}
    {...item}
    
  />
))}
    </div>
  </div>
    );
}

export default Orders;
