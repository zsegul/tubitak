import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {CircularProgress, Box} from '@mui/material';

const withAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const authority = localStorage.getItem('authority');
      if (!authority) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;