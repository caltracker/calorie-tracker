import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function CalorieTracker() {
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogin = () => {
    if (email && password) setUser({ email });
  };

  const handleLogout = () => {
    setUser(null);
    setHistory([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString();
    const macroCalories =
      parseInt(protein || 0) * 4 + parseInt(carbs || 0) * 4 + parseInt(fat || 0) * 9;
    const totalCalories = calories || macroCalories;

    setHistory([
      ...history,
      {
        date: today,
        calories: parseInt(totalCalories),
        protein: parseInt(protein || 0),
        carbs: parseInt(carbs || 0),
        fat: parseInt(fat || 0),
      },
    ]);
    setSubmitted(true);
  };

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-blue-100"} p-4`}>
        <Card
          className={`backdrop-blur-md border rounded-2xl shadow-xl p-6 w-full max-w-sm ${
            darkMode ? "bg-white/10 border-white/20 text-white" : "bg-white/30 border-white/40 text-blue-900"
          }`}
        >
          <CardContent>
            <h1 className="text-xl font-semibold mb-4 text-center">Sign In</h1>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <Button className="w-full" onClick={handleLogin}>
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 p-4 ${
        darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-sky-50 to-blue-100"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl"
      >
        <Card
          className={`backdrop-blur-md border shadow-xl rounded-2xl p-6 ${
            darkMode ? "bg-white/10 border-white/20" : "bg-white/30 border-white/40"
          }`}
        >
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h1 className={`text-2xl font-semibold text-center flex-grow ${darkMode ? "text-white" : "text-blue-900"}`}>
                Calorie & Macro Tracker
              </h1>
              <div className="flex gap-2 items-center">
                <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                  {darkMode ? "☀️" : "🌙"}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Calories (optional if macros provided)"
                className={`placeholder:text-blue-400 ${darkMode ? "bg-white/20 text-white" : "bg-white/60 text-blue-800"}`}
              />
              <div className="grid grid-cols-3 gap-4">
                <Input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  placeholder="Protein (g)"
                  className={`${darkMode ? "bg-white/20 text-white" : "bg-white/60 text-blue-800"}`}
                />
                <Input
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  placeholder="Carbs (g)"
                  className={`${darkMode ? "bg-white/20 text-white" : "bg-white/60 text-blue-800"}`}
                />
                <Input
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  placeholder="Fat (g)"
                  className={`${darkMode ? "bg-white/20 text-white" : "bg-white/60 text-blue-800"}`}
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Submit
              </Button>
            </form>

            {submitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center mt-4 ${darkMode ? "text-white" : "text-blue-900"}`}
              >
                Entry logged successfully.
              </motion.div>
            )}

            {history.length > 0 && (
              <div className="mt-6">
                <h2 className={`text-lg font-medium mb-2 ${darkMode ? "text-white" : "text-blue-900"}`}>
                  Calorie History
                </h2>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={history}>
                    <XAxis dataKey="date" stroke={darkMode ? "#fff" : "#000"} />
                    <YAxis stroke={darkMode ? "#fff" : "#000"} />
                    <Tooltip
                      contentStyle={{ backgroundColor: darkMode ? "#1f2937" : "#f9fafb", borderRadius: "0.5rem" }}
                      labelStyle={{ color: darkMode ? "#fff" : "#000" }}
                    />
                    <Line type="monotone" dataKey="calories" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
