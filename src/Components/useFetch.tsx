import { useEffect, useState } from "react";
import axios from "axios";


//Custom Hook to fetch data from api


export const useFetch = (url:string, pages:number) =>{

let allChats: any[] = [];


    // const [allChats, setAllChats] = useState<any>()
    const [data, setData] = useState<any[]>([]);
    const [isPending, setIsPending] = useState(true);
    const [refresh, setRefresh] = useState<Boolean>();


    function fetchchat(pageNumber:number):object{
        const apiurl = url + pageNumber;
        const chat = axios.get(apiurl).then((response) => response.data);
        return chat;
    }

    async function fetchAllChats(pages:number){
        for(let i=(pages-10); i<pages; i++){
            try{
            const chat = await fetchchat(i);
            allChats.push(chat);
            }
            catch(e){
                console.log(e)
            }
        }
        return allChats;
    }

    useEffect(() => {
    fetchAllChats(pages).then((chats)=> {
        setData((prevData) => [...chats, ...prevData])
        setIsPending(false)
        setRefresh(false)
    })
    },[pages])





    
    // useEffect(() => {

    //     const abortCont = new AbortController();

    //     async function fetchingFunction (){
    //         try{
    //             let response = await fetch(url+'0', {signal: abortCont.signal});
    //             let data = await response.json();
    //             setData(data);
    //             setIsPending(false);
    //         }
    //         catch(e){
    //             console.log(e);
    //         }
    //     }
        
    //     fetchingFunction();
    // }, [url]);

    return {data, isPending, refresh}

}