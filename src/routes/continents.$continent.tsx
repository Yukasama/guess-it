import { createFileRoute } from '@tanstack/react-router';

const images = require.context('../assets/countries/', true);
const imageList = images.keys().map((image) => images(image));

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

function ContinentPage() {
  const countries = Route.useLoaderData();

  return (
    <div className="m-20">
      <ul className="list-disc ml-8">
        {countries.map((country) => (
          <div key={country}>
            <h2>{country}</h2>
            <img
              src={imageList[`${country}/bollard.png`]}
              alt={`${country}-google-car`}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}

function getCountriesByContinent(continent: string) {
  const continentCountries: Record<string, string[]> = {
    europe: ['France', 'Germany', 'Spain', 'Italy', 'Netherlands'],
    asia: ['China', 'India', 'Japan', 'South Korea', 'Thailand'],
    africa: ['Nigeria', 'Egypt', 'South Africa', 'Kenya', 'Morocco'],
    'north-america': ['USA', 'Canada', 'Mexico', 'Cuba', 'Jamaica'],
    'south-america': [
      'brazil',
      'argentina',
      'chile',
      'colombia',
      'peru',
      'curacao',
      'uruguay',
      'bolivia',
      'ecuador',
    ],
    oceania: ['Australia', 'New Zealand', 'Fiji', 'Samoa', 'Papua New Guinea'],
  };

  return continentCountries[continent] || [];
}
