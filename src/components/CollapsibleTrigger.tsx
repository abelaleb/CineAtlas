import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { useSidebar } from "./ui/sidebar"

export default function CollapsibleTrigger() {
    const { state, toggleSidebar } = useSidebar()
  
    return (
      <Button
        variant="ghost"
        size="icon"
        // className="absolute right-2 top-4"
        onClick={toggleSidebar}
      >
        {state === "expanded" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>
    )
  }