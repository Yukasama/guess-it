import { TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { Card } from './ui/card';

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
    <div className="min-h-[120px] min-w-[200px]">
      {!imgError ? (
        <img src={src} alt={alt} onError={handleError} className="rounded-md" />
      ) : (
        <Card className="bg-accent text-gray-400 flex items-center justify-center min-h-[120px] gap-1 flex-col rounded-md">
          <TriangleAlert className="size-4" />
          <p className="text-sm">No Image found.</p>
        </Card>
      )}
    </div>
  );
};
