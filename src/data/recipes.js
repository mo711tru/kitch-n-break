export const RECIPES = [
  {
    id: '1',
    title: 'Spaghetti Pomodoro',
    category: 'Pasta',
    description: 'Classic Italian spaghetti with a fresh tomato and basil sauce. Ready in 25 minutes.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a2b3c4d',
    ingredients: ['300g Spaghetti','400g Tomatoes','2 cloves Garlic','Fresh Basil','Olive Oil','Salt','Pepper'],
    steps: ['Boil pasta according to package instructions','Sauté garlic in olive oil, add chopped tomatoes and simmer 10 min','Toss pasta with sauce and fresh basil, serve with grated Parmesan']
  },
  {
    id: '2',
    title: 'Mediterranean Chicken Bowl',
    category: 'Main',
    description: 'Grilled chicken with quinoa, roasted vegetables and tzatziki — healthy and filling.',
    image: 'https://images.unsplash.com/photo-1604908177193-1c93b2b6d1b6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2b3c4d5e',
    ingredients: ['2 Chicken Breasts','1 cup Quinoa','1 Zucchini','1 Red Pepper','Cherry Tomatoes','Tzatziki Sauce'],
    steps: ['Cook quinoa as package directs','Grill seasoned chicken and slice','Roast vegetables at 200°C for 15–20 min','Assemble bowl and top with tzatziki']
  },
  {
    id: '3',
    title: 'Avocado Toast with Poached Egg',
    category: 'Breakfast',
    description: 'Creamy avocado spread on sourdough toast, topped with a perfectly poached egg.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3c4d5e6f',
    ingredients: ['2 slices Sourdough','1 Ripe Avocado','2 Eggs','Lemon Juice','Chili Flakes','Salt','Pepper'],
    steps: ['Toast sourdough slices','Mash avocado with lemon, salt and pepper','Poach eggs and place on toast, sprinkle chili flakes']
  },
  {
    id: '4',
    title: 'Vegetarian Curry',
    category: 'Vegan',
    description: 'Creamy coconut curry with seasonal vegetables and fragrant spices.',
    image: 'https://images.unsplash.com/photo-1605475121453-4b2f2b8c6d2f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4d5e6f7g',
    ingredients: ['1 Onion','2 cloves Garlic','1 tbsp Curry Paste','400ml Coconut Milk','Mixed Vegetables','Cilantro'],
    steps: ['Sauté onion and garlic, add curry paste','Pour coconut milk and simmer with vegetables until tender','Garnish with cilantro and serve with rice']
  }
  ,
  {
    id: '5',
    title: 'Shakshuka mit Feta',
    category: 'Brunch',
    description: 'Würzige Tomatensauce mit pochierten Eiern und Feta.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3c4d5e6f',
    ingredients: ['Eier','Tomaten','Zwiebel','Paprika','Feta','Gewürze'],
    steps: ['Zwiebel & Paprika anbraten','Tomaten hinzufügen und würzen','Eier in Sauce pochieren','Mit Feta bestreuen']
  },
  {
    id: '6',
    title: 'Ratatouille',
    category: 'Vegan',
    description: 'Geschmortes Gemüse der mediterranen Küche, aromatisch und bunt.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Aubergine','Zucchini','Tomaten','Paprika','Kräuter'],
    steps: ['Gemüse schneiden','Schichten oder anbraten','Sanft schmoren']
  },
  {
    id: '7',
    title: 'Lachs mit Zitronen-Dill-Sauce',
    category: 'Fisch',
    description: 'Gebratener Lachs mit frischer Zitronen-Dill-Sauce, serviert mit grünem Spargel.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Lachsfilet','Zitrone','Dill','Sahne','Spargel'],
    steps: ['Lachs braten','Sauce vorbereiten','Mit Spargel servieren']
  },
  {
    id: '8',
    title: 'Veggie-Burger',
    category: 'Burger',
    description: 'Hausgemachter vegetarischer Burger mit Kichererbsen-Patty und Avocado.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Kichererbsen','Haferflocken','Gewürze','Buns','Avocado'],
    steps: ['Patty formen','Braten','Bauen und servieren']
  },
  {
    id: '9',
    title: 'Thai-Curry mit Kokos',
    category: 'Asiatisch',
    description: 'Aromatisches rotes Curry mit Gemüse und Kokosmilch.',
    image: 'https://images.unsplash.com/photo-1604908177193-1c93b2b6d1b6?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Curry-Paste','Kokosmilch','Gemüse','Basilikum'],
    steps: ['Curry-Paste anrösten','Kokosmilch hinzufügen','Gemüse garen']
  },
  {
    id: '10',
    title: 'Beef Tacos',
    category: 'Mexikanisch',
    description: 'Crispy Tacos gefüllt mit gewürztem Rindfleisch, Salsa und Guacamole.',
    image: 'https://images.unsplash.com/photo-1601315570983-8983bf7f8b17?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Taco-Shells','Rinderhack','Salsa','Koriander','Limette'],
    steps: ['Füllung zubereiten','Tacos befüllen','Mit Salsa & Guac servieren']
  }
  ,
  {
    id: '11',
    title: 'Pancakes mit Ahornsirup',
    category: 'Frühstück',
    description: 'Fluffige Pfannkuchen serviert mit frischem Obst und Ahornsirup.',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['200g Mehl','2 Eier','300ml Milch','1 TL Backpulver','Ahornsirup','Beeren'],
    steps: ['Teig anrühren','Pfannkuchen in Butter braten','Mit Sirup und Obst servieren']
  },
  {
    id: '12',
    title: 'Caprese Salat',
    category: 'Salat',
    description: 'Ein einfacher italienischer Salat mit Tomaten, Mozzarella und Basilikum.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Tomaten','Mozzarella','Basilikum','Olivenöl','Balsamico','Salz','Pfeffer'],
    steps: ['Tomaten und Mozzarella schneiden','mit Basilikum anrichten','mit Öl und Balsamico beträufeln']
  },
  {
    id: '13',
    title: 'Chicken Caesar Wrap',
    category: 'Wraps',
    description: 'Knackiger Caesar-Salat mit gegrilltem Hähnchen im Wrap.',
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb36?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Tortilla','Hähnchenbrust','Römersalat','Parmesan','Caesar-Dressing'],
    steps: ['Hähnchen grillen und schneiden','Wrap füllen und rollen','in der Pfanne kurz anrösten']
  },
  {
    id: '14',
    title: 'Gnocchi mit Tomaten-Basilikum',
    category: 'Pasta',
    description: 'Weiche Gnocchi in einer frischen Tomaten-Basilikum-Sauce.',
    image: 'https://images.unsplash.com/photo-1604908177193-1c93b2b6d1b6?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Gnocchi','Tomaten','Knoblauch','Basilikum','Olivenöl'],
    steps: ['Gnocchi kochen','Sauce zubereiten','Gnocchi in Sauce schwenken']
  },
  {
    id: '15',
    title: 'Sushi Bowl',
    category: 'Asiatisch',
    description: 'Eine bunte Bowl mit Sushi-Reis, Lachs, Avocado und Sesam.',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Sushi-Reis','Lachs','Avocado','Gurke','Sojasauce','Sesam'],
    steps: ['Reis zubereiten','Zutaten schneiden','Bowl zusammenstellen']
  }
  ,
  {
    id: '16',
    title: 'Cremige Kürbissuppe',
    category: 'Suppe',
    description: 'Seidig-cremige Suppe aus geröstetem Kürbis mit gerösteten Kernen.',
    image: 'https://images.unsplash.com/photo-1604908177193-1c93b2b6d1b6?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Kürbis','Zwiebel','Gemüsebrühe','Sahne','Kürbiskerne'],
    steps: ['Kürbis rösten','Zwiebeln anbraten','Brühe und Kürbis pürieren','Mit Sahne verfeinern']
  },
  {
    id: '17',
    title: 'Marokkanischer Couscous',
    category: 'Beilage',
    description: 'Würziger Couscous mit getrockneten Früchten und gerösteten Mandeln.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Couscous','Aprikosen','Mandeln','Gewürze','Koriander'],
    steps: ['Couscous quellen lassen','Trockenfrüchte einrühren','Mit Mandeln bestreuen']
  },
  {
    id: '18',
    title: 'French Toast mit Beeren',
    category: 'Frühstück',
    description: 'Süßer French Toast, goldbraun gebraten, serviert mit frischen Beeren.',
    image: 'https://images.unsplash.com/photo-1559631888-0b6a4b8b5b5b?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Brot','Eier','Milch','Zimt','Beeren','Ahornsirup'],
    steps: ['Eimischung vorbereiten','Brot einweichen und braten','Mit Beeren servieren']
  },
  {
    id: '19',
    title: 'Bunte Buddha Bowl',
    category: 'Vegan',
    description: 'Nährstoffreiche Bowl mit geröstetem Gemüse, Hülsenfrüchten und Tahini-Dressing.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Quinoa','Kichererbsen','Süßkartoffel','Avocado','Tahini'],
    steps: ['Quinoa kochen','Gemüse rösten','Alles anrichten und Dressing darüber geben']
  },
  {
    id: '20',
    title: 'Schokoladen-Brownies',
    category: 'Dessert',
    description: 'Saftige Brownies mit knuspriger Kruste und zartem Inneren.',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Zartbitterschokolade','Butter','Zucker','Eier','Mehl'],
    steps: ['Schokolade schmelzen','Zutaten verrühren','Backen bis leicht feucht in der Mitte']
  }
]
