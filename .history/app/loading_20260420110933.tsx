

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-[9999]">
      <div className="w-12 h-12 border-4 border-white/30 border-t-[#0a9688] rounded-full animate-spin" />
    </div>
  )
}