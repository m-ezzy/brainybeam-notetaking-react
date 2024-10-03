import React, { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      let data = await response.json()
      setNotes(data)
    } catch (error) {
      console.error('Failed to fetch notes', error)
    }
  }
  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        'http://localhost:8000/api/notes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content }),
        }
      )
      let data = await response.json()

      setNotes([...notes, data])
      setTitle('')
      setContent('')
    } catch (error) {
      console.error('Failed to create note', error);
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <form onSubmit={handleCreateNote}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note) => (
          <div key={note._id} className="note">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
