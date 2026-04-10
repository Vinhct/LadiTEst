import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, CheckCircle, Package, Wrench, PaintBucket, ChevronRight, Phone, ShieldCheck, Truck, Sparkles, Send, Bot, User } from 'lucide-react';

// --- DỮ LIỆU SẢN PHẨM MẪU ---
const PRODUCTS = [
  {
    id: 1,
    name: 'Máy cưa xích chạy xăng Husqvarna 365',
    category: 'Máy móc gia dụng',
    price: 3500000,
    image: 'https://images.unsplash.com/photo-1542017367-9333555ca560?auto=format&fit=crop&q=80&w=600',
    description: 'Động cơ mạnh mẽ, cắt xẻ gỗ chuyên nghiệp, tiết kiệm nhiên liệu.'
  },
  {
    id: 2,
    name: 'Máy thổi Turbo phản lực siêu tốc',
    category: 'Máy móc gia dụng',
    price: 1250000,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600',
    description: 'Công suất lớn, thổi bay bụi bẩn, lá cây nhanh chóng.'
  },
  {
    id: 3,
    name: 'Robot hút bụi lau nhà thông minh Pro',
    category: 'Máy móc gia dụng',
    price: 6800000,
    image: 'https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?auto=format&fit=crop&q=80&w=600',
    description: 'Tự động vẽ bản đồ, lực hút mạnh, kết nối app điện thoại.'
  },
  {
    id: 4,
    name: 'Sơn sàn Epoxy cao cấp 2 thành phần',
    category: 'Sơn các loại',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=600',
    description: 'Chống mài mòn, chịu lực tốt, bề mặt sáng bóng.'
  },
  {
    id: 5,
    name: 'Sơn chống thấm pha xi măng cao cấp',
    category: 'Sơn các loại',
    price: 950000,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600',
    description: 'Ngăn nước tối ưu, bảo vệ tường nhà hoàn hảo trước thời tiết.'
  },
  {
    id: 6,
    name: 'Sơn lót trát tường nội/ngoại thất',
    category: 'Sơn các loại',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?auto=format&fit=crop&q=80&w=600',
    description: 'Độ bám dính cao, kháng kiềm, tạo nền mượt mà cho lớp sơn phủ.'
  }
];

const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxlCPZGo8YYUb13kQbS_fVMCbU5oHLhK8IA6NKJL8X472CJZ06H8w6EwT_QQtTmdL7j/exec';
const apiKey = ""; // API key được hệ thống tự động cung cấp

const isAiEnabled = Boolean(apiKey);

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

function ProductDetailPage({ onAddToCart, onBuyNow }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);
  const product = PRODUCTS.find(p => p.id === productId);

  const [activeTab, setActiveTab] = useState('desc');
  const [quantity, setQuantity] = useState(1);
  const thumbnails = product ? [product.image, product.image, product.image, product.image] : [];
  const [activeImage, setActiveImage] = useState(product?.image);

  useEffect(() => {
    setQuantity(1);
    setActiveTab('desc');
    setActiveImage(product?.image);
  }, [productId]);

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
          <button onClick={() => navigate(-1)} className="text-slate-600 hover:text-slate-900 font-semibold">
            ← Quay lại
          </button>
          <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-900">Không tìm thấy sản phẩm</h2>
            <p className="text-slate-500 mt-2">Sản phẩm này không tồn tại hoặc đã bị xóa.</p>
            <Link to="/" className="inline-block mt-6 bg-blue-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-blue-700">
              Về trang chủ
            </Link>
          </div>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="text-slate-600 hover:text-slate-900 font-semibold">
          ← Quay lại
        </button>
        <div className="text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-900">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700 font-semibold">{product.category}</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-slate-100">
            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {thumbnails.map((src, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(src)}
                  className={`rounded-xl overflow-hidden border transition-colors ${activeImage === src ? 'border-blue-500' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <img src={src} alt={`${product.name} ${idx + 1}`} className="w-full aspect-square object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                {product.category === 'Sơn các loại' ? <PaintBucket className="w-3 h-3" /> : <Package className="w-3 h-3" />}
                {product.category}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">Chính hãng</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100">Freeship nội thành</span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold text-slate-900 leading-tight">{product.name}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="text-yellow-500">★</span>
                  <span className="text-yellow-500">★</span>
                  <span className="text-yellow-500">★</span>
                  <span className="text-yellow-500">★</span>
                </div>
                <span className="font-bold text-slate-900">5.0</span>
                <span className="text-slate-500">(1.2k đánh giá)</span>
              </div>
              <div className="text-slate-500">
                Đã bán <span className="font-bold text-slate-900">3.4k</span>
              </div>
              <div className="text-slate-500">
                Kho <span className="font-bold text-slate-900">99+</span>
              </div>
            </div>

            <div className="mt-5 bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="text-slate-500 text-sm font-semibold">Giá</div>
                <div className="text-4xl font-black text-orange-600 leading-none">{formatPrice(product.price)}</div>
                <div className="mt-2 text-xs text-slate-500">Giá đã bao gồm VAT (nếu có)</div>
              </div>
              <div className="text-xs text-slate-600">
                <div className="font-bold text-slate-900">Ưu đãi</div>
                <div className="mt-1">- Giảm 3% cho đơn từ 2 sản phẩm</div>
                <div>- Tặng phiếu mua hàng 50k (giới hạn)</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="font-bold text-slate-900">Vận chuyển</div>
                <div className="text-sm text-slate-600 mt-2">Nhanh 2-4 ngày. Đổi trả trong 7 ngày.</div>
                <div className="text-sm text-slate-500 mt-1">Phí ship: 0đ - 25.000đ (tùy khu vực)</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="font-bold text-slate-900">Bảo hành</div>
                <div className="text-sm text-slate-600 mt-2">Theo chính sách hãng / nhà phân phối.</div>
                <div className="text-sm text-slate-500 mt-1">Hỗ trợ kỹ thuật: 0988 123 456</div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-sm font-bold text-slate-900">Số lượng</div>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center font-black text-slate-700 hover:bg-slate-50"
                  >
                    -
                  </button>
                  <div className="w-12 h-11 flex items-center justify-center font-bold text-slate-900">{quantity}</div>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-11 h-11 flex items-center justify-center font-black text-slate-700 hover:bg-slate-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) onAddToCart(product);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-4 rounded-xl font-extrabold shadow-md hover:shadow-lg"
                >
                  Thêm vào giỏ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onBuyNow(product, quantity);
                  }}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-5 py-4 rounded-xl font-extrabold shadow-md hover:shadow-lg"
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100">
          <div className="px-6 pt-6">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('desc')}
                className={`px-4 py-2 rounded-full text-sm font-bold border ${activeTab === 'desc' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'}`}
              >
                Mô tả
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('spec')}
                className={`px-4 py-2 rounded-full text-sm font-bold border ${activeTab === 'spec' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'}`}
              >
                Thông số
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('review')}
                className={`px-4 py-2 rounded-full text-sm font-bold border ${activeTab === 'review' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'}`}
              >
                Đánh giá
              </button>
            </div>
          </div>

          <div className="px-6 pb-8 pt-5">
            {activeTab === 'desc' && (
              <div className="prose max-w-none">
                <p className="text-slate-700 leading-relaxed">{product.description}</p>
                <div className="mt-4 text-sm text-slate-500">
                  Gợi ý: Bạn có thể bổ sung thêm mô tả chi tiết, hướng dẫn sử dụng, hình ảnh thực tế, và chính sách đổi trả tại đây.
                </div>
              </div>
            )}
            {activeTab === 'spec' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                  <div className="font-bold text-slate-900">Danh mục</div>
                  <div className="text-slate-600 mt-2">{product.category}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                  <div className="font-bold text-slate-900">Mã sản phẩm</div>
                  <div className="text-slate-600 mt-2">HB-{String(product.id).padStart(4, '0')}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                  <div className="font-bold text-slate-900">Tình trạng</div>
                  <div className="text-slate-600 mt-2">Mới 100%</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                  <div className="font-bold text-slate-900">Xuất xứ</div>
                  <div className="text-slate-600 mt-2">Tùy lô hàng</div>
                </div>
              </div>
            )}
            {activeTab === 'review' && (
              <div className="space-y-4">
                {[1, 2, 3].map((r) => (
                  <div key={r} className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900">Khách hàng {r}</div>
                      <div className="text-yellow-500">★★★★★</div>
                    </div>
                    <div className="text-sm text-slate-600 mt-2">Hàng đúng mô tả, đóng gói chắc chắn. Sẽ ủng hộ lần sau.</div>
                    <div className="text-xs text-slate-500 mt-2">2 ngày trước</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-extrabold text-slate-900">Sản phẩm liên quan</h2>
          <Link to="/" className="text-sm font-bold text-blue-600 hover:text-blue-700">Xem thêm</Link>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-slate-100">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="text-sm font-bold text-slate-900 line-clamp-2">{p.name}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-black text-orange-600">{formatPrice(p.price)}</div>
                  <div className="text-xs text-slate-500">★★★★★</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [buyNow, setBuyNow] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', note: '' });
  const [checkoutStatus, setCheckoutStatus] = useState('idle');

  // AI Chat State
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Chào bạn! Mình là Trợ lý AI của Home&Build ✨. Bạn đang gặp vấn đề gì hay cần tìm sản phẩm nào? (Ví dụ: "Tôi muốn sơn lại nền nhà xưởng", "Vườn nhà tôi nhiều lá rụng quá")' }
  ]);
  const chatEndRef = useRef(null);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiChatOpen]);

  const filteredProducts = activeCategory === 'Tất cả' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const buyNowTotal = buyNow ? buyNow.product.price * buyNow.quantity : 0;

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (product, quantity) => {
    setBuyNow({ product, quantity });
    setCheckoutStatus('idle');
    setFormData({ name: '', phone: '', address: '', note: '' });
    setIsCheckoutOpen(true);
  };

  const updateQuantity = (id, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + change;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setCheckoutStatus('submitting');

    const items = buyNow ? [{ ...buyNow.product, quantity: buyNow.quantity }] : cart;
    const totalValue = buyNow ? buyNowTotal : cartTotal;

    const orderDetails = items.map(item => `${item.name} (x${item.quantity})`).join('\n');
    const payload = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      note: formData.note,
      order: orderDetails,
      total: formatPrice(totalValue),
      date: new Date().toLocaleString('vi-VN'),
      source: buyNow ? 'buy_now' : 'cart'
    };

    try {
      const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        result = null;
      }

      if (!response.ok || (result && result.ok === false)) {
        const details = result?.error ? `: ${result.error}` : '';
        throw new Error(`Sheet response not ok${details}`);
      }

      setCheckoutStatus('success');
      if (!buyNow) setCart([]);
      setFormData({ name: '', phone: '', address: '', note: '' });
      setTimeout(() => {
        setIsCartOpen(false);
        setIsCheckoutOpen(false);
        setBuyNow(null);
      }, 3000);
    } catch (error) {
      console.error("Lỗi khi gửi đơn hàng:", error);
      setCheckoutStatus('error');
    }
  };

  // --- GEMINI API LLM INTEGRATION ---
  const callGeminiAPI = async (userText) => {
    if (!isAiEnabled) {
      return "Tính năng AI đang tạm tắt vì chưa cấu hình API key.";
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    const catalogInfo = PRODUCTS.map(p => `- ${p.name} (Giá: ${formatPrice(p.price)}): ${p.description}`).join('\n');
    const systemPrompt = `Bạn là chuyên gia tư vấn bán hàng thân thiện, nhiệt tình của cửa hàng Home&Build. 
Dưới đây là danh sách sản phẩm hiện có của cửa hàng:
${catalogInfo}

Nhiệm vụ của bạn:
1. Đọc vấn đề hoặc nhu cầu của khách hàng.
2. Tư vấn giải pháp thiết thực nhất.
3. Đề xuất (nhắc đến tên) TỐI ĐA 2 sản phẩm TỪ DANH SÁCH TRÊN phù hợp nhất để giải quyết vấn đề của họ. Đừng đề xuất sản phẩm không có trong danh sách.
4. Giọng điệu thân thiện, chuyên nghiệp, luôn thêm một vài emoji để tạo cảm giác gần gũi. Nói ngắn gọn, súc tích (khoảng 3-4 câu).`;

    const payload = {
      contents: [{ parts: [{ text: userText }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    // Exponential Backoff Retry Logic
    const delays = [1000, 2000, 4000, 8000, 16000];
    for (let i = 0; i < 5; i++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, hiện tại mình không thể trả lời. Vui lòng thử lại sau nhé!";
      } catch (error) {
        if (i === 4) return "Hệ thống tư vấn đang bận. Vui lòng thử lại sau ít phút hoặc liên hệ hotline nhé!";
        await new Promise(res => setTimeout(res, delays[i]));
      }
    }
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    if (!isAiEnabled) {
      setChatMessages(prev => [...prev, { role: 'ai', text: "Tính năng AI đang tạm tắt vì chưa cấu hình API key." }]);
      setAiInput('');
      return;
    }

    const userMessage = { role: 'user', text: aiInput };
    setChatMessages(prev => [...prev, userMessage]);
    setAiInput('');
    setIsAiLoading(true);

    const aiResponseText = await callGeminiAPI(userMessage.text);
    
    setChatMessages(prev => [...prev, { role: 'ai', text: aiResponseText }]);
    setIsAiLoading(false);
  };

  const Layout = (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 relative">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900 leading-none">Home&Build</h1>
                <p className="text-xs text-slate-500 font-medium tracking-wide">GIA DỤNG & SƠN CHUYÊN NGHIỆP</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8 items-center">
              {['Tất cả', 'Máy móc gia dụng', 'Sơn các loại'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-semibold transition-colors ${activeCategory === cat ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-600 hover:text-blue-600'}`}
                >
                  {cat}
                </button>
              ))}
              <button 
                onClick={() => { if (isAiEnabled) setIsAiChatOpen(true); }}
                disabled={!isAiEnabled}
                className="ml-4 flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full font-bold hover:bg-indigo-100 transition-colors border border-indigo-200 shadow-sm"
              >
                <Sparkles className="w-4 h-4" /> Hỏi AI ✨
              </button>
            </nav>

            {/* Cart & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button 
                className="md:hidden p-2 text-slate-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3 shadow-lg absolute w-full">
            {['Tất cả', 'Máy móc gia dụng', 'Sơn các loại'].map(cat => (
              <button 
                key={cat}
                onClick={() => { setActiveCategory(cat); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${activeCategory === cat ? 'bg-blue-50 text-blue-600' : 'text-slate-600'}`}
              >
                {cat}
              </button>
            ))}
            <button 
              onClick={() => { setIsAiChatOpen(true); setIsMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 rounded-lg font-bold bg-indigo-50 text-indigo-600 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Tư Vấn Bằng AI ✨
            </button>
          </div>
        )}
      </header>

      <Outlet />

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-white">Home&Build</h2>
            </div>
            <p className="text-sm">Chuyên cung cấp máy móc gia dụng hiện đại và các giải pháp sơn công nghiệp chuyên nghiệp hàng đầu.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Liên Hệ</h4>
            <p className="text-sm">Hotline: 0988 123 456</p>
            <p className="text-sm mt-2">Email: contact@homebuild.vn</p>
            <p className="text-sm mt-2">Địa chỉ: 123 Đường Vành Đai, Hà Nội</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Chính sách</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo hành</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách vận chuyển</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
          © 2026 Home&Build. Đã đăng ký bản quyền.
        </div>
      </footer>

      {/* FLOATING AI CHAT BUTTON */}
      {!isAiChatOpen && (
        <button 
          onClick={() => { if (isAiEnabled) setIsAiChatOpen(true); }}
          disabled={!isAiEnabled}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 transition-all z-50 group flex items-center justify-center"
        >
          <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-10 right-0 bg-white text-indigo-600 px-3 py-1 rounded-lg text-sm font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Tư vấn sản phẩm bằng AI
          </span>
        </button>
      )}

      {/* AI CHAT MODAL */}
      {isAiChatOpen && (
        <div className="fixed inset-0 z-50 flex justify-end items-end sm:items-center sm:justify-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAiChatOpen(false)}></div>
          
          <div className="relative w-full sm:w-[450px] sm:h-[600px] h-[85vh] bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Trợ Lý AI Home&Build ✨</h3>
                  <p className="text-xs text-indigo-100">Đang hoạt động - Sẵn sàng tư vấn</p>
                </div>
              </div>
              <button onClick={() => setIsAiChatOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-indigo-600" />
                    </div>
                  )}
                  <div 
                    className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-sm shadow-md' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
              {isAiLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2 shadow-sm">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              <form onSubmit={handleAiSubmit} className="flex gap-2 relative">
                <input 
                  type="text" 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Nhập vấn đề bạn cần giải quyết..."
                  className="flex-1 border border-slate-300 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-slate-50"
                  disabled={isAiLoading}
                />
                <button 
                  type="submit" 
                  disabled={isAiLoading || !aiInput.trim()}
                  className={`absolute right-2 top-2 p-1.5 rounded-full flex items-center justify-center transition-colors ${
                    isAiLoading || !aiInput.trim() ? 'text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                  }`}
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                Trợ lý AI sử dụng sức mạnh của hệ thống LLM. Có thể đưa ra một số gợi ý mang tính chất tham khảo.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CART MODAL (OFF-CANVAS) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-blue-600" /> Giỏ hàng
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
                <Package className="w-16 h-16 text-slate-300 mb-4" />
                <p className="text-lg font-medium">Giỏ hàng đang trống.</p>
                <button onClick={() => setIsCartOpen(false)} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
                  Tiếp tục mua sắm
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center bg-slate-50 p-3 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                      <div className="flex-1">
                        <h5 className="font-semibold text-sm text-slate-900 line-clamp-2">{item.name}</h5>
                        <p className="text-orange-600 font-bold text-sm">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 rounded">-</button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 rounded">+</button>
                      </div>
                    </div>
                  ))}
                </div>

                {checkoutStatus === 'success' ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl flex flex-col items-center text-center animate-pulse">
                    <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Đặt hàng thành công!</h3>
                    <p className="text-sm">Thông tin đơn hàng của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ sớm nhất.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCheckout} className="border-t border-slate-200 pt-6 space-y-4">
                    <h3 className="font-bold text-lg mb-4 text-slate-800">Thông tin nhận hàng</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên *</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập họ và tên..." />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại *</label>
                      <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập số điện thoại..." />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Địa chỉ giao hàng *</label>
                      <textarea required rows="2" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Nhập địa chỉ chi tiết..."></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Ghi chú</label>
                      <input type="text" value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ví dụ: Giao ngoài giờ hành chính..." />
                    </div>

                    {checkoutStatus === 'error' && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">Có lỗi xảy ra khi gửi đơn.</p>}

                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-slate-500 font-medium">Tổng cộng ({cartItemCount} SP):</span>
                        <span className="text-2xl font-black text-orange-600">{formatPrice(cartTotal)}</span>
                      </div>
                      <button type="submit" disabled={checkoutStatus === 'submitting'} className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all transform flex justify-center items-center gap-2 ${checkoutStatus === 'submitting' ? 'bg-slate-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 hover:-translate-y-1'}`}>
                        {checkoutStatus === 'submitting' ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL (BUY NOW) */}
      {isCheckoutOpen && buyNow && (
        <div className="fixed inset-0 z-50 flex justify-center items-end sm:items-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => { setIsCheckoutOpen(false); setBuyNow(null); }}></div>
          <div className="relative w-full sm:max-w-2xl bg-white sm:rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900">Mua ngay</h2>
              <button onClick={() => { setIsCheckoutOpen(false); setBuyNow(null); }} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex gap-4">
                  <img src={buyNow.product.image} alt={buyNow.product.name} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 line-clamp-2">{buyNow.product.name}</div>
                    <div className="text-sm text-slate-500 mt-1">Số lượng: <span className="font-bold text-slate-900">x{buyNow.quantity}</span></div>
                    <div className="text-orange-600 font-black mt-2">{formatPrice(buyNow.product.price)}</div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Tạm tính</span>
                    <span className="font-black text-slate-900">{formatPrice(buyNowTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-slate-500 font-medium">Vận chuyển</span>
                    <span className="font-bold text-slate-700">Tùy khu vực</span>
                  </div>
                  <div className="border-t border-slate-100 mt-4 pt-4 flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Tổng cộng</span>
                    <span className="text-2xl font-black text-orange-600">{formatPrice(buyNowTotal)}</span>
                  </div>
                </div>
              </div>

              <div>
                {checkoutStatus === 'success' ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl flex flex-col items-center text-center animate-pulse">
                    <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Đặt hàng thành công!</h3>
                    <p className="text-sm">Thông tin đơn hàng của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ sớm nhất.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCheckout} className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-800">Thông tin nhận hàng</h3>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên *</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập họ và tên..." />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại *</label>
                      <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập số điện thoại..." />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Địa chỉ giao hàng *</label>
                      <textarea required rows="2" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Nhập địa chỉ chi tiết..."></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Ghi chú</label>
                      <input type="text" value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ví dụ: Giao ngoài giờ hành chính..." />
                    </div>

                    {checkoutStatus === 'error' && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">Có lỗi xảy ra khi gửi đơn.</p>}

                    <button type="submit" disabled={checkoutStatus === 'submitting'} className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all transform flex justify-center items-center gap-2 ${checkoutStatus === 'submitting' ? 'bg-slate-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 hover:-translate-y-1'}`}>
                      {checkoutStatus === 'submitting' ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const HomePage = (
    <>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-800 text-blue-200 text-sm font-semibold tracking-wider">
              HÀNG CHÍNH HÃNG 100%
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Giải Pháp Toàn Diện Cho Ngôi Nhà Của Bạn
            </h2>
            <p className="text-blue-100 text-lg">
              Từ máy móc gia dụng hiện đại đến các dòng sơn công nghiệp cao cấp. Mua sắm dễ dàng, giao hàng tận nơi.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-transform transform hover:scale-105 shadow-lg">
                Mua ngay <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => { if (isAiEnabled) setIsAiChatOpen(true); }}
                disabled={!isAiEnabled}
                className="bg-white/10 hover:bg-white/20 backdrop-blur text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors border border-white/20"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" /> Trợ lý chọn đồ
              </button>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80" alt="Sơn" className="rounded-2xl shadow-xl h-48 w-full object-cover" />
            <img src="https://images.unsplash.com/photo-1542017367-9333555ca560?auto=format&fit=crop&w=400&q=80" alt="Máy móc" className="rounded-2xl shadow-xl h-48 w-full object-cover mt-8" />
          </div>
        </div>
      </section>

      {/* TÍNH NĂNG NỔI BẬT */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-full text-blue-600"><ShieldCheck className="w-8 h-8" /></div>
            <div>
              <h4 className="font-bold text-lg">Chất Lượng Đảm Bảo</h4>
              <p className="text-slate-500 text-sm">Sản phẩm chính hãng, độ bền cao</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-4 rounded-full text-orange-600"><Truck className="w-8 h-8" /></div>
            <div>
              <h4 className="font-bold text-lg">Giao Hàng Tận Nơi</h4>
              <p className="text-slate-500 text-sm">Nhanh chóng trên toàn quốc</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 p-4 rounded-full text-emerald-600"><Phone className="w-8 h-8" /></div>
            <div>
              <h4 className="font-bold text-lg">Hỗ Trợ 24/7</h4>
              <p className="text-slate-500 text-sm">Tư vấn kỹ thuật chuyên sâu</p>
            </div>
          </div>
        </div>
      </section>

      {/* SẢN PHẨM */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-3xl font-bold text-slate-900">{activeCategory === 'Tất cả' ? 'Sản Phẩm Nổi Bật' : activeCategory}</h3>
            <p className="text-slate-500 mt-2">Lựa chọn những sản phẩm tốt nhất cho công trình của bạn.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col">
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-blue-700 shadow-sm flex items-center gap-1">
                    {product.category === 'Sơn các loại' ? <PaintBucket className="w-3 h-3" /> : <Package className="w-3 h-3" />}
                    {product.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="font-bold text-xl text-slate-900 mb-2 line-clamp-2">{product.name}</h4>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                </div>
              </Link>
              <div className="px-6 pb-6 mt-auto flex items-center justify-between">
                <span className="text-2xl font-black text-orange-600">{formatPrice(product.price)}</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-colors shadow-md hover:shadow-lg"
                  aria-label="Thêm vào giỏ hàng"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );

  return (
    <Routes>
      <Route element={Layout}>
        <Route path="/" element={HomePage} />
        <Route path="/product/:id" element={<ProductDetailPage onAddToCart={addToCart} onBuyNow={handleBuyNow} />} />
        <Route path="*" element={HomePage} />
      </Route>
    </Routes>
  );
}
