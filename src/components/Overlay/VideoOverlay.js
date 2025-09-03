
export default function VideoOverlay() {
  return (
   
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="Nike - Running Isn't Just Running  Spec Ad - Adam Saunders (1080p, h264).mp4" // replace with your video file path
        autoPlay
        muted
        loop
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Transcend the<br/>
            limits of techchnology
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mt-2">
          From AI-powered finance solutions to innovative cloud services.
        </p>

        {/* Tabs / Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="px-6 py-2 rounded-2xl bg-white text-black font-semibold shadow-lg hover:bg-gray-200 transition">
            Tab One
          </button>
          <button className="px-6 py-2 rounded-2xl bg-transparent border border-white text-white font-semibold shadow-lg hover:bg-white hover:text-black transition">
            Tab Two
          </button>
        </div>
      </div>
    </div>
  );
}
