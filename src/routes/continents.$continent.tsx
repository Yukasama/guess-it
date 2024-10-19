import { ImageWithFallback } from '@/components/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCountriesByContinent } from '@/features/country/lib/get-countries-by-continent';
import { countryCodes } from '@/features/country/lib/get-country-code';
import { ContinentNotFound } from '@/features/country/not-found';
import { createFileRoute } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/continents/$continent')({
  loader: ({ params: { continent } }) => getCountriesByContinent(continent),
  notFoundComponent: ContinentNotFound,
  component: ContinentPage,
});
function ContinentPage() {
  const countries = Route.useLoaderData();

  const categories = [
    'Google Car',
    'License Plate',
    'Landscape',
    'Pole',
    'Mile Marker',
    'Sign Post',
  ];

  const imageTypes = {
    'Google Car': 'google-car',
    'License Plate': 'license-plate',
    Landscape: 'landscape',
    Pole: 'pole',
    'Mile Marker': 'mile-marker',
    'Sign Post': 'sign-post',
  };

  const [startIndex, setStartIndex] = useState(0);
  const visibleCategoriesCount = 5;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + 1, categories.length - visibleCategoriesCount),
    );
  };

  const currentVisibleCategories = categories.slice(
    startIndex,
    startIndex + visibleCategoriesCount,
  );

  return (
    <div className="m-10 h-full">
      <div className="overflow-auto h-[90vh]">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="sticky left-0 bg-background flex justify-center gap-1.5">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={handlePrev}
                  disabled={startIndex === 0}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  onClick={handleNext}
                  size="icon"
                  variant="secondary"
                  disabled={
                    startIndex >= categories.length - visibleCategoriesCount
                  }
                >
                  <ChevronRight />
                </Button>
              </th>
              {currentVisibleCategories.map((category) => (
                <th
                  key={category}
                  className="font-medium text-sm text-gray-400 dark:text-gray-500 text-start underline underline-offset-4"
                >
                  {category}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country}>
                <td className="sticky left-0 bg-background w-32">
                  <div className="flex flex-col items-center justify-center gap-1.5 px-2">
                    <img
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCodes[country]}.svg`}
                      alt={`${country} Flag`}
                      className="h-8 rounded-md"
                    />
                    <div className="flex gap-1">
                      <span className="font-bold">
                        {(country[0].toUpperCase() + country.slice(1)).replace(
                          '-',
                          ' ',
                        )}
                      </span>
                      <Badge variant="secondary">
                        .{countryCodes[country]?.toLocaleLowerCase()}
                      </Badge>
                    </div>
                  </div>
                </td>
                {currentVisibleCategories.map((category) => (
                  <td key={category} className="px-2 p-0.5">
                    <ImageWithFallback
                      src={`/countries/${country}/${imageTypes[category]}.png`}
                      alt={`${country}-${category}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
