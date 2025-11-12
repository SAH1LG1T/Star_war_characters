import type { Person } from "../api/swapi";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  character : Person | null | undefined;
}

export default function Modal({ open, onClose, children ,character }: ModalProps) {
  if (!open) return null;

//   const eyeColorToBg = (eyeColor: string): string => {
//           const map: Record<string, string> = {
//               blue: "bg-blue-200",
//               brown: "bg-amber-200",
//               yellow: "bg-yellow-200",
//               red: "bg-red-200",
//               black: "bg-gray-200",
//               green: "bg-green-100/20",
//               hazel: "bg-lime-200",
//           };
//           return map[eyeColor.toLowerCase()] || "bg-green-200";
//       };
  

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className={`bg-white p-6 rounded-xl shadow-lg w-[90%] sm:w-[60%] md:w-[40%] lg:w-[25%] max-w-md max-w-md relative animate-fade-in`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
