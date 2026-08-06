
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "Classic White T-Shirt",
    description: "A soft, breathable cotton t-shirt for everyday wear.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    category: "Men",
    brand: "UrbanWear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black"],
    countInStock: 50,
    isFeatured: true,
  },
  {
    name: "Denim Jacket",
    description: "Vintage-style denim jacket with a relaxed fit.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600",
    category: "Women",
    brand: "StreetStyle",
    sizes: ["S", "M", "L"],
    colors: ["Blue"],
    countInStock: 30,
    isFeatured: true,
  },
  {
    name: "Kids Hoodie",
    description: "Warm and cozy hoodie for kids, machine washable.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=600",
    category: "Kids",
    brand: "LittleOnes",
    sizes: ["XS", "S", "M"],
    colors: ["Red", "Grey"],
    countInStock: 40,
  },
  {
    name: "Leather Belt",
    description: "Genuine leather belt with a classic buckle.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600",
    category: "Accessories",
    brand: "Craftsman",
    sizes: ["One Size"],
    colors: ["Brown", "Black"],
    countInStock: 60,
  },
];

const importData = async () => {
  try {
    // Connect to database first
    await connectDB();
    
    // Delete existing products
    const deleted = await Product.deleteMany({});
    console.log(`Products removed: ${deleted.deletedCount || 0}`);
    
    // Insert new products
    const inserted = await Product.insertMany(products);
    console.log(`${inserted.length} sample products imported successfully!`);
    
    // Exit with success
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (error.name === 'ValidationError') {
      console.error('Validation Error Details:', error.errors);
    }
    process.exit(1);
  }
};

// Run the import
importData();