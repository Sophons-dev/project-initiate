import Greeter from '@/components/layout/greeter';

export const OpportuntiesHero = () => {
  return (
    <Greeter
      action={{ title: 'View Recommendations', redirect: '/dashboard' }}
      message='Here are the list of opportunities that are available for you.'
    />
  );
};
