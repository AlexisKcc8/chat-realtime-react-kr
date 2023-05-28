import "../styles/InfoCodeChat.scss";
export const InfoCodeChat = () => {
  return (
    <section className="container-info-codechat">
      <div className="container-info-codechat__img-and-text">
        <img src="/images/img-info-codechat.svg" alt="img-info-codechat" />
        <p className="title">CodeChat</p>
        <p className="description">
          Envia y recibe mensajes sin necesidad de tener tu teléfono conectado.{" "}
          <br /> Usa CodeChat en dispositivos moviles o desktop
        </p>
      </div>
      <div className="container-info-codechat__text-cifrado">
        <p className="description">Cifrado de extremo a extremo</p>
      </div>
    </section>
  );
};
