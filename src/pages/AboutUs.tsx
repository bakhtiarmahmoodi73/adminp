import React from "react";
import {
  BoxAbout,
  BoxContainer,
  CardAbout,
  CardAboutDetail,
  CircleAbout,
  TypographyAbout,
  TypographyAboutText,
  Typographysub,
  TypographyTitle,
} from "../components/styled/HompageStylee";
import ImageAbout from "../assets/images/About/3d-techny-project-management-teamwork-and-integration 1.svg?react";
import Line from "../assets/images/About/Line 32.svg?react";

const AboutUs: React.FC = () => {
  return (
    <BoxContainer>
      <CardAbout>
        <BoxAbout>
          <TypographyAbout>
            We Are Here To Make Your Transaction Much Easier
          </TypographyAbout>
          <TypographyAboutText>
            At Pmusdt.Com, We Believe That Everyone Should Have The Freedom To
            Earn, Hold, Spend, Share And Give Their Money - No Matter Who You
            Are Or Where You Come From.
          </TypographyAboutText>
        </BoxAbout>
        <CircleAbout>
          <ImageAbout />
        </CircleAbout>
      </CardAbout>
      
      <Line width={1} height={834} style={{ marginLeft: "570px" }} />

      <CardAboutDetail sx={{ top: "680px", left: "242px" }}>
        <TypographyTitle>Our Mission</TypographyTitle>
        <Typographysub>
          Today, Pmusdt.Com Is The World’s Leading Blockchain Ecosystem, With A
          Product Suite That Includes The Largest Digital Asset Exchange. Our
          Mission Is To Be The Infrastructure Provider For Crypto In Tomorrow’s
          World.
        </Typographysub>
      </CardAboutDetail>

      <CardAboutDetail sx={{ top: "1053px", left: "242px" }}>
        <TypographyTitle>Our Vision</TypographyTitle>
        <Typographysub>
          Our Vision Is To Increase The Freedom Of Money Globally. We Believe
          That By Spreading This Freedom, We Can Significantly Improve Lives
          Around The World.{" "}
        </Typographysub>
      </CardAboutDetail>

      <CardAboutDetail sx={{ top: "1426px", left: "242px" }}>
        <TypographyTitle>Our Values</TypographyTitle>
        <Typographysub>
          Pmusdt.Com Core Values Guide Our Behavior, Decisions, And Action,
          Enabling Unified Collaboration Across Our Diverse, International
          Teams.
        </Typographysub>
      </CardAboutDetail>
    </BoxContainer>
  );
};

export default AboutUs;