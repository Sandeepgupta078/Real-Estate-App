import prisma from "../lib/Prisma.js";
import bcrypt from "bcrypt";

// get all users 
export const getUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get users!" });
    }
  };


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

        const { password: userPassword, ...rest } = updateUser;

        res.status(200).json(rest);
    } catch (error) {

        if (error.code === 'P2002') {
            // console.error("Email already exists!");
            res.status(400).json({ message: 'Email already exists!' });
            // Handle the duplicate email case, e.g., return a user-friendly error message
        } else {
            // console.error(error);
            res.status(500).json({ message: 'Failed to update user' });
        }

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

// save post
export const savePost = async (req, res) => {
    const postId = req.body.postId;
    const tokenUserId = req.userId;

    try {
        const savedPost = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId: tokenUserId,
                    postId,
                }
            }
        });

        if (savedPost) {
            await prisma.savedPost.delete({
                where: {
                    id: savedPost.id,
                }
            });
            res.status(200).json({ message: "Post removed from the saved list" });
        } else {
            await prisma.savedPost.create({
                data: {
                    postId,
                    userId: tokenUserId
                }
            });
            res.status(200).json({ message: "Post saved successfully" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to save post",
            error: error.message
        });
    }
}


export const profilePosts = async (req, res) => {
    const tokenUserId = req.userId;
    // console.log("User ID from token:", tokenUserId);

    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(tokenUserId);
    if (!isValidObjectId) {
        return res.status(400).json({ message: "Invalid User ID format" });
    }


    try {
        const userPosts = await prisma.post.findMany({
            where: { userId: tokenUserId }
        });

        const saved = await prisma.savedPost.findMany({
            where: { userId: tokenUserId },
            include: {
                post: true
            }
        });
        const savedPosts = saved.map(item => item.post);
        res.status(200).json({ userPosts, savedPosts });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get profile posts' });
    }
}


export const getNotificationNumber = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const number = await prisma.chat.count({
            where:{
                userIDs:{
                    hasSome:[tokenUserId],
                },
                NOT:{
                    seenBy:{
                        hasSome:[tokenUserId]
                    }
                }
            }
        })
        res.status(200).json(number);
    } catch (error) {
        res.status(500).json({
            message:"failed to get notification",
            error:error.message
        })
    }
}