from fastapi import FastAPI
import logic
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins='*',
    allow_credentials=True,
    allow_methods=["POST", "GET", "DELETE"],
    allow_headers=["Content-Type"],
)

@app.post("/chat")
async def chat_with_gpt_api(prompt: str):
    response = logic.chat_with_gpt(prompt)
    if response:
        print("hello i have reached if condition")
        return {"message": response}
    else:
        return {"message": "Sorry, I encountered an issue. Please try again."}
    
# python -m uvicorn main:app --reload run for api

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)