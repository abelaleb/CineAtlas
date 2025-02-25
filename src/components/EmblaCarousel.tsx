import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="overflow-hidden flex flex-col justify-center items-center p-4 w-screen bg-primary ">
      <div className=" " ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom gap-2 -ml-72">
          {slides.map((index) => (
            <div
              className="bg-red-300 p-2 transform translate-z-0 flex-0-0-25% min-w-0 pl-4"
              key={index}
            >
              <div className="shadow-inner border-2 border-gray-400 rounded-2xl text-4xl font-semibold flex items-center justify-center h-96 w-96 select-none">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-green grid grid-cols-[auto_1fr] justify-between gap-4 mt-7">
        <div className="flex flex-wrap justify-center items-center -mr-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={` touch-manipulation text-decoration-none cursor-pointer border-0 p-0 m-0 w-10 h-10 flex items-center justify-center rounded-full ${
                index === selectedIndex
                  ? "shadow-inner border-2 border-gray-800 w-6 h-6 rounded-full"
                  : "shadow-inner border-2 border-gray-200 w-6 h-6 rounded-full"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
