import React, { useState } from 'react';
import {
  BoxButtonFaq,
  BoxContainer,
  BoxSearchFaq,
  ButtonFaq,
  ButtonFaqInfo,
  CardFaq,
  CardFaqCollapse,
  CardFlexFaq,
  TextFieldFaq,
  TypographyFaq,
  TypographyFaqCollapse,
  TypographyFaqCollapseSub,
} from "../components/styled/HompageStylee";
import SearchIcon from "../assets/images/Faq/Frame (14).svg?react";
import Polyg from "../assets/images/Faq/Polygon 1.svg?react";
import Arrow from "../assets/images/Faq/Frame (15).svg?react";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

const Faq: React.FC = () => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange = (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqContent = {
    title: "How To Complete Identity Verification For A Personal Account On The Pmusdt Website?",
    content: "You Can Access The Identity Verification From [Account] - [Identification], Or Click [Verify] / [Get verified] From The Homepage Banners. You Can Check Your Current Verification Level On The Page, Which Determines The Trading Limit Of Your Account. To Increase Your Limit, Please Complete The Respective Identity Verification Level."
  };

  return (
    <BoxContainer sx={{ marginBottom: "145px" }}>
      <CardFaq>
        <TypographyFaq>Help Center</TypographyFaq>
        <BoxSearchFaq>
          <TextFieldFaq placeholder="Find Your Desired Question" />
          <SearchIcon style={{ width: "24px", height: "24px", position: "absolute", top: "28px", left: "26px" }} />
          <ButtonFaq>Search</ButtonFaq>
        </BoxSearchFaq>
        <BoxButtonFaq>
          <ButtonFaqInfo> # Verify Account</ButtonFaqInfo>
          <ButtonFaqInfo> # Change Email</ButtonFaqInfo>
          <ButtonFaqInfo> # Forget Password</ButtonFaqInfo>
          <ButtonFaqInfo> # Payment Problems</ButtonFaqInfo>
          <ButtonFaqInfo> # How To Trade</ButtonFaqInfo>
        </BoxButtonFaq>
      </CardFaq>

      {Array(8).fill(null).map((_, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={handleChange(index)}
          component={CardFaqCollapse} 
          disableGutters
          elevation={0}
          sx={{
            marginTop: index === 0 ? "54px" : "26px !important",
            height: expanded === index ? "242px" : "103px", 
            minHeight: "103px",
            maxHeight: expanded === index ? "500px" : "103px", 
            transition: "all 0.3s ease-in-out",
            display: "flex",
            flexDirection: "column",
            '&:before': { display: 'none' }, 
            backgroundColor: "#242C39 !important",
            border: "1px solid #2E3E59 !important",
            borderRadius: "30px !important",
            '&:first-of-type': { borderRadius: "30px !important" },
            '&:last-of-type': { borderRadius: "30px !important" },
            '&.Mui-expanded': { borderRadius: "30px !important" },
          }}
        >
          <AccordionSummary
            sx={{
              padding: 0,
              '& .MuiAccordionSummary-content': { margin: 0 },
              '&.Mui-expanded': { minHeight: 'unset' } 
            }}
          >
            <CardFlexFaq style={{ width: '100%', border: 'none', marginTop: "36px" }}>
              <Polyg style={{marginTop:"5px"}} />
              <TypographyFaqCollapse>
                {faqContent.title}
              </TypographyFaqCollapse>
              <Arrow
                style={{
                  marginTop: "5px",
                  marginLeft: "55px",
                  transform: expanded === index ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease"
                }}
              />
            </CardFlexFaq>
          </AccordionSummary>

          <AccordionDetails sx={{ padding: 0 }}>
            <TypographyFaqCollapseSub>
              {faqContent.content}
            </TypographyFaqCollapseSub>
          </AccordionDetails>
        </Accordion>
      ))}
    </BoxContainer>
  );
}

export default Faq;