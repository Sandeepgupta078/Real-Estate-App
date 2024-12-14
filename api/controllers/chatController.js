import express from "express";
import prisma from "../lib/Prisma.js";

export const getChats = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [tokenUserId],
                },
            }
        });
        for (const chat of chats) {
            // let recieverId = chat.userIDs[0] === tokenUserId ? chat.userIDs[1] : chat.userIDs[0]; 
            let receiverId = chat.userIDs.find((id) => id !== tokenUserId);
            if(receiverId) {
                const receiver = await prisma.user.findUnique({
                    where: {
                        id: receiverId,
                    },
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                });
                chat.receiver = receiver;
            } else {
                chat.receiver = null;
            }
        }
        
        // console.log(chats);
        
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get chats",
            error: error.message,
        });
    }
};

export const getChat = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId],
                },
            },
            // Include messages in the chat
            include: { 
                messages: {
                    orderBy: { 
                        createdAt: "asc", // Sort messages by date
                    },
                },
            },
        });

        await prisma.chat.update({
            where: {
                id: req.params.id,
            },
            data: {
                seenBy: {
                    push: tokenUserId,
                },
            }
        })
        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to get chat",
        });

    }
}

export const addChat = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const newChat = await prisma.chat.create({
            data: {
                userIDs: [tokenUserId, req.body.recieverId],
            },
        });
        res.status(200).json(newChat);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create chat",
        });
    }
}

export const readChat = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const chat = await prisma.chat.update({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId],
                },
            },
            data: {
                seenBy: {
                    push: [tokenUserId],
                }

            },
        });
        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to read chat",
        });
    }
}

