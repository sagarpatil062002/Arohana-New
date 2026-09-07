import { redirect } from 'next/navigation';

/* The Studio page lives at /about (the navbar "Studio" link points there).
   This route is kept so old /studio URLs still reach the same page. */
export default function StudioRedirectPage() {
  redirect('/about');
}
