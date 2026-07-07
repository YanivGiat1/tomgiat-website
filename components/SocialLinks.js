const links = [
  { label: 'Instagram', href: 'https://www.instagram.com/one_eye_open_film/' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61570643144493' },
  { label: 'Linktree', href: 'https://linktr.ee/tomgiat' },
];

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`flex gap-5 text-sm uppercase tracking-widest text-zinc-400 ${className}`}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-accent-light"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
