import { useState } from 'react';
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
import { Box } from '@mui/material';

function Faq() {
  // آرایه برای ذخیره وضعیت collapse هر کارد (همه بسته)
  const [collapsedStates, setCollapsedStates] = useState<boolean[]>(
    Array(8).fill(true) // 8 کارد
  );

  // تابع برای toggle کردن یک کارد خاص
  const toggleCollapse = (index: number) => {
    setCollapsedStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  // متن سوال و جواب
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
          <SearchIcon
            style={{
              position: "absolute",
              top: "28px",
              left: "26px",
              right: "13px",
            }}
          />
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

      {/* رندر 8 کارد با استفاده از map */}
      {collapsedStates.map((isCollapsed: boolean, index: number) => (
        <CardFaqCollapse
          key={index}
          sx={{
            height: isCollapsed ? "103px" : "242px",
            overflow: "hidden",
            marginTop: index === 0 ? "54px" : "26px", // اولین کارد 54px، بقیه 26px
          }}
        >
          <Box
            onClick={() => toggleCollapse(index)}
            sx={{ cursor: "pointer" }}
          >
            <CardFlexFaq>
              <Polyg style={{ marginTop: "5px" }} />
              <TypographyFaqCollapse>
                {faqContent.title}
              </TypographyFaqCollapse>
              <Arrow
                style={{
                  marginTop: "5px",
                  marginLeft: "55px",
                  transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)",
                  transition: "transform 0.3s ease"
                }}
              />
            </CardFlexFaq>
          </Box>

          {!isCollapsed && (
            <TypographyFaqCollapseSub>
              {faqContent.content}
            </TypographyFaqCollapseSub>
          )}
        </CardFaqCollapse>
      ))}
    </BoxContainer>
  );
}

export default Faq;