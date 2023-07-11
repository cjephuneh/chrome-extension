import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const OnBoarding = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      router.push('/drawer'); // Redirect to "/drawer" route if user is logged in
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-8 px-8 bg-white">
      <div className="pt-4">
        <h1 className="text-3xl font-bold text-center">Real-time, convenient</h1>
        <h1 className="text-3xl font-bold text-center">messaging</h1>
      </div>
      <div>
        <img src="/assets/splash.png" alt="Splash" />
      </div>
      <button
        onClick={() => router.push(user ? '/drawer' : '/login')}
        className="bg-[#2DABB1] px-6 py-3 w-full rounded-full text-white text-xl font-semibold"
      >
        Get started
      </button>
    </div>
  );
};

export default OnBoarding;
