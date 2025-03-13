// filepath: /video-portal/video-portal/server/src/controllers/auth.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/auth';
import { User } from '../types';
import { validationResult } from 'express-validator';

export class AuthController {
    constructor(private authService: AuthService) {}

    public async register(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const user: User = req.body;
        try {
            const newUser = await this.authService.register(user);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const token = await this.authService.login(email, password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}