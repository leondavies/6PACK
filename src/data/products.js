export const products = [
  {
    id: 1,
    name: "Garage Project Hazy IPA",
    brewery: "Garage Project",
    style: "Hazy IPA",
    abv: 6.4,
    price: 12.99,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop&crop=center",
    description: "A juicy, tropical hazy IPA from Wellington's most innovative brewery. Garage Project has created over 640 different beers since 2011.",
    rating: 4.8,
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Tuatara Bohemian Pilsner",
    brewery: "Tuatara Brewing",
    style: "Pilsner",
    abv: 5.0,
    price: 9.99,
    image: "https://www.wine-searcher.com/images/labels/48/25/10634825.jpg?width=466&height=400&fit=bounds",
    description: "Crisp and clean pilsner from the twice NZ Champion Brewery. Founded in 2000, one of NZ's original craft breweries.",
    rating: 4.5,
    inStock: true,
    featured: false
  },
  {
    id: 3,
    name: "Epic Hop Zombie",
    brewery: "Epic Beer",
    style: "Double IPA",
    abv: 8.5,
    price: 15.99,
    image: "https://www.blackmarket.co.nz/cdn/shop/files/23703-1.jpg?v=1729034026&width=1600",
    description: "Legendary 8.5% Double IPA from Auckland. NZ's most successful craft beer release of 2011. NEED… MORE… HOPS…",
    rating: 4.9,
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "Yeastie Boys Pot Kettle Black",
    brewery: "Yeastie Boys",
    style: "Black IPA",
    abv: 6.0,
    price: 11.99,
    image: "https://thebeerlibrary.co.nz/cdn/shop/files/Yeastie-Boys-Pot-Kettle-Black-Black-IPA-The-Beer-Library.heic?v=1691109126&width=500",
    description: "Fresh and hoppy, yet dark as night and malty rich. Wellington's deliciously irreverent brewing company's flagship beer.",
    rating: 4.6,
    inStock: false,
    featured: false
  },
  {
    id: 5,
    name: "Panhead Supercharger",
    brewery: "Panhead Custom Ales",
    style: "APA",
    abv: 5.7,
    price: 10.99,
    image: "https://moorewilsons.co.nz/media/catalog/product/cache/1/image/800x/602f0fa2c1f0d1ba5e241f914e856ff9/p/a/panhead-supercharger-330ml/panhead-supercharger-apa-31.1513298613.jpg",
    description: "NZ's best selling craft beer! Centennial, Citra and Simcoe hops with citrus and tropical fruit flavors. The orange one.",
    rating: 4.4,
    inStock: true,
    featured: false
  },
  {
    id: 6,
    name: "Liberty C!tra",
    brewery: "Liberty Brewing",
    style: "Double IPA",
    abv: 9.0,
    price: 16.99,
    image: "https://www.libertybrewing.co.nz/cdn/shop/files/Citra-Double-IPA_1024x1024@2x.png?v=1683788851",
    description: "2022 NZ Beer Awards Trophy winner. Crushing double IPA famous for squeezing every drop of flavor from legendary Citra hops.",
    rating: 4.1,
    inStock: true,
    featured: true
  },
  {
    id: 7,
    name: "Behemoth Chur! Pale Ale",
    brewery: "Behemoth Brewing",
    style: "Pale Ale",
    abv: 5.5,
    price: 11.99,
    image: "https://maxcommerce-cdn.freetls.fastly.net/liquorland/233623_20-1-5-12.png?format=pjpg&optimise=medium&auto=webp&width=800&height=800&fit=bounds&canvas=800,800",
    description: "Signi-chur beer! NZ hops in a can - a tropical hop fruit salad from Auckland's Behemoth Brewing.",
    rating: 4.7,
    inStock: true,
    featured: false
  },
  {
    id: 8,
    name: "Steinlager Pure",
    brewery: "Lion Nathan",
    style: "Lager",
    abv: 4.8,
    price: 7.99,
    image: "https://www.steinlager.com/wp-content/uploads/sites/51/2025/06/Steinlager_Pure_D_Label_FA-545x1024.png",
    description: "New Zealand's iconic premium lager. Clean, crisp and refreshing since 1958.",
    rating: 4.2,
    inStock: true,
    featured: false
  }
];

export const breweries = [
  {
    id: 1,
    name: "Garage Project",
    location: "Wellington",
    founded: 2011,
    description: "Wellington's most innovative brewery. Created over 640 different beers since 2011. Won NZ Brewery of the Year 2017 and has 37 of the top 50 beers in NZ on Untappd.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
    website: "https://garageproject.co.nz"
  },
  {
    id: 2,
    name: "Tuatara Brewing",
    location: "Paraparaumu / Upper Hutt",
    founded: 2000,
    description: "Twice named New Zealand's Champion Brewery at the Brewers Guild Awards. One of NZ's original craft breweries, now owned by DB Breweries.",
    image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=600&h=400&fit=crop&crop=center",
    website: "https://db.co.nz/tuatara"
  },
  {
    id: 3,
    name: "Epic Beer",
    location: "Auckland",
    founded: 2006,
    description: "Multi-award winning brewery in Auckland. Famous for Hop Zombie - NZ's most successful craft beer release of 2011. Bold, hop-forward beers.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
    website: "https://epicbeer.com"
  },
  {
    id: 4,
    name: "Yeastie Boys",
    location: "Wellington",
    founded: 2008,
    description: "Deliciously irreverent brewing company. The world's smallest multinational, brewing in NZ, Australia and UK. Famous for Pot Kettle Black porter.",
    image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=600&h=400&fit=crop&crop=center",
    website: "https://yeastieboys.co.nz"
  },
  {
    id: 5,
    name: "Liberty Brewing",
    location: "Helensville, Auckland",
    founded: 2008,
    description: "Located in Helensville, Auckland. Famous for C!tra Double IPA - 2022 NZ Beer Awards Trophy winner. Creating palate-bending hop-forward beers.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
    website: "https://libertybrewing.co.nz"
  },
  {
    id: 6,
    name: "Panhead Custom Ales",
    location: "Upper Hutt, Wellington",
    founded: 2012,
    description: "Upper Hutt Boutique Beer Bogans. Famous for Supercharger APA - NZ's best selling craft beer. Known for their iconic orange branding.",
    image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=600&h=400&fit=crop&crop=center",
    website: "https://panheadcustomales.com"
  },
  {
    id: 7,
    name: "Behemoth Brewing",
    location: "Auckland",
    founded: 2013,
    description: "Home to Churly's Brewpub & Eatery in Auckland. Known for making 'bigger tasting beer' with bold flavors and creative brewing techniques.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
    website: "https://behemothbrewing.co.nz"
  },
  {
    id: 8,
    name: "Lion Nathan",
    location: "Auckland",
    founded: 1840,
    description: "New Zealand's largest brewery and producer of iconic Steinlager. A heritage brewing company that has been crafting quality lagers for over 180 years.",
    image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=600&h=400&fit=crop&crop=center",
    website: "https://lionco.com"
  }
];