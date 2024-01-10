export default function LoadingSpinnerCircle({ color = '' }) {
  return (
    <span className={`loading loading-spinner loading-lg ${color}`}></span>
  );
}
