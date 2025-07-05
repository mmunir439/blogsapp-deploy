'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <strong style={{}}><Link href={`users/${user.id}`} className="nav-link">{user.name}</Link></strong> ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;