import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Nav, Link } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./store";

const Detail = (props) => {
  const { id } = useParams();

  const [inChange, setInChange] = useState(0);
  const [tap, setTap] = useState(0);
  const findShose = props.shose.find(function (x) {
    return x.id == id;
  });

  let cart = useSelector((state) => state.product);
  let dispatch = useDispatch();

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
        <div className="row">
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

          <div className="col-md-6">
            <h4 className="pt-5">{findShose.title}</h4>
            <p>{findShose.content}</p>
            <p>{findShose.price}</p>
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(
                  addItem({
                    id: findShose.id,
                    name: findShose.title,
                    count: findShose.count,
                  })
                );
              }}
            >
              주문하기
            </button>
          </div>
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
