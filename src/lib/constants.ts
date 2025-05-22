export const ROLE = "buyer";

export const links = [
  {
    title: "Trading",
    url: "#trading",
  },
  {
    title: "More on SUI",
    url: "#more-on-sui",
  },
  {
    title: "About us",
    url: "#about",
  },
  {
    title: "Contact",
    url: "#contact",
  },
];

export const stats = [
  {
    count: 50,
    unit: "K",
    title: "Farmers Onboarded",
  },
  {
    count: 500,
    unit: "K",
    title: "Active Buyers",
  },
  {
    count: 99,
    unit: "%",
    title: "Percentage Growth Rate",
  },
  {
    currency: "$",
    count: 600,
    unit: "M",
    title: "Market Value",
  },
];

export const offers = [
  {
    iconSrc: "/icons/lighting.svg",
    title: "Diverse Commodity Options",
  },
  {
    iconSrc: "/icons/lock.svg",
    title: "Seamless Payment Process",
  },
  {
    iconSrc: "/icons/moon.svg",
    title: "Instant Trade Execution",
  },
  {
    iconSrc: "/icons/user.svg",
    title: "Robust Security Measures",
  },
  {
    iconSrc: "/icons/image.svg",
    title: "User-Friendly Dashboard",
  },
  {
    iconSrc: "/icons/folder.svg",
    title: "Transparent Pricing Display ",
  },
  {
    iconSrc: "/icons/sparkle.svg",
    title: "Comprehensive Transaction History",
  },
  {
    iconSrc: "/icons/heart.svg",
    title: "Regulatory Compliance Support",
  },
];

export const footerInfos = [
  {
    heading: "key features",
    content: {
      type: "list",
      keys: [
        { title: "Instant Trade Execution" },
        { title: "Secure Wallet" },
        { title: "User-Friendly Dashboard" },
        { title: "Real-Time Price Updates" },
        { title: "Comprehensive Compliance" },
      ],
    },
  },
  {
    heading: "avaliable commodities",
    content: {
      type: "list",
      keys: [
        { title: "wheat" },
        { title: "barley" },
        { title: "cocoa" },
        { title: "coffe" },
        { title: "saybeans" },
      ],
    },
  },
  {
    heading: "about us",
    content: {
      type: "links",
      keys: [
        {
          title: "Our Mission",
          url: "#our-mission",
        },
        {
          title: "Our Vision",
          url: "#our-vision",
        },
        {
          title: "Join Us",
          url: "#join-us",
        },
        {
          title: "Contact Support",
          url: "#contact-support",
        },
        {
          title: "Terms of Service",
          url: "#terms-of-service",
        },
      ],
    },
  },
  {
    heading: "follow us",
    content: {
      type: "links",
      keys: [
        {
          title: "Facebook",
          url: "#",
        },
        {
          title: "Twitter | X",
          url: "#",
        },
        {
          title: "LinkedIn",
          url: "#",
        },
        {
          title: "Instagram",
          url: "#",
        },
        {
          title: "Youtube",
          url: "#",
        },
      ],
    },
  },
] as FooterInfo[];

export const testimonial = [
  {
    authorImage: "/assets/avatar/micheal.png",
    author: "Micheal Smith",
    message:
      "Buying and selling hard commodities on this platform is quick and secure. I've never felt more in control of my investments!",
  },
  {
    authorImage: "/assets/avatar/aisha.png",
    author: "Aisha Umer",
    message:
      "The user-friendly dashboard makes it easy to track my balance and view available commodities. Highly recommended!",
  },
  {
    authorImage: "/assets/avatar/david.png",
    author: "David Brown",
    message:
      "Instant settlement for trades is a game changer. This platform has simplified my trading experience drastically!",
  },
  {
    authorImage: "/assets/avatar/sofia.png",
    author: "Sofia Garcia",
    message:
      "The payment feature is innovative and allows me to buy and sell with ease. I'm impressed!",
  },
  {
    authorImage: "/assets/avatar/liam.png",
    author: "Liam O'Connor",
    message:
      "I love how transparent the transaction history is. It gives me confidence in my trading decisions.",
  },
  {
    authorImage: "/assets/avatar/chloe.png",
    author: "Chloe Patel",
    message:
      "The encryption of user data is top-notch. I feel safe while trading on this platform.",
  },
];

export const buyerSidebarLinks = [
  {
    title: "Dashboard",
    url: "/account/dashboard",
    icon: "/icons/menu.svg",
  },
  {
    title: "Marketplace",
    url: "/account/marketplace",
    icon: "/icons/shop.svg",
  },
  {
    title: "Cart",
    url: "/account/cart",
    icon: "/icons/basket.svg",
  },
  {
    title: "Escrow Funds",
    url: "/account/escrow-funds",
    icon: "/icons/locked.svg",
  },
  {
    title: "Subscription",
    url: "/account/subscription",
    icon: "/icons/subscription.svg",
  },
  {
    title: "Profile",
    url: "/account/profile",
    icon: "/icons/user_fill.svg",
  },
  {
    title: "Delivery Status",
    url: "/account/delivery-status",
    icon: "/icons/delivery.svg",
  },
  {
    title: "Dispute",
    url: "/account/dispute",
    icon: "/icons/info_fill.svg",
  },
];

export const farmerSidebarLinks = [
  {
    title: "Dashboard",
    url: "/account/dashboard",
    icon: "/icons/menu.svg",
  },
  {
    title: "Produce Listings",
    url: "/account/produce",
    icon: "/icons/file_fill.svg",
  },
  {
    title: "Escrow Funds",
    url: "/account/escrow-funds",
    icon: "/icons/locked.svg",
  },
  {
    title: "Subscription",
    url: "/account/subscription",
    icon: "/icons/subscription.svg",
  },
  {
    title: "Profile",
    url: "/account/profile",
    icon: "/icons/user_fill.svg",
  },
  {
    title: "Delivery Status",
    url: "/account/delivery-status",
    icon: "/icons/delivery.svg",
  },
  {
    title: "Dispute",
    url: "/account/dispute",
    icon: "/icons/info_fill.svg",
  },
];


export const crops: Crop[] = [
  {
    id: "maize-1",
    image: "/assets/produce/maize.jpg",
    name: "Maize",
    price: 3,
    weight: 3,
    category: "staple",
    seller: "Umaru Alshat",
    location: "Wuse, Abuja",
    description:
      "Maize (corn) is a highly nutritious grain rich in carbohydrates, providing a great source of energy. It contains dietary fiber, which aids digestion and promotes gut health. Maize is also packed with essential vitamins and minerals, including vitamin B-complex (such as thiamine and niacin) for brain function, and vitamin A (from carotenoids) for eye health. It provides antioxidants that help reduce inflammation and protect against chronic diseases. Additionally, maize is naturally gluten-free, making it a good dietary option for those with gluten intolerance.",
    rating: 5.0,
    reviews: [
      {
        author: "Sarah M.",
        text: "Maize is a staple in my kitchen! It's tasty, nutritious, and versatile. I highly recommend Fresh Harvest Farms for fresh, organic maize!",
      },
      {
        author: "James O.",
        text: "Great source of energy and antioxidants. The sweetness is unbeatable! Check out Golden Fields Market for top-quality maize.",
      },
    ],
    relatedCommodities: [
      "Cassava",
      "Cocoa beans",
      "Soybeans",
      "Barley",
      "Kolanut",
      "Sorghum",
    ],
  },
  {
    id: "cassava-1",
    image: "/assets/produce/cassava.png",
    name: "Cassava",
    price: 2,
    weight: 2,
    category: "staple",
    seller: "Amina Bello",
    location: "Kaduna",
    description:
      "Cassava is a root vegetable rich in carbohydrates and a primary source of dietary energy in tropical regions. It is gluten-free and contains resistant starch, which supports gut health. Cassava is also a good source of vitamin C, folate, and minerals like manganese.",
    rating: 4.5,
    reviews: [
      {
        author: "Fatima K.",
        text: "Perfect for making garri and fufu. Very fresh and affordable!",
      },
    ],
    relatedCommodities: ["Yam", "Maize", "Sweet Potato", "Plantain"],
  },
  {
    id: "yam-1",
    image: "/assets/produce/yam.png",
    name: "Yam",
    price:9,
    weight: 4,
    category: "staple",
    seller: "Chukwuemeka Okafor",
    location: "Enugu",
    description:
      "Yam is a tuber crop high in fiber, potassium, and vitamin C. It supports heart health and digestion, and its complex carbohydrates provide sustained energy. Yam is versatile for boiling, frying, or pounding into pounded yam.",
    rating: 4.8,
    reviews: [
      {
        author: "Grace L.",
        text: "The yams are huge and fresh. Ideal for traditional dishes!",
      },
    ],
    relatedCommodities: ["Cassava", "Potato", "Cocoyam"],
  },
  {
    id: "sorghum-1",
    image: "/assets/produce/sorghum.png",
    name: "Sorghum",
    price: 5,
    weight: 3,
    category: "staple",
    seller: "Ibrahim Musa",
    location: "Kano",
    description:
      "Sorghum is a gluten-free grain rich in antioxidants, protein, and fiber. It helps regulate blood sugar and is used in porridges, baked goods, and traditional beverages.",
    rating: 4.7,
    reviews: [
      {
        author: "Yusuf T.",
        text: "Excellent for diabetic diets. High-quality sorghum!",
      },
    ],
    relatedCommodities: ["Millet", "Maize", "Barley"],
  },
  {
    id: "millet-1",
    image: "/assets/produce/millet.png",
    name: "Millet",
    price: 2,
    weight: 2,
    category: "staple",
    seller: "Ngozi Eze",
    location: "Oyo",
    description:
      "Millet is a nutrient-dense grain packed with protein, fiber, and minerals like magnesium and phosphorus. It's gluten-free and supports heart health and blood sugar control.",
    rating: 4.6,
    reviews: [
      {
        author: "David U.",
        text: "Perfect for porridge. Highly nutritious and easy to cook!",
      },
    ],
    relatedCommodities: ["Sorghum", "Quinoa", "Amaranth"],
  },
  {
    id: "yam-2",
    image: "/assets/produce/yam.png",
    name: "Yam",
    price: 0,
    weight: 3,
    category: "staple",
    seller: "Oluwaseun Adeleke",
    location: "Osun",
    description:
      "A smaller variety of yam with a sweeter taste. Rich in vitamin C and potassium, ideal for roasting or making yam flour.",
    rating: 4.4,
    reviews: [
      {
        author: "Bola A.",
        text: "Sweet and perfect for yam porridge. Delicious!",
      },
    ],
    relatedCommodities: ["Sweet Potato", "Cocoyam", "Plantain"],
  },
  {
    id: "millet-2",
    image: "/assets/produce/millet2.png",
    name: "Millet",
    price: 3,
    weight: 2,
    category: "staple",
    seller: "Habiba Mohammed",
    location: "Borno",
    description:
      "Organic millet grown in the Sahel region. High in iron and B vitamins, excellent for combating anemia.",
    rating: 4.9,
    reviews: [
      {
        author: "Aisha Y.",
        text: "My family loves this millet. Very nutritious!",
      },
    ],
    relatedCommodities: ["Fonio", "Sorghum", "Rice"],
  },
  {
    id: "maize-2",
    image: "/assets/produce/maize.jpg",
    name: "Maize",
    price: 5,
    weight: 4,
    category: "staple",
    seller: "Yakubu Danladi",
    location: "Plateau",
    description:
      "Premium yellow maize with high carotenoid content. Ideal for animal feed and industrial processing.",
    rating: 4.3,
    reviews: [
      {
        author: "John P.",
        text: "Great for poultry feed. High energy content!",
      },
    ],
    relatedCommodities: ["Soybeans", "Wheat", "Barley"],
  },
  {
    id: "cassava-2",
    image: "/assets/produce/cassava2.png",
    name: "Cassava",
    price: 3,
    weight: 2,
    category: "staple",
    seller: "Chioma Nwachukwu",
    location: "Imo",
    description:
      "Sweet cassava variety with lower cyanogenic content. Perfect for making abacha and tapioca.",
    rating: 4.7,
    reviews: [
      {
        author: "Emeka N.",
        text: "Sweet and safe to eat after minimal processing. Excellent!",
      },
    ],
    relatedCommodities: ["Yam", "Potato", "Plantain"],
  },
  {
    id: "sorghum-2",
    image: "/assets/produce/sorghum.png",
    name: "Sorghum",
    price: 3,
    weight: 3,
    category: "staple",
    seller: "Abdullahi Bello",
    location: "Sokoto",
    description:
      "Red sorghum with high tannin content, ideal for traditional beverages like kunu and burukutu.",
    rating: 4.5,
    reviews: [
      {
        author: "Halima S.",
        text: "Authentic taste for kunu. Highly recommended!",
      },
    ],
    relatedCommodities: ["Millet", "Maize", "Guinea Corn"],
  },
];

export const FormInputs: FormInput[] = [
  {
    name: "produceName",
    title: "Produce Name",
    placeholder: "what is your produce called?",
    description: "input produce name",
  },
  {
    name: "type",
    title: "Type",
    placeholder: "what type of crop is it?",
    description: "i.e cash crop, staple crop or other.",
  },
  {
    name: "quantity",
    title: "Quantity",
    placeholder: "0",
    description: "input the number of kilgrams (digit only)",
  },
  {
    name: "price",
    title: "Price",
    placeholder: "0",
    description:
      "input the price you want to sell it for. (price will be listed in USDC)",
  },
  {
    name: "harvestDate",
    title: "Harvest Date",
    placeholder: "dd/mm/yyyy",
    description: "input harvest date in this format",
  },
  {
    name: "expiryDate",
    title: "Expiry date",
    placeholder: "dd/mm/yyyy",
    description: "input expiry date in this format",
  },
  {
    name: "farmLocation",
    title: "Farm Location",
    placeholder: "where is your farm located?",
  },
  {
    name: "farmerContact",
    title: "Farmer Contact",
    placeholder: "contact@gmail.com",
  },
];