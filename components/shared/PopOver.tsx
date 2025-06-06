'use client';

import * as Popover from '@radix-ui/react-popover';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
  message: string;
  header: string;
  localStorageKey: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
};

const ReusablePopover = ({
  children,
  message,
  header,
  localStorageKey,
  side = 'bottom',
  align = 'start',
}: Props) => {
  const [open, setOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem(localStorageKey);
    if (!hasSeen) {
      setOpen(true);
      setShouldRender(true);
    }
  }, []);

  const close = () => setOpen(false);

  const neverShowAgain = () => {
    localStorage.setItem(localStorageKey, 'true');
    close();
  };

  if (!shouldRender) return <>{children}</>;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side={side}
          align={align}
          className="z-50 max-w-xs rounded-xl bg-blue-600 text-white px-4 py-3 text-xs shadow-xl animate-in fade-in slide-in-from-top-1 scale-in-95 transition-all duration-300 ease-out"
          sideOffset={6}
        >
          <p className="mb-1 p-semibold-16">{header}</p>
          <p className="mb-3 text-sm text-neutral-100">{message}</p>

          <div className="flex justify-start gap-2 mb-1">
            <button
              onClick={close}
              className="text-sm px-2 border bg-white hover:bg-white/80 text-blue-600 rounded-md"
            >
              Close
            </button>
            <button
              onClick={neverShowAgain}
              className="text-sm px-1 underline text-neutral-300 hover:text-neutral-300/50"
            >
              Don’t show again
            </button>
          </div>

          <Popover.Arrow className="fill-blue-600" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default ReusablePopover;
