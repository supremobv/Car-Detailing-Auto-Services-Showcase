export default function Credits() {
  return (
    <main className="credits">
      <a href="/">← BACK TO REFINE</a>
      <h1>
        THE IMAGERY.
        <br />
        <em>THE CONTEXT.</em>
      </h1>
      <p>
        REFINE is a fictional auto studio showcase. Service packages, rates,
        durations, and processes are illustrative. No actual shop location,
        qualification, completed job, product endorsement, coating duration, or
        warranty is claimed.
      </p>
      <p>
        Gallery and comparison images are stock photos of different vehicles,
        interiors, and processes. They are not matched before-and-after
        photographs or evidence of a REFINE result. Replace the comparisons with
        matched photos of the same vehicle when adapting this site for a real
        shop.
      </p>
      <ul>
        {[
          ["14380635", "Maheshwar Reddy", "black-porsche-on-road"],
          [
            "28376092",
            "Critical Smith",
            "sleek-black-porsche-boxster-in-showroom-lighting",
          ],
          ["6873121", "Tima Miroshnichenko", "a-black-car-covered-with-soap"],
          ["5233259", "Khunkorn Laowisit", "a-person-polishing-the-black-car"],
          [
            "34404465",
            "Kostiantyn Zavhorodnii",
            "luxury-car-interior-with-black-leather-seats",
          ],
          ["31390691", "Bulat843", "man-cleaning-car-interior-with-precision"],
          ["6026083", "Orhun Rüzgar ÖZ", "person-waxing-a-car"],
          [
            "35149468",
            "Melih Can",
            "auto-detailing-with-power-polisher-in-workshop",
          ],
          ["6526349", "El Jundi", "black-car-inside-the-carwash"],
        ].map(([id, name, slug]) => (
          <li key={id}>
            <a
              href={"https://www.pexels.com/photo/" + slug + "-" + id + "/"}
              target="_blank"
              rel="noreferrer"
            >
              Photo by {name} on Pexels ↗
            </a>
          </li>
        ))}
      </ul>
      <p>
        Photography is used under the{" "}
        <a
          href="https://www.pexels.com/license/"
          target="_blank"
          rel="noreferrer"
        >
          Pexels License
        </a>
        . Vehicle brands visible in the images are not sponsors or partners.
      </p>
      <p>
        Service inquiries are saved for studio review. No booking or payment is
        made; email delivery is not configured. Vehicle assessment, final scope,
        products, pricing, expected outcomes, and scheduling require
        confirmation.
      </p>
    </main>
  );
}
