export default function CornerFrame({ children, className = '' }) {
  return (
    <div className={`relative py-2 ps-6 ${className}`}>
      <span className="absolute start-0 top-0 h-4 w-4 border-s border-t border-sage-dark/60" />
      <span className="absolute bottom-0 start-0 h-4 w-4 border-b border-s border-sage-dark/60" />
      {children}
    </div>
  );
}
