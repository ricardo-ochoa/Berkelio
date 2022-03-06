import React, { useState } from 'react'
import { GetStaticProps } from "next";

import {Product} from '../product/types';
import api from '../product/api';
import { Stack, Grid, Text, Button, Link, Flex, Image, Badge, Box, Container, useColorModeValue,Heading,CloseButton,Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  List,
  ListItem,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, 
  HStack} from '@chakra-ui/react';

import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { createAxisDelta } from 'framer-motion/types/projection/geometry/models';
import ProductCard from '../product/ProductCard';




interface Props {
  products: Product[];
}

function parseCurrency(value: number): string {
  return value.toLocaleString("es-MX",{
    style: "currency",
    currency: "MXN",
  });
}

interface CartItem extends Product {
  quantity: number
}

const IndexRoute: React.FC<Props> = ({products}) => {

  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isCartOpen, toggleCart] = React.useState<boolean>(false)

  const [selectedImage, setSelectedImage] = React.useState<string>(null)


  const total = React.useMemo(
    () => parseCurrency(cart.reduce((total,product) => total + (product.price * product.quantity), 0,)), [cart]
  )

  const text = React.useMemo(
    () => 
      cart.reduce(
        (message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price * product.quantity)} mxn \n`),
        ``,
      ).concat( `\nTotal: ${total}`),
      [ cart, total ],
      );

  function handleRemoveFromCart(index: number){
    setCart((cart) => cart.filter((_, _index) => _index !== index));
  } 

  function handleEditCart(product: Product, action: 'increment' | 'decrement' ){
    setCart((cart) => {

      const isIncart = cart.some((item) => item.id === product.id)

      if(!isIncart){
        return cart.concat({...product, quantity: 1})
      }
      
      return cart.reduce((acc, _product) => {
          if(product.id !== _product.id){
            return acc.concat(_product);
          }
  
          if(action === "decrement"){
            if (_product.quantity === 1) {
              return acc;
            }

            return acc.concat({..._product, quantity: _product.quantity -1})
          } else if(action === "increment" ){
            return acc.concat({..._product, quantity: _product.quantity +1})
          }
  
      }, []);
    }
    )
  }

  return (
    
    <>
      <AnimateSharedLayout>
          <Stack spacing={ 6 } >
            <Grid gridGap={ 6 } templateColumns="repeat(auto-fill, minmax(240px, 1fr))">

            {products.map((product) => (

              <ProductCard
              key={product.id}
              product={product}
              onAdd={(product) => handleEditCart(product, "increment")}
              />
              
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
                  onClick={()=> toggleCart(true)}
                  colorScheme={'whatsapp'}
                  
                  width="fit-content"
                  p="4"
                  boxShadow='2xl'
                  shadow="primary"
                  size={"lg"}
                  >
                    Hacer pedido ({cart.length} Productos)
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

    <Drawer
        isOpen={isCartOpen}
        placement='right'
        onClose={()=> toggleCart(false)} 
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tu pedido ({cart.length} Productos)</DrawerHeader>

          <DrawerBody>
            <Stack divider={<Divider/>} spacing={4}>
              {
                cart.map((product, index) => <Stack key={product.id}>

                  <Stack>

                    <HStack justifyContent="space-between">
                      <HStack>
                        <Image
                        as={motion.img}
                        layoutId={product.image}
                        borderRadius="sm" maxHeight={12} objectFit="cover"
                        src={product.image} alt={product.title}
                        />
                        <Heading as='h6' size='xs'>{product.title} {product.quantity > 1 ? ` (X${product.quantity})` : '' }</Heading>
                      </HStack>

                      <HStack>
                        <Text as='em' color="purple">{parseCurrency(product.price * product.quantity)}</Text>
                    </HStack> 
                      
                    </HStack>
                  </Stack>

                  <HStack>
                    <Button size="xs" onClick={() => handleEditCart(product, "decrement")}> 
                    {""}
                    -{""}
                    </Button>
                    <Text>{product.quantity}</Text>
                    <Button size="xs" onClick={() => handleEditCart(product, "increment")}> 
                    {""}
                    +{""}
                    </Button>
                  </HStack>

                  </Stack>)
              }
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            
            <Button
                  isExternal
                  as={Link}
                  colorScheme={'whatsapp'}
                  href={`https://wa.me/529931433105?text=${encodeURIComponent(text)}`}
                  leftIcon={<Image src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff" alt='whatsapp'/>}
                  width="100%"
                  p="4"
                  boxShadow='2xl'
                  shadow="primary"
                  size={"lg"}
                  >
                    Completar pedido ({total} mxn) 
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      
    </>
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
