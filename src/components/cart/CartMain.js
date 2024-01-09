'use client';

import { useUser } from '@/hooks/useUser';

export default function CartMain() {
  const { user } = useUser();
  console.log(user);
  return (
    <div>
      <div>{user.email}</div>
    </div>
  );
}
