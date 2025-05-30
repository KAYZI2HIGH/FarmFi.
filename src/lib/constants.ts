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

export const FarmersRegisterFormInputs: FarmerRegisterFormInput[] = [
  {
    name: "firstName",
    title: "First Name",
    placeholder: "first name",
    description: "input first name",
  },
  {
    name: "lastName",
    title: "Last Name",
    placeholder: "last name",
    description: "input last name",
  },
  {
    name: "email",
    title: "Email",
    placeholder: "email address",
    description: "input valid email address",
    type: "email",
  },
  {
    name: "phone",
    title: "Phone Number",
    placeholder: "e.g: +234 *** *** ****",
    description: "phone number with country code",
    type: "tel",
  },
  {
    name: "dateOfBirth",
    title: "Date of Birth",
    placeholder: "dd/mm/yyyy",
    description: "input date of birth in this format",
  },
  {
    name: "address",
    title: "Address",
    placeholder: "house address",
    description: "input your house address",
  },
  {
    name: "nationalIdentityNumber",
    title: "National Identity Number",
    placeholder: "Enter your NIN",
    description: "input your NIN",
  },
  {
    name: "state",
    title: "State",
    placeholder: "state",
    description: "input your state of residence",
  },
  {
    name: "createPassword",
    title: "Create Password",
    placeholder: "must be at least 8 characters",
    description: "must contain letters, numbers and special characters",
    type: "password",
  },
  {
    name: "reEnterPassword",
    title: "Re-enter Password",
    placeholder: "password",
    description: "re-enter your password",
    type: "password",
  },
  {
    name: "type",
    title: "Type",
    placeholder: "type of farm",
    description: "type such as grains, nuts, e.t.c",
  },
  {
    name: "size",
    title: "Size",
    placeholder: "size in number",
    description: "input size in acres (number alone)",
  },
  {
    name: "produceGrown",
    title: "Produce Grown",
    placeholder: "e.g cocoa, beans, maize, e.t.c",
    description: "input the product you grow",
  },
  {
    name: "farmAddress",
    title: "Farm Address",
    placeholder: "province/state",
    description: "input where your farm is located?",
  },
];
export const BuyersRegisterFormInputs: BuyersRegisterFormInput[] = [
  {
    name: "firstName",
    title: "First Name",
    placeholder: "first name",
    description: "input first name",
    required: true,
  },
  {
    name: "lastName",
    title: "Last Name",
    placeholder: "last name",
    description: "input last name",
    required: true,
  },
  {
    name: "email",
    title: "Email",
    placeholder: "email address",
    description: "input valid email address",
    type: "email",
    required: true,
  },
  {
    name: "phone",
    title: "Phone Number",
    placeholder: "e.g: +234 *** *** ****",
    description: "phone number with country code",
    type: "tel",
    required: true,
  },
  {
    name: "dateOfBirth",
    title: "Date of Birth",
    placeholder: "dd/mm/yyyy",
    description: "input date of birth in this format",
    required: true,
  },
  {
    name: "address",
    title: "Address",
    placeholder: "house address",
    description: "input your house address",
    required: true,
  },
  {
    name: "nationalIdentityNumber",
    title: "National Identity Number",
    placeholder: "Enter your NIN",
    description: "input your NIN",
    required: true,
  },
  {
    name: "state",
    title: "State",
    placeholder: "state",
    description: "input your state of residence",
    required: true,
  },
  {
    name: "createPassword",
    title: "Create Password",
    placeholder: "must be at least 8 characters",
    description: "must contain letters, numbers and special characters",
    type: "password",
    required: true,
  },
  {
    name: "reEnterPassword",
    title: "Re-enter Password",
    placeholder: "password",
    description: "re-enter your password",
    type: "password",
    required: true,
  },
];
