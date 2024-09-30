from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()  # This loads the variables from .env

app = Flask(__name__)
CORS(app)

# Initialize the OpenAI client
client = OpenAI()

@app.route('/')
def home():
    return "Welcome to the AI Diet Planner API"

@app.route('/submit-questionnaire', methods=['POST'])
def submit_questionnaire():
    data = request.json
    # Here you would typically save the data to a database
    # For now, we'll just return a success message
    return jsonify({"message": "Questionnaire submitted successfully"}), 200

@app.route('/generate-diet-plan', methods=['POST'])
def generate_diet_plan():
    try:
        data = request.json

        # Prepare the prompt for GPT-3
        prompt = f"Generate a personalized diet plan based on the following information:\n"
        for key, value in data.items():
            prompt += f"{key}: {value}\n"
        prompt += "\nProvide a detailed weekly meal plan with specific meals for breakfast, lunch, dinner, and snacks."

        # Call the OpenAI API
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that generates personalized diet plans."},
                {"role": "user", "content": prompt}
            ]
        )

        diet_plan = completion.choices[0].message.content.strip()
        return jsonify({"diet_plan": diet_plan}), 200
    except Exception as e:
        print(f"Error in generate_diet_plan: {str(e)}")
        return jsonify({"error": "Failed to generate diet plan"}), 500

if __name__ == '__main__':
    app.run(debug=True)
