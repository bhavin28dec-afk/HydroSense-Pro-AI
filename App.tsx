
import React, { useState } from 'react';
import { AppView, Language, UserRole } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlantDiagnosis from './components/PlantDiagnosis';
import PlantGuide from './components/PlantGuide';
import NutrientManager from './components/NutrientManager';
import DailyChecklist from './components/DailyChecklist';
import Login from './components/Login';
import AdminSettings from './components/AdminSettings';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [language, setLanguage] = useState<Language>('en');
  const [userRole, setUserRole] = useState<UserRole | null>(null);

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
        return <Dashboard language={language} />;
      case AppView.DIAGNOSIS:
        return <PlantDiagnosis language={language} />;
      case AppView.PLANT_GUIDE:
        return <PlantGuide language={language} />;
      case AppView.NUTRIENTS:
        return <NutrientManager language={language} />;
      case AppView.CHECKLIST:
        return <DailyChecklist language={language} />;
      case AppView.ADMIN_SETTINGS:
        return userRole === 'admin' ? <AdminSettings language={language} /> : <Dashboard language={language} />;
      default:
        return <Dashboard language={language} />;
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
