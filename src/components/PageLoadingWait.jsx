import "../styles/PageLoadingWait.scss";
import { Loader } from "./Loader";

export const PageLoadingWait = () => {
  return (
    <section className="container-page-loading">
      <h2 className="container-page-loading__title">Espere un momento</h2>
      <Loader />

      <p className="container-page-loading__description">
        Estamos configurando el usuario y la contraseña para la creación de su
        cuenta. podra acceder en breve.
      </p>
    </section>
  );
};
