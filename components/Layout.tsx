
import React, { ReactNode } from 'react';
import { AppView, Language, UserRole } from '../types';

interface LayoutProps {
  children: ReactNode;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  userRole: UserRole;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, language, setLanguage, userRole, onLogout }) => {
  const translations = {
    en: {
      DASHBOARD: 'Dashboard',
      CROPS: 'My Crops',
      PLANT_GUIDE: 'Plant Guide',
      DIAGNOSIS: 'AI Diagnosis',
      NUTRIENTS: 'Nutrients',
      CHECKLIST: 'Daily Log',
      PEST_CONTROL: 'Pest Control',
      ADMIN_SETTINGS: 'Admin Panel',
      climate: 'Climate',
      subTropical: 'Sub-Tropical (India)',
      logout: 'Logout'
    },
    hi: {
      DASHBOARD: 'डैशबोर्ड',
      CROPS: 'मेरी फसलें',
      PLANT_GUIDE: 'प्लांट गाइड',
      DIAGNOSIS: 'एआई जांच',
      NUTRIENTS: 'पोषक तत्व',
      CHECKLIST: 'डेली लॉग',
      PEST_CONTROL: 'कीट नियंत्रण',
      ADMIN_SETTINGS: 'एडमिन पैनल',
      climate: 'जलवायु',
      subTropical: 'उपोष्णकटिबंधीय (भारत)',
      logout: 'लॉग आउट'
    }
  };

  const t = translations[language];

  const navItems = [
    { id: AppView.DASHBOARD, label: t.DASHBOARD, icon: '📊' },
    { id: AppView.CROPS, label: t.CROPS, icon: '🌿' },
    { id: AppView.PLANT_GUIDE, label: t.PLANT_GUIDE, icon: '🌱' },
    { id: AppView.DIAGNOSIS, label: t.DIAGNOSIS, icon: '🔍' },
    { id: AppView.NUTRIENTS, label: t.NUTRIENTS, icon: '🧪' },
    { id: AppView.PEST_CONTROL, label: t.PEST_CONTROL, icon: '🐛' },
    { id: AppView.CHECKLIST, label: t.CHECKLIST, icon: '📝' },
  ];

  if (userRole === 'admin') {
    navItems.push({ id: AppView.ADMIN_SETTINGS, label: t.ADMIN_SETTINGS, icon: '🛡️' });
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-emerald-800 text-white shadow-xl">
        <div className="p-6 flex items-center space-x-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-2xl">🌿</div>
          <div>
            <span className="block text-lg font-bold tracking-tight leading-none">HydroSense</span>
            <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">AI Assistant</span>
          </div>
        </div>
        
        <nav className="mt-6 flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeView === item.id ? 'bg-emerald-700 text-white shadow-inner' : 'text-emerald-100 hover:bg-emerald-700/50'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-emerald-700 space-y-3">
           <div className="flex bg-emerald-900/50 rounded-lg p-1">
              <button 
                onClick={() => setLanguage('en')}
                className={`flex-1 py-1 text-[10px] font-bold rounded transition-all ${language === 'en' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-400 hover:text-emerald-200'}`}
              >EN</button>
              <button 
                onClick={() => setLanguage('hi')}
                className={`flex-1 py-1 text-[10px] font-bold rounded transition-all ${language === 'hi' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-400 hover:text-emerald-200'}`}
              >हिन्दी</button>
           </div>
           
           <button 
             onClick={onLogout}
             className="w-full flex items-center justify-center space-x-2 bg-emerald-900 hover:bg-emerald-950 text-emerald-200 py-2 rounded-lg text-xs font-bold transition-colors"
           >
             <span>🚪</span>
             <span>{t.logout}</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-4 md:px-8 justify-between shrink-0">
          <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="md:hidden">{navItems.find(i => i.id === activeView)?.icon}</span>
            {navItems.find(i => i.id === activeView)?.label}
          </h1>
          
          <div className="flex items-center space-x-3 md:space-x-4">
            <span className="text-xs text-slate-500 hidden sm:inline font-medium">{t.climate}: <span className="text-emerald-600 font-bold">{t.subTropical}</span></span>
            
            {/* Language Switcher for Mobile */}
            <div className="md:hidden flex bg-slate-100 rounded-lg p-1 border border-slate-200">
               <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-[10px] font-bold rounded ${language === 'en' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}>EN</button>
               <button onClick={() => setLanguage('hi')} className={`px-2 py-1 text-[10px] font-bold rounded ${language === 'hi' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}>हि</button>
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-100">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-md ${userRole === 'admin' ? 'bg-slate-800' : 'bg-emerald-500'}`}>
                 {userRole === 'admin' ? 'A' : 'U'}
               </div>
               <button onClick={onLogout} className="md:hidden text-slate-400 hover:text-slate-600 p-1">
                 <span className="text-xl">🚪</span>
               </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </div>

        {/* Mobile Nav */}
        <nav className="md:hidden bg-white border-t border-slate-200 flex justify-around p-2 pb-safe sticky bottom-0 z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center p-2 rounded-xl min-w-[60px] transition-colors ${
                activeView === item.id ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              <span className="text-xl mb-0.5">{item.icon}</span>
              <span className="text-[9px] font-bold">{item.label}</span>
            </button>
          ))}
          {/* If admin, show admin icon as 6th item or if space permits. For now, putting it here if user is admin */}
          {userRole === 'admin' && (
             <button
              onClick={() => setActiveView(AppView.ADMIN_SETTINGS)}
              className={`flex flex-col items-center p-2 rounded-xl min-w-[60px] transition-colors ${
                activeView === AppView.ADMIN_SETTINGS ? 'text-slate-800 bg-slate-100' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              <span className="text-xl mb-0.5">🛡️</span>
              <span className="text-[9px] font-bold">Admin</span>
            </button>
          )}
        </nav>
      </main>
    </div>
  );
};

export default Layout;
