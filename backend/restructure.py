import firebase_admin
from firebase_admin import credentials, firestore
import os
import traceback

print("🚀 Building complete emission factors hierarchy...")

# Firebase setup
key_path = os.path.join(os.path.dirname(__file__), 'keys', 'lumyna-c05cf-firebase-adminsdk-fbsvc-91667140e2.json')
cred = credentials.Certificate(key_path)
firebase_admin.initialize_app(cred)
db = firestore.client()

print("✅ Firebase connected")

# ============ SCOPE 1 DATA ============
scope1_data = {
    "stationary": {
        "naturalGas": {"value": 0.202, "unit": "kg CO₂/kWh", "source": "UAE MoCCaE"},
        "diesel": {"value": 2.68, "unit": "kg CO₂/liter", "source": "UAE MoCCaE"},
        "lpg": {"value": 1.53, "unit": "kg CO₂/liter", "source": "UAE MoCCaE"}
    },
    "mobile": {
        "petrolCar": {"value": 0.175, "unit": "kg CO₂/km", "source": "UAE MoCCaE"},
        "dieselCar": {"value": 0.155, "unit": "kg CO₂/km", "source": "UAE MoCCaE"},
        "dieselTruck": {"value": 0.485, "unit": "kg CO₂/km", "source": "UAE MoCCaE"}
    }
}

# ============ UAE CITIES SCOPE 2 DATA ============
uae_cities_scope2 = {
    "dubai": {
        "electricity": {"value": 0.428, "unit": "kg CO₂/kWh", "source": "DEWA"},
        "cooling": {"value": 0.192, "unit": "kg CO₂/kWh", "source": "Empower"},
        "heating": {"value": 0.0561, "unit": "kg CO₂/MJ", "source": "UAE MoCCaE"}
    },
    "abu-dhabi": {
        "electricity": {"value": 0.429, "unit": "kg CO₂/kWh", "source": "TAQA/ADDC"},
        "cooling": {"value": 0.185, "unit": "kg CO₂/kWh", "source": "IPCC"},
        "heating": {"value": 0.0561, "unit": "kg CO₂/MJ", "source": "UAE MoCCaE"}
    }
}

try:
    print("\n1. Creating Middle East region...")
    me_ref = db.collection('emissionFactors').document('regions').collection('middle-east').document('metadata')
    me_ref.set({
        'name': 'Middle East',
        'created_at': firestore.SERVER_TIMESTAMP
    })
    print("   ✅ Middle East region created")

    print("\n2. Creating UAE country...")
    uae_ref = me_ref.collection('countries').document('uae')
    uae_ref.set({
        'name': 'United Arab Emirates',
        'created_at': firestore.SERVER_TIMESTAMP
    })
    print("   ✅ UAE created")

    print("\n3. Adding UAE cities...")
    for city_id, city_data in uae_cities_scope2.items():
        print(f"   📍 Adding {city_id}...")
        
        city_ref = uae_ref.collection('cities').document(city_id)
        city_ref.set({
            'name': city_id.replace('-', ' ').title(),
            'created_at': firestore.SERVER_TIMESTAMP
        })
        print(f"      ✅ City document created")
        
        scope1_ref = city_ref.collection('scope1').document('factors')
        scope1_ref.set(scope1_data)
        print(f"      ✅ Scope1 data added")
        
        scope2_ref = city_ref.collection('scope2').document('factors')
        scope2_ref.set(city_data)
        print(f"      ✅ Scope2 data added")

    print("\n✅ ALL DATA UPLOADED SUCCESSFULLY!")

except Exception as e:
    print(f"\n❌ ERROR: {e}")
    print("\nFull traceback:")
    traceback.print_exc()

print("\nDone")