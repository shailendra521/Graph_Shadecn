import { Button } from "@/components/ui/button"
import { AnalyticsChart } from "@/components/AnalyticsChart"

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">
            Business Dashboard
          </h1>
          <div className="w-full aspect-video max-h-[800px]">
            <AnalyticsChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App