"use client";

import Image from "next/image";
import { useState } from "react";

// Gallery images from your gallery folder
const galleryImages = [
  { id: 1, src: "/gallery/angel.jpg", alt: "Angel" },
  { id: 2, src: "/gallery/assembly.jpeg", alt: "Assembly" },
  { id: 3, src: "/gallery/dance.jpeg", alt: "Dance Performance" },
  { id: 4, src: "/gallery/games.jpeg", alt: "Games" },
  { id: 5, src: "/gallery/garland.jpg", alt: "Garland Ceremony" },
  { id: 6, src: "/gallery/girls.jpg", alt: "Girls" },
  { id: 7, src: "/gallery/kids_dance.jpg", alt: "Kids Dance" },
  { id: 8, src: "/gallery/kids.jpeg", alt: "Kids" },
  { id: 9, src: "/gallery/photo.jpg", alt: "Group Photo" },
  { id: 10, src: "/gallery/prize.jpeg", alt: "Prize Distribution" },
  { id: 11, src: "/gallery/red.jpg", alt: "Red Uniforms" },
  { id: 12, src: "/gallery/roam.jpeg", alt: "Campus Tour" },
  { id: 13, src: "/gallery/show.jpg", alt: "Show" },
  { id: 14, src: "/gallery/sport.jpg", alt: "Sports Day" },
  { id: 15, src: "/gallery/teachers.jpeg", alt: "Teachers" },
  { id: 16, src: "/gallery/tour.jpg", alt: "Educational Tour" },
  { id: 17, src: "/gallery/white.jpg", alt: "White Uniforms" },
  { id: 18, src: "/gallery/youth.jpg", alt: "Youth" },
];

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="gallery" className="bg-white py-24 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white animate-slide-up">
            Our Gallery
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300 animate-slide-up delay-100">
            A glimpse into our vibrant community and the moments that make Good
            Shepherd Lanka special.
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative animate-scale-in delay-200">
          {/* Main Image Container */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-gray-100 shadow-2xl dark:bg-gray-800">
            {/* Decorative gradient */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-rose-700 to-rose-900 opacity-10 blur-3xl dark:opacity-20" />

            {/* Main Image */}
            <div className="relative h-full w-full">
              {galleryImages[currentIndex] && (
                <Image
                  src={galleryImages[currentIndex].src}
                  alt={galleryImages[currentIndex].alt}
                  fill
                  className="object-cover transition-opacity duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  priority
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition-all hover:bg-white hover:scale-110 dark:bg-gray-900/90 dark:text-white dark:hover:bg-gray-900"
              aria-label="Previous image"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition-all hover:bg-white hover:scale-110 dark:bg-gray-900/90 dark:text-white dark:hover:bg-gray-900"
              aria-label="Next image"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-gray-900/80 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm dark:bg-white/80 dark:text-gray-900">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-rose-800 dark:bg-rose-400"
                    : "w-2 bg-gray-300 hover:bg-rose-400 dark:bg-gray-700 dark:hover:bg-rose-600"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnail Strip */}
          <div className="mt-8 hidden gap-4 overflow-x-auto pb-4 md:flex">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToSlide(index)}
                className={`relative aspect-video w-32 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                  index === currentIndex
                    ? "ring-4 ring-rose-800 dark:ring-rose-400"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
