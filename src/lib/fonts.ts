import { Poppins, Merriweather } from "next/font/google";

const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
    adjustFontFallback: false,
})

const merriweather = Merriweather({
    weight: ["300", "400", "700", "900"],
    subsets: ["latin"],
    variable: "--font-merriweather",
    adjustFontFallback: false,
})



export { poppins, merriweather };