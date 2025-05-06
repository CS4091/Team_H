interface Button {
    text: string;
    onClick: () => void;
    fillContainer: boolean;
    invert?: boolean
}

export default function Button({ text, onClick, fillContainer, invert=false }: Button) {
    return (
        <button 
            className={`flex items-center justify-center ${invert ? 'bg-white text-black' : 'bg-black text-white'} rounded-[8px] py-[4px] px-[8px] ${fillContainer ? 'w-full' : 'w-fill'}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}