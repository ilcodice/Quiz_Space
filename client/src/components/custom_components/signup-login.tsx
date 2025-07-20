"use client"

import { useRouter } from 'next/navigation'
import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Eye, EyeOff, Github, Mail } from "lucide-react"
import { toast } from "sonner" // or your preferred toast library
import { loginSchema, registerSchema } from "../../lib/validations/user"
import { z } from "zod"
import { loginWithGoogle } from '../../actions/auth'

export default function Page() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    user_name: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const registerSchema = z.object({
    user_name: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: z.string()
    .email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
});
  




const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // For cookies
      body: JSON.stringify({
        email: formData.email,
        password: formData.password // Ensure case-sensitive
      }),
    });

    const data = await res.json();
    console.log('Login Response:', data);

    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    localStorage.setItem('user', JSON.stringify(data.data.user));
    router.push('/profile');
    
  } catch (err) {
    toast.error(err instanceof Error ? err.message : 'Login failed');
  } finally {
    setIsLoading(false);
  }
};


// Updated handleRegister function
const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const validated = registerSchema.parse({
      user_name: formData.user_name,
      email: formData.email,
      password: formData.password
    });

    if (formData.password !== formData.confirmPassword) {
      throw new Error("Passwords don't match");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validated),
    });

    const data = await res.json();

    // Only throw error if status is 4xx/5xx
    if (res.status >= 400) {
      throw new Error(data.message || 'Registration failed');
    }

    // Success case
    toast.success(data.message || 'Registration successful! Please login.');
    setIsLogin(true);
    setFormData({
      email: validated.email,
      password: '',
      confirmPassword: '',
      user_name: ''
    });
    
  } catch (err) {
    toast.error(err instanceof Error ? err.message : 'Registration failed');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-6/12 p-10 flex items-center justify-center rounded-[2rem] bg-gray-600/25 backdrop-blur-sm border border-black shadow-2xl">
        <div className="w-11/12 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md">
            
            <div className="grid grid-cols-2 mb-6 bg-black/5 backdrop-blur-md border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  isLogin ? "bg-white/10 text-white shadow-sm" : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  !isLogin ? "bg-white/10 text-white shadow-sm" : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                Sign Up
              </button>
            </div>

            {isLogin ? (
            //   Login
              <form onSubmit={handleLogin}>
                console.log("Form submitted") 
                <Card className="bg-black/10 backdrop-blur-lg border border-white/10 shadow-2xl">
                  <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
                    <CardDescription className="text-gray-300">Enter your credentials to access your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Github
                      </Button>
                      <Button
                          type="button"
                          variant="outline"
                          onClick={() => loginWithGoogle()}
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Google
                        </Button>

                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-black/10 px-2 text-gray-400">Or continue with</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/20"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/20 pr-10"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="remember"
                          className="rounded border-white/10 bg-white/5 text-white focus:ring-white/20"
                        />
                        <Label htmlFor="remember" className="text-sm text-gray-300">
                          Remember me
                        </Label>
                      </div>
                      <Button variant="link" className="px-0 text-gray-300 hover:text-white">
                        Forgot password?
                      </Button>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-white text-black hover:bg-gray-200"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </CardContent>
                </Card>
              </form>
            ) : (
            //   Signup
              <form onSubmit={handleRegister}>
                <Card className="bg-black/10 backdrop-blur-lg border border-white/10 shadow-2xl">
                  <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold text-white">Create account</CardTitle>
                    <CardDescription className="text-gray-300">Enter your information to create your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Github
                      </Button>

                      <Button
                          type="button"
                          variant="outline"
                          onClick={() => loginWithGoogle()}
                        >
                          <Mail className="mr-2 h-4 w-4 " />
                          Google
                        </Button>


                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-black/10 px-2 text-gray-400">Or continue with</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="user_name" className="text-white">
                        Username
                      </Label>
                      <Input
                        id="user_name"
                        placeholder="johndoe"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/20"
                        value={formData.user_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/20"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/20 pr-10"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>

                      {/* Password requirements list */}
                      <div className="text-xs text-gray-400">
                        <p>Password must contain:</p>
                        <ul className="list-disc pl-5">
                          <li className={formData.password.length >= 8 ? 'text-green-400' : ''}>
                            At least 8 characters
                          </li>
                          <li className={/[A-Z]/.test(formData.password) ? 'text-green-400' : ''}>
                            One uppercase letter
                          </li>
                          <li className={/[a-z]/.test(formData.password) ? 'text-green-400' : ''}>
                            One lowercase letter
                          </li>
                          <li className={/\d/.test(formData.password) ? 'text-green-400' : ''}>
                            One number
                          </li>

                        </ul>
                      </div>


                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/20 pr-10"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-white"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="rounded border-white/10 bg-white/5 text-white focus:ring-white/20"
                        required
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-300">
                        I agree to the{" "}
                        <Button variant="link" className="px-0 h-auto text-gray-300 hover:text-white underline">
                          Terms of Service
                        </Button>{" "}
                        and{" "}
                        <Button variant="link" className="px-0 h-auto text-gray-300 hover:text-white underline">
                          Privacy Policy
                        </Button>
                      </Label>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-white text-black hover:bg-gray-200"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </CardContent>
                </Card>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

