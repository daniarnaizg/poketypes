"use client";
import React, { useState, useEffect } from 'react';
import TypesArea from './typesArea.jsx'
import ResultsArea from './resultsArea.jsx'
import { getEffectivenessAgainstSelectedTypes } from './utils/data.jsx';

export default function Home() {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [effectiveness, setEffectiveness] = useState({});

    useEffect(() => {
        if (selectedTypes.length > 0) {
            setEffectiveness(getEffectivenessAgainstSelectedTypes(selectedTypes));
        } else {
            setEffectiveness({}); // Reset effectiveness when no types are selected
        }
    }, [selectedTypes]);

    return (
        <main className="bg-poke bg-cover bg-center bg-fixed bg-gray-400 bg-blend-color-burn flex min-h-screen w-auto flex-col items-center">
            <div className="flex flex-col w-[80%] mt-16 mb-16 items-center rounded-xl backdrop-blur-md bg-gray-500/40">
                <h1 className="text-xl font-bold text-center mt-8">Pokémon Type Calculator</h1>
                <div className="flex flex-col lg:flex-row m-8 gap-6">
                    <TypesArea selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
                    <ResultsArea selectedTypes={selectedTypes} effectiveness={effectiveness} />
                </div>
            </div>
        </main>
    );
}