import Image from "next/image";
import {darkenColor} from './utils/data';

function TypeCard(props) {
    const { color, type, icon, onSelect, selected } = props;
    const darkerColor = darkenColor(color);

    return (
        <div
            className={`h-[45px] w-[100px] lg:h-20 lg:w-36 flex relative rounded-md select-none cursor-pointer ${selected ? 'outline outline-2 saturate-150 selected-class' : ''}`}
            style={{backgroundImage: `linear-gradient(to right, ${color}, ${darkerColor})`, position: 'relative', overflow: 'hidden'}}
            onClick={onSelect}
        >
            <div className="flex items-center justify-center ms-3">
                <p>{type}</p>
            </div>
            <div className="absolute opacity-50 right-[-40px] top-[-20px] lg:right-[-25px] lg:top-[0px]">
                <Image src={icon} alt={type} width={100} height={100}/>
            </div>
        </div>
    );
}

export default TypeCard;