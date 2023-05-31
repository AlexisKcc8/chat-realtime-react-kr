import "../styles/PageLoadingWait.scss";
import { Loader } from "./Loader";

export const PageLoadingWait = (props) => {
  const { title, textInfo } = props;
  return (
    <section className="container-page-loading">
      <h2 className="container-page-loading__title">{title}</h2>
      <Loader />

      {textInfo ? (
        <p className="container-page-loading__description">{textInfo}</p>
      ) : null}
    </section>
  );
};
