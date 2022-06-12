import reactDom from "react-dom";
import Card from "../UI/Card";
import Backdrop from "./Backdrop";
import "./UserListModal.css";

const UserList = (props) => {
  const { onConfirm, articleId, reviewerList } = props;
  const buttonClickHandler = (id) => {
    onConfirm();
    fetch("https://mymernapp855.herokuapp.com/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        articleId,
        reviewerId: id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <Card className="modal">
      <h1>Reviewer List</h1>
      <div className="container">
        <ul>
          {reviewerList.map((data) => (
            <li key={data._id}>
              {data.gmail}{" "}
              <button
                onClick={() => {
                  buttonClickHandler(data._id);
                }}
              >
                Send
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

const UserListModal = (props) => {
  const { onConfirm, reviewerList, articleId } = props;
  return (
    <>
      {reactDom.createPortal(
        <Backdrop onConfirm={onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {reactDom.createPortal(
        <UserList
          articleId={articleId}
          onConfirm={onConfirm}
          reviewerList={reviewerList}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default UserListModal;
