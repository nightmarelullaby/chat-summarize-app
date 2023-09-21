"use client"
import moment from "moment"
import {User,Input,Textarea,Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {useState} from "react"
import ChatMessage from "./components/ChatMessage"
export default function Home() {
  const [input,setInput] = useState("")
  const [messages,setMessages] = useState([])
  const getLetterCount = (input) => {
    return input.length
  }
  const getWordCount = (input) => {
    return input.trim().split(" ").length
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(input === "") return;
    const wordCount = getWordCount(input)
    const letterCount = getLetterCount(input)
    setMessages(prev => [...prev,{lettersCount:letterCount,wordCount:wordCount,content:input,sender:true,author:"User",date:moment().format('LT')}])
    setInput("")
    const req =  await fetch("http://localhost:3000/api/summarize",{
      headers:{
        "Content-Type":"application/json"
      },
      method:"POST",
      body:JSON.stringify({input})
    })
    const result = await req.json()
    console.log(result)
    const wordCountResult = getWordCount(result.output[0].text)
    const letterCountResult = getLetterCount(result.output[0].text)
    setMessages(prev => [...prev,{lettersCount:letterCountResult,wordCount:wordCountResult,content:result.output[0].text,sender:false,author:"AI Bot",date:moment().format('LT')}])
    return console.log()
  }

  const handleChange = ({target}) => {
    const {value} = target
    return setInput(value)
  }

  return (
    <main className=" relative">
        <div className="fixed z-30 p-2 w-full top-0 bg-neutral-800">
         <User   
          name="AI Bot"
          description="I'm here to help you"
          avatarProps={{
            src: "https://preview.redd.it/chat-gpt-creates-an-avatar-of-itself-v0-eh6hv5g4v4va1.jpg?width=640&crop=smart&auto=webp&s=e9f753a4ab7782dc40d67ea0fb72151bf2a46559"
          }}/>
        </div>
        <div className="pt-2 px-2 mt-[63px] mb-[48px] flex flex-col gap-2">
          {messages.map(message => <ChatMessage lettersCount={message.lettersCount} wordsCount={message.wordCount}sender={message.sender} author={message.author} date={message.date}content={message.content}/>)}
       </div>
      <form onSubmit={handleSubmit}>
        <Input 
          onChange={handleChange} 
          variant="bordered" 
          value={input}
          className="mt-2 fixed bottom-0"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent py-4",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent ",
            inputWrapper: [
              "shadow-xl",
              "rounded-b-none",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Paste your paragraph here" 
          type="text" 
          isClearable={true}/ >
      </form>
    </main>
  )
}
