interface FooterKeys {
    title: string,
    url?: string,
}

interface FooterInfo{
  heading: string,
  content: {
    type: 'links' | 'list',
    keys: FooterKeys[]
  },
}

interface Review {
  author: string;
  text: string;
};

interface Crop {
  id: string;
  image: string;
  name: string;
  price: number;
  weight: number;
  category: string;
  seller: string;
  location: string;
  description: string;
  rating: number;
  reviews: Review[];
  relatedCommodities: string[];
};

type FormFieldName =
  | "produceName"
  | "type"
  | "quantity"
  | "price"
  | "harvestDate"
  | "expiryDate"
  | "farmLocation"
  | "farmerContact";

interface FormInput {
  name: FormFieldName;
  title: string;
  placeholder: string;
  description?: string;
}

interface StoredListing {
  produceName: string;
  type: string;
  quantity: string,
  price: number;
  harvestDate: string;
  expiryDate: string;
  farmLocation: string;
  farmerContact: string;
  produceImages: Array<{
    name: string;
    type: string;
    size: number;
    lastModified: number;
    base64: string;
  }>;
  createdAt: string;
}