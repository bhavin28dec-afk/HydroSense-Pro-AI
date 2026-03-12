
import React from 'react';
import { Language } from '../types';

const Dashboard: React.FC<{ language: Language }> = ({ language }) => {
  const t = {
    en: {
      welcome: "Grower Dashboard",
      sub: "Live system metrics for your hydroponic farm.",
      status: "System: Operational",
      harvestTitle: "Harvest Countdown",
      harvestDays: "12 Days Left",
      harvestCrop: "Cherry Tomatoes",
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
    },
    hi: {
      welcome: "ग्रोअर डैशबोर्ड",
      sub: "आपके हाइड्रोपोनिक फार्म के लाइव आंकड़े।",
      status: "सिस्टम: चालू है",
      harvestTitle: "फसल कटाई का समय",
      harvestDays: "12 दिन शेष",
      harvestCrop: "चेरी टमाटर",
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
    }
  }[language];

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Section */}
      <div className="bg-emerald-800 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest uppercase opacity-80">{t.status}</span>
            </div>
            <h2 className="text-3xl font-black mb-1">{t.welcome}</h2>
            <p className="text-emerald-100/70 text-sm font-medium">{t.sub}</p>
            <div className="mt-4 flex gap-3">
              <span className="bg-white/10 px-3 py-1 rounded-lg text-[10px] font-bold border border-white/10">{t.activeSystem}</span>
              <span className="bg-white/10 px-3 py-1 rounded-lg text-[10px] font-bold border border-white/10">{t.lastFlush}</span>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[200px]">
            <p className="text-[10px] font-bold uppercase opacity-60 mb-1">{t.harvestTitle}</p>
            <p className="text-lg font-bold">{t.harvestCrop}</p>
            <div className="mt-3 flex items-end justify-between">
               <span className="text-2xl font-black">{t.harvestDays}</span>
               <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">🍅</div>
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-emerald-400 w-3/4"></div>
            </div>
          </div>
        </div>
        <div className="absolute left-[-40px] top-[-40px] opacity-5 text-[180px]">🌿</div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t.ph, val: "6.1", status: t.phStatus, color: "emerald", icon: "🧪" },
          { label: t.ec, val: "1.8", status: t.ecStatus, color: "blue", icon: "⚡" },
          { label: t.temp, val: "24°C", status: t.tempStatus, color: "sky", icon: "🌡️" },
          { label: t.humidity, val: "1.1 kPa", status: t.humidityStatus, color: "orange", icon: "☁️" },
        ].map((m, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-black uppercase text-${m.color}-600 tracking-wider`}>{m.label}</span>
              <span className="text-sm">{m.icon}</span>
            </div>
            <p className="text-2xl font-black text-slate-800">{m.val}</p>
            <div className="mt-2 flex items-center space-x-1">
              <span className={`w-1.5 h-1.5 rounded-full bg-${m.color}-500`}></span>
              <span className="text-[10px] font-bold text-slate-400">{m.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pro Tip Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-xl">💡</div>
            <div>
              <h3 className="font-bold text-slate-800">{t.proTipTitle}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Plant Science Insight</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {t.proTipBody}
          </p>
          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
             <div className="flex space-x-2">
                <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded text-slate-500 uppercase">VPD 101</span>
                <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded text-slate-500 uppercase">Pro Grower</span>
             </div>
             <button className="text-[10px] font-bold text-emerald-600 uppercase hover:underline">Learn More →</button>
          </div>
        </div>

        {/* Status/Tasks Sidebar */}
        <div className="space-y-4">
           <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm uppercase tracking-wider">{t.lightTitle}</h3>
                <span className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></span>
              </div>
              <p className="text-xl font-black mb-1">{t.lightStatus}</p>
              <p className="text-[10px] text-slate-400 font-medium">Schedule: Auto-timer active</p>
           </div>

           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4">{t.tasksTitle}</h3>
              <div className="space-y-3">
                {[t.task1, t.task2, t.task3].map((task, idx) => (
                  <div key={idx} className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-5 h-5 rounded-full border-2 border-emerald-500 group-hover:bg-emerald-500 transition-colors"></div>
                    <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-700 transition-colors">{task}</span>
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
