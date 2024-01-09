import Auth from '@/components/auth/Auth';

export const metadata = {
  title: 'Sign Up',
};

export default function SignupPage() {
  return <Auth authType='signup' />;
}
