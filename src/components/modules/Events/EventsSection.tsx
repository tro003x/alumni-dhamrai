export default function EventsSection() {
  const events = [
    {
      id: 1,
      title: "Reunion Gathering 2026",
      date: "June 15, 2026",
      description: "Join us for an exciting reunion with fellow alumni.",
    },
    {
      id: 2,
      title: "Alumni Career Talk",
      date: "July 10, 2026",
      description: "Experts share insights on career advancement and opportunities.",
    },
    {
      id: 3,
      title: "Cultural Festival",
      date: "August 5, 2026",
      description: "Celebrate our rich heritage and traditions together.",
    },
  ];

  return (
    <section className="pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center">Events</h1>
        
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{event.date}</p>
              <p className="text-gray-700">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
