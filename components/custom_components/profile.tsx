// "use client"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Edit, Save, X, Camera, Trophy, Calendar, Mail } from "lucide-react"
// import { useState } from "react"

// export default function ProfilePage() {
//   const [isEditing, setIsEditing] = useState(false)
//   const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)

//   const [profileData, setProfileData] = useState({
//     name: "John Doe",
//     email: "john.doe@example.com",
//     username: "johndoe123",
//     bio: "Quiz enthusiast and trivia master. Love challenging myself with difficult questions and creating engaging quizzes for others.",
//     location: "New York, USA",
//     joinDate: "January 2024",
//     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe123",
//   })

//   const [editData, setEditData] = useState(profileData)

//   // Avatar styles from dicebear
//   const avatarStyles = [
//     "avataaars",
//     "big-smile",
//     "bottts",
//     "fun-emoji",
//     "icons",
//     "identicon",
//     "initials",
//     "lorelei",
//     "micah",
//     "miniavs",
//     "open-peeps",
//     "personas",
//     "pixel-art",
//   ]

//   const handleEdit = () => {
//     setIsEditing(true)
//     setEditData(profileData)
//   }

//   const handleSave = () => {
//     setProfileData(editData)
//     setIsEditing(false)
//   }

//   const handleCancel = () => {
//     setEditData(profileData)
//     setIsEditing(false)
//   }

//   const handleInputChange = (field: string, value: string) => {
//     setEditData((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const handleAvatarSelect = (style: string) => {
//     const newAvatar = `https://api.dicebear.com/7.x/${style}/svg?seed=${editData.username}`
//     setEditData((prev) => ({
//       ...prev,
//       avatar: newAvatar,
//     }))
//     setIsAvatarDialogOpen(false)
//   }

//   const generateRandomAvatar = (style: string) => {
//     const randomSeed = Math.random().toString(36).substring(7)
//     return `https://api.dicebear.com/7.x/${style}/svg?seed=${randomSeed}`
//   }

//   // Mock stats data
//   const stats = {
//     gamesPlayed: 127,
//     gamesWon: 89,
//     totalScore: 15420,
//     averageScore: 121,
//     winRate: 70,
//     streak: 12,
//   }

//   return (
//     <div className="min-h-screen bg-black py-8 px-6">
//       <div className="max-w-4xl mx-auto space-y-8">
//         {/* Profile Header */}
//         <Card className="bg-gray-900 border-gray-800">
//           <CardContent className="p-8">
//             <div className="flex flex-col md:flex-row gap-8 items-start">
//               {/* Avatar Section */}
//               <div className="flex flex-col items-center space-y-4">
//                 <div className="relative">
//                   <Avatar className="h-32 w-32">
//                     <AvatarImage src={isEditing ? editData.avatar : profileData.avatar} alt="Profile" />
//                     <AvatarFallback className="bg-gray-800 text-white text-2xl">
//                       {profileData.name
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")}
//                     </AvatarFallback>
//                   </Avatar>
//                   {isEditing && (
//                     <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
//                       <DialogTrigger asChild>
//                         <Button
//                           size="sm"
//                           className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 h-8 w-8"
//                         >
//                           <Camera className="h-4 w-4" />
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
//                         <DialogHeader>
//                           <DialogTitle className="text-white">Choose Your Avatar</DialogTitle>
//                           <DialogDescription className="text-gray-400">
//                             Select an avatar style from Dicebear
//                           </DialogDescription>
//                         </DialogHeader>
//                         <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
//                           {avatarStyles.map((style) => (
//                             <div key={style} className="text-center space-y-2">
//                               <Button
//                                 variant="ghost"
//                                 className="p-2 h-auto hover:bg-gray-800"
//                                 onClick={() => handleAvatarSelect(style)}
//                               >
//                                 <Avatar className="h-16 w-16">
//                                   <AvatarImage src={generateRandomAvatar(style) || "/placeholder.svg"} alt={style} />
//                                 </Avatar>
//                               </Button>
//                               <p className="text-xs text-gray-400 capitalize">{style.replace("-", " ")}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </DialogContent>
//                     </Dialog>
//                   )}
//                 </div>
//                 <Badge className="bg-blue-600 text-white">Level 15</Badge>
//               </div>

//               {/* Profile Info */}
//               <div className="flex-1 space-y-4">
//                 {isEditing ? (
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="name" className="text-gray-300">
//                           Full Name
//                         </Label>
//                         <Input
//                           id="name"
//                           value={editData.name}
//                           onChange={(e) => handleInputChange("name", e.target.value)}
//                           className="bg-gray-800 border-gray-700 text-white"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="username" className="text-gray-300">
//                           Username
//                         </Label>
//                         <Input
//                           id="username"
//                           value={editData.username}
//                           onChange={(e) => handleInputChange("username", e.target.value)}
//                           className="bg-gray-800 border-gray-700 text-white"
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="email" className="text-gray-300">
//                         Email
//                       </Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         value={editData.email}
//                         onChange={(e) => handleInputChange("email", e.target.value)}
//                         className="bg-gray-800 border-gray-700 text-white"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="location" className="text-gray-300">
//                         Location
//                       </Label>
//                       <Input
//                         id="location"
//                         value={editData.location}
//                         onChange={(e) => handleInputChange("location", e.target.value)}
//                         className="bg-gray-800 border-gray-700 text-white"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="bio" className="text-gray-300">
//                         Bio
//                       </Label>
//                       <Textarea
//                         id="bio"
//                         value={editData.bio}
//                         onChange={(e) => handleInputChange("bio", e.target.value)}
//                         className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     <div>
//                       <h1 className="text-3xl font-bold text-white">{profileData.name}</h1>
//                       <p className="text-gray-400">@{profileData.username}</p>
//                     </div>
//                     <div className="flex items-center gap-4 text-gray-400">
//                       <div className="flex items-center gap-2">
//                         <Mail className="h-4 w-4" />
//                         <span>{profileData.email}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Calendar className="h-4 w-4" />
//                         <span>Joined {profileData.joinDate}</span>
//                       </div>
//                     </div>
//                     <p className="text-gray-300">{profileData.bio}</p>
//                     <p className="text-gray-400">📍 {profileData.location}</p>
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex gap-4 pt-4">
//                   {isEditing ? (
//                     <>
//                       <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
//                         <Save className="mr-2 h-4 w-4" />
//                         Save Changes
//                       </Button>
//                       <Button
//                         onClick={handleCancel}
//                         variant="outline"
//                         className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
//                       >
//                         <X className="mr-2 h-4 w-4" />
//                         Cancel
//                       </Button>
//                     </>
//                   ) : (
//                     <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 text-white">
//                       <Edit className="mr-2 h-4 w-4" />
//                       Edit Profile
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Stats Section */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           <Card className="bg-gray-900 border-gray-800">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-blue-400">{stats.gamesPlayed}</div>
//               <div className="text-sm text-gray-400">Games Played</div>
//             </CardContent>
//           </Card>
//           <Card className="bg-gray-900 border-gray-800">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-green-400">{stats.gamesWon}</div>
//               <div className="text-sm text-gray-400">Games Won</div>
//             </CardContent>
//           </Card>
//           <Card className="bg-gray-900 border-gray-800">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-purple-400">{stats.totalScore.toLocaleString()}</div>
//               <div className="text-sm text-gray-400">Total Score</div>
//             </CardContent>
//           </Card>
//           <Card className="bg-gray-900 border-gray-800">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-yellow-400">{stats.averageScore}</div>
//               <div className="text-sm text-gray-400">Avg Score</div>
//             </CardContent>
//           </Card>
//           <Card className="bg-gray-900 border-gray-800">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-red-400">{stats.winRate}%</div>
//               <div className="text-sm text-gray-400">Win Rate</div>
//             </CardContent>
//           </Card>

//         </div>

//         {/* Recent Activity */}
//         <Card className="bg-gray-900 border-gray-800">
//           <CardHeader>
//             <CardTitle className="text-white flex items-center gap-2">
//               <Trophy className="h-5 w-5" />
//               Recent Activity
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {/* <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
//               <div className="flex items-center gap-3">
//                 <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                 <div>
//                   <div className="text-white font-medium">Completed "Science Quiz #42"</div>
//                   <div className="text-gray-400 text-sm">Scored 180 points • 2 hours ago</div>
//                 </div>
//               </div>
//               <Badge className="bg-green-600 text-white">Won</Badge>
//             </div>
//             <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
//               <div className="flex items-center gap-3">
//                 <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
//                 <div>
//                   <div className="text-white font-medium">Created "History Trivia"</div>
//                   <div className="text-gray-400 text-sm">15 questions • 1 day ago</div>
//                 </div>
//               </div>
//               <Badge className="bg-blue-600 text-white">Created</Badge>
//             </div> */}
//             <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
//               <div className="flex items-center gap-3">
//                 <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
//                 <div>
//                   <div className="text-white font-medium">Achieved Level 15</div>
//                   <div className="text-gray-400 text-sm">Milestone reached • 3 days ago</div>
//                 </div>
//               </div>
//               <Badge className="bg-yellow-600 text-white">Achievement</Badge>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Save, X, Camera, Trophy, Calendar, Mail } from "lucide-react"
import { useState } from "react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    username: "johndoe123",
    bio: "Quiz enthusiast and trivia master. Love challenging myself with difficult questions and creating engaging quizzes for others.",
    location: "New York, USA",
    joinDate: "January 2024",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe123",
  })

  const [editData, setEditData] = useState(profileData)

  // Avatar styles from dicebear
  const avatarStyles = [
    "avataaars",
    "big-smile",
    "bottts",
    "fun-emoji",
    "icons",
    "identicon",
    "initials",
    "lorelei",
    "micah",
    "miniavs",
    "open-peeps",
    "personas",
    "pixel-art",
  ]

  const handleEdit = () => {
    setIsEditing(true)
    setEditData(profileData)
  }

  const handleSave = () => {
    setProfileData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAvatarSelect = (style: string) => {
    const newAvatar = `https://api.dicebear.com/7.x/${style}/svg?seed=${editData.username}`
    setEditData((prev) => ({
      ...prev,
      avatar: newAvatar,
    }))
    setIsAvatarDialogOpen(false)
  }

  const generateRandomAvatar = (style: string) => {
    const randomSeed = Math.random().toString(36).substring(7)
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${randomSeed}`
  }

  // Mock stats data
  const stats = {
    gamesPlayed: 127,
    gamesWon: 89,
    totalScore: 15420,
    averageScore: 121,
    winRate: 70,
    streak: 12,
  }

  return (
    <div className="min-h-screen bg-black py-8 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={isEditing ? editData.avatar : profileData.avatar} alt="Profile" />
                    <AvatarFallback className="bg-gray-800 text-white text-2xl">
                      {profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 h-8 w-8"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-white">Choose Your Avatar</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Select an avatar style from Dicebear
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                          {avatarStyles.map((style) => (
                            <div key={style} className="text-center space-y-2">
                              <Button
                                variant="ghost"
                                className="p-2 h-auto hover:bg-gray-800"
                                onClick={() => handleAvatarSelect(style)}
                              >
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={generateRandomAvatar(style) || "/placeholder.svg"} alt={style} />
                                </Avatar>
                              </Button>
                              <p className="text-xs text-gray-400 capitalize">{style.replace("-", " ")}</p>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                <Badge className="bg-blue-600 text-white">Level 15</Badge>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={editData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-gray-300">
                          Username
                        </Label>
                        <Input
                          id="username"
                          value={editData.username}
                          onChange={(e) => handleInputChange("username", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-gray-300">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={editData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-gray-300">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        value={editData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white">{profileData.name}</h1>
                      <p className="text-gray-400">@{profileData.username}</p>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{profileData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {profileData.joinDate}</span>
                      </div>
                    </div>
                    <p className="text-gray-300">{profileData.bio}</p>
                    <p className="text-gray-400">📍 {profileData.location}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.gamesPlayed}</div>
              <div className="text-sm text-gray-400">Games Played</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.gamesWon}</div>
              <div className="text-sm text-gray-400">Games Won</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.totalScore.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Score</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.averageScore}</div>
              <div className="text-sm text-gray-400">Avg Score</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{stats.winRate}%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </CardContent>
          </Card>

        </div>

        {/* Recent Activity */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div>
                  <div className="text-white font-medium">Completed "Science Quiz #42"</div>
                  <div className="text-gray-400 text-sm">Scored 180 points • 2 hours ago</div>
                </div>
              </div>
              <Badge className="bg-green-600 text-white">Won</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div>
                  <div className="text-white font-medium">Created "History Trivia"</div>
                  <div className="text-gray-400 text-sm">15 questions • 1 day ago</div>
                </div>
              </div>
              <Badge className="bg-blue-600 text-white">Created</Badge>
            </div> */}
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div>
                  <div className="text-white font-medium">Achieved Level 15</div>
                  <div className="text-gray-400 text-sm">Milestone reached • 3 days ago</div>
                </div>
              </div>
              <Badge className="bg-yellow-600 text-white">Achievement</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
