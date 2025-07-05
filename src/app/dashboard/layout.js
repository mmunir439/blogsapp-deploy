'use client'

import Link from 'next/link';

export default function DashboardLayout({ children }) {
  return (
    <div>
      <header style={{ background: '#eee', padding: '1rem' }}>
        <h2>Dashboard Navigation</h2>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/dashboard">Home</Link>
          <Link href="/dashboard/home">Home2</Link>
          <Link href="/dashboard/todo-app">Todo App</Link>
          <Link href="/dashboard/todo-app-api">Todo API</Link>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>{children}</main>
    </div>
  );
}
