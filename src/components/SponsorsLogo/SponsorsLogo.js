import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../../styles/custom.css";

export default class SponsorsLogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfImages: []
    };
  }

  importAll(r) {
    return r.keys().map(r);
  }

  UNSAFE_componentWillMount() {
    this.setState({
      listOfImages: this.importAll(
        require.context("../../upload/", false, /\.(png|jpe?g|svg)$/)
      )
    });
  }

  /*componentDidMount() {
    setTimeout(() => this.showSlides(), 5000);
  }

  componentDidUpdate() {
    this.showSlides();
  }

  showSlides() {
    var i;
    var slideIndex = 0;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    //setTimeout(showSlides(), (5 * 1000)); // Change image every 5 seconds
  }*/

  render() {
    return (
      <div className="slideshowmain">
        <div className="sponsertitle">
          <h1>Our Sponsers</h1>
        </div>
        <Carousel
          className="slideshow-container"
          interval={5000}
          indicators={false}
          controls={false}
          fade={true}
        >
          {this.state.listOfImages.map((image, index) => (
            <Carousel.Item className="mySlides" key={index}>
              <img
                className="sliderimg"
                src={image}
                alt="sponsers logo"
                align="middle"
              ></img>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}
