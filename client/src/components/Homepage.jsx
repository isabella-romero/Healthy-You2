import React, { useEffect, useState } from 'react';
import { fetchExercises } from '../api';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Homepage.css';
const Homepage = () => {
    const [exercises, setExercises] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getExercises = async () => {
            try {
                const data = await fetchExercises();
                console.log("Fetched data:", data);
                
                if (!Array.isArray(data)) throw new Error("Data is not an array");
                
                setExercises(data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch exercises');
            } finally {
                setLoading(false);
            }
        };

        getExercises();
    }, []);

    return (
        <div>
            <Helmet>
                <title>Exercise Finder - Healthy-You</title>
            </Helmet>
            <nav>
                <ul>
                    <li>
                        <Link to="/logIn">Logout</Link>
                    </li>
                </ul>
            </nav>
            <div>
                <h1>Exercises</h1>
                {loading && <p>Loading exercises...</p>}
                {error && <p>{error}</p>}
                {!loading && exercises.length === 0 && <p>No exercises found.</p>}
                <ul>
                    {exercises.map((exercise) => (
                        <li key={exercise.id}>
                            <h3>{exercise.name}</h3>
                            <p>Equipment: {exercise.equipment}</p>
                            <p>Target Muscle: {exercise.target}</p>
                            <p>Body Part: {exercise.bodyPart}</p>
                            {exercise.gifUrl && <img src={exercise.gifUrl} alt={exercise.name} />}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Homepage;
