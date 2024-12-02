import prisma from "../lib/Prisma.js";

// GET /api/posts
export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({ error: "Failed to get Posts" });
    }
}

// GET /api/posts/:id
export const getPost = async (req, res) => {
    const id  = req.params.id;
    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true
                    }
                }
            },
        });
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get Post" });
    }
}

// POST /api/posts
export const createPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;

    try {
        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                    create: body.postDetail
                },
            }
        });
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create post" });
    }
}

// PUT /api/posts/:id
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const post = await prisma.post.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title,
                content
            }
        });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: "Failed to update post" });
    }
}

// DELETE /api/posts/:id
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    try {
        const post = await prisma.post.findUnique({
            where: { id }
        });

        if (post.userId !== tokenUserId) {
            return res.status(403).json({ error: "You are not authorized to delete this post" });
        }

        await prisma.post.delete({
            where: { id }
        });
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete post" });
    }
}