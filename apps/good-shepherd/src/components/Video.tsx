"use client";

import { useState, useRef } from "react";

export function Video() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="bg-gray-50 py-24 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Our Story in Motion
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            Watch our journey and see the impact we&apos;re making in the lives
            of children at Good Shepherd Lanka.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative mx-auto max-w-5xl">
          {/* Decorative gradient background */}
          <div className="absolute -inset-8 -z-10 rounded-3xl bg-gradient-to-r from-rose-700 to-rose-900 opacity-10 blur-3xl dark:opacity-20" />

          {/* Video Player */}
          <div
            className="group relative overflow-hidden rounded-3xl bg-gray-900 shadow-2xl"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(isPlaying ? false : true)}
          >
            <video
              ref={videoRef}
              className="aspect-video w-full"
              poster="/welcome.jpg"
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Custom Play Button Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity">
                <button
                  onClick={togglePlay}
                  className="group/btn flex h-24 w-24 items-center justify-center rounded-full bg-rose-800/90 text-white shadow-2xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-rose-700 dark:bg-rose-700/90 dark:hover:bg-rose-600"
                  aria-label="Play video"
                >
                  <svg
                    className="ml-1 h-10 w-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Video Information Cards */}
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-2xl dark:bg-rose-900/30">
                🎥
              </div>
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                Behind the Scenes
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get an inside look at daily activities and special moments.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-2xl dark:bg-rose-900/30">
                🎓
              </div>
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                Educational Excellence
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Witness our commitment to quality education and values.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-2xl dark:bg-rose-900/30">
                ❤️
              </div>
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                Community Impact
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                See how we&apos;re building a brighter future together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
