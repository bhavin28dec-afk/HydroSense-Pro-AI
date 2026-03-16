
import React, { useState } from 'react';
import { AppView, Language, UserRole, Crop } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlantDiagnosis from './components/PlantDiagnosis';
import PlantGuide from './components/PlantGuide';
import NutrientManager from './components/NutrientManager';
import DailyChecklist from './components/DailyChecklist';
import Login from './components/Login';
import AdminSettings from './components/AdminSettings';
import CropManager from './components/CropManager';
import PestControl from './components/PestControl';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [language, setLanguage] = useState<Language>('en');
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const [crops, setCrops] = useState<Crop[]>([
    {
      id: 1,
      name: "Cherry Tomatoes",
      icon: "🍅",
      stage: "fruiting",
      plantedDate: "2026-01-15",
      harvestDate: "2026-03-26",
      daysLeft: 12,
      progress: 85,
      health: "excellent",
      system: "NFT Channels",
      phRange: "5.5 - 6.5",
      ecRange: "2.0 - 3.5"
    },
    {
      id: 2,
      name: "Butterhead Lettuce",
      icon: "🥬",
      stage: "vegetative",
      plantedDate: "2026-02-20",
      harvestDate: "2026-04-05",
      daysLeft: 22,
      progress: 45,
      health: "good",
      system: "DWC Tubs",
      phRange: "5.5 - 6.0",
      ecRange: "0.8 - 1.2"
    },
    {
      id: 3,
      name: "Sweet Basil",
      icon: "🌿",
      stage: "harvesting",
      plantedDate: "2026-02-01",
      harvestDate: "2026-03-16",
      daysLeft: 2,
      progress: 95,
      health: "excellent",
      system: "Ebb & Flow",
      phRange: "5.5 - 6.5",
      ecRange: "1.0 - 1.6"
    }
  ]);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setActiveView(AppView.DASHBOARD); // Reset view on login
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case AppView.DASHBOARD:
        return <Dashboard language={language} setActiveView={setActiveView} crops={crops} />;
      case AppView.DIAGNOSIS:
        return <PlantDiagnosis language={language} />;
      case AppView.PLANT_GUIDE:
        return <PlantGuide language={language} />;
      case AppView.NUTRIENTS:
        return <NutrientManager language={language} />;
      case AppView.CHECKLIST:
        return <DailyChecklist language={language} />;
      case AppView.CROPS:
        return <CropManager language={language} crops={crops} setCrops={setCrops} />;
      case AppView.PEST_CONTROL:
        return <PestControl language={language} />;
      case AppView.ADMIN_SETTINGS:
        return userRole === 'admin' ? <AdminSettings language={language} /> : <Dashboard language={language} setActiveView={setActiveView} crops={crops} />;
      default:
        return <Dashboard language={language} setActiveView={setActiveView} crops={crops} />;
    }
  };

  return (
    <Layout 
      activeView={activeView} 
      setActiveView={setActiveView} 
      language={language} 
      setLanguage={setLanguage}
      userRole={userRole}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
