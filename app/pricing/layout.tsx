export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex w-full items-center justify-center bg-background">
        {children}
      </div>
  );
}
