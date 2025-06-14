import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  // App
  layout('App.tsx', [
    // Home
    index('home/pages/Home.tsx'),
    
    // Profile
    ...prefix('profile', [
      layout('profile/pages/ProfilePage.tsx', [
        //Auth Profile
        layout('auth/routes/ProtectedAuth.tsx', [
          index('profile/pages/Profile.tsx')
        ]),
        route('wish-list', 'wishlist/pages/WishList.tsx'),
      ]),
    ]),
  ]),
  
  // Cart
  ...prefix('cart', [
    layout('cart/pages/Cart.tsx', [
      layout('cart/components/CartHeader.tsx', [
        index('cart/components/CartContent.tsx')
      ])
    ])
  ]),

  // Auth
  route('login', 'auth/pages/Login.tsx'),
  route('register', 'auth/pages/register.tsx'),
] satisfies RouteConfig;
