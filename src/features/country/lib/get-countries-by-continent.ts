/**
 * Get a list of countries on Google coverage by continent
 * @param continent Continent
 * @returns List of countries on Google coverage
 */
export const getCountriesByContinent = (continent: string) => {
  type Continent =
    | 'europe'
    | 'asia'
    | 'africa'
    | 'north-america'
    | 'south-america'
    | 'oceania';

  const continentCountries: Record<Continent, string[]> = {
    europe: [
      'france',
      'germany',
      'spain',
      'italy',
      'netherlands',
      'bulgaria',
      'romania',
    ],
    asia: [
      'china',
      'india',
      'japan',
      'south-korea',
      'thailand',
      'cambodia',
      'bangladesh',
      'bhutan',
      'indonesia',
      'malaysia',
    ],
    africa: [
      'nigeria',
      'egypt',
      'south-africa',
      'kenya',
      'senegal',
      'rwanda',
      'botswana',
      'lesotho',
      'eswatini',
    ],
    'north-america': ['usa', 'canada', 'mexico', 'puerto-rico', 'guatemala'],
    'south-america': [
      'argentina',
      'bolivia',
      'brazil',
      'chile',
      'colombia',
      'curaçao',
      'ecuador',
      'peru',
      'uruguay',
    ],
    oceania: ['australia', 'new-zealand', 'Fiji', 'Samoa', 'Papua New Guinea'],
  };

  return continentCountries[continent as Continent] || [];
};
