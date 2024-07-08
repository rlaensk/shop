import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAge } from "./../store/userSlice.js";
import { increaseCount, sort, deleteItem } from "../store/productSlice.js";

const Cart = () => {
  let product = useSelector((state) => state.product); // store에있는 내용을 전부 불러옴(그냥 외워!!!) 만약 필요한 state만 불러오고 싶다면, (state)=>state.stock 이렇게 사용가능

  let dispatch = useDispatch();

  let cartItem = JSON.parse(localStorage.getItem("product"));
  console.log(product);
  return (
    <>
      <h1>
        {product.user.name}
        {product.user.age}의 장바구니
      </h1>
      <button onClick={() => dispatch(changeAge(100))}>변경</button>
      {product.length == 0 ? (
        <h1>장바구니가 비어있습니다</h1>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경하기</th>
                <th>삭제하기</th>
              </tr>
            </thead>
            <tbody>
              {cartItem.map((item, index) => (
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
                  <td>
                    <button
                      onClick={() => {
                        dispatch(deleteItem(product));
                      }}
                    >
                      삭제
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
      )}
    </>
  );
};
export default Cart;
