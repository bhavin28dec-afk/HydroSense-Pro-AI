
import React, { useState } from 'react';
import { getPlantGuide } from '../services/geminiService';
import { Language } from '../types';

const PlantGuide: React.FC<{ language: Language }> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState<string | null>(null);

  const t = {
    en: {
      title: "Hydroponic Master Guide 📚",
      sub: "Get exact nutrient salts, EC levels, and climate tips.",
      placeholder: "Enter plant (e.g., Tomato)...",
      btn: "Get Guide",
      proTitle: "Pro Knowledge Corner"
    },
    hi: {
      title: "हाइड्रोपोनिक मास्टर गाइड 📚",
      sub: "पोषक तत्व (Nutrients), EC लेवल और खेती के टिप्स जानें।",
      placeholder: "पौधे का नाम लिखें (जैसे: टमाटर, पालक)...",
      btn: "जानकारी लें",
      proTitle: "विशेष सलाह"
    }
  }[language];

  const handleSearchDirect = async (term: string) => {
    if (!term.trim()) return;
    setLoading(true);
    setGuide(null);
    try {
      const result = await getPlantGuide(term, language);
      setGuide(result);
    } catch (err: any) {
      alert("Error fetching guide: " + (err.message || err.toString()));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchDirect(searchTerm);
  };

  const categories = [
    {
      nameEn: "Leafy Greens",
      nameHi: "पत्तेदार सब्जियां",
      plants: [
        { nameEn: "Lettuce", nameHi: "लेट्यूस" },
        { nameEn: "Spinach", nameHi: "पालक" },
        { nameEn: "Kale", nameHi: "केल" },
        { nameEn: "Arugula", nameHi: "अरुगुला" },
        { nameEn: "Bok Choy", nameHi: "बोक चॉय" },
        { nameEn: "Swiss Chard", nameHi: "स्विस चार्ड" },
        { nameEn: "Mustard Greens", nameHi: "सरसों के पत्ते" },
        { nameEn: "Fenugreek (Methi)", nameHi: "मेथी" },
        { nameEn: "Celery leaves", nameHi: "अजवाइन के पत्ते" }
      ]
    },
    {
      nameEn: "Flowering Vegetables",
      nameHi: "फूल वाली सब्जियां",
      plants: [
        { nameEn: "Tomato", nameHi: "टमाटर" },
        { nameEn: "Cherry Tomato", nameHi: "चेरी टमाटर" },
        { nameEn: "Bell Pepper (Capsicum)", nameHi: "शिमला मिर्च" },
        { nameEn: "Chili Pepper", nameHi: "मिर्च" },
        { nameEn: "Cucumber", nameHi: "खीरा" },
        { nameEn: "Zucchini", nameHi: "तोरी (Zucchini)" },
        { nameEn: "Eggplant (Brinjal)", nameHi: "बैंगन" },
        { nameEn: "Strawberry", nameHi: "स्ट्रॉबेरी" },
        { nameEn: "Okra (Bhindi)", nameHi: "भिंडी" }
      ]
    },
    {
      nameEn: "Root Vegetables",
      nameHi: "जड़ वाली सब्जियां",
      plants: [
        { nameEn: "Radish", nameHi: "मूली" },
        { nameEn: "Carrot", nameHi: "गाजर" },
        { nameEn: "Beetroot", nameHi: "चुकंदर" },
        { nameEn: "Turnip", nameHi: "शलजम" },
        { nameEn: "Onion", nameHi: "प्याज" },
        { nameEn: "Garlic", nameHi: "लहसुन" },
        { nameEn: "Ginger", nameHi: "अदरक" }
      ]
    },
    {
      nameEn: "Herbs",
      nameHi: "जड़ी बूटियां",
      plants: [
        { nameEn: "Coriander (Cilantro)", nameHi: "धनिया" },
        { nameEn: "Mint", nameHi: "पुदीना" },
        { nameEn: "Basil", nameHi: "तुलसी / बेसिल" },
        { nameEn: "Parsley", nameHi: "अजमोद (Parsley)" },
        { nameEn: "Dill", nameHi: "सोया (Dill)" },
        { nameEn: "Oregano", nameHi: "अजवायन की पत्ती (Oregano)" },
        { nameEn: "Thyme", nameHi: "थाइम" },
        { nameEn: "Rosemary", nameHi: "रोजमेरी" },
        { nameEn: "Lemon Balm", nameHi: "लेमन बाम" },
        { nameEn: "Sage", nameHi: "सेज" },
        { nameEn: "Lavender", nameHi: "लैवेंडर" },
        { nameEn: "Stevia", nameHi: "स्टीविया" }
      ]
    },
    {
      nameEn: "Microgreens",
      nameHi: "माइक्रोग्रीन्स",
      plants: [
        { nameEn: "Microgreens", nameHi: "माइक्रोग्रीन्स" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">{t.title}</h2>
        <p className="text-slate-500 mt-2">{t.sub}</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input 
          type="text" 
          placeholder={t.placeholder} 
          className="flex-1 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" disabled={loading} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-md disabled:opacity-50">
          {loading ? '...' : t.btn}
        </button>
      </form>

      {guide && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-fade-in">
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => setGuide(null)}
              className="text-sm text-slate-500 hover:text-slate-700 underline"
            >
              {language === 'hi' ? 'वापस जाएं' : 'Go Back'}
            </button>
          </div>
          <div className="prose prose-emerald max-w-none whitespace-pre-wrap text-slate-700">{guide}</div>
        </div>
      )}

      {!guide && !loading && (
        <div className="space-y-6 mt-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">{language === 'hi' ? cat.nameHi : cat.nameEn}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.plants.map((plant, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => {
                      const term = language === 'hi' ? plant.nameHi : plant.nameEn;
                      setSearchTerm(term);
                      handleSearchDirect(term);
                    }}
                    className="bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-slate-200 hover:border-emerald-300 shadow-sm"
                  >
                    {language === 'hi' ? plant.nameHi : plant.nameEn}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlantGuide;
