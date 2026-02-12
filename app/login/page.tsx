'use client';

import { useState } from 'react';
import { loginAction } from '../actions';

export default function LoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await loginAction(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
        // Redirect is handled on the server
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
                <h1 style={{ marginBottom: '10px' }}>Admin Login</h1>
                <p style={{ marginBottom: '20px', color: '#666' }}>Use your Supabase account</p>

                <input
                    type="text"
                    name="username"
                    required
                    placeholder="Username"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #ddd'
                    }}
                />
                <input
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #ddd'
                    }}
                />
                {error && <p style={{ color: 'red', marginBottom: '15px', fontSize: '0.9rem' }}>{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{
                        width: '100%',
                        border: 'none',
                        opacity: loading ? 0.7 : 1,
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
