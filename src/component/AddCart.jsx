import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slices/CartSlice';
import { toast } from 'react-toastify';

const AddCart = () => {
    const cartItems = useSelector((state) => state.cartSlice.cart || []);
  console.log('Cart Items in AddCart:', cartItems);
    const dispatch = useDispatch();

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) {
            dispatch(removeFromCart(id));
            toast.success('Item removed from cart!');
            return;
        }
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    const handleRemoveItem = (id, title) => {
        dispatch(removeFromCart(id));
        toast.success(`${title} removed from cart!`);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.totalPrice, 0);
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
                    <p className="text-gray-500 mt-2">Add some products to your cart!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-24">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6 font-semibold text-gray-700">Product</div>
                        <div className="col-span-2 font-semibold text-gray-700 text-center">Price</div>
                        <div className="col-span-2 font-semibold text-gray-700 text-center">Quantity</div>
                        <div className="col-span-2 font-semibold text-gray-700 text-center">Total</div>
                    </div>
                </div>

                <div className="divide-y">
                    {cartItems.map((item) => (
                        <div key={item.id} className="px-6 py-4 hover:bg-gray-50">
                            <div className="grid grid-cols-12 gap-4 items-center">

                                <div className="col-span-6">
                                    <h3 className="font-medium text-gray-900 line-clamp-1">{item.title}</h3>
                                    <button
                                        onClick={() => handleRemoveItem(item.id, item.title)}
                                        className="mt-1 text-sm text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                </div>


                                <div className="col-span-2 text-center text-gray-700">
                                    ₹{item.price}
                                </div>


                                <div className="col-span-2">
                                    <div className="flex items-center justify-center space-x-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>


                                <div className="col-span-2 text-center font-semibold text-gray-900">
                                    ₹{item.totalPrice.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="px-6 py-4 bg-gray-50 border-t">
                    <div className="flex justify-between items-center">
                        <div className="text-lg font-semibold text-gray-900">
                            Total: ₹{calculateTotal().toFixed(2)}
                        </div>
                     
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCart;