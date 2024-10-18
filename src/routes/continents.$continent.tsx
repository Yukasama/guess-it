import { ImageWithFallback } from '@/components/image';
import { getCountriesByContinent } from '@/features/country/lib/get-countries-by-continent';
import { createFileRoute } from '@tanstack/react-router';

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

function CategoryHeader() {
  const categories = [
    'Google Car',
    'License Plate',
    'Landscape',
    'Pole',
    'Mile Marker',
  ];
  return (
    <div className="grid grid-cols-5 gap-2 items-center">
      {categories.map((category) => (
        <p
          key={category}
          className="font-medium p-0.5 px-2.5 bg-gray-100 dark:bg-gray-800 text-center mx-auto rounded-full"
        >
          {category}
        </p>
      ))}
    </div>
  );
}

function CountryImages({ country }: Readonly<{ country: string }>) {
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

function ContinentPage() {
  const countries = Route.useLoaderData();

  return (
    <div className="m-10 space-y-3">
      <CategoryHeader />
      <div className="space-y-3">
        {countries.map((country) => (
          <div key={country} className="space-y-1.5">
            <div className="flex gap-2 items-center">
              <h2 className="text-xl font-bold">
                {country[0].toUpperCase() + country.slice(1)}
              </h2>
              <img
                src="https://flagsapi.com/AR/shiny/32.png"
                alt="Argentina Flag"
              />
              <img
                src="/driving-side.svg"
                alt="Driving Side"
                className="size-7"
              />
              <div className="bg-green-500 text-white px-2 text-sm rounded-md flex items-center">
                Right
              </div>
              <p className="font-medium">.ar</p>
            </div>
            <CountryImages country={country} />
          </div>
        ))}
      </div>
    </div>
  );
}
