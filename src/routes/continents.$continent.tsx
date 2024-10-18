import { ImageWithFallback } from '@/components/image';
import { createFileRoute } from '@tanstack/react-router';

// Route Setup
export const Route = createFileRoute('/continents/$continent')({
  loader: ({ params: { continent } }) => getCountriesByContinent(continent),
  notFoundComponent: NotFoundPage,
  component: ContinentPage,
});

// NotFound Page Component
function NotFoundPage() {
  return (
    <div>
      <h1>Continent not found</h1>
    </div>
  );
}

// Header Component to Display the Category Titles
function CategoryHeader() {
  const categories = [
    'Google Car',
    'License Plate',
    'Landscape',
    'Pole',
    'Mile Marker',
  ];
  return (
    <div className="grid grid-cols-5 gap-2 flex items-center">
      {categories.map((category) => (
        <p
          key={category}
          className="font-medium p-0.5 px-2.5 bg-gray-800 text-center mx-auto rounded-full"
        >
          {category}
        </p>
      ))}
    </div>
  );
}

// Country Images Component
function CountryImages({ country }: { country: string }) {
  const imageTypes = [
    'google-car',
    'license-plate',
    'landscape',
    'pole',
    'mile-marker',
  ];

  return (
    <div className="grid grid-cols-5 gap-2">
      {imageTypes.map((type) => (
        <div key={type} className="flex flex-col items-center gap-1.5">
          <ImageWithFallback
            src={`/countries/${country}/${type}.png`}
            alt={`${country}-${type}`}
          />
        </div>
      ))}
    </div>
  );
}

// Main Page Component
function ContinentPage() {
  const countries = Route.useLoaderData();

  return (
    <div className="m-10 space-y-3">
      <CategoryHeader />
      <div className="space-y-3">
        {countries.map((country) => (
          <div key={country} className="space-y-1.5">
            <h2 className="text-xl font-bold">
              {country[0].toUpperCase() + country.slice(1)}
            </h2>
            <CountryImages country={country} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Function to Get Countries by Continent
function getCountriesByContinent(continent: string) {
  const continentCountries: Record<string, string[]> = {
    europe: ['France', 'Germany', 'Spain', 'Italy', 'Netherlands'],
    asia: ['China', 'India', 'Japan', 'South Korea', 'Thailand'],
    africa: ['Nigeria', 'Egypt', 'South Africa', 'Kenya', 'Morocco'],
    'north-america': ['USA', 'Canada', 'Mexico', 'Cuba', 'Jamaica'],
    'south-america': [
      'argentina',
      'bolivia',
      'brazil',
      'chile',
      'colombia',
      'curacao',
      'ecuador',
      'peru',
      'uruguay',
    ],
    oceania: ['Australia', 'New Zealand', 'Fiji', 'Samoa', 'Papua New Guinea'],
  };

  return continentCountries[continent] || [];
}
