import { useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card";

const ConfirmAcc = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const codeRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredCode = codeRef.current.value;

    fetch("https://mymernapp855.herokuapp.com/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        num: enteredCode,
      }),
    })
      .then((res) => {
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
        ctx.login(data._id, false, data.reviewer);
        navigate("/profile")
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <Card>
      <form onSubmit={formSubmitHandler}>
        <div className="control">
          <label htmlFor="code">Code:</label>
          <input ref={codeRef} type="text" id="code" placeholder="Code..." />
          <p>The Code Sent Your Email Account</p>
        </div>
        <div className="actions">
          <button>Submit</button>
        </div>
      </form>
    </Card>
  );
};

export default ConfirmAcc;
