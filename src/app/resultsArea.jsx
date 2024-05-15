import {getTypeColor, getTypeIcon} from './utils/data.jsx';
import {TypeLabel} from './typeLabel.jsx';

function ResultsArea({selectedTypes, effectiveness}) {

    // Convert the effectiveness object to an array of [key, value] pairs
    const effectivenessEntries = Object.entries(effectiveness);
    const sortedEffectiveness = effectivenessEntries.sort(([keyA], [keyB]) => keyB - keyA);

    // If no types are selected, display a placeholder text
    if (selectedTypes.length === 0) {
        return (
            <div className="w-full lg:w-[50%] flex justify-center items-center">
                <div className="text-mg font-semibold lg:text-lg lg:font-bold mb-12">
                    Please select a type to see the results.
                </div>
            </div>
        );
    }

    return (
        <div className="w-full lg:w-[50%] space-y-8 lg:space-y-12">
            {sortedEffectiveness.map(([key, value]) => (
                <div key={key}>
                    <div className="text-lg font-bold mb-2">Suffers x{key}:</div>
                    <div className="flex flex-wrap gap-4">
                        {value.map((type) => (<TypeLabel
                            key={type}
                            type={type}
                            color={getTypeColor(type)}
                            icon={getTypeIcon(type)}
                        />))}
                    </div>
                </div>))}
        </div>);
}

export default ResultsArea;