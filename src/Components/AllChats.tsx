import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import { useFetch } from "./useFetch";
import { useState } from "react";
import {Link} from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import {RiMenu3Fill} from 'react-icons/ri';


const AllChats = ()=> {

    const [pages, setPages] = useState<number>(10);
    const url:any =`https://qa.corider.in/assignment/chat?page=`;


    const handleRefresh = async () =>{
        setPages((prevPages) => prevPages+10)
        return Promise.resolve();
    }


    //Fetching from api using custom hook
    const {data, isPending} = useFetch(url, pages);


    //Chat list elements mapping

    const chatListElements = data?.map((chatItem,i:number) =>{
        
        return (
            <Link to={`/id${i}`} key={`id${i}`} style={{display:'flex', width:'100%', justifyContent:'center'}} state={{chatObject: {chatItem}}}>
            <Box h='90px' w='90%' backgroundColor='white'
            borderRadius='20px'marginBottom='3%' 
            boxShadow='sm'>
                <Flex alignItems='center 'w='100%' h='85px' justify='space-around'>
                    <Text fontSize='2xl' fontWeight='bold'>
                        {chatItem.name}
                    </Text>
                    <Box>
                        <Flex direction='column' align='center'>
                            <Text fontSize='md'>
                                {chatItem.from}
                            </Text>
                            <Text  fontSize='sm'>
                                To
                            </Text>
                            <Text fontSize='md'>
                                {chatItem.to}
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
            </Link>
        )
    } );


    return ( <>
    <div style={{width: '99.7%'}}>
        <Box
        zIndex='1'
        position="sticky"
        width='100%'
        backgroundColor="#379237"
        borderBottom="1px solid gray"
        color="white"
        h='12vh'>
                    <Flex flexDirection='column' justify='end' height='100%'>
                    <Flex align='end'
                    justify='space-between'
                    height='100%'
                    pr='4'
                    pl='4'
                    pb='2'
                    >
                    <Text fontSize="3xl" fontFamily='' fontWeight='900'>
                        Conversations
                    </Text>
                    <IconButton 
                    size='md'
                    aria-label='menu'
                    backgroundColor='transparent'

                    icon={<RiMenu3Fill size={22}/>}
                    /> 
                    
                    </Flex>
                    <Text textAlign='center' fontSize='xs' color='#DDE6ED'>(Pull to Refresh)</Text>
                    </Flex>
                
        </Box>
        
        <Box 
        display='flex' 
        flexDirection='column' 
        alignItems='center' 
        width='100%' 
        height='100vh' 
        paddingTop='4%'
        backgroundColor='#faf9f4'>
            {isPending && <Center h='100vh' mt='35%'><Box>Loading...</Box></Center> }
            {data && ( <PullToRefresh onRefresh={handleRefresh}>
                    <div>
                    {chatListElements}
                    </div>
                </PullToRefresh>)}
        </Box>
        </div>
        </>
        );
}
 
export default AllChats;