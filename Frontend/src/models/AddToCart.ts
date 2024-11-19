export default interface AddToCart {
  user: string; // Represents the user's ID
  restaurant: string; // Represents the restaurant's ID
  name: string; // Name of the order item
  quantity: number; // Quantity of the item ordered
  price: number; // Price of the item
  image: string;
}
