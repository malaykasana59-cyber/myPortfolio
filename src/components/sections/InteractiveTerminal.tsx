"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Copy, Check, Terminal, Code2, Database, Sparkles, RefreshCw, TerminalSquare } from "lucide-react";
import { toast } from "sonner";
import { motionTokens } from "@/lib/motionTokens";

interface CodeTab {
  id: string;
  name: string;
  language: string;
  icon: React.ElementType;
  code: string;
  runOutput: string[];
}

const codeTabs: CodeTab[] = [
  {
    id: "cpp",
    name: "engineer.cpp",
    language: "cpp",
    icon: Code2,
    code: `#include <iostream>
#include <vector>
#include <string>

struct SoftwareEngineer {
    std::string name = "Malay Kasana";
    std::string college = "Delhi Technological University (DTU)";
    std::string branch = "Software Engineering (2025-2029)";
    std::vector<std::string> coreStack = {"C++", "DSA", "Python", "SQL", "PostgreSQL"};
    bool seekingInternship = true;

    void displayStatus() const {
        std::cout << "[Candidate]: " << name << " @ " << college << std::endl;
        std::cout << "[Focus]: Data Structures, Low-Level Efficiency & Backend" << std::endl;
        std::cout << "[Status]: " << (seekingInternship ? "Ready for Internships" : "Busy") << std::endl;
    }
};

int main() {
    SoftwareEngineer malay;
    malay.displayStatus();
    return 0;
}`,
    runOutput: [
      "$ g++ -O3 -std=c++20 engineer.cpp -o engineer && ./engineer",
      "[Candidate]: Malay Kasana @ Delhi Technological University (DTU)",
      "[Focus]: Data Structures, Low-Level Efficiency & Backend",
      "[Status]: Ready for Internships (Summer / Fall)",
      "✓ Program exited with code 0 (execution time: 1.4ms)",
    ],
  },
  {
    id: "sql",
    name: "skills.sql",
    language: "sql",
    icon: Database,
    code: `-- Querying Malay's Verified Technical Competencies
SELECT 
    category, 
    skill_name, 
    proficiency_level,
    highlight_status
FROM dtu_engineers.skills
WHERE developer = 'Malay Kasana'
ORDER BY 
    CASE proficiency_level 
        WHEN 'Expert' THEN 1 
        WHEN 'Advanced' THEN 2 
        ELSE 3 
    END;

-- Verification of Relational Normalization & ACID Reliability
EXPLAIN ANALYZE 
SELECT * FROM projects WHERE developer_id = 'malaykasana59-cyber';`,
    runOutput: [
      "$ psql -d portfolio -f skills.sql",
      " category    |       skill_name       | proficiency_level | highlight ",
      "-------------+------------------------+-------------------+-----------",
      " Languages   | C++ (C++17/20)         | Expert            | true      ",
      " Backend     | DSA & Algorithmic OOP  | Expert            | true      ",
      " Databases   | PostgreSQL & 3NF SQL   | Advanced          | true      ",
      " AI/Systems  | Stockfish Python GUI   | Advanced          | true      ",
      " DevOps      | Linux & Git Versioning | Advanced          | true      ",
      "(5 rows selected • Execution Plan Latency: 0.18ms)",
    ],
  },
  {
    id: "python",
    name: "chessy_bot.py",
    language: "python",
    icon: Terminal,
    code: `import chess
import chess.engine

class ChessyAnalyzer:
    def __init__(self, stockfish_path="stockfish"):
        self.board = chess.Board()
        print("Chessy Engine Initialized. UCI protocol active.")

    def evaluate_position(self, fen):
        self.board.set_fen(fen)
        print(f"Analyzing FEN: {fen}")
        return {"best_move": "e2e4", "eval": "+0.45", "depth": 22}

if __name__ == "__main__":
    analyzer = ChessyAnalyzer()
    res = analyzer.evaluate_position(chess.STARTING_FEN)
    print(f"Optimal Opening: {res['best_move']} (Depth {res['depth']})")`,
    runOutput: [
      "$ python3 chessy_bot.py",
      "Chessy Engine Initialized. UCI protocol active.",
      "Analyzing FEN: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      "Optimal Opening: e2e4 (Depth 22, Eval: +0.45)",
      "Stockfish 16.1 engine analysis completed cleanly.",
    ],
  },
];

export function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState<string>("cpp");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentTab = codeTabs.find((t) => t.id === activeTab) || codeTabs[0];

  useEffect(() => {
    const timer = timerRef;
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTab.code);
    setCopied(true);
    toast.success(`Copied ${currentTab.name} to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setShowOutput(true);
    setOutputLines([]);

    if (timerRef.current) clearInterval(timerRef.current);

    // Stream lines out dynamically
    const fullLines = currentTab.runOutput;
    let lineIdx = 0;

    const streamInterval = setInterval(() => {
      if (lineIdx < fullLines.length) {
        const nextLine = fullLines[lineIdx];
        setOutputLines((prev) => [...prev, nextLine]);
        lineIdx++;
      } else {
        clearInterval(streamInterval);
        timerRef.current = null;
        setIsRunning(false);
        toast.success(`Executed ${currentTab.name} successfully!`);
      }
    }, 180);

    timerRef.current = streamInterval;
  };

  return (
    <section id="sandbox" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Code Sandbox</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight text-balance">
          Inspect Developer Source & Runtime
        </h2>
        <p className="mt-2 sm:mt-3 text-xs sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed text-pretty">
          Explore real snippets representing my C++ DSA foundations, SQL relational queries, and Python Stockfish logic.
        </p>
      </div>

      {/* Terminal Window Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
        className="rounded-2xl sm:rounded-3xl border border-border/90 bg-card shadow-2xl overflow-hidden backdrop-blur-md"
      >
        {/* Terminal Header & Tabs */}
        <div className="flex flex-wrap items-center justify-between border-b border-border/70 bg-secondary/60 px-3 sm:px-5 py-2.5 gap-2">
          {/* Traffic Lights + Tabs */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto max-w-full">
            {/* macOS traffic light dots */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/50" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/50" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/50" />
            </div>

            {/* Code Tabs with Animated Slider */}
            <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
              {codeTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowOutput(false);
                      setOutputLines([]);
                    }}
                    className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors min-h-[34px] shrink-0 ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeTerminalTab"
                        className="absolute inset-0 rounded-lg bg-card border border-border shadow-sm -z-10"
                        transition={motionTokens.spring.slider}
                      />
                    )}
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-primary" : ""}`} />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons (Run & Copy) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm active:scale-95 transition-all disabled:opacity-50 min-h-[34px]"
              title="Compile and execute snippet"
            >
              {isRunning ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-white" />
              )}
              <span>{isRunning ? "Running..." : "Run"}</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-lg border border-border bg-card/80 hover:bg-secondary text-muted-foreground hover:text-foreground active:scale-95 transition-all min-w-[34px] min-h-[34px] flex items-center justify-center"
              aria-label="Copy code snippet"
              title="Copy code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-foreground" />}
            </button>
          </div>
        </div>

        {/* Code Content Area */}
        <div className="p-3 sm:p-6 font-mono text-xs sm:text-sm bg-slate-950 text-slate-100 overflow-x-auto selection:bg-primary/30 relative">
          <pre className="leading-relaxed">
            <code>
              {currentTab.code.split("\n").map((line, idx) => (
                <div key={idx} className="table-row">
                  <span className="table-cell select-none text-slate-600 pr-3 sm:pr-4 text-right text-[10px] sm:text-xs">
                    {idx + 1}
                  </span>
                  <span className="table-cell whitespace-pre text-slate-200">{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Terminal Run Output Drawer */}
        <AnimatePresence mode="wait">
          {showOutput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
              className="border-t border-slate-800 bg-slate-900/95 p-3 sm:p-5 font-mono text-xs text-emerald-400 overflow-hidden"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2 border-b border-slate-800 pb-1.5 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <TerminalSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Terminal Console Output</span>
                </div>
                <span className="text-emerald-400 font-semibold">
                  {isRunning ? "Executing..." : "Exit Code: 0"}
                </span>
              </div>
              <div className="space-y-1.5 overflow-x-auto">
                {outputLines.map((out, i) => (
                  <p key={i} className={i === 0 ? "text-slate-300 font-bold" : "text-emerald-300 leading-relaxed"}>
                    {out}
                  </p>
                ))}
                {isRunning && (
                  <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-1 align-middle" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
