import Image from "next/image";
import {darkenColor} from './utils/data';

export function TypeLabel({type, color, icon}) {
    const darkerColor = darkenColor(color);
    return (
        <div className="flex items-center select-none rounded-full px-3 py-1 text-sm font-bold"
             style={{backgroundImage: `linear-gradient(to right, ${color}, ${darkerColor})`}}>
            {icon ? (
                <Image src={icon} alt={type} width={16} height={16} className="mr-2"/>
            ) : null}
            <span>{type}</span>
        </div>
    );
}