'use client'

import Link from 'next/link';

export default function JSONPlaceHolderAPILayout({ children }) {
  return (
    <div>
      <header style={{ background: '#eee', padding: '1rem' }}>
        <h2>JSONPlaceHolderAPI Navigation</h2>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/jsonapis">Home</Link>
          <Link href="/jsonapis/users">Users</Link>
          <Link href="/jsonapis/posts">Posts</Link>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>{children}</main>
    </div>
  );
}
