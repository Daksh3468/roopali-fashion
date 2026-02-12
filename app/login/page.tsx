'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from '../actions';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await loginAction(password);
        if (success) {
            router.push('/admin');
        } else {
            setError('Invalid password');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#f5f5f5'
        }}>
            <form onSubmit={handleSubmit} style={{
                background: 'white',
                padding: '40px',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                textAlign: 'center',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h1 style={{ marginBottom: '20px' }}>Admin Login</h1>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #ddd'
                    }}
                />
                {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
                <button type="submit" className="btn btn-primary" style={{ width: '100%', border: 'none' }}>Login</button>
            </form>
        </div>
    );
}
