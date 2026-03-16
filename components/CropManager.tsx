import React, { useState } from 'react';
import { Language, Crop } from '../types';

const PREDEFINED_CROPS = [
  // Leafy Greens
  { id: 'lettuce', nameEn: 'Butterhead Lettuce', nameHi: 'बटरहेड लेट्यूस', icon: '🥬', daysToHarvest: 45, phRange: '5.5 - 6.0', ecRange: '0.8 - 1.2' },
  { id: 'spinach', nameEn: 'Spinach', nameHi: 'पालक', icon: '🍃', daysToHarvest: 40, phRange: '5.5 - 6.5', ecRange: '1.2 - 1.8' },
  { id: 'kale', nameEn: 'Kale', nameHi: 'केल', icon: '🥬', daysToHarvest: 60, phRange: '5.5 - 6.5', ecRange: '1.2 - 2.0' },
  { id: 'arugula', nameEn: 'Arugula', nameHi: 'अरुगुला', icon: '🌿', daysToHarvest: 40, phRange: '6.0 - 6.5', ecRange: '0.8 - 1.2' },
  { id: 'bok_choy', nameEn: 'Bok Choy', nameHi: 'बोक चॉय', icon: '🥬', daysToHarvest: 45, phRange: '6.0 - 7.0', ecRange: '1.5 - 2.0' },
  { id: 'swiss_chard', nameEn: 'Swiss Chard', nameHi: 'स्विस चार्ड', icon: '🥬', daysToHarvest: 35, phRange: '6.0 - 6.5', ecRange: '1.8 - 2.3' },
  { id: 'mustard_greens', nameEn: 'Mustard Greens', nameHi: 'सरसों के पत्ते', icon: '🌿', daysToHarvest: 40, phRange: '6.0 - 6.5', ecRange: '1.2 - 2.4' },
  { id: 'fenugreek', nameEn: 'Fenugreek (Methi)', nameHi: 'मेथी', icon: '🌿', daysToHarvest: 30, phRange: '5.5 - 6.5', ecRange: '1.0 - 1.6' },
  { id: 'celery_leaves', nameEn: 'Celery leaves', nameHi: 'अजवाइन के पत्ते', icon: '🌿', daysToHarvest: 90, phRange: '6.0 - 6.5', ecRange: '1.8 - 2.4' },

  // Flowering Vegetables
  { id: 'tomato', nameEn: 'Tomato', nameHi: 'टमाटर', icon: '🍅', daysToHarvest: 80, phRange: '5.5 - 6.5', ecRange: '2.0 - 3.5' },
  { id: 'cherry_tomato', nameEn: 'Cherry Tomatoes', nameHi: 'चेरी टमाटर', icon: '🍅', daysToHarvest: 70, phRange: '5.5 - 6.5', ecRange: '2.0 - 3.5' },
  { id: 'bell_pepper', nameEn: 'Bell Pepper (Capsicum)', nameHi: 'शिमला मिर्च', icon: '🫑', daysToHarvest: 75, phRange: '5.5 - 6.5', ecRange: '2.0 - 2.5' },
  { id: 'chili_pepper', nameEn: 'Chili Pepper', nameHi: 'मिर्च', icon: '🌶️', daysToHarvest: 80, phRange: '5.5 - 6.5', ecRange: '2.0 - 2.5' },
  { id: 'cucumber', nameEn: 'Cucumber', nameHi: 'खीरा', icon: '🥒', daysToHarvest: 60, phRange: '5.5 - 6.0', ecRange: '1.7 - 2.5' },
  { id: 'zucchini', nameEn: 'Zucchini', nameHi: 'तोरी (Zucchini)', icon: '🥒', daysToHarvest: 60, phRange: '6.0 - 6.5', ecRange: '1.8 - 2.4' },
  { id: 'eggplant', nameEn: 'Eggplant (Brinjal)', nameHi: 'बैंगन', icon: '🍆', daysToHarvest: 90, phRange: '5.5 - 6.5', ecRange: '2.5 - 3.5' },
  { id: 'strawberry', nameEn: 'Strawberry', nameHi: 'स्ट्रॉबेरी', icon: '🍓', daysToHarvest: 90, phRange: '5.5 - 6.2', ecRange: '1.0 - 1.4' },
  { id: 'okra', nameEn: 'Okra (Bhindi)', nameHi: 'भिंडी', icon: '🌿', daysToHarvest: 60, phRange: '6.0 - 6.5', ecRange: '2.0 - 2.4' },

  // Root Vegetables
  { id: 'radish', nameEn: 'Radish', nameHi: 'मूली', icon: '🪴', daysToHarvest: 30, phRange: '6.0 - 7.0', ecRange: '1.2 - 2.0' },
  { id: 'carrot', nameEn: 'Carrot', nameHi: 'गाजर', icon: '🥕', daysToHarvest: 70, phRange: '6.0 - 6.5', ecRange: '1.5 - 2.0' },
  { id: 'beetroot', nameEn: 'Beetroot', nameHi: 'चुकंदर', icon: '🪴', daysToHarvest: 60, phRange: '6.0 - 6.5', ecRange: '1.8 - 2.5' },
  { id: 'turnip', nameEn: 'Turnip', nameHi: 'शलजम', icon: '🪴', daysToHarvest: 50, phRange: '6.0 - 6.5', ecRange: '1.8 - 2.4' },
  { id: 'onion', nameEn: 'Onion', nameHi: 'प्याज', icon: '🧅', daysToHarvest: 90, phRange: '6.0 - 6.7', ecRange: '1.4 - 1.8' },
  { id: 'garlic', nameEn: 'Garlic', nameHi: 'लहसुन', icon: '🧄', daysToHarvest: 120, phRange: '6.0 - 6.5', ecRange: '1.4 - 1.8' },
  { id: 'ginger', nameEn: 'Ginger', nameHi: 'अदरक', icon: '🪴', daysToHarvest: 300, phRange: '5.5 - 6.5', ecRange: '2.0 - 2.5' },

  // Herbs
  { id: 'coriander', nameEn: 'Coriander (Cilantro)', nameHi: 'धनिया', icon: '🌿', daysToHarvest: 45, phRange: '6.5 - 6.7', ecRange: '1.2 - 1.8' },
  { id: 'mint', nameEn: 'Mint', nameHi: 'पुदीना', icon: '🌿', daysToHarvest: 60, phRange: '5.5 - 6.0', ecRange: '2.0 - 2.4' },
  { id: 'basil', nameEn: 'Sweet Basil', nameHi: 'मीठी तुलसी', icon: '🌿', daysToHarvest: 45, phRange: '5.5 - 6.5', ecRange: '1.0 - 1.6' },
  { id: 'parsley', nameEn: 'Parsley', nameHi: 'अजमोद (Parsley)', icon: '🌿', daysToHarvest: 70, phRange: '5.5 - 6.0', ecRange: '0.8 - 1.8' },
  { id: 'dill', nameEn: 'Dill', nameHi: 'सोया (Dill)', icon: '🌿', daysToHarvest: 45, phRange: '5.5 - 6.5', ecRange: '1.0 - 1.6' },
  { id: 'oregano', nameEn: 'Oregano', nameHi: 'अजवायन की पत्ती (Oregano)', icon: '🌿', daysToHarvest: 90, phRange: '6.0 - 7.0', ecRange: '1.5 - 2.0' },
  { id: 'thyme', nameEn: 'Thyme', nameHi: 'थाइम', icon: '🌿', daysToHarvest: 90, phRange: '5.5 - 7.0', ecRange: '0.8 - 1.5' },
  { id: 'rosemary', nameEn: 'Rosemary', nameHi: 'रोजमेरी', icon: '🌿', daysToHarvest: 100, phRange: '5.5 - 6.0', ecRange: '1.0 - 1.6' },
  { id: 'lemon_balm', nameEn: 'Lemon Balm', nameHi: 'लेमन बाम', icon: '🌿', daysToHarvest: 70, phRange: '5.5 - 6.5', ecRange: '1.0 - 1.6' },
  { id: 'sage', nameEn: 'Sage', nameHi: 'सेज', icon: '🌿', daysToHarvest: 80, phRange: '5.5 - 6.5', ecRange: '1.0 - 1.6' },
  { id: 'lavender', nameEn: 'Lavender', nameHi: 'लैवेंडर', icon: '🪻', daysToHarvest: 100, phRange: '6.4 - 6.8', ecRange: '1.0 - 1.4' },
  { id: 'stevia', nameEn: 'Stevia', nameHi: 'स्टीविया', icon: '🌿', daysToHarvest: 100, phRange: '6.5 - 7.5', ecRange: '1.0 - 1.5' },

  // Microgreens
  { id: 'microgreens', nameEn: 'Microgreens', nameHi: 'माइक्रोग्रीन्स', icon: '🌱', daysToHarvest: 14, phRange: '5.5 - 6.5', ecRange: '0.5 - 1.0' },
];

const DateInput = ({ value, onChange, className }: { value: string, onChange: (val: string) => void, className: string }) => {
  const [isFocused, setIsFocused] = useState(false);

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <input
      type={isFocused ? "date" : "text"}
      value={isFocused ? value : formatDateForDisplay(value)}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={className}
      placeholder="DD-MM-YYYY"
      required
    />
  );
};

const CropManager: React.FC<{ language: Language, crops: Crop[], setCrops: React.Dispatch<React.SetStateAction<Crop[]>> }> = ({ language, crops, setCrops }) => {
  const t = {
    en: {
      title: "Active Crops",
      sub: "Manage and track your current hydroponic crops.",
      addCrop: "+ Add New Crop",
      stage: "Stage",
      planted: "Planted",
      harvest: "Est. Harvest",
      health: "Health",
      system: "System",
      ph: "Optimal pH",
      ec: "Optimal EC",
      daysLeft: "days left",
      progress: "Progress",
      delete: "Delete",
      cancel: "Cancel",
      save: "Save Crop",
      selectCrop: "Select Crop",
      customCrop: "Other (Custom)",
      cropName: "Crop Name",
      systemType: "System Type",
      plantedDate: "Planted Date",
      harvestDate: "Estimated Harvest Date",
      stages: {
        seedling: "Seedling",
        vegetative: "Vegetative",
        flowering: "Flowering",
        fruiting: "Fruiting",
        harvesting: "Harvesting"
      },
      healthStatus: {
        excellent: "Excellent",
        good: "Good",
        fair: "Fair",
        poor: "Poor"
      }
    },
    hi: {
      title: "सक्रिय फसलें",
      sub: "अपनी वर्तमान हाइड्रोपोनिक फसलों का प्रबंधन और ट्रैक करें।",
      addCrop: "+ नई फसल जोड़ें",
      stage: "चरण",
      planted: "लगाया गया",
      harvest: "संभावित कटाई",
      health: "स्वास्थ्य",
      system: "सिस्टम",
      ph: "आदर्श pH",
      ec: "आदर्श EC",
      daysLeft: "दिन शेष",
      progress: "प्रगति",
      delete: "हटाएं",
      cancel: "रद्द करें",
      save: "फसल सेव करें",
      selectCrop: "फसल चुनें",
      customCrop: "अन्य (कस्टम)",
      cropName: "फसल का नाम",
      systemType: "सिस्टम का प्रकार",
      plantedDate: "लगाने की तारीख",
      harvestDate: "संभावित कटाई की तारीख",
      stages: {
        seedling: "अंकुर",
        vegetative: "वानस्पतिक",
        flowering: "फूल आना",
        fruiting: "फल आना",
        harvesting: "कटाई"
      },
      healthStatus: {
        excellent: "उत्कृष्ट",
        good: "अच्छा",
        fair: "सामान्य",
        poor: "खराब"
      }
    }
  }[language];

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCrop, setNewCrop] = useState({
    presetId: '',
    name: '',
    system: 'NFT Channels',
    plantedDate: new Date().toISOString().split('T')[0],
    harvestDate: '',
    phRange: '',
    ecRange: '',
    icon: '🌱'
  });

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'custom' || val === '') {
      setNewCrop({ ...newCrop, presetId: val, name: '', harvestDate: '', phRange: '', ecRange: '', icon: '🌱' });
    } else {
      const preset = PREDEFINED_CROPS.find(c => c.id === val);
      if (preset) {
        const planted = new Date(newCrop.plantedDate);
        const harvest = new Date(planted);
        harvest.setDate(harvest.getDate() + preset.daysToHarvest);
        
        setNewCrop({
          ...newCrop,
          presetId: val,
          name: language === 'en' ? preset.nameEn : preset.nameHi,
          harvestDate: harvest.toISOString().split('T')[0],
          phRange: preset.phRange,
          ecRange: preset.ecRange,
          icon: preset.icon
        });
      }
    }
  };

  const handleDelete = (id: number) => {
    setCrops(crops.filter(c => c.id !== id));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCrop.name || !newCrop.harvestDate) return;

    const harvest = new Date(newCrop.harvestDate);
    const planted = new Date(newCrop.plantedDate);
    const today = new Date();
    
    const totalDays = (harvest.getTime() - planted.getTime()) / (1000 * 3600 * 24);
    const daysPassed = (today.getTime() - planted.getTime()) / (1000 * 3600 * 24);
    const progress = Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));
    const daysLeft = Math.ceil((harvest.getTime() - today.getTime()) / (1000 * 3600 * 24));

    const crop = {
      id: Date.now(),
      name: newCrop.name,
      icon: newCrop.icon,
      stage: progress < 20 ? "seedling" : progress < 60 ? "vegetative" : "flowering",
      plantedDate: newCrop.plantedDate,
      harvestDate: newCrop.harvestDate,
      daysLeft: daysLeft > 0 ? daysLeft : 0,
      progress: progress || 0,
      health: "excellent",
      system: newCrop.system,
      phRange: newCrop.phRange || "5.5 - 6.5",
      ecRange: newCrop.ecRange || "1.0 - 2.0"
    };

    setCrops([crop, ...crops]);
    setShowAddForm(false);
    setNewCrop({
      presetId: '',
      name: '',
      system: 'NFT Channels',
      plantedDate: new Date().toISOString().split('T')[0],
      harvestDate: '',
      phRange: '',
      ecRange: '',
      icon: '🌱'
    });
  };

  const getHealthColor = (health: string) => {
    switch(health) {
      case 'excellent': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'good': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'fair': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'poor': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{t.title}</h2>
          <p className="text-slate-500 text-sm mt-1">{t.sub}</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm transition-colors"
        >
          {t.addCrop}
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-slate-800 mb-4">{t.addCrop}</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.selectCrop}</label>
                <select 
                  value={newCrop.presetId}
                  onChange={handlePresetChange}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                  required
                >
                  <option value="">-- {t.selectCrop} --</option>
                  {PREDEFINED_CROPS.map(c => (
                    <option key={c.id} value={c.id}>{language === 'en' ? c.nameEn : c.nameHi}</option>
                  ))}
                  <option value="custom">{t.customCrop}</option>
                </select>
              </div>
              
              {newCrop.presetId === 'custom' && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.cropName}</label>
                  <input 
                    type="text" 
                    required
                    value={newCrop.name}
                    onChange={e => setNewCrop({...newCrop, name: e.target.value})}
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                    placeholder="e.g. Cherry Tomatoes"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.systemType}</label>
                <select 
                  value={newCrop.system}
                  onChange={e => setNewCrop({...newCrop, system: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option>NFT Channels</option>
                  <option>DWC Tubs</option>
                  <option>Ebb & Flow</option>
                  <option>Dutch Buckets</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.plantedDate}</label>
                  <DateInput 
                    value={newCrop.plantedDate}
                    onChange={(newDate) => {
                      let newHarvest = newCrop.harvestDate;
                      if (newCrop.presetId && newCrop.presetId !== 'custom') {
                        const preset = PREDEFINED_CROPS.find(c => c.id === newCrop.presetId);
                        if (preset) {
                          const planted = new Date(newDate);
                          if (!isNaN(planted.getTime())) {
                            const harvest = new Date(planted);
                            harvest.setDate(harvest.getDate() + preset.daysToHarvest);
                            newHarvest = harvest.toISOString().split('T')[0];
                          }
                        }
                      }
                      setNewCrop({...newCrop, plantedDate: newDate, harvestDate: newHarvest});
                    }}
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.harvestDate}</label>
                  <DateInput 
                    value={newCrop.harvestDate}
                    onChange={(val) => setNewCrop({...newCrop, harvestDate: val})}
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              {newCrop.presetId === 'custom' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.ph}</label>
                    <input 
                      type="text" 
                      value={newCrop.phRange}
                      onChange={e => setNewCrop({...newCrop, phRange: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                      placeholder="e.g. 5.5 - 6.5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.ec}</label>
                    <input 
                      type="text" 
                      value={newCrop.ecRange}
                      onChange={e => setNewCrop({...newCrop, ecRange: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                      placeholder="e.g. 1.0 - 2.0"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  {t.cancel}
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {crops.map(crop => (
          <div key={crop.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative group">
            <button 
              onClick={() => handleDelete(crop.id)}
              className="absolute top-4 right-4 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
              title={t.delete}
            >
              🗑️
            </button>
            <div className="flex justify-between items-start mb-4 pr-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-slate-100">
                  {crop.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800">{crop.name}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{t.system}: {crop.system}</p>
                </div>
              </div>
              <div className="relative">
                <select 
                  value={crop.health}
                  onChange={(e) => {
                    const newHealth = e.target.value as Crop['health'];
                    setCrops(crops.map(c => c.id === crop.id ? { ...c, health: newHealth } : c));
                  }}
                  className={`pl-3 pr-6 py-1 rounded-lg text-[10px] font-bold uppercase border outline-none cursor-pointer appearance-none text-center ${getHealthColor(crop.health)}`}
                >
                  <option value="excellent">{t.healthStatus.excellent}</option>
                  <option value="good">{t.healthStatus.good}</option>
                  <option value="fair">{t.healthStatus.fair}</option>
                  <option value="poor">{t.healthStatus.poor}</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] opacity-50">
                  ▼
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t.planted}</p>
                <p className="text-sm font-semibold text-slate-700">{formatDate(crop.plantedDate)}</p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">{t.harvest}</p>
                <p className="text-sm font-black text-emerald-800">{formatDate(crop.harvestDate)}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{t.stage}</p>
                  <p className="text-sm font-bold text-slate-700">{t.stages[crop.stage as keyof typeof t.stages]}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-emerald-600">{crop.daysLeft}</span>
                  <span className="text-xs font-bold text-slate-400 ml-1">{t.daysLeft}</span>
                </div>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${crop.progress > 80 ? 'bg-emerald-500' : crop.progress > 40 ? 'bg-blue-500' : 'bg-amber-500'}`}
                  style={{ width: `${crop.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
              <div className="flex-1 flex items-center gap-2">
                <span className="text-lg">🧪</span>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">{t.ph}</p>
                  <p className="text-xs font-bold text-slate-700">{crop.phRange}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">{t.ec}</p>
                  <p className="text-xs font-bold text-slate-700">{crop.ecRange}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropManager;
