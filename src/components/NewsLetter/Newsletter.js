export default function Newsletter() {
  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="text-xl md:text-2xl font-bold text-black text-center md:text-left">
          Dive deeper with us - Subscribe to our <br/> newsletter for more.
        </h2>
        <div className="flex w-full md:w-auto items-center gap-2">
          <input
            type="email"
            placeholder="abc@example.com"
            className="flex-1 md:w-72 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            className="bg-black text-white font-semibold hover:bg-white hover:text-black border border-transparent hover:border-1 hover:border-black px-6 py-2 rounded-md"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
