
import React, { useState } from 'react';
import { Language } from '../types';
import { getAiNutrientRatios, askHydroponicExpert } from '../services/geminiService';

interface Salt {
  id: string;
  nameEn: string;
  nameHi: string;
  chem: string;
  solution: 'A' | 'B';
}

interface PlantRecipe {
  id: string;
  nameEn: string;
  nameHi: string;
  categoryEn: string;
  categoryHi: string;
  ratios: { [saltId: string]: number };
  stages?: { id: string; nameEn: string; nameHi: string; ratios: { [saltId: string]: number } }[];
}

const NutrientManager: React.FC<{ language: Language }> = ({ language }) => {
  const [volume, setVolume] = useState<number>(100);
  const [selectedPlantId, setSelectedPlantId] = useState<string>('tomato'); 
  const [selectedStageId, setSelectedStageId] = useState<string>('veg');
  const [customPlantName, setCustomPlantName] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiRatios, setAiRatios] = useState<{ [key: string]: number } | null>(null);

  // Expert Chat state
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const recipes: PlantRecipe[] = [
    // --- Leafy Greens ---
    { id: 'lettuce', categoryEn: 'Leafy Greens', categoryHi: 'पत्तेदार सब्जियां', nameEn: "Lettuce", nameHi: "लेट्यूस", ratios: { cn: 0.8, fe: 0.02, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'spinach', categoryEn: 'Leafy Greens', categoryHi: 'पत्तेदार सब्जियां', nameEn: "Spinach", nameHi: "पालक", ratios: { cn: 1.0, fe: 0.03, kn: 0.5, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'kale', categoryEn: 'Leafy Greens', categoryHi: 'पत्तेदार सब्जियां', nameEn: "Kale", nameHi: "केल", ratios: { cn: 1.0, fe: 0.03, kn: 0.5, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'arugula', categoryEn: 'Leafy Greens', categoryHi: 'पत्तेदार सब्जियां', nameEn: "Arugula", nameHi: "अरुगुला", ratios: { cn: 0.9, fe: 0.02, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'bok_choy', categoryEn: 'Leafy Greens', categoryHi: 'पत्तेदार सब्जियां', nameEn: "Bok Choy", nameHi: "बोक चॉय", ratios: { cn: 0.9, fe: 0.02, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'swiss_chard', categoryEn: 'Leafy Greens', categoryHi: 'पत्तेदार सब्जियां', nameEn: "Swiss Chard", nameHi: "स्विस चार्ड", ratios: { cn: 1.0, fe: 0.03, kn: 0.5, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'mustard_greens', categoryEn: 'Leafy Greens', categoryHi: 'पत्तेदार सब्जियां', nameEn: "Mustard Greens", nameHi: "सरसों के पत्ते", ratios: { cn: 1.0, fe: 0.03, kn: 0.5, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'fenugreek', categoryEn: 'Leafy Greens', categoryHi: 'पत्तेदार सब्जियां', nameEn: "Fenugreek (Methi)", nameHi: "मेथी", ratios: { cn: 0.9, fe: 0.03, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.3, tm: 0.02 } },
    { id: 'celery_leaves', categoryEn: 'Leafy Greens', categoryHi: 'पत्तेदार सब्जियां', nameEn: "Celery leaves", nameHi: "अजवाइन के पत्ते", ratios: { cn: 0.9, fe: 0.02, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },

    // --- Flowering Vegetables ---
    { id: 'tomato', categoryEn: 'Flowering Vegetables', categoryHi: 'फूल वाली सब्जियां', nameEn: "Tomato", nameHi: "टमाटर", stages: [
        { id: 'veg', nameEn: 'Vegetative', nameHi: 'बढ़त (Veg)', ratios: { cn: 1.0, fe: 0.03, kn: 0.5, mkp: 0.3, ks: 0, ms: 0.5, tm: 0.02 } },
        { id: 'fruit', nameEn: 'Fruiting', nameHi: 'फल (Fruit)', ratios: { cn: 1.1, fe: 0.03, kn: 0.7, mkp: 0.5, ks: 0.1, ms: 0.6, tm: 0.03 } }
      ], ratios: {} },
    { id: 'cherry_tomato', categoryEn: 'Flowering Vegetables', categoryHi: 'फूल वाली सब्जियां', nameEn: "Cherry Tomato", nameHi: "चेरी टमाटर", stages: [
        { id: 'veg', nameEn: 'Vegetative', nameHi: 'बढ़त (Veg)', ratios: { cn: 1.0, fe: 0.03, kn: 0.5, mkp: 0.3, ks: 0, ms: 0.5, tm: 0.02 } },
        { id: 'fruit', nameEn: 'Fruiting', nameHi: 'फल (Fruit)', ratios: { cn: 1.1, fe: 0.03, kn: 0.7, mkp: 0.5, ks: 0.1, ms: 0.6, tm: 0.03 } }
      ], ratios: {} },
    { id: 'bell_pepper', categoryEn: 'Flowering Vegetables', categoryHi: 'फूल वाली सब्जियां', nameEn: "Bell Pepper (Capsicum)", nameHi: "शिमला मिर्च", stages: [
        { id: 'veg', nameEn: 'Vegetative', nameHi: 'बढ़त (Veg)', ratios: { cn: 1.0, fe: 0.03, kn: 0.5, mkp: 0.3, ks: 0, ms: 0.5, tm: 0.02 } },
        { id: 'fruit', nameEn: 'Fruiting', nameHi: 'फल (Fruit)', ratios: { cn: 1.0, fe: 0.03, kn: 0.8, mkp: 0.5, ks: 0.1, ms: 0.5, tm: 0.03 } }
      ], ratios: {} },
    { id: 'chili_pepper', categoryEn: 'Flowering Vegetables', categoryHi: 'फूल वाली सब्जियां', nameEn: "Chili Pepper", nameHi: "मिर्च", stages: [
        { id: 'veg', nameEn: 'Vegetative', nameHi: 'बढ़त (Veg)', ratios: { cn: 1.0, fe: 0.03, kn: 0.5, mkp: 0.3, ks: 0, ms: 0.5, tm: 0.02 } },
        { id: 'fruit', nameEn: 'Fruiting', nameHi: 'फल (Fruit)', ratios: { cn: 1.0, fe: 0.03, kn: 0.7, mkp: 0.5, ks: 0.1, ms: 0.5, tm: 0.03 } }
      ], ratios: {} },
    { id: 'cucumber', categoryEn: 'Flowering Vegetables', categoryHi: 'फूल वाली सब्जियां', nameEn: "Cucumber", nameHi: "खीरा", stages: [
        { id: 'veg', nameEn: 'Vegetative', nameHi: 'बढ़त (Veg)', ratios: { cn: 1.0, fe: 0.03, kn: 0.5, mkp: 0.3, ks: 0, ms: 0.4, tm: 0.02 } },
        { id: 'fruit', nameEn: 'Fruiting', nameHi: 'फल (Fruit)', ratios: { cn: 1.0, fe: 0.03, kn: 0.8, mkp: 0.4, ks: 0.1, ms: 0.5, tm: 0.03 } }
      ], ratios: {} },
    { id: 'zucchini', categoryEn: 'Flowering Vegetables', categoryHi: 'फूल वाली सब्जियां', nameEn: "Zucchini", nameHi: "तोरी (Zucchini)", stages: [
        { id: 'veg', nameEn: 'Vegetative', nameHi: 'बढ़त (Veg)', ratios: { cn: 1.0, fe: 0.03, kn: 0.5, mkp: 0.3, ks: 0, ms: 0.4, tm: 0.02 } },
        { id: 'fruit', nameEn: 'Fruiting', nameHi: 'फल (Fruit)', ratios: { cn: 1.0, fe: 0.03, kn: 0.8, mkp: 0.4, ks: 0.1, ms: 0.5, tm: 0.03 } }
      ], ratios: {} },
    { id: 'eggplant', categoryEn: 'Flowering Vegetables', categoryHi: 'फूल वाली सब्जियां', nameEn: "Eggplant (Brinjal)", nameHi: "बैंगन", stages: [
        { id: 'veg', nameEn: 'Vegetative', nameHi: 'बढ़त (Veg)', ratios: { cn: 1.0, fe: 0.03, kn: 0.5, mkp: 0.3, ks: 0, ms: 0.5, tm: 0.02 } },
        { id: 'fruit', nameEn: 'Fruiting', nameHi: 'फल (Fruit)', ratios: { cn: 1.1, fe: 0.03, kn: 0.7, mkp: 0.5, ks: 0.1, ms: 0.6, tm: 0.03 } }
      ], ratios: {} },
    { id: 'strawberry', categoryEn: 'Flowering Vegetables', categoryHi: 'फूल वाली सब्जियां', nameEn: "Strawberry", nameHi: "स्ट्रॉबेरी", stages: [
        { id: 'veg', nameEn: 'Vegetative', nameHi: 'बढ़त (Veg)', ratios: { cn: 0.7, fe: 0.03, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
        { id: 'fruit', nameEn: 'Fruiting', nameHi: 'फल (Fruit)', ratios: { cn: 0.7, fe: 0.03, kn: 0.6, mkp: 0.3, ks: 0.1, ms: 0.4, tm: 0.03 } }
      ], ratios: {} },
    { id: 'okra', categoryEn: 'Flowering Vegetables', categoryHi: 'फूल वाली सब्जियां', nameEn: "Okra (Bhindi)", nameHi: "भिंडी", stages: [
        { id: 'veg', nameEn: 'Vegetative', nameHi: 'बढ़त (Veg)', ratios: { cn: 1.0, fe: 0.03, kn: 0.5, mkp: 0.3, ks: 0, ms: 0.5, tm: 0.02 } },
        { id: 'fruit', nameEn: 'Fruiting', nameHi: 'फल (Fruit)', ratios: { cn: 0.9, fe: 0.03, kn: 0.7, mkp: 0.4, ks: 0.1, ms: 0.5, tm: 0.03 } }
      ], ratios: {} },

    // --- Root Vegetables ---
    { id: 'radish', categoryEn: 'Root Vegetables', categoryHi: 'जड़ वाली सब्जियां', nameEn: "Radish", nameHi: "मूली", stages: [
        { id: 'veg', nameEn: 'Early Growth', nameHi: 'शुरुआती बढ़त', ratios: { cn: 0.8, fe: 0.02, kn: 0.4, mkp: 0.3, ks: 0, ms: 0.3, tm: 0.02 } },
        { id: 'rooting', nameEn: 'Root Bulking', nameHi: 'जड़ मोटा होना', ratios: { cn: 0.6, fe: 0.02, kn: 0.8, mkp: 0.5, ks: 0.2, ms: 0.4, tm: 0.02 } }
      ], ratios: {} },
    { id: 'carrot', categoryEn: 'Root Vegetables', categoryHi: 'जड़ वाली सब्जियां', nameEn: "Carrot", nameHi: "गाजर", stages: [
        { id: 'veg', nameEn: 'Early Growth', nameHi: 'शुरुआती बढ़त', ratios: { cn: 0.8, fe: 0.02, kn: 0.4, mkp: 0.3, ks: 0, ms: 0.3, tm: 0.02 } },
        { id: 'rooting', nameEn: 'Root Bulking', nameHi: 'जड़ मोटा होना', ratios: { cn: 0.6, fe: 0.02, kn: 0.8, mkp: 0.5, ks: 0.2, ms: 0.4, tm: 0.02 } }
      ], ratios: {} },
    { id: 'beetroot', categoryEn: 'Root Vegetables', categoryHi: 'जड़ वाली सब्जियां', nameEn: "Beetroot", nameHi: "चुकंदर", stages: [
        { id: 'veg', nameEn: 'Early Growth', nameHi: 'शुरुआती बढ़त', ratios: { cn: 0.8, fe: 0.02, kn: 0.4, mkp: 0.3, ks: 0, ms: 0.3, tm: 0.02 } },
        { id: 'rooting', nameEn: 'Root Bulking', nameHi: 'जड़ मोटा होना', ratios: { cn: 0.6, fe: 0.02, kn: 0.8, mkp: 0.5, ks: 0.2, ms: 0.4, tm: 0.02 } }
      ], ratios: {} },
    { id: 'turnip', categoryEn: 'Root Vegetables', categoryHi: 'जड़ वाली सब्जियां', nameEn: "Turnip", nameHi: "शलजम", stages: [
        { id: 'veg', nameEn: 'Early Growth', nameHi: 'शुरुआती बढ़त', ratios: { cn: 0.8, fe: 0.02, kn: 0.4, mkp: 0.3, ks: 0, ms: 0.3, tm: 0.02 } },
        { id: 'rooting', nameEn: 'Root Bulking', nameHi: 'जड़ मोटा होना', ratios: { cn: 0.6, fe: 0.02, kn: 0.8, mkp: 0.5, ks: 0.2, ms: 0.4, tm: 0.02 } }
      ], ratios: {} },
    { id: 'onion', categoryEn: 'Root Vegetables', categoryHi: 'जड़ वाली सब्जियां', nameEn: "Onion", nameHi: "प्याज", stages: [
        { id: 'veg', nameEn: 'Vegetative', nameHi: 'बढ़त (Veg)', ratios: { cn: 0.9, fe: 0.03, kn: 0.5, mkp: 0.3, ks: 0, ms: 0.4, tm: 0.02 } },
        { id: 'bulb', nameEn: 'Bulb Formation', nameHi: 'कंद बनना', ratios: { cn: 0.6, fe: 0.03, kn: 0.8, mkp: 0.5, ks: 0.2, ms: 0.5, tm: 0.03 } }
      ], ratios: {} },
    { id: 'garlic', categoryEn: 'Root Vegetables', categoryHi: 'जड़ वाली सब्जियां', nameEn: "Garlic", nameHi: "लहसुन", stages: [
        { id: 'veg', nameEn: 'Vegetative', nameHi: 'बढ़त (Veg)', ratios: { cn: 0.9, fe: 0.03, kn: 0.5, mkp: 0.3, ks: 0, ms: 0.4, tm: 0.02 } },
        { id: 'bulb', nameEn: 'Bulb Formation', nameHi: 'कंद बनना', ratios: { cn: 0.6, fe: 0.03, kn: 0.8, mkp: 0.5, ks: 0.2, ms: 0.5, tm: 0.03 } }
      ], ratios: {} },
    { id: 'ginger', categoryEn: 'Root Vegetables', categoryHi: 'जड़ वाली सब्जियां', nameEn: "Ginger", nameHi: "अदरक", stages: [
        { id: 'veg', nameEn: 'Vegetative', nameHi: 'बढ़त (Veg)', ratios: { cn: 0.9, fe: 0.03, kn: 0.5, mkp: 0.3, ks: 0, ms: 0.4, tm: 0.02 } },
        { id: 'bulb', nameEn: 'Bulb Formation', nameHi: 'कंद बनना', ratios: { cn: 0.6, fe: 0.03, kn: 0.8, mkp: 0.5, ks: 0.2, ms: 0.5, tm: 0.03 } }
      ], ratios: {} },

    // --- Herbs ---
    { id: 'coriander', categoryEn: 'Herbs', categoryHi: 'जड़ी बूटियां', nameEn: "Coriander (Cilantro)", nameHi: "धनिया", ratios: { cn: 0.9, fe: 0.03, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.3, tm: 0.02 } },
    { id: 'mint', categoryEn: 'Herbs', categoryHi: 'जड़ी बूटियां', nameEn: "Mint", nameHi: "पुदीना", ratios: { cn: 1.0, fe: 0.03, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'basil', categoryEn: 'Herbs', categoryHi: 'जड़ी बूटियां', nameEn: "Basil", nameHi: "तुलसी / बेसिल", ratios: { cn: 1.0, fe: 0.03, kn: 0.4, mkp: 0.3, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'parsley', categoryEn: 'Herbs', categoryHi: 'जड़ी बूटियां', nameEn: "Parsley", nameHi: "अजमोद (Parsley)", ratios: { cn: 0.9, fe: 0.02, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'dill', categoryEn: 'Herbs', categoryHi: 'जड़ी बूटियां', nameEn: "Dill", nameHi: "सोया (Dill)", ratios: { cn: 0.9, fe: 0.02, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'oregano', categoryEn: 'Herbs', categoryHi: 'जड़ी बूटियां', nameEn: "Oregano", nameHi: "अजवायन की पत्ती (Oregano)", ratios: { cn: 0.9, fe: 0.02, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'thyme', categoryEn: 'Herbs', categoryHi: 'जड़ी बूटियां', nameEn: "Thyme", nameHi: "थाइम", ratios: { cn: 0.9, fe: 0.02, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'rosemary', categoryEn: 'Herbs', categoryHi: 'जड़ी बूटियां', nameEn: "Rosemary", nameHi: "रोजमेरी", ratios: { cn: 0.9, fe: 0.02, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'lemon_balm', categoryEn: 'Herbs', categoryHi: 'जड़ी बूटियां', nameEn: "Lemon Balm", nameHi: "लेमन बाम", ratios: { cn: 0.9, fe: 0.02, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'sage', categoryEn: 'Herbs', categoryHi: 'जड़ी बूटियां', nameEn: "Sage", nameHi: "सेज", ratios: { cn: 0.9, fe: 0.02, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'lavender', categoryEn: 'Herbs', categoryHi: 'जड़ी बूटियां', nameEn: "Lavender", nameHi: "लैवेंडर", ratios: { cn: 0.9, fe: 0.02, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },
    { id: 'stevia', categoryEn: 'Herbs', categoryHi: 'जड़ी बूटियां', nameEn: "Stevia", nameHi: "स्टीविया", ratios: { cn: 0.9, fe: 0.02, kn: 0.4, mkp: 0.2, ks: 0, ms: 0.4, tm: 0.02 } },

    // --- Microgreens ---
    { id: 'microgreens', categoryEn: 'Microgreens', categoryHi: 'माइक्रोग्रीन्स', nameEn: "Microgreens", nameHi: "माइक्रोग्रीन्स", ratios: { cn: 0.5, fe: 0.01, kn: 0.2, mkp: 0.1, ks: 0, ms: 0.2, tm: 0.01 } },

    // --- Custom ---
    { id: 'custom_ai', categoryEn: 'Custom', categoryHi: 'अन्य', nameEn: "✨ Custom Plant (AI Generated)", nameHi: "✨ अन्य पौधा (AI से जानें)", ratios: {} }
  ];

  const saltDefinitions: Salt[] = [
    { id: 'cn', nameEn: "Calcium Nitrate", nameHi: "कैल्शियम नाइट्रेट", chem: "Ca(NO3)2", solution: 'A' },
    { id: 'fe', nameEn: "Iron Chelate (EDDHA)", nameHi: "आयरन चिलेट", chem: "Fe-EDDHA", solution: 'A' },
    { id: 'kn', nameEn: "Potassium Nitrate", nameHi: "पोटेशियम नाइट्रेट", chem: "KNO3", solution: 'B' },
    { id: 'mkp', nameEn: "MKP", nameHi: "एमकेपी (MKP)", chem: "KH2PO4", solution: 'B' },
    { id: 'ks', nameEn: "Potassium Sulphate", nameHi: "पोटेशियम सल्फेट", chem: "K2SO4", solution: 'B' },
    { id: 'ms', nameEn: "Magnesium Sulphate (Epsom Salt)", nameHi: "मैग्नीशियम सल्फेट (एप्सम साल्ट)", chem: "MgSO4", solution: 'B' },
    { id: 'tm', nameEn: "Trace Elements (Micro)", nameHi: "ट्रेस तत्व (Micro)", chem: "Micronutrients", solution: 'B' },
  ];

  const t = {
    en: {
      calcTitle: "AI Plant Nutrient Calculator",
      calcDesc: "Professional ratios based on plant type and growth stage.",
      plantLabel: "Select Plant",
      customPlaceholder: "Type plant name (e.g. Saffron)...",
      genBtn: "Generate AI Formula",
      stageLabel: "Growth Stage",
      volumeLabel: "Water Volume (Liters)",
      solutionA: "Solution A",
      solutionB: "Solution B",
      grams: "g",
      mixingTitle: "Mixing Guide 🧪",
      chatTitle: "Hydro Expert AI Consultation 💬",
      chatPlaceholder: "Ask anything about hydroponics...",
      chatBtn: "Ask Expert",
      step1: "1. Fill tank with clean water.",
      step2: "2. Dissolve Solution A completely.",
      step3: "3. Wait 10 mins, then add Solution B.",
      step4: "4. Check pH (Keep between 5.8 - 6.2).",
      warning: "⚠️ Never mix A & B concentrates directly!"
    },
    hi: {
      calcTitle: "एआई पोषक तत्व कैलकुलेटर",
      calcDesc: "पौधे और उसके विकास के चरण के अनुसार सही मात्रा जानें।",
      plantLabel: "पौधा चुनें",
      customPlaceholder: "पौधे का नाम लिखें (जैसे: केसर)...",
      genBtn: "AI से फॉर्मूला बनाएं",
      stageLabel: "ग्रोथ स्टेज",
      volumeLabel: "पानी की मात्रा (लीटर)",
      solutionA: "घोल ए (Solution A)",
      solutionB: "घोल बी (Solution B)",
      grams: "ग्राम",
      mixingTitle: "घोल बनाने का सही तरीका 🧪",
      chatTitle: "हाइड्रो एक्सपर्ट एआई सलाह 💬",
      chatPlaceholder: "हाइड्रोपोनिक्स के बारे में कुछ भी पूछें...",
      chatBtn: "एक्सपर्ट से पूछें",
      step1: "1. टैंक को साफ पानी से भरें।",
      step2: "2. पहले Solution A को अच्छे से घोलें।",
      step3: "3. 10 मिनट रुकें, फिर Solution B मिलाएं।",
      step4: "4. pH चेक करें (5.8 - 6.2 के बीच रखें)।",
      warning: "⚠️ A और B को कभी भी सीधे एक साथ न मिलाएं!"
    }
  }[language];

  const handleGenerateAiFormula = async () => {
    if (!customPlantName) return;
    setIsAiLoading(true);
    try {
      const ratios = await getAiNutrientRatios(customPlantName, selectedStageId);
      if (ratios) setAiRatios(ratios);
    } catch (err: any) {
      alert("Error generating formula: " + (err.message || err.toString()));
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleChatAsk = async () => {
    if (!chatInput.trim()) return;
    setIsChatLoading(true);
    try {
      const res = await askHydroponicExpert(chatInput, language);
      setChatResponse(res);
    } catch (err: any) {
      alert("Error asking expert: " + (err.message || err.toString()));
    } finally {
      setIsChatLoading(false);
    }
  };

  const activePlant = recipes.find(p => p.id === selectedPlantId) || recipes[0];
  const currentRatios = selectedPlantId === 'custom_ai' 
    ? (aiRatios || { cn: 0, fe: 0, kn: 0, mkp: 0, ks: 0, ms: 0, tm: 0 }) 
    : (activePlant.stages 
        ? (activePlant.stages.find(s => s.id === selectedStageId)?.ratios || activePlant.stages[0].ratios)
        : activePlant.ratios);

  return (
    <div className="space-y-6 pb-20">
      {/* Calculator Main */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-800">{t.calcTitle}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.plantLabel}</label>
            <select 
              value={selectedPlantId}
              onChange={(e) => {
                setSelectedPlantId(e.target.value);
                setAiRatios(null);
                // Reset stage to first available if switching plants
                const newPlant = recipes.find(p => p.id === e.target.value);
                if (newPlant && newPlant.stages) {
                  setSelectedStageId(newPlant.stages[0].id);
                }
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {Array.from(new Set(recipes.map(r => r.categoryEn))).map(category => (
                <optgroup key={category} label={language === 'hi' ? recipes.find(r => r.categoryEn === category)?.categoryHi : category}>
                  {recipes.filter(r => r.categoryEn === category).map(r => (
                    <option key={r.id} value={r.id}>{language === 'hi' ? r.nameHi : r.nameEn}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.stageLabel}</label>
            {activePlant.stages ? (
              <select 
                value={selectedStageId}
                onChange={(e) => setSelectedStageId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {activePlant.stages.map(s => (
                  <option key={s.id} value={s.id}>{language === 'hi' ? s.nameHi : s.nameEn}</option>
                ))}
              </select>
            ) : (
              <div className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-400 cursor-not-allowed">
                Standard
              </div>
            )}
          </div>
        </div>

        {selectedPlantId === 'custom_ai' && (
          <div className="flex gap-2 animate-fade-in">
            <input 
              type="text" 
              placeholder={t.customPlaceholder}
              className="flex-1 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              value={customPlantName}
              onChange={(e) => setCustomPlantName(e.target.value)}
            />
            <button 
              onClick={handleGenerateAiFormula}
              disabled={isAiLoading}
              className="bg-emerald-600 text-white px-4 py-3 rounded-xl font-bold text-xs shadow-md disabled:opacity-50"
            >
              {isAiLoading ? '...' : t.genBtn}
            </button>
          </div>
        )}

        <div className="max-w-xs space-y-1 pt-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.volumeLabel}</label>
          <div className="relative">
            <input 
              type="number" 
              value={volume} 
              onChange={(e) => setVolume(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xl font-bold text-emerald-700 outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">L</span>
          </div>
        </div>
      </section>

      {/* Ratios Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['A', 'B'].map(sol => (
          <div key={sol} className={`rounded-2xl border p-5 shadow-sm ${sol === 'A' ? 'bg-emerald-50 border-emerald-100' : 'bg-blue-50 border-blue-100'}`}>
            <h4 className={`font-bold mb-4 flex items-center ${sol === 'A' ? 'text-emerald-800' : 'text-blue-800'}`}>
              <span className={`w-6 h-6 rounded flex items-center justify-center text-[10px] mr-2 text-white ${sol === 'A' ? 'bg-emerald-600' : 'bg-blue-600'}`}>{sol}</span>
              {sol === 'A' ? t.solutionA : t.solutionB}
            </h4>
            <div className="space-y-3">
              {saltDefinitions.filter(s => s.solution === sol).map(salt => {
                const weight = (currentRatios[salt.id] || 0) * volume;
                if (weight === 0) return null; // Don't show 0g ingredients
                return (
                  <div key={salt.id} className="flex justify-between items-center border-b border-black/5 pb-2">
                    <span className="text-xs font-bold text-slate-700">{language === 'hi' ? salt.nameHi : salt.nameEn}</span>
                    <span className={`text-lg font-black ${sol === 'A' ? 'text-emerald-700' : 'text-blue-700'}`}>{weight.toFixed(2)}{t.grams}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

       {/* Mixing Guide */}
       <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
        <h3 className="font-bold text-amber-900 mb-3">{t.mixingTitle}</h3>
        <div className="space-y-2 text-sm text-amber-800 font-medium">
          <p>{t.step1}</p>
          <p>{t.step2}</p>
          <p>{t.step3}</p>
          <p>{t.step4}</p>
        </div>
        <div className="mt-4 bg-amber-200/50 px-3 py-2 rounded-lg text-xs font-bold text-amber-900">
          {t.warning}
        </div>
      </div>

      {/* Chat Section */}
      <section className="bg-slate-900 text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span>✨</span> {t.chatTitle}
          </h3>
          <div className="flex gap-2">
            <input 
              type="text"
              placeholder={t.chatPlaceholder}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-emerald-100 outline-none focus:ring-1 focus:ring-emerald-400"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleChatAsk()}
            />
            <button 
              onClick={handleChatAsk}
              disabled={isChatLoading}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-5 py-3 rounded-xl font-bold text-sm transition-all"
            >
              {isChatLoading ? '...' : t.chatBtn}
            </button>
          </div>

          {chatResponse && (
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 animate-fade-in">
              <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap leading-relaxed text-slate-300">
                {chatResponse}
              </div>
            </div>
          )}
        </div>
        <div className="absolute right-[-20px] top-[-20px] opacity-5 text-[150px]">🤖</div>
      </section>
    </div>
  );
};

export default NutrientManager;
