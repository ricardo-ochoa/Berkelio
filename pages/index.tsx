import React, { useState } from 'react'
import { GetStaticProps } from "next";

import Product from '../product/types';
import api from '../product/api';
import { Stack, Grid, Text, Button, Link, Flex, Image, Badge, Box, Container, useColorModeValue } from '@chakra-ui/react';

import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';




interface Props {
  products: Product[];
}

function parseCurrency(value: number): string {
  return value.toLocaleString("es-MX",{
    style: "currency",
    currency: "MXN",
  });
}

const IndexRoute: React.FC<Props> = ({products}) => {

  const [cart, setCart] = React.useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<string>(null)

  const text = React.useMemo(
    () => 
      cart.reduce(
        (message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n mxn`),
        ``,
      ).concat( `\nTotal: ${parseCurrency(cart.reduce((total,product) => total + product.price, 0,))} mxn`),
      [ cart ],
      );

  return (
    <AnimateSharedLayout>
        <Stack spacing={ 6 } >
          <Grid gridGap={ 6 } templateColumns="repeat(auto-fill, minmax(240px, 1fr))">

          {products.map((product) => (

          <Stack  spacing={ 3 } key={ product.id } backgroundColor="gray.50"  borderRadius={ "xl" } p={"4"} border='1px' borderColor='gray.200'>

              <Image
                as={motion.img}
                cursor="pointer"
                layoutId={product.image}
                borderTopRadius="md" maxHeight={200} objectFit="cover"
                src={product.image} alt={product.title}
                onClick={() => setSelectedImage(product.image)}
                />

            <Stack>
              <Flex alignItems="flex-start" justifyContent="flex-start" mt={-33} ml={-3}>
              { product.stock === 'Último'
                ? <Badge position='relative' fontSize='0.7em' colorScheme='red' marginLeft='1rem'> {product.stock} </Badge>
                : <Badge position='relative' fontSize='0.7em' colorScheme='gray' marginLeft='1rem'> {product.stock} </Badge>
              } 
              </Flex>
            </Stack>
            
            <Stack spacing={ 3 }>
              <Text>{product.title}</Text>    
              <Text color='purple' fontSize="sm" fontWeight="600"> {parseCurrency(product.price)} {"mxn"} </Text>
            </Stack>

            { product.stock === 'Agotado'
                ? <Button onClick={()=> setCart((cart) => cart.concat(product) ) } isDisabled colorScheme="gray" 
                leftIcon={<Image src="https://icongr.am/fontawesome/shopping-cart.svg?size=18&color=1a202c" alt='Lo quiero'/>}> Agregar </Button>
                : <Button onClick={()=> setCart((cart) => cart.concat(product) ) } colorScheme="primary" border='2px' borderColor='primary.600' 
                leftIcon={<Image src="https://icongr.am/fontawesome/shopping-cart.svg?size=18&color=ffffff" alt='Lo quiero'/>}> Agregar </Button>
            } 

          </Stack>
          ))}

          </Grid>
          <AnimatePresence>
            {
            Boolean(cart.length) && (
              <Flex 
                as={motion.div}
                initial={{scale: 0}}
                exit={{scale: 0}}
                animate={{scale: 1}}
                bottom={ 0 }
                padding={ 3 }
                position="sticky"
                alignItems="center" 
                justifyContent="center">

                <Button
                isExternal
                as={Link}
                colorScheme={'whatsapp'}
                href={`https://wa.me/9931433105?text=${encodeURIComponent(text)}`}
                leftIcon={<Image src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff" alt='whatsapp'/>}
                width="fit-content"
                p="4"
                boxShadow='2xl'
                shadow="primary"
                size={"lg"}
                >
                  Completar pedido ({cart.length} Productos)
                </Button>
              </Flex>
              )
            }
           </AnimatePresence>


        <Box
        borderRadius="lg"
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
         
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>

          <Text>© 2022 Berkelio MX. All rights reserved</Text>
        </Container>
        </Box>

        </Stack>
        <AnimatePresence>
          {selectedImage && (
            <Flex
            key="backdrop" 
            alignItems="center" 
            justifyContent="center"

            as={motion.div} 
            backgroundColor="rgba(0,0,0,0.7)"
            layoutId={selectedImage}
            left={0}
            position="fixed"
            top={0}
            width="100%"
            height="100%"
            onClick={() => setSelectedImage(null)}
            >
              <Image key="image" src={selectedImage} alt="Detalle de producto"
              borderRadius={"xl"}/>
            </Flex>
            )
          }
        </AnimatePresence>
  </AnimateSharedLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => { 

  const products = await api.list();

  return {
    revalidate: 10,
    props: {
      products,
    },
  };
};

export default IndexRoute;
