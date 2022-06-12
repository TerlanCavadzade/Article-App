import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import Table from "../UI/Table";

const ArticleList = () => {
  const authCtx = useContext(AuthContext);
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    fetch(`https://mymernapp855.herokuapp.com/articles/${authCtx.token}`)
      .then((res) => res.json())
      .then((data) => {
        setArticleData(data);
      });
  }, [authCtx.token]);
  return (
    <>
      {articleData[0] && (
        <Table>
          <thead>
            <tr>
              <th>Sender</th>
              <th>File Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {articleData.map((data) => (
              <tr key={data._id}>
                <td>{data.name}</td>
                <td>{data.fileName}</td>
                <td>{data.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ArticleList;
