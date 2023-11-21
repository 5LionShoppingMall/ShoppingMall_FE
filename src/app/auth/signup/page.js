import Auth from '@/components/Auth';

export const metadata = {
  title: 'Sign Up',
};

export default function SignupPage() {
  return <Auth authType='signup' />;
}
