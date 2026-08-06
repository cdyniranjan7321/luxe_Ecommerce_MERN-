// pages/About.jsx
export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading mb-4">About Our Store</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're passionate about bringing you the best fashion at affordable prices.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-4">👕</div>
          <h3 className="font-semibold mb-2">Quality Materials</h3>
          <p className="text-gray-600">We source only the finest fabrics for our clothing.</p>
        </div>
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-4">🌱</div>
          <h3 className="font-semibold mb-2">Sustainable Fashion</h3>
          <p className="text-gray-600">Committed to eco-friendly and ethical practices.</p>
        </div>
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-4">❤️</div>
          <h3 className="font-semibold mb-2">Customer First</h3>
          <p className="text-gray-600">Your satisfaction is our top priority.</p>
        </div>
      </div>
    </div>
  );
}