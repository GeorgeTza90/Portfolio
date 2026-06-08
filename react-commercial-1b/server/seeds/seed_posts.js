exports.seed = async function(knex) {
  await knex('posts').del();
  await knex('posts').insert([
    { id: 1, label: `Welcome to "Titan Haven" – The First Luxury Hotel on Saturn's Moon!`, 
      text: `<p >
                            Imagine waking up to the mesmerizing golden skies of Titan, Saturn’s largest and most mysterious moon. At Titan Haven, the first-ever luxury space hotel, you can now vacation beyond Earth in style!<br /><br />
                            🏨 Why Choose Titan Haven?
                        </p>
                        <ul className={styles.ul}>
                            ✅ Sky Domes with Panoramic Views – Watch Saturn rise above the methane seas from your private suite.<br />
                            ✅ Zero-G Relaxation Pools – Float effortlessly in our anti-gravity spa experience.<br />
                            ✅ Neon-lit Canal Cruises – Sail across Titan’s liquid methane lakes in a heated observation pod.<br />
                            ✅ Gastronomic Wonders – Savor fusion space cuisine made with ingredients grown in off-world biodomes.<br />
                            ✅ Exclusive Spacewalk Tours – Take a breathtaking stroll in low gravity above Titan’s icy dunes.<br />
                        </ul>
                        <p>
                            🌠 Book Your Interplanetary Escape Today!<br />
                            Be among the first humans to stay on Titan! 🌎➡️🌕➡️🪐<br />
                            Limited spots available for VIP space tourists.<br /><br />

                            💫 Are you ready for the adventure of a lifetime?<br />
                            📩 Reserve your cosmic suite now! 🚀✨<br />
                        </p>`, 
      imgLink: '/posts/post_1.jpg' },
      { id: 2, label: `🌊 Welcome to “AquaSpire” – The First Underwater City on Enceladus! 🏙️`, 
        text: `<p>
                          🚀 A New Frontier for Luxury & Adventure!
                          Beneath the icy crust of Enceladus, Saturn’s most breathtaking moon, lies a secret world of geothermal wonders and
                          endless oceans. Now, you can dive into the future at AquaSpire, the first-ever underwater city, built within the
                          warm, alien seas of this frozen paradise!<br /><br />
                          🌌 Why Visit AquaSpire?
                      </p>
                      <ul className={styles.ul}>
                          🌊 Glass-Domed Residences – Sleep with a panoramic view of the glowing bioluminescent life in Enceladus’
                          oceans.<br />
                          🔥 Thermal Cavern Spas – Relax in natural hot springs formed by the moon’s subsurface geysers.<br />
                          🚀 Deep-Sea Excursions – Explore the uncharted abyss in cutting-edge exosuits and submarines.<br />
                          🍽️ Cosmic Dining Experience – Enjoy a gourmet meal while watching Enceladus' iconic ice plumes rise into
                          space.<br />
                          💫 Exclusive Stargazer Lounges – Watch Saturn’s rings shimmer above the icy surface from our floating observation
                          deck.<br />
                      </ul>
                      <p>
                          🌠 Book Your Journey to the Depths of the Cosmos!
                          Seats on the first wave of interstellar tourists are limited! Be among the pioneers of space tourism—a vacation
                          beyond
                          imagination! 🌎➡️🌕➡️🪐

                          📩 Reserve your spot at AquaSpire today! 🚀✨
                </p>`, 
        imgLink: '/posts/post_2.jpg' },
  ]);
};
