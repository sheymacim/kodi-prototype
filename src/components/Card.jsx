export default function Card({ children, className = '', ...props }) {
  return (
    <section className={`card${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </section>
  );
}
