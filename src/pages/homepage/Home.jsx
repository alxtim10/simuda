import Activities from "../../components/homepage/activities/Activities";
import Hero from "../../components/homepage/hero/Hero";
import Perks from "../../components/homepage/perks/Perks";

const Home = () => {
  return (
    <section>
      <div className="mt-16">
        <Hero />
      </div>
      <div className="mt-10">
        <Activities />
      </div>
      <div className="mt-10">
        <Perks />
      </div>
    </section>
  );
};

export default Home;
