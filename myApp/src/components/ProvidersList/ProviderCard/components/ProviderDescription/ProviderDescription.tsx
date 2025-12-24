import './ProviderDescription.css';

interface ProviderDescriptionProps {
  description: string;
}

export const ProviderDescription: React.FC<ProviderDescriptionProps> = ({ description }) => {
  return (
    <p className="provider-description">
      {description}
    </p>
  );
};

