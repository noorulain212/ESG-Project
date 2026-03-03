import firebase_admin
from firebase_admin import credentials, firestore
import os
import json
from dotenv import load_dotenv

load_dotenv()

def initialize_firebase():
    """Initialize Firebase Admin SDK"""
    try:
        # Check if already initialized
        firebase_admin.get_app()
    except ValueError:
        # Not initialized, initialize now
        cred_path = os.path.join(os.path.dirname(__file__), '..', '..', 'keys', 
                                 'lumyna-c05cf-firebase-adminsdk-fbsvc-91667140e2.json')
        
        # For local development with file
        if os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
        else:
            # For production with environment variable
            cred_json = os.environ.get('FIREBASE_CREDENTIALS')
            if cred_json:
                cred = credentials.Certificate(json.loads(cred_json))
            else:
                raise Exception("No Firebase credentials found")
        
        firebase_admin.initialize_app(cred)
    
    return firestore.client()

# Get Firestore client
db = initialize_firebase()