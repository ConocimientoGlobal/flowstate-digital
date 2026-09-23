// FlowState Digital - Shared Business Data for Demo
// This file contains fictitious data for demonstration purposes only.

const businesses = [
  {
    id: 'hotel-boutique-palermo',
    name: 'Hotel Boutique Palermo',
    type: 'hotel',
    location: 'Palermo Hollywood, Buenos Aires',
    description: 'Hotel boutique de 15 habitaciones en Palermo Hollywood. Arquitectura moderna, servicio personalizado, desayuno buffet incluido, pileta climatizada y terraza panorámica.',
    category: 'Hotel · Palermo Hollywood, Buenos Aires',
    rating: 4.8,
    reviewCount: 312,
    openStatus: 'Abierto ahora',
    phone: '+54 9 11 3333-9012',
    website: 'https://hotelboutiquepalermo.example.com',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80'
    ],
    services: [
      'Desayuno buffet incluido',
      'Pileta climatizada',
      'Terraza panorámica',
      'WiFi gratis',
      'Recepción 24hs',
      'Restaurante y bar',
      'Spa & Wellness',
      'Estacionamiento',
      'Room service'
    ],
    roomTypes: [
      {
        name: 'Habitación Standard',
        size: '28m²',
        bed: 'Cama king',
        view: 'Vista al jardín',
        price: '$53 USD',
        amenities: ['WiFi gratis', 'TV cable', 'Aire acondicionado', 'Baño privado'],
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80'
      },
      {
        name: 'Habitación Deluxe',
        size: '38m²',
        bed: 'Cama king premium',
        view: 'Balcón privado',
        price: '$76 USD',
        amenities: ['WiFi gratis', 'TV cable', 'Aire acondicionado', 'Baño privado', 'Minibar'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80'
      },
      {
        name: 'Suite Premium',
        size: '62m²',
        bed: 'Sala de estar + Jacuzzi',
        view: 'Terraza',
        price: '$100 USD',
        amenities: ['WiFi gratis', 'TV cable', 'Aire acondicionado', 'Baño privado', 'Jacuzzi', 'Terraza', 'Sala de estar'],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80'
      }
    ],
    reviews: [
      {
        avatar: 'MG',
        author: 'María García',
        meta: 'Buenos Aires · 12 reseñas',
        title: '¡Experiencia inolvidable!',
        text: 'El hotel superó todas mis expectativas. La habitación Deluxe es espectacular, con acabados de primera y una cama increíblemente cómoda. El desayuno es variado y delicioso. El personal es sumamente atento.',
        trip: 'Viaje en pareja',
        date: 'Septiembre 2026 · 3 noches',
        response: {
          label: 'Respuesta del establecimiento',
          text: '¡Muchas gracias, María! Nos alegra saber que disfrutó su estadía. Esperamos recibirle nuevamente pronto. Equipo Hotel Boutique Palermo.'
        }
      },
      {
        avatar: 'CL',
        author: 'Carlos López',
        meta: 'Madrid, España · 28 reseñas',
        title: 'Excelente ubicación y servicio',
        text: 'Ubicado en una zona espectacular de Palermo. El restaurante del hotel es muy bueno y el spa es un lujo. La pileta climatizada es perfecta para relajarse.',
        trip: 'Viaje de negocios',
        date: 'Agosto 2026 · 5 noches',
        response: {
          label: 'Respuesta del establecimiento',
          text: 'Gracias Carlos por sus amables palabras. Nos enorgullece ofrecer un servicio que combine confort y funcionalidad.'
        }
      },
      {
        avatar: 'AP',
        author: 'Ana Pérez',
        meta: 'Santiago, Chile · 5 reseñas',
        title: 'Muy lindo hotel, algunos detalles',
        text: 'El hotel es precioso y muy bien mantenido. El único punto a mejorar es el tiempo de espera del check-in. Fuera de eso, todo impecable.',
        trip: 'Familia con niños',
        date: 'Agosto 2026 · 4 noches',
        response: {
          label: 'Respuesta del establecimiento',
          text: 'Gracias por su feedback, Ana. Lamentamos la demora y ya estamos trabajando para mejorar los tiempos.'
        }
      }
    ],
    amenities: [
      { icon: 'WiFi gratuito', svg: 'M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z' },
      { icon: 'Pileta climatizada', svg: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z' },
      { icon: 'Estacionamiento', svg: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
      { icon: 'Recepción 24hs', svg: 'M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z' },
      { icon: 'Restaurante', svg: 'M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2H7.43z' },
      { icon: 'Bar & Lounge', svg: 'M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z' }
    ],
    specs: [
      { label: 'Check-in', value: '15:00 hrs' },
      { label: 'Check-out', value: '11:00 hrs' },
      { label: 'Habitaciones', value: '15' },
      { label: 'Pisos', value: '4' },
      { label: 'Año construcción', value: '2019' },
      { label: 'Última renovación', value: '2024' }
    ],
    hours: {
      'Lunes': '24 horas',
      'Martes': '24 horas',
      'Miércoles': '24 horas',
      'Jueves': '24 horas',
      'Viernes': '24 horas',
      'Sábado': '24 horas',
      'Domingo': '24 horas'
    },
    posts: [
      {
        type: 'OFERTA',
        title: 'Desayuno gratis por reserva directa',
        desc: 'Reserva directamente con nosotros y disfruta de desayuno buffet incluido durante toda tu estadía.',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80',
        time: 'Esta semana'
      },
      {
        type: 'EVENTO',
        title: 'Noche de vino y quesos',
        desc: 'Todos los jueves: cata de vinos argentinos con quesos artesanales en nuestro terraza.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
        time: 'Jueves 20:00'
      }
    ],
    qa: [
      {
        question: '¿Aceptan mascotas?',
        answer: 'Sí, aceptamos mascotas de hasta 10 kg con costo adicional por limpieza profunda.'
      },
      {
        question: '¿Incluye desayuno?',
        answer: 'Sí, el desayuno buffet está incluido en todas las reservas.'
      },
      {
        question: '¿Hay estacionamiento?',
        answer: 'Contamos con estacionamiento privado y gratuito para nuestros huéspedes.'
      },
      {
        question: '¿A qué hora es el check-in?',
        answer: 'El check-in es a partir de las 15:00 horas.'
      }
    ],
    highlights: [
      { number: '15+', label: 'Años en operación' },
      { number: '500+', label: 'Reseñas positivas' },
      { number: '95%', label: 'Recomendación' },
      { number: '24/7', label: 'Atención personalizada' }
    ]
  },
  {
    id: 'complejo-cabanas-marea',
    name: 'Complejo Cabañas Marea Delta',
    type: 'cabana_complex',
    location: 'Delta de Tigre, Buenos Aires',
    description: 'Complejo turístico de cabañas de madera en el Delta Tigre, ideal para descansar en contacto con la naturaleza. Cuenta con múltiples unidades equipadas para una experiencia auténtica de turismo rural.',
    category: 'Complejo de cabañas · Delta de Tigre, Buenos Aires',
    rating: 4.7,
    reviewCount: 89,
    openStatus: 'Abierto ahora',
    phone: '+54 9 11 5555-1234',
    website: 'https://cabanas-marea.example.com',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1551632811-561809d1b0fd?w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013d702dc?w=800&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80'
    ],
    services: [
      'Desayuno casero incluido',
      'WiFi gratis',
      'Estacionamiento privado',
      'Acceso directo al río',
      'Kayak incluido',
      'Quincho para asados',
      'Deck privado en cada unidad',
      'Pet friendly (consultar)'
    ],
    hours: {
      'Lunes': '24 horas',
      'Martes': '24 horas',
      'Miércoles': '24 horas',
      'Jueves': '24 horas',
      'Viernes': '24 horas',
      'Sábado': '24 horas',
      'Domingo': '24 horas'
    },
    units: [
      {
        id: 'cabana-sauce',
        name: 'Cabaña Sauce',
        description: 'Cabaña acogedora con vista al río, ideal para parejas.',
        size: '35m²',
        capacity: '2 huéspedes',
        bedrooms: 1,
        beds: '1 cama king',
        bathrooms: 1,
        price: '$65 USD',
        amenities: ['Desayuno incluido', 'WiFi gratis', 'Deck privado', 'Kayak incluido', 'Quincho compartido'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80'
      },
      {
        id: 'cabana-ceibo',
        name: 'Cabaña Ceibo',
        description: 'Cabaña familiar con espacio adicional y vista al lago.',
        size: '45m²',
        capacity: '4 huéspedes',
        bedrooms: 2,
        beds: '2 camas dobles',
        bathrooms: 1,
        price: '$88 USD',
        amenities: ['Desayuno incluido', 'WiFi gratis', 'Deck privado', 'Kayak incluido', 'Quincho compartido', 'Parque infantil'],
        image: 'https://images.unsplash.com/photo-1551632811-561809d1b0fd?w=400&q=80'
      },
      {
        id: 'cabana-arrayan',
        name: 'Cabaña Arrayán',
        description: 'Cabaña premium con jacuzzi privado y vista panorámica.',
        size: '55m²',
        capacity: '2 huéspedes',
        bedrooms: 1,
        beds: '1 cama king',
        bathrooms: 1,
        price: '$112 USD',
        amenities: ['Desayuno gourmet incluido', 'WiFi gratis', 'Deck privado', 'Jacuzzi privado', 'Kayak incluido', 'Quincho privado', 'Vista panorámica'],
        image: 'https://images.unsplash.com/photo-1544551763-46a013d702dc?w=400&q=80'
      }
    ],
    reviews: [
      {
        avatar: 'MG',
        name: 'María G.',
        meta: 'Hace 2 meses · 5 estrellas',
        text: 'Maravillosa experiencia. La cabaña es exactamente como en las fotos, muy limpia y el atención fue excelente. El desayuno casero fue un plus. Volveremos pronto!',
        reply: {
          label: 'Complejo Cabañas Marea Delta',
          text: 'Gracias María! Nos alegra que haya disfrutado su estadía. Los esperamos de vuelta para otra aventura en el Delta.'
        }
      },
      {
        avatar: 'JP',
        name: 'Juan P.',
        meta: 'Hace 1 mes · 5 estrellas',
        text: 'Increíble lugar para desconectar. El silencio y la naturaleza son perfectos. El anfitrión nos dio excelentes recomendaciones de restaurantes cercanos. 100% recomendado.',
        reply: {
          label: 'Complejo Cabañas Marea Delta',
          text: 'Gracias Juan! Trabajamos para ofrecer experiencias auténticas de descanso y conexión con la naturaleza.'
        }
      },
      {
        avatar: 'LM',
        name: 'Laura M.',
        meta: 'Hace 3 semanas · 5 estrellas',
        text: 'Ideal para parejas o pequeñas familias. La cama muy cómoda, el baño impecable y el deck perfecto para tomar mate al atardecer. Muy recomendado.',
        reply: {
          label: 'Complejo Cabañas Marea Delta',
          text: 'Gracias Laura! Nos llena de alegría saber que tuvieron una estadía tranquila y reconfortante.'
        }
      }
    ],
    qa: [
      {
        question: '¿Aceptan mascotas?',
        answer: 'Sí, aceptamos mascotas de hasta 15 kg con costo adicional por limpieza.'
      },
      {
        question: '¿Incluye desayuno?',
        answer: 'Sí, el desayuno casero está incluido en todas las reservas.'
      },
      {
        question: '¿Hay estacionamiento?',
        answer: 'Contamos con estacionamiento privado y gratuito para nuestros huéspedes.'
      }
    ],
    highlights: [
      { number: '50+', label: 'Fotos' },
      { number: '30+', label: 'Reseñas' },
      { number: '8', label: 'Años operativo' },
      { number: '24/7', label: 'Atención' }
    ]
  },
  {
    id: 'restaurant-soho',
    name: 'Restaurante Soho',
    type: 'restaurant',
    location: 'Palermo Soho, Buenos Aires',
    description: 'Restaurante de comida criolla con opciones gourmet y ambiente turístico.',
    category: 'Restaurante · Palermo Soho, Buenos Aires',
    rating: 4.6,
    reviewCount: 89,
    openStatus: 'Abierto ahora',
    phone: '+54 9 11 4444-5678',
    website: 'https://restaurantesoho.example.com',
    images: [
      'https://images.unsplash.com/photo-1551632811-561809d1b0fd?w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013d702dc?w=800&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
      'https://images.unsplash.com/photo-1533833267-531156086e45?w=800&q=80'
    ],
    services: [
      'Desayuno, almuerzo y cena',
      'WiFi gratis',
      'Reservas por WhatsApp',
      'Menú infantil',
      'Opciones veganas',
      'Delivery dentro de Palermo'
    ],
    hours: {
      'Lunes': '12:00 - 23:00',
      'Martes': '12:00 - 23:00',
      'Miércoles': '12:00 - 23:00',
      'Jueves': '12:00 - 23:00',
      'Viernes': '12:00 - 00:00',
      'Sábado': '12:00 - 00:00',
      'Domingo': '12:00 - 23:00'
    },
    catalog: [
      { id: 'menu-1', name: 'Asado Criollo', desc: 'Tradicional asado de tira con ensaladas y pan', price: 'USD 29' },
      { id: 'menu-2', name: 'Milanesa Napolitana', desc: 'Milanesa de carne con mozzarella, tomate, jamón', price: 'USD 21' },
      { id: 'menu-3', name: 'Salmón a la Parrilla', desc: 'Filete de salmón con vegetales asados y arroz', price: 'USD 38' },
      { id: 'menu-4', name: 'Hamburguesa Soho', desc: 'Carne artesanal, cheddar, bacon, huevo y papas fritas', price: 'USD 26' },
      { id: 'menu-5', name: 'Tarta de Ricotta', desc: 'Postre casero con frutos rojos y crema', price: 'USD 5' }
    ],
    reviews: [
      {
        avatar: 'Ana',
        name: 'Ana Martínez',
        meta: 'Hace 1 semana · 5 estrellas',
        text: 'Comida excelente, atención rápida y ambiente muy agradable. Volveremos.',
        reply: {
          label: 'Restaurante Soho',
          text: 'Gracias Ana! Nos alegra saber que disfrutó su visita. Los esperamos nuevamente.'
        }
      },
      {
        avatar: 'Carlos',
        name: 'Carlos López',
        meta: 'Hace 2 semanas · 4 estrellas',
        text: 'Buena comida, pero un poco ruidoso en horario pico. Las porciones son generosas.',
        reply: {
          label: 'Restaurante Soho',
          text: 'Gracias Carlos. Tomamos nota para mejorar el ambiente en horarios pico.'
        }
      }
    ],
    quickReplies: [
      'Menú del día',
      'Hacer reserva',
      'Horarios',
      'Ubicación',
      'Promociones'
    ],
    automatedMessages: {
      greeting: '¡Hola! Gracias por contactar a Restaurante Soho. ¿En qué podemos ayudarte?',
      away: 'Actualmente estamos atendiendo a otros clientes. Responderemos a la brevedad.',
      thanks: 'Gracias por elegirnos. ¡Que tenga un excelente día!'
    }
  }
];

// Helper function to get business by id
function getBusiness(id) {
  return businesses.find(b => b.id === id) || null;
}

// Helper function to get unit by id within a complex
function getUnit(complexId, unitId) {
  const complex = getBusiness(complexId);
  if (complex && complex.units) {
    return complex.units.find(unit => unit.id === unitId) || null;
  }
  return null;
}

// Export for use in other scripts (if using modules)
// In this plain JS environment, we'll just attach to window
window.businesses = businesses;
window.getBusiness = getBusiness;
window.getUnit = getUnit;