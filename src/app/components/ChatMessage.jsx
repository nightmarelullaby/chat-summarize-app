"use client"
import {User,Input,Textarea,Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {useState} from "react"
export default function ChatMessage ({sender,content,author,date,wordsCount,lettersCount}){
	const [textContent,setTextContent] = useState(content.length > 200 ? content.slice(0,200):content)
	const textLength = content.length
	const [fullContentVisible,setFullContentVisible] = useState(textLength > 200 ? false : true)
	// const [isExtensible,setIsExtensible] = useState(content.length > 200)
	// const [restText,setRestText] = useState(isExtensible ? content.slice(300):"")
	// const [restTextVisible,setRestTextVisible] = useState(false)

	const handleExtend = () => {
		return setRestTextVisible(true)
	}
	return <>
		{!sender && <Card className="max-w-[400px] rounded-ss-none bg-blue-500">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md text-white font-medium">{author}</p>
              <small className="text-xs text-gray-300">Recibido {date}</small>
            </div>
          </CardHeader>
          <Divider className="bg-blue-300"/>
          <CardBody className="p-2">
          	{textLength > 200 && <p className="text-sm">
          		{textContent}
          		{!fullContentVisible && <mark onClick={ ()=> {
          			setTextContent(content)
          			return setFullContentVisible(true)
          		} } className="cursor-pointer  bg-transparent text-white-500 font-bold">{" "}...ver más</mark>}
          		
          	</p>}
          	{textLength <=200 && <p className="text-sm">{textContent}</p>}
          </CardBody>
          <Divider className="bg-blue-300"/> 
          	<CardFooter className="flex gap-2">
               
	            <small>
	            <strong>
	              Palabras:
	              </strong> {wordsCount}
	            </small>
	            
	            <small>
	            <strong>
	            	Letras
	              </strong> {lettersCount}
	            </small>
          </CardFooter>         
        	</Card>}
        	{sender && <Card className="max-w-[400px] rounded-tr-none">
          <CardHeader className="flex gap-3">
          	<div className="flex flex-col items-end ml-auto">
              <p className="text-md text-white font-medium">{author}</p>
              <small className="text-xs text-gray-300">Enviado {date}</small>
            </div>
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            
          </CardHeader>
          <Divider />
          <CardBody className="p-2" >
              {textLength > 200 && <p className="text-sm text-end">
          		{textContent}
          		{!fullContentVisible && <mark  className="cursor-pointer bg-transparent text-blue-500 font-bold" onClick={ ()=> {
          			setTextContent(content)
          			return setFullContentVisible(true)
          		}}>{" "}...ver más</mark>}
          	</p>}            
          	{textLength <200 && <p className="text-sm text-end">{textContent}</p>}
          </CardBody>
          <Divider/>     
			<CardFooter className="flex gap-2 justify-end">
			
	            
	            <small>
	            <strong>
	              Palabras:
	              </strong> {wordsCount}
	            </small>
	            
	            <small>
	            <strong>
	            	Letras
	              </strong> {lettersCount}
	            </small>
	            
          	</CardFooter>
        	</Card>}
        </>
}