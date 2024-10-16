import { createFileRoute, Link } from '@tanstack/react-router';
import europeImage from '../assets/generated/europe.webp';
import northAmericaImage from '../assets/generated/north-america.webp';
import southAmericaImage from '../assets/generated/south-america.webp';
import asiaImage from '../assets/generated/asia.webp';
import oceaniaImage from '../assets/generated/oceania.webp';
import africaImage from '../assets/generated/africa.webp';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const continents = [
    { title: 'Europe', slug: 'europe', src: europeImage },
    { title: 'North America', slug: 'north-america', src: northAmericaImage },
    { title: 'South America', slug: 'south-america', src: southAmericaImage },
    { title: 'Asia', slug: 'asia', src: asiaImage },
    { title: 'Oceania', slug: 'oceania', src: oceaniaImage },
    { title: 'Africa', slug: 'africa', src: africaImage },
  ];

  return (
    <div className="grid grid-cols-3 gap-8 m-20">
      {continents.map(({ title, slug, src }) => (
        <Link
          to={`/continents/${slug}`}
          key={slug}
          className="relative rounded-md overflow-hidden cursor-pointer w-full h-64 group"
        >
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover transition-opacity duration-200 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <span
              className="text-white text-3xl font-bold px-4 py-2 transition-opacity duration-200 group-hover:opacity-0"
              style={{
                textShadow: '2px 2px 4px black, -2px -2px 4px black',
              }}
            >
              {title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
