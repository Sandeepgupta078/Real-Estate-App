import bcrypt from "bcrypt";
import prisma from "../lib/Prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // if (!username || !email || !password) {
        //     res.status(400).send("Please enter all fields");
        // }

        // Check for existing user
        // User.findOne({ email }).then(user => {
        //     if (user) return res.status(400).send("User already exists");
        // });

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user and save to db
        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        });
        // console.log(newUser);
        res.status(201).json(
            {
                message: "User created successfully!"
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                message: "failed to register!"
            }
        );
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // CHECK IF USER EXISTS
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });
        if (!user) {
            return res.status(400).json(
                {
                    message: "User not found!"
                }
            );
        }
        // VALIDATE PASSWORD
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json(
                {
                    message: "Invalid password!"
                }
            );
        }
        // CREATE COOKIE TOKEN AND SEND IT TO USER
        const token = jwt.sign(
            {
                username: user.username,
                id: user.id,
                isAdmin: false,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "3d"
            }
        );

        const {password:userPassword, ...userInfo}  = user

        res.cookie("token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        })
            .status(200) 
            .json(userInfo);
        // console.log(token);

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                message: "failed to login!"
            }
        );
    }
}

export const logout = (req, res) => {
    res.clearCookie("token").json(
        {
            message: "User logged out successfully!"
        }
    );
}