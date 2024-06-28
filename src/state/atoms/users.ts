import { atom, selector } from "recoil";

export type Users = {
    ecode: string
    name: string
    role: "admin" | "user"
}

// Remove this and fetch the data from backend
export const User: Users[] = [
    {
        ecode: "728ed52f",
        name: "user1",
        role: "admin",
    },
    {
        ecode: "728ed52g",
        name: "user2",
        role: "user",
    },
    {
        ecode: "728ed52h",
        name: "user3",
        role: "admin",
    },
    {
        ecode: "728ed52i",
        name: "user4",
        role: "admin",
    },
]