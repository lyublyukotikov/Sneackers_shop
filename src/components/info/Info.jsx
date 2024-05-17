import React from 'react'
import AppContext from '../../context';
import styles from "../info/Info.module.scss"

function Info({title , description,image}) {
  const {setCartOpened} = React.useContext(AppContext);
  return (
    <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
      <img width="120px" height="120px"src={image} alt="Empty" />
      
   
    <h2>{title}</h2>
    <p className='opacity-6'>{description} </p>
    <button onClick={() => setCartOpened(false)} className={styles.greenButton}>
  <img src="/img/arrow.svg" alt="Arrow" />
  <span>Вернуться назад</span>
</button>
    </div>
  )
}

export default Info;
