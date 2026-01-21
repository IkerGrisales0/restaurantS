export interface RegisterRequest {
  email: string;
  password: string;
  role: 'restaurant' | 'customer';
}

export interface LoginRequest {
  email: string;
  password: string;
}
