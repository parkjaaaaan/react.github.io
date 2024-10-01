// src/ItemLayout.tsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

// OutletContext 타입 정의
export type OutletContext = {
  name: string;
  age: number;
};

// Outlet 컴포넌트에 context 데이터 전달
const ItemLayout: React.FC = () => {
  return (
    <div>
      <h2>ITEMS</h2>
      <nav>
        <Link to="/items/1">Item1</Link>
        <Link to="/items/2">Item2</Link>
        <Link to="/items/3?key=value">Item3</Link>
      </nav>
      {/* Outlet 컴포넌트에 context 전달 */}
      <Outlet context={{ name: "Hong", age: 25 }} />
    </div>
  );
};

export default ItemLayout;