import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

// With localePrefix: 'always', this page shouldn't be hit
// But if it is, redirect to the default locale
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
