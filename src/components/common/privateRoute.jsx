import { useAppContext } from '../../contextApi/context';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { store } = useAppContext();
  const isLoginFromStore = store.admin.isLogin;

  if (!isLoginFromStore) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;