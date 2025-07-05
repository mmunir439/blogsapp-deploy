'use client';

import React, { useEffect, useState } from 'react';

export default function PostDetails({ params }) {
    const { postid } = params;
    console.log('Post ID:', postid);
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postid}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <main>
            <h1>Posts</h1>
            <article>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </article>
        </main>
    );
}