import { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card";

const PostArticleForm = () => {
    const authCtx = useContext(AuthContext)
    const nameInput = useRef();
    const keywordInput = useRef();
    const fileInput = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const enteredNames = nameInput.current.value;
        const enteredKeywords = keywordInput.current.value;
        const enteredFile = fileInput.current.files[0];
    
        var data = new FormData();
        data.append("file", enteredFile);
        data.append("name", enteredNames);
        data.append("keywords", enteredKeywords);
        data.append("id", authCtx.token);
    
        setIsLoading(true);
    
        fetch("https://mymernapp855.herokuapp.com/users", {
          method: "POST",
          body: data,
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
          .then((data) => alert(data))
          .catch((err) => alert(err));
      };
  return (
    <Card>
      <h1>Send Your Articles</h1>
      <form className="form" onSubmit={formSubmitHandler}>
        <div className="control">
          <label htmlFor="names">Author Names</label>
          <input
            ref={nameInput}
            type="text"
            id="names"
            placeholder="Enter Author Names"
            required
          />
        </div>
        <div className="control">
          <label htmlFor="keyword">Keywords</label>
          <input
            ref={keywordInput}
            type="text"
            id="keyword"
            placeholder="Enter Keywords"
            required
          />
        </div>
        <div className="control">
          <label htmlFor="article">Your Article</label>
          <input ref={fileInput} type="file" id="article" required />
        </div>
        <div className="actions">{!isLoading && <button>Submit</button>}</div>
      </form>
    </Card>
  );
};

export default PostArticleForm