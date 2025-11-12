interface FallbackProps {
  title?: string;
  message?: string;
}

export default function Fallback({
  title = "No Data Found",
  message = "Try adjusting your search or refreshing the page.",
}: FallbackProps) {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="text-6xl mb-4">🌌</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {title}
        </h2>
        <p className="text-gray-500 mb-6 max-w-sm">
          {message}
        </p>
      </div>
    </div>
  );
}
