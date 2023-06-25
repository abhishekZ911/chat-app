import {useLocation, useNavigate} from 'react-router-dom';
import {Box, Flex, Grid, Input, InputRightElement,InputGroup, Text, IconButton, Image, GridItem, Divider} from "@chakra-ui/react";
import {ArrowBackIcon, AttachmentIcon, EditIcon} from '@chakra-ui/icons';
import {BiSend} from 'react-icons/bi';
import {CiMenuKebab} from 'react-icons/ci'

const ChatScreen = () => {

    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();

    const messages:any[] = data.chatObject.chatItem.chats;
    const datetimeString:string = data.chatObject.chatItem.chats[9].time;
    const date = new Date(datetimeString);


    //Navigate Programmatically
    const handleBackClick = () =>{
        navigate(-1);
    }


  // Format the date as '25 June, 2023'
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate: string = date.toLocaleDateString('en-US', options);
  console.log(formattedDate)




  //to map messages of chat
    const messagesElement = messages.map((individualChat) => {
        return (
            <>

            <Flex justify='center' mb='2' >
                <Box margin='1%'
                width='10%'
                key={individualChat.sender.user_id}>
                    <Image 
                    width='99%'
                    height='40px'
                    borderRadius='50%' 
                    src={individualChat.sender.image}
                    ></Image>
                </Box>
                <Box key={individualChat.id}
                 margin='1%'
                 width='90%'
                 background='white'
                 borderRadius='0 15px 15px 15px' padding='3%'
                 boxShadow='md'>
                    <Text>
                        {individualChat.message}
                    </Text>
                </Box>
            </Flex>
            </>
        )
    })


    //To gather 4 url of user images
    const collageImages = [];
    while(collageImages.length < 4){
        const randomIndex = Math.floor(Math.random() * 9);
        const randomImage = data.chatObject.chatItem.chats[randomIndex].sender.image;
        collageImages.push(randomImage);
    }

    const collabPhoto = collageImages.map((image) => {
        return (
            <>
            <GridItem>
                <Image src={image}/>
            </GridItem>
            </>
        )
    })

    
    return ( 
        <Flex  backgroundColor='#faf9f4'
         height="100vh"
        alignItems="flex-end"
        flexDirection="column">
            <Box w='100%'
            p='3%'
            pb='0' 
            h='24vh' 
            display='flex' 
            flexDirection='column' 
            justifyContent='space-between' >
                <Flex 
                flexDirection='column' 
                justifyContent='end'
                height='100%'>
                <Flex 
                height='8vh'
                width='100%' 
                display='flex' 
                align='center' 
                justify='space-between'>
                    <Flex align='center' justifyContent='start'>
                    <IconButton 
                    size='md'
                    aria-label='Back-button'
                    icon={<ArrowBackIcon boxSize='8'/>}
                    backgroundColor='transparent'
                    onClick={handleBackClick}/> 
                    <Text 
                    fontSize='3xl'
                    fontWeight='bold'
                    pl='3'>
                        {data.chatObject.chatItem.name}
                    </Text>
                    </Flex>
                    <IconButton 
                    size='md'
                    aria-label='Back-button'
                    icon={<EditIcon boxSize='6'/>}
                    backgroundColor='transparent'
                    /> 
                </Flex>

                <Flex display='flex' 
                align='center' 
                justify='space-between' 
                ml='3' 
                mt='4'>
                    <Flex>
                    <Box
                    overflow='hidden'
                    borderRadius='50%'
                    width='20%'>
                        
                    <Grid 
                        borderRadius='50%'
                        templateRows='repeat(2, 1fr)'
                        templateColumns='repeat(2, 1fr)'
                        gap='0'
                    >
                            {collabPhoto}
                    </Grid>
                    </Box>
                    <Box>
                        <Flex align='end'> 
                            <Text fontSize='xl' pr='2' pl='5'>From</Text>
                            <Text fontSize='2xl' fontWeight='bold'>{data.chatObject.chatItem.from}</Text>
                        </Flex>
                        <Flex align='end'>
                            <Text fontSize='xl' pr='2' pl='5'>To</Text>
                            <Text fontSize='2xl' fontWeight='bold'>{data.chatObject.chatItem.to}</Text>
                        </Flex>
                    </Box>
                    </Flex>

                    <IconButton 
                    size='md'
                    aria-label='Back-button'
                    icon={<CiMenuKebab style={{color:'black'}} size={20}/>}
                    backgroundColor='transparent'
                    />
                    
                </Flex>
                <Divider mt='4' borderWidth='2px' colorScheme='gray'/>

                </Flex>


            </Box>
            
            
            <Box overflowY="auto" flex="1" p={4}>
                <Flex display='flex'
                flex-flexDirection='row'
                justify='center'
                align='center'
                mt='2'
                mb='4'>
                        <Divider width='25%'/>
                        <Box width='50%'>
                        <Text color='gray' textAlign='center'>{formattedDate}</Text>
                        </Box>
                        <Divider width='25%'/>
                </Flex>
                    {messagesElement}
                    <Flex flexDirection="column">
                    {/* Repeat the above structure for more chat messages */}
                    </Flex>
            </Box>
            {/* Input field and send button */}
            <Flex width="100%" mb='5%' p={4}
            borderRadius='15px'>
                <InputGroup>
                    <Input placeholder="Reply to @Hiralal-Thakur" 
                    size='lg'
                    flex="1"
                    borderRadius='15px' 
                     />
                    <InputRightElement>
                    <IconButton 
                    aria-label='Send-button'
                    mr='8'
                    display='flex' alignItems='center'
                    mt={2}
                    icon={<BiSend size={25} />}
                    backgroundColor='transparent'/>
                    </InputRightElement>

                    <InputRightElement>
                    <IconButton 
                    aria-label='Send-button'
                    mr='8'
                    size='lg'
                    fontWeight='bold'
                    display='flex' alignItems='center'
                    mt={2}
                    backgroundColor='transparent'
                    right='40px'
                    icon={<AttachmentIcon fontWeight='bold'/>}
                    />
                    </InputRightElement>
                    </InputGroup>
            </Flex>
    </Flex>
     );
}
 
export default ChatScreen;