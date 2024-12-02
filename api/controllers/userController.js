import prisma from "../lib/Prisma.js";
import bcrypt from "bcrypt";

// get all users 
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get users' });
    }
}


// get user by id
export const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get user' });
    }
}


// update user
export const updateUser = async (req, res) => {

    const id = req.params.id;
    const tokenUserId = req.userId;
    const { password, avatar, ...inputs } = req.body;

    if (id !== tokenUserId) {
        return res.status(403).json({ message: 'You can update only your account' });
    }

    let updatedPassword = null;
    try {

        // if password is provided, hash it
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        const updateUser = await prisma.user.update({
            where: { id },
            data: {
                ...inputs, 
                ...(updatedPassword && { password: updatedPassword }), // if updatedPassword is not null, add password to data
                ...(avatar && { avatar })
            }
        });

        const { password:userPassword , ...rest } = updateUser;

        res.status(200).json(rest);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to update user' });

    }
}


// delete user

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    if (id !== tokenUserId) {
        return res.status(403).json({ message: 'You can delete only your account' });
    }

    try {
        await prisma.user.delete({
            where: { id }
        });
        res.status(200).json({ message: 'User has been deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
}