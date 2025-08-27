import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  // Main
  layout('App.tsx', [
    // Home
    index('home/routes/Home.tsx'),

    // Profile
    ...prefix('profile', [
      layout('profile/layouts/profile-layout.tsx', [
        //Auth Profile
        layout('profile/layouts/auth-profile-layout.tsx', [
          index('profile/routes/profile.tsx'),
          route('settings', 'profile/routes/profile-settings.tsx'),
        ]),
        route('wish-list', 'wishlist/routes/wish-list.tsx'),
      ]),
    ]),

    route('product/:id', 'products/routes/product-details.tsx'),
  ]),
  
  // Cart
  ...prefix('cart', [
    layout('cart/layouts/cart-layout.tsx', [
      layout('cart/layouts/cart-header-layout.tsx', [
        index('cart/routes/cart-content.tsx'),
        route('user-data', 'cart/routes/cart-user-data.tsx'),
        route('delivery', 'cart/routes/cart-delivery.tsx'),
        route('payment', 'cart/routes/cart-payment.tsx')
      ])
    ])
  ]),

  // Auth
  route('login', 'auth/routes/login.tsx'),
  route('register', 'auth/routes/register.tsx'),

  // Actions
  route('logout-action', 'auth/actions/logout.action.tsx'),
] satisfies RouteConfig;
