import Image from "next/image";
import { Inter } from "next/font/google";
import logo from "../public/logo.png";
import tarjetas from "../public/tarjetas.png";
import styles from "./components/Button.module.css";
import tech from "../public/tech.png";
import explore from "../public/explore.png";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import DatosUser from "./components/DatosUser";
import swal from "sweetalert";

const inter = Inter({ subsets: ["latin"] });

//a la variable mapa le asigno los valores de costo asi lo puedo trabajr como un arreglo
//   array.map((p) => console.log(p));
function Blog({ posts, posts2 }) {
  const [arreglo, setArreglo] = useState(posts); //le paso el array de obejtos post a 'arreglo'
  const [precio, setPrecio] = useState("");

  //function mapear() {
  const datosUsuario = [posts2];
  const hadleMostrar = (e) => {
    const array = [...arreglo]; //le asigno a la constante array el array de objetos
    array.sort(function (a, b) {
      return b.cost - a.cost;
      //con .sort ordeno el array de objetos y con .cost accedo a la propiedad de costo del obejto para ordenarlos de forma numerica
    });
    setArreglo(array);
    //array.map((p) => console.log(p));
  };

  const mostrarmenor = (e) => {
    const array2 = [...arreglo];
    array2.sort(function (a, b) {
      return a.cost - b.cost;
    });
    setArreglo(array2);
  };
  const handleMostrarReciente = () => {
    const arraydeReciente = [...posts];
    setArreglo(arraydeReciente);
  };

  const handleFiltro = (ev) => {
    const array3 = [...posts];

    const resultado = array3.filter(
      (array3) => array3.category === ev.target.value
    );
    if (resultado.length === 0) {
      setArreglo(array3);
    } else {
      console.log(resultado);
      setArreglo(resultado);
    }
    //lo que hago aqui es evaluar si el array resultado no tiene ningun elemento por que no encontro ninguna
    //coincidencia entonces que me devuelva todos los articulos. esto serviria para la funcion del option "all products"
  };
  // aqui vamos a hacer que se reste el valor de puntos de los puntos del usuario

  useEffect(() => {
    const puntosinicial = datosUsuario["0"].points;
    setPrecio(puntosinicial);
  }, []);
  const handlecanjear = (event) => {
    const value = event.target.dataset.value;
    const resultado = precio - value;
    setPrecio(resultado);
    swal(
      "Felicitaciones",
      "Canjeaste tu producto con exito, te quedan " + resultado + " puntos",
      "success"
    );
  };
  return (
    <>
      <div className={styles.contenedor2}>
        {/* <ul>
          <li>
            <Link href="/dashboard/page">About Us</Link>
          </li>
        </ul>
        esto es un ruta creada como recomienda nextjs
        */}
        <div className={styles.contenedordesplegable}>
          <DatosUser datosUsuario={datosUsuario} precio={precio} />
        </div>
        <div className={styles.imagenesinicio}>
          <div className={styles.letra}>
            <Image src={explore} className={styles.explo} alt="explore" />
            <Image src={tech} className={styles.tech} alt="tech" />
            <div className={styles.contenedorlink}>
              <a href="#productos" className={styles.verproductos}>
                Ver prodcutos
              </a>
            </div>
          </div>
          <div className={styles.contenedor}>
            <Image src={logo} className={styles.logo} alt="logo" />
          </div>
        </div>
      </div>{" "}
      <div className={styles.contenedorimagentarjetas}>
        <Image
          src={tarjetas}
          className={styles.imagentarjetas}
          alt="tarjetas"
        />
      </div>{" "}
      <div className={styles.tarjetas}>
        <div>
          <Navbar
            handleMostrar={hadleMostrar}
            mostrarmenor={mostrarmenor}
            handleFiltro={handleFiltro}
            handleMostrarReciente={handleMostrarReciente}
          />
          {/*  le estoy mandando las props al componente hijo el cual va a llamar a una funcion que esta aquie en el componente padre */}
        </div>
        <section id="productos">
          <div className="row">
            {/* el classname row me permite mostrar las carda como filashandleMostrar={hadleMostrar} */}
            {arreglo.map(
              (
                post // EL slice me deja elejir cuantos elementos quiero mostrar
              ) => (
                <div className="col" key={post._id}>
                  <div
                    className="card"
                    style={{
                      width: "15rem",
                      height: "17rem",
                      margin: "0px",
                      marginTop: "4px",
                      borderRadius: "10px",
                    }} // de esta manera le agrego estilos
                  >
                    <div
                      className={styles.ima}
                      style={{ borderRadius: "20px" }}
                    >
                      <img src={post.img.url} />
                      <div className="card-body">
                        <h5 className="card-title">{post.name}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                          {post.category}
                        </h6>
                        {/* <p className="card-text">Cost :{post.cost} points</p> */}
                      </div>
                    </div>
                  </div>

                  <div>
                    {post.cost <= precio ? (
                      <button
                        className={styles.botonpuntos}
                        data-value={post.cost}
                        onClick={handlecanjear}
                      >
                        Canjear por {post.cost}
                      </button>
                    ) : (
                      <button className={styles.botonNoCanje}>
                        Necesitas {post.cost - precio} puntos
                      </button>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const heders3 = { Accept: "application / json" };
  const heders2 = { ContentType: "application/json" };
  const headers = {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDUzM2YyMDA1YmY4YzAwMWE5ZTA4YjQiLCJpYXQiOjE2ODMxNzcyNDh9.vb7d_iIWr6jx0W8jlilucKuAYczgJrA856Lu75Kldxk",
  };

  const res = fetch(
    "https://private-cdebd-aerolabchallenge.apiary-proxy.com/products",
    {
      headers,
    }
  );
  const res2 = fetch(
    "https://private-cdebd-aerolabchallenge.apiary-proxy.com/user/me",
    {
      headers,
    }
  );
  const [response1, response2] = await Promise.all([res, res2]);

  const [posts, posts2] = await Promise.all([
    response1.json(),
    response2.json(),
  ]);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  // return <h1>hola</h1>;
  return {
    props: {
      posts,
      posts2,
    },
  };
}

export default Blog;
