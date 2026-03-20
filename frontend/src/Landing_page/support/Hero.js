import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      {/* Top bar */}
      <div className="container" id="supportWrapper">
        <h4>Support Portal</h4>
        <a href="">Track Tickets</a>
      </div>

      {/* Main content */}
      <div className="container">
        <div className="row" id="supportContent">
          {/* Left */}
          <div className="col-md-6">
            <h1>
              Search for an answer or browse help topics to create a ticket
            </h1>

            <input
              type="text"
              placeholder="Eg. how do I activate F&O, why is my order getting rejected"
            />

            <div className="quick-links">
              <a href="">Track account opening</a>
              <a href="">Track segment activation</a>
              <a href="">Intraday margins</a>
              <a href="">Kite user manual</a>
            </div>
          </div>

          {/* Right */}
          <div className="col-md-5 offset-md-1">
            <h2>Featured</h2>
            <ol>
              <li>
                <a href="">
                  Current Takeovers and Delisting – January 2024
                </a>
              </li>
              <li>
                <a href="">
                  Latest Intraday leverages – MIS & CO
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
