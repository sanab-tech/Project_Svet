const SITE_DATA = {
  brand: {
    name: 'Sweet Atelier',
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
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
    },
    {
      name: 'Тирамису',
      description: 'Итальянская классика с маскарпоне и эспрессо',
      price: '950 ₽',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80',
    },
    {
      name: 'Эклеры ассорти',
      description: 'Три вкуса: ваниль, шоколад, фисташка',
      price: '680 ₽',
      image: 'https://images.unsplash.com/photo-1612203985729-e72efa58ba0b?w=600&q=80',
    },
    {
      name: 'Чизкейк Нью-Йорк',
      description: 'Плотная текстура, ягодный топпинг',
      price: '1 100 ₽',
      image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=600&q=80',
    },
    {
      name: 'Макаронс бокс',
      description: '6 штук в подарочной коробке',
      price: '850 ₽',
      image: 'https://images.unsplash.com/photo-1569860871741-84c49333c3e8?w=600&q=80',
    },
    {
      name: 'Павлова',
      description: 'Хрустящее безе с ягодами и кремом',
      price: '1 350 ₽',
      image: 'https://images.unsplash.com/photo-1488477181941-781db1a93832?w=600&q=80',
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
