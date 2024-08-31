import { Gem } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full p-2">
      <Link
        href="/"
        title="Dashboard"
      >
        <span className="sr-only">Dashboard</span>
        <Gem />
      </Link>
    </header>
  );
}
