import React from "react";
import Head from "next/head";
import { ChakraProvider, Image, Container, VStack, Heading, Text, Box, Divider, Stack, AspectRatio,IconButton, Flex, Link } from '@chakra-ui/react';
import { AppProps } from "next/dist/shared/lib/router/router";


import theme from "../theme"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
        <>

      <Head>
        <title>Berkelio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta content="Ochoagram" name="author" />
        <meta content="Berkelio MX" name="copyright" />

        <meta property="og:image" content="https://berkelio.mx/images/image.jpg" key="image"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="fb:app_id" content="berkeliomx"/>
      </Head>
      
      <ChakraProvider theme={theme}>

        <Box marginBottom={ 10 }>
          <Container backgroundColor={ "white" } boxShadow="sm" marginTop="-4" maxWidth="container.xl" padding= { 4 } borderBottomRadius={ "2xl" }>
            
            <VStack marginBottom={ 10 }>
              
            <Container maxW='2000px' maxH='400px' mb='3rem' p='0' >
              <AspectRatio minH='300px' ratio={16 / 3}>
              <Box

                borderBottomRadius={ "xl" }
                as='video'
                autoPlay loop muted
                src='https://res.cloudinary.com/dnxxkvpiz/video/upload/v1646206789/Berkelio/cover_hzf9rb.mp4'
                width='100%'
                sx={{
                  aspectRatio: '16/9'
                }}
              />
              </AspectRatio>
            </Container>


              <VStack spacing='5' direction='column' marginTop= "10">
              <svg width="154" height="32" viewBox="0 0 154 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.7008 16.32C19.5808 15.68 23.2608 13.72 23.2608 9.56C23.2608 4.79999 18.5408 3.19999 12.3408 3.08H0.220764V3.31999C4.10076 3.31999 4.38076 2.83999 4.38076 7.88L4.22076 26.2C4.22076 31.36 4.22076 30.76 0.460764 30.76V31.04H13.2608C13.5408 31.04 13.8208 31.04 14.1008 31C21.3408 30.8 24.1808 27.88 24.1808 23.36C24.1808 18.96 20.1408 16.68 14.7008 16.32ZM8.54076 7.88C8.54076 4.03999 8.54076 3.39999 10.1408 3.31999H11.4208C16.6608 3.31999 18.7808 4.67999 18.7808 9.52C18.7808 14.4 17.1808 16.16 12.1808 16.16H8.50076L8.54076 7.88ZM13.1008 30.68C12.3808 30.68 11.1408 30.68 10.2208 30.64C9.30076 30.64 8.94076 30.28 8.82076 30.08C8.50076 29.56 8.42076 28.68 8.42076 27.16L8.50076 16.6H12.7008C18.5408 16.6 19.7008 18.88 19.7008 23.36C19.7008 28.12 18.8608 30.68 13.1008 30.68Z" fill="black"/>
                <path d="M30.8292 26.4C29.8292 24.36 29.7092 21 30.5092 18H44.5092H46.9492C46.9492 18 46.4292 9.88 38.4292 10.2C38.3892 10.2 38.3892 10.2 38.3492 10.2C37.8692 10.2 37.3892 10.24 36.9492 10.32C32.1892 10.72 28.3892 13.96 26.5892 18.32C25.0292 22.04 25.1492 26.28 27.5892 28.92C30.7892 32.36 40.2692 32.32 44.8292 24.8C45.6292 23.44 46.3492 21.84 46.9492 20H46.5892C41.6292 33.24 32.9092 31 30.8292 26.4ZM32.3492 14.12C34.2292 11.68 35.7092 10.68 38.1092 10.52C38.1092 10.52 42.8692 10.08 43.0692 17.64H30.6292C31.0292 16.32 31.5892 15.12 32.3492 14.12Z" fill="black"/>
                <path d="M64.5164 12.36C62.3164 9.59999 58.2764 8.91999 54.3164 13.32V10.48H53.8364L46.7564 13.32L46.8764 13.48C46.8764 13.48 50.1564 11.96 50.1564 13.8V26.2C50.1564 31.36 50.1564 30.76 46.3964 30.76V31.04H58.5164V30.76C54.5964 30.76 54.3164 31.24 54.3164 26.2V13.68C58.3564 9.52 61.1164 12.08 62.4764 15.72L64.7964 12.8C64.7164 12.64 64.5964 12.52 64.5164 12.36Z" fill="black"/>
                <path d="M81.7486 23.88L81.6286 23.72L81.3886 23.28L77.3886 16.64L77.3086 16.52L76.4286 15.16C80.4686 9.88 83.3886 11.16 86.7086 10.96V10.6H71.6686V10.96C76.1086 10.96 78.5886 11.68 77.6686 12.84L75.7886 15.32L71.0686 21.64V0.119995H70.5886L63.5086 2.95999L63.6286 3.11999C63.6286 3.11999 66.9086 1.6 66.9086 3.44V26.2C66.9086 31.36 66.9086 30.76 63.1486 30.76V31.04H75.2686V30.76C71.3486 30.76 71.0686 31.24 71.0686 26.2V22.32L74.0686 18.32L74.1086 18.4L77.2686 23.92L77.5086 24.28L78.0286 25.24C79.9486 28.4 80.9886 29.96 81.9886 30.6C82.5086 30.96 83.0286 31 83.7886 31H89.3486V30.8C85.5086 30.84 84.9886 29.12 81.7486 23.88Z" fill="black"/>
                <path d="M93.2901 26.4C92.2901 24.36 92.1701 21 92.9701 18H106.97H109.41C109.41 18 108.89 9.88 100.89 10.2C100.85 10.2 100.85 10.2 100.81 10.2C100.33 10.2 99.8501 10.24 99.4101 10.32C94.6501 10.72 90.8501 13.96 89.0501 18.32C87.4901 22.04 87.6101 26.28 90.0501 28.92C93.2501 32.36 102.73 32.32 107.29 24.8C108.09 23.44 108.81 21.84 109.41 20H109.05C104.09 33.24 95.3701 31 93.2901 26.4ZM94.8101 14.12C96.6901 11.68 98.1701 10.68 100.57 10.52C100.57 10.52 105.33 10.08 105.53 17.64H93.0901C93.4901 16.32 94.0501 15.12 94.8101 14.12Z" fill="black"/>
                <path d="M115.795 26.2V0.119995H115.315L108.235 2.95999L108.355 3.11999C108.355 3.11999 111.635 1.6 111.635 3.44V26.2C111.635 31.36 111.635 30.76 107.875 30.76V31.04H119.995V30.76C116.075 30.76 115.795 31.24 115.795 26.2Z" fill="black"/>
                <path d="M128.145 26.2V10.48H127.665L120.585 13.32L120.705 13.48C120.705 13.48 123.985 11.96 123.985 13.8V26.2C123.985 31.36 123.985 30.76 120.225 30.76V31.04H132.345V30.76C128.425 30.76 128.145 31.24 128.145 26.2ZM127.905 5.59999L127.785 5.39999L122.385 7.68L122.505 7.91999L127.905 5.59999Z" fill="black"/>
                <path d="M148.115 10.32C131.755 6.24 123.675 35.64 144.395 30.24C152.235 28.16 157.235 13.4 148.115 10.32ZM142.595 30.4C142.515 30.44 142.475 30.44 142.435 30.44H142.395C141.595 30.56 136.635 31.96 135.915 22.44C134.995 10.72 143.235 10.4 143.235 10.4C143.355 10.36 143.435 10.36 143.555 10.36C143.595 10.36 143.635 10.32 143.715 10.32C143.715 10.32 143.795 10.32 144.035 10.36H144.075C145.355 10.48 148.515 11.64 148.515 19.16C148.515 28.6 143.915 30.04 142.595 30.4Z" fill="black"/>
              </svg>
              <Text> Productos de piel. Hecho en México 🇲🇽 </Text>
              <Flex>
                <Link  href='https://www.instagram.com/berkelio.mx/' isExternal>
                <IconButton
                  margin="2"
                  variant='outline'
                  colorScheme='black'
                  aria-label='Call Sage'
                  fontSize='20px'
                  borderRadius={ "3xl" }
                  icon={<Image src="https://icongr.am/fontawesome/instagram.svg?size=18&color=1a202c" alt='instagram'/>}/>
                  </Link>

                  <Link  href='https://www.facebook.com/berkeliomx' isExternal>
                  <IconButton
                  margin="2"
                  variant='outline'
                  colorScheme='black'
                  aria-label='Call Sage'
                  fontSize='20px'
                  borderRadius={ "3xl" }
                  icon={<Image src="https://icongr.am/fontawesome/facebook.svg?size=18&color=1a202c" alt='facebook'/>}/>
                  </Link>
                  
                  <Link  href='https://www.pinterest.com.mx/berkeliomx' isExternal>
                    <IconButton
                    margin="2"
                    variant='outline'
                    colorScheme='black'
                    aria-label='Call Sage'
                    fontSize='20px'
                    borderRadius={ "3xl" }
                    icon={<Image src="https://icongr.am/fontawesome/pinterest.svg?size=18&color=1a202c" alt='pinterest'/>}/>
                  
                  </Link>
                </Flex>
              </VStack>

            </VStack>
            <Divider marginY={6}/>
            <Component {...pageProps} />
          </Container>
        </Box>
      </ChakraProvider>
      </>
  )
}

export default App
