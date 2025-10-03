import { useState, useEffect } from 'react';

export default function HostTile(props) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      const image = await import(`./assets/mapTiles/${props.imageFile}.png`);
      setImageSrc(image.default);
    };
    loadImage();
  }, [props.imageFile]);

  return (
    <image
      href={imageSrc}
      transform={props.translateValue}
      width={'400'}
      height={'208'}
    />
  )
}