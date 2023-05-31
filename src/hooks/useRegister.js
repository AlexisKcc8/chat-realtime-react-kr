//hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, dbFirestore, storage } from "../firebase/firebase-config";

const INITIAL_STATE_USER = {
  username: "",
  email: "",
  password: "",
  photo: null,
};
export const useRegister = () => {
  const [newUser, setNewUser] = useState(INITIAL_STATE_USER);
  const [isLoadImgUser, setIsLoadImgUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Establece un temporizador para cambiar el estado después de 2 segundos
    const temporizador = setTimeout(() => {
      setIsLoadImgUser(false);
    }, 2000);

    // Limpia el temporizador si el componente se desmonta antes de que se cumplan los 2 segundos
    return () => clearTimeout(temporizador);
  }, [newUser.photo]);

  const formSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let { username, email, password, photo } = newUser;
    let userName = username.toLowerCase();

    if (photo == null) {
      let isAccept = confirm(
        "No añadiste una foto de perfil, se te agregara una imagen por defecto. Estas de acuerdo?"
      );

      if (isAccept) {
        photo = await loadImgDefect();
      } else {
        setLoading(false);
        return;
      }
    }
    try {
      //create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${userName + date}`);

      await uploadBytesResumable(storageRef, photo).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //update profile
            await updateProfile(res.user, {
              displayName: userName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(dbFirestore, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: userName,
              email,
              photoURL: downloadURL,
            });
            //create empty user chats on firestore
            await setDoc(doc(dbFirestore, "userChats", res.user.uid), {});
            //si no existe ningun problema, redirigimos a home
            navigate("/");
          } catch (err) {
            console.log(err);
            setErrorLogin(true);
          } finally {
            setLoading(false);
          }
        });
      });
    } catch (error) {
      console.log(error);
      setErrorLogin(true);
      setLoading(false);
    }
  };

  const inputChange = (e) => {
    let data = null;
    let prop = e.target.name;
    data = e.target.value;
    if (e.target.type == "file") {
      data = e.target.files[0];
      setIsLoadImgUser(true);
    }
    setNewUser({
      ...newUser,
      [prop]: data,
    });
  };

  const loadImgDefect = async () => {
    let imageUrl = "/images/robotito.jpg";
    let fileName = "image.jpg";
    let response = await fetch(imageUrl);
    let data = await response.blob();
    let fileImg = new File([data], fileName, { type: "image/jpeg" });
    return fileImg;
  };

  return {
    newUser,
    formSubmit,
    inputChange,
    loading,
    errorLogin,
    isLoadImgUser,
  };
};
