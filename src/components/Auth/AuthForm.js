import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card";

import "./AuthForm.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const emailInput = useRef();
  const passwordInput = useRef();
  const reviewerCheckbox = useRef();
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInput.current.value.toLowerCase();
    const enteredPassword = passwordInput.current.value;

    setIsLoading(true);

    if (isLogin) {
      fetch("https://mymernapp855.herokuapp.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: enteredPassword,
          gmail: enteredEmail,
        }),
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              if (data && data.error) {
                var err = data.error;
              }
              throw new Error(err);
            });
          }
        })
        .then((data) => {
          authCtx.login(data._id, data.admin, data.reviewer);
          if (data.confirmNum !== "confirmed") {
            authCtx.logout()
            navigate(`/confirm/${data._id}`);
          } else if (
            !data.name &&
            !data.googleScholarId &&
            !data.orcidId &&
            !data.researchGate
          ) {
            navigate("/profile");
          } else {
            navigate("/post");
          }
        })
        .catch((err) => alert(err));
    } else {
      const ifReviewer = reviewerCheckbox.current.checked;

      fetch("https://mymernapp855.herokuapp.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: enteredPassword,
          gmail: enteredEmail,
          reviewer: ifReviewer,
        }),
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              if (data && data.error) {
                var err = data.error;
              }
              throw new Error(err);
            });
          }
        })
        .then((data) => {
          navigate(`/confirm/${data._id}`);
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <Card>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className="control">
          <label htmlFor="email">Your Email</label>
          <input ref={emailInput} type="email" id="email" required />
        </div>
        <div className="control">
          <label htmlFor="password">Your Password</label>
          <input ref={passwordInput} type="password" id="password" required />
        </div>
        {!isLogin && (
          <div className="control checkbox">
            <input
              ref={reviewerCheckbox}
              type="checkbox"
              id="reviewer"
              name="reviewer"
              value={true}
            />
            <label htmlFor="reviewer">Sign Up As Reviewer</label>
          </div>
        )}
        <div className="actions">
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          <button
            type="button"
            className="toggle"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default AuthForm;
