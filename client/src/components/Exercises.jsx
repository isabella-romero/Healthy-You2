// src/components/Exercises.jsx

import React, { useEffect, useState } from "react";

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch('https://exercisedb.p.rapidapi.com/exercises', {
      headers: {
       'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
       'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST, 
      },
    })
      .then((res) => res.json())
      .then((data) => setExercises(data))
      .catch((err) => setError("Failed to fetch exercises"));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
    <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Exercise List</h2>
    {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {exercises.map((exercise) => (
            <div
                key={exercise.id}
                style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '15px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                backgroundColor: '#fff'
                }}
            >
                <img
                src={exercise.gifUrl}
                alt={exercise.name}
                style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
                />
                <h3 style={{ margin: '10px 0 5px' }}>{exercise.name}</h3>
                <div style={{ marginBottom: '8px', color: '#333' }}>
                <strong>Target:</strong> {exercise.target}
                </div>
                <div style={{ marginBottom: '8px', color: '#333' }}>
                <strong>Equipment:</strong> {exercise.equipment}
                </div>
                <div style={{ marginBottom: '8px', color: '#333' }}>
                <strong>Body Part:</strong> {exercise.bodyPart}
                </div>
                {exercise.instructions && exercise.instructions.length > 0 && (
                <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                    {exercise.instructions.map((step, i) => (
                    <li key={i}>{step}</li>
                    ))}
                </ul>
                )}
            </div>
            ))}
        </div>
    </div>

  );
}

export default Exercises;
