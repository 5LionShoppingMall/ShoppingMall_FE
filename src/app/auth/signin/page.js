import Auth from '@/components/auth/Auth';

export const metadata = {
  title: 'Sign In',
};

export default function SigninPage() {
  return <Auth authType='signin' />;
}
