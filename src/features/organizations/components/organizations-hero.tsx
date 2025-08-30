import Greeter from '@/components/layout/greeter';

export const OrganizationsHero = () => {
  return (
    <Greeter
      action={{ title: 'View Recommendations', redirect: '/dashboard' }}
      message='Here are the list of organizations that offers opportunities.'
    />
  );
};
