import React, { useState, useEffect } from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsAltH,
  faMinus,
  faPlus,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import numeral from "numeral";

const ProjectCard = ({
  contractSharesAvailable,
  contractNAV,
  placeOrderHandler,
  investors,
  contractAddress,
  title,
  img,
  children,
}) => {
  const [sliderValue, setSliderValue] = useState(1);
  const maxInvestAmount =
    Math.floor((contractSharesAvailable * contractNAV) / 50) * 50;
  const maxSlider = maxInvestAmount / 50;
  return (
    <div class="card">
      <div class="card-image">
        <figure class="image is-3by1">
          <img src={img} alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content">
        <div className="columns">
          <div className="column">
            <div className="is-flex is-flex-direction-column">
              <div className="has-text-centered">
                <strong>5-9%</strong>
              </div>
              <div className="has-text-centered is-size-7">Total returns</div>
            </div>
          </div>
          <div className="column">
            <div className="is-flex is-flex-direction-column">
              <div className="has-text-centered">
                <strong>{numeral(investors).format("0,0")}</strong>
              </div>
              <div className="has-text-centered is-size-7">Investors</div>
            </div>
          </div>
          <div className="column">
            <div className="is-flex is-flex-direction-column">
              <div className="has-text-centered">
                <strong>{numeral(contractNAV).format("0,0.00000")}</strong>
              </div>
              <div className="has-text-centered is-size-7">NAV</div>
            </div>
          </div>
        </div>

        <div className="is-size-3 has-text-centered">
          <strong>{title}</strong>
        </div>

        <div class="content">
          <div className="has-text-centered">{children}</div>

          <div className="mt-4 mb-3">
            <strong>How much would you like to invest?</strong>
            <div className="columns is-centered mb-0">
              <div className="is-flex is-flex-direction-column mt-2">
                <div className="is-flex is-flex-direction-row">
                  <div className="m-3">
                    <button
                      className="button is-info is-light is-size-7"
                      onClick={() => {
                        if (sliderValue > 1) {
                          setSliderValue(sliderValue - 1);
                        }
                      }}
                    >
                      <span class="icon is-size-7">
                        <FontAwesomeIcon icon={faMinus} />
                      </span>
                    </button>
                  </div>
                  <div className="has-text-centered is-size-5 m-3">
                    <strong>
                      EUR {numeral(sliderValue * 50).format("0,0")}
                    </strong>
                  </div>
                  <div className="m-3">
                    <button
                      className="button is-info is-light is-size-7"
                      onClick={() => {
                        if (sliderValue < maxSlider) {
                          setSliderValue(sliderValue + 1);
                        }
                      }}
                    >
                      <span class="icon is-size-7">
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Slider
              aria-label="slider-ex-1"
              min={1}
              max={maxSlider}
              defaultValue={sliderValue}
              onChange={(val) => setSliderValue(val)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6} bgColor="#4880c8" color="white">
                <FontAwesomeIcon icon={faArrowsAltH} />
              </SliderThumb>
            </Slider>
            <div className="is-flex is-flex-direction-row is-justify-content-space-between">
              <div className="is-size-7 has-text-left">EUR 50</div>
              <div className="is-size-7 has-text-right">
                EUR {numeral(maxInvestAmount).format("0,0")}
              </div>
            </div>
          </div>
        </div>

        <div className="is-flex is-flex-direction-row is-justify-content-space-between is-align-content-space-between">
          <div>
            <p className="">
              Shares:{" "}
              {numeral(Math.floor((sliderValue * 50) / contractNAV)).format(
                "0,0"
              )}{" "}
              x {numeral(contractNAV).format("0,0.00000")}
            </p>
            <p className="">
              Price: TMY{" "}
              <strong>
                {numeral(
                  Math.floor((sliderValue * 50) / contractNAV) * contractNAV
                ).format("0,0.00")}
              </strong>
            </p>
          </div>

          <div className="is-flex is-justify-content-center is-align-items-center">
            <div className="is-right">
              <button
                className="button is-primary is-right"
                onClick={() => {
                  placeOrderHandler(sliderValue);
                }}
              >
                Place order
              </button>
            </div>
          </div>
        </div>
        <p className="is-size-7 mt-3">
          <strong>Contract address: </strong>
          <a
            target="_blank"
            href={`https://mumbai.polygonscan.com/address/${contractAddress}`}
            className="has-text-link"
          >
            {contractAddress}
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              size="xs"
              transform="shrink-3"
            />{" "}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
