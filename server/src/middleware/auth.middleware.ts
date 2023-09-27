// import { Request, Response, NextFunction } from 'express';

// export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//     // Проверка наличия JWT-токена
//     const token = req.header('x-auth-token');

//     if (!token) {
//         // Если у пользователя нет действительного токена, перенаправить на страницу входа
//         return res.redirect('/login'); // Здесь '/login' - это URL страницы входа
//     }

//     // Если у пользователя есть действительный токен, продолжить выполнение запроса
//     next();
// };

// // WIP
