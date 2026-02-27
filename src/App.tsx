
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dumbbell,
  Trophy,
  Zap,
  User,
  Activity,
  Utensils,
  Brain,
  Loader2,
  ChevronRight,
  RefreshCcw,
  Flame
} from 'lucide-react';
import Markdown from 'react-markdown';
import { evaluateJhota } from './services/geminiService';

interface UserData {
  name: string;
  height: string;
  weight: string;
  pushups: string;
  benchPress: string;
  gymFrequency: string;
  proteinIntake: string;
  physicalWork: string;
  confidence: number;
  dominance: number;
  leadership: number;
}

const initialData: UserData = {
  name: '',
  height: '',
  weight: '',
  pushups: '',
  benchPress: '',
  gymFrequency: '3-4 times/week',
  proteinIntake: 'Moderate',
  physicalWork: 'None',
  confidence: 50,
  dominance: 50,
  leadership: 50,
};

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserData>(initialData);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ title: string; content: string }[] | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: keyof UserData, value: number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await evaluateJhota(formData);
      setResult(response);
      setCurrentCardIndex(0);
      setStep(4);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please make sure your Gemini API key is set in .env file.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setFormData(initialData);
    setResult(null);
    setCurrentCardIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tighter mb-2">
              JHOTA <span className="text-white/20">Checker</span>
            </h1>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
              Physique & Personality Evaluator
            </p>
          </motion.div>
        </header>

        <main>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.section
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-6 h-6 text-white" />
                  <h2 className="text-2xl font-display uppercase">Basic Stats</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-white/50">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-white/50">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="e.g. 180"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-white/50">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="e.g. 85"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="brutal-button mt-8 w-full flex items-center justify-center gap-2"
                >
                  Next: Physical Power <ChevronRight className="w-4 h-4" />
                </button>
              </motion.section>
            )}

            {step === 2 && (
              <motion.section
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Dumbbell className="w-6 h-6 text-white" />
                  <h2 className="text-2xl font-display uppercase">Physical Power</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-white/50">Max Pushups</label>
                    <input
                      type="number"
                      name="pushups"
                      value={formData.pushups}
                      onChange={handleChange}
                      placeholder="e.g. 50"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-white/50">Bench Press Max (kg)</label>
                    <input
                      type="number"
                      name="benchPress"
                      value={formData.benchPress}
                      onChange={handleChange}
                      placeholder="e.g. 100"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-white/50">Gym Frequency</label>
                    <select
                      name="gymFrequency"
                      value={formData.gymFrequency}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-white/40 transition-colors appearance-none"
                    >
                      <option value="None">None</option>
                      <option value="1-2 times/week">1-2 times/week</option>
                      <option value="3-4 times/week">3-4 times/week</option>
                      <option value="5-6 times/week">5-6 times/week</option>
                      <option value="Daily">Daily</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-white/50">Protein Intake</label>
                    <select
                      name="proteinIntake"
                      value={formData.proteinIntake}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-white/40 transition-colors appearance-none"
                    >
                      <option value="Low">Low</option>
                      <option value="Moderate">Moderate</option>
                      <option value="High">High (Bodybuilder level)</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-white/10 rounded-lg font-display uppercase py-2 hover:bg-white/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="brutal-button flex-[2] flex items-center justify-center gap-2"
                  >
                    Next: Personality <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.section>
            )}

            {step === 3 && (
              <motion.section
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-6 h-6 text-white" />
                  <h2 className="text-2xl font-display uppercase">Personality Traits</h2>
                </div>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-mono uppercase text-white/50">Confidence</label>
                      <span className="text-xs font-mono text-white">{formData.confidence}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.confidence}
                      onChange={(e) => handleSliderChange('confidence', parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-mono uppercase text-white/50">Dominance</label>
                      <span className="text-xs font-mono text-white">{formData.dominance}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.dominance}
                      onChange={(e) => handleSliderChange('dominance', parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-mono uppercase text-white/50">Leadership</label>
                      <span className="text-xs font-mono text-white">{formData.leadership}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.leadership}
                      onChange={(e) => handleSliderChange('leadership', parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border border-white/10 rounded-lg font-display uppercase py-2 hover:bg-white/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="brutal-button flex-[2] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>Evaluating... <Loader2 className="w-4 h-4 animate-spin" /></>
                    ) : (
                      <>Calculate Jhota Score <Trophy className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </motion.section>
            )}

            {step === 4 && result && (
              <motion.section
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div style={{ perspective: '1000px' }} className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCardIndex}
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 14 }}
                      className="glass-card p-8 border-white/20 relative overflow-hidden min-h-[400px] flex flex-col"
                    >
                      <div className="absolute top-0 right-0 p-4">
                        <Flame className="w-12 h-12 text-white/10 animate-pulse" />
                      </div>

                      <h3 className="text-2xl font-display uppercase mb-6 pr-12 text-white/90">
                        {result[currentCardIndex].title}
                      </h3>

                      <div className="prose prose-invert max-w-none markdown-body flex-grow">
                        <Markdown>{result[currentCardIndex].content}</Markdown>
                      </div>

                      <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/10">
                        <span className="text-xs font-mono text-white/40">
                          {currentCardIndex + 1} / {result.length}
                        </span>

                        <div className="flex gap-2 relative z-10">
                          <button
                            onClick={() => setCurrentCardIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentCardIndex === 0}
                            className="p-2 border border-white/20 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                          >
                            <ChevronRight className="w-5 h-5 rotate-180" />
                          </button>
                          <button
                            onClick={() => setCurrentCardIndex(prev => Math.min(result.length - 1, prev + 1))}
                            disabled={currentCardIndex === result.length - 1}
                            className="p-2 border border-white/20 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {currentCardIndex === result.length - 1 && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={reset}
                    className="w-full border border-white/20 rounded-lg py-3 font-display uppercase flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
                  >
                    <RefreshCcw className="w-4 h-4" /> Re-Evaluate
                  </motion.button>
                )}

                {/* Fun Badge */}
                <div className="flex justify-center mt-6">
                  <div className="bg-white text-black px-4 py-1 font-mono text-[10px] uppercase tracking-widest rounded-full">
                    Official Jhota Certification System v1.0
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </main>

        {/* Footer Info */}
        <footer className="mt-12 text-center text-white/30 font-mono text-[10px] uppercase tracking-widest">
          <p>Built for the strong. Powered by Gemini AI.</p>
        </footer>
      </div>
    </div>
  );
}
