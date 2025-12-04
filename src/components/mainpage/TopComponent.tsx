import { Container } from "@mui/material"


function TopComponent() {
  return (
    <Container  maxWidth={false}  disableGutters
      sx={{
        maxWidth: "1140px", 
        marginX: "auto",
        marginTop:"99px",
        height:"99px",
        backgroundColor:"#2A3342",
        borderRadius:"30px",
        borderColor:"#596B89"   
      }}>
       
    </Container>
  )
}

export default TopComponent