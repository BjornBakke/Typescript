import {Request, Response} from 'express';
import axios, {AxiosResponse} from 'axios';

interface Person {
    id: Number;
    fnr: Number;
    name: String;
    username: String;
    address: {
        "street": String,
    };
}

const getPersoner = async (req: Request, res: Response) => {
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    let personer: [Person] = result.data;
    return res.status(200).json({
        message: personer
    });
};

const getPost = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    let person: Person = result.data;
    return res.status(200).json({
        message: person
    });
};

const updatePerson = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let name: string = req.body.name ?? null;
    let username: string = req.body.username ?? null;
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
        ...(name && {name: name}),
        ...(username && {username: username})
    });
    return res.status(200).json({
        message: response.data
    });
};

const deletePerson = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    console.log(response);
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

const addPerson = async (req: Request, res: Response) => {
    let name: string = req.body.name;
    let username: string = req.body.username;
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/users`, {
        name: name,
        username: username
    });
    return res.status(200).json({
        message: response.data
    });
};

export default {
    getPersoner: getPersoner,
    getPerson: getPost,
    updatePerson: updatePerson,
    deletePerson: deletePerson,
    addPerson: addPerson
};