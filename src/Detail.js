import { json, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Nav, Link } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increaseCount } from "./store/productSlice.js";
import "./App.css";
const Detail = (props) => {
  const { id } = useParams();

  const [inChange, setInChange] = useState(0);
  const [tap, setTap] = useState(0);
  const findShose = props.shose.find(function (x) {
    return x.id == id;
  });
  console.log("현재 클릭 데이터:" + JSON.stringify(findShose));
  //최근 본 상품 localStorage 저장

  useEffect(() => {
    if (findShose) {
      let recentItems = [];
      try {
        recentItems = JSON.parse(localStorage.getItem("recent"));
      } catch (e) {
        recentItems = [];
      }

      const isExist = recentItems.some((item) => item.id === findShose.id);
      if (!isExist) {
        const updatedRecentItems = [...recentItems, findShose];
        if (updatedRecentItems.length > 5) {
          updatedRecentItems.shift(); // 최대 5개까지만 저장
        }
        localStorage.setItem("recent", JSON.stringify(updatedRecentItems));
      }
    }
  }, [findShose]);

  let recentProduct = [];
  try {
    recentProduct = JSON.parse(localStorage.getItem("recent")) || [];
    if (!Array.isArray(recentProduct)) {
      recentProduct = [];
    }
  } catch (e) {
    console.error("Failed to parse recent products from localStorage", e);
    recentProduct = [];
  }

  let cart = useSelector((state) => state.product);
  let dispatch = useDispatch();

  const addToCart = () => {
    const productInCart = cart.find((item) => item.id === findShose.id);
    if (productInCart) {
      dispatch(increaseCount(findShose.id));
    } else {
      dispatch(
        addItem({
          id: findShose.id,
          name: findShose.title,
          count: findShose.count,
        })
      );
    }
  };
  useEffect(() => {
    if (isNaN(inChange) === true) {
      alert("정준우바보!!!");
      setInChange("");
    }
  }, [inChange]);

  const Clickbtn = (index) => {
    setTap(index);
  };
  if (!findShose) {
    return <div> 해당 상품을 찾을 수 없습니다</div>;
  }
  console.log(findShose);
  return (
    <>
      <div className="container">
        <div className="detailwrap">
          <div className="row rowBox">
            <div className="col-md-6">
              <img src={findShose.url} width="100%" alt="shose" />
            </div>
            <div className="col-md-6">
              <input
                type="txt"
                value={inChange}
                onChange={(e) => {
                  setInChange(e.target.value);
                }}
              />
            </div>

            <div className="col-md-6 itembox">
              <h4 className="pt-5">{findShose.title}</h4>
              <p>{findShose.content}</p>
              <p>{findShose.price}</p>
              <button className="btn btn-danger" onClick={addToCart}>
                장바구니
              </button>
            </div>
          </div>
          <aside className="recent">
            <p>최근 본 상품</p>
            {recentProduct.map((state, index) => (
              <img key={index} src={state.url} alt={state.title} />
            ))}
          </aside>
        </div>
        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={() => Clickbtn(0)}>
              버튼0
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick={() => Clickbtn(1)}>
              버튼1
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link2" onClick={() => Clickbtn(2)}>
              버튼2
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabComponent tap={tap} />
      </div>
    </>
  );
};
const TabComponent = ({ tap }) => {
  const [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      setFade("");
    };
  }, [tap]);
  const tapArray = [<div>내용1</div>, <div>내용2</div>, <div>내용3</div>];
  // if (tap == 0) {
  //   return tapArray[0];
  // }
  // if (tap == 1) {
  //   return tapArray[1];
  // }
  // if (tap == 2) {
  //   return tapArray[2];
  // }
  return <div className={`start ${fade}`}>{tapArray[tap]}</div>;
};

export default Detail;
