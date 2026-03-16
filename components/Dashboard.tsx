
import React, { useState, useEffect } from 'react';
import { AppView, Language, Crop } from '../types';

const Dashboard: React.FC<{ language: Language, setActiveView?: (view: AppView) => void, crops?: Crop[] }> = ({ language, setActiveView, crops = [] }) => {
  const [ph, setPh] = useState(6.1);
  const [ec, setEc] = useState(1.8);
  const [temp, setTemp] = useState(24.0);
  const [vpd, setVpd] = useState(1.1);

  const [tasks, setTasks] = useState([
    { id: 1, done: false },
    { id: 2, done: false },
    { id: 3, done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const activeCropsCount = crops.length;
  
  // Find the crop closest to harvest
  const nextHarvestCrop = crops.length > 0 
    ? [...crops].sort((a, b) => a.daysLeft - b.daysLeft)[0]
    : null;

  const t = {
    en: {
      welcome: "Grower Dashboard",
      sub: "Live system metrics for your hydroponic farm.",
      status: "System: Operational",
      harvestTitle: "Harvest Countdown",
      harvestDays: "Days Left",
      noCrops: "No active crops",
      ph: "pH Level",
      phStatus: "Optimal",
      ec: "EC (Nutrient Strength)",
      ecStatus: "Check Level",
      temp: "Water Temp",
      tempStatus: "Normal",
      humidity: "VPD (Humidity)",
      humidityStatus: "Optimal",
      lightTitle: "Light Cycle",
      lightStatus: "ON (14h / 10h)",
      proTipTitle: "Expert Insight",
      proTipBody: "VPD (Vapor Pressure Deficit) is at 1.1 kPa. This is the sweet spot for maximum transpiration. Keep humidity stable.",
      activeSystem: "Active System: NFT Channels",
      lastFlush: "Last Flush: 4 Days ago",
      nextFlush: "Next Flush: In 3 Days",
      tasksTitle: "Critical Tasks",
      task1: "Check for root slime",
      task2: "Recalibrate pH probe",
      task3: "Top up Solution A",
      activeCrops: "Active Crops",
      viewAllCrops: "View All Crops →",
      healthOverview: "Health Overview",
      excellent: "Excellent",
      good: "Good",
      fair: "Fair",
      poor: "Poor"
    },
    hi: {
      welcome: "ग्रोअर डैशबोर्ड",
      sub: "आपके हाइड्रोपोनिक फार्म के लाइव आंकड़े।",
      status: "सिस्टम: चालू है",
      harvestTitle: "फसल कटाई का समय",
      harvestDays: "दिन शेष",
      noCrops: "कोई सक्रिय फसल नहीं",
      ph: "pH लेवल",
      phStatus: "बेहतरीन",
      ec: "EC (पोषक तत्वों की ताकत)",
      ecStatus: "लेवल चेक करें",
      temp: "पानी का तापमान",
      tempStatus: "सामान्य",
      humidity: "VPD (नमी)",
      humidityStatus: "बेहतरीन",
      lightTitle: "लाइट साइकिल",
      lightStatus: "चालू (14h / 10h)",
      proTipTitle: "विशेषज्ञ की सलाह",
      proTipBody: "VPD 1.1 kPa पर है। यह पौधों के विकास के लिए सबसे अच्छा स्तर है। नमी को स्थिर रखें।",
      activeSystem: "सक्रिय सिस्टम: NFT चैनल्स",
      lastFlush: "पिछला फ्लश: 4 दिन पहले",
      nextFlush: "अगला फ्लश: 3 दिन में",
      tasksTitle: "महत्वपूर्ण कार्य",
      task1: "जड़ों की जांच करें",
      task2: "pH प्रोब को सही करें",
      task3: "Solution A को भरें",
      activeCrops: "सक्रिय फसलें",
      viewAllCrops: "सभी फसलें देखें →",
      healthOverview: "स्वास्थ्य अवलोकन",
      excellent: "उत्कृष्ट",
      good: "अच्छा",
      fair: "सामान्य",
      poor: "खराब"
    }
  }[language];

  const healthCounts = {
    excellent: crops.filter(c => c.health === 'excellent').length,
    good: crops.filter(c => c.health === 'good').length,
    fair: crops.filter(c => c.health === 'fair').length,
    poor: crops.filter(c => c.health === 'poor').length,
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Section */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">{t.status}</span>
            </div>
            <h2 className="text-4xl font-black mb-2 tracking-tight">{t.welcome}</h2>
            <p className="text-slate-400 text-sm font-medium max-w-md leading-relaxed">{t.sub}</p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <div 
                onClick={() => setActiveView && setActiveView(AppView.CROPS)}
                className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-4 cursor-pointer backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-xl">
                  🌿
                </div>
                <div>
                  <div className="text-2xl font-black leading-none">{activeCropsCount}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{t.activeCrops}</div>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-4 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-xl">
                  💧
                </div>
                <div>
                  <div className="text-sm font-bold leading-none mb-1">{t.lastFlush}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.nextFlush}</div>
                </div>
              </div>
            </div>
          </div>
          
          {nextHarvestCrop ? (
            <div 
              onClick={() => setActiveView && setActiveView(AppView.CROPS)}
              className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-6 border border-emerald-400/30 min-w-[280px] cursor-pointer hover:shadow-lg hover:shadow-emerald-500/20 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm shadow-inner">
                    {nextHarvestCrop.icon}
                  </span>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-50">{t.harvestTitle}</p>
                </div>
                <span className="text-xs font-bold opacity-80 group-hover:translate-x-1 transition-transform">→</span>
              </div>
              
              <h3 className="text-2xl font-black mb-1">{nextHarvestCrop.name}</h3>
              
              <div className="mt-4 flex items-end justify-between">
                 <div className="flex items-baseline gap-1">
                   <span className="text-4xl font-black">{nextHarvestCrop.daysLeft}</span>
                   <span className="text-sm font-bold text-emerald-100">{t.harvestDays}</span>
                 </div>
              </div>
              
              <div className="w-full h-2 bg-black/20 rounded-full mt-4 overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full relative"
                  style={{ width: `${nextHarvestCrop.progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/50"></div>
                </div>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => setActiveView && setActiveView(AppView.CROPS)}
              className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 min-w-[280px] cursor-pointer hover:bg-white/10 transition-colors flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-2xl mb-3">
                🌱
              </div>
              <p className="text-lg font-bold text-slate-300">{t.noCrops}</p>
              <p className="text-xs text-slate-500 mt-1">{t.viewAllCrops}</p>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t.ph, val: ph.toFixed(2), status: ph > 6.5 ? "High" : ph < 5.5 ? "Low" : t.phStatus, color: ph > 6.5 || ph < 5.5 ? "red" : "emerald", icon: "🧪" },
          { label: t.ec, val: ec.toFixed(2), status: ec > 2.5 ? "High" : ec < 1.0 ? "Low" : t.ecStatus, color: ec > 2.5 || ec < 1.0 ? "red" : "blue", icon: "⚡" },
          { label: t.temp, val: `${temp.toFixed(1)}°C`, status: temp > 28 ? "High" : temp < 18 ? "Low" : t.tempStatus, color: temp > 28 || temp < 18 ? "red" : "sky", icon: "🌡️" },
          { label: t.humidity, val: `${vpd.toFixed(2)} kPa`, status: vpd > 1.5 ? "High" : vpd < 0.8 ? "Low" : t.humidityStatus, color: vpd > 1.5 || vpd < 0.8 ? "red" : "orange", icon: "☁️" },
        ].map((m, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-full bg-${m.color}-50 flex items-center justify-center text-${m.color}-600`}>
                {m.icon}
              </div>
              <span className={`text-[10px] font-black uppercase text-${m.color}-600 tracking-wider bg-${m.color}-50 px-2 py-1 rounded-md`}>{m.label}</span>
            </div>
            <p className="text-3xl font-black text-slate-800 tracking-tight">{m.val}</p>
            <div className="mt-3 flex items-center space-x-1.5">
              <span className={`w-2 h-2 rounded-full bg-${m.color}-500 ${m.color === 'emerald' || m.color === 'blue' || m.color === 'sky' || m.color === 'orange' ? 'animate-pulse' : ''}`}></span>
              <span className="text-xs font-bold text-slate-500">{m.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Pro Tip & Health Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pro Tip Section */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border border-amber-100 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="flex items-start space-x-4 relative z-10">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-amber-100 shrink-0">
                💡
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-slate-800 text-lg">{t.proTipTitle}</h3>
                  <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded-full">AI Insight</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium mt-2">
                  {t.proTipBody}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <button className="text-xs font-bold text-amber-700 uppercase hover:text-amber-800 flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-sm transition-colors">
                    <span>Adjust Environment</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Health Overview */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-slate-800 text-lg">{t.healthOverview}</h3>
              <button 
                onClick={() => setActiveView && setActiveView(AppView.CROPS)}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-wider"
              >
                {t.viewAllCrops}
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-black text-emerald-600 mb-1">{healthCounts.excellent}</div>
                <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">{t.excellent}</div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-black text-blue-600 mb-1">{healthCounts.good}</div>
                <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">{t.good}</div>
              </div>
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-black text-amber-600 mb-1">{healthCounts.fair}</div>
                <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">{t.fair}</div>
              </div>
              <div className="bg-red-50 rounded-2xl p-4 border border-red-100 flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-black text-red-600 mb-1">{healthCounts.poor}</div>
                <div className="text-[10px] font-bold text-red-800 uppercase tracking-wider">{t.poor}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Status/Tasks Sidebar */}
        <div className="space-y-6">
           <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-xl">☀️</span>
                  <h3 className="font-bold text-sm uppercase tracking-wider text-slate-300">{t.lightTitle}</h3>
                </div>
                <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full shadow-[0_0_12px_rgba(250,204,21,0.6)] animate-pulse"></span>
              </div>
              <p className="text-2xl font-black mb-1 relative z-10">{t.lightStatus}</p>
              <p className="text-xs text-slate-400 font-medium relative z-10">Schedule: Auto-timer active</p>
              
              <div className="mt-6 pt-6 border-t border-white/10 relative z-10">
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                  <span>06:00</span>
                  <span>20:00</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-400 w-2/3"></div>
                </div>
              </div>
           </div>

           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-slate-800 text-lg">{t.tasksTitle}</h3>
                <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-md">{tasks.filter(t => !t.done).length} Pending</span>
              </div>
              <div className="space-y-3">
                {tasks.map((task, idx) => (
                  <div 
                    key={task.id} 
                    onClick={() => toggleTask(task.id)} 
                    className={`flex items-center space-x-3 group cursor-pointer p-3 rounded-xl transition-all ${task.done ? 'bg-slate-50' : 'bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-sm'}`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${task.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 group-hover:border-emerald-500'}`}>
                      {task.done && <span className="text-xs">✓</span>}
                    </div>
                    <span className={`text-sm font-bold transition-colors ${task.done ? 'text-slate-400 line-through' : 'text-slate-700 group-hover:text-emerald-700'}`}>
                      {[t.task1, t.task2, t.task3][idx]}
                    </span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
