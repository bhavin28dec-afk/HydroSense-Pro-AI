
import React, { useState, useRef } from 'react';
import { analyzePlantImage } from '../services/geminiService';
import { Language } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PlantDiagnosis: React.FC<{ language: Language }> = ({ language }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = {
    en: {
      title: "AI Plant Doctor 🩺",
      sub: "Upload a photo of leaves or roots for instant diagnosis.",
      upload: "Capture or Upload Leave Image",
      takePhoto: "Take Photo",
      uploadFile: "Upload File",
      changeImage: "Change Image",
      analyze: "Run AI Analysis",
      analyzing: "Analyzing...",
      report: "Diagnosis Report"
    },
    hi: {
      title: "एआई प्लांट डॉक्टर 🩺",
      sub: "बीमारियों की तुरंत जांच के लिए पत्तियों या जड़ों की फोटो अपलोड करें।",
      upload: "पत्ते की फोटो लें या अपलोड करें",
      takePhoto: "कैमरा से लें",
      uploadFile: "गैलरी से चुनें",
      changeImage: "फोटो बदलें",
      analyze: "एआई जांच शुरू करें",
      analyzing: "जांच जारी है...",
      report: "जांच रिपोर्ट"
    }
  }[language];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const base64Data = image.split(',')[1];
      const analysis = await analyzePlantImage(base64Data, language);
      setResult(analysis);
    } catch (err: any) {
      alert("Analysis failed: " + (err.message || err.toString()));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">{t.title}</h2>
        <p className="text-slate-500 mt-2">{t.sub}</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center transition-all hover:border-emerald-300">
        {!image ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-emerald-600">📸</span>
            </div>
            <p className="text-slate-600 font-medium">{t.upload}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
              <button 
                onClick={() => cameraInputRef.current?.click()}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
              >
                <span>📷</span> {t.takePhoto}
              </button>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold shadow-sm border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
              >
                <span>📁</span> {t.uploadFile}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <img src={image} alt="Plant" className="w-full max-h-80 object-cover rounded-xl shadow-md mb-6" />
            <div className="flex gap-4">
              <button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-slate-100 py-3 rounded-xl font-bold text-slate-700 hover:bg-slate-200 transition-colors">{t.changeImage}</button>
              <button onClick={handleAnalyze} disabled={loading} className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-md hover:bg-emerald-700 transition-colors disabled:opacity-50">{loading ? t.analyzing : t.analyze}</button>
            </div>
          </div>
        )}
        <input type="file" ref={cameraInputRef} onChange={handleFileChange} accept="image/*" capture="environment" className="hidden" />
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      </div>

      {result && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-fade-in">
          <h3 className="text-xl font-bold text-slate-800 mb-4">{t.report}</h3>
          <div className="prose prose-emerald max-w-none text-slate-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {result}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantDiagnosis;
