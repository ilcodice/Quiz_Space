"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Home,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Gamepad2,
} from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
        if (!token) return;
  
        try {
          const res = await fetch("http://localhost:5001/auth/check", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (res.ok) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } catch (err) {
          console.error("Auth check failed", err);
          setIsLoggedIn(false);
        }
      };
  
      checkAuth();
    }, []);
  
  

  const handleProfileClick = () => {
    router.push(isLoggedIn ? "/profile" : "/signup-login");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <div className="text-xl font-bold text-white">Quiz Space</div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2">
              <Link href="/"><Home className="h-4 w-4" />Home</Link>
            </Button>

            <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2">
              <Link href="/all-games"><Gamepad2 className="h-4 w-4" />Games</Link>
            </Button>

            {isLoggedIn && (
              <>
                <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2">
                  <Link href="/create-quiz-game">Create Game</Link>
                </Button>

                <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2">
                  <Link href="/profile"><User className="h-4 w-4" />Profile</Link>
                </Button>
              </>
            )}
          </div>

          {/* Avatar / Sign In */}
          <div className="hidden md:flex items-center">
            {isLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.profile_image || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-800 text-white">
                        {user.user_name?.charAt(0).toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">{user.user_name}</p>
                      <p className="text-xs leading-none text-gray-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem onClick={handleProfileClick} className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleProfileClick} variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                  <Home className="mr-3 h-4 w-4" />
                  Home
                </Button>
              </Link>

              <Link href="/all-games" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                  <Gamepad2 className="mr-3 h-4 w-4" />
                  Games
                </Button>
              </Link>

              {isLoggedIn ? (
                <>
                  <Link href="/create-quiz-game" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                      Create Game
                    </Button>
                  </Link>

                  <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                </>
              ) : (
                <Button onClick={handleProfileClick} variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}















// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Home, User, LogOut, Menu, X, Gamepad2 } from "lucide-react";

// export default function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   // Fetch user data
//   const fetchUserData = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setIsLoggedIn(false);
//       setUser(null);
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5001/auth/check", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setIsLoggedIn(true);
//         setUser(data.user);
//       } else {
//         logout();
//       }
//     } catch (error) {
//       logout();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     setUser(null);
//   };

//   useEffect(() => {
//     fetchUserData();

//     const handleStorageChange = (e: StorageEvent) => {
//       if (e.key === "token") {
//         fetchUserData();
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   const handleNavigation = (path: string) => {
//     router.push(path);
//     setIsMobileMenuOpen(false);
//   };

//   if (loading) {
//     return (
//       <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           <div className="w-10 h-10 bg-gray-700 rounded-lg animate-pulse"></div>
//           <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             <div
//               className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg cursor-pointer"
//               onClick={() => handleNavigation("/")}
//             >
//               <Gamepad2 className="h-6 w-6 text-white" />
//             </div>
//             <div className="text-xl font-bold text-white">Quiz Space</div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Button
//               variant="ghost"
//               className="text-gray-300 hover:text-white hover:bg-gray-800"
//               onClick={() => handleNavigation("/")}
//             >
//               <Home className="mr-2 h-4 w-4" />
//               Home
//             </Button>

//             <Button
//               variant="ghost"
//               className="text-gray-300 hover:text-white hover:bg-gray-800"
//               onClick={() => handleNavigation("/all-games")}
//             >
//               <Gamepad2 className="mr-2 h-4 w-4" />
//               Games
//             </Button>

//             {isLoggedIn && (
//               <Button
//                 variant="ghost"
//                 className="text-gray-300 hover:text-white hover:bg-gray-800"
//                 onClick={() => handleNavigation("/create-quiz-game")}
//               >
//                 Create Game
//               </Button>
//             )}
//           </div>

//           {/* Auth Section */}
//           <div className="hidden md:flex items-center gap-4">
//           {isLoggedIn ? (
//   <>
//     {/* Profile Dropdown */}
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="relative h-10 w-10 rounded-full">
//           <Avatar className="h-10 w-10">
//             <AvatarImage
//               src={user?.avatarUrl || "/placeholder.svg?height=40&width=40"}
//               alt={user?.username || "Profile"}
//             />
//             <AvatarFallback className="bg-gray-800 text-white">
//               {user?.username?.slice(0, 2).toUpperCase() || "U"}
//             </AvatarFallback>
//           </Avatar>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         className="w-56 bg-gray-900 border-gray-800"
//         align="end"
//         forceMount
//       >
//         <DropdownMenuLabel className="font-normal">
//           <div className="flex flex-col space-y-1">
//             <p className="text-sm font-medium leading-none text-white">
//               {user?.username || "User"}
//             </p>
//             <p className="text-xs leading-none text-gray-400">
//               {user?.email || "your@email.com"}
//             </p>
//           </div>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator className="bg-gray-800" />
//         <DropdownMenuItem
//           onClick={() => handleNavigation("/profile")}
//           className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
//         >
//           <User className="mr-2 h-4 w-4" />
//           <span>Profile</span>
//         </DropdownMenuItem>
//         <DropdownMenuSeparator className="bg-gray-800" />
//         <DropdownMenuItem
//           onClick={() => {
//             logout();
//             handleNavigation("/signup-login");
//           }}
//           className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
//         >
//           <LogOut className="mr-2 h-4 w-4" />
//           <span>Log out</span>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   </>
// ) : (
//   <Button
//     variant="ghost"
//     className="text-gray-300 hover:text-white hover:bg-gray-800"
//     onClick={() => handleNavigation("/signup-login")}
//   >
//     Sign Up
//   </Button>
// )}

//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <Button
//               variant="ghost"
//               className="text-gray-300 hover:text-white hover:bg-gray-800"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               {isMobileMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden pb-4 px-4 space-y-2 border-t border-gray-800">
//             <Button
//               variant="ghost"
//               className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
//               onClick={() => handleNavigation("/")}
//             >
//               <Home className="mr-2 h-4 w-4" />
//               Home
//             </Button>

//             <Button
//               variant="ghost"
//               className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
//               onClick={() => handleNavigation("/all-games")}
//             >
//               <Gamepad2 className="mr-2 h-4 w-4" />
//               Games
//             </Button>

//             {isLoggedIn && (
//               <Button
//                 variant="ghost"
//                 className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
//                 onClick={() => handleNavigation("/create-quiz-game")}
//               >
//                 Create Game
//               </Button>
//             )}

//             <div className="pt-2 border-t border-gray-800">
//               {isLoggedIn ? (
//                 <>
//                   <div className="flex items-center px-4 py-2">
//                     <Avatar className="h-10 w-10 mr-3">
//                       <AvatarFallback className="bg-gray-800 text-white">
//                         {user?.user_name?.charAt(0).toUpperCase() || "U"}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <div className="text-sm font-medium text-white">
//                         {user?.user_name}
//                       </div>
//                       <div className="text-xs text-gray-400">{user?.email}</div>
//                     </div>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
//                     onClick={() => handleNavigation("/profile")}
//                   >
//                     <User className="mr-2 h-4 w-4" />
//                     Profile
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
//                     onClick={() => {
//                       logout();
//                       handleNavigation("/");
//                     }}
//                   >
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Logout
//                   </Button>
//                 </>
//               ) : (
//                 <Button
//                   variant="default"
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//                   onClick={() => handleNavigation("/signup-login")}
//                 >
//                   Sign In
//                 </Button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// "use client";

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Button } from "../ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu"
// import { Home, User, Settings, LogOut, Menu, X, Gamepad2 } from "lucide-react"
// import { isAuthenticated } from "../../../../actions/auth";

// export default function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   interface IUser {
//     user_name: string;
//     email: string;
//     profile_image: string;
//     bio?: string;
//     location?: string;
//   }
  
//   const [user, setUser] = useState<IUser | null>(null);

//   const router = useRouter();
//   // let isAuth = isAuthenticated();
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await fetch('http://localhost:5001/auth/check', {
//           credentials: 'include',
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           setIsLoggedIn(true);
//           setUser(data.user);
//         } else {
//           setIsLoggedIn(false);
//           setUser(null);
//         }
//       } catch (error) {
//         setIsLoggedIn(false);
//         setUser(null);
//       }
//     };

//     checkAuth();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await fetch('http://localhost:5001/auth/logout', {
//         method: 'POST',
//         credentials: 'include'
//       });
//       localStorage.removeItem('token');
//       setIsLoggedIn(false);
//       setUser(null);
//       router.push('/');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   const handleProfileClick = () => {
//     if (isLoggedIn) {
//       router.push('/profile');
//     } else {
//       router.push('/signup-login');
//     }
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo and Brand */}
//           <div className="flex items-center gap-3">
//             <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
//               <Gamepad2 className="h-6 w-6 text-white" />
//             </div>
//             <div className="text-xl font-bold text-white">Quiz Space</div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Button
//               asChild
//               variant="ghost"
//               className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2"
//             >
//               <Link href="/">
//                 <Home className="h-4 w-4" />
//                 Home
//               </Link>
//             </Button>

//             <Button
//               asChild
//               variant="ghost"
//               className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2"
//             >
//               <Link href="/all-games">
//                 <Gamepad2 className="h-4 w-4" />
//                 Games
//               </Link>
//             </Button>

//             {isLoggedIn && (
//               <Button
//                 asChild
//                 variant="ghost"
//                 className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2"
//               >
//                 <Link href="/create-quiz-game">
//                   Create Game
//                 </Link>
//               </Button>
//             )}
//           </div>

//           {/* Right side buttons - conditionally rendered based on login status */}
//           <div className="hidden md:flex items-center gap-4">
//             {isLoggedIn ? (
//               <>
//                 {/* Profile Dropdown */}
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" className="relative h-10 w-10 rounded-full">
//                       <Avatar className="h-10 w-10">
//                         <AvatarImage src={user?.avatar || "/placeholder.svg?height=40&width=40"} alt="Profile" />
//                         <AvatarFallback className="bg-gray-800 text-white">
//                           {user?.user_name ? user.user_name.charAt(0).toUpperCase() : 'U'}
//                         </AvatarFallback>
//                       </Avatar>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800" align="end" forceMount>
//                     <DropdownMenuLabel className="font-normal">
//                       <div className="flex flex-col space-y-1">
//                         <p className="text-sm font-medium leading-none text-white">{user?.user_name || 'User'}</p>
//                         <p className="text-xs leading-none text-gray-400">{user?.email || ''}</p>
//                       </div>
//                     </DropdownMenuLabel>
//                     <DropdownMenuSeparator className="bg-gray-800" />
//                     <DropdownMenuItem 
//                       className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
//                       onClick={() => router.push('/profile')}
//                     >
//                       <User className="mr-2 h-4 w-4" />
//                       <span>Profile</span>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem 
//                       className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
//                       onClick={() => router.push('/settings')}
//                     >
//                       <Settings className="mr-2 h-4 w-4" />
//                       <span>Settings</span>
//                     </DropdownMenuItem>
//                     <DropdownMenuSeparator className="bg-gray-800" />
//                     <DropdownMenuItem 
//                       className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
//                       onClick={handleLogout}
//                     >
//                       <LogOut className="mr-2 h-4 w-4" />
//                       <span>Log out</span>
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </>
//             ) : (
//               <Button
//                 asChild
//                 variant="default"
//                 className="bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 <Link href="/signup-login">
//                   Sign Up
//                 </Link>
//               </Button>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <Button
//               variant="ghost"
//               className="text-gray-300 hover:text-white hover:bg-gray-800"
//               onClick={toggleMobileMenu}
//             >
//               {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
//               <Button 
//                 variant="ghost" 
//                 className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
//                 onClick={() => {
//                   router.push('/');
//                   setIsMobileMenuOpen(false);
//                 }}
//               >
//                 <Home className="mr-3 h-4 w-4" />
//                 Home
//               </Button>

//               <Button 
//                 variant="ghost" 
//                 className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
//                 onClick={() => {
//                   router.push('/all-games');
//                   setIsMobileMenuOpen(false);
//                 }}
//               >
//                 <Gamepad2 className="mr-3 h-4 w-4" />
//                 Games
//               </Button>

//               {isLoggedIn && (
//                 <Button 
//                   variant="ghost" 
//                   className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
//                   onClick={() => {
//                     router.push('/create-quiz-game');
//                     setIsMobileMenuOpen(false);
//                   }}
//                 >
//                   Create Game
//                 </Button>
//               )}

//               {/* Mobile Profile Section */}
//               {!isLoggedIn ? (
//   <div className="pt-4 border-t border-gray-800">
//     <Button
//       variant="default"
//       className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//       onClick={() => {
//         router.push('/signup-login');
//         setIsMobileMenuOpen(false);
//       }}
//     >
//       Sign Up
//     </Button>
//   </div>
// ) : (
//   <>
//     <Button 
//       variant="ghost" 
//       className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
//       onClick={() => {
//         router.push('/create-quiz-game');
//         setIsMobileMenuOpen(false);
//       }}
//     >
//       Create Game
//     </Button>

//     {/* Mobile Profile Section */}
//     <div className="pt-4 border-t border-gray-800">
//       <div className="flex items-center px-3 py-2">
//         <Avatar className="h-10 w-10 mr-3">
//           <AvatarImage src={user?.avatar || "/placeholder.svg?height=40&width=40"} alt="Profile" />
//           <AvatarFallback className="bg-gray-800 text-white">
//             {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
//           </AvatarFallback>
//         </Avatar>
//         <div>
//           <div className="text-sm font-medium text-white">{user?.name || 'User'}</div>
//           <div className="text-xs text-gray-400">{user?.email || ''}</div>
//         </div>
//       </div>

//       <Button
//         variant="ghost"
//         className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
//         onClick={() => {
//           router.push('/profile');
//           setIsMobileMenuOpen(false);
//         }}
//       >
//         <User className="mr-3 h-4 w-4" />
//         Profile
//       </Button>

//       <Button
//         variant="ghost"
//         className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
//         onClick={() => {
//           router.push('/settings');
//           setIsMobileMenuOpen(false);
//         }}
//       >
//         <Settings className="mr-3 h-4 w-4" />
//         Settings
//       </Button>

//       <Button
//         variant="ghost"
//         className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
//         onClick={handleLogout}
//       >
//         <LogOut className="mr-3 h-4 w-4" />
//         Log out
//       </Button>
//     </div>
//   </>
// )}

             
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }

// "use client";

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Button } from "../ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Home, User, Settings, LogOut, Menu, X, Gamepad2 } from "lucide-react";

// export default function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState<{
//     user_name: string;
//     email: string;
//     profile_image: string;
//     bio?: string;
//     location?: string;
//   } | null>(null);

//   const router = useRouter();

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await fetch('http://localhost:5001/auth/check', {
//           credentials: 'include',
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         if (response.ok) {
//           const json = await response.json();
//           setIsLoggedIn(true);
//           setUser(json.data.user);
//         } else {
//           setIsLoggedIn(false);
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Error checking auth:", error);
//         setIsLoggedIn(false);
//         setUser(null);
//       }
//     };

//     checkAuth();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await fetch('http://localhost:5001/auth/logout', {
//         method: 'POST',
//         credentials: 'include',
//       });
//       localStorage.removeItem('token');
//       setIsLoggedIn(false);
//       setUser(null);
//       router.push('/');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo and Brand */}
//           <div className="flex items-center gap-3">
//             <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
//               <Gamepad2 className="h-6 w-6 text-white" />
//             </div>
//             <div className="text-xl font-bold text-white">Quiz Space</div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2">
//               <Link href="/"><Home className="h-4 w-4" /> Home</Link>
//             </Button>
//             <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2">
//               <Link href="/all-games"><Gamepad2 className="h-4 w-4" /> Games</Link>
//             </Button>
//             {isLoggedIn && (
//               <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2">
//                 <Link href="/create-quiz-game">Create Game</Link>
//               </Button>
//             )}
//           </div>

//           {/* Right side buttons */}
//           <div className="hidden md:flex items-center gap-4">
//             {isLoggedIn && user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="relative h-10 w-10 rounded-full">
//                     <Avatar className="h-10 w-10">
//                       <AvatarImage src={user.profile_image || "/placeholder.svg"} alt="Profile" />
//                       <AvatarFallback className="bg-gray-800 text-white">
//                         {user.user_name ? user.user_name.charAt(0).toUpperCase() : 'U'}
//                       </AvatarFallback>
//                     </Avatar>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800" align="end" forceMount>
//                   <DropdownMenuLabel className="font-normal">
//                     <div className="flex flex-col space-y-1">
//                       <p className="text-sm font-medium leading-none text-white">{user.user_name}</p>
//                       <p className="text-xs leading-none text-gray-400">{user.email}</p>
//                     </div>
//                   </DropdownMenuLabel>
//                   <DropdownMenuSeparator className="bg-gray-800" />
//                   <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer" onClick={() => router.push('/profile')}>
//                     <User className="mr-2 h-4 w-4" />
//                     <span>Profile</span>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer" onClick={() => router.push('/settings')}>
//                     <Settings className="mr-2 h-4 w-4" />
//                     <span>Settings</span>
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator className="bg-gray-800" />
//                   <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer" onClick={handleLogout}>
//                     <LogOut className="mr-2 h-4 w-4" />
//                     <span>Log out</span>
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <Button asChild variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
//                 <Link href="/signup-login">Sign Up</Link>
//               </Button>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800" onClick={toggleMobileMenu}>
//               {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-800">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800" onClick={() => { router.push('/'); setIsMobileMenuOpen(false); }}>
//                 <Home className="mr-3 h-4 w-4" /> Home
//               </Button>
//               <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800" onClick={() => { router.push('/all-games'); setIsMobileMenuOpen(false); }}>
//                 <Gamepad2 className="mr-3 h-4 w-4" /> Games
//               </Button>
//               {isLoggedIn && (
//                 <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800" onClick={() => { router.push('/create-quiz-game'); setIsMobileMenuOpen(false); }}>
//                   Create Game
//                 </Button>
//               )}
//               {!isLoggedIn ? (
//                 <div className="pt-4 border-t border-gray-800">
//                   <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => { router.push('/signup-login'); setIsMobileMenuOpen(false); }}>
//                     Sign Up
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="pt-4 border-t border-gray-800">
//                   <div className="flex items-center px-3 py-2">
//                     <Avatar className="h-10 w-10 mr-3">
//                       <AvatarImage src={user?.profile_image || "/placeholder.svg"} alt="Profile" />
//                       <AvatarFallback className="bg-gray-800 text-white">
//                         {user?.user_name ? user.user_name.charAt(0).toUpperCase() : 'U'}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <div className="text-sm font-medium text-white">{user?.user_name}</div>
//                       <div className="text-xs text-gray-400">{user?.email}</div>
//                     </div>
//                   </div>
//                   <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800" onClick={() => { router.push('/profile'); setIsMobileMenuOpen(false); }}>
//                     <User className="mr-3 h-4 w-4" /> Profile
//                   </Button>
//                   <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800" onClick={() => { router.push('/settings'); setIsMobileMenuOpen(false); }}>
//                     <Settings className="mr-3 h-4 w-4" /> Settings
//                   </Button>
//                   <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800" onClick={handleLogout}>
//                     <LogOut className="mr-3 h-4 w-4" /> Log out
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }
