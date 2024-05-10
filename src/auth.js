import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase.config";
import { actionType } from "./context/reducer";

const firebaseAuth = getAuth(app);
const provider = new GoogleAuthProvider();

export const login = async (dispatch, user) => {
  if (!user) {
    const {
      user: { refreshToken, providerData },
    } = await signInWithPopup(firebaseAuth, provider);
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });
    localStorage.setItem("user", JSON.stringify(providerData[0]));
    return Promise.resolve(); // Add this line
  }
};
