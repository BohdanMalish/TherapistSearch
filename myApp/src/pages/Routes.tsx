import { Route } from 'react-router-dom';
import { SpecialistsList } from './SpecialistsList';
import { Filters } from './Filters';

export const Routes: React.FC = () => (
  <>
    <Route exact path="/" component={SpecialistsList} />
    <Route exact path="/filters" component={Filters} />
  </>
);

