import { typeAcc, typeError } from "./TypeProvider";
import bg1 from '../assets/images/bg1.jpg'
import bg2 from '../assets/images/bg2.jpg'
import bg3 from '../assets/images/bg3.jpg'
import bg4 from '../assets/images/bg4.jpg'
import bg5 from '../assets/images/bg5.jpg'
import bg6 from '../assets/images/bg6.jpg'
import bg7 from '../assets/images/bg7.jpg'
import bg8 from '../assets/images/bg8.jpg'
import bg9 from '../assets/images/bg9.jpg'
import bg10 from '../assets/images/bg10.jpg'
import bg11 from '../assets/images/bg11.jpg'
import bg12 from '../assets/images/bg12.jpg'

export const origins:string[] = [
    `http://localhost:3000`,
    `http://localhost:3001`,
    `http://localhost:3002`,
    `http://localhost:5173`,
]

export const errors: typeError[] = [
    { status: 400, message: "Bad Request: The server could not understand the request due to invalid syntax." },
    { status: 401, message: "Unauthorized: The client must authenticate itself to get the requested response." },
    { status: 403, message: "Forbidden: The client does not have access rights to the content." },
    { status: 404, message: "Not Found: The server can not find the requested resource." },
    { status: 405, message: "Method Not Allowed: The request method is known by the server but has been disabled and cannot be used." },
    { status: 409, message: "Conflict: The request could not be completed due to a conflict with the current state of the target resource." },
    { status: 413, message: "Payload Too Large: The request entity is larger than limits defined by server." },
    { status: 415, message: "Unsupported Media Type: The media format of the requested data is not supported by the server." },
    { status: 429, message: "Too Many Requests: The user has sent too many requests in a given amount of time." },
    { status: 500, message: "Internal Server Error: The server has encountered a situation it does not know how to handle." },
    { status: 502, message: "Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream server." },
    { status: 503, message: "Service Unavailable: The server is not ready to handle the request." },
    { status: 504, message: "Gateway Timeout: The server is acting as a gateway or proxy and did not receive a timely response from the upstream server." }
];


export const acc:typeAcc ={
    username:"Family",
    password:"Pass123"
}

export const bgs:string[] =[
    bg1,
    bg2,
    bg3,
    bg4,
    bg5,
    bg6,
]
export const bgs2:string[] =[bg7,bg8,bg9,bg10,bg11,bg12]