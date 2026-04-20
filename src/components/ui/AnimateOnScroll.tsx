'use client'

import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

type AnimationVariant = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'staggerContainer'

const variants: Record<AnimationVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  },
}

interface AnimateOnScrollProps {
  children: React.ReactNode
  variant?: AnimationVariant
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  as?: 'div' | 'section' | 'ul' | 'li' | 'span'
}

export function AnimateOnScroll({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  as = 'div',
}: AnimateOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-80px 0px' })

  const MotionComponent = motion[as]

  return (
    <MotionComponent
      ref={ref}
      className={className}
      variants={variants[variant]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </MotionComponent>
  )
}

/** Stagger wrapper: children animate in sequence */
export function StaggerOnScroll({
  children,
  className,
  once = true,
  staggerDelay = 0.12,
}: {
  children: React.ReactNode
  className?: string
  once?: boolean
  staggerDelay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-80px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren: 0.05 },
        },
      }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

/** Individual child item to use inside StaggerOnScroll */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
      }}
    >
      {children}
    </motion.div>
  )
}
