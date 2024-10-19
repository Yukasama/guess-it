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
    <div className="m-10">
      <div className="overflow-y-auto">
        <table className="min-w-full table-fixed border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 p-2 bg-white z-10">Country</th>
              <th className="p-2">
                <CategoryHeader />
              </th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country} className="border-b">
                <td className="sticky left-0 bg-white z-10 p-2 flex flex-col items-center gap-1">
                  <img
                    src="https://flagsapi.com/AR/shiny/32.png"
                    alt={`${country} Flag`}
                  />
                  <span className="font-bold">
                    {(country[0].toUpperCase() + country.slice(1)).replace(
                      '-',
                      ' ',
                    )}
                  </span>
                  <img
                    src="/driving-side.svg"
                    alt="Driving Side"
                    className="size-9"
                  />
                  <div className="bg-gray-800 border-gray-700/50 rounded-md px-2">
                    .ar
                  </div>
                </td>
                <td className="p-2">
                  <div className="overflow-x-auto">
                    <CountryImages country={country} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
