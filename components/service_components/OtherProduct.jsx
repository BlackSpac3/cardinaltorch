import React from "react";
import { assets } from "../../assets/assets";
const OtherProduct = () => {
  return (
    <section className="flex flex-col gap-[5vw] px-[10vw] ">
      <div className="flex flex-col w-full gap-10 items-start">
        <div className="flex flex-col gap-2 w-[60%]">
          <h2 className="section-big-text">Cashews</h2>
          <p className="body-text">
            Our current Capacity is 200MT Raw Cashew Nuts (RCN), and 50MT
            Semi-processed cashews, monthly. Our table-ready brands will be
            launched in Q4 2023. Cashew nut kernels are mainly used for the
            snack market as a roasted and salted snack.
          </p>
        </div>
        <img
          src={assets.cashew_img}
          alt=""
          className="w-[70%] aspect-video object-cover object-center rounded-xl place-self-end shadow-[0_20px_40px_0_rgba(0,0,0,.1)]"
        />
      </div>
      <hr />
      <div className="flex flex-col w-full gap-10 items-start">
        <div className="flex flex-col gap-2 w-[60%] place-self-end text-right">
          <h2 className="section-big-text">Cocoa</h2>
          <p className="body-text">
            Cardinal Torch is strong player in global Cocoa trade, shipping up
            to 200MT of cocoa products to overseas buyers monthly. One way we
            participate sustainably is by leveraging ethical local partnerships
            that ensure an equitable chance of prosperity for all. We’re
            socially responsible to our buyers, communities and team.
          </p>
        </div>
        <img
          src={assets.cocoa_img}
          alt=""
          className="w-[70%] aspect-video object-cover object-center rounded-xl shadow-[0_20px_40px_0_rgba(0,0,0,.1)]"
        />
      </div>
      <hr />
      <div className="flex flex-col w-full gap-10 items-start">
        <div className="flex flex-col gap-2 w-[60%]">
          <h2 className="section-big-text">Coffee</h2>
          <p className="body-text">
            Coffee is such an important dietary staple across the world that it
            has spawned a staggeringly large economy of its own. Coffee
            roasters, packers, growers, marketers and coffee equipment
            manufacturers depend on the commodity as do dairy producers and
            restaurant operators.
          </p>
        </div>
        <img
          src={assets.coffee_img}
          alt=""
          className="w-[70%] aspect-video object-cover object-center rounded-xl place-self-end shadow-[0_20px_40px_0_rgba(0,0,0,.1)]"
        />
      </div>
      <hr />
      <div className="flex flex-col w-full gap-10 items-start">
        <div className="flex flex-col gap-2 w-[60%] place-self-end text-right">
          <h2 className="section-big-text">Soya</h2>
          <p className="body-text">
            Soybeans are an edible legume native to Asia and are an important
            source of protein in many modern diets. Chinese farmers first
            domesticated soybeans around 1100 BC. Since that time, cultures
            around the world have cultivated the crop as a food source.
          </p>
        </div>
        <img
          src={assets.soya_img}
          alt=""
          className="w-[70%] aspect-video object-cover object-center rounded-xl shadow-[0_20px_40px_0_rgba(0,0,0,.1)]"
        />
      </div>
    </section>
  );
};

export default OtherProduct;
