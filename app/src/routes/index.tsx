import { Themer } from "@/components/ui/themer";
import { createFileRoute } from "@tanstack/react-router";
import europeImage from "../assets/generated/europe.webp";
import northAmericaImage from "../assets/generated/north-america.webp";
import southAmericaImage from "../assets/generated/south-america.webp";
import asiaImage from "../assets/generated/asia.webp";
import oceaniaImage from "../assets/generated/oceania.webp";
import africaImage from "../assets/generated/africa.webp";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const continents = [
    { title: "Europe", src: europeImage },
    { title: "North America", src: northAmericaImage },
    { title: "South America", src: southAmericaImage },
    { title: "Asia", src: asiaImage },
    { title: "Oceania", src: oceaniaImage },
    { title: "Africa", src: africaImage },
  ];

  return (
    <div>
      <Themer />
      <div className="grid grid-cols-3 gap-8 m-20">
        {continents.map(({ title, src }) => (
          <div
            key={title}
            className="relative rounded-md overflow-hidden cursor-pointer w-full h-64 group">
            <img
              src={src}
              alt={title}
              className="w-full h-full object-cover transition-opacity duration-200 opacity-50 group-hover:opacity-100"
            />

            <div className="absolute inset-0 flex justify-center items-center">
              <span
                className="text-white text-3xl font-bold px-4 py-2 transition-opacity duration-200 group-hover:opacity-0"
                style={{
                  textShadow: "2px 2px 4px black, -2px -2px 4px black",
                }}>
                {title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
