export type CreateCarType = {
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    description: string;
    color: string;
    fuel_type: string;
    transmission: string;
    image: string;
};

export type Car = {
    id: string,
    make: string,
    model: string,
    year: 0,
    price: 0,
    mileage: 0,
    description: string,
    color: string,
    fuel_type: string,
    transmission: string,
    seller_id: string,
    image: string,
    is_sold: false
};

export type UpdateCarType = {
    id?: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    description: string;
    color: string;
    fuel_type: string;
    transmission: string;
    image: string;
};

export type LoginData = {
    email: string;
    password: string;
};

export type SignupData = {
    username: string;
    email: string;
    password: string;
    confirmed_password: string;
};

export type LoginResponse = {
    token?: string;
    access_token?: string;
    accessToken?: string;
    authToken?: string;
    refreshToken?: string;
    refresh_token?: string;
    user?: any;
    message?: string;
};



export type BlogType ={
    id:number,
    userId:number,
    title:string,
    body:string
}