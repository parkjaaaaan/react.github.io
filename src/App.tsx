import { useState, useRef } from "react";
import My from "./components/My";
import "./App.css";

// User, CartItem, Session 타입 정의
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

const SampleSession: Session = {
  loginUser: null,
  cart: [
    { id: 100, name: "라면", price: 3000 },
    { id: 101, name: "컵라면", price: 2000 },
    { id: 200, name: "파", price: 5000 },
  ],
};

function App() {
  const [session, setSession] = useState(SampleSession);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const logout = () => {
    setSession({
      ...session,
      loginUser: null,
    });
  };

  const login = (id: number, name: string) => {
    if (!name) {
      alert("이름을 입력해주세요");
      nameInputRef.current?.focus();
      return;
    }

    setSession({
      ...session,
      loginUser: { id, name },
    });
  };

  const removeCartItem = (itemId: number) => {
    setSession({
      ...session,
      cart: session.cart.filter((item) => item.id !== itemId),
    });
  };

  const addCartItem = (name: string, price: number) => {
    const newItem: CartItem = {
      id: session.cart.length + 1,
      name,
      price,
    };
    setSession({
      ...session,
      cart: [...session.cart, newItem],
    });
  };

  return (
    <div className="app-container">
      <My
        session={session}
        logout={logout}
        login={login}
        addCartItem={addCartItem}
        removeCartItem={removeCartItem}
        nameInputRef={nameInputRef}
      ></My>
    </div>
  );
}

export default App;
