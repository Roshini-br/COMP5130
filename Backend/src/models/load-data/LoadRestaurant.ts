import mongoose from "mongoose";
import Restaurant from "../Restaurant";
import EnvVars from "@src/common/EnvVars";

const sampleRestaurants = [
  {
    name: "Pasta Palace",
    address: "123 Pasta Lane, Rome, Lazio, 00100",
    cuisine: "Italian",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    menu: [
      {
        name: "Spaghetti Carbonara",
        description:
          "Classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
        price: 12.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Margherita Pizza",
        description:
          "Pizza topped with tomatoes, mozzarella cheese, fresh basil, salt, and olive oil.",
        price: 10.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Lasagna",
        description: "Layered pasta dish with meat, cheese, and tomato sauce.",
        price: 14.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Fettuccine Alfredo",
        description: "Creamy pasta dish made with butter and parmesan cheese.",
        price: 13.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Penne Arrabbiata",
        description:
          "Pasta in a spicy tomato sauce with garlic and chili peppers.",
        price: 11.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Ravioli",
        description:
          "Stuffed pasta with cheese or meat filling, served with marinara sauce.",
        price: 15.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Tiramisu",
        description:
          "Coffee-flavored dessert made with ladyfingers and mascarpone cheese.",
        price: 6.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Bruschetta",
        description:
          "Grilled bread topped with diced tomatoes, garlic, basil, and olive oil.",
        price: 8.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Caprese Salad",
        description:
          "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze.",
        price: 9.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Italian Sausage",
        description: "Grilled sausage served with peppers and onions.",
        price: 10.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
    ],
  },
  {
    name: "Sushi Central",
    address: "456 Sushi St, Tokyo, Tokyo, 100-0001",
    cuisine: "Japanese",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    menu: [
      {
        name: "California Roll",
        description: "Sushi roll with crab meat, avocado, and cucumber.",
        price: 8.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Sashimi Platter",
        description: "Assortment of fresh sashimi with dipping sauces.",
        price: 18.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Tempura",
        description: "Battered and deep-fried vegetables and shrimp.",
        price: 10.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Spicy Tuna Roll",
        description:
          "Spicy tuna and cucumber rolled in sushi rice and seaweed.",
        price: 9.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Eel Avocado Roll",
        description: "Grilled eel and avocado wrapped in sushi rice.",
        price: 12.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Miso Soup",
        description: "Traditional Japanese soup made with miso paste and tofu.",
        price: 3.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Seaweed Salad",
        description: "Salad made from seaweed, sesame oil, and vinegar.",
        price: 5.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Gyoza",
        description: "Pan-fried dumplings filled with pork and vegetables.",
        price: 7.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Chicken Teriyaki",
        description: "Grilled chicken glazed with teriyaki sauce.",
        price: 13.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Mochi Ice Cream",
        description: "Sweet rice cake filled with ice cream.",
        price: 4.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
    ],
  },
  {
    name: "Curry Corner",
    address: "789 Curry Ave, Delhi, Delhi, 110001",
    cuisine: "Indian",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    menu: [
      {
        name: "Butter Chicken",
        description: "Chicken cooked in a creamy tomato sauce with spices.",
        price: 11.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Paneer Tikka",
        description: "Grilled paneer marinated in spices and yogurt.",
        price: 9.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Biryani",
        description: "Spiced rice dish with meat and vegetables.",
        price: 13.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Dal Makhani",
        description: "Creamy lentils cooked with spices and butter.",
        price: 10.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Naan Bread",
        description: "Soft flatbread baked in a tandoor.",
        price: 2.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Chole Bhature",
        description: "Spicy chickpeas served with deep-fried bread.",
        price: 8.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Samosa",
        description: "Fried pastry filled with spiced potatoes and peas.",
        price: 4.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Aloo Gobi",
        description: "Potatoes and cauliflower cooked with spices.",
        price: 7.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Palak Paneer",
        description: "Spinach and paneer cooked with spices and cream.",
        price: 11.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Mango Lassi",
        description: "Sweet yogurt drink flavored with mango.",
        price: 3.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
    ],
  },
  {
    name: "Taco Town",
    address: "101 Taco Blvd, Mexico City, CDMX, 01000",
    cuisine: "Mexican",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    menu: [
      {
        name: "Tacos al Pastor",
        description: "Marinated pork tacos served with pineapple and onions.",
        price: 9.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Burrito",
        description:
          "Large flour tortilla filled with rice, beans, and choice of meat.",
        price: 10.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Quesadilla",
        description: "Flour tortilla filled with cheese and grilled.",
        price: 8.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Chiles en Nogada",
        description: "Stuffed peppers topped with walnut sauce.",
        price: 12.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Nachos",
        description:
          "Tortilla chips topped with cheese, jalapeños, and guacamole.",
        price: 6.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Guacamole",
        description: "Avocado dip served with tortilla chips.",
        price: 4.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Mexican Street Corn",
        description:
          "Grilled corn on the cob with mayo, cheese, and chili powder.",
        price: 5.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Flan",
        description: "Creamy caramel dessert.",
        price: 3.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Tortilla Soup",
        description: "Spicy soup with tortilla strips and avocado.",
        price: 7.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Horchata",
        description: "Sweet rice drink flavored with cinnamon.",
        price: 2.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
    ],
  },
  {
    name: "Burger Haven",
    address: "202 Burger St, New York, NY, 10001",
    cuisine: "American",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.9,
    menu: [
      {
        name: "Cheeseburger",
        description:
          "Juicy beef patty topped with cheese, lettuce, and tomato.",
        price: 10.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Veggie Burger",
        description: "Plant-based burger with lettuce, tomato, and avocado.",
        price: 9.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "BBQ Burger",
        description:
          "Burger topped with BBQ sauce, onion rings, and cheddar cheese.",
        price: 11.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "French Fries",
        description: "Crispy fries served with ketchup.",
        price: 3.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Onion Rings",
        description: "Crispy battered onion rings.",
        price: 4.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Milkshake",
        description: "Thick milkshake made with vanilla ice cream.",
        price: 5.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Chicken Sandwich",
        description: "Fried chicken sandwich with pickles and mayo.",
        price: 10.49,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Caesar Salad",
        description: "Romaine lettuce, croutons, and Caesar dressing.",
        price: 7.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
      {
        name: "Coleslaw",
        description: "Creamy cabbage salad.",
        price: 2.99,
        image:
          "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
      },
      {
        name: "Apple Pie",
        description: "Classic apple pie served with ice cream.",
        price: 4.99,
        image:
          "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1702481237.jpg",
      },
    ],
  },
];

const MONGODB_URI = EnvVars.MongoDb.Uri;

const insertSampleData = async () => {
  try {
    await mongoose.connect(MONGODB_URI ?? "");

    await Restaurant.deleteMany({});

    const result = await Restaurant.insertMany(sampleRestaurants);

    console.log("Sample data inserted:", result);
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    // Close the MongoDB connection
    await mongoose.disconnect();
  }
};

// Run the insert function
insertSampleData();
