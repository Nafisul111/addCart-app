import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/ProductSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from '../redux/slices/CartSlice';
import { useNavigate } from 'react-router-dom';

const ProductCard = () => {
    const { products } = useSelector((state) => state.productSlice || {});
    const cartItems = useSelector((state) => state.cartSlice.cart || []);
    console.log('Products in cartItems:', cartItems);
    const dispatch = useDispatch();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleCardClick = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            toast.info(`${item.title} is already in your cart!`, {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }

        setSelectedProduct(item);
        setShowPopup(true);
    };

    const handleAddToCart = () => {
        if (selectedProduct) {
            dispatch(addToCart(selectedProduct));

            toast.success(`${selectedProduct.title} added to cart!`, {
                position: "top-right",
                autoClose: 2000,
            });
            setShowPopup(false);
            setSelectedProduct(null);
            
            setTimeout(() => {
                navigate('/cart');
            }, 500);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedProduct(null);
    };

    const data = products && products.length > 0 ? products : [];

    return (
        <>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[96%] mx-auto mt-24 mb-10'>
                {data.map((item) => {
                    const isInCart = cartItems.some(cartItem => cartItem.id === item.id);

                    return (
                        <div
                            key={item.id}
                            className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => handleCardClick(item)}
                        >
                            <div className='flex justify-center items-center'>
                                <img className="rounded-base h-48 w-48 object-contain" src={item.image} alt={item.title} />
                            </div>

                            <p className="mt-6 mb-2 text-xl font-semibold tracking-tight text-heading line-clamp-1">{item.title}</p>

                            <div className='flex justify-between items-start'>
                                <p className="mb-6 text-body">{"₹" + item.price}</p>
                                <p className="text-sm text-gray-500">{item.category}</p>
                            </div>

                            {isInCart && (
                                <div className="mt-2 text-sm text-green-600 font-medium">
                                    ✓ Already in cart
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>


            {showPopup && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold text-gray-900">Add to Cart</h3>
                                <button
                                    onClick={handleClosePopup}
                                    className="text-gray-400 hover:text-gray-500 text-2xl"
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="flex items-center space-x-4 mb-6">
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.title}
                                    className="w-24 h-24 object-contain rounded-lg"
                                />
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900 line-clamp-2">{selectedProduct.title}</h4>
                                    <p className="text-lg font-bold text-gray-900 mt-2">₹{selectedProduct.price}</p>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={handleClosePopup}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddToCart}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;