import ListCategory from "./ListCategory";

const Home = () => {
  return (
    <>
      <section id="home" className="hero">
        <h1>Bienvenue sur NutriLife</h1>
        <p>Votre guide pour une alimentation saine et équilibrée</p>
      </section>
      <section>
        <ListCategory />
      </section>
    </>
  );
};
export default Home;
