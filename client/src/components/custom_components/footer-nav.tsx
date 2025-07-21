
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Gamepad2, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className=" bg-gray-900/40 backdrop-blur-sm border-t border-gray-800">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4 ">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                  <Gamepad2 className="h-6 w-6 text-white" />
                </div>
                <div className="text-xl font-bold text-white">Quiz Space</div>
              </div>
 
              {/* Social Media Links */}
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 h-9 w-9"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 h-9 w-9"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 h-9 w-9"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 h-9 w-9"
                >
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>

    
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">About & Support</h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 justify-start p-0 h-auto font-normal"
                >
                  About Us
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 justify-start p-0 h-auto font-normal"
                >
                  Contact
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 justify-start p-0 h-auto font-normal"
                >
                  Help Center
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 justify-start p-0 h-auto font-normal"
                >
                  Privacy Policy
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 justify-start p-0 h-auto font-normal"
                >
                  Terms of Service
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">support@quizmaster.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">123 Quiz Street, Game City, GC 12345</span>
                </div>
              </div>


            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">© {currentYear} Quiz Space. All rights reserved.</div>

            <div className="flex items-center gap-6 text-sm">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-gray-800 p-0 h-auto font-normal"
              >
                Privacy Policy
              </Button>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-gray-800 p-0 h-auto font-normal"
              >
                Terms of Service
              </Button>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-gray-800 p-0 h-auto font-normal"
              >
                Cookie Policy
              </Button>
            </div>
          </div>
        </div>
      </div>
   
     </footer>
  )
}
