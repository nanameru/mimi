import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'text-xs font-bold tracking-wider uppercase whitespace-nowrap',
    'inline-flex items-center justify-center gap-2 shrink-0 rounded-xl cursor-pointer outline-none transition-all duration-300',
    'backdrop-blur-sm',
    'focus-visible:border-blue-500/30 focus-visible:ring-blue-500/20 focus-visible:ring-[3px]',
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-invalid:ring-destructive/20 aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40 ',
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default:
          'bg-white/50 border border-white/30 text-gray-900 hover:bg-white/70 hover:scale-105 focus:bg-white/70 shadow-[0_5px_15px_-3px_rgba(0,0,0,0.05)]',
        destructive: [
          'bg-gradient-to-br from-rose-500/90 to-rose-600/90 backdrop-blur-xl border-0 text-white shadow-[0_8px_32px_rgba(251,113,133,0.4)]',
          'hover:from-rose-600/95 hover:to-rose-700/95 hover:scale-105 focus:from-rose-600/95 focus:to-rose-700/95 focus-visible:ring-rose-400/30',
          'dark:focus-visible:ring-rose-400/30',
        ],
        outline: [
          'border border-white/30 bg-transparent text-gray-900 shadow-[0_5px_15px_-3px_rgba(0,0,0,0.05)]',
          'hover:bg-white/50 hover:scale-105 hover:text-gray-900',
          'dark:bg-white/50 dark:border-white/30 dark:hover:bg-white/70',
        ],
        primary:
          'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 hover:from-blue-600 hover:to-blue-700 hover:scale-105 focus:from-blue-600 focus:to-blue-700 shadow-[0_4px_12px_-2px_rgba(59,130,246,0.3)]',
        secondary:
          'bg-slate-500/15 backdrop-blur-xl border border-slate-400/25 text-slate-100 hover:bg-slate-500/25 hover:scale-105 shadow-[0_8px_32px_rgba(100,116,139,0.2)]',
        ghost: 'hover:bg-white/50 hover:scale-105 hover:text-gray-900 dark:hover:bg-white/50',
        link: 'text-blue-300 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
