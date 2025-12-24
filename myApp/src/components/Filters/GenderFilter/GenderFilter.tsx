import { IonSegment, IonSegmentButton } from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setGender, selectGender } from '../../../store/slices/filtersSlice';
import { Gender } from '../../../store/types';
import './GenderFilter.css';

export const GenderFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const gender = useAppSelector(selectGender);

  return (
    <div className="gender-filter-container">
      <h3 className="gender-filter-title">
        Gender
      </h3>
      <IonSegment
        value={gender || undefined}
        onIonChange={(e) => {
          const value = e.detail.value as Gender | undefined;
          // If clicked on already selected gender - reset
          if (value === gender) {
            dispatch(setGender(null));
          } else {
            dispatch(setGender(value || null));
          }
        }}
      >
        <IonSegmentButton value={Gender.MAN}>
          <div className="gender-button-content">
            <div className="gender-icon">👨</div>
            <div className="gender-label">Man</div>
          </div>
        </IonSegmentButton>
        <IonSegmentButton value={Gender.WOMAN}>
          <div className="gender-button-content">
            <div className="gender-icon">👩</div>
            <div className="gender-label">Woman</div>
          </div>
        </IonSegmentButton>
      </IonSegment>
    </div>
  );
};

