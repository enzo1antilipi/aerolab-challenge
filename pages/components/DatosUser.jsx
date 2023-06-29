import React, { useState } from "react";

import styles from "./User.module.css";

function DatosUser({ datosUsuario, precio }) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  console.log(precio);
  // const arra = posts;
  // datosUsuario.map((p) => console.log(p.points - 100));
  //console.log(array4);
  return (
    <>
      <div className={styles.contenedorbotondespliegue}>
        <button onClick={toggle} className={styles.botonDespliegue}>
          POINTS {precio}
        </button>
        {open && ( //Nota 1
          <div className={styles.contenedorDatos}>
            {datosUsuario.map((post) => (
              <div className={styles.contenedor1} key={post.id}>
                <div className={styles.tarjetablack}>
                  <span className={styles.aerocard}>Aerocard </span>{" "}
                  <h5 className={styles.nombre}> {post.name}</h5>
                </div>
                <p>Points: {post.points}</p>

                <button className={styles.botones}>1000</button>
                <button className={styles.botones}>5000</button>
                <button className={styles.botones}>7500</button>

                <button className={styles.botonadd}>Add poinst</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default DatosUser;

//Nota 1:Lo que estoy haciendo es lo siguiente usar un boolean para poner en el estado true o false, si es true muestro lo que esta dentro del
//div, si es false se oculta. En cambio el boton se muestra siempre, por q no esta dentro del condicional
