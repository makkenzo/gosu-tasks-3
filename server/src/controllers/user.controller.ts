import { Request, Response } from 'express';
import UserModel from '../models/user.model';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this username already exists' });
        }

        const user = new UserModel({
            username,
            password,
            role: role || 'user',
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
