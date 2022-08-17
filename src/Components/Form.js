import React, { useState} from "react";
import { Link,useLocation,useNavigate} from "react-router-dom";

export default function Form() {
  const location=useLocation();
  const navi=useNavigate();
  const [user,setUser]=useState(location.state)
  const [state, setState] = useState({
    id:'',
    postId: "",
    name: "",
    email: "",
    body: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    var temp=user;
    temp.push(state);
    setUser((temp)=>[...temp]);
    console.log(user);
    
    navi("/",{state:{all:user}})

  };
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <nav>
        <Link to="/" className="L1">
          Home
        </Link>
      </nav>
      <form className="f1" onSubmit={handleSubmit}>
      <div>
          <label>
            Id:
            <input
              type="number"
              name="id"
              value={state.id}
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div>
          <label>
            PostId:
            <input
              type="text"
              name="postId"
              value={state.postId}
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div>
          <label>
            E-mail:
            <input
              type="text"
              name="email"
              value={state.email}
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              type="text"
              name="body"
              value={state.body}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
