import Link from "next/link";

export default async function Hero() {
  return (
    <div>
      <div className="max-h-screen w-full relative">
        {/* Crimson Depth */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 100%, #000000 40%, #2b0707 100%)",
          }}
        />

        <section className="relative flex flex-col items-center justify-center text-center py-28 px-6 text-white">
          {/* Headline */}
          <h1 className="text-2xl md:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight ">
             <span style={{ color: "#CF0000" }}>Dhamrai</span> Alumni Network –
            <br className="hidden md:block" />
           <span style={{ color: "#DECD02" }}> Connection. Collaboration. Growth.</span> 
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg md:text-xl max-w-2xl"> অন্তরে
           <span style={{ color: "#CF0000" }}>  ধামরাই</span> –পরিবর্তনের পথচলা। <br/>
           অ্যালামনাই নেটওয়ার্ক –  <span style={{ color: "#DECD02" }}>  সংযোগ, সহযোগিতা, সমৃদ্ধি। </span> 
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center px-8 py-4 font-medium rounded-xl border border-input hover:bg-accent hover:text-accent-foreground transition"
            >
              Explore Dhamrai
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
