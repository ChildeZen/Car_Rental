// import all images from assets/images directory
// import img01 from "../all-images/cars-img/nissan-offer.png";
// import img02 from "../all-images/cars-img/2022 Daihatsu Xenia launched in Indonesia – from RM56k.jpg"
// import img03 from "../all-images/cars-img/toyota-avanza.jpg"
// import img04 from "../all-images/cars-img/nissan-offer.png";
// import img06 from "../all-images/cars-img/mercedes-offer.png";
// import img07 from "../all-images/cars-img/toyota-offer-2.png";
// import img08 from "../all-images/cars-img/mercedes-offer.png";

const carData = [
  {
    id: 1,
    brand: 'Toyota',
    category: 'MPV',
    rating: 150,
    carName: 'Avanza',
    model: 'Model-2024',
    price: 250,
    imgUrl:
      'https://i.pinimg.com/736x/56/0a/a9/560aa9ed57e9385c792ce95ca6d71191.jpg',
    speed: '15kmpl',
    gps: 'GPS Navigation',
    seatType: 'Long Sofa Mode',
    automatic: 'Automatic/Manual',
    description:
      'Toyota Avanza adalah pilihan legendaris untuk keluarga Indonesia yang menawarkan kabin luas dengan fitur Long Sofa Mode yang fleksibel. Mobil ini dikenal sangat tangguh, irit bahan bakar, dan memiliki biaya perawatan yang terjangkau, menjadikannya standar utama untuk kebutuhan rental harian maupun perjalanan jauh.',
    bookedDates: ['2026-05-01', '2026-05-02'], // Sample booked dates
  },
  {
    id: 2,
    brand: 'Mitsubishi',
    category: 'MPV',
    rating: 350.0,
    carName: 'Xpander',
    model: 'Model-2024',
    price: 350,
    imgUrl:
      'https://i.pinimg.com/1200x/39/15/e9/3915e91cb53bc256462773d620b4f1fc.jpg',
    speed: '14kmpl',
    gps: 'GPS Navigation',
    seatType: 'Premium Fabric',
    automatic: 'Automatic',
    description:
      'Mitsubishi Xpander menonjolkan kenyamanan berkendara yang superior berkat sistem suspensi terbaik di kelasnya yang sangat empuk. Dengan desain interior yang mewah dan kedap suara yang baik, mobil ini memberikan pengalaman perjalanan yang lebih eksklusif dan tenang bagi seluruh penumpang.',
    bookedDates: [], // Available
  },
  {
    id: 3,
    brand: 'Suzuki',
    category: 'MPV',
    rating: 128.0,
    carName: 'Ertiga',
    model: 'Model-2023',
    price: 250,
    imgUrl:
      'https://i.pinimg.com/736x/8e/77/f1/8e77f1515a70f8cafed72fac8336990a.jpg',
    speed: '18kmpl',
    gps: 'GPS Navigation',
    seatType: 'Ergonomic Seats',
    automatic: 'Automatic',
    description:
      'Suzuki Ertiga adalah pilihan rasional yang mengutamakan kehalusan mesin dan efisiensi bahan bakar yang tinggi. Kabinnya dirancang ergonomis dengan sentuhan interior yang nyaman, menjadikannya favorit bagi penyewa yang mencari keseimbangan antara fungsionalitas dan penghematan biaya.',
    bookedDates: ['2026-05-05', '2026-05-06', '2026-05-07'], // 3 days booked
  },
  {
    id: 4,
    brand: 'Honda',
    category: 'City Car',
    rating: 120.0,
    carName: 'Brio',
    model: 'Model-2023',
    price: 200,
    imgUrl:
      'https://i.pinimg.com/736x/ec/c3/11/ecc3114a235c34eb6ff85eb596fea1b7.jpg',
    speed: '20kmpl',
    gps: 'Integrated Maps',
    seatType: 'Sporty Bucket',
    automatic: 'Automatic',
    description:
      'Honda Brio adalah mobil perkotaan yang lincah, sangat bertenaga, dan sangat mudah untuk bermanuver di jalan sempit maupun area parkir yang terbatas. Dengan konsumsi bahan bakar yang sangat hemat, mobil ini adalah solusi praktis bagi anak muda atau pasangan yang ingin berkeliling kota dengan efisien.',
    bookedDates: [],
  },
  {
    id: 5,
    brand: 'Toyota',
    category: 'Premium MPV',
    rating: 390.0,
    carName: 'Innova Zenix',
    model: 'Model-2024',
    price: 850,
    imgUrl:
      'https://i.pinimg.com/736x/b5/d7/c7/b5d7c70c87c371cfd944196a80498a5c.jpg',
    speed: '15kmpl',
    gps: 'Advanced Navigation',
    seatType: 'Captain Seats',
    automatic: 'Automatic',
    description:
      'Toyota Innova Zenix menawarkan pengalaman berkendara kelas eksekutif dengan platform baru yang jauh lebih stabil dan kabin yang sangat lega. Dilengkapi dengan fitur-fitur modern dan performa mesin yang kuat, mobil ini menjadi pilihan utama untuk perjalanan bisnis atau liburan keluarga yang mengutamakan kenyamanan premium.',
    bookedDates: ['2026-05-10'],
  },
  {
    id: 6,
    brand: 'Toyota',
    category: 'Van',
    rating: 165.0,
    carName: 'Hiace',
    model: 'Model-2023',
    price: 120,
    imgUrl:
      'https://i.pinimg.com/736x/81/7b/8a/817b8a7475a8b9ff3771f03ec4638cda.jpg',
    speed: '12kmpl',
    gps: 'GPS Navigation',
    seatType: 'High-Back Seats',
    automatic: 'Manual',
    description:
      'Toyota Hiace adalah solusi terbaik untuk transportasi rombongan besar tanpa mengorbankan kenyamanan. Dengan ruang kepala yang tinggi, pendingin udara yang merata hingga baris belakang, dan kapasitas penumpang belasan orang, mobil ini sangat ideal untuk perjalanan wisata tim atau operasional travel.',
    bookedDates: [],
  },
  {
    id: 7,
    brand: 'Toyota',
    category: 'Luxury MPV',
    rating: 195,
    carName: 'Alphard',
    model: 'Model-2024',
    price: "1.000",
    imgUrl:
      'https://i.pinimg.com/736x/88/57/1f/88571fb626c3c0f5199a71ab0a78b7c4.jpg',
    speed: '12kmpl',
    gps: 'Voice Command GPS',
    seatType: 'Executive Pilot Seats',
    automatic: 'Automatic',
    description:
      'Toyota Alphard adalah simbol kemewahan dan status. Dilengkapi dengan kursi Pilot Seat yang memiliki fitur pijat dan pengaturan elektrik sepenuhnya, mobil ini memberikan kenyamanan kelas satu. Sangat populer untuk menjemput tamu VVIP, pejabat, atau kebutuhan pernikahan (wedding car) karena kabinnya yang sangat tenang dan prestisius.',
    bookedDates: ['2026-05-15', '2026-05-16', '2026-05-17', '2026-05-18'],
  },
  {
    id: 8,
    brand: 'BMW',
    category: 'Luxury Sedan',
    rating: 188,
    carName: 'BMW 5 Series',
    model: 'Model-2023',
    price: "1.500",
    imgUrl:
      'https://i.pinimg.com/1200x/20/23/dd/2023ddc5d87bcaa58030db770d2cddee.jpg',
    speed: '14kmpl',
    gps: 'Live Cockpit Professional',
    seatType: 'Dakota Leather Seats',
    automatic: 'Automatic',
    description:
      'BMW 5 Series menawarkan kombinasi sempurna antara performa mesin yang agresif dan kemewahan interior yang elegan. Menggunakan teknologi iDrive terbaru dan suspensi adaptif, sedan ini memberikan pengalaman berkendara yang dinamis namun tetap halus. Pilihan favorit bagi pebisnis yang ingin mengemudi sendiri dengan gaya dan kecepatan.',
    bookedDates: [],
  },
  {
    id: 9,
    brand: 'Mercedes-Benz',
    category: 'Luxury Sedan',
    rating: 192,
    carName: 'E-ClassMercedes Benz E53 AMG Hybrid',
    model: 'Model-2023',
    price: "2.000",
    imgUrl:
      'https://i.pinimg.com/736x/d4/06/6e/d4066e11f8dc64b5e0710e4a23210ded.jpg',
    speed: '13kmpl',
    gps: 'MBUX Navigation',
    seatType: 'Nappa Leather Seats',
    automatic: 'Automatic',
    description:
      'Mercedes-Benz E-Class adalah standar tertinggi untuk kenyamanan sedan mewah. Dikenal dengan pencahayaan ambient yang indah dan sistem keamanan tingkat tinggi, mobil ini menjamin perjalanan yang sangat nyaman dan eksklusif. Sangat cocok bagi penyewa yang mengutamakan citra profesional dan keanggunan di setiap detail kendaraan.',
    bookedDates: ['2026-05-20'],
  },
  {
    id: 10,
    brand: 'Toyota',
    category: 'Luxury SUV',
    rating: 198,
    carName: 'Land Cruiser 300',
    model: 'Model-2024',
    price: "1.500",
    imgUrl:
      'https://i.pinimg.com/736x/fe/55/13/fe551359b1029547f0cc8de557b9fffc.jpg',
    speed: '10kmpl',
    gps: 'Off-Road Terrain GPS',
    seatType: 'Ventilated Seats',
    automatic: 'Automatic',
    description:
      'Toyota Land Cruiser 300 adalah raja dari segala medan yang menggabungkan ketangguhan off-road dengan kemewahan tanpa kompromi. Dengan mesin V6 Twin Turbo yang sangat bertenaga dan interior yang dilapisi material premium, mobil ini sering disewa untuk keperluan pengawalan, perjalanan ke daerah dengan medan berat, atau sekadar tampil gagah di jalan raya.',
    bookedDates: [],
  },
];

export default carData;
