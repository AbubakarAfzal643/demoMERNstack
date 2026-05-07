import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: "⚛️",
      title: "Frontend",
      description: "Create responsive interfaces with React and Tailwind CSS.",
      gradient: "from-blue-600/20 to-cyan-600/20",
      borderColor: "border-blue-500/30"
    },
    {
      icon: "🚀",
      title: "Backend",
      description: "Build powerful APIs using Express and Node.js.",
      gradient: "from-purple-600/20 to-pink-600/20",
      borderColor: "border-purple-500/30"
    },
    {
      icon: "🗄️",
      title: "Database",
      description: "Manage data efficiently with MongoDB Atlas.",
      gradient: "from-emerald-600/20 to-teal-600/20",
      borderColor: "border-emerald-500/30"
    }
  ];

  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className={`text-center max-w-4xl relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="mb-6 inline-block">
          <div className="px-4 py-2 rounded-full glass-effect border border-blue-500/30 text-blue-300 text-sm font-semibold mb-6 animate-pulse">
            ✨ Welcome to Modern MERN Development
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 font-space-grotesk">
          Build Amazing
          <br />
          <span className="gradient-text text-6xl md:text-8xl">Full-Stack Apps</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
          Leverage the power of MongoDB, Express, React, and Node.js to create 
          beautiful, scalable, and performant web applications with an elegant UI.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <button
            onClick={() => navigate('/students')}
            className="btn-primary btn-glow group relative"
          >
            <span className="relative z-10">Get Started 🚀</span>
          </button>

          <button className="group relative px-8 py-3 rounded-xl font-semibold text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-2 border-blue-500/50 rounded-xl"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">Learn More 📚</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`card-gradient card-hover-effect p-8 rounded-2xl transform transition-all duration-700 group relative ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${feature.gradient} blur-xl -z-10`}></div>

              <div className={`text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-125`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 font-space-grotesk">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
              
              <div className={`absolute inset-0 rounded-2xl border-2 ${feature.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-2">100%</h3>
              <p className="text-gray-400 text-sm">Full-Stack Ready</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-2">∞</h3>
              <p className="text-gray-400 text-sm">Scalable</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-2">⚡</h3>
              <p className="text-gray-400 text-sm">Lightning Fast</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;