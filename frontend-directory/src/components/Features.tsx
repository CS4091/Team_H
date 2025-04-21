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
      <div className="container mx-auto px-4 border-solid">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg border-solid border-2 hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 leading-[1]">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features