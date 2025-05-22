import React from "react";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [ticker, setTicker] = useState("VOO");
  const [start, setStart] = useState("2019-01-01");
  const [end, setEnd] = useState("2024-01-01");
  const [weekday, setWeekday] = useState("Monday");
  const [investment, setInvestment] = useState(100);
  const [priceType, setPriceType] = useState("Open");
  const [results, setResults] = useState(null);

  const [dartkMode, setDarkMode] = useState(false);

  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      const res = await axios.get("https://investing-tool.onrender.com/weekday", {
        params: {
          ticker,
          start,
          end,
          weekday,
          investment,
          price_type: priceType,
        },
      });
      console.log("Data fetched successfully:", res.data);
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching simulation:", err);
    }
  };
  console.log("✅ results:", results);
  console.log("🧪 results?.Results:", results?.Results);
  console.log("💵 Invested:", results?.Results?.["Total Invested"]);  
  return (
    <div className="min-h-screen bg-blue-900 text-gray-900 p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-2 text-center text-blue-900">
          📈 Investment Strategy Simulator
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Analyze portfolio growth by weekday, ticker, and strategy
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ticker Symbol
            </label>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weekday
            </label>
            <select
              value={weekday}
              onChange={(e) => setWeekday(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                (day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weekly Investment ($)
            </label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Type
            </label>
            <select
              value={priceType}
              onChange={(e) => setPriceType(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Open">Open</option>
              <option value="Close">Close</option>
            </select>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={fetchData}
            className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Run Simulation
          </button>
        </div>

        {results?.Results && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-blue-700 text-center mb-4">
              {results.Weekday} Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
              <p><strong>Total Invested:</strong><br />${results.Results["Total Invested"].toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
                <p><strong>Total Shares:</strong><br />{results.Results["Total Shares"].toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
              <p><strong>Final Value:</strong><br />${results.Results["Final Value"].toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
                <p><strong>Return %:</strong><br />{results.Results["Return %"].toFixed(2)}%</p>
              </div>
            </div>
            <img
              src={`data:image/png;base64,${results.Results.Plot}`}
              alt="Portfolio Growth"
              className="mt-6 w-full rounded shadow"
            />
          </div>
        )}
      </div>
    </div>
  );
}
