from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from datetime import datetime
import uuid

from ..utils.firebase import db

router = APIRouter(prefix="/api/admin", tags=["admin"])

# Helper function to get factor path
def get_factor_path(region: str, country: str, city: str, scope: str, category: str):
    """Get the correct Firestore path for a factor"""
    return db.collection('emissionFactors')\
             .document('regions')\
             .collection(region)\
             .document('countries')\
             .collection(country)\
             .document('cities')\
             .collection('city_data')\
             .document(city)\
             .collection(scope)\
             .document('factors')

@router.get("/cities")
async def get_cities(region: str = "middle-east", country: str = "uae"):
    """Get all cities for a country"""
    try:
        print(f"🔍 Fetching cities for region: {region}, country: {country}")
        
        # CORRECT PATH based on your database structure
        cities_ref = db.collection('emissionFactors')\
                      .document('regions')\
                      .collection(region)\
                      .document('countries')\
                      .collection(country)\
                      .collection('cities')
        
        cities = []
        for city_doc in cities_ref.stream():
            city_data = city_doc.to_dict()
            cities.append({
                "id": city_doc.id,
                "name": city_data.get('name', city_doc.id)
            })
            print(f"   Found city: {city_doc.id}")
        
        print(f"✅ Found {len(cities)} cities")
        return {"cities": cities}
    
    except Exception as e:
        print(f"❌ Error fetching cities: {e}")
        return {"cities": []}

@router.get("/factors")
async def get_factors(
    region: Optional[str] = Query("middle-east", description="Region"),
    country: Optional[str] = Query("uae", description="Country"),
    city: Optional[str] = Query(None, description="City"),
    scope: Optional[str] = Query(None, description="scope1 or scope2"),
    category: Optional[str] = Query(None, description="Category like mobile, stationary, electricity, etc."),
    year: Optional[int] = Query(2026, description="Year")
):
    """
    Get emission factors with filters
    """
    try:
        print(f"🔍 GET /factors with filters: region={region}, country={country}, city={city}, scope={scope}, category={category}, year={year}")
        factors = []
        
        if not city:
            return {"factors": [], "total": 0, "filters": {"region": region, "country": country, "city": city, "scope": scope, "category": category, "year": year}}
        
        # Get the city document
        city_ref = db.collection('emissionFactors')\
                    .document('regions')\
                    .collection(region)\
                    .document('countries')\
                    .collection(country)\
                    .document('cities')\
                    .collection('city_data')\
                    .document(city)
        
        if scope:
            # Get specific scope
            scope_ref = city_ref.collection(scope).document('factors').get()
            if scope_ref.exists:
                data = scope_ref.to_dict()
                
                if category and category in data:
                    # Return specific category
                    for factor_name, factor_value in data[category].items():
                        if isinstance(factor_value, dict):
                            # Check if year matches (if factor has year field)
                            if 'year' not in factor_value or factor_value.get('year') == year:
                                factors.append({
                                    "id": f"{region}_{country}_{city}_{scope}_{category}_{factor_name}",
                                    "region": region,
                                    "country": country,
                                    "city": city,
                                    "scope": scope,
                                    "category": category,
                                    "factor_name": factor_name,
                                    "value": factor_value.get('value', 0),
                                    "unit": factor_value.get('unit', ''),
                                    "source": factor_value.get('source', ''),
                                    "year": factor_value.get('year', year)
                                })
                else:
                    # Return all categories for this scope
                    for cat_name, cat_factors in data.items():
                        for factor_name, factor_value in cat_factors.items():
                            if isinstance(factor_value, dict):
                                if 'year' not in factor_value or factor_value.get('year') == year:
                                    factors.append({
                                        "id": f"{region}_{country}_{city}_{scope}_{cat_name}_{factor_name}",
                                        "region": region,
                                        "country": country,
                                        "city": city,
                                        "scope": scope,
                                        "category": cat_name,
                                        "factor_name": factor_name,
                                        "value": factor_value.get('value', 0),
                                        "unit": factor_value.get('unit', ''),
                                        "source": factor_value.get('source', ''),
                                        "year": factor_value.get('year', year)
                                    })
        
        return {
            "factors": factors,
            "total": len(factors),
            "filters": {
                "region": region,
                "country": country,
                "city": city,
                "scope": scope,
                "category": category,
                "year": year
            }
        }
    
    except Exception as e:
        print(f"❌ Error in GET /factors: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/factors")
async def create_factor(factor: dict):
    """
    Create or update an emission factor
    Expected format: {
        region: "middle-east",
        country: "uae",
        city: "dubai",
        scope: "scope1",
        category: "mobile",
        factor_name: "dieselCar",
        value: 0.155,
        unit: "kg CO₂/km",
        source: "UAE MoCCaE",
        year: 2026
    }
    """
    try:
        print(f"📝 Creating factor: {factor}")
        
        required_fields = ['region', 'country', 'city', 'scope', 'category', 'factor_name', 'value', 'unit']
        for field in required_fields:
            if field not in factor:
                raise HTTPException(status_code=400, detail=f"Missing required field: {field}")
        
        # Get the path to the factors document
        city_ref = db.collection('emissionFactors')\
                    .document('regions')\
                    .collection(factor['region'])\
                    .document('countries')\
                    .collection(factor['country'])\
                    .document('cities')\
                    .collection('city_data')\
                    .document(factor['city'])
        
        factors_doc_ref = city_ref.collection(factor['scope']).document('factors')
        
        # Get current data
        current = factors_doc_ref.get()
        
        if current.exists:
            data = current.to_dict()
        else:
            data = {}
        
        # Ensure category exists
        if factor['category'] not in data:
            data[factor['category']] = {}
        
        # Add/update the factor
        data[factor['category']][factor['factor_name']] = {
            "value": factor['value'],
            "unit": factor['unit'],
            "source": factor.get('source', 'Manual Entry'),
            "year": factor.get('year', 2026),
            "updated_at": datetime.now().isoformat()
        }
        
        # Save back
        factors_doc_ref.set(data)
        
        return {
            "message": "Factor created successfully",
            "factor": factor
        }
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error in POST /factors: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/factors/{factor_id}")
async def delete_factor(factor_id: str):
    """Delete a factor (parse the ID to find location)"""
    try:
        # Factor ID format: region_country_city_scope_category_factorName
        parts = factor_id.split('_')
        if len(parts) >= 6:
            region, country, city, scope, category, factor_name = parts[0], parts[1], parts[2], parts[3], parts[4], '_'.join(parts[5:])
            
            # Get the factors document
            city_ref = db.collection('emissionFactors')\
                        .document('regions')\
                        .collection(region)\
                        .document('countries')\
                        .collection(country)\
                        .document('cities')\
                        .collection('city_data')\
                        .document(city)
            
            factors_doc_ref = city_ref.collection(scope).document('factors')
            
            current = factors_doc_ref.get()
            if current.exists:
                data = current.to_dict()
                if category in data and factor_name in data[category]:
                    # Remove the factor
                    del data[category][factor_name]
                    
                    # If category becomes empty, remove it too
                    if not data[category]:
                        del data[category]
                    
                    factors_doc_ref.set(data)
                    return {"message": f"Factor {factor_name} deleted successfully"}
        
        raise HTTPException(status_code=404, detail="Factor not found")
    
    except Exception as e:
        print(f"❌ Error in DELETE /factors: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/cities")
async def get_cities(region: str = "middle-east", country: str = "uae"):
    """Get all cities for a country"""
    try:
        print(f"🔍 Fetching cities for region: {region}, country: {country}")
        
        # Get the country document reference
        country_ref = db.collection('emissionFactors')\
                       .document('regions')\
                       .collection(region)\
                       .document('countries')\
                       .collection(country)\
                       .document('metadata')
        
        # List all collections under the country (these should be your cities)
        cities = []
        collections = country_ref.collections()
        
        for collection in collections:
            # Each collection represents a city
            city_docs = collection.stream()
            for city_doc in city_docs:
                city_data = city_doc.to_dict()
                cities.append({
                    "id": city_doc.id,
                    "name": city_data.get('name', city_doc.id)
                })
                print(f"   Found city: {city_doc.id}")
        
        print(f"✅ Total cities found: {len(cities)}")
        return {"cities": cities}
    
    except Exception as e:
        print(f"❌ Error: {e}")
        return {"cities": []}