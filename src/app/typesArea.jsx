"use client";
import React from 'react';
import {type as types, getTypeColor, getTypeIcon} from './utils/data.jsx';
import TypeCard from './typeCard.jsx';
import {TypeLabel} from "@/app/typeLabel";

function TypesArea({selectedTypes, setSelectedTypes}) {

    const handleSelect = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter(t => t !== type));
        } else if (selectedTypes.length < 2) {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    return (
        <div className="w-full lg:w-2/3 xl:w-1/2">
            <div className="flex gap-4 justify-center h-8">
                {selectedTypes.length > 0 ? (
                    selectedTypes.map((type) => (
                        <TypeLabel
                            key={type}
                            type={type}
                            color={getTypeColor(type)}
                            icon={getTypeIcon(type)}
                        />
                    ))
                ) : (
                    <TypeLabel
                        type="NONE"
                        color="SlateGrey"
                        darken_pct={-30}
                    />
                )}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
                {Object.values(types).filter(type => type !== 'NONE').map((type) => {
                    return (<TypeCard
                        key={type}
                        type={type}
                        color={getTypeColor(type)}
                        icon={getTypeIcon(type)}
                        onSelect={() => handleSelect(type)}
                        selected={selectedTypes.includes(type)}
                    />);
                })}
            </div>
        </div>

    );
}

export default TypesArea;