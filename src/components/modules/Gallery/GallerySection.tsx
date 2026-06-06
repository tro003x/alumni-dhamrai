export default function GallerySection() {
  const images = [
    { id: 1, title: "Event 1" },
    { id: 2, title: "Event 2" },
    { id: 3, title: "Event 3" },
    { id: 4, title: "Event 4" },
    { id: 5, title: "Event 5" },
    { id: 6, title: "Event 6" },
  ];

  return (
    <section className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center">Gallery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.id} className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-700 font-medium">{image.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
