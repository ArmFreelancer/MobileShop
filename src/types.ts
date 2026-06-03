export interface Phone {
  id: number;
  brand: string;
  name: string;
  price: number;
  img: string;
  storage: string;
  desc: string;
  specs: { label: string; value: string }[];
}

export interface CartItem extends Phone {
  cartId: string;
  qty: number;
  selectedColor: string;
  selectedStorage: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  orders: Order[];
  createdAt: string;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  date: string;
  status: string;
}

export interface Session {
  email: string;
  name: string;
}
