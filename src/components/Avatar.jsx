export default function Avatar({ name, size = 'md' }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`avatar avatar-${size}`} aria-label={`${name} avatarı`}>
      {initials}
    </div>
  );
}
