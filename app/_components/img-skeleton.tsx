"use client"

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';


interface ImageProps {
    src: StaticImageData
    clas: string
    alt: string

}
// Simple skeleton component
const ImageSkeleton = () => (
  <div className="animate-pulse bg-gray-300 border-1" style={{ width: '100%' }}></div>
);

// Image component with skeleton fallback
export default function ImageWithSkeleton  ({ src, clas, alt }: ImageProps)  {
  const [loading, setLoading] = useState(true); // Assume image is loading initially
  const [error, setError] = useState(false); // Track if there was an error loading the image

  const handleLoad = () => setLoading(false); // Image loaded successfully
  const handleError = () => {
    setLoading(false);
    setError(true); // Image failed to load
  };

  return (
    <div style={{ position: 'relative' }}>
      {loading && !error && <ImageSkeleton />}
      {/* <Image
        src={src}
        alt='No image available'
        layout="fill"
        objectFit="cover"
        onLoadingComplete={handleLoad}
        onError={handleError}
        style={{ display: loading || error ? 'none' : 'block' }}
      /> */}
      <img src='/btc.jpg' width='100%' height='100%' alt='ethereum'/>
      {/* {error && <div>Failed to load image</div>} // Optionally handle error state */}
    </div>
  );
};

