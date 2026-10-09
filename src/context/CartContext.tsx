"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { SareeProduct, CartItem } from "@/types/product";
import { useToast } from "./ToastContext";

type Currency = "INR" | "USD" | "EUR" | "GBP";

const CURRENCY_RATES: Record<Currency, { symbol: string; rateFromInr: number }> = {
  INR: { symbol: "₹", rateFromInr: 1 },
  USD: { symbol: "$", rateFromInr: 1 / 86.5 },
  EUR: { symbol: "€", rateFromInr: 1 / 94.0 },
  GBP: { symbol: "£", rateFromInr: 1 / 110.0 },
};

interface CartContextType {
  // Cart
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  couponCode: string;
  isCouponApplied: boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  addToCart: (
    product: SareeProduct,
    size?: string,
    color?: string,
    qty?: number,
    blouseCustomization?: string
  ) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;

  // Wishlist
  wishlist: SareeProduct[];
  wishlistCount: number;
  toggleWishlist: (product: SareeProduct) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: SareeProduct) => void;

  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (inrAmount: number) => string;

  // Modals & Drawers state
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isFilmOpen: boolean;
  setIsFilmOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Atelier Services Modals
  isPureZariGuideOpen: boolean;
  setIsPureZariGuideOpen: (open: boolean) => void;
  isSilkCareOpen: boolean;
  setIsSilkCareOpen: (open: boolean) => void;
  isTrackOrderOpen: boolean;
  setIsTrackOrderOpen: (open: boolean) => void;
  isShippingPolicyOpen: boolean;
  setIsShippingPolicyOpen: (open: boolean) => void;

  // Quick View Product
  quickViewProduct: SareeProduct | null;
  openQuickView: (product: SareeProduct) => void;
  closeQuickView: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD_INR = 5000;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<SareeProduct[]>([]);
  const [currency, setCurrency] = useState<Currency>("INR");
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPureZariGuideOpen, setIsPureZariGuideOpen] = useState(false);
  const [isSilkCareOpen, setIsSilkCareOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isShippingPolicyOpen, setIsShippingPolicyOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<SareeProduct | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("drift_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("drift_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCurrency = localStorage.getItem("drift_currency") as Currency;
      if (savedCurrency && CURRENCY_RATES[savedCurrency]) {
        setCurrency(savedCurrency);
      }
    } catch (e) {
      console.warn("Could not parse saved storage:", e);
    }
  }, []);

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem("drift_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Storage write error", e);
    }
  }, [cart]);

  // Save Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem("drift_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Storage write error", e);
    }
  }, [wishlist]);

  const handleSetCurrency = useCallback((curr: Currency) => {
    setCurrency(curr);
    try {
      localStorage.setItem("drift_currency", curr);
    } catch (e) {
      console.warn("Storage write error", e);
    }
  }, []);

  const formatPrice = useCallback(
    (inrAmount: number) => {
      const config = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
      const converted = inrAmount * config.rateFromInr;

      if (currency === "INR") {
        return `${config.symbol}${Math.round(converted).toLocaleString("en-IN")}`;
      }
      return `${config.symbol}${Math.round(converted).toLocaleString("en-US")}`;
    },
    [currency]
  );

  // Add to cart
  const addToCart = useCallback(
    (
      product: SareeProduct,
      size?: string,
      color?: string,
      qty = 1,
      blouseCustomization?: string
    ) => {
      const selectedSize = size || product.sizes[0] || "Unstitched";
      const selectedColor = color || product.colors[0]?.name || "Original";
      const cartItemId = `${product.id}-${selectedSize}-${selectedColor}-${blouseCustomization || "standard"}`;

      setCart((prev) => {
        const existing = prev.find((item) => item.id === cartItemId);
        if (existing) {
          return prev.map((item) =>
            item.id === cartItemId
              ? { ...item, quantity: item.quantity + qty }
              : item
          );
        }
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            selectedSize,
            selectedColor,
            quantity: qty,
            blouseCustomization,
          },
        ];
      });

      showToast({
        title: "Added to Silk Bag",
        message: `${product.name} (${selectedSize})`,
        type: "cart",
        image: product.images[0],
      });

      setIsCartOpen(true);
    },
    [showToast]
  );

  // Update Quantity
  const updateQuantity = useCallback((cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQty } : item
        )
      );
    }
  }, []);

  // Remove from Cart
  const removeFromCart = useCallback((cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Wishlist actions
  const isInWishlist = useCallback(
    (productId: string) => wishlist.some((item) => item.id === productId),
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (product: SareeProduct) => {
      setWishlist((prev) => {
        const exists = prev.some((item) => item.id === product.id);
        if (exists) {
          showToast({
            title: "Removed from Wishlist",
            message: product.name,
            type: "info",
          });
          return prev.filter((item) => item.id !== product.id);
        } else {
          showToast({
            title: "Saved to Wishlist",
            message: product.name,
            type: "wishlist",
            image: product.images[0],
          });
          return [...prev, product];
        }
      });
    },
    [showToast]
  );

  const moveToCartFromWishlist = useCallback(
    (product: SareeProduct) => {
      addToCart(product, product.sizes[0], product.colors[0]?.name);
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    },
    [addToCart]
  );

  // Coupons
  const applyCoupon = useCallback(
    (code: string) => {
      const normalized = code.trim().toUpperCase();
      if (normalized === "UTSAV25" || normalized === "DIWALI25") {
        setDiscountPercent(0.25);
        setCouponCode(normalized);
        showToast({
          title: "25% Festive Privilege Applied!",
          message: "Code: " + normalized,
          type: "success",
        });
        return true;
      }
      if (normalized === "DRIFT10" || normalized === "AURELLE10" || normalized === "WELCOME10") {
        setDiscountPercent(0.1);
        setCouponCode(normalized);
        showToast({
          title: "10% Silk Atelier Discount Applied",
          message: "Code: " + normalized,
          type: "success",
        });
        return true;
      }
      if (normalized === "SILK20") {
        setDiscountPercent(0.2);
        setCouponCode(normalized);
        showToast({
          title: "20% Handloom Privilege Applied",
          message: "Code: " + normalized,
          type: "success",
        });
        return true;
      }
      showToast({
        title: "Invalid Coupon Code",
        message: "Try code 'UTSAV25' for 25% festive off or 'DRIFT10'",
        type: "info",
      });
      return false;
    },
    [showToast]
  );

  const removeCoupon = useCallback(() => {
    setCouponCode("");
    setDiscountPercent(0);
  }, []);

  // Computations
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const wishlistCount = wishlist.length;

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [cart]
  );

  const discount = useMemo(
    () => Math.round(subtotal * discountPercent),
    [subtotal, discountPercent]
  );

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD_INR ? 0 : 450;
  }, [subtotal]);

  const total = useMemo(
    () => Math.max(0, subtotal - discount + shipping),
    [subtotal, discount, shipping]
  );

  const freeShippingProgress = useMemo(() => {
    if (subtotal >= FREE_SHIPPING_THRESHOLD_INR) return 100;
    return Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD_INR) * 100));
  }, [subtotal]);

  const openQuickView = useCallback((product: SareeProduct) => {
    setQuickViewProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        discount,
        shipping,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD_INR,
        freeShippingProgress,
        couponCode,
        isCouponApplied: discountPercent > 0,
        applyCoupon,
        removeCoupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        wishlistCount,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        currency,
        setCurrency: handleSetCurrency,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isFilmOpen,
        setIsFilmOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isPureZariGuideOpen,
        setIsPureZariGuideOpen,
        isSilkCareOpen,
        setIsSilkCareOpen,
        isTrackOrderOpen,
        setIsTrackOrderOpen,
        isShippingPolicyOpen,
        setIsShippingPolicyOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
