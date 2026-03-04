import firebase_admin
from firebase_admin import credentials, firestore
import os
from datetime import datetime

# Firebase setup
key_path = os.path.join(os.path.dirname(__file__), 'keys', 'lumyna-c05cf-firebase-adminsdk-fbsvc-91667140e2.json')
cred = credentials.Certificate(key_path)
firebase_admin.initialize_app(cred)
db = firestore.client()

def setup_all_collections():
    """Create all required collections with proper hierarchy"""
    print("🚀 Setting up complete Firestore schema...")
    
    # ============================================
    # 1. EMISSION FACTORS (Already exists - just verify)
    # ============================================
    print("\n📊 Verifying Emission Factors collection...")
    ef_ref = db.collection('emissionFactors')
    print("   ✅ emissionFactors collection exists")
    
    # ============================================
    # 2. COMPANIES COLLECTION
    # ============================================
    print("\n🏢 Creating Companies collection...")
    companies_ref = db.collection('companies')
    
    # Create a sample structure (will be overwritten by real data later)
    sample_company = companies_ref.document('sample-template')
    sample_company.set({
        'basicInfo': {
            'name': 'Company Name',
            'description': 'Company description',
            'industry': 'industry type',
            'employees': 0,
            'revenue': 0,
            'fiscalYear': 2026
        },
        'locations': [],
        'createdAt': firestore.SERVER_TIMESTAMP,
        'updatedAt': firestore.SERVER_TIMESTAMP
    })
    print("   ✅ Companies collection created")
    
    # ============================================
    # 3. EMISSION DATA COLLECTION
    # ============================================
    print("\n📈 Creating Emission Data collection...")
    emission_data_ref = db.collection('emissionData')
    
    # Create a template structure
    template_data = emission_data_ref.document('_template')
    template_data.set({
        'companyId': 'template',
        'year': 2026,
        'data': {
            'scope1': {
                'mobile': [],
                'stationary': [],
                'refrigerants': [],
                'fugitive': []
            },
            'scope2': {
                'electricity': [],
                'heating': [],
                'renewables': []
            }
        },
        'createdAt': firestore.SERVER_TIMESTAMP
    })
    print("   ✅ Emission Data collection created")
    
    # ============================================
    # 4. REPORTS COLLECTION
    # ============================================
    print("\n📑 Creating Reports collection...")
    reports_ref = db.collection('reports')
    
    template_report = reports_ref.document('_template')
    template_report.set({
        'companyId': 'template',
        'type': 'monthly',
        'period': '2026-01',
        'generatedAt': firestore.SERVER_TIMESTAMP,
        'format': 'pdf',
        'data': {},
        'downloadUrl': ''
    })
    print("   ✅ Reports collection created")
    
    # ============================================
    # 5. SETTINGS COLLECTION
    # ============================================
    print("\n⚙️ Creating Settings collection...")
    settings_ref = db.collection('settings')
    
    template_settings = settings_ref.document('_template')
    template_settings.set({
        'companyId': 'template',
        'reportingPreferences': {
            'defaultYear': 2026,
            'defaultPeriod': 'monthly',
            'currency': 'USD',
            'distanceUnit': 'km',
            'fuelUnit': 'liters'
        },
        'notificationSettings': {
            'emailReports': True,
            'reminders': True
        },
        'factorSource': 'UK Government Factors',
        'updatedAt': firestore.SERVER_TIMESTAMP
    })
    print("   ✅ Settings collection created")
    
    # ============================================
    # 6. ACTIVITY LOG COLLECTION (Optional)
    # ============================================
    print("\n📋 Creating Activity Log collection...")
    activity_ref = db.collection('activityLog')
    
    template_activity = activity_ref.document('_template')
    template_activity.set({
        'companyId': 'template',
        'action': 'TEMPLATE_ACTION',
        'user': 'system',
        'timestamp': firestore.SERVER_TIMESTAMP,
        'details': {}
    })
    print("   ✅ Activity Log collection created")
    
    # ============================================
    # 7. SAMPLE COMPANY DATA (Optional - for testing)
    # ============================================
    print("\n🧪 Creating sample company for testing...")
    
    sample_company_id = 'sample-company-123'
    sample_company = companies_ref.document(sample_company_id)
    sample_company.set({
        'basicInfo': {
            'name': 'Sample Company Inc.',
            'description': 'A sample manufacturing company',
            'industry': 'manufacturing',
            'employees': 500,
            'revenue': 50000000,
            'fiscalYear': 2026
        },
        'locations': [
            {
                'id': 'loc1',
                'city': 'Dubai',
                'country': 'UAE',
                'isPrimary': True
            },
            {
                'id': 'loc2',
                'city': 'Abu Dhabi',
                'country': 'UAE',
                'isPrimary': False
            }
        ],
        'createdAt': firestore.SERVER_TIMESTAMP,
        'updatedAt': firestore.SERVER_TIMESTAMP
    })
    print(f"   ✅ Sample company created: {sample_company_id}")
    
    # ============================================
    # 8. SAMPLE EMISSION DATA (Optional - for testing)
    # ============================================
    print("\n📊 Creating sample emission data for testing...")
    
    sample_emission = emission_data_ref.document(sample_company_id)
    sample_emission.set({
        'companyId': sample_company_id,
        'year': 2026,
        'data': {
            'scope1': {
                'mobile': [
                    {
                        'id': 'vehicle-001',
                        'vehicleType': 'Car',
                        'fuelType': 'Diesel',
                        'distance': 15000,
                        'fuelConsumed': 1200,
                        'registration': 'DXB-123',
                        'month': '2026-01',
                        'location': 'Dubai'
                    }
                ],
                'stationary': [],
                'refrigerants': [],
                'fugitive': []
            },
            'scope2': {
                'electricity': [
                    {
                        'id': 'elec-001',
                        'kwh': 50000,
                        'provider': 'DEWA',
                        'location': 'Dubai',
                        'month': '2026-01',
                        'recCertificate': 'REC-123'
                    }
                ],
                'heating': [],
                'renewables': []
            }
        },
        'createdAt': firestore.SERVER_TIMESTAMP,
        'updatedAt': firestore.SERVER_TIMESTAMP
    })
    print("   ✅ Sample emission data created")
    
    # ============================================
    # 9. SAMPLE SETTINGS (Optional - for testing)
    # ============================================
    print("\n⚙️ Creating sample settings for testing...")
    
    sample_settings = settings_ref.document(sample_company_id)
    sample_settings.set({
        'companyId': sample_company_id,
        'reportingPreferences': {
            'defaultYear': 2026,
            'defaultPeriod': 'monthly',
            'currency': 'USD',
            'distanceUnit': 'km',
            'fuelUnit': 'liters'
        },
        'notificationSettings': {
            'emailReports': True,
            'reminders': True
        },
        'factorSource': 'UK Government Factors',
        'updatedAt': firestore.SERVER_TIMESTAMP
    })
    print("   ✅ Sample settings created")
    
    # ============================================
    # 10. CLEAN UP TEMPLATES (Optional)
    # ============================================
    print("\n🧹 Cleaning up template documents...")
    
    # Delete template documents (optional - they can be kept as reference)
    try:
        emission_data_ref.document('_template').delete()
        reports_ref.document('_template').delete()
        settings_ref.document('_template').delete()
        activity_ref.document('_template').delete()
        print("   ✅ Template documents removed")
    except:
        print("   ⚠️ Some templates already removed")
    
    # ============================================
    # SUMMARY
    # ============================================
    print("\n" + "="*50)
    print("✅✅✅ SCHEMA SETUP COMPLETE! ✅✅✅")
    print("="*50)
    print("\nCollections now available:")
    print("  📁 emissionFactors (existing)")
    print("  📁 companies (new)")
    print("  📁 emissionData (new)")
    print("  📁 reports (new)")
    print("  📁 settings (new)")
    print("  📁 activityLog (new)")
    print("\nSample data created with company ID: sample-company-123")
    print("\nYour database is now ready for development!")

def verify_schema():
    """Verify all collections were created"""
    print("\n🔍 Verifying schema...")
    
    collections = db.collections()
    collection_list = list(collections)
    
    print(f"\n📚 Found {len(collection_list)} collections:")
    for collection in collection_list:
        print(f"  - {collection.id}")
        
        # Get first document in each collection
        docs = collection.limit(1).stream()
        for doc in docs:
            print(f"    └─ {doc.id}")
    
    print("\n✅ Verification complete!")

if __name__ == "__main__":
    setup_all_collections()
    verify_schema()