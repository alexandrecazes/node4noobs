import express, { Request, Response } from 'express';

interface User {
    id: number;
    name: string;
}

const app = express();
app.use(express.json());

// In-memory database
let users: User[] = [];

app.get('/', (req: Request, res: Response) => {
    res.json(users);
});

app.post('/users', (req: Request, res: Response) => {
    const user: User = req.body;
    users.push(user);
    res.status(201).json({
        message: 'POST /users',
        id: user.id,
        name: user.name
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running: ${port}`);
});

