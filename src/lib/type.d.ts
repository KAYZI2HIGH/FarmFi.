interface FooterKeys {
  title: string;
  url?: string;
}

interface FooterInfo {
  heading: string;
  content: {
    type: "links" | "list";
    keys: FooterKeys[];
  };
}

interface Review {
  author: string;
  text: string;
}

interface farmer {
  _id: string,
  name: string
}

interface Crop {
  _id: string;
  imgUrl: string[];
  name: string;
  price: number;
  weight: number;
  category: string;
  farmer: farmer;
  location: string;
  description: string;
  rating: number;
  reviews: Review[];
  relatedCommodities: string[];
}

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

type FarmerRegisterFormFieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "dateOfBirth"
  | "address"
  | "nationalIdentityNumber"
  | "state"
  | "createPassword"
  | "reEnterPassword"
  | "type"
  | "size"
  | "produceGrown"
  | "farmAddress";

type BuyersRegisterFormFieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "dateOfBirth"
  | "address"
  | "nationalIdentityNumber"
  | "state"
  | "createPassword"
  | "reEnterPassword"

interface FarmerRegisterFormInput {
  name: FarmerRegisterFormFieldName;
  title: string;
  placeholder: string;
  description: string;
  type?: string;
}
interface BuyersRegisterFormInput {
  name: BuyersRegisterFormFieldName;
  title: string;
  placeholder: string;
  description: string;
  type?: string;
  required?: boolean;
}

interface StoredListing {
  produceName: string;
  type: string;
  quantity: string;
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
