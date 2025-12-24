import { useAppSelector } from '../../store/hooks';
import { selectTotalCount } from '../../store/slices/specialistsSlice';
import { StickyFilterBar } from './StickyFilterBar/StickyFilterBar';
import './styles.css';

export const Header: React.FC = () => {
  const providersCount = useAppSelector(selectTotalCount);

  return (
    <>
      <div className="page-header">
        <h1 className="page-header__title">
          Build healthy relationships with your partner
        </h1>
        <p className="page-header__subtitle">
          {providersCount} providers are currently available
        </p>
      </div>
      <StickyFilterBar />
    </>
  );
};

