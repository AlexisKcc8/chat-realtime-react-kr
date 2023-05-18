import "../styles/HeaderLoginRegister.scss";
export const HeaderLoginRegister = () => {
  return (
    <section className="container-hero">
      <img
        className="container-hero__img-avatar"
        src="/images/my-avatar.jpg"
        alt="imagen-avatar"
      />
      <article className="container-hero__container-title-autor">
        <h3 className="container-hero__title">CodeChat</h3>
        <span className="container-hero__name-autor">By: AlexisKR🧢</span>
      </article>
    </section>
  );
};
