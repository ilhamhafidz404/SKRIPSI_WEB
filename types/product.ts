export interface Product {
  id: number;
  name: string;
  code: string;
  price: number;
  stock: number;
  image: string;
}

export interface ProductResponse {
  code: string;
  data: Product[];
  message: string;
}
