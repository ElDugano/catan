import { useState, useEffect } from 'react';

export default function HostRoad(props) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      const image = await import(`./assets/roads/${props.imagePath}.png`);
      setImageSrc(image.default);
    };
    loadImage();
  }, [props.imagePath]);

  return (
    <image
      href={imageSrc}
      transform={props.translateValue}
      width={props.width}
      height={props.height}
    />
  )
}