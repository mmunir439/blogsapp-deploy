import React from "react";

async function getUser(userid) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userid}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
}

export default async function UserPage({ params }) {
    const { userid } = params;
    const user = await getUser(userid);

    return (
        <main>
            <h1>User Details</h1>
            <ul>
                <li><strong>ID:</strong> {user.id}</li>
                <li><strong>Name:</strong> {user.name}</li>
                <li><strong>Username:</strong> {user.username}</li>
                <li><strong>Email:</strong> {user.email}</li>
                <li><strong>Phone:</strong> {user.phone}</li>
                <li><strong>Website:</strong> {user.website}</li>
                <li><strong>Company:</strong> {user.company?.name}</li>
                <li><strong>Address:</strong> {user.address?.street}, {user.address?.city}</li>
            </ul>
        </main>
    );
}