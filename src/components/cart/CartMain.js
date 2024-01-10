'use client';

import { useUser } from '@/hooks/useUser';

export default function CartMain() {
  const { user } = useUser();
  return (
    <div>
      <div>{user?.email}</div>
    </div>
  );
}
