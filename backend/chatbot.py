import openai

openai.api_key = "YOUR OPENAI KEY HERE"

def chat_with_gpt(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )

        return response.choices[0].message.content.strip()

    except openai.error.OpenAIError as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["quit", "exit", "bye"]:
            break

        response = chat_with_gpt(user_input)
        if response:
            print("Chatbot: ", response)
        else:
            print("Chatbot: Sorry, I encountered an issue. Please try again.")