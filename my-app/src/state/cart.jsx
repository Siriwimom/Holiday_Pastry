// src/state/cart.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartCtx = createContext(null);
export const useCart = () => useContext(CartCtx);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart_items_v1") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("cart_items_v1", JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems(prev => {
      const i = prev.findIndex(p => p.key === item.key);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: (next[i].qty || 1) + (item.qty || 1), selected: true };
        return next;
      }
      return [...prev, { ...item, qty: item.qty || 1, selected: true }];
    });
  };

  const setQty = (key, qty) => setItems(prev => prev.map(p => p.key === key ? { ...p, qty: Math.max(1, qty) } : p));
  const inc = (key) => setQty(key, (items.find(p => p.key === key)?.qty || 1) + 1);
  const dec = (key) => setQty(key, (items.find(p => p.key === key)?.qty || 1) - 1);
  const toggle = (key) => setItems(prev => prev.map(p => p.key === key ? { ...p, selected: !p.selected } : p));
  const selectAll = (val) => setItems(prev => prev.map(p => ({ ...p, selected: val })));
  const remove = (key) => setItems(prev => prev.filter(p => p.key !== key));
  const clear = () => setItems([]);

  const total = useMemo(() => items.filter(p => p.selected).reduce((s, p) => s + p.price * p.qty, 0), [items]);
  const selectedCount = useMemo(() => items.filter(p => p.selected).length, [items]);
  const count = useMemo(() => items.reduce((s, p) => s + p.qty, 0), [items]);

  const value = { items, addItem, setQty, inc, dec, toggle, selectAll, remove, clear, total, selectedCount, count };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
