import { TriangleAlert } from 'lucide-react';
import { useState } from 'react';

export const ImageWithFallback = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    setImgError(true);
  };

  return (
    <div className="flex flex-col items-center gap-1 min-h-32 w-full">
      {!imgError ? (
        <img src={src} alt={alt} onError={handleError} className="rounded-md" />
      ) : (
        <div className="w-full min-h-full bg-gray-200 dark:bg-gray-900 text-gray-400 flex items-center justify-center gap-1 flex-col rounded-md">
          <TriangleAlert className="size-4" />
          <p className="text-sm">No Image found.</p>
        </div>
      )}
    </div>
  );
};
