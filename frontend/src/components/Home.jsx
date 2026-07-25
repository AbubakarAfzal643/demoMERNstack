import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MacTerminal from "./MacTerminal";

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
      accentLine: "from-transparent via-cyan-500/50 to-transparent",
      glow: "rgba(0, 245, 255, 0.3)",
    },
    {
      icon: "🚀",
      title: "Backend",
      description: "Build powerful APIs using Express and Node.js.",
      accentLine: "from-transparent via-purple-500/50 to-transparent",
      glow: "rgba(168, 85, 247, 0.3)",
    },
    {
      icon: "🗄️",
      title: "Database",
      description: "Manage data efficiently with MongoDB Atlas.",
      accentLine: "from-transparent via-pink-500/50 to-transparent",
      glow: "rgba(236, 72, 153, 0.3)",
    },
  ];

  return (
    <section className="min-h-[92vh] flex items-center justify-center px-4 py-24 relative overflow-hidden">
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid pointer-events-none" />

      {/* Neon orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full neon-orb animate-glow-pulse" />
        <div
          className="absolute top-1/3 right-1/5 w-80 h-80 bg-purple-500/25 rounded-full neon-orb animate-glow-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full neon-orb animate-glow-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-60" />

      {/* Floating decorative rings */}
      <div className="absolute top-32 right-10 w-32 h-32 border border-cyan-500/20 rounded-full animate-float pointer-events-none hidden lg:block" />
      <div
        className="absolute bottom-40 left-10 w-20 h-20 border border-purple-500/20 rounded-full animate-float pointer-events-none hidden lg:block"
        style={{ animationDelay: "2s" }}
      />

      <div
        className={`text-center max-w-5xl relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Badge */}
        <div className="mb-8 inline-block">
          <div className="px-5 py-2.5 rounded-full badge-futuristic backdrop-blur-xl text-cyan-300 text-sm font-semibold tracking-widest uppercase">
            <span className="inline-block mr-2 animate-pulse">◈</span>
            Next-Gen MERN Platform
          </div>
        </div>

        {/* Hero heading */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 font-space-grotesk tracking-tight">
          <span className="text-white/90 futuristic-glow-text">Build the</span>
          <br />
          <span className="holographic-text text-6xl md:text-8xl block mt-2">
            Future of Apps
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-light">
          Harness MongoDB, Express, React & Node.js in a{" "}
          <span className="text-cyan-400/90">glossy</span>,{" "}
          <span className="text-purple-400/90">futuristic</span> stack built
          for speed, scale, and stunning interfaces.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5 mb-20">
          <button
            onClick={() => navigate("/students")}
            className="btn-futuristic px-10 py-4 rounded-2xl font-semibold text-white text-lg"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Launch App
              <span className="text-xl">→</span>
            </span>
          </button>

          <button className="btn-glass px-10 py-4 rounded-2xl font-semibold text-white text-lg">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore Stack
              <span className="text-cyan-400">◇</span>
            </span>
          </button>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`glossy-card p-8 rounded-2xl group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150 + 200}ms`,
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              {/* Accent glow on hover */}
              <div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                style={{ background: feature.glow }}
              />

              <div className="relative z-10">
                <div className="w-14 h-14 mb-5 mx-auto flex items-center justify-center rounded-xl glossy-panel text-3xl transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 font-space-grotesk tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className={`mt-5 h-px w-full bg-gradient-to-r ${feature.accentLine} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-24 pt-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-8">
            {[
              { value: "100%", label: "Full-Stack Ready" },
              { value: "∞", label: "Infinitely Scalable" },
              { value: "⚡", label: "Lightning Fast" },
            ].map((stat, i) => (
              <div
                key={i}
                className="stat-glass rounded-2xl py-6 px-4 transform transition-all duration-500 hover:scale-105 hover:border-cyan-500/30"
              >
                <h3 className="text-3xl md:text-4xl font-bold holographic-text mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* macOS Terminal */}
        <MacTerminal />
      </div>
    </section>
  );
};

export default Home;
