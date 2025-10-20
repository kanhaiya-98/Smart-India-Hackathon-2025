import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
      <div className="text-center text-white">
        <h1 className="mb-4 text-4xl font-bold">Civic Admin Portal</h1>
        <p className="text-xl opacity-90">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default Index;
