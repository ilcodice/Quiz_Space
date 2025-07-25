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
    const loadUser = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (token && storedUser) {
        setIsLoggedIn(true);
        setUser(JSON.parse(storedUser));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
  
    loadUser();
  
    const handleAuthChange = () => {
      loadUser();
    };
  
    window.addEventListener("auth-change", handleAuthChange); // 👈 Listen for custom event
  
    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);
  
  
  
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event("auth-change")); // 🔥 Notify Navbar
    router.push('/');



  };
  

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

                <Button onClick={handleLogout} variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2">
                  <LogOut className="h-4 w-4" />Logout
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
                    <Link href="/profile"><span>Profile</span></Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer">
                    <LogOut onClick={handleLogout} className="mr-2 h-4 w-4" />
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









