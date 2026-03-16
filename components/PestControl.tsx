import React, { useState } from 'react';
import { Language } from '../types';

const PestControl: React.FC<{ language: Language }> = ({ language }) => {
  const [filter, setFilter] = useState<'all' | 'pest' | 'disease'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const t = {
    en: {
      title: "Pest & Disease Control 🐛",
      sub: "Identify, prevent, and treat common hydroponic issues.",
      searchPlaceholder: "Search pests or diseases...",
      filterAll: "All Issues",
      filterPests: "Pests",
      filterDiseases: "Diseases",
      symptoms: "Symptoms",
      treatment: "Treatment & Prevention",
      organic: "Organic",
      chemical: "Chemical",
      noResults: "No issues found matching your search."
    },
    hi: {
      title: "कीट और रोग नियंत्रण 🐛",
      sub: "हाइड्रोपोनिक समस्याओं को पहचानें, रोकें और उनका इलाज करें।",
      searchPlaceholder: "कीट या रोग खोजें...",
      filterAll: "सभी समस्याएं",
      filterPests: "कीट (Pests)",
      filterDiseases: "रोग (Diseases)",
      symptoms: "लक्षण",
      treatment: "उपचार और रोकथाम",
      organic: "जैविक (Organic)",
      chemical: "रासायनिक (Chemical)",
      noResults: "आपकी खोज से मेल खाने वाली कोई समस्या नहीं मिली।"
    }
  }[language];

  const issues = [
    {
      id: 'aphids',
      type: 'pest',
      nameEn: 'Aphids',
      nameHi: 'एफिड्स (माहू)',
      icon: '🐛',
      symptomsEn: 'Curled, yellowing leaves. Sticky honeydew on leaves and stems. Visible tiny green/black bugs.',
      symptomsHi: 'मुड़ी हुई, पीली पत्तियां। पत्तियों और तनों पर चिपचिपा पदार्थ। छोटे हरे/काले कीड़े दिखाई देना।',
      treatmentEn: 'Spray neem oil or insecticidal soap. Introduce ladybugs. Ensure good air circulation.',
      treatmentHi: 'नीम के तेल या कीटनाशक साबुन का स्प्रे करें। लेडीबग्स (मित्र कीट) छोड़ें। हवा का अच्छा प्रवाह सुनिश्चित करें।'
    },
    {
      id: 'spider_mites',
      type: 'pest',
      nameEn: 'Spider Mites',
      nameHi: 'स्पाइडर माइट्स (मकड़ी के जाले वाले कीड़े)',
      icon: '🕷️',
      symptomsEn: 'Tiny yellow or white speckles on leaves. Fine webbing under leaves. Leaves drying out.',
      symptomsHi: 'पत्तियों पर छोटे पीले या सफेद धब्बे। पत्तियों के नीचे बारीक जाले। पत्तियों का सूखना।',
      treatmentEn: 'Increase humidity (they hate moisture). Spray with neem oil or water mixed with mild dish soap.',
      treatmentHi: 'नमी बढ़ाएं (उन्हें नमी पसंद नहीं है)। नीम के तेल या हल्के डिश सोप मिले पानी का स्प्रे करें।'
    },
    {
      id: 'fungus_gnats',
      type: 'pest',
      nameEn: 'Fungus Gnats',
      nameHi: 'फंगस नैट्स (मच्छर जैसे कीड़े)',
      icon: '🦟',
      symptomsEn: 'Tiny black flies around the base of plants. Larvae feed on roots, causing slow growth or wilting.',
      symptomsHi: 'पौधों के आधार के चारों ओर छोटी काली मक्खियाँ। लार्वा जड़ों को खाते हैं, जिससे विकास धीमा होता है या पौधे मुरझा जाते हैं।',
      treatmentEn: 'Use yellow sticky traps for adults. Apply BTI (Bacillus thuringiensis israelensis) to water for larvae. Let media dry slightly.',
      treatmentHi: 'वयस्कों के लिए पीले चिपचिपे जाल (Yellow sticky traps) का उपयोग करें। लार्वा के लिए पानी में BTI डालें। मीडिया को थोड़ा सूखने दें।'
    },
    {
      id: 'root_rot',
      type: 'disease',
      nameEn: 'Root Rot (Pythium)',
      nameHi: 'जड़ गलन (Root Rot)',
      icon: '🤎',
      symptomsEn: 'Brown, slimy, and foul-smelling roots. Plants wilting even when water is plentiful. Stunted growth.',
      symptomsHi: 'भूरी, चिपचिपी और दुर्गंधयुक्त जड़ें। पर्याप्त पानी होने पर भी पौधों का मुरझाना। रुका हुआ विकास।',
      treatmentEn: 'Keep water temp below 22°C (72°F). Add air stones for more oxygen. Use beneficial bacteria (e.g., Hydroguard). Remove dead roots.',
      treatmentHi: 'पानी का तापमान 22°C से नीचे रखें। अधिक ऑक्सीजन के लिए एयर स्टोन (Air stones) लगाएं। फायदेमंद बैक्टीरिया का उपयोग करें। मृत जड़ों को हटा दें।'
    },
    {
      id: 'powdery_mildew',
      type: 'disease',
      nameEn: 'Powdery Mildew',
      nameHi: 'पाउडरी मिल्ड्यू (सफेद फफूंद)',
      icon: '❄️',
      symptomsEn: 'White, powdery spots on leaves and stems. Leaves may twist, turn yellow, and fall off.',
      symptomsHi: 'पत्तियों और तनों पर सफेद, पाउडर जैसे धब्बे। पत्तियां मुड़ सकती हैं, पीली हो सकती हैं और गिर सकती हैं।',
      treatmentEn: 'Improve ventilation and reduce humidity. Spray with a mix of baking soda, liquid soap, and water. Remove heavily infected leaves.',
      treatmentHi: 'हवा का प्रवाह सुधारें और नमी कम करें। बेकिंग सोडा, तरल साबुन और पानी के मिश्रण का स्प्रे करें। अत्यधिक संक्रमित पत्तियों को हटा दें।'
    },
    {
      id: 'algae',
      type: 'disease', // technically not a disease but treated similarly in hydro
      nameEn: 'Algae Growth',
      nameHi: 'शैवाल (Algae/काई) का विकास',
      icon: '🦠',
      symptomsEn: 'Green slime on roots, growing media, or reservoir walls. Depletes oxygen and nutrients.',
      symptomsHi: 'जड़ों, ग्रोइंग मीडिया या रिज़र्वयर की दीवारों पर हरी काई। ऑक्सीजन और पोषक तत्वों को कम करता है।',
      treatmentEn: 'Block all light from reaching the nutrient solution and roots. Clean reservoir with mild H2O2 (hydrogen peroxide) solution.',
      treatmentHi: 'पोषक तत्व के घोल और जड़ों तक पहुँचने वाले सभी प्रकाश को रोकें। रिज़र्वयर को हल्के H2O2 (हाइड्रोजन पेरोक्साइड) घोल से साफ करें।'
    }
  ];

  const filteredIssues = issues.filter(issue => {
    const matchesFilter = filter === 'all' || issue.type === filter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      issue.nameEn.toLowerCase().includes(searchLower) || 
      issue.nameHi.toLowerCase().includes(searchLower) ||
      issue.symptomsEn.toLowerCase().includes(searchLower) ||
      issue.symptomsHi.toLowerCase().includes(searchLower);
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Section */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2 tracking-tight">{t.title}</h2>
          <p className="text-slate-300 font-medium max-w-xl">{t.sub}</p>
        </div>
      </div>

      {/* Controls: Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
          />
        </div>
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t.filterAll}
          </button>
          <button 
            onClick={() => setFilter('pest')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'pest' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t.filterPests}
          </button>
          <button 
            onClick={() => setFilter('disease')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'disease' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t.filterDiseases}
          </button>
        </div>
      </div>

      {/* Issues Grid */}
      {filteredIssues.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center shadow-sm">
          <div className="text-4xl mb-4">🌿</div>
          <p className="text-slate-500 font-medium">{t.noResults}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredIssues.map((issue) => (
            <div key={issue.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className={`p-4 border-b ${issue.type === 'pest' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'} flex items-center gap-4`}>
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl shrink-0">
                  {issue.icon}
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-800">
                    {language === 'en' ? issue.nameEn : issue.nameHi}
                  </h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${issue.type === 'pest' ? 'bg-red-200 text-red-800' : 'bg-amber-200 text-amber-800'}`}>
                    {issue.type === 'pest' ? t.filterPests : t.filterDiseases}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span>⚠️</span> {t.symptoms}
                  </h4>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {language === 'en' ? issue.symptomsEn : issue.symptomsHi}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span>🛡️</span> {t.treatment}
                  </h4>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                    {language === 'en' ? issue.treatmentEn : issue.treatmentHi}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PestControl;
