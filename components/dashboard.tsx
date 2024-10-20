"use client";

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { 
  LayoutDashboard, 
  Upload, 
  CheckCircle, 
  Clock, 
  User, 
  LogOut,
  Menu,
  MoreVertical,
  FileText,
  Image as ImageIcon,
  Film,
  Music,
  Eye,
  Download,
  ExternalLink,
  X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const activityData = [
  { name: 'Mon', uploads: 4, verifications: 2 },
  { name: 'Tue', uploads: 3, verifications: 5 },
  { name: 'Wed', uploads: 2, verifications: 3 },
  { name: 'Thu', uploads: 6, verifications: 4 },
  { name: 'Fri', uploads: 8, verifications: 7 },
  { name: 'Sat', uploads: 9, verifications: 6 },
  { name: 'Sun', uploads: 6, verifications: 8 },
]

const recentFiles = [
  { id: 1, name: 'contract.pdf', type: 'document', uploadDate: '2023-05-01', hash: '0x1234...5678', transactionId: '0xabcd...ef01', status: 'Verified' },
  { id: 2, name: 'image.jpg', type: 'image', uploadDate: '2023-05-02', hash: '0x2345...6789', transactionId: '0xbcde...f012', status: 'Pending' },
  { id: 3, name: 'video.mp4', type: 'video', uploadDate: '2023-05-03', hash: '0x3456...7890', transactionId: '0xcdef...0123', status: 'Verified' },
  { id: 4, name: 'audio.mp3', type: 'audio', uploadDate: '2023-05-04', hash: '0x4567...8901', transactionId: '0xdefg...1234', status: 'Verified' },
]

function Toast({ message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 flex items-center justify-between"
    >
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{message}</span>
      <Button variant="ghost" size="sm" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}

export default function Dashboard() {
  const [activePage, setActivePage] = useState('dashboard')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [toast, setToast] = useState(null)

  const showToast = (message) => {
    setToast(message)
  }

  const hideToast = () => {
    setToast(null)
  }

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Simulating file upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          showToast("File Uploaded Successfully")
        }
      }, 500)
    }
  }

  const handleVerifyFile = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Simulating file verification
      setTimeout(() => {
        showToast("File Verified Successfully")
      }, 2000)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for larger screens */}
      <aside className="hidden lg:block w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold">FileChain</h2>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <nav className="space-y-2 p-4">
            {[
              { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
              { icon: Upload, label: 'Upload File', id: 'upload' },
              { icon: CheckCircle, label: 'Verify File', id: 'verify' },
              { icon: Clock, label: 'History', id: 'history' },
              { icon: User, label: 'Profile', id: 'profile' },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activePage === item.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActivePage(item.id)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
            <Button variant="ghost" className="w-full justify-start" onClick={() => console.log('Logout')}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </nav>
        </ScrollArea>
      </aside>

      {/* Existing Sheet component for mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="text-2xl font-bold">FileChain</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full">
            <nav className="space-y-2 p-4">
              {[
                { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
                { icon: Upload, label: 'Upload File', id: 'upload' },
                { icon: CheckCircle, label: 'Verify File', id: 'verify' },
                { icon: Clock, label: 'History', id: 'history' },
                { icon: User, label: 'Profile', id: 'profile' },
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={activePage === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActivePage(item.id)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
              <Button variant="ghost" className="w-full justify-start" onClick={() => console.log('Logout')}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
            </h1>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activePage === 'dashboard' && <DashboardContent activityData={activityData} recentFiles={recentFiles} />}
              {activePage === 'upload' && <UploadContent handleFileUpload={handleFileUpload} uploadProgress={uploadProgress} />}
              {activePage === 'verify' && <VerifyContent handleVerifyFile={handleVerifyFile} />}
              {activePage === 'history' && <HistoryContent recentFiles={recentFiles} />}
              {activePage === 'profile' && <ProfileContent />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      
      {/* Custom Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={hideToast} />}
      </AnimatePresence>
    </div>
  )
}

function DashboardContent({ activityData, recentFiles }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, User!</CardTitle>
          <CardDescription>Here's an overview of your recent activity.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Quick Upload
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            <span>Total Files Uploaded: 25</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>Files Verified: 20</span>
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="uploads" fill="#8884d8" name="Uploads" />
              <Bar dataKey="verifications" fill="#82ca9d" name="Verifications" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Files</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {file.type === 'document' && <FileText className="mr-2 h-4 w-4" />}
                      {file.type === 'image' && <ImageIcon className="mr-2 h-4 w-4" />}
                      {file.type === 'video' && <Film className="mr-2 h-4 w-4" />}
                      {file.type === 'audio' && <Music className="mr-2 h-4 w-4" />}
                      {file.name}
                    </div>
                  </TableCell>
                  <TableCell>{file.uploadDate}</TableCell>
                  <TableCell>{file.status}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          <span>Verify</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function UploadContent({ handleFileUpload, uploadProgress }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload File</CardTitle>
        <CardDescription>Upload a file to hash and store on the blockchain.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center w-full">
          <Label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <Input id="dropzone-file" type="file" className="hidden" onChange={handleFileUpload} />
          </Label>
        </div>
        {uploadProgress > 0 && (
          <div className="mt-4">
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}
      </CardContent>
      {uploadProgress === 100 && (
        <CardFooter>
          <div className="w-full space-y-2">
            <div className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              <span>Hash: 0x1234...5678</span>
            </div>
            <div className="flex items-center">
              <ExternalLink className="mr-2 h-4 w-4" />
              <span>Transaction ID: 0xabcd...ef01</span>
            </div>
            <Button className="w-full">
              <Eye className="mr-2 h-4 w-4" />
              View Transaction
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

function VerifyContent({ handleVerifyFile }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify File</CardTitle>
        <CardDescription>Upload a file to verify its integrity against the blockchain.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center w-full">
          <Label
            htmlFor="verify-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <CheckCircle className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Upload the file you want to verify</p>
            </div>
            <Input id="verify-file" type="file" className="hidden" onChange={handleVerifyFile} />
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}

function HistoryContent({ recentFiles }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>File History</CardTitle>
        <CardDescription>View and manage your uploaded and verified files.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Hash</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentFiles.map((file) => (
              <TableRow key={file.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {file.type === 'document' && <FileText className="mr-2 h-4 w-4" />}
                    {file.type === 'image' && <ImageIcon className="mr-2 h-4 w-4" />}
                    {file.type === 'video' && <Film className="mr-2 h-4 w-4" />}
                    {file.type === 'audio' && <Music className="mr-2 h-4 w-4" />}
                    {file.name}
                  </div>
                </TableCell>
                <TableCell>{file.uploadDate}</TableCell>
                <TableCell>{file.hash}</TableCell>
                <TableCell>{file.transactionId}</TableCell>
                <TableCell>{file.status}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        <span>Verify</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function ProfileContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Manage your account settings and view your stats.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Account Details</TabsTrigger>
            <TabsTrigger value="stats">User Stats</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
              <Button>
                <User className="mr-2 h-4 w-4" />
                Update Profile
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="stats">
            <div className="space-y-2">
              <div className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                <span>Total Files Uploaded: 25</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>Files Verified: 20</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>Account Created: January 1, 2023</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
