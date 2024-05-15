import Image from "next/image";

export function BgThumbnail({src, alt, selected, onClick}) {
    return (
        <div
            className={`relative rounded-md cursor-pointer ${selected ? 'outline outline-1 saturate-150' : ''}`}
            onClick={onClick}
            style={{position: 'relative', overflow: 'hidden', borderRadius: '15%'}}
        >
            <Image src={src} alt={alt} width={40} height={40}/>
        </div>
    );
}