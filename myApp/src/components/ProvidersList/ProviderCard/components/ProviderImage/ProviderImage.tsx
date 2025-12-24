import './ProviderImage.css';

interface ProviderImageProps {
  src: string;
  alt: string;
}

export const ProviderImage: React.FC<ProviderImageProps> = ({ src, alt }) => {
  return (
    <img
      src={src || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDSGZ_gNfWlUMYKuhR7Fve1YvXPUlhEcGmeQ&s'}
      alt={alt}
      className="provider-image"
    />
  );
};

