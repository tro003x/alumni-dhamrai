import Hero from "@/components/modules/Home/Hero";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <p className="text-left px-15 py-10 my-5 text-3xl"> <span style={{ color: "#CF0000", fontWeight: "bold" }}>Dhamrai</span> is a culturally significant upazila (sub-district) located roughly 40 kilometers northwest of Dhaka, Bangladesh. Best known as the ultimate hub for ancient metal craftsmanship and centuries-old religious festivals, it offers a serene, historical contrast to the chaotic energy of the capital city.</p>
      <p className="text-left px-15 py-10 my-5 text-3xl"><span style={{ color: "#CF0000", fontWeight: "bold" }}>Dhamrai</span> is renowned for its traditional metalworking industry, particularly the crafting of brass and bronze utensils, which has been a hallmark of the region for generations. The skilled artisans of Dhamrai create intricate designs that are highly sought after both locally and internationally.</p>
      <p className="text-left px-15 py-10 my-5 text-3xl">The upazila is also famous for its vibrant cultural heritage, including the annual Dhamrai <span style={{ color: "#003EC9", fontWeight: "bold" }}>Jagannath Rath Yatra</span>, a grand chariot festival that attracts thousands of devotees and tourists alike. This event showcases the rich traditions and religious fervor of the local community.</p>
      <p className="text-left px-15 py-10 my-5 text-3xl">In addition to its cultural significance, Dhamrai offers picturesque landscapes with lush greenery, rivers, and traditional villages, making it a charming destination for those interested in exploring the authentic rural life of Bangladesh.</p>
    </div>
  );
}
