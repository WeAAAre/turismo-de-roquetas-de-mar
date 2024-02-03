'use client';
import * as React from 'react';

interface ChildrenProps {
  children: React.ReactNode;
}

const CollapsibleContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contentId: string;
} | null>(null);

const CollapsibleRoot = (props: ChildrenProps) => {
  const { children } = props;
  const [open, setOpen] = React.useState(false);
  const contentId = React.useId();

  return (
    <CollapsibleContext.Provider value={{ open, setOpen, contentId }}>
      {children}
    </CollapsibleContext.Provider>
  );
};

const CollapsibleTrigger = (
  props: React.ComponentPropsWithoutRef<'button'>,
) => {
  const { children, ...rest } = props;
  const { open, setOpen, contentId } = React.useContext(CollapsibleContext)!;

  return (
    <button
      aria-controls={contentId}
      aria-expanded={open ? 'true' : undefined}
      onClick={() => setOpen(!open)}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
};

const CollapsibleContent = (props: ChildrenProps) => {
  const { children } = props;
  const { open, contentId } = React.useContext(CollapsibleContext)!;

  return open ? <div id={contentId}>{children}</div> : null;
};

const Root = CollapsibleRoot;
const Trigger = CollapsibleTrigger;
const Content = CollapsibleContent;

export { Root, Trigger, Content };
