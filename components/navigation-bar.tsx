import { Phone, User, Settings } from "lucide-react"

export default function NavigationBar() {
  return (
    <div className="h-16 border-t flex items-center justify-between px-6">
      <div className="relative">
        <Phone className="w-6 h-6 text-gray-500" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          2
        </div>
      </div>

      <User className="w-6 h-6 text-gray-500" />

      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>
          ))}
        </div>
      </div>

      <Settings className="w-6 h-6 text-gray-500" />

      <div className="w-2 h-2 rounded-full bg-green-500"></div>
    </div>
  )
}

