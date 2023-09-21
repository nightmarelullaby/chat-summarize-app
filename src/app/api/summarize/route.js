import {NextResponse} from "next/server"
// import {Configuration, OpenAIApi} from "openai-edge"
import axios from 'axios';


// import {OpenAIStream,StreamingTextResponse} from "ai"
export async function POST(req,res){
	const body = await req.json()
	const input = body.input
	// return console.log(input)
	console.log(input)
	const url = 'https://summarize-texts.p.rapidapi.com/pipeline';

const options = {
  method: 'POST',
  url: 'https://summarize-texts.p.rapidapi.com/pipeline',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'cb1f42c4a6mshdd5a14040644cd9p1bafe9jsn2a0cb650f715',
    'X-RapidAPI-Host': 'summarize-texts.p.rapidapi.com'
  },
  data: {
    input: input,
    multilingual:{
    	enabled:true
    }
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
	return NextResponse.json(response.data)
	
} catch (error) {
	console.error(error);
}

}