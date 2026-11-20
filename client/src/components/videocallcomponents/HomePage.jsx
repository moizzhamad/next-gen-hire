import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const HomePage = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = () => {
        if (!input.trim()) {
            alert("Please enter a room name or ID");
            return;
        }
        navigate(`/room/${encodeURIComponent(input.trim())}`);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
            padding: '20px',
            fontFamily: 'sans-serif'
        }}>
            <h2 style={{ marginBottom: '10px' }}>Join or Host Interview Room</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Enter a room name or candidate name to start a live video interview</p>
            <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                type="text" 
                placeholder='Enter room name or candidate name...' 
                style={{
                    padding: '12px 16px',
                    width: '320px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    marginBottom: '15px'
                }}
                onKeyDown={(e) => { if (e.key === 'Enter') submitHandler(); }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                    onClick={submitHandler}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#0070f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '600'
                    }}
                >
                    Join / Host Meeting
                </button>
                <Link 
                    to="/"
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#6c757d',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontSize: '16px'
                    }}
                >
                    Home
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
