'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <main>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id} style={{ marginBottom: '1rem' }}>
                        <Link href={`posts/${post.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                            <h2 style={{ margin: 0 }}>{post.title}</h2>
                        </Link>
                        {/* <h2>{post.id}: {post.title}</h2> */}
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}