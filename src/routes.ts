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
          index('profile/routes/profile.tsx')
        ]),
        route('wish-list', 'wishlist/routes/wish-list.tsx'),
      ]),
    ]),
  ]),

  // Cart
  ...prefix('cart', [
    layout('cart/layouts/cart-layout.tsx', [
      layout('cart/layouts/cart-header-layout.tsx', [
        index('cart/routes/cart-content.tsx')
      ])
    ])
  ]),

  // Auth
  route('login', 'auth/routes/login.tsx'),
  route('register', 'auth/routes/register.tsx'),

  // Actions
  route('logout-action', 'auth/actions/logout.action.tsx'),
] satisfies RouteConfig;
