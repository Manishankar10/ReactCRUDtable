import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import Delete from "./Delete";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
function Table() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const loc = useLocation();
  function getValue() {
    return axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        setUsers(response.data);
      });
  }
  useEffect(() => {
    if (!loc.state) {
      getValue();
    } else {
      setUsers(loc.state.all);
    }
  }, [loc.state]);
  const details = users.filter((element) => {
    if (searchTerm === "") {
      return element;
    } else if (
      element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.body.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return element;
    }
  });

  const headers = [
    {
      label: "Name",
      key: "name",
    },
    { label: "E-mail", key: "email" },
    { label: "Description", key: "body" },
  ];
  const csvLink = {
    filename: "file.csv",
    headers: headers,
    data: details,
  };
  const sorting = (col) => {
    const sorted = [...users].sort((a, b) =>
      a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
    );
    setUsers(sorted);
  };
  const DeleteButton = (data) => {
    setUsers((d) => [...data]);
    console.log(data);
  };
  const handleEdit = (e, details) => {
    setModalInfo(details);
    toggleTF();
  };
  const toggleTF = () => {
    setShowModal(handleShow);
  };
  const change = (e) => {
    e.preventDefault();
    setModalInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitter = (e) => {
    e.preventDefault();
    var users1 = users;
    setShow(false);
    let index = users.findIndex((x) => x.id === modalInfo.id);
    users1[index].postId = modalInfo.postId;
    users1[index].name = modalInfo.name;
    users1[index].email = modalInfo.email;
    users1[index].body = modalInfo.body;
    setUsers(users1);
    console.log(users);
  };
  const ModalContent = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>UserInfo:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitter}>
            <div>
              <label> PostID: </label>
              <input
                defaultValue={modalInfo.postId}
                name="postId"
                onChange={(e) => change(e)}
              ></input>
            </div>
            <div>
              <label> Name: </label>
              <input
                defaultValue={modalInfo.name}
                name="name"
                onChange={(e) => change(e)}
              ></input>
            </div>
            <div>
              <label> E-mail: </label>
              <input
                defaultValue={modalInfo.email}
                name="email"
                onChange={(e) => change(e)}
              ></input>
            </div>
            <div>
              <label> Description: </label>
              <input
                defaultValue={modalInfo.body}
                name="body"
                onChange={(e) => change(e)}
              ></input>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="submit" onClick={handleClose}>
            CLOSE
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const handleNew = (e) => {
    navigate("/newuser", { state: users });
  };
  return (
    <div>
      <CSVLink className="L2" {...csvLink}>
        Download
      </CSVLink>
      <button className="bd" onClick={handleNew}>
        CreateUser
      </button>
      <input
        type="text"
        placeholder="Search.."
        className="search"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <table className="tout">
        <tbody>
          <tr className="t1">
            <th className="t1">
              Name{" "}
              <button className="bs" onClick={() => sorting("name")}>
                Sort
              </button>
            </th>
            <th className="t1">
              E-mail{" "}
              <button className="bs" onClick={() => sorting("email")}>
                Sort
              </button>
            </th>
            <th className="t1">
              Description{" "}
              <button className="bs" onClick={() => sorting("body")}>
                Sort
              </button>
            </th>
          </tr>
          {users
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.body.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((user, i) => (
              <tr
                className="t1"
                key={user.id}
                onClick={(e) => handleEdit(e, user)}
              >
                <td className="t1">{user.name}</td>
                <td className="t1">{user.email}</td>
                <td className="t1">{user.body}</td>
                <td>
                  <Delete
                    data={user}
                    pos={user.id}
                    allData={users}
                    handleButton={DeleteButton}
                  ></Delete>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {show ? <ModalContent /> : null}
    </div>
  );
}
export default Table;
