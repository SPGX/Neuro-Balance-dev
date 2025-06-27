import { motion as Motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


export default function FadeInSection({ children }) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {children}
    </Motion.div>
  );
}
