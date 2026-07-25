import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const WELCOME_LINES = [
  { type: "output", text: "  Welcome to MERN Studio Terminal v1.0", className: "text-white font-semibold" },
  { type: "output", text: "  Type 'help' to see available commands.", className: "text-gray-500" },
  { type: "blank" },
];

const COMMANDS = {
  help: {
    description: "Show all available commands",
    run: () => [
      { type: "output", text: "  Available commands:", className: "text-white font-semibold" },
      { type: "output", text: "  ─────────────────────────────────────", className: "text-gray-600" },
      { type: "output", text: "  help              Show this help message", className: "text-gray-400" },
      { type: "output", text: "  features          List platform features", className: "text-gray-400" },
      { type: "output", text: "  status            Check server status", className: "text-gray-400" },
      { type: "output", text: "  students          Open student portal", className: "text-gray-400" },
      { type: "output", text: "  home              Go to home page", className: "text-gray-400" },
      { type: "output", text: "  clear             Clear terminal screen", className: "text-gray-400" },
      { type: "output", text: "  echo <text>       Print text back", className: "text-gray-400" },
      { type: "output", text: "  about             About MERN Studio", className: "text-gray-400" },
    ],
  },
  features: {
    description: "List platform features",
    run: () => [
      { type: "output", text: "  MERN Studio  ·  Full-Stack Platform", className: "text-white font-semibold" },
      { type: "output", text: "  ─────────────────────────────────────", className: "text-gray-600" },
      { type: "feature", label: "Frontend", value: "React 18 · Vite · Tailwind CSS · React Router" },
      { type: "feature", label: "Backend", value: "Express.js REST API · Node.js" },
      { type: "feature", label: "Database", value: "MongoDB Atlas · Mongoose ODM" },
      { type: "feature", label: "Students", value: "Add, view & manage student records (CRUD)" },
      { type: "feature", label: "UI/UX", value: "Glassmorphism · Toast notifications · Dark theme" },
      { type: "feature", label: "Routes", value: "/ → Home  ·  /students → Student Portal" },
    ],
  },
  status: {
    description: "Check server status",
    run: () => [
      { type: "output", text: "  ✓ Dev server   http://localhost:5173", className: "text-emerald-400" },
      { type: "output", text: "  ✓ API server   http://localhost:5000/api", className: "text-emerald-400" },
      { type: "output", text: "  ✓ MongoDB      Connected", className: "text-emerald-400" },
    ],
  },
  about: {
    description: "About MERN Studio",
    run: () => [
      { type: "output", text: "  MERN Studio is a full-stack learning platform.", className: "text-gray-300" },
      { type: "output", text: "  Built with MongoDB, Express, React & Node.js.", className: "text-gray-400" },
      { type: "output", text: "  Explore the student portal to see CRUD in action.", className: "text-gray-400" },
    ],
  },
};

const MacTerminal = () => {
  const navigate = useNavigate();
  const [lines, setLines] = useState(WELCOME_LINES);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines, input]);

  const focusInput = () => inputRef.current?.focus();

  const processCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return [];

    const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);
    const argText = args.join(" ");

    switch (cmd) {
      case "help":
        return COMMANDS.help.run();

      case "features":
      case "mern-studio":
        return COMMANDS.features.run();

      case "status":
      case "npm":
        return COMMANDS.status.run();

      case "about":
        return COMMANDS.about.run();

      case "clear":
      case "cls":
        setLines([]);
        return [];

      case "echo":
        return argText
          ? [{ type: "output", text: `  ${argText}`, className: "text-gray-300" }]
          : [{ type: "output", text: "  Usage: echo <text>", className: "text-amber-400" }];

      case "students":
      case "start":
        navigate("/students");
        return [{ type: "output", text: "  → Navigating to Student Portal...", className: "text-cyan-400" }];

      case "home":
        navigate("/");
        return [{ type: "output", text: "  → Navigating to Home...", className: "text-cyan-400" }];

      case "ls":
        return [
          { type: "output", text: "  home/   students/   api/   components/", className: "text-gray-400" },
        ];

      default:
        return [
          {
            type: "output",
            text: `  Command not found: ${trimmed}. Type 'help' for available commands.`,
            className: "text-red-400",
          },
        ];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const output = processCommand(trimmed);

    setLines((prev) => [
      ...prev,
      { type: "input", text: trimmed },
      ...output,
      ...(output.length > 0 ? [{ type: "blank" }] : []),
    ]);

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }

    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const renderLine = (line, index) => {
    if (line.type === "blank") {
      return <div key={index} className="h-3" />;
    }

    if (line.type === "input") {
      return (
        <div key={index} className="text-sm">
          <span className="text-emerald-400">➜</span>
          <span className="text-cyan-300 ml-2">~</span>
          <span className="text-white ml-2">{line.text}</span>
        </div>
      );
    }

    if (line.type === "feature") {
      return (
        <div key={index} className="flex flex-col sm:flex-row sm:gap-3 text-sm leading-relaxed">
          <span className="text-cyan-400 shrink-0 sm:w-24">  ▸ {line.label}</span>
          <span className="text-gray-400 sm:text-gray-300">{line.value}</span>
        </div>
      );
    }

    return (
      <div key={index} className={`text-sm ${line.className || "text-gray-400"}`}>
        {line.text}
      </div>
    );
  };

  return (
    <div className="mt-24 w-full max-w-3xl mx-auto text-left">
      <div className="mac-terminal rounded-xl overflow-hidden shadow-2xl">
        <div className="mac-terminal-bar flex items-center px-4 py-3 gap-2">
          <div className="flex gap-2">
            <span className="mac-dot mac-dot-red" />
            <span className="mac-dot mac-dot-yellow" />
            <span className="mac-dot mac-dot-green" />
          </div>
          <span className="flex-1 text-center text-xs text-gray-400 font-medium tracking-wide pr-12">
            Terminal — mern-studio
          </span>
        </div>

        <div
          ref={bodyRef}
          className="mac-terminal-body p-5 md:p-6 font-mono min-h-[320px] max-h-[420px] overflow-y-auto cursor-text"
          onClick={focusInput}
        >
          {lines.map((line, i) => renderLine(line, i))}

          <form onSubmit={handleSubmit} className="text-sm mt-1 flex items-center">
            <span className="text-emerald-400 shrink-0">➜</span>
            <span className="text-cyan-300 ml-2 shrink-0">~</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white ml-2 caret-cyan-400 min-w-0"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-label="Terminal input"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MacTerminal;
