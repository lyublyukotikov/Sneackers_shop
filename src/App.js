 
 import Header from "./components/Header";
 import Drawer from "./components/Drawer";
 import Home from "./Pages/Home";
 import Favorites from "./Pages/Favorites";
 import React from "react";
 import axios from "axios";
 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 import AppContext from "./context";
import Orders from "./Pages/Orders";
 
 
 
 function App() {
   // храним состояние полученных с бека товаров 
   const [items, setItems] = React.useState([]);
   //храним состояние карточек полученных с бека которые добавили в карзину 
   const [cartItems, setCartItems] = React.useState([]);
     //храним состояние favorites полученных с бека 
     const [favorites,setFavorites] = React.useState([]);
   //Храним состояние инпута поиска по умолчанию пустая строка 
   const [searchValue, setSearchValue] = React.useState("");
   //Храним состояние загрузки карточек 
   const [isLoading, setIsloading ] =React.useState(true);
 
   //храним состояние открытия карзины
   const [cartOpened, setCartOpened] = React.useState(false);

 // получение с бека
   React.useEffect(() => {
     async function fetchData(){
       setIsloading(true);
       const cartResponse=await axios.get("https://6623dde83e17a3ac84707cb7.mockapi.io/cart")
       const favoriteResponse = await axios.get("https://6635f095415f4e1a5e25c286.mockapi.io/fovorites")
       const itemsResponse=await axios.get("https://6623dde83e17a3ac84707cb7.mockapi.io/items")
 
       setIsloading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoriteResponse.data);
      setItems(itemsResponse.data);
     
     }
     
       
     fetchData();
   
   }, []);
 
   // функция добавления в карзины товаров 
   const onAddtoCurt = (obj) => {
   try {
     // если есть в карзине такой товар исключи 
     if(cartItems.find ((item) => Number(item.id) === Number(obj.id))){
       axios.delete(`https://6623dde83e17a3ac84707cb7.mockapi.io/cart/${obj.id}`)
      setCartItems((prev => prev.filter(item => Number(item.id) !== Number (obj.id) )) )
     //  если такого товара нет тогда: 
 
     }else{
       axios.post('https://6623dde83e17a3ac84707cb7.mockapi.io/cart/',obj)
       setCartItems((prev)=>[...prev,obj]);
 
     } 
   } catch (error) {
     
   }
   };
   //Удаление товаров 
   const onRemoveItem =(id)=>{
     axios.delete(`https://6623dde83e17a3ac84707cb7.mockapi.io/cart/${id}`)
     setCartItems((prev) => prev.filter(item => item.id !==id)); 
     console.log(id)
     
   };
 
 
   const onAddToFavorite = async (obj) => {
     try {
         
     if (favorites.find((item) => item.id === obj.id)) {
       axios.delete(`https://6635f095415f4e1a5e25c286.mockapi.io/fovorites/${obj.id}`)
      setFavorites((prev)=> prev.filter((item)=>Number(item.id) !== Number(obj.id)))
     } else {
 
      const {data} = await axios.post("https://6635f095415f4e1a5e25c286.mockapi.io/fovorites", obj)
         
           setFavorites((prev) => [...prev, data]);
       
        
     }
     } catch (error) {
       alert ("Не удалось добавить в фавориты ")
     }
  
   };

   const onChangeSearchInput = (event) => {
     console.log(event.target.value);
     setSearchValue(event.target.value);
   };
 //  Функция для проверки товара в корзине 
   const isItemAdded =(id) => {
    return   cartItems.some((obj) => Number(obj.id) === Number (id))
   }
   return (
     <AppContext.Provider value={{items,favorites,cartItems,isItemAdded, setCartOpened , setCartItems, onAddToFavorite  , onAddtoCurt  }}>
     <div className="wrapper clear">
       {cartOpened ? (
         <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
       ) : null}
 
       <Header onClickCart={() => setCartOpened(true)} />
       <Routes>
       <Route path="/" 
       exact
       element={
         <Home
         items={items}
         searchValue={searchValue}
         setSearchValue={setSearchValue}
         onChangeSearchInput={onChangeSearchInput}
         onAddToFavorite={onAddToFavorite}
         onAddtoCurt={onAddtoCurt}
         cartItems={cartItems}
         isLoading={!items.length}
         
         />
       } />
       <Route path="/favorites" 
       exact
       element={
         <Favorites
       
         onAddToFavorite={onAddToFavorite}
 
         
         />
       } />

<Route path="/orders" 
       exact
       element={
         <Orders
       
      
 
         
         />
       } />

    
       </Routes>
     </div>
     </AppContext.Provider>
   );
 }
 
 export default App;
 