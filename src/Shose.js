import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Shose = (props) => {
  return (
    <div>
      <Row>
        {props.shose.map((_, i) => {
          return (
            <Col lg={4} className="mainItem">
              <Link to={`/detail/${i}`}>
                <img src={props.shose[i].url} alt="shose" />
                <h4>{props.shose[i].title}</h4>
                <p>{props.shose[i].content}</p>
                <p>{props.shose[i].price}</p>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Shose;
