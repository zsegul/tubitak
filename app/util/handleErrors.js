import { toast } from 'react-toastify';

function handleErrors(error) {
  const { response } = error;
  
  if (response && response.data) {
    const data = response.data;
    
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (item.message) {
          toast.error(item.message);
        }
      });
    } else if (typeof data === 'object' && data.message) {
      toast.error(data.message);
    } else {
      toast.error('An unknown error occurred');
    }
  } else {
    toast.error('An unknown error occurred');
  }
}

export default handleErrors;