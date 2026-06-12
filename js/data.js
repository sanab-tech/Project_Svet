// Фото лежат в папке images/
// Чтобы заменить — положите свой файл с тем же именем (jpg, png или webp)
// и обновите путь в поле image ниже.

const SITE_DATA = {
  images: {
    hero: 'images/главная 1.jpg',
    about: 'images/главная.jpg',
  },

  brand: {
    name: 'Изюмка С',
    tagline: 'Домашние десерты с любовью',
    description: 'Ручная работа · Натуральные ингредиенты · С душой',
  },

  navLinks: [
    { label: 'О нас', href: '#about' },
    { label: 'Каталог', href: '#catalog' },
    { label: 'Заказ', href: '#order' },
    { label: 'Отзывы', href: '#reviews' },
    { label: 'Контакты', href: '#contact' },
  ],

  desserts: [
    {
      name: 'Медовик классический',
      description: 'Нежные коржи с кремом на сгущёнке и мёде',
      price: '1 200 ₽',
      image: 'images/медовик.jpg',
    },
    {
      name: 'Бенто-торт',
      description: 'Маленький торт для двоих',
      price: '950 ₽',
      image: 'images/бенто-торт.jpg',
    },
    {
      name: 'Печенье с мин',
      description: 'Печенье с миндалем и шоколадом',
      price: '680 ₽',
      image: 'images/печенье.jpg',
    },
    {
      name: 'Мотти',
      description: 'Рисовое тесто, мусс и взрывная начинка',
      price: '1 100 ₽',
      image: 'images/моти1.jpg',
    },
    {
      name: 'Макаронс бокс',
      description: '6 штук в подарочной коробке',
      price: '850 ₽',
      image: 'images/макарунс.jpg',
    },
    {
      name: 'Павлова',
      description: 'Хрустящее безе с ягодами и кремом',
      price: '1 350 ₽',
      image: 'images/павлова.jpg',
    },
  ],

  orderSteps: [
    {
      step: '01',
      title: 'Выберите десерт',
      description: 'Посмотрите каталог и напишите, что хотите заказать',
    },
    {
      step: '02',
      title: 'Согласуйте детали',
      description: 'Обсудим дату, вес, декор и особые пожелания',
    },
    {
      step: '03',
      title: 'Получите сладость',
      description: 'Самовывоз или доставка в удобное для вас время',
    },
  ],

  reviews: [
    {
      name: 'Анна К.',
      text: 'Заказывала торт на день рождения — все гости были в восторге! Нежный, не приторный, с идеальной текстурой крема.',
      rating: 5,
    },
    {
      name: 'Мария С.',
      text: 'Макаронс — лучшие, что я пробовала. Чувствуется, что каждый сделан вручную с особым вниманием к деталям.',
      rating: 5,
    },
    {
      name: 'Елена В.',
      text: 'Очень красивая упаковка и вкус на высоте. Теперь заказываю регулярно для семейных праздников.',
      rating: 5,
    },
    {
      name: 'Ольга Д.',
      text: 'Павлова просто тает во рту! Заказала на юбилей — все спрашивали, где такой волшебный десерт.',
      rating: 5,
    },
  ],

  socialLinks: [
    { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { name: 'Telegram', href: 'https://t.me', icon: 'telegram' },
    { name: 'WhatsApp', href: 'https://wa.me', icon: 'whatsapp' },
  ],
}
