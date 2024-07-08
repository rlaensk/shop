import "./App.css";
import { useEffect, useState } from "react";
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
import Shose from "./Shose.js";
import axios from "axios";
import Cart from "./pages/Cart.js";
import { useDispatch, useSelector } from "react-redux";
import { nameSort, lowPriceSort, highPriceSort } from "./store/sortSlice.js";
function App() {
  const [shose, setShose] = useState(data); //초기 전체 데이터
  const [clickCount, setClickCount] = useState(1);

  const [currentPage, setCurrentPage] = useState(2);
  const [allShoes, setAllShoes] = useState([]); //get으로 받아온 전체데이터

  const dispatch = useDispatch();
  const sortedItems = useSelector((state) => state.sortSlice);
  useEffect(() => {
    //초기 데이터 로드
    axios
      .get("/shose.json")
      .then((result) => {
        setAllShoes(result.data);
        // 처음 로드할 때 첫 페이지 데이터 설정
        const initialData = result.data.slice(0, 6);
        setShose(initialData);
      })
      .catch(() => {
        alert("데이터를 불러오지 못했습니다.");
      });
  }, []);

  const loadMoreData = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * 3;
    const endIndex = nextPage * 3;
    const nextData = allShoes.slice(startIndex, endIndex);
    setShose((prevShoes) => [...prevShoes, ...nextData]);
    setCurrentPage(nextPage);
  };
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
              <Button
                variant="outline-primary"
                onClick={() => {
                  dispatch(nameSort(shose));
                  console.log(nameSort.items);
                }}
              >
                이름순 정렬
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  dispatch(lowPriceSort(shose));
                }}
              >
                낮은가격순 정렬
              </Button>
              <Button
                variant="outline-success"
                onClick={() => {
                  dispatch(highPriceSort(shose));
                }}
              >
                높은가격순 정렬
              </Button>
              <Shose shose={sortedItems.length ? sortedItems : shose} />
              <button onClick={loadMoreData}>더보기</button>
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
