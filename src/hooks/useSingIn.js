//hooks
import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

//firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { Loader } from "../components/Loader";

const INITIAL_STATE_USER = {
  email: "",
  password: "",
};

export const useSingIn = () => {
  const [perfilUser, setPerfilUser] = useState(INITIAL_STATE_USER);
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const hiddenErroMessage = setTimeout(() => {
      setErrorLogin(false);
    }, 3000);

    return () => {
      clearTimeout(hiddenErroMessage);
    };
  }, [errorLogin]);

  const inputChange = (e) => {
    let prop = e.target.name;
    let data = e.target.value;

    setPerfilUser({
      ...perfilUser,
      [prop]: data,
    });
  };

  const submitInfoUser = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { email, password } = perfilUser;

      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (error) {
      setErrorLogin(true);
    } finally {
      setLoading(false);
    }
  };
  return { submitInfoUser, inputChange, perfilUser, loading, errorLogin };
};
