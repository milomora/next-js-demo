import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Homepage', path: '/' },
  { label: 'Pokemon List', path: '/pokemon-list' },
] as const;

export default function MainNav() {
  return (
    <nav className="flex gap-2 p-3">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.path}
          className="inline-block py-1 px-5 border-2 border-blue-500 rounded-lg font-bold"
          href={item.path}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
