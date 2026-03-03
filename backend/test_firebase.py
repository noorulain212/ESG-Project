import firebase_admin
from firebase_admin import credentials, firestore
import os
from datetime import datetime

# Path to your Firebase key (adjust if you placed it elsewhere)
key_path = os.path.join(os.path.dirname(__file__), 'keys', 'lumyna-c05cf-firebase-adminsdk-fbsvc-91667140e2.json')

try:
    # Initialize Firebase
    cred = credentials.Certificate(key_path)
    firebase_admin.initialize_app(cred)
    print("✅ Firebase initialized successfully!")
    
    # Get Firestore client
    db = firestore.client()
    
    # Create a test document
    doc_ref = db.collection('test_connection').document('test')
    doc_ref.set({
        'message': 'Firebase connected successfully!',
        'timestamp': firestore.SERVER_TIMESTAMP,
        'test_time': datetime.now().isoformat()
    })
    
    print("✅ Test document created in Firestore!")
    print("Check your Firebase Console to verify.")
    
except Exception as e:
    print(f"❌ Error: {e}")