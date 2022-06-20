import { createContext } from "react";

export interface User {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    type: number,
    approved: boolean,
    address: string,
    birthday: Date,
    image: string
}

export interface USER_TYPE {
    [key: number]: string
}

export const USER_TYPES: USER_TYPE  = {
    0: 'Korisnik',
    2: 'Dostavljac',
    1: 'Administrator'
}



export interface UserContexData {
    user: User,
    setUser: (user: User) => void,
}

export const UserContexData = createContext<UserContexData>({} as UserContexData);