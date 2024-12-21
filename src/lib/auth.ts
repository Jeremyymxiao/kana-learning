import { auth } from '@/lib/firebase';
import { User } from 'firebase/auth';

export async function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export function getAuthToken(): Promise<string | null> {
  return new Promise((resolve) => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      unsubscribe();
      if (!user) {
        resolve(null);
        return;
      }
      const token = await user.getIdToken();
      resolve(token);
    });
  });
}