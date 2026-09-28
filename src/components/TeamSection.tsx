type Member = { name: string; photo: string };

const TEAM: Member[] = [
  { name: "Manny", photo: "/assets/about-us/Manny.png" },
  { name: "Imran", photo: "/assets/about-us/Imran.jpg" },
  { name: "Mihir", photo: "/assets/about-us/Mihir.jpg" },
];

export default function TeamSection() {
  return (
    <section id="about">
      <div className="section-inner">
        <div className="section-head reveal">
          <h2>Who We Are</h2>
          <div className="rule"></div>
          <p>The team behind Wonderloop Studios.</p>
        </div>

        <div className="team-grid">
          {TEAM.map((m) => (
            <figure key={m.name} className="team-card reveal">
              <div className="photo-wrap">
                <img src={m.photo} alt={m.name} loading="lazy" />
              </div>
              <figcaption>{m.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
