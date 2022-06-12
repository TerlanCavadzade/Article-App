import { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import "./ProfileForm.css";

const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const scholarId = useRef();
  const researchGateLink = useRef();
  const orcidId = useRef();
  const nameRef = useRef();

  const ctx = useContext(AuthContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredScholarId = scholarId.current.value;
    const enteredResearchGate = researchGateLink.current.value;
    const enteredOrcidId = orcidId.current.value;
    const enteredName = nameRef.current.value;
    setIsLoading(true);
    fetch("https://mymernapp855.herokuapp.com/userprofile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: ctx.token,
        googleScholarId: enteredScholarId,
        researchGate: enteredResearchGate,
        orcidId: enteredOrcidId,
        name: enteredName,
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
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <form className="form" onSubmit={formSubmitHandler}>
      <div className="control">
        <label htmlFor="name">Name Surname</label>
        <input ref={nameRef} type="text" id="name" />
      </div>
      <div className="control">
        <label htmlFor="scholarId">Google Scholar Id</label>
        <input ref={scholarId} type="text" id="scholarId" />
      </div>
      <div className="control">
        <label htmlFor="researchGate">Research Gate Link</label>
        <input ref={researchGateLink} type="text" id="researchGate" />
      </div>
      <div className="control">
        <label htmlFor="orcidId">Orcid Id</label>
        <input ref={orcidId} type="text" id="orcidId" />
      </div>
      <div className="actions">{!isLoading && <button>Submit</button>}</div>
    </form>
  );
};

export default ProfileForm;
