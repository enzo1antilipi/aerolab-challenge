"use client";

import styles from "./Barra.module.css";

export default function Navbar(props) {
  //

  const { handleMostrar, mostrarmenor, handleFiltro, handleMostrarReciente } =
    props;
  // estoy recibiendo las props y desestructurandolas para poder usarlas, en este caso son funciones que las llamo de aqui pero se ejecutan
  //en el component padre (index)
  return (
    <>
      {/* <h1 className={styles.titulo}>TECH PRODUCTS</h1> */}
      <div className={styles.contenedor}>
        <label className={styles.filtro}>Filterby: </label>

        <select className={styles.selector} onChange={handleFiltro}>
          <option>All products </option>
          <option value="Gaming">Gaming </option>
          <option value="Audio">Audio </option>
          <option value="Smart Home">Smart Home </option>
          <option value="Monitors & TV ">Monitores & TV </option>
          <option value="Phones">Phones </option>
          <option value="Laptops">Laptops </option>
          <option value="Cameras">Cameras </option>
        </select>

        <button className={styles.ordenadores} onClick={handleMostrarReciente}>
          Reciente
        </button>

        <button className={styles.ordenadores} onClick={mostrarmenor}>
          precio bajo
        </button>

        <button className={styles.ordenadores} onClick={handleMostrar}>
          precio alto
        </button>

        {/* el select lo puedo hacer asi o agregar un arrray con todas las opciones y luego mapearlas  */}
      </div>
    </>
  );
}
