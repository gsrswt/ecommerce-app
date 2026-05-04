export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 font-sans">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center py-32 px-16 text-center gap-12">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-5xl font-bold text-gray-900">
            Welcome to TechStore
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl">
            Discover our collection of premium tech accessories and gadgets. Browse our products and start shopping today!
          </p>
        </div>

        <a
          href="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
        >
          Shop Now
        </a>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Wide Selection</h3>
            <p className="text-gray-600">Browse a curated collection of tech products</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Prices</h3>
            <p className="text-gray-600">Competitive pricing on all products</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Checkout</h3>
            <p className="text-gray-600">Easy and secure checkout process</p>
          </div>
        </div>
      </main>
    </div>
  );
}
