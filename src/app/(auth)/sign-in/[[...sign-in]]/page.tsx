import { SignInSkeleton } from '@/features/auth/components/skeletons';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className='flex justify-center items-center '>
      <SignIn fallback={<SignInSkeleton />} routing='hash' />
    </div>
  );
}
