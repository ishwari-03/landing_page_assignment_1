'use client';

import React, { JSX, ReactNode } from 'react';
import { motion, Variants } from 'motion/react';

/* ---------------- TYPES ---------------- */

export type PresetType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'blur'
  | 'blur-slide'
  | 'zoom'
  | 'flip'
  | 'bounce'
  | 'rotate'
  | 'swing';

export type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: PresetType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asChild?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

/* ---------------- DEFAULT VARIANTS ---------------- */

const defaultContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/* ---------------- PRESET VARIANTS ---------------- */

const presetVariants: Record<PresetType, Variants> = {
  fade: {},

  slide: {
    hidden: { y: 20 },
    visible: { y: 0 },
  },

  scale: {
    hidden: { scale: 0.8 },
    visible: { scale: 1 },
  },

  blur: {
    hidden: { filter: 'blur(4px)' },
    visible: { filter: 'blur(0px)' },
  },

  'blur-slide': {
    hidden: { filter: 'blur(4px)', y: 20 },
    visible: { filter: 'blur(0px)', y: 0 },
  },

  zoom: {
    hidden: { scale: 0.5 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
      },
    },
  },

  flip: {
    hidden: { rotateX: -90 },
    visible: {
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
      },
    },
  },

  bounce: {
    hidden: { y: -50 },
    visible: {
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 10,
      },
    },
  },

  rotate: {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 15,
      },
    },
  },

  swing: {
    hidden: { rotate: -10 },
    visible: {
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 8,
      },
    },
  },
};

/* ---------------- HELPERS ---------------- */

const addDefaultVariants = (variants: Variants): Variants => ({
  hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
  visible: { ...defaultItemVariants.visible, ...variants.visible },
});

/* ---------------- COMPONENT ---------------- */

function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as = 'div',
  asChild = 'div',
}: AnimatedGroupProps) {
  const selectedVariants = {
    item: addDefaultVariants(preset ? presetVariants[preset] : {}),
    container: addDefaultVariants(defaultContainerVariants),
  };

  const containerVariants = variants?.container ?? selectedVariants.container;
  const itemVariants = variants?.item ?? selectedVariants.item;

  /* SAFELY CREATE MOTION COMPONENTS */

  const MotionComponent = React.useMemo(() => {
    if (typeof as === 'string') return motion.create(as);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof as !== 'string' && as) return motion.create(as as React.ComponentType<any>);
    return motion.create('div');
  }, [as]);

  const MotionChild = React.useMemo(() => {
    if (typeof asChild === 'string') return motion.create(asChild);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof asChild !== 'string' && asChild) return motion.create(asChild as React.ComponentType<any>);
    return motion.create('div');
  }, [asChild]);

  return (
    // eslint-disable-next-line react-hooks/static-components
    <MotionComponent
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <MotionChild key={index} variants={itemVariants}>
          {child}
        </MotionChild>
      ))}
    </MotionComponent>
  );
}

export { AnimatedGroup };
