'use client';

import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cn } from '@/lib/utils';

const toggleVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-xl',
    'text-sm font-medium whitespace-nowrap',
    'cursor-pointer outline-none transition-all duration-300',
    'backdrop-blur-sm',
    'focus-visible:ring-blue-500/20 focus-visible:ring-[3px] focus-visible:border-blue-500/30',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    'disabled:pointer-events-none disabled:opacity-50 disabled:not-allowed',
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default:
          'bg-white/20 border border-white/25 text-gray-900 hover:bg-white/30 hover:scale-105 focus:bg-white/30 shadow-[0_5px_15px_-3px_rgba(0,0,0,0.05)] backdrop-blur-xl',
        primary:
          'text-gray-900 bg-white/50 border border-white/30 hover:bg-white/70 hover:scale-105 focus:bg-white/70 shadow-[0_5px_15px_-3px_rgba(0,0,0,0.05)] data-[state=off]:bg-rose-500/15 hover:data-[state=off]:bg-rose-500/20 data-[state=off]:text-rose-600 data-[state=off]:border-rose-500/30 data-[state=off]:shadow-[0_8px_32px_rgba(251,113,133,0.25)]',
        secondary:
          'text-gray-900 bg-white/20 border border-white/25 hover:bg-white/30 hover:scale-105 focus:bg-white/30 shadow-[0_5px_15px_-3px_rgba(0,0,0,0.05)] backdrop-blur-xl data-[state=on]:bg-blue-500/15 hover:data-[state=on]:bg-blue-500/20 data-[state=on]:text-blue-600 data-[state=on]:border-blue-500/30 data-[state=on]:shadow-[0_8px_32px_rgba(59,130,246,0.25)]',
        outline: [
          'border border-white/25 bg-transparent text-gray-900 shadow-[0_5px_15px_-3px_rgba(0,0,0,0.05)] backdrop-blur-xl',
          'hover:bg-white/20 hover:scale-105 focus:bg-white/20',
        ],
      },
      size: {
        default: 'h-9 px-2 min-w-9',
        sm: 'h-8 px-1.5 min-w-8',
        lg: 'h-10 px-2.5 min-w-10',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
