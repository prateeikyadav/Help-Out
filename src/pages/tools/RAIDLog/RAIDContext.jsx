import React, { createContext, useContext, useState, useEffect } from 'react';

const RAIDContext = createContext();

const initialData = {
  risks: [],
  actions: [],
  issues: [],
  decisions: [],
};

export function RAIDProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem('helpout_raid_data');
      return stored ? JSON.parse(stored) : initialData;
    } catch (e) {
      return initialData;
    }
  });

  useEffect(() => {
    localStorage.setItem('helpout_raid_data', JSON.stringify(data));
  }, [data]);

  const generateId = () => crypto.randomUUID();

  const addItem = (type, item) => {
    setData((prev) => ({
      ...prev,
      [type]: [...prev[type], { ...item, id: generateId(), createdAt: new Date().toISOString() }],
    }));
  };

  const updateItem = (type, id, updates) => {
    setData((prev) => ({
      ...prev,
      [type]: prev[type].map((item) => (item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item)),
    }));
  };

  const deleteItem = (type, id) => {
    setData((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item.id !== id),
    }));
  };

  return (
    <RAIDContext.Provider value={{ data, addItem, updateItem, deleteItem }}>
      {children}
    </RAIDContext.Provider>
  );
}

export function useRAID() {
  return useContext(RAIDContext);
}
