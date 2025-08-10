const HeroMiddle = ({ icon, title, description }) => {
  return (
    <section className="rounded-xl flex text-black bg-zinc-500 mb-5 flex-col p-5 gap-1 justify-center">
      <figure className="flex items-center justify-center  h-10 w-10 rounded-xl bg-black">{icon}</figure>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p>{description}</p>
    </section>
  );
};

export default HeroMiddle;
