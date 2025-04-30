import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
    },
  },
};

const Features = () => {
  const features = [
    {
      title: "Great Accessibility",
      description: "Easy for anyone to use for making their trips efficient.",
      icon: "✨"
    },
    {
      title: "Fast Performance",
      description: "Optimized for speed and efficiency across all platforms.",
      icon: "⚡"
    },
    {
      title: "Intuitive Interface",
      description: "Easy to navigate with a user-friendly experience.",
      icon: "🔍"
    },
    {
      title: "Saveable Routes",
      description: "Look back on previously generated routes.",
      icon: "✈️"
    }
  ];

  return (
    <section id="features" className="pt-6 pb-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-center text-gray-900 mb-16">Key Features</h2>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg border-2 hover:shadow-lg transition"
              variants={cardVariants}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl mb-2 leading-[1]">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
