import { createFileRoute } from '@tanstack/react-router';

const validContinents = [
  'europe',
  'asia',
  'africa',
  'north-america',
  'south-america',
  'oceania',
];

export const Route = createFileRoute('/continents/$continent')({
  component: ({ params: { continent } }) => {
    if (validContinents.includes(continent)) {
      return <ContinentPage continent={continent} />;
    } else {
      return <NotFoundPage />;
    }
  },
});

const NotFoundPage = () => (
  <div>
    <h1>Continent not found</h1>
  </div>
);

function ContinentPage({ continent }: { continent: string }) {
  console.log(continent);
  const countries = getCountriesByContinent(continent);

  return (
    <div className="m-20">
      <h1 className="text-4xl font-bold mb-8">
        Countries in {continent.charAt(0).toUpperCase() + continent.slice(1)}
      </h1>
      <ul className="list-disc ml-8">
        {countries.map((country) => (
          <li key={country} className="text-2xl">
            {country}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Mock function to get countries by continent (replace with real data)
function getCountriesByContinent(continent: string) {
  const continentCountries: Record<string, string[]> = {
    europe: ['France', 'Germany', 'Spain', 'Italy', 'Netherlands'],
    asia: ['China', 'India', 'Japan', 'South Korea', 'Thailand'],
    africa: ['Nigeria', 'Egypt', 'South Africa', 'Kenya', 'Morocco'],
    'north-america': ['USA', 'Canada', 'Mexico', 'Cuba', 'Jamaica'],
    'south-america': ['Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru'],
    oceania: ['Australia', 'New Zealand', 'Fiji', 'Samoa', 'Papua New Guinea'],
  };

  return continentCountries[continent.toLowerCase()] || [];
}
