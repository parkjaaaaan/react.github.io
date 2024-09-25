import React, { useRef } from "react";
import Login from "./Login";
import Profile from "./Profile";
interface User {
  id: number;
  name: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
}

interface Session {
  loginUser: User | null;
  cart: CartItem[];
}

interface MyProps {
  session: Session;
  login: (id: number, name: string) => void;
  logout: () => void;
  addCartItem: (name: string, price: number) => void;
  nameInputRef: React.RefObject<HTMLInputElement>;
  removeCartItem: (itemId: number) => void;
}

const My: React.FC<MyProps> = ({
  session,
  logout,
  login,
  removeCartItem,
  addCartItem,
  nameInputRef,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const handleAddItem = () => {
    const name = nameRef.current?.value;
    const price = priceRef.current?.value;

    if (name && price) {
      addCartItem(name, parseFloat(price));
      nameRef.current.value = "";
      priceRef.current.value = "";
    }
  };

  return (
    <div className="my-container">
      {session.loginUser ? (
        <Profile user={session.loginUser} logout={logout}></Profile>
      ) : (
        <Login login={login} nameInputRef={nameInputRef} />
      )}
      <ul className="cart-list">
        {session.cart.map((item) => (
          <li key={item.id} className="cart-item">
            {item.name} ({item.price.toLocaleString()}원)
            <button onClick={() => removeCartItem(item.id)}>DEL</button>
          </li>
        ))}
      </ul>
      <input type="text" placeholder="Item Name" ref={nameRef} />
      <input type="number" placeholder="Item Price" ref={priceRef} />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default My;
