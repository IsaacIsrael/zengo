export interface Crypto {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  evaluation: 'up' | 'down';
  isPin?: boolean;
}
