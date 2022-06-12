import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import "./ReviewForm.css";
const ReviewForm = () => {
  const params = useParams();
  const { id } = params;
  const reviewRef = useRef();
  const navigate = useNavigate()

  const downloadButtonHandler = () => {
    window.open(`https://mymernapp855.herokuapp.com/pdf/${id}`);
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredReview = reviewRef.current.value;
    fetch("https://mymernapp855.herokuapp.com/postreview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reviewText: enteredReview,
        articleId: id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            if (data && data.err) {
              var err = data.err;
            }
            throw new Error(err);
          });
        }
      })
      .then((data) => {
        navigate("/articles")
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <Card>
      <div className="actions downloadButton">
        <button onClick={downloadButtonHandler}>Download File</button>
      </div>
      <form onSubmit={formSubmitHandler}>
        <div className="control">
          <label htmlFor="text">Your Review</label>
          <textarea ref={reviewRef} id="text"></textarea>
        </div>
        <div className="actions">
          <button>Submit</button>
        </div>
      </form>
    </Card>
  );
};

export default ReviewForm;
