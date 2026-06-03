import { ReactNode } from "react";

/**
 * Standard app screen: fixed header, scrolling content, optional fixed nav.
 * Fills the phone-frame column defined in the root layout.
 */
export function AppScreen({
  children,
  header,
  nav,
  className = "",
  contentClassName = "",
}: {
  children: ReactNode;
  header?: ReactNode;
  nav?: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div className={`flex h-full flex-col ${className}`}>
      {header}
      <main className={`no-scrollbar flex-1 overflow-y-auto ${contentClassName}`}>
        {children}
      </main>
      {nav}
    </div>
  );
}
