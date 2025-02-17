const fields = ["Ad", "Soyad", "T.C. Kimlik No", "E-Posta", "Cinsiyet", "Akademik Unvan", "İşe Giriş Tarihi", "Sicil No", 
  "Kadro", "Unvan", "Personel Türü", "Çalışma Türü", "Çalışma Durumu", "Birim", "Görev", "Çalışılan Proje", "Takım", "Mentor", 
  "Servis Kullanımı", "İkametgah Adresi", "Telefon", "Doğum Tarihi", "Dahili Numara", "Oda Numara", "Araç Plakası", "Kan Grubu", 
  "Acil Durumda Ulaşılacak Kişi", "Acil Durumda Ulaşılacak Kişi Tel"
];

const englishFields = ["name", "surname", "TCKimlikNo", "email", "gender", "academicTitle", "dateOfStart", "recordNo", 
  "staff", "title", "staffType", "typeOfWork", "workStatus", "department", "task", "projectInWork", "team", "mentor", 
  "serviceUsage", "address", "phone", "birthDate", "internalNumber", "roomNo", "plateNo", "bloodType", 
  "emergencyContact", "emergencyContactPhone"
];

const EmptyFields = fields.reduce((acc, key) => {
  acc[key] = '';
  return acc;
}, {});

const englishMapping = fields.reduce((acc, key, index) => {
  acc[key] = englishFields[index];
  return acc;
}, {});

const leftSideFields = fields.slice(0, 19);
const rightSideFields = fields.slice(19);

const requiredFields = ['Ad', 'Soyad', 'T.C. Kimlik No', 'Cinsiyet', 'İşe Giriş Tarihi', 'Kadro', 'Unvan', 'Personel Türü', 'Çalışma Türü',
  'Çalışma Durumu', 'Birim', 'Görev'];

export { EmptyFields, englishMapping, leftSideFields, rightSideFields, requiredFields };