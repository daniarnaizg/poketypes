import Image from "next/image";
import {FormattedMessage} from "react-intl";
import {darkenColor} from './utils/data';

export function TypeLabel({type, color, icon, darken_pct = 20}) {
    const darkerColor = darkenColor(color, darken_pct);
    return (
        <div className="flex items-center select-none rounded-full px-3 py-1 text-sm font-normal lg:font-semibold"
             style={{backgroundImage: `linear-gradient(to right, ${color}, ${darkerColor})`}}>
            {icon ? (
                <Image src={icon} alt={type} width={16} height={16} className="mr-2"/>
            ) : null}
            <span>
                <FormattedMessage id={`type.${type.toLowerCase()}`}/>
            </span>
        </div>
    );
}