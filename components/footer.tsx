export function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 border-t border-border/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
          <div className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} VertexCore AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
