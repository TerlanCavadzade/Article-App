import { useEffect, useReducer, useState } from "react";
import Table from "../UI/Table";
import UserListModal from "../Modal/UserListModal";
import UserProfileModal from "../Modal/UserProfileModal";

const AllArticleList = () => {
  const [articleData, setArticleData] = useState([]);
  const [reviewerList, setReviewerList] = useState([]);

  const [articleId, setArticleId] = useState("");
  const [userId, setUserId] = useState("");

  const [view, setView] = useState(false);
  const [profileView, setProfileView] = useState(false);

  const [rerender, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    fetch("https://mymernapp855.herokuapp.com/articles")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArticleData(data);
      });
    fetch("https://mymernapp855.herokuapp.com/reviewers")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReviewerList(data);
      });
  }, [rerender]);

  const buttonClickHandler = async (id) => {
    setView(true);
    await setArticleId(id);
  };

  const nameClickHandler = (id) => {
    setProfileView(true);
    setUserId(id);
  };

  const closeProfileModal = () => {
    setProfileView(false);
  };

  const onConfirm = () => {
    setView(false);
    forceUpdate();
  };
  var recentReviews = articleData.filter((e) => e.status !== "Reviewed");
  var Reviewed = articleData.filter((e) => e.status === "Reviewed");
  return (
    <>
      {view && (
        <UserListModal
          articleId={articleId}
          reviewerList={reviewerList}
          onConfirm={onConfirm}
        />
      )}
      {profileView && <UserProfileModal userId={userId} onConfirm={closeProfileModal} />}
      {recentReviews[0] && (
        <>
          <h1 style={{ textAlign: "center" }}>Recent Articles</h1>
          <Table>
            <thead>
              <tr>
                <th>Sender</th>
                <th>File Name</th>
                <th>Status</th>
                <th>Send</th>
              </tr>
            </thead>
            <tbody>
              {recentReviews.map((data) => (
                <tr key={data._id}>
                  <td
                    onClick={() => {
                      nameClickHandler(data.senderId);
                    }}
                  >
                    {data.name}
                  </td>
                  <td>{data.fileName}</td>
                  <td>{data.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        buttonClickHandler(data._id);
                      }}
                    >
                      Send
                    </button>
                  </td>
                  <td>
                    <button>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {Reviewed[0] && (
        <>
          <h1 style={{ textAlign: "center" }}>Reviewed Articles</h1>
          <Table>
            <thead>
              <tr>
                <th>Sender Name</th>
                <th>File Name</th>
                <th>Read</th>
              </tr>
            </thead>
            <tbody>
              {Reviewed.map((data) => (
                <tr key={data._id}>
                  <td>{data.name}</td>
                  <td>{data.fileName}</td>
                  <td>
                    <button>Read</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default AllArticleList;
