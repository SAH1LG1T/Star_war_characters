import type { Person } from "../api/swapi";

interface Props {
    character: Person;
    onClick?: () => void;
}

export default function CharacterCard({ character, onClick }: Props) {

    const eyeColorToBg = (eyeColor: string): string => {
        const map: Record<string, string> = {
            blue: "bg-blue-200/20",
            brown: "bg-amber-200/20",
            yellow: "bg-yellow-200/20",
            red: "bg-red-200/20",
            black: "bg-gray-200/20",
            green: "bg-green-200/20",
            hazel: "bg-lime-200/20",
        };
        return map[eyeColor.toLowerCase()] || "bg-green-200/20";
    };

    return (
        <div
            onClick={onClick}
            className={`
        cursor-pointer
        ${eyeColorToBg(character.eye_color)}
        rounded-xl
        border border-gray-200
        p-4
        flex flex-col items-center text-center
        shadow-sm
        hover:shadow-lg hover:-translate-y-1 hover:scale-[1.03]
        transition-all duration-300 ease-out
        w-full
        sm:w-full
      `}
        >
            <img
                src={`https://picsum.photos/seed/${character.name}/300/300`}
                alt={character.name}
                className="w-50 h-40 object-cover rounded-md mb-3"
            />
            <h2 className="font-semibold text-lg text-gray-800">{character.name}</h2>
            <p className="text-sm text-gray-500 mt-1">click for more details..</p>
        </div>
    );
}
