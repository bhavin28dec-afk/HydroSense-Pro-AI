
import React, { useState } from 'react';
import { Language } from '../types';

const DailyChecklist: React.FC<{ language: Language }> = ({ language }) => {
  const t = {
    en: {
      title: "Growth Log 📅",
      sub: "Consistency is the bridge between seedlings and harvest.",
      completed: "COMPLETED",
      tasksLabel: "Tasks",
      addTitle: "Add Manual Entry",
      phLabel: "Current pH",
      ecLabel: "Current EC",
      saveBtn: "Save Reading",
      morning: "Morning",
      afternoon: "Afternoon",
      daily: "Daily",
      task1: "Measure pH Level",
      task2: "Check EC/TDS Strength",
      task3: "Verify Water Temperature",
      task4: "Inspect Roots for slime/browning",
      task5: "Check Pump Flow Rate",
    },
    hi: {
      title: "ग्रोथ लॉग 📅",
      sub: "नियमितता ही फसल की सफलता की कुंजी है।",
      completed: "पूरा हुआ",
      tasksLabel: "कार्य",
      addTitle: "मैन्युअल एंट्री जोड़ें",
      phLabel: "वर्तमान pH",
      ecLabel: "वर्तमान EC",
      saveBtn: "रीडिंग सेव करें",
      morning: "सुबह",
      afternoon: "दोपहर",
      daily: "रोजाना",
      task1: "pH लेवल की जांच करें",
      task2: "EC/TDS की ताकत चेक करें",
      task3: "पानी का तापमान देखें",
      task4: "जड़ों की जांच (फफूंद/पीलापन)",
      task5: "पंप फ्लो रेट चेक करें",
    }
  }[language];

  const [logs, setLogs] = useState([
    { id: 1, task: t.task1, done: false, time: t.morning },
    { id: 2, task: t.task2, done: false, time: t.morning },
    { id: 3, task: t.task3, done: false, time: t.afternoon },
    { id: 4, task: t.task4, done: false, time: t.daily },
    { id: 5, task: t.task5, done: false, time: t.daily },
  ]);

  // Handle language change for tasks - simple effect to update static labels
  React.useEffect(() => {
    setLogs(prev => [
      { ...prev[0], task: t.task1, time: t.morning },
      { ...prev[1], task: t.task2, time: t.morning },
      { ...prev[2], task: t.task3, time: t.afternoon },
      { ...prev[3], task: t.task4, time: t.daily },
      { ...prev[4], task: t.task5, time: t.daily },
    ]);
  }, [language]);

  const toggleLog = (id: number) => {
    setLogs(logs.map(l => l.id === id ? { ...l, done: !l.done } : l));
  };

  return (
    <div className="space-y-6">
      <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-1">{t.title}</h2>
        <p className="opacity-80 text-sm">{t.sub}</p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex-1 h-2 bg-emerald-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-400 transition-all duration-500" 
              style={{ width: `${(logs.filter(l => l.done).length / logs.length) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs font-bold">{logs.filter(l => l.done).length}/{logs.length} {t.tasksLabel}</span>
        </div>
      </div>

      <div className="space-y-3">
        {logs.map(log => (
          <div 
            key={log.id} 
            onClick={() => toggleLog(log.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
              log.done ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                log.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-300'
              }`}>
                {log.done && '✓'}
              </div>
              <div>
                <p className={`text-sm font-semibold ${log.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                  {log.task}
                </p>
                <p className="text-[10px] text-slate-400 font-medium uppercase">{log.time}</p>
              </div>
            </div>
            {log.done && <span className="text-[10px] text-emerald-600 font-bold">{t.completed}</span>}
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-slate-100 rounded-2xl">
        <h3 className="font-bold text-slate-800 mb-4">{t.addTitle}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-500 font-bold uppercase">{t.phLabel}</label>
            <input type="number" step="0.1" placeholder="6.0" className="w-full p-2 rounded-lg border border-slate-300 text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-500 font-bold uppercase">{t.ecLabel}</label>
            <input type="number" step="0.1" placeholder="1.8" className="w-full p-2 rounded-lg border border-slate-300 text-sm" />
          </div>
        </div>
        <button className="w-full mt-4 bg-slate-800 text-white py-2 rounded-lg text-sm font-bold">{t.saveBtn}</button>
      </div>
    </div>
  );
};

export default DailyChecklist;
