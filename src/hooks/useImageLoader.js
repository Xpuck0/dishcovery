import { useState, useEffect } from 'react';

export default function useImageLoader(imageUrl) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => setLoaded(true);
    image.onerror = (err) => setError(err);
  }, [imageUrl]);

  return { loaded, error };
}