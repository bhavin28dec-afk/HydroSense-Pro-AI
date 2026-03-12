export const getStaticPlantGuide = (plantName: string, lang: 'en' | 'hi'): string | null => {
  const name = plantName.toLowerCase().trim();
  
  const db: Record<string, any> = {
    // Leafy Greens
    "lettuce": { cat: "Leafy Greens", sys: "NFT / DWC", ec: "0.8 - 1.2", ph: "5.5 - 6.0", temp: "15-22°C", light: "10-14 hrs", harvest: "30-45 days", form: "N-P-K: 8-15-36, Calcium Nitrate", mistakes: "High temp causes bolting", tips: "Keep water temp below 20°C" },
    "लेट्यूस": { cat: "पत्तेदार सब्जियां", sys: "NFT / DWC", ec: "0.8 - 1.2", ph: "5.5 - 6.0", temp: "15-22°C", light: "10-14 घंटे", harvest: "30-45 दिन", form: "N-P-K: 8-15-36, कैल्शियम नाइट्रेट", mistakes: "अधिक तापमान से पौधे में फूल आ जाते हैं", tips: "पानी का तापमान 20°C से नीचे रखें" },
    "spinach": { cat: "Leafy Greens", sys: "NFT / DWC", ec: "1.8 - 2.3", ph: "5.5 - 6.5", temp: "10-21°C", light: "10-12 hrs", harvest: "30-40 days", form: "High Nitrogen, Calcium Nitrate", mistakes: "Pythium root rot in warm water", tips: "Needs excellent aeration" },
    "पालक": { cat: "पत्तेदार सब्जियां", sys: "NFT / DWC", ec: "1.8 - 2.3", ph: "5.5 - 6.5", temp: "10-21°C", light: "10-12 घंटे", harvest: "30-40 दिन", form: "उच्च नाइट्रोजन, कैल्शियम नाइट्रेट", mistakes: "गर्म पानी में जड़ सड़न (Root rot)", tips: "पानी में अच्छी ऑक्सीजन (Aeration) जरूरी है" },
    "kale": { cat: "Leafy Greens", sys: "NFT / DWC", ec: "1.2 - 2.0", ph: "5.5 - 6.5", temp: "15-25°C", light: "10-12 hrs", harvest: "50-60 days", form: "Balanced Veg Formula", mistakes: "Aphid infestations", tips: "Harvest lower leaves first" },
    "केल": { cat: "पत्तेदार सब्जियां", sys: "NFT / DWC", ec: "1.2 - 2.0", ph: "5.5 - 6.5", temp: "15-25°C", light: "10-12 घंटे", harvest: "50-60 दिन", form: "संतुलित वेज फॉर्मूला", mistakes: "एफिड्स (कीड़े) का हमला", tips: "निचली पत्तियों को पहले काटें" },
    "arugula": { cat: "Leafy Greens", sys: "NFT", ec: "0.8 - 1.2", ph: "6.0 - 6.5", temp: "10-20°C", light: "10-12 hrs", harvest: "30-40 days", form: "Standard Leafy Green Mix", mistakes: "Bolts quickly in heat", tips: "Harvest early for milder flavor" },
    "अरुगुला": { cat: "पत्तेदार सब्जियां", sys: "NFT", ec: "0.8 - 1.2", ph: "6.0 - 6.5", temp: "10-20°C", light: "10-12 घंटे", harvest: "30-40 दिन", form: "पत्तेदार सब्जियों का मिश्रण", mistakes: "गर्मी में जल्दी फूल आते हैं", tips: "हल्के स्वाद के लिए जल्दी काटें" },
    "bok choy": { cat: "Leafy Greens", sys: "NFT / DWC", ec: "1.5 - 2.0", ph: "6.0 - 6.5", temp: "15-24°C", light: "10-12 hrs", harvest: "45-50 days", form: "High Nitrogen", mistakes: "Calcium deficiency causes tip burn", tips: "Ensure good airflow" },
    "बोक चॉय": { cat: "पत्तेदार सब्जियां", sys: "NFT / DWC", ec: "1.5 - 2.0", ph: "6.0 - 6.5", temp: "15-24°C", light: "10-12 घंटे", harvest: "45-50 दिन", form: "उच्च नाइट्रोजन", mistakes: "कैल्शियम की कमी से पत्तियां जलती हैं", tips: "हवा का प्रवाह अच्छा रखें" },
    "swiss chard": { cat: "Leafy Greens", sys: "NFT / DWC", ec: "1.8 - 2.3", ph: "6.0 - 6.5", temp: "15-25°C", light: "10-14 hrs", harvest: "35-50 days", form: "Balanced Veg Formula", mistakes: "Overcrowding", tips: "Cut-and-come-again harvesting works well" },
    "स्विस चार्ड": { cat: "पत्तेदार सब्जियां", sys: "NFT / DWC", ec: "1.8 - 2.3", ph: "6.0 - 6.5", temp: "15-25°C", light: "10-14 घंटे", harvest: "35-50 दिन", form: "संतुलित वेज फॉर्मूला", mistakes: "पौधों के बीच कम जगह", tips: "पत्तियां काटकर दोबारा उगने दें" },
    "mustard greens": { cat: "Leafy Greens", sys: "NFT", ec: "1.2 - 2.0", ph: "6.0 - 6.5", temp: "10-24°C", light: "10-12 hrs", harvest: "30-40 days", form: "Standard Leafy Green Mix", mistakes: "Too much heat makes them too spicy", tips: "Grow in cooler months" },
    "सरसों के पत्ते": { cat: "पत्तेदार सब्जियां", sys: "NFT", ec: "1.2 - 2.0", ph: "6.0 - 6.5", temp: "10-24°C", light: "10-12 घंटे", harvest: "30-40 दिन", form: "पत्तेदार सब्जियों का मिश्रण", mistakes: "अधिक गर्मी से स्वाद कड़वा हो जाता है", tips: "ठंडे महीनों में उगाएं" },
    "fenugreek (methi)": { cat: "Leafy Greens", sys: "NFT / Media Bed", ec: "1.0 - 1.5", ph: "5.8 - 6.5", temp: "15-25°C", light: "10-12 hrs", harvest: "25-30 days", form: "Low-EC Veg Formula", mistakes: "Root rot from overwatering", tips: "Harvest young for best flavor" },
    "मेथी": { cat: "पत्तेदार सब्जियां", sys: "NFT / Media Bed", ec: "1.0 - 1.5", ph: "5.8 - 6.5", temp: "15-25°C", light: "10-12 घंटे", harvest: "25-30 दिन", form: "कम EC वाला वेज फॉर्मूला", mistakes: "अधिक पानी से जड़ सड़न", tips: "अच्छे स्वाद के लिए जल्दी काटें" },
    "celery leaves": { cat: "Leafy Greens", sys: "NFT / DWC", ec: "1.8 - 2.4", ph: "6.0 - 6.5", temp: "15-22°C", light: "12-14 hrs", harvest: "60-80 days", form: "High Calcium & Potassium", mistakes: "Blackheart (Calcium deficiency)", tips: "Keep EC consistent" },
    "अजवाइन के पत्ते": { cat: "पत्तेदार सब्जियां", sys: "NFT / DWC", ec: "1.8 - 2.4", ph: "6.0 - 6.5", temp: "15-22°C", light: "12-14 घंटे", harvest: "60-80 दिन", form: "उच्च कैल्शियम और पोटेशियम", mistakes: "ब्लैकहार्ट (कैल्शियम की कमी)", tips: "EC को स्थिर रखें" },

    // Flowering Vegetables
    "tomato": { cat: "Fruiting Vegetables", sys: "Dutch Bucket / Bato Bucket", ec: "2.0 - 5.0", ph: "5.5 - 6.5", temp: "18-28°C", light: "14-18 hrs", harvest: "60-90 days", form: "High K & Ca during fruiting", mistakes: "Blossom end rot (Ca deficiency)", tips: "Prune suckers regularly" },
    "टमाटर": { cat: "फूल वाली सब्जियां", sys: "डच बकेट (Dutch Bucket)", ec: "2.0 - 5.0", ph: "5.5 - 6.5", temp: "18-28°C", light: "14-18 घंटे", harvest: "60-90 दिन", form: "फलने के दौरान उच्च K और Ca", mistakes: "ब्लॉसम एंड रॉट (कैल्शियम की कमी)", tips: "अतिरिक्त शाखाओं (suckers) को काटते रहें" },
    "cherry tomato": { cat: "Fruiting Vegetables", sys: "Dutch Bucket", ec: "2.0 - 4.0", ph: "5.5 - 6.5", temp: "18-28°C", light: "14-18 hrs", harvest: "55-80 days", form: "High K & Ca", mistakes: "Fruit splitting from irregular watering", tips: "Provide strong vertical support" },
    "चेरी टमाटर": { cat: "फूल वाली सब्जियां", sys: "डच बकेट", ec: "2.0 - 4.0", ph: "5.5 - 6.5", temp: "18-28°C", light: "14-18 घंटे", harvest: "55-80 दिन", form: "उच्च K और Ca", mistakes: "अनियमित पानी से फलों का फटना", tips: "मजबूत वर्टिकल सपोर्ट दें" },
    "bell pepper (capsicum)": { cat: "Fruiting Vegetables", sys: "Dutch Bucket", ec: "2.0 - 3.0", ph: "5.8 - 6.5", temp: "20-28°C", light: "14-18 hrs", harvest: "70-90 days", form: "High Potassium", mistakes: "Flower drop due to high temp", tips: "Maintain high humidity (60-70%)" },
    "शिमला मिर्च": { cat: "फूल वाली सब्जियां", sys: "डच बकेट", ec: "2.0 - 3.0", ph: "5.8 - 6.5", temp: "20-28°C", light: "14-18 घंटे", harvest: "70-90 दिन", form: "उच्च पोटेशियम", mistakes: "अधिक तापमान से फूलों का गिरना", tips: "उच्च आर्द्रता (60-70%) बनाए रखें" },
    "chili pepper": { cat: "Fruiting Vegetables", sys: "Dutch Bucket", ec: "2.0 - 3.5", ph: "5.8 - 6.5", temp: "20-30°C", light: "14-18 hrs", harvest: "70-100 days", form: "High Potassium", mistakes: "Overwatering causes root rot", tips: "Slight water stress increases heat (spice)" },
    "मिर्च": { cat: "फूल वाली सब्जियां", sys: "डच बकेट", ec: "2.0 - 3.5", ph: "5.8 - 6.5", temp: "20-30°C", light: "14-18 घंटे", harvest: "70-100 दिन", form: "उच्च पोटेशियम", mistakes: "अधिक पानी से जड़ सड़न", tips: "हल्का पानी कम देने से तीखापन बढ़ता है" },
    "cucumber": { cat: "Fruiting Vegetables", sys: "Dutch Bucket", ec: "1.7 - 2.5", ph: "5.5 - 6.0", temp: "22-28°C", light: "12-14 hrs", harvest: "50-70 days", form: "High Nitrogen & Potassium", mistakes: "Powdery mildew in high humidity", tips: "Use parthenocarpic (self-pollinating) varieties" },
    "खीरा": { cat: "फूल वाली सब्जियां", sys: "डच बकेट", ec: "1.7 - 2.5", ph: "5.5 - 6.0", temp: "22-28°C", light: "12-14 घंटे", harvest: "50-70 दिन", form: "उच्च नाइट्रोजन और पोटेशियम", mistakes: "उच्च आर्द्रता में फफूंदी (Powdery mildew)", tips: "स्व-परागण (self-pollinating) किस्मों का उपयोग करें" },
    "zucchini": { cat: "Fruiting Vegetables", sys: "Dutch Bucket / DWC", ec: "1.8 - 2.4", ph: "6.0 - 6.5", temp: "20-28°C", light: "12-14 hrs", harvest: "45-60 days", form: "Balanced Fruiting Formula", mistakes: "Poor pollination", tips: "Hand pollinate if grown indoors" },
    "तोरी (zucchini)": { cat: "फूल वाली सब्जियां", sys: "डच बकेट / DWC", ec: "1.8 - 2.4", ph: "6.0 - 6.5", temp: "20-28°C", light: "12-14 घंटे", harvest: "45-60 दिन", form: "संतुलित फ्रूटिंग फॉर्मूला", mistakes: "खराब परागण (Pollination)", tips: "इनडोर उगाने पर हाथ से परागण करें" },
    "eggplant (brinjal)": { cat: "Fruiting Vegetables", sys: "Dutch Bucket", ec: "2.5 - 3.5", ph: "5.5 - 6.5", temp: "22-30°C", light: "12-14 hrs", harvest: "70-90 days", form: "High Potassium", mistakes: "Spider mites in dry conditions", tips: "Requires heavy feeding" },
    "बैंगन": { cat: "फूल वाली सब्जियां", sys: "डच बकेट", ec: "2.5 - 3.5", ph: "5.5 - 6.5", temp: "22-30°C", light: "12-14 घंटे", harvest: "70-90 दिन", form: "उच्च पोटेशियम", mistakes: "सूखी परिस्थितियों में स्पाइडर माइट्स", tips: "अधिक पोषक तत्वों की आवश्यकता होती है" },
    "strawberry": { cat: "Fruiting Vegetables", sys: "NFT / Vertical Towers", ec: "1.0 - 1.4", ph: "5.5 - 6.0", temp: "15-22°C", light: "12-16 hrs", harvest: "60-90 days", form: "High Potassium, Low Nitrogen", mistakes: "Crown rot from planting too deep", tips: "Keep crowns above the media" },
    "स्ट्रॉबेरी": { cat: "फूल वाली सब्जियां", sys: "NFT / वर्टिकल टावर", ec: "1.0 - 1.4", ph: "5.5 - 6.0", temp: "15-22°C", light: "12-16 घंटे", harvest: "60-90 दिन", form: "उच्च पोटेशियम, कम नाइट्रोजन", mistakes: "गहराई में लगाने से क्राउन रॉट", tips: "क्राउन (जड़ का ऊपरी हिस्सा) को मीडिया के ऊपर रखें" },
    "okra (bhindi)": { cat: "Fruiting Vegetables", sys: "Dutch Bucket", ec: "2.0 - 2.5", ph: "6.0 - 6.5", temp: "25-35°C", light: "12-14 hrs", harvest: "50-65 days", form: "Balanced Fruiting Formula", mistakes: "Root knot nematodes in media", tips: "Loves heat, grows fast in summer" },
    "भिंडी": { cat: "फूल वाली सब्जियां", sys: "डच बकेट", ec: "2.0 - 2.5", ph: "6.0 - 6.5", temp: "25-35°C", light: "12-14 घंटे", harvest: "50-65 दिन", form: "संतुलित फ्रूटिंग फॉर्मूला", mistakes: "मीडिया में रूट नॉट नेमाटोड", tips: "गर्मी पसंद है, गर्मियों में तेजी से बढ़ती है" },

    // Root Vegetables
    "radish": { cat: "Root Vegetables", sys: "Media Bed (Coco Coir/Perlite)", ec: "1.2 - 1.8", ph: "6.0 - 6.5", temp: "10-20°C", light: "10-12 hrs", harvest: "25-35 days", form: "High Phosphorus", mistakes: "Too much nitrogen causes leafy growth, no root", tips: "Needs loose media to expand" },
    "मूली": { cat: "जड़ वाली सब्जियां", sys: "मीडिया बेड (कोको पीट/पर्लाइट)", ec: "1.2 - 1.8", ph: "6.0 - 6.5", temp: "10-20°C", light: "10-12 घंटे", harvest: "25-35 दिन", form: "उच्च फास्फोरस", mistakes: "अधिक नाइट्रोजन से केवल पत्तियां बढ़ती हैं, जड़ नहीं", tips: "फैलने के लिए ढीले मीडिया की आवश्यकता होती है" },
    "carrot": { cat: "Root Vegetables", sys: "Deep Media Bed", ec: "1.5 - 2.0", ph: "6.0 - 6.5", temp: "15-20°C", light: "12-14 hrs", harvest: "60-80 days", form: "High Phosphorus & Potassium", mistakes: "Forking roots due to dense media", tips: "Use deep, loose perlite/coco mix" },
    "गाजर": { cat: "जड़ वाली सब्जियां", sys: "डीप मीडिया बेड", ec: "1.5 - 2.0", ph: "6.0 - 6.5", temp: "15-20°C", light: "12-14 घंटे", harvest: "60-80 दिन", form: "उच्च फास्फोरस और पोटेशियम", mistakes: "कठोर मीडिया के कारण जड़ों का फटना", tips: "गहरे, ढीले पर्लाइट/कोको मिक्स का उपयोग करें" },
    "beetroot": { cat: "Root Vegetables", sys: "Media Bed", ec: "1.8 - 2.5", ph: "6.0 - 6.5", temp: "15-22°C", light: "10-12 hrs", harvest: "50-65 days", form: "Balanced Root Formula", mistakes: "Boron deficiency causes black spots", tips: "Ensure adequate Boron trace element" },
    "चुकंदर": { cat: "जड़ वाली सब्जियां", sys: "मीडिया बेड", ec: "1.8 - 2.5", ph: "6.0 - 6.5", temp: "15-22°C", light: "10-12 घंटे", harvest: "50-65 दिन", form: "संतुलित रूट फॉर्मूला", mistakes: "बोरॉन की कमी से काले धब्बे", tips: "पर्याप्त बोरॉन (Trace element) सुनिश्चित करें" },
    "turnip": { cat: "Root Vegetables", sys: "Media Bed", ec: "1.5 - 2.0", ph: "6.0 - 6.5", temp: "10-20°C", light: "10-12 hrs", harvest: "40-55 days", form: "High Phosphorus", mistakes: "Woody texture from high temps", tips: "Harvest early for tenderness" },
    "शलजम": { cat: "जड़ वाली सब्जियां", sys: "मीडिया बेड", ec: "1.5 - 2.0", ph: "6.0 - 6.5", temp: "10-20°C", light: "10-12 घंटे", harvest: "40-55 दिन", form: "उच्च फास्फोरस", mistakes: "उच्च तापमान से कठोर (Woody) बनावट", tips: "मुलायम शलजम के लिए जल्दी काटें" },
    "onion": { cat: "Root Vegetables", sys: "Media Bed", ec: "1.4 - 1.8", ph: "6.0 - 6.5", temp: "15-25°C", light: "12-14 hrs", harvest: "90-120 days", form: "High Phosphorus", mistakes: "Bulb rot from too much moisture", tips: "Keep top of bulb dry" },
    "प्याज": { cat: "जड़ वाली सब्जियां", sys: "मीडिया बेड", ec: "1.4 - 1.8", ph: "6.0 - 6.5", temp: "15-25°C", light: "12-14 घंटे", harvest: "90-120 दिन", form: "उच्च फास्फोरस", mistakes: "अधिक नमी से बल्ब का सड़ना", tips: "बल्ब के ऊपरी हिस्से को सूखा रखें" },
    "garlic": { cat: "Root Vegetables", sys: "Media Bed", ec: "1.4 - 1.8", ph: "6.0 - 6.5", temp: "10-20°C", light: "10-12 hrs", harvest: "120-150 days", form: "High Phosphorus", mistakes: "Small bulbs from lack of cold period (vernalization)", tips: "Needs cold treatment before planting" },
    "लहसुन": { cat: "जड़ वाली सब्जियां", sys: "मीडिया बेड", ec: "1.4 - 1.8", ph: "6.0 - 6.5", temp: "10-20°C", light: "10-12 घंटे", harvest: "120-150 दिन", form: "उच्च फास्फोरस", mistakes: "ठंड (vernalization) की कमी से छोटे बल्ब", tips: "लगाने से पहले ठंडे उपचार की आवश्यकता होती है" },
    "ginger": { cat: "Root Vegetables", sys: "Media Bed", ec: "2.0 - 2.5", ph: "5.5 - 6.5", temp: "25-30°C", light: "10-12 hrs", harvest: "8-10 months", form: "Balanced Root Formula", mistakes: "Rhizome rot from waterlogging", tips: "Requires excellent drainage" },
    "अदरक": { cat: "जड़ वाली सब्जियां", sys: "मीडिया बेड", ec: "2.0 - 2.5", ph: "5.5 - 6.5", temp: "25-30°C", light: "10-12 घंटे", harvest: "8-10 महीने", form: "संतुलित रूट फॉर्मूला", mistakes: "जलभराव से प्रकंद (Rhizome) सड़न", tips: "उत्कृष्ट जल निकासी (Drainage) की आवश्यकता है" },

    // Herbs
    "coriander (cilantro)": { cat: "Herbs", sys: "NFT / DWC", ec: "1.2 - 1.8", ph: "6.0 - 6.5", temp: "15-22°C", light: "10-12 hrs", harvest: "30-45 days", form: "Standard Veg Formula", mistakes: "Bolts rapidly in heat", tips: "Succession planting every 2 weeks" },
    "धनिया": { cat: "जड़ी बूटियां", sys: "NFT / DWC", ec: "1.2 - 1.8", ph: "6.0 - 6.5", temp: "15-22°C", light: "10-12 घंटे", harvest: "30-45 दिन", form: "मानक वेज फॉर्मूला", mistakes: "गर्मी में जल्दी फूल आते हैं", tips: "हर 2 सप्ताह में नए बीज बोएं" },
    "mint": { cat: "Herbs", sys: "NFT / DWC", ec: "2.0 - 2.4", ph: "5.5 - 6.5", temp: "15-25°C", light: "12-14 hrs", harvest: "Ongoing", form: "High Nitrogen", mistakes: "Roots clog NFT channels", tips: "Prune roots regularly" },
    "पुदीना": { cat: "जड़ी बूटियां", sys: "NFT / DWC", ec: "2.0 - 2.4", ph: "5.5 - 6.5", temp: "15-25°C", light: "12-14 घंटे", harvest: "लगातार", form: "उच्च नाइट्रोजन", mistakes: "जड़ें NFT चैनल को ब्लॉक कर देती हैं", tips: "जड़ों को नियमित रूप से काटें" },
    "basil": { cat: "Herbs", sys: "NFT / DWC", ec: "1.6 - 2.2", ph: "5.5 - 6.5", temp: "20-28°C", light: "12-14 hrs", harvest: "30-40 days", form: "High Nitrogen", mistakes: "Cold water causes root shock", tips: "Pinch off flowers to keep leaves sweet" },
    "तुलसी / बेसिल": { cat: "जड़ी बूटियां", sys: "NFT / DWC", ec: "1.6 - 2.2", ph: "5.5 - 6.5", temp: "20-28°C", light: "12-14 घंटे", harvest: "30-40 दिन", form: "उच्च नाइट्रोजन", mistakes: "ठंडे पानी से जड़ों को झटका (Shock)", tips: "पत्तियों को मीठा रखने के लिए फूलों को तोड़ दें" },
    "parsley": { cat: "Herbs", sys: "NFT / DWC", ec: "1.2 - 1.8", ph: "5.5 - 6.5", temp: "15-22°C", light: "10-12 hrs", harvest: "40-60 days", form: "Standard Veg Formula", mistakes: "Slow germination", tips: "Soak seeds overnight before planting" },
    "अजमोद (parsley)": { cat: "जड़ी बूटियां", sys: "NFT / DWC", ec: "1.2 - 1.8", ph: "5.5 - 6.5", temp: "15-22°C", light: "10-12 घंटे", harvest: "40-60 दिन", form: "मानक वेज फॉर्मूला", mistakes: "अंकुरण (Germination) धीमा होता है", tips: "बोने से पहले बीजों को रात भर भिगोएं" },
    "dill": { cat: "Herbs", sys: "NFT / DWC", ec: "1.0 - 1.6", ph: "5.5 - 6.5", temp: "15-25°C", light: "10-12 hrs", harvest: "40-50 days", form: "Standard Veg Formula", mistakes: "Does not transplant well", tips: "Sow directly into final media" },
    "सोया (dill)": { cat: "जड़ी बूटियां", sys: "NFT / DWC", ec: "1.0 - 1.6", ph: "5.5 - 6.5", temp: "15-25°C", light: "10-12 घंटे", harvest: "40-50 दिन", form: "मानक वेज फॉर्मूला", mistakes: "ट्रांसप्लांट करने पर खराब हो जाता है", tips: "सीधे अंतिम मीडिया में बोएं" },
    "oregano": { cat: "Herbs", sys: "Ebb & Flow / DWC", ec: "1.5 - 2.0", ph: "6.0 - 7.0", temp: "15-25°C", light: "12-14 hrs", harvest: "Ongoing", form: "Standard Veg Formula", mistakes: "Root rot from constant moisture", tips: "Let media dry slightly between waterings" },
    "अजवायन की पत्ती (oregano)": { cat: "जड़ी बूटियां", sys: "एब एंड फ्लो / DWC", ec: "1.5 - 2.0", ph: "6.0 - 7.0", temp: "15-25°C", light: "12-14 घंटे", harvest: "लगातार", form: "मानक वेज फॉर्मूला", mistakes: "लगातार नमी से जड़ सड़न", tips: "पानी देने के बीच मीडिया को थोड़ा सूखने दें" },
    "thyme": { cat: "Herbs", sys: "Ebb & Flow", ec: "1.2 - 1.8", ph: "5.5 - 7.0", temp: "15-25°C", light: "12-14 hrs", harvest: "Ongoing", form: "Standard Veg Formula", mistakes: "Overwatering", tips: "Prefers drier conditions" },
    "थाइम": { cat: "जड़ी बूटियां", sys: "एब एंड फ्लो", ec: "1.2 - 1.8", ph: "5.5 - 7.0", temp: "15-25°C", light: "12-14 घंटे", harvest: "लगातार", form: "मानक वेज फॉर्मूला", mistakes: "अधिक पानी देना", tips: "सूखी परिस्थितियां पसंद हैं" },
    "rosemary": { cat: "Herbs", sys: "Ebb & Flow", ec: "1.2 - 1.8", ph: "5.5 - 6.0", temp: "15-25°C", light: "12-14 hrs", harvest: "Ongoing", form: "Standard Veg Formula", mistakes: "Extremely slow from seed", tips: "Propagate from cuttings" },
    "रोजमेरी": { cat: "जड़ी बूटियां", sys: "एब एंड फ्लो", ec: "1.2 - 1.8", ph: "5.5 - 6.0", temp: "15-25°C", light: "12-14 घंटे", harvest: "लगातार", form: "मानक वेज फॉर्मूला", mistakes: "बीज से बहुत धीमी गति से बढ़ता है", tips: "कटिंग (Cuttings) से उगाएं" },
    "lemon balm": { cat: "Herbs", sys: "NFT / DWC", ec: "1.0 - 1.6", ph: "5.5 - 6.5", temp: "15-25°C", light: "10-12 hrs", harvest: "Ongoing", form: "Standard Veg Formula", mistakes: "Loses flavor if over-fertilized", tips: "Keep EC on the lower side" },
    "लेमन बाम": { cat: "जड़ी बूटियां", sys: "NFT / DWC", ec: "1.0 - 1.6", ph: "5.5 - 6.5", temp: "15-25°C", light: "10-12 घंटे", harvest: "लगातार", form: "मानक वेज फॉर्मूला", mistakes: "अधिक उर्वरक से स्वाद कम हो जाता है", tips: "EC को कम रखें" },
    "sage": { cat: "Herbs", sys: "Ebb & Flow", ec: "1.2 - 1.6", ph: "5.5 - 6.5", temp: "15-25°C", light: "12-14 hrs", harvest: "Ongoing", form: "Standard Veg Formula", mistakes: "Root rot in DWC", tips: "Needs excellent drainage" },
    "सेज": { cat: "जड़ी बूटियां", sys: "एब एंड फ्लो", ec: "1.2 - 1.6", ph: "5.5 - 6.5", temp: "15-25°C", light: "12-14 घंटे", harvest: "लगातार", form: "मानक वेज फॉर्मूला", mistakes: "DWC में जड़ सड़न", tips: "उत्कृष्ट जल निकासी की आवश्यकता है" },
    "lavender": { cat: "Herbs", sys: "Ebb & Flow", ec: "1.0 - 1.4", ph: "6.0 - 6.5", temp: "15-25°C", light: "12-14 hrs", harvest: "Ongoing", form: "Standard Veg Formula", mistakes: "Too much moisture kills it", tips: "Use highly porous media (Perlite/Hydroton)" },
    "लैवेंडर": { cat: "जड़ी बूटियां", sys: "एब एंड फ्लो", ec: "1.0 - 1.4", ph: "6.0 - 6.5", temp: "15-25°C", light: "12-14 घंटे", harvest: "लगातार", form: "मानक वेज फॉर्मूला", mistakes: "अधिक नमी इसे मार देती है", tips: "अत्यधिक छिद्रपूर्ण मीडिया (पर्लाइट/हाइड्रोटन) का उपयोग करें" },
    "stevia": { cat: "Herbs", sys: "NFT / DWC", ec: "1.0 - 1.5", ph: "5.5 - 6.5", temp: "20-28°C", light: "12-14 hrs", harvest: "Ongoing", form: "Standard Veg Formula", mistakes: "Leaves lose sweetness if it flowers", tips: "Pinch off flowers immediately" },
    "स्टीविया": { cat: "जड़ी बूटियां", sys: "NFT / DWC", ec: "1.0 - 1.5", ph: "5.5 - 6.5", temp: "20-28°C", light: "12-14 घंटे", harvest: "लगातार", form: "मानक वेज फॉर्मूला", mistakes: "फूल आने पर पत्तियों की मिठास कम हो जाती है", tips: "फूलों को तुरंत तोड़ दें" },

    // Microgreens
    "microgreens": { cat: "Microgreens", sys: "Shallow Trays with Coco Mats", ec: "0.0 - 0.5 (Often just water)", ph: "5.5 - 6.0", temp: "18-24°C", light: "12-16 hrs", harvest: "7-14 days", form: "None or very weak nutrient solution", mistakes: "Mold from poor airflow and overwatering", tips: "Keep seeds in the dark for first 3-4 days" },
    "माइक्रोग्रीन्स": { cat: "माइक्रोग्रीन्स", sys: "कोको मैट के साथ उथली ट्रे", ec: "0.0 - 0.5 (अक्सर केवल पानी)", ph: "5.5 - 6.0", temp: "18-24°C", light: "12-16 घंटे", harvest: "7-14 दिन", form: "कोई नहीं या बहुत कमजोर पोषक तत्व", mistakes: "खराब वायु प्रवाह और अधिक पानी से फफूंदी (Mold)", tips: "पहले 3-4 दिनों तक बीजों को अंधेरे में रखें" }
  };

  const data = db[name];
  if (!data) return null;

  if (lang === 'hi') {
    return `${plantName}

1. पौधे की जानकारी (Plant Overview)
- पौधे का प्रकार: ${data.cat}

2. अनुशंसित हाइड्रोपोनिक सिस्टम (Recommended Systems)
- ${data.sys}

3. विकास के चरण और समय (Growth Stages and Timeline)
चरण | अवधि | मुख्य गतिविधियाँ
कटाई (Harvest) | ${data.harvest} | कटाई के लिए तैयार

4. पोषक तत्वों की आवश्यकताएं (Nutrient Requirements)
- अनुशंसित pH रेंज: ${data.ph}
- EC रेंज: ${data.ec} mS/cm
- महत्वपूर्ण पोषक तत्व: ${data.form}

5. आदर्श बढ़ने की स्थिति (Ideal Growing Conditions)
- तापमान: ${data.temp}
- प्रकाश (Light): ${data.light}

6. सामान्य समस्याएं और समाधान (Common Problems and Solutions)
- ${data.mistakes}

7. कटाई के टिप्स (Harvesting Tips)
- कटाई का समय: ${data.harvest}
- प्रो-टिप: ${data.tips}
`;
  }

  return `${plantName}

1. Plant Overview
- Plant type: ${data.cat}

2. Recommended Hydroponic Systems
- ${data.sys}

3. Growth Stages and Timeline
Stage | Duration | Key Activities
Harvest | ${data.harvest} | Ready for harvest

4. Nutrient Requirements
- Recommended pH range: ${data.ph}
- EC range: ${data.ec} mS/cm
- Important nutrients: ${data.form}

5. Ideal Growing Conditions
- Temperature: ${data.temp}
- Lighting hours: ${data.light}

6. Common Problems and Solutions
- ${data.mistakes}

7. Harvesting Tips
- harvest time: ${data.harvest}
- Pro-Tip: ${data.tips}
`;
};
