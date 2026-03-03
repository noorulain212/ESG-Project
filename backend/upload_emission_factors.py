import firebase_admin
from firebase_admin import credentials, firestore
import os
import json
from datetime import datetime

# Initialize Firebase
key_path = os.path.join(os.path.dirname(__file__), 'keys', 'lumyna-c05cf-firebase-adminsdk-fbsvc-91667140e2.json')
cred = credentials.Certificate(key_path)
firebase_admin.initialize_app(cred)
db = firestore.client()

# ============ SHEET 3: Comprehensive Scope Data ============
scope1_data = {
    "stationary": {
        "naturalGas": {"factor": 0.202, "unit": "kg CO₂/kWh", "source": "UAE MoCCaE"},
        "diesel": {"factor": 2.68, "unit": "kg CO₂/liter", "source": "UAE MoCCaE"},
        "heatingOil": {"factor": 2.68, "unit": "kg CO₂/liter", "source": "UAE MoCCaE"},
        "lpg": {"factor": 1.53, "unit": "kg CO₂/liter", "source": "UAE MoCCaE"},
        "coal": {"factor": 3410, "unit": "kg CO₂/tonne", "source": "IPCC"},
        "biodiesel": {"factor": 2.64, "unit": "kg CO₂/liter", "source": "IPCC"},
        "bioethanol": {"factor": 1.51, "unit": "kg CO₂/liter", "source": "IPCC"},
        "kerosene": {"factor": 2.53, "unit": "kg CO₂/liter", "source": "IPCC"},
        "woodPellets": {"factor": 1090, "unit": "kg CO₂/tonne", "source": "IPCC"},
        "cng": {"factor": 1.87, "unit": "kg CO₂/m³", "source": "IPCC"},
        "biogas": {"factor": 0.51, "unit": "kg CO₂/m³", "source": "IPCC"},
        "heavyFuelOil": {"factor": 3.11, "unit": "kg CO₂/liter", "source": "UAE MoCCaE"},
        "gasoline": {"factor": 2.32, "unit": "kg CO₂/liter", "source": "UAE MoCCaE"},
        "coke": {"factor": 3850, "unit": "kg CO₂/tonne", "source": "IPCC"},
        "peat": {"factor": 1060, "unit": "kg CO₂/tonne", "source": "IPCC"}
    },
    "mobile": {
        "petrolCar": {"factor": 0.175, "unit": "kg CO₂/km", "source": "UAE MoCCaE"},
        "dieselCar": {"factor": 0.155, "unit": "kg CO₂/km", "source": "UAE MoCCaE"},
        "dieselTruck": {"factor": 0.485, "unit": "kg CO₂/km", "source": "UAE MoCCaE"},
        "dieselBus": {"factor": 0.89, "unit": "kg CO₂/km", "source": "UAE MoCCaE"},
        "motorcycle": {"factor": 0.072, "unit": "kg CO₂/km", "source": "UAE MoCCaE"},
        "cargoVan": {"factor": 0.32, "unit": "kg CO₂/km", "source": "UAE MoCCaE"},
        "dieselGenerator": {"factor": 6.7, "unit": "kg CO₂/hour", "source": "UAE MoCCaE"},
        "marineHFO": {"factor": 3.11, "unit": "kg CO₂/liter", "source": "IPCC"},
        "jetFuel": {"factor": 2.53, "unit": "kg CO₂/liter", "source": "IPCC"},
        "lpgForklift": {"factor": 1.53, "unit": "kg CO₂/liter", "source": "UAE MoCCaE"},
        "aircraft": {"factor": 0.115, "unit": "kg CO₂/km", "source": "ICAO"},
        "cargoShip": {"factor": 0.012, "unit": "kg CO₂/km", "source": "IMO"},
        "dieselTrain": {"factor": 0.072, "unit": "kg CO₂/km", "source": "UAE Railway"},
        "constructionEquipment": {"factor": 8.5, "unit": "kg CO₂/hour", "source": "IPCC"},
        "motorboat": {"factor": 0.45, "unit": "kg CO₂/km", "source": "IMO"}
    },
    "fugitive": {
        "r134a": {"factor": 1430, "unit": "kg CO₂e/kg", "source": "IPCC AR5"},
        "r410a": {"factor": 2088, "unit": "kg CO₂e/kg", "source": "IPCC AR5"},
        "r22": {"factor": 1810, "unit": "kg CO₂e/kg", "source": "IPCC AR5"},
        "r404a": {"factor": 3943, "unit": "kg CO₂e/kg", "source": "IPCC AR5"},
        "r407c": {"factor": 1774, "unit": "kg CO₂e/kg", "source": "IPCC AR5"},
        "r32": {"factor": 677, "unit": "kg CO₂e/kg", "source": "IPCC AR5"},
        "r1234yf": {"factor": 1, "unit": "kg CO₂e/kg", "source": "IPCC AR5"},
        "r507": {"factor": 3985, "unit": "kg CO₂e/kg", "source": "IPCC AR5"},
        "hfc23": {"factor": 14800, "unit": "kg CO₂e/kg", "source": "IPCC AR5"},
        "cf4": {"factor": 7390, "unit": "kg CO₂e/kg", "source": "IPCC AR5"},
        "c2f6": {"factor": 12200, "unit": "kg CO₂e/kg", "source": "IPCC AR5"},
        "co2": {"factor": 1, "unit": "kg CO₂e/kg", "source": "IPCC"},
        "hfc227ea": {"factor": 3350, "unit": "kg CO₂e/kg", "source": "IPCC AR5"},
        "methane": {"factor": 28, "unit": "kg CO₂e/kg", "source": "IPCC AR5"},
        "n2o": {"factor": 265, "unit": "kg CO₂e/kg", "source": "IPCC AR5"},
        "sf6": {"factor": 23500, "unit": "kg CO₂e/kg", "source": "IPCC AR5"}
    }
}

# ============ SHEET 4: Emirate-Specific Data ============
emirate_data = {
    "abu-dhabi": {
        "name": "Abu Dhabi",
        "scope2": {
            "electricity": {"factor": 0.429, "unit": "kg CO₂/kWh", "source": "TAQA/ADDC"},
            "cooling": {"factor": 0.185, "unit": "kg CO₂/kWh", "source": "IPCC"}
        }
    },
    "dubai": {
        "name": "Dubai",
        "scope2": {
            "electricity": {"factor": 0.428, "unit": "kg CO₂/kWh", "source": "DEWA"},
            "cooling": {"factor": 0.192, "unit": "kg CO₂/kWh", "source": "Empower"}
        }
    },
    "sharjah": {
        "name": "Sharjah",
        "scope2": {
            "electricity": {"factor": 0.429, "unit": "kg CO₂/kWh", "source": "IEA (UAE proxy)"}
        }
    },
    "ajman": {
        "name": "Ajman",
        "scope2": {
            "electricity": {"factor": 0.429, "unit": "kg CO₂/kWh", "source": "IEA (UAE proxy)"}
        }
    },
    "umm-al-quwain": {
        "name": "Umm Al Quwain",
        "scope2": {
            "electricity": {"factor": 0.429, "unit": "kg CO₂/kWh", "source": "IEA (UAE proxy)"}
        }
    },
    "ras-al-khaimah": {
        "name": "Ras Al Khaimah",
        "scope2": {
            "electricity": {"factor": 0.429, "unit": "kg CO₂/kWh", "source": "IEA (UAE proxy)"}
        }
    },
    "fujairah": {
        "name": "Fujairah",
        "scope2": {
            "electricity": {"factor": 0.429, "unit": "kg CO₂/kWh", "source": "IEA (UAE proxy)"}
        }
    }
}

# ============ INTERNATIONAL FACTORS (Future Expansion) ============
international_data = {
    "countries": {
        "poland": {"electricity": 0.708, "unit": "kg CO₂/kWh", "source": "IEA 2023"},
        "germany": {"electricity": 0.364, "unit": "kg CO₂/kWh", "source": "IEA 2023"},
        "usa": {"electricity": 0.386, "unit": "kg CO₂/kWh", "source": "EPA eGRID"},
        "uk": {"electricity": 0.193, "unit": "kg CO₂/kWh", "source": "UK Gov"},
        "india": {"electricity": 0.708, "unit": "kg CO₂/kWh", "source": "IEA 2023"},
        "china": {"electricity": 0.557, "unit": "kg CO₂/kWh", "source": "IEA 2023"},
        "saudi": {"electricity": 0.619, "unit": "kg CO₂/kWh", "source": "IEA 2023"},
        "qatar": {"electricity": 0.483, "unit": "kg CO₂/kWh", "source": "IEA 2023"}
    }
}

def upload_data():
    """Upload all emission factors to Firestore"""
    print("🚀 Starting upload to Firestore...")
    
    # Create main emissionFactors collection
    emission_factors_ref = db.collection('emissionFactors')
    
    # 1. Upload UAE document
    print("\n📁 Creating UAE document...")
    uae_ref = emission_factors_ref.document('uae')
    uae_ref.set({
        'country': 'UAE',
        'region': 'Middle East',
        'last_updated': firestore.SERVER_TIMESTAMP
    })
    
    # 2. Upload comprehensive Scope 1 data (applies to all emirates)
    print("\n📊 Uploading Scope 1 data (from Sheet 3)...")
    scope1_ref = emission_factors_ref.document('scope1')
    scope1_ref.set(scope1_data)
    
    # 3. Upload each emirate's data (from Sheet 4)
    print("\n📍 Uploading emirate-specific data (from Sheet 4)...")
    for emirate_id, emirate_info in emirate_data.items():
        print(f"   Uploading {emirate_info['name']}...")
        
        # Create emirate document under UAE
        emirate_ref = uae_ref.collection('emirates').document(emirate_id)
        emirate_ref.set({
            'name': emirate_info['name'],
            'last_updated': firestore.SERVER_TIMESTAMP
        })
        
        # Upload Scope 2 data (emirate-specific)
        if 'scope2' in emirate_info:
            scope2_ref = emirate_ref.collection('scope2').document('factors')
            scope2_ref.set(emirate_info['scope2'])
    
    # 4. Upload international factors for future expansion
    print("\n🌍 Uploading international factors...")
    intl_ref = emission_factors_ref.document('international')
    intl_ref.set(international_data)
    
    print("\n✅ Upload complete!")

def verify_upload():
    """Verify the data was uploaded correctly"""
    print("\n🔍 Verifying upload...")
    
    # Check UAE document
    uae_doc = db.collection('emissionFactors').document('uae').get()
    if uae_doc.exists:
        print("✅ UAE document exists")
    
    # Check Scope 1 data
    scope1_doc = db.collection('emissionFactors').document('scope1').get()
    if scope1_doc.exists:
        stationary = scope1_doc.to_dict().get('stationary', {})
        mobile = scope1_doc.to_dict().get('mobile', {})
        fugitive = scope1_doc.to_dict().get('fugitive', {})
        print(f"✅ Scope 1 data loaded:")
        print(f"   - Stationary: {len(stationary)} factors")
        print(f"   - Mobile: {len(mobile)} factors")
        print(f"   - Fugitive: {len(fugitive)} factors")
    
    # Check each emirate
    emirates_ref = db.collection('emissionFactors').document('uae').collection('emirates')
    emirates = emirates_ref.list_documents()
    
    print("\n📍 Emirates found:")
    for emirate in emirates:
        emirate_doc = emirate.get()
        if emirate_doc.exists:
            name = emirate_doc.to_dict().get('name', emirate.id)
            print(f"   ✅ {name}")
            
            # Check Scope 2 factors
            scope2_ref = emirate.collection('scope2').document('factors').get()
            if scope2_ref.exists:
                factors = scope2_ref.to_dict()
                print(f"      - Electricity: {factors.get('electricity', {}).get('factor')} {factors.get('electricity', {}).get('unit')}")
    
    print("\n✅ Verification complete!")

def query_example():
    """Example of how to query the data from your API"""
    print("\n📝 Query Examples:")
    
    # Get Dubai's electricity factor
    dubai_ref = db.collection('emissionFactors').document('uae').collection('emirates').document('dubai')
    dubai_scope2 = dubai_ref.collection('scope2').document('factors').get()
    if dubai_scope2.exists:
        electricity = dubai_scope2.to_dict().get('electricity', {})
        print(f"   Dubai electricity: {electricity.get('factor')} {electricity.get('unit')}")
    
    # Get all stationary combustion factors
    scope1_doc = db.collection('emissionFactors').document('scope1').get()
    if scope1_doc.exists:
        stationary = scope1_doc.to_dict().get('stationary', {})
        print(f"   Stationary factors available: {list(stationary.keys())[:5]}...")

if __name__ == "__main__":
    upload_data()
    verify_upload()
    query_example()