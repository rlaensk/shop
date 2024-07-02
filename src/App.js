import "./App.css";
import { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { AboutMember, Aboutlocation } from "./About";
import Detail from "./Detail";
import data from "./data";
import Shose from "./Shose";
import axios from "axios";
import Cart from "./pages/Cart.js";

function App() {
  const [shose, setShose] = useState(data);
  const [clickCount, setClickCount] = useState(1);

  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="white" data-bs-theme="white">
        <Container>
          <Navbar.Brand
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            두나상회
          </Navbar.Brand>
          <Nav className="navlist">
            <Nav.Link>로그인</Nav.Link>
            <Nav.Link as={Link} to="/">
              카테고리
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              장바구니
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>

              <Shose shose={shose} />
              <button
                onClick={() => {
                  setClickCount(clickCount + 1);

                  axios
                    .get("/shose.json")
                    .then((result) => {
                      let copy = [...shose, ...result.data];
                      setShose(copy);
                      console.log(result);
                    })
                    .catch(() => {
                      alert("데이터 없음 ㅅㄱ");
                    });
                }}
              >
                더보기
              </button>
            </>
          }
        />

        <Route
          path="/detail/:id"
          element={<Detail shose={shose} id={shose.id} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutMember />}>
          <Route path="member" element={<AboutMember />} />
          <Route path="location" element={<Aboutlocation />} />
        </Route>

        <Route path="/about/member" element={<AboutMember />} />
        <Route path="/about/location" element={<Aboutlocation />} />
        <Route path="*" element={<div>없는 페이지임~</div>} />
      </Routes>
    </div>
  );
}

export default App;
