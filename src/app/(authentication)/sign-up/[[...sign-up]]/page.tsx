import { SignInSkeleton } from '@/features/auth/components';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className='flex justify-center items-center'>
      <SignUp fallback={<SignInSkeleton />} routing='hash' />
    </div>
  );
}
