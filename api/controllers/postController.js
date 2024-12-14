import prisma from "../lib/Prisma.js";
import jwt from "jsonwebtoken";

// GET /api/posts

export const getPosts = async (req, res) => {
    const query = req.query;
    // console.log(query);
    try {
        const filters = {
            where: {
              city: query.city || undefined,
              type: query.type || undefined,
              property: query.property || undefined,
              bedroom: query.bedroom ? parseInt(query.bedroom) : undefined,
              price: {
                gte: query.minPrice ? parseInt(query.minPrice) : 0,
                lte: query.maxPrice ? parseInt(query.maxPrice) : 1000000000,
              },
              latitude: query.latitude ? query.latitude.toString() : undefined,
              longitude: query.longitude ? query.longitude.toString() : undefined,
            },
          };
          
        // Remove undefined fields 
        Object.keys(filters.where).forEach((key) => {
            if (filters.where[key] === undefined) {
                delete filters.where[key];
            }
        });
          
          const posts = await prisma.post.findMany(filters);
          res.status(200).json(posts);
          
    } catch (error) {
        console.error('Prisma Query Error:', error);
        res.status(500).json({
            message: "Failed to get Posts",
            error: error.message
        });

    }
}


// GET /api/posts/:id
export const getPost = async (req, res) => {
    const id = req.params.id;

    // Validate if `id` is a valid ObjectId
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        return res.status(400).json({ error: "Invalid Post ID format" });
    }

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

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const token = req.cookies?.token;
        if(token) {
            return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
                if (!err) {
                    const saved = await prisma.savedPost.findUnique({
                        where: {
                            userId_postId: {
                                userId: payload.id,
                                postId: id
                            }
                        }
                    });
                    return res.status(200).json({ ...post, isSaved:saved ? true : false });
                }
            })
        }

        return res.status(200).json({ ...post, isSaved: false });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get Post" });
    }
}

// POST /api/posts
export const createPost = async (req, res) => {
    const body = req.body;
    console.log(body);
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
        res.status(500).json({
            message: "Failed to create post",
            error: error.message
        });
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


