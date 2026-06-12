import { motion } from 'framer-motion';

export default function TextReveal({ text, className = "", delay = 0, tag = "p", once = true }) {
  const words = text.split(" ");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.7, 
        ease: [0.2, 0.65, 0.3, 0.9]
      } 
    }
  };

  const Tag = motion[tag] || motion.div;

  return (
    <Tag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.25em' }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span 
            variants={childVariants}
            style={{ display: 'inline-block', transformOrigin: 'left center' }}
            whileHover={{ 
              scale: 1.02, 
              color: 'var(--card-accent, #06b6d4)', 
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
