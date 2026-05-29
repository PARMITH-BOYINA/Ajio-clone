from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

products = [
    {
        "id": 1,
        "name": "Men's Oversized Denim Jacket",
        "brand": "Levi's",
        "category": "MEN",
        "price": 3499,
        "rating": 4.6,
        "description": "A classic washed denim jacket with relaxed styling and premium finishes.",
        "sizes": ["S", "M", "L", "XL"],
        "usage": "Everyday wear",
        "image": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 2,
        "name": "Men's Active Fit Track Pants",
        "brand": "Nike",
        "category": "MEN",
        "price": 2199,
        "rating": 4.5,
        "description": "Lightweight joggers designed for comfort and movement during workouts or lounging.",
        "sizes": ["S", "M", "L", "XL"],
        "usage": "Gym & casual",
        "image": "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 3,
        "name": "Men's Slim Fit Shirt",
        "brand": "Jack & Jones",
        "category": "MEN",
        "price": 1899,
        "rating": 4.7,
        "description": "Smart casual shirt with textured fabric and contemporary tailoring.",
        "sizes": ["S", "M", "L", "XL"],
        "usage": "Office & weekends",
        "image": "https://images.unsplash.com/photo-1520975918720-de50c67faa9d?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 4,
        "name": "Men's Leather Sneakers",
        "brand": "Puma",
        "category": "FOOTWEAR",
        "price": 2799,
        "rating": 4.4,
        "description": "Premium leather sneakers with grippy sole and versatile styling.",
        "sizes": ["7", "8", "9", "10", "11"],
        "usage": "Casual wear",
        "image": "https://images.unsplash.com/photo-1519741492776-d0e49e95295f?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 5,
        "name": "Men's Linen Half Sleeve Shirt",
        "brand": "H&M",
        "category": "MEN",
        "price": 1499,
        "rating": 4.3,
        "description": "Breathable linen shirt with a relaxed silhouette for warm-weather comfort.",
        "sizes": ["S", "M", "L", "XL"],
        "usage": "Summer outings",
        "image": "https://images.unsplash.com/photo-1520975918720-de50c67faa9d?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 6,
        "name": "Women's Floral Maxi Dress",
        "brand": "Zara",
        "category": "WOMEN",
        "price": 2799,
        "rating": 4.8,
        "description": "Flowy maxi dress in bold florals with a flattering waist and soft fabric.",
        "sizes": ["XS", "S", "M", "L"],
        "usage": "Daywear",
        "image": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 7,
        "name": "Women's High-Waist Jeans",
        "brand": "Levi's",
        "category": "WOMEN",
        "price": 2399,
        "rating": 4.6,
        "description": "Comfort stretch denim with a high-rise silhouette and tapered legs.",
        "sizes": ["26", "28", "30", "32"],
        "usage": "Casual & travel",
        "image": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 8,
        "name": "Women's Block Heel Sandals",
        "brand": "Aldo",
        "category": "FOOTWEAR",
        "price": 2199,
        "rating": 4.4,
        "description": "Chic block heel sandals with padded straps for all-day comfort.",
        "sizes": ["5", "6", "7", "8"],
        "usage": "Party wear",
        "image": "https://images.unsplash.com/photo-1498991796380-7a32ac31a5d6?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 9,
        "name": "Women's Sports Bra Set",
        "brand": "Puma",
        "category": "ACTIVEWEAR",
        "price": 1599,
        "rating": 4.7,
        "description": "Soft support sports bra set designed for medium-impact workouts.",
        "sizes": ["S", "M", "L"],
        "usage": "Gym & yoga",
        "image": "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 10,
        "name": "Women's Oversized Hoodie",
        "brand": "Adidas",
        "category": "WOMEN",
        "price": 1999,
        "rating": 4.5,
        "description": "Cozy oversized hoodie with branded soft fleece and relaxed fit.",
        "sizes": ["S", "M", "L"],
        "usage": "Loungewear",
        "image": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 11,
        "name": "Women's Chain Crossbody Bag",
        "brand": "Charles & Keith",
        "category": "ACCESSORIES",
        "price": 1799,
        "rating": 4.7,
        "description": "Compact crossbody bag with a sleek chain strap and luxe finishing.",
        "sizes": ["One Size"],
        "usage": "Everyday carry",
        "image": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 12,
        "name": "Kids' Graphic Tee Pack",
        "brand": "GAP Kids",
        "category": "KIDS",
        "price": 1299,
        "rating": 4.5,
        "description": "Set of three graphic tees for kids with fun prints and soft cotton.",
        "sizes": ["3-4", "5-6", "7-8"],
        "usage": "Playtime",
        "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 13,
        "name": "Kids' Denim Shorts",
        "brand": "H&M",
        "category": "KIDS",
        "price": 1099,
        "rating": 4.3,
        "description": "Easy-care denim shorts with adjustable waist for growing kids.",
        "sizes": ["3-4", "5-6", "7-8"],
        "usage": "Summer fun",
        "image": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 14,
        "name": "Kids' Running Sneakers",
        "brand": "Skechers",
        "category": "FOOTWEAR",
        "price": 2199,
        "rating": 4.6,
        "description": "Lightweight kids sneakers with cushioned support and bright styling.",
        "sizes": ["10", "11", "12", "13"],
        "usage": "Active play",
        "image": "https://images.unsplash.com/photo-1519741492776-d0e49e95295f?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 15,
        "name": "Kids' Hoodie Sweatshirt",
        "brand": "Nike",
        "category": "KIDS",
        "price": 1699,
        "rating": 4.2,
        "description": "Soft fleece hoodie with fun graphics and a comfortable fit.",
        "sizes": ["3-4", "5-6", "7-8"],
        "usage": "School days",
        "image": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 16,
        "name": "Kids' Backpack Set",
        "brand": "Wildcraft",
        "category": "ACCESSORIES",
        "price": 1499,
        "rating": 4.5,
        "description": "Durable backpack set for school with colorful prints and extra pockets.",
        "sizes": ["One Size"],
        "usage": "School essentials",
        "image": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 17,
        "name": "Home Printed Cushion Cover",
        "brand": "Urban Ladder",
        "category": "HOME",
        "price": 899,
        "rating": 4.5,
        "description": "Soft cushion cover with premium print and hidden zip closure.",
        "sizes": ["16x16"],
        "usage": "Living room",
        "image": "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 18,
        "name": "Home Terry Cotton Towels",
        "brand": "Amazon Basics",
        "category": "HOME",
        "price": 999,
        "rating": 4.6,
        "description": "Set of soft terry towels with absorbent fabric and neat stitching.",
        "sizes": ["Standard"],
        "usage": "Bathroom",
        "image": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 19,
        "name": "Wireless Earbuds",
        "brand": "boAt",
        "category": "ACCESSORIES",
        "price": 2199,
        "rating": 4.4,
        "description": "True wireless earbuds with bass boost and up to 20 hours playtime.",
        "sizes": ["One Size"],
        "usage": "Daily commute",
        "image": "https://images.unsplash.com/photo-1517430816045-df4b7de1b402?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 20,
        "name": "Men's Performance Running Shoes",
        "brand": "Adidas",
        "category": "FOOTWEAR",
        "price": 4299,
        "rating": 4.6,
        "description": "Responsive running shoes with breathable mesh and cushioned midsole.",
        "sizes": ["7", "8", "9", "10", "11"],
        "usage": "Running",
        "image": "https://images.unsplash.com/photo-1528701800487-276efb27e8d4?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 21,
        "name": "Sports Water Bottle",
        "brand": "Wildcraft",
        "category": "ACCESSORIES",
        "price": 599,
        "rating": 4.3,
        "description": "Leak-proof sports bottle with ergonomic grip for workouts and travel.",
        "sizes": ["750ml"],
        "usage": "Fitness",
        "image": "https://images.unsplash.com/photo-1526403222-1c1868e6b74f?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 22,
        "name": "Men's Cotton Polo Shirt",
        "brand": "Tommy Hilfiger",
        "category": "MEN",
        "price": 2499,
        "rating": 4.5,
        "description": "Classic polo shirt with soft breathable cotton and iconic logo.",
        "sizes": ["S", "M", "L", "XL"],
        "usage": "Smart casual",
        "image": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 23,
        "name": "Women's Sport Tank Top",
        "brand": "Nike",
        "category": "ACTIVEWEAR",
        "price": 1299,
        "rating": 4.4,
        "description": "Moisture-wicking tank top ideal for yoga, gym, and everyday training.",
        "sizes": ["S", "M", "L"],
        "usage": "Workout",
        "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 24,
        "name": "Women's Denim Jacket",
        "brand": "Levi's",
        "category": "WOMEN",
        "price": 3399,
        "rating": 4.7,
        "description": "Cropped denim jacket with iconic stitching and versatile style.",
        "sizes": ["XS", "S", "M", "L"],
        "usage": "Layering",
        "image": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 25,
        "name": "Home Ceramic Vase",
        "brand": "Home Centre",
        "category": "HOME",
        "price": 1299,
        "rating": 4.5,
        "description": "Minimal ceramic vase designed to enhance contemporary home decor.",
        "sizes": ["12x6"],
        "usage": "Decor",
        "image": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 26,
        "name": "Men's Travel Backpack",
        "brand": "American Tourister",
        "category": "ACCESSORIES",
        "price": 2699,
        "rating": 4.6,
        "description": "Lightweight travel backpack with laptop compartment and multiple pockets.",
        "sizes": ["One Size"],
        "usage": "Travel",
        "image": "https://images.unsplash.com/photo-1520915273956-3c5f45b9f7a1?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 27,
        "name": "Women's Sunglasses",
        "brand": "Ray-Ban",
        "category": "ACCESSORIES",
        "price": 4299,
        "rating": 4.8,
        "description": "Classic sunglasses with UV protection and premium acetate frame.",
        "sizes": ["One Size"],
        "usage": "Outdoor",
        "image": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 28,
        "name": "Women's Leggings",
        "brand": "Adidas",
        "category": "ACTIVEWEAR",
        "price": 1699,
        "rating": 4.6,
        "description": "High-waist leggings with stretch support and breathable fabric.",
        "sizes": ["S", "M", "L"],
        "usage": "Athleisure",
        "image": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 29,
        "name": "Men's Leather Wallet",
        "brand": "Tommy Hilfiger",
        "category": "ACCESSORIES",
        "price": 1499,
        "rating": 4.4,
        "description": "Classic leather wallet with card slots and secure bill compartment.",
        "sizes": ["One Size"],
        "usage": "Everyday use",
        "image": "https://images.unsplash.com/photo-1519741492776-d0e49e95295f?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 30,
        "name": "Women's Sport Sneakers",
        "brand": "Reebok",
        "category": "FOOTWEAR",
        "price": 3299,
        "rating": 4.5,
        "description": "Lightweight sneakers with cushioning perfect for walking and gym sessions.",
        "sizes": ["5", "6", "7", "8"],
        "usage": "Workout",
        "image": "https://images.unsplash.com/photo-1528701800487-276efb27e8d4?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 31,
        "name": "Men's Relaxed Fit Shorts",
        "brand": "Puma",
        "category": "MEN",
        "price": 1299,
        "rating": 4.3,
        "description": "Soft shorts for relaxing at home or running errands in comfort.",
        "sizes": ["S", "M", "L", "XL"],
        "usage": "Lounge",
        "image": "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 32,
        "name": "Men's Formal Belt",
        "brand": "Alonzo",
        "category": "ACCESSORIES",
        "price": 999,
        "rating": 4.4,
        "description": "Synthetic leather belt with polished buckle for refined formal looks.",
        "sizes": ["30", "32", "34", "36"],
        "usage": "Office wear",
        "image": "https://images.unsplash.com/photo-1519741492776-d0e49e95295f?auto=format&fit=crop&w=800&q=80"
    }
]

cart = []

@app.route('/products')
@app.route('/api/products')
def get_products():
    category = request.args.get('category')
    if category:
        filtered = [product for product in products if product['category'].upper() == category.upper()]
        return jsonify(filtered)
    return jsonify(products)

@app.route('/products/<int:product_id>')
@app.route('/api/products/<int:product_id>')
def get_product(product_id):
    item = next((product for product in products if product['id'] == product_id), None)
    if not item:
        return jsonify({'error': 'Product not found'}), 404
    return jsonify(item)

@app.route('/categories')
@app.route('/api/categories')
def get_categories():
    categories = sorted({product['category'] for product in products})
    return jsonify(categories)

@app.route('/cart', methods=['GET'])
@app.route('/api/cart', methods=['GET'])
def get_cart():
    return jsonify(cart)

@app.route('/cart', methods=['POST'])
@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    data = request.json
    if data:
        cart.append(data)
    return jsonify({'message': 'Added to cart'})

@app.route('/cart/<int:product_id>', methods=['DELETE'])
@app.route('/api/cart/<int:product_id>', methods=['DELETE'])
def delete_cart_item(product_id):
    global cart
    cart = [item for item in cart if item.get('id') != product_id]
    return jsonify({'message': 'Product removed from cart'})

@app.route('/cart/clear', methods=['POST'])
@app.route('/api/cart/clear', methods=['POST'])
def clear_cart():
    global cart
    cart = []
    return jsonify({'message': 'Cart cleared'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)