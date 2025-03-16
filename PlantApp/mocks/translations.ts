export type TranslationKey =
  | 'app.name'
  | 'app.offlineMode'
  | 'home.title'
  | 'home.scan'
  | 'home.history'
  | 'home.tips'
  | 'home.heroTitle'
  | 'home.heroSubtitle'
  | 'home.commonPlants'
  | 'home.commonDiseases'
  | 'scan.title'
  | 'scan.instructions'
  | 'scan.analyzing'
  | 'scan.results'
  | 'scan.noDisease'
  | 'scan.takePhoto'
  | 'scan.uploadImage'
  | 'scan.diagnosisConfidence'
  | 'scan.viewTreatments'
  | 'scan.notFound'
  | 'scan.infoNotFound'
  | 'scan.error.title'
  | 'scan.error.message'
  | 'scan.error.cameraMessage'
  | 'scan.error.galleryMessage'
  | 'disease.symptoms'
  | 'disease.causes'
  | 'disease.treatments'
  | 'disease.chemical'
  | 'disease.organic'
  | 'disease.prevention'
  | 'disease.affectedPlants'
  | 'disease.notFound'
  | 'history.title'
  | 'history.empty'
  | 'history.delete'
  | 'tips.title'
  | 'tips.general'
  | 'settings.title'
  | 'settings.language'
  | 'settings.notifications'
  | 'settings.about'
  | 'settings.offline'
  | 'settings.version'
  | 'common.save'
  | 'common.cancel'
  | 'common.delete'
  | 'common.edit'
  | 'common.loading'
  | 'common.viewAll'
  | 'common.ok'
  | 'common.goBack';

export type Translations = {
  [key in TranslationKey]: string;
};

export const translations: Record<string, Translations> = {
  en: {
    'app.name': 'Plant Health Assistant',
    'app.offlineMode': 'You are currently in offline mode. Some features may be limited.',
    'home.title': 'Plant Health Assistant',
    'home.scan': 'Scan Plant',
    'home.history': 'Scan History',
    'home.tips': 'Plant Care Tips',
    'home.heroTitle': 'Plant Health Assistant',
    'home.heroSubtitle': 'Detect diseases and get treatment recommendations',
    'home.commonPlants': 'Common Plants',
    'home.commonDiseases': 'Common Diseases',
    'scan.title': 'Scan Plant',
    'scan.instructions': 'Position the camera to capture the affected part of the plant clearly.',
    'scan.analyzing': 'Analyzing plant...',
    'scan.results': 'Scan Results',
    'scan.noDisease': 'No disease detected. Your plant appears healthy!',
    'scan.takePhoto': 'Take Photo',
    'scan.uploadImage': 'Upload Image',
    'scan.diagnosisConfidence': 'Diagnosis Confidence',
    'scan.viewTreatments': 'View Treatments',
    'scan.notFound': 'Scan result not found',
    'scan.infoNotFound': 'Plant or disease information not found',
    'scan.error.title': 'Scan Error',
    'scan.error.message': 'There was a problem identifying the plant. Please try again.',
    'scan.error.cameraMessage': 'There was a problem accessing the camera. Please check your permissions.',
    'scan.error.galleryMessage': 'There was a problem accessing your photos. Please check your permissions.',
    'disease.symptoms': 'Symptoms',
    'disease.causes': 'Causes',
    'disease.treatments': 'Treatments',
    'disease.chemical': 'Chemical Solutions',
    'disease.organic': 'Organic Solutions',
    'disease.prevention': 'Prevention',
    'disease.affectedPlants': 'Commonly Affected Plants',
    'disease.notFound': 'Disease information not found',
    'history.title': 'Scan History',
    'history.empty': 'No scan history yet. Start by scanning a plant!',
    'history.delete': 'Delete History',
    'tips.title': 'Plant Care Tips',
    'tips.general': 'General Tips',
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.notifications': 'Notifications',
    'settings.about': 'About',
    'settings.offline': 'Offline Mode',
    'settings.version': 'Version',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.loading': 'Loading...',
    'common.viewAll': 'View All',
    'common.ok': 'OK',
    'common.goBack': 'Go Back'
  },
  ha: {
    'app.name': 'Mataimakiyar Kiwon Tsiro',
    'app.offlineMode': 'Kana a yanzu a yanayin offline. Wasu abubuwan iya iyawa za su iya iyawa.',
    'home.title': 'Mataimakiyar Kiwon Tsiro',
    'home.scan': 'Duba Tsiro',
    'home.history': 'Tarihin Duba',
    'home.tips': 'Shawarwarin Kula da Tsiro',
    'home.heroTitle': 'Mataimakiyar Kiwon Tsiro',
    'home.heroSubtitle': 'Gano cututtuka kuma sami shawarwarin magani',
    'home.commonPlants': 'Tsirai na Gargajiya',
    'home.commonDiseases': 'Cututtuka na Gargajiya',
    'scan.title': 'Duba Tsiro',
    'scan.instructions': 'Ajiye kyamarar don ɗaukar hoton sashen tsiro da aka shafa a fili.',
    'scan.analyzing': 'Ana nazarin tsiro...',
    'scan.results': 'Sakamakon Bincike',
    'scan.noDisease': 'Ba a gano cuta ba. Tsiron ku na da lafiya!',
    'scan.takePhoto': 'Ɗauki Hoto',
    'scan.uploadImage': 'Ɗora Hoto',
    'scan.diagnosisConfidence': 'Tabbacin Bincike',
    'scan.viewTreatments': 'Duba Magani',
    'scan.notFound': 'Ba a sami sakamakon bincike ba',
    'scan.infoNotFound': 'Ba a sami bayanan tsiro ko cuta ba',
    'scan.error.title': 'Kuskuren Bincike',
    'scan.error.message': 'An sami matsala wajen gano tsiro. Da fatan za a sake gwadawa.',
    'scan.error.cameraMessage': 'An sami matsala wajen samun damar shiga kyamara. Da fatan za a duba izinin ku.',
    'scan.error.galleryMessage': 'An sami matsala wajen samun damar shiga hotuna. Da fatan za a duba izinin ku.',
    'disease.symptoms': 'Alamomi',
    'disease.causes': 'Dalilai',
    'disease.treatments': 'Magani',
    'disease.chemical': 'Maganin Kimiyya',
    'disease.organic': 'Maganin Organic',
    'disease.prevention': 'Rigakafi',
    'disease.affectedPlants': 'Tsirai da Suka Fi Kamuwa',
    'disease.notFound': 'Ba a sami bayanan cuta ba',
    'history.title': 'Tarihin Duba',
    'history.empty': 'Babu tarihin duba har yanzu. Fara ta hanyar duba tsiro!',
    'history.delete': 'Share Tarihi',
    'tips.title': 'Shawarwarin Kula da Tsiro',
    'tips.general': 'Shawarwari na Gaba',
    'settings.title': 'Saituna',
    'settings.language': 'Harshe',
    'settings.notifications': 'Sanarwa',
    'settings.about': 'Game da Mu',
    'settings.offline': 'Yanayin Offline',
    'settings.version': 'Sigar',
    'common.save': 'Ajiye',
    'common.cancel': 'Soke',
    'common.delete': 'Share',
    'common.edit': 'Gyara',
    'common.loading': 'Ana lodawa...',
    'common.viewAll': 'Duba Duka',
    'common.ok': 'OK',
    'common.goBack': 'Koma Baya'
  },
  yo: {
    'app.name': 'Olùrànlọ́wọ́ Ìlera Ọ̀gbìn',
    'app.offlineMode': 'O wa ni ipo aisinipo lọwọlọwọ. Awọn ẹya kan le ni opin.',
    'home.title': 'Olùrànlọ́wọ́ Ìlera Ọ̀gbìn',
    'home.scan': 'Yẹ Ọ̀gbìn wò',
    'home.history': 'Ìtàn Àyẹ̀wò',
    'home.tips': 'Ìmọ̀ràn Ìtọ́jú Ọ̀gbìn',
    'home.heroTitle': 'Olùrànlọ́wọ́ Ìlera Ọ̀gbìn',
    'home.heroSubtitle': 'Ṣàwárí àwọn àrùn ati gba àwọn ìmọ̀ràn ìtọ́jú',
    'home.commonPlants': 'Àwọn Ọ̀gbìn Gbogbogbò',
    'home.commonDiseases': 'Àwọn Àrùn Gbogbogbò',
    'scan.title': 'Yẹ Ọ̀gbìn wò',
    'scan.instructions': 'Fi kámẹ́rà sí ọ̀nà láti mú àwọn apá ọ̀gbìn tí ó ní ìṣòro hàn kedere.',
    'scan.analyzing': 'Ń ṣe àyẹ̀wò ọ̀gbìn...',
    'scan.results': 'Àbájáde Àyẹ̀wò',
    'scan.noDisease': 'A kò rí àìsàn kankan. Ọ̀gbìn rẹ dàbí ẹni tí ó ní ìlera!',
    'scan.takePhoto': 'Ya Àwòrán',
    'scan.uploadImage': 'Gbé Àwòrán Sókè',
    'scan.diagnosisConfidence': 'Ìgbẹ́kẹ̀lé Ìdámọ̀',
    'scan.viewTreatments': 'Wo Àwọn Ìtọ́jú',
    'scan.notFound': 'A kò rí àbájáde àyẹ̀wò',
    'scan.infoNotFound': 'A kò rí ìwífún nípa ọ̀gbìn tàbí àrùn',
    'scan.error.title': 'Àṣìṣe Àyẹ̀wò',
    'scan.error.message': 'Ìṣòro wà nípa ṣíṣe ìdámọ̀ ọ̀gbìn náà. Jọ̀wọ́ gbìyànjú lẹ́ẹ̀kan si.',
    'scan.error.cameraMessage': 'Ìṣòro wà nípa wíwọlé sí kámẹ́rà. Jọ̀wọ́ ṣàyẹ̀wò àwọn ìyọ̀nda rẹ.',
    'scan.error.galleryMessage': 'Ìṣòro wà nípa wíwọlé sí àwọn fọ́tò rẹ. Jọ̀wọ́ ṣàyẹ̀wò àwọn ìyọ̀nda rẹ.',
    'disease.symptoms': 'Àwọn àmì',
    'disease.causes': 'Àwọn ìdí',
    'disease.treatments': 'Ìtọ́jú',
    'disease.chemical': 'Àwọn Ìwòsàn Kẹ́míkà',
    'disease.organic': 'Àwọn Ìwòsàn Alákọ́ṣe',
    'disease.prevention': 'Ìdènà',
    'disease.affectedPlants': 'Àwọn Ọ̀gbìn tí ó Sábà Ní Ìpalára',
    'disease.notFound': 'A kò rí ìwífún nípa àrùn',
    'history.title': 'Ìtàn Àyẹ̀wò',
    'history.empty': 'Kò sí ìtàn àyẹ̀wò síbẹ̀. Bẹ̀rẹ̀ nípa yíyẹ ọ̀gbìn kan wò!',
    'history.delete': 'Pa Ìtàn rẹ́',
    'tips.title': 'Ìmọ̀ràn Ìtọ́jú Ọ̀gbìn',
    'tips.general': 'Àwọn Ìmọ̀ràn Gbogbogbò',
    'settings.title': 'Ìṣètò',
    'settings.language': 'Èdè',
    'settings.notifications': 'Ìfitónilétí',
    'settings.about': 'Nípa Wa',
    'settings.offline': 'Ipo Offline',
    'settings.version': 'Ẹ̀yà',
    'common.save': 'Fi pamọ́',
    'common.cancel': 'Fagilé',
    'common.delete': 'Pa rẹ́',
    'common.edit': 'Ṣàtúnṣe',
    'common.loading': 'Ń gbé wọlé...',
    'common.viewAll': 'Wo Gbogbo rẹ̀',
    'common.ok': 'OK',
    'common.goBack': 'Padà Sẹ́yìn'
  },
  ig: {
    'app.name': 'Enyemaka Ahụike Osisi',
    'app.offlineMode': 'Ị nọ ugbu a na ọnọdụ offline. Ụfọdụ atụmatụ nwere ike ịdị mfe.',
    'home.title': 'Enyemaka Ahụike Osisi',
    'home.scan': 'Nyochaa Osisi',
    'home.history': 'Akụkọ Nyocha',
    'home.tips': 'Ndụmọdụ Nlekọta Osisi',
    'home.heroTitle': 'Enyemaka Ahụike Osisi',
    'home.heroSubtitle': 'Chọpụta ọrịa ma nweta ndụmọdụ ọgwụgwọ',
    'home.commonPlants': 'Osisi Izugbe',
    'home.commonDiseases': 'Ọrịa Izugbe',
    'scan.title': 'Nyochaa Osisi',
    'scan.instructions': 'Tinye igwefoto iji chọpụta akụkụ osisi nke metụtara nke ọma.',
    'scan.analyzing': 'Na-enyocha osisi...',
    'scan.results': 'Nsoputà Nyocha',
    'scan.noDisease': 'Enweghị ọrịa achọpụtara. Osisi gị yiri ka ọ dị ahụike!',
    'scan.takePhoto': 'Were Foto',
    'scan.uploadImage': 'Tinye Foto',
    'scan.diagnosisConfidence': 'Nkwenye Nyocha',
    'scan.viewTreatments': 'Lelee Ọgwụgwọ',
    'scan.notFound': 'Achọghị nsoputà nyocha',
    'scan.infoNotFound': 'Achọghị ozi osisi ma ọ bụ ọrịa',
    'scan.error.title': 'Mperi Nyocha',
    'scan.error.message': 'E nwere nsogbu na-achọpụta osisi. Biko nwaa ọzọ.',
    'scan.error.cameraMessage': 'E nwere nsogbu na-enweta ohere na igwefoto. Biko lelee ikike gị.',
    'scan.error.galleryMessage': 'E nwere nsogbu na-enweta ohere na foto gị. Biko lelee ikike gị.',
    'disease.symptoms': 'Mgbaàmà',
    'disease.causes': 'Ihe Kpatara',
    'disease.treatments': 'Ọgwụgwọ',
    'disease.chemical': 'Ngwọta Kemịkal',
    'disease.organic': 'Ngwọta Organic',
    'disease.prevention': 'Mgbochi',
    'disease.affectedPlants': 'Osisi ndị na-emetụta',
    'disease.notFound': 'Achọghị ozi ọrịa',
    'history.title': 'Akụkọ Nyocha',
    'history.empty': 'Enweghị akụkọ nyocha ugbu a. Bido site na ịnyocha osisi!',
    'history.delete': 'Hichapụ Akụkọ',
    'tips.title': 'Ndụmọdụ Nlekọta Osisi',
    'tips.general': 'Ndụmọdụ Izugbe',
    'settings.title': 'Ntọala',
    'settings.language': 'Asụsụ',
    'settings.notifications': 'Ọkwa',
    'settings.about': 'Banyere Anyị',
    'settings.offline': 'Ọnọdụ Offline',
    'settings.version': 'Ụdị',
    'common.save': 'Chekwa',
    'common.cancel': 'Kagbuo',
    'common.delete': 'Hichapụ',
    'common.edit': 'Dezie',
    'common.loading': 'Na-ebugo...',
    'common.viewAll': 'Hụ Niile',
    'common.ok': 'OK',
    'common.goBack': 'Laghachi Azụ'
  }
};