import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, changeAge } from "./../store/userSlice.js";
import { increaseCount, sort } from "./../store.js";
const Cart = () => {
  let state = useSelector((state) => state); // store에있는 내용을 전부 불러옴(그냥 외워!!!) 만약 필요한 state만 불러오고 싶다면, (state)=>state.stock 이렇게 사용가능
  let dispatch = useDispatch();
  let product = state.product;

  return (
    <>
      <h1>
        {state.user.name}
        {state.user.age}의 장바구니
      </h1>
      <button onClick={() => dispatch(changeAge(100))}>변경</button>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>

              <td>{item.name}</td>

              <td>{item.count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(increaseCount(item.id));
                    console.log(item.id);
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <button
        onClick={() => {
          dispatch(sort());
        }}
      >
        정렬하기
      </button>
    </>
  );
};
export default Cart;
