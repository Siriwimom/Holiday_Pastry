// state/cart.jsx (สรุปไอเดีย)
import React, { createContext, useContext, useMemo, useState } from "react";
const Ctx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const add = (line) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.key === line.key);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + (line.qty || 1) };
        return copy;
      }
      return [...prev, { ...line, qty: line.qty || 1 }];
    });
  };

  const inc = (key) => setItems(prev => prev.map(it => it.key===key? {...it, qty: it.qty+1}:it));
  const dec = (key) => setItems(prev => prev.map(it => it.key===key? {...it, qty: Math.max(1, it.qty-1)}:it));
  const remove = (key) => setItems(prev => prev.filter(it => it.key !== key));
  const total = useMemo(() => items.reduce((s,it)=> s + (it.price||0) * (it.qty||1), 0), [items]);

  const value = { items, add, inc, dec, remove, total };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => useContext(Ctx);
