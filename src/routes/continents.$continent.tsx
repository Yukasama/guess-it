import { ImageWithFallback } from '@/components/image';
import { getCountriesByContinent } from '@/features/country/lib/get-countries-by-continent';
import { countryCodes } from '@/features/country/lib/get-country-code';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/continents/$continent')({
  loader: ({ params: { continent } }) => getCountriesByContinent(continent),
  notFoundComponent: NotFoundPage,
  component: ContinentPage,
});

function NotFoundPage() {
  return (
    <div>
      <h1>Continent not found</h1>
    </div>
  );
}

function CountryImages({
  country,
  visibleCategories,
}: {
  country: string;
  visibleCategories: string[];
}) {
  const imageTypes = {
    'Google Car': 'google-car',
    'License Plate': 'license-plate',
    Landscape: 'landscape',
    Pole: 'pole',
    'Mile Marker': 'mile-marker',
    'Sign Post': 'sign-post',
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      {visibleCategories.map((category, index) => (
        <div key={index} className="flex flex-col items-center">
          <ImageWithFallback
            src={`/countries/${country}/${imageTypes[category]}.png`}
            alt={`${country}-${category}`}
          />
        </div>
      ))}
    </div>
  );
}
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
      <div className="overflow-y-auto h-[100vh]">
        <table className="min-w-full overflow-auto">
          <thead>
            <tr>
              <th>
                <button
                  onClick={handlePrev}
                  className="text-gray-500 hover:text-white bg-gray-700 p-2 rounded"
                  disabled={startIndex === 0}
                >
                  &larr;
                </button>
                <button
                  onClick={handleNext}
                  className="text-gray-500 hover:text-white bg-gray-700 p-2 rounded"
                  disabled={
                    startIndex >= categories.length - visibleCategoriesCount
                  }
                >
                  &rarr;
                </button>
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
                <td>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <img
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCodes[country]}.svg`}
                      alt={`${country} Flag`}
                      className="h-8 rounded-md"
                    />
                    <span className="font-bold">
                      {(country[0].toUpperCase() + country.slice(1)).replace(
                        '-',
                        ' ',
                      )}
                    </span>
                    <div className="bg-violet-500 border-violet-400 border rounded-full text-sm font-semibold text-white px-2">
                      .{countryCodes[country]?.toLocaleLowerCase()}
                    </div>
                  </div>
                </td>
                {currentVisibleCategories.map((category) => (
                  <td key={category} className="p-2">
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
